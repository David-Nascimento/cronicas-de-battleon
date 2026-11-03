import "./styles/main.css";

/* ordem original de carregamento (registro dos eventos) */
import "./views/static.js";
import "./views/nav.js";
import "./views/farms.js";
import "./views/dailies.js";
import "./views/releases.js";
import "./views/builder.js";
import "./views/home.js";
import "./views/tiers.js";
import "./views/agenda.js";
import "./features/news.js";
import "./features/alerts.js";
import "./features/toasts.js";
import "./features/eye.js";
import "./views/compare.js";
import "./views/teams.js";
import "./views/cards.js";
import "./views/enhancements.js";
import "./views/class-dialog.js";
import "./events.js";
import "./features/search.js";

import {seg} from "./components/shared.js";
import {checkLive} from "./features/toasts.js";
import {renderAll} from "./render-all.js";
import {renderAgenda} from "./views/agenda.js";
import {show} from "./views/nav.js";
import {L, ui} from "./state.js";
import {decodeTier} from "./features/share-tier.js";
import {openShared, renderTiers} from "./views/tiers.js";
import {toast} from "./features/toasts.js";

seg("segLang",[["pt","PT"],["en","EN"]],"lang",renderAll);
renderAll();
/* tier list compartilhada por link: ?tl=...#tier */
const tl=new URLSearchParams(location.search).get("tl");
if(tl)decodeTier(tl).then(t=>{const u=new URL(location.href);u.search="";history.replaceState(null,"",u.toString());
  if(t){openShared(t);show("tier");renderTiers()}else toast("!",L("tl_shared_bad"))});
show(location.hash.slice(1)||"inicio");
window.addEventListener("hashchange",()=>{const v=location.hash.slice(1);if(v&&v!==ui.curView)show(v)});
setTimeout(()=>checkLive(true),600);
setInterval(()=>{checkLive(false);renderAgenda()},60000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden){checkLive(false);renderAgenda()}});

/* app instalável: o service worker só funciona em http(s), não abrindo o arquivo direto do disco */
if("serviceWorker" in navigator&&location.protocol.startsWith("http"))window.addEventListener("load",()=>{navigator.serviceWorker.register("sw.js").catch(()=>{})});
