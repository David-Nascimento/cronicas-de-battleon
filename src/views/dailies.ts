import {seg} from "../components/shared.js";
import {DAILIES, FARMS, REL} from "../data/index.js";
import {fmtDay, jn as joinCode} from "./releases.js";
import {esc} from "../lib/util.js";
import {L, save, st} from "../state.js";
import {renderFarms} from "./farms.js";
import {renderHome} from "./home.js";
import {toast} from "../features/toasts.js";
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
/* usados pelo Meu painel: as marcações de hoje e marcar/desmarcar uma diária */
export const doneToday=()=>sync().done;
export function toggleDaily(id:string){const d=sync();d.done=d.done.includes(id)?d.done.filter(x=>x!==id):[...d.done,id];save()}
const hidden=()=>new Set(st.dhide||[]);
/* Minhas diárias: se a pessoa escolheu as suas, só elas contam */
const mine=()=>new Set(st.dmine||[]);
const inScope=(x,h,m)=>!h.has(x.id)&&(m.size?m.has(x.id):counted(x));
export function dailyProgress(){
  const d=sync(),h=hidden(),m=mine(),scope=DAILIES.filter(x=>inScope(x,h,m));
  return{done:scope.filter(x=>d.done.includes(x.id)).length,total:scope.length};
}
function fmtLeft(ms){const m=Math.max(0,Math.ceil(ms/6e4)),h=Math.floor(m/60);return h?`${h}h ${pad(m%60)}min`:`${m}min`}

export function renderDailies(){
  if(!st.df)st.df="mine";
  const d=sync(),h=hidden(),en=lg()==="en";
  const m=mine();
  /* "Minhas diárias" vem sempre primeiro, mesmo vazia: é por ela que a pessoa começa */
  seg("segDaily",[["mine",`★ ${L("daily_g_mine")}${m.size?` <b>${m.size}</b>`:""}`],["all",L("daily_g_all")],...GROUPS.map(g=>[g,L("daily_g_"+g)])],"df",renderDailies);
  const p=dailyProgress(),pct=p.total?Math.round(p.done/p.total*100):0,reset=nextReset();
  const hours=Array.from({length:24},(_,i)=>`<option value="${i}"${i===hour()?" selected":""}>${pad(i)}:00</option>`).join("");
  /* primeira visita: só o convite, sem barra de contagem para não confundir */
  document.getElementById("dBar").hidden=st.df==="mine"&&!m.size;
  document.getElementById("dBar").innerHTML=`
    <div class="dTop"><div class="dProg"><b>${L("daily_prog",{n:p.done,t:p.total})}</b>${p.total&&p.done===p.total?` <span class="pill on">${L("daily_all_done")}</span>`:""}</div>
      <span class="pill soon" id="dLeft">${L("daily_resets",{t:fmtLeft(reset.getTime()-Date.now())})}</span></div>
    <div class="dMeter" role="progressbar" aria-valuemin="0" aria-valuemax="${p.total}" aria-valuenow="${p.done}"><i style="width:${pct}%"></i></div>
    <div class="dTools"><label class="dHour" title="${esc(L("daily_hour_tip"))}">${L("daily_hour")} <select id="dHour" aria-label="${esc(L("daily_hour"))}">${hours}</select></label>
      <button class="linkBtn" data-dclear>${L("daily_clear")}</button>
      <label class="dHour"><input type="checkbox" id="dRem"${st.drem?" checked":""}> ${L("daily_rem")}</label>
      ${h.size?`<button class="linkBtn" data-dshow>${st.dsh?L("daily_hide_hidden"):L("daily_show_hidden",{n:h.size})}</button>`:""}</div>
    <p class="dHint">${m.size?L("daily_scope_mine",{n:m.size}):L("daily_scope_all")} <button class="linkBtn" data-dpick>${L(m.size?"daily_pick_edit":"daily_pick_btn")}</button></p>
    <p class="dHint">${L("daily_hour_tip")}</p>`;
  const f=st.df,groups=f==="mine"?[]:GROUPS.filter(g=>f==="all"?g!=="old"&&g!=="season"&&g!=="rep":f===g);
  const jn=`<code class="jn" data-j="yulgar" title="${esc(L("farm_copied"))}">/join yulgar</code>`;
  let html=["boss","old","season","hf","rep"].includes(f)?"":`<p class="dBoard">${L("daily_board")} ${jn}</p>`;
  if(f==="mine"&&!m.size)html=`<section class="dIntro frame"><h3>${L("daily_intro_h")}</h3>
      <ol><li>${L("daily_intro_1")}</li><li>${L("daily_intro_2")}</li><li>${L("daily_intro_3")}</li></ol>
      <div class="dIntroActs"><button class="btnG" data-dpick>${L("daily_pick_btn")}</button><button class="btnQ" data-dpick-all>${L("daily_intro_all")}</button></div></section>`;
  else if(f==="mine"){const xs=DAILIES.filter(x=>m.has(x.id)&&(st.dsh||!h.has(x.id)));
    html+=`<section class="dGrp"><h3>★ ${L("daily_g_mine")}<small>${xs.filter(x=>d.done.includes(x.id)).length}/${xs.length}</small><button class="linkBtn dEdit" data-dpick>${L("daily_pick_edit")}</button></h3><div class="dGrid">${xs.map(x=>item(x,d,h)).join("")}</div></section>`}
  for(const g of groups){
    const all=DAILIES.filter(x=>x.g===g),items=all.filter(x=>st.dsh||!h.has(x.id));
    const nDone=all.filter(x=>!h.has(x.id)&&d.done.includes(x.id)).length,nTot=all.filter(x=>!h.has(x.id)).length;
    if(g==="season")html+=`<p class="dEvLink">${L("daily_ev_link")} <button class="linkBtn" data-gohub>${L("daily_ev_go")}</button></p>`;
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
    <span class="dSide"><button class="dStar" data-dstar="${x.id}" aria-pressed="${mine().has(x.id)}">${mine().has(x.id)?`★ ${L("daily_starred")}`:`☆ ${L("daily_star")}`}</button>
    <button class="dHide" data-dhide="${x.id}" title="${L(hid?"daily_unhide":"daily_hide")}">${L(hid?"daily_unhide":"daily_hide")}</button></span></article>`;
}

/* cliques e troca da hora de virada */
const root=document.getElementById("v-diarias");
root.addEventListener("click",e=>{
  const t=(e.target as HTMLElement).closest<HTMLElement>("[data-dtoggle]");
  if(t){const d=sync(),id=t.dataset.dtoggle;d.done=d.done.includes(id)?d.done.filter(x=>x!==id):[...d.done,id];save();renderDailies();renderHome();return}
  const hd=(e.target as HTMLElement).closest<HTMLElement>("[data-dhide]");
  if(hd){const s=hidden(),id=hd.dataset.dhide;s.has(id)?s.delete(id):s.add(id);st.dhide=[...s];save();renderDailies();return}
  const hf=(e.target as HTMLElement).closest<HTMLElement>("[data-dhf]");
  if(hf){const i=FARMS.findIndex(x=>x.n===hf.dataset.dhf);if(i<0)return;st.fk=FARMS[i].k;save();show("itens");renderFarms();
    const el=document.getElementById("farm-"+i);if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1600)}return}
  if((e.target as HTMLElement).closest("[data-dpick]")){openPick();return}
  if((e.target as HTMLElement).closest("[data-dpick-all]")){st.df="all";save();renderDailies();return}
  const sr=(e.target as HTMLElement).closest<HTMLElement>("[data-dstar]");
  if(sr){const s=mine(),id=sr.dataset.dstar;s.has(id)?s.delete(id):s.add(id);st.dmine=[...s];save();renderDailies();renderHome();schedRem();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-dclear]")){sync().done=[];save();renderDailies();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-dshow]")){st.dsh=!st.dsh;save();renderDailies();return}
});
root.addEventListener("change",e=>{
  if((e.target as HTMLElement).id==="dRem"){const on=(e.target as HTMLInputElement).checked;
    if(on&&"Notification" in window&&Notification.permission==="default")Notification.requestPermission().then(()=>{st.drem=Notification.permission==="granted";save();renderDailies();schedRem()});
    else{st.drem=on&&"Notification" in window&&Notification.permission==="granted";save();renderDailies();schedRem();if(on&&!st.drem)toast("!",L("daily_rem_denied"))}
    return}
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

/* lembrete: 1 hora antes da virada, se ainda faltar diária das que contam. Só funciona com o portal aberto
   (aba ou app instalado); avisar com o navegador fechado exigiria um servidor de notificações. */
let remTimer=0;
export function schedRem(){clearTimeout(remTimer);if(!st.drem||!("Notification" in window)||Notification.permission!=="granted")return;
  const at=nextReset().getTime()-36e5-Date.now();if(at<0)return;
  remTimer=window.setTimeout(()=>{const p=dailyProgress();if(p.total>p.done){
    const n=new Notification(L("title"),{body:L("daily_rem_body",{n:p.total-p.done}),icon:"icons/icon-192.png",tag:"battleon-daily"});
    n.onclick=()=>{window.focus();show("diarias")}}},at)}
setTimeout(schedRem,1500);

/* seletor "Escolher minhas diárias": uma lista só, com caixas de marcar, busca e "marcar o grupo todo" */
const pick=document.getElementById("dlgPick") as HTMLDialogElement;
let pickSel=new Set<string>(),pickQ="";
function renderPick(){const l=lg(),q=pickQ.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const nm=x=>l==="en"&&x.ne?x.ne:x.n,hit=x=>!q||(nm(x)+" "+(x.who?x.who[l]:"")).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").includes(q);
  document.getElementById("pkList").innerHTML=GROUPS.map(g=>{const xs=DAILIES.filter(x=>x.g===g&&hit(x));if(!xs.length)return "";
    const all=xs.every(x=>pickSel.has(x.id));
    return `<section class="pkGrp"><div class="pkGh"><b>${L("daily_g_"+g)}</b><button class="linkBtn" data-pkg="${g}" data-on="${all?0:1}">${L(all?"daily_pick_none":"daily_pick_group")}</button></div>
      ${xs.map(x=>`<label class="pkRow"><input type="checkbox" data-pkid="${x.id}"${pickSel.has(x.id)?" checked":""}><span><b>${esc(nm(x))}</b>${x.mem==="m"?` <span class="pill">${L("daily_member")}</span>`:x.mem==="l"?` <span class="pill">${L("daily_legend")}</span>`:""}<small>${esc(x.who?x.who[l]:"")}</small></span></label>`).join("")}</section>`}).join("")||`<p class="dNote">${L("daily_empty")}</p>`;
  (document.getElementById("pkSave") as HTMLButtonElement).textContent=L("daily_pick_save",{n:pickSel.size})}
export function openPick(){pickSel=new Set(st.dmine||[]);pickQ="";
  pick.innerHTML=`<div class="dh"><div class="info"><h3>${L("daily_pick_h")}</h3><p class="dNote" style="margin:0">${L("daily_pick_sub")}</p></div><button class="x" data-pkclose aria-label="${L("close")}">×</button></div>
    <div class="pkTop"><input type="search" id="pkQ" placeholder="${esc(L("daily_pick_q"))}" aria-label="${esc(L("daily_pick_q"))}" autocomplete="off"></div>
    <div class="pkList" id="pkList"></div>
    <div class="pkFoot"><button class="btnQ" data-pkclose>${L("tl_cancel")}</button><button class="btnG" id="pkSave" data-pksave></button></div>`;
  renderPick();pick.showModal();(document.getElementById("pkQ") as HTMLInputElement).focus()}
pick.addEventListener("input",e=>{const t=e.target as HTMLInputElement;if(t.id==="pkQ"){pickQ=t.value;renderPick()}});
pick.addEventListener("change",e=>{const t=e.target as HTMLInputElement;if(t.dataset.pkid){t.checked?pickSel.add(t.dataset.pkid):pickSel.delete(t.dataset.pkid);renderPick()}});
pick.addEventListener("click",e=>{const t=e.target as HTMLElement;
  if(t===pick||t.closest("[data-pkclose]")){pick.close();return}
  const g=t.closest<HTMLElement>("[data-pkg]");if(g){const on=g.dataset.on==="1";DAILIES.filter(x=>x.g===g.dataset.pkg).forEach(x=>on?pickSel.add(x.id):pickSel.delete(x.id));renderPick();return}
  if(t.closest("[data-pksave]")){st.dmine=[...pickSel];st.df=pickSel.size?"mine":"all";save();pick.close();renderDailies();renderHome();schedRem();
    toast("★",L(pickSel.size?"daily_pick_done":"daily_pick_cleared",{n:pickSel.size}))}});
