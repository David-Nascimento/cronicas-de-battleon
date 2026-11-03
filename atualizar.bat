@echo off
rem Baixa a versao mais nova do portal (a tarefa do Claude atualiza o GitHub sabado e segunda as 8h53).
rem Pode rodar quando quiser: dois cliques. Agendado pelo Windows sabado e segunda as 9h30.
rem O que acontece fica anotado em atualizar.log, nesta pasta.
cd /d "%~dp0"
echo ==== %date% %time% ==== >> atualizar.log
rem o dist/ e gerado; se algo o alterou aqui, volta para a versao do GitHub antes de baixar
git checkout -- dist >> atualizar.log 2>&1
git pull --ff-only >> atualizar.log 2>&1
if errorlevel 1 (
  echo Nao deu para atualizar. Veja atualizar.log nesta pasta. >> atualizar.log
  exit /b 1
)
git log -1 --format="Versao atual: %%h %%s (%%cd)" --date=format:"%%d/%%m %%H:%%M" >> atualizar.log
exit /b 0
