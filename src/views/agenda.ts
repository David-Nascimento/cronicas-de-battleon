import {SCHED, TEAMS} from "../data/index.js";
import {esc} from "../lib/util.js";
import {L, T, loc} from "../state.js";

export function renderAgenda(){
  const now=new Date();const d=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const diff=(5-d.getDay()+7)%7;const fri=new Date(d);fri.setDate(d.getDate()+diff);
  const rel=diff===0?L("today"):diff===1?L("tomorrow"):L("inDays",{n:diff});
  const ds=fri.toLocaleDateString(loc(),{day:"numeric",month:"short"});
  document.getElementById("agReset").innerHTML=`<span class="resetbar">${L("ag_reset",{d:ds})} <span class="pill ${diff<=1?"on":"soon"}">${rel}</span></span>`;
  const month=now.getMonth()+1;
  const row=(t,ti,pill)=>`<button class="agrow" data-goteam="${ti}"><b>${esc(T(t.n))}</b>${pill||""}</button>`;
  const W=[],S=[],O=[];
  TEAMS.forEach((t,ti)=>{const s=SCHED[t.n];
    if(s==="w")W.push(row(t,ti,`<span class="pill soon">${rel}</span>`));
    else if(typeof s==="number"){const mn=new Date(2026,s-1,1).toLocaleDateString(loc(),{month:"long"});
      S.push(row(t,ti,s===month?`<span class="pill on">${L("ag_now")}</span>`:`<span class="pill">${L("ag_back",{m:mn})}</span>`))}
    else O.push(row(t,ti,`<span class="pill">${esc(T(t.tag))}</span>`))});
  const col=(h,sub,rows)=>`<div class="agcol frame"><h3>${h}</h3><div class="why">${sub}</div>${rows.join("")}</div>`;
  document.getElementById("agenda").innerHTML=col(L("ag_weekly"),L("ag_weekly_sub"),W)+col(L("ag_season"),L("ag_season_sub"),S)+col(L("ag_other"),L("ag_other_sub"),O);
}
