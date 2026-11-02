import {CATS, GLYPH} from "../config.js";
import {D} from "../data/index.js";

export const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* link direto da página no AQW Wiki (a busca do wiki está fora do ar): o Wikidot monta o endereço
   com o nome em minúsculas, trocando tudo que não é letra ou número por hífen ("Artix's Armor (0 AC)" → artix-s-armor-0-ac) */
export const wikiSlug=n=>n.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"");
export const wiki=n=>"https://aqwwiki.wikidot.com/"+wikiSlug(n);
export const initials=n=>n.replace(/'s\b/g,"").split(/\s+/).filter(w=>!/^(of|no|the)$/i.test(w)).map(w=>w[0]).join("").slice(0,3).toUpperCase();
export function sigil(c,sz){
  const col=`var(${CATS[c.cat].c})`,ini=initials(c.name);
  return `<svg class="sig ${sz||""}" viewBox="0 0 48 48" aria-hidden="true">
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="var(--bg2)"/>
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="${col}" opacity=".14"/>
  <path d="${GLYPH[c.type]}" fill="${col}" opacity=".22"/>
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="none" stroke="${col}" stroke-width="2"/>
  <path d="M24 7 L39.5 15.8 L39.5 32.2 L24 41 L8.5 32.2 L8.5 15.8 Z" fill="none" stroke="${col}" stroke-width=".8" opacity=".55"/>
  <text x="24" y="28.6" text-anchor="middle" font-family="Barlow,system-ui,sans-serif" font-weight="700" font-size="${ini.length>2?11:14}" fill="var(--ink)">${ini}</text></svg>`;
}
export const tColor=t=>`var(--t${t})`;
export const score=t=>({S:4,A:3,B:2,C:1}[t]||0);
export const total=c=>score(c.farm)+score(c.solo)+score(c.ultra);
export const idx=c=>D.indexOf(c);
export const nrm=x=>x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
