import "./styles/main.css";

/* ordem original de carregamento (registro dos eventos) */
import "./views/static.js";
import "./views/nav.js";
import "./views/farms.js";
import "./views/builder.js";
import "./views/home.js";
import "./views/tiers.js";
import "./views/agenda.js";
import "./features/news.js";
import "./features/alerts.js";
import "./features/toasts.js";
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

seg("segLang",[["pt","PT"],["en","EN"]],"lang",renderAll);
renderAll();
show(location.hash.slice(1)||"inicio");
setTimeout(()=>checkLive(true),600);
setInterval(()=>{checkLive(false);renderAgenda()},60000);
document.addEventListener("visibilitychange",()=>{if(!document.hidden){checkLive(false);renderAgenda()}});
