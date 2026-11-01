import {NEWS, SCHED, TEAMS} from "../data/index.js";
import {nItem, relDays} from "../features/alerts.js";
import {newsSeen} from "../features/news.js";
import {esc} from "../lib/util.js";
import {L, T, loc} from "../state.js";

export function renderHome(){
  const now=new Date(),d=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const diff=(5-d.getDay()+7)%7,fri=new Date(d);fri.setDate(d.getDate()+diff);
  const ds=fri.toLocaleDateString(loc(),{weekday:"long",day:"numeric",month:"long"});
  const month=now.getMonth()+1;
  let w=`<h3>${L("home_week")}</h3><button class="hrow" data-goview="ultras"><span><b>⏳ ${L("home_reset")}</b><small>${ds}</small></span><span class="pill ${diff<=1?"on":"soon"}">${relDays(diff)}</span></button>`;
  TEAMS.forEach((t,ti)=>{const sc=SCHED[t.n];if(typeof sc==="number"){const mn=new Date(2026,sc-1,1).toLocaleDateString(loc(),{month:"long"});
    w+=`<button class="hrow" data-goteam="${ti}"><span><b>${esc(T(t.n))}</b></span>${sc===month?`<span class="pill on">${L("ag_now")}</span>`:`<span class="pill">${L("ag_back",{m:mn})}</span>`}</button>`}});
  w+=`<button class="linkBtn" style="align-self:flex-start" data-goview="ultras">${L("home_agenda")} →</button>`;
  document.getElementById("homeWeek").innerHTML=w;
  document.getElementById("homeNews").innerHTML=`<h3>${L("home_news")}</h3>`+NEWS.slice(0,3).map(n=>nItem(n,n.d>newsSeen())).join("")+`<button class="linkBtn" style="align-self:flex-start" data-goview="novidades">${L("home_seeall")} →</button>`;
}
