import {D, ITEMS, TEAMS, byName} from "../data/index.js";
import {esc, sigil} from "../lib/util.js";
import {L, T} from "../state.js";
import {show} from "./nav.js";

export function renderTeams(){
  document.getElementById("teams").innerHTML=TEAMS.map((t,ti)=>`
  <article class="team frame" id="team-${ti}">
    <div class="th"><div><h3>${esc(T(t.n))}</h3><div class="map">${esc(t.map)}</div></div><span class="tag">${esc(T(t.tag))}</span></div>
    <div class="slots">${t.team.map(([n,r])=>{const c=D[byName[n]];return `<button class="open slotc" data-i="${byName[n]}">${sigil(c)}<div><b>${esc(n)}</b><span>${esc(T(r))}</span></div></button>`}).join("")}</div>
    <ul>${t.tips.map(x=>`<li>${esc(T(x))}</li>`).join("")}</ul>
    <div class="alt"><b>${L("alt")}</b> ${esc(T(t.alt))}</div>
  </article>`).join("");
  document.getElementById("items").innerHTML=ITEMS.map(([h,p])=>`<div class="item frame"><b>${esc(T(h))}</b><p>${esc(T(p))}</p></div>`).join("");
}
export function goTeam(ti){show("ultras");const el=document.getElementById("team-"+ti);if(!el)return;el.scrollIntoView({behavior:"smooth",block:"start"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1600)}
