// Charpage falsa para os testes (imita a página pública do personagem BGP e o inventário).
export const HTML = `<html><head><title>AQW Character Page</title></head><body>
<div class="card-body"><h1>BGP</h1>
<label>Level:</label> 100<br><label>Class:</label> <a href="http://aqwwiki.wikidot.com/PaladinSlayer">PaladinSlayer</a><br>
<label>Weapon:</label> <a href="http://aqwwiki.wikidot.com/Vordred">Vordred's Sword</a><br>
<label>Armor:</label> <a href="#">Dracolich Kigurumi</a><br><label>Helm:</label> <a href="#">Dracolich Kigurumi Hooded Locks</a><br>
<label>Cape:</label> <a href="#">Toy Dracolich Tail</a><br><label>Pet:</label> <a href="#">Chaotic Flying Eye</a><br><label>Misc:</label> <a href="#"></a><br>
<label>Faction:</label> Evil<br><label>Guild:</label> <br></div>
<h2>Achievements</h2><div id="badges">Loading Achievement Badges...</div><h2>Inventory</h2><div id="inv">Loading Inventory...</div>
<script>var ccid = 98765432; $(function(){ loadInventory(ccid); });</script></body></html>`;
export const INV = [{strName: "PaladinSlayer (2)", strType: "Class", intCount: 1, bCoins: 1}, {strName: "Legion Revenant", strType: "Class", intCount: 1, bCoins: 0},
  {strName: "Void Highlord", strType: "Class", intCount: 1, bCoins: 0}, {strName: "StoneCrusher", strType: "Class", intCount: 1, bCoins: 0}, {strName: "Lord of Order", strType: "Class", intCount: 1, bCoins: 0}, {strName: "Some Brand New Class", strType: "Class", intCount: 1, bCoins: 1},
  {strName: "Dracolich Kigurumi", strType: "Armor", intCount: 1, bCoins: 1}];

