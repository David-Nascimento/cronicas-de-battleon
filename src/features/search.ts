import {catName} from "../components/shared.js";
import {ICO, RTYPES} from "../config.js";
import {D, DAILIES, FARMS, REL} from "../data/index.js";
import {esc, idx, nrm, sigil, total} from "../lib/util.js";
import {L, save, st} from "../state.js";
import {renderBuilder} from "../views/builder.js";
import {renderCards} from "../views/cards.js";
import {dlg, openClass} from "../views/class-dialog.js";
import {renderDailies} from "../views/dailies.js";
import {renderEnh} from "../views/enhancements.js";
import {renderFarms} from "../views/farms.js";
import {show} from "../views/nav.js";
import {fmtRange, focusItem, ricon} from "../views/releases.js";

/* Uma busca só para tudo: classes, itens novos, diárias e HardFarm. Quem chega pela primeira vez não precisa saber em que aba está cada coisa. */
export const gq=document.getElementById("gq") as HTMLInputElement,gres=document.getElementById("gres");
const ico=k=>`<svg class="sigI" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg>`;
const flash=el=>{if(!el)return;el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800)};
export function runSearch(){const q=nrm(gq.value.trim());if(!q){gres.hidden=true;return}
  const rank=n=>nrm(n).startsWith(q)?0:1,l=st.lang;
  const cls=D.filter(c=>nrm(c.name).includes(q)).sort((a,b)=>rank(a.name)-rank(b.name)||total(b)-total(a)).slice(0,5);
  const its=[];REL.forEach(r=>RTYPES.forEach(t=>(r.items[t]||[]).forEach(it=>{if(nrm(it[0]).includes(q))its.push({r,t,n:it[0]})})));
  its.sort((a,b)=>rank(a.n)-rank(b.n));
  const dn=x=>l==="en"&&x.ne?x.ne:x.n;
  const dl=DAILIES.filter(x=>nrm(x.n).includes(q)||(x.ne&&nrm(x.ne).includes(q))).slice(0,3);
  const fm=FARMS.filter(x=>nrm(x.n).includes(q)||(x.ne&&nrm(x.ne).includes(q))).slice(0,3);
  let h="";
  if(cls.length)h+=`<div class="gsec">${L("g_classes")}</div>`+cls.map(c=>`<button class="open gr" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b><small>${catName(c.cat)}, Farm ${c.farm}, Solo ${c.solo}, Ultra ${c.ultra}</small></span></button>`).join("");
  if(its.length)h+=`<div class="gsec">${L("g_items",{n:its.length})}</div>`+its.slice(0,5).map(x=>`<button class="gr" data-gitem="${esc(x.r.id)}" data-gname="${esc(x.n)}">${ricon(x.t,"sigI")}<span><b>${esc(x.n)}</b><small>${L("rel_t_"+x.t)}, ${fmtRange(x.r)}</small></span></button>`).join("");
  if(dl.length)h+=`<div class="gsec">${L("sec_daily")}</div>`+dl.map(x=>`<button class="gr" data-gdaily="${esc(x.id)}">${ico("diarias")}<span><b>${esc(dn(x))}</b><small>${esc(x.who?x.who[l]:L("daily_g_"+x.g))}</small></span></button>`).join("");
  if(fm.length)h+=`<div class="gsec">HardFarm</div>`+fm.map(x=>`<button class="gr" data-gfarm="${FARMS.indexOf(x)}">${ico("farm")}<span><b>${esc(dn(x))}</b><small>${L("farm_"+x.k)}</small></span></button>`).join("");
  gres.innerHTML=h||`<div class="npEmpty">${L("gnores")}</div>`;
  gres.hidden=false}
function pick(b:HTMLElement){gres.hidden=true;gq.value="";gq.blur();
  if(b.dataset.gitem){show("lancamentos");focusItem(b.dataset.gitem,b.dataset.gname);return true}
  if(b.dataset.gdaily){const id=b.dataset.gdaily,x=DAILIES.find(d=>d.id===id);
    if(x){if(x.g==="old"||x.g==="season")st.df=x.g;else if(st.df!=="all"&&st.df!==x.g)st.df="all";
      if((st.dhide||[]).includes(id))st.dsh=true;save()}
    show("diarias");renderDailies();const t=document.querySelector(`[data-dtoggle="${CSS.escape(id)}"]`);flash(t&&t.closest(".dItem"));return true}
  if(b.dataset.gfarm!=null){const i=+b.dataset.gfarm;st.fk="all";save();show("itens");renderFarms();flash(document.getElementById("farm-"+i));return true}
  return false}
document.getElementById("bq").addEventListener("input",renderBuilder);
document.getElementById("enq").addEventListener("input",renderEnh);
gq.addEventListener("input",runSearch);
gq.addEventListener("focus",runSearch);
gq.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();const f=gres.querySelector<HTMLElement>(".gr");if(f){if(!pick(f)&&f.dataset.i!=null){openClass(+f.dataset.i);gres.hidden=true;gq.value="";gq.blur()}}}if(e.key==="Escape"){gres.hidden=true;gq.blur()}});
document.addEventListener("click",e=>{if(!(e.target as HTMLElement).closest<HTMLElement>(".gsearch")){gres.hidden=true;return}const b=(e.target as HTMLElement).closest<HTMLElement>(".gr");if(!b)return;if(!pick(b)){gres.hidden=true;gq.value=""}});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!dlg.open){e.preventDefault();gq.focus()}});
document.getElementById("q").addEventListener("input",renderCards);
