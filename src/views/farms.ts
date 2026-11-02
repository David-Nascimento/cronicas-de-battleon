import {seg} from "../components/shared.js";
import {D, FARMS, byName} from "../data/index.js";
import {toast} from "../features/toasts.js";
import {esc, idx, sigil} from "../lib/util.js";
import {L, st} from "../state.js";

document.addEventListener("click",e=>{const c=(e.target as HTMLElement).closest&&(e.target as HTMLElement).closest<HTMLElement>("code.jn");if(!c)return;const t="/join "+c.dataset.j;try{const w=navigator.clipboard&&navigator.clipboard.writeText(t);if(w&&w.catch)w.catch(()=>{})}catch(_){}toast("✓",t,L("farm_copied"))});
export function renderFarms(){
  seg("segFarm",[["all",L("farm_all")],["class",L("farm_class")],["gear",L("farm_gear")],["mat",L("farm_mat")],["rep",L("farm_rep")],["daily",L("farm_daily")],["season",L("farm_season")]],"fk",renderFarms);
  const f=st.fk||"all",lg=st.lang==="en"?"en":"pt";
  const jn=t=>esc(t).replace(/(^|[\s(])\/(?!goto\b|join\b)([a-z0-9]{3,})/g,(a,b,c)=>`${b}<code class="jn" data-j="${c}" title="${L("farm_copied")}">/join ${c}</code>`);
  document.getElementById("farms").innerHTML=FARMS.filter(x=>f==="all"||x.k===f).map(x=>{const c=x.cls&&x.cls in byName?D[byName[x.cls]]:null;
    return `<article class="fcard frame" id="farm-${FARMS.indexOf(x)}"><div class="fh">${c?sigil(c):""}<div><h3>${esc(lg==="en"&&x.ne?x.ne:x.n)}</h3>${x.e?`<span class="eff e${x.e}" title="${L("farm_eff")}"><i aria-hidden="true">${[1,2,3,4,5].map(i=>`<b class="${i<=x.e?"on":""}"></b>`).join("")}</i><em>${L("eff"+x.e)}</em></span>`:""}</div></div>
    ${x.j&&x.j.length?`<div class="fjoin">${L("farm_join")}: ${x.j.map(m=>`<code class="jn" data-j="${m}" title="${L("farm_copied")}">/join ${m}</code>`).join(" ")}</div>`:""}
    <h4>${L("farm_need")}</h4><ul>${x.req.map(r=>`<li>${jn(r[lg])}</li>`).join("")}</ul>
    <div class="fnote">${jn(x.note[lg])}</div>
    ${c?`<button class="fbtn open" data-i="${idx(c)}">${L("farm_open")}</button>`:""}
    <div class="fsrc">${L("farm_src")}: <a href="${x.src}" target="_blank" rel="noopener">${esc(x.sn)} ↗</a></div></article>`}).join("");
}
