/* Neste mês: o Event Hub (/join eventhub) e o que está no ar com data para acabar (month.json).
   Aparece na página Hoje e na aba Sazonais das Diárias. Itens fora da data somem sozinhos. */
import MONTH_ from "../data/month.json";
import {esc} from "../lib/util.js";
import {L, st} from "../state.js";
import {fmtDay, jn} from "../views/releases.js";

type Txt = {pt: string; en: string};
type MItem = {t: Txt; x?: Txt; j?: string; from?: string; until: string; src?: string};
const M = MONTH_ as unknown as {updated: string; hub: {j: string; x: Txt; src: {n: string; u: string}[]}; list: MItem[]};
const lg = () => (st.lang === "en" ? "en" : "pt");
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const monthNow = () => { const t = iso(new Date()); return M.list.filter(x => (!x.from || x.from <= t) && x.until >= t).sort((a, b) => a.until.localeCompare(b.until)); };
const left = (u: string) => Math.round((new Date(u + "T12:00").getTime() - new Date(iso(new Date()) + "T12:00").getTime()) / 864e5);

/* versão compacta (página Hoje) ou completa (Sazonais) */
export function monthHtml(full: boolean) {
  const l = lg(), xs = monthNow();
  const hub = `<div class="mHub"><div class="mHubTop"><b>Event Hub</b>${jn(M.hub.j)}</div><p>${esc(M.hub.x[l])}</p></div>`;
  const rows = xs.map(x => { const d = left(x.until);
    return `<li class="mRow"><span class="mTx"><b>${esc(x.t[l])}</b>${full && x.x ? `<small>${esc(x.x[l])}</small>` : ""}${x.j && full ? jn(x.j) : ""}</span><span class="pill ${d <= 3 ? "on" : "soon"}">${d <= 0 ? L("m_last") : L("m_until", {d: fmtDay(x.until)})}</span></li>`; }).join("");
  const src = full ? `<p class="relSrc">${L("rel_src")}: ${[...M.hub.src, ...xs.filter(x => x.src).map(x => ({n: x.t[l], u: x.src}))].map(s => `<a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)}</a>`).join("")}</p>` : "";
  return `<div class="mBox">${hub}${xs.length ? `<h4 class="mH">${L("m_now")}</h4><ul class="mList">${rows}</ul>` : ""}${src}</div>`;
}
