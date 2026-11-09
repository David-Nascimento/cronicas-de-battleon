import {catName, seg} from "./components/shared.js";
import {CATS} from "./config.js";
import {D} from "./data/index.js";
import {refreshNotif} from "./features/alerts.js";
import {renderFeed} from "./features/news.js";
import {L, st, ui} from "./state.js";
import {renderAgenda} from "./views/agenda.js";
import {renderBuilder} from "./views/builder.js";
import {renderCards} from "./views/cards.js";
import {dlg, openClass} from "./views/class-dialog.js";
import {renderCompare} from "./views/compare.js";
import {dlgE, openEnh, renderEnh} from "./views/enhancements.js";
import {renderDailies} from "./views/dailies.js";
import {renderFarms} from "./views/farms.js";
import {renderDrops} from "./views/drops.js";
import {renderModes, renderStatic} from "./views/static.js";
import {renderTeams} from "./views/teams.js";
import {renderTiers} from "./views/tiers.js";
import {renderReleases} from "./views/releases.js";
import {renderTheme} from "./features/theme.js";
import {renderEvents} from "./views/events.js";
import {renderAcct as renderAcctOnly, renderPainel} from "./views/painel.js";

/* Cada aba só é montada quando aparece. Trocar de idioma marca todas como "sujas" e redesenha só a aberta;
   as outras são montadas na primeira vez que forem abertas (show → renderView). */
const VIEWR={painel:renderPainel,inicio:renderModes,tier:renderTiers,todas:renderCards,comparar:renderCompare,enh:renderEnh,
  ultras:()=>{renderAgenda();renderTeams()},montador:renderBuilder,diarias:renderDailies,itens:renderFarms,drops:renderDrops,lancamentos:renderReleases,eventos:renderEvents,novidades:renderFeed};
const dirty=new Set(Object.keys(VIEWR));
export function renderView(v:string,force?:boolean){if((force||dirty.has(v))&&VIEWR[v]){dirty.delete(v);VIEWR[v]()}}
export function renderAll(){
  renderStatic();
  /* "Novas" só aparece enquanto houver classe nova sem análise */
  const cats=Object.keys(CATS).filter(k=>k!=="nova"||D.some(c=>c.cat==="nova"));
  if(!cats.includes(st.cat))st.cat="free";if(st.all!=="todas"&&!cats.includes(st.all))st.all="todas";if(st.bcat!=="all"&&!cats.includes(st.bcat))st.bcat="all";
  seg("segCat",cats.map(k=>[k,k==="nova"?`${catName(k)} <b>${D.filter(c=>c.cat==="nova").length}</b>`:catName(k)]),"cat",renderTiers);
  seg("segMode",[["geral",L("overall")],["farm","Farm"],["solo","Solo"],["ultra","Ultras"]],"mode",renderTiers);
  seg("bCat",[["all",L("all")],...cats.map(k=>[k,catName(k)])],"bcat",renderBuilder);
  seg("segAll",[["todas",L("all")],...cats.map(k=>[k,catName(k)])],"all",renderCards);
  Object.keys(VIEWR).forEach(k=>dirty.add(k));
  renderView(ui.curView);renderTheme();refreshNotif();renderAcctOnly();
  if(dlg.open&&ui.curClass!=null)openClass(ui.curClass);
  if(dlgE.open&&ui.eIdx!=null)openEnh(ui.eIdx);
}
