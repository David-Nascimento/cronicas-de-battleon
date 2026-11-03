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

Sem Firebase configurado, o painel roda em **modo demonstração**: tudo funciona, mas os dados ficam só naquele navegador.

Se a leitura do personagem falhar (a Artix pode mudar a página), rode com `DEBUG=1` (no Windows: `set DEBUG=1` antes) e o servidor salva o que leu em `poc/painel/debug/`, para eu ajustar a leitura.

## Ligar o login com Google (Firebase)

1. Em https://console.firebase.google.com, crie um projeto (o plano gratuito, Spark, basta).
2. **Authentication** > Começar > **Google** > Ativar.
3. **Firestore Database** > Criar banco de dados > modo de produção. Depois, na aba **Regras**, cole o conteúdo de `firestore.rules` e publique (cada pessoa só lê e grava o próprio documento).
4. **Configurações do projeto** > Seus apps > ícone `</>` (Web) > registre o app e copie o objeto `firebaseConfig`.
5. Cole em `poc/painel/firebase-config.js`, no lugar de `null`.
6. **Authentication** > Configurações > **Domínios autorizados**: `localhost` já vem; quando publicar, adicione o domínio do site.

Os valores do `firebaseConfig` não são senha; quem protege os dados são as regras do Firestore.

## Como a leitura do personagem funciona

`charpage.mjs` abre a charpage pelo servidor (o navegador não pode ler o site da Artix direto), tira nível, classe, facção, guilda e equipamento do HTML, acha o número interno do personagem (`ccid`) e busca o inventário em `/CharPage/Inventory?ccid=`. Cada parte é independente: se o inventário falhar, o resto aparece e o painel avisa o motivo. O servidor guarda cada personagem por 10 minutos e faz no máximo uma consulta nova a cada 5 segundos.

Itens de classe que são cópia de uma classe do portal ("PaladinSlayer (2)") são ligados pelo mesmo `src/data/class-aliases.json` do portal.

## Testes

`node poc/painel/test.mjs`: usa uma charpage falsa (não acessa a Artix) e confere a leitura, o vínculo, as classes automáticas e manuais, diárias, HardFarm, ultras, quests, a gravação e o celular.

## Para virar produto

- Publicar a leitura da charpage num Cloudflare Worker (gratuito) ou numa Cloud Function do Firebase (exige o plano Blaze), reaproveitando o `charpage.mjs`.
- Juntar com o portal: o mesmo login guardando as Minhas diárias, a Minha tier list e o progresso do HardFarm que hoje ficam só no navegador.
- Confirmar com a charpage de verdade os nomes dos campos do inventário (a leitura aceita os formatos conhecidos e avisa quando não reconhece).
