import TYPES_ from "./class-types.json";
import RAW_ from "./classes.json";
import FAMS_ from "./calendar-families.json";
import CALYR_ from "./calendar-years.json";
import OBTAIN_ from "./obtain.json";
import CONS_ from "./consumables.json";
import TEAMS_ from "./ultra-teams.json";
import ITEMS_ from "./ultra-items.json";
import ENH_ from "./enhancements.json";
import UI_ from "./i18n/ui.json";
import EN_ from "./i18n/en.json";
import DAILIES_ from "./dailies.json";
import FARMS_ from "./hardfarm.json";
import SCHED_ from "./ultra-schedule.json";
import NEWS_ from "./news.json";
import RELDATA_ from "./releases.json";
import {HUB} from "../config.js";
import type {ClassExtra, ClassType, Daily, Farm, Klass, News, RawClass, Release, Team, UiStrings} from "../types.js";
const TYPES = TYPES_ as unknown as Record<string, ClassType>;
const RAW = RAW_ as unknown as RawClass[];
const FAMS = FAMS_ as unknown as string[][];
const CALYR = CALYR_ as unknown as Record<string, number>;
const OBTAIN = OBTAIN_ as unknown as Record<string, string[]>;
const CONS = CONS_ as unknown as Record<string, string>;
const TEAMS = TEAMS_ as unknown as Team[];
const ITEMS = ITEMS_ as unknown as [string, string][];
const ENH = ENH_ as unknown as [string, string, number, string, string][];
const UI = UI_ as unknown as UiStrings;
const EN = EN_ as unknown as Record<string, string>;
const DAILIES = DAILIES_ as unknown as Daily[];
const FARMS = FARMS_ as unknown as Farm[];
const SCHED = SCHED_ as unknown as Record<string, string | number>;
const NEWS = NEWS_ as unknown as News[];
const RELDATA = RELDATA_ as unknown as {updated: string; list: Release[]};

export {TYPES, RAW, FAMS, CALYR, OBTAIN, CONS, TEAMS, ITEMS, ENH, UI, EN, DAILIES, FARMS, SCHED, NEWS};
/* itens novos: uma entrada por atualização, a mais recente primeiro */
export const REL=RELDATA.list;

export const RAWBY:Record<string,RawClass>=Object.fromEntries(RAW.map(r=>[r[0],r]));
export const D:Klass[]=RAW.map(r=>{const t=TYPES[r[5]];let o:ClassExtra=r[7]||{};
  if(o.like){const L:ClassExtra=RAWBY[o.like][7]||{};o=Object.assign({},L,o,{rot:o.rot||L.rot,skills:o.skills||L.skills,src:o.src||L.src})}
  const fam=(FAMS.find(f=>f.includes(r[0]))||[]).filter(n=>n!==r[0]);
  const isCal=fam.length>0||r[0] in CALYR;
  return{
  name:r[0],cat:isCal?"cal":r[1],store:r[1],farm:r[2],solo:r[3],ultra:r[4],type:r[5],note:r[6],nw:!!r[8],
  b:{farm:o.farm||t.farm,solo:o.solo||t.solo,ultra:o.ultra||t.ultra},awe:o.awe||t.awe,
  rot:o.rot||t.rot,generic:!o.rot,skills:o.skills||null,src:o.src?HUB+o.src:null,
  inherited:o.like&&o.rot?o.like:null,
  ob:OBTAIN[r[0]]||null,cons:CONS[r[0]]||null,
  cal:isCal,yr:CALYR[r[0]]||null,fam}});
export const byName:Record<string,number>=Object.fromEntries(D.map((c,i)=>[c.name,i]));
