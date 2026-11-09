"""Confere o parser do scraper com trechos reais do AQW Wiki. Uso: python3 -m unittest tools/drops/test_scraper.py"""
import sys
import unittest
from pathlib import Path

from bs4 import BeautifulSoup

sys.path.insert(0, str(Path(__file__).parent))
import aqw_scraper as s  # noqa: E402

HTML = (Path(__file__).parent / "fixtures" / "search-sample.html").read_text(encoding="utf-8")


class ParseItem(unittest.TestCase):
    def setUp(self):
        nodes = BeautifulSoup(HTML, "html.parser").select("div.list-pages-item")
        self.items = {n.select_one("p strong a").get_text(strip=True): s.parse_item(n, "sword") for n in nodes}

    def test_boss_drop_com_um_mapa(self):
        i = self.items["#1 Seraph Fan"]
        self.assertEqual((i["by"], i["r"]), ("Supercharged Laken", "Boss Drop"))
        self.assertEqual([l["n"] for l in i["loc"]], ["Seraphic War Dage"])
        self.assertNotIn("lv", i)

    def test_nivel_do_monstro_e_nome_limpo(self):
        i = self.items["Abyssal Frost Katana"]
        self.assertEqual((i["by"], i["lv"], i["r"]), ("Dage The Evil", 66, "Awesome"))
        self.assertEqual([l["n"] for l in i["loc"]], ["Siege Fortress"])  # ignora os links das notas

    def test_varios_mapas(self):
        i = self.items["Test Multi Map Blade"]
        self.assertEqual((i["by"], [l["n"] for l in i["loc"]]), ("Test Wolf", ["Testville", "Testwood"]))

    def test_item_de_loja_fica_de_fora(self):
        self.assertIsNone(self.items["14 Years Played (Cape)"])


if __name__ == "__main__":
    unittest.main()
