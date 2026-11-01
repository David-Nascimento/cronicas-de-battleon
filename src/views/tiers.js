import {catName} from "../components/shared.js";
import {TIERS} from "../config.js";
import {D} from "../data/index.js";
import {esc, idx, score, sigil, tColor, total} from "../lib/util.js";
import {L, T, st} from "../state.js";

export const overall=c=>{const s=Math.max(score(c.farm),score(c.solo),score(c.ultra)),sum=total(c);
  if(s===4&&sum>=10)return"S";if(s===4||sum>=9)return"A";if(sum>=6)return"B";return"C"};
export function renderTiers(){
  const list=D.filter(c=>c.cat===st.cat).sort((a,b)=>total(b)-total(a));
  const tierOf=c=>st.mode==="geral"?overall(c):c[st.mode];
  document.getElementById("tiers").innerHTML=TIERS.map(t=>{
    const xs=list.filter(c=>tierOf(c)===t);
    return `<div class="tier"><div class="tl" style="background:${tColor(t)}">${t}</div><div class="tr">${xs.length?xs.map(c=>`<button class="open tc" data-i="${idx(c)}" title="${esc(T(c.note))}">${sigil(c,"lg")}<span>${esc(c.name)}</span></button>`).join(""):`<span class="empty">${L("empty",{c:catName(st.cat)})}</span>`}</div></div>`;
  }).join("");
}
