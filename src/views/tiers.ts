import {catName, seg} from "../components/shared.js";
import {TIERS} from "../config.js";
import {D, byName} from "../data/index.js";
import {toast} from "../features/toasts.js";
import {esc, idx, score, sigil, tColor, total} from "../lib/util.js";
import {L, T, save, st} from "../state.js";
import type {Klass, Tier} from "../types.js";

/* Tier list: a do portal (valores pré-definidos) ou a sua, montada a partir dela.
   A sua fica salva no navegador, uma por loja e modo, em st.mytier["loja|modo"] = {S:[...],A,B,C,N}.
   N = "sem tier". Para mover: arraste com o mouse, ou toque na classe e depois no tier. */
type Row = Tier | "N";
type Mine = Record<Row, string[]>;
const ROWS: Row[] = [...(TIERS as Tier[]), "N"];
let sel: string | null = null, lastKey = "";

export const overall=(c:Klass)=>{const s=Math.max(score(c.farm),score(c.solo),score(c.ultra)),sum=total(c);
  if(s===4&&sum>=10)return"S";if(s===4||sum>=9)return"A";if(sum>=6)return"B";return"C"};
const list=()=>D.filter(c=>c.cat===st.cat).sort((a,b)=>total(b)-total(a));
const tierOf=(c:Klass)=>st.mode==="geral"?overall(c):c[st.mode as "farm"|"solo"|"ultra"];
const key=()=>st.cat+"|"+st.mode;
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
  if(st.tsrc!=="mine")st.tsrc="portal";
  if(key()!==lastKey){sel=null;lastKey=key()}
  seg("segTsrc",[["portal",L("tl_portal")],["mine",L("tl_mine")]],"tsrc",()=>{sel=null;renderTiers()});
  const edit=st.tsrc==="mine",box=document.getElementById("tiers");
  const tools=document.getElementById("tierTools");
  if(!edit){sel=null;tools.innerHTML="";
    box.innerHTML=TIERS.map(t=>{const xs=list().filter(c=>tierOf(c)===t);
      return `<div class="tier"><div class="tl" style="background:${tColor(t)}">${t}</div><div class="tr">${xs.length?xs.map(c=>card(c,false)).join(""):`<span class="empty">${L("empty",{c:catName(st.cat)})}</span>`}</div></div>`}).join("");
    return}
  const m=mine(),custom=!!store()[key()];
  const s=sel?D[byName[sel]]:null;
  tools.innerHTML=`<div class="tlBar frame">
    ${s?`<div class="tlMove"><b>${L("tl_move",{c:esc(s.name)})}</b><span class="tlBtns">${ROWS.map(r=>`<button class="tlTo t${r}" data-tto="${r}">${r==="N"?L("tl_none"):r}</button>`).join("")}<button class="linkBtn open" data-i="${idx(s)}">${L("tl_card")}</button><button class="linkBtn" data-tcancel>${L("tl_cancel")}</button></span></div>`
      :`<p class="tlHint">${L("tl_hint")}${custom?"":` <span class="pill soon">${L("tl_from_portal")}</span>`}</p>`}
    <div class="tlActs"><button class="btnQ" data-treset>${L("tl_reset")}</button><button class="btnQ" data-tzero>${L("tl_zero")}</button><button class="btnQ" data-tcopy>${L("tl_copy")}</button></div></div>`;
  box.innerHTML=ROWS.map(r=>{const xs=m[r].map(n=>D[byName[n]]).filter(Boolean);
    return `<div class="tier${r==="N"?" none":""}" data-trow="${r}"><div class="tl" style="background:${r==="N"?"var(--line)":tColor(r)}">${r==="N"?`<small>${L("tl_none")}</small>`:r}</div><div class="tr">${xs.length?xs.map(c=>card(c,true)).join(""):`<span class="empty">${L(r==="N"?"tl_none_empty":"tl_drop")}</span>`}</div></div>`}).join("");
}

/* eventos da edição */
const root=document.getElementById("v-tier");
root.addEventListener("click",e=>{if(st.tsrc!=="mine")return;const t=e.target as HTMLElement;
  const c=t.closest<HTMLElement>("[data-tname]");if(c){sel=sel===c.dataset.tname?null:c.dataset.tname;renderTiers();return}
  const to=t.closest<HTMLElement>("[data-tto]");if(to&&sel){move(sel,to.dataset.tto as Row);sel=null;renderTiers();return}
  if(t.closest("[data-tcancel]")){sel=null;renderTiers();return}
  if(t.closest("[data-treset]")){delete store()[key()];save();sel=null;renderTiers();toast("↺",L("tl_reset_done"));return}
  if(t.closest("[data-tzero]")){put({S:[],A:[],B:[],C:[],N:list().map(c=>c.name)});sel=null;renderTiers();return}
  if(t.closest("[data-tcopy]")){const m=mine(),txt=`${L("tl_mine")} — ${catName(st.cat)}, ${st.mode==="geral"?L("overall"):st.mode}\n`+TIERS.map(r=>`${r}: ${m[r as Tier].join(", ")||"—"}`).join("\n");
    try{const w=navigator.clipboard&&navigator.clipboard.writeText(txt);if(w&&w.catch)w.catch(()=>{})}catch(_){}toast("✓",L("tl_copied"));return}
  /* com uma classe escolhida, tocar numa linha de tier também move */
  const row=t.closest<HTMLElement>("[data-trow]");if(row&&sel){move(sel,row.dataset.trow as Row);sel=null;renderTiers()}
});
let drag:string|null=null;
root.addEventListener("dragstart",e=>{const c=(e.target as HTMLElement).closest<HTMLElement>("[data-tname]");if(!c)return;drag=c.dataset.tname;e.dataTransfer.effectAllowed="move";e.dataTransfer.setData("text/plain",drag)});
root.addEventListener("dragover",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(!row||!drag)return;e.preventDefault();
  root.querySelectorAll(".tier.over").forEach(x=>x!==row&&x.classList.remove("over"));row.classList.add("over")});
root.addEventListener("dragleave",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(row&&!row.contains(e.relatedTarget as Node))row.classList.remove("over")});
root.addEventListener("drop",e=>{const row=(e.target as HTMLElement).closest<HTMLElement>("[data-trow]");if(!row||!drag)return;e.preventDefault();
  const before=(e.target as HTMLElement).closest<HTMLElement>("[data-tname]");
  move(drag,row.dataset.trow as Row,before&&before.dataset.tname!==drag?before.dataset.tname:undefined);drag=null;sel=null;renderTiers()});
root.addEventListener("dragend",()=>{drag=null;root.querySelectorAll(".tier.over").forEach(x=>x.classList.remove("over"))});
