// Onde o painel guarda os dados de cada pessoa.
// Com o Firebase configurado (firebase-config.js): login com Google e um documento por pessoa no Firestore (users/{uid}).
// Sem configuração: "modo demonstração", tudo fica só neste navegador (localStorage). O resto do painel é igual nos dois.
import {firebaseConfig} from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const LOCAL_KEY = "cdbPainelPOC";
export const EMPTY = () => ({char: "", snap: null, own: [], dMine: [], dDay: "", dDone: [], fprog: {}, quests: []});

export async function createStore(onUser) {
  if (!firebaseConfig) {
    let data = EMPTY();
    try { data = {...data, ...JSON.parse(localStorage.getItem(LOCAL_KEY) || "{}")}; } catch (_) {}
    /* avisa depois de devolver o store, para quem chamou já ter a referência */
    setTimeout(() => onUser({uid: "local", name: "Modo demonstração", photo: ""}, data));
    return {mode: "local", save: d => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(d)); } catch (_) {} }, signIn() {}, signOut() {}};
  }
  const [{initializeApp}, A, F] = await Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js")]);
  const app = initializeApp(firebaseConfig), auth = A.getAuth(app), db = F.getFirestore(app);
  let uid = null, timer = null;
  A.onAuthStateChanged(auth, async u => {
    if (!u) { uid = null; onUser(null, null); return; }
    uid = u.uid;
    const snap = await F.getDoc(F.doc(db, "users", uid));
    onUser({uid, name: u.displayName || u.email || "Você", photo: u.photoURL || ""}, {...EMPTY(), ...(snap.exists() ? snap.data() : {})});
  });
  return {
    mode: "firebase",
    /* grava no máximo a cada 0,8 s, para não escrever a cada clique */
    save(d) { if (!uid) return; clearTimeout(timer); timer = setTimeout(() => F.setDoc(F.doc(db, "users", uid), {...d, updatedAt: F.serverTimestamp()}).catch(e => console.error("Firestore:", e)), 800); },
    signIn: () => A.signInWithPopup(auth, new A.GoogleAuthProvider()).catch(e => alertBox("Não deu para entrar: " + (e.code || e.message))),
    signOut: () => A.signOut(auth),
  };
}
function alertBox(msg) { const el = document.getElementById("msg"); if (el) { el.textContent = msg; el.hidden = false; } }
