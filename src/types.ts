/* Tipos do portal: formato dos JSON em src/data/ e do estado salvo no navegador. */
export type Lang = "pt" | "en";
export type Tier = "S" | "A" | "B" | "C";
export type Mode = "farm" | "solo" | "ultra";
export type Txt = { pt: string; en: string };

/* classes.json: [nome, loja, farm, solo, ultra, tipo, nota, extras?, nova?] */
export interface ClassExtra {
  farm?: string; solo?: string; ultra?: string; awe?: string; like?: string;
  rot?: string[][]; skills?: string[]; src?: string;
}
export type RawClass = [string, string, Tier, Tier, Tier, string, string, ClassExtra?, (number | boolean)?];
export interface ClassType { n: string; farm: string; solo: string; ultra: string; awe: string; rot: string[][] }
export interface Klass {
  name: string; cat: string; store: string; farm: Tier; solo: Tier; ultra: Tier; type: string; note: string; nw: boolean;
  b: Record<Mode, string>; awe: string; rot: string[][]; generic: boolean; skills: string[] | null; src: string | null;
  inherited: string | null; ob: string[] | null; cons: string | null; cal: boolean; yr: number | null; fam: string[];
  fresh?: string; wk?: string; /* nome da página no wiki, quando difere */ /* classe nova vinda dos Itens novos, ainda sem análise: data da atualização */
}
export interface Daily {
  id: string; g: string; n: string; ne?: string; who?: Txt; req: Txt | null; rw: Txt; for?: Txt;
  mem?: "m" | "l"; hf?: string; src: string; sn: string; j?: string[];
}
export type Where = { i: string; o: Txt; j?: string };
export type StepQuest = { n: Txt; by?: string; j: string };
export interface FarmStep extends Txt { w?: Where[]; j?: string[]; q?: StepQuest[] }
export interface Farm { n: string; ne?: string; k: string; cls?: string; e?: number; src: string; sn: string; req: FarmStep[]; note: Txt; j?: string[] }
export interface News { d: string; approx?: number; ty: string; cls: string[]; src: string; pt: { t: string; x: string }; en: { t: string; x: string } }
export interface Team { n: string; map: string; tag: string; team: [string, string][]; tips: string[]; alt: string }
/* releases.json: item = [nome, marcas ("a" AC, "l" Legend), fonte (chave de srcs), subtipo de arma] */
export type RelItem = [string, string, string?, string?];
export interface Release {
  id: string; from: string; to: string; t: Txt; x: Txt; until?: string;
  maps: { j: string; n: string; w: Txt; v?: string }[];
  shops: string[]; srcs: Record<string, Txt & { j?: string }>; src: { n: string; u: string }[];
  items: Partial<Record<string, RelItem[]>>;
}
export type UiStrings = Record<Lang, Record<string, string>>;

/* estado salvo no navegador (localStorage "aqwTier") */
export interface State {
  cat: string; mode: string; all: string; lang: Lang; nf: string; bcat: string; eslot: string; fk: string;
  eye: string; subs: Record<string, string>; rt: string;
  sub?: string; rel?: string; relSeen?: string; newsSeen?: string; dis?: string[]; own?: string[]; cmp?: string[];
  dmine?: string[]; drem?: boolean; fprog?: Record<string, number[]>;
  tsrc?: string; mytier?: Record<string, Record<string, string[]>>;
  dly?: { k: string; done: string[] }; dhide?: string[]; dsh?: boolean; df?: string; dh?: number;
  [k: string]: unknown;
}
export interface Alert { id: string; ic: string; lvl: "now" | "soon"; t: string; x: string; go: { tab?: string; cls?: string; team?: number } }
export interface UiState {
  curView: string; feedSeen: string | null; ALERTS: Alert[]; curClass: number | null; eIdx: number | null; eCat: string; relQ?: string;
}
