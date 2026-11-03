@echo off
rem Abre o painel (POC) no navegador. Feche esta janela para desligar.
cd /d "%~dp0\..\.."
start "" "http://localhost:5180/poc/painel/"
node poc/painel/server.mjs
pause
