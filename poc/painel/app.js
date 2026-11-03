// Painel do usuário (POC): o personagem vinculado pela charpage pública + o que a pessoa acompanha
// (classes, diárias, HardFarm, ultras e quests). Usa os mesmos dados do portal (src/data).
import {createStore} from "./store.js";

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;"}[c]));
const ckey = n => String(n).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
const wiki = n => "https://aqwwiki.wikidot.com/" + String(n).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
const SCORE = {S: 4, A: 3, B: 2, C: 1};
const STORE = {free: "Free", member: "Member", acs: "ACS", hero: "HeroMart"};

/* dados do portal */
const get = f => fetch("/src/data/" + f).then(r => r.json());
const [RAW, DAILIES, FARMS, TEAMS, ALIAS] = await Promise.all(["classes.json", "dailies.json", "hardfarm.json", "ultra-teams.json", "class-aliases.json"].map(get));
const CLASSES = RAW.map(r => {const best = Math.max(SCORE[r[2]] || 0, SCORE[r[3]] || 0, SCORE[r[4]] || 0), sum = (SCORE[r[2]] || 0) + (SCORE[r[3]] || 0) + (SCORE[r[4]] || 0);
  return {name: r[0], store: r[1], farm: r[2], solo: r[3], ultra: r[4], tier: best === 4 && sum >= 10 ? "S" : best === 4 || sum >= 9 ? "A" : sum >= 6 ? "B" : "C", sum}})
  .sort((a, b) => b.sum - a.sum || a.name.localeCompare(b.name));
const byKey = Object.fromEntries(CLASSES.map(c => [ckey(c.name), c.name]));
/* item de classe do inventário → classe do portal ("PaladinSlayer (2)" → PaladinSlayer) */
const toClass = item => { if (ALIAS[item] && byKey[ckey(ALIAS[item])]) return byKey[ckey(ALIAS[item])];
  let b = item, p; do { p = b; b = b.replace(/\s*\((class|\d+|0 ac|ac|non-ac|legend|non-legend|rare|special)\)\s*$/i, ""); } while (b !== p);
  return byKey[ckey(b)] || null; };

let store, user = null, D = null, tab = "resumo", cf = "tenho", cq = "", ff = "and", busy = false;
const save = () => store.save(D);

/* o que vem do personagem (não dá para desmarcar) + o que a pessoa marcou */
function owned() {
  const auto = new Set(), extra = [];
  (D.snap?.invClasses || []).forEach(n => { const c = toClass(n); if (c) auto.add(c); else extra.push(n); });
  if (D.snap?.cls) { const c = toClass(D.snap.cls); if (c) auto.add(c); }
  const all = new Set([...auto, ...(D.own || []).filter(n => byKey[ckey(n)])]);
  return {auto, all, extra};
}
function dayReset() { if (D.dDay !== today()) { D.dDay = today(); D.dDone = []; save(); } }
const farmDone = f => (f.cls && owned().all.has(f.cls)) || (D.fprog[f.n] || []).length >= f.req.length;

/* ---------- topo e login ---------- */
function renderWho() {
  $("#who").innerHTML = !user ? "" : `${user.photo ? `<img src="${esc(user.photo)}" alt="">` : ""}<span>${esc(user.name)}</span>${store.mode === "firebase" ? `<button class="btnQ" data-signout>Sair</button>` : ""}`;
}
function boot(u, data) {
  user = u; D = data;
  $("#demo").hidden = store.mode !== "local";
  $("#gate").hidden = !!u; $("#panel").hidden = !u;
  renderWho();
  if (u) { dayReset(); render(); }
}

/* ---------- abas ---------- */
const TABS = [["resumo", "Resumo"], ["classes", "Classes"], ["diarias", "Diárias"], ["farm", "HardFarm"], ["ultras", "Ultras"], ["quests", "Quests"]];
function render() {
  const o = owned();
  const count = {classes: o.all.size, diarias: D.dMine.length ? `${D.dDone.filter(id => D.dMine.includes(id)).length}/${D.dMine.length}` : "", farm: FARMS.filter(f => (D.fprog[f.n] || []).length && !farmDone(f)).length || "",
    quests: D.quests.filter(q => q.st !== "done").length || ""};
  $("#tabs").innerHTML = TABS.map(([k, l]) => `<button data-tab="${k}" aria-pressed="${tab === k}">${l}${count[k] ? `<b>${count[k]}</b>` : ""}</button>`).join("");
  $("#view").innerHTML = ({resumo, classes, diarias, farm, ultras, quests})[tab]();
}

function charCard() {
  const s = D.snap;
  if (!s) return `<article class="card char"><div class="crest">${crest()}</div><div>
    <h2>Vincule o seu personagem</h2><p class="sub">Digite o nome do personagem como aparece no jogo. O painel lê a página pública dele (a mesma que qualquer pessoa vê em account.aq.com) e traz nível, classe, equipamento e as classes do inventário. Não pedimos senha.</p>
    <form class="row" data-link><input name="n" placeholder="Nome do personagem" autocomplete="off" required maxlength="32" value="${esc(D.char)}"><button class="btn" ${busy ? "disabled" : ""}>${busy ? "Buscando…" : "Vincular personagem"}</button></form></div></article>`;
  const eq = Object.entries(s.equip || {});
  return `<article class="card char"><div class="crest">${crest()}</div><div>
    <p class="cname">${esc(s.name)}</p>
    <p class="cmeta">${[s.level ? `Nível ${s.level}` : "", s.cls, s.faction, s.guild ? `Guilda ${esc(s.guild)}` : ""].filter(Boolean).map(esc).join(", ")}</p>
    ${eq.length ? `<ul class="equip">${eq.map(([k, v]) => `<li><span>${({weapon: "Arma", armor: "Armadura", helm: "Elmo", cape: "Capa", pet: "Pet", misc: "Misc"})[k] || k}</span><a href="${wiki(v)}" target="_blank" rel="noopener">${esc(v)}</a></li>`).join("")}</ul>` : ""}
    <div class="row" style="margin-top:12px"><button class="btnQ" data-sync ${busy ? "disabled" : ""}>${busy ? "Atualizando…" : "Atualizar do jogo"}</button><button class="link" data-unlink>Trocar personagem</button>
      <small style="color:var(--muted)">Lido em ${new Date(s.fetchedAt).toLocaleString("pt-BR", {dateStyle: "short", timeStyle: "short"})}. <a href="${esc(s.url)}" target="_blank" rel="noopener">Ver charpage</a></small></div>
    ${(s.warnings || []).map(w => `<p class="warn">${esc(w)}</p>`).join("")}</div></article>`;
}
const crest = () => `<svg viewBox="0 0 48 54" aria-hidden="true"><path d="M24 2 L44 10 V28 C44 40 35 48 24 52 C13 48 4 40 4 28 V10 Z" fill="var(--panel2)" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="26" r="2.6" fill="currentColor"/><circle cx="30" cy="26" r="2.6" fill="currentColor"/></svg>`;

function resumo() {
  const o = owned(), mine = D.dMine.length, done = D.dDone.filter(id => D.dMine.includes(id)).length;
  const prog = FARMS.filter(f => (D.fprog[f.n] || []).length && !farmDone(f)).length;
  const ready = TEAMS.filter(t => t.team.every(([n]) => o.all.has(n))).length;
  return `<div class="stack">${charCard()}
    <div class="stats">
      <button class="stat" data-tab="classes"><b>${o.all.size}<small style="font-size:14px"> / ${CLASSES.length}</small></b><small>classes que você tem</small></button>
      <button class="stat" data-tab="diarias"><b>${mine ? `${done}/${mine}` : "—"}</b><small>${mine ? "diárias feitas hoje" : "escolha suas diárias"}</small></button>
      <button class="stat" data-tab="farm"><b>${prog}</b><small>farms em andamento</small></button>
      <button class="stat" data-tab="ultras"><b>${ready}<small style="font-size:14px"> / ${TEAMS.length}</small></b><small>times de ultra que você monta</small></button>
      <button class="stat" data-tab="quests"><b>${D.quests.filter(q => q.st !== "done").length}</b><small>quests em aberto</small></button>
    </div></div>`;
}

function classes() {
  const o = owned(), q = ckey(cq);
  const xs = CLASSES.filter(c => (cf === "todas" || (cf === "tenho") === o.all.has(c.name)) && (!q || ckey(c.name).includes(q)));
  return `<h2>Classes</h2><p class="sub">As que vêm do inventário do personagem ficam marcadas sozinhas (<span class="pill auto">do personagem</span>). As outras você marca. Em "Faltam", as melhores aparecem primeiro: é por elas que vale farmar.</p>
    <div class="row" style="margin-bottom:12px"><span class="seg">${[["tenho", `Tenho ${o.all.size}`], ["faltam", `Faltam ${CLASSES.length - o.all.size}`], ["todas", "Todas"]].map(([k, l]) => `<button data-cf="${k}" aria-pressed="${cf === k}">${l}</button>`).join("")}</span>
      <input type="search" data-cq placeholder="Buscar classe…" value="${esc(cq)}" aria-label="Buscar classe"></div>
    <div class="grid">${xs.map(c => { const a = o.auto.has(c.name), on = o.all.has(c.name);
      return `<label class="item${on ? " on" : ""}"><input type="checkbox" class="chk" data-own="${esc(c.name)}" ${on ? "checked" : ""} ${a ? "disabled" : ""}>
        <span class="tx"><span class="hd"><b>${esc(c.name)}</b><span class="tier" style="background:var(--t${c.tier})">${c.tier}</span></span>
          <small>${STORE[c.store] || c.store}, Farm ${c.farm}, Solo ${c.solo}, Ultra ${c.ultra}</small>${a ? `<span class="pill auto">do personagem</span>` : ""}</span></label>`; }).join("") || `<p class="empty">Nenhuma classe aqui.</p>`}</div>
    ${o.extra.length ? `<p class="sub" style="margin-top:14px">No inventário, mas ainda fora do portal: ${o.extra.map(esc).join(", ")}.</p>` : ""}`;
}

function diarias() {
  const G = {start: "Início do jogo", mid: "Meio do jogo", end: "Fim do jogo", hf: "HardFarm", boss: "Chefes", rep: "Reputação", season: "Sazonais", old: "Antigas"};
  if (!D.dMine.length || D.dPick) {
    const sel = new Set(D.dPick || D.dMine);
    return `<h2>Escolha as suas diárias</h2><p class="sub">Marque as que você faz. Depois, todo dia, é só ticar as que fez; à meia-noite as marcações voltam do zero.</p>
      ${Object.entries(G).map(([g, l]) => { const xs = DAILIES.filter(d => d.g === g); return xs.length ? `<h3 style="margin-top:14px">${l}</h3><div class="grid">${xs.map(d => `<label class="item"><input type="checkbox" class="chk" data-dpick="${d.id}" ${sel.has(d.id) ? "checked" : ""}><span class="tx"><b>${esc(d.n)}</b><small>${esc(d.who?.pt || "")}</small></span></label>`).join("")}</div>` : ""; }).join("")}
      <div class="row" style="margin-top:16px;position:sticky;bottom:12px"><button class="btn" data-dsave>Salvar (${sel.size})</button>${D.dMine.length ? `<button class="btnQ" data-dcancel>Cancelar</button>` : ""}</div>`;
  }
  const xs = DAILIES.filter(d => D.dMine.includes(d.id)), done = xs.filter(d => D.dDone.includes(d.id)).length;
  return `<h2>Diárias de hoje</h2><p class="sub">${done} de ${xs.length} feitas. Voltam do zero à meia-noite. <button class="link" data-dedit>Editar minhas diárias</button></p>
    <div class="bar"><i style="width:${xs.length ? done / xs.length * 100 : 0}%"></i></div>
    <div class="grid" style="margin-top:12px">${xs.map(d => { const on = D.dDone.includes(d.id);
      return `<label class="item${on ? " on" : ""}"><input type="checkbox" class="chk" data-dday="${d.id}" ${on ? "checked" : ""}><span class="tx"><b>${esc(d.n)}</b><small>${d.j ? d.j.map(j => "/join " + j).join(", ") : ""}${d.rw ? " · " + esc(d.rw.pt) : ""}</small></span></label>`; }).join("")}</div>`;
}

function farm() {
  const o = owned();
  const xs = FARMS.filter(f => ff === "todos" ? true : ff === "and" ? (D.fprog[f.n] || []).length && !farmDone(f) : farmDone(f));
  return `<h2>HardFarm</h2><p class="sub">Marque as etapas que já fez. Farm de classe que você já tem conta como concluído sozinho.</p>
    <span class="seg" style="margin-bottom:12px">${[["and", "Em andamento"], ["ok", "Concluídos"], ["todos", "Todos"]].map(([k, l]) => `<button data-ff="${k}" aria-pressed="${ff === k}">${l}</button>`).join("")}</span>
    <div class="stack" style="margin-top:12px">${xs.map(f => { const p = D.fprog[f.n] || [], ok = farmDone(f), byCls = f.cls && o.all.has(f.cls);
      return `<article class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${esc(f.n)}</h3>${ok ? `<span class="pill ok">${byCls ? "Você já tem a classe" : "Concluído"}</span>` : `<span class="pill">${p.length}/${f.req.length} etapas</span>`}</div>
        <div class="bar"><i style="width:${ok ? 100 : p.length / f.req.length * 100}%"></i></div>
        <div class="stack" style="gap:6px;margin-top:10px">${f.req.map((r, i) => `<label class="item${p.includes(i) || byCls ? " on" : ""}" style="padding:7px 10px"><input type="checkbox" class="chk" data-fstep="${esc(f.n)}|${i}" ${p.includes(i) || byCls ? "checked" : ""} ${byCls ? "disabled" : ""}><span class="tx"><small style="color:var(--ink);font-size:13.5px">${esc(r.pt)}</small></span></label>`).join("")}</div></article>`; }).join("")
      || `<p class="empty">${ff === "and" ? "Nenhum farm em andamento. Abra \"Todos\" e marque a primeira etapa de um farm para acompanhar aqui." : "Nada aqui ainda."}</p>`}</div>`;
}

function ultras() {
  const o = owned();
  return `<h2>Ultras</h2><p class="sub">Os times do portal, com o que você já tem. Faltando uma classe, dá para trocar por outra da mesma função.</p>
    <div class="grid">${TEAMS.map(t => { const have = t.team.filter(([n]) => o.all.has(n)).length;
      return `<article class="card team"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${esc(t.n)}</h3><span class="pill ${have === 4 ? "ok" : ""}">${have === 4 ? "Você monta" : `${have}/4`}</span></div>
        ${t.team.map(([n, role]) => `<div class="mem${o.all.has(n) ? "" : " no"}"><span>${o.all.has(n) ? "✓" : "·"} ${esc(n)}</span><small>${esc(role)}</small></div>`).join("")}</article>`; }).join("")}</div>`;
}

function quests() {
  const open = D.quests.filter(q => q.st !== "done"), done = D.quests.filter(q => q.st === "done");
  const row = q => `<div class="item${q.st === "done" ? " on" : ""}"><input type="checkbox" class="chk" data-qdone="${q.id}" ${q.st === "done" ? "checked" : ""} aria-label="Concluída"><span class="tx"><b>${esc(q.n)}</b><small>${q.j ? "/join " + esc(q.j) : ""}${q.j && q.note ? " · " : ""}${esc(q.note || "")}</small></span><button class="link" data-qdel="${q.id}">Apagar</button></div>`;
  return `<h2>Minhas quests</h2><p class="sub">O jogo não mostra suas quests fora dele, então anote aqui as que está fazendo (uma saga, um item que está farmando) e marque quando terminar.</p>
    <form class="qform card" data-qadd><input name="n" placeholder="Quest ou objetivo (ex.: Nulgath Larvae)" required maxlength="80"><input name="j" placeholder="Mapa (opcional)" maxlength="40"><input name="note" placeholder="Anotação (ex.: faltam 20 Voucher)" maxlength="120"><button class="btn">Adicionar</button></form>
    <h3 style="margin-top:16px">Em aberto (${open.length})</h3><div class="stack">${open.map(row).join("") || `<p class="empty">Nenhuma quest em aberto.</p>`}</div>
    ${done.length ? `<h3 style="margin-top:16px">Concluídas (${done.length})</h3><div class="stack">${done.map(row).join("")}</div>` : ""}`;
}

/* ---------- personagem ---------- */
async function link(name) {
  busy = true; render(); $("#msg").hidden = true;
  try {
    const r = await fetch("/api/char?name=" + encodeURIComponent(name)).then(r => r.json());
    if (!r.ok) throw new Error(r.error || "Não deu para ler o personagem.");
    /* guarda só o necessário: o inventário inteiro pode ter centenas de itens */
    D.char = r.name;
    D.snap = {name: r.name, url: r.url, fetchedAt: r.fetchedAt, level: r.level, cls: r.cls, faction: r.faction, guild: r.guild, equip: r.equip,
      invClasses: r.inventory.filter(i => /class/i.test(i.type)).map(i => i.name), invCount: r.inventory.length, warnings: r.warnings};
    save();
  } catch (e) { $("#msg").textContent = e.message; $("#msg").hidden = false; }
  busy = false; render();
}

/* ---------- eventos ---------- */
document.addEventListener("click", e => {
  const t = e.target.closest("button,[data-tab]"); if (!t) return;
  if (t.dataset.signin != null) return store.signIn();
  if (t.dataset.signout != null) return store.signOut();
  if (t.dataset.tab) { tab = t.dataset.tab; return render(); }
  if (t.dataset.cf) { cf = t.dataset.cf; return render(); }
  if (t.dataset.ff) { ff = t.dataset.ff; return render(); }
  if (t.dataset.sync != null) return link(D.char);
  if (t.dataset.unlink != null) { D.snap = null; save(); return render(); }
  if (t.dataset.dedit != null) { D.dPick = [...D.dMine]; return render(); }
  if (t.dataset.dcancel != null) { delete D.dPick; return render(); }
  if (t.dataset.dsave != null) { D.dMine = [...(D.dPick || D.dMine)]; delete D.dPick; save(); return render(); }
  if (t.dataset.qdel) { D.quests = D.quests.filter(q => q.id !== t.dataset.qdel); save(); return render(); }
});
document.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.own) { const s = new Set(D.own); t.checked ? s.add(t.dataset.own) : s.delete(t.dataset.own); D.own = [...s]; save(); return render(); }
  if (t.dataset.dpick) { const s = new Set(D.dPick || D.dMine); t.checked ? s.add(t.dataset.dpick) : s.delete(t.dataset.dpick); D.dPick = [...s]; return render(); }
  if (t.dataset.dday) { dayReset(); const s = new Set(D.dDone); t.checked ? s.add(t.dataset.dday) : s.delete(t.dataset.dday); D.dDone = [...s]; save(); return render(); }
  if (t.dataset.fstep) { const [n, i] = t.dataset.fstep.split("|"), s = new Set(D.fprog[n] || []); t.checked ? s.add(+i) : s.delete(+i); D.fprog = {...D.fprog, [n]: [...s]}; save(); return render(); }
  if (t.dataset.qdone) { const q = D.quests.find(x => x.id === t.dataset.qdone); if (q) q.st = t.checked ? "done" : "open"; save(); return render(); }
});
document.addEventListener("input", e => { if (e.target.dataset.cq != null) { cq = e.target.value; const pos = e.target.selectionStart; render(); const i = $("[data-cq]"); i.focus(); i.setSelectionRange(pos, pos); } });
document.addEventListener("submit", e => {
  e.preventDefault(); const f = e.target, v = Object.fromEntries(new FormData(f));
  if (f.dataset.link != null) return link(String(v.n).trim());
  if (f.dataset.qadd != null) { D.quests = [{id: Date.now().toString(36), n: String(v.n).trim(), j: String(v.j || "").trim().replace(/^\/?join\s+/i, ""), note: String(v.note || "").trim(), st: "open"}, ...D.quests]; save(); render(); }
});

store = await createStore(boot);
