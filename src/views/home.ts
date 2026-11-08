import {NEWS, REL} from "../data/index.js";
import {relDays} from "../features/alerts.js";
import {NL, newsSeen} from "../features/news.js";
import {esc} from "../lib/util.js";
import {L, loc, st} from "../state.js";
import {dailyProgress} from "./dailies.js";
import {endingSoon, liveEvents} from "./events.js";
import {fmtDay, jn, relCounts} from "./releases.js";

/* Hoje: uma faixa com o que importa agora (diárias, eventos, reset, itens novos), depois a atualização
   uma vez só, o que está no ar por ordem de fim, os melhores e as notícias. Cada informação aparece num lugar. */
export function renderHome(){
  const now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const diff=(5-d.getDay()+7)%7,fri=new Date(d);fri.setDate(d.getDate()+diff);
  const p=dailyProgress(),r=REL[0],evs=liveEvents(),soon=endingSoon(),l=st.lang==="en"?"en":"pt";
  const hd=document.getElementById("homeDate");if(hd)hd.textContent=now.toLocaleDateString(loc(),{weekday:"long",day:"numeric",month:"long"});
  /* "Seu dia no {Battleon}": o que está entre chaves ganha a fonte mono e a cor de destaque */
  const tg=document.getElementById("homeTag");if(tg)tg.innerHTML=esc(L("home_tag")).replace(/\{([^}]+)\}/,`<span class="brace">{$1}</span>`);
  const first=evs.find(e=>e.until);
  /* cartões com ícone, como no Fluent: cada um leva para a aba do assunto */
  const IC={diarias:"M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",eventos:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    ultras:"M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",lancamentos:"M12 2l2.6 6.9L22 9.4l-5.7 4.8L18.2 21.5 12 17.5 5.8 21.5l1.9-7.3L2 9.4l7.4-.5z"};
  const tiles=[
    ["diarias",L("go_daily"),L("hs_n_of",{n:p.done,t:p.total}),L("hs_daily_x"),""],
    ["eventos",L("sec_events"),soon.length?L("hs_ev_soon",{n:soon.length}):L("hs_ev_live",{n:evs.length}),first?L("hs_ev_x",{d:fmtDay(first.until)}):"",soon.length?"warn":""],
    ["ultras",L("hs_reset"),relDays(diff),fri.toLocaleDateString(loc(),{weekday:"long",day:"numeric",month:"short"}).replace(/\./g,""),""],
    ["lancamentos",L("tab_releases"),r?String(relCounts(r).total):"0",r?L("hs_rel_x",{d:fmtDay(r.from)}):"",""]];
  const it=document.getElementById("intents");it.setAttribute("aria-label",L("intents"));
  it.innerHTML=tiles.map(([v,h,b,x,c])=>`<button class="intent stat t-${v}" data-goview="${v}"><span class="tile"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[v]}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="stx"><small>${esc(h)}</small><b class="${c}">${esc(b)}</b><span>${esc(x)}</span></span></button>`).join("");
  /* um cartão só: a última atualização numa linha e os eventos que acabam primeiro */
  let h="";
  if(r){const c=relCounts(r),all=Object.values(r.items).flat() as string[][],rares=all.filter(i=>(i[1]||"").includes("r")).length,j=r.maps.find(m=>m.j);
    h+=`<div class="hnRel"><div class="hnTop"><h3>${L("home_rel")}</h3><span class="relWhen">${fmtDay(r.from)}</span></div>
      <b class="hnTitle">${esc(r.t[l])}</b>
      <p class="hnMeta"><span>${L("rel_nums",{n:c.total})}${rares?` · <span class="evRare">${L("ev_rares",{n:rares})}</span>`:""}</span>${j?jn(j.j):""}<button class="linkBtn" data-relt="all">${L("rel_open",{n:c.total})}</button></p></div>`;}
  h+=`<div class="hnEv"><div class="hnTop"><h3>${L("home_live")}</h3></div><ul class="hLive">${evs.slice(0,3).map(e=>`<li><span>${esc(e.name)}</span><span class="${e.until&&soon.includes(e)?"warn":"mut"}">${e.until?fmtDay(e.until):L("ev_nodate")}</span></li>`).join("")}</ul>
    <button class="linkBtn" data-goview="eventos">${evs.length>3?L("home_ev_all",{n:evs.length}):L("home_ev_open")}</button></div>`;
  document.getElementById("homeNow").innerHTML=h;
  /* notícias em linhas */
  const seen=newsSeen();
  document.getElementById("homeNews").innerHTML=`<h3>${L("home_news")}</h3><ul class="hNews">${NEWS.slice(0,3).map(n=>{const t=NL(n).t;
    return `<li><button data-news="${NEWS.indexOf(n)}"><span class="hnD">${esc(fmtNewsDate(n.d,n.approx))}</span><span class="hnT"><b>${esc(t)}</b> <span>· ${L("ty_"+n.ty)}</span></span>${n.d>seen?`<i class="hnU" role="img" aria-label="${esc(L("hn_unread"))}"></i>`:""}</button></li>`}).join("")}</ul>
    <button class="linkBtn" data-goview="novidades">${L("home_seeall")}</button>`;
}
const fmtNewsDate=(s:string,approx?:number)=>{const [y,m,d]=s.split("-").map(Number);
  return approx?new Date(y,m-1,d).toLocaleDateString(loc(),{month:"short",year:"numeric"}).replace(/\./g,""):fmtDay(s)};
