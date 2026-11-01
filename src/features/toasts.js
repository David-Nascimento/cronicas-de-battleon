import {goAlert, liveAlerts, refreshNotif} from "./alerts.js";
import {unreadNews} from "./news.js";
import {esc} from "../lib/util.js";
import {L} from "../state.js";
import {show} from "../views/nav.js";

export const toasted=new Set();
export function toast(ic,t,x,onGo){
  const box=document.getElementById("toasts");const el=document.createElement("div");el.className="toast";
  el.innerHTML=`<span class="ic" aria-hidden="true">${ic}</span><span class="tx"><b>${esc(t)}</b>${x?esc(x):""}${onGo?`<div style="margin-top:6px"><button class="btnQ" style="padding:4px 10px">${L("view")}</button></div>`:""}</span><button class="x2" aria-label="${L("close")}">×</button>`;
  const kill=()=>el.remove();el.querySelector(".x2").onclick=kill;
  if(onGo)el.querySelector(".btnQ").onclick=()=>{onGo();kill()};
  box.appendChild(el);while(box.children.length>3)box.firstChild.remove();setTimeout(kill,9000);
  const b=document.getElementById("bell");b.classList.remove("ring");void b.offsetWidth;b.classList.add("ring");
}
export function checkLive(first){
  refreshNotif();
  if(first){const n=unreadNews().length;if(n)toast("✦",n===1?L("n_unread1"):L("n_unread",{n}),"",()=>show("novidades"))}
  /* ao abrir, os alertas já aparecem no banner; só vira aviso na tela o que surgir com a aba aberta */
  liveAlerts().forEach(a=>{if(!toasted.has(a.id)){toasted.add(a.id);if(!first)toast(a.ic,a.t,a.x,()=>goAlert(a))}});
}
