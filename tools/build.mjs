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
  const { port } = await ctx.serve({ servedir: out, port: 5173 });
  console.log(`http://localhost:${port}  (edite src/ e recarregue; index.html é copiado só ao iniciar)`);
} else {
  await esbuild.build(options);
  writeSW();
}
