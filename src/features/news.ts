import {seg} from "../components/shared.js";
import {NEWS, byName} from "../data/index.js";
import {esc} from "../lib/util.js";
import {L, loc, save, st, ui} from "../state.js";

export const NL=n=>n[st.lang]||n.pt;
export const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
export const parseD=s=>{const [y,m,dd]=s.split("-").map(Number);return new Date(y,m-1,dd)};
export function newsSeen(){if(!st.newsSeen){const d=new Date();d.setDate(d.getDate()-21);st.newsSeen=iso(d);save()}return st.newsSeen}
export const unreadNews=()=>NEWS.filter(n=>n.d>newsSeen());
export const fmtD=(n,o?:Intl.DateTimeFormatOptions)=>parseD(n.d).toLocaleDateString(loc(),n.approx?{month:"short",year:"numeric"}:(o||{day:"numeric",month:"short"}));
export function renderFeed(){
  const f=st.nf||"all";
  seg("segNews",[["all",L("f_all")],["new",L("ty_new")],["rework",L("ty_rework")],["balance",L("ty_balance")]],"nf",renderFeed);
  const seen=ui.feedSeen||newsSeen();
  document.getElementById("feed").innerHTML=NEWS.filter(n=>f==="all"||n.ty===f).map(n=>{const u=n.d>seen;return `
  <article class="post frame ${u?"unread":""}" id="news-${NEWS.indexOf(n)}">
    <div class="when">${n.approx?`<b>${parseD(n.d).toLocaleDateString(loc(),{month:"short"}).replace(".","")}</b><span>${n.d.slice(0,4)}</span>`:`<b>${n.d.slice(8)}</b><span>${parseD(n.d).toLocaleDateString(loc(),{month:"short",year:"numeric"}).replace(".","")}</span>`}</div>
    <h3><span class="ty ${n.ty}">${L("ty_"+n.ty)}</span>${esc(NL(n).t)}${u?`<span class="new">${L("nw")}</span>`:""}</h3>
    <p>${esc(NL(n).x)}</p>
    <div class="cls">${n.cls.filter(c=>c in byName).map(c=>`<button class="open" data-i="${byName[c]}">${esc(c)}</button>`).join("")}</div>
    <div class="src2"><a href="${n.src}" target="_blank" rel="noopener">${L("source")}: Design Notes ↗</a></div>
  </article>`}).join("");
}
