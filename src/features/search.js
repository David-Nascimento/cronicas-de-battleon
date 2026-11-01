import {catName} from "../components/shared.js";
import {D} from "../data/index.js";
import {esc, idx, nrm, sigil, total} from "../lib/util.js";
import {L} from "../state.js";
import {renderBuilder} from "../views/builder.js";
import {renderCards} from "../views/cards.js";
import {dlg, openClass} from "../views/class-dialog.js";
import {renderEnh} from "../views/enhancements.js";

export const gq=document.getElementById("gq"),gres=document.getElementById("gres");
export function runSearch(){const q=nrm(gq.value.trim());if(!q){gres.hidden=true;return}
  const hits=D.filter(c=>nrm(c.name).includes(q)).sort((a,b)=>(nrm(a.name).startsWith(q)?0:1)-(nrm(b.name).startsWith(q)?0:1)||total(b)-total(a)).slice(0,8);
  gres.innerHTML=hits.length?hits.map(c=>`<button class="open gr" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b><small>${catName(c.cat)} · Farm ${c.farm} · Solo ${c.solo} · Ultra ${c.ultra}</small></span></button>`).join(""):`<div class="npEmpty">${L("gnores")}</div>`;
  gres.hidden=false}
document.getElementById("bq").addEventListener("input",renderBuilder);
document.getElementById("enq").addEventListener("input",renderEnh);
gq.addEventListener("input",runSearch);
gq.addEventListener("focus",runSearch);
gq.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();const f=gres.querySelector(".gr");if(f){openClass(+f.dataset.i);gres.hidden=true;gq.value="";gq.blur()}}if(e.key==="Escape"){gres.hidden=true;gq.blur()}});
document.addEventListener("click",e=>{if(!e.target.closest(".gsearch"))gres.hidden=true;else if(e.target.closest(".gr")){gres.hidden=true;gq.value=""}});
document.addEventListener("keydown",e=>{if(e.key==="/"&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)&&!dlg.open){e.preventDefault();gq.focus()}});
document.getElementById("q").addEventListener("input",renderCards);
