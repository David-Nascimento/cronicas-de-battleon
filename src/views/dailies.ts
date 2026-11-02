import {seg} from "../components/shared.js";
import {DAILIES, FARMS} from "../data/index.js";
import {esc} from "../lib/util.js";
import {L, save, st} from "../state.js";
import {renderFarms} from "./farms.js";
import {renderHome} from "./home.js";
import {show} from "./nav.js";

/* Diárias: lista do dia com caixas de marcar. O que está marcado vale só para o "dia do jogo":
   quando a hora de virada passa, as marcações voltam do zero. */
const GROUPS=["start","mid","end","hf","boss","rep","season","old"];
/* grupos que entram na contagem do dia (sazonais e antigas ficam de fora) */
const counted=x=>x.g!=="old"&&x.g!=="season"&&x.g!=="rep";
const pad=n=>String(n).padStart(2,"0");
const isoLocal=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const lg=()=>st.lang==="en"?"en":"pt";

const hour=()=>{const h=Number(st.dh);return Number.isInteger(h)&&h>=0&&h<24?h:0};
export const dayKey=(now=new Date())=>isoLocal(new Date(now.getTime()-hour()*36e5));
export function nextReset(now=new Date()){const r=new Date(now);r.setHours(hour(),0,0,0);if(r<=now)r.setDate(r.getDate()+1);return r}

/* garante que as marcações são de hoje; se o dia virou, zera */
function sync(){const k=dayKey();if(!st.dly||st.dly.k!==k){st.dly={k,done:[]};save()}return st.dly}
const hidden=()=>new Set(st.dhide||[]);
export function dailyProgress(){
  const d=sync(),h=hidden(),scope=DAILIES.filter(x=>counted(x)&&!h.has(x.id));
  return{done:scope.filter(x=>d.done.includes(x.id)).length,total:scope.length};
}
function fmtLeft(ms){const m=Math.max(0,Math.ceil(ms/6e4)),h=Math.floor(m/60);return h?`${h}h ${pad(m%60)}min`:`${m}min`}

export function renderDailies(){
  if(!st.df)st.df="all";
  const d=sync(),h=hidden(),en=lg()==="en";
  seg("segDaily",[["all",L("daily_g_all")],...GROUPS.map(g=>[g,L("daily_g_"+g)])],"df",renderDailies);
  const p=dailyProgress(),pct=p.total?Math.round(p.done/p.total*100):0,reset=nextReset();
  const hours=Array.from({length:24},(_,i)=>`<option value="${i}"${i===hour()?" selected":""}>${pad(i)}:00</option>`).join("");
  document.getElementById("dBar").innerHTML=`
    <div class="dTop"><div class="dProg"><b>${L("daily_prog",{n:p.done,t:p.total})}</b>${p.total&&p.done===p.total?` <span class="pill on">${L("daily_all_done")}</span>`:""}</div>
      <span class="pill soon" id="dLeft">${L("daily_resets",{t:fmtLeft(reset.getTime()-Date.now())})}</span></div>
    <div class="dMeter" role="progressbar" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.done}"><i style="width:${pct}%"></i></div>
    <div class="dTools"><label class="dHour" title="${esc(L("daily_hour_tip"))}">${L("daily_hour")} <select id="dHour" aria-label="${esc(L("daily_hour"))}">${hours}</select></label>
      <button class="linkBtn" data-dclear>${L("daily_clear")}</button>
      ${h.size?`<button class="linkBtn" data-dshow>${st.dsh?L("daily_hide_hidden"):L("daily_show_hidden",{n:h.size})}</button>`:""}</div>
    <p class="dHint">${L("daily_hour_tip")}</p>`;
  const f=st.df,groups=GROUPS.filter(g=>f==="all"?g!=="old"&&g!=="season"&&g!=="rep":f===g);
  const jn=`<code class="jn" data-j="yulgar" title="${esc(L("farm_copied"))}">/join yulgar</code>`;
  let html=["boss","old","season","hf","rep"].includes(f)?"":`<p class="dBoard">${L("daily_board")} ${jn}</p>`;
  for(const g of groups){
    const all=DAILIES.filter(x=>x.g===g),items=all.filter(x=>st.dsh||!h.has(x.id));
    const nDone=all.filter(x=>!h.has(x.id)&&d.done.includes(x.id)).length,nTot=all.filter(x=>!h.has(x.id)).length;
    html+=`<section class="dGrp"><h3>${L("daily_g_"+g)}<small>${nDone}/${nTot}</small></h3>${["hf","boss","rep","season","old"].includes(g)?`<p class="dNote">${L("daily_"+g+"_note")}</p>`:""}
      <div class="dGrid">${items.map(x=>item(x,d,h)).join("")||`<p class="dNote">${L("daily_empty")}</p>`}</div></section>`;
  }
  document.getElementById("dList").innerHTML=html;
}
function item(x,d,h){
  const on=d.done.includes(x.id),hid=h.has(x.id),l=lg(),name=l==="en"&&x.ne?x.ne:x.n;
  const mem=x.mem==="m"?`<span class="pill">${L("daily_member")}</span>`:x.mem==="l"?`<span class="pill">${L("daily_legend")}</span>`:"";
  return `<article class="dItem frame${on?" done":""}${hid?" off":""}">
    <button class="dChk" role="checkbox" aria-checked="${on}" data-dtoggle="${x.id}" aria-label="${esc(name)} — ${L(on?"daily_unmark":"daily_mark")}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5 L10 17.5 L19 7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
    <div class="dBody"><h4>${esc(name)} ${mem}</h4>
      <div class="dRow"><span>${L("daily_join")}</span>${x.j?x.j.map(m=>`<code class="jn" data-j="${m}" title="${esc(L("farm_copied"))}">/join ${m}</code>`).join(" "):`<em class="dNoJ">${L("daily_nojoin")}</em>`}</div>
      ${x.who?`<div class="dRow"><span>${L("daily_also")}</span>${esc(x.who[l])}</div>`:""}
      <div class="dRow"><span>${L("daily_req")}</span>${x.req?esc(x.req[l]):L("daily_noreq")}</div>
      <div class="dRow"><span>${L("daily_rw")}</span>${esc(x.rw[l])}</div>
      ${x.for?`<div class="dRow"><span>${L("daily_for")}</span>${esc(x.for[l])}</div>`:""}
      ${x.hf?`<button class="dHf" data-dhf="${esc(x.hf)}">${L("daily_open_hf")}</button>`:""}
      <div class="fsrc">${L("daily_src")}: <a href="${x.src}" target="_blank" rel="noopener">${esc(x.sn)} ↗</a></div></div>
    <button class="dHide" data-dhide="${x.id}" title="${L(hid?"daily_unhide":"daily_hide")}">${L(hid?"daily_unhide":"daily_hide")}</button></article>`;
}

/* cliques e troca da hora de virada */
const root=document.getElementById("v-diarias");
root.addEventListener("click",e=>{
  const t=(e.target as HTMLElement).closest<HTMLElement>("[data-dtoggle]");
  if(t){const d=sync(),id=t.dataset.dtoggle;d.done=d.done.includes(id)?d.done.filter(x=>x!==id):[...d.done,id];save();renderDailies();return}
  const hd=(e.target as HTMLElement).closest<HTMLElement>("[data-dhide]");
  if(hd){const s=hidden(),id=hd.dataset.dhide;s.has(id)?s.delete(id):s.add(id);st.dhide=[...s];save();renderDailies();return}
  const hf=(e.target as HTMLElement).closest<HTMLElement>("[data-dhf]");
  if(hf){const i=FARMS.findIndex(x=>x.n===hf.dataset.dhf);if(i<0)return;st.fk=FARMS[i].k;save();show("itens");renderFarms();
    const el=document.getElementById("farm-"+i);if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1600)}return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-dclear]")){sync().done=[];save();renderDailies();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-dshow]")){st.dsh=!st.dsh;save();renderDailies();return}
});
root.addEventListener("change",e=>{
  if((e.target as HTMLElement).id!=="dHour")return;
  const keep=sync().done;st.dh=Number((e.target as HTMLInputElement).value);st.dly={k:dayKey(),done:keep};save();renderDailies();
});
/* contagem regressiva e virada do dia, sem redesenhar tudo a cada minuto */
function tick(){
  const left=document.getElementById("dLeft");
  if(st.dly&&st.dly.k!==dayKey()){renderDailies();renderHome();return}
  if(left)left.textContent=L("daily_resets",{t:fmtLeft(nextReset().getTime()-Date.now())});
}
setInterval(tick,30000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden)tick()});
