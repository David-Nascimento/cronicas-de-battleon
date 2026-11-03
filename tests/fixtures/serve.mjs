// Servidor dos testes: serve o dist/ e a rota /api/char, lendo uma charpage falsa (não acessa a Artix).
import {createServer} from "node:http";
import {readFileSync} from "node:fs";
import {extname, join, normalize} from "node:path";
import {createApi} from "../../server/api.mjs";
import {HTML, INV} from "./charpage.mjs";

export async function startTestServer(root, port = 5199, upPort = 5198) {
  const up = createServer((req, res) => {
    if (req.url.startsWith("/CharPage?id=BGP")) { res.writeHead(200, {"Content-Type": "text/html"}); return res.end(HTML); }
    if (req.url.startsWith("/CharPage/Inventory?ccid=98765432")) { res.writeHead(200, {"Content-Type": "application/json"}); return res.end(JSON.stringify(INV)); }
    res.writeHead(200, {"Content-Type": "text/html"}); res.end("<html><body>Character not found</body></html>");
  });
  await new Promise(r => up.listen(upPort, r));
  const api = createApi({base: `http://localhost:${upPort}`});
  const T = {".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".webmanifest": "application/manifest+json"};
  const srv = createServer(async (req, res) => {
    if (await api(req, res)) return;
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
    try { res.writeHead(200, {"Content-Type": T[extname(p)] || "application/octet-stream"}); res.end(readFileSync(normalize(join(root, p)))); } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(r => srv.listen(port, r));
  return {url: `http://localhost:${port}/`, close: () => { srv.close(); up.close(); }};
}
