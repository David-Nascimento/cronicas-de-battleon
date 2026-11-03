// Build sem framework: junta os módulos em dist/app.js e os estilos em dist/app.css.
// Uso:  npm run build   |   npm run dev  (build contínuo + servidor local em http://localhost:5173)
// O dev grava em .dev/ (fora do git) para não mexer no dist/ que vem do GitHub: assim o git pull nunca trava.
import * as esbuild from "esbuild";
import { copyFileSync, cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";

const dev = process.argv.includes("--dev");
const out = dev ? ".dev" : "dist";
const options = {
  entryPoints: { app: "src/main.ts" },
  bundle: true,
  format: "iife",
  outdir: out,
  minify: !dev,
  sourcemap: dev,
  target: ["chrome110", "firefox110", "safari16"],
  loader: { ".json": "json" },
  logLevel: "info",
};

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
copyFileSync("index.html", `${out}/index.html`);
cpSync("public", out, { recursive: true }); // manifest e ícones do app instalável

/* service worker: a versão é o hash do que foi gerado, então cada build novo troca o cache */
function writeSW() {
  const h = createHash("sha256");
  for (const f of [`${out}/app.js`, `${out}/app.css`, `${out}/index.html`]) { try { h.update(readFileSync(f)); } catch {} }
  writeFileSync(`${out}/sw.js`, readFileSync("tools/sw.template.js", "utf8").replace("__VERSION__", h.digest("hex").slice(0, 12)));
}

if (dev) {
  const ctx = await esbuild.context({ ...options, plugins: [{ name: "sw", setup(b) { b.onEnd(writeSW); } }] });
  await ctx.watch();
  /* servidor do dev: o portal (pasta .dev) e a leitura da charpage em /api/char, para o "Meu painel" funcionar */
  const { createServer } = await import("node:http");
  const { extname, join, normalize } = await import("node:path");
  const { createApi } = await import("../server/api.mjs");
  const api = createApi({ base: process.env.AQW_BASE });
  const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json", ".map": "application/json" };
  const root = normalize(join(process.cwd(), out));
  const port = Number(process.env.PORT || 5173);
  createServer(async (req, res) => {
    if (await api(req, res)) return;
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname); if (p.endsWith("/")) p += "index.html";
    const file = normalize(join(root, p));
    if (!file.startsWith(root)) { res.writeHead(404); return res.end(); }
    try { const b = readFileSync(file); res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream", "Cache-Control": "no-store" }); res.end(b); }
    catch { res.writeHead(404); res.end("404"); }
  }).listen(port, () => console.log(`http://localhost:${port}  (edite src/ e recarregue; index.html é copiado só ao iniciar)`));
} else {
  await esbuild.build(options);
  writeSW();
}
