# Crônicas de Battleon

Guia de AdventureQuest Worlds: classes, tier list, ultras, enhancements, HardFarm, diárias e os itens novos de cada atualização.
Projeto não oficial; AdventureQuest Worlds e as marcas relacionadas pertencem à Artix Entertainment, LLC.

## Como usar

- **Só abrir:** `dist/index.html` já está compilado. Dois cliques e funciona, sem servidor.
- **Mexer no código:** instale uma vez com `npm install`, depois:
  - `npm run dev`: recompila ao salvar e serve em http://localhost:5173
  - `npm run build`: gera `dist/` otimizado

## Onde fica cada coisa

```
index.html            estrutura da página (menus, seções, diálogos)
src/
  main.js             ponto de entrada: carrega tudo e inicia a página
  config.js           categorias, modos, rotas e ícones fixos
  state.js            estado salvo no navegador, idioma (L, T) e estado da interface (ui)
  render-all.js       redesenha a página inteira (usado ao trocar de idioma)
  events.js           cliques globais (abrir ficha, comparar, navegação...)
  data/               conteúdo em JSON: classes, ultras, enhancements, HardFarm, novidades
    i18n/             textos da interface (ui.json) e traduções (en.json)
    index.js          junta os JSON e monta a lista final de classes
  lib/util.js         funções pequenas (escape de HTML, busca sem acento, brasão da classe)
  components/shared.js  pedaços de interface reutilizados
  views/              uma por aba: home, tiers, classes, comparar, ultras, montador, enhancements, hardfarm, diárias, itens novos (releases.js)
  features/           novidades, alertas e notificações, avisos na tela, busca global, cor dos olhos (eye.js)
  styles/             CSS dividido por área; main.css define a ordem (a ordem importa)
tools/build.mjs       build com esbuild
```

## Navegação e tema

- **5 destinos** (config.js, `SECS`/`SUBS`/`SEC`): Hoje, Classes (tier list, todas, comparar, enhancements), Ultras (agenda e times, montador), Farm (diárias, HardFarm) e Novidades (itens novos, notícias de classes). No computador as abas aparecem embaixo do destino aberto; no celular, numa fileira no topo. Cada destino lembra a última aba usada.
- **Busca única** no topo: acha classes, itens novos, diárias e cards de HardFarm.
- **Tema Hollowborn** (styles/tokens.css): fundo violeta escuro, texto cor de osso e um brilho que segue a "cor dos olhos" escolhida no botão de olho (Espectral, Vazio, Sangue, Brasa, Osso). Todos os tons que brilham saem de `--eye`.

## Atualizar conteúdo

Edite os arquivos em `src/data/` e rode `npm run build`. Exemplos:
`hardfarm.json` (cards de HardFarm), `dailies.json` (aba Diárias), `news.json` (notícias de classes), `releases.json` (itens novos), `classes.json` (tiers), `ultra-schedule.json`.

### Itens novos (`releases.json`)

Uma entrada por atualização, a mais recente primeiro (`list[0]`). Campos: `id` e `from`/`to` (datas AAAA-MM-DD), `t` e `x` (título e resumo em pt/en), `until` (fim do evento, opcional), `maps` (`j` = join conferido, `n` = nome, `w` = o que tem lá), `shops`, `srcs` (de onde saem os itens: chave → texto pt/en e `j` opcional), `src` (links das fontes) e `items` por tipo (`class`, `armor`, `helm`, `cape`, `weapon`, `pet`, `ground`, `house`, `misc`). Cada item é `[nome, marcas, fonte?, subtipo?]`: marcas `a` (tag de AC) e/ou `l` (Legend); fonte é uma chave de `srcs`; subtipo só para armas (`dagger`, `sword`, `polearm`...).
Fonte principal: [AQW Wiki: New Releases](https://aqwwiki.wikidot.com/new-releases) (semana atual) e [Last Week](https://aqwwiki.wikidot.com/last-week); onde cada item sai vem das Design Notes. Guarde as 4 atualizações mais recentes.

## Antes desta versão

`legacy/` guarda a versão anterior (index.html + css/style.css + js/app.js), caso precise comparar.
