// Teste da POC com uma charpage falsa (não acessa o site da Artix).
// Uso: node poc/painel/test.mjs   (precisa do Playwright, como o npm test do portal)
import {createServer} from "node:http";
import {spawn} from "node:child_process";
import {fileURLToPath} from "node:url";
import {chromium} from "playwright";
import {parseCharHtml, normalizeInventory} from "./charpage.mjs";

/* imita a charpage: rótulos e valores em texto, links do wiki, ccid num script e o inventário em JSON */
const HTML = `<html><head><title>AQW Character Page</title></head><body>
<div class="card-body"><h1>BGP</h1>
<label>Level:</label> 100<br><label>Class:</label> <a href="http://aqwwiki.wikidot.com/PaladinSlayer">PaladinSlayer</a><br>
<label>Weapon:</label> <a href="http://aqwwiki.wikidot.com/Vordred">Vordred's Sword</a><br>
<label>Armor:</label> <a href="#">Dracolich Kigurumi</a><br><label>Helm:</label> <a href="#">Dracolich Kigurumi Hooded Locks</a><br>
<label>Cape:</label> <a href="#">Toy Dracolich Tail</a><br><label>Pet:</label> <a href="#">Chaotic Flying Eye</a><br><label>Misc:</label> <a href="#"></a><br>
<label>Faction:</label> Evil<br><label>Guild:</label> <br></div>
<h2>Achievements</h2><div id="badges">Loading Achievement Badges...</div><h2>Inventory</h2><div id="inv">Loading Inventory...</div>
<script>var ccid = 98765432; $(function(){ loadInventory(ccid); });</script></body></html>`;
const INV = [{strName: "PaladinSlayer (2)", strType: "Class", intCount: 1, bCoins: 1}, {strName: "Legion Revenant", strType: "Class", intCount: 1, bCoins: 0},
  {strName: "Void Highlord", strType: "Class", intCount: 1, bCoins: 0}, {strName: "StoneCrusher", strType: "Class", intCount: 1, bCoins: 0}, {strName: "Lord of Order", strType: "Class", intCount: 1, bCoins: 0}, {strName: "Some Brand New Class", strType: "Class", intCount: 1, bCoins: 1},
  {strName: "Dracolich Kigurumi", strType: "Armor", intCount: 1, bCoins: 1}];

const results = []; const check = (c, m) => results.push([!!c, m]);
/* 1) leitura do HTML, sem rede */
const p = parseCharHtml(HTML);
check(p.level === 100 && p.cls === "PaladinSlayer" && p.faction === "Evil" && p.guild === "", "lê nível, classe, facção e guilda vazia");
check(p.equip.weapon === "Vordred's Sword" && p.equip.pet === "Chaotic Flying Eye" && !p.equip.misc, "lê o equipamento (Misc vazio fica de fora)");
check(p.ccid === "98765432", "acha o ccid");
check(normalizeInventory(INV).filter(i => i.type === "Class").length === 6, "normaliza o inventário");

/* 2) painel inteiro com charpage falsa */
const up = createServer((req, res) => {
  if (req.url.startsWith("/CharPage?id=BGP")) { res.writeHead(200, {"Content-Type": "text/html"}); return res.end(HTML); }
  if (req.url.startsWith("/CharPage/Inventory?ccid=98765432")) { res.writeHead(200, {"Content-Type": "application/json"}); return res.end(JSON.stringify(INV)); }
  if (req.url.startsWith("/CharPage?id=")) { res.writeHead(200, {"Content-Type": "text/html"}); return res.end("<html><body>Character not found</body></html>"); }
  res.writeHead(404); res.end();
}).listen(5190);
const srv = spawn(process.execPath, [fileURLToPath(new URL("./server.mjs", import.meta.url))], {env: {...process.env, PORT: "5181", AQW_BASE: "http://localhost:5190"}, stdio: "pipe"});
await new Promise(r => srv.stdout.once("data", r));
const browser = await chromium.launch(); const errors = [];
try {
  const pg = await (await browser.newContext({viewport: {width: 1200, height: 900}})).newPage();
  pg.on("pageerror", e => errors.push(e.message));
  await pg.goto("http://localhost:5181/poc/painel/"); await pg.waitForSelector("[data-link]");
  check(await pg.locator("#demo").isVisible(), "sem Firebase, avisa o modo demonstração");
  await pg.fill("[data-link] input", "BGP"); await pg.click("[data-link] button"); await pg.waitForSelector(".cname");
  check((await pg.locator(".cname").innerText()) === "BGP" && (await pg.locator(".cmeta").innerText()).includes("Nível 100"), "vincula o personagem");
  await pg.click('[data-tab="classes"]');
  const mine = await pg.$$eval(".item.on b", e => e.map(x => x.textContent));
  check(["PaladinSlayer", "Legion Revenant", "Void Highlord"].every(n => mine.includes(n)), "classes do inventário entram sozinhas (inclusive a cópia PaladinSlayer (2))");
  check((await pg.locator("#view").innerText()).includes("Some Brand New Class"), "classe fora do portal aparece avisada");
  await pg.click('[data-cf="faltam"]'); await pg.click('.item input[data-own="ArchPaladin"]');
  await pg.click('[data-cf="tenho"]');
  check(await pg.locator('.item.on input[data-own="ArchPaladin"]').count() === 1, "marcar uma classe à mão");
  await pg.click('[data-tab="ultras"]');
  check((await pg.locator("#view").innerText()).includes("Você monta"), "ultras: time completo com as classes que tem");
  await pg.click('[data-tab="diarias"]'); await pg.click('[data-dpick="moglin"]');
  check(await pg.evaluate(() => { const r = document.querySelector(".saveBar").getBoundingClientRect(); return r.bottom <= innerHeight && r.top > 0; }), "diárias: botão Salvar sempre visível na tela");
  await pg.click("[data-dsave]"); await pg.click('[data-dday="moglin"]');
  check((await pg.locator("#view .sub").innerText()).startsWith("1 de 1"), "diárias: escolher e marcar");
  await pg.click('[data-tab="farm"]'); await pg.click('[data-ff="todos"]');
  check(await pg.locator('.pill.ok:has-text("Você já tem a classe")').count() >= 1, "HardFarm: farm da classe que já tem conta como concluído");
  await pg.fill("[data-fq]", "chaos"); await pg.click(`[data-ftrack="Reputação Chaos"]`);
  await pg.click('[data-tab="resumo"]');
  check(await pg.locator('.trk b:has-text("Reputação Chaos")').count() === 1, "HardFarm: um clique em Acompanhar leva o farm para o Resumo");
  await pg.click('[data-tab="farm"]'); await pg.click('[data-ff="todos"]'); await pg.fill("[data-fq]", "dragon of time"); await pg.click(`[data-ftrack="Dragon of Time"]`); await pg.click('[data-tab="resumo"]');
  const lr = pg.locator('.trk:has(b:text-is("Dragon of Time"))');
  check((await lr.locator(".where").innerText()).includes("Lost Hieroglyphic") && await lr.locator(`.jn[data-j="mummies"]`).count() > 0, "HardFarm: etapa mostra onde conseguir cada item, com join");
  check((await lr.locator(".quest").innerText()).includes("Kro'nar") && await lr.locator('.quest .jn[data-j="timeinn"]').count() === 1, "HardFarm: etapa diz qual quest aceitar, de quem e onde");
  await lr.locator('.jn[data-j="timelibrary"]').first().click();
  check(await pg.locator("#toast.on").count() === 1 && !(await lr.locator(".nxt input").isChecked()), "clicar no join copia sem marcar a etapa");
  await pg.click('.trk:has(b:text-is("Reputação Chaos")) .nxt input');
  check((await pg.locator('.trk:has(b:text-is("Reputação Chaos")) .pill').first().innerText()).startsWith("1/"), "Resumo: marcar a próxima etapa ali mesmo");
  await pg.click('[data-tab="quests"]'); await pg.fill('[data-qadd] input[name="n"]', "Nulgath Larvae"); await pg.click("[data-qadd] button");
  check(await pg.locator('.item b:has-text("Nulgath Larvae")').count() === 1, "quests: adicionar");
  await pg.reload(); await pg.waitForSelector(".cname");
  check((await pg.locator('#tabs [data-tab="quests"] b').innerText()) === "1" && (await pg.locator('#tabs [data-tab="diarias"] b').innerText()) === "1/1", "tudo continua depois de recarregar");
  const r = await pg.evaluate(() => fetch("/api/char?name=NaoExiste").then(r => r.json()));
  check(!r.ok, "personagem inexistente (ou consulta rápida demais) devolve erro claro");
  const m = await (await browser.newContext({viewport: {width: 390, height: 844}})).newPage();
  await m.goto("http://localhost:5181/poc/painel/"); await m.waitForSelector("#panel:not([hidden])");
  check(await m.evaluate(() => document.documentElement.scrollWidth <= 390), "celular sem rolagem lateral");
} finally { await browser.close(); srv.kill(); up.close(); }
for (const [ok, msg] of results) console.log(`${ok ? "ok  " : "FALHOU"} ${msg}`);
if (errors.length) console.log("Erros na página:\n" + errors.join("\n"));
const fails = results.filter(r => !r[0]).length;
console.log(`\n${results.length - fails}/${results.length} passaram`);
process.exit(fails || errors.length ? 1 : 0);
