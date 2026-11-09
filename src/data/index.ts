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
import ALIAS_ from "./class-aliases.json";
import DROPS_ from "./drops.json";
import {HUB} from "../config.js";
import type {ClassExtra, ClassType, Daily, DropData, Farm, Klass, News, RawClass, Release, Team, UiStrings} from "../types.js";
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
/* drops de 0 AC (aba Farm > Drops 0 AC) */
export const DROPDATA=DROPS_ as unknown as DropData;

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
/* classes que saíram nos Itens novos: liga o item à classe do portal (pelo nome, ou por class-aliases.json para cópias
   como "PaladinSlayer (2)"). A que não existe no portal entra sozinha como "Nova, ainda sem tier", até alguém analisar. */
const ALIAS=ALIAS_ as unknown as Record<string,string>;
const ckey=(n:string)=>n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]/g,"");
const baseName=(n:string)=>{let b=n,p;do{p=b;b=b.replace(/\s*\((class|\d+|0 ac|ac|non-ac|legend|non-legend|rare|special)\)\s*$/i,"")}while(b!==p);return b.trim()};
const byKey:Record<string,string>=Object.fromEntries(RAW.map(r=>[ckey(r[0]),r[0]]));
export function relClass(item:string):string|null{
  if(ALIAS[item]&&byKey[ckey(ALIAS[item])])return byKey[ckey(ALIAS[item])];
  return byKey[ckey(baseName(item))]||null}
const fresh=new Map<string,string>();
const freshWk=new Map<string,string>();
[...REL].reverse().forEach(r=>(r.items.class||[]).forEach(it=>{if(!relClass(it[0])){const n=baseName(it[0]);if(!fresh.has(n)){fresh.set(n,r.from);freshWk.set(n,it[0])}}}));
fresh.forEach((from,n)=>{const t=TYPES.new;D.push({name:n,cat:"nova",store:"nova",farm:"N" as any,solo:"N" as any,ultra:"N" as any,type:"new",
  note:"Classe nova, ainda sem tier. Saiu na atualização de {d}.".replace("{d}",from.split("-").reverse().slice(0,2).join("/")),nw:true,
  b:{farm:t.farm,solo:t.solo,ultra:t.ultra},awe:t.awe,rot:t.rot,generic:true,skills:null,src:null,inherited:null,ob:null,cons:null,cal:false,yr:null,fam:[],fresh:from,wk:freshWk.get(n)} as Klass)});
export const byName:Record<string,number>=Object.fromEntries(D.map((c,i)=>[c.name,i]));
/* volta a ligar os itens às classes já com as novas incluídas */
/* drops 0 AC: acha de onde cai um item pelo nome (sem "(0 AC)" etc.); null se não estiver em drops.json */
const dropBy=new Map(DROPDATA.items.map(i=>[ckey(baseName(i.n)),i]));
export const dropFor=(item:string)=>dropBy.get(ckey(baseName(item)))||null;
export const dropJoin=(item:string)=>dropFor(item)?.loc.find(l=>l.j)?.j||null;
export const relClassAny=(item:string)=>relClass(item)||(byName[baseName(item)]!=null?baseName(item):null);
