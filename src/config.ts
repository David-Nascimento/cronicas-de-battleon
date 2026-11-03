/* configurações fixas: categorias, modos, rotas e ícones */
export const CATS={free:{n:"Free",c:"--free"},member:{n:"Member",c:"--member"},acs:{n:"ACS",c:"--acs"},hero:{n:"HeroMart",c:"--hero"},cal:{n:"Calendário",c:"--cal"},nova:{n:"Novas",c:"--glow"}};
export const STORE={hero:"código do calendário, HeroMart ou HeroPoints",acs:"versão por AC"};
export const MODES={farm:"Farm",solo:"Solo",ultra:"Ultras"};
export const TIERS=["S","A","B","C"];
export const HUB="https://www.aqwhub.com/class-usage-guides/";
export const GLYPH={new:"M24 10 L26.5 21.5 L38 24 L26.5 26.5 L24 38 L21.5 26.5 L10 24 L21.5 21.5 Z",phys:"M24 9 L27 26 L24 30 L21 26 Z",mag:"M24 9 L27 19 L37 19 L29 25 L32 35 L24 29 L16 35 L19 25 L11 19 L21 19 Z",mana:"M24 9 C30 17 33 22 33 27 A9 9 0 0 1 15 27 C15 22 18 17 24 9 Z",
  sup:"M21 11 H27 V20 H36 V26 H27 V35 H21 V26 H12 V20 H21 Z",dodge:"M12 30 C18 14 30 14 36 20 C28 18 22 22 18 32 Z",chrono:"M16 11 H32 L25 23 L32 35 H16 L23 23 Z"};
export const ICO={inicio:"M12 3 L2.5 11.2 H5 V20 H10.2 V14 H13.8 V20 H19 V11.2 H21.5 Z",
  classes:"M12 2.5 L20 5.6 V12 C20 16.6 16.6 20 12 21.5 C7.4 20 4 16.6 4 12 V5.6 Z",
  ultras:"M12 2 C12.8 6.2 18.2 8.4 18.2 14.2 A6.2 6.2 0 0 1 5.8 14.2 C5.8 11.4 7.4 10 8 7.6 C9.8 8.6 10.8 9.6 11 11.6 C12.2 8.8 12.4 5.2 12 2 Z",
  enh:"M6.5 3 H17.5 L22 9.2 L12 21.5 L2 9.2 Z",
  itens:"M6 2 H18 V6 C18 9 15.5 10.6 14 12 C15.5 13.4 18 15 18 18 V22 H6 V18 C6 15 8.5 13.4 10 12 C8.5 10.6 6 9 6 6 Z",
  diarias:"M7 2 H9 V4 H15 V2 H17 V4 H20 V22 H4 V4 H7 Z M6 10 V20 H18 V10 Z M10.6 17.4 L7.8 14.6 L9.2 13.2 L10.6 14.6 L14.8 10.4 L16.2 11.8 Z",
  novidades:"M12 2 L14.6 8.9 L22 9.4 L16.3 14.2 L18.2 21.5 L12 17.5 L5.8 21.5 L7.7 14.2 L2 9.4 L9.4 8.9 Z",
  farm:"M6 2 H18 V6 C18 9 15.5 10.6 14 12 C15.5 13.4 18 15 18 18 V22 H6 V18 C6 15 8.5 13.4 10 12 C8.5 10.6 6 9 6 6 Z",
  eye:"M12 5C6.5 5 2.7 9.2 1.5 12c1.2 2.8 5 7 10.5 7s9.3-4.2 10.5-7C21.3 9.2 17.5 5 12 5zm0 2.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 2.6a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z"};
export const SECS=[["inicio","sec_inicio"],["classes","sec_classes"],["ultras","sec_ultras"],["farm","sec_farm"],["novidades","sec_news"]];
export const SUBS={classes:[["tier","tab_tier"],["todas","tab_all"],["comparar","tab_cmp"],["enh","sec_enh"]],ultras:[["ultras","sub_teams"],["montador","tab_builder"]],farm:[["diarias","sec_daily"],["itens","sec_items"]],novidades:[["lancamentos","tab_releases"],["novidades","tab_news"]]};
export const SEC={inicio:["inicio"],classes:["tier","todas","comparar","enh"],ultras:["ultras","montador"],farm:["diarias","itens"],novidades:["lancamentos","novidades"]};
/* cor dos olhos (como o equipamento Hollowborn): chave → cor de base */
export const EYES=[["espectral","#5FE0CF"],["vazio","#B898FF"],["sangue","#FF6B7E"],["brasa","#FFB45A"],["osso","#E6DDC6"]];
/* tipos de item da aba Itens novos, na ordem em que aparecem */
export const RTYPES=["class","armor","helm","cape","weapon","pet","ground","house","misc"];
export const RICO={class:"M12 2.5 L20 5.6 V12 C20 16.6 16.6 20 12 21.5 C7.4 20 4 16.6 4 12 V5.6 Z",
  armor:"M8 3 L12 5 L16 3 L21 6.5 L18.6 11 L17 10.2 V21 H7 V10.2 L5.4 11 L3 6.5 Z",
  helm:"M12 3C7.6 3 4 6.6 4 11v8l4-2v-4h8v4l4 2v-8c0-4.4-3.6-8-8-8zM8 9.4h8V11H8z",
  cape:"M6 3 H18 L21 20 C18 21.5 15 19 12 21 C9 19 6 21.5 3 20 Z",
  weapon:"M19.5 2.5 L21.5 4.5 L11 15 L13 17 L11.5 18.5 L9.6 16.6 L6 20.2 L3.8 18 L7.4 14.4 L5.5 12.5 L7 11 L9 13 Z",
  pet:"M12 12c-3 0-6 3.5-6 6 0 1.7 1.4 2.5 3 2.5 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.6 0 3-.8 3-2.5 0-2.5-3-6-6-6zM6.5 11a2 2.5 0 1 0 0-5 2 2.5 0 0 0 0 5zm11 0a2 2.5 0 1 0 0-5 2 2.5 0 0 0 0 5zM9.5 7.5a2 2.5 0 1 0 0-5 2 2.5 0 0 0 0 5zm5 0a2 2.5 0 1 0 0-5 2 2.5 0 0 0 0 5z",
  ground:"M12 14c5 0 9 1.8 9 4s-4 4-9 4-9-1.8-9-4 4-4 9-4zm0 2c-3.9 0-7 .9-7 2s3.1 2 7 2 7-.9 7-2-3.1-2-7-2zM12 2.5l2 4.6 5 .5-3.8 3.2 1.2 4.9L12 13l-4.4 2.7 1.2-4.9L5 7.6l5-.5z",
  house:"M12 3 L2.5 11.2 H5 V20 H10.2 V14 H13.8 V20 H19 V11.2 H21.5 Z",
  misc:"M9 3h6l-1.5 3h-3zM7 7h10c2.5 2.5 4 5.5 4 8.5C21 19 18 21 12 21S3 19 3 15.5C3 12.5 4.5 9.5 7 7z"};
export const DN="https://www.aq.com/gamedesignnotes/";
export const TYIC={new:"✦",rework:"⚒",balance:"⚖",skin:"✧",event:"⏳"};
