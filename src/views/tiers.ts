import {catName, seg} from "../components/shared.js";
import {MODES, TIERS} from "../config.js";
import {tierImage, tierLink, type Shared} from "../features/share-tier.js";
import {D, byName} from "../data/index.js";
import {toast} from "../features/toasts.js";
import {esc, idx, nrm, score, sigil, tColor, total, has} from "../lib/util.js";
import {L, T, save, st} from "../state.js";
import type {Klass, Tier} from "../types.js";

/* Tier list: a do portal (valores pré-definidos) ou a sua, montada a partir dela.
   A sua fica salva no navegador, uma por loja e modo, em st.mytier["loja|modo"] = {S:[...],A,B,C,N}.
   N = "sem tier". Para mover: arraste com o mouse, ou toque na classe e depois no tier. */
type Row = Tier | "N";
type Mine = Record<Row, string[]>;
const ROWS: Row[] = [...(TIERS as Tier[]), "N"];
let sel: string | null = null, lastKey = "", q = "", shared: Shared | null = null, link = "";
const modeName=(m:string)=>m==="geral"?L("overall"):MODES[m]||m;
/* abre uma tier list que chegou por link (só leitura, até a pessoa salvar como dela) */
export function openShared(t:Shared){shared=t;if(["geral","farm","solo","ultra"].includes(t.m))st.mode=t.m;st.tsrc="shared";save()}

export const overall=(c:Klass)=>{if(c.farm==="N"as any&&c.solo==="N"as any&&c.ultra==="N"as any)return "N";const s=Math.max(score(c.farm),score(c.solo),score(c.ultra)),sum=total(c);
  if(s===4&&sum>=10)return"S";if(s===4||sum>=9)return"A";if(sum>=6)return"B";return"C"};
/* a do portal mostra uma loja por vez; a sua junta todas as classes (quem monta tier list compara tudo) */
const list=()=>(st.tsrc==="mine"?[...D]:D.filter(c=>c.cat===st.cat)).sort((a,b)=>total(b)-total(a));
const tierOf=(c:Klass)=>st.mode==="geral"?overall(c):c[st.mode as "farm"|"solo"|"ultra"];
const key=()=>"all|"+st.mode;
const store=()=>(st.mytier||(st.mytier={})) as Record<string,Mine>;
function portalMine():Mine{const m:Mine={S:[],A:[],B:[],C:[],N:[]};list().forEach(c=>m[tierOf(c) as Tier].push(c.name));return m}
/* a sua lista, já conciliada com as classes atuais (novas entram em "sem tier", removidas somem) */
function mine():Mine{const saved=store()[key()];if(!saved)return portalMine();
  const names=new Set(list().map(c=>c.name)),seen=new Set<string>(),m:Mine={S:[],A:[],B:[],C:[],N:[]};
  ROWS.forEach(r=>(saved[r]||[]).forEach(n=>{if(names.has(n)&&!seen.has(n)){m[r].push(n);seen.add(n)}}));
  list().forEach(c=>{if(!seen.has(c.name))m.N.push(c.name)});return m}
function put(m:Mine){store()[key()]=m;save()}
function move(name:string,to:Row,before?:string){const m=mine();ROWS.forEach(r=>m[r]=m[r].filter(n=>n!==name));
  const i=before?m[to].indexOf(before):-1;if(i>=0)m[to].splice(i,0,name);else m[to].push(name);put(m)}

const card=(c:Klass,edit:boolean)=>edit
  ?`<button class="tc${sel===c.name?" sel":""}" draggable="true" data-tname="${esc(c.name)}" aria-pressed="${sel===c.name}" title="${esc(T(c.note))}">${sigil(c,"lg")}<span>${esc(c.name)}</span></button>`
  :`<button class="open tc" data-i="${idx(c)}" title="${esc(T(c.note))}">${sigil(c,"lg")}<span>${esc(c.name)}</span></button>`;

export function renderTiers(){
  if(st.tsrc!=="mine"&&!(st.tsrc==="shared"&&shared))st.tsrc="portal";
  if(key()!==lastKey){sel=null;link="";lastKey=key()}
  seg("segTsrc",[["portal",L("tl_portal")],["mine",L("tl_mine")],...(shared?[["shared",L("tl_shared")]]:[])],"tsrc",()=>{sel=null;link="";renderTiers()});
  const edit=st.tsrc==="mine",box=document.getElementById("tiers");
  document.getElementById("segCat").hidden=st.tsrc!=="portal";
  if(st.tsrc==="shared"){sel=null;document.getElementById("tierPool").hidden=true;
    const known=(n:string)=>byName[n]!=null;
    document.getElementById("tierTools").innerHTML=`<div class="tlBar frame tlShared"><p class="tlHint"><b>${L("tl_shared_h")}</b> ${L("tl_shared_x",{m:esc(modeName(shared.m))})}</p>
      <div class="tlActs"><button class="btnG" data-tsave>${L("tl_shared_save")}</button><button class="btnQ" data-tclose>${L("tl_shared_close")}</button></div></div>`;
    box.innerHTML=TIERS.map(t=>{const xs=(shared[t as Tier]||[]).filter(known).map(n=>D[byName[n]]);
      return `<div class="tier"><div class="tl" style="background:${tColor(t)}">${t}<em class="tlN">${xs.length}</em></div><div class="tr">${xs.length?xs.map(c=>card(c,false)).join(""):`<span class="empty">—</span>`}</div></div>`}).join("");
    return}
  const pool=document.getElementById("tierPool"),qi=document.getElementById("tierQ") as HTMLInputElement;pool.hidden=!edit;qi.placeholder=L("tl_q");qi.setAttribute("aria-label",L("tl_q"));
  const nq=nrm(q.trim()),hit=(c:Klass)=>has(c.name,nq);
  const tools=document.getElementById("tierTools");
  if(!edit){sel=null;tools.innerHTML="";document.getElementById("tierPool").hidden=true;
    const unr=list().filter(c=>tierOf(c)==="N");
    box.innerHTML=(st.cat==="nova"?"":TIERS.map(t=>{const xs=list().filter(c=>tierOf(c)===t);
      return `<div class="tier"><div class="tl" style="background:${tColor(t)}">${t}</div><div class="tr">${xs.length?xs.map(c=>card(c,false)).join(""):`<span class="empty">${L("empty",{c:catName(st.cat)})}</span>`}</div></div>`}).join(""))
      +(unr.length?`<div class="tier tierNew"><div class="tl" style="background:var(--tN)">?</div><div class="tr"><p class="tlNewX">${L("tl_new_x")}</p>${unr.map(c=>card(c,false)).join("")}</div></div>`:"");
    return}
  const m=mine(),custom=!!store()[key()];
  const s=sel?D[byName[sel]]:null;
  tools.innerHTML=`<div class="tlBar frame">
    ${s?`<div class="tlMove"><b>${L("tl_move",{c:esc(s.name)})}</b><span class="tlBtns">${ROWS.map(r=>`<button class="tlTo t${r}" data-tto="${r}">${r==="N"?L("tl_none"):r}</button>`).join("")}<button class="linkBtn open" data-i="${idx(s)}">${L("tl_card")}</button><button class="linkBtn" data-tcancel>${L("tl_cancel")}</button></span></div>`
      :`<p class="tlHint">${L("tl_hint")}${custom?"":` <span class="pill soon">${L("tl_from_portal")}</span>`}</p>`}
    <div class="tlActs"><span class="tlShareL">${L("tl_share")}</span><button class="btnG" data-timg>${L("tl_img")}</button><button class="btnG" data-tlink>${L("tl_link")}</button><button class="btnQ" data-tcopy>${L("tl_copy")}</button>
      <span class="tlSep" aria-hidden="true"></span><button class="btnQ" data-treset>${L("tl_reset")}</button><button class="btnQ" data-tzero>${L("tl_zero")}</button></div>
    ${link?`<div class="tlLink"><label for="tlLinkIn">${L("tl_link_x")}</label><input id="tlLinkIn" readonly value="${esc(link)}"></div>`:""}</div>`;
  /* os tiers em cima; "Sem tier" embaixo, com a própria busca (que procura só ali) */
  box.innerHTML=TIERS.map(r=>{const xs=m[r as Tier].map(n=>D[byName[n]]).filter(Boolean);
    return `<div class="tier" data-trow="${r}"><div class="tl" style="background:${tColor(r)}">${r}<em class="tlN">${xs.length}</em></div><div class="tr">${xs.length?xs.map(c=>card(c,true)).join(""):`<span class="empty">${L("tl_drop")}</span>`}</div></div>`}).join("");
  const xs=m.N.map(n=>D[byName[n]]).filter(Boolean),vis=xs.filter(hit);
  document.getElementById("poolT").innerHTML=`${L("tl_none")} <small>${nq?`${vis.length}/`:""}${xs.length}</small>`;
  document.getElementById("poolList").innerHTML=vis.length?vis.map(c=>card(c,true)).join(""):`<span class="empty">${nq&&xs.length?L("tl_nohit"):L("tl_none_empty")}</span>`;
}

/* eventos da edição */
const root=document.getElementById("v-tier");
const asShared=():Shared=>{const m=mine();return {m:st.mode,S:m.S,A:m.A,B:m.B,C:m.C}};
const copy=(txt:string)=>{try{const w=navigator.clipboard&&navigator.clipboard.writeText(txt);if(w&&w.catch)w.catch(()=>{})}catch(_){}};
root.addEventListener("click",e=>{const t=e.target as HTMLElement;
  if(st.tsrc==="shared"){
    if(t.closest("[data-tsave]")&&shared){const ok=new Set(D.map(c=>c.name)),seen=new Set<string>(),m:Mine={S:[],A:[],B:[],C:[],N:[]};
      TIERS.forEach(r=>(shared[r as Tier]||[]).forEach(n=>{if(ok.has(n)&&!seen.has(n)){m[r as Tier].push(n);seen.add(n)}}));
      st.mode=shared.m;store()["all|"+shared.m]=m;shared=null;st.tsrc="mine";save();renderTiers();toast("★",L("tl_shared_saved"));return}
    if(t.closest("[data-tclose]")){shared=null;st.tsrc="portal";save();renderTiers();return}
    return}
  if(st.tsrc!=="mine")return;
  if(t.closest("[data-tlink]")){tierLink(asShared()).then(u=>{link=u;copy(u);renderTiers();const i=document.getElementById("tlLinkIn") as HTMLInputElement;if(i){i.focus();i.select()}toast("🔗",L("tl_link_done"))});return}
  if(t.closest("[data-timg]")){const sh=asShared();
    tierImage(sh,L("tl_mine"),modeName(sh.m),"Crônicas de Battleon").then(async b=>{const f=new File([b],"tier-list-"+sh.m+".png",{type:"image/png"});
      const n=navigator as any;
      if(matchMedia("(pointer:coarse)").matches&&n.canShare&&n.canShare({files:[f]})){try{await n.share({files:[f],title:L("tl_mine")});return}catch(_){}}
      const a=document.createElement("a");a.href=URL.createObjectURL(f);a.download=f.name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);toast("⬇",L("tl_img_done"))});return}
  const c=t.closest<HTMLElement>("[data-tname]");if(c){sel=sel===c.dataset.tname?null:c.dataset.tname;renderTiers();return}
  const to=t.closest<HTMLElement>("[data-tto]");if(to&&sel){move(sel,to.dataset.tto as Row);sel=null;renderTiers();return}
  if(t.closest("[data-tcancel]")){sel=null;renderTiers();return}
  if(t.closest("[data-treset]")){delete store()[key()];save();sel=null;renderTiers();toast("↺",L("tl_reset_done"));return}
  if(t.closest("[data-tzero]")){put({S:[],A:[],B:[],C:[],N:list().map(c=>c.name)});sel=null;renderTiers();return}
  if(t.closest("[data-tcopy]")){const m=mine(),txt=`${L("tl_mine")}, ${st.mode==="geral"?L("overall"):st.mode}\n`+TIERS.map(r=>`${r}: ${m[r as Tier].join(", ")||"—"}`).join("\n");
    copy(txt);toast("✓",L("tl_copied"));return}
  /* com uma classe escolhida, tocar numa linha de tier também move */
  const row=t.closest<HTMLElement>("[data-trow]");if(row&&sel&&!t.closest("input")){move(sel,row.dataset.trow as Row);sel=null;renderTiers()}
});
let drag:string|null=null;
root.addEventListener("dragstart",e=>{const c=(e.target as HTMLElement).closest<HTMLElement>("[data-tname]");if(!c)return;drag=c.dataset.tname;e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",drag)});
root.addEventListener("dragover",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(!row||!drag)return;e.preventDefault();
  root.querySelectorAll(".over").forEach(x=>x!==row&&x.classList.remove("over"));row.classList.add("over")});
root.addEventListener("dragleave",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(row&&!row.contains(e.relatedTarget as Node))row.classList.remove("over")});
root.addEventListener("drop",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(!row||!drag)return;e.preventDefault();
  const before=(e.target as HTMLElement).closest<HTMLElement>("[data-tname]");
  move(drag,row.dataset.trow as Row,before&&before.dataset.tname!==drag?before.dataset.tname:undefined);drag=null;sel=null;renderTiers()});
root.addEventListener("dragend",()=>{drag=null;root.querySelectorAll(".over").forEach(x=>x.classList.remove("over"))});
document.getElementById("tierQ").addEventListener("input",e=>{q=(e.target as HTMLInputElement).value;renderTiers()});
