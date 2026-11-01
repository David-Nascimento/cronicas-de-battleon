import {catChip} from "../components/shared.js";
import {MODES} from "../config.js";
import {D, TYPES, byName} from "../data/index.js";
import {esc, idx, score, sigil, tColor} from "../lib/util.js";
import {L, T, save, st} from "../state.js";
import {keys} from "./class-dialog.js";

export function renderCompare(){
  st.cmp=(st.cmp||[]).filter(n=>n in byName).slice(0,3);
  document.getElementById("classList").innerHTML=D.map(c=>`<option value="${esc(c.name)}"></option>`).join("");
  const pick=document.getElementById("cmpPick");
  pick.innerHTML=[0,1,2].map(k=>`<div class="cmpSlot"><input type="search" id="cmp${k}" list="classList" placeholder="${esc(L("cmp_ph",{n:k+1}))}" aria-label="${esc(L("cmp_ph",{n:k+1}))}" value="${esc(st.cmp[k]||"")}"><button data-cmpclear="${k}" aria-label="${esc(L("cmp_clear"))}" title="${esc(L("cmp_clear"))}">×</button></div>`).join("");
  [0,1,2].forEach(k=>{const inp=document.getElementById("cmp"+k);
    inp.addEventListener("change",()=>{const v=inp.value.trim();const hit=D.find(c=>c.name.toLowerCase()===v.toLowerCase());
      const arr=[st.cmp[0]||"",st.cmp[1]||"",st.cmp[2]||""];arr[k]=hit?hit.name:"";st.cmp=arr.filter(Boolean);save();renderCompare()})});
  const cs=st.cmp.map(n=>D[byName[n]]);
  const out=document.getElementById("cmpOut");
  if(!cs.length){out.innerHTML=`<div class="cmpWrap"><div class="cmpEmpty">${L("cmp_empty")}</div></div>`;return}
  const best=m=>Math.max(...cs.map(c=>score(c[m])));
  const row=(h,f)=>`<tr><th scope="row">${h}</th>${cs.map(c=>`<td>${f(c)}</td>`).join("")}</tr>`;
  const bl=s=>`<div class="bl">${s.split("|").map(x=>`<span>${esc(x)}</span>`).join("")}</div>`;
  out.innerHTML=`<div class="cmpWrap"><table class="cmpT"><thead><tr><th scope="row"></th>${cs.map(c=>`<td><button class="open cmpHead" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b>${catChip(c)}</span></button></td>`).join("")}</tr></thead><tbody>
    ${Object.keys(MODES).map(m=>row(MODES[m],c=>`<span class="b ${score(c[m])===best(m)&&cs.length>1?"best":""}" style="background:${tColor(c[m])}">${c[m]}</span>`)).join("")}
    ${row(L("row_type"),c=>esc(T(TYPES[c.type].n)))}
    ${row(L("row_note"),c=>esc(T(c.note)))}
    ${Object.keys(MODES).map(m=>row(L("row_build",{m:MODES[m]}),c=>bl(c.b[m]))).join("")}
    ${row(L("noForge").replace(":",""),c=>esc(T(c.awe)))}
    ${row(L("row_rot"),c=>`<div style="font-size:12px;color:var(--muted);margin-bottom:4px">${esc(T(c.rot[0][0]))}</div><div class="keys">${keys(c.rot[0][1])}</div>`)}
    ${row(L("row_how"),c=>c.ob?esc(T(c.ob[0])):c.yr?L("calYear",{y:c.yr}):L("seeWiki"))}
  </tbody></table></div>`;
}
export function addCompare(i){const n=D[i].name;st.cmp=st.cmp||[];if(!st.cmp.includes(n)&&st.cmp.length<3)st.cmp.push(n);save()}
