import MONTH_ from "../data/month.json";
import {DAILIES, REL, SCHED, TEAMS} from "../data/index.js";
import {relDays} from "../features/alerts.js";
import {esc} from "../lib/util.js";
import {L, loc, st} from "../state.js";
import {fmtDay, jn} from "./releases.js";

/* Eventos: tudo o que está no ar num lugar só, por ordem de fim.
   Junta o que vem de month.json (Event Hub e itens com data), os eventos de releases.json com "until"
   e a atualização mais recente; diárias e ultras sazonais ficam no fim. Nada aqui é inventado: o que a
   fonte não diz (data de fim, custo) aparece como "sem data" ou não aparece. */
type Txt = {pt: string; en: string};
type Src = {n: string; u: string};
type MItem = {t: Txt; x?: Txt; j?: string; from?: string; until: string; src?: string};
const M = MONTH_ as unknown as {updated: string; hub: {j: string; x: Txt; src: Src[]}; list: MItem[]};
type Ev = {key: string; name: string; sub?: string; from?: string; until?: string; joins: string[]; x?: string;
  maps?: {j?: string; n: string; w: string}[]; rel?: string; items?: number; rares?: number; once?: boolean; srcs: Src[]};

const lg = () => (st.lang === "en" ? "en" : "pt");
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parse = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const left = (u: string) => Math.round((parse(u).getTime() - parse(iso(new Date())).getTime()) / 864e5);
const uniqSrc = (xs: Src[]) => [...new Map(xs.filter(s => s && s.u).map(s => [s.u, s])).values()];
const SOON = 7;
const firstSentence = (s: string) => { const m = s.match(/^.+?[.!?](?=\s|$)/); return m ? m[0] : s; };

export function liveEvents(): Ev[] {
  const l = lg(), today = iso(new Date()), out: Ev[] = [];
  const month = M.list.filter(x => (!x.from || x.from <= today) && x.until >= today);
  /* eventos de releases.json: as semanas do mesmo evento viram um cartão só */
  const groups = new Map<string, typeof REL>();
  REL.filter(r => r.until && r.until >= today).forEach(r => { const k = r.t.pt.split(":")[0].trim();
    groups.set(k, [...(groups.get(k) || []), r]); });
  groups.forEach((rs, k) => {
    const name = rs[0].t[l].split(":")[0].trim();
    /* o item de month.json do mesmo evento (ex.: "Recompensas do Mogloween") entra neste cartão */
    const mi = month.findIndex(x => x.t.pt.toLowerCase().includes(k.toLowerCase()));
    const m = mi >= 0 ? month.splice(mi, 1)[0] : null;
    const from = [m && m.from, ...rs.map(r => r.from)].filter(Boolean).sort()[0];
    const maps = [...new Map(rs.flatMap(r => r.maps).map(x => [x.j || x.n, x])).values()].map(x => ({j: x.j, n: x.n, w: x.w[l]}));
    const all = rs.flatMap(r => Object.values(r.items).flat()) as string[][];
    out.push({key: "rel-" + k, name, sub: m && m.x ? m.x[l] : rs[rs.length - 1].t[l].split(":").slice(1).join(":").trim(), from, until: rs[0].until,
      joins: maps.filter(x => x.j).map(x => x.j), maps, rel: rs[0].id, items: all.length, rares: all.filter(i => (i[1] || "").includes("r")).length,
      once: true, srcs: uniqSrc([...(m && m.src ? [{n: m.t[l], u: m.src}] : []), ...rs.flatMap(r => r.src)])});
  });
  month.forEach((x, i) => out.push({key: "m-" + i, name: x.t[l], x: x.x ? x.x[l] : "", from: x.from, until: x.until, joins: x.j ? [x.j] : [], srcs: x.src ? [{n: x.t[l], u: x.src}] : []}));
  out.push({key: "hub", name: "Event Hub", x: M.hub.x[l], joins: [M.hub.j], srcs: M.hub.src});
  /* a atualização mais recente, quando não é parte de um evento com data e saiu há até 7 dias */
  const r = REL[0];
  if (r && !r.until && left(r.from) >= -7) {
    const all = Object.values(r.items).flat() as string[][];
    out.push({key: "rel-" + r.id, name: r.t[l].split(":")[0].trim(), sub: L("ev_since", {d: fmtDay(r.from)}), from: r.from,
      joins: r.maps.filter(x => x.j).map(x => x.j), x: firstSentence(r.x[l]), rel: r.id, items: all.length, rares: all.filter(i => (i[1] || "").includes("r")).length, srcs: r.src.slice(0, 2)});
  }
  return out.sort((a, b) => (a.until || "9999").localeCompare(b.until || "9999"));
}
export const endingSoon = () => liveEvents().filter(e => e.until && left(e.until) <= SOON);

const whenTxt = (e: Ev) => e.until ? L("ev_until", {d: fmtDay(e.until)}) : L("ev_nodate");
const leftTxt = (e: Ev) => { if (!e.until) return ""; const d = left(e.until); return d <= 0 ? L("m_last") : relDays(d); };
const joins = (js: string[], max = 99) => js.slice(0, max).map(j => jn(j)).join("") + (js.length > max ? `<span class="evMore">${L("ev_more_maps", {n: js.length - max})}</span>` : "");
const srcLinks = (xs: Src[]) => xs.map(s => `<a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)}</a>`).join(", ");
const itemsLink = (e: Ev) => e.rel ? `<button class="linkBtn" data-relgo="${e.rel}">${L("ev_items", {n: e.items})}</button>` : "";

function card(e: Ev) {
  const rows: string[] = [];
  if (e.from || e.until) rows.push(`<dt>${L("ev_period")}</dt><dd>${e.from ? fmtDay(e.from) : "…"} – ${e.until ? fmtDay(e.until) : L("ev_nodate")}</dd>`);
  if (e.joins.length) rows.push(`<dt>${L("ev_where")}</dt><dd class="evJoins">${joins(e.joins, 3)}</dd>`);
  const mli = (ms: {n: string; w: string}[]) => ms.map(m => `<li><b>${esc(m.n)}</b> ${esc(m.w)}</li>`).join("");
  if (e.maps && e.maps.length) rows.push(`<dt>${L("ev_what")}</dt><dd><ul class="evMaps">${mli(e.maps.slice(0, 3))}</ul>${e.maps.length > 3 ? `<details class="evMoreD"><summary>${L("ev_more_maps", {n: e.maps.length - 3})}</summary><ul class="evMaps">${mli(e.maps.slice(3))}</ul></details>` : ""}</dd>`);
  else if (e.x) rows.push(`<dt>${L("ev_what")}</dt><dd>${esc(e.x)}</dd>`);
  if (e.items) rows.push(`<dt>${L("ev_itemsh")}</dt><dd>${L("ev_count", {n: e.items})}${e.rares ? ` · <span class="evRare">${L("ev_rares", {n: e.rares})}</span>` : ""}</dd>`);
  if (e.once) rows.push(`<dt>${L("ev_daily")}</dt><dd class="evMuted">${L("ev_once")}</dd>`);
  return `<article class="evCard frame" id="ev-${esc(e.key)}">
    <div class="evTop"><div><h3>${esc(e.name)}</h3>${e.sub ? `<p class="evSub">${esc(e.sub)}</p>` : ""}</div><span class="evLeft${e.until && left(e.until) <= SOON ? " soon" : ""}">${leftTxt(e) || whenTxt(e)}</span></div>
    <dl class="evFacts">${rows.join("")}</dl>
    <div class="evFoot">${itemsLink(e)}${e.srcs.length ? `<span class="evSrc">${L("rel_src")}: ${srcLinks(e.srcs.slice(0, 3))}${e.srcs.length > 3 ? ` <details class="evSrcMore"><summary>+${e.srcs.length - 3}</summary>${srcLinks(e.srcs.slice(3))}</details>` : ""}</span>` : ""}</div>
  </article>`;
}
function row(e: Ev) {
  return `<li class="evRow" id="ev-${esc(e.key)}">
    <span class="evName"><b>${esc(e.name)}</b>${e.sub ? `<small>${esc(e.sub)}</small>` : ""}</span>
    <span class="evJoins">${joins(e.joins, 2)}</span>
    <span class="evX">${esc(e.x || (e.maps || []).map(m => m.n).join(", "))}${e.rel ? ` ${itemsLink(e)}` : ""}</span>
    <span class="evWhen">${e.until ? `${fmtDay(e.until)}<small>${leftTxt(e)}</small>` : `<span class="evMuted">${L("ev_nodate")}</span>`}</span>
  </li>`;
}
/* linha do tempo do mês corrente: barra cheia = fim confirmado; tracejada = sem data de fim */
function timeline(evs: Ev[]) {
  const now = new Date(), y = now.getFullYear(), mo = now.getMonth(), days = new Date(y, mo + 1, 0).getDate();
  const first = iso(new Date(y, mo, 1)), last = iso(new Date(y, mo, days)), pct = (d: number) => ((d - 1) / days * 100).toFixed(2);
  const dayOf = (s: string) => s < first ? 1 : s > last ? days + 1 : parse(s).getDate();
  const xs = evs.filter(e => (!e.from || e.from <= last) && (!e.until || e.until >= first));
  const today = now.getDate(), mName = now.toLocaleDateString(loc(), {month: "long"});
  const ticks = [1, today, days].filter((d, i, a) => a.indexOf(d) === i).map(d => `<span style="left:${pct(d)}%"${d === today ? ` class="t"` : ""}>${d === today ? L("ev_today", {d}) : d}</span>`).join("");
  const bars = xs.map(e => { const a = e.from ? dayOf(e.from) : 1, b = e.until ? dayOf(e.until) + 1 : days + 1;
    const cls = !e.until ? "open" : left(e.until) <= SOON ? "soon" : "";
    return `<span class="evTlN">${esc(e.name)}</span><div class="evTrack"><i class="evBar ${cls}" style="left:${pct(a)}%;width:${(Math.max(b - a, .6) / days * 100).toFixed(2)}%"></i>${e.until ? `<em style="left:calc(${pct(Math.min(b, days))}% + 6px)">${fmtDay(e.until)}</em>` : ""}<b class="evNow" style="left:${((today - .5) / days * 100).toFixed(2)}%"></b></div>`; }).join("");
  return `<section class="evSec" aria-labelledby="evTlH"><div class="evSecH"><h3 id="evTlH">${esc(mName[0].toUpperCase() + mName.slice(1))}</h3><span class="evMuted">${L("ev_tl_key")}</span></div>
    <div class="evTl"><div class="evTlGrid"><span></span><div class="evTicks">${ticks}</div>${bars}</div></div></section>`;
}
function seasonal() {
  const l = lg(), mNow = new Date().getMonth() + 1;
  const xs = DAILIES.filter(d => d.g === "season");
  if (!xs.length) return "";
  return `<section class="evSec" aria-labelledby="evSdH"><div class="evSecH"><h3 id="evSdH">${L("ev_sd_h")}</h3><span class="evMuted">${L("daily_season_note")}</span></div>
    <div class="evSd">${xs.map(d => { const j = (d.j || [])[0], t = j && TEAMS.find(t => (t.map || "").replace("/", "") === j), sc = t ? SCHED[t.n] : null;
      const when = typeof sc === "number" ? (sc === mNow ? `<span class="pill on">${L("ag_now")}</span>` : `<span class="evMuted">${L("ag_back", {m: new Date(2026, sc - 1, 1).toLocaleDateString(loc(), {month: "long"})})}</span>`) : "";
      const name = l === "en" && d.ne ? d.ne : d.n;
      return `<div class="evSdI frame"><b>${esc(name)}</b>${when}<small>${esc(d.rw ? d.rw[l] : "")}</small><span class="evSdF">${j ? jn(j) : ""}</span></div>`; }).join("")}</div>
    <button class="linkBtn" data-goseason>${L("ev_sd_open")}</button></section>`;
}
export function renderEvents() {
  const box = document.getElementById("evBody"); if (!box) return;
  const evs = liveEvents(), soon = evs.filter(e => e.until && left(e.until) <= SOON), rest = evs.filter(e => !soon.includes(e));
  const now = new Date(), d = new Date(now.getFullYear(), now.getMonth(), now.getDate()), fri = (5 - d.getDay() + 7) % 7;
  const nf = new Date(d); nf.setDate(d.getDate() + fri);
  const upd = [M.updated, ...REL.map(r => r.from)].sort().pop();
  box.innerHTML = `<dl class="evSum">
      <div><dt>${L("ev_s_live")}</dt><dd>${evs.length}</dd></div>
      <div><dt>${L("ev_s_soon")}</dt><dd class="${soon.length ? "soon" : ""}">${soon.length}</dd></div>
      <div><dt>${L("ev_s_reset")}</dt><dd>${nf.toLocaleDateString(loc(), {weekday: "short", day: "numeric", month: "short"}).replace(/\./g, "")}</dd></div>
      <div><dt>${L("ev_s_upd")}</dt><dd>${upd ? fmtDay(upd) : "—"}</dd></div>
    </dl>
    ${timeline(evs)}
    ${soon.length ? `<section class="evSec" aria-labelledby="evSoonH"><div class="evSecH"><h3 id="evSoonH">${L("ev_soon_h")}</h3></div><div class="evCards">${soon.map(card).join("")}</div></section>` : ""}
    ${rest.length ? `<section class="evSec" aria-labelledby="evRestH"><div class="evSecH"><h3 id="evRestH">${L(soon.length ? "ev_rest_h" : "ev_all_h")}</h3></div>
      <ul class="evTable frame"><li class="evRow evHead" aria-hidden="true"><span>${L("ev_col_e")}</span><span>${L("ev_where")}</span><span>${L("ev_what")}</span><span>${L("ev_col_u")}</span></li>${rest.map(row).join("")}</ul></section>` : ""}
    ${seasonal()}`;
}
