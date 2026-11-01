import {badges, catName, newTag} from "../components/shared.js";
import {D, TYPES} from "../data/index.js";
import {esc, idx, sigil, total} from "../lib/util.js";
import {L, T, st} from "../state.js";

export function renderCards(){
  const q=(document.getElementById("q").value||"").toLowerCase().trim();
  const xs=D.filter(c=>(st.all==="todas"||c.cat===st.all)&&c.name.toLowerCase().includes(q)).sort((a,b)=>total(b)-total(a)||a.name.localeCompare(b.name));
  document.getElementById("countAll").textContent=L("count",{n:xs.length,t:D.length});
  document.getElementById("cards").innerHTML=xs.length?xs.map(c=>`
  <button class="open card frame" data-i="${idx(c)}">${sigil(c,"lg")}<span class="info"><h4>${esc(c.name)}${newTag(c)}</h4><span class="badges">${badges(c)}</span><span class="count">${catName(c.cat)} · ${T(TYPES[c.type].n)}${c.yr?" · "+c.yr:""}</span></span></button>`).join(""):`<p class="sub">${L("none")}</p>`;
}
