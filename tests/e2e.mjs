// Testes de ponta a ponta do portal: abre dist/index.html num Chromium e confere as funções principais.
// Uso: npm run build && npm test   (precisa do Playwright: npx playwright install chromium)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const URL0 = pathToFileURL(root + "dist/index.html").href;
const REL = JSON.parse(readFileSync(root + "src/data/releases.json", "utf8")).list;
const count = r => Object.values(r.items).reduce((n, v) => n + v.length, 0);
const typeCount = (r, t) => (r.items[t] || []).length;

const results = [];
const check = (cond, msg) => results.push([!!cond, msg]);
const browser = await chromium.launch();
const errors = [];
const wait = (p, ms = 150) => p.waitForTimeout(ms);
async function page(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, colorScheme: "dark", ...opts });
  const p = await ctx.newPage();
  p.on("pageerror", e => errors.push(e.message));
  await p.goto(URL0);
  await wait(p, 400);
  await p.evaluate(() => document.querySelectorAll(".toast").forEach(x => x.remove()));
  return p;
}
const hash = p => p.evaluate(() => location.hash);
const go = async (p, h) => { await p.evaluate(h => { location.hash = h; }, h); await wait(p); };

try {
  /* navegação: cada aba monta conteúdo quando aparece */
  {
    const p = await page();
    await p.click('#sideNav [data-sec="classes"]'); await wait(p);
    check((await hash(p)) === "#tier", "destino Classes abre a tier list");
    const sel = { inicio: "#modes .rank", tier: "#tiers .tc", todas: "#cards .card", comparar: "#cmpPick input", enh: "#enh .ec", ultras: "#teams .team",
      montador: "#pkGrid .pk", diarias: "#dList .dItem, #dList .dIntro", itens: "#farms .fcard", lancamentos: "#relList .ri", novidades: "#feed .post" };
    for (const [v, s] of Object.entries(sel)) { await go(p, v); check((await p.locator(s).count()) > 0, `aba ${v} monta conteúdo`); }
    await p.click('#sideNav [data-sec="classes"]'); await wait(p);
    await p.click('#sideNav [data-sub="enh"]'); await wait(p);
    await p.click('#sideNav [data-sec="farm"]'); await wait(p);
    await p.click('#sideNav [data-sec="classes"]'); await wait(p);
    check((await hash(p)) === "#enh", "destino lembra a última aba");
  }
  /* itens novos: totais batem com releases.json, filtros e busca */
  {
    const p = await page();
    await go(p, "lancamentos");
    check((await p.locator("#relList .ri").count()) === count(REL[0]), `itens da última atualização = ${count(REL[0])}`);
    await p.click('#segRelT button[data-v="weapon"]'); await wait(p);
    check((await p.locator("#relList .ri").count()) === typeCount(REL[0], "weapon"), "filtro de armas");
    if (REL[1]) { await p.click(`#segRel button[data-v="${REL[1].id}"]`); await wait(p);
      check((await p.locator("#relList .ri").count()) === count(REL[1]), "troca de semana"); }
    const name = REL[0].items[Object.keys(REL[0].items)[0]][0][0];
    await p.click("#gq"); await p.fill("#gq", name.slice(0, 8)); await wait(p);
    check((await p.locator("#gres [data-gitem]").count()) > 0, "busca global acha item novo");
    await p.fill("#gq", ""); await p.keyboard.press("Escape"); await wait(p);
    await p.click(`#segRel button[data-v="${REL[0].id}"]`); await wait(p);
    await p.click('#segRelT button[data-v="class"]'); await wait(p);
    const ps = p.locator('#relList .ri[data-ri="PaladinSlayer (2)"] .riCard');
    check(await ps.count() === 1, "item PaladinSlayer (2) tem botão Ver ficha");
    if (await ps.count()) { await ps.click(); await wait(p);
      check((await p.locator("#dName").innerText()).startsWith("PaladinSlayer"), "item de classe abre a ficha da classe (cópia ligada pelo nome)");
      await p.keyboard.press("Escape"); }
    await p.click('#segRelT button[data-v="all"]'); await wait(p);
    const href = await p.locator("#relList .ri a").first().getAttribute("href");
    check(/^https:\/\/aqwwiki\.wikidot\.com\/[a-z0-9-]+$/.test(href), "link direto para a página do wiki");
  }
  /* busca de classe: ignora espaço e o filtro de loja */
  {
    const p = await page();
    await go(p, "todas");
    await p.click('#segAll button[data-v="free"]'); await wait(p);
    await p.fill("#q", "paladin slayer"); await p.dispatchEvent("#q", "input"); await wait(p);
    check((await p.locator("#cards .card h4").allInnerTexts()).some(t => t.startsWith("PaladinSlayer")), "busca acha PaladinSlayer com espaço e outra loja selecionada");
    await p.click("#gq"); await p.fill("#gq", "paladin slayer"); await wait(p);
    check((await p.locator("#gres").innerText()).includes("PaladinSlayer"), "busca do topo acha PaladinSlayer");
    await p.fill("#gq", "tier list"); await wait(p);
    check(await p.locator('#gres [data-gpage="tier"]').count() === 1, "busca do topo oferece ir para a tier list");
    await p.fill("#gq", "minhas diarias"); await wait(p);
    await p.click('#gres [data-gpage="mydaily"]'); await wait(p);
    check((await hash(p)) === "#diarias" && (await p.locator('#segDaily button[data-v="mine"]').getAttribute("aria-pressed")) === "true", "ir para Minhas diárias pela busca");
  }
  /* enhancements: busca lista todas as classes e deixa escolher uma */
  {
    const p = await page();
    await go(p, "enh");
    await p.fill("#enq", "palad"); await p.dispatchEvent("#enq", "input"); await wait(p);
    check(await p.locator('[data-enqpick="PaladinSlayer"]').count() === 1, "enhancements: PaladinSlayer aparece na lista da busca");
    await p.click('[data-enqpick="PaladinSlayer"]'); await wait(p);
    const t = await p.locator("#enh .qcard .qh button").allInnerTexts();
    check(t.length === 1 && t[0] === "PaladinSlayer", "enhancements: tocar no nome mostra só a classe");
  }
  /* minha tier list: começa pela do portal, move, busca nas sem tier, volta */
  {
    const p = await page();
    await go(p, "tier");
    const portalS = await p.$$eval("#tiers .tier:first-child .tc span", e => e.map(x => x.textContent));
    await p.click('#segTsrc button[data-v="mine"]'); await wait(p);
    const names = r => p.$$eval(r === "N" ? "#poolList [data-tname]" : `#tiers [data-trow="${r}"] [data-tname]`, e => e.map(x => x.dataset.tname));
    check(JSON.stringify((await names("S")).slice(0, portalS.length)).length > 2, "minha tier list começa preenchida");
    check(await p.locator("#segCat").isHidden(), "filtro de loja some na minha tier list");
    await p.click("[data-tzero]"); await wait(p);
    check((await names("S")).length === 0 && (await names("N")).length > 100, "começar do zero manda tudo para Sem tier");
    await p.fill("#tierQ", "lord"); await wait(p);
    const hits = await names("N");
    check(hits.length > 0 && hits.every(n => n.toLowerCase().includes("lord")), "busca filtra só as sem tier");
    await p.click(`#poolList [data-tname="${hits[0]}"]`); await p.click('.tlTo[data-tto="A"]'); await wait(p);
    check((await names("A")).includes(hits[0]), "tocar e escolher o tier move a classe");
    /* compartilhar: link abre a mesma lista em outra pessoa; imagem baixa um PNG */
    await p.click("[data-tlink]"); await wait(p, 300);
    const link = await p.inputValue("#tlLinkIn");
    check(/[?&]tl=[zj][A-Za-z0-9_-]+#tier$/.test(link), "link da tier list gerado");
    const [dl] = await Promise.all([p.waitForEvent("download"), p.click("[data-timg]")]);
    check(/\.png$/.test(dl.suggestedFilename()), "imagem da tier list baixada");
    const o = await page(); await o.goto(link); await wait(o, 500);
    check((await o.locator('#segTsrc button[data-v="shared"]').getAttribute("aria-pressed")) === "true", "link abre a tier list compartilhada");
    check((await o.locator("#tiers .tier:nth-child(2) .tc span").allInnerTexts()).includes(hits[0]), "lista compartilhada tem a classe movida");
    await o.click("[data-tsave]"); await wait(o);
    check((await o.locator('#tiers [data-trow="A"] [data-tname]').evaluateAll(e => e.map(x => x.dataset.tname))).includes(hits[0]), "salvar como minha tier list");
    await p.click("[data-treset]"); await wait(p);
    check((await names("N")).length === 0, "voltar para a do portal");
  }
  /* diárias: minhas diárias, marcar, contagem na página Hoje */
  {
    const p = await page();
    await go(p, "diarias");
    check(await p.locator(".dIntro").isVisible(), "primeira visita: convite para escolher as diárias");
    await p.click(".dIntro [data-dpick]"); await wait(p);
    const ids = await p.$$eval("#pkList [data-pkid]", e => e.slice(0, 3).map(x => x.dataset.pkid));
    for (const id of ids) await p.click(`#pkList [data-pkid="${id}"]`);
    check((await p.locator("#pkSave").innerText()).includes("3"), "seletor conta as marcadas");
    await p.click("#pkSave"); await wait(p);
    check((await p.locator("#dList .dItem").count()) === 3, "aba Minhas mostra só as escolhidas");
    await p.click(`[data-dtoggle="${ids[0]}"]`); await wait(p);
    check((await p.locator("#dBar .dProg b").innerText()).startsWith("1 de 3"), "minhas diárias: só as escolhidas contam");
    await go(p, "inicio");
    check((await p.locator('.intent[data-goview="diarias"] small').innerText()).startsWith("1 de 3"), "página Hoje mostra o progresso");
  }
  /* neste mês: Event Hub na página Hoje e na aba Sazonais */
  {
    const p = await page();
    check((await p.locator('#homeWeek .mHub code.jn[data-j="eventhub"]').count()) === 1, "página Hoje mostra o Event Hub");
    await p.click("#homeWeek [data-gohub]"); await wait(p);
    check((await hash(p)) === "#diarias" && (await p.locator("#dList .mCard .mHub").count()) === 1, "Ver tudo em Sazonais abre o Event Hub");
    await p.click("#gq"); await p.fill("#gq", "event hub"); await wait(p);
    check(await p.locator('#gres [data-gpage="hub"]').count() === 1, "busca 'event hub' leva aos Sazonais");
  }
  /* hardfarm: progresso por etapa sobrevive ao recarregar */
  {
    const p = await page();
    await go(p, "itens");
    await p.click("#farm-0 [data-fstep]");
    await p.reload(); await wait(p, 400);
    check((await p.locator("#farm-0 .fchk[aria-checked=true]").count()) === 1, "progresso do HardFarm fica salvo");
    check((await p.locator("#farm-0 .fquest").first().innerText()).includes("Legion Fealty 1"), "HardFarm: etapa mostra a quest para aceitar");
    check((await p.locator("#farm-0 .fwhere").first().innerText()).includes("Aeacus Empowered"), "HardFarm: etapa mostra onde conseguir cada item");
  }
  /* idioma, cor dos olhos, celular sem rolagem lateral */
  {
    const p = await page();
    await p.click('#segLang button[data-v="en"]'); await wait(p, 250);
    check((await p.locator("#sideNav").innerText()).includes("What's new"), "troca para inglês");
    await p.click("#eyeBtn"); await p.click('#eyePanel [data-eye="sangue"]');
    check((await p.evaluate(() => document.documentElement.dataset.eye)) === "sangue", "cor dos olhos muda o tema");
    const m = await page({ viewport: { width: 390, height: 844 } });
    for (const v of ["inicio", "lancamentos", "tier", "diarias"]) {
      await go(m, v);
      check((await m.evaluate(() => document.documentElement.scrollWidth)) <= 390, `celular sem rolagem lateral em ${v}`);
    }
  }
} finally {
  await browser.close();
}

const fails = results.filter(r => !r[0]);
for (const [ok, msg] of results) console.log(`${ok ? "ok  " : "FALHOU"} ${msg}`);
if (errors.length) console.log("Erros de JavaScript na página:\n" + errors.join("\n"));
console.log(`\n${results.length - fails.length}/${results.length} passaram`);
process.exit(fails.length || errors.length ? 1 : 0);
