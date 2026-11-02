import {EYES} from "../config.js";
import {L, save, st} from "../state.js";

/* Cor dos olhos: como no equipamento Hollowborn, o brilho do portal segue a cor escolhida.
   A cor fica em <html data-eye>, e os tokens de tokens.css derivam o resto dela. */
const root=document.documentElement;
const panel=()=>document.getElementById("eyePanel"),btn=()=>document.getElementById("eyeBtn");
export function applyEye(){root.dataset.eye=EYES.some(e=>e[0]===st.eye)?st.eye:"espectral"}
export function renderEye(){
  const b=btn(),p=panel();if(!b||!p)return;
  b.setAttribute("aria-label",L("eye_btn"));b.title=L("eye_btn");p.setAttribute("aria-label",L("eye_btn"));
  p.innerHTML=`<b>${L("eye_btn")}</b><p>${L("eye_hint")}</p><div class="eyeOpts">${EYES.map(([k,c])=>`<button data-eye="${k}" aria-pressed="${root.dataset.eye===k}"><i style="background:${c};color:${c}"></i>${L("eye_"+k)}</button>`).join("")}</div>`;
}
function close(){const p=panel();if(p&&!p.hidden){p.hidden=true;btn().setAttribute("aria-expanded","false")}}
document.addEventListener("click",e=>{
  if(e.target.closest("#eyeBtn")){const p=panel(),open=p.hidden;p.hidden=!open;btn().setAttribute("aria-expanded",String(open));return}
  const o=e.target.closest("#eyePanel [data-eye]");
  if(o){st.eye=o.dataset.eye;save();applyEye();renderEye();return}
  if(!e.target.closest("#eyePanel"))close();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
applyEye();
