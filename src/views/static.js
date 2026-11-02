import {catName} from "../components/shared.js";
import {MODES} from "../config.js";
import {D, ENH, TEAMS} from "../data/index.js";
import {esc, idx, score, sigil, tColor, total} from "../lib/util.js";
import {L, st} from "../state.js";
import {renderNav} from "./nav.js";

export function renderStatic(){
  document.documentElement.lang=st.lang==="en"?"en":"pt-BR";
  document.title=L("title");
  document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=L(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-html]").forEach(el=>el.innerHTML=L(el.dataset.i18nHtml));
  const q=document.getElementById("q");q.placeholder=L("search");q.setAttribute("aria-label",L("search"));
  document.getElementById("bq").placeholder=L("bld_search");
  const eqi=document.getElementById("enq");eqi.placeholder=L("enh_q");eqi.setAttribute("aria-label",L("enh_q"));
  const g=document.getElementById("gq");g.placeholder=L("gsearch");g.setAttribute("aria-label",L("gsearch"));
  renderNav();
  document.getElementById("stats").innerHTML=
    `<span><b>${D.length}</b>${L("st_classes")}</span><span><b>${TEAMS.length}</b>${L("st_ultras")}</span><span><b>${ENH.length}</b>${L("st_enh")}</span><span><b>${D.filter(c=>!c.generic).length}</b>${L("st_rot")}</span>`;
}
export function renderModes(){
  document.getElementById("modes").innerHTML=Object.keys(MODES).map(m=>{
    const top=[...D].sort((a,b)=>score(b[m])-score(a[m])||total(b)-total(a)).slice(0,5);
    return `<div class="mode frame"><h3>${MODES[m]}</h3><div class="why">${L("mi_"+m)}</div>`+top.map((c,i)=>`
      <button class="open rank" data-i="${idx(c)}"><span class="n">${i+1}</span>${sigil(c)}<span class="nm"><b>${esc(c.name)}</b><span>${catName(c.cat)}, ${c.b[m].split("|").join(", ")}</span></span><span class="b" style="background:${tColor(c[m])}">${c[m]}</span></button>`).join("")+`<button class="linkBtn" data-gomode="${m}">${L("home_tier",{m:MODES[m]})}</button></div>`;
  }).join("");
}
