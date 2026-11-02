# Crônicas de Battleon

Guia de AdventureQuest Worlds: classes, tier list, ultras, enhancements, HardFarm e novidades.
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
  views/              uma por aba: home, tiers, classes, comparar, ultras, montador, enhancements, hardfarm, diárias
  features/           novidades, alertas e notificações, avisos na tela, busca global
  styles/             CSS dividido por área; main.css define a ordem (a ordem importa)
tools/build.mjs       build com esbuild
```

## Atualizar conteúdo

Edite os arquivos em `src/data/` e rode `npm run build`. Exemplos:
`hardfarm.json` (cards de HardFarm), `dailies.json` (aba Diárias), `news.json` (novidades), `classes.json` (tiers), `ultra-schedule.json`.

## Antes desta versão

`legacy/` guarda a versão anterior (index.html + css/style.css + js/app.js), caso precise comparar.
