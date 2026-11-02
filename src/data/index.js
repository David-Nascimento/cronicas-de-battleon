import TYPES from "./class-types.json";
import RAW from "./classes.json";
import FAMS from "./calendar-families.json";
import CALYR from "./calendar-years.json";
import OBTAIN from "./obtain.json";
import CONS from "./consumables.json";
import TEAMS from "./ultra-teams.json";
import ITEMS from "./ultra-items.json";
import ENH from "./enhancements.json";
import UI from "./i18n/ui.json";
import EN from "./i18n/en.json";
import DAILIES from "./dailies.json";
import FARMS from "./hardfarm.json";
import SCHED from "./ultra-schedule.json";
import NEWS from "./news.json";
import RELDATA from "./releases.json";
import {HUB} from "../config.js";

export {TYPES, RAW, FAMS, CALYR, OBTAIN, CONS, TEAMS, ITEMS, ENH, UI, EN, DAILIES, FARMS, SCHED, NEWS};
/* itens novos: uma entrada por atualização, a mais recente primeiro */
export const REL=RELDATA.list;

export const RAWBY=Object.fromEntries(RAW.map(r=>[r[0],r]));
export const D=RAW.map(r=>{const t=TYPES[r[5]];let o=r[7]||{};
  if(o.like){const L=RAWBY[o.like][7]||{};o=Object.assign({},L,o,{rot:o.rot||L.rot,skills:o.skills||L.skills,src:o.src||L.src})}
  const fam=(FAMS.find(f=>f.includes(r[0]))||[]).filter(n=>n!==r[0]);
  const isCal=fam.length>0||r[0] in CALYR;
  return{
  name:r[0],cat:isCal?"cal":r[1],store:r[1],farm:r[2],solo:r[3],ultra:r[4],type:r[5],note:r[6],nw:!!r[8],
  b:{farm:o.farm||t.farm,solo:o.solo||t.solo,ultra:o.ultra||t.ultra},awe:o.awe||t.awe,
  rot:o.rot||t.rot,generic:!o.rot,skills:o.skills||null,src:o.src?HUB+o.src:null,
  inherited:o.like&&o.rot?o.like:null,
  ob:OBTAIN[r[0]]||null,cons:CONS[r[0]]||null,
  cal:isCal,yr:CALYR[r[0]]||null,fam}});
export const byName=Object.fromEntries(D.map((c,i)=>[c.name,i]));
