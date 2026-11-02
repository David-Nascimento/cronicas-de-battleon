# Crônicas de Battleon

Guia de AdventureQuest Worlds feito por fãs, em português e inglês: qual classe usar, o que farmar hoje, como montar time de ultra e o que entrou no jogo em cada atualização.

Versão atual: **2.2.0**. Projeto não oficial; AdventureQuest Worlds e as marcas relacionadas pertencem à Artix Entertainment, LLC.

![Página Hoje](docs/screenshots/hoje.png)

## O que tem no portal

O portal tem 5 destinos, e cada um guarda suas abas: **Hoje**, **Classes**, **Ultras**, **Farm** e **Novidades**. A busca do topo acha classes, itens novos, diárias e cards de HardFarm de qualquer lugar (atalho: tecla `/`).

### Hoje

Quatro atalhos pelo que a pessoa quer fazer (qual classe usar, o que saiu de novo, diárias de hoje, ultras da semana), o resumo da última atualização com os joins do evento, o reset semanal, as notícias de classes e o top 5 de cada modo.

### Itens novos

Tudo que entrou no jogo em cada atualização, com filtro por tipo, busca, marcas de AC e Legend, de onde sai cada item (quando a fonte diz), os mapas com `/join` para copiar e as lojas novas. Cada nome abre a página do item no AQW Wiki. Quando sai uma atualização, o sino, o banner da página Hoje e o menu avisam.

![Itens novos](docs/screenshots/itens-novos.png)

![Lista de itens por tipo](docs/screenshots/itens-novos-lista.png)

### Tier list e Minha tier list

A tier list do portal separa por loja (Free, Member, ACS, HeroMart, Calendário) e por modo (Geral, Farm, Solo, Ultras). Em **Minha tier list**, cada pessoa monta a sua com todas as classes juntas, a partir da do portal: arraste a classe para um tier, ou toque nela e escolha S, A, B, C ou Sem tier. As classes ainda sem tier ficam embaixo, com uma busca só para elas. Fica salva no navegador, uma por modo, e dá para voltar à do portal, começar do zero ou copiar como texto.

![Tier list do portal](docs/screenshots/tier-list.png)

![Minha tier list, com uma classe escolhida para mover](docs/screenshots/minha-tier-list.png)

### Diárias

107 quests diárias conferidas no AQW Wiki, cada uma com o `/join` (quando confirmado), quem dá a quest, o que é preciso, a recompensa e para que serve. Grupos: início, meio e fim do jogo, HardFarm, chefes (incluindo os 6 Daily Exercises da Legion), reputação, sazonais e antigas. Marque o que já fez; as marcações voltam do zero na virada do dia, no horário que você escolher. Toque em **★ Minhas** nas diárias que você faz: a contagem passa a ser só delas ("3 de 12"), com uma aba própria. Dá para ligar um lembrete 1 hora antes da virada, que aparece enquanto o portal está aberto. As que você não faz podem ser ocultadas.

![Diárias](docs/screenshots/diarias.png)

Na aba **Sazonais** aparece o evento que está no ar, com a data de fim e os mapas. O card some sozinho quando o evento acaba.

![Evento sazonal no ar](docs/screenshots/evento-sazonal.png)

### HardFarm

99 farms longos (classes, armas e armaduras, materiais, reputação, diárias e sazonais), com o esforço estimado, onde começar (`/join`), o que é preciso em cada etapa e a fonte. Marque as etapas que já concluiu: a barra mostra o progresso, fica salva no navegador e o filtro **Em andamento** junta os farms que você começou.

![HardFarm](docs/screenshots/hardfarm.png)

### Ficha de classe

Cada classe abre uma ficha com como obter, consumíveis, as melhores combinações de enhancement, sequências de skills e, na seção **No portal**, o farm dela no HardFarm, as diárias que ajudam, as notícias e a atualização em que saiu.

### Ultras

Agenda de ultras (semanais, sazonais e outras), times de 4 classes com a função de cada uma e o que fazer na luta, itens de dano e consumíveis, e o montador de time a partir das classes que você tem.

![Ultras](docs/screenshots/ultras.png)

### Visual Hollowborn, tema claro e celular

O visual segue o tema Hollowborn do AQW: fundo violeta escuro, texto cor de osso e um brilho que segue a **cor dos olhos** escolhida no botão de olho do topo (Espectral, Vazio, Sangue, Brasa ou Osso), como o equipamento Hollowborn. O ícone da aba muda junto. O tema claro acompanha o sistema, e no celular o menu vai para baixo.

| Cor dos olhos "Vazio" | Tema claro |
|---|---|
| ![Cor dos olhos Vazio](docs/screenshots/cor-dos-olhos.png) | ![Tema claro](docs/screenshots/tema-claro.png) |

| Celular: Hoje | Celular: Diárias |
|---|---|
| ![Celular, página Hoje](docs/screenshots/celular-hoje.png) | ![Celular, Diárias](docs/screenshots/celular-diarias.png) |

As capturas foram feitas num ambiente sem acesso ao Google Fonts; no navegador os títulos aparecem na fonte Texturina.

## Como usar

- **Só abrir:** `dist/index.html` já está compilado. Dois cliques e funciona, sem servidor.
- **Mexer no código:** instale uma vez com `npm install`, depois:
  - `npm run dev`: recompila ao salvar e serve em http://localhost:5173
  - `npm run build`: gera `dist/` otimizado
  - `npm run typecheck`: confere os tipos com o TypeScript (`tsc`)
  - `npm test`: abre o portal num Chromium e confere navegação, itens novos, tier list, diárias, HardFarm, idioma e celular (precisa de `npx playwright install chromium` uma vez). O GitHub roda build, tipos e testes a cada mudança na `main` (`.github/workflows/ci.yml`).

### App instalável e offline

`public/` tem o `manifest.webmanifest` e os ícones; o build copia tudo para `dist/` e gera `dist/sw.js` a partir de `tools/sw.template.js`, com a versão tirada do hash do build. Servido por http(s) (GitHub Pages, `npm run dev`), o navegador oferece "Instalar app" e o portal abre sem internet com a última versão vista. Abrindo `dist/index.html` direto do disco, o service worker não liga (limite do navegador), mas o resto funciona.

## Onde fica cada coisa

```
index.html            estrutura da página (menus, seções, diálogos)
src/                  TypeScript; tipos dos dados e do estado em types.ts
  main.ts             ponto de entrada: carrega tudo e inicia a página
  config.ts           categorias, modos, destinos e abas (SECS, SUBS, SEC), ícones, cores dos olhos
  state.ts            estado salvo no navegador, idioma (L, T) e estado da interface (ui)
  render-all.ts       monta cada aba só quando ela aparece; redesenha ao trocar de idioma
  events.ts           cliques globais (abrir ficha, comparar, navegação...)
  data/               conteúdo em JSON (veja "Atualizar conteúdo")
    i18n/             textos da interface (ui.json) e traduções (en.json)
    index.ts          junta os JSON e monta a lista final de classes
  lib/util.ts         funções pequenas (escape de HTML, busca sem acento, brasão da classe, link do wiki)
  components/         pedaços de interface reutilizados
  views/              uma por aba: home, tiers (e Minha tier list), cards, compare, agenda, teams, builder,
                      enhancements, farms (HardFarm), dailies, releases (itens novos), nav
  features/           notícias, alertas e notificações, avisos na tela, busca global, cor dos olhos
  styles/             CSS por área; tokens.css tem as cores e main.css define a ordem (a ordem importa)
public/               manifest e ícones do app instalável
tools/                build com esbuild e o modelo do service worker
docs/screenshots/     as capturas deste README
legacy/               a versão anterior (index.html + css + js), para comparar
```

## Atualizar conteúdo

Edite os arquivos em `src/data/` e rode `npm run build`:

| Arquivo | Onde aparece |
|---|---|
| `releases.json` | Itens novos, card da última atualização e evento sazonal nas Diárias |
| `dailies.json` | Diárias |
| `hardfarm.json` | HardFarm |
| `news.json` | Notícias de classes e o sino |
| `classes.json`, `class-types.json`, `obtain.json` | Tier list, fichas das classes |
| `ultra-teams.json`, `ultra-schedule.json`, `ultra-items.json` | Ultras |
| `enhancements.json` | Enhancements |

### Atualização automática

Uma tarefa agendada roda todo **sábado e segunda às 8h53** (horário de Fortaleza) na branch `main`. Ela confere o AQW Wiki e as Design Notes, completa `releases.json`, `news.json` e `dailies.json`, gera o build, testa o site num navegador e só faz commit se algo mudou.

### Formato de `releases.json`

Uma entrada por atualização, a mais recente primeiro (`list[0]`). Campos: `id` e `from`/`to` (datas AAAA-MM-DD), `t` e `x` (título e resumo em pt/en; o que vem antes de ":" no título vira o nome do evento), `until` (fim do evento, opcional), `maps` (`j` = join conferido, `n` = nome, `w` = o que tem lá), `shops`, `srcs` (de onde saem os itens: chave → texto pt/en e `j` opcional), `src` (links das fontes) e `items` por tipo (`class`, `armor`, `helm`, `cape`, `weapon`, `pet`, `ground`, `house`, `misc`). Cada item é `[nome, marcas, fonte?, subtipo?]`: marcas `a` (tag de AC) e/ou `l` (Legend); fonte é uma chave de `srcs`; subtipo só para armas (`dagger`, `sword`, `polearm`...). Guarde as 4 atualizações mais recentes.

### Formato de `dailies.json`

Cada diária: `id`, `g` (grupo: `start`, `mid`, `end`, `hf`, `boss`, `rep`, `season`, `old`), `n` (nome; `ne` para o nome em inglês, se mudar), `who` (quem dá e onde), `req`, `rw` e `for` (pt/en), `j` (joins conferidos), `mem` (`m` member, `l` Legend), `hf` (nome do card de HardFarm ligado) e `src`/`sn` (fonte). Os grupos `rep`, `season` e `old` não entram na contagem do dia.

## Fontes

O conteúdo vem do [AQW Wiki](https://aqwwiki.wikidot.com/), das [Design Notes](https://www.aq.com/gamedesignnotes/) oficiais, do [AQWG](https://sites.google.com/view/aqwg-net/) e do [AQWHub](https://www.aqwhub.com/). Joins que não deu para confirmar aparecem marcados como não confirmados.
