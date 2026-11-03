/* Conta do "Meu painel": entrar com Google ou e-mail (Firebase) e guardar na conta o que a pessoa acompanha.
   Sem Firebase configurado (firebase-config.ts), o login funciona em demonstração e tudo fica neste navegador.
   O que vai para a conta é o próprio estado do portal (st): Minhas diárias, marcações do dia, HardFarm,
   Minha tier list, classes que tem, personagem vinculado e quests. Quem entra pela primeira vez leva junto o que
   já tinha neste navegador; nas próximas vezes, vale o que está na conta. */
import {firebaseConfig} from "../firebase-config.js";
import {save, setAfterSave, st} from "../state.js";

export type User = {uid: string; name: string; email?: string; photo?: string; method: "google" | "email" | "guest"};
export const SYNC = ["char", "snap", "own", "dmine", "dly", "dh", "dhide", "drem", "fprog", "ftrack", "quests", "mytier"];
const SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
const SESSION = "cdbConta";
const read = (k: string) => { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (_) { return null; } };
const write = (k: string, v: unknown) => { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch (_) {} };
const pick = () => Object.fromEntries(SYNC.filter(k => st[k] !== undefined).map(k => [k, st[k]]));
const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

const ERR: Record<string, string> = {
  "auth/invalid-credential": "acc_e_cred", "auth/wrong-password": "acc_e_cred", "auth/user-not-found": "acc_e_nouser",
  "auth/email-already-in-use": "acc_e_inuse", "auth/weak-password": "acc_e_weak", "auth/invalid-email": "acc_e_email",
  "auth/too-many-requests": "acc_e_many", "auth/network-request-failed": "acc_e_net", "auth/popup-blocked": "acc_e_popup"};
export const errKey = (e: {code?: string}) => ERR[e && e.code] || "acc_e_generic";

export let user: User | null = read(SESSION);
export const mode: "demo" | "firebase" = firebaseConfig ? "firebase" : "demo";
const subs: (() => void)[] = [];
export const onAccount = (f: () => void) => subs.push(f);
const emit = () => subs.forEach(f => f());
function setUser(u: User | null) { user = u; if (!u || u.method === "guest" || mode === "demo") write(SESSION, u); else write(SESSION, null); emit(); }

/* Firebase: carregado só quando há configuração */
let A: any = null, F: any = null, auth: any = null, db: any = null, timer: any = null;
async function fb() {
  if (auth) return;
  const [{initializeApp}, a, f] = await Promise.all([import(SDK + "firebase-app.js"), import(SDK + "firebase-auth.js"), import(SDK + "firebase-firestore.js")]);
  A = a; F = f; const app = initializeApp(firebaseConfig); auth = A.getAuth(app); db = F.getFirestore(app); auth.languageCode = "pt";
}
function push() { if (mode !== "firebase" || !user || user.method === "guest" || !db) return;
  clearTimeout(timer); timer = setTimeout(() => F.setDoc(F.doc(db, "users", user.uid), {...pick(), updatedAt: F.serverTimestamp()}).catch((e: unknown) => console.error("Firestore:", e)), 800); }

export async function initAccount(onData: () => void) {
  setAfterSave(push);
  if (mode === "demo") return;
  await fb();
  A.onAuthStateChanged(auth, async (u: any) => {
    if (!u) { if (user && user.method !== "guest") setUser(null); return; }
    const ref = F.doc(db, "users", u.uid), snap = await F.getDoc(ref);
    if (snap.exists()) { const d = snap.data(); SYNC.forEach(k => { if (d[k] !== undefined) st[k] = d[k]; }); save(); onData(); }
    else await F.setDoc(ref, {...pick(), updatedAt: F.serverTimestamp()});
    setUser({uid: u.uid, name: u.displayName || (u.email || "").split("@")[0] || "Você", email: u.email || "", photo: u.photoURL || "",
      method: u.providerData[0]?.providerId === "google.com" ? "google" : "email"});
  });
}

export async function google() {
  if (mode === "demo") return setUser({uid: "demo-google", name: "Você", method: "google"});
  await fb();
  try { await A.signInWithPopup(auth, new A.GoogleAuthProvider()); }
  catch (e) { if (e.code !== "auth/popup-closed-by-user" && e.code !== "auth/cancelled-popup-request") throw e; }
}
export async function signIn(email: string, pass: string) {
  if (mode === "demo") { if (!validEmail(email)) throw {code: "auth/invalid-email"}; if (pass.length < 6) throw {code: "auth/invalid-credential"};
    return setUser({uid: "demo-" + email, name: email.split("@")[0], email, method: "email"}); }
  await fb(); await A.signInWithEmailAndPassword(auth, email, pass);
}
export async function signUp(name: string, email: string, pass: string) {
  if (mode === "demo") { if (!validEmail(email)) throw {code: "auth/invalid-email"}; if (pass.length < 6) throw {code: "auth/weak-password"};
    return setUser({uid: "demo-" + email, name: name || email.split("@")[0], email, method: "email"}); }
  await fb(); const c = await A.createUserWithEmailAndPassword(auth, email, pass); if (name) await A.updateProfile(c.user, {displayName: name});
}
export async function reset(email: string) {
  if (mode === "demo") { if (!validEmail(email)) throw {code: "auth/invalid-email"}; return; }
  await fb(); await A.sendPasswordResetEmail(auth, email);
}
export const guest = async () => setUser({uid: "local", name: "", method: "guest"});
export async function signOut() { if (mode === "firebase" && user && user.method !== "guest") { await fb(); await A.signOut(auth); } setUser(null); }
