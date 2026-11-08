/* Compartilhar a tier list: link (a lista vai dentro do endereço, comprimida) e imagem PNG.
   Formato do link: ?tl=<z|j><base64url>#tier, com z = JSON comprimido (deflate) e j = JSON puro.
   O JSON é {m:modo, S:[nomes], A, B, C}; quem não está em nenhum tier fica de fora. */
import {TIERS} from "../config.js";
import {tColor} from "../lib/util.js";

export type Shared = {m: string; S: string[]; A: string[]; B: string[]; C: string[]};

const b64 = (u8: Uint8Array) => btoa(String.fromCharCode(...u8)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64 = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0));
async function pipe(u8: Uint8Array, stream: any): Promise<Uint8Array> {
  return new Uint8Array(await new Response(new Blob([u8 as any]).stream().pipeThrough(stream)).arrayBuffer());
}

export async function encodeTier(t: Shared): Promise<string> {
  const raw = new TextEncoder().encode(JSON.stringify(t));
  try { if ("CompressionStream" in window) return "z" + b64(await pipe(raw, new (window as any).CompressionStream("deflate-raw"))); } catch (_) {}
  return "j" + b64(raw);
}
export async function decodeTier(s: string): Promise<Shared | null> {
  try {
    let u8: Uint8Array = unb64(s.slice(1));
    if (s[0] === "z") u8 = await pipe(u8, new (window as any).DecompressionStream("deflate-raw"));
    else if (s[0] !== "j") return null;
    const o = JSON.parse(new TextDecoder().decode(u8));
    if (!o || typeof o.m !== "string") return null;
    const r: Shared = {m: o.m, S: [], A: [], B: [], C: []};
    TIERS.forEach(k => { r[k] = Array.isArray(o[k]) ? o[k].filter((x: any) => typeof x === "string").slice(0, 400) : []; });
    return r;
  } catch (_) { return null; }
}
export async function tierLink(t: Shared): Promise<string> {
  const u = new URL(location.href);
  u.search = "?tl=" + (await encodeTier(t)); u.hash = "tier";
  return u.toString();
}

/* imagem: fundo do tema, uma faixa por tier com o nome das classes em etiquetas */
export async function tierImage(t: Shared, title: string, sub: string, foot: string): Promise<Blob> {
  const cs = getComputedStyle(document.documentElement), v = (k: string, d: string) => cs.getPropertyValue(k).trim() || d;
  const bg = v("--bg", "#151020"), panel = v("--panel", "#201a2c"), ink = v("--ink", "#ece4d4"), muted = v("--muted", "#a99fb6"), glow = v("--glow", "#FFB45A"), line = v("--line2", "#352c44");
  try { await (document as any).fonts?.ready; } catch (_) {}
  const W = 1200, P = 40, LW = 96, GAP = 8, CH = 36, font = "600 17px Barlow, 'Segoe UI', system-ui, sans-serif";
  const cv = document.createElement("canvas"), x = cv.getContext("2d");
  x.font = font;
  /* calcula as quebras de linha de cada tier antes de saber a altura */
  const inner = W - P * 2 - LW - 24;
  const rows = TIERS.map(k => {
    const lines: string[][] = [[]]; let w = 0;
    (t[k] as string[]).forEach(n => { const cw = x.measureText(n).width + 28; if (w + cw > inner && lines[lines.length - 1].length) { lines.push([]); w = 0; } lines[lines.length - 1].push(n); w += cw + GAP; });
    return {k, lines, h: Math.max(1, lines.length) * (CH + GAP) + 16};
  });
  const H = P + 70 + rows.reduce((s, r) => s + r.h + 10, 0) + 40 + P;
  const dpr = 2; cv.width = W * dpr; cv.height = H * dpr; x.scale(dpr, dpr);
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  /* as cores do tema e dos tiers vêm como var(--x) ou color-mix; o canvas precisa da cor resolvida */
  const probe = document.createElement("i"); document.body.appendChild(probe);
  const col = (c: string) => { probe.style.color = ""; probe.style.color = c; return getComputedStyle(probe).color; };
  const tc: Record<string, string> = {}; TIERS.forEach(k => tc[k] = col(tColor(k)));
  const halo = col(`color-mix(in srgb, ${glow} 22%, transparent)`), clear = col(`color-mix(in srgb, ${glow} 0%, transparent)`); probe.remove();
  const g = x.createRadialGradient(W, 0, 0, W, 0, 600); g.addColorStop(0, halo); g.addColorStop(1, clear); x.fillStyle = g; x.fillRect(0, 0, W, H);
  x.fillStyle = ink; x.font = "700 34px Texturina, Georgia, serif"; x.textBaseline = "alphabetic"; x.fillText(title, P, P + 34);
  x.fillStyle = muted; x.font = "500 18px Barlow, 'Segoe UI', system-ui, sans-serif"; x.fillText(sub, P, P + 62);
  let y = P + 86;
  const rr = (X: number, Y: number, w: number, h: number, r: number) => { x.beginPath(); (x as any).roundRect ? (x as any).roundRect(X, Y, w, h, r) : x.rect(X, Y, w, h); };
  rows.forEach(r => {
    x.fillStyle = panel; rr(P, y, W - P * 2, r.h, 14); x.fill(); x.strokeStyle = line; x.lineWidth = 1; x.stroke();
    x.fillStyle = tc[r.k]; rr(P, y, LW, r.h, 14); x.fill();
    x.fillStyle = "#14101c"; x.font = "800 40px Barlow, 'Segoe UI', system-ui, sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(r.k, P + LW / 2, y + r.h / 2 + 1);
    x.textAlign = "left"; x.font = font;
    if (!r.lines[0].length) { x.fillStyle = muted; x.fillText("—", P + LW + 20, y + 8 + CH / 2); }
    r.lines.forEach((ln, i) => { let cx = P + LW + 16; const cy = y + 8 + i * (CH + GAP);
      ln.forEach(n => { const w = x.measureText(n).width + 28; x.fillStyle = bg; rr(cx, cy, w, CH, 9); x.fill(); x.strokeStyle = line; x.stroke(); x.fillStyle = ink; x.fillText(n, cx + 14, cy + CH / 2 + 1); cx += w + GAP; }); });
    y += r.h + 10;
  });
  x.fillStyle = muted; x.font = "500 15px Barlow, 'Segoe UI', system-ui, sans-serif"; x.textBaseline = "alphabetic"; x.fillText(foot, P, H - P + 6);
  return await new Promise<Blob>(res => cv.toBlob(b => res(b), "image/png"));
}
