#!/usr/bin/env python3
"""
tools/drops/aqw_scraper.py - gera src/data/drops.json (drops de 0 AC) a partir do AQW Wiki.

Usa a busca por tags do wikidot (a mesma ideia do oni4hmad/aqw-scraper).
Educado: User-Agent identificado, pausa entre requisições e cache em disco (.aqw_cache, fora do git).

Uso (na raiz do repositório):
    pip install requests beautifulsoup4
    python3 tools/drops/aqw_scraper.py                  # todas as categorias
    python3 tools/drops/aqw_scraper.py -c sword cape    # só algumas
    python3 tools/drops/aqw_scraper.py --with-join      # busca também o /join de cada mapa (lento, 1 pedido por mapa)
    python3 tools/drops/aqw_scraper.py --per-page 5     # se o wiki ignorar páginas maiores
Depois: npm run build
"""
import argparse
import hashlib
import json
import re
import sys
import time
from datetime import date
from pathlib import Path
from urllib.parse import quote, urljoin

import requests
from bs4 import BeautifulSoup

BASE = "http://aqwwiki.wikidot.com"
USER_AGENT = "CronicasDeBattleon-scraper/1.0 (projeto de fã; github.com/David-Nascimento/cronicas-de-battleon)"
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "src" / "data" / "drops.json"
CACHE_DIR = ROOT / ".aqw_cache"

# chave -> pasta ("parent") do wiki
CATEGORIES = {
    "armor": "Armors", "cape": "Capes & Back Items", "helm": "Helmets & Hoods", "pet": "Pets",
    "axe": "Axes", "bow": "Bows", "dagger": "Daggers", "gun": "Guns", "mace": "Maces",
    "polearm": "Polearms", "staff": "Staffs", "sword": "Swords", "wand": "Wands", "house": "Houses",
}
TAGS = "+0ac +drop +freeplayer -rare -pseudo-rare -seasonal -specialoffer -_index -_redirect"


class Fetcher:
    def __init__(self, delay):
        self.delay = delay
        self.s = requests.Session()
        self.s.headers["User-Agent"] = USER_AGENT
        CACHE_DIR.mkdir(exist_ok=True)

    def get(self, url):
        f = CACHE_DIR / (hashlib.sha1(url.encode()).hexdigest() + ".html")
        if f.exists():
            return f.read_text(encoding="utf-8")
        time.sleep(self.delay)
        r = self.s.get(url, timeout=30)
        r.raise_for_status()
        f.write_text(r.text, encoding="utf-8")
        return r.text


def search_url(parent, per_page, page):
    return (f"{BASE}/search-items-by-tag/parent/{quote(parent, safe='&')}/tags/{quote(TAGS, safe='+-_&')}"
            f"/perPage/{per_page}/order/name/p/{page}")


def total_pages(soup):
    pg = soup.select_one("div.pager span.pager-no")
    m = re.search(r"of\s+(\d+)", pg.get_text()) if pg else None
    return int(m.group(1)) if m else 1


def _clean_loc(t):
    return re.sub(r"\s*\((?:Location)\)$", "", t).strip()


def _monsters(price_el):
    """Monstros do 'Dropped by' (links dentro da linha de preço): nome limpo e nível, se o wiki informar."""
    out = []
    for a in price_el:
        txt = a.get_text(strip=True)
        lv = re.search(r"\(Level (\d+)\)", txt)
        name = re.split(r"\s*\((?:Monster|NPC)\)|\s*\(Level \d+\)", txt)[0].strip()
        out.append((name, int(lv.group(1)) if lv else None))
    return out


def parse_item(node, key):
    """Lê um div.list-pages-item. Só devolve drops de 0 AC ('Price: N/A (Dropped by ...)' e 'Sellback: 0 AC')."""
    a = node.select_one("p strong a")
    box = node.select_one("div.item-content")
    if not a or not box:
        return None
    # os rótulos são <strong>; o valor é o que vem depois, até o próximo <br>/<p>
    price = sellback = rarity = None
    price_links, locs, on_loc = [], [], False
    for el in box.descendants:
        nm = getattr(el, "name", None)
        if nm == "strong":
            lab = el.get_text(strip=True)
            if lab.startswith("Location"):
                on_loc = True
            elif lab.startswith("Price"):
                on_loc = False
                price = ""
                for sib in el.next_siblings:
                    if getattr(sib, "name", None) == "br":
                        break
                    price += sib.get_text() if hasattr(sib, "get_text") else str(sib)
                    if getattr(sib, "name", None) == "a":
                        price_links.append(sib)
                price = price.strip()
            elif lab.startswith("Sellback"):
                sellback = (el.next_sibling or "").strip()
            elif lab.startswith("Rarity"):
                rarity = (el.next_sibling or "").strip()
        elif nm == "a" and on_loc and el.get("href"):
            locs.append({"n": _clean_loc(el.get_text(strip=True)), "u": urljoin(BASE, el["href"])})
    if not price or not price.startswith("N/A (Dropped by") or sellback != "0 AC":
        return None  # loja, quest, merge...: só drops de monstro
    mons = _monsters(price_links)
    it = {"n": a.get_text(strip=True), "c": key, "by": mons[0][0] if mons else None, "loc": locs}
    if mons and mons[0][1]:
        it["lv"] = mons[0][1]  # nível do monstro, quando o wiki informa
    if rarity:
        it["r"] = re.sub(r"\s*Rarity$", "", rarity)  # "Boss Drop", "Awesome"...
    return it


def get_join(fetcher, url):
    box = BeautifulSoup(fetcher.get(url), "html.parser").select_one("#page-content")
    if not box:
        return None
    return next((l.strip() for l in box.get_text("\n").split("\n") if l.strip().startswith("/join")), None)


def scrape(fetcher, key, per_page):
    items, page, last = [], 1, 1
    while page <= last:
        soup = BeautifulSoup(fetcher.get(search_url(CATEGORIES[key], per_page, page)), "html.parser")
        if page == 1:
            last = total_pages(soup)
        for node in soup.select("div.list-pages-item"):
            it = parse_item(node, key)
            if it:
                items.append(it)
        print(f"  [{key}] página {page}/{last}: {len(items)} itens", file=sys.stderr)
        page += 1
    return items


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-c", "--categories", nargs="*", choices=list(CATEGORIES), default=list(CATEGORIES))
    ap.add_argument("--per-page", type=int, default=20)
    ap.add_argument("--delay", type=float, default=1.5, help="segundos entre pedidos que não estão no cache")
    ap.add_argument("--with-join", action="store_true")
    ap.add_argument("-o", "--output", default=str(OUT))
    a = ap.parse_args()

    f, items = Fetcher(a.delay), []
    for key in a.categories:
        print(f"Lendo {key}...", file=sys.stderr)
        try:
            items += scrape(f, key, a.per_page)
        except requests.RequestException as e:
            print(f"  ! falhou em {key}: {e}", file=sys.stderr)
    if not items:
        sys.exit("Nenhum item lido: o arquivo não foi alterado.")

    joins = {}
    for it in items:
        for l in it["loc"]:
            if a.with_join and l["u"] not in joins:
                try:
                    joins[l["u"]] = get_join(f, l["u"])
                except requests.RequestException:
                    joins[l["u"]] = None
            j = joins.get(l["u"])
            if j:
                l["j"] = j.replace("/join", "", 1).strip()
            del l["u"]
    items.sort(key=lambda i: (i["c"], i["n"].lower()))
    Path(a.output).write_text(json.dumps({"updated": date.today().isoformat(), "items": items}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"Salvo: {len(items)} itens em {a.output}", file=sys.stderr)


if __name__ == "__main__":
    main()
