# "Onde conseguir" por etapa do HardFarm. Fonte: guias do AQWG (sites.google.com/view/aqwg-net) e AQW Wiki.
# Formato: W[índice do farm][índice da etapa] = [(item, onde em pt, onde em en, join ou None), ...]
W = {}
W[0] = {  # Legion Revenant (AQWG: classes/legion-revenant)
 0: [("Aeacus Empowered", "Ultra Aeacus", "Ultra Aeacus", "revenant"),
     ("Tethered Soul", "Forgotten Souls", "Forgotten Souls", "revenant"),
     ("Darkened Essence", "qualquer inimigo", "any enemy", "shadowrealmpast"),
     ("Dracolich Contract", "5 Headed Dracolich", "5 Headed Dracolich", "necrodungeon")],
 1: [("Cohort (Grim)", "inimigos da sala com 4", "enemies in the room with 4", "doomvault"),
     ("Cohort (Ancient)", "inimigos", "enemies", "mummies"),
     ("Cohort (Pirate)", "inimigos", "enemies", "wrath"),
     ("Cohort (Battleon)", "inimigos", "enemies", "doomwar"),
     ("Cohort (Mirror)", "inimigos", "enemies", "overworld"),
     ("Cohort (Darkblood)", "inimigos", "enemies", "deathpits"),
     ("Cohort (Vampire)", "inimigos", "enemies", "maxius"),
     ("Cohort (Spirit)", "inimigos", "enemies", "curseshore"),
     ("Cohort (Dragon)", "inimigos (use item de dano em Dragon)", "enemies (use a Dragon damage item)", "dragonbone"),
     ("Cohort (Doomwood)", "inimigos", "enemies", "doomwood")],
 2: [("Legion Token", "veja o card Legion Token", "see the Legion Token card", None),
     ("Dage's Favor", "Dreadfiend of Nulgath e Infernalfiends (primeira sala fora da caverna, depois do Klunk)", "Dreadfiend of Nulgath and Infernalfiends (first room outside the cave, past Klunk)", "underworld"),
     ("Dark Token", "Seraphic Soldiers (precisa das quests do Laken)", "Seraphic Soldiers (needs Laken's quests)", "seraphicwardage"),
     ("Diamond Token of Dage", "quest \"Legion Loyalty Rewarded\", do Gresk", "Gresk's \"Legion Loyalty Rewarded\" quest", "shadowblast"),
     ("Hooded Legion Cowl", "loja da Legion do Dage, 500 mil de gold", "Dage's Legion shop, 500k gold", "underworld")],
 3: [("Revenant's Spellscroll", "recompensa da Fealty 1, ou troque 1 Dage the Evil Insignia", "Fealty 1 reward, or trade 1 Dage the Evil Insignia", "ultradage"),
     ("Conquest Wreath", "recompensa da Fealty 2, ou 2 por Dage the Evil Insignia", "Fealty 2 reward, or 2 per Dage the Evil Insignia", "ultradage"),
     ("Exalted Crown", "recompensa da Fealty 3, ou troque 1 Dage the Evil Insignia", "Fealty 3 reward, or trade 1 Dage the Evil Insignia", "ultradage")],
}
W[1] = {  # Dragon of Time (AQWG: classes/dragon-of-time)
 0: [("Lost Hieroglyphic", "Mummies (quest 1)", "Mummies (quest 1)", "mummies"),
     ("Historia Page", "sala com 2 Undead Knights e o Moglin Ghost", "room with 2 Undead Knights and the Moglin Ghost", "timelibrary"),
     ("Desoloth's Destructive Aura", "Desoloth the Final (quest 2)", "Desoloth the Final (quest 2)", "dragonchallenge"),
     ("Timestream String", "Timestream Rider (quest 3)", "Timestream Rider (quest 3)", "arena"),
     ("Chronolord Stopped", "Chronolords (quest 4)", "Chronolords (quest 4)", "portalmaze"),
     ("Mysterious Egg", "quest \"Mysterious Chest\", depois das 7 Keys (quest 9)", "\"Mysterious Chest\" quest, after the 7 Keys (quest 9)", "ashfallcamp"),
     ("Slugbutter Trophy", "Slugbutter, em grupo (quest 9)", "Slugbutter, in a group (quest 9)", "towerofdoom10")],
 1: [("Fire Essence", "sala com 3 Fire Imps", "room with 3 Fire Imps", "volcano"),
     ("Akriloth's Flametongue", "Akriloth", "Akriloth", "charredplains"),
     ("Immortal Embers", "Ultra Phedra", "Ultra Phedra", "ultraphedra"),
     ("Ashes from the Void Realm", "Reaper", "Reaper", "thevoid")],
 2: [("Unyielding Slime", "Slime Molds", "Slime Molds", "moonlab"),
     ("Omnipotent Cells", "Mutated Void Dragon", "Mutated Void Dragon", "bosschallenge"),
     ("Dragon's Plasma", "ArchFiend Dragonlord", "ArchFiend Dragonlord", "underlair"),
     ("Chaotic Invertebrae", "Chaos Kraken", "Chaos Kraken", "chaoskraken"),
     ("Cryostatic Essence", "Dread Fang", "Dread Fang", "towerofdoom9"),
     ("Salvaged Chaos Dragon Biomass", "Ultra Chaos Dragon", "Ultra Chaos Dragon", "castleroof")],
 3: [("Cross-Dimensional Weapons", "inimigos Nightlocke Weapon", "Nightlocke Weapon enemies", "aqw3d"),
     ("Darkon's Receipt", "quests do Darkon: Jurassic Monkeys (tela 8), Binky ou Nulgath's Mask (20%)", "Darkon's errands: Jurassic Monkeys (screen 8), Binky or Nulgath's Mask (20%)", "portalmaze"),
     ("Sword of Voids", "Ivoliss", "Ivoliss", "ivoliss"),
     ("Semiramis Feather", "quest \"Take Down Terrane\", da Aria", "Aria's \"Take Down Terrane\" quest", "guardiantree"),
     ("Starlight Singularity", "quest \"Serpent of the Stars\", do Wanderer", "The Wanderer's \"Serpent of the Stars\"", "whitehole"),
     ("Epic Hydra Fang", "Hydra Head 90s (Rend)", "Hydra Head 90s (Rend)", "hydrachallenge"),
     ("Dimensional Dragon Portal", "Dragon Summoner (Rend)", "Dragon Summoner (Rend)", "lairdefend")],
}
W[2] = {  # Void Highlord (AQWG: classes/void-highlord + reagent-library)
 0: [("Roentgenium of Nulgath", "quest \"Void Highlord's Challenge\", 1 por entrega (15 entregas)", "\"Void Highlord's Challenge\" quest, 1 per turn-in (15 turn-ins)", "tercessuinotlim"),
     ("Aelita's Emerald", "loja de armas do Yulgar", "Yulgar's weapon shop", "yulgar"),
     ("Black Knight Orb", "chefes da quest Hardly Suiting Armour, ~30%", "Hardly Suiting Armour bosses, ~30%", "greendragon"),
     ("Elders' Blood", "diária \"Experiment 107\", do Reens (Gorillaphants)", "Reens' daily \"Experiment 107\" (Gorillaphants)", "arcangrove"),
     ("Nulgath Shaped Chocolate", "loja, por gold", "shop, for gold", "citadel")],
 1: [("Unidentified 10", "Supplies to spin the Wheel of Chance (precisa do Oblivion Blade of Nulgath)", "Supplies to spin the Wheel of Chance (needs Oblivion Blade of Nulgath)", "evilmarsh"),
     ("Gem of Nulgath", "Contract Exchange, do Drudgen", "Drudgen's Contract Exchange", "tercessuinotlim"),
     ("Dark Crystal Shard", "Tenacity Challenge, do pet Nulgath Challenge", "Tenacity Challenge, from the Nulgath Challenge pet", "deathpits"),
     ("Tainted Gem", "Tenacity Challenge, do pet Nulgath Challenge", "Tenacity Challenge, from the Nulgath Challenge pet", "deathpits")],
 2: [("Diamond of Nulgath", "\"GRUMBLE, GRUMBLE...\", de Crag & Bamboozle (100%)", "\"GRUMBLE, GRUMBLE...\", from Crag & Bamboozle (100%)", None),
     ("Blood Gem of the ArchFiend", "Tenacity Challenge, do pet Nulgath Challenge", "Tenacity Challenge, from the Nulgath Challenge pet", "deathpits"),
     ("Totem of Nulgath", "\"Assisting\" do Oblivion Blade of Nulgath (11%)", "Oblivion Blade of Nulgath's \"Assisting\" (11%)", None),
     ("Elders' Blood", "diária \"Experiment 107\", do Reens", "Reens' daily \"Experiment 107\"", "arcangrove")],
}
W[7] = {  # Dragonslayer General (já tinha onde)
 1: [("Dragon Claw", "Dracoliches de Dragon Town", "Dragon Town Dracoliches", "dragontown")],
 2: [("Enchanted Scale", "quest da classe, do Galanoth (Tempest e Blood Dracoliches)", "Galanoth's class quest (Tempest and Blood Dracoliches)", "dragontown")],
}
W[8] = {  # Necromancer (AQWG: necrotic sword, passo da classe)
 1: [("NUE Necronomicon", "loja de reputação da Lady Speedstyk (DoomWood rank 10)", "Lady Speedstyk's rep shop (DoomWood rank 10)", "lightguard")],
 2: [("Creature Shard", "Creature Creation (5%)", "Creature Creation (5%)", "maul")],
}
W[11] = {  # Chaos Avenger (AQWG: classes/chaos-avenger)
 1: [("Champion Drakath Insignia", "quest semanal \"Drakath, Champion of Chaos\" (5 por vez)", "weekly \"Drakath, Champion of Chaos\" quest (5 each)", "championdrakath")],
 2: [("Fragment of Mount Doomskull", "inimigos (melhor tela: Chaos Drows e Chaorrupted Rogues)", "enemies (best screen: Chaos Drows and Chaorrupted Rogues)", "mountdoomskull"),
     ("Fragment of the Dragon", "a versão inimiga de você mesmo", "the enemy version of yourself", "chaoslord"),
     ("Fragment of the Queen", "The Queen of Monsters (precisa de /forestreach > /deepforest)", "The Queen of Monsters (needs /forestreach > /deepforest)", "transformation")],
 3: [("Escherion", "Escherion", "Escherion", "escherion"), ("Vath", "Vath", "Vath", "stalagbite"),
     ("Kitsune", "Kitsune", "Kitsune", "kitsune"), ("Wolfwing", "Wolfwing", "Wolfwing", "wolfwing"),
     ("Discordia", "Discordia", "Discordia", "palooza"), ("Ledgermayne", "Ledgermayne", "Ledgermayne", "ledgermayne"),
     ("Tibicenas", "Tibicenas", "Tibicenas", "djinn"), ("Khasaanda", "Khasaanda", "Khasaanda", "dreamnexus"),
     ("Iadoa", "Iadoa", "Iadoa", "timespace"), ("Lionfang", "Lionfang", "Lionfang", "stormtemple"),
     ("Alteon", "Chaos Lord Alteon", "Chaos Lord Alteon", "swordhavenfalls"), ("Xiang", "Xiang", "Xiang", "mirrorportal")],
}
W[12] = {  # Yami no Ronin (AQWG: classes/yami-no-ronin)
 1: [("Zardman's StoneHammer", "Zardman Grunts (ande para a direita)", "Zardman Grunts (walk right)", "forest"),
     ("Iron Hammer", "loja da Loremaster Sara", "Loremaster Sara's shop", "greenguardeast"),
     ("Elemental Rock Hammer", "Rock Elemental (suba a escada saindo de /bludrut2)", "Rock Elemental (ladder up from /bludrut2)", "bludrut"),
     ("Yami", "quest \"Embracing Darkness\", do Dage (Dark Wisps)", "Dage's \"Embracing Darkness\" quest (Dark Wisps)", "darkally"),
     ("Flame-Forged Metal", "quest \"Need Flame\", do Chanky (Frozen Pyromancer)", "Chanky's \"Need Flame\" (Frozen Pyromancer)", "underworld"),
     ("Obsidian Rock", "\"Obsidian Mining\" (Firestorm Hatchlings), ou 2 LTs cada na SoulForge", "\"Obsidian Mining\" (Firestorm Hatchlings), or 2 LTs each at the SoulForge", "firestorm"),
     ("Eternity Flame", "Amia the Cult Leader (fim do mapa)", "Amia the Cult Leader (end of map)", "fotia"),
     ("Weapon Imprint", "Undead Raxgore (depois das quests de /doomvault)", "Undead Raxgore (after the /doomvault quests)", "doomvaultb"),
     ("Shadow Katana Blueprint", "Jaaku (fim do mapa)", "Jaaku (end of map)", "shadowfortress"),
     ("Perfect Orochi Scales", "Heads of Orochi", "Heads of Orochi", "shadowfortress"),
     ("Oni Skull Charm", "loja de reputação do Mitsu Bishi (Yokai rank 10)", "Mitsu Bishi's rep shop (Yokai rank 10)", "akiba"),
     ("Darkened Essence", "inimigos", "enemies", "shadowrealmpast")],
 2: [("Sapphire Orb", "Legion Lich Lord (melhor em grupo)", "Legion Lich Lord (best in a group)", "frozenlair"),
     ("Aeacus Empowered", "Ultra Aeacus", "Ultra Aeacus", "judgement"),
     ("SwordMaster", "loja do Dage, 2.000 LTs", "Dage's shop, 2,000 LTs", "underworld")],
 3: [("Sword Scroll Fragment, Legion Combat Trophy, Technique Observed", "Blade Masters, Legion Guards e Dage (sala privada)", "Blade Masters, Legion Guards and Dage (private room)", "dagepvp"),
     ("Traitor's Tract", "Underfiend", "Underfiend", "darkally"),
     ("Ogre Titan's Resonance", "Oh'Garr (depois das quests do Dorian)", "Oh'Garr (after Dorian's quests)", "shadowsong"),
     ("Shadow Dragonlord's Shroud", "Titan Shadow Dragonlord", "Titan Shadow Dragonlord", "shadowgrove"),
     ("Sapphire Orb", "Legion Lich Lord", "Legion Lich Lord", "frozenlair")],
}
W[15] = {  # ArchFiend (AQWG: classes/archfiend)
 1: [("Unidentified 13", "Diamond Exchange, de Crag & Bamboozle (15 Diamonds + Dark Makai Sigil)", "Crag & Bamboozle's Diamond Exchange (15 Diamonds + Dark Makai Sigil)", None),
     ("Pink Star Diamond of Nulgath", "merge de 6 Receipts of Swindle", "merge of 6 Receipts of Swindle", "tercessuinotlim"),
     ("Immortal Joe's Black Star", "Mercutio", "Mercutio", "mercutio"),
     ("Dirtlicker Demoted", "Dirtlicker (depois de /originul > /fiendshard)", "Dirtlicker (after /originul > /fiendshard)", "fiendshard")],
 2: [("Abyssal Star", "loja de diamantes do Diligas", "Diligas' Diamond Shop", "evilwarnul")],
 3: [("Blood Star of the ArchFiend", "loja do Tharanak Hrii", "Tharanak Hrii's shop", "shadowblast"),
     ("Gold Star of Avarice", "Swindle's Ripoff Emporium (16 Receipts of Swindle + Unmoulded Fiend Essence)", "Swindle's Ripoff Emporium (16 Receipts of Swindle + Unmoulded Fiend Essence)", "tercessuinotlim")],
}
W[16] = {  # Chrono Assassin (AQWG)
 1: [("Svelgr Fang", "Svelgr the Destroyer (~1%)", "Svelgr the Destroyer (~1%)", "tachyon")],
 2: [("Sands of Time", "Chronorysa", "Chronorysa", "portalwar"), ("Wraith Wisps", "Time Wraiths", "Time Wraiths", "portalmaze")],
 3: [("Saeculum Gem", "\"Chrono Class Quest\"; troque na loja do Kairos", "\"Chrono Class Quest\"; trade at Kairos' shop", "tachyon")],
}
W[17] = {  # BLoD (AQWG)
 0: [("Undead Essence e Bone Dust", "inimigos", "enemies", "battleunderb"),
     ("Blinding Light of Destiny Handle e Bonegrinder Medal", "loja do Arryd", "Arryd's shop", "doomwood")],
 1: [("Spirit Orb", "\"Bust some Dust\" e \"Essential Essences\", do Artix; ou \"Soul Searching\", da Yara", "Artix's \"Bust some Dust\" and \"Essential Essences\"; or Yara's \"Soul Searching\"", "necropolis"),
     ("Undead Champion / Bone Terror / Crystalised Jellyfish (Soul Searching)", "battleunderc / battleundera / battleunderd", "battleunderc / battleundera / battleunderd", "battleunderc")],
 2: [("Copper, Barium e Silver", "diária \"Mine Crafting\" (Balboa)", "daily \"Mine Crafting\" (Balboa)", "stalagbite"),
     ("Paladaffodil", "Seed Spitters", "Seed Spitters", "arcangrove"),
     ("Forge Key", "Albino Bat (forja do Geopetal)", "Albino Bat (Geopetal's forge)", "dwarfhold"),
     ("Basic Weapon Kit", "Zardman Grunts, Mummies, Horc Noobs, Bronze Draconians, Rocks, Scarecrows", "Zardman Grunts, Mummies, Horc Noobs, Bronze Draconians, Rocks, Scarecrows", "forest"),
     ("Advanced Weapon Kit", "Chaos Lycans (safiria), Dai Tengu (hachiko), Leatherwings (pines), Vampire Knights (lycanwar) e outros", "Chaos Lycans (safiria), Dai Tengu (hachiko), Leatherwings (pines), Vampire Knights (lycanwar) and more", "safiria"),
     ("Ultimate Weapon Kit", "Earth Elementals (dragonplane), Kitsune, Greenguard Dragon, Chaos Sphinx (sandcastle), Grand Inquisitor (citadel) e outros", "Earth Elementals (dragonplane), Kitsune, Greenguard Dragon, Chaos Sphinx (sandcastle), Grand Inquisitor (citadel) and more", "dragonplane")],
 3: [("Brilliant, Bright e Blinding Aura", "quests \"Finding Fragments\" com a Mace, o Bow e a Blade (Blinding Aura 1%)", "\"Finding Fragments\" quests with the Mace, Bow and Blade (Blinding Aura 1%)", "battleunderb")],
}
W[18] = {  # Necrotic Sword of Doom (AQWG)
 1: [("Void Aura", "\"Commanding Shadow Essences\", do Braeus", "Braeus' \"Commanding Shadow Essences\"", "shadowfall"),
     ("Cavern Celestite", "\"Soul Searching\", da Yara", "Yara's \"Soul Searching\"", "battleunderc"),
     ("Bone Dust e Undead Energy", "inimigos", "enemies", "battleunderb"),
     ("Barium", "diária \"Mine Crafting\" (Balboa)", "daily \"Mine Crafting\" (Balboa)", "stalagbite"),
     ("Kraken Doubloon", "Chaos Kraken", "Chaos Kraken", "chaoskraken"),
     ("Hydra Eyeball", "Hydra Head 90s", "Hydra Head 90s", "hydrachallenge")],
 2: [("Blade Essence", "Chaorrupted Armour (~1%)", "Chaorrupted Armour (~1%)", "chaoscrypt"),
     ("Scroll of Dark Arts", "Ultra Vordred (~1%)", "Ultra Vordred (~1%)", "epicvordred"),
     ("Doom Heart", "Ultra Sepulchure (~0,5%)", "Ultra Sepulchure (~0.5%)", "sepulchurebattle")],
 3: [("Chaorrupted Hourglass", "Chaos Lord Iadoa (~20%)", "Chaos Lord Iadoa (~20%)", "timespace"),
     ("Primarch's Hilt", "Colossal Primarch", "Colossal Primarch", "bosschallenge")],
}
W[19] = {  # SDKA (AQWG)
 0: [("DoomCoins e Dark Spirit Orbs", "quest \"A Penny for your Foughts\" (inimigos)", "\"A Penny for your Foughts\" quest (enemies)", "maul"),
     ("Shadow Creeper Enchant", "Shadow Creepers", "Shadow Creepers", "bludrut2"),
     ("Shadow Serpent Scythe", "Shadow Serpents", "Shadow Serpents", "bludrut4"),
     ("Shadow Whiskers", "Dark Witch", "Dark Witch", "ruins"),
     ("DoomKnight Hood", "Dusk", "Dusk", "shadowfall"),
     ("Dark Skull", "Shadow Imp", "Shadow Imp", "necrocavern")],
 1: [("Dark Spirit Orb", "\"A Penny for your Foughts\"", "\"A Penny for your Foughts\"", "maul")],
 2: [("Arsenic, Chromium e Rhodium", "diária \"Hard Core Metals\" (Balboa)", "daily \"Hard Core Metals\" (Balboa)", "stalagbite"),
     ("Dark Energy", "Shadow Serpents ou Chaos Drows (dwarfhold)", "Shadow Serpents or Chaos Drows (dwarfhold)", "bludrut4"),
     ("Deadly Knightshade", "Seed Spitters", "Seed Spitters", "arcangrove"),
     ("Forge Key", "Albino Bat", "Albino Bat", "dwarfhold")],
 3: [("DoomSquire Weapon Kit", "Skeletal Warriors, War Mummies, Horc Noobs, Bronze Draconians, Scarecrows, Rock Elemental, Dark Makai", "Skeletal Warriors, War Mummies, Horc Noobs, Bronze Draconians, Scarecrows, Rock Elemental, Dark Makai", "castleundead"),
     ("DoomSoldier Weapon Kit", "Stone Golem (cornelis), Dai Tengu (hachiko), Leatherwings (pines), Vampire Knights (lycanwar) e outros", "Stone Golem (cornelis), Dai Tengu (hachiko), Leatherwings (pines), Vampire Knights (lycanwar) and more", "cornelis"),
     ("DoomKnight Weapon Kit", "Sneeviltron (boxes), Kitsune, Chaos Sphinx, Protosartoium (crashsite), Shadow Nukemichi (akiba) e outros", "Sneeviltron (boxes), Kitsune, Chaos Sphinx, Protosartoium (crashsite), Shadow Nukemichi (akiba) and more", "boxes"),
     ("Doom Aura", "quests \"Pinpoint the Pieces\" (1%) ou Necrotic Scythe of Scourge", "\"Pinpoint the Pieces\" quests (1%) or the Necrotic Scythe of Scourge", "necropolis"),
     ("Heart of Darkness", "Dark Elemental", "Dark Elemental", "ruins")],
}
W[21] = {  # Hollowborn DoomKnight (AQWG)
 1: [("Empowered Essence", "Shadow Warriors, Guardians e Pure Shadowscythe", "Shadow Warriors, Guardians and Pure Shadowscythe", "shadowrealmpast"),
     ("Hollow Soul", "Hollowborn Sentinels (ou \"Specimens\", da Kasebel)", "Hollowborn Sentinels (or Kasebel's \"Specimens\")", "shadowrealm"),
     ("Shadowworn e Shadow DoomReaver", "Shadow Lord", "Shadow Lord", "shadowrealm"),
     ("Worshipper of Doom", "Corrupted Luma", "Corrupted Luma", "lumafortress"),
     ("Ingredients?", "Binky (melhor em grupo)", "Binky (best in a group)", "doomvault")],
 2: [("Dark Energy", "Chaos Drow", "Chaos Drow", "dwarfhold"),
     ("Scroll of Dark Arts", "Ultra Vordred (~1%)", "Ultra Vordred (~1%)", "epicvordred"),
     ("Weapon Imprint", "Undead Raxgore", "Undead Raxgore", "doomvaultb"),
     ("Desolich's Dark Horn", "Desolich", "Desolich", "desolich"),
     ("Doom Heart", "Ultra Sepulchure (~0,5%)", "Ultra Sepulchure (~0.5%)", "sepulchurebattle"),
     ("Bones from the Void Realm", "merge de 50 Void Aura + 50 Bone Dust, no Braeus", "merge of 50 Void Aura + 50 Bone Dust, at Braeus", "shadowfall")],
 3: [("Unidentified 25", "\"The Assistant\" (1%), ou merge com Unmoulded Fiend Essence", "\"The Assistant\" (1%), or merge with Unmoulded Fiend Essence", "tercessuinotlim")],
}
W[23] = {0: [("Shadow Skull", "\"Slithering Shadows\", da Gravelyn (Shadow Serpents)", "Gravelyn's \"Slithering Shadows\" (Shadow Serpents)", "bludrut4")]}
W[24] = {0: [("Shurpu Blaze Token", "quest do Warlic (84 tokens)", "Warlic's quest (84 tokens)", "xancave")]}
W[25] = {0: [("Glacera Ice Token", "quest do Syrrus (Frost Invaders), 84 tokens", "Syrrus' quest (Frost Invaders), 84 tokens", "frozenruins")]}
W[26] = {0: [("Shadow Shield", "Sigrid Sunshield (3%), nas diárias da Gravelyn", "Sigrid Sunshield (3%), in Gravelyn's dailies", "lightguardwar")]}
W[27] = {0: [("Token of Collection", "quests do Drakath (Kid)", "Drakath (Kid)'s quests", "terrarium")]}
W[28] = {0: [("C-Armour Token", "\"Nightmare Fire\" do Cysero (Nightmare)", "Cysero's \"Nightmare Fire\" (Nightmare)", "deadmoor")],
         1: [("C-Hammer Token", "\"Links To The Past\" (Geist)", "\"Links To The Past\" (Geist)", "deadmoor")]}
W[29] = {0: [("Seal of Light", "Ultra Alteon (diária da Lady Celestia)", "Ultra Alteon (Lady Celestia's daily)", "alteonbattle"),
             ("Seal of Darkness", "Ultra Sepulchure (diária da Lady Celestia)", "Ultra Sepulchure (Lady Celestia's daily)", "sepulchurebattle")]}
W[30] = {0: [("Inquisitor Inquiry", "Inquisitor Guards (quest da Gravelyn)", "Inquisitor Guards (Gravelyn's quest)", "citadel")]}
W[31] = {0: [("Moglin MEAL", "\"Moglin Companions\", da Aria (Frogzards)", "Aria's \"Moglin Companions\" (Frogzards)", "nexus")]}
W[33] = {0: [("Legion Token", "veja o card Legion Token", "see the Legion Token card", None)]}
W[34] = {0: [("Obsidian Rock", "\"Obsidian Mining\" (Skeletal Fire Mages, 4 níveis abaixo)", "\"Obsidian Mining\" (Skeletal Fire Mages, 4 levels down)", "temple")]}
W[35] = {0: [("Blood Moon Token", "quests do Barnabus (Mogloween)", "Barnabus' quests (Mogloween)", "mogloween")]}
W[36] = {0: [("Glowing Pumpkinseed", "Apephryx; ou drop do Great Pumpkin King", "Apephryx; or a Great Pumpkin King drop", "cruxship")]}
W[37] = {0: [("Lucky Clover, Rainbow Shard e Golden Ticket", "quests do Mog O'Rahilly e do William Sneevil", "Mog O'Rahilly's and William Sneevil's quests", "luck")]}
W[40] = {2: [("Dragon Shinobi Token", "2ª e 3ª Head of Orochi", "2nd and 3rd Head of Orochi", "shadowfortress")],
         3: [("Dragon Shinobi Token", "BOGOdrone Prime e Executive Assistant Vordred (grupo)", "BOGOdrone Prime and Executive Assistant Vordred (group)", "blackfridaywar")]}
W[45] = {  # Arch DoomKnight (AQWG)
 1: [("Bone Axe", "Big Jack Sprat", "Big Jack Sprat", "graveyard"),
     ("Spine Gripper", "Angry Undead Giant (1%)", "Angry Undead Giant (1%)", "battleundera"),
     ("Dread Staff", "Dreadspider", "Dreadspider", "marsh"),
     ("O-dokuro Blade", "O-dokuro", "O-dokuro", "odokuro"),
     ("Ancient Skull Blade", "loja do Rayst", "Rayst's shop", "arcangrove"),
     ("Dracolich Destroyer Scythe", "Avatar of Desolich", "Avatar of Desolich", "dragonheart"),
     ("Screaming Might", "loja do Aeneas (10 Dark Palace Tokens)", "Aeneas' shop (10 Dark Palace Tokens)", "dagefortress"),
     ("Boneblade of Gorgorath", "Gorgorath", "Gorgorath", "wrath"),
     ("Escherion's Robe", "Escherion", "Escherion", "escherion"),
     ("Undead Terror Armour", "Bone Terror", "Bone Terror", "battleundera"),
     ("Skulls of the Necromancer", "Shadow Dragon", "Shadow Dragon", "necrocavern"),
     ("Shadow Lich", "loja de reputação Evil da Gravelyn", "Gravelyn's Evil rep shop", "shadowfall")],
 2: [("Desolich's Skull", "Desolich", "Desolich", "desolich"),
     ("Undead Raxgore's Skull", "Undead Raxgore", "Undead Raxgore", "doomvaultb"),
     ("Legion Lich Lord's Skull", "Legion Lich Lord", "Legion Lich Lord", "frozenlair"),
     ("Reaper's Skull", "Reaper", "Reaper", "thevoid")],
 3: [("Scroll of Dark Arts", "Ultra Vordred (~1%)", "Ultra Vordred (~1%)", "epicvordred"),
     ("Noxus Runes", "Extreme Noxus", "Extreme Noxus", "lightguardwar"),
     ("Sally's Necronomicon", "loja da Sally, 20 milhões de gold", "Sally's shop, 20 million gold", "necrotower"),
     ("Ancient Evil of the Necropolis", "5 Headed Dracolich", "5 Headed Dracolich", "necrodungeon")],
}
W[54] = {  # Fire Champion's Armour (AQWG)
 1: [("Warfury Emblem", "\"Warfury Training\", do Vagra (Vagra solta 1 a 20 em grupo)", "Vagra's \"Warfury Training\" (Vagra drops 1-20 in a group)", "wartraining")],
 2: [("Enchanted Scale", "quest da classe DragonSlayer General, do Galanoth", "Galanoth's DragonSlayer General class quest", "dragontown"),
     ("Dragon Scale", "Venom, Dark e Bronze Draconians", "Venom, Dark and Bronze Draconians", "lair")],
 3: [("Flame-Forged Metal", "\"Need Flame\", do Chanky (Frozen Pyromancer)", "Chanky's \"Need Flame\" (Frozen Pyromancer)", "underworld"),
     ("Void Scale", "ArchFiend Dragonlord (muito difícil, leve grupo)", "ArchFiend Dragonlord (very hard, bring a group)", "underlair"),
     ("Gold Voucher 500k", "loja do Vagra", "Vagra's shop", "wartraining")],
}
W[85] = {  # Legion Token (AQWG)
 1: [("Legion Token", "\"Time for Some Spring Cleaning\" (Fotia Spirits e Elementals)", "\"Time for Some Spring Cleaning\" (Fotia Spirits and Elementals)", "fotia")],
 2: [("Legion Token", "\"Undead Champion Recruitment\" (inimigos à esquerda do quadro, 2ª tela)", "\"Undead Champion Recruitment\" (enemies left of the board, 2nd screen)", "dreadrock")],
 3: [("Axeros' Brooch", "Legion Fiend Rider (4%)", "Legion Fiend Rider (4%)", "legionarena")],
}
W[95] = {  # Dark Lord (AQWG)
 1: [("Cyber Ring Crystal", "\"Too Dangerous to be Left Alive!\" (Tempest Soldiers)", "\"Too Dangerous to be Left Alive!\" (Tempest Soldiers)", "murdermoon")],
 2: [("Dark Helmet e Dotty", "Zorba the Bakk", "Zorba the Bakk", "zorbaspalace"),
     ("Gold Voucher 25k", "loja do Hammer Wateru", "Hammer Wateru's shop", "murdermoon")],
}
W[41] = {  # LightCaster (AQWG)
 1: [("Evolved LightCaster", "Aranx, 1.000 ACs", "Aranx, 1,000 ACs", "celestialrealm")],
 2: [("Burning Blade", "Diabolical Warlord (1%)", "Diabolical Warlord (1%)", "lostruinswar"),
     ("Burning Blade of Azebeth", "Aranx (5%)", "Aranx (5%)", "celestialarena")],
 3: [("Aranx's Pure Light", "Aranx (10%)", "Aranx (10%)", "celestialarena")],
}
W[13] = {  # Lord of Order (AQWG: classes/lord-of-order)
 1: [("Quest 1: Pristine Blades of Order", "Chaorrupted Knights", "Chaorrupted Knights", "watchtower"),
     ("Quest 1: Dreadrock Donation Receipt", "loja do Deathgore, 1 milhão de gold", "Deathgore's shop, 1 million gold", "dreadrock"),
     ("Quest 1: Deadmoor Spirits Helped", "Banshee Mallora", "Banshee Mallora", "deadmoor"),
     ("Quest 1: Mage's Gratitude", "quest \"Defeat Enn'tropy\", do Polish", "Polish's \"Defeat Enn'tropy\" quest", "citadelruins"),
     ("Quest 1: Ravenscar's Truth", "loja da Mina's Ghost", "Mina's Ghost's shop", "ravenscar"),
     ("Quest 2: Warden Elfis Detained", "Warden Elfis", "Warden Elfis", "dwarfprison"),
     ("Quest 2: Piggy Drake Punished", "Piggy Drake", "Piggy Drake", "prison"),
     ("Quest 2: Mysterious Stranger Foiled", "Mysterious Stranger", "Mysterious Stranger", "mysteriousdungeon"),
     ("Quest 2: Calico Cobby Crushed", "Calico Cobby", "Calico Cobby", "dreammaster"),
     ("Quest 4: Gaiazor's Cornerstone", "Gaiazor", "Gaiazor", "gaiazor"),
     ("Quest 4: Dakka's Crystal", "Dakka the Dire Dragon", "Dakka the Dire Dragon", "treetitanbattle"),
     ("Quest 4: Andre's Necklace Fragment", "Giant Necklace", "Giant Necklace", "andre"),
     ("Quest 4: Desolich Skull", "Desolich (melhor em grupo)", "Desolich (best in a group)", "desolich"),
     ("Quest 5: Hanzamune Dragon Koi Blade", "Kitsune", "Kitsune", "kitsune"),
     ("Quest 5: Dragonoid of Hours", "Dragonoid", "Dragonoid", "mqlesson"),
     ("Quest 5: Safiria's Spirit Orb", "Safiria (botão \"Take The Spirit Orb\")", "Safiria (\"Take The Spirit Orb\" button)", "maxius"),
     ("Quest 5: Ice Katana", "recompensa de \"Inferno Heart\" (quests do Yulgar e do Warlic)", "\"Inferno Heart\" reward (Yulgar's and Warlic's quests)", "drakonnan"),
     ("Quest 6: Unity of Life", "Tree of Destiny", "Tree of Destiny", "elemental"),
     ("Quest 6: Harmony of Solace", "Faust", "Faust", "orchestra"),
     ("Quest 6: Teamwork Observed", "Pactagonal Knights", "Pactagonal Knights", "cathedral"),
     ("Quest 6: Scroll of Enchantment", "Queen's Archsage", "Queen's Archsage", "goose"),
     ("Quest 8: Law of Nature", "Guardian Spirit", "Guardian Spirit", "elfhame"),
     ("Quest 8: Law of Time", "Kathool", "Kathool", "deepchaos"),
     ("Quest 8: Law of Gravity", "Shadowstone Support", "Shadowstone Support", "necrocavern"),
     ("Quest 8: Law of Relativity", "Reflecteract", "Reflecteract", "blackholesun"),
     ("Quest 8: Law of Conservation of Energy", "Tonitru", "Tonitru", "thunderfang"),
     ("Quest 8: Law of Low Drop Rates", "Red Dragon", "Red Dragon", "lair"),
     ("Quest 9: Lure of Order", "Faith's Fishin' Gear (Fishing rank 7)", "Faith's Fishin' Gear (Fishing rank 7)", "greenguardwest"),
     ("Quest 9: Quixotic Mana Essence", "Ultra Xiang", "Ultra Xiang", "mirrorportal"),
     ("Quest 9: Inversion Infusion", "Serepthys", "Serepthys", "yasaris")],
 2: [("Chaoroot", "Ledgermayne (ou Receipt of Swindle)", "Ledgermayne (or Receipt of Swindle)", "ledgermayne"),
     ("Chaotic War Essence", "Ultra Chaos Warlord", "Ultra Chaos Warlord", "chaosboss"),
     ("Chaorrupted Particles", "Chaorruption", "Chaorruption", "shadowgates"),
     ("Purified Raindrop", "Chaos Lord Lionfang", "Chaos Lord Lionfang", "stormtemple"),
     ("Suppressed Drows", "Drow Assassins", "Drow Assassins", "wardwarf"),
     ("Suppressed Undead", "inimigos", "enemies", "warundead"),
     ("Suppressed Horcs", "Horc Warriors", "Horc Warriors", "warhorc"),
     ("Suppressed Weavers", "Weaver Queen Hounds", "Weaver Queen Hounds", "weaverwar"),
     ("Acolyte's Braille", "Chaos Healer (Willow Creek)", "Chaos Healer (Willow Creek)", "newfinale"),
     ("Strength of Resilience", "Xyfrag", "Xyfrag", "thevoid"),
     ("Weapon Imprint", "Undead Raxgore", "Undead Raxgore", "doomvaultb")],
 3: [("Champion of Chaos", "Champion of Chaos (Drakath)", "Champion of Chaos (Drakath)", "ultradrakath")],
}
W[14] = {  # ArchPaladin (guia AQW World, quests do Artix)
 1: [("Stone Paladin Armor", "loja", "shop", "temple"),
     ("Exalted Paladin Seal", "loja, 500 mil de gold (Good rank 10)", "shop, 500k gold (Good rank 10)", "darkthronehub"),
     ("Undead Energy", "inimigos (precisa de \"A Loyal Follower\", do Artix)", "enemies (needs Artix's \"A Loyal Follower\")", "battleunderb"),
     ("Binky's Uni Horn", "Binky", "Binky", "doomvault"),
     ("Nightmare Kibble", "inimigos", "enemies", "thirdspell"),
     ("Feather of Paradise", "Bird of Paradise", "Bird of Paradise", "manor"),
     ("Shoelace of a Fallen Paladin", "inimigos", "enemies", "doomwood"),
     ("Eternity Flame", "Amia the Cult Leader", "Amia the Cult Leader", "fotia"),
     ("Innocence", "Dove (Hymn of Light)", "Dove (Hymn of Light)", "skytower"),
     ("Prayer of Salvation", "Ultra Alteon", "Ultra Alteon", "ultraalteon"),
     ("Paladaffodil", "Marsh Tree (Eden)", "Marsh Tree (Eden)", "marsh"),
     ("Spirit Lotus", "Lotus Spider (Eden)", "Lotus Spider (Eden)", "wanders"),
     ("Cyanoblossom", "Wisterrora (Eden)", "Wisterrora (Eden)", "gaiazor"),
     ("Radiant Magnolia", "Trolla Plany (Eden)", "Trolla Plany (Eden)", "bloodtusk"),
     ("Sacred Tome", "Adventus (Eden)", "Adventus (Eden)", "seraph"),
     ("Forbidden Demon Seal", "Malxas (Eden)", "Malxas (Eden)", "infernalspire")],
 3: [("Pyromancer Artifact", "Xan (3%)", "Xan (3%)", "xantown"),
     ("Zephyrus Manifesto", "Proto-Air ou Tempest Dracolich", "Proto-Air or Tempest Dracolich", "dragonheart"),
     ("Karok's Glaceran Gem", "Karok the Fallen", "Karok the Fallen", "northstar"),
     ("Crystallized Mana Catalyst", "Crystal Mana Construct", "Crystal Mana Construct", "downward"),
     ("Just The Perfect Stick", "Treant", "Treant", "farm")],
}
W[51] = {  # Hollowborn Oblivion Blade (AQWG)
 1: [("Fresh Soul e Unidentified 36", "Inquisitor Guards, quest \"Let's Make a Deal\", da Lae", "Inquisitor Guards, Lae's \"Let's Make a Deal\"", "citadel")],
 2: [("Unidentified 25", "\"The Assistant\" (1%), ou merge com Unmoulded Fiend Essence", "\"The Assistant\" (1%), or merge with Unmoulded Fiend Essence", "tercessuinotlim")],
 3: [("Diabolical Minion's Seed", "Diabolical Warlord (fim do mapa)", "Diabolical Warlord (end of map)", "lostruinswar"),
     ("4th Dimension Gem", "inimigos da quest \"Bring the Pain\", do Anubyx", "enemies in Anubyx's \"Bring the Pain\"", "blackholesun"),
     ("Celestial Seal", "Blessed Dragon", "Blessed Dragon", "goldenarena"),
     ("Death's Power", "Death (fim do mapa)", "Death (end of map)", "shadowattack")],
}
# complementos com joins confirmados nas páginas já lidas (AQWG e guias acima)
W[7].setdefault(0, []).append(("Merge da classe", "loja do Galanoth", "Galanoth's shop", "dragontown"))
W[8].setdefault(0, []).append(("Merge da classe", "loja da Sally", "Sally's shop", "necrotower"))
W[38] = {0: [("Iara Insignia", "diária \"Ultra Iara\"", "daily \"Ultra Iara\"", "ultraiara")]}
W[52] = {1: [("Avatar Tyndarius Insignia", "diária do Galanoth contra o Ultra Avatar Tyndarius", "Galanoth's daily against Ultra Avatar Tyndarius", "ultratyndarius")]}
W[53] = {1: [("Avatar Tyndarius Insignia", "diária do Galanoth contra o Ultra Avatar Tyndarius", "Galanoth's daily against Ultra Avatar Tyndarius", "ultratyndarius"),
             ("Fire Avatar Favour", "quest \"Avatar's Rage\"", "\"Avatar's Rage\" quest", "fireavatar")]}
W[55] = {1: [("Ultra Drago Insignia", "Ultra Drago", "Ultra Drago", "ultradrago")]}
W[39] = {2: [("Celestial Ether", "Aranx (30%)", "Aranx (30%)", "celestialarena"),
             ("Mortal Ether", "Death (20%)", "Death (20%)", "shadowattack"),
             ("Vital Ether", "Gaiazor (20%)", "Gaiazor (20%)", "gaiazor")],
         3: [("Fire Locus", "Drakonnan (30%)", "Drakonnan (30%)", "drakonnan")]}
W[49] = {2: [("Supreme Arcane Staff", "Ledgermayne (1%)", "Ledgermayne (1%)", "ledgermayne")]}
W[22] = {3: [("Carnax", "Carnax", "Carnax", "aqlesson"),
             ("Ultra Blood Titan", "Blood Titan", "Blood Titan", "bloodtitan"),
             ("Mutated Void Dragon", "Mutated Void Dragon", "Mutated Void Dragon", "bosschallenge"),
             ("Ultra Alteon", "Ultra Alteon", "Ultra Alteon", "ultraalteon")]}
W[46] = {}
