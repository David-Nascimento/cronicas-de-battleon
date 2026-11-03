import {badges, catName, newTag} from "../components/shared.js";
import {D, TYPES} from "../data/index.js";
import {esc, has, idx, sigil, total} from "../lib/util.js";
import {L, T, st} from "../state.js";

export function renderCards(){
  const q=((document.getElementById("q") as HTMLInputElement).value||"").trim();
  /* com algo digitado, procura em todas as lojas (o filtro de loja não esconde o resultado) */
  const xs=D.filter(c=>(q?has(c.name,q):st.all==="todas"||c.cat===st.all)).sort((a,b)=>total(b)-total(a)||a.name.localeCompare(b.name));
  document.getElementById("countAll").textContent=L("count",{n:xs.length,t:D.length})+(q&&st.all!=="todas"?" · "+L("q_all_stores"):"");
  document.getElementById("cards").innerHTML=xs.length?xs.map(c=>`
  <button class="open card frame" data-i="${idx(c)}">${sigil(c,"lg")}<span class="info"><h4>${esc(c.name)}${newTag(c)}</h4><span class="badges">${badges(c)}</span><span class="count">${catName(c.cat)} · ${T(TYPES[c.type].n)}${c.yr?" · "+c.yr:""}</span></span></button>`).join(""):`<p class="sub">${L("none")}</p>`;
}
