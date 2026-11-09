import {catName} from "../components/shared.js";
import {ICO, RTYPES} from "../config.js";
import {D, DAILIES, DROPDATA, FARMS, REL, dropJoin} from "../data/index.js";
import {esc, idx, nrm, sigil, total, has, skey, wiki} from "../lib/util.js";
import {L, save, st} from "../state.js";
import {renderBuilder} from "../views/builder.js";
import {renderCards} from "../views/cards.js";
import {dlg, openClass} from "../views/class-dialog.js";
import {renderDailies} from "../views/dailies.js";
import {renderEnh} from "../views/enhancements.js";
import {renderFarms} from "../views/farms.js";
import {toast} from "./toasts.js";
import {renderTiers} from "../views/tiers.js";
import {show} from "../views/nav.js";
import {fmtRange, focusItem, ricon} from "../views/releases.js";

/* Uma busca só para tudo: classes, itens novos, drops 0 AC, diárias e HardFarm. O drop mostra quem dropa e o mapa; tocar copia o /join (ou abre o wiki, sem join). Quem chega pela primeira vez não precisa saber em que aba está cada coisa. */
export const gq=document.getElementById("gq") as HTMLInputElement,gres=document.getElementById("gres");
const ico=k=>`<svg class="sigI" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg>`;
const flash=el=>{if(!el)return;el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800)};
/* "Ir para": quem digita o nome de uma parte do portal ("tier list", "diárias", "enh") cai direto nela.
   [aba, chave do nome, chave do destino, ícone, palavras que levam até lá] */
const PAGES:[string,string,string,string,string][]=[
  ["inicio","sec_inicio","","inicio","hoje|inicio|início|home|today|começo|resumo"],
  ["tier","tab_tier","sec_classes","classes","tier list|tierlist|tier|ranking|melhores classes|best classes|qual classe usar"],
  ["mytier","tl_mine","sec_classes","classes","minha tier list|my tier list|criar tier list|montar tier list|make tier list|compartilhar tier list"],
  ["todas","tab_all","sec_classes","classes","todas as classes|lista de classes|all classes|classes"],
  ["comparar","tab_cmp","sec_classes","classes","comparar|compare|versus|vs"],
  ["enh","sec_enh","sec_classes","classes","enhancements|enhancement|enh|forge|encantamento|encantamentos|build"],
  ["ultras","sub_teams","sec_ultras","ultras","ultra|ultras|ultra boss|agenda|times de ultra|teams|schedule|semanal|weekly"],
  ["montador","tab_builder","sec_ultras","ultras","montador|montar time|team builder|builder|time"],
  ["diarias","sec_daily","sec_farm","diarias","diarias|diárias|diaria|daily|dailies|quests diarias|reset"],
  ["mydaily","daily_g_mine","sec_farm","diarias","minhas diarias|minhas diárias|my dailies|escolher diarias|lembrete"],
  ["itens","sec_items","sec_farm","farm","hardfarm|hard farm|farm|farmar|grind|reputação|reputacao|rep"],
  ["hub","sec_events","sec_inicio","eventos","event hub|eventhub|evento do mes|evento do mês|eventos|sazonal|sazonais|seasonal|neste mes|this month"],
  ["lancamentos","tab_releases","sec_news","novidades","itens novos|new items|lançamentos|lancamentos|atualização|atualizacao|update|evento|event|release"],
  ["novidades","tab_news","sec_news","novidades","notícias|noticias|news|design notes|rework|novidades"]];
function pages(q:string){const k=skey(q);if(k.length<2)return [];
  return PAGES.filter(p=>p[4].split("|").some(w=>{const kw=skey(w);return kw.startsWith(k)||(k.length>=4&&k.includes(kw)&&kw.length>=3)})).slice(0,3)}
export function runSearch(){const q=nrm(gq.value.trim());if(!q){gres.hidden=true;return}
  const rank=n=>skey(n).startsWith(skey(q))?0:1,l=st.lang;
  const cls=D.filter(c=>has(c.name,q)).sort((a,b)=>rank(a.name)-rank(b.name)||total(b)-total(a)).slice(0,5);
  const its=[];REL.forEach(r=>RTYPES.forEach(t=>(r.items[t]||[]).forEach(it=>{if(has(it[0],q))its.push({r,t,n:it[0]})})));
  its.sort((a,b)=>rank(a.n)-rank(b.n));
  const dr=DROPDATA.items.filter(i=>has(i.n,q)).sort((a,b)=>rank(a.n)-rank(b.n));
  const dn=x=>l==="en"&&x.ne?x.ne:x.n;
  const dl=DAILIES.filter(x=>has(x.n,q)||(x.ne&&has(x.ne,q))).slice(0,3);
  const fm=FARMS.filter(x=>has(x.n,q)||(x.ne&&has(x.ne,q))).slice(0,3);
  const pg=pages(q);
  let h=pg.length?`<div class="gsec">${L("g_goto")}</div>`+pg.map(p=>`<button class="gr" data-gpage="${p[0]}">${ico(p[3])}<span><b>${L(p[1])}</b><small>${p[2]?L(p[2]):L("g_page")}</small></span></button>`).join(""):"";
  if(cls.length)h+=`<div class="gsec">${L("g_classes")}</div>`+cls.map(c=>`<button class="open gr" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b><small>${catName(c.cat)}, ${c.fresh?L("nw"):`Farm ${c.farm}, Solo ${c.solo}, Ultra ${c.ultra}`}</small></span></button>`).join("");
  if(its.length)h+=`<div class="gsec">${L("g_items",{n:its.length})}</div>`+its.slice(0,5).map(x=>`<button class="gr" data-gitem="${esc(x.r.id)}" data-gname="${esc(x.n)}">${ricon(x.t,"sigI")}<span><b>${esc(x.n)}</b><small>${L("rel_t_"+x.t)}, ${fmtRange(x.r)}</small></span></button>`).join("");
  if(dr.length)h+=`<div class="gsec">${L("g_drops",{n:dr.length})}</div>`+dr.slice(0,4).map(x=>`<button class="gr" data-gdrop="${esc(x.n)}">${ricon(["armor","helm","cape","pet","house"].includes(x.c)?x.c:"weapon","sigI")}<span><b>${esc(x.n)}</b><small>${esc(x.by||L("drops_unknown"))}${x.loc.length?", "+esc(x.loc[0].n):""}${x.loc.find(l=>l.j)?` · /${esc(x.loc.find(l=>l.j).j)}`:""}</small></span></button>`).join("");
  if(dl.length)h+=`<div class="gsec">${L("sec_daily")}</div>`+dl.map(x=>`<button class="gr" data-gdaily="${esc(x.id)}">${ico("diarias")}<span><b>${esc(dn(x))}</b><small>${esc(x.who?x.who[l]:L("daily_g_"+x.g))}</small></span></button>`).join("");
  if(fm.length)h+=`<div class="gsec">HardFarm</div>`+fm.map(x=>`<button class="gr" data-gfarm="${FARMS.indexOf(x)}">${ico("farm")}<span><b>${esc(dn(x))}</b><small>${L("farm_"+x.k)}</small></span></button>`).join("");
  gres.innerHTML=h||`<div class="npEmpty">${L("gnores")}</div>`;
  gres.hidden=false}
function pick(b:HTMLElement){gres.hidden=true;gq.value="";gq.blur();
  if(b.dataset.gpage){const v=b.dataset.gpage;
    if(v==="mytier"){st.tsrc="mine";save();show("tier");renderTiers();return true}
    if(v==="mydaily"){st.df="mine";save();show("diarias");renderDailies();return true}
    if(v==="hub"){show("eventos");return true}
    if(v==="tier"&&st.tsrc==="shared"){st.tsrc="portal";save()}
    show(v);return true}
  if(b.dataset.gitem){show("lancamentos");focusItem(b.dataset.gitem,b.dataset.gname);return true}
  if(b.dataset.gdrop){const j=dropJoin(b.dataset.gdrop);
    if(j){const t="/join "+j;try{const w=navigator.clipboard&&navigator.clipboard.writeText(t);if(w&&w.catch)w.catch(()=>{})}catch(_){}toast("✓",t,L("farm_copied"))}
    else window.open(wiki(b.dataset.gdrop),"_blank","noopener");
    return true}
  if(b.dataset.gdaily){const id=b.dataset.gdaily,x=DAILIES.find(d=>d.id===id);
    if(x){if(x.g==="old"||x.g==="season"||x.g==="rep")st.df=x.g;else if(st.df!=="all"&&st.df!==x.g)st.df="all";
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
