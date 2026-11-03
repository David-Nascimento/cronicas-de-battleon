// Lê a página pública do personagem do AQW (account.aq.com/CharPage?id=NOME) e devolve um resumo em JSON.
// Só lê o que já é público: não usa login nem senha. Funciona no Node 18+ e num Cloudflare Worker (usa fetch).
//
// O que a página tem:
//  - no HTML: nível, classe, facção, guilda e o equipamento (cada item é um link para o AQW Wiki);
//  - o inventário e as conquistas carregam depois, por JavaScript, a partir de um número interno do personagem (ccid).
// Como a Artix pode mudar a página, cada parte é lida de forma independente: se o inventário falhar,
// o resto continua e o motivo vai em `warnings`.

export const AQW_BASE = "https://account.aq.com";
const UA = "Mozilla/5.0 (compatible; CronicasDeBattleon-POC/0.1; leitura da charpage publica)";

const strip = s => s.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();

/* "Level: 100", "Class: PaladinSlayer"... aparecem como rótulo seguido do valor; procura no texto da página */
function field(text, label, stop) {
  const re = new RegExp(`\\b${label}\\b\\s*:?\\s*(.*?)\\s*(?=${stop.join("|")}|$)`, "i");
  const m = text.match(re);
  const v = m ? m[1].trim() : "";
  return v && !/^(none|empty)$/i.test(v) ? v : "";
}

export function parseCharHtml(html) {
  const warnings = [];
  if (/not found|does not exist|no character/i.test(strip(html)) && !/Level/i.test(html)) return {notFound: true, warnings};
  const text = strip(html);
  const LABELS = ["Level", "Class", "Weapon", "Armor", "Helm", "Cape", "Pet", "Misc", "Faction", "Guild", "Achievements", "Badges", "Inventory", "Loading"];
  const stop = l => LABELS.filter(x => x !== l).map(x => `\\b${x}\\b\\s*:?`);
  const out = {
    level: parseInt(field(text, "Level", stop("Level")), 10) || null,
    cls: field(text, "Class", stop("Class")),
    faction: field(text, "Faction", stop("Faction")),
    guild: field(text, "Guild", stop("Guild")),
    equip: {},
  };
  for (const slot of ["Weapon", "Armor", "Helm", "Cape", "Pet", "Misc"]) {
    const v = field(text, slot, stop(slot));
    if (v) out.equip[slot.toLowerCase()] = v;
  }
  /* ccid: número interno usado para carregar inventário e conquistas */
  const cc = html.match(/ccid\s*[=:]\s*["']?(\d{3,})/i) || html.match(/[?&]ccid=(\d{3,})/i) || html.match(/data-ccid=["'](\d{3,})/i);
  out.ccid = cc ? cc[1] : null;
  if (!out.ccid) warnings.push("Não achei o número interno do personagem (ccid) na página; o inventário não pode ser carregado.");
  if (!out.level && !out.cls) warnings.push("Não consegui ler nível e classe; a página pode ter mudado.");
  return {...out, warnings};
}

/* o inventário vem como uma lista de objetos; os nomes dos campos variam, então aceita os formatos conhecidos */
export function normalizeInventory(raw) {
  const arr = Array.isArray(raw) ? raw : Array.isArray(raw?.items) ? raw.items : Array.isArray(raw?.data) ? raw.data : [];
  return arr.map(o => ({
    name: String(o.strName ?? o.sName ?? o.name ?? o.Name ?? "").trim(),
    type: String(o.strType ?? o.sType ?? o.type ?? o.Type ?? "").trim(),
    qty: Number(o.intCount ?? o.iQty ?? o.quantity ?? o.qty ?? 1) || 1,
    ac: !!(o.bCoins === 1 || o.bCoins === "1" || o.bCoins === true || o.acTagged === true),
  })).filter(x => x.name);
}

export async function fetchChar(name, {base = AQW_BASE, fetchImpl = fetch} = {}) {
  const nm = String(name || "").trim();
  if (!/^[A-Za-z0-9 _-]{1,32}$/.test(nm)) return {ok: false, error: "Nome de personagem inválido."};
  const get = (path, accept) => fetchImpl(base + path, {headers: {"User-Agent": UA, "Accept": accept}});
  let res;
  try { res = await get(`/CharPage?id=${encodeURIComponent(nm)}`, "text/html"); }
  catch (e) { return {ok: false, error: "Não consegui abrir a página do personagem no site da Artix.", detail: String(e)}; }
  if (!res.ok) return {ok: false, error: `O site da Artix respondeu ${res.status} para a página do personagem.`};
  const html = await res.text();
  const info = parseCharHtml(html);
  if (info.notFound) return {ok: false, error: "Personagem não encontrado. Confira o nome."};
  const out = {ok: true, name: nm, url: `${base}/CharPage?id=${encodeURIComponent(nm)}`, fetchedAt: new Date().toISOString(), ...info, inventory: []};
  if (info.ccid) {
    try {
      const r = await get(`/CharPage/Inventory?ccid=${info.ccid}`, "application/json");
      if (r.ok) {
        const t = await r.text();
        try { out.inventory = normalizeInventory(JSON.parse(t)); }
        catch { out.warnings.push("O inventário veio num formato que eu não reconheço."); }
        if (!out.inventory.length) out.warnings.push("O inventário veio vazio (o personagem pode estar com o inventário oculto).");
      } else out.warnings.push(`O inventário respondeu ${r.status}.`);
    } catch (e) { out.warnings.push("Falha ao carregar o inventário: " + e); }
  }
  return out;
}
