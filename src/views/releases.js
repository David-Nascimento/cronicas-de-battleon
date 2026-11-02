import {seg} from "../components/shared.js";
import {RICO, RTYPES} from "../config.js";
import {REL} from "../data/index.js";
import {unreadNews} from "../features/news.js";
import {esc, nrm, wiki} from "../lib/util.js";
import {L, loc, save, st, ui} from "../state.js";

/* Itens novos: o que entrou no jogo em cada atualização (dados em data/releases.json). */
const DAY=864e5;
const parse=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};
const mon=d=>d.toLocaleDateString(loc(),{month:"short"}).replace(".","");
export const fmtDay=s=>{const d=parse(s);return st.lang==="en"?`${mon(d)} ${d.getDate()}`:`${d.getDate()} ${mon(d)}`};
export function fmtRange(r){const a=parse(r.from),b=parse(r.to),same=a.getMonth()===b.getMonth();
  if(st.lang==="en")return same?`${mon(a)} ${a.getDate()}–${b.getDate()}`:`${mon(a)} ${a.getDate()} – ${mon(b)} ${b.getDate()}`;
  return same?`${a.getDate()} a ${b.getDate()} ${mon(b)}`:`${a.getDate()} ${mon(a)} a ${b.getDate()} ${mon(b)}`}
export function relCounts(r){const c={total:0};RTYPES.forEach(t=>{c[t]=(r.items[t]||[]).length;c.total+=c[t]});return c}
const cur=()=>REL.find(x=>x.id===st.rel)||REL[0];
export const ricon=(t,cls)=>`<svg class="${cls||"riIc"}" viewBox="0 0 24 24" aria-hidden="true"><path d="${RICO[t]}" fill="currentColor" fill-rule="evenodd"/></svg>`;
export const jn=j=>`<code class="jn" data-j="${esc(j)}" title="${esc(L("farm_copied"))}">/join ${esc(j)}</code>`;

/* aviso de atualização nova: vale por 10 dias, até a pessoa abrir a aba ou dispensar */
export function relUnseen(){const r=REL[0];if(!r||st.relSeen===r.id)return false;
  if((st.dis||[]).includes("rel-"+r.id))return false;
  const now=new Date(),d0=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  return (d0-parse(r.from))/DAY<=10}
export function markReleaseSeen(){const r=REL[0];if(!r||st.relSeen===r.id)return false;st.relSeen=r.id;save();return true}
export const navCount=()=>unreadNews().length+(relUnseen()?1:0);

function tags(n,f){let h="";
  if(f.includes("a"))h+=/\(0 AC\)/.test(n)?`<i class="tg z">0 AC</i>`:`<i class="tg ac">AC</i>`;
  if(f.includes("l"))h+=`<i class="tg lg">Legend</i>`;
  return h?`<span class="riTags">${h}</span>`:""}
function row(r,t,it){const [n,f="",s="",sub=""]=it,src=s&&r.srcs[s],l=st.lang;
  const meta=[t==="weapon"&&sub?L("w_"+sub):"",src?src[l]:""].filter(Boolean);
  return `<div class="ri" data-ri="${esc(n)}">${ricon(t)}<div class="riTx"><a href="${wiki(n)}" target="_blank" rel="noopener">${esc(n)}</a>${meta.length?`<span class="riMeta">${meta.map((m,i)=>`<span${src&&i===meta.length-1?` class="from"`:""}>${esc(m)}</span>`).join("")}</span>`:""}</div>${tags(n,f||"")}</div>`}

export function renderRelList(){
  const box=document.getElementById("relList");if(!box||!REL.length)return;
  const r=cur(),q=nrm((ui.relQ||"").trim()),t=st.rt||"all";
  const html=RTYPES.filter(k=>(t==="all"||t===k)&&(r.items[k]||[]).length).map(k=>{
    const rows=r.items[k].filter(it=>!q||nrm(it[0]).includes(q));
    return rows.length?`<section class="relGrp"><h3>${ricon(k,"rgIc")}${L("rel_t_"+k)} <small>${rows.length}</small></h3><div class="relItems">${rows.map(it=>row(r,k,it)).join("")}</div></section>`:""}).join("");
  box.innerHTML=html||`<p class="relEmpty">${L("rel_empty")}</p>`;
}
export function renderReleases(){
  const box=document.getElementById("relBody");if(!box)return;
  if(!REL.length){box.innerHTML=`<p class="relEmpty">${L("rel_none")}</p>`;return}
  if(!REL.some(x=>x.id===st.rel))st.rel=REL[0].id;
  seg("segRel",REL.map(x=>[x.id,fmtRange(x)]),"rel",()=>{st.rt="all";save();renderReleases()});
  const r=cur(),l=st.lang,c=relCounts(r);
  if(st.rt!=="all"&&!c[st.rt])st.rt="all";
  box.innerHTML=`<article class="relHead frame">
    <div class="relTop"><span class="relWhen">${fmtRange(r)}</span>${r.until?`<span class="pill soon">${L("rel_until",{d:fmtDay(r.until)})}</span>`:""}</div>
    <h3>${esc(r.t[l])}</h3><p class="relX">${esc(r.x[l])}</p>
    <div class="relCols">
      <div><h4>${L("rel_where")}</h4><ul class="relMaps">${r.maps.map(m=>`<li>${m.j?jn(m.j):""}<span><b>${esc(m.n)}</b> ${esc(m.w[l])}</span></li>`).join("")}</ul></div>
      <div><h4>${L("rel_shops")}</h4><div class="relShops">${r.shops.slice(0,6).map(s=>`<span>${esc(s)}</span>`).join("")}</div>${r.shops.length>6?`<details class="relMore"><summary>${L("rel_more_shops",{n:r.shops.length-6})}</summary><div class="relShops">${r.shops.slice(6).map(s=>`<span>${esc(s)}</span>`).join("")}</div></details>`:""}</div>
    </div>
    <p class="relSrc">${L("rel_src")}: ${r.src.map(s=>`<a href="${s.u}" target="_blank" rel="noopener">${esc(s.n)} ↗</a>`).join("")}</p>
  </article>
  <div class="relBar"><div class="seg" id="segRelT"></div><input type="search" id="relQ" autocomplete="off" spellcheck="false" placeholder="${esc(L("rel_q"))}" aria-label="${esc(L("rel_q"))}" value="${esc(ui.relQ||"")}"></div>
  <p class="relLegend">${L("rel_legend")}</p>
  <div class="relList" id="relList"></div>`;
  seg("segRelT",[["all",`${L("rel_all")} <b>${c.total}</b>`],...RTYPES.filter(k=>c[k]).map(k=>[k,`${L("rel_t_"+k)} <b>${c[k]}</b>`])],"rt",renderRelList);
  renderRelList();
}
/* resumo para a página Hoje */
export function relSummary(){const r=REL[0];if(!r)return `<h3>${L("home_rel")}</h3><p class="relEmpty">${L("rel_none")}</p>`;
  const c=relCounts(r),l=st.lang;
  return `<div class="hrH"><h3>${L("home_rel")}</h3><span class="relWhen">${fmtRange(r)}</span></div>
    <b class="hrT">${esc(r.t[l])}</b>
    <div class="hrCounts">${RTYPES.filter(k=>c[k]).map(k=>`<button class="cnt" data-relt="${k}">${ricon(k,"cntIc")}<b>${c[k]}</b><span>${L("rel_t_"+k)}</span></button>`).join("")}</div>
    ${r.maps.some(m=>m.j)?`<div class="hrJoins">${r.maps.filter(m=>m.j).map(m=>jn(m.j)).join("")}</div>`:""}
    <div class="hrFoot">${r.until?`<span class="pill soon">${L("rel_until",{d:fmtDay(r.until)})}</span>`:"<span></span>"}<button class="btnG" data-relt="all">${L("rel_open",{n:c.total})}</button></div>`}
/* leva até um item (vindo da busca global) */
export function focusItem(rid,name){st.rel=rid;st.rt="all";ui.relQ="";save();renderReleases();
  const el=[...document.querySelectorAll("#relList .ri")].find(x=>x.dataset.ri===name);
  if(el){el.classList.add("hit");el.scrollIntoView({behavior:"smooth",block:"center"});setTimeout(()=>el.classList.remove("hit"),2400)}}

document.addEventListener("input",e=>{if(e.target.id==="relQ"){ui.relQ=e.target.value;renderRelList()}});
