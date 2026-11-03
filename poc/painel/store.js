// Login e dados de cada pessoa.
// Com o Firebase configurado (firebase-config.js): entrar com Google ou com e-mail e senha, e um documento por pessoa
// no Firestore (users/{uid}). "Continuar sem conta" guarda tudo só neste navegador; ao criar a conta depois, esses
// dados vão junto. Sem Firebase configurado, a tela de login funciona em "demonstração": os botões simulam o login
// e nada sai deste navegador. O resto do painel é igual em todos os casos.
import {firebaseConfig} from "./firebase-config.js";

const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const LOCAL_KEY = "cdbPainelPOC", SESSION_KEY = "cdbPainelSessao";
export const EMPTY = () => ({char: "", snap: null, own: [], dMine: [], dDay: "", dDone: [], fprog: {}, ftrack: [], quests: []});
const readJSON = k => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (_) { return null; } };
const writeJSON = (k, v) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} };
const localData = () => ({...EMPTY(), ...(readJSON(LOCAL_KEY) || {})});
const hasLocalData = () => { const d = readJSON(LOCAL_KEY); return !!(d && (d.char || (d.own || []).length || (d.dMine || []).length || (d.ftrack || []).length || (d.quests || []).length)); };

/* mensagens do Firebase em português, pelo que a pessoa pode fazer */
const ERR = {
  "auth/invalid-credential": "E-mail ou senha incorretos.", "auth/wrong-password": "E-mail ou senha incorretos.", "auth/user-not-found": "Não achamos conta com esse e-mail. Crie uma conta.",
  "auth/email-already-in-use": "Esse e-mail já tem conta. Use \"Entrar\".", "auth/weak-password": "A senha precisa de pelo menos 6 caracteres.",
  "auth/invalid-email": "Confira o e-mail: parece incompleto.", "auth/too-many-requests": "Muitas tentativas. Espere alguns minutos e tente de novo.",
  "auth/network-request-failed": "Sem conexão. Confira a internet e tente de novo.", "auth/popup-blocked": "O navegador bloqueou a janela do Google. Permita pop-ups para este site.",
};
export const errText = e => ERR[e && e.code] || "Não deu para entrar agora. Tente de novo.";
const validEmail = s => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

/* onUser(usuário ou null, dados) é chamado ao abrir a página e a cada entrada/saída */
export async function createStore(onUser) {
  const guest = () => ({uid: "local", name: "Sem conta", method: "guest"});
  if (!firebaseConfig) {
    /* demonstração: a "sessão" fica no navegador */
    const start = s => { writeJSON(SESSION_KEY, s); onUser(s, localData()); };
    setTimeout(() => { const s = readJSON(SESSION_KEY); onUser(s, s ? localData() : null); });
    return {
      mode: "demo",
      save: d => writeJSON(LOCAL_KEY, d),
      google: async () => start({uid: "demo-google", name: "Você", email: "", method: "google"}),
      signIn: async (email, pass) => { if (!validEmail(email)) throw {code: "auth/invalid-email"}; if (String(pass).length < 6) throw {code: "auth/invalid-credential"};
        start({uid: "demo-" + email, name: email.split("@")[0], email, method: "email"}); },
      signUp: async (name, email, pass) => { if (!validEmail(email)) throw {code: "auth/invalid-email"}; if (String(pass).length < 6) throw {code: "auth/weak-password"};
        start({uid: "demo-" + email, name: name || email.split("@")[0], email, method: "email"}); },
      reset: async email => { if (!validEmail(email)) throw {code: "auth/invalid-email"}; },
      guest: async () => start(guest()),
      signOut: async () => { writeJSON(SESSION_KEY, null); onUser(null, null); },
    };
  }
  const [{initializeApp}, A, F] = await Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js")]);
  const app = initializeApp(firebaseConfig), auth = A.getAuth(app), db = F.getFirestore(app);
  auth.languageCode = "pt";
  let uid = null, timer = null;
  A.onAuthStateChanged(auth, async u => {
    if (!u) { uid = null; const s = readJSON(SESSION_KEY); onUser(s && s.method === "guest" ? s : null, s && s.method === "guest" ? localData() : null); return; }
    uid = u.uid; writeJSON(SESSION_KEY, null);
    const ref = F.doc(db, "users", uid), snap = await F.getDoc(ref);
    let data = {...EMPTY(), ...(snap.exists() ? snap.data() : {})};
    /* primeira vez com conta: leva o que a pessoa fez sem conta */
    if (!snap.exists() && hasLocalData()) { data = localData(); await F.setDoc(ref, {...data, updatedAt: F.serverTimestamp()}); writeJSON(LOCAL_KEY, null); }
    onUser({uid, name: u.displayName || (u.email || "").split("@")[0] || "Você", email: u.email || "", photo: u.photoURL || "", method: u.providerData[0]?.providerId === "google.com" ? "google" : "email"}, data);
  });
  return {
    mode: "firebase",
    /* com conta, grava no Firestore no máximo a cada 0,8 s; sem conta, no navegador */
    save(d) { if (!uid) return writeJSON(LOCAL_KEY, d); clearTimeout(timer); timer = setTimeout(() => F.setDoc(F.doc(db, "users", uid), {...d, updatedAt: F.serverTimestamp()}).catch(e => console.error("Firestore:", e)), 800); },
    google: () => A.signInWithPopup(auth, new A.GoogleAuthProvider()).catch(e => { if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") throw e; }),
    signIn: (email, pass) => A.signInWithEmailAndPassword(auth, email, pass),
    signUp: async (name, email, pass) => { const c = await A.createUserWithEmailAndPassword(auth, email, pass); if (name) await A.updateProfile(c.user, {displayName: name}); },
    reset: email => A.sendPasswordResetEmail(auth, email),
    guest: async () => { const s = guest(); writeJSON(SESSION_KEY, s); onUser(s, localData()); },
    signOut: async () => { writeJSON(SESSION_KEY, null); if (uid) await A.signOut(auth); else onUser(null, null); },
  };
}
