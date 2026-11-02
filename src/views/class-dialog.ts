import {badges, catChip, newTag} from "../components/shared.js";
import type {Team} from "../types.js";
import {MODES, STORE} from "../config.js";
import {D, DAILIES, FARMS, NEWS, REL, TEAMS, TYPES, byName} from "../data/index.js";
import {fmtRange} from "./releases.js";
import {esc, sigil, tColor, wiki} from "../lib/util.js";
import {L, T, st, ui} from "../state.js";

export function keys(seq){return T(seq).split(/\s+/).map(tok=>/^\d+$/.test(tok)?tok.split("").map(d=>`<span class="k">${d}</span>`).join(""):`<span class="k txt">${esc(tok)}</span>`).join("")}
export const dlg=document.getElementById("dlg") as HTMLDialogElement;
export function openClass(i){
  const c=D[i];ui.curClass=i;
  const rows=Object.keys(MODES).map(m=>{const p=c.b[m].split("|");return `<tr><td>${MODES[m]} <span class="b" style="background:${tColor(c[m])};margin-left:4px">${c[m]}</span></td>${p.map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`}).join("");
  const inTeams=TEAMS.map((t,ti)=>[t,ti] as [Team,number]).filter(([t])=>t.team.some(([n])=>n===c.name));
  const SRC={h:L("src_h"),c:L("src_c"),g:L("src_g")};
  /* tudo do portal que fala desta classe: farm, diárias, notícias e a atualização em que ela saiu */
  const l=st.lang==="en"?"en":"pt",low=c.name.toLowerCase();
  const farms=FARMS.map((f,fi)=>[f,fi] as [typeof f,number]).filter(([f])=>f.cls===c.name);
  const dls=DAILIES.filter(x=>x.for&&x.for.pt.toLowerCase().includes(low));
  const news=NEWS.map((n,ni)=>[n,ni] as [typeof n,number]).filter(([n])=>n.cls.includes(c.name));
  const rel=REL.find(r=>(r.items.class||[]).some(it=>it[0].toLowerCase().startsWith(low)));
  const related=farms.length||dls.length||news.length||rel?`<div><h5>${L("cd_rel")}</h5><div class="cdRel">
    ${farms.map(([f,fi])=>`<button class="hrow" data-gofarm="${fi}"><span class="htx"><b>${L("cd_farm")}</b><small>${esc(l==="en"&&f.ne?f.ne:f.n)}${f.e?`, ${L("eff"+f.e)}`:""}</small></span></button>`).join("")}
    ${dls.map(x=>`<button class="hrow" data-godaily="${x.id}"><span class="htx"><b>${L("cd_daily")}</b><small>${esc(l==="en"&&x.ne?x.ne:x.n)}</small></span></button>`).join("")}
    ${news.map(([n,ni])=>`<button class="hrow" data-news="${ni}"><span class="htx"><b>${L("cd_news")}</b><small>${esc(n[l].t)}</small></span></button>`).join("")}
    ${rel?`<button class="hrow" data-relt="class"><span class="htx"><b>${L("cd_newitem")}</b><small>${fmtRange(rel)}</small></span></button>`:""}
  </div></div>`:"";
  document.getElementById("dBody").innerHTML=`
  <div class="dh">${sigil(c,"xl")}<div class="info"><h3 id="dName">${esc(c.name)}${newTag(c)}</h3><div class="badges">${catChip(c)}<span class="chip">${T(TYPES[c.type].n)}</span>${badges(c)}</div></div>
    <button class="x" id="dClose" aria-label="${L("close")}">×</button></div>
  <div class="db">
    <p>${esc(T(c.note))}</p>
    <div class="facts">
      <div class="fact"><small>${L("how")}</small>${c.ob?esc(T(c.ob[0])):c.yr?L("calYear",{y:c.yr}):L("seeWiki")}${c.ob&&c.ob[1]?`<div class="awe" style="margin-top:4px">${esc(T(c.ob[1]))}</div>`:""}</div>
      ${c.cal?`<div class="fact"><small>${L("calClass")}${c.yr?" · "+c.yr:""}</small><div style="margin-bottom:4px">${L("via",{x:T(STORE[c.store])})}</div>${c.fam.length?`${L("same")} <span class="inteam" style="margin-top:6px">${c.fam.map(n=>`<button class="open" data-i="${byName[n]}">${esc(n)}</button>`).join("")}</span>`:L("noVar")}</div>`:""}
      <div class="fact"><small>${L("cons")}</small>${c.cons?esc(T(c.cons)):L("consDef")}</div>
    </div>
    <div><h5>${L("enhH")}</h5>
      <div class="tbl"><table><thead><tr><th>${L("thMode")}</th><th>${L("thClass")}</th><th>${L("thWeapon")}</th><th>${L("thHelm")}</th><th>${L("thCape")}</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="awe"><b>${L("noForge")}</b> ${esc(T(c.awe))}</div></div>
    ${c.skills?`<div><h5>${L("skills")}</h5><div class="skills">${c.skills.map((s,k)=>`<div><b>${k+1}</b>${esc(T(s))}</div>`).join("")}</div></div>`:""}
    <div><h5>${L("rotH")}</h5><div class="rot">${c.rot.map(r=>`
      <div class="rr"><div class="hd"><b>${esc(T(r[0]))}</b><span class="src ${r[2]}">${SRC[r[2]]}</span></div>
      <div class="keys">${keys(r[1])}</div><p>${esc(T(r[3]))}</p></div>`).join("")}</div>
      ${c.generic?`<p class="awe">${L("generic")}</p>`:""}
      ${c.inherited?`<p class="awe">${L("inherited",{x:esc(c.inherited)})}</p>`:""}</div>
    ${related}
    ${inTeams.length?`<div><h5>${L("inTeams")}</h5><div class="inteam">${inTeams.map(([t,ti])=>`<button data-team="${ti}">${esc(T(t.n))}</button>`).join("")}</div></div>`:""}
    <div class="links">${(()=>{const inC=(st.cmp||[]).includes(c.name),full=(st.cmp||[]).length>=3;return `<button class="addCmp" data-addcmp="${i}" ${inC||full?"disabled":""}>${inC?L("cmp_in"):full?L("cmp_full"):L("cmp_add")}</button>`})()}<a href="${wiki(c.name)}" target="_blank" rel="noopener">${L("wikiLink")}</a>${c.src?`<a href="${c.src}" target="_blank" rel="noopener">${L("hubLink")}</a>`:""}</div>
  </div>`;
  document.getElementById("dClose").onclick=()=>dlg.close();
  if(!dlg.open)dlg.showModal();
  dlg.scrollTop=0;
}
