/* Meu painel: login + a tela do usuário (personagem vinculado, diárias de hoje, farms acompanhados, classes, ultras e quests).
   Usa o mesmo estado do portal: o que se marca aqui aparece nas abas Diárias, HardFarm e Montador, e vice-versa. */
import {API_BASE} from "../firebase-config.js";
import {D, DAILIES, FARMS, TEAMS, byName, relClassAny} from "../data/index.js";
import * as acc from "../features/account.js";
import {toast} from "../features/toasts.js";
import {esc, idx, sigil, tColor, tierTxt, wiki} from "../lib/util.js";
import {L, save, st} from "../state.js";
import type {Klass} from "../types.js";
import {doneToday, toggleDaily} from "./dailies.js";
import {prog, stepHtml, toggleTrack, tracked} from "./farms.js";
import {overall} from "./tiers.js";

const root = document.getElementById("pnl");
const lg = () => (st.lang === "en" ? "en" : "pt");
let tab = "resumo", cf = "tenho", cq = "", busy = false, amode = "in", abusy = false, amsg: {t: string; ok?: boolean} | null = null, aval: Record<string, string> = {};
const av = (k: string) => esc(aval[k] || "");
const ckey = (n: string) => n.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
type Snap = {name: string; url: string; fetchedAt: string; level: number | null; cls: string; faction: string; guild: string; equip: Record<string, string>; invClasses: string[]; warnings: string[]};
const snap = () => st.snap as Snap | null;

/* classes: as do inventário do personagem (não dá para desmarcar) + as marcadas à mão (st.own, o mesmo do Montador) */
function owned() {
  const auto = new Set<string>(), extra: string[] = [], s = snap();
  (s?.invClasses || []).forEach(n => { const c = relClassAny(n); if (c && byName[c] != null) auto.add(c); else extra.push(n); });
  if (s?.cls) { const c = relClassAny(s.cls); if (c && byName[c] != null) auto.add(c); }
  return {auto, all: new Set([...auto, ...((st.own as string[]) || []).filter(n => byName[n] != null)]), extra};
}
const farmDone = f => (f.cls && owned().all.has(f.cls)) || prog(f.n).size >= f.req.length;
const nextStep = f => f.req.findIndex((_, i) => !prog(f.n).has(i));
const myDailies = () => DAILIES.filter(d => ((st.dmine as string[]) || []).includes(d.id));
const quests = () => ((st.quests as {id: string; n: string; j?: string; note?: string; st: string}[]) || []);
const jn = (m: string) => `<code class="jn s" data-j="${esc(m)}" title="${esc(L("farm_copy_j", {m}))}">/${esc(m)}</code>`;

export function renderPainel() {
  renderAcct();
  if (!acc.user) { root.innerHTML = authHtml(); return; }
  const o = owned(), md = myDailies(), done = doneToday();
  const n = {classes: o.all.size, quests: quests().filter(q => q.st !== "done").length};
  const TABS = [["resumo", L("pn_t_res")], ["classes", L("pn_t_cls"), n.classes], ["ultras", L("pn_t_ult")], ["quests", L("pn_t_qst"), n.quests || ""]];
  const u = acc.user, who = u.method === "guest" ? L("acc_m_guest") : u.method === "google" ? L("acc_m_google") : (u.email || L("acc_m_email"));
  root.innerHTML = `${acc.mode === "demo" ? `<p class="pnDemo">${L("acc_demo")}</p>` : ""}
    <div class="pnTop"><div><h2 class="pnTitle">${u.method === "guest" ? L("pn_title") : L("pn_hello", {n: esc(u.name)})}</h2><small>${esc(who)}</small></div>
      <div class="pnRow">${u.method === "guest" ? `<button class="btnG" data-pcreate>${L("acc_up")}</button>` : ""}<button class="btnQ" data-signout>${L("acc_out")}</button></div></div>
    <div class="pnTabs" role="tablist">${TABS.map(([k, l, c]) => `<button role="tab" data-pt="${k}" aria-selected="${tab === k}">${l}${c ? ` <b>${c}</b>` : ""}</button>`).join("")}</div>
    <div class="pnBody">${({resumo, classes, ultras, quests: questsTab})[tab](o, md, done)}</div>`;
}

/* ---------- conta no topo ---------- */
export function renderAcct() {
  const b = document.getElementById("acctBtn"), u = acc.user;
  if (!b) return;
  b.innerHTML = u && u.method !== "guest" ? (u.photo ? `<img src="${esc(u.photo)}" alt="">` : `<span class="ava">${esc((u.name || "?")[0].toUpperCase())}</span>`) + `<span class="acctN">${esc(u.name)}</span>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z" fill="currentColor"/></svg><span class="acctN">${L(u ? "pn_title" : "acc_enter")}</span>`;
  b.setAttribute("aria-label", L("pn_title"));
}

/* ---------- login ---------- */
const G = `<svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
function authHtml() {
  const up = amode === "up", reset = amode === "reset";
  const msg = amsg ? `<p class="aMsg ${amsg.ok ? "ok" : "err"}" role="${amsg.ok ? "status" : "alert"}">${esc(amsg.t)}</p>` : "";
  const card = reset ? `
    <h2>${L("acc_reset_h")}</h2><p class="aSub">${L("acc_reset_x")}</p>${msg}
    <form class="aForm" data-aform="reset" novalidate><label>${L("acc_email")}<input name="email" type="email" autocomplete="email" required value="${av("email")}"></label>
      <button class="btnG wide" ${abusy ? "disabled" : ""}>${L(abusy ? "acc_sending" : "acc_send")}</button></form>
    <button class="linkBtn" data-auth="in">${L("acc_back")}</button>` : `
    <div class="aTabs" role="tablist"><button role="tab" data-auth="in" aria-selected="${!up}">${L("acc_in")}</button><button role="tab" data-auth="up" aria-selected="${up}">${L("acc_up")}</button></div>${msg}
    <button class="gBtn" data-agoogle ${abusy ? "disabled" : ""}>${G}<span>${L(up ? "acc_g_up" : "acc_g_in")}</span></button>
    <p class="aOr"><span>${L("acc_or")}</span></p>
    <form class="aForm" data-aform="${amode}" novalidate>
      ${up ? `<label>${L("acc_name")}<input name="name" autocomplete="nickname" maxlength="40" placeholder="${esc(L("acc_name_ph"))}" value="${av("name")}"></label>` : ""}
      <label>${L("acc_email")}<input name="email" type="email" autocomplete="email" required value="${av("email")}"></label>
      <label>${L("acc_pass")}<span class="pw"><input name="pass" type="password" autocomplete="${up ? "new-password" : "current-password"}" required minlength="6" value="${av("pass")}"><button type="button" class="linkBtn" data-pw>${L("acc_show")}</button></span>${up ? `<small>${L("acc_pass_min")}</small>` : ""}</label>
      <button class="btnG wide" ${abusy ? "disabled" : ""}>${L(abusy ? (up ? "acc_creating" : "acc_entering") : (up ? "acc_up" : "acc_in"))}</button>
    </form>
    ${up ? "" : `<button class="linkBtn" data-auth="reset">${L("acc_forgot")}</button>`}
    <div class="aGuest"><button class="btnQ wide" data-aguest>${L("acc_guest")}</button><small>${L("acc_guest_x")}</small></div>`;
  return `${acc.mode === "demo" ? `<p class="pnDemo">${L("acc_demo")}</p>` : ""}
  <section class="auth">
    <div class="authHero">
      <h2 class="authH">${L("acc_h")}</h2>
      <p class="authLead">${L("acc_lead")}</p>
      <ul class="authList"><li><b>${L("acc_b1")}</b><span>${L("acc_b1x")}</span></li><li><b>${L("acc_b2")}</b><span>${L("acc_b2x")}</span></li><li><b>${L("acc_b3")}</b><span>${L("acc_b3x")}</span></li></ul>
      <p class="authSafe">${L("acc_safe")}</p>
    </div>
    <div class="authCard frame">${card}</div>
  </section>`;
}
async function authRun(fn: () => Promise<unknown>) {
  abusy = true; amsg = null; renderPainel();
  try { await fn(); } catch (e) { amsg = {t: L(acc.errKey(e))}; }
  abusy = false; renderPainel();
}

/* ---------- abas ---------- */
const crest = `<svg aria-hidden="true"><use href="#crest"/></svg>`;
function charCard() {
  const s = snap();
  if (!s) return `<article class="pnChar frame"><div class="pnCrest">${crest}</div><div>
    <h3>${L("pn_link_h")}</h3><p class="pnSub">${L("pn_link_x")}</p>
    <form class="pnLink" data-link><input name="n" placeholder="${esc(L("pn_link_ph"))}" autocomplete="off" required maxlength="32" value="${esc(String(st.char || ""))}"><button class="btnG" ${busy ? "disabled" : ""}>${L(busy ? "pn_linking" : "pn_link_btn")}</button></form></div></article>`;
  const SL = {weapon: "pn_s_weapon", armor: "pn_s_armor", helm: "pn_s_helm", cape: "pn_s_cape", pet: "pn_s_pet", misc: "pn_s_misc"};
  return `<article class="pnChar frame"><div class="pnCrest">${crest}</div><div>
    <p class="pnName">${esc(s.name)}</p>
    <p class="pnMeta">${[s.level ? L("pn_level", {n: s.level}) : "", s.cls, s.faction, s.guild ? L("pn_guild", {g: s.guild}) : ""].filter(Boolean).map(esc).join(", ")}</p>
    <ul class="pnEquip">${Object.entries(s.equip || {}).map(([k, v]) => `<li><span>${L(SL[k] || k)}</span><a href="${wiki(v)}" target="_blank" rel="noopener">${esc(v)}</a></li>`).join("")}</ul>
    <div class="pnRow"><button class="btnQ" data-sync ${busy ? "disabled" : ""}>${L(busy ? "pn_syncing" : "pn_sync")}</button><button class="linkBtn" data-unlink>${L("pn_unlink")}</button>
      <small>${L("pn_read_at", {d: new Date(s.fetchedAt).toLocaleString(lg() === "en" ? "en-US" : "pt-BR", {dateStyle: "short", timeStyle: "short"})})} <a href="${esc(s.url)}" target="_blank" rel="noopener">${L("pn_charpage")}</a></small></div>
    ${(s.warnings || []).map(w => `<p class="pnWarn">${esc(w)}</p>`).join("")}</div></article>`;
}
function resumo(o, md, done) {
  const tr = FARMS.filter(f => tracked().has(f.n)), open = tr.filter(f => !farmDone(f)).length;
  const ready = TEAMS.filter(t => t.team.every(([n]) => o.all.has(n))).length, dn = md.filter(d => done.includes(d.id)).length;
  return `${charCard()}
  <div class="pnStats">
    <button class="pnStat" data-pt="classes"><b>${o.all.size}<small> / ${D.length}</small></b><span>${L("pn_st_cls")}</span></button>
    <button class="pnStat" data-goview="diarias"><b>${md.length ? `${dn}/${md.length}` : "—"}</b><span>${L(md.length ? "pn_st_day" : "pn_st_day0")}</span></button>
    <button class="pnStat" data-goview="itens"><b>${open}</b><span>${L("pn_st_farm")}</span></button>
    <button class="pnStat" data-pt="ultras"><b>${ready}<small> / ${TEAMS.length}</small></b><span>${L("pn_st_ult")}</span></button>
    <button class="pnStat" data-pt="quests"><b>${quests().filter(q => q.st !== "done").length}</b><span>${L("pn_st_qst")}</span></button>
  </div>
  <section class="pnCard frame"><div class="pnHead"><h3>${L("pn_day_h")}</h3>${md.length ? `<span class="pnRow"><span class="pill ${dn === md.length ? "on" : ""}">${dn === md.length ? L("pn_day_all") : L("pn_day_n", {n: dn, t: md.length})}</span><button class="linkBtn" data-goview="diarias">${L("pn_edit")}</button></span>` : ""}</div>
    ${md.length ? `<div class="dMeter"><i style="width:${dn / md.length * 100}%"></i></div>
      <div class="pnDays">${md.map(d => { const on = done.includes(d.id), nm = lg() === "en" && d.ne ? d.ne : d.n;
        return `<div class="pnDay${on ? " on" : ""}"><button class="fchk" role="checkbox" aria-checked="${on}" data-pday="${d.id}" aria-label="${esc(nm)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span><b>${esc(nm)}</b>${d.j ? ` ${d.j.map(jn).join(" ")}` : ""}</span></div>`; }).join("")}</div>`
      : `<p class="pnSub">${L("pn_day_none")}</p><button class="btnG" data-goview="diarias">${L("daily_pick_btn")}</button>`}</section>
  <section class="pnCard frame"><div class="pnHead"><h3>${L("pn_farm_h")}</h3><button class="linkBtn" data-goview="itens">${L(tr.length ? "pn_farm_more" : "")}</button></div>
    ${tr.length ? `<div class="pnFarms">${tr.map(trackRow).join("")}</div>` : `<p class="pnSub">${L("pn_farm_none")}</p><button class="btnG" data-goview="itens">${L("pn_farm_pick")}</button>`}</section>`;
}
function trackRow(f) {
  const p = prog(f.n), ok = farmDone(f), byCls = f.cls && owned().all.has(f.cls), nx = nextStep(f), l = lg();
  return `<div class="pnFarm"><div class="pnHead"><b>${esc(l === "en" && f.ne ? f.ne : f.n)}</b>${ok ? `<span class="pill on">${L(byCls ? "pn_has_cls" : "farm_done")}</span>` : `<span class="pill">${L("farm_prog", {n: p.size, t: f.req.length})}</span>`}</div>
    <div class="dMeter"><i style="width:${ok ? 100 : p.size / f.req.length * 100}%"></i></div>
    ${!ok && nx >= 0 ? `<div class="pnNext"><button class="fchk" role="checkbox" aria-checked="false" data-pstep="${esc(f.n)}|${nx}" aria-label="${esc(L("farm_step", {n: nx + 1}))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      <div><small class="pnNx">${L("pn_next", {n: nx + 1, t: f.req.length})}</small><div class="pnStep">${stepHtml(f.req[nx], l)}</div></div></div>` : ""}
    <div class="pnRow"><button class="linkBtn" data-pfarm="${esc(f.n)}">${L("pn_all_steps")}</button><button class="linkBtn mut" data-puntrack="${esc(f.n)}">${L("pn_untrack")}</button></div></div>`;
}
function classes(o) {
  const q = ckey(cq), xs = [...D].sort((a, b) => a.name.localeCompare(b.name)).filter(c => (cf === "todas" || (cf === "tenho") === o.all.has(c.name)) && (!q || ckey(c.name).includes(q)));
  if (cf === "faltam") xs.sort((a, b) => "SABCN".indexOf(overall(a)) - "SABCN".indexOf(overall(b)));
  return `<p class="pnSub">${L("pn_cls_x")}</p>
    <div class="pnRow"><span class="seg">${[["tenho", L("pn_cls_have", {n: o.all.size})], ["faltam", L("pn_cls_miss", {n: D.length - o.all.size})], ["todas", L("all")]].map(([k, l]) => `<button data-pcf="${k}" aria-pressed="${cf === k}">${l}</button>`).join("")}</span>
      <input type="search" data-pcq placeholder="${esc(L("pn_cls_q"))}" aria-label="${esc(L("pn_cls_q"))}" value="${esc(cq)}"></div>
    <div class="pnCls">${xs.map((c: Klass) => { const a = o.auto.has(c.name), on = o.all.has(c.name), t = overall(c);
      return `<div class="pnCl${on ? " on" : ""}">${sigil(c)}<button class="open pnClN" data-i="${idx(c)}">${esc(c.name)}</button><span class="b" style="background:${tColor(t)}">${tierTxt(t)}</span>
        ${a ? `<span class="pill on">${L("pn_from_char")}</span>` : `<button class="fchk" role="checkbox" aria-checked="${on}" data-pown="${esc(c.name)}" aria-label="${esc(L("pn_have", {c: c.name}))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>`}</div>`; }).join("") || `<p class="pnSub">${L("gnores")}</p>`}</div>
    ${o.extra.length ? `<p class="pnSub">${L("pn_cls_extra", {l: o.extra.map(esc).join(", ")})}</p>` : ""}`;
}
function ultras(o) {
  return `<p class="pnSub">${L("pn_ult_x")}</p><div class="pnTeams">${TEAMS.map(t => { const have = t.team.filter(([n]) => o.all.has(n)).length;
    return `<article class="pnTeam frame"><div class="pnHead"><b>${esc(t.n)}</b><span class="pill ${have === 4 ? "on" : ""}">${have === 4 ? L("pn_ult_ok") : `${have}/4`}</span></div>
      ${t.team.map(([n, role]) => `<div class="pnMem${o.all.has(n) ? "" : " no"}"><span>${o.all.has(n) ? "✓" : "·"} ${esc(n)}</span><small>${esc(role)}</small></div>`).join("")}</article>`; }).join("")}</div>`;
}
function questsTab() {
  const all = quests(), open = all.filter(q => q.st !== "done"), done = all.filter(q => q.st === "done");
  const row = q => `<div class="pnQ${q.st === "done" ? " on" : ""}"><button class="fchk" role="checkbox" aria-checked="${q.st === "done"}" data-pqdone="${q.id}" aria-label="${esc(q.n)}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <span><b>${esc(q.n)}</b>${q.j ? " " + jn(q.j) : ""}${q.note ? `<small>${esc(q.note)}</small>` : ""}</span><button class="linkBtn mut" data-pqdel="${q.id}">${L("pn_del")}</button></div>`;
  return `<p class="pnSub">${L("pn_qst_x")}</p>
    <form class="pnQForm frame" data-qadd><input name="n" placeholder="${esc(L("pn_q_n"))}" required maxlength="80"><input name="j" placeholder="${esc(L("pn_q_j"))}" maxlength="40"><input name="note" placeholder="${esc(L("pn_q_note"))}" maxlength="120"><button class="btnG">${L("pn_add")}</button></form>
    <h3 class="pnH3">${L("pn_q_open", {n: open.length})}</h3><div class="pnQs">${open.map(row).join("") || `<p class="pnSub">${L("pn_q_none")}</p>`}</div>
    ${done.length ? `<h3 class="pnH3">${L("pn_q_done", {n: done.length})}</h3><div class="pnQs">${done.map(row).join("")}</div>` : ""}`;
}

/* ---------- personagem ---------- */
async function link(name: string) {
  if (location.protocol === "file:" && !API_BASE) { toast("!", L("pn_need_server")); return; }
  busy = true; renderPainel();
  try {
    const r = await fetch(API_BASE + "/api/char?name=" + encodeURIComponent(name)).then(r => r.json());
    if (!r.ok) throw new Error(r.error || L("pn_link_err"));
    st.char = r.name;
    st.snap = {name: r.name, url: r.url, fetchedAt: r.fetchedAt, level: r.level, cls: r.cls, faction: r.faction, guild: r.guild, equip: r.equip,
      invClasses: (r.inventory || []).filter(i => /class/i.test(i.type)).map(i => i.name), warnings: r.warnings || []};
    save();
  } catch (e) { toast("!", e instanceof Error ? e.message : L("pn_link_err")); }
  busy = false; renderPainel();
}

/* ---------- eventos ---------- */
const view = document.getElementById("v-painel");
view.addEventListener("click", e => {
  const t = (e.target as HTMLElement).closest<HTMLElement>("button"); if (!t) return;
  const d = t.dataset;
  if (d.auth) { amode = d.auth; amsg = null; return renderPainel(); }
  if (d.agoogle != null) return void authRun(() => acc.google());
  if (d.aguest != null) return void authRun(() => acc.guest());
  if (d.pw != null) { const i = t.previousElementSibling as HTMLInputElement; i.type = i.type === "password" ? "text" : "password"; t.textContent = L(i.type === "password" ? "acc_show" : "acc_hide"); return; }
  if (d.pt) { tab = d.pt; return renderPainel(); }
  if (d.signout != null) return void acc.signOut();
  if (d.pcreate != null) { amode = "up"; return void acc.signOut().then(() => { amode = "up"; renderPainel(); }); }
  if (d.pcf) { cf = d.pcf; return renderPainel(); }
  if (d.sync != null) return void link(String(st.char || ""));
  if (d.unlink != null) { st.snap = null; save(); return renderPainel(); }
  if (d.pday) { toggleDaily(d.pday); return renderPainel(); }
  if (d.pstep) { const [n, i] = [d.pstep.slice(0, d.pstep.lastIndexOf("|")), +d.pstep.slice(d.pstep.lastIndexOf("|") + 1)];
    const s = prog(n); s.add(i); st.fprog = {...(st.fprog || {}), [n]: [...s].sort((a, b) => a - b)}; save(); return renderPainel(); }
  if (d.puntrack) { toggleTrack(d.puntrack, false); return renderPainel(); }
  if (d.pfarm) { const i = FARMS.findIndex(f => f.n === d.pfarm); location.hash = "itens"; setTimeout(() => document.getElementById("farm-" + i)?.scrollIntoView({block: "start"}), 60); return; }
  if (d.pown) { const s = new Set((st.own as string[]) || []); s.has(d.pown) ? s.delete(d.pown) : s.add(d.pown); st.own = [...s]; save(); return renderPainel(); }
  if (d.pqdone) { const q = quests().find(x => x.id === d.pqdone); if (q) q.st = q.st === "done" ? "open" : "done"; save(); return renderPainel(); }
  if (d.pqdel) { st.quests = quests().filter(x => x.id !== d.pqdel); save(); return renderPainel(); }
});
view.addEventListener("input", e => {
  const t = e.target as HTMLInputElement;
  if (t.closest("[data-aform]")) { aval[t.name] = t.value; return; }
  if (t.dataset.pcq != null) { cq = t.value; const pos = t.selectionStart; renderPainel(); const i = root.querySelector<HTMLInputElement>("[data-pcq]"); i.focus(); i.setSelectionRange(pos, pos); }
});
view.addEventListener("submit", e => {
  e.preventDefault(); const f = e.target as HTMLFormElement, v = Object.fromEntries(new FormData(f)) as Record<string, string>;
  if (f.dataset.link != null) return void link(String(v.n).trim());
  if (f.dataset.qadd != null) { st.quests = [{id: Date.now().toString(36), n: v.n.trim(), j: (v.j || "").trim().replace(/^\/?(join\s+)?\/?/i, ""), note: (v.note || "").trim(), st: "open"}, ...quests()]; save(); return renderPainel(); }
  if (f.dataset.aform) {
    const email = (v.email || "").trim(), pass = v.pass || "";
    if (f.dataset.aform === "reset") return void authRun(async () => { await acc.reset(email); amsg = {ok: true, t: L("acc_reset_ok")}; amode = "in"; });
    if (f.dataset.aform === "up") return void authRun(() => acc.signUp((v.name || "").trim(), email, pass));
    return void authRun(() => acc.signIn(email, pass));
  }
});
acc.onAccount(() => { aval = {}; if (!acc.user) amode = "in"; renderPainel(); });
