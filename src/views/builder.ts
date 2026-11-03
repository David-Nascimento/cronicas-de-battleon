import {D, TEAMS, byName} from "../data/index.js";
import {esc, idx, nrm, score, sigil, has} from "../lib/util.js";
import {L, T, st} from "../state.js";

export const ownSet=()=>new Set(st.own||[]);
export const roleOf=r=>{const x=r.toLowerCase();return /taunt|tank|tanque/.test(x)?"tank":/cura|heal/.test(x)?"heal":/suporte|support/.test(x)?"sup":"dmg"};
export const ROLE_T={dmg:["phys","mag","mana","dodge","chrono"],tank:["phys","dodge","sup"],heal:["sup"],sup:["sup","chrono","mag"]};
export function bestSub(own,role,except){let best=null,bs=-1;
  D.forEach(c=>{if(!own.has(c.name)||c.name===except||!ROLE_T[role].includes(c.type))return;
    const sc=score(c.ultra)*10+score(c.solo)+(c.type==="sup"&&(role==="heal"||role==="sup")?5:0);
    if(sc>bs){bs=sc;best=c}});return best}
export const bList=f=>[...D].sort((a,b)=>a.name.localeCompare(b.name)).filter(c=>(st.bcat==="all"||c.cat===st.bcat)&&has(c.name,f));
export function renderBuilder(){
  const own=ownSet(),f=nrm((document.getElementById("bq") as HTMLInputElement).value.trim());
  document.getElementById("bCount").textContent=L("bld_n",{n:[...own].filter(n=>n in byName).length});
  document.getElementById("bActs").innerHTML=`<button data-bmark="1">${L("bld_markall")}</button><button data-bclear="1">${L("bld_p_clear")}</button>`;
  document.getElementById("pkGrid").innerHTML=bList(f)
    .map(c=>`<button class="pk" data-own="${esc(c.name)}" aria-pressed="${own.has(c.name)}">${sigil(c)}<span>${esc(c.name)}</span></button>`).join("");
  const none=![...own].some(n=>n in byName);
  const res=TEAMS.map((t,ti)=>{
    const slots=t.team.map(([cn,role])=>{const r=roleOf(role);
      if(none)return{cn,role,st:"plain"};
      if(own.has(cn))return{cn,role,st:"ideal"};
      const sub=bestSub(own,r,cn);return sub?{cn,role,st:"sub",sub}:{cn,role,st:"miss"}});
    return{t,ti,slots,n:slots.filter(x=>x.st==="ideal").length,m:slots.filter(x=>x.st!=="miss").length}})
    .sort((a,b)=>none?a.ti-b.ti:b.n-a.n||b.m-a.m||a.ti-b.ti);
  document.getElementById("bres").innerHTML=(none?`<div class="bhint frame" style="grid-column:1/-1">${L("bld_hint")}</div>`:"")+res.map(r=>`<div class="bcard frame"><h3><button data-goteam="${r.ti}">${esc(T(r.t.n))}</button>${none?"":`<span class="pill ${r.n>=3?"on":r.n>=1?"soon":""}">${L("bld_ideal",{n:r.n})}</span>`}</h3>`+
    r.slots.map(x=>{const c=D[byName[x.cn]];
      const stt=x.st==="plain"?"":x.st==="ideal"?`<div class="st ok">✔ ${L("bld_have")}</div>`
        :x.st==="sub"?`<div class="st sub">≈ ${L("bld_use")} <button class="open" data-i="${idx(x.sub)}">${esc(x.sub.name)}</button> (Ultras ${x.sub.ultra})</div>`
        :`<div class="st miss">✖ ${L("bld_miss")}</div>`;
      return `<div class="bslot ${x.st==="ideal"?"ok":""}">${c?sigil(c):""}<div><b>${esc(x.cn)}</b><small>${esc(T(x.role))}</small>${stt}</div></div>`}).join("")+`</div>`).join("")
    +(none?"":`<p class="sub" style="grid-column:1/-1;margin:0">${L("bld_note")}</p>`);
}
