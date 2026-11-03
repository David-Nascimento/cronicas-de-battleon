// Leitura da charpage como Cloudflare Worker (plano gratuito: 100 mil acessos por dia).
// Publica com: npx wrangler deploy  (na pasta poc/painel; veja LEIAME.md, "Tudo gratuito").
// Rota: GET /api/char?name=NOME  →  o mesmo JSON do server.mjs local.
import {fetchChar} from "./charpage.mjs";

/* só estes sites podem chamar a leitura (o painel no ar e o teste local); ajuste em wrangler.toml, ALLOWED_ORIGINS */
function cors(req, env) {
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  const o = req.headers.get("Origin") || "";
  return {"Access-Control-Allow-Origin": allowed.includes(o) ? o : allowed[0] || "*", "Vary": "Origin", "Access-Control-Allow-Methods": "GET, OPTIONS"};
}
const json = (body, status, extra) => new Response(JSON.stringify(body), {status, headers: {"Content-Type": "application/json; charset=utf-8", ...extra}});

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url), h = cors(req, env);
    if (req.method === "OPTIONS") return new Response(null, {status: 204, headers: h});
    if (url.pathname !== "/api/char") return json({ok: false, error: "Rota não encontrada."}, 404, h);
    const name = (url.searchParams.get("name") || "").trim();
    /* cache de 10 minutos por personagem, para não pesar no site da Artix. Observação: no endereço *.workers.dev o
       cache do Cloudflare não guarda nada; aí vale o Cache-Control (o navegador reaproveita por 10 minutos) */
    const key = new Request(`https://cache.local/char/${encodeURIComponent(name.toLowerCase())}`);
    const hit = await caches.default.match(key);
    if (hit) { const r = new Response(hit.body, hit); Object.entries(h).forEach(([k, v]) => r.headers.set(k, v)); r.headers.set("X-Cache", "HIT"); return r; }
    const v = await fetchChar(name);
    const res = json(v, v.ok ? 200 : 400, {...h, "Cache-Control": v.ok ? "public, max-age=600" : "no-store"});
    if (v.ok) ctx.waitUntil(caches.default.put(key, res.clone()));
    return res;
  },
};
