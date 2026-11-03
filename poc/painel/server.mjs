// POC do painel: servidor local sem dependências.
//   node poc/painel/server.mjs        → http://localhost:5180/poc/painel/
// Serve os arquivos do projeto (o painel usa os JSON de src/data) e a rota /api/char?name=NOME,
// que lê a charpage pública do AQW pelo servidor (o navegador não pode ler o site da Artix direto).
// Cache de 10 minutos por personagem e no máximo 1 consulta nova a cada 5 segundos, para não pesar no site da Artix.
// Variáveis: PORT (5180), AQW_BASE (para testes com uma charpage falsa), DEBUG=1 (salva o HTML lido em poc/painel/debug/).
import {createServer} from "node:http";
import {readFile, mkdir, writeFile} from "node:fs/promises";
import {extname, join, normalize, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {AQW_BASE, fetchChar} from "./charpage.mjs";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const PORT = Number(process.env.PORT || 5180);
const BASE = process.env.AQW_BASE || AQW_BASE;
const DEBUG = process.env.DEBUG === "1";
const TYPES = {".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json"};

const cache = new Map(); let last = 0;
async function charApi(name) {
  const key = name.toLowerCase(), hit = cache.get(key);
  if (hit && Date.now() - hit.t < 10 * 60e3) return {...hit.v, cached: true};
  const wait = 5000 - (Date.now() - last);
  if (wait > 0) return {ok: false, error: `Aguarde ${Math.ceil(wait / 1000)}s antes de consultar de novo.`, retry: Math.ceil(wait / 1000)};
  last = Date.now();
  const fetchImpl = DEBUG ? async (u, o) => { const r = await fetch(u, o); const t = await r.clone().text();
    await mkdir(join(root, "poc/painel/debug"), {recursive: true});
    await writeFile(join(root, "poc/painel/debug", u.replace(/[^a-z0-9]+/gi, "_").slice(-80) + ".txt"), t); return r; } : fetch;
  const v = await fetchChar(name, {base: BASE, fetchImpl});
  if (v.ok) cache.set(key, {t: Date.now(), v});
  return v;
}

createServer(async (req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/api/char") {
    const v = await charApi(u.searchParams.get("name") || "");
    res.writeHead(v.ok ? 200 : v.retry ? 429 : 400, {"Content-Type": TYPES[".json"], "Cache-Control": "no-store"});
    return res.end(JSON.stringify(v));
  }
  if (u.pathname === "/") { res.writeHead(302, {Location: "/poc/painel/"}); return res.end(); }
  let p = decodeURIComponent(u.pathname); if (p.endsWith("/")) p += "index.html";
  const file = normalize(join(root, p));
  /* só serve o painel e os dados do portal */
  if (!file.startsWith(join(root, "poc/painel")) && !file.startsWith(join(root, "src/data")) && !file.startsWith(join(root, "public"))) { res.writeHead(404); return res.end("404"); }
  try { const b = await readFile(file); res.writeHead(200, {"Content-Type": TYPES[extname(file)] || "application/octet-stream"}); res.end(b); }
  catch { res.writeHead(404); res.end("404"); }
}).listen(PORT, () => console.log(`Painel (POC): http://localhost:${PORT}/poc/painel/   (charpage: ${BASE})`));
