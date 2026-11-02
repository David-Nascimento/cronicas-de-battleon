import {ICO, SEC, SECS, SUBS} from "../config.js";
import {NEWS} from "../data/index.js";
import {refreshNotif} from "../features/alerts.js";
import {newsSeen, renderFeed} from "../features/news.js";
import {L, save, st, ui} from "../state.js";
import {renderDailies} from "./dailies.js";

export const VIEWS=Object.values(SEC).flat(),secOf=v=>Object.keys(SEC).find(k=>SEC[k].includes(v));
export function renderSub(){const list=SUBS[secOf(ui.curView)],sn=document.getElementById("subnav");
  sn.hidden=!list;sn.innerHTML=list?list.map(([k,l])=>`<button data-sub="${k}" aria-selected="${ui.curView===k}">${L(l)}</button>`).join(""):""}
export function renderNav(){
  const h=SECS.map(([k,l])=>`<button class="nv" data-sec="${k}" aria-current="${secOf(ui.curView)===k?"page":"false"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg><span>${L(l)}</span>${k==="novidades"?`<span class="navBdg" hidden></span>`:""}</button>`).join("");
  ["sideNav","bNav"].forEach(id=>{const el=document.getElementById(id);el.innerHTML=h;el.setAttribute("aria-label",L("nav_main"))});
  renderSub();
}
export function show(v){
  if(v==="melhores")v="inicio";if(v==="hardfarm")v="itens";
  if(v==="classes")v=st.sub||"tier";
  if(!VIEWS.includes(v))v="inicio";
  const sec=secOf(v),changed=v!==ui.curView;ui.curView=v;
  if(sec==="classes"){st.sub=v;save()}
  VIEWS.forEach(x=>document.getElementById("v-"+x).hidden=x!==v);
  document.querySelectorAll("[data-sec]").forEach(b=>b.setAttribute("aria-current",b.dataset.sec===sec?"page":"false"));
  renderSub();
  try{history.replaceState(null,"","#"+v)}catch(e){}
  if(changed)window.scrollTo(0,0);
  if(v==="diarias")renderDailies();
  if(v==="novidades"){ui.feedSeen=newsSeen();renderFeed();st.newsSeen=NEWS.reduce((m,n)=>n.d>m?n.d:m,ui.feedSeen);save();refreshNotif()}}
export function closePanel(){document.getElementById("notifPanel").hidden=true;document.getElementById("bell").setAttribute("aria-expanded","false");document.body.classList.remove("np-open")}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("notifPanel").hidden)closePanel()});
