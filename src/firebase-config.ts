/* Configuração do app web do Firebase (Console do Firebase > Configurações do projeto > Seus apps > SDK).
   Esses valores não são senha: o que protege os dados são as regras do Firestore (firestore.rules).
   Enquanto ficar null, o login do "Meu painel" funciona em demonstração e tudo fica só neste navegador.
   Exemplo:
   export const firebaseConfig = {apiKey: "...", authDomain: "seu-projeto.firebaseapp.com", projectId: "seu-projeto",
     storageBucket: "seu-projeto.appspot.com", messagingSenderId: "...", appId: "..."}; */
export const firebaseConfig: Record<string, string> | null = null;

/* Endereço da leitura da charpage no site publicado: o Cloudflare Worker (server/worker.mjs).
   No computador (localhost) o portal usa a rota /api/char do próprio npm run dev. */
export const API_BASE = "https://cdb-charpage.cronicas-battleon.workers.dev";
