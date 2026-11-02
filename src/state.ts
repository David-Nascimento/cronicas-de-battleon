import {EN, UI} from "./data/index.js";
import type {State, UiState} from "./types.js";

/* estado de interface que muda ao longo do uso (antes: variáveis soltas) */
export const ui:UiState={curView:"inicio",feedSeen:null,ALERTS:[],curClass:null,eIdx:null,eCat:"all"};

export const st:State={cat:"free",mode:"geral",all:"todas",lang:"pt",nf:"all",bcat:"all",eslot:"all",fk:"all",eye:"espectral",subs:{},rt:"all"};
try{Object.assign(st,JSON.parse(localStorage.getItem("aqwTier")||"{}"))}catch(e){}
if(st.lang!=="pt"&&st.lang!=="en")st.lang="pt";
export const save=()=>{try{localStorage.setItem("aqwTier",JSON.stringify(st))}catch(e){}};
export const L=(k:string,v?:Record<string,string|number>)=>{let s=(UI[st.lang]||UI.pt)[k]||UI.pt[k]||k;if(v)for(const x in v)s=s.replace("{"+x+"}",String(v[x]));return s};
export const T=(s:string)=>s==null?s:(st.lang==="en"&&EN[s]!==undefined?EN[s]:s);
export const loc=()=>st.lang==="en"?"en-US":"pt-BR";
