// Rota /api/char?name=NOME para o servidor local (npm run dev) e para os testes.
// No site no ar quem responde é o Cloudflare Worker (worker.mjs), com o mesmo JSON.
// Cache de 10 minutos por personagem e no máximo 1 consulta nova a cada 5 segundos, para não pesar no site da Artix.
import {AQW_BASE, fetchChar} from "./charpage.mjs";

export function createApi({base = AQW_BASE} = {}) {
  const cache = new Map(); let last = 0;
  return async function handle(req, res) {
    const u = new URL(req.url, "http://x");
    if (u.pathname !== "/api/char") return false;
    const send = (code, body) => { res.writeHead(code, {"Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Access-Control-Allow-Origin": "*"}); res.end(JSON.stringify(body)); };
    const name = (u.searchParams.get("name") || "").trim(), key = name.toLowerCase(), hit = cache.get(key);
    if (hit && Date.now() - hit.t < 10 * 60e3) { send(200, {...hit.v, cached: true}); return true; }
    const wait = 5000 - (Date.now() - last);
    if (wait > 0) { send(429, {ok: false, error: `Aguarde ${Math.ceil(wait / 1000)}s antes de consultar de novo.`, retry: Math.ceil(wait / 1000)}); return true; }
    last = Date.now();
    const v = await fetchChar(name, {base});
    if (v.ok) cache.set(key, {t: Date.now(), v});
    send(v.ok ? 200 : 400, v);
    return true;
  };
}
