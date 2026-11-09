import {seg} from "../components/shared.js";
import {DROP_GROUPS, DROP_GROUP_OF} from "../config.js";
import {DROPDATA} from "../data/index.js";
import {toast} from "../features/toasts.js";
import {esc, has, wiki} from "../lib/util.js";
import {L, st, ui} from "../state.js";
import {ricon} from "./releases.js";

/* Drops 0 AC: equipamentos que caem de monstros e saem por 0 AC, lidos do AQW Wiki por tools/drops/aqw_scraper.py (dados em data/drops.json).
   Cada linha mostra quem dropa, o mapa e o /join para copiar. A busca do topo também acha esses itens. */
const items=()=>DROPDATA.items||[];
const grp=(c:string)=>DROP_GROUP_OF(c);
export function renderDrops(){
  const all=items(),q=(ui.dropQ||"").trim(),f=DROP_GROUPS.includes(st.dc as string)?(st.dc as string):"all";
  const n=(g:string)=>all.filter(i=>g==="all"||grp(i.c)===g).length;
  seg("segDrops",[["all",`${L("all")} <b>${n("all")}</b>`],...DROP_GROUPS.filter(g=>n(g)).map(g=>[g,`${L("drops_g_"+g)} <b>${n(g)}</b>`])],"dc",renderDrops);
  const inp=document.getElementById("dropQ") as HTMLInputElement;
  inp.placeholder=L("drops_q");inp.setAttribute("aria-label",L("drops_q"));if(inp.value!==q)inp.value=ui.dropQ||"";
  const meta=document.getElementById("dropMeta"),box=document.getElementById("drops");
  if(!all.length){meta.textContent="";box.innerHTML=`<p class="relEmpty dpEmpty">${L("drops_none")}</p>`;return}
  meta.textContent=DROPDATA.updated?L("drops_upd",{d:DROPDATA.updated.split("-").reverse().join("/")}):"";
  const rows=all.filter(i=>(f==="all"||grp(i.c)===f)&&(has(i.n,q)||has(i.by||"",q)||i.loc.some(l=>has(l.n,q))));
  if(!rows.length){box.innerHTML=`<p class="relEmpty">${L("rel_empty")}</p>`;return}
  /* agrupado por quem dropa: um monstro, vários itens */
  const by=new Map<string,typeof rows>();
  rows.forEach(i=>{const k=i.by||"";(by.get(k)||by.set(k,[]).get(k)).push(i)});
  box.innerHTML=[...by.entries()].sort((a,b)=>(a[0]===""?1:0)-(b[0]===""?1:0)||a[0].localeCompare(b[0])).map(([who,list])=>{
    const locs=[...new Map(list.flatMap(i=>i.loc).map(l=>[l.n,l])).values()];
    return `<section class="relGrp"><h3><span>${esc(who||L("drops_unknown"))}</span> <small>${list.length}</small>${locs.filter(l=>l.j).slice(0,2).map(l=>`<code class="jn s" data-j="${esc(l.j)}" title="${esc(L("farm_copy_j",{m:l.j}))}">/${esc(l.j)}</code>`).join("")}</h3>
      <div class="relItems">${list.map(i=>`<div class="ri dp" data-dp="${esc(i.n)}">${ricon(DROP_GROUPS.includes(i.c)?i.c:"weapon")}<div class="riTx"><a href="${wiki(i.n)}" target="_blank" rel="noopener">${esc(i.n)}</a><span class="riMeta"><span>${esc(DROP_GROUPS.includes(i.c)?L("drops_g_"+i.c):L("w_"+i.c))}</span>${i.loc.length?`<span class="from">${esc(i.loc.map(l=>l.n).join(", "))}</span>`:""}</span></div><span class="riTags"><i class="tg z">0 AC</i></span></div>`).join("")}</div></section>`}).join("");
}
export function focusDrop(name:string){st.dc="all";ui.dropQ=name;renderDrops()}
document.addEventListener("input",e=>{if((e.target as HTMLElement).id==="dropQ"){ui.dropQ=(e.target as HTMLInputElement).value;renderDrops()}});
document.addEventListener("click",e=>{const c=(e.target as HTMLElement).closest&&(e.target as HTMLElement).closest<HTMLElement>("#drops code.jn");if(!c)return;
  const t="/join "+c.dataset.j;try{const w=navigator.clipboard&&navigator.clipboard.writeText(t);if(w&&w.catch)w.catch(()=>{})}catch(_){}toast("✓",t,L("farm_copied"))});
