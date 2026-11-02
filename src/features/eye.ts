import {EYES} from "../config.js";
import {L, save, st} from "../state.js";

/* Cor dos olhos: como no equipamento Hollowborn, o brilho do portal segue a cor escolhida.
   A cor fica em <html data-eye>, e os tokens de tokens.css derivam o resto dela. */
const root=document.documentElement;
const panel=()=>document.getElementById("eyePanel"),btn=()=>document.getElementById("eyeBtn");
/* ícone da aba: o mesmo elmo do brasão, com os olhos na cor escolhida */
const favSvg=c=>`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 92 104'><path d='M46 4L82 18V56C82 78 66 93 46 100C26 93 10 78 10 56V18Z' fill='#231B31' stroke='${c}' stroke-width='5' stroke-linejoin='round'/><path d='M46 21C32 21 24 32 24 47V75L31 71L35 78L40 72L46 80L52 72L57 78L61 71L68 75V47C68 32 60 21 46 21Z' fill='#0C0912'/><path d='M46 33C37.5 33 33 40.5 33 49C33 58 39 64.5 46 66.5C53 64.5 59 58 59 49C59 40.5 54.5 33 46 33Z' fill='#05030A'/><path d='M34 46.6C38 44.6 42.4 45.6 45 49.6C41.6 51.8 37.2 51.2 34 46.6ZM58 46.6C54 44.6 49.6 45.6 47 49.6C50.4 51.8 54.8 51.2 58 46.6Z' fill='${c}'/></svg>`;
export function applyEye(){root.dataset.eye=EYES.some(e=>e[0]===st.eye)?st.eye:"espectral";
  const c=(EYES.find(e=>e[0]===root.dataset.eye)||EYES[0])[1],fav=document.getElementById("favicon") as HTMLLinkElement;
  if(fav)fav.href="data:image/svg+xml,"+encodeURIComponent(favSvg(c))}
export function renderEye(){
  const b=btn(),p=panel();if(!b||!p)return;
  b.setAttribute("aria-label",L("eye_btn"));b.title=L("eye_btn");p.setAttribute("aria-label",L("eye_btn"));
  p.innerHTML=`<b>${L("eye_btn")}</b><p>${L("eye_hint")}</p><div class="eyeOpts">${EYES.map(([k,c])=>`<button data-eye="${k}" aria-pressed="${root.dataset.eye===k}"><i style="background:${c};color:${c}"></i>${L("eye_"+k)}</button>`).join("")}</div>`;
}
function close(){const p=panel();if(p&&!p.hidden){p.hidden=true;btn().setAttribute("aria-expanded","false")}}
document.addEventListener("click",e=>{
  if((e.target as HTMLElement).closest<HTMLElement>("#eyeBtn")){const p=panel(),open=p.hidden;p.hidden=!open;btn().setAttribute("aria-expanded",String(open));return}
  const o=(e.target as HTMLElement).closest<HTMLElement>("#eyePanel [data-eye]");
  if(o){st.eye=o.dataset.eye;save();applyEye();renderEye();return}
  if(!(e.target as HTMLElement).closest<HTMLElement>("#eyePanel"))close();
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
applyEye();
