import {catChip, catName, seg} from "../components/shared.js";
import {CATS, MODES} from "../config.js";
import {D, ENH} from "../data/index.js";
import {esc, idx, nrm, sigil, tColor, total} from "../lib/util.js";
import {L, T, st, ui} from "../state.js";

export const SLOTIDX={"Classe":0,"Arma":1,"Capacete":2,"Capa":3};
export const MLET={farm:"F",solo:"S",ultra:"U"};
export function usersOf(e){
  const key=e[0]==="Forge (base)"?"Forge":e[0],si=SLOTIDX[e[1]];
  return D.map(c=>{const ms=Object.keys(MODES).filter(m=>c.b[m].split("|")[si]===key);return ms.length?{c,ms}:null}).filter(Boolean)
    .sort((a,b)=>b.ms.length-a.ms.length||total(b.c)-total(a.c));
}
export const chipU=u=>`<button class="open" data-i="${idx(u.c)}">${esc(u.c.name)} <i>${u.ms.map(m=>MLET[m]).join("·")}</i></button>`;
export function renderEnh(){
  const SL=["Classe","Arma","Capacete","Capa"];
  seg("segSlot",[["all",L("slot_all")],...SL.map(k=>[k,L("slot_"+k)])],"eslot",renderEnh);
  const eqv=nrm(document.getElementById("enq").value.trim()),hits=eqv?D.filter(c=>nrm(c.name).includes(eqv)).slice(0,3):[],hitK=new Set();
  hits.forEach(c=>Object.keys(MODES).forEach(m=>c.b[m].split("|").forEach((v,si)=>hitK.add(si+":"+v))));
  const isHit=e=>hitK.has(SLOTIDX[e[1]]+":"+(e[0]==="Forge (base)"?"Forge":e[0]));
  const qpanel=!eqv?"":hits.length?hits.map(c=>`<div class="qcard frame"><div class="qh">${sigil(c)}<button class="open" data-i="${idx(c)}">${esc(c.name)}</button>${catChip(c)}</div>
    <div class="tbl"><table><thead><tr><th>${L("thMode")}</th><th>${L("thClass")}</th><th>${L("thWeapon")}</th><th>${L("thHelm")}</th><th>${L("thCape")}</th></tr></thead><tbody>${Object.keys(MODES).map(m=>`<tr><td>${MODES[m]} <span class="b" style="background:${tColor(c[m])};margin-left:4px">${c[m]}</span></td>${c.b[m].split("|").map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`).join("")+`<p class="sub" style="margin:0">${L("enh_qhint")}</p>`
    :`<p class="npEmpty">${L("gnores")}</p>`;
  document.getElementById("enh").innerHTML=qpanel+SL.filter(k=>st.eslot==="all"||st.eslot===k).map(k=>{const items=ENH.map((e,ei)=>[e,ei]).filter(([e])=>e[1]===k);
  return `<div class="enhGrp"><h3>${L("slot_"+k)}<small>${L("slot_n",{n:items.length})}</small></h3><div class="enh">`+items.map(([e,ei])=>{const us=usersOf(e);
  return `<div class="ec frame ${hits.length?(isHit(e)?"hit":"dim"):""}"><div class="top"><span class="slot">${L("slot_"+e[1])}</span><span class="stars" aria-label="${e[2]} ${L("of5")}">${"★".repeat(e[2])}${"☆".repeat(5-e[2])}</span></div>
  <b>${e[0]}</b><p>${esc(T(e[3]))}</p><div class="use"><strong>${L("bestOn")}</strong> ${esc(T(e[4]))}</div>
  ${us.length?`<div class="ecWrap"><div class="usedList" aria-label="${L("enh_top")}">${us.slice(0,5).map(chipU).join("")}</div>
  ${us.length>5?`<button class="usedBtn" data-enhall="${ei}">${L("enh_all",{n:us.length})}</button>`:""}</div>`:`<p style="font-size:12px">${L("enh_none")}</p>`}</div>`}).join("")+`</div></div>`}).join("");
}
export const dlgE=document.getElementById("dlgE");
export function openEnh(ei){ui.eIdx=ei;ui.eCat="all";const e=ENH[ei];
  document.getElementById("eBody").innerHTML=`<div class="dh"><div class="info"><h3 id="eName">${e[0]}</h3><div class="badges"><span class="chip">${L("slot_"+e[1])}</span><span class="stars">${"★".repeat(e[2])}${"☆".repeat(5-e[2])}</span></div></div><button class="x" id="eClose" aria-label="${L("close")}">×</button></div>
  <div class="db"><p style="margin:0">${esc(T(e[3]))}</p>
  <div class="eCtl"><input type="search" id="eq" placeholder="${L("enh_flt")}" aria-label="${L("enh_flt")}"><div class="seg" id="eCatSeg"></div></div>
  <div class="sub" style="margin:0">${L("enh_modes")}</div><div id="eList" style="display:flex;flex-direction:column;gap:16px"></div></div>`;
  document.getElementById("eClose").onclick=()=>dlgE.close();
  document.getElementById("eq").addEventListener("input",updEnh);
  updEnh();if(!dlgE.open)dlgE.showModal();dlgE.scrollTop=0}
export function updEnh(){const us=usersOf(ENH[ui.eIdx]),q=nrm(document.getElementById("eq").value.trim());
  const cats=Object.keys(CATS).filter(k=>us.some(u=>u.c.cat===k));
  const sg=document.getElementById("eCatSeg");
  sg.innerHTML=[["all",L("all")],...cats.map(k=>[k,catName(k)])].map(([v,l])=>`<button data-v="${v}" aria-pressed="${ui.eCat===v}">${l}</button>`).join("");
  sg.onclick=ev=>{const b=ev.target.closest("button");if(!b)return;ui.eCat=b.dataset.v;updEnh()};
  document.getElementById("eList").innerHTML=cats.filter(k=>ui.eCat==="all"||k===ui.eCat).map(k=>{
    const xs=us.filter(u=>u.c.cat===k&&(!q||nrm(u.c.name).includes(q)));
    return xs.length?`<div class="eGrp"><h4><span class="dot" style="background:var(${CATS[k].c})"></span>${catName(k)} · ${xs.length}</h4><div class="usedList">${xs.map(chipU).join("")}</div></div>`:""}).join("")||`<p class="npEmpty">${L("gnores")}</p>`}
dlgE.addEventListener("click",e=>{if(e.target===dlgE)dlgE.close()});
