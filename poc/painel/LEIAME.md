# Meu painel (POC)

Prova de conceito de uma área do usuário para o Crônicas de Battleon. Fica separada do portal (pasta `poc/painel`, ramo `poc/painel`) e não muda nada nele.

A ideia: a pessoa entra, vincula o personagem do AQW pelo nome e acompanha num lugar só o que tem e o que está fazendo.

| Parte | De onde vem |
|---|---|
| Personagem (nível, classe, facção, guilda, equipamento) | Página pública do personagem, `account.aq.com/CharPage?id=NOME` |
| Classes que tem | Inventário público do personagem; as que faltarem a pessoa marca |
| Diárias | A pessoa escolhe as que faz e marca todo dia (voltam do zero à meia-noite) |
| HardFarm | A pessoa marca as etapas; farm de classe que ela já tem conta como concluído |
| Ultras | Os times do portal, mostrando quais ela já monta com as classes que tem |
| Quests | Anotadas pela pessoa (o jogo não mostra quests fora dele) |

Não pedimos senha do AQW em momento nenhum: só o nome do personagem, e só lemos o que qualquer pessoa vê na charpage.

## Rodar no computador

Precisa do Node 18 ou mais novo (o mesmo do `npm run dev`).

- **Windows:** dois cliques em `poc\painel\abrir-painel.bat`.
- **Terminal:** `node poc/painel/server.mjs` e abra http://localhost:5180/poc/painel/

Sem Firebase configurado, a tela de login funciona em **demonstração** (veja abaixo) e os dados ficam só naquele navegador.

Se a leitura do personagem falhar (a Artix pode mudar a página), rode com `DEBUG=1` (no Windows: `set DEBUG=1` antes) e o servidor salva o que leu em `poc/painel/debug/`, para eu ajustar a leitura.

## Tela de login

Quem não entrou vê a tela de login: **Entrar com Google**, **e-mail e senha** (com "Criar conta" e "Esqueci minha senha") e **Continuar sem conta**, que guarda tudo só naquele aparelho. Quem começa sem conta e cria a conta depois leva junto o que já tinha feito.

Sem o Firebase configurado, a tela funciona em **demonstração**: os botões simulam o login (o Google entra direto, e-mail e senha só conferem o formato) e nada sai do navegador. Serve para ver e testar o visual e o caminho.

## Tudo gratuito, até a hospedagem

| Parte | Serviço | Custo |
|---|---|---|
| Site (portal e painel) | GitHub Pages (ramo `gh-pages`), ou Cloudflare Pages, ou Firebase Hosting | Grátis |
| Login (Google e e-mail) | Firebase Authentication, plano Spark | Grátis |
| Dados de cada pessoa | Cloud Firestore, plano Spark: 50 mil leituras e 20 mil gravações por dia | Grátis |
| Leitura da charpage | Cloudflare Workers, plano Free: 100 mil acessos por dia | Grátis |

O plano Spark do Firebase não pede cartão. Se algum dia aparecer o pedido de "conta de faturamento" ou de mudar para o plano Blaze, não aceite: é aí que passa a poder cobrar. Por isso a leitura da charpage fica no Cloudflare e não nas Cloud Functions do Firebase, que exigem o Blaze.

### 1. Login e dados (Firebase, uns 10 minutos)

1. Em https://console.firebase.google.com, crie um projeto. Pode desligar o Google Analytics.
2. **Authentication** > Começar > em "Métodos de login", ative **Google** e **E-mail/senha**.
3. **Firestore Database** > Criar banco de dados > modo de produção. Na aba **Regras**, cole o conteúdo de `firestore.rules` e publique (cada pessoa só lê e grava o próprio documento).
4. **Configurações do projeto** > Seus apps > ícone `</>` (Web) > registre o app e copie o objeto `firebaseConfig`.
5. Cole em `poc/painel/firebase-config.js`, no lugar de `null`.
6. **Authentication** > Configurações > **Domínios autorizados**: `localhost` já vem; quando publicar, adicione o domínio do site (por exemplo `david-nascimento.github.io`).

Os valores do `firebaseConfig` não são senha; quem protege os dados são as regras do Firestore.

### 2. Leitura da charpage (Cloudflare Workers, uns 5 minutos)

1. Crie uma conta gratuita em https://dash.cloudflare.com.
2. No terminal, na pasta `poc/painel`: `npx wrangler login` (abre o navegador para autorizar) e depois `npx wrangler deploy`.
3. O comando mostra o endereço, algo como `https://cdb-charpage.SEU-USUARIO.workers.dev`. Cole em `poc/painel/app-config.js`, em `API_BASE`.
4. Em `wrangler.toml`, `ALLOWED_ORIGINS` diz quais sites podem usar a leitura: deixe o endereço do seu site e o `http://localhost:5180`.

### 3. Site no ar

O portal já vai para o ramo `gh-pages` (`bash tools/publish-pages.sh`). Depois de desbloquear a conta do GitHub, ligue em Settings > Pages. Se preferir não depender do GitHub, o Cloudflare Pages publica a mesma pasta `dist/` de graça.

## Como a leitura do personagem funciona

`charpage.mjs` abre a charpage pelo servidor (o navegador não pode ler o site da Artix direto), tira nível, classe, facção, guilda e equipamento do HTML, acha o número interno do personagem (`ccid`) e busca o inventário em `/CharPage/Inventory?ccid=`. Cada parte é independente: se o inventário falhar, o resto aparece e o painel avisa o motivo. O servidor guarda cada personagem por 10 minutos e faz no máximo uma consulta nova a cada 5 segundos.

Itens de classe que são cópia de uma classe do portal ("PaladinSlayer (2)") são ligados pelo mesmo `src/data/class-aliases.json` do portal.

## Testes

`node poc/painel/test.mjs`: usa uma charpage falsa (não acessa a Artix) e confere a leitura, o Worker do Cloudflare (CORS e cache), a tela de login (erros, criar conta, esqueci a senha, Google, sem conta), o vínculo, as classes automáticas e manuais, diárias, HardFarm, ultras, quests, a gravação e o celular.

## Para virar produto

- Publicar a leitura da charpage no Cloudflare Worker (`worker.mjs`, já pronto).
- Juntar com o portal: o mesmo login guardando as Minhas diárias, a Minha tier list e o progresso do HardFarm que hoje ficam só no navegador.
