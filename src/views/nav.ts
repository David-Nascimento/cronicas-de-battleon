import {ICO, SEC, SECS, SUBS} from "../config.js";
import {NEWS} from "../data/index.js";
import {refreshNotif} from "../features/alerts.js";
import {newsSeen, renderFeed} from "../features/news.js";
import {L, save, st, ui} from "../state.js";
import {markReleaseSeen, navCount} from "./releases.js";
import {endingSoon} from "./events.js";
import {renderView} from "../render-all.js";

/* Navegação em 5 destinos (Hoje, Classes, Ultras, Farm, Novidades), cada um com suas abas.
   Na lateral do computador as abas aparecem embaixo do destino aberto; no celular, numa fileira no topo. */
export const VIEWS=Object.values(SEC).flat(),secOf=v=>Object.keys(SEC).find(k=>SEC[k].includes(v));
/* ao tocar num destino, volta para a última aba usada nele */
export const secHome=s=>{const subs=SEC[s];if(!subs)return "inicio";const last=(st.subs||{})[s]||(s==="classes"?st.sub:null);return subs.includes(last)?last:subs[0]};
const svg=k=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg>`;
export function renderSub(){const list=SUBS[secOf(ui.curView)],sn=document.getElementById("subnav");
  sn.hidden=!list;sn.setAttribute("aria-label",L("nav_sub"));
  sn.innerHTML=list?list.map(([k,l])=>`<button data-sub="${k}" aria-current="${ui.curView===k?"page":"false"}">${L(l)}</button>`).join(""):""}
export function renderNav(){
  const cur=secOf(ui.curView),n=navCount(),es=endingSoon().length;
  const btn=(k,l)=>`<button class="nv" data-sec="${k}" aria-current="${cur===k?"page":"false"}">${svg(k)}<span>${L(l)}</span>${k==="novidades"?`<span class="navBdg"${n?"":" hidden"}>${n}</span>`:k==="eventos"&&es?`<span class="navBdg warn" title="${L("ev_badge",{n:es})}">${es}</span>`:""}</button>`;
  const side=SECS.map(([k,l])=>btn(k,l)+(cur===k&&SUBS[k]?`<div class="nvSubs">${SUBS[k].map(([s,sl])=>`<button class="nvs" data-sub="${s}" aria-current="${ui.curView===s?"page":"false"}">${L(sl)}</button>`).join("")}</div>`:"")).join("");
  const sn=document.getElementById("sideNav"),bn=document.getElementById("bNav");
  /* "Meu painel" fica separado dos 5 destinos: no fim da lateral e, no celular, no botão de conta do topo */
  sn.innerHTML=side+`<div class="nvSep"></div>`+btn("conta","pn_title");bn.innerHTML=SECS.map(([k,l])=>btn(k,l)).join("");
  [sn,bn].forEach(el=>el.setAttribute("aria-label",L("nav_main")));
  renderSub();
}
export function show(v){
  if(v==="melhores")v="inicio";if(v==="hardfarm")v="itens";if(v==="itensnovos")v="lancamentos";
  if(SEC[v]&&!VIEWS.includes(v))v=secHome(v);
  if(v==="classes")v=secHome("classes");
  if(!VIEWS.includes(v))v="inicio";
  const sec=secOf(v),changed=v!==ui.curView;ui.curView=v;
  if(SUBS[sec]){st.subs=Object.assign({},st.subs,{[sec]:v});if(sec==="classes")st.sub=v;save()}
  VIEWS.forEach(x=>document.getElementById("v-"+x).hidden=x!==v);
  renderNav();
  try{history.replaceState(null,"","#"+v)}catch(e){}
  if(changed)window.scrollTo(0,0);
  /* diárias, itens novos e notícias são redesenhados a cada visita (virada do dia, marcar como visto) */
  /* abas que mudam com o que se marca em outras (diárias, farms, painel) são redesenhadas a cada visita */
  if(["diarias","lancamentos","itens","painel","inicio","eventos"].includes(v))renderView(v,true);else if(v!=="novidades")renderView(v);
  if(v==="lancamentos"&&markReleaseSeen())refreshNotif();
  if(v==="novidades"){ui.feedSeen=newsSeen();renderFeed();st.newsSeen=NEWS.reduce((m,n)=>n.d>m?n.d:m,ui.feedSeen);save();refreshNotif()}}
export function closePanel(){document.getElementById("notifPanel").hidden=true;document.getElementById("bell").setAttribute("aria-expanded","false");document.body.classList.remove("np-open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("notifPanel").hidden)closePanel()});
