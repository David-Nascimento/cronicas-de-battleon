import {CATS, MODES} from "../config.js";
import {tColor} from "../lib/util.js";
import {L, T, save, st} from "../state.js";

export const catName=k=>T(CATS[k].n);
export const badges=c=>Object.keys(MODES).map(m=>`<span class="b" style="background:${tColor(c[m])}"><em>${MODES[m]}</em>${c[m]}</span>`).join("");
export const catChip=c=>`<span class="chip"><span class="dot" style="background:var(${CATS[c.cat].c})"></span>${catName(c.cat)}</span>`;
export const newTag=c=>c.nw?`<span class="new">${L("nw")}</span>`:"";
export function seg(id,opts,key,cb){
  const el=document.getElementById(id);
  el.innerHTML=opts.map(([v,l])=>`<button data-v="${v}" aria-pressed="${st[key]===v}">${l}</button>`).join("");
  el.onclick=e=>{const b=(e.target as HTMLElement).closest<HTMLElement>("button");if(!b)return;st[key]=b.dataset.v;save();[...el.children].forEach(x=>x.setAttribute("aria-pressed",String(x===b)));cb()};
}
