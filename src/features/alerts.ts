import {TYIC} from "../config.js";
import {NEWS, REL, TEAMS, byName} from "../data/index.js";
import type {Alert, News} from "../types.js";
import {NL, fmtD, iso, newsSeen, renderFeed, unreadNews} from "./news.js";
import {esc} from "../lib/util.js";
import {L, loc, save, st, ui} from "../state.js";
import {openClass} from "../views/class-dialog.js";
import {renderHome} from "../views/home.js";
import {show} from "../views/nav.js";
import {goTeam} from "../views/teams.js";
import {navCount, relCounts, relUnseen} from "../views/releases.js";

export const DAY=864e5;
export const relDays=n=>n===0?L("today"):n===1?L("tomorrow"):L("inDays",{n});
export function computeAlerts(now?:Date):Alert[]{
  now=now||new Date();const d0=new Date(now.getFullYear(),now.getMonth(),now.getDate());const out:Alert[]=[];
  if(relUnseen()){const r=REL[0];out.push({id:"rel-"+r.id,ic:"✦",lvl:"now",t:L("al_rel",{n:relCounts(r).total}),x:r.t[st.lang]||r.t.pt,go:{tab:"lancamentos"}})}
  const dd=(5-d0.getDay()+7)%7;const fri=new Date(d0.getTime()+dd*DAY);
  if(dd===0)out.push({id:"reset-"+iso(fri),ic:"⏳",lvl:"now",t:L("al_reset0"),x:L("al_reset0x"),go:{tab:"ultras"}});
  else if(dd===1)out.push({id:"reset-"+iso(fri),ic:"⏳",lvl:"soon",t:L("al_reset1"),x:L("al_reset1x"),go:{tab:"ultras"}});
  for(let k=0;k<=430;k++){const d=new Date(d0.getTime()+k*DAY);if(d.getDate()===13&&d.getDay()===5){
    if(k<=14){const ds=d.toLocaleDateString(loc(),{day:"numeric",month:"long"});
      out.push(k===0?{id:"f13-"+iso(d),ic:"☠",lvl:"now",t:L("al_f13now"),x:L("al_f13nowx"),go:{cls:"Lich"}}
                    :{id:"f13-"+iso(d),ic:"☠",lvl:"soon",t:L("al_f13",{d:ds}),x:L("al_f13x",{r:relDays(k)}),go:{cls:"Lich"}})}
    break}}
  ([["Ultra Kala",8],["Ultra Iara",9]] as [string,number][]).forEach(([u,m])=>{const ti=TEAMS.findIndex(t=>t.n===u);
    if(d0.getMonth()+1===m)out.push({id:u+"-"+d0.getFullYear(),ic:"🜂",lvl:"now",t:L("al_seasonNow",{u}),x:L("al_seasonNowx"),go:{team:ti}});
    else{let s=new Date(d0.getFullYear(),m-1,1);if(s<d0)s=new Date(d0.getFullYear()+1,m-1,1);const k=Math.round((s.getTime()-d0.getTime())/DAY);
      if(k<=14)out.push({id:u+"-"+s.getFullYear(),ic:"🜂",lvl:"soon",t:L("al_seasonSoon",{u,d:s.toLocaleDateString(loc(),{day:"numeric",month:"long"})}),x:L("al_seasonSoonx",{r:relDays(k)}),go:{team:ti}})}});
  return out;
}
export const dismissed=()=>new Set(st.dis||[]);
export const liveAlerts=()=>{const ds=dismissed();return ui.ALERTS.filter(a=>!ds.has(a.id))};
export function dismissAlert(id){st.dis=[...new Set([...(st.dis||[]),id])].slice(-40);save();refreshNotif()}
export function goAlert(a){if(!a)return;if(a.go.cls)openClass(byName[a.go.cls]);else if(a.go.team!=null)goTeam(a.go.team);else if(a.go.tab)show(a.go.tab)}
export function markAllRead(){st.newsSeen=NEWS.reduce((m,n)=>n.d>m?n.d:m,newsSeen());ui.ALERTS.forEach(a=>{if(!(st.dis||[]).includes(a.id))st.dis=[...(st.dis||[]),a.id]});save();refreshNotif();renderFeed()}
export function nItem(n:News,unread?:boolean){return `<button class="nItem ${unread?"unread":""}" data-news="${NEWS.indexOf(n)}"><span class="ic">${TYIC[n.ty]}</span><span class="tx"><b>${esc(NL(n).t)}</b><span class="meta"><span>${L("ty_"+n.ty)}</span><span>${fmtD(n)}</span></span></span>${unread?`<span class="dotU" aria-hidden="true"></span>`:""}</button>`}
export function aItem(a){return `<button class="nItem unread" data-alert="${esc(a.id)}"><span class="ic">${a.ic}</span><span class="tx"><b>${esc(a.t)}</b><span>${esc(a.x)}</span></span></button>`}
export function refreshNotif(){
  ui.ALERTS=computeAlerts();
  const la=liveAlerts(),un=unreadNews(),count=la.length+un.length;
  const bdg=document.getElementById("bellBadge");bdg.hidden=!count;bdg.textContent=count>9?"9+":String(count);
  document.getElementById("bellLabel").textContent=L("bell",{n:count});
  const nb=navCount();document.querySelectorAll<HTMLElement>(".navBdg").forEach(tb=>{tb.hidden=!nb;tb.textContent=String(nb)});
  document.title=(count?`(${count}) `:"")+L("title");
  /* painel */
  const p=document.getElementById("notifPanel");
  p.innerHTML=`<div class="np-h"><b>${L("n_title")}</b>${count?`<button class="linkBtn" data-markall="1">${L("n_markall")}</button>`:""}</div>
    ${la.length?`<div class="np-sec">${L("n_alerts")}</div>${la.map(aItem).join("")}`:""}
    <div class="np-sec">${L("n_news")}</div>
    ${NEWS.slice(0,5).map(n=>nItem(n,n.d>newsSeen())).join("")||`<div class="npEmpty">${L("n_empty")}</div>`}
    <button class="linkBtn" data-seeall="1">${L("n_seeall")}</button>`;
  /* banner */
  const top=la.find(a=>a.lvl==="now")||la[0];
  document.getElementById("banner").innerHTML=top?`<div class="banner"><span class="ic" aria-hidden="true">${top.ic}</span><span class="tx"><b>${esc(top.t)}</b><span>${esc(top.x)}</span></span>
    <span class="acts"><button class="btnG" data-alert="${esc(top.id)}">${L("view")}</button><button class="btnQ" data-dismiss="${esc(top.id)}">${L("dismiss")}</button></span></div>`:"";
  /* alertas na aba */
  const an=document.getElementById("alertsNow");an.innerHTML=la.map(aItem).join("");
  renderHome();
}
