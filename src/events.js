import {dismissAlert, goAlert, markAllRead} from "./features/alerts.js";
import {nrm} from "./lib/util.js";
import {renderAll} from "./render-all.js";
import {save, st, ui} from "./state.js";
import {bList, ownSet, renderBuilder} from "./views/builder.js";
import {dlg, openClass} from "./views/class-dialog.js";
import {addCompare, renderCompare} from "./views/compare.js";
import {openEnh} from "./views/enhancements.js";
import {closePanel, show} from "./views/nav.js";
import {goTeam} from "./views/teams.js";

document.addEventListener("click",e=>{
  const tb=e.target.closest("[data-team]");
  if(tb){dlg.close();goTeam(tb.dataset.team);return}
  const gt=e.target.closest("[data-goteam]");if(gt){goTeam(gt.dataset.goteam);return}
  const ac=e.target.closest("[data-addcmp]");if(ac){addCompare(+ac.dataset.addcmp);dlg.close();renderCompare();show("comparar");return}
  const cc=e.target.closest("[data-cmpclear]");if(cc){st.cmp=(st.cmp||[]).filter((_,k)=>k!==+cc.dataset.cmpclear);save();renderCompare();return}
  const eb=e.target.closest("[data-enhall]");if(eb){openEnh(+eb.dataset.enhall);return}
  const ow=e.target.closest("[data-own]");if(ow){const n=ow.dataset.own,o=ownSet();o.has(n)?o.delete(n):o.add(n);st.own=[...o];save();renderBuilder();return}
  if(e.target.closest("[data-bmark]")){const o=ownSet();bList(nrm(document.getElementById("bq").value.trim())).forEach(c=>o.add(c.name));st.own=[...o];save();renderBuilder();return}
  if(e.target.closest("[data-bclear]")){st.own=[];save();renderBuilder();return}
  const sc=e.target.closest("[data-sec]");if(sc){closePanel();show(sc.dataset.sec);return}
  const sb=e.target.closest("[data-sub]");if(sb){show(sb.dataset.sub);return}
  const gv=e.target.closest("[data-goview]");if(gv){closePanel();show(gv.dataset.goview);return}
  const gm=e.target.closest("[data-gomode]");if(gm){st.mode=gm.dataset.gomode;save();renderAll();show("tier");return}
  const panel=document.getElementById("notifPanel"),bell=document.getElementById("bell");
  if(e.target.closest("#bell")){const open=panel.hidden;panel.hidden=!open;bell.setAttribute("aria-expanded",open);document.body.classList.toggle("np-open",open);return}
  const al=e.target.closest("[data-alert]");if(al){closePanel();goAlert(ui.ALERTS.find(a=>a.id===al.dataset.alert));return}
  const dm=e.target.closest("[data-dismiss]");if(dm){dismissAlert(dm.dataset.dismiss);return}
  if(e.target.closest("[data-markall]")){markAllRead();return}
  if(e.target.closest("[data-seeall]")){closePanel();show("novidades");return}
  const nw=e.target.closest("[data-news]");if(nw){closePanel();show("novidades");const el=document.getElementById("news-"+nw.dataset.news);if(el)el.scrollIntoView({behavior:"smooth",block:"center"});return}
  if(!panel.hidden&&!e.target.closest("#notifPanel"))closePanel();
  const b=e.target.closest(".open");if(b&&b.dataset.i!=null)openClass(+b.dataset.i)});
dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()});
