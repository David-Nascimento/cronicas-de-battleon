// Build sem framework: junta os módulos em dist/app.js e os estilos em dist/app.css.
// Uso:  npm run build   |   npm run dev  (build contínuo + servidor local em http://localhost:5173)
import * as esbuild from "esbuild";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";

const dev = process.argv.includes("--dev");
const options = {
  entryPoints: { app: "src/main.ts" },
  bundle: true,
  format: "iife",
  outdir: "dist",
  minify: !dev,
  sourcemap: dev,
  target: ["chrome110", "firefox110", "safari16"],
  loader: { ".json": "json" },
  logLevel: "info",
};

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
copyFileSync("index.html", "dist/index.html");

if (dev) {
  const ctx = await esbuild.context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: "dist", port: 5173 });
  console.log(`http://localhost:${port}  (edite src/ e recarregue; index.html é copiado só ao iniciar)`);
} else {
  await esbuild.build(options);
}
