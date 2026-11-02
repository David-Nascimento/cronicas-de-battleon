import {catName, seg} from "./components/shared.js";
import {CATS} from "./config.js";
import {refreshNotif} from "./features/alerts.js";
import {renderFeed} from "./features/news.js";
import {L, ui} from "./state.js";
import {renderAgenda} from "./views/agenda.js";
import {renderBuilder} from "./views/builder.js";
import {renderCards} from "./views/cards.js";
import {dlg, openClass} from "./views/class-dialog.js";
import {renderCompare} from "./views/compare.js";
import {dlgE, openEnh, renderEnh} from "./views/enhancements.js";
import {renderDailies} from "./views/dailies.js";
import {renderFarms} from "./views/farms.js";
import {renderModes, renderStatic} from "./views/static.js";
import {renderTeams} from "./views/teams.js";
import {renderTiers} from "./views/tiers.js";

export function renderAll(){
  renderStatic();renderModes();
  seg("segCat",Object.keys(CATS).map(k=>[k,catName(k)]),"cat",renderTiers);
  seg("segMode",[["geral",L("overall")],["farm","Farm"],["solo","Solo"],["ultra","Ultras"]],"mode",renderTiers);
  seg("bCat",[["all",L("all")],...Object.keys(CATS).map(k=>[k,catName(k)])],"bcat",renderBuilder);
  seg("segAll",[["todas",L("all")],...Object.keys(CATS).map(k=>[k,catName(k)])],"all",renderCards);
  renderTiers();renderAgenda();renderTeams();renderBuilder();renderFarms();renderDailies();renderCards();renderCompare();renderEnh();renderFeed();refreshNotif();
  if(dlg.open&&ui.curClass!=null)openClass(ui.curClass);
  if(dlgE.open&&ui.eIdx!=null)openEnh(ui.eIdx);
}
