import {seg} from "../components/shared.js";
import {D, FARMS, byName, dropJoin} from "../data/index.js";
import {toast} from "../features/toasts.js";
import {esc, idx, sigil} from "../lib/util.js";
import {L, save, st} from "../state.js";

/* progresso de cada farm: etapas marcadas, salvas no navegador em st.fprog[nome do card] */
export const prog=(n:string)=>new Set((st.fprog||{})[n]||[]);
/* farms acompanhados: aparecem no Meu painel com a próxima etapa */
export const tracked=()=>new Set((st.ftrack as string[])||[]);
export function toggleTrack(n:string,on?:boolean){const s=tracked();(on??!s.has(n))?s.add(n):s.delete(n);st.ftrack=[...s];save()}
/* uma etapa inteira (quest, texto com joins e onde conseguir), também usada no Meu painel */
export const stepHtml=(r,lg)=>`${quests(r,lg)}${esc(r[lg]).replace(/(^|[\s(])\/(?!goto\b|join\b)([a-z0-9]{3,})/g,(a,b,c)=>`${b}${mj(c)}`)}${where(r,lg)}`;

document.addEventListener("click",e=>{const c=(e.target as HTMLElement).closest&&(e.target as HTMLElement).closest<HTMLElement>("code.jn");if(!c)return;const t="/join "+c.dataset.j;try{const w=navigator.clipboard&&navigator.clipboard.writeText(t);if(w&&w.catch)w.catch(()=>{})}catch(_){}toast("✓",t,L("farm_copied"))});
/* "Aceite": a quest (ou quests) que precisa pegar nesta etapa, com quem dá e o join (r.q, de tools/where/quests.py) */
const quests=(r,lg)=>{const qs=r.q||[];if(!qs.length)return "";
  return qs.map(q=>`<span class="fq"><em>${L("farm_quest")}</em> <b>${esc(q.n[lg])}</b>${q.by?` <i>${esc(q.by)}</i>`:""} ${mj(q.j)}</span>`).join("")};
/* join curto e discreto: mostra "/mapa", copia "/join mapa" */
const mj=m=>`<code class="jn s" data-j="${esc(m)}" title="${esc(L("farm_copy_j",{m}))}">/${esc(m)}</code>`;
/* "Onde conseguir": a fonte de cada item da etapa, com o join (r.w, de tools/where) */
const where=(r,lg)=>{const ws=r.w||[];if(!ws.length)return "";
  return `<details class="fwhere"><summary>${L("farm_where",{n:ws.length})}</summary><dl>${ws.map(w=>`<div><dt>${esc(w.i)}</dt><dd>${esc(w.o[lg])}${(w.j||dropJoin(w.i))?" "+mj(w.j||dropJoin(w.i)):""}</dd></div>`).join("")}</dl></details>`};
export function renderFarms(){
  const started=FARMS.filter(x=>prog(x.n).size).length;if(st.fk==="prog"&&!started)st.fk="all";
  seg("segFarm",[["all",L("farm_all")],...(started?[["prog",`${L("farm_started")} <b>${started}</b>`]]:[]),["class",L("farm_class")],["gear",L("farm_gear")],["mat",L("farm_mat")],["rep",L("farm_rep")],["daily",L("farm_daily")],["season",L("farm_season")]],"fk",renderFarms);
  const f=st.fk||"all",lg=st.lang==="en"?"en":"pt";
  const jn=t=>esc(t).replace(/(^|[\s(])\/(?!goto\b|join\b)([a-z0-9]{3,})/g,(a,b,c)=>`${b}${mj(c)}`);
  document.getElementById("farms").innerHTML=FARMS.filter(x=>f==="all"||(f==="prog"?prog(x.n).size>0:x.k===f)).map(x=>{const c=x.cls&&x.cls in byName?D[byName[x.cls]]:null;
    return `<article class="fcard frame" id="farm-${FARMS.indexOf(x)}"><div class="fh">${c?sigil(c):""}<div class="fhT"><h3>${esc(lg==="en"&&x.ne?x.ne:x.n)}</h3>${x.e?`<span class="eff e${x.e}" title="${L("farm_eff")}"><i aria-hidden="true">${[1,2,3,4,5].map(i=>`<b class="${i<=x.e?"on":""}"></b>`).join("")}</i><em>${L("eff"+x.e)}</em></span>`:""}</div><button class="ftrack${tracked().has(x.n)?" on":""}" data-ftrack="${esc(x.n)}" aria-pressed="${tracked().has(x.n)}">${tracked().has(x.n)?"✓ "+L("farm_tracking"):L("farm_track")}</button></div>
    ${x.j&&x.j.length?`<div class="fjoin">${L("farm_join")}: ${x.j.map(m=>`<code class="jn" data-j="${m}" title="${L("farm_copied")}">/join ${m}</code>`).join(" ")}</div>`:""}
    ${(()=>{const pg=prog(x.n),n=x.req.length,dn=x.req.filter((_,i)=>pg.has(i)).length,pct=Math.round(dn/n*100);
      return `<div class="fprog"><span><b>${L("farm_prog",{n:dn,t:n})}</b>${dn===n?` <span class="pill on">${L("farm_done")}</span>`:""}</span><div class="dMeter"><i style="width:${pct}%"></i></div></div>
    <h4>${L("farm_need")}</h4><ul class="fsteps">${x.req.map((r,i)=>`<li class="${pg.has(i)?"ok":""}"><button class="fchk" role="checkbox" aria-checked="${pg.has(i)}" data-fstep="${esc(x.n)}|${i}" aria-label="${esc(L("farm_step",{n:i+1}))}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button><span>${quests(r,lg)}${jn(r[lg])}${where(r,lg)}</span></li>`).join("")}</ul>`})()}
    <div class="fnote">${jn(x.note[lg])}</div>
    ${c?`<button class="fbtn open" data-i="${idx(c)}">${L("farm_open")}</button>`:""}
    <div class="fsrc">${L("farm_src")}: <a href="${x.src}" target="_blank" rel="noopener">${esc(x.sn)} ↗</a></div></article>`}).join("");
}

document.getElementById("farms").addEventListener("click",e=>{
  const tb=(e.target as HTMLElement).closest<HTMLElement>("[data-ftrack]");
  if(tb){toggleTrack(tb.dataset.ftrack);const y=window.scrollY;renderFarms();window.scrollTo(0,y);toast("★",L(tracked().has(tb.dataset.ftrack)?"farm_tracked":"farm_untracked"));return}
  const b=(e.target as HTMLElement).closest<HTMLElement>("[data-fstep]");if(!b)return;
  const k=b.dataset.fstep,cut=k.lastIndexOf("|"),n=k.slice(0,cut),i=+k.slice(cut+1),pg=prog(n);pg.has(i)?pg.delete(i):pg.add(i);if(pg.has(i))toggleTrack(n,true);
  st.fprog=Object.assign({},st.fprog,{[n]:[...pg].sort((a,b)=>a-b)});if(!pg.size)delete st.fprog[n];save();
  const y=window.scrollY;renderFarms();window.scrollTo(0,y)});
