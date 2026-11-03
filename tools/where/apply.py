# Junta o "onde conseguir" (batch*.py e common.py) em src/data/hardfarm.json: campos w (itens) e j (joins) em cada etapa.
# Uso: python3 tools/where/apply.py
import json, re, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from batch1 import W
from common import C
from quests import Q
EN = [("Quests do Mog O'Rahilly e do William Sneevil", "Mog O'Rahilly's and William Sneevil's quests"), (" (diária, member)", " (daily, member)"), (" (diária)", " (daily)"), (" (diárias)", " (dailies)"), (" (semanal)", " (weekly)"), ("Diárias ShadowScythe", "ShadowScythe dailies"), ("e o Ultra Vordred", "and Ultra Vordred"), ("Diária contra o ", "Daily against "),
  ("(opcional, acelera o Mount Doomskull)", "(optional, speeds up Mount Doomskull)"), ("(alternativa)", "(alternative)"), ("10 quests do Kro'nar, em ordem", "Kro'nar's 10 quests, in order"),
  (", em ordem", ", in order"), ("Quests do ", ""), ("Quests das ", "Quests for "), ("Quests ", "Quests "), ("Quest ", "Quest "), (" do Vordred", " from Vordred"), (" do Mog O'Rahilly e do William Sneevil", "Mog O'Rahilly's and William Sneevil's quests"),
  ("(precisa da Legion Promotion)", "(needs the Legion Promotion)"), ("(1 por dia)", "(1 a day)"), ("(nome no guia)", ""), (" e ", " and "), ("(member: ", "(member: "), ("(ou ", "(or ")]
def to_en(t):
    for a, b in EN: t = t.replace(a, b)
    return re.sub(r"(\d) a (\d)", r"\1 to \2", t)
P = "src/data/hardfarm.json"
F = json.load(open(P))
EXCL = {"Spirit Orb": r"(Dark|Loyal|Corrupt)\s+", "Barium": r"(Blessed)\s+", "Diamond of Nulgath": r"(Star)\s+", "Undead Energy": r"x"}
def mentions(text, item):
    pre = EXCL.get(item)
    pat = (rf"(?<!{pre})" if False else "") + r"\b" + re.escape(item) + r"s?\b"
    for m in re.finditer(pat, text, re.I):
        if pre and re.search(pre + r"$", text[:m.start()], re.I): continue
        return True
    return False
n_steps = n_w = 0
for fi, f in enumerate(F):
    for si, r in enumerate(f["req"]):
        r.pop("w", None); r.pop("j", None); r.pop("q", None)
        qs = Q.get(fi, {}).get(si, [])
        if qs: r["q"] = [{"n": {"pt": n, "en": to_en(n)}, **({"by": by} if by else {}), "j": j} for (n, by, j) in qs]
        w = [{"i": i, "o": {"pt": pt, "en": en}, **({"j": j} if j else {})} for (i, pt, en, j) in W.get(fi, {}).get(si, [])]
        have = " | ".join(x["i"] for x in w).lower()
        text = (r["en"] + " " + r["pt"]).replace("\u2019", "'")
        for item, (pt, en, j) in C.items():
            if item.lower() in have: continue
            if mentions(text, item):
                w.append({"i": item, "o": {"pt": pt, "en": en}, **({"j": j} if j else {})}); have += " | " + item.lower()
        if w:
            r["w"] = w; n_w += len(w)
            js = list(dict.fromkeys(x["j"] for x in w if x.get("j")))
            if js: r["j"] = js
        n_steps += 1
json.dump(F, open(P, "w"), ensure_ascii=False, indent=2); open(P, "a").write("\n")
cov = sum(1 for f in F for r in f["req"] if r.get("w") or re.search(r"(^|[\s(])/[a-z0-9]{3,}", r["pt"]))
print(f"{n_steps} etapas, {n_w} itens com fonte, {cov} etapas com join ou fonte")
