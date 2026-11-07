import {dismissAlert, goAlert, markAllRead} from "./features/alerts.js";
import {nrm} from "./lib/util.js";
import {renderAll} from "./render-all.js";
import {save, st, ui} from "./state.js";
import {bList, ownSet, renderBuilder} from "./views/builder.js";
import {dlg, openClass} from "./views/class-dialog.js";
import {addCompare, renderCompare} from "./views/compare.js";
import {openEnh} from "./views/enhancements.js";
import {closePanel, secHome, show} from "./views/nav.js";
import {REL} from "./data/index.js";
import {goTeam} from "./views/teams.js";
import {renderDailies} from "./views/dailies.js";

document.addEventListener("click",e=>{
  const tb=(e.target as HTMLElement).closest<HTMLElement>("[data-team]");
  if(tb){dlg.close();goTeam(tb.dataset.team);return}
  const gt=(e.target as HTMLElement).closest<HTMLElement>("[data-goteam]");if(gt){goTeam(gt.dataset.goteam);return}
  const ac=(e.target as HTMLElement).closest<HTMLElement>("[data-addcmp]");if(ac){addCompare(+ac.dataset.addcmp);dlg.close();renderCompare();show("comparar");return}
  const cc=(e.target as HTMLElement).closest<HTMLElement>("[data-cmpclear]");if(cc){st.cmp=(st.cmp||[]).filter((_,k)=>k!==+cc.dataset.cmpclear);save();renderCompare();return}
  const eb=(e.target as HTMLElement).closest<HTMLElement>("[data-enhall]");if(eb){openEnh(+eb.dataset.enhall);return}
  const ow=(e.target as HTMLElement).closest<HTMLElement>("[data-own]");if(ow){const n=ow.dataset.own,o=ownSet();o.has(n)?o.delete(n):o.add(n);st.own=[...o];save();renderBuilder();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-bmark]")){const o=ownSet();bList(nrm((document.getElementById("bq") as HTMLInputElement).value.trim())).forEach(c=>o.add(c.name));st.own=[...o];save();renderBuilder();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-bclear]")){st.own=[];save();renderBuilder();return}
  const sc=(e.target as HTMLElement).closest<HTMLElement>("[data-sec]");if(sc){closePanel();show(secHome(sc.dataset.sec));return}
  const gf=(e.target as HTMLElement).closest<HTMLElement>("[data-gofarm]");if(gf){dlg.close();const i=+gf.dataset.gofarm;st.fk="all";save();show("itens");const el=document.getElementById("farm-"+i);if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800)}return}
  const gd=(e.target as HTMLElement).closest<HTMLElement>("[data-godaily]");if(gd){dlg.close();st.df="all";save();show("diarias");const t=document.querySelector(`[data-dtoggle="${CSS.escape(gd.dataset.godaily)}"]`);const el=t&&t.closest(".dItem");if(el){el.scrollIntoView({behavior:"smooth",block:"center"});el.classList.add("flash");setTimeout(()=>el.classList.remove("flash"),1800)}return}
  const rt=(e.target as HTMLElement).closest<HTMLElement>("[data-relt]");if(rt&&REL.length){if(dlg.open)dlg.close();st.rt=rt.dataset.relt;st.rel=REL[0].id;ui.relQ="";save();show("lancamentos");return}
  const sb=(e.target as HTMLElement).closest<HTMLElement>("[data-sub]");if(sb){show(sb.dataset.sub);return}
  if((e.target as HTMLElement).closest("[data-gohub]")){show("eventos");return}
  if((e.target as HTMLElement).closest("[data-goseason]")){st.df="season";save();show("diarias");renderDailies();return}
  const rg=(e.target as HTMLElement).closest<HTMLElement>("[data-relgo]");if(rg){if(dlg.open)dlg.close();st.rel=rg.dataset.relgo;st.relTop=REL[0]&&REL[0].id;st.rt="all";ui.relQ="";save();show("lancamentos");return}
  const gv=(e.target as HTMLElement).closest<HTMLElement>("[data-goview]");if(gv){closePanel();show(gv.dataset.goview);return}
  const gm=(e.target as HTMLElement).closest<HTMLElement>("[data-gomode]");if(gm){st.mode=gm.dataset.gomode;save();renderAll();show("tier");return}
  const panel=document.getElementById("notifPanel"),bell=document.getElementById("bell");
  if((e.target as HTMLElement).closest<HTMLElement>("#bell")){const open=panel.hidden===true;panel.hidden=!open;bell.setAttribute("aria-expanded",String(open));document.body.classList.toggle("np-open",open);return}
  const al=(e.target as HTMLElement).closest<HTMLElement>("[data-alert]");if(al){closePanel();goAlert(ui.ALERTS.find(a=>a.id===al.dataset.alert));return}
  const dm=(e.target as HTMLElement).closest<HTMLElement>("[data-dismiss]");if(dm){dismissAlert(dm.dataset.dismiss);return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-markall]")){markAllRead();return}
  if((e.target as HTMLElement).closest<HTMLElement>("[data-seeall]")){closePanel();show("novidades");return}
  const nw=(e.target as HTMLElement).closest<HTMLElement>("[data-news]");if(nw){closePanel();if(dlg.open)dlg.close();show("novidades");const el=document.getElementById("news-"+nw.dataset.news);if(el)el.scrollIntoView({behavior:"smooth",block:"center"});return}
  if(!panel.hidden&&!(e.target as HTMLElement).closest<HTMLElement>("#notifPanel"))closePanel();
  const b=(e.target as HTMLElement).closest<HTMLElement>(".open");if(b&&b.dataset.i!=null)openClass(+b.dataset.i)});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
