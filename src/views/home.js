import {ICO} from "../config.js";
import {NEWS, REL, SCHED, TEAMS} from "../data/index.js";
import {nItem, relDays} from "../features/alerts.js";
import {newsSeen} from "../features/news.js";
import {esc} from "../lib/util.js";
import {L, T, loc} from "../state.js";
import {dailyProgress} from "./dailies.js";
import {fmtRange, relCounts, relSummary} from "./releases.js";

const ico=k=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg>`;

/* Hoje: quatro atalhos pelo que a pessoa quer fazer, depois o que mudou e o que vence nesta semana */
export function renderHome(){
  const now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const diff=(5-d.getDay()+7)%7,fri=new Date(d);fri.setDate(d.getDate()+diff);
  const ds=fri.toLocaleDateString(loc(),{weekday:"long",day:"numeric",month:"long"});
  const month=now.getMonth()+1,p=dailyProgress(),r=REL[0];
  const tiles=[["tier","classes",L("go_tier"),L("go_tier_x")],
    ["lancamentos","novidades",L("go_rel"),r?L("go_rel_x",{n:relCounts(r).total,d:fmtRange(r)}):L("rel_none")],
    ["diarias","diarias",L("go_daily"),L("go_daily_x",{n:p.done,t:p.total})],
    ["ultras","ultras",L("go_ultra"),L("go_ultra_x",{r:relDays(diff)})]];
  const it=document.getElementById("intents");it.setAttribute("aria-label",L("intents"));it.innerHTML=tiles.map(([v,ic,t,x])=>`<button class="intent" data-goview="${v}">${ico(ic)}<span><b>${t}</b><small>${esc(x)}</small></span></button>`).join("");
  document.getElementById("homeRel").innerHTML=relSummary();
  let w=`<h3>${L("home_week")}</h3><button class="hrow" data-goview="ultras"><span class="hic">${ico("farm")}</span><span class="htx"><b>${L("home_reset")}</b><small>${ds}</small></span><span class="pill ${diff<=1?"on":"soon"}">${relDays(diff)}</span></button>`;
  TEAMS.forEach((t,ti)=>{const sc=SCHED[t.n];if(typeof sc==="number"){const mn=new Date(2026,sc-1,1).toLocaleDateString(loc(),{month:"long"});
    w+=`<button class="hrow" data-goteam="${ti}"><span class="hic">${ico("ultras")}</span><span class="htx"><b>${esc(T(t.n))}</b></span>${sc===month?`<span class="pill on">${L("ag_now")}</span>`:`<span class="pill">${L("ag_back",{m:mn})}</span>`}</button>`}});
  w+=`<button class="linkBtn" data-goview="ultras">${L("home_agenda")}</button>`;
  document.getElementById("homeWeek").innerHTML=w;
  document.getElementById("homeNews").innerHTML=`<h3>${L("home_news")}</h3>`+NEWS.slice(0,3).map(n=>nItem(n,n.d>newsSeen())).join("")+`<button class="linkBtn" data-goview="novidades">${L("home_seeall")}</button>`;
}
