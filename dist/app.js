(() => {
  // src/config.js
  var CATS = { free: { n: "Free", c: "--free" }, member: { n: "Member", c: "--member" }, acs: { n: "ACS", c: "--acs" }, hero: { n: "HeroMart", c: "--hero" }, cal: { n: "Calend\xE1rio", c: "--cal" } };
  var STORE = { hero: "c\xF3digo do calend\xE1rio, HeroMart ou HeroPoints", acs: "vers\xE3o por AC" };
  var MODES = { farm: "Farm", solo: "Solo", ultra: "Ultras" };
  var TIERS = ["S", "A", "B", "C"];
  var HUB = "https://www.aqwhub.com/class-usage-guides/";
  var GLYPH = {
    phys: "M24 9 L27 26 L24 30 L21 26 Z",
    mag: "M24 9 L27 19 L37 19 L29 25 L32 35 L24 29 L16 35 L19 25 L11 19 L21 19 Z",
    mana: "M24 9 C30 17 33 22 33 27 A9 9 0 0 1 15 27 C15 22 18 17 24 9 Z",
    sup: "M21 11 H27 V20 H36 V26 H27 V35 H21 V26 H12 V20 H21 Z",
    dodge: "M12 30 C18 14 30 14 36 20 C28 18 22 22 18 32 Z",
    chrono: "M16 11 H32 L25 23 L32 35 H16 L23 23 Z"
  };
  var ICO = {
    inicio: "M12 3 L2.5 11.2 H5 V20 H10.2 V14 H13.8 V20 H19 V11.2 H21.5 Z",
    classes: "M12 2.5 L20 5.6 V12 C20 16.6 16.6 20 12 21.5 C7.4 20 4 16.6 4 12 V5.6 Z",
    ultras: "M12 2 C12.8 6.2 18.2 8.4 18.2 14.2 A6.2 6.2 0 0 1 5.8 14.2 C5.8 11.4 7.4 10 8 7.6 C9.8 8.6 10.8 9.6 11 11.6 C12.2 8.8 12.4 5.2 12 2 Z",
    enh: "M6.5 3 H17.5 L22 9.2 L12 21.5 L2 9.2 Z",
    itens: "M6 2 H18 V6 C18 9 15.5 10.6 14 12 C15.5 13.4 18 15 18 18 V22 H6 V18 C6 15 8.5 13.4 10 12 C8.5 10.6 6 9 6 6 Z",
    novidades: "M12 2 L14.6 8.9 L22 9.4 L16.3 14.2 L18.2 21.5 L12 17.5 L5.8 21.5 L7.7 14.2 L2 9.4 L9.4 8.9 Z"
  };
  var SECS = [["inicio", "sec_inicio"], ["classes", "sec_classes"], ["ultras", "sec_ultras"], ["enh", "sec_enh"], ["itens", "sec_items"], ["novidades", "sec_news"]];
  var SUBS = { classes: [["tier", "tab_tier"], ["todas", "tab_all"], ["comparar", "tab_cmp"]], ultras: [["ultras", "sub_teams"], ["montador", "tab_builder"]] };
  var SEC = { inicio: ["inicio"], classes: ["tier", "todas", "comparar"], ultras: ["ultras", "montador"], enh: ["enh"], itens: ["itens"], novidades: ["novidades"] };
  var TYIC = { new: "\u2726", rework: "\u2692", balance: "\u2696", skin: "\u2727", event: "\u23F3" };

  // src/data/class-types.json
  var class_types_default = {
    phys: {
      n: "F\xEDsico",
      farm: "Lucky|Valiance|Vim|Vainglory",
      solo: "Lucky|Valiance|Anima|Vainglory",
      ultra: "Lucky|Valiance|Forge|Penitence",
      awe: "Lucky + Awe Blast",
      rot: [
        [
          "Padr\xE3o de dano",
          "2 3 4 5 \xB7 2 3 4",
          "g",
          "Abra com a skill que aplica buff ou debuff, use o restante por recarga e guarde o 5 para quando os buffs estiverem ativos."
        ]
      ]
    },
    mag: {
      n: "M\xE1gico",
      farm: "Wizard|Valiance|Pneuma|Vainglory",
      solo: "Wizard|Valiance|Pneuma|Vainglory",
      ultra: "Wizard|Valiance|Forge|Penitence",
      awe: "Wizard + Awe Blast",
      rot: [
        [
          "Padr\xE3o m\xE1gico",
          "2 3 4 5 \xB7 2 3 4",
          "g",
          "Mantenha DoTs e debuffs ativos e solte o 5 quando o dano acumulado estiver no m\xE1ximo."
        ]
      ]
    },
    mana: {
      n: "M\xE1gico (mana)",
      farm: "Wizard|Elysium|Pneuma|Vainglory",
      solo: "Wizard|Valiance|Pneuma|Vainglory",
      ultra: "Wizard|Valiance|Forge|Penitence",
      awe: "Wizard + Health Vamp",
      rot: [
        [
          "Padr\xE3o de farm",
          "2 3 4 5 (spam)",
          "g",
          "Gasta muita mana: com Elysium d\xE1 para usar tudo por recarga sem parar."
        ]
      ]
    },
    sup: {
      n: "Suporte",
      farm: "Lucky|Valiance|Vim|Vainglory",
      solo: "Lucky|Valiance|Anima|Vainglory",
      ultra: "Lucky|Arcana's Concerto|Forge|Penitence",
      awe: "Lucky + Spiral Carve",
      rot: [
        [
          "Padr\xE3o de suporte",
          "3 \xB7 4 \xB7 2 2 \xB7 5",
          "g",
          "Aplique buffs e curas antes da luta, mantenha o debuff no boss e encaixe o dano entre as recargas."
        ]
      ]
    },
    dodge: {
      n: "Dodge",
      farm: "Lucky|Lacerate|Vim|Vainglory",
      solo: "Lucky|Lacerate|Vim|Vainglory",
      ultra: "Lucky|Valiance|Forge|Penitence",
      awe: "Lucky + Awe Blast",
      rot: [
        [
          "Padr\xE3o de dodge",
          "buff \xB7 2 3 \xB7 2 3 \xB7 5",
          "g",
          "Mantenha o buff de esquiva ativo antes de gastar as skills de dano."
        ]
      ]
    },
    chrono: {
      n: "Calend\xE1rio",
      farm: "Lucky|Dauntless|Vim|Lament",
      solo: "Lucky|Dauntless|Vim|Lament",
      ultra: "Lucky|Valiance|Forge|Penitence",
      awe: "Lucky + Awe Blast",
      rot: [
        [
          "Padr\xE3o de calend\xE1rio",
          "2 2 2 \xB7 4 \xB7 5",
          "g",
          "A maioria dos Chronomancers acumula stacks com a skill 2 (por isso Dauntless e Lacerate) e gasta no nuke."
        ]
      ]
    }
  };

  // src/data/classes.json
  var classes_default = [
    [
      "Legion Revenant",
      "free",
      "S",
      "A",
      "S",
      "mag",
      "DPS em \xE1rea e o melhor aplicador de Arcana's Concerto em ultras.",
      {
        ultra: "Wizard|Arcana's Concerto|Forge|Penitence",
        awe: "Wizard + Spiral Carve"
      }
    ],
    [
      "ArchPaladin",
      "free",
      "B",
      "A",
      "S",
      "sup",
      "Suporte com cura em grupo e redu\xE7\xE3o de dano do boss; presente em quase todo time de ultra.",
      {
        farm: "Lucky|Valiance|Vim|Avarice",
        solo: "Lucky|Valiance|Anima|Vainglory",
        ultra: "Lucky|Arcana's Concerto|Forge|Penitence",
        skills: [
          "Auto",
          "Commandment (\xE1rea, debuffs)",
          "Hymn of Light (cura em \xE1rea +DEF)",
          "Righteous Seal (-90% dano do alvo)",
          "Sacred Magic: Eden (nuke, dobra com o 4)"
        ],
        rot: [
          [
            "Rota\xE7\xE3o principal",
            "3 \u2192 4 \u2192 2 2 2 \u2192 5 \u2192 3 (cura) \u2192 4",
            "h",
            "Use 3 antes da luta, abra com 4, spam 2 at\xE9 o 4 quase acabar, solte 5 antes dele expirar, 3 quando precisar curar e repita."
          ],
          [
            "Champion Drakath",
            "Mesma rota\xE7\xE3o, com Lacerate \xB7 Forge \xB7 Penitence",
            "h",
            "Build espec\xEDfica do guia para essa luta."
          ]
        ],
        src: "archpaladin/"
      }
    ],
    [
      "Alpha Omega",
      "acs",
      "B",
      "B",
      "C",
      "phys",
      "H\xEDbrida de dano e cura leve: Double Strike enfraquece o alvo, Maul atordoa e Field Medic cura o grupo. Nota estimada a partir das skills.",
      {
        skills: [
          "Auto Attack",
          "Double Strike (-15% resist\xEAncia do alvo)",
          "Maul (stun de 3s)",
          "Field Medic (cura o grupo)",
          "Bunker Buster (dano verdadeiro, sempre crita)"
        ]
      }
    ],
    [
      "Blood Titan",
      "acs",
      "C",
      "A",
      "B",
      "phys",
      "Tanque que paga HP por skill: Crimson Shield reduz 80% do dano e as skills curam. Titan's Curse segura o boss. Nota estimada a partir das skills.",
      {
        skills: [
          "Gilded Crusher (auto, dano pelo seu HP)",
          "Titanic Smash (-60% dano do alvo)",
          "Titan's Fury (+30% dano no alvo)",
          "Titan's Curse (taunt de 4s)",
          "Blood Rage (+100% dano f\xEDsico)"
        ]
      }
    ],
    [
      "Dark Harbinger",
      "acs",
      "B",
      "B",
      "C",
      "phys",
      "Dano alto \xE0 custa de vida: Blood Price gasta 50% do HP para +125% de dano e Soul Leech devolve vida. Nota estimada a partir das skills.",
      {
        skills: [
          "Soul Breaker (auto)",
          "Soul Rend (mais dano com HP baixo)",
          "Soul Leech (dano e cura)",
          "Soul Pact (+50% defesa)",
          "Blood Price (+125% dano por 10s)"
        ]
      }
    ],
    [
      "Daimon",
      "acs",
      "A",
      "B",
      "C",
      "mag",
      "Dano m\xE1gico em \xE1rea (at\xE9 3 alvos) com cura de grupo e burn; \xF3timo para limpar mobs. Nota estimada a partir das skills.",
      {
        skills: [
          "Actual Attack (auto)",
          "BrainWave (3 alvos + burn)",
          "Mass Affect (cura e buff aleat\xF3rio)",
          "Shattered Reality (-40% dano dos alvos)",
          "Mind... BLOWN (3 alvos, +30% haste e crit)"
        ]
      }
    ],
    [
      "Drakel Warlord",
      "acs",
      "C",
      "B",
      "B",
      "phys",
      "Tanque f\xEDsico sem mana: Enter the Arena d\xE1 taunt e -50% de dano f\xEDsico, e Strengthened Strike empilha debuff. Nota estimada a partir das skills.",
      {
        skills: [
          "Drakel's Crushing Strike (auto)",
          "Strengthened Strike (debuff empilh\xE1vel)",
          "Raged Strike (stun em 3 alvos)",
          "Strikes of Expertise (pr\xF3ximos 2 autos cr\xEDtam)",
          "Enter the Arena (taunt e -50% dano f\xEDsico)"
        ]
      }
    ],
    [
      "Abyssal Angel",
      "acs",
      "A",
      "B",
      "C",
      "phys",
      "Dano em v\xE1rios alvos com DoT empilh\xE1vel; Flight e Crystallis Veil refor\xE7am esquiva, cr\xEDtico e defesa. Nota estimada a partir das skills.",
      {
        skills: [
          "Vice Bolt (auto, 3 alvos + DoT)",
          "Flight (+acerto e esquiva)",
          "Aphotic Overdrive (4 alvos, stun)",
          "Fallen's Judgement (4x Endurance + cura)",
          "Crystallis Veil (+25% resist\xEAncia, +15% crit)"
        ]
      }
    ],
    [
      "Scarlet Sorceress",
      "acs",
      "A",
      "B",
      "C",
      "mag",
      "Feiticeira de sangue: Sanguine Pulse acerta 3 alvos com DoC e anti-cura, Malevolence faz dano em \xE1rea e Crimson Ritual troca vida por +50% de dano m\xE1gico. Nota estimada a partir das skills.",
      {
        skills: [
          "Blood Lust (auto, cura no acerto)",
          "Sanguine Pulse (3 alvos, decay e anti-cura)",
          "Mirroring Arcane (3 alvos, stun e +20% haste)",
          "Malevolence (\xE1rea, cura e dano atrasado)",
          "Crimson Ritual (+50% dano m\xE1gico)"
        ]
      }
    ],
    [
      "Vindicator of They",
      "acs",
      "B",
      "B",
      "C",
      "mag",
      "Caster com DoT, roubo de vida e petrifica\xE7\xE3o; a skill 4 d\xE1 40% de resist\xEAncia quando o alvo resiste. Nota estimada a partir das skills.",
      {
        skills: [
          "Auto Attack",
          "Super Taster (DoT e -20% haste e esquiva)",
          "I Just Want Your Half (roubo de vida)",
          "We Want a Rock (petrifica por 3s)",
          "Mass Of Incandescent Gas (dano alto e DoT)"
        ]
      }
    ],
    [
      "Troll Spellsmith",
      "acs",
      "A",
      "B",
      "C",
      "mag",
      "Caster ofensivo que acumula Sigils: Energy Arc acerta 4 alvos e reduz haste, e Spellsmith Sigil cura e refor\xE7a o dano. Nota estimada a partir das skills.",
      {
        skills: [
          "Spellsmith Blade (auto, dano por Sigils)",
          "Energy Arc (4 alvos, reduz haste)",
          "Frostflame (stun e -20% dano do alvo)",
          "Sigil Overload (+10% dano por 15s)",
          "Spellsmith Sigil (cura e escudo)"
        ]
      }
    ],
    [
      "SkyGuard Grenadier",
      "acs",
      "B",
      "B",
      "C",
      "phys",
      "Dano f\xEDsico \xE0 dist\xE2ncia: Flashbang e Sleeping Gas aplicam debuffs e Reactive Grenade \xE9 um golpe forte que sempre crita. Nota estimada a partir das skills.",
      {
        skills: [
          "Bombard (auto \xE0 dist\xE2ncia)",
          "Flashbang (-20% dano e acerto do alvo)",
          "Sleeping Gas (-20% defesa, chance de stun)",
          "Reload (recupera toda a mana)",
          "Reactive Grenade (sempre crita)"
        ]
      }
    ],
    [
      "Royal Vampire Lord",
      "acs",
      "A",
      "B",
      "C",
      "mag",
      "Dano em at\xE9 3 alvos com cura: Devour Blood rouba vida e reduz o dano dos inimigos, e Aspect of The Bat d\xE1 +500% de haste e cr\xEDtico. Nota estimada a partir das skills.",
      {
        skills: [
          "Slash (auto, 3 alvos)",
          "Sonar Scream (alvos recebem +30% de dano)",
          "Devour Blood (cura e -50% dano dos alvos)",
          "Ghoul Gouge (3 alvos e DoT)",
          "Aspect of The Bat (+500% haste e cr\xEDtico)"
        ]
      }
    ],
    [
      "ShadowScythe General",
      "acs",
      "A",
      "A",
      "C",
      "mag",
      "Hybrid de \xE1rea com at\xE9 80% de resist\xEAncia: acerta at\xE9 6 alvos, acumula Consuming Shadows e fecha com Shadow Void. A wiki recomenda Lucky e Hybrid. Nota estimada a partir das skills.",
      {
        skills: [
          "Shadow Slam (auto, acumula Shadows)",
          "Shadow Blast (6 alvos, chance de petrificar)",
          "Bone Picker (6 alvos, buff acumul\xE1vel)",
          "Undead Rebirth (cura e anti-cura)",
          "Shadow Void (finalizador, sempre crita)"
        ]
      }
    ],
    [
      "Shadow Dragon Shinobi",
      "acs",
      "B",
      "B",
      "C",
      "dodge",
      "Ninja de DoT e esquiva: Shadow Kunai empilha veneno, Chi Heal cura e Flaming Dragon queima e anula o pr\xF3ximo golpe do alvo. Nota estimada a partir das skills.",
      {
        skills: [
          "Auto Attack",
          "Shadow Kunai (veneno de at\xE9 10 stacks)",
          "Chi Heal (cura e +50% Endurance)",
          "Shadow Soul (recupera mana, -80% dano)",
          "Flaming Dragon (queimadura e anula o pr\xF3ximo golpe)"
        ]
      }
    ],
    [
      "Silver Paladin",
      "acs",
      "B",
      "B",
      "B",
      "sup",
      "Paladino h\xEDbrido de cura e defesa: Healing Word cura 3 aliados, Exorcise causa 306% contra mortos-vivos e Divine Recovery pode deixar o time invulner\xE1vel. Nota estimada a partir das skills.",
      {
        skills: [
          "Auto Attack",
          "Abolish (dano e redu\xE7\xE3o de dano acumul\xE1vel)",
          "Healing Word (cura voc\xEA e 2 aliados)",
          "Exorcise (3 alvos, 306% contra mortos-vivos)",
          "Blinding Light (4 alvos, -50% acerto)"
        ]
      }
    ],
    [
      "Legion Paladin",
      "hero",
      "B",
      "A",
      "B",
      "sup",
      "H\xEDbrida: acumula Souls para dano e converte em Spirits para curar, taunt e debuffs. As Design Notes indicam Lucky e Hybrid.",
      {
        awe: "Lucky + Spiral Carve",
        skills: [
          "Desecration (auto, d\xE1 Soul)",
          "Blasphemous Battleaxe (dano por Souls, Defiled com Spirits)",
          "Soul Convertor (cura 7 aliados, Souls viram Spirits)",
          "Incantation of Sin (150%, taunt com Spirits)",
          "Shadowblight (350%, DoT que reduz resist\xEAncias)"
        ],
        rot: [
          [
            "Rota\xE7\xE3o com Spirits",
            "auto at\xE9 10+ Souls \u2192 3 \u2192 2 \xB7 4 \xB7 5",
            "g",
            "Acumule Souls com o auto e o 2, converta em Spirits com o 3 e ent\xE3o use 2, 4 e 5 para ganhar os debuffs, o taunt e o DoT. Rota\xE7\xE3o deduzida das descri\xE7\xF5es, sem guia de comunidade."
          ]
        ]
      }
    ],
    [
      "Lord of Order",
      "free",
      "B",
      "A",
      "S",
      "sup",
      "Suporte e taunt; aplica Quixotic e segura stacks de Order em ultras.",
      {
        ultra: "Lucky|Arcana's Concerto|Forge|Absolution",
        awe: "Lucky + Awe Blast"
      }
    ],
    [
      "Chaos Avenger",
      "free",
      "B",
      "S",
      "S",
      "phys",
      "Dano f\xEDsico pesado e taunt; um dos melhores tanques de ultra e \xF3timo para solo.",
      {
        awe: "Lucky + Awe Blast"
      }
    ],
    [
      "Void Highlord",
      "free",
      "S",
      "A",
      "B",
      "phys",
      "Cl\xE1ssico do farm e do solo: crit alto e fica mais forte com HP baixo.",
      {
        farm: "Lucky|Smite|Vim|Vainglory",
        solo: "Lucky|Dauntless|Anima|Vainglory",
        skills: [
          "Contract (auto)",
          "Shackle",
          "Highlord's Gaze",
          "Unshackled",
          "Armageddon (nuke)"
        ],
        rot: [
          [
            "Dano geral",
            "2345 \xB7 234 \xB7 234 \xB7 2345",
            "h",
            "Spam 2, 3 e 4 por recarga e sempre use o 4 antes do 5 para o nuke sair com o buff."
          ],
          [
            "Boss que bate forte",
            "5234 \xB7 234 \xB7 234 \xB7 2345",
            "h",
            "Comece pelo 5 para pegar os buffs defensivos logo de cara."
          ],
          [
            "Boss muito forte",
            "2 3 5 (sem o 4)",
            "h",
            "Mant\xE9m a cura do auto e as defesas do Shackle."
          ],
          [
            "Com Dauntless",
            "2 3 4 at\xE9 ~500 HP \xB7 depois spam 2 e 5",
            "h",
            "Fica em Shackled, derruba o pr\xF3prio HP e passa a spammar 2 e 5."
          ]
        ],
        src: "void-highlord/"
      }
    ],
    [
      "Verus DoomKnight",
      "free",
      "A",
      "S",
      "A",
      "phys",
      "Solo excelente com dano sustentado; em grupo vira burst com Ravenous.",
      {
        solo: "Lucky|Dauntless|Anima|Vainglory",
        ultra: "Lucky|Ravenous|Forge|Penitence",
        skills: [
          "Necrotic Blade (auto)",
          "Soul Fracture (-defesa)",
          "Life Carve",
          "Doom Spikes",
          "Unleash Doom"
        ],
        rot: [
          [
            "Solo",
            "2 \u2192 234 \xB7 234 \u2026 \u2192 5 com 10 stacks",
            "h",
            "Abra com 2 para baixar a defesa, repita 234 at\xE9 10 stacks de Doom e ative o 5. Gaste Darkness no 3 (defesa) ou no 2 (crit)."
          ]
        ],
        src: "verus-doomknight/"
      }
    ],
    [
      "Dragon of Time",
      "free",
      "A",
      "S",
      "B",
      "mag",
      "Classe do /timeinn: sustain alto no solo e boa no farm.",
      {
        farm: "Wizard|Ravenous|Pneuma|Vainglory",
        solo: "Wizard|Valiance|Pneuma|Vainglory",
        awe: "Healer ou Wizard + Health Vamp (farm) / Awe Blast (solo)",
        rot: [
          [
            "Farm",
            "3 4 5",
            "c",
            "Spam 3, 4 e 5."
          ],
          [
            "Solo",
            "2 3 5 4",
            "c",
            "Repetir o ciclo; 2 primeiro para os buffs."
          ]
        ]
      }
    ],
    [
      "Arcana Invoker",
      "free",
      "S",
      "A",
      "B",
      "mag",
      "Endgame de Darkon com ciclo de cartas; um dos maiores DPS do jogo.",
      {
        farm: "Wizard|Elysium|Examen|Vainglory",
        solo: "Wizard|Ravenous|Examen|Lament",
        skills: [
          "Auto",
          "The Beginning and the End",
          "Arcana Invocation",
          "Arcana Revocation",
          "One with the Cycle"
        ],
        rot: [
          [
            "Ciclo completo",
            "2 \u2192 3 (4/5 entre) \u2192 Judgement \u2192 2 \u2192 spam 3 4 5 \u2192 2",
            "h",
            "Comece com 2, priorize 3 para chegar no Judgement, use 2 para entrar em The World, spam 3-4-5 e use 2 de novo quando o World estiver acabando."
          ]
        ],
        src: "arcana-invoker/"
      }
    ],
    [
      "ArchMage",
      "free",
      "S",
      "S",
      "B",
      "mana",
      "Gasta mana muito r\xE1pido; vira top farmer com Elysium e top solo com Acheron.",
      {
        solo: "Wizard|Acheron|Pneuma|Penitence",
        rot: [
          [
            "Solo (Acheron ou Valiance)",
            "3542423423 \xB7 542423 (repetir)",
            "c",
            "Combo compartilhado por jogadores; sem Acheron, use Valiance."
          ]
        ]
      }
    ],
    [
      "Yami no Ronin",
      "free",
      "A",
      "A",
      "B",
      "phys",
      "Burst f\xEDsico r\xE1pido para solo e farm de curto alcance.",
      {
        awe: "Lucky + Awe Blast"
      }
    ],
    [
      "Martial Artist",
      "free",
      "C",
      "A",
      "C",
      "dodge",
      "Dodge e auto-ataques r\xE1pidos; ping alto atrapalha.",
      {
        solo: "Lucky|Ravenous|Vim|Lament",
        skills: [
          "Pummel (auto)",
          "Frogzard's Crushing Jaw",
          "Gorillaphant Beatdown",
          "Soaring Dragon",
          "Concentration"
        ],
        rot: [
          [
            "Dano m\xE1ximo",
            "5 3 4 \xB7 32 32 34 \xB7 23 23",
            "h",
            "Combos com muito 3 combinam com Ravenous."
          ],
          [
            "Dodge simples",
            "4 2 5 3 2 3 \xB7 loop 4 2 3 2 3 (5 por recarga)",
            "h",
            "Vers\xE3o f\xE1cil para n\xE3o morrer."
          ]
        ],
        src: "martial-artist/"
      }
    ],
    [
      "Blaze Binder",
      "free",
      "A",
      "B",
      "C",
      "mag",
      "Farmer m\xE1gico de \xE1rea.",
      {}
    ],
    [
      "Kathool Adept",
      "free",
      "A",
      "B",
      "B",
      "sup",
      "Classe de anivers\xE1rio de 18 anos: farmer e debuffer com stacks de Madness e pet tent\xE1culo.",
      {},
      1
    ],
    [
      "StoneCrusher",
      "free",
      "C",
      "B",
      "A",
      "sup",
      "Suporte de cura com DoT/HoT; usa Absolution em ultras.",
      {
        ultra: "Lucky|Valiance|Forge|Absolution",
        awe: "Lucky + Spiral Carve"
      }
    ],
    [
      "Legion DoomKnight",
      "free",
      "B",
      "A",
      "A",
      "phys",
      "Dano em grupo com Decay em ultras; anula a cura do Dage.",
      {}
    ],
    [
      "Exalted Harbinger",
      "free",
      "B",
      "A",
      "B",
      "phys",
      "Joga com HP baixo; \xF3timo com Dauntless.",
      {
        solo: "Lucky|Dauntless|Anima|Vainglory"
      }
    ],
    [
      "Exalted Soul Cleaver",
      "free",
      "C",
      "A",
      "B",
      "phys",
      "Solo resistente com suporte leve.",
      {}
    ],
    [
      "Legion SwordMaster Assassin",
      "free",
      "C",
      "A",
      "C",
      "dodge",
      "Dodge para solo.",
      {}
    ],
    [
      "SwordMaster",
      "free",
      "C",
      "B",
      "C",
      "dodge",
      "Dodge e solo intermedi\xE1rio.",
      {}
    ],
    [
      "Infinite Legion Dark Caster",
      "free",
      "A",
      "C",
      "C",
      "mana",
      "Farm de \xE1rea.",
      {}
    ],
    [
      "Archfiend",
      "free",
      "A",
      "B",
      "C",
      "mag",
      "Farmer da Nation.",
      {}
    ],
    [
      "King's Echo",
      "free",
      "B",
      "A",
      "B",
      "phys",
      "Solo e tanque; o 3 exige cuidado em grupo.",
      {}
    ],
    [
      "Collector",
      "free",
      "C",
      "B",
      "B",
      "sup",
      "Solo e tanque.",
      {}
    ],
    [
      "Shaman",
      "free",
      "A",
      "C",
      "C",
      "mag",
      "Farm de \xE1rea para o come\xE7o do jogo.",
      {}
    ],
    [
      "Master Ranger",
      "free",
      "A",
      "C",
      "C",
      "phys",
      "Farm de \xE1rea para o come\xE7o do jogo.",
      {}
    ],
    [
      "Dark Lord",
      "free",
      "B",
      "B",
      "C",
      "mag",
      "Farm e solo intermedi\xE1rios.",
      {}
    ],
    [
      "Vampire Lord",
      "free",
      "B",
      "B",
      "C",
      "phys",
      "Farm e solo com lifesteal no in\xEDcio do jogo.",
      {}
    ],
    [
      "Dragonslayer General",
      "free",
      "C",
      "B",
      "B",
      "phys",
      "Taunt alternativo para ultras e solo.",
      {}
    ],
    [
      "Chaos Slayer",
      "free",
      "C",
      "B",
      "C",
      "phys",
      "Forte s\xF3 contra monstros Chaos. Reworkada em 2025.",
      {}
    ],
    [
      "Necromancer",
      "free",
      "B",
      "B",
      "C",
      "mana",
      "Pet e DoTs; revisada em 2025.",
      {}
    ],
    [
      "Imperial Chunin",
      "free",
      "B",
      "C",
      "C",
      "phys",
      "Farm cedo, depois de Vath/Kitsune.",
      {}
    ],
    [
      "Frostval Barbarian",
      "free",
      "B",
      "B",
      "C",
      "sup",
      "Farm, solo e suporte; usado no time do Exaltia.",
      {}
    ],
    [
      "DragonSoul Shinobi",
      "free",
      "C",
      "B",
      "C",
      "dodge",
      "Solo com esquiva.",
      {}
    ],
    [
      "Ninja",
      "free",
      "C",
      "B",
      "C",
      "dodge",
      "Dodge b\xE1sico.",
      {}
    ],
    [
      "Pyromancer",
      "free",
      "C",
      "B",
      "C",
      "mag",
      "Pr\xE9-requisito do Blaze Binder (rank 10).",
      {}
    ],
    [
      "Cryomancer",
      "free",
      "C",
      "B",
      "C",
      "mag",
      "Solo inicial.",
      {}
    ],
    [
      "Lycan",
      "free",
      "C",
      "B",
      "C",
      "phys",
      "Solo no come\xE7o do jogo.",
      {}
    ],
    [
      "Bard",
      "free",
      "C",
      "C",
      "B",
      "sup",
      "Suporte de buffs; revisada em 2025.",
      {}
    ],
    [
      "Arachnomancer",
      "free",
      "C",
      "C",
      "B",
      "sup",
      "Suporte.",
      {}
    ],
    [
      "Northlands Monk",
      "free",
      "C",
      "B",
      "C",
      "sup",
      "Solo e suporte iniciais.",
      {}
    ],
    [
      "Blood Sorceress",
      "free",
      "B",
      "C",
      "C",
      "mag",
      "Farm inicial; dif\xEDcil de conseguir cedo.",
      {}
    ],
    [
      "Oracle",
      "free",
      "C",
      "B",
      "C",
      "sup",
      "Uma das primeiras classes \xFAteis.",
      {}
    ],
    [
      "Enforcer",
      "free",
      "C",
      "B",
      "C",
      "phys",
      "Solo inicial.",
      {}
    ],
    [
      "Dragonslayer",
      "free",
      "C",
      "B",
      "C",
      "phys",
      "Solo inicial.",
      {}
    ],
    [
      "Healer",
      "free",
      "C",
      "C",
      "C",
      "sup",
      "Classe inicial de cura.",
      {}
    ],
    [
      "Mage",
      "free",
      "C",
      "C",
      "C",
      "mag",
      "Classe inicial de farm.",
      {}
    ],
    [
      "Rogue",
      "free",
      "C",
      "C",
      "C",
      "dodge",
      "Classe inicial; arriscada.",
      {}
    ],
    [
      "Thief of Hours",
      "free",
      "C",
      "C",
      "C",
      "phys",
      "Pr\xE9-requisito do Dragon of Time; obtenha, mas n\xE3o use.",
      {}
    ],
    [
      "Lich",
      "member",
      "A",
      "A",
      "B",
      "mag",
      "Lan\xE7ada em 2025; sazonal (sexta-feira 13) para quem n\xE3o \xE9 member.",
      {}
    ],
    [
      "Legendary Elemental Warrior",
      "member",
      "A",
      "B",
      "C",
      "phys",
      "Muito r\xE1pido em salas com dois monstros (ex.: sevencircleswar).",
      {
        farm: "Lucky|Valiance|Vim|Avarice",
        solo: "Lucky|Dauntless|Anima|Vainglory",
        skills: [
          "Blizzard (passiva)",
          "Elemental Invocation",
          "Blaze",
          "Stoneskin",
          "Voltaic Overlord"
        ],
        rot: [
          [
            "Combo inicial",
            "2 5 3 2 3 4",
            "h",
            "O guia sugere come\xE7ar por este combo e ajustar conforme o mapa."
          ]
        ],
        src: "legendary-elemental-warrior/"
      }
    ],
    [
      "Glacial Berserker",
      "member",
      "A",
      "B",
      "C",
      "phys",
      "Farmer de \xE1rea recomendado em guias de boss farm.",
      {
        farm: "Lucky|Valiance|Anima|Avarice"
      }
    ],
    [
      "DeathKnight Lord",
      "member",
      "B",
      "A",
      "B",
      "phys",
      "Taunt alternativo em ultras; sem daily desde 2025.",
      {}
    ],
    [
      "Naval Commander",
      "member",
      "C",
      "B",
      "A",
      "sup",
      "Tanque com taunt ideal para Champion Drakath; reworkada em 2025.",
      {}
    ],
    [
      "Sentinel",
      "member",
      "C",
      "B",
      "B",
      "sup",
      "Solo e tanque; sazonal.",
      {}
    ],
    [
      "Undead Slayer",
      "member",
      "B",
      "B",
      "C",
      "phys",
      "Forte s\xF3 contra Undead.",
      {}
    ],
    [
      "Paladin",
      "member",
      "C",
      "B",
      "C",
      "sup",
      "Forte s\xF3 contra Undead.",
      {}
    ],
    [
      "Evolved Pumpkin Lord",
      "member",
      "C",
      "B",
      "C",
      "mag",
      "Solo sazonal.",
      {}
    ],
    [
      "Chrono Assassin",
      "member",
      "C",
      "B",
      "C",
      "dodge",
      "Dodge; dif\xEDcil de conseguir.",
      {}
    ],
    [
      "Beastmaster",
      "member",
      "C",
      "B",
      "C",
      "dodge",
      "Dodge com pets.",
      {}
    ],
    [
      "Blood Ancient",
      "member",
      "C",
      "B",
      "C",
      "dodge",
      "Dodge arriscado.",
      {}
    ],
    [
      "LightCaster",
      "acs",
      "S",
      "B",
      "C",
      "phys",
      "Um dos farmers mais r\xE1pidos; combina com Smite.",
      {
        farm: "Lucky|Smite|Vim|Vainglory"
      }
    ],
    [
      "Chrono ShadowSlayer",
      "acs",
      "B",
      "A",
      "B",
      "chrono",
      "Pistoleiro do tempo: dano alto e modo Gunslinger.",
      {
        farm: "Lucky|Valiance|Vim|Lament",
        solo: "Lucky|Valiance|Vim|Lament",
        ultra: "Lucky|Arcana's Concerto|Forge|Lament",
        skills: [
          "Fire! (auto)",
          "Reload (Gunslinger com 4+ Rift)",
          "Tracer Rounds (dodge)",
          "FMJ Rounds (dano principal)",
          "Silver Bullet (nuke)"
        ],
        rot: [
          [
            "DPS padr\xE3o",
            "4 4 4 4 4 4 5 2",
            "h",
            "Rota\xE7\xE3o base com Temporal Rift."
          ],
          [
            "Dodge",
            "3 \u2192 4 3 \u2192 4 3 \u2192 4 5 2",
            "h",
            "Espere um dodge ou erro antes de cada trecho."
          ],
          [
            "Ultras",
            "DPS padr\xE3o, trocando um 4 por 3 quando precisar de cura",
            "h",
            "Ex.: Ultra Darkon."
          ]
        ],
        src: "chrono-shadow-slayer/"
      }
    ],
    [
      "ShadowStalker of Time",
      "acs",
      "A",
      "A",
      "B",
      "chrono",
      "Variante AC da classe de calend\xE1rio; crit alto com Vim.",
      {
        farm: "Lucky|Smite|Vim|Vainglory",
        solo: "Lucky|Dauntless|Vim|Vainglory",
        skills: [
          "Rift of Shadows (auto)",
          "Exude/Devour (DoT/HoT)",
          "Vendetta/Umbral Stigma",
          "Silhouette/Shadow Warp (dodge, taunta)",
          "Temporal Eclipse (haste e crit)"
        ],
        rot: [
          [
            "Solo com dodge",
            "4 2 3 5 2 3",
            "h",
            "Espere o 5 acabar antes de repetir."
          ],
          [
            "Solo s\xF3 dano",
            "3 2 5 4 3 2",
            "h",
            "Sem foco em esquiva."
          ],
          [
            "Chainkill",
            "4235232 \xB7 ap\xF3s respawn 435232",
            "h",
            "Para matar o mesmo boss v\xE1rias vezes."
          ]
        ],
        src: "shadow-stalker-of-time/"
      }
    ],
    [
      "Necrotic Chronomancer",
      "acs",
      "A",
      "B",
      "C",
      "chrono",
      "Farm f\xE1cil com spam de skills.",
      {
        rot: [
          [
            "Farm",
            "2 3 4 (spam) \xB7 5 com HP baixo",
            "c",
            "Dica de jogadores."
          ]
        ]
      }
    ],
    [
      "Ultra OmniKnight",
      "acs",
      "A",
      "B",
      "C",
      "mana",
      "Ganha muito com Elysium.",
      {}
    ],
    [
      "SwordMaster Assassin",
      "acs",
      "C",
      "A",
      "C",
      "dodge",
      "Vers\xE3o AC do SwordMaster Assassin.",
      {}
    ],
    [
      "Abyssal Angel's Shadow",
      "acs",
      "A",
      "B",
      "C",
      "mag",
      "Farm e solo da Nation.",
      {}
    ],
    [
      "Berserker",
      "acs",
      "C",
      "B",
      "C",
      "phys",
      "Arriscada; exige habilidade.",
      {}
    ],
    [
      "Infinity Titan",
      "hero",
      "C",
      "B",
      "A",
      "sup",
      "Skin do StoneCrusher: mesmas skills, nova arte.",
      {
        ultra: "Lucky|Valiance|Forge|Absolution",
        awe: "Lucky + Spiral Carve"
      }
    ],
    [
      "Archivist of Time",
      "hero",
      "B",
      "A",
      "B",
      "chrono",
      "Calend\xE1rio 2026: sem auto-ataque e 9 combina\xE7\xF5es de Index.",
      {
        farm: "Wizard|Valiance|Pneuma|Lament",
        solo: "Wizard|Valiance|Pneuma|Lament",
        ultra: "Wizard|Arcana's Concerto|Forge|Penitence",
        rot: [
          [
            "Estrutura",
            "Lorebook of Beginnings \u2192 combina\xE7\xE3o de Index",
            "g",
            "Sempre abra com o Lorebook; cada Index muda conforme o Index ativo (dano, crit, defesa ou cura)."
          ]
        ]
      },
      1
    ],
    [
      "ShadowWeaver of Time",
      "hero",
      "B",
      "A",
      "A",
      "chrono",
      "Calend\xE1rio com taunt e dano; tanque do Ultra Tyndarius.",
      {}
    ],
    [
      "Timeless Chronomancer",
      "acs",
      "C",
      "A",
      "C",
      "chrono",
      "Para bosses; n\xE3o use para farm de mobs. Tem vers\xE3o AC e vers\xE3o Merge.",
      {
        solo: "Lucky|Dauntless|Anima|Vainglory",
        skills: [
          "Corrupted Sand Strike (auto)",
          "Sand Rift (stacks)",
          "Hourglass Inversion (cura)",
          "Corruption Through Time (buff)",
          "Temporal Collapse (nuke)"
        ],
        rot: [
          [
            "Solo",
            "4 2 2 2 4 2 5 3",
            "h",
            "Em bosses, solte o nuke com 3 stacks de Rift."
          ]
        ],
        src: "timeless-chronomancer/"
      }
    ],
    [
      "Continuum Chronomancer",
      "hero",
      "B",
      "B",
      "A",
      "chrono",
      "Suporte e dano em times de ultra.",
      {
        ultra: "Lucky|Arcana's Concerto|Forge|Penitence"
      }
    ],
    [
      "Paladin Chronomancer",
      "hero",
      "C",
      "B",
      "A",
      "sup",
      "Substitui o ArchPaladin como curandeiro em ultras.",
      {}
    ],
    [
      "PaladinSlayer",
      "hero",
      "B",
      "A",
      "B",
      "phys",
      "Rework de ago/2026: Detect Living em 20 stacks d\xE1 +500% de crit.",
      {},
      1
    ],
    [
      "CardClasher",
      "hero",
      "B",
      "B",
      "C",
      "chrono",
      "Rework de 2026: cartas aleat\xF3rias viram buffs, debuffs ou dano.",
      {},
      1
    ],
    [
      "Psionic Mindbreaker",
      "hero",
      "B",
      "B",
      "C",
      "mag",
      "Solo e farm intermedi\xE1rios.",
      {}
    ],
    [
      "Firelord Summoner",
      "hero",
      "A",
      "C",
      "C",
      "mag",
      "Farmer com invoca\xE7\xF5es.",
      {}
    ],
    [
      "Mythic Elemental Warrior",
      "hero",
      "C",
      "B",
      "B",
      "phys",
      "Vers\xE3o HeroMart do Legendary Elemental Warrior.",
      {}
    ],
    [
      "Brutal Berserker",
      "hero",
      "C",
      "B",
      "C",
      "phys",
      "Vers\xE3o HeroMart do Berserker.",
      {}
    ],
    [
      "Chronomancer Prime",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "Vers\xE3o atual do Chronomancer original, com rifts e nuke de at\xE9 4 stacks.",
      {
        solo: "Lucky|Dauntless|Anima|Vainglory",
        farm: "Lucky|Lacerate|Anima|Vainglory",
        skills: [
          "Auto",
          "Temporal Strike (acumula Rift)",
          "Rift Inversion (cura + 15% haste)",
          "Rift Collapse (nuke, at\xE9 4 rifts)",
          "Rift Burn (DoT, -15% dodge)"
        ],
        rot: [
          [
            "Com Dauntless ou suporte",
            "5 2 2 2 2 4",
            "h",
            "Evite o 3, porque voc\xEA j\xE1 tem haste. Diminua os 2 se precisar."
          ],
          [
            "Com Lacerate",
            "(5) 3 2 2 2 2 4",
            "h",
            "O 5 vira opcional, j\xE1 que o Lacerate reduz o dodge do alvo; o 3 d\xE1 a haste."
          ]
        ],
        src: "chronomancer-prime/"
      }
    ],
    [
      "Chronomancer",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "A primeira classe de calend\xE1rio.",
      {
        like: "Chronomancer Prime"
      }
    ],
    [
      "ChronoCorruptor",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "Calend\xE1rio antigo; pr\xE9-requisito de algumas quests.",
      {}
    ],
    [
      "Chrono Chaorruptor",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "Mesmas skills do ChronoCorruptor.",
      {
        like: "ChronoCorruptor"
      }
    ],
    [
      "TimeKiller",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "Calend\xE1rio 2013.",
      {}
    ],
    [
      "TimeKeeper",
      "hero",
      "C",
      "B",
      "C",
      "chrono",
      "Mesmas skills do TimeKiller.",
      {
        like: "TimeKiller"
      }
    ],
    [
      "ChronoCommander",
      "hero",
      "C",
      "B",
      "B",
      "phys",
      "Calend\xE1rio 2014: tanque corpo a corpo (stat model Tank Melee).",
      {
        awe: "Fighter + Awe Blast"
      }
    ],
    [
      "Chrono Commandant",
      "hero",
      "C",
      "B",
      "B",
      "phys",
      "Mesmas skills do ChronoCommander.",
      {
        like: "ChronoCommander"
      }
    ],
    [
      "Chrono DragonKnight",
      "hero",
      "B",
      "B",
      "C",
      "mag",
      "Calend\xE1rio 2015: caster ofensivo.",
      {}
    ],
    [
      "Chrono DataKnight",
      "hero",
      "B",
      "B",
      "C",
      "mag",
      "Mesmas skills do Chrono DragonKnight.",
      {
        like: "Chrono DragonKnight"
      }
    ],
    [
      "Infinity Knight",
      "hero",
      "C",
      "B",
      "C",
      "mag",
      "Calend\xE1rio 2016: caster ofensivo h\xEDbrido.",
      {
        awe: "Hybrid + Awe Blast"
      }
    ],
    [
      "Interstellar Knight",
      "hero",
      "C",
      "B",
      "C",
      "mag",
      "Mesmas skills do Infinity Knight.",
      {
        like: "Infinity Knight"
      }
    ],
    [
      "ShadowWalker of Time",
      "hero",
      "B",
      "A",
      "A",
      "chrono",
      "Calend\xE1rio 2017; mesmas skills do ShadowWeaver e do ShadowStalker.",
      {
        like: "ShadowStalker of Time"
      }
    ],
    [
      "Empyrean Chronomancer",
      "acs",
      "B",
      "A",
      "B",
      "chrono",
      "Crit consistente e recargas r\xE1pidas; \xF3tima em grupo com Valiance.",
      {
        solo: "Lucky|Dauntless|Anima|Lament",
        farm: "Lucky|Valiance|Anima|Vainglory",
        ultra: "Lucky|Valiance|Forge|Penitence",
        skills: [
          "Time Strike (auto)",
          "Eternal Deadlock",
          "The Fourth Dimension",
          "Speed Abrasion (nuke)",
          "Taking Eternity (buff/HoT)"
        ],
        rot: [
          [
            "Grupo",
            "5 2 \xB7 3 2 3 2 3 2 5 2 3 4",
            "h",
            "Abre com 5-2 e aplica o buff The Fourth Dimension."
          ],
          [
            "Solo (crit constante)",
            "5 2 \xB7 3 2 3 2 3 2 3 2 4",
            "h",
            "Abre com 5-2 e aplica o buff Enter Infinity."
          ]
        ],
        src: "empyrean-chronomancer/"
      }
    ],
    [
      "Eternal Chronomancer",
      "hero",
      "B",
      "A",
      "B",
      "chrono",
      "Calend\xE1rio 2018; mesmas skills do Empyrean e do Immortal.",
      {
        like: "Empyrean Chronomancer"
      }
    ],
    [
      "Immortal Chronomancer",
      "acs",
      "B",
      "A",
      "B",
      "chrono",
      "Vers\xE3o AC do Eternal Chronomancer.",
      {
        like: "Empyrean Chronomancer"
      }
    ],
    [
      "Corrupted Chronomancer",
      "hero",
      "C",
      "A",
      "C",
      "chrono",
      "Calend\xE1rio 2019; usa pet de ampulheta. Mesmas skills do Timeless.",
      {
        like: "Timeless Chronomancer"
      }
    ],
    [
      "Underworld Chronomancer",
      "hero",
      "C",
      "A",
      "C",
      "chrono",
      "Calend\xE1rio 2020; variante do Corrupted Chronomancer.",
      {
        like: "Timeless Chronomancer"
      }
    ],
    [
      "Overworld Chronomancer",
      "acs",
      "C",
      "A",
      "C",
      "chrono",
      "Vers\xE3o AC/Merge da fam\xEDlia do Timeless.",
      {
        like: "Timeless Chronomancer"
      }
    ],
    [
      "Nechronomancer",
      "hero",
      "A",
      "B",
      "C",
      "chrono",
      "Calend\xE1rio 2021 (Power Melee); mesmas skills do Necrotic Chronomancer.",
      {
        like: "Necrotic Chronomancer"
      }
    ],
    [
      "Quantum Chronomancer",
      "hero",
      "B",
      "B",
      "A",
      "chrono",
      "Calend\xE1rio 2022; usado no setup mais r\xE1pido do Ultra Nulgath.",
      {
        like: "Continuum Chronomancer"
      }
    ],
    [
      "Obsidian Paladin Chronomancer",
      "hero",
      "C",
      "B",
      "A",
      "sup",
      "Mesmas skills do Paladin Chronomancer.",
      {
        like: "Paladin Chronomancer"
      }
    ],
    [
      "Chrono ShadowHunter",
      "hero",
      "B",
      "A",
      "B",
      "chrono",
      "Calend\xE1rio 2024; mesmas skills do Chrono ShadowSlayer.",
      {
        like: "Chrono ShadowSlayer"
      }
    ],
    [
      "Phantom Chronomancer",
      "hero",
      "B",
      "B",
      "C",
      "mag",
      "Calend\xE1rio 2025 (Power Caster); reworkada em 2025.",
      {}
    ],
    [
      "Phantasm Chronomancer",
      "hero",
      "B",
      "B",
      "C",
      "mag",
      "Mesmas skills do Phantom Chronomancer.",
      {
        like: "Phantom Chronomancer"
      }
    ],
    [
      "Archivist of Temporis",
      "hero",
      "B",
      "A",
      "B",
      "chrono",
      "Calend\xE1rio 2026; mesmas skills do Archivist of Time.",
      {
        like: "Archivist of Time"
      }
    ]
  ];

  // src/data/calendar-families.json
  var calendar_families_default = [
    [
      "Chronomancer",
      "Chronomancer Prime"
    ],
    [
      "ChronoCorruptor",
      "Chrono Chaorruptor"
    ],
    [
      "TimeKiller",
      "TimeKeeper"
    ],
    [
      "ChronoCommander",
      "Chrono Commandant"
    ],
    [
      "Chrono DragonKnight",
      "Chrono DataKnight"
    ],
    [
      "Infinity Knight",
      "Interstellar Knight"
    ],
    [
      "ShadowWalker of Time",
      "ShadowStalker of Time",
      "ShadowWeaver of Time"
    ],
    [
      "Eternal Chronomancer",
      "Immortal Chronomancer",
      "Empyrean Chronomancer"
    ],
    [
      "Corrupted Chronomancer",
      "Underworld Chronomancer",
      "Timeless Chronomancer",
      "Overworld Chronomancer"
    ],
    [
      "Nechronomancer",
      "Necrotic Chronomancer"
    ],
    [
      "Continuum Chronomancer",
      "Quantum Chronomancer"
    ],
    [
      "Paladin Chronomancer",
      "Obsidian Paladin Chronomancer"
    ],
    [
      "Chrono ShadowSlayer",
      "Chrono ShadowHunter"
    ],
    [
      "Phantom Chronomancer",
      "Phantasm Chronomancer"
    ],
    [
      "Archivist of Time",
      "Archivist of Temporis"
    ]
  ];

  // src/data/calendar-years.json
  var calendar_years_default = {
    TimeKiller: 2013,
    TimeKeeper: 2013,
    ChronoCommander: 2014,
    "Chrono DragonKnight": 2015,
    "Infinity Knight": 2016,
    "ShadowWalker of Time": 2017,
    "ShadowWeaver of Time": 2017,
    "Eternal Chronomancer": 2018,
    "Corrupted Chronomancer": 2019,
    "Underworld Chronomancer": 2020,
    Nechronomancer: 2021,
    "Quantum Chronomancer": 2022,
    "Continuum Chronomancer": 2022,
    "Paladin Chronomancer": 2023,
    "Chrono ShadowHunter": 2024,
    "Phantom Chronomancer": 2025,
    "Archivist of Time": 2026,
    "Archivist of Temporis": 2026
  };

  // src/data/obtain.json
  var obtain_default = {
    "Scarlet Sorceress": [
      "Class Shop por 2.000 AC (n\xEDvel 10).",
      "A wiki n\xE3o informa exig\xEAncia de member."
    ],
    "Vindicator of They": [
      "Class Shop por 2.000 AC, ou loja do Vindicator of They no local do Collector.",
      "Existe tamb\xE9m a vers\xE3o por merge, com as mesmas skills."
    ],
    "Troll Spellsmith": [
      "Class Shop por 2.000 AC.",
      "A wiki recomenda o enhancement Wizard."
    ],
    "SkyGuard Grenadier": [
      "Class Shop por 2.000 AC e loja de member.",
      "A wiki n\xE3o diz se a conta member \xE9 obrigat\xF3ria."
    ],
    "Royal Vampire Lord": [
      "Class do Vampire Lord em Mystcroft por 2.000 AC.",
      "Existe tamb\xE9m a vers\xE3o por merge. A wiki n\xE3o lista exig\xEAncia de member."
    ],
    "ShadowScythe General": [
      "Loja do ShadowScythe General em Shadowfall por 2.000 AC.",
      "A vers\xE3o por merge tem as mesmas skills; a wiki n\xE3o informa os requisitos dela."
    ],
    "Shadow Dragon Shinobi": [
      "Cole\xE7\xE3o Dark Holiday 2020 por 0 AC.",
      "Existe tamb\xE9m a vers\xE3o por merge. A wiki n\xE3o informa exig\xEAncia de member."
    ],
    "Silver Paladin": [
      "Class Shop por 2.000 AC e loja de member; loja do Paladin em Lightguard Keep e Necropolis.",
      "A wiki marca AC e Legend, mas n\xE3o diz se exige conta member."
    ],
    "Alpha Omega": [
      "Class Shop por 1.000 AC (vers\xE3o sem Legend).",
      "Existe tamb\xE9m a vers\xE3o Legend. A wiki n\xE3o lista exig\xEAncia de member."
    ],
    "Blood Titan": [
      "Class Shop por 2.000 AC (Class Hall C).",
      "Aparece na loja de member da wiki; confirme se exige conta member."
    ],
    "Dark Harbinger": [
      "Vitrine de itens de mar\xE7o de 2018 por 2.000 AC, e h\xE1 uma vers\xE3o 0 AC.",
      "A wiki n\xE3o informa exig\xEAncia de member."
    ],
    Daimon: [
      "Class Shop ou loja do Ziri por 2.000 AC (vers\xE3o sem Legend).",
      "Existe tamb\xE9m a vers\xE3o Legend, com as mesmas skills."
    ],
    "Drakel Warlord": [
      "Class Shop por 2.000 AC (vers\xE3o sem Legend).",
      "A wiki recomenda o enhancement Fighter e h\xE1 uma vers\xE3o Legend."
    ],
    "Abyssal Angel": [
      "Class Hall do Abyssal Angel por 2.000 AC.",
      "Existe tamb\xE9m a vers\xE3o Legend. A wiki n\xE3o lista exig\xEAncia de member."
    ],
    "Legion Paladin": [
      "Camisetas Legion Armor e Paladin Armor da HeroMart: cada uma d\xE1 metade da classe e voc\xEA junta as duas no jogo.",
      "Reformulada em maio de 2024. As camisetas tinham estoque limitado, ent\xE3o confirme no jogo se ainda d\xE1 para obter."
    ],
    "Legion Revenant": [
      "Recompensa da quest Legion Fealty 4 em /revenant.",
      "Precisa ser da Legion (concluir Fail to the King)."
    ],
    "Void Highlord": [
      "Void Highlord Merge Shop em /tercessuinotlim.",
      "Exige completar os trials da Nation."
    ],
    ArchPaladin: [
      "ArchPaladin Shop no Throne of Darkness Hub.",
      "Vers\xE3o 0 AC; tamb\xE9m existe vers\xE3o AC."
    ],
    "Lord of Order": [
      "Quest The Final Challenge (Mirror Drakath) em /battleoff.",
      "Cadeia de quests di\xE1rias, liberada para free player."
    ],
    "Chaos Avenger": [
      "Recompensa do Champion Drakath em /championdrakath.",
      "Quest semanal, reseta \xE0s sextas."
    ],
    "Verus DoomKnight": [
      "Verus DoomKnight Shop em /terminatemple.",
      "0 AC."
    ],
    "Dragon of Time": [
      "Quest Hero's Heartbeat em /timeinn.",
      "N\xEDvel base 75; pede Thief of Hours."
    ],
    "Arcana Invoker": [
      "Arcana Invoker Class Shop em /arcana.",
      "Concluir a quest Endless Beginning, Final Ends; 0 AC."
    ],
    ArchMage: [
      "Quest Archmage's Ascension (quests do Warlic).",
      ""
    ],
    "Yami no Ronin": [
      "Quest Yami no Ronin (quests do Dage) em /darkally.",
      "Sellback 0 AC."
    ],
    LightCaster: [
      "Quest LightCaster Class (quests do Aranx, Celestial Realm).",
      ""
    ],
    Lich: [
      "Quest Lich Class em /moreskulls.",
      "Sazonal (sexta-feira 13) para quem n\xE3o \xE9 member."
    ],
    "Legion DoomKnight": [
      "Legion DoomKnight Merge (Underworld).",
      "Exclusiva da Legion."
    ],
    "Blaze Binder": [
      "Merge ou AC.",
      "Exige Pyromancer rank 10."
    ],
    "Kathool Adept": [
      "Quest Adeptus Kathooli em /callofkathool.",
      "Exige Elven Heritage Guardian, Sur-gion Tokens, Sun Zone Chits e Sundered Tentacles."
    ],
    "Ultra OmniKnight": [
      "Com o Ragnar (Battleon) ou Loremaster Maya.",
      "2000 AdventureCoins."
    ],
    "Archivist of Time": [
      "Calend\xE1rio 2026 Paradox of Lore ou Chrono Bundle na HeroMart.",
      "Variante por AC ou HeroPoints prevista para o fim de 2026."
    ],
    "Infinity Titan": [
      "Produto da HeroMart.",
      "Mesmas skills do StoneCrusher."
    ],
    PaladinSlayer: [
      "Produto da HeroMart; reworkada em 07/08/2026.",
      ""
    ],
    CardClasher: [
      "Produto da HeroMart; reworkada em 2026.",
      "Quem tinha a vers\xE3o antiga ganha o pet Pyramid Box."
    ],
    "Thief of Hours": [
      "Pr\xE9-requisito do Dragon of Time.",
      ""
    ],
    Pyromancer: [
      "Daily de 4 dias.",
      ""
    ],
    Cryomancer: [
      "Daily de 7 dias.",
      ""
    ],
    Collector: [
      "Daily de 90 dias.",
      ""
    ],
    Chronomancer: [
      "AE Calendar Shop no Book of Lore.",
      ""
    ],
    "Chronomancer Prime": [
      "HeroMart: 2011 Timelock Key ou merge de 5 HeroPoints.",
      ""
    ],
    ChronoCorruptor: [
      "ChronoCorruptor Shop no Book of Lore.",
      ""
    ],
    TimeKeeper: [
      "HeroMart: 2013 Timelock Key ou merge de 5 HeroPoints.",
      ""
    ],
    "Corrupted Chronomancer": [
      "Calend\xE1rio 2019 no Book of Lore.",
      "Usa os pets de ampulheta do calend\xE1rio."
    ],
    "Quantum Chronomancer": [
      "Calend\xE1rio 2022 no Book of Lore, 2022 Timelock Key ou merge de 5 HeroPoints na HeroMart.",
      ""
    ],
    "Chrono ShadowHunter": [
      "Merge de 5 HeroPoints na HeroMart.",
      ""
    ],
    "ShadowWeaver of Time": [
      "Merge de 5 HeroPoints (HeroMart, Book of Lore ou Curiosities).",
      ""
    ],
    "Archivist of Temporis": [
      "Merge de 5 HeroPoints na HeroMart ou calend\xE1rio 2026.",
      ""
    ],
    "Empyrean Chronomancer": [
      "Loja do /curio por 6.000 ACs.",
      "Os visuais s\xE3o vendidos junto com os do Immortal Chronomancer."
    ],
    "Immortal Chronomancer": [
      "Vers\xE3o AC (h\xE1 tamb\xE9m uma vers\xE3o Special).",
      ""
    ],
    "Timeless Chronomancer": [
      "Vers\xF5es AC e Merge.",
      ""
    ],
    "Overworld Chronomancer": [
      "Vers\xF5es AC e Merge.",
      ""
    ]
  };

  // src/data/consumables.json
  var consumables_default = {
    "Legion Revenant": "Sage Tonic + Malevolence Elixir",
    ArchPaladin: "Sage Tonic + Malevolence Elixir",
    "Lord of Order": "Fate Tonic + Malevolence Elixir (no Drakath: Body Tonic + Revitalise Elixir)",
    "Chaos Avenger": "Fate Tonic + Malevolence Elixir",
    "Void Highlord": "Might Tonic ou Fate Tonic + Battle Elixir",
    StoneCrusher: "Sage Tonic + Malevolence Elixir",
    "Infinity Titan": "Sage Tonic + Malevolence Elixir",
    "Naval Commander": "Mastery Tonic + Battle Elixir",
    "DeathKnight Lord": "Mastery Tonic + Battle Elixir"
  };

  // src/data/ultra-teams.json
  var ultra_teams_default = [
    {
      n: "Champion Drakath",
      map: "/championdrakath",
      tag: "Semanal",
      team: [
        [
          "Void Highlord",
          "Dano"
        ],
        [
          "StoneCrusher",
          "Suporte + DPS em grupo"
        ],
        [
          "Lord of Order",
          "Taunt (Scroll of Enrage) + suporte"
        ],
        [
          "ArchPaladin",
          "Cura"
        ]
      ],
      tips: [
        "Ele solta um ataque enorme a cada 2M de HP (18M, 16M, 14M\u2026; menos em 10M e 2M). Taunte logo antes de cada marca.",
        "S\xE3o 7 Scrolls of Enrage para a luta toda.",
        "Use armas com boost contra Chaos; StoneCrusher n\xE3o ganha com boost (DoT/HoT)."
      ],
      alt: "Naval Commander como tanque \xE9 a escolha ideal segundo outro guia; DeathKnight Lord tamb\xE9m serve."
    },
    {
      n: "Ultra Nulgath",
      map: "/ultranulgath",
      tag: "Mec\xE2nica dif\xEDcil",
      team: [
        [
          "Void Highlord",
          "Taunter 1"
        ],
        [
          "Void Highlord",
          "Taunter 2"
        ],
        [
          "Lord of Order",
          "Suporte"
        ],
        [
          "Legion Revenant",
          "Suporte + tanque"
        ]
      ],
      tips: [
        "Os contratos Frailty \u2192 Despair \u2192 Stagnation precisam ficar alternando entre os dois taunters.",
        "Taunter 1 usa Enrage 6 s ap\xF3s o in\xEDcio; taunter 2 na fala 'Behold the power of the Abyss'.",
        "Overfiend Blade mata o time se ficar vivo 45 s; mate s\xF3 para evitar o nuke (0 a 2 vezes)."
      ],
      alt: "Chaos Avenger \xD72 + Lord of Order + Legion Revenant dispensa scrolls, mas o timing \xE9 mais r\xEDgido. Com 3 pessoas: Lord of Order, ArchPaladin e Legion Revenant."
    },
    {
      n: "Ultra King Drago",
      map: "/ultradrago",
      tag: "Semanal",
      team: [
        [
          "Chaos Avenger",
          "Taunt + dano"
        ],
        [
          "Legion Revenant",
          "Suporte + DPS em grupo"
        ],
        [
          "Lord of Order",
          "Suporte + Quixotic"
        ],
        [
          "ArchPaladin",
          "Cura"
        ]
      ],
      tips: [
        "Ordem: Bowmaster, Executioner, Drago.",
        "Se os dois primeiros levarem mais de 3 min, o Drago mata o time.",
        "Lord of Order fica no Executioner e usa Quixotic logo antes do Bowmaster morrer.",
        "Use boost contra Humanos."
      ],
      alt: "Recompensa: Prince Darkon's Poleaxe."
    },
    {
      n: "Ultra Dage",
      map: "/ultradage",
      tag: "Semanal",
      team: [
        [
          "Chaos Avenger",
          "Taunt + dano"
        ],
        [
          "Legion DoomKnight",
          "DPS em grupo + Decay"
        ],
        [
          "Lord of Order",
          "Suporte + Quixotic"
        ],
        [
          "ArchPaladin",
          "Cura"
        ]
      ],
      tips: [
        "Noxious Decay inverte a cura; lifesteal n\xE3o \xE9 invertido, ent\xE3o Health Vamp ajuda.",
        "A cada 15 s, corra para a zona marcada (3 s). Morrer devolve 500k de HP ao Dage.",
        "O Decay do Legion DoomKnight anula a cura do Dage; Legion Revenant deve spammar o 2.",
        "Lord of Order usa Quixotic no Energy Blast (ou ArchPaladin usa Righteous Seal)."
      ],
      alt: "Sem Legion DoomKnight, leve Scroll of Decay. Consum\xEDveis: Endurance Draught + Body Tonic."
    },
    {
      n: "Ultra Tyndarius",
      map: "/ultratyndarius",
      tag: "Story",
      team: [
        [
          "ShadowWeaver of Time",
          "Taunt + dano"
        ],
        [
          "Legion Revenant",
          "Suporte + DPS em grupo"
        ],
        [
          "Lord of Order",
          "Quixotic nos orbs + stacks de Order"
        ],
        [
          "ArchPaladin",
          "Cura"
        ]
      ],
      tips: [
        "Mate um orb por vez: orb esquerdo, orb direito, Tyndarius e repete.",
        "O taunter mant\xE9m o taunt ou Scrolls of Enrage o tempo todo."
      ],
      alt: "Recompensas: Infernal Flame Pyromancer e Infernal Flame Khopesh."
    },
    {
      n: "Ultra Speaker (Malgor)",
      map: "/ultraspeaker",
      tag: "Semanal",
      team: [
        [
          "Chaos Avenger",
          "Taunt + dano"
        ],
        [
          "Legion Revenant",
          "DPS em grupo + Decay"
        ],
        [
          "Lord of Order",
          "Suporte + Quixotic"
        ],
        [
          "ArchPaladin",
          "Cura (ou Paladin Chronomancer)"
        ]
      ],
      tips: [
        "Penitence \xE9 praticamente obrigat\xF3rio nessa luta.",
        "Praxis rende bem por ser uma luta longa."
      ],
      alt: "Setup de 4 taunts: Legion Revenant, Lord of Order, ArchPaladin e StoneCrusher. Recompensa: Radiant Goddess of War."
    },
    {
      n: "Exaltia (Ezrajal, Warden, Engineer)",
      map: "/ultraezrajal \xB7 /ultrawarden \xB7 /ultraengineer",
      tag: "Story",
      team: [
        [
          "Void Highlord",
          "Dano"
        ],
        [
          "Legion Revenant",
          "Suporte + DPS + taunt no Warden"
        ],
        [
          "Lord of Order",
          "Suporte"
        ],
        [
          "Frostval Barbarian",
          "Suporte (ou Continuum Chronomancer)"
        ]
      ],
      tips: [
        "Ezrajal: aperte ESC quando ele preparar o Counter Attack e volte quando passar.",
        "Warden: Legion Revenant usa Scroll of Enrage perto de 450k de HP.",
        "Engineer: n\xE3o ande para frente ao entrar. Mate Defense Drone, Attack Drone e depois o Engineer."
      ],
      alt: "Recompensa: Exalted Apotheosis. Em sala p\xFAblica, um ArchPaladin a mais ajuda a sobreviver."
    },
    {
      n: "Ultra Kala",
      map: "/ultrakala",
      tag: "Agosto",
      team: [
        [
          "Void Highlord",
          "Dano (ou outro DPS de grupo)"
        ],
        [
          "Legion Revenant",
          "Suporte + DPS em grupo"
        ],
        [
          "Lord of Order",
          "Suporte"
        ],
        [
          "ArchPaladin",
          "Cura"
        ]
      ],
      tips: [
        "Sem mec\xE2nicas especiais: com o time certo, \xE9 s\xF3 spammar."
      ],
      alt: "Sazonal de agosto."
    },
    {
      n: "Ultra Iara",
      map: "/ultraiara",
      tag: "Setembro",
      team: [
        [
          "Void Highlord",
          "Dano"
        ],
        [
          "Void Highlord",
          "Dano"
        ],
        [
          "Legion Revenant",
          "Suporte + DPS em grupo"
        ],
        [
          "Lord of Order",
          "Suporte"
        ]
      ],
      tips: [
        "Tire os debuffs da Iara saindo da tela do boss e trocando de classe."
      ],
      alt: "Sazonal de setembro."
    }
  ];

  // src/data/ultra-items.json
  var ultra_items_default = [
    [
      "Contra Chaos",
      "Chaorrupter (desbloqueado), drop do High Chaos Knight em /chaoswar, ou a Empowered Chaos Avenger's Greatsword do Drakath."
    ],
    [
      "Contra Humanos",
      "Prince Darkon's Poleaxe (Ultra Drago). Com Infernal Flame Pyromancer ou Archfiend Doomlord chega a +138%."
    ],
    [
      "Contra Undead",
      "Blinding Light of Destiny, \xFAtil em quase toda a hist\xF3ria do Yami no Ronin e Doomwood."
    ],
    [
      "Boost geral",
      "Exalted Apotheosis (Exaltia), Necrotic Sword of Doom e o armor Sepulchure's DoomKnight."
    ],
    [
      "Consum\xEDveis",
      "Sage Tonic para quem usa INT (LR, AP), Fate Tonic para LoO e CAv, Malevolence Elixir para todos. Prefira vers\xF5es Potent ou Unstable."
    ],
    [
      "Scrolls",
      "Scroll of Enrage para taunt em quem n\xE3o tem taunt pr\xF3prio; Scroll of Decay no Dage sem Legion DoomKnight."
    ]
  ];

  // src/data/enhancements.json
  var enhancements_default = [
    [
      "Lucky",
      "Classe",
      5,
      "Muito Luck (chance de cr\xEDtico) e um pouco de todos os outros atributos. Serve para qualquer classe.",
      "Todas as classes, principalmente as de Game of Chance"
    ],
    [
      "Wizard",
      "Classe",
      4,
      "Intellect, Wisdom, Luck e Endurance: aumenta o dano m\xE1gico. Para classes de magia.",
      "Legion Revenant, ArchMage, Blaze Binder"
    ],
    [
      "Hybrid",
      "Classe",
      3,
      "Strength, Intellect, Dexterity e Endurance: sobe Attack Power, Spell Power, Haste, acerto e HP. Para classes que misturam corpo a corpo e magia.",
      "Legion Paladin, ShadowScythe General, Ninja"
    ],
    [
      "Fighter",
      "Classe",
      3,
      "Strength, Dexterity e Endurance: sobe Attack Power, acerto e HP. Para classes corpo a corpo.",
      "Drakel Warlord, DoomKnights, Blood Ancient"
    ],
    [
      "Thief",
      "Classe",
      2,
      "Dexterity (principal) com um pouco de Strength e Endurance: sobe Haste e acerto. Para classes furtivas e de esquiva.",
      "DeathKnight, Dragonlord, Rogue"
    ],
    [
      "Healer",
      "Classe",
      2,
      "Intellect, bastante Endurance e um pouco de Wisdom. Para casters de cura.",
      "Acolyte, Bard, Elemental Dracomancer"
    ],
    [
      "Spellbreaker",
      "Classe",
      2,
      "Intellect, Dexterity, Endurance e Luck: sobe o dano m\xE1gico e a chance de cr\xEDtico. Para casters que dependem de cr\xEDtico.",
      "MindBreaker, Shaman, Sorcerer"
    ],
    [
      "Valiance",
      "Arma",
      5,
      "Grande b\xF4nus em todos os atributos base. Sempre entre as 3 melhores op\xE7\xF5es de qualquer classe.",
      "Universal"
    ],
    [
      "Dauntless",
      "Arma",
      5,
      "Ativa na skill 2: mais Haste e Crit. \xD3timo para classes que jogam com HP baixo e Chronomancers.",
      "Verus DoomKnight, Void Highlord, calend\xE1rios"
    ],
    [
      "Arcana's Concerto",
      "Arma",
      4,
      "Acumula debuff de dano f\xEDsico e m\xE1gico recebido no alvo. Feito para ultras.",
      "Legion Revenant (aplicador principal)"
    ],
    [
      "Elysium",
      "Arma",
      4,
      "Recupera mana. N\xE3o melhora classes boas, transforma classes fracas em boas.",
      "ArchMage, Arcana Invoker, Ultra OmniKnight"
    ],
    [
      "Ravenous",
      "Arma",
      4,
      "Muito usado em solo e farm longo; combina com skills spammadas.",
      "Arcana Invoker, Verus DoomKnight, Martial Artist"
    ],
    [
      "Smite",
      "Arma",
      3,
      "Rende em classes com grande buff de dano e skill 5 com recarga de 15 s.",
      "Void Highlord, LightCaster, ShadowStalker of Time"
    ],
    [
      "Lacerate",
      "Arma",
      3,
      "Reduz a chance de acerto do inimigo, ajudando a chegar no dodge m\xE1ximo.",
      "Classes de dodge e de calend\xE1rio"
    ],
    [
      "Praxis",
      "Arma",
      3,
      "Dano crescente com Spinning Dragon; \xFAtil em lutas longas.",
      "Lutas longas (Ultra Speaker)"
    ],
    [
      "Acheron",
      "Arma",
      2,
      "Muito forte, mas exige manter um auto-DoT para ciclar os buffs.",
      "ArchMage"
    ],
    [
      "Vim",
      "Capacete",
      4,
      "Muito Luck; ideal para dodge e classes de crit f\xEDsico. N\xE3o use em m\xE1gicos.",
      "Void Highlord, ShadowStalker, ArchPaladin"
    ],
    [
      "Pneuma",
      "Capacete",
      4,
      "Para classes m\xE1gicas, mesmo as que dependem de crit.",
      "Legion Revenant (fora de ultra), ArchMage, Blaze Binder"
    ],
    [
      "Anima",
      "Capacete",
      3,
      "Para classes f\xEDsicas; compare com Vim caso a caso.",
      "Chaos Avenger, Verus DoomKnight"
    ],
    [
      "Forge (base)",
      "Capacete",
      3,
      "Mais STR/INT que Luck e sem penalidade de HP. Seguro para ultras.",
      "Qualquer classe em ultra"
    ],
    [
      "Examen",
      "Capacete",
      1,
      "Poucas classes aproveitam muito Wisdom.",
      "Arcana Invoker \xE9 exce\xE7\xE3o"
    ],
    [
      "Vainglory",
      "Capa",
      5,
      "+15% de dano; a penalidade de cura s\xF3 pesa em ultras. Equipe e esque\xE7a.",
      "Universal fora de ultra"
    ],
    [
      "Penitence",
      "Capa",
      5,
      "De \xF3tima a obrigat\xF3ria em ultra bosses.",
      "Todas as classes em ultra"
    ],
    [
      "Lament",
      "Capa",
      3,
      "Mais Crit para quem j\xE1 tem Haste de sobra. Dispens\xE1vel se usar Dauntless.",
      "Calend\xE1rios"
    ],
    [
      "Absolution",
      "Capa",
      2,
      "Para quem cura, mas n\xE3o o bastante sozinho.",
      "Lord of Order, StoneCrusher/Infinity Titan"
    ],
    [
      "Avarice",
      "Capa",
      2,
      "Leva Haste de 40% a 50%, ao custo de defesa.",
      "Farmers sem Haste m\xE1xima"
    ]
  ];

  // src/data/i18n/ui.json
  var ui_default = {
    pt: {
      title: "Cr\xF4nicas de Battleon",
      intro: "Seu guia de AdventureQuest Worlds: melhores classes para farm, solo e ultra bosses, tier list por loja, times de ultra, enhancements e as novidades do jogo, com alertas de reset e eventos.",
      tab_best: "Melhores",
      sec_items: "HardFarm",
      farm_h: "HardFarm",
      farm_sub: "Tudo que demora para farmar: classes, armas e armaduras, materiais, reputa\xE7\xE3o, quests di\xE1rias e itens sazonais. O esfor\xE7o \xE9 uma estimativa minha pela quantidade pedida; confira a fonte antes de come\xE7ar.",
      farm_daily: "Di\xE1rios",
      farm_season: "Sazonais",
      eff1: "Curto",
      eff2: "M\xE9dio",
      eff3: "Longo",
      eff4: "Muito longo",
      eff5: "Extremo",
      foot_1: "\xA9 2026 Cr\xF4nicas de Battleon. Portal feito por f\xE3s, sem fins lucrativos.",
      foot_2: "AdventureQuest Worlds, AQWorlds e os nomes de classes, itens e personagens citados aqui pertencem \xE0 Artix Entertainment, LLC. Este portal n\xE3o \xE9 oficial e n\xE3o tem v\xEDnculo com a Artix Entertainment.",
      foot_3: "Conte\xFAdo compilado da AQW Wiki, do AQWG, do AQWHub e das Design Notes oficiais. Confira sempre a fonte antes de come\xE7ar um farm.",
      farm_rep: "Reputa\xE7\xE3o",
      farm_join: "Comece em",
      farm_copied: "Copiado",
      farm_mat: "Materiais e gold",
      farm_all: "Todos",
      farm_class: "Classes",
      farm_gear: "Armas e armaduras",
      farm_eff: "Esfor\xE7o",
      farm_need: "O que \xE9 preciso",
      farm_src: "Fonte",
      farm_open: "Ver a ficha da classe",
      enh_q: "Pesquisar classe\u2026",
      enh_qhint: "Enhancements em destaque: os que a classe usa.",
      slot_all: "Todos",
      slot_Classe: "Classe",
      slot_Arma: "Arma",
      slot_Capacete: "Capacete",
      slot_Capa: "Capa",
      slot_n: "{n} op\xE7\xF5es",
      tab_builder: "Montador de time",
      sub_teams: "Agenda e times",
      bld_sub: "Marque as classes que voc\xEA tem. O portal mostra, para cada ultra, quais vagas do time voc\xEA cobre com a classe recomendada e qual das suas serve de substituta.",
      bld_search: "Filtrar suas classes\u2026",
      bld_markall: "Marcar as listadas",
      bld_p_clear: "Limpar tudo",
      bld_n: "{n} classes marcadas",
      bld_hint: "Estes s\xE3o os times recomendados. Marque algumas classes acima, ou filtre por loja (por exemplo Free) e use \u201CMarcar as listadas\u201D para ver quais vagas voc\xEA cobre.",
      bld_ideal: "{n} de 4 ideais",
      bld_have: "Voc\xEA tem",
      bld_use: "Use",
      bld_miss: "Sem classe equivalente",
      bld_note: "Substitutas s\xE3o sugest\xF5es pelo papel e pela nota de Ultras; confira a ficha da luta antes de entrar.",
      sec_inicio: "In\xEDcio",
      sec_classes: "Classes",
      sec_ultras: "Ultras",
      sec_enh: "Enhancements",
      sec_news: "Novidades",
      nav_main: "Navega\xE7\xE3o principal",
      gsearch: "Buscar classe\u2026",
      gnores: "Nenhuma classe encontrada",
      home_week: "Esta semana",
      home_reset: "Reset semanal",
      home_news: "\xDAltimas novidades",
      home_top: "Os melhores agora",
      home_top_sub: "Top 5 de cada modo. Toque numa classe para abrir a ficha.",
      home_tier: "Ver tier list de {m}",
      home_seeall: "Ver todas as novidades",
      home_agenda: "Ver agenda de ultras",
      tab_tier: "Tier list",
      tab_ultras: "Times de ultra",
      tab_all: "Todas as classes",
      tab_enh: "Enhancements",
      tier_sub: "Escolha a loja e o modo. Toque numa classe para abrir a ficha.",
      ultras_sub: "Composi\xE7\xF5es de 4 classes usadas pela comunidade, com a fun\xE7\xE3o de cada um e o que fazer na luta.",
      items_h: "Itens de dano e consum\xEDveis",
      items_sub: "Boosts contra o tipo do monstro fazem mais diferen\xE7a em ultras do que trocar de classe.",
      enh_h: "Enhancements da Forge",
      enh_sub: "O que cada um faz e onde rende mais. Estrelas indicam utilidade geral, n\xE3o for\xE7a bruta.",
      search: "Buscar classe\u2026",
      note: 'Rota\xE7\xF5es marcadas <b>Guia AQWHub</b> v\xEAm dos guias de uso de classe do AQWHub; <b>Comunidade</b> vem de dicas de jogadores em v\xEDdeos de 2026; <b>Padr\xE3o</b> \xE9 um ponto de partida pelo estilo da classe, ent\xE3o teste e ajuste. Times de ultra seguem o guia da AQWG. "Como obter" vem da AQW Wiki e das Design Notes; para as demais classes, abra o link da wiki na ficha. Atualizado em 31/10/2026.',
      st_classes: "classes",
      st_ultras: "ultra bosses",
      st_enh: "enhancements",
      st_rot: "rota\xE7\xF5es documentadas",
      mi_farm: "Limpar mapas e juntar drops r\xE1pido.",
      mi_solo: "Bosses dif\xEDceis sem ajuda.",
      mi_ultra: "Times de 4 em ultra bosses.",
      overall: "Geral",
      all: "Todas",
      empty: "Nenhuma classe {c} neste tier.",
      alt: "Alternativa:",
      count: "{n} de {t} classes, ordenadas pela soma das notas.",
      none: "Nenhuma classe encontrada.",
      nw: "NOVO",
      of5: "de 5",
      bestOn: "Melhor em:",
      src_h: "Guia AQWHub",
      src_c: "Comunidade",
      src_g: "Padr\xE3o",
      close: "Fechar",
      how: "Como obter",
      calYear: "Calend\xE1rio {y} no Book of Lore (c\xF3digo do calend\xE1rio).",
      seeWiki: "Veja a p\xE1gina da classe na AQW Wiki.",
      calClass: "Classe de calend\xE1rio",
      via: "Vem por {x}.",
      same: "Mesmas skills que:",
      noVar: "Sem variantes com o mesmo kit.",
      cons: "Consum\xEDveis em ultra",
      consDef: "Malevolence Elixir + o t\xF4nico do atributo principal da classe.",
      enhH: "Melhores combina\xE7\xF5es de enhancement",
      thMode: "Modo",
      thClass: "Classe",
      thWeapon: "Arma",
      thHelm: "Capacete",
      thCape: "Capa",
      noForge: "Sem Forge:",
      skills: "Skills",
      rotH: "Sequ\xEAncias de skills",
      generic: "N\xE3o h\xE1 combo publicado para esta classe; a sequ\xEAncia acima \xE9 um ponto de partida pelo estilo dela. Confira o que cada skill faz na wiki.",
      inherited: "Rota\xE7\xE3o do {x}, que tem exatamente as mesmas skills.",
      inTeams: "Times de ultra com esta classe",
      wikiLink: "Ver na AQW Wiki (imagem e skills) \u2197",
      hubLink: "Guia completo no AQWHub \u2197",
      tab_cmp: "Comparar",
      cmp_sub: "Escolha at\xE9 3 classes para ver lado a lado. Tamb\xE9m d\xE1 para adicionar pelo bot\xE3o Comparar na ficha.",
      cmp_ph: "Classe {n}\u2026",
      cmp_clear: "Remover",
      cmp_empty: "Escolha pelo menos uma classe acima para come\xE7ar.",
      cmp_add: "\uFF0B Comparar",
      cmp_in: "\u2713 Na compara\xE7\xE3o",
      cmp_full: "Compara\xE7\xE3o cheia (3)",
      row_store: "Loja",
      row_type: "Estilo",
      row_build: "Build {m}",
      row_rot: "Rota\xE7\xE3o principal",
      row_how: "Como obter",
      row_note: "Resumo",
      enh_used: "Usado por {n} classes",
      enh_used1: "Usado por 1 classe",
      enh_hide: "Ocultar classes",
      enh_all: "Ver as {n} classes",
      enh_flt: "Filtrar classes\u2026",
      enh_top: "Mais usado em",
      enh_modes: "F = Farm \xB7 S = Solo \xB7 U = Ultras",
      enh_none: "Nenhuma build sugerida no painel usa este enhancement.",
      ag_h: "Agenda de ultras",
      ag_reset: "Pr\xF3ximo reset semanal: sexta, {d}",
      today: "hoje",
      tomorrow: "amanh\xE3",
      inDays: "em {n} dias",
      ag_weekly: "Semanais",
      ag_weekly_sub: "A quest semanal reseta toda sexta.",
      ag_season: "Sazonais",
      ag_season_sub: "Abertos s\xF3 em um m\xEAs do ano.",
      ag_now: "Dispon\xEDvel agora",
      ag_back: "Volta em {m}",
      ag_other: "Outros",
      ag_other_sub: "Sem reset semanal informado no guia; alguns exigem terminar a hist\xF3ria.",
      tab_news: "Novidades",
      news_sub: "Classes novas, reworks e balanceamentos que mexem no guia. O que voc\xEA ainda n\xE3o viu fica marcado.",
      n_title: "Notifica\xE7\xF5es",
      n_alerts: "Alertas",
      n_news: "Novidades recentes",
      n_markall: "Marcar tudo como lido",
      n_seeall: "Ver todas as novidades",
      n_empty: "Nada novo por aqui.",
      n_unread: "{n} novidades desde sua \xFAltima visita",
      n_unread1: "1 novidade desde sua \xFAltima visita",
      bell: "Notifica\xE7\xF5es: {n} n\xE3o lidas",
      ty_new: "Classe nova",
      ty_rework: "Rework",
      ty_balance: "Balanceamento",
      ty_skin: "Skin",
      f_all: "Tudo",
      view: "Ver",
      dismiss: "Dispensar",
      source: "Fonte",
      al_reset0: "Reset semanal hoje",
      al_reset0x: "As quests semanais de Drakath, Drago, Dage e Speaker resetaram.",
      al_reset1: "Reset semanal amanh\xE3",
      al_reset1x: "\xDAltima chance da semana para os ultras semanais.",
      al_f13: "Sexta-feira 13 em {d}",
      al_f13x: "A Lich fica dispon\xEDvel para quem n\xE3o \xE9 member em /moreskulls ({r}).",
      al_f13now: "Hoje \xE9 sexta-feira 13",
      al_f13nowx: "A Lich est\xE1 dispon\xEDvel para todos em /moreskulls.",
      al_seasonNow: "{u} aberto este m\xEAs",
      al_seasonNowx: "Ultra sazonal: aproveite antes de o m\xEAs acabar.",
      al_seasonSoon: "{u} abre em {d}",
      al_seasonSoonx: "Ultra sazonal, {r}."
    },
    en: {
      title: "Chronicles of Battleon",
      intro: "Your AdventureQuest Worlds guide: the best classes for farming, soloing and ultra bosses, tier lists by store, ultra teams, enhancements and the latest game news, with reset and event alerts.",
      tab_best: "Best picks",
      sec_items: "HardFarm",
      farm_h: "HardFarm",
      farm_sub: "Everything slow to farm: classes, weapons and armor, materials, reputation, daily quests and seasonal items. The effort is my estimate from the amounts asked; check the source before you start.",
      farm_daily: "Daily",
      farm_season: "Seasonal",
      eff1: "Short",
      eff2: "Medium",
      eff3: "Long",
      eff4: "Very long",
      eff5: "Extreme",
      foot_1: "\xA9 2026 Chronicles of Battleon. A non-commercial portal made by fans.",
      foot_2: "AdventureQuest Worlds, AQWorlds and the class, item and character names cited here belong to Artix Entertainment, LLC. This portal is unofficial and not affiliated with Artix Entertainment.",
      foot_3: "Content compiled from the AQW Wiki, AQWG, AQWHub and the official Design Notes. Always check the source before you start a farm.",
      farm_rep: "Reputation",
      farm_join: "Start at",
      farm_copied: "Copied",
      farm_mat: "Materials and gold",
      farm_all: "All",
      farm_class: "Classes",
      farm_gear: "Weapons and armor",
      farm_eff: "Effort",
      farm_need: "What you need",
      farm_src: "Source",
      farm_open: "Open the class card",
      enh_q: "Search class\u2026",
      enh_qhint: "Highlighted enhancements: the ones the class uses.",
      slot_all: "All",
      slot_Classe: "Class",
      slot_Arma: "Weapon",
      slot_Capacete: "Helm",
      slot_Capa: "Cape",
      slot_n: "{n} options",
      tab_builder: "Team builder",
      sub_teams: "Schedule and teams",
      bld_sub: "Mark the classes you own. For each ultra the portal shows which team slots you cover with the recommended class and which of yours can stand in.",
      bld_search: "Filter your classes\u2026",
      bld_markall: "Mark listed",
      bld_p_clear: "Clear all",
      bld_n: "{n} classes marked",
      bld_hint: "These are the recommended teams. Mark a few classes above, or filter by store (for example Free) and use \u201CMark listed\u201D to see which slots you cover.",
      bld_ideal: "{n} of 4 ideal",
      bld_have: "You have it",
      bld_use: "Use",
      bld_miss: "No equivalent class",
      bld_note: "Substitutes are suggestions based on role and Ultra rating; check the fight guide before you go in.",
      sec_inicio: "Home",
      sec_classes: "Classes",
      sec_ultras: "Ultras",
      sec_enh: "Enhancements",
      sec_news: "News",
      nav_main: "Main navigation",
      gsearch: "Search class\u2026",
      gnores: "No class found",
      home_week: "This week",
      home_reset: "Weekly reset",
      home_news: "Latest news",
      home_top: "Top picks right now",
      home_top_sub: "Top 5 for each mode. Tap a class to open its card.",
      home_tier: "See {m} tier list",
      home_seeall: "See all news",
      home_agenda: "See ultra schedule",
      tab_tier: "Tier list",
      tab_ultras: "Ultra teams",
      tab_all: "All classes",
      tab_enh: "Enhancements",
      tier_sub: "Pick a store and a mode. Tap a class to open its card.",
      ultras_sub: "Four-class lineups used by the community, with each role and what to do in the fight.",
      items_h: "Damage items and consumables",
      items_sub: "Boosts against the monster's type matter more in ultras than switching classes.",
      enh_h: "Forge enhancements",
      enh_sub: "What each one does and where it shines. Stars show overall usefulness, not raw power.",
      search: "Search classes\u2026",
      note: `Rotations tagged <b>AQWHub guide</b> come from AQWHub's class usage guides; <b>Community</b> comes from player tips in 2026 videos; <b>Baseline</b> is a starting point based on the class's style, so test and adjust. Ultra teams follow the AQWG guide. "How to get" comes from the AQW Wiki and Design Notes; for other classes, open the wiki link on the card. Updated Oct 31, 2026.`,
      st_classes: "classes",
      st_ultras: "ultra bosses",
      st_enh: "enhancements",
      st_rot: "documented rotations",
      mi_farm: "Clear maps and collect drops fast.",
      mi_solo: "Hard bosses on your own.",
      mi_ultra: "Four-player ultra boss teams.",
      overall: "Overall",
      all: "All",
      empty: "No {c} classes in this tier.",
      alt: "Alternative:",
      count: "{n} of {t} classes, sorted by total score.",
      none: "No classes found.",
      nw: "NEW",
      of5: "of 5",
      bestOn: "Best on:",
      src_h: "AQWHub guide",
      src_c: "Community",
      src_g: "Baseline",
      close: "Close",
      how: "How to get",
      calYear: "{y} calendar in the Book of Lore (calendar code).",
      seeWiki: "See the class page on the AQW Wiki.",
      calClass: "Calendar class",
      via: "Comes from {x}.",
      same: "Same skills as:",
      noVar: "No variants share this kit.",
      cons: "Ultra consumables",
      consDef: "Malevolence Elixir + the tonic for the class's main stat.",
      enhH: "Best enhancement setups",
      thMode: "Mode",
      thClass: "Class",
      thWeapon: "Weapon",
      thHelm: "Helm",
      thCape: "Cape",
      noForge: "Without Forge:",
      skills: "Skills",
      rotH: "Skill rotations",
      generic: "No published combo exists for this class; the rotation above is a starting point based on its style. Check what each skill does on the wiki.",
      inherited: "Rotation from {x}, which has the exact same skills.",
      inTeams: "Ultra teams with this class",
      wikiLink: "View on the AQW Wiki (image and skills) \u2197",
      hubLink: "Full guide on AQWHub \u2197",
      tab_cmp: "Compare",
      cmp_sub: "Pick up to 3 classes to see side by side. You can also add one with the Compare button on its card.",
      cmp_ph: "Class {n}\u2026",
      cmp_clear: "Remove",
      cmp_empty: "Pick at least one class above to start.",
      cmp_add: "\uFF0B Compare",
      cmp_in: "\u2713 In comparison",
      cmp_full: "Comparison full (3)",
      row_store: "Store",
      row_type: "Style",
      row_build: "{m} build",
      row_rot: "Main rotation",
      row_how: "How to get",
      row_note: "Summary",
      enh_used: "Used by {n} classes",
      enh_used1: "Used by 1 class",
      enh_hide: "Hide classes",
      enh_all: "See all {n} classes",
      enh_flt: "Filter classes\u2026",
      enh_top: "Most used on",
      enh_modes: "F = Farm \xB7 S = Solo \xB7 U = Ultras",
      enh_none: "No suggested build in this guide uses this enhancement.",
      ag_h: "Ultra schedule",
      ag_reset: "Next weekly reset: Friday, {d}",
      today: "today",
      tomorrow: "tomorrow",
      inDays: "in {n} days",
      ag_weekly: "Weekly",
      ag_weekly_sub: "The weekly quest resets every Friday.",
      ag_season: "Seasonal",
      ag_season_sub: "Open during one month of the year only.",
      ag_now: "Available now",
      ag_back: "Back in {m}",
      ag_other: "Others",
      ag_other_sub: "No weekly reset listed in the guide; some require finishing the story.",
      tab_news: "News",
      news_sub: "New classes, reworks and balance changes that affect this guide. Anything you haven't seen yet is marked.",
      n_title: "Notifications",
      n_alerts: "Alerts",
      n_news: "Recent news",
      n_markall: "Mark all as read",
      n_seeall: "See all news",
      n_empty: "Nothing new here.",
      n_unread: "{n} updates since your last visit",
      n_unread1: "1 update since your last visit",
      bell: "Notifications: {n} unread",
      ty_new: "New class",
      ty_rework: "Rework",
      ty_balance: "Balance",
      ty_skin: "Skin",
      f_all: "All",
      view: "View",
      dismiss: "Dismiss",
      source: "Source",
      al_reset0: "Weekly reset today",
      al_reset0x: "The Drakath, Drago, Dage and Speaker weekly quests have reset.",
      al_reset1: "Weekly reset tomorrow",
      al_reset1x: "Last chance this week for the weekly ultras.",
      al_f13: "Friday the 13th on {d}",
      al_f13x: "Lich becomes available to non-members in /moreskulls ({r}).",
      al_f13now: "It's Friday the 13th",
      al_f13nowx: "Lich is available to everyone in /moreskulls.",
      al_seasonNow: "{u} is open this month",
      al_seasonNowx: "Seasonal ultra: get it done before the month ends.",
      al_seasonSoon: "{u} opens on {d}",
      al_seasonSoonx: "Seasonal ultra, {r}."
    }
  };

  // src/data/i18n/en.json
  var en_default = {
    "Feiticeira de sangue: Sanguine Pulse acerta 3 alvos com DoC e anti-cura, Malevolence faz dano em \xE1rea e Crimson Ritual troca vida por +50% de dano m\xE1gico. Nota estimada a partir das skills.": "Blood sorceress: Sanguine Pulse hits 3 targets with decay and anti-heal, Malevolence deals area damage and Crimson Ritual trades life for +50% spell damage. Rating estimated from the skills.",
    "Blood Lust (auto, cura no acerto)": "Blood Lust (auto, heals on hit)",
    "Sanguine Pulse (3 alvos, decay e anti-cura)": "Sanguine Pulse (3 targets, decay and anti-heal)",
    "Mirroring Arcane (3 alvos, stun e +20% haste)": "Mirroring Arcane (3 targets, stun and +20% haste)",
    "Malevolence (\xE1rea, cura e dano atrasado)": "Malevolence (area, heal and delayed damage)",
    "Crimson Ritual (+50% dano m\xE1gico)": "Crimson Ritual (+50% spell damage)",
    "Class Shop por 2.000 AC (n\xEDvel 10).": "Class Shop for 2,000 AC (level 10).",
    "A wiki n\xE3o informa exig\xEAncia de member.": "The wiki does not state a member requirement.",
    "Caster com DoT, roubo de vida e petrifica\xE7\xE3o; a skill 4 d\xE1 40% de resist\xEAncia quando o alvo resiste. Nota estimada a partir das skills.": "Caster with DoT, lifesteal and petrify; skill 4 grants 40% resistance when the target resists. Rating estimated from the skills.",
    "Super Taster (DoT e -20% haste e esquiva)": "Super Taster (DoT and -20% haste and dodge)",
    "I Just Want Your Half (roubo de vida)": "I Just Want Your Half (lifesteal)",
    "We Want a Rock (petrifica por 3s)": "We Want a Rock (petrify for 3s)",
    "Mass Of Incandescent Gas (dano alto e DoT)": "Mass Of Incandescent Gas (high damage and DoT)",
    "Class Shop por 2.000 AC, ou loja do Vindicator of They no local do Collector.": "Class Shop for 2,000 AC, or the Vindicator of They shop at the Collector's location.",
    "Existe tamb\xE9m a vers\xE3o por merge, com as mesmas skills.": "A merge version with the same skills also exists.",
    "Caster ofensivo que acumula Sigils: Energy Arc acerta 4 alvos e reduz haste, e Spellsmith Sigil cura e refor\xE7a o dano. Nota estimada a partir das skills.": "Offensive caster that stacks Sigils: Energy Arc hits 4 targets and slows them, and Spellsmith Sigil heals and boosts damage. Rating estimated from the skills.",
    "Spellsmith Blade (auto, dano por Sigils)": "Spellsmith Blade (auto, damage from Sigils)",
    "Energy Arc (4 alvos, reduz haste)": "Energy Arc (4 targets, lowers haste)",
    "Frostflame (stun e -20% dano do alvo)": "Frostflame (stun and -20% target damage)",
    "Sigil Overload (+10% dano por 15s)": "Sigil Overload (+10% damage for 15s)",
    "Spellsmith Sigil (cura e escudo)": "Spellsmith Sigil (heal and shield)",
    "Class Shop por 2.000 AC.": "Class Shop for 2,000 AC.",
    "A wiki recomenda o enhancement Wizard.": "The wiki recommends the Wizard enhancement.",
    "Dano f\xEDsico \xE0 dist\xE2ncia: Flashbang e Sleeping Gas aplicam debuffs e Reactive Grenade \xE9 um golpe forte que sempre crita. Nota estimada a partir das skills.": "Ranged physical damage: Flashbang and Sleeping Gas apply debuffs and Reactive Grenade is a heavy hit that always crits. Rating estimated from the skills.",
    "Bombard (auto \xE0 dist\xE2ncia)": "Bombard (ranged auto)",
    "Flashbang (-20% dano e acerto do alvo)": "Flashbang (-20% target damage and hit)",
    "Sleeping Gas (-20% defesa, chance de stun)": "Sleeping Gas (-20% defense, chance to stun)",
    "Reload (recupera toda a mana)": "Reload (restores all mana)",
    "Reactive Grenade (sempre crita)": "Reactive Grenade (always crits)",
    "Class Shop por 2.000 AC e loja de member.": "Class Shop for 2,000 AC and the member shop.",
    "A wiki n\xE3o diz se a conta member \xE9 obrigat\xF3ria.": "The wiki does not say whether a member account is required.",
    "Dano em at\xE9 3 alvos com cura: Devour Blood rouba vida e reduz o dano dos inimigos, e Aspect of The Bat d\xE1 +500% de haste e cr\xEDtico. Nota estimada a partir das skills.": "Damage on up to 3 targets with healing: Devour Blood lifesteals and lowers enemy damage, and Aspect of The Bat gives +500% haste and crit. Rating estimated from the skills.",
    "Slash (auto, 3 alvos)": "Slash (auto, 3 targets)",
    "Sonar Scream (alvos recebem +30% de dano)": "Sonar Scream (targets take +30% damage)",
    "Devour Blood (cura e -50% dano dos alvos)": "Devour Blood (heals and -50% target damage)",
    "Ghoul Gouge (3 alvos e DoT)": "Ghoul Gouge (3 targets and DoT)",
    "Aspect of The Bat (+500% haste e cr\xEDtico)": "Aspect of The Bat (+500% haste and crit)",
    "Class do Vampire Lord em Mystcroft por 2.000 AC.": "Vampire Lord Class in Mystcroft for 2,000 AC.",
    "Existe tamb\xE9m a vers\xE3o por merge. A wiki n\xE3o lista exig\xEAncia de member.": "A merge version also exists. The wiki lists no member requirement.",
    "Hybrid de \xE1rea com at\xE9 80% de resist\xEAncia: acerta at\xE9 6 alvos, acumula Consuming Shadows e fecha com Shadow Void. A wiki recomenda Lucky e Hybrid. Nota estimada a partir das skills.": "Area hybrid with up to 80% resistance: hits up to 6 targets, stacks Consuming Shadows and finishes with Shadow Void. The wiki recommends Lucky and Hybrid. Rating estimated from the skills.",
    "Shadow Slam (auto, acumula Shadows)": "Shadow Slam (auto, stacks Shadows)",
    "Shadow Blast (6 alvos, chance de petrificar)": "Shadow Blast (6 targets, chance to petrify)",
    "Bone Picker (6 alvos, buff acumul\xE1vel)": "Bone Picker (6 targets, stacking buff)",
    "Undead Rebirth (cura e anti-cura)": "Undead Rebirth (heal and anti-heal)",
    "Shadow Void (finalizador, sempre crita)": "Shadow Void (finisher, always crits)",
    "Loja do ShadowScythe General em Shadowfall por 2.000 AC.": "ShadowScythe General shop in Shadowfall for 2,000 AC.",
    "A vers\xE3o por merge tem as mesmas skills; a wiki n\xE3o informa os requisitos dela.": "The merge version has the same skills; the wiki does not give its requirements.",
    "Ninja de DoT e esquiva: Shadow Kunai empilha veneno, Chi Heal cura e Flaming Dragon queima e anula o pr\xF3ximo golpe do alvo. Nota estimada a partir das skills.": "DoT and dodge ninja: Shadow Kunai stacks poison, Chi Heal heals and Flaming Dragon burns and nullifies the target's next hit. Rating estimated from the skills.",
    "Shadow Kunai (veneno de at\xE9 10 stacks)": "Shadow Kunai (poison up to 10 stacks)",
    "Chi Heal (cura e +50% Endurance)": "Chi Heal (heal and +50% Endurance)",
    "Shadow Soul (recupera mana, -80% dano)": "Shadow Soul (restores mana, -80% damage)",
    "Flaming Dragon (queimadura e anula o pr\xF3ximo golpe)": "Flaming Dragon (burn and cancels next hit)",
    "Cole\xE7\xE3o Dark Holiday 2020 por 0 AC.": "Dark Holiday 2020 Collection for 0 AC.",
    "Existe tamb\xE9m a vers\xE3o por merge. A wiki n\xE3o informa exig\xEAncia de member.": "A merge version also exists. The wiki does not state a member requirement.",
    "Paladino h\xEDbrido de cura e defesa: Healing Word cura 3 aliados, Exorcise causa 306% contra mortos-vivos e Divine Recovery pode deixar o time invulner\xE1vel. Nota estimada a partir das skills.": "Hybrid paladin of healing and defense: Healing Word heals 3 allies, Exorcise deals 306% against undead and Divine Recovery can make the team invulnerable. Rating estimated from the skills.",
    "Abolish (dano e redu\xE7\xE3o de dano acumul\xE1vel)": "Abolish (damage and stacking damage reduction)",
    "Healing Word (cura voc\xEA e 2 aliados)": "Healing Word (heals you and 2 allies)",
    "Exorcise (3 alvos, 306% contra mortos-vivos)": "Exorcise (3 targets, 306% vs undead)",
    "Blinding Light (4 alvos, -50% acerto)": "Blinding Light (4 targets, -50% hit)",
    "Class Shop por 2.000 AC e loja de member; loja do Paladin em Lightguard Keep e Necropolis.": "Class Shop for 2,000 AC and the member shop; Paladin shop in Lightguard Keep and Necropolis.",
    "A wiki marca AC e Legend, mas n\xE3o diz se exige conta member.": "The wiki tags AC and Legend but does not say whether a member account is required.",
    "Muito Luck (chance de cr\xEDtico) e um pouco de todos os outros atributos. Serve para qualquer classe.": "Lots of Luck (crit chance) and a bit of every other stat. Works for any class.",
    "Todas as classes, principalmente as de Game of Chance": "Every class, especially Game of Chance classes",
    "Intellect, Wisdom, Luck e Endurance: aumenta o dano m\xE1gico. Para classes de magia.": "Intellect, Wisdom, Luck and Endurance: raises magic damage. For magic classes.",
    "Strength, Intellect, Dexterity e Endurance: sobe Attack Power, Spell Power, Haste, acerto e HP. Para classes que misturam corpo a corpo e magia.": "Strength, Intellect, Dexterity and Endurance: raises Attack Power, Spell Power, Haste, hit and HP. For classes that mix melee and magic.",
    "Legion Paladin, ShadowScythe General, Ninja": "Legion Paladin, ShadowScythe General, Ninja",
    "Strength, Dexterity e Endurance: sobe Attack Power, acerto e HP. Para classes corpo a corpo.": "Strength, Dexterity and Endurance: raises Attack Power, hit and HP. For melee classes.",
    "Drakel Warlord, DoomKnights, Blood Ancient": "Drakel Warlord, DoomKnights, Blood Ancient",
    "Dexterity (principal) com um pouco de Strength e Endurance: sobe Haste e acerto. Para classes furtivas e de esquiva.": "Dexterity (main) with some Strength and Endurance: raises Haste and hit. For stealthy and dodge classes.",
    "DeathKnight, Dragonlord, Rogue": "DeathKnight, Dragonlord, Rogue",
    "Intellect, bastante Endurance e um pouco de Wisdom. Para casters de cura.": "Intellect, plenty of Endurance and some Wisdom. For healing casters.",
    "Acolyte, Bard, Elemental Dracomancer": "Acolyte, Bard, Elemental Dracomancer",
    "Intellect, Dexterity, Endurance e Luck: sobe o dano m\xE1gico e a chance de cr\xEDtico. Para casters que dependem de cr\xEDtico.": "Intellect, Dexterity, Endurance and Luck: raises magic damage and crit chance. For casters that rely on crits.",
    "MindBreaker, Shaman, Sorcerer": "MindBreaker, Shaman, Sorcerer",
    "Aumenta a chance de cr\xEDtico. \xC9 a escolha padr\xE3o para a maioria das classes f\xEDsicas, h\xEDbridas e de suporte.": "Raises crit chance. The default choice for most physical, hybrid and support classes.",
    "Quase todas as classes n\xE3o m\xE1gicas": "Almost every non-magic class",
    "Foca em Intelligence e dano m\xE1gico. \xC9 o padr\xE3o das classes m\xE1gicas.": "Focuses on Intelligence and magic damage. The default for magic classes.",
    "Para classes de dano h\xEDbrido, que misturam for\xE7a e magia. As Design Notes da Legion Paladin recomendam junto com Lucky.": "For hybrid-damage classes that mix strength and magic. The Legion Paladin Design Notes recommend it alongside Lucky.",
    "Voltado a classes corpo a corpo e tanques f\xEDsicos. A wiki indica para a Drakel Warlord.": "Aimed at melee classes and physical tanks. The wiki recommends it for the Drakel Warlord.",
    "Drakel Warlord": "Drakel Warlord",
    "H\xEDbrida de dano e cura leve: Double Strike enfraquece o alvo, Maul atordoa e Field Medic cura o grupo. Nota estimada a partir das skills.": "Hybrid of damage and light healing: Double Strike weakens the target, Maul stuns and Field Medic heals the group. Rating estimated from the skills.",
    "Double Strike (-15% resist\xEAncia do alvo)": "Double Strike (-15% target resistance)",
    "Maul (stun de 3s)": "Maul (3s stun)",
    "Field Medic (cura o grupo)": "Field Medic (heals the group)",
    "Bunker Buster (dano verdadeiro, sempre crita)": "Bunker Buster (true damage, always crits)",
    "Class Shop por 1.000 AC (vers\xE3o sem Legend).": "Class Shop for 1,000 AC (non-Legend version).",
    "Existe tamb\xE9m a vers\xE3o Legend. A wiki n\xE3o lista exig\xEAncia de member.": "A Legend version also exists. The wiki lists no member requirement.",
    "Tanque que paga HP por skill: Crimson Shield reduz 80% do dano e as skills curam. Titan's Curse segura o boss. Nota estimada a partir das skills.": "Tank that pays HP for skills: Crimson Shield cuts 80% of damage and skills heal. Titan's Curse holds the boss. Rating estimated from the skills.",
    "Gilded Crusher (auto, dano pelo seu HP)": "Gilded Crusher (auto, damage from your HP)",
    "Titanic Smash (-60% dano do alvo)": "Titanic Smash (-60% target damage)",
    "Titan's Fury (+30% dano no alvo)": "Titan's Fury (+30% damage on target)",
    "Titan's Curse (taunt de 4s)": "Titan's Curse (4s taunt)",
    "Blood Rage (+100% dano f\xEDsico)": "Blood Rage (+100% physical damage)",
    "Class Shop por 2.000 AC (Class Hall C).": "Class Shop for 2,000 AC (Class Hall C).",
    "Aparece na loja de member da wiki; confirme se exige conta member.": "Listed in the member shop on the wiki; check whether it needs a member account.",
    "Dano alto \xE0 custa de vida: Blood Price gasta 50% do HP para +125% de dano e Soul Leech devolve vida. Nota estimada a partir das skills.": "High damage at the cost of health: Blood Price spends 50% of HP for +125% damage and Soul Leech returns life. Rating estimated from the skills.",
    "Soul Breaker (auto)": "Soul Breaker (auto)",
    "Soul Rend (mais dano com HP baixo)": "Soul Rend (more damage at low HP)",
    "Soul Leech (dano e cura)": "Soul Leech (damage and healing)",
    "Soul Pact (+50% defesa)": "Soul Pact (+50% defense)",
    "Blood Price (+125% dano por 10s)": "Blood Price (+125% damage for 10s)",
    "Vitrine de itens de mar\xE7o de 2018 por 2.000 AC, e h\xE1 uma vers\xE3o 0 AC.": "March 2018 Featured Item Showcase for 2,000 AC, and a 0 AC version exists.",
    "Dano m\xE1gico em \xE1rea (at\xE9 3 alvos) com cura de grupo e burn; \xF3timo para limpar mobs. Nota estimada a partir das skills.": "Magic area damage (up to 3 targets) with group healing and a burn; great for clearing mobs. Rating estimated from the skills.",
    "Actual Attack (auto)": "Actual Attack (auto)",
    "BrainWave (3 alvos + burn)": "BrainWave (3 targets + burn)",
    "Mass Affect (cura e buff aleat\xF3rio)": "Mass Affect (heal and random buff)",
    "Shattered Reality (-40% dano dos alvos)": "Shattered Reality (-40% target damage)",
    "Mind... BLOWN (3 alvos, +30% haste e crit)": "Mind... BLOWN (3 targets, +30% haste and crit)",
    "Class Shop ou loja do Ziri por 2.000 AC (vers\xE3o sem Legend).": "Class Shop or Ziri's shop for 2,000 AC (non-Legend version).",
    "Existe tamb\xE9m a vers\xE3o Legend, com as mesmas skills.": "A Legend version with the same skills also exists.",
    "Tanque f\xEDsico sem mana: Enter the Arena d\xE1 taunt e -50% de dano f\xEDsico, e Strengthened Strike empilha debuff. Nota estimada a partir das skills.": "Mana-free physical tank: Enter the Arena gives taunt and -50% physical damage, and Strengthened Strike stacks a debuff. Rating estimated from the skills.",
    "Drakel's Crushing Strike (auto)": "Drakel's Crushing Strike (auto)",
    "Strengthened Strike (debuff empilh\xE1vel)": "Strengthened Strike (stacking debuff)",
    "Raged Strike (stun em 3 alvos)": "Raged Strike (3-target stun)",
    "Strikes of Expertise (pr\xF3ximos 2 autos cr\xEDtam)": "Strikes of Expertise (next 2 autos crit)",
    "Enter the Arena (taunt e -50% dano f\xEDsico)": "Enter the Arena (taunt and -50% physical damage)",
    "Class Shop por 2.000 AC (vers\xE3o sem Legend).": "Class Shop for 2,000 AC (non-Legend version).",
    "A wiki recomenda o enhancement Fighter e h\xE1 uma vers\xE3o Legend.": "The wiki recommends the Fighter enhancement and a Legend version exists.",
    "Dano em v\xE1rios alvos com DoT empilh\xE1vel; Flight e Crystallis Veil refor\xE7am esquiva, cr\xEDtico e defesa. Nota estimada a partir das skills.": "Multi-target damage with a stacking DoT; Flight and Crystallis Veil boost dodge, crit and defense. Rating estimated from the skills.",
    "Vice Bolt (auto, 3 alvos + DoT)": "Vice Bolt (auto, 3 targets + DoT)",
    "Flight (+acerto e esquiva)": "Flight (+hit and dodge)",
    "Aphotic Overdrive (4 alvos, stun)": "Aphotic Overdrive (4 targets, stun)",
    "Fallen's Judgement (4x Endurance + cura)": "Fallen's Judgement (4x Endurance + heal)",
    "Crystallis Veil (+25% resist\xEAncia, +15% crit)": "Crystallis Veil (+25% resistance, +15% crit)",
    "Class Hall do Abyssal Angel por 2.000 AC.": "Abyssal Angel Class hall for 2,000 AC.",
    "H\xEDbrida: acumula Souls para dano e converte em Spirits para curar, taunt e debuffs. As Design Notes indicam Lucky e Hybrid.": "Hybrid: stacks Souls for damage and converts them into Spirits for healing, taunt and debuffs. The Design Notes recommend Lucky and Hybrid.",
    "Desecration (auto, d\xE1 Soul)": "Desecration (auto, grants a Soul)",
    "Blasphemous Battleaxe (dano por Souls, Defiled com Spirits)": "Blasphemous Battleaxe (damage scales with Souls, Defiled with Spirits)",
    "Soul Convertor (cura 7 aliados, Souls viram Spirits)": "Soul Convertor (heals 7 allies, Souls become Spirits)",
    "Incantation of Sin (150%, taunt com Spirits)": "Incantation of Sin (150%, taunt with Spirits)",
    "Shadowblight (350%, DoT que reduz resist\xEAncias)": "Shadowblight (350%, DoT that lowers resistances)",
    "Rota\xE7\xE3o com Spirits": "Spirits rotation",
    "auto at\xE9 10+ Souls \u2192 3 \u2192 2 \xB7 4 \xB7 5": "auto to 10+ Souls \u2192 3 \u2192 2 \xB7 4 \xB7 5",
    "Acumule Souls com o auto e o 2, converta em Spirits com o 3 e ent\xE3o use 2, 4 e 5 para ganhar os debuffs, o taunt e o DoT. Rota\xE7\xE3o deduzida das descri\xE7\xF5es, sem guia de comunidade.": "Build Souls with the auto and skill 2, convert them to Spirits with 3, then use 2, 4 and 5 to get the debuffs, the taunt and the DoT. Rotation inferred from the skill descriptions, no community guide yet.",
    "Camisetas Legion Armor e Paladin Armor da HeroMart: cada uma d\xE1 metade da classe e voc\xEA junta as duas no jogo.": "Legion Armor and Paladin Armor T-shirts from HeroMart: each gives half the class and you combine both in game.",
    "Reformulada em maio de 2024. As camisetas tinham estoque limitado, ent\xE3o confirme no jogo se ainda d\xE1 para obter.": "Reworked in May 2024. The T-shirts were limited stock, so check in game whether it can still be obtained.",
    F\u00EDsico: "Physical",
    "Padr\xE3o de dano": "Damage baseline",
    "Abra com a skill que aplica buff ou debuff, use o restante por recarga e guarde o 5 para quando os buffs estiverem ativos.": "Open with the skill that applies a buff or debuff, use the rest on cooldown and save 5 for when your buffs are up.",
    M\u00E1gico: "Magical",
    "Padr\xE3o m\xE1gico": "Magic baseline",
    "Mantenha DoTs e debuffs ativos e solte o 5 quando o dano acumulado estiver no m\xE1ximo.": "Keep DoTs and debuffs up and fire 5 when the stacked damage peaks.",
    "M\xE1gico (mana)": "Magical (mana)",
    "Padr\xE3o de farm": "Farming baseline",
    "Gasta muita mana: com Elysium d\xE1 para usar tudo por recarga sem parar.": "Burns lots of mana: with Elysium you can use everything on cooldown nonstop.",
    Suporte: "Support",
    "Padr\xE3o de suporte": "Support baseline",
    "Aplique buffs e curas antes da luta, mantenha o debuff no boss e encaixe o dano entre as recargas.": "Apply buffs and heals before the fight, keep the debuff on the boss and fit damage in between cooldowns.",
    "Padr\xE3o de dodge": "Dodge baseline",
    "Mantenha o buff de esquiva ativo antes de gastar as skills de dano.": "Keep your dodge buff up before spending damage skills.",
    Calend\u00E1rio: "Calendar",
    "Padr\xE3o de calend\xE1rio": "Calendar baseline",
    "A maioria dos Chronomancers acumula stacks com a skill 2 (por isso Dauntless e Lacerate) e gasta no nuke.": "Most Chronomancers build stacks with skill 2 (hence Dauntless and Lacerate) and spend them on the nuke.",
    "DPS em \xE1rea e o melhor aplicador de Arcana's Concerto em ultras.": "AoE DPS and the best Arcana's Concerto applier in ultras.",
    "Suporte com cura em grupo e redu\xE7\xE3o de dano do boss; presente em quase todo time de ultra.": "Support with party heals and boss damage reduction; in almost every ultra team.",
    "Rota\xE7\xE3o principal": "Main rotation",
    "3 \u2192 4 \u2192 2 2 2 \u2192 5 \u2192 3 (cura) \u2192 4": "3 \u2192 4 \u2192 2 2 2 \u2192 5 \u2192 3 (heal) \u2192 4",
    "Use 3 antes da luta, abra com 4, spam 2 at\xE9 o 4 quase acabar, solte 5 antes dele expirar, 3 quando precisar curar e repita.": "Use 3 before the fight, open with 4, spam 2 until 4 is about to end, fire 5 before it expires, 3 when you need healing, and repeat.",
    "Mesma rota\xE7\xE3o, com Lacerate \xB7 Forge \xB7 Penitence": "Same rotation, with Lacerate \xB7 Forge \xB7 Penitence",
    "Build espec\xEDfica do guia para essa luta.": "The guide's specific build for this fight.",
    "Commandment (\xE1rea, debuffs)": "Commandment (AoE, debuffs)",
    "Hymn of Light (cura em \xE1rea +DEF)": "Hymn of Light (AoE heal +DEF)",
    "Righteous Seal (-90% dano do alvo)": "Righteous Seal (-90% target damage)",
    "Sacred Magic: Eden (nuke, dobra com o 4)": "Sacred Magic: Eden (nuke, doubles with 4)",
    "Suporte e taunt; aplica Quixotic e segura stacks de Order em ultras.": "Support and taunt; applies Quixotic and holds Order stacks in ultras.",
    "Dano f\xEDsico pesado e taunt; um dos melhores tanques de ultra e \xF3timo para solo.": "Heavy physical damage and taunt; one of the best ultra tanks and great for soloing.",
    "Cl\xE1ssico do farm e do solo: crit alto e fica mais forte com HP baixo.": "A farming and solo classic: high crit and stronger at low HP.",
    "Dano geral": "General damage",
    "Spam 2, 3 e 4 por recarga e sempre use o 4 antes do 5 para o nuke sair com o buff.": "Spam 2, 3 and 4 on cooldown and always use 4 before 5 so the nuke lands buffed.",
    "Boss que bate forte": "Hard-hitting boss",
    "Comece pelo 5 para pegar os buffs defensivos logo de cara.": "Start with 5 to get its defensive buffs right away.",
    "Boss muito forte": "Very hard-hitting boss",
    "2 3 5 (sem o 4)": "2 3 5 (no 4)",
    "Mant\xE9m a cura do auto e as defesas do Shackle.": "Keeps the auto-attack heal and Shackle's defenses.",
    "Com Dauntless": "With Dauntless",
    "2 3 4 at\xE9 ~500 HP \xB7 depois spam 2 e 5": "2 3 4 until ~500 HP \xB7 then spam 2 and 5",
    "Fica em Shackled, derruba o pr\xF3prio HP e passa a spammar 2 e 5.": "Stay Shackled, drop your own HP, then spam 2 and 5.",
    "Armageddon (nuke)": "Armageddon (nuke)",
    "Solo excelente com dano sustentado; em grupo vira burst com Ravenous.": "Excellent solo with sustained damage; becomes burst support in groups with Ravenous.",
    "2 \u2192 234 \xB7 234 \u2026 \u2192 5 com 10 stacks": "2 \u2192 234 \xB7 234 \u2026 \u2192 5 at 10 stacks",
    "Abra com 2 para baixar a defesa, repita 234 at\xE9 10 stacks de Doom e ative o 5. Gaste Darkness no 3 (defesa) ou no 2 (crit).": "Open with 2 to lower defense, repeat 234 until 10 Doom stacks, then trigger 5. Spend Darkness on 3 (defense) or 2 (crit).",
    "Soul Fracture (-defesa)": "Soul Fracture (-defense)",
    "Classe do /timeinn: sustain alto no solo e boa no farm.": "The /timeinn class: high solo sustain and good for farming.",
    "Healer ou Wizard + Health Vamp (farm) / Awe Blast (solo)": "Healer or Wizard + Health Vamp (farm) / Awe Blast (solo)",
    "Spam 3, 4 e 5.": "Spam 3, 4 and 5.",
    "Repetir o ciclo; 2 primeiro para os buffs.": "Repeat the cycle; 2 first for the buffs.",
    "Endgame de Darkon com ciclo de cartas; um dos maiores DPS do jogo.": "Darkon endgame class with a card cycle; one of the highest DPS in the game.",
    "Ciclo completo": "Full cycle",
    "2 \u2192 3 (4/5 entre) \u2192 Judgement \u2192 2 \u2192 spam 3 4 5 \u2192 2": "2 \u2192 3 (4/5 between) \u2192 Judgement \u2192 2 \u2192 spam 3 4 5 \u2192 2",
    "Comece com 2, priorize 3 para chegar no Judgement, use 2 para entrar em The World, spam 3-4-5 e use 2 de novo quando o World estiver acabando.": "Start with 2, prioritize 3 to reach Judgement, use 2 to enter The World, spam 3-4-5 and use 2 again as The World is ending.",
    "Gasta mana muito r\xE1pido; vira top farmer com Elysium e top solo com Acheron.": "Burns mana very fast; a top farmer with Elysium and a top soloer with Acheron.",
    "Solo (Acheron ou Valiance)": "Solo (Acheron or Valiance)",
    "3542423423 \xB7 542423 (repetir)": "3542423423 \xB7 542423 (repeat)",
    "Combo compartilhado por jogadores; sem Acheron, use Valiance.": "Combo shared by players; without Acheron, use Valiance.",
    "Burst f\xEDsico r\xE1pido para solo e farm de curto alcance.": "Fast physical burst for soloing and short-range farming.",
    "Dodge e auto-ataques r\xE1pidos; ping alto atrapalha.": "Dodge and fast auto-attacks; high ping hurts it.",
    "Dano m\xE1ximo": "Max damage",
    "Combos com muito 3 combinam com Ravenous.": "3-heavy combos pair well with Ravenous.",
    "Dodge simples": "Simple dodge",
    "4 2 5 3 2 3 \xB7 loop 4 2 3 2 3 (5 por recarga)": "4 2 5 3 2 3 \xB7 loop 4 2 3 2 3 (5 on cooldown)",
    "Vers\xE3o f\xE1cil para n\xE3o morrer.": "The easy version to stay alive.",
    "Farmer m\xE1gico de \xE1rea.": "Magical AoE farmer.",
    "Classe de anivers\xE1rio de 18 anos: farmer e debuffer com stacks de Madness e pet tent\xE1culo.": "18th birthday class: farmer and debuffer with Madness stacks and a tentacle pet.",
    "Suporte de cura com DoT/HoT; usa Absolution em ultras.": "Healing support with DoT/HoT; uses Absolution in ultras.",
    "Dano em grupo com Decay em ultras; anula a cura do Dage.": "Group damage with Decay in ultras; cancels Dage's healing.",
    "Joga com HP baixo; \xF3timo com Dauntless.": "Plays at low HP; great with Dauntless.",
    "Solo resistente com suporte leve.": "Tanky solo with light support.",
    "Dodge para solo.": "Dodge for soloing.",
    "Dodge e solo intermedi\xE1rio.": "Dodge and mid-game soloing.",
    "Farm de \xE1rea.": "AoE farming.",
    "Farmer da Nation.": "Nation farmer.",
    "Solo e tanque; o 3 exige cuidado em grupo.": "Solo and tank; be careful with 3 in groups.",
    "Solo e tanque.": "Solo and tank.",
    "Farm de \xE1rea para o come\xE7o do jogo.": "Early-game AoE farming.",
    "Farm e solo intermedi\xE1rios.": "Mid-game farming and soloing.",
    "Farm e solo com lifesteal no in\xEDcio do jogo.": "Early-game farming and soloing with lifesteal.",
    "Taunt alternativo para ultras e solo.": "Backup taunt for ultras, plus soloing.",
    "Forte s\xF3 contra monstros Chaos. Reworkada em 2025.": "Only strong against Chaos monsters. Reworked in 2025.",
    "Pet e DoTs; revisada em 2025.": "Pet and DoTs; revised in 2025.",
    "Farm cedo, depois de Vath/Kitsune.": "Early farming, after Vath/Kitsune.",
    "Farm, solo e suporte; usado no time do Exaltia.": "Farming, soloing and support; used in the Exaltia team.",
    "Solo com esquiva.": "Dodge-based soloing.",
    "Dodge b\xE1sico.": "Basic dodge.",
    "Pr\xE9-requisito do Blaze Binder (rank 10).": "Blaze Binder prerequisite (rank 10).",
    "Solo inicial.": "Early-game soloing.",
    "Solo no come\xE7o do jogo.": "Early-game soloing.",
    "Suporte de buffs; revisada em 2025.": "Buff support; revised in 2025.",
    "Suporte.": "Support.",
    "Solo e suporte iniciais.": "Early soloing and support.",
    "Farm inicial; dif\xEDcil de conseguir cedo.": "Early farming; hard to get early on.",
    "Uma das primeiras classes \xFAteis.": "One of the first useful classes.",
    "Classe inicial de cura.": "Starter healing class.",
    "Classe inicial de farm.": "Starter farming class.",
    "Classe inicial; arriscada.": "Starter class; risky.",
    "Pr\xE9-requisito do Dragon of Time; obtenha, mas n\xE3o use.": "Dragon of Time prerequisite; get it, but don't use it.",
    "Lan\xE7ada em 2025; sazonal (sexta-feira 13) para quem n\xE3o \xE9 member.": "Released in 2025; seasonal (Friday the 13th) for non-members.",
    "Muito r\xE1pido em salas com dois monstros (ex.: sevencircleswar).": "Very fast in two-monster rooms (e.g. sevencircleswar).",
    "Combo inicial": "Starter combo",
    "O guia sugere come\xE7ar por este combo e ajustar conforme o mapa.": "The guide suggests starting with this combo and adjusting per map.",
    "Blizzard (passiva)": "Blizzard (passive)",
    "Farmer de \xE1rea recomendado em guias de boss farm.": "AoE farmer recommended in boss-farming guides.",
    "Taunt alternativo em ultras; sem daily desde 2025.": "Backup ultra taunt; no daily since 2025.",
    "Tanque com taunt ideal para Champion Drakath; reworkada em 2025.": "Taunt tank, ideal for Champion Drakath; reworked in 2025.",
    "Solo e tanque; sazonal.": "Solo and tank; seasonal.",
    "Forte s\xF3 contra Undead.": "Only strong against Undead.",
    "Solo sazonal.": "Seasonal soloer.",
    "Dodge; dif\xEDcil de conseguir.": "Dodge; hard to get.",
    "Dodge com pets.": "Dodge with pets.",
    "Dodge arriscado.": "Risky dodge.",
    "Um dos farmers mais r\xE1pidos; combina com Smite.": "One of the fastest farmers; pairs with Smite.",
    "Pistoleiro do tempo: dano alto e modo Gunslinger.": "Time gunslinger: high damage and a Gunslinger mode.",
    "DPS padr\xE3o": "Standard DPS",
    "Rota\xE7\xE3o base com Temporal Rift.": "Base rotation with Temporal Rift.",
    "Espere um dodge ou erro antes de cada trecho.": "Wait for a dodge or miss before each segment.",
    "DPS padr\xE3o, trocando um 4 por 3 quando precisar de cura": "Standard DPS, swapping a 4 for a 3 when you need healing",
    "Ex.: Ultra Darkon.": "E.g. Ultra Darkon.",
    "Reload (Gunslinger com 4+ Rift)": "Reload (Gunslinger at 4+ Rift)",
    "FMJ Rounds (dano principal)": "FMJ Rounds (main damage)",
    "Variante AC da classe de calend\xE1rio; crit alto com Vim.": "AC variant of the calendar class; high crit with Vim.",
    "Solo com dodge": "Solo with dodge",
    "Espere o 5 acabar antes de repetir.": "Wait for 5 to end before repeating.",
    "Solo s\xF3 dano": "Solo, pure damage",
    "Sem foco em esquiva.": "No focus on dodging.",
    "4235232 \xB7 ap\xF3s respawn 435232": "4235232 \xB7 after respawn 435232",
    "Para matar o mesmo boss v\xE1rias vezes.": "For killing the same boss repeatedly.",
    "Silhouette/Shadow Warp (dodge, taunta)": "Silhouette/Shadow Warp (dodge, taunts)",
    "Temporal Eclipse (haste e crit)": "Temporal Eclipse (haste and crit)",
    "Farm f\xE1cil com spam de skills.": "Easy farming by spamming skills.",
    "2 3 4 (spam) \xB7 5 com HP baixo": "2 3 4 (spam) \xB7 5 at low HP",
    "Dica de jogadores.": "Player tip.",
    "Ganha muito com Elysium.": "Gains a lot from Elysium.",
    "Vers\xE3o AC do SwordMaster Assassin.": "AC version of SwordMaster Assassin.",
    "Farm e solo da Nation.": "Nation farming and soloing.",
    "Arriscada; exige habilidade.": "Risky; takes skill.",
    "Skin do StoneCrusher: mesmas skills, nova arte.": "StoneCrusher skin: same skills, new art.",
    "Calend\xE1rio 2026: sem auto-ataque e 9 combina\xE7\xF5es de Index.": "2026 calendar: no auto-attack and 9 Index combinations.",
    Estrutura: "Structure",
    "Lorebook of Beginnings \u2192 combina\xE7\xE3o de Index": "Lorebook of Beginnings \u2192 Index combination",
    "Sempre abra com o Lorebook; cada Index muda conforme o Index ativo (dano, crit, defesa ou cura).": "Always open with the Lorebook; each Index changes with the active Index (damage, crit, defense or heal).",
    "Calend\xE1rio com taunt e dano; tanque do Ultra Tyndarius.": "Calendar class with taunt and damage; the Ultra Tyndarius tank.",
    "Para bosses; n\xE3o use para farm de mobs. Tem vers\xE3o AC e vers\xE3o Merge.": "For bosses; don't use it to farm mobs. Has AC and Merge versions.",
    "Em bosses, solte o nuke com 3 stacks de Rift.": "On bosses, fire the nuke at 3 Rift stacks.",
    "Hourglass Inversion (cura)": "Hourglass Inversion (heal)",
    "Suporte e dano em times de ultra.": "Support and damage in ultra teams.",
    "Substitui o ArchPaladin como curandeiro em ultras.": "Replaces ArchPaladin as the ultra healer.",
    "Rework de ago/2026: Detect Living em 20 stacks d\xE1 +500% de crit.": "Aug 2026 rework: Detect Living at 20 stacks gives +500% crit.",
    "Rework de 2026: cartas aleat\xF3rias viram buffs, debuffs ou dano.": "2026 rework: random cards become buffs, debuffs or damage.",
    "Solo e farm intermedi\xE1rios.": "Mid-game soloing and farming.",
    "Farmer com invoca\xE7\xF5es.": "Summoner farmer.",
    "Vers\xE3o HeroMart do Legendary Elemental Warrior.": "HeroMart version of Legendary Elemental Warrior.",
    "Vers\xE3o HeroMart do Berserker.": "HeroMart version of Berserker.",
    "Vers\xE3o atual do Chronomancer original, com rifts e nuke de at\xE9 4 stacks.": "Current version of the original Chronomancer, with rifts and a nuke of up to 4 stacks.",
    "Com Dauntless ou suporte": "With Dauntless or support",
    "Evite o 3, porque voc\xEA j\xE1 tem haste. Diminua os 2 se precisar.": "Skip 3, since you already have haste. Use fewer 2s if needed.",
    "Com Lacerate": "With Lacerate",
    "O 5 vira opcional, j\xE1 que o Lacerate reduz o dodge do alvo; o 3 d\xE1 a haste.": "5 becomes optional since Lacerate lowers the target's dodge; 3 gives the haste.",
    "Temporal Strike (acumula Rift)": "Temporal Strike (builds Rift)",
    "Rift Inversion (cura + 15% haste)": "Rift Inversion (heal + 15% haste)",
    "Rift Collapse (nuke, at\xE9 4 rifts)": "Rift Collapse (nuke, up to 4 rifts)",
    "A primeira classe de calend\xE1rio.": "The first calendar class.",
    "Calend\xE1rio antigo; pr\xE9-requisito de algumas quests.": "Old calendar class; prerequisite for some quests.",
    "Mesmas skills do ChronoCorruptor.": "Same skills as ChronoCorruptor.",
    "Calend\xE1rio 2013.": "2013 calendar.",
    "Mesmas skills do TimeKiller.": "Same skills as TimeKiller.",
    "Calend\xE1rio 2014: tanque corpo a corpo (stat model Tank Melee).": "2014 calendar: melee tank (Tank Melee stat model).",
    "Mesmas skills do ChronoCommander.": "Same skills as ChronoCommander.",
    "Calend\xE1rio 2015: caster ofensivo.": "2015 calendar: offensive caster.",
    "Mesmas skills do Chrono DragonKnight.": "Same skills as Chrono DragonKnight.",
    "Calend\xE1rio 2016: caster ofensivo h\xEDbrido.": "2016 calendar: hybrid offensive caster.",
    "Mesmas skills do Infinity Knight.": "Same skills as Infinity Knight.",
    "Calend\xE1rio 2017; mesmas skills do ShadowWeaver e do ShadowStalker.": "2017 calendar; same skills as ShadowWeaver and ShadowStalker.",
    "Crit consistente e recargas r\xE1pidas; \xF3tima em grupo com Valiance.": "Consistent crits and fast cooldowns; great in groups with Valiance.",
    Grupo: "Group",
    "Abre com 5-2 e aplica o buff The Fourth Dimension.": "Open with 5-2 and apply The Fourth Dimension buff.",
    "Solo (crit constante)": "Solo (consistent crit)",
    "Abre com 5-2 e aplica o buff Enter Infinity.": "Open with 5-2 and apply the Enter Infinity buff.",
    "Calend\xE1rio 2018; mesmas skills do Empyrean e do Immortal.": "2018 calendar; same skills as Empyrean and Immortal.",
    "Vers\xE3o AC do Eternal Chronomancer.": "AC version of Eternal Chronomancer.",
    "Calend\xE1rio 2019; usa pet de ampulheta. Mesmas skills do Timeless.": "2019 calendar; uses an hourglass pet. Same skills as Timeless.",
    "Calend\xE1rio 2020; variante do Corrupted Chronomancer.": "2020 calendar; variant of Corrupted Chronomancer.",
    "Vers\xE3o AC/Merge da fam\xEDlia do Timeless.": "AC/Merge version in the Timeless family.",
    "Calend\xE1rio 2021 (Power Melee); mesmas skills do Necrotic Chronomancer.": "2021 calendar (Power Melee); same skills as Necrotic Chronomancer.",
    "Calend\xE1rio 2022; usado no setup mais r\xE1pido do Ultra Nulgath.": "2022 calendar; used in the fastest Ultra Nulgath setup.",
    "Mesmas skills do Paladin Chronomancer.": "Same skills as Paladin Chronomancer.",
    "Calend\xE1rio 2024; mesmas skills do Chrono ShadowSlayer.": "2024 calendar; same skills as Chrono ShadowSlayer.",
    "Calend\xE1rio 2025 (Power Caster); reworkada em 2025.": "2025 calendar (Power Caster); reworked in 2025.",
    "Mesmas skills do Phantom Chronomancer.": "Same skills as Phantom Chronomancer.",
    "Calend\xE1rio 2026; mesmas skills do Archivist of Time.": "2026 calendar; same skills as Archivist of Time.",
    "Recompensa da quest Legion Fealty 4 em /revenant.": "Reward from the Legion Fealty 4 quest in /revenant.",
    "Precisa ser da Legion (concluir Fail to the King).": "Requires Legion membership (complete Fail to the King).",
    "Void Highlord Merge Shop em /tercessuinotlim.": "Void Highlord Merge Shop in /tercessuinotlim.",
    "Exige completar os trials da Nation.": "Requires completing the Nation trials.",
    "ArchPaladin Shop no Throne of Darkness Hub.": "ArchPaladin Shop in the Throne of Darkness Hub.",
    "Vers\xE3o 0 AC; tamb\xE9m existe vers\xE3o AC.": "0 AC version; an AC version also exists.",
    "Quest The Final Challenge (Mirror Drakath) em /battleoff.": "The Final Challenge quest (Mirror Drakath) in /battleoff.",
    "Cadeia de quests di\xE1rias, liberada para free player.": "Daily quest chain, open to free players.",
    "Recompensa do Champion Drakath em /championdrakath.": "Champion Drakath reward in /championdrakath.",
    "Quest semanal, reseta \xE0s sextas.": "Weekly quest, resets on Fridays.",
    "Verus DoomKnight Shop em /terminatemple.": "Verus DoomKnight Shop in /terminatemple.",
    "Quest Hero's Heartbeat em /timeinn.": "Hero's Heartbeat quest in /timeinn.",
    "N\xEDvel base 75; pede Thief of Hours.": "Base level 75; requires Thief of Hours.",
    "Arcana Invoker Class Shop em /arcana.": "Arcana Invoker Class Shop in /arcana.",
    "Concluir a quest Endless Beginning, Final Ends; 0 AC.": "Complete the Endless Beginning, Final Ends quest; 0 AC.",
    "Quest Archmage's Ascension (quests do Warlic).": "Archmage's Ascension quest (Warlic's quests).",
    "Quest Yami no Ronin (quests do Dage) em /darkally.": "Yami no Ronin quest (Dage's quests) in /darkally.",
    "Quest LightCaster Class (quests do Aranx, Celestial Realm).": "LightCaster Class quest (Aranx's quests, Celestial Realm).",
    "Quest Lich Class em /moreskulls.": "Lich Class quest in /moreskulls.",
    "Sazonal (sexta-feira 13) para quem n\xE3o \xE9 member.": "Seasonal (Friday the 13th) for non-members.",
    "Exclusiva da Legion.": "Legion only.",
    "Merge ou AC.": "Merge or AC.",
    "Exige Pyromancer rank 10.": "Requires Pyromancer rank 10.",
    "Quest Adeptus Kathooli em /callofkathool.": "Adeptus Kathooli quest in /callofkathool.",
    "Exige Elven Heritage Guardian, Sur-gion Tokens, Sun Zone Chits e Sundered Tentacles.": "Requires Elven Heritage Guardian, Sur-gion Tokens, Sun Zone Chits and Sundered Tentacles.",
    "Com o Ragnar (Battleon) ou Loremaster Maya.": "From Ragnar (Battleon) or Loremaster Maya.",
    "Calend\xE1rio 2026 Paradox of Lore ou Chrono Bundle na HeroMart.": "2026 Paradox of Lore calendar or Chrono Bundle on HeroMart.",
    "Variante por AC ou HeroPoints prevista para o fim de 2026.": "An AC or HeroPoints variant is planned for late 2026.",
    "Produto da HeroMart.": "HeroMart product.",
    "Mesmas skills do StoneCrusher.": "Same skills as StoneCrusher.",
    "Produto da HeroMart; reworkada em 07/08/2026.": "HeroMart product; reworked on Aug 7, 2026.",
    "Produto da HeroMart; reworkada em 2026.": "HeroMart product; reworked in 2026.",
    "Quem tinha a vers\xE3o antiga ganha o pet Pyramid Box.": "Owners of the old version get the Pyramid Box pet.",
    "Pr\xE9-requisito do Dragon of Time.": "Dragon of Time prerequisite.",
    "Daily de 4 dias.": "4-day daily.",
    "Daily de 7 dias.": "7-day daily.",
    "Daily de 90 dias.": "90-day daily.",
    "AE Calendar Shop no Book of Lore.": "AE Calendar Shop in the Book of Lore.",
    "HeroMart: 2011 Timelock Key ou merge de 5 HeroPoints.": "HeroMart: 2011 Timelock Key or a 5-HeroPoint merge.",
    "ChronoCorruptor Shop no Book of Lore.": "ChronoCorruptor Shop in the Book of Lore.",
    "HeroMart: 2013 Timelock Key ou merge de 5 HeroPoints.": "HeroMart: 2013 Timelock Key or a 5-HeroPoint merge.",
    "Calend\xE1rio 2019 no Book of Lore.": "2019 calendar in the Book of Lore.",
    "Usa os pets de ampulheta do calend\xE1rio.": "Uses the calendar's hourglass pets.",
    "Calend\xE1rio 2022 no Book of Lore, 2022 Timelock Key ou merge de 5 HeroPoints na HeroMart.": "2022 calendar in the Book of Lore, 2022 Timelock Key or a 5-HeroPoint merge on HeroMart.",
    "Merge de 5 HeroPoints na HeroMart.": "5-HeroPoint merge on HeroMart.",
    "Merge de 5 HeroPoints (HeroMart, Book of Lore ou Curiosities).": "5-HeroPoint merge (HeroMart, Book of Lore or Curiosities).",
    "Merge de 5 HeroPoints na HeroMart ou calend\xE1rio 2026.": "5-HeroPoint merge on HeroMart or the 2026 calendar.",
    "Loja do /curio por 6.000 ACs.": "/curio shop for 6,000 ACs.",
    "Os visuais s\xE3o vendidos junto com os do Immortal Chronomancer.": "Its cosmetics are sold alongside Immortal Chronomancer's.",
    "Vers\xE3o AC (h\xE1 tamb\xE9m uma vers\xE3o Special).": "AC version (there is also a Special version).",
    "Vers\xF5es AC e Merge.": "AC and Merge versions.",
    "Fate Tonic + Malevolence Elixir (no Drakath: Body Tonic + Revitalise Elixir)": "Fate Tonic + Malevolence Elixir (on Drakath: Body Tonic + Revitalise Elixir)",
    "Might Tonic ou Fate Tonic + Battle Elixir": "Might Tonic or Fate Tonic + Battle Elixir",
    Semanal: "Weekly",
    Dano: "Damage",
    "Suporte + DPS em grupo": "Support + group DPS",
    "Taunt (Scroll of Enrage) + suporte": "Taunt (Scroll of Enrage) + support",
    Cura: "Healing",
    "Ele solta um ataque enorme a cada 2M de HP (18M, 16M, 14M\u2026; menos em 10M e 2M). Taunte logo antes de cada marca.": "He fires a huge attack every 2M HP (18M, 16M, 14M\u2026; not at 10M and 2M). Taunt just before each mark.",
    "S\xE3o 7 Scrolls of Enrage para a luta toda.": "The full fight takes 7 Scrolls of Enrage.",
    "Use armas com boost contra Chaos; StoneCrusher n\xE3o ganha com boost (DoT/HoT).": "Use Chaos-boost weapons; StoneCrusher doesn't benefit from boosts (DoT/HoT).",
    "Naval Commander como tanque \xE9 a escolha ideal segundo outro guia; DeathKnight Lord tamb\xE9m serve.": "Another guide calls Naval Commander the ideal tank; DeathKnight Lord also works.",
    "Mec\xE2nica dif\xEDcil": "Hard mechanics",
    "Suporte + tanque": "Support + tank",
    "Os contratos Frailty \u2192 Despair \u2192 Stagnation precisam ficar alternando entre os dois taunters.": "The Frailty \u2192 Despair \u2192 Stagnation contracts must keep rotating between the two taunters.",
    "Taunter 1 usa Enrage 6 s ap\xF3s o in\xEDcio; taunter 2 na fala 'Behold the power of the Abyss'.": "Taunter 1 enrages 6 s after the start; taunter 2 on the line 'Behold the power of the Abyss'.",
    "Overfiend Blade mata o time se ficar vivo 45 s; mate s\xF3 para evitar o nuke (0 a 2 vezes).": "Overfiend Blade wipes the team if alive for 45 s; kill it only to avoid the nuke (0 to 2 times).",
    "Chaos Avenger \xD72 + Lord of Order + Legion Revenant dispensa scrolls, mas o timing \xE9 mais r\xEDgido. Com 3 pessoas: Lord of Order, ArchPaladin e Legion Revenant.": "Chaos Avenger \xD72 + Lord of Order + Legion Revenant needs no scrolls but has stricter timing. With 3 players: Lord of Order, ArchPaladin and Legion Revenant.",
    "Taunt + dano": "Taunt + damage",
    "Suporte + Quixotic": "Support + Quixotic",
    "Ordem: Bowmaster, Executioner, Drago.": "Order: Bowmaster, Executioner, Drago.",
    "Se os dois primeiros levarem mais de 3 min, o Drago mata o time.": "If the first two take over 3 min, Drago wipes the team.",
    "Lord of Order fica no Executioner e usa Quixotic logo antes do Bowmaster morrer.": "Lord of Order stays on Executioner and uses Quixotic right before Bowmaster dies.",
    "Use boost contra Humanos.": "Use Human-boost gear.",
    "Recompensa: Prince Darkon's Poleaxe.": "Reward: Prince Darkon's Poleaxe.",
    "DPS em grupo + Decay": "Group DPS + Decay",
    "Noxious Decay inverte a cura; lifesteal n\xE3o \xE9 invertido, ent\xE3o Health Vamp ajuda.": "Noxious Decay inverts healing; lifesteal isn't inverted, so Health Vamp helps.",
    "A cada 15 s, corra para a zona marcada (3 s). Morrer devolve 500k de HP ao Dage.": "Every 15 s, run to the marked zone (3 s). Dying gives Dage back 500k HP.",
    "O Decay do Legion DoomKnight anula a cura do Dage; Legion Revenant deve spammar o 2.": "Legion DoomKnight's Decay cancels Dage's healing; Legion Revenant should spam 2.",
    "Lord of Order usa Quixotic no Energy Blast (ou ArchPaladin usa Righteous Seal).": "Lord of Order uses Quixotic on Energy Blast (or ArchPaladin uses Righteous Seal).",
    "Sem Legion DoomKnight, leve Scroll of Decay. Consum\xEDveis: Endurance Draught + Body Tonic.": "Without Legion DoomKnight, bring Scroll of Decay. Consumables: Endurance Draught + Body Tonic.",
    "Quixotic nos orbs + stacks de Order": "Quixotic on orbs + Order stacks",
    "Mate um orb por vez: orb esquerdo, orb direito, Tyndarius e repete.": "Kill one orb at a time: left orb, right orb, Tyndarius, repeat.",
    "O taunter mant\xE9m o taunt ou Scrolls of Enrage o tempo todo.": "The taunter keeps taunt or Scrolls of Enrage up the whole time.",
    "Recompensas: Infernal Flame Pyromancer e Infernal Flame Khopesh.": "Rewards: Infernal Flame Pyromancer and Infernal Flame Khopesh.",
    "Cura (ou Paladin Chronomancer)": "Healing (or Paladin Chronomancer)",
    "Penitence \xE9 praticamente obrigat\xF3rio nessa luta.": "Penitence is practically mandatory here.",
    "Praxis rende bem por ser uma luta longa.": "Praxis does well since it's a long fight.",
    "Setup de 4 taunts: Legion Revenant, Lord of Order, ArchPaladin e StoneCrusher. Recompensa: Radiant Goddess of War.": "4-taunt setup: Legion Revenant, Lord of Order, ArchPaladin and StoneCrusher. Reward: Radiant Goddess of War.",
    "Suporte + DPS + taunt no Warden": "Support + DPS + taunt on Warden",
    "Suporte (ou Continuum Chronomancer)": "Support (or Continuum Chronomancer)",
    "Ezrajal: aperte ESC quando ele preparar o Counter Attack e volte quando passar.": "Ezrajal: press ESC when he charges Counter Attack and resume once it fades.",
    "Warden: Legion Revenant usa Scroll of Enrage perto de 450k de HP.": "Warden: Legion Revenant uses a Scroll of Enrage around 450k HP.",
    "Engineer: n\xE3o ande para frente ao entrar. Mate Defense Drone, Attack Drone e depois o Engineer.": "Engineer: don't walk forward on entering. Kill Defense Drone, then Attack Drone, then Engineer.",
    "Recompensa: Exalted Apotheosis. Em sala p\xFAblica, um ArchPaladin a mais ajuda a sobreviver.": "Reward: Exalted Apotheosis. In public rooms, an extra ArchPaladin helps survival.",
    Agosto: "August",
    "Dano (ou outro DPS de grupo)": "Damage (or another group DPS)",
    "Sem mec\xE2nicas especiais: com o time certo, \xE9 s\xF3 spammar.": "No special mechanics: with the right team, just spam.",
    "Sazonal de agosto.": "Seasonal in August.",
    Setembro: "September",
    "Tire os debuffs da Iara saindo da tela do boss e trocando de classe.": "Clear Iara's debuffs by leaving the boss screen and switching class.",
    "Sazonal de setembro.": "Seasonal in September.",
    "Contra Chaos": "Vs. Chaos",
    "Chaorrupter (desbloqueado), drop do High Chaos Knight em /chaoswar, ou a Empowered Chaos Avenger's Greatsword do Drakath.": "Chaorrupter (unlocked), dropped by High Chaos Knight in /chaoswar, or Drakath's Empowered Chaos Avenger's Greatsword.",
    "Contra Humanos": "Vs. Humans",
    "Prince Darkon's Poleaxe (Ultra Drago). Com Infernal Flame Pyromancer ou Archfiend Doomlord chega a +138%.": "Prince Darkon's Poleaxe (Ultra Drago). With Infernal Flame Pyromancer or Archfiend Doomlord it reaches +138%.",
    "Contra Undead": "Vs. Undead",
    "Blinding Light of Destiny, \xFAtil em quase toda a hist\xF3ria do Yami no Ronin e Doomwood.": "Blinding Light of Destiny, useful through most of the Yami no Ronin and Doomwood storylines.",
    "Boost geral": "General boost",
    "Exalted Apotheosis (Exaltia), Necrotic Sword of Doom e o armor Sepulchure's DoomKnight.": "Exalted Apotheosis (Exaltia), Necrotic Sword of Doom and Sepulchure's DoomKnight armor.",
    Consum\u00EDveis: "Consumables",
    "Sage Tonic para quem usa INT (LR, AP), Fate Tonic para LoO e CAv, Malevolence Elixir para todos. Prefira vers\xF5es Potent ou Unstable.": "Sage Tonic for INT users (LR, AP), Fate Tonic for LoO and CAv, Malevolence Elixir for everyone. Prefer Potent or Unstable versions.",
    "Scroll of Enrage para taunt em quem n\xE3o tem taunt pr\xF3prio; Scroll of Decay no Dage sem Legion DoomKnight.": "Scroll of Enrage for taunting on classes without one; Scroll of Decay for Dage without Legion DoomKnight.",
    Arma: "Weapon",
    "Grande b\xF4nus em todos os atributos base. Sempre entre as 3 melhores op\xE7\xF5es de qualquer classe.": "Big boost to all base stats. Always among the top 3 options for any class.",
    "Ativa na skill 2: mais Haste e Crit. \xD3timo para classes que jogam com HP baixo e Chronomancers.": "Procs on skill 2: more Haste and Crit. Great for low-HP classes and Chronomancers.",
    "Verus DoomKnight, Void Highlord, calend\xE1rios": "Verus DoomKnight, Void Highlord, calendar classes",
    "Acumula debuff de dano f\xEDsico e m\xE1gico recebido no alvo. Feito para ultras.": "Stacks a physical and magical damage-taken debuff on the target. Built for ultras.",
    "Legion Revenant (aplicador principal)": "Legion Revenant (main applier)",
    "Recupera mana. N\xE3o melhora classes boas, transforma classes fracas em boas.": "Restores mana. It doesn't make good classes better; it makes weak classes good.",
    "Muito usado em solo e farm longo; combina com skills spammadas.": "Popular for soloing and long farms; pairs with spammed skills.",
    "Rende em classes com grande buff de dano e skill 5 com recarga de 15 s.": "Works on classes with a big damage buff and a 15 s cooldown on skill 5.",
    "Reduz a chance de acerto do inimigo, ajudando a chegar no dodge m\xE1ximo.": "Lowers enemy hit chance, helping you reach max dodge.",
    "Classes de dodge e de calend\xE1rio": "Dodge and calendar classes",
    "Dano crescente com Spinning Dragon; \xFAtil em lutas longas.": "Ramping damage with Spinning Dragon; useful in long fights.",
    "Lutas longas (Ultra Speaker)": "Long fights (Ultra Speaker)",
    "Muito forte, mas exige manter um auto-DoT para ciclar os buffs.": "Very strong, but you must keep a self-DoT up to cycle its buffs.",
    Capacete: "Helm",
    "Muito Luck; ideal para dodge e classes de crit f\xEDsico. N\xE3o use em m\xE1gicos.": "Lots of Luck; ideal for dodge and physical-crit classes. Don't use on magic classes.",
    "Para classes m\xE1gicas, mesmo as que dependem de crit.": "For magic classes, even crit-reliant ones.",
    "Legion Revenant (fora de ultra), ArchMage, Blaze Binder": "Legion Revenant (outside ultras), ArchMage, Blaze Binder",
    "Para classes f\xEDsicas; compare com Vim caso a caso.": "For physical classes; compare with Vim case by case.",
    "Mais STR/INT que Luck e sem penalidade de HP. Seguro para ultras.": "More STR/INT than Luck and no HP penalty. Safe for ultras.",
    "Qualquer classe em ultra": "Any class in ultras",
    "Poucas classes aproveitam muito Wisdom.": "Few classes make good use of Wisdom.",
    "Arcana Invoker \xE9 exce\xE7\xE3o": "Arcana Invoker is the exception",
    Capa: "Cape",
    "+15% de dano; a penalidade de cura s\xF3 pesa em ultras. Equipe e esque\xE7a.": "+15% damage; the healing penalty only matters in ultras. Equip and forget.",
    "Universal fora de ultra": "Universal outside ultras",
    "De \xF3tima a obrigat\xF3ria em ultra bosses.": "From great to mandatory in ultra bosses.",
    "Todas as classes em ultra": "Every class in ultras",
    "Mais Crit para quem j\xE1 tem Haste de sobra. Dispens\xE1vel se usar Dauntless.": "More Crit for classes with Haste to spare. Unneeded if you use Dauntless.",
    Calend\u00E1rios: "Calendar classes",
    "Para quem cura, mas n\xE3o o bastante sozinho.": "For classes that heal, but not quite enough on their own.",
    "Leva Haste de 40% a 50%, ao custo de defesa.": "Takes Haste from 40% to 50%, at the cost of defense.",
    "Farmers sem Haste m\xE1xima": "Farmers without max Haste",
    "c\xF3digo do calend\xE1rio, HeroMart ou HeroPoints": "calendar code, HeroMart or HeroPoints",
    "vers\xE3o por AC": "an AC version"
  };

  // src/data/hardfarm.json
  var hardfarm_default = [
    {
      n: "Legion Revenant",
      k: "class",
      cls: "Legion Revenant",
      e: 5,
      src: "https://aqwwiki.wikidot.com/legion-revenant-s-quests",
      sn: "AQW Wiki: Legion Revenant's Quests",
      req: [
        {
          pt: "Legion Fealty 1 (exige Rank 10 Evil): 50 Aeacus Empowered (matar o Ultra Aeacus 50 vezes), 300 Tethered Soul, 500 Darkened Essence em /shadowrealmpast e 1.000 Dracolich Contract.",
          en: "Legion Fealty 1 (needs Rank 10 Evil): 50 Aeacus Empowered (kill Ultra Aeacus 50 times), 300 Tethered Soul, 500 Darkened Essence in /shadowrealmpast and 1,000 Dracolich Contract."
        },
        {
          pt: "Legion Fealty 2 (n\xEDvel 80): 400 de cada uma de 10 Cohorts Conquered, 4.000 no total.",
          en: "Legion Fealty 2 (level 80): 400 each of 10 Cohorts Conquered, 4,000 in total."
        },
        {
          pt: "Legion Fealty 3: 4.000 Legion Token, 300 Dage's Favor, 100 Dark Token e 30 Diamond Token of Dage.",
          en: "Legion Fealty 3: 4,000 Legion Token, 300 Dage's Favor, 100 Dark Token and 30 Diamond Token of Dage."
        },
        {
          pt: "Legion Fealty 4: 10 Exalted Crown, 20 Revenant's Spellscroll e 6 Conquest Wreath.",
          en: "Legion Fealty 4: 10 Exalted Crown, 20 Revenant's Spellscroll and 6 Conquest Wreath."
        }
      ],
      note: {
        pt: "Os gargalos s\xE3o os 4.000 Legion Tokens e os 4.000 Cohorts. A wiki n\xE3o diz onde farmar tokens e cohorts.",
        en: "The bottlenecks are the 4,000 Legion Tokens and the 4,000 Cohorts. The wiki does not say where to farm tokens and cohorts."
      },
      j: [
        "underworld",
        "revenant"
      ]
    },
    {
      n: "Dragon of Time",
      k: "class",
      cls: "Dragon of Time",
      e: 5,
      src: "https://aqwwiki.wikidot.com/kro-nar-s-quests",
      sn: "AQW Wiki: Kro'nar's Quests",
      req: [
        {
          pt: "Corrente de 10 quests do Kro'nar; a classe sai na nona (Hero's Heartbeat), no n\xEDvel 75.",
          en: "Chain of 10 Kro'nar quests; the class comes from the ninth (Hero's Heartbeat), at level 75."
        },
        {
          pt: "Burning Fates: 3.000 Fire Essence em /volcano, 100 Akriloth's Flametongue, 50 Immortal Embers e 50 Ashes from the Void Realm. Exige a Blade of Awe no invent\xE1rio.",
          en: "Burning Fates: 3,000 Fire Essence in /volcano, 100 Akriloth's Flametongue, 50 Immortal Embers and 50 Ashes from the Void Realm. Needs the Blade of Awe in your inventory."
        },
        {
          pt: "Dragon's Will: 300 Unyielding Slime em /moonlab e 20 de cada material de chefe.",
          en: "Dragon's Will: 300 Unyielding Slime in /moonlab and 20 of each boss material."
        },
        {
          pt: "Confluence of Fates: 300 Cross-Dimensional Weapons e 100 Darkon's Receipt. Rend: 125 Epic Hydra Fang em /hydrachallenge.",
          en: "Confluence of Fates: 300 Cross-Dimensional Weapons and 100 Darkon's Receipt. Rend: 125 Epic Hydra Fang in /hydrachallenge."
        }
      ],
      note: {
        pt: "\xC9 a mais longa em n\xFAmero de quests. Para a quest 8 voc\xEA precisa j\xE1 ter a Blade of Awe, que \xE9 outro farm demorado.",
        en: "It is the longest by quest count. For quest 8 you must already own the Blade of Awe, which is another slow farm."
      },
      j: [
        "timeinn"
      ]
    },
    {
      n: "Void Highlord",
      k: "class",
      cls: "Void Highlord",
      e: 4,
      src: "https://aqwwiki.wikidot.com/void-highlord-merge-shop",
      sn: "AQW Wiki: Void Highlord Merge Shop",
      req: [
        {
          pt: "Merge da classe: 15 Roentgenium of Nulgath, 1 Void Crystal A e 1 Void Crystal B.",
          en: "Class merge: 15 Roentgenium of Nulgath, 1 Void Crystal A and 1 Void Crystal B."
        },
        {
          pt: "Void Crystal A: 200 Unidentified 10, 150 Gem of Nulgath, 200 Dark Crystal Shard e 200 Tainted Gem.",
          en: "Void Crystal A: 200 Unidentified 10, 150 Gem of Nulgath, 200 Dark Crystal Shard and 200 Tainted Gem."
        },
        {
          pt: "Void Crystal B: 200 Diamond of Nulgath, 30 Blood Gem of the Archfiend, 15 Totem of Nulgath e 2 Elders' Blood.",
          en: "Void Crystal B: 200 Diamond of Nulgath, 30 Blood Gem of the Archfiend, 15 Totem of Nulgath and 2 Elders' Blood."
        }
      ],
      note: {
        pt: "A wiki lista as quantidades, mas n\xE3o diz de onde vem cada material.",
        en: "The wiki lists the quantities but not where each material comes from."
      },
      j: [
        "tercessuinotlim"
      ]
    },
    {
      n: "Blade of Awe",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://aqwthingsblog.wordpress.com/2016/08/04/top-10-hardest-items-to-get/",
      sn: "AQW Things Blog (2016)",
      req: [
        {
          pt: "Merge em /museum com 5 rel\xEDquias lend\xE1rias e as Legendary Runes, com reputa\xE7\xE3o Blade of Awe rank 6.",
          en: "Merge in /museum with 5 legendary relics and the Legendary Runes, with Blade of Awe reputation rank 6."
        },
        {
          pt: "Legendary Runes: itens de quest com 0,1% de chance de drop, matando muitos Chaos Lords.",
          en: "Legendary Runes: quest items with a 0.1% drop chance from killing many Chaos Lords."
        }
      ],
      note: {
        pt: "Fonte de 2016: confira se os n\xFAmeros ainda valem. \xC9 a arma pedida na quest 8 da Dragon of Time.",
        en: "2016 source: check that the numbers still hold. It is the weapon required by the Dragon of Time quest 8."
      },
      j: [
        "museum"
      ]
    },
    {
      n: "Ultimate Lich King",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://aqwthingsblog.wordpress.com/2016/08/04/top-10-hardest-items-to-get/",
      sn: "AQW Things Blog (2016)",
      req: [
        {
          pt: "Em /underworld, leve 10.000 Legion Tokens ao Dage e fa\xE7a o merge na armadura.",
          en: "In /underworld, take 10,000 Legion Tokens to Dage and merge them into the armor."
        }
      ],
      note: {
        pt: "Fonte de 2016: confira se a quantidade mudou. Os Legion Tokens s\xE3o os mesmos da Legion Revenant.",
        en: "2016 source: check whether the amount changed. The Legion Tokens are the same ones used for Legion Revenant."
      },
      j: [
        "underworld"
      ]
    },
    {
      n: "Legion DoomKnight",
      k: "class",
      cls: "Legion DoomKnight",
      e: 4,
      src: "https://aqwwiki.wikidot.com/legion-doomknight-class-merge-1",
      sn: "AQW Wiki: Legion DoomKnight (Merge)",
      req: [
        {
          pt: "Merge no Dark Birthday Token Merge: 2.000 Legion Tokens, e nada mais.",
          en: "Merge at the Dark Birthday Token Merge: 2,000 Legion Tokens and nothing else."
        }
      ],
      note: {
        pt: "O Dark Birthday \xE9 um local sazonal, ent\xE3o a disponibilidade pode ser limitada. Veja o card dos Legion Tokens para saber onde farmar.",
        en: "Dark Birthday is a seasonal location, so availability may be limited. See the Legion Token card for where to farm them."
      },
      j: [
        "darkbirthday"
      ]
    },
    {
      n: "Infinite Legion Dark Caster",
      k: "class",
      cls: "Infinite Legion Dark Caster",
      e: 4,
      src: "https://aqwwiki.wikidot.com/infinite-legion-dark-caster",
      sn: "AQW Wiki: Infinite Legion Dark Caster",
      req: [
        {
          pt: "S\xF3 por merge, n\xE3o \xE9 vendida: 2.000 Legion Tokens.",
          en: "Merge only, it is not sold: 2,000 Legion Tokens."
        },
        {
          pt: "A wiki lista dois locais de merge, o Dark Birthday Token Merge e o Undead Legion Merge, sem dizer qual faz esta receita.",
          en: "The wiki lists two merge locations, the Dark Birthday Token Merge and the Undead Legion Merge, without saying which one handles this recipe."
        }
      ],
      note: {
        pt: "Os locais s\xE3o sazonais em parte, ent\xE3o confirme se est\xE3o abertos antes de farmar.",
        en: "Some of the locations are seasonal, so check they are open before you farm."
      },
      j: [
        "underworld",
        "darkbirthday"
      ]
    },
    {
      n: "Dragonslayer General",
      k: "class",
      cls: "Dragonslayer General",
      e: 3,
      src: "https://aqwwiki.wikidot.com/dragonslayer-general-class-merge",
      sn: "AQW Wiki: Dragonslayer General (Merge)",
      req: [
        {
          pt: "Merge em Dragon Town: 75 Enchanted Scale e 100 Dragon Claw.",
          en: "Merge in Dragon Town: 75 Enchanted Scale and 100 Dragon Claw."
        },
        {
          pt: "Dragon Claw cai de Dracolichs em Dragon Town (Blood, Chaos, Deluge, Granite, Inferno e Tempest). A wiki n\xE3o informa a taxa de drop.",
          en: "Dragon Claw drops from Dracoliches in Dragon Town (Blood, Chaos, Deluge, Granite, Inferno and Tempest). The wiki does not give the drop rate."
        },
        {
          pt: "Enchanted Scale \xE9 recompensa da quest da classe, nas quests do Galanoth, e n\xE3o cai de monstros.",
          en: "Enchanted Scale is a reward from the class quest in Galanoth's quests and does not drop from monsters."
        }
      ],
      note: {
        pt: "O gargalo s\xE3o os 100 Dragon Claws.",
        en: "The bottleneck is the 100 Dragon Claws."
      },
      j: [
        "dragontown"
      ]
    },
    {
      n: "Necromancer",
      k: "class",
      cls: "Necromancer",
      e: 2,
      src: "https://aqwwiki.wikidot.com/necromancer-merge",
      sn: "AQW Wiki: Necromancer (Merge)",
      req: [
        {
          pt: "Merge no Necro Tower: 1 NUE Necronomicon e 1 Creature Shard.",
          en: "Merge at the Necro Tower: 1 NUE Necronomicon and 1 Creature Shard."
        },
        {
          pt: "NUE Necronomicon custa 999 gold na loja do Necromancer e exige DoomWood Rank 10.",
          en: "NUE Necronomicon costs 999 gold at the Necromancer shop and needs DoomWood Rank 10."
        },
        {
          pt: "Creature Shard tem 5% de chance de drop de Creature Creation, em Chopping Maul.",
          en: "Creature Shard has a 5% drop chance from Creature Creation, in Chopping Maul."
        }
      ],
      note: {
        pt: "Poucas unidades, mas a reputa\xE7\xE3o DoomWood rank 10 e o drop de 5% seguram o ritmo.",
        en: "Few units, but the DoomWood rank 10 reputation and the 5% drop set the pace."
      },
      j: [
        "necrotower"
      ]
    },
    {
      n: "Hollowborn Lich King",
      k: "gear",
      cls: null,
      e: 5,
      src: "http://aqwwiki.wikidot.com/lae-s-quests",
      sn: "AQW Wiki: Lae's Quests",
      req: [
        {
          pt: "Corrente de 4 quests do Lae, em /hollowdeep (Eventhub): Draftless, Flow Stress, Heat Treatment e Counterblow.",
          en: "Chain of 4 quests from Lae, in /hollowdeep (Eventhub): Draftless, Flow Stress, Heat Treatment and Counterblow."
        },
        {
          pt: "Draftless (n\xEDvel 85): 100 Legion Tokens, 50 Undead Energy e 25 Hollow Soul. D\xE1 1 Soul Fragment. Exige Undead Champion (armadura) e o Lae's Hardcore Contract.",
          en: "Draftless (level 85): 100 Legion Tokens, 50 Undead Energy and 25 Hollow Soul. Gives 1 Soul Fragment. Needs Undead Champion (armor) and Lae's Hardcore Contract."
        },
        {
          pt: "Flow Stress (n\xEDvel 85): 1.000 Legion Tokens, 1 Soul Sand e 6 Soul Fragments. D\xE1 1 Lich King Fragment.",
          en: "Flow Stress (level 85): 1,000 Legion Tokens, 1 Soul Sand and 6 Soul Fragments. Gives 1 Lich King Fragment."
        },
        {
          pt: "Heat Treatment (n\xEDvel 85): 10.000 Legion Tokens, 1 Soul Essence, 24 Soul Fragments e 6 Lich King Fragments. Exige Ultimate Lich King (permanente) e o Ultimate Lich King Helm. Recompensa: a Hollowborn Lich King.",
          en: "Heat Treatment (level 85): 10,000 Legion Tokens, 1 Soul Essence, 24 Soul Fragments and 6 Lich King Fragments. Needs Ultimate Lich King (permanent) and the Ultimate Lich King Helm. Reward: the Hollowborn Lich King."
        }
      ],
      note: {
        pt: "As quests s\xE3o pequenas, mas se repetem muito. S\xF3 para esta armadura, 24 Soul Fragments e 6 Lich King Fragments obrigam a repetir Flow Stress 6 vezes e Draftless 60 vezes (6 \xD7 6 + 24). Nenhuma das quests lista taxa de drop.",
        en: "The quests are small, but they repeat a lot. For this armor alone, 24 Soul Fragments and 6 Lich King Fragments mean running Flow Stress 6 times and Draftless 60 times (6 \xD7 6 + 24). None of the quests lists a drop rate."
      },
      j: [
        "hollowdeep"
      ]
    },
    {
      n: "Hollowborn Caladbolg",
      k: "gear",
      cls: null,
      e: 5,
      src: "http://aqwwiki.wikidot.com/lae-s-quests",
      sn: "AQW Wiki: Lae's Quests",
      req: [
        {
          pt: "Vem da \xFAltima quest da corrente, a Counterblow (n\xEDvel 95), que d\xE1 o Altar of the Hollowborn Caladbolg (ACS). Antes dela \xE9 preciso ter feito a Heat Treatment.",
          en: "It comes from the last quest in the chain, Counterblow (level 95), which gives the Altar of the Hollowborn Caladbolg (ACS). You must have done Heat Treatment before it."
        },
        {
          pt: "Counterblow: 4 Exalted Crown, 4 Revenant's Spellscroll, 4 Conquest Wreath, 3 Soul Essence, 36 Soul Fragments e 12 Lich King Fragments.",
          en: "Counterblow: 4 Exalted Crown, 4 Revenant's Spellscroll, 4 Conquest Wreath, 3 Soul Essence, 36 Soul Fragments and 12 Lich King Fragments."
        },
        {
          pt: "Exalted Crown, Revenant's Spellscroll e Conquest Wreath s\xE3o materiais da Legion Revenant (Legion Fealty 4). Veja o card dela.",
          en: "Exalted Crown, Revenant's Spellscroll and Conquest Wreath are Legion Revenant materials (Legion Fealty 4). See its card."
        },
        {
          pt: "Tamb\xE9m recompensa a Hollowborn Lich King's Pride, o Morph, a Soul Eater Blades e o Badge da p\xE1gina de personagem.",
          en: "It also rewards Hollowborn Lich King's Pride, the Morph, Soul Eater Blades and the character page badge."
        }
      ],
      note: {
        pt: "\xC9 a parte mais cara: 12 Lich King Fragments pedem 12 Flow Stress e 108 Draftless s\xF3 aqui (12 \xD7 6 + 36). No total, a corrente soma 44.800 Legion Tokens. As notas de design chamam este item de altar, e a wiki n\xE3o explica o que ele faz.",
        en: "This is the most expensive part: 12 Lich King Fragments need 12 Flow Stress runs and 108 Draftless runs just here (12 \xD7 6 + 36). The whole chain adds up to 44,800 Legion Tokens. The design notes call this item an altar, and the wiki does not explain what it does."
      },
      j: [
        "hollowdeep"
      ]
    },
    {
      n: "Chaos Avenger",
      k: "class",
      cls: "Chaos Avenger",
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/classes/chaos-avenger",
      sn: "AQWG: Chaos Avenger",
      req: [
        {
          pt: "N\xEDvel 80 e a hist\xF3ria dos 13 Lords of Chaos completa. A quest da classe come\xE7a em /championdrakath.",
          en: "Level 80 and the 13 Lords of Chaos story completed. The class quest starts at /championdrakath."
        },
        {
          pt: "Parallel Chaos Amulet: 20 Champion Drakath Insignias. A quest d\xE1 5 ins\xEDgnias e s\xF3 pode ser feita 1 vez por semana (reset na sexta), ent\xE3o leva no m\xEDnimo um m\xEAs.",
          en: "Parallel Chaos Amulet: 20 Champion Drakath Insignias. The quest gives 5 insignias and can be done once a week (resets Friday), so it takes at least a month."
        },
        {
          pt: "1.300 Fragment of Mount Doomskull em /mountdoomskull, 1 Fragment of the Dragon em /chaoslord e 13 Fragment of the Queen em /transformation.",
          en: "1,300 Fragment of Mount Doomskull at /mountdoomskull, 1 Fragment of the Dragon at /chaoslord and 13 Fragment of the Queen at /transformation."
        },
        {
          pt: "12 fragmentos de Lords, 1 de cada, vencendo cada Lord em seu mapa (Escherion, Vath, Kitsune, Wolfwing, Discordia, Ledgermayne, Tibicenas, Khasaanda, Iadoa, Lionfang, Alteon e Xiang).",
          en: "12 Lord fragments, 1 each, by defeating each Lord on their map (Escherion, Vath, Kitsune, Wolfwing, Discordia, Ledgermayne, Tibicenas, Khasaanda, Iadoa, Lionfang, Alteon and Xiang)."
        }
      ],
      note: {
        pt: "O limite \xE9 o Amulet semanal, n\xE3o o tempo de grind. D\xE1 para fazer o resto do farm enquanto as semanas passam.",
        en: "The limit is the weekly Amulet, not grind time. You can do the rest of the farm while the weeks pass."
      },
      j: [
        "championdrakath"
      ]
    },
    {
      n: "Yami no Ronin",
      k: "class",
      cls: "Yami no Ronin",
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/classes/yami-no-ronin",
      sn: "AQWG: Yami no Ronin",
      req: [
        {
          pt: 'Rank 10 Yokai e a hist\xF3ria de /darkally (inclui "Defeat the Underfiend"). A corrente come\xE7a na SoulForge do Dage, em /underworld.',
          en: `Rank 10 Yokai and the /darkally story (includes "Defeat the Underfiend"). The chain starts at Dage's SoulForge, in /underworld.`
        },
        {
          pt: "Passo 1: SoulForge Hammer, Shadow Katana Blade (15 Platinum Paragon Medal a 1m de gold cada, 108 Obsidian Rock, 15 Weapon Imprint, entre outros) e Yokai Sword Scroll (888 Perfect Orochi Scales, 600 Darkened Essence e 1 Oni Skull Charm).",
          en: "Step 1: SoulForge Hammer, Shadow Katana Blade (15 Platinum Paragon Medal at 1m gold each, 108 Obsidian Rock, 15 Weapon Imprint, among others) and Yokai Sword Scroll (888 Perfect Orochi Scales, 600 Darkened Essence and 1 Oni Skull Charm)."
        },
        {
          pt: "Passo 2, op\xE7\xE3o Legion: 17.500 Legion Tokens, 13 Sapphire Orb, 50 Aeacus Empowered e as classes SwordMaster (2.000 LTs) e Infinite Legion Dark Caster (2.000 LTs).",
          en: "Step 2, Legion option: 17,500 Legion Tokens, 13 Sapphire Orb, 50 Aeacus Empowered and the SwordMaster (2,000 LTs) and Infinite Legion Dark Caster (2,000 LTs) classes."
        },
        {
          pt: "Passo 2, op\xE7\xE3o sem Legion: 1.000 Sword Scroll Fragment, 400 Legion Combat Trophy e 50 Technique Observed no PvP do Dage, mais 250 de cada uma de tr\xEAs reliquias de chefes e 100 Aeacus Empowered.",
          en: "Step 2, non-Legion option: 1,000 Sword Scroll Fragment, 400 Legion Combat Trophy and 50 Technique Observed in Dage's PvP, plus 250 each of three boss relics and 100 Aeacus Empowered."
        }
      ],
      note: {
        pt: "Quem tem Legion segue o caminho mais curto, mas gasta 17.500 Legion Tokens, mais 2.000 para cada uma das duas classes se ainda n\xE3o as tiver.",
        en: "Legion members take the shorter path, but it costs 17,500 Legion Tokens, plus 2,000 for each of the two classes if you do not own them yet."
      },
      j: [
        "underworld",
        "darkally"
      ]
    },
    {
      n: "Lord of Order",
      k: "class",
      cls: "Lord of Order",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/classes/lord-of-order",
      sn: "AQWG: Lord of Order",
      req: [
        {
          pt: "N\xEDvel 85 e Rank 7 Fishing. As quests s\xE3o do Mirror Drakath, em /battleoff, e s\xF3 d\xE1 para fazer 1 por dia.",
          en: "Level 85 and Rank 7 Fishing. The quests come from Mirror Drakath, at /battleoff, and you can only do 1 a day."
        },
        {
          pt: "S\xE3o 10 quests (Heart of Servitude at\xE9 The Final Challenge), ent\xE3o o m\xEDnimo \xE9 10 dias, cada uma pedindo de 4 a 6 bosses ou drops de mapas diferentes.",
          en: "There are 10 quests (Heart of Servitude to The Final Challenge), so the minimum is 10 days, each asking for 4 to 6 bosses or drops from different maps."
        },
        {
          pt: "Entre os itens est\xE3o 15 Chaoroot, 15 Chaotic War Essence, 45 Purified Raindrop, 50 de cada Suppressed (Drows, Undead, Horcs, Weavers) e 15 Weapon Imprint.",
          en: "Items include 15 Chaoroot, 15 Chaotic War Essence, 45 Purified Raindrop, 50 each of the Suppressed items (Drows, Undead, Horcs, Weavers) and 15 Weapon Imprint."
        },
        {
          pt: "A \xFAltima quest pede vencer o Champion of Chaos em /ultradrakath.",
          en: "The last quest asks you to defeat the Champion of Chaos at /ultradrakath."
        }
      ],
      note: {
        pt: "Atalho: quem tem o 11th Anniversary Collection Chest pode pegar a classe nele e pular tudo.",
        en: "Shortcut: if you own the 11th Anniversary Collection Chest you can claim the class from it and skip everything."
      },
      j: [
        "battleoff"
      ]
    },
    {
      n: "ArchPaladin",
      k: "class",
      cls: "ArchPaladin",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/classes/archpaladin",
      sn: "AQWG: ArchPaladin",
      req: [
        {
          pt: "Rank 10 Good e Rank 8 SpellCrafting, mais v\xE1rias hist\xF3rias (Lord of Chaos 13, Elfhame at\xE9 Gaiazor, Lost Ruins War, Seraph, Citadel e outras). Quests em /darkthronehub.",
          en: "Rank 10 Good and Rank 8 SpellCrafting, plus several storylines (Lord of Chaos 13, Elfhame to Gaiazor, Lost Ruins War, Seraph, Citadel and others). Quests at /darkthronehub."
        },
        {
          pt: "Sem member: 8 quests, cada uma com 3 a 7 itens de bosses de mapas diferentes. Inclui 1.000 Undead Energy, 200 Nightmare Kibble, 20 Feather of Paradise, 77 Shoelace of a Fallen Paladin e 25 de cada flor do passo Eden.",
          en: "Non-member: 8 quests, each with 3 to 7 items from bosses on different maps. Includes 1,000 Undead Energy, 200 Nightmare Kibble, 20 Feather of Paradise, 77 Shoelace of a Fallen Paladin and 25 of each flower in the Eden step."
        },
        {
          pt: "Com member: exige Rank 10 Healer e Warrior, e as 3 primeiras quests s\xE3o s\xF3 comprar a classe Paladin. As quests 5 a 8 s\xE3o iguais \xE0s dos n\xE3o-members.",
          en: "With membership: needs Rank 10 Healer and Warrior, and the first 3 quests are just buying the Paladin class. Quests 5 to 8 are the same as for non-members."
        },
        {
          pt: "A Pyromancer Artifact tem 3% de drop do Xan, em /xantown.",
          en: "The Pyromancer Artifact has a 3% drop from Xan, at /xantown."
        }
      ],
      note: {
        pt: "A vers\xE3o member \xE9 bem mais curta. A n\xE3o-member pede tamb\xE9m o passo 1 do farm da Blinding Light of Destiny.",
        en: "The member version is much shorter. The non-member one also needs step 1 of the Blinding Light of Destiny farm."
      },
      j: [
        "darkthronehub"
      ]
    },
    {
      n: "ArchFiend",
      k: "class",
      cls: "ArchFiend",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/classes/archfiend",
      sn: "AQWG: ArchFiend",
      req: [
        {
          pt: 'N\xEDvel 50 e Rank 10 Evil. Sem pagar AC: fa\xE7a a quest "Void Promotion" com o Oblivion, em /tercessuinotlim, e troque o Abyssal Contract na loja ArchFiend Merge.',
          en: 'Level 50 and Rank 10 Evil. Without paying ACs: do the "Void Promotion" quest with Oblivion, at /tercessuinotlim, and trade the Abyssal Contract in the ArchFiend Merge shop.'
        },
        {
          pt: "Reagentes: 3 Unidentified 13, Pink Star Diamond of Nulgath, Immortal Joe's Black Star (Mercutio, em /mercutio) e Dirtlicker Demoted (Dirtlicker, em /fiendshard).",
          en: "Reagents: 3 Unidentified 13, Pink Star Diamond of Nulgath, Immortal Joe's Black Star (Mercutio, at /mercutio) and Dirtlicker Demoted (Dirtlicker, at /fiendshard)."
        },
        {
          pt: "Abyssal Star: 200 Dark Crystal Shard, 300 Tainted Gem e 200 Gem of Nulgath.",
          en: "Abyssal Star: 200 Dark Crystal Shard, 300 Tainted Gem and 200 Gem of Nulgath."
        },
        {
          pt: "Blood Star of the ArchFiend: 20 Blood Gem of the ArchFiend, 8 Totem of Nulgath, 2 Void Aura e 999 ArchFiend Favour. Gold Star of Avarice: quase 20 milh\xF5es de gold, segundo o guia.",
          en: "Blood Star of the ArchFiend: 20 Blood Gem of the ArchFiend, 8 Totem of Nulgath, 2 Void Aura and 999 ArchFiend Favour. Gold Star of Avarice: almost 20 million gold, according to the guide."
        }
      ],
      note: {
        pt: "O guia avisa que a ArchFiend repete a Legendary ArchFiend, ent\xE3o quem j\xE1 tem a Legendary n\xE3o precisa dela.",
        en: "The guide notes that ArchFiend duplicates Legendary ArchFiend, so if you own the Legendary one you do not need this one."
      },
      j: [
        "tercessuinotlim"
      ]
    },
    {
      n: "Chrono Assassin",
      k: "class",
      cls: "Chrono Assassin",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/classes/chrono-assassin",
      sn: "AQWG: Chrono Assassin",
      req: [
        {
          pt: "Exige member ativo na hora de pegar. Depois a classe continua sua mesmo sem member.",
          en: "Needs an active membership when you get it. The class stays yours after the membership ends."
        },
        {
          pt: "12 Svelgr Fang, com cerca de 1% de drop do Svelgr the Destroyer, em /tachyon.",
          en: "12 Svelgr Fang, with about a 1% drop from Svelgr the Destroyer, at /tachyon."
        },
        {
          pt: "72 Sands of Time (Chronorysa, em /portalwar) e 144 Wraith Wisps (Time Wraiths, em /portalmaze).",
          en: "72 Sands of Time (Chronorysa, at /portalwar) and 144 Wraith Wisps (Time Wraiths, at /portalmaze)."
        },
        {
          pt: 'Com a quest "Chrono Class Quest" voc\xEA ganha Saeculum Gems; junte 12 na loja do Kairos, em /tachyon.',
          en: `The "Chrono Class Quest" gives Saeculum Gems; collect 12 at Kairos' shop, at /tachyon.`
        }
      ],
      note: {
        pt: "O gargalo \xE9 o drop de 1% das 12 Svelgr Fang.",
        en: "The bottleneck is the 1% drop of the 12 Svelgr Fang."
      },
      j: [
        "tachyon"
      ]
    },
    {
      n: "Blinding Light of Destiny",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/good/blinding-light-of-destiny",
      sn: "AQWG: Blinding Light of Destiny",
      req: [
        {
          pt: "Pr\xE9-requisitos: quests do Hs'Sakar (/firestorm), 3 primeiras do As'iiur (/airstorm) e do Murray (/citadel). O guia recomenda ter 10 ou mais espa\xE7os de invent\xE1rio livres.",
          en: "Prerequisites: Hs'Sakar's quests (/firestorm), the first 3 from As'iiur (/airstorm) and Murray's (/citadel). The guide recommends 10 or more free inventory slots."
        },
        {
          pt: '10.500 Spirit Orbs, vindos das quests "Essential Essences" e "Bust some Dust" do Artix (/necropolis), ou da "Soul Searching" da Yara. Elas se juntam em 105 Loyal Spirit Orbs e 2 Bright Auras.',
          en: `10,500 Spirit Orbs, from Artix's "Essential Essences" and "Bust some Dust" quests (/necropolis), or Yara's "Soul Searching". They merge into 105 Loyal Spirit Orbs and 2 Bright Auras.`
        },
        {
          pt: 'Tr\xEAs metais (Celestial Copper, Blessed Barium e Sanctified Silver) pela quest di\xE1ria "Mine Crafting" e por upgrades. Depois kits de arma: 3 Basic, 3 Advanced e 4 Ultimate, cada um pedindo bosses de dezenas de mapas.',
          en: 'Three metals (Celestial Copper, Blessed Barium and Sanctified Silver) from the daily "Mine Crafting" quest and upgrades. Then weapon kits: 3 Basic, 3 Advanced and 4 Ultimate, each asking for bosses on dozens of maps.'
        },
        {
          pt: "Quest final: 250 Loyal Spirit Orb, 500 Spirit Orb, 125 Bright Aura, 75 Brilliant Aura, 1 Blinding Aura e 1 Ultimate Weapon Kit. Voc\xEA junta os fragmentos com as Blinding Mace, Bow e Blade (10, 25 e 75 quests).",
          en: "Final quest: 250 Loyal Spirit Orb, 500 Spirit Orb, 125 Bright Aura, 75 Brilliant Aura, 1 Blinding Aura and 1 Ultimate Weapon Kit. You gather the fragments with the Blinding Mace, Bow and Blade (10, 25 and 75 quests)."
        }
      ],
      note: {
        pt: "A Blinding Aura tem 1% de drop. Para n\xE3o depender dela, o guia manda juntar a Blinding Scythe of Destiny, que d\xE1 100%. A BLoD d\xE1 75% de dano extra contra Undead.",
        en: "The Blinding Aura has a 1% drop. To avoid relying on it, the guide has you merge the Blinding Scythe of Destiny, which gives 100%. The BLoD gives 75% extra damage to Undead."
      },
      j: [
        "necropolis"
      ]
    },
    {
      n: "Necrotic Sword of Doom",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/evil/necrotic-sword-of-doom",
      sn: "AQWG: Necrotic Sword of Doom",
      req: [
        {
          pt: "N\xEDvel 60, rank 10 em DoomWood e o passo 1 da BLoD feito, mais as quests de /maul at\xE9 /necrotower, at\xE9 a Sally.",
          en: "Level 60, DoomWood rank 10 and step 1 of the BLoD done, plus the quests from /maul to /necrotower, up to Sally."
        },
        {
          pt: "7.500 Void Aura, 1.600 Cavern Celestite, 5.100 Bone Dust, 10.000 Undead Energy, 4 Barium e 31 Chaorrupted Hourglass.",
          en: "7,500 Void Aura, 1,600 Cavern Celestite, 5,100 Bone Dust, 10,000 Undead Energy, 4 Barium and 31 Chaorrupted Hourglass."
        },
        {
          pt: "Drops raros: Blade Essence x2 (cerca de 1%, Chaorrupted Armour em /chaoscrypt), Scroll of Dark Arts x4 (cerca de 1%, Ultra Vordred) e Doom Heart (cerca de 0,5%, Ultra Sepulchure).",
          en: "Rare drops: Blade Essence x2 (about 1%, Chaorrupted Armour at /chaoscrypt), Scroll of Dark Arts x4 (about 1%, Ultra Vordred) and Doom Heart (about 0.5%, Ultra Sepulchure)."
        },
        {
          pt: "Chaorrupted Hourglass cai a cerca de 20% do Chaos Lord Iadoa, em /timespace. Tamb\xE9m precisa de Necromancer Rank 10 e 2 Primarch's Hilt.",
          en: "Chaorrupted Hourglass drops at about 20% from Chaos Lord Iadoa, at /timespace. You also need Necromancer Rank 10 and 2 Primarch's Hilt."
        }
      ],
      note: {
        pt: "O guia recomenda ter a Sepulchure's DoomKnight Armour antes, porque ela facilita muito o farm de Void Aura. D\xE1 51% de dano extra em All.",
        en: "The guide recommends having Sepulchure's DoomKnight Armour first, since it makes the Void Aura farm much easier. It gives 51% extra damage to All."
      },
      j: [
        "shadowfall"
      ]
    },
    {
      n: "Sepulchure's DoomKnight Armour",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/evil/sepulchures-doomknight-armour",
      sn: "AQWG: Sepulchure's DoomKnight Armour",
      req: [
        {
          pt: "Exige member, Rank 5 Evil e a hist\xF3ria do Nukemichi (/akiba e /bludrut a /bludrut3). Quests do Vayle, em /necropolis.",
          en: "Needs membership, Rank 5 Evil and Nukemichi's storyline (/akiba and /bludrut to /bludrut3). Quests from Vayle, at /necropolis."
        },
        {
          pt: "10.500 Dark Spirit Orbs, que se juntam em 105 Corrupt Spirit Orbs e 2 Ominous Auras. Tamb\xE9m pede DoomKnight Rank 10, que exige Warrior e Healer no 10.",
          en: "10,500 Dark Spirit Orbs, which merge into 105 Corrupt Spirit Orbs and 2 Ominous Auras. It also needs DoomKnight Rank 10, which needs Warrior and Healer at 10."
        },
        {
          pt: 'Tr\xEAs metais (Accursed Arsenic, Calamitous Chromium e Reprehensible Rhodium) da quest di\xE1ria "Hard Core Metals", cada um com upgrade de 26 Dark Energy, 5 Dark Spirit Orbs e 16 Deadly Knightshade.',
          en: 'Three metals (Accursed Arsenic, Calamitous Chromium and Reprehensible Rhodium) from the daily "Hard Core Metals" quest, each upgraded with 26 Dark Energy, 5 Dark Spirit Orbs and 16 Deadly Knightshade.'
        },
        {
          pt: "Kits de arma: 3 DoomSquire, 3 DoomSoldier e 4 DoomKnight. Quest final: 250 Corrupt Spirit Orb, 500 Dark Spirit Orb, 125 Ominous Aura, 75 Diabolical Aura e 1 Doom Aura.",
          en: "Weapon kits: 3 DoomSquire, 3 DoomSoldier and 4 DoomKnight. Final quest: 250 Corrupt Spirit Orb, 500 Dark Spirit Orb, 125 Ominous Aura, 75 Diabolical Aura and 1 Doom Aura."
        }
      ],
      note: {
        pt: "A Doom Aura tem 1% de drop, ou 100% com a Necrotic Scythe of Scourge. D\xE1 51% de dano extra em Humans e \xE9 o pr\xE9-requisito de outros farms.",
        en: "The Doom Aura has a 1% drop, or 100% with the Necrotic Scythe of Scourge. It gives 51% extra damage to Humans and is a prerequisite for other farms."
      },
      j: [
        "necropolis"
      ]
    },
    {
      n: "ArchFiend DoomLord",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/nation/archfiend-doomlord",
      sn: "AQWG: ArchFiend DoomLord",
      req: [
        {
          pt: "Rank 10 Evil, Rank 7 Arcangrove e 1 Unidentified 13 para aceitar cada quest. Todas saem do Oblivion, em /tercessuinotlim. A p\xE1gina do guia n\xE3o escreve o nome do item final, mas a URL e a \xFAltima quest apontam para esta armadura.",
          en: "Rank 10 Evil, Rank 7 Arcangrove and 1 Unidentified 13 to accept each quest. All come from Oblivion, at /tercessuinotlim. The guide page does not write the final item's name, but the URL and the last quest point to this armor."
        },
        {
          pt: `"Willpower Extraction": repetir at\xE9 ter 44 Unidentified 34. Pede 5 Necrot, 5 Chaoroot, 5 Doomatter, 10 Essence of Nulgath, 50 ArchFiend's Favour e mais itens avulsos.`,
          en: `"Willpower Extraction": repeat until you have 44 Unidentified 34. Asks for 5 Necrot, 5 Chaoroot, 5 Doomatter, 10 Essence of Nulgath, 50 ArchFiend's Favour and other single items.`
        },
        {
          pt: '"Nulgath Demands Work", 4 vezes: 10 Unidentified 34, 15 Gem of Nulgath, 30 Dark Crystal Shard, 15 Tainted Gem, 10 Diamond of Nulgath e 2 Blood Gem of the Archfiend por vez. A Unidentified 35 tem 30% de drop.',
          en: '"Nulgath Demands Work", 4 times: 10 Unidentified 34, 15 Gem of Nulgath, 30 Dark Crystal Shard, 15 Tainted Gem, 10 Diamond of Nulgath and 2 Blood Gem of the Archfiend each time. The Unidentified 35 has a 30% drop.'
        },
        {
          pt: `"Enough DOOM for an ArchFiend": 100 Essence of Nulgath, 1.000 Undead Essence, 75 Chaorruption Essence, 5.000 ArchFiend's Favour, 10 Blood Gem of the Archfiend, 100 Living Star Essence e mais.`,
          en: `"Enough DOOM for an ArchFiend": 100 Essence of Nulgath, 1,000 Undead Essence, 75 Chaorruption Essence, 5,000 ArchFiend's Favour, 10 Blood Gem of the Archfiend, 100 Living Star Essence and more.`
        }
      ],
      note: {
        pt: "Os 5.000 ArchFiend's Favour s\xE3o o ponto mais pesado. Segundo a lista do AQWG, d\xE1 35% de dano extra em All e 25% a mais de CP, XP, Rep e Gold.",
        en: "The 5,000 ArchFiend's Favour are the heaviest part. According to the AQWG list it gives 35% extra damage to All and 25% extra CP, XP, Rep and Gold."
      },
      j: [
        "tercessuinotlim"
      ]
    },
    {
      n: "Hollowborn DoomKnight",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/hollowborn/hollowborn-doomknight",
      sn: "AQWG: Hollowborn DoomKnight",
      req: [
        {
          pt: "N\xEDvel 100, Rank 10 Evil, Sepulchure's DoomKnight Armour, Necrotic Sword of Doom e a corrente do Classic Hollowborn Paladin Armour at\xE9 a \xFAltima quest.",
          en: "Level 100, Rank 10 Evil, Sepulchure's DoomKnight Armour, Necrotic Sword of Doom and the Classic Hollowborn Paladin Armour chain up to its last quest."
        },
        {
          pt: "Quests do Lae em /hollowdeep: A Dark Knight (repetir at\xE9 125 Dark Fragments), A Dark Knight Rises (15 Doom Fragments), A Dark Knight Falls e A Dark Knight Returns.",
          en: "Lae's quests in /hollowdeep: A Dark Knight (repeat until 125 Dark Fragments), A Dark Knight Rises (15 Doom Fragments), A Dark Knight Falls and A Dark Knight Returns."
        },
        {
          pt: "A \xFAltima quest pede 10.000 Dark Energy, 3 Scroll of Dark Arts, 12 Weapon Imprint, 3 Desolich's Dark Horn (Desolich tem mais de 8 milh\xF5es de HP), 1 Doom Heart (cerca de 0,5%) e as Bones from the Void Realm.",
          en: "The last quest asks for 10,000 Dark Energy, 3 Scroll of Dark Arts, 12 Weapon Imprint, 3 Desolich's Dark Horn (Desolich has over 8 million HP), 1 Doom Heart (about 0.5%) and the Bones from the Void Realm."
        },
        {
          pt: 'Unidentified 25: 1% de chance na quest "The Assistant", ou 15 milh\xF5es de gold por troca na Swindle.',
          en: 'Unidentified 25: 1% chance from the "The Assistant" quest, or 15 million gold by trade at Swindle.'
        }
      ],
      note: {
        pt: "Exige a SDKA e a Necrotic Sword of Doom, dois dos itens mais pesados desta lista, ent\xE3o fica no fim da fila. Segundo a lista do AQWG, tem os mesmos b\xF4nus do original mais 25% de gold.",
        en: "It requires the SDKA and the Necrotic Sword of Doom, two of the heaviest items on this list, so it goes at the end of the queue. According to the AQWG list it has the same boosts as the original plus 25% gold."
      },
      j: [
        "hollowdeep"
      ]
    },
    {
      n: "Armour, Helm e Cape of Awe",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/museum/set-of-awe",
      sn: "AQWG: Set of Awe",
      req: [
        {
          pt: "Valencia, no /museum: Artifact Quests, Armour of Awe, e comprar o Armour of Awe Pass (member tamb\xE9m compra o Legendary Awe Pass). Os inimigos d\xE3o Shards, que viram Fragments e depois um Relic.",
          en: "Valencia, in /museum: Artifact Quests, Armour of Awe, and buy the Armour of Awe Pass (members also buy the Legendary Awe Pass). Enemies drop Shards, which become Fragments and then a Relic."
        },
        {
          pt: "Cape of Awe: vencer o Binky em /doomvault 1 vez, melhor em grupo.",
          en: "Cape of Awe: defeat Binky at /doomvault once, best in a group."
        },
        {
          pt: "Helm of Awe: vencer o Undead Raxgore em /doomvaultb 50 vezes. Antes \xE9 preciso fazer as quests de /doomvault e /doomvaultb.",
          en: "Helm of Awe: defeat Undead Raxgore at /doomvaultb 50 times. You must first do the /doomvault and /doomvaultb quests."
        },
        {
          pt: "Armour of Awe: Ultra Akriloth 225 vezes, Carnax 100, Ultra Blood Titan 225, Ultra Alteon (125 shards) e o Mutated Void Dragon (150 shards).",
          en: "Armour of Awe: Ultra Akriloth 225 times, Carnax 100, Ultra Blood Titan 225, Ultra Alteon (125 shards) and the Mutated Void Dragon (150 shards)."
        }
      ],
      note: {
        pt: "A Armour tem 5 quests grandes, e os shards do Ultra Alteon n\xE3o caem em 100%. A Blade of Awe est\xE1 no card dela, mais acima. Cada pe\xE7a d\xE1 25% de CP, XP, Rep e Gold.",
        en: "The Armour has 5 big quests, and the Ultra Alteon shards do not drop 100% of the time. The Blade of Awe is on its own card, above. Each piece gives 25% CP, XP, Rep and Gold."
      },
      ne: "Armour, Helm and Cape of Awe",
      j: [
        "museum"
      ]
    },
    {
      n: "DeathKnight Lord",
      k: "daily",
      cls: "DeathKnight Lord",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "30 dias de quest di\xE1ria (s\xF3 member): 30 Shadow Skulls juntados em merge.",
          en: "30 days of daily quest (members only): 30 Shadow Skulls merged."
        }
      ],
      note: {
        pt: "Serve sobretudo para ultra bosses, segundo o guia.",
        en: "Mainly for ultra bosses, according to the guide."
      },
      j: []
    },
    {
      n: "Pyromancer",
      k: "daily",
      cls: "Pyromancer",
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "5 dias com member, 7 sem member, nas quests dos Shurpu Blaze Tokens.",
          en: "5 days with membership, 7 without, from the Shurpu Blaze Tokens quests."
        }
      ],
      note: {
        pt: "Uma das dailies mais curtas.",
        en: "One of the shortest dailies."
      },
      j: []
    },
    {
      n: "Cryomancer",
      k: "daily",
      cls: "Cryomancer",
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "5 dias com member, 7 sem member, com os Glacera Ice Tokens.",
          en: "5 days with membership, 7 without, with the Glacera Ice Tokens."
        }
      ],
      note: {
        pt: "A mesma dura\xE7\xE3o da Pyromancer.",
        en: "Same length as Pyromancer."
      },
      j: []
    },
    {
      n: "ShadowScythe General",
      k: "daily",
      cls: "ShadowScythe General",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "17 dias com member, 50 dias sem member.",
          en: "17 days with membership, 50 days without."
        }
      ],
      note: {
        pt: "A diferen\xE7a entre member e n\xE3o-member \xE9 a maior desta lista.",
        en: "The gap between member and non-member is the biggest on this list."
      },
      j: []
    },
    {
      n: "The Collector",
      k: "daily",
      cls: "The Collector",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "30 dias com member, 90 sem member. Pede 90 Tokens of Collection.",
          en: "30 days with membership, 90 without. Needs 90 Tokens of Collection."
        }
      ],
      note: {
        pt: "Sem member vira um farm de tr\xEAs meses.",
        en: "Without membership it becomes a three-month farm."
      },
      j: []
    },
    {
      n: "Mad Weaponsmith e Cysero's SUPER Hammer",
      k: "daily",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Mad Weaponsmith: 30 dias com member, 90 sem. Pede 90 C-Armour Tokens.",
          en: "Mad Weaponsmith: 30 days with membership, 90 without. Needs 90 C-Armour Tokens."
        },
        {
          pt: "Cysero's SUPER Hammer: mesma conta, com 90 C-Hammer Tokens, e exige a Mad Weaponsmith antes.",
          en: "Cysero's SUPER Hammer: same count, with 90 C-Hammer Tokens, and it needs Mad Weaponsmith first."
        }
      ],
      note: {
        pt: "Os dois juntos somam 60 dias com member.",
        en: "Together they add up to 60 days with membership."
      },
      ne: "Mad Weaponsmith and Cysero's SUPER Hammer",
      j: []
    },
    {
      n: "Bright Knight",
      k: "daily",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "50 dias, para member e n\xE3o-member. Pede 50 Seals of Light, 50 Seals of Darkness e 1 milh\xE3o de gold.",
          en: "50 days, for members and non-members. Needs 50 Seals of Light, 50 Seals of Darkness and 1 million gold."
        }
      ],
      note: {
        pt: "A conta de dias \xE9 igual para todos.",
        en: "The day count is the same for everyone."
      },
      j: []
    },
    {
      n: "Golden Inquisitor of Shadowfall",
      k: "daily",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "At\xE9 12 dias, para member e n\xE3o-member.",
          en: "Up to 12 days, for members and non-members."
        }
      ],
      note: {
        pt: "A lista do AQWG n\xE3o diz mais nada sobre ele.",
        en: "The AQWG list says nothing more about it."
      },
      j: []
    },
    {
      n: "Pets Zorbak, Twilly e Twig",
      k: "daily",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "30 dias, para member e n\xE3o-member. Pede 30 Moglin MEALs.",
          en: "30 days, for members and non-members. Needs 30 Moglin MEALs."
        }
      ],
      note: {
        pt: "Os tr\xEAs pets usam a mesma contagem de dias.",
        en: "The three pets use the same day count."
      },
      ne: "Zorbak, Twilly and Twig pets",
      j: []
    },
    {
      n: "Quests di\xE1rias que alimentam outros farms",
      k: "daily",
      cls: null,
      e: 0,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Mine Crafting (Artix) e Hard Core Metals (Vayle): d\xE3o os metais da BLoD, da Necrotic Sword of Doom e da SDKA. Pedem derrotar o Balboa em /stalagbite.",
          en: "Mine Crafting (Artix) and Hard Core Metals (Vayle): give the metals for the BLoD, Necrotic Sword of Doom and SDKA. They ask you to defeat Balboa at /stalagbite."
        },
        {
          pt: "Daily Diamonds (Crag): 30 Diamond of Nulgath por dia, com chance de Blood Gem.",
          en: "Daily Diamonds (Crag): 30 Diamond of Nulgath a day, with a chance of Blood Gem."
        },
        {
          pt: "Insignias das ultra bosses (di\xE1rias e semanais), Elders' Blood Potion (para a Void Highlord), Dage's Scroll Fragment, Crypto Token e Shadow Shroud.",
          en: "Ultra boss Insignias (daily and weekly), Elders' Blood Potion (for Void Highlord), Dage's Scroll Fragment, Crypto Token and Shadow Shroud."
        }
      ],
      note: {
        pt: "Fazer todo dia custa pouco e encurta muito os farms grandes.",
        en: "Doing them every day costs little and shortens the big farms a lot."
      },
      ne: "Daily quests that feed other farms",
      j: []
    },
    {
      n: "Shogun Paragon Pet",
      k: "season",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Mar\xE7o e abril. 2.000 Legion Tokens em /futurewardage.",
          en: "March and April. 2,000 Legion Tokens at /futurewardage."
        }
      ],
      note: {
        pt: "Serve para farmar Legion Tokens, e o guia diz para peg\xE1-lo antes da Legion DoomKnight.",
        en: "It is used to farm Legion Tokens, and the guide says to get it before Legion DoomKnight."
      },
      j: [
        "futurewardage"
      ]
    },
    {
      n: "Legion SwordMaster Assassin",
      k: "season",
      cls: "Legion SwordMaster Assassin",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Mar\xE7o e abril. 5.000 Legion Tokens e 300 Obsidian Rocks em /darkbirthday.",
          en: "March and April. 5,000 Legion Tokens and 300 Obsidian Rocks at /darkbirthday."
        }
      ],
      note: {
        pt: "O guia d\xE1 prioridade baixa para ela.",
        en: "The guide gives it low priority."
      },
      j: [
        "darkbirthday"
      ]
    },
    {
      n: "Vampire Lord",
      k: "season",
      cls: "Vampire Lord",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Outubro. 2.000 ACs ou 300 Blood Moon Tokens farmados durante o Mogloween.",
          en: "October. 2,000 ACs or 300 Blood Moon Tokens farmed during Mogloween."
        }
      ],
      note: {
        pt: "O guia a chama de classe forte para farm.",
        en: "The guide calls it a strong farming class."
      },
      j: []
    },
    {
      n: "Evolved Pumpkin Lord",
      k: "season",
      cls: "Evolved Pumpkin Lord",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Outubro. Cai do Great Pumpkin King ou sai de um merge com 500 Glowing Pumpkinseeds.",
          en: "October. Drops from the Great Pumpkin King or comes from a merge with 500 Glowing Pumpkinseeds."
        }
      ],
      note: {
        pt: "O guia n\xE3o recomenda gastar AC nela.",
        en: "The guide does not recommend spending ACs on it."
      },
      j: []
    },
    {
      n: "Evolved Leprechaun",
      k: "season",
      cls: "Evolved Leprechaun",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Fevereiro e mar\xE7o. 2.000 ACs, ou farmar por v\xE1rias quests e 2.000 Golden Tickets.",
          en: "February and March. 2,000 ACs, or farm it through several quests and 2,000 Golden Tickets."
        }
      ],
      note: {
        pt: "O guia diz que tem bom potencial de dano em grupo.",
        en: "The guide says it has strong group damage potential."
      },
      j: []
    },
    {
      n: "Armas de merge da Iara",
      k: "season",
      cls: null,
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      req: [
        {
          pt: "Setembro. 5 Iara Insignias por arma, ganhas na quest di\xE1ria da Ultra Iara.",
          en: "September. 5 Iara Insignias per weapon, earned from the daily Ultra Iara quest."
        }
      ],
      note: {
        pt: "Cada ins\xEDgnia vem de uma quest di\xE1ria; a lista n\xE3o diz quantas saem por dia.",
        en: "Each insignia comes from a daily quest; the list does not say how many you get per day."
      },
      ne: "Iara merge weapons",
      j: []
    },
    {
      n: "Archmage",
      k: "class",
      cls: "ArchMage",
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/classes/archmage",
      sn: "AQWG: Archmage",
      j: [],
      req: [
        {
          pt: "N\xEDvel 80 e Rank 10 em Chaos, SpellCrafting, Embersea, Etherstorm, Loremaster, Good e Evil, mais as hist\xF3rias de /guardiantree, /brightoak e /originul.",
          en: "Level 80 and Rank 10 in Chaos, SpellCrafting, Embersea, Etherstorm, Loremaster, Good and Evil, plus the /guardiantree, /brightoak and /originul storylines."
        },
        {
          pt: "Repetir 5 vezes: 49 Mythic Quills (Slugfit, /mobius), 49 Mythic Shards (Astral Ephemerites, /timespace), 1 Semiramis Feather (Terrane, /guardiantree) e Mythic Inc (Kathool, /deepchaos).",
          en: "Repeat 5 times: 49 Mythic Quills (Slugfit, /mobius), 49 Mythic Shards (Astral Ephemerites, /timespace), 1 Semiramis Feather (Terrane, /guardiantree) and Mythic Inc (Kathool, /deepchaos)."
        },
        {
          pt: "Aethereal Flow: Celestial Ether (Aranx, 30%), Chaotic Ether (Eternal Drakath, 30%), Mortal Ether (Death, 20%) e Vital Ether (Gaiazor, 20%).",
          en: "Aethereal Flow: Celestial Ether (Aranx, 30%), Chaotic Ether (Eternal Drakath, 30%), Mortal Ether (Death, 20%) and Vital Ether (Gaiazor, 20%)."
        },
        {
          pt: "Ley Lines: Earth Locus (Ektorax, 50%), Fire Locus (Drakonnan, 30%) e 30 Prime Locus Attunement (Mana Golem, 100%). Thaumaturgy: 30 Dragon Runestone (100k de gold cada), Exalted Paladin Seal (500k) e Forsaken Doom Seal (500k).",
          en: "Ley Lines: Earth Locus (Ektorax, 50%), Fire Locus (Drakonnan, 30%) and 30 Prime Locus Attunement (Mana Golem, 100%). Thaumaturgy: 30 Dragon Runestone (100k gold each), Exalted Paladin Seal (500k) and Forsaken Doom Seal (500k)."
        }
      ],
      note: {
        pt: "A p\xE1gina resumida n\xE3o mostra as quests finais da classe nem o Archmage\u2019s Ascension. Abra a fonte para essas etapas. Os locais dos bosses s\xE3o /celestialarena, /eternalchaos, /shadowattack, /gaiazor, /ectocave, /drakonnan e /elemental.",
        en: "The condensed page does not show the final class quests or the Archmage\u2019s Ascension. Open the source for those steps. The boss maps are /celestialarena, /eternalchaos, /shadowattack, /gaiazor, /ectocave, /drakonnan and /elemental."
      }
    },
    {
      n: "Dragonsoul Shinobi",
      k: "class",
      cls: "DragonSoul Shinobi",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/classes/dragonsoul-shinobi",
      sn: "AQWG: DragonSoul Shinobi",
      j: [
        "shadowfortress",
        "blackfridaywar"
      ],
      req: [
        {
          pt: "Hist\xF3ria de /shogunwar, /shinringrove, /greenshell, /heiwavalley e /shadowfortress. A vers\xE3o sazonal pede as quests de /blackfridaywar.",
          en: "Storyline of /shogunwar, /shinringrove, /greenshell, /heiwavalley and /shadowfortress. The seasonal version needs the /blackfridaywar quests."
        },
        {
          pt: "300 Dragon Shinobi Tokens, entregues em /shadowfortress.",
          en: "300 Dragon Shinobi Tokens, turned in at /shadowfortress."
        },
        {
          pt: "Fora da Black Friday: quest \u201CThe 8 Heads of Orochi\u201D, da Ai no Miko, vencendo a 2\xAA e a 3\xAA Head of Orochi.",
          en: "Outside Black Friday: the \u201CThe 8 Heads of Orochi\u201D quest, from Ai no Miko, defeating the 2nd and 3rd Head of Orochi."
        },
        {
          pt: "Em novembro: quest \u201CDragon Shinobi Tokens\u201D, da Twilly. Em grupo, BOGOdrone Prime e Executive Assistant Vordred; sozinho, uma sala com Deal Bot 2.0 e Hypnotised Shopper.",
          en: "In November: the \u201CDragon Shinobi Tokens\u201D quest, from Twilly. In a group, BOGOdrone Prime and Executive Assistant Vordred; solo, a room with Deal Bot 2.0 and Hypnotised Shopper."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista taxa de drop dos tokens.",
        en: "The page does not list the token drop rate."
      }
    },
    {
      n: "LightCaster",
      k: "class",
      cls: "LightCaster",
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/classes/lightcaster",
      sn: "AQWG: LightCaster",
      j: [
        "celestialrealm",
        "celestialarena"
      ],
      req: [
        {
          pt: "N\xEDvel 80, 1.000 ACs e a hist\xF3ria de /celestialrealm, /lostruins, /lostruinswar e /celestialarena.",
          en: "Level 80, 1,000 ACs and the /celestialrealm, /lostruins, /lostruinswar and /celestialarena storyline."
        },
        {
          pt: "Compre a Evolved LightCaster Armour com Aranx, em /celestialrealm, por 1.000 ACs (n\xE3o revend\xE1vel).",
          en: "Buy the Evolved LightCaster Armour from Aranx, at /celestialrealm, for 1,000 ACs (not sellable)."
        },
        {
          pt: "Burning Blade (1% de drop da Diabolical Warlord, em /lostruinswar) e Burning Blade of Azebeth (5% de drop da Aranx, em /celestialarena).",
          en: "Burning Blade (1% drop from the Diabolical Warlord, at /lostruinswar) and Burning Blade of Azebeth (5% drop from Aranx, at /celestialarena)."
        },
        {
          pt: "Quests da Aranx: 500 Fallen Knights, 500 Underworld Hounds e 500 Infernal Imps. Depois, Aranx\u2019s Pure Light, com 10% de drop da Aranx em /celestialarena.",
          en: "Aranx\u2019s quests: 500 Fallen Knights, 500 Underworld Hounds and 500 Infernal Imps. Then Aranx\u2019s Pure Light, with a 10% drop from Aranx at /celestialarena."
        }
      ],
      note: {
        pt: "Os drops de 1% e 5% das espadas seguram o ritmo.",
        en: "The 1% and 5% sword drops set the pace."
      }
    },
    {
      n: "Head of the Legion Beast",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/legion/head-of-the-legion-beast",
      sn: "AQWG: Head of the Legion Beast",
      j: [
        "sevencircles",
        "sevencircleswar"
      ],
      req: [
        {
          pt: "Exige Legion member e a hist\xF3ria de /sevencircles e /sevencircleswar. O merge \xE9 em /sevencircleswar.",
          en: "Needs Legion membership and the /sevencircles and /sevencircleswar storyline. The merge is at /sevencircleswar."
        },
        {
          pt: "24.000 Legion Tokens, 60 Indulgence, 60 Penance e 15 Beast Soul (da Beast em /sevencircleswar, melhor em grupo).",
          en: "24,000 Legion Tokens, 60 Indulgence, 60 Penance and 15 Beast Soul (from the Beast at /sevencircleswar, best in a group)."
        },
        {
          pt: "Penance: 60 Essence of Wrath, 60 Essence of Violence, 60 Essence of Treachery e 900 Souls of Heresy (entregues com War e Mega War Medals).",
          en: "Penance: 60 Essence of Wrath, 60 Essence of Violence, 60 Essence of Treachery and 900 Souls of Heresy (turned in with War and Mega War Medals)."
        },
        {
          pt: "Tamb\xE9m s\xE3o necess\xE1rias 3 helms Indulgence (/sevencircles) e 3 helms Penance (/sevencircleswar).",
          en: "You also need 3 Indulgence helms (/sevencircles) and 3 Penance helms (/sevencircleswar)."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista taxa de drop. Segundo a lista do AQWG, d\xE1 40% contra Undead e Humans.",
        en: "The page lists no drop rate. According to the AQWG list it gives 40% vs Undead and Humans."
      }
    },
    {
      n: "DragonBlade of Nulgath e a vers\xE3o Legion",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/dragonblade-of-nulgath",
      sn: "AQWG: DragonBlade of Nulgath",
      j: [
        "tercessuinotlim",
        "underworld"
      ],
      req: [
        {
          pt: "Exige member. Recomenda o pet Sword of Nulgath. Quest \u201CDemanding Items Of Nulgath\u201D, do pet ou do Nulgath em /tercessuinotlim.",
          en: "Needs membership. Recommends the Sword of Nulgath pet. The \u201CDemanding Items Of Nulgath\u201D quest, from the pet or from Nulgath at /tercessuinotlim."
        },
        {
          pt: "Pede DragonFire of Nulgath, Crimson Plate, Crimson Face Plate, 3 Totem of Nulgath, Behemoth Blade of Light, Behemoth Blade of Shadow e Legion Fenrir Rune.",
          en: "Needs DragonFire of Nulgath, Crimson Plate, Crimson Face Plate, 3 Totem of Nulgath, Behemoth Blade of Light, Behemoth Blade of Shadow and Legion Fenrir Rune."
        },
        {
          pt: "Total estimado: cerca de 12 Totems of Nulgath e 1.200 Combat Trophies.",
          en: "Estimated total: about 12 Totems of Nulgath and 1,200 Combat Trophies."
        },
        {
          pt: "Vers\xE3o Legion: a DragonBlade comum, member e 5.000 Legion Tokens no merge do Dage, em /underworld.",
          en: "Legion version: the regular DragonBlade, membership and 5,000 Legion Tokens at Dage\u2019s merge, in /underworld."
        }
      ],
      note: {
        pt: "A comum d\xE1 75% de dano em Dragons segundo a lista do AQWG. A p\xE1gina n\xE3o lista taxa de drop.",
        en: "The regular one gives 75% damage to Dragons according to the AQWG list. The page lists no drop rate."
      },
      ne: "DragonBlade of Nulgath and the Legion version"
    },
    {
      n: "ArchFiend DeathLord",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/archfiend-deathlord",
      sn: "AQWG: ArchFiend DeathLord",
      j: [
        "originul",
        "fiendshard"
      ],
      req: [
        {
          pt: "Termine a hist\xF3ria de /originul at\xE9 /fiendshard.",
          en: "Complete the /originul to /fiendshard storyline."
        },
        {
          pt: "Armadura, quest \u201CIt Calls to You\u201D: 20 Blood Gem of the ArchFiend, 5 Unidentified 13, 3 Totem of Nulgath, 150 Diamond of Nulgath, 50 Gem of Nulgath e 10 Unidentified 34.",
          en: "Armor, \u201CIt Calls to You\u201D quest: 20 Blood Gem of the ArchFiend, 5 Unidentified 13, 3 Totem of Nulgath, 150 Diamond of Nulgath, 50 Gem of Nulgath and 10 Unidentified 34."
        },
        {
          pt: "Helm e capa (opcionais), quest \u201CThe Swirling Abyss Gathers\u201D: 10 Blood Gem, 3 Unidentified 13, 75 Tainted Gem, 50 Dark Crystal Shard e 50 Gem of Nulgath.",
          en: "Helm and cape (optional), \u201CThe Swirling Abyss Gathers\u201D quest: 10 Blood Gem, 3 Unidentified 13, 75 Tainted Gem, 50 Dark Crystal Shard and 50 Gem of Nulgath."
        }
      ],
      note: {
        pt: "A armadura d\xE1 30% de dano contra inimigos marcados, o helm e a capa 20%. A p\xE1gina manda ver a Reagent Library para as fontes dos itens.",
        en: "The armor gives 30% damage against tagged enemies, the helm and cape 20%. The page sends you to the Reagent Library for item sources."
      }
    },
    {
      n: "Arch DoomKnight",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/evil/arch-doomknight",
      sn: "AQWG: Arch DoomKnight",
      j: [
        "stonewood"
      ],
      req: [
        {
          pt: "N\xEDvel 60, Rank 10 em DoomWood e Evil, Rank 9 Arcangrove, SDKA e a hist\xF3ria de /maul at\xE9 /necrotower. Quests do Vordred, em /stonewood.",
          en: "Level 60, Rank 10 in DoomWood and Evil, Rank 9 Arcangrove, SDKA and the /maul to /necrotower storyline. Quests from Vordred, at /stonewood."
        },
        {
          pt: "Quests 1 a 3: caveiras e armas de bosses de ~20 mapas, como Spine Gripper (1%, /battleundera), Escherion\u2019s Robe e Dracolich Destroyer Scythe.",
          en: "Quests 1 to 3: skulls and weapons from bosses on ~20 maps, such as Spine Gripper (1%, /battleundera), Escherion\u2019s Robe and Dracolich Destroyer Scythe."
        },
        {
          pt: "Quest 4: 5 Desolich\u2019s Skull, 10 Undead Raxgore\u2019s Skull, 15 Legion Lich Lord\u2019s Skull e 20 Reaper\u2019s Skull.",
          en: "Quest 4: 5 Desolich\u2019s Skull, 10 Undead Raxgore\u2019s Skull, 15 Legion Lich Lord\u2019s Skull and 20 Reaper\u2019s Skull."
        },
        {
          pt: "Quest 5: Scroll of Dark Arts (cerca de 1%), Noxus Runes, Sally\u2019s Necronomicon (20 milh\xF5es de gold) e Ancient Evil of the Necropolis. Quest 6: vencer a Ultra Vordred.",
          en: "Quest 5: Scroll of Dark Arts (about 1%), Noxus Runes, Sally\u2019s Necronomicon (20 million gold) and Ancient Evil of the Necropolis. Quest 6: defeat Ultra Vordred."
        }
      ],
      note: {
        pt: "O Undead Raxgore e o Desolich s\xE3o bosses longos. D\xE1 30% contra Dragons e Humans, segundo a lista do AQWG.",
        en: "Undead Raxgore and Desolich are long bosses. It gives 30% vs Dragons and Humans, according to the AQWG list."
      }
    },
    {
      n: "Empowered Vordred\u2019s Armour",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/evil/empowered-vordreds-armour",
      sn: "AQWG: Empowered Vordred\u2019s Armour",
      j: [
        "epicvordred",
        "sepulchurebattle"
      ],
      req: [
        {
          pt: "Exige a SDKA e a Sepulchure\u2019s armour. Rank 7 Evil e 14 ou mais espa\xE7os de invent\xE1rio.",
          en: "Needs the SDKA and Sepulchure\u2019s armour. Rank 7 Evil and 14 or more inventory slots."
        },
        {
          pt: "Gathering Power: 1.800 Undead Energy, 500 Human Souls (/noxustower) e 600 Dragon Energy (/lair).",
          en: "Gathering Power: 1,800 Undead Energy, 500 Human Souls (/noxustower) and 600 Dragon Energy (/lair)."
        },
        {
          pt: "Death\u2019s Door: 400 Death\u2019s Power e Souls of the Dead da Death, em /shadowattack. Chaotic Lords: 13 Chaotic Power, de itens dos Lords de 13 mapas.",
          en: "Death\u2019s Door: 400 Death\u2019s Power and Souls of the Dead from Death, at /shadowattack. Chaotic Lords: 13 Chaotic Power, from items of the Lords on 13 maps."
        },
        {
          pt: "A Means to an End: 50 Ultimate Darkness Gem, 2.000 Undead Energy, 2 Scroll of Dark Arts (cerca de 1%), Doom Heart (cerca de 0,5%), Dread Knight Cleaver, Reaper\u2019s Soul e 2 Desolich\u2019s Undead Eye.",
          en: "A Means to an End: 50 Ultimate Darkness Gem, 2,000 Undead Energy, 2 Scroll of Dark Arts (about 1%), Doom Heart (about 0.5%), Dread Knight Cleaver, Reaper\u2019s Soul and 2 Desolich\u2019s Undead Eye."
        }
      ],
      note: {
        pt: "D\xE1 51% contra Humans, segundo a lista do AQWG.",
        en: "It gives 51% vs Humans, according to the AQWG list."
      }
    },
    {
      n: "Original Drakath Armour",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/chaos/original-drakath-armour",
      sn: "AQWG: Original Drakath Armour",
      j: [
        "confrontation"
      ],
      req: [
        {
          pt: "Exige a Blade of Awe, a Blinding Light of Destiny e a hist\xF3ria dos 13 Lords of Chaos. A quest \u201CBuild Drakath\u2019s Armour\u201D \xE9 em /confrontation.",
          en: "Needs the Blade of Awe, the Blinding Light of Destiny and the 13 Lords of Chaos storyline. The \u201CBuild Drakath\u2019s Armour\u201D quest is at /confrontation."
        },
        {
          pt: "3 Unidentified 13 e 100 Treasure Chest (0,75% de drop em qualquer inimigo).",
          en: "3 Unidentified 13 and 100 Treasure Chest (0.75% drop from any enemy)."
        },
        {
          pt: "Face of Chaos: 2% de drop do Drakath em /finalbattle, s\xF3 sozinho. Le Chocolat: 3,75 milh\xF5es de gold em /hyperspace.",
          en: "Face of Chaos: 2% drop from Drakath at /finalbattle, solo only. Le Chocolat: 3.75 million gold at /hyperspace."
        },
        {
          pt: "13 Dage\u2019s Scroll Fragment, da quest di\xE1ria \u201CEmbrace Your Chaos\u201D da Maya, em /mountdoomskull. D\xE1 para recomprar BLoD e Blade of Awe de gra\xE7a no site.",
          en: "13 Dage\u2019s Scroll Fragment, from Maya\u2019s daily \u201CEmbrace Your Chaos\u201D quest at /mountdoomskull. You can buy back the BLoD and Blade of Awe for free on the website."
        }
      ],
      note: {
        pt: "Os 13 Scroll Fragments s\xE3o s\xF3 1 por dia, ent\xE3o s\xE3o 13 dias no m\xEDnimo.",
        en: "The 13 Scroll Fragments come at 1 a day, so that is 13 days at the least."
      }
    },
    {
      n: "Empowered Chaos Avenger\u2019s Greatsword",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/chaos/empowered-chaos-avengers-greatsword",
      sn: "AQWG: Empowered Chaos Avenger\u2019s Greatsword",
      j: [
        "championdrakath",
        "ultradrakath"
      ],
      req: [
        {
          pt: "Exige a classe Chaos Avenger e Rank 10 Chaos Militia.",
          en: "Needs the Chaos Avenger class and Rank 10 Chaos Militia."
        },
        {
          pt: "Rota 1: compre a Chaos Avenger\u2019s Greatsword na loja da classe, em /championdrakath, e melhore com 5 Champion Drakath Insignias.",
          en: "Route 1: buy the Chaos Avenger\u2019s Greatsword at the class shop, at /championdrakath, and upgrade it with 5 Champion Drakath Insignias."
        },
        {
          pt: "Rota 2 (sem a classe): a Blade of Chaos, do Champion of Chaos em /ultradrakath, melhorada com 5 Insignias.",
          en: "Route 2 (without the class): the Blade of Chaos, from the Champion of Chaos at /ultradrakath, upgraded with 5 Insignias."
        }
      ],
      note: {
        pt: "S\xE3o 5 ins\xEDgnias, mas elas v\xEAm da quest semanal do Drakath.",
        en: "It is 5 insignias, but they come from the weekly Drakath quest."
      }
    },
    {
      n: "Awe-scension",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/museum/awe-scension",
      sn: "AQWG: Awe-scension",
      j: [
        "museum"
      ],
      req: [
        {
          pt: "N\xEDvel 100, Rank 10 Evil, Original Drakath Armour, Set of Awe, Arch DoomKnight e v\xE1rias hist\xF3rias. Quests da Trissa, no /museum.",
          en: "Level 100, Rank 10 Evil, Original Drakath Armour, Set of Awe, Arch DoomKnight and several storylines. Quests from Trissa, in /museum."
        },
        {
          pt: "As 8 quests pedem itens de bosses de dezenas de mapas, como 12 Fossilised Egg Yolk, 8 Enchanted Manuscript, 8 Supercharged Gem e 10 Dwakel Weapon.",
          en: "The 8 quests ask for items from bosses on dozens of maps, such as 12 Fossilised Egg Yolk, 8 Enchanted Manuscript, 8 Supercharged Gem and 10 Dwakel Weapon."
        },
        {
          pt: "Artifact Hunting: Supreme Arcane Staff (1% da Ledgermayne), ShadowReaper of Doom (0,5% do Undead Artix e 300 Mirror Realm Token) e 50 Mirror Shield Fragment.",
          en: "Artifact Hunting: Supreme Arcane Staff (1% from Ledgermayne), ShadowReaper of Doom (0.5% from Undead Artix and 300 Mirror Realm Token) and 50 Mirror Shield Fragment."
        },
        {
          pt: "Quest de ouro e rep: 333 Vaden Helm Tokens e v\xE1rios chains longos. O \xFAltimo passo pede Sepulchure\u2019s Original Helm e 50 Bin Jett\u2019s Salvaged Armour Part.",
          en: "Gold and rep quest: 333 Vaden Helm Tokens and several long chains. The last step needs Sepulchure\u2019s Original Helm and 50 Bin Jett\u2019s Salvaged Armour Part."
        }
      ],
      note: {
        pt: "\xC9 a maior corrente desta lista em n\xFAmero de itens exigidos. O Awescended da lista do AQWG vem daqui.",
        en: "It is the biggest chain on this list by number of required items. The AQWG list\u2019s Awescended comes from here."
      }
    },
    {
      n: "Classic Hollowborn Paladin Armour",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/hollowborn/classic-hollowborn-paladin-armour",
      sn: "AQWG: Classic Hollowborn Paladin Armour",
      j: [
        "hollowdeep"
      ],
      req: [
        {
          pt: "N\xEDvel 100, Good Rank 10, DoomWood Rank 6, Original Drakath Armour e Ascended Light of Destiny (Dread Stranglerfish, /towerofdoom4).",
          en: "Level 100, Good Rank 10, DoomWood Rank 6, Original Drakath Armour and Ascended Light of Destiny (Dread Stranglerfish, /towerofdoom4)."
        },
        {
          pt: "Lae\u2019s Hardcore Contract: Soul Potion, 50 Human Soul (/noxustower) e 13 Fallen Soul do Undead Paladin (/doomwood).",
          en: "Lae\u2019s Hardcore Contract: Soul Potion, 50 Human Soul (/noxustower) and 13 Fallen Soul from the Undead Paladin (/doomwood)."
        },
        {
          pt: "Quests 1 a 3: 200 Human Soul, 200 Human Soul e 300 Human Soul, mais Brilliant Aura, Gem of Superiority, Seal of Light (Ultra Alteon), Seal of Darkness (Ultra Sepulchure) e Unidentified 25.",
          en: "Quests 1 to 3: 200, 200 and 300 Human Soul, plus Brilliant Aura, Gem of Superiority, Seal of Light (Ultra Alteon), Seal of Darkness (Ultra Sepulchure) and Unidentified 25."
        },
        {
          pt: "Quest 4: Shadow Seal (inimigos da Nation, /shadowblast) e 50 Human Soul.",
          en: "Quest 4: Shadow Seal (Nation enemies, /shadowblast) and 50 Human Soul."
        }
      ],
      note: {
        pt: "Segundo a lista do AQWG d\xE1 25% contra Humans. Os 750 Human Souls v\xEAm s\xF3 de /noxustower.",
        en: "According to the AQWG list it gives 25% vs Humans. The 750 Human Souls come only from /noxustower."
      }
    },
    {
      n: "Hollowborn Oblivion Blade",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/hollowborn/hollowborn-oblivion-blade",
      sn: "AQWG: Hollowborn Oblivion Blade",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "N\xEDvel 80 e as ArchFiend Enchanted Orbs, feitas na Reagent Library com 150 Diamond of Nulgath, Unidentified 25, Unidentified 13, Voucher of Nulgath (non-mem) e 10 Blood Gem of the ArchFiend.",
          en: "Level 80 and the ArchFiend Enchanted Orbs, made at the Reagent Library from 150 Diamond of Nulgath, Unidentified 25, Unidentified 13, Voucher of Nulgath (non-mem) and 10 Blood Gem of the ArchFiend."
        },
        {
          pt: "Passo 1 (Lae): 100 Fresh Souls, dos Inquisitor Guards em /citadel.",
          en: "Step 1 (Lae): 100 Fresh Souls, from the Inquisitor Guards at /citadel."
        },
        {
          pt: "Passo 2 (\u201CSummoning and Stuff\u201D): 500 Diamond of Nulgath, Unidentified 25, 1.000 ArchFiend\u2019s Favour e 50 Blood Gem of the ArchFiend.",
          en: "Step 2 (\u201CSummoning and Stuff\u201D): 500 Diamond of Nulgath, Unidentified 25, 1,000 ArchFiend\u2019s Favour and 50 Blood Gem of the ArchFiend."
        },
        {
          pt: "Passo 3: Diabolical Minion\u2019s Seed (/lostruinswar), 4th Dimension Gem (/blackholesun), Celestial Seal (/goldenarena), Death\u2019s Power (/shadowattack) e 350 Fresh Soul.",
          en: "Step 3: Diabolical Minion\u2019s Seed (/lostruinswar), 4th Dimension Gem (/blackholesun), Celestial Seal (/goldenarena), Death\u2019s Power (/shadowattack) and 350 Fresh Soul."
        }
      ],
      note: {
        pt: "D\xE1 30% de dano em All, segundo a lista do AQWG.",
        en: "It gives 30% damage to All, according to the AQWG list."
      }
    },
    {
      n: "Infernal Flame Pyromancer",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/other/infernal-flame-pyromancer",
      sn: "AQWG: Infernal Flame Pyromancer",
      j: [
        "ultratyndarius"
      ],
      req: [
        {
          pt: "Hist\xF3ria de /fireplanewar, /shadowfireplane, /fireinvasion, /wartraining e /fireavatar. O merge \xE9 em /ultratyndarius.",
          en: "Storyline of /fireplanewar, /shadowfireplane, /fireinvasion, /wartraining and /fireavatar. The merge is at /ultratyndarius."
        },
        {
          pt: "20 Avatar Tyndarius Insignias, da quest di\xE1ria do Galanoth contra a Ultra Avatar Tyndarius. Leva no m\xEDnimo 10 dias.",
          en: "20 Avatar Tyndarius Insignias, from Galanoth\u2019s daily quest against Ultra Avatar Tyndarius. It takes at least 10 days."
        },
        {
          pt: "75 Fire Avatar Favour, da quest \u201CAvatar\u2019s Rage\u201D, em /fireavatar (Shadefire Cavalry, Majors, Colonel, Elementals e Living Shadowflame).",
          en: "75 Fire Avatar Favour, from the \u201CAvatar\u2019s Rage\u201D quest, at /fireavatar (Shadefire Cavalry, Majors, Colonel, Elementals and Living Shadowflame)."
        }
      ],
      note: {
        pt: "A p\xE1gina diz que os drops empilham at\xE9 30, o que n\xE3o bate com os 75 pedidos.",
        en: "The page says the drops stack to 30, which does not match the 75 asked."
      }
    },
    {
      n: "Infernal Flame Khopesh",
      k: "gear",
      cls: null,
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/items/other/infernal-flame-khopesh",
      sn: "AQWG: Infernal Flame Khopesh",
      j: [
        "ultratyndarius"
      ],
      req: [
        {
          pt: "Mesma hist\xF3ria e mesmo merge da Infernal Flame Pyromancer. Fa\xE7a a Pyromancer antes, a n\xE3o ser que tenha a ArchFiend DoomLord.",
          en: "Same storyline and merge as the Infernal Flame Pyromancer. Do the Pyromancer first, unless you own the ArchFiend DoomLord."
        },
        {
          pt: "14 Avatar Tyndarius Insignias (di\xE1ria, no m\xEDnimo 7 dias) e 40 Fire Avatar Favour.",
          en: "14 Avatar Tyndarius Insignias (daily, at least 7 days) and 40 Fire Avatar Favour."
        }
      ],
      note: {
        pt: "A p\xE1gina diz que os drops empilham at\xE9 30, mas pede 40.",
        en: "The page says the drops stack to 30, but it asks for 40."
      }
    },
    {
      n: "Fire Champion\u2019s Armour",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/other/fire-champions-armour",
      sn: "AQWG: Fire Champion\u2019s Armour",
      j: [
        "wartraining"
      ],
      req: [
        {
          pt: "Mesma hist\xF3ria de fogo, mais Rank 10 Dragonslayer (comprado em /lair). Compre na loja da Vagra, em /wartraining, com o Polished DragonSlayer.",
          en: "Same fire storyline, plus Rank 10 Dragonslayer (bought at /lair). Buy at Vagra\u2019s shop, at /wartraining, with the Polished DragonSlayer."
        },
        {
          pt: "90 Warfury Emblem (30 agora e 60 depois), da quest \u201CWarfury Training\u201D. A Vagra d\xE1 de 1 a 20 em grupo.",
          en: "90 Warfury Emblem (30 now and 60 later), from the \u201CWarfury Training\u201D quest. Vagra drops 1 to 20 in a group."
        },
        {
          pt: "155 Enchanted Scale (30 agora e 125 depois), da quest do Galanoth em /dragontown. 30 Dragon Scale em /lair.",
          en: "155 Enchanted Scale (30 now and 125 later), from Galanoth\u2019s quest at /dragontown. 30 Dragon Scale at /lair."
        },
        {
          pt: "10 Flame-Forged Metal (Chanky, /underworld), 13 Void Scale (ArchFiend Dragonlord, /underlair, muito dif\xEDcil) e 50 Gold Voucher 500k, 25 milh\xF5es de gold no total.",
          en: "10 Flame-Forged Metal (Chanky, /underworld), 13 Void Scale (ArchFiend Dragonlord, /underlair, very hard) and 50 Gold Voucher 500k, 25 million gold in total."
        }
      ],
      note: {
        pt: "A p\xE1gina lista as quantidades de drop, sem porcentagem.",
        en: "The page lists drop counts, without percentages."
      }
    },
    {
      n: "Prince Darkon\u2019s Poleaxe",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/other/prince-darkons-poleaxe",
      sn: "AQWG: Prince Darkon\u2019s Poleaxe",
      j: [
        "ultradrago",
        "garden"
      ],
      req: [
        {
          pt: "Termine a hist\xF3ria de /eridani, /astravia, /astraviacastle, /astraviajudge, /ultradrago e /garden. A compra final \xE9 na loja da Re, em /ultradrago.",
          en: "Complete the /eridani, /astravia, /astraviacastle, /astraviajudge, /ultradrago and /garden storyline. The final purchase is at Re\u2019s shop, in /ultradrago."
        },
        {
          pt: "Algie\u2019s Bow e Dene\u2019s Axe: 5 Ultra Drago Insignias para cada, 20 no total.",
          en: "Algie\u2019s Bow and Dene\u2019s Axe: 5 Ultra Drago Insignias each, 20 in total."
        },
        {
          pt: "22 de cada: Darkon\u2019s Receipt, Teeth, La\u2019s Gratitude, Astravian Medal e A Melody, cada um com sua quest e seus drops.",
          en: "22 each of: Darkon\u2019s Receipt, Teeth, La\u2019s Gratitude, Astravian Medal and A Melody, each with its own quest and drops."
        },
        {
          pt: "22 Darkon\u2019s Instant Noodles, a 2,2 milh\xF5es de gold cada (48,8 milh\xF5es no total). O Nulgath\u2019s Mask tem 20% de drop em /tercessuinotlim.",
          en: "22 Darkon\u2019s Instant Noodles, at 2.2 million gold each (48.8 million in total). Nulgath\u2019s Mask has a 20% drop at /tercessuinotlim."
        }
      ],
      note: {
        pt: "O custo em gold \xE9 o maior desta lista.",
        en: "The gold cost is the biggest on this list."
      }
    },
    {
      n: "Taro\u2019s Prismatic Manslayer",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/taros-prismatic-manslayer",
      sn: "AQWG: Taro\u2019s Prismatic Manslayer",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Exige member, n\xEDvel 80 e Rank 10 Good.",
          en: "Needs membership, level 80 and Rank 10 Good."
        },
        {
          pt: "Passo 1: a Taro\u2019s Manslayer, derrotando o Taro Blademaster (200k HP) ou fazendo a quest \u201CThe Guardian Taro Blademaster\u201D com 10 Gems of Nulgath e a Dark Makai Rune.",
          en: "Step 1: Taro\u2019s Manslayer, by defeating Taro Blademaster (200k HP) or doing the \u201CThe Guardian Taro Blademaster\u201D quest with 10 Gems of Nulgath and the Dark Makai Rune."
        },
        {
          pt: "Passo 2, \u201CA Test of Temptation\u201D: 200 Tainted Gem, 125 Dark Crystal Shard, 300 Diamond of Nulgath, 75 Gem of Nulgath e 35 Blood Gem of the ArchFiend.",
          en: "Step 2, \u201CA Test of Temptation\u201D: 200 Tainted Gem, 125 Dark Crystal Shard, 300 Diamond of Nulgath, 75 Gem of Nulgath and 35 Blood Gem of the ArchFiend."
        }
      ],
      note: {
        pt: "D\xE1 30% de dano em All, segundo a lista do AQWG.",
        en: "It gives 30% damage to All, according to the AQWG list."
      }
    },
    {
      n: "Gemstone of Nulgath",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/gemstone-of-nulgath",
      sn: "AQWG: Gemstone of Nulgath",
      j: [
        "crashsite",
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "N\xEDvel 45 e Rank 10 Vampire. Passo 1: quests da Valencia em /crashsite e /crashruins, e 100 Dwobo Coins.",
          en: "Level 45 and Rank 10 Vampire. Step 1: Valencia\u2019s quests at /crashsite and /crashruins, and 100 Dwobo Coins."
        },
        {
          pt: "Passo 2, \u201CDemanding Approval from Nulgath\u201D: 3 Unidentified 13, 100 Essence of Nulgath, 5 Ultimate Darkness Gem (/shadowfallwar), Totem of Nulgath, Voucher e Receipt of Nulgath.",
          en: "Step 2, \u201CDemanding Approval from Nulgath\u201D: 3 Unidentified 13, 100 Essence of Nulgath, 5 Ultimate Darkness Gem (/shadowfallwar), Totem of Nulgath, Voucher and Receipt of Nulgath."
        },
        {
          pt: "O Receipt pede Blade of Affliction (1,5 milh\xE3o de gold), 10 Essence of Nulgath, 100 ArchFiend\u2019s Favour, 15 Coal (/extinction) e 10 Dwobo Coin.",
          en: "The Receipt needs Blade of Affliction (1.5 million gold), 10 Essence of Nulgath, 100 ArchFiend\u2019s Favour, 15 Coal (/extinction) and 10 Dwobo Coin."
        },
        {
          pt: "Passo 3: Unidentified 4 e 5 (20% de drop das \u201CSupplies to spin The Wheel of Chance\u201D), Balor\u2019s Cruelty (Abaddon, /twilight) e Yara\u2019s Sword (/battleundera).",
          en: "Step 3: Unidentified 4 and 5 (20% drop from the \u201CSupplies to spin The Wheel of Chance\u201D), Balor\u2019s Cruelty (Abaddon, /twilight) and Yara\u2019s Sword (/battleundera)."
        }
      ],
      note: {
        pt: "Garante Dark Crystal Shard e Blood Gem of the ArchFiend (100%), o que ajuda em outros farms da Nation.",
        en: "Guarantees Dark Crystal Shard and Blood Gem of the ArchFiend (100%), which helps other Nation farms."
      }
    },
    {
      n: "Enchanted Nulgath Nation House",
      k: "gear",
      cls: null,
      e: 5,
      src: "https://sites.google.com/view/aqwg-net/items/nation/enchanted-nulgath-nation-house",
      sn: "AQWG: Enchanted Nulgath Nation House",
      j: [
        "tercessuinotlim",
        "archportal"
      ],
      req: [
        {
          pt: "Rank 2 Chaos, Rank 10 DoomWood, 15 ou mais espa\xE7os de invent\xE1rio e a NUE Necronomicon (loja de rep da Lady Speedstyk, em /lightguard).",
          en: "Rank 2 Chaos, Rank 10 DoomWood, 15 or more inventory slots and the NUE Necronomicon (Lady Speedstyk\u2019s rep shop, at /lightguard)."
        },
        {
          pt: "Quest \u201CTerraforming\u201D, do Nulgath: 400 Unidentified 10, 200 Tainted Gem, 250 Dark Crystal Shard, 300 Diamond of Nulgath, 30 Totem of Nulgath, 150 Gem of Nulgath, 1.000 Nulgath\u2019s Approval e 100 Blood Gem of the ArchFiend.",
          en: "\u201CTerraforming\u201D quest, from Nulgath: 400 Unidentified 10, 200 Tainted Gem, 250 Dark Crystal Shard, 300 Diamond of Nulgath, 30 Totem of Nulgath, 150 Gem of Nulgath, 1,000 Nulgath\u2019s Approval and 100 Blood Gem of the ArchFiend."
        },
        {
          pt: "Mais Cemaros\u2019 Amethyst, Aluminium, Unidentified 13 e Voucher of Nulgath (non-mem).",
          en: "Plus Cemaros\u2019 Amethyst, Aluminium, Unidentified 13 and Voucher of Nulgath (non-mem)."
        },
        {
          pt: "Passo 2: Pink Star Diamond of Nulgath e 2 Musgravite of Nulgath, juntados com a casa comum na loja do Dirtlicker, em /archportal.",
          en: "Step 2: Pink Star Diamond of Nulgath and 2 Musgravite of Nulgath, merged with the base house at Dirtlicker\u2019s shop, at /archportal."
        }
      ],
      note: {
        pt: "A casa traz quests de farm da Nation e um portal para /tercessuinotlim.",
        en: "The house brings Nation farming quests and a portal to /tercessuinotlim."
      }
    },
    {
      n: "Yulgath\u2019s Inn",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/yulgaths-inn",
      sn: "AQWG: Yulgath\u2019s Inn",
      j: [
        "originul",
        "archportal"
      ],
      req: [
        {
          pt: "Hist\xF3ria de /originul (Memory of Nulgath) at\xE9 chegar ao Fiend Champion. Derrote-o at\xE9 cair a Yulgath\u2019s Hut.",
          en: "Storyline of /originul (Memory of Nulgath) until you reach the Fiend Champion. Defeat it until the Yulgath\u2019s Hut drops."
        },
        {
          pt: "Reagentes: 400 Unidentified 10, 200 Tainted Gem, 250 Dark Crystal Shard, 200 Diamond of Nulgath, Unidentified 13 e Voucher of Nulgath (non-mem).",
          en: "Reagents: 400 Unidentified 10, 200 Tainted Gem, 250 Dark Crystal Shard, 200 Diamond of Nulgath, Unidentified 13 and Voucher of Nulgath (non-mem)."
        },
        {
          pt: "Merge na loja do Dirtlicker, em /archportal.",
          en: "Merge at Dirtlicker\u2019s shop, at /archportal."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista a taxa de drop da Yulgath\u2019s Hut.",
        en: "The page does not list the Yulgath\u2019s Hut drop rate."
      }
    },
    {
      n: "Void Paladin",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/void-paladin",
      sn: "AQWG: Void Paladin",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Quests do Oblivion. A 3 exige a BLoD (ou a vers\xE3o Ascended). A 4 exige armadura, machado, helm, katana e capa da katana.",
          en: "Oblivion\u2019s quests. The 3rd needs the BLoD (or its Ascended version). The 4th needs armor, axe, helm, katana and katana cape."
        },
        {
          pt: "Quest 1: 25 Dark Crystal Shard, 13 Diamond of Nulgath, 2 Emblem of Nulgath, 35 Tainted Gem e mais. Quest 2: 25 Diamond, 40 Tainted Gem, 25 Gem of Nulgath, 40 Dark Crystal Shard, 2 Unidentified 13 e 2 Void Aura.",
          en: "Quest 1: 25 Dark Crystal Shard, 13 Diamond of Nulgath, 2 Emblem of Nulgath, 35 Tainted Gem and more. Quest 2: 25 Diamond, 40 Tainted Gem, 25 Gem of Nulgath, 40 Dark Crystal Shard, 2 Unidentified 13 and 2 Void Aura."
        },
        {
          pt: "Quest 3 (machado): 40 Diamond, 40 Dark Crystal Shard, 20 Gem of Nulgath, 40 Tainted Gem, 3 Emblem of Nulgath e 6 Void Aura. Quest 4: vencer Undead Space Warriors em /dreadspace.",
          en: "Quest 3 (axe): 40 Diamond, 40 Dark Crystal Shard, 20 Gem of Nulgath, 40 Tainted Gem, 3 Emblem of Nulgath and 6 Void Aura. Quest 4: defeat Undead Space Warriors at /dreadspace."
        }
      ],
      note: {
        pt: "A p\xE1gina manda ver a Reagent Library para as fontes.",
        en: "The page sends you to the Reagent Library for sources."
      }
    },
    {
      n: "Void Shogun",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/void-shogun",
      sn: "AQWG: Void Shogun",
      j: [
        "heiwavalley",
        "quibblehunt"
      ],
      req: [
        {
          pt: "Rank 10 Yokai, a hist\xF3ria de /shinringrove at\xE9 /heiwavalley e Voucher of Nulgath (non-member).",
          en: "Rank 10 Yokai, the /shinringrove to /heiwavalley storyline and Voucher of Nulgath (non-member)."
        },
        {
          pt: "Void Monk of Nulgath: junte 500 Void Vouchers (de Void Larvae) com o Quibble, em /quibblehunt.",
          en: "Void Monk of Nulgath: merge 500 Void Vouchers (from Void Larvae) with Quibble, at /quibblehunt."
        },
        {
          pt: "Quest \u201CVoid Shogun Farming Quest\u201D, em /heiwavalley: DaiTengu Blade of Wind, Unidentified 13, Unidentified 24, ShadowStone Rune, Orochi\u2019s Shadow e 7 Blood Gem of the ArchFiend. Entregue 11 vezes.",
          en: "\u201CVoid Shogun Farming Quest\u201D, at /heiwavalley: DaiTengu Blade of Wind, Unidentified 13, Unidentified 24, ShadowStone Rune, Orochi\u2019s Shadow and 7 Blood Gem of the ArchFiend. Turn in 11 times."
        }
      ],
      note: {
        pt: "Muitas Unidentified 13: o guia recomenda os pets Crag & Bamboozle.",
        en: "Many Unidentified 13: the guide recommends the Crag & Bamboozle pets."
      }
    },
    {
      n: "Void Spartan",
      k: "gear",
      cls: null,
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/items/nation/void-spartan",
      sn: "AQWG: Void Spartan",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "N\xEDvel 20. Quest \u201CVoid Spartan\u201D, da Zee, em /tercessuinotlim, entregue 11 vezes.",
          en: "Level 20. Zee\u2019s \u201CVoid Spartan\u201D quest, at /tercessuinotlim, turned in 11 times."
        },
        {
          pt: "Por vez: Unidentified 13, Zee\u2019s Red Jasper, 10 Gem of Nulgath, Fiend Cloak of Nulgath e 5 Blood Gem of the ArchFiend.",
          en: "Each time: Unidentified 13, Zee\u2019s Red Jasper, 10 Gem of Nulgath, Fiend Cloak of Nulgath and 5 Blood Gem of the ArchFiend."
        }
      ],
      note: {
        pt: "O Zee\u2019s Red Jasper tem 2% de drop do Flame Soldier em /embersea.",
        en: "Zee\u2019s Red Jasper has a 2% drop from the Flame Soldier at /embersea."
      }
    },
    {
      n: "Void Avenger Scythe",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/void-avenger-scythe",
      sn: "AQWG: Void Avenger Scythe",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Rank 10 Evil. Quest \u201CEternal Rest\u201D, do Skew, em /tercessuinotlim.",
          en: "Rank 10 Evil. Skew\u2019s \u201CEternal Rest\u201D quest, at /tercessuinotlim."
        },
        {
          pt: "Batwing Scythe, Death Scythe of Nulgath, Ungodly Reavers, Scythe of Sisyphean, Heart of the Void, The Scythe of Eternal Rest, Dracolich Destroyer Scythe e Letter from Asuka and Tendou.",
          en: "Batwing Scythe, Death Scythe of Nulgath, Ungodly Reavers, Scythe of Sisyphean, Heart of the Void, The Scythe of Eternal Rest, Dracolich Destroyer Scythe and Letter from Asuka and Tendou."
        },
        {
          pt: "Mais 200 Dark Crystal Shard, 1.000 Nulgath\u2019s Approval e 15 Void Aura. Recompensa: 5 Blood Gem of the ArchFiend.",
          en: "Plus 200 Dark Crystal Shard, 1,000 Nulgath\u2019s Approval and 15 Void Aura. Reward: 5 Blood Gem of the ArchFiend."
        }
      ],
      note: {
        pt: "A maior parte do trabalho \xE9 juntar as 8 foices, cada uma de um mapa.",
        en: "Most of the work is gathering the 8 scythes, each from a different map."
      }
    },
    {
      n: "Golden Hanzo Void e Shadow Legacy of Nulgath",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/golden-hanzo-void",
      sn: "AQWG: Golden Hanzo Void",
      j: [
        "evilwarnul",
        "archportal"
      ],
      req: [
        {
          pt: "Golden Hanzo Void (merge na loja da Diligas, em /evilwarnul): 200 ArchFiend\u2019s Favour, 50 Diamond of Nulgath, 30 Tainted Gem, 15 Dark Crystal Shard, 50 Nulgath\u2019s Approval e Voucher of Nulgath (non-mem).",
          en: "Golden Hanzo Void (merge at Diligas\u2019 shop, at /evilwarnul): 200 ArchFiend\u2019s Favour, 50 Diamond of Nulgath, 30 Tainted Gem, 15 Dark Crystal Shard, 50 Nulgath\u2019s Approval and Voucher of Nulgath (non-mem)."
        },
        {
          pt: "Shadow Legacy of Nulgath (merge na loja do Dirtlicker, em /archportal): Hadean Onyx of Nulgath, Voucher (non-mem), 100 Essence of Nulgath, 100 Nulgath\u2019s Approval e Letter from Asuka and Tendou.",
          en: "Shadow Legacy of Nulgath (merge at Dirtlicker\u2019s shop, at /archportal): Hadean Onyx of Nulgath, Voucher (non-mem), 100 Essence of Nulgath, 100 Nulgath\u2019s Approval and Letter from Asuka and Tendou."
        }
      ],
      note: {
        pt: "As p\xE1ginas n\xE3o listam pr\xE9-requisitos nem taxas de drop.",
        en: "The pages list no prerequisites or drop rates."
      },
      ne: "Golden Hanzo Void and Shadow Legacy of Nulgath"
    },
    {
      n: "Juggernaut Items of Nulgath",
      k: "gear",
      cls: null,
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/items/nation/juggernaut-items",
      sn: "AQWG: Juggernaut Items",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "N\xEDvel 30 e 1 Unidentified 13. Quest \u201CJuggernaut Items of Nulgath\u201D, em /tercessuinotlim.",
          en: "Level 30 and 1 Unidentified 13. \u201CJuggernaut Items of Nulgath\u201D quest, at /tercessuinotlim."
        },
        {
          pt: "13 Diamond of Nulgath, 50 Dark Crystal Shard, 20 Gem of Nulgath, Undead Bruiser Rune, 50 Tainted Gem, Voucher (non-mem) e 3 Totem of Nulgath.",
          en: "13 Diamond of Nulgath, 50 Dark Crystal Shard, 20 Gem of Nulgath, Undead Bruiser Rune, 50 Tainted Gem, Voucher (non-mem) and 3 Totem of Nulgath."
        }
      ],
      note: {
        pt: "Voc\xEA escolhe uma recompensa, como Overfiend Blade of Nulgath ou Nulgath Armour.",
        en: "You choose one reward, such as Overfiend Blade of Nulgath or Nulgath Armour."
      }
    },
    {
      n: "Evolved Orbs: Blood, Hex e Shadow",
      k: "gear",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/evolved-orbs/blood",
      sn: "AQWG: Evolved Blood Orb",
      j: [
        "archportal"
      ],
      req: [
        {
          pt: "Merge do pet na loja do Dirtlicker, em /archportal. Blood: 200 Nulgath\u2019s Approval, 10 Totem, 30 Diamond, Voucher (non-mem) e 3 Unidentified 13.",
          en: "Pet merge at Dirtlicker\u2019s shop, at /archportal. Blood: 200 Nulgath\u2019s Approval, 10 Totem, 30 Diamond, Voucher (non-mem) and 3 Unidentified 13."
        },
        {
          pt: "Blood, armadura: Rustbucket Rank 10, 2.500 Platinum Coin of Nulgath, 20 Blood Gem, 10 PvP Trophy e Crimson Plate. Capacete: 300 Platinum Coin, 10 Diamond, 5 Blood Gem, Faust Face.",
          en: "Blood, armor: Rustbucket Rank 10, 2,500 Platinum Coin of Nulgath, 20 Blood Gem, 10 PvP Trophy and Crimson Plate. Helm: 300 Platinum Coin, 10 Diamond, 5 Blood Gem, Faust Face."
        },
        {
          pt: "Hex: 200 Nulgath\u2019s Approval, 10 Totem, 30 Dark Crystal Shard e 30 Tainted Gem. Armadura: Oracle Rank 10, 2.500 Platinum Coin e 50 Gem of Nulgath. Cajado: 30 Unidentified 10 e 10 Bright Tonic.",
          en: "Hex: 200 Nulgath\u2019s Approval, 10 Totem, 30 Dark Crystal Shard and 30 Tainted Gem. Armor: Oracle Rank 10, 2,500 Platinum Coin and 50 Gem of Nulgath. Staff: 30 Unidentified 10 and 10 Bright Tonic."
        },
        {
          pt: "Shadow (member, Bard Rank 10): 200 Nulgath\u2019s Approval, 10 Totem, 20 Gem de Nulgath e 30 Fiend Token na armadura. A lan\xE7a pede 15 Destruction Elixir.",
          en: "Shadow (members, Bard Rank 10): 200 Nulgath\u2019s Approval, 10 Totem, 20 Gem of Nulgath and 30 Fiend Token on the armor. The spear needs 15 Destruction Elixir."
        }
      ],
      note: {
        pt: "Cada orb tem armadura, capacete e arma, e cada pe\xE7a pede 300 ou 2.500 Platinum Coins, que s\xF3 se compram depois de juntar tudo.",
        en: "Each orb has an armor, helm and weapon, and each piece needs 300 or 2,500 Platinum Coins, bought only after you gather everything."
      },
      ne: "Evolved Orbs: Blood, Hex and Shadow"
    },
    {
      n: "ArchFiend Baby Dragon",
      k: "gear",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/hollowborn/archfiend-baby-dragon",
      sn: "AQWG: ArchFiend Baby Dragon",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "N\xEDvel 40 e member. Quest \u201CArchFiend Dragon Egg\u201D, do Lae, em /tercessuinotlim.",
          en: "Level 40 and membership. Lae\u2019s \u201CArchFiend Dragon Egg\u201D quest, at /tercessuinotlim."
        },
        {
          pt: "10 Fresh Soul e Unidentified 36 (quest \u201CLet\u2019s Make a Deal\u201D, Inquisitor Guards em /citadel), Breath of Life (/airstorm) e Fire Guardian Dragon Soul (/queenspire).",
          en: "10 Fresh Soul and Unidentified 36 (\u201CLet\u2019s Make a Deal\u201D quest, Inquisitor Guards at /citadel), Breath of Life (/airstorm) and Fire Guardian Dragon Soul (/queenspire)."
        },
        {
          pt: "Fiendish Brimstone, do ArchFiend DragonLord em /underlair (fim do mapa), e o ArchFiend Dragon Egg, 1 milh\xE3o de gold em /ariapet.",
          en: "Fiendish Brimstone, from the ArchFiend DragonLord at /underlair (end of map), and the ArchFiend Dragon Egg, 1 million gold at /ariapet."
        }
      ],
      note: {
        pt: "O DragonLord \xE9 dif\xEDcil: grupo, ou uma classe de esquiva como Yami no Ronin ou Chrono Assassin.",
        en: "The DragonLord is hard: a group, or a dodge class like Yami no Ronin or Chrono Assassin."
      }
    },
    {
      n: "Diamond of Nulgath",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 1.000. Fontes: GRUMBLE (Crag & Bamboozle, 100%), Swindle\u2019s Return Policy, Nulgath\u2019s Birthday Gift (100%) e a quest \u201CCrush the Weak\u201D (100%).",
          en: "Cap of 1,000. Sources: GRUMBLE (Crag & Bamboozle, 100%), Swindle\u2019s Return Policy, Nulgath\u2019s Birthday Gift (100%) and the \u201CCrush the Weak\u201D quest (100%)."
        },
        {
          pt: "Quantidades pedidas: 150 na ArchFiend DeathLord, 300 na Enchanted Nulgath Nation House e 300 na Taro\u2019s Prismatic Manslayer, 500 na Hollowborn Oblivion Blade.",
          en: "Amounts asked: 150 for the ArchFiend DeathLord, 300 for the Enchanted Nulgath Nation House and 300 for Taro\u2019s Prismatic Manslayer, 500 for the Hollowborn Oblivion Blade."
        }
      ],
      note: {
        pt: "\xC9 um dos reagentes mais usados de toda a Nation.",
        en: "It is one of the most used reagents across the whole Nation."
      }
    },
    {
      n: "Tainted Gem",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 1.000. Fontes: Tenacity (rank mais alto), Swindle\u2019s Return Policy, varia\xE7\xF5es da Wheel of Chance, Nulgath\u2019s Birthday Gift (40%), Nulgath Larvae (40%) e Swindle Bulk ou Cube Reagent (100%).",
          en: "Cap of 1,000. Sources: Tenacity (top rank), Swindle\u2019s Return Policy, Wheel of Chance variants, Nulgath\u2019s Birthday Gift (40%), Nulgath Larvae (40%) and Swindle Bulk or Cube Reagent (100%)."
        },
        {
          pt: "Pedidas em quase todo farm da Nation, de 30 a 300 por item.",
          en: "Asked in almost every Nation farm, from 30 to 300 per item."
        }
      ],
      note: {
        pt: "A p\xE1gina lista as fontes, mas n\xE3o a quantidade por quest.",
        en: "The page lists the sources, but not the amount per quest."
      }
    },
    {
      n: "Dark Crystal Shard",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 1.000. Fontes: Tenacity (rank mais alto), Contract Exchange, Nulgath\u2019s Birthday Gift (100%), Gemstone of Nulgath (100%) e Nulgath Larvae (13%).",
          en: "Cap of 1,000. Sources: Tenacity (top rank), Contract Exchange, Nulgath\u2019s Birthday Gift (100%), Gemstone of Nulgath (100%) and Nulgath Larvae (13%)."
        }
      ],
      note: {
        pt: "Pedida em quantidades de 15 a 250.",
        en: "Asked in amounts of 15 to 250."
      }
    },
    {
      n: "Gem of Nulgath",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 300. Fontes: Contract Exchange, varia\xE7\xF5es da Wheel of Chance (20%), Nulgath\u2019s Birthday Gift (50%), Nulgath Larvae (40%) e a troca do Totem voucher (60 Essence of Nulgath).",
          en: "Cap of 300. Sources: Contract Exchange, Wheel of Chance variants (20%), Nulgath\u2019s Birthday Gift (50%), Nulgath Larvae (40%) and the Totem voucher trade (60 Essence of Nulgath)."
        }
      ],
      note: {
        pt: "O limite de 300 \xE9 menor do que a soma pedida em alguns farms, ent\xE3o \xE9 preciso gastar no meio do caminho.",
        en: "The cap of 300 is lower than the sum some farms ask for, so you have to spend them along the way."
      }
    },
    {
      n: "Blood Gem of the ArchFiend",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 100. Fontes: Tenacity (rank mais alto), quests do Crag & Bamboozle e do Oblivion Blade of Nulgath, merges da Swindle, Gemstone of Nulgath (100%), \u201CBloody Chaos\u201D (100%) e \u201CKiss the Void\u201D (100%).",
          en: "Cap of 100. Sources: Tenacity (top rank), Crag & Bamboozle and Oblivion Blade of Nulgath quests, Swindle merges, Gemstone of Nulgath (100%), \u201CBloody Chaos\u201D (100%) and \u201CKiss the Void\u201D (100%)."
        },
        {
          pt: "Pedidas: 100 na Enchanted Nulgath Nation House, 90 no \u201CTools For the Job\u201D e 50 na Hollowborn Oblivion Blade.",
          en: "Asked: 100 for the Enchanted Nulgath Nation House, 90 in \u201CTools For the Job\u201D and 50 for the Hollowborn Oblivion Blade."
        }
      ],
      note: {
        pt: "\xC9 o reagente com limite mais baixo entre os de grande quantidade.",
        en: "It is the lowest-cap reagent among the high-quantity ones."
      }
    },
    {
      n: "Totem of Nulgath",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 100. Fontes: \u201CAssisting\u201D do Oblivion Blade of Nulgath (11%), Nulgath\u2019s Birthday Gift (15%), Nulgath Larvae (1%), Refreshing Deal e o Totem voucher do Drudgen ou do Nulgath.",
          en: "Cap of 100. Sources: Oblivion Blade of Nulgath\u2019s \u201CAssisting\u201D (11%), Nulgath\u2019s Birthday Gift (15%), Nulgath Larvae (1%), Refreshing Deal and the Totem voucher from Drudgen or Nulgath."
        }
      ],
      note: {
        pt: "Nulgath Larvae d\xE1 s\xF3 1% de Totem.",
        en: "Nulgath Larvae gives only 1% Totem."
      }
    },
    {
      n: "Unidentified 13",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Limite de 13. Fontes: Diamond Exchange (Crag & Bamboozle, 15 Diamonds e Dark Makai Sigil, 100%), Nulgath\u2019s Birthday Gift (15%), Wheel of Chance (1%) e Nulgath Larvae (5%).",
          en: "Cap of 13. Sources: Diamond Exchange (Crag & Bamboozle, 15 Diamonds and Dark Makai Sigil, 100%), Nulgath\u2019s Birthday Gift (15%), Wheel of Chance (1%) and Nulgath Larvae (5%)."
        },
        {
          pt: "Quase toda quest da Nation exige 1 para aceitar.",
          en: "Almost every Nation quest needs 1 to accept."
        }
      ],
      note: {
        pt: "O Crag & Bamboozle \xE9 o jeito garantido.",
        en: "Crag & Bamboozle is the guaranteed way."
      }
    },
    {
      n: "Unidentified 10, 34 e 35",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Unidentified 10 (limite 1.000): v\xE1rias varia\xE7\xF5es da Wheel of Chance, Nulgath Larvae, \u201CDirt-y Deeds Done Dirt Cheap\u201D (Swindle), Void Highlord\u2019s Challenge e \u201CKiss the Void\u201D.",
          en: "Unidentified 10 (cap 1,000): several Wheel of Chance variants, Nulgath Larvae, \u201CDirt-y Deeds Done Dirt Cheap\u201D (Swindle), Void Highlord\u2019s Challenge and \u201CKiss the Void\u201D."
        },
        {
          pt: "Unidentified 34 (limite 300): quest \u201CWillpower Extraction\u201D, durante a ArchFiend DoomLord.",
          en: "Unidentified 34 (cap 300): the \u201CWillpower Extraction\u201D quest, during the ArchFiend DoomLord."
        },
        {
          pt: "Unidentified 35 (limite 300): \u201CNulgath Demands Work\u201D. Garantida ap\xF3s 9 entregas pelo merge da Swindle.",
          en: "Unidentified 35 (cap 300): \u201CNulgath Demands Work\u201D. Guaranteed after 9 turn-ins through Swindle\u2019s merge."
        }
      ],
      note: {
        pt: "Os dois \xFAltimos s\xF3 aparecem dentro da corrente da ArchFiend DoomLord.",
        en: "The last two only appear inside the ArchFiend DoomLord chain."
      },
      ne: "Unidentified 10, 34 and 35"
    },
    {
      n: "Voucher of Nulgath",
      k: "mat",
      cls: null,
      e: 2,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Voucher: Nulgath\u2019s Birthday Gift, Nulgath Larvae, varia\xE7\xF5es da Wheel of Chance (10% cada), \u201CAssisting\u201D do Oblivion Blade (11%) e merge da Swindle.",
          en: "Voucher: Nulgath\u2019s Birthday Gift, Nulgath Larvae, Wheel of Chance variants (10% each), Oblivion Blade\u2019s \u201CAssisting\u201D (11%) and Swindle\u2019s merge."
        },
        {
          pt: "Voucher (non-mem): \u201CAssisting\u201D do Oblivion Blade (11%), varia\xE7\xF5es da Wheel (3% cada), Birthday Gift (3%), Nulgath Larvae (3%) e merge da Swindle.",
          en: "Voucher (non-mem): Oblivion Blade\u2019s \u201CAssisting\u201D (11%), Wheel variants (3% each), Birthday Gift (3%), Nulgath Larvae (3%) and Swindle\u2019s merge."
        }
      ],
      note: {
        pt: "Quase toda receita da Nation pede 1 Voucher (non-mem).",
        en: "Almost every Nation recipe asks for 1 Voucher (non-mem)."
      }
    },
    {
      n: "ArchFiend\u2019s Favour e Nulgath\u2019s Approval",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "evilwarnul"
      ],
      req: [
        {
          pt: "Os dois t\xEAm limite de 5.000. Caem de inimigos em /evilwarnul (primeira sala de grama, perto do fim), ou nas quests da Diligas enquanto voc\xEA farma o come\xE7o do mapa.",
          en: "Both have a cap of 5,000. They drop from enemies at /evilwarnul (the first grassy room near the end), or from Diligas\u2019 quests while you farm the start of the map."
        },
        {
          pt: "Pedidos: 5.000 ArchFiend\u2019s Favour na ArchFiend DoomLord, 1.000 Nulgath\u2019s Approval na Enchanted Nulgath Nation House e no Void Avenger Scythe, e 300 de cada na Void Highlord.",
          en: "Asked: 5,000 ArchFiend\u2019s Favour for the ArchFiend DoomLord, 1,000 Nulgath\u2019s Approval for the Enchanted Nulgath Nation House and the Void Avenger Scythe, and 300 each for the Void Highlord."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista a taxa de drop.",
        en: "The page does not list the drop rate."
      }
    },
    {
      n: "Essence of Nulgath, Emblem of Nulgath e Fiend Seal",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim",
        "shadowblast"
      ],
      req: [
        {
          pt: "Essence of Nulgath (limite 100): Dark Makai em /tercessuinotlim (ou /nulgath, se member), 10% de drop.",
          en: "Essence of Nulgath (cap 100): Dark Makai at /tercessuinotlim (or /nulgath, if member), 10% drop."
        },
        {
          pt: "Emblem of Nulgath (limite 500): quest \u201CNation Recruits: Seal Your Fate\u201D, do Tharanak Hrii em /shadowblast, que exige a Nation Round 4 Medal.",
          en: "Emblem of Nulgath (cap 500): the \u201CNation Recruits: Seal Your Fate\u201D quest, from Tharanak Hrii at /shadowblast, which needs the Nation Round 4 Medal."
        },
        {
          pt: "Fiend Seal (limite 500): aceite uma quest que o pe\xE7a e derrote inimigos em /shadowblast. Fiend Token (limite 30): Birthday Gift (60%) e \u201CAssisting Drudgen\u201D (11%).",
          en: "Fiend Seal (cap 500): accept a quest that asks for it and defeat enemies at /shadowblast. Fiend Token (cap 30): Birthday Gift (60%) and \u201CAssisting Drudgen\u201D (11%)."
        }
      ],
      note: {
        pt: "A Void Highlord pede 750 Essence e 300 Emblems no total.",
        en: "The Void Highlord asks for 750 Essence and 300 Emblems in total."
      },
      ne: "Essence of Nulgath, Emblem of Nulgath and Fiend Seal"
    },
    {
      n: "Chaoroot, Doomatter, Necrot e Essence Potion",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Cada um tem limite de 30. Um Receipt of Swindle d\xE1 10 de qualquer um deles.",
          en: "Each has a cap of 30. One Receipt of Swindle gives 10 of any of them."
        },
        {
          pt: "Chaoroot: Hydra Heads em /hydra, e drops do Escherion e do Slugfit. Doomatter: Fear Feeder em /creepy (member), o corte do /vordredboss e Creature Creation em /maul.",
          en: "Chaoroot: Hydra Heads at /hydra, and drops from Escherion and Slugfit. Doomatter: Fear Feeder at /creepy (member), the /vordredboss cutscene and Creature Creation at /maul."
        },
        {
          pt: "Necrot: Undead Temple Mage em /templeb (member) e Skeleton Fighters em /deathsrealm. Essence Potion (limite 99): Necrot com Chaoroot ou Doomatter e Rune of Uruz, em /alchemy (Rank 3).",
          en: "Necrot: Undead Temple Mage at /templeb (member) and Skeleton Fighters at /deathsrealm. Essence Potion (cap 99): Necrot with Chaoroot or Doomatter and Rune of Uruz, at /alchemy (Rank 3)."
        }
      ],
      note: {
        pt: "Pedidos em quantidade de 5 na ArchFiend DoomLord e na Hollowborn DoomKnight.",
        en: "Asked in amounts of 5 for the ArchFiend DoomLord and the Hollowborn DoomKnight."
      },
      ne: "Chaoroot, Doomatter, Necrot and Essence Potion"
    },
    {
      n: "Void Aura",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "shadowfall"
      ],
      req: [
        {
          pt: "Limite de 7.500. Braeus, em /shadowfall: \u201CCommanding Shadow Essences\u201D (exige a SDKA), \u201CRetrieve Void Auras\u201D (gr\xE1tis, exige Rank 10 Evil), \u201CGlimpse Into The Dark\u201D (di\xE1ria, member) e \u201CEncroaching Shadows\u201D (di\xE1ria, em grupo).",
          en: "Cap of 7,500. Braeus, at /shadowfall: \u201CCommanding Shadow Essences\u201D (needs the SDKA), \u201CRetrieve Void Auras\u201D (free, needs Rank 10 Evil), \u201CGlimpse Into The Dark\u201D (daily, member) and \u201CEncroaching Shadows\u201D (daily, group)."
        },
        {
          pt: "Com a SDKA: 50 Empowered Essence (/shadowrealmpast) e 3 Malignant Essence (Shadow Lord).",
          en: "With the SDKA: 50 Empowered Essence (/shadowrealmpast) and 3 Malignant Essence (Shadow Lord)."
        },
        {
          pt: "Pedidos: 7.500 na Necrotic Sword of Doom, 15 no Void Avenger Scythe e 2 a 6 no Void Paladin.",
          en: "Asked: 7,500 for the Necrotic Sword of Doom, 15 for the Void Avenger Scythe and 2 to 6 for the Void Paladin."
        }
      ],
      note: {
        pt: "O Exalted Apotheosis \xE9 a alternativa que o guia da Necrotic Sword sugere para evitar o m\xE9todo sem SDKA.",
        en: "The Exalted Apotheosis is the alternative the Necrotic Sword guide suggests to avoid the no-SDKA method."
      }
    },
    {
      n: "Undead Essence, Bone Dust e Undead Energy",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "battleunderb",
        "battleunderc"
      ],
      req: [
        {
          pt: "Undead Essence (limite 1.000): quest \u201CSoul Searching\u201D da Yara, em /battleunderc, ou inimigos em /battleunderb.",
          en: "Undead Essence (cap 1,000): Yara\u2019s \u201CSoul Searching\u201D quest, at /battleunderc, or enemies at /battleunderb."
        },
        {
          pt: "Bone Dust (limite 5.100): inimigos em /battleunderb. Exige ter feito o passo 1 da BLoD.",
          en: "Bone Dust (cap 5,100): enemies at /battleunderb. Needs step 1 of the BLoD."
        },
        {
          pt: "Undead Energy (limite de 10.000 segundo o guia da Necrotic Sword): cai de muitos Undead enquanto voc\xEA farma Essence e Bone Dust.",
          en: "Undead Energy (cap of 10,000 according to the Necrotic Sword guide): drops from many Undead while you farm Essence and Bone Dust."
        }
      ],
      note: {
        pt: "Pedidos: 5.100 Bone Dust e 10.000 Undead Energy na Necrotic Sword of Doom; 1.800 e 2.000 Undead Energy na Empowered Vordred\u2019s Armour.",
        en: "Asked: 5,100 Bone Dust and 10,000 Undead Energy for the Necrotic Sword of Doom; 1,800 and 2,000 Undead Energy for the Empowered Vordred\u2019s Armour."
      },
      ne: "Undead Essence, Bone Dust and Undead Energy"
    },
    {
      n: "Combat Trophy e PvP Trophy",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "bludrutbrawl",
        "doomarena"
      ],
      req: [
        {
          pt: "Combat Trophy (limite 500): ven\xE7a ou perca em /bludrutbrawl. Quem vence ganha mais, quem perde ganha 1.",
          en: "Combat Trophy (cap 500): win or lose at /bludrutbrawl. Winners get more, losers get 1."
        },
        {
          pt: "1v1 PvP Trophy (limite 100): quest \u201CVictory Most Honourable\u201D, do Dumoose em /doomarena, com 10 vit\xF3rias, uma vez por dia.",
          en: "1v1 PvP Trophy (cap 100): the \u201CVictory Most Honourable\u201D quest, from Dumoose at /doomarena, with 10 wins, once a day."
        },
        {
          pt: "As Behemoth Blades pedem 500 Combat Trophies cada, e a DragonBlade of Nulgath usa cerca de 1.200.",
          en: "The Behemoth Blades ask for 500 Combat Trophies each, and the DragonBlade of Nulgath uses about 1,200."
        }
      ],
      note: {
        pt: "Perder d\xE1 s\xF3 1 trof\xE9u, ent\xE3o vit\xF3ria importa.",
        en: "Losing gives only 1 trophy, so winning matters."
      },
      ne: "Combat Trophy and PvP Trophy"
    },
    {
      n: "Seal of Light, Elders\u2019 Blood e Sparrow\u2019s Blood",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "alteonbattle",
        "arcangrove"
      ],
      req: [
        {
          pt: "Seal of Light (limite 50): quest di\xE1ria da Lady Celestia, em /alteonbattle, vencendo a Ultra Alteon. Exige os 13 Lords of Chaos.",
          en: "Seal of Light (cap 50): Lady Celestia\u2019s daily quest, at /alteonbattle, defeating Ultra Alteon. Needs the 13 Lords of Chaos."
        },
        {
          pt: "Elders\u2019 Blood (limite 5): quest di\xE1ria \u201CExperiment 107\u201D, do Reens em /arcangrove, vencendo Gorillaphants.",
          en: "Elders\u2019 Blood (cap 5): Reens\u2019 daily \u201CExperiment 107\u201D quest at /arcangrove, defeating Gorillaphants."
        },
        {
          pt: "Sparrow\u2019s Blood (limite 3): \u201CExperiment 231\u201D, do Reens, com Gorillaphants e Seed Spitters no fim do mapa.",
          en: "Sparrow\u2019s Blood (cap 3): Reens\u2019 \u201CExperiment 231\u201D, with Gorillaphants and Seed Spitters at the bottom of the map."
        }
      ],
      note: {
        pt: "A Void Highlord pede 17 Elders\u2019 Blood no total, e como o limite \xE9 5 e a quest \xE9 di\xE1ria, isso s\xE3o semanas.",
        en: "The Void Highlord asks for 17 Elders\u2019 Blood in total, and since the cap is 5 and the quest is daily, that is weeks."
      },
      ne: "Seal of Light, Elders\u2019 Blood and Sparrow\u2019s Blood"
    },
    {
      n: "Reagentes \xFAnicos da Nation",
      k: "mat",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/nation/reagent-library",
      sn: "AQWG: Reagent Library",
      j: [
        "tercessuinotlim"
      ],
      req: [
        {
          pt: "Hadean Onyx of Nulgath (2): o Shadow of Nulgath em /tercessuinotlim. Musgravite of Nulgath (2): 3 Swindle receipts, ou o Ancient Chest em /timelibrary. Pink Star Diamond of Nulgath: 6 Swindle receipts.",
          en: "Hadean Onyx of Nulgath (2): the Shadow of Nulgath at /tercessuinotlim. Musgravite of Nulgath (2): 3 Swindle receipts, or the Ancient Chest at /timelibrary. Pink Star Diamond of Nulgath: 6 Swindle receipts."
        },
        {
          pt: "Unidentified 19: \u201CAssisting\u201D do Oblivion Blade (11%) e Wheel (3%). Uni 22, 23 e 25: \u201CThe Assistant\u201D (1%) ou 15 milh\xF5es de gold por merge (Uni 23 e 25). Uni 24: \u201CThe Assistant\u201D (100%).",
          en: "Unidentified 19: Oblivion Blade\u2019s \u201CAssisting\u201D (11%) and Wheel (3%). Uni 22, 23 and 25: \u201CThe Assistant\u201D (1%) or 15 million gold by merge (Uni 23 and 25). Uni 24: \u201CThe Assistant\u201D (100%)."
        },
        {
          pt: "Heart of the Void: o Void Dragon em /void. Letter from Asuka and Tendou: Burning Witches em /citadel. Aelita\u2019s Emerald: loja do Yulgar, em /yulgar. Nulgath Shaped Chocolate: 2 milh\xF5es de gold, em /citadel.",
          en: "Heart of the Void: the Void Dragon at /void. Letter from Asuka and Tendou: Burning Witches at /citadel. Aelita\u2019s Emerald: Yulgar\u2019s shop, at /yulgar. Nulgath Shaped Chocolate: 2 million gold, at /citadel."
        },
        {
          pt: "Mortality Cape of Revontheus: 35 ArchFiend\u2019s Favours na Diligas. Shadow Lich: loja do Gravelyn (Rank 10 Evil). Black Knight Orb: 30% dos bosses de /greendragon, /well, /deathgazer e /trunk.",
          en: "Mortality Cape of Revontheus: 35 ArchFiend\u2019s Favours at Diligas. Shadow Lich: Gravelyn\u2019s shop (Rank 10 Evil). Black Knight Orb: 30% from the bosses at /greendragon, /well, /deathgazer and /trunk."
        }
      ],
      note: {
        pt: "Cada item \xE9 1 unidade, mas a Void Highlord pede 15 de v\xE1rios deles, o que d\xE1 semanas de drops.",
        en: "Each item is 1 unit, but the Void Highlord asks for 15 of several of them, which is weeks of drops."
      },
      ne: "One-off Nation reagents"
    },
    {
      n: "Legion Token",
      k: "mat",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/legion/legion-tokens",
      sn: "AQWG: Legion Tokens",
      j: [],
      req: [
        {
          pt: "Limite de 25.000. Bright Paragon (o mais r\xE1pido): quests do pet em /brightfortress. O pet n\xE3o est\xE1 mais \xE0 venda.",
          en: "Cap of 25,000. Bright Paragon (the fastest): the pet\u2019s quests at /brightfortress. The pet is no longer on sale."
        },
        {
          pt: "Shogun Paragon (r\xE1pido): o pet custa 2.000 LTs em /futurewardage durante o Dage\u2019s Birthday (mar\xE7o e abril). Quest \u201CTime for Some Spring Cleaning\u201D, em /fotia, com drops at\xE9 50.",
          en: "Shogun Paragon (fast): the pet costs 2,000 LTs at /futurewardage during Dage\u2019s Birthday (March and April). The \u201CTime for Some Spring Cleaning\u201D quest, at /fotia, with drops up to 50."
        },
        {
          pt: "Dreadrock (lento): compre a Undead Champion armour na loja do Dage, em /underworld, e aceite \u201CUndead Champion Recruitment\u201D na 2\xAA tela de /dreadrock.",
          en: "Dreadrock (slow): buy the Undead Champion armour at Dage\u2019s shop, in /underworld, and accept \u201CUndead Champion Recruitment\u201D on the 2nd screen of /dreadrock."
        },
        {
          pt: "Legion Arena (o mais lento): \u201CFirst Class Entertainment\u201D, em /legionarena, com 4% de drop do Legion Fiend Rider.",
          en: "Legion Arena (the slowest): \u201CFirst Class Entertainment\u201D, at /legionarena, with a 4% drop from the Legion Fiend Rider."
        }
      ],
      note: {
        pt: "O guia n\xE3o lista tokens por quest nem por dia. Para entrar na Legion: Black Knight, /greenguardwest, e \u201CFail to the King\u201D, em /prison.",
        en: "The guide lists no tokens per quest or per day. To join Legion: Black Knight, /greenguardwest, and \u201CFail to the King\u201D, at /prison."
      }
    },
    {
      n: "M\xE9todos de gold",
      k: "mat",
      cls: null,
      e: 0,
      src: "https://sites.google.com/view/aqwg-net/gold",
      sn: "AQWG: Gold",
      j: [
        "honorhall",
        "battlegrounde",
        "sevencircles"
      ],
      req: [
        {
          pt: "\u201CHall of Honours\u201D e \u201CLevel 61-75\u201D: member, n\xEDvel 61, grupo bom e Gold Boosts, em /honorhall. Paga bem em XP e gold.",
          en: "\u201CHall of Honours\u201D and \u201CLevel 61-75\u201D: member, level 61, a good group and Gold Boosts, at /honorhall. Pays well in XP and gold."
        },
        {
          pt: "\u201CLevel 46-60\u201D e \u201CLevel 61-75\u201D: n\xEDvel 61 e grupo, sem member, em /battlegrounde. Paga menos que /honorhall.",
          en: "\u201CLevel 46-60\u201D and \u201CLevel 61-75\u201D: level 61 and a group, no membership, at /battlegrounde. Pays less than /honorhall."
        },
        {
          pt: "War Medals e Mega War Medals: Gold Boosts, em /sevencircles e depois /sevencircleswar, com 300 War Medals.",
          en: "War Medals and Mega War Medals: Gold Boosts, at /sevencircles and then /sevencircleswar, with 300 War Medals."
        },
        {
          pt: "\u201CThe Leery Contract\u201D (o mais trabalhoso): member, pet Sword of Nulgath, 195 ou mais Diamonds of Nulgath e a Diamonds of Time. Wheel of Chance supplies: Relics of Chaos em /ultraalteon ou /hydrachallenge (n\xEDvel 90).",
          en: "\u201CThe Leery Contract\u201D (the most work): member, Sword of Nulgath pet, 195 or more Diamonds of Nulgath and the Diamonds of Time. Wheel of Chance supplies: Relics of Chaos at /ultraalteon or /hydrachallenge (level 90)."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista gold por hora. Gold Boosts n\xE3o valem para gold de venda de itens.",
        en: "The page lists no gold per hour. Gold Boosts do not apply to gold from selling items."
      },
      ne: "Gold methods"
    },
    {
      n: "Reputa\xE7\xE3o Evil",
      k: "rep",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/reputation/evil-rep",
      sn: "AQWG: Evil",
      j: [
        "shadowfall",
        "castleundead"
      ],
      req: [
        {
          pt: "Gravelyn exige alinhamento Evil: troque comprando o Contract dela por 100k de gold.",
          en: "Gravelyn needs Evil alignment: switch by buying her Contract for 100k gold."
        },
        {
          pt: "Member, ranks 1 a 3: \u201CDangerous Decor\u201D, em /sleuthhound. Ranks 4 a 10: \u201CBone-afide\u201D, Skeletal Warriors e Vikings em /castleundead.",
          en: "Member, ranks 1 to 3: \u201CDangerous Decor\u201D, at /sleuthhound. Ranks 4 to 10: \u201CBone-afide\u201D, Skeletal Warriors and Vikings at /castleundead."
        },
        {
          pt: "N\xE3o-member, ranks 1 a 3: \u201CYouthanize\u201D, Slimes verdes em /swordhavenbridge. Ranks 4 a 10: \u201CBone-afide\u201D.",
          en: "Non-member, ranks 1 to 3: \u201CYouthanize\u201D, green Slimes at /swordhavenbridge. Ranks 4 to 10: \u201CBone-afide\u201D."
        },
        {
          pt: "Di\xE1rias: \u201CSlithering Shadows\u201D (/bludrut4), \u201CSea No Evil\u201D (/voltaire, rank 4 ou mais) e, para n\xE3o-members, \u201CInquisitor Inquiry\u201D (/citadel).",
          en: "Dailies: \u201CSlithering Shadows\u201D (/bludrut4), \u201CSea No Evil\u201D (/voltaire, rank 4 or more) and, for non-members, \u201CInquisitor Inquiry\u201D (/citadel)."
        }
      ],
      note: {
        pt: "A p\xE1gina n\xE3o lista rep por kill nem o total do rank 10. Rank 10 Evil abre a Void Highlord, a SDKA e a ArchFiend.",
        en: "The page lists no rep per kill or the rank 10 total. Rank 10 Evil opens the Void Highlord, the SDKA and the ArchFiend."
      },
      ne: "Evil reputation"
    },
    {
      n: "Reputa\xE7\xE3o Chaos",
      k: "rep",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/reputation/chaos-rep",
      sn: "AQWG: Chaos",
      j: [
        "mountdoomskull"
      ],
      req: [
        {
          pt: "Quest \u201CEmbrace Your Chaos\u201D, da Loremaster Maya, em /mountdoomskull, matando inimigos no mesmo mapa. Tamb\xE9m existe a vers\xE3o di\xE1ria.",
          en: "\u201CEmbrace Your Chaos\u201D quest, from Loremaster Maya, at /mountdoomskull, defeating enemies on the same map. There is also a daily version."
        },
        {
          pt: "A sala mais eficiente tem 2 Chaorrupted Rogues e 2 Chaos Drows.",
          en: "The most efficient room has 2 Chaorrupted Rogues and 2 Chaos Drows."
        },
        {
          pt: "Ative \u201CQuest Log Turn-Ins\u201D e \u201CReaccept Quest After Turn-In\u201D nas op\xE7\xF5es avan\xE7adas e entregue pelo Quest Log (tecla L).",
          en: "Enable \u201CQuest Log Turn-Ins\u201D and \u201CReaccept Quest After Turn-In\u201D in advanced options and turn in from the Quest Log (key L)."
        }
      ],
      note: {
        pt: "Serve para a Chaos Slayer e para a Enchanted Nulgath Nation House. A p\xE1gina n\xE3o lista rep por kill.",
        en: "It is used for Chaos Slayer and the Enchanted Nulgath Nation House. The page lists no rep per kill."
      },
      ne: "Chaos reputation"
    },
    {
      n: "Reputa\xE7\xE3o DoomWood",
      k: "rep",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/reputation/doomwood-rep",
      sn: "AQWG: DoomWood",
      j: [
        "necrodungeon",
        "shadowfall"
      ],
      req: [
        {
          pt: "Termine a hist\xF3ria de DoomWood (/lightguard at\xE9 /necrocavern), a dos Zombies (/doomhaven e /doomwar) e a de /thorngarde at\xE9 /techfortress. Tenha a BLoD (e a SDKA, se member).",
          en: "Complete the DoomWood storyline (/lightguard to /necrocavern), the Zombies one (/doomhaven and /doomwar) and /thorngarde to /techfortress. Have the BLoD (and the SDKA, if member)."
        },
        {
          pt: "Member em grupo: Executive Doom OverLord Challenge, em /necrodungeon. Sozinho: quest da Yulgar em /yulgarzombie, depois de /templeb, /battleunderb e /doomwar.",
          en: "Member in a group: Executive Doom OverLord Challenge, at /necrodungeon. Solo: Yulgar\u2019s quest at /yulgarzombie, after /templeb, /battleunderb and /doomwar."
        },
        {
          pt: "N\xE3o-member em grupo: Doom OverLord Challenge, em /necrodungeon. Sozinho: quests de /shadowfall em uma sala com 2 Undead War Mages e 2 Ghouls.",
          en: "Non-member in a group: Doom OverLord Challenge, at /necrodungeon. Solo: /shadowfall quests in one room with 2 Undead War Mages and 2 Ghouls."
        }
      ],
      note: {
        pt: "\xC9 pr\xE9-requisito da Necrotic Sword of Doom (rank 10), da Arch DoomKnight e da Enchanted Nulgath Nation House. A p\xE1gina n\xE3o lista rep por kill.",
        en: "It is a prerequisite for the Necrotic Sword of Doom (rank 10), the Arch DoomKnight and the Enchanted Nulgath Nation House. The page lists no rep per kill."
      },
      ne: "DoomWood reputation"
    },
    {
      n: "Reputa\xE7\xE3o Yokai",
      k: "rep",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/reputation/yokai-rep",
      sn: "AQWG: Yokai",
      j: [
        "dragonkoiz",
        "collection"
      ],
      req: [
        {
          pt: "Exige a quest do Kitsune dos 13 Lords of Chaos e a hist\xF3ria de /shogunwar at\xE9 /shadowfortress.",
          en: "Needs Kitsune\u2019s 13 Lords of Chaos chapter and the /shogunwar to /shadowfortress storyline."
        },
        {
          pt: "Member, ranks 1 a 3: quests do Announcer Guy em /dragonkoiz. Ranks 4 a 10: \u201CWho is the Greatest?\u201D, do Neko Mata, contra o O-dokuro n\xEDvel 19 em /odokuro.",
          en: "Member, ranks 1 to 3: Announcer Guy\u2019s quests at /dragonkoiz. Ranks 4 to 10: \u201CWho is the Greatest?\u201D, from Neko Mata, against the level 19 O-dokuro at /odokuro."
        },
        {
          pt: "\u201CYokai Membership Dues\u201D, da Malorie, em /collection: 15 mil de rep. Pede 9 Token As, feitos de Token Cs (70% de drop em /collectorlab). Recomenda Rep Boost e Cape of Awe.",
          en: "\u201CYokai Membership Dues\u201D, from Malorie, at /collection: 15k rep. Needs 9 Token As, made from Token Cs (70% drop at /collectorlab). Recommends a Rep Boost and Cape of Awe."
        },
        {
          pt: "N\xE3o-member: \u201CPockey Challenge\u201D, no /dragonkoiz, e a di\xE1ria \u201CShadow Embargo\u201D, da Kunoichi em /akiba.",
          en: "Non-member: \u201CPockey Challenge\u201D, at /dragonkoiz, and the daily \u201CShadow Embargo\u201D, from Kunoichi at /akiba."
        }
      ],
      note: {
        pt: "\xC9 pr\xE9-requisito da Yami no Ronin, da Imperial Chunin e da Void Shogun.",
        en: "It is a prerequisite for Yami no Ronin, Imperial Chunin and Void Shogun."
      },
      ne: "Yokai reputation"
    },
    {
      n: "Reputa\xE7\xE3o Hollowborn",
      k: "rep",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/reputation/hollowborn-rep",
      sn: "AQWG: Hollowborn",
      j: [
        "shadowrealm"
      ],
      req: [
        {
          pt: "Quests \u201CFlex it!\u201D e \u201CGet the Seeds\u201D, da Kasebel, em /shadowrealm (direita, cima, cima).",
          en: "\u201CFlex it!\u201D and \u201CGet the Seeds\u201D quests, from Kasebel, at /shadowrealm (right, up, up)."
        },
        {
          pt: "Volte ao in\xEDcio do mapa e v\xE1 para o canto superior esquerdo para farmar o Gargrowl e o Shadow Guardian.",
          en: "Return to the start of the map and go to the top left to farm the Gargrowl and the Shadow Guardian."
        },
        {
          pt: "Ative \u201CQuest Log Turn-Ins\u201D e \u201CReaccept Quest After Turn-In\u201D nas op\xE7\xF5es avan\xE7adas.",
          en: "Enable \u201CQuest Log Turn-Ins\u201D and \u201CReaccept Quest After Turn-In\u201D in advanced options."
        }
      ],
      note: {
        pt: "Abre a Hollowborn Reaper\u2019s Scythe (40% em All) e a Hollowborn DragonSlayer\u2019s Blade (60% contra Dragons). A p\xE1gina n\xE3o separa member de n\xE3o-member.",
        en: "It opens the Hollowborn Reaper\u2019s Scythe (40% to All) and the Hollowborn DragonSlayer\u2019s Blade (60% vs Dragons). The page does not separate member from non-member."
      },
      ne: "Hollowborn reputation"
    },
    {
      n: "Reputa\xE7\xE3o Good",
      k: "rep",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/reputation/good-rep",
      sn: "AQWG: Good",
      j: [
        "castle",
        "castleundead"
      ],
      req: [
        {
          pt: "Alteon exige alinhamento Good: compre o Contract dele por 100k de gold.",
          en: "Alteon needs Good alignment: buy his Contract for 100k gold."
        },
        {
          pt: "N\xE3o-member, ranks 1 a 3: \u201CThat Hero Who Chases Slimes\u201D, Slimes verdes em /swordhavenbridge. Ranks 4 a 10: \u201CTomb With A View\u201D, em /castleundead, mais r\xE1pido que /poisonforest.",
          en: "Non-member, ranks 1 to 3: \u201CThat Hero Who Chases Slimes\u201D, green Slimes at /swordhavenbridge. Ranks 4 to 10: \u201CTomb With A View\u201D, at /castleundead, faster than /poisonforest."
        },
        {
          pt: "Member: \u201CRumble With Grumble\u201D, contra o Grumble em /sewer. Di\xE1rias: \u201CBrace-r Yourself!\u201D (/mobius), \u201CSkele-Tongue\u201D (/graveyard, rank 4 ou mais) e \u201CPrevent the Return\u201D (/doomwood).",
          en: "Member: \u201CRumble With Grumble\u201D, against Grumble at /sewer. Dailies: \u201CBrace-r Yourself!\u201D (/mobius), \u201CSkele-Tongue\u201D (/graveyard, rank 4 or more) and \u201CPrevent the Return\u201D (/doomwood)."
        }
      ],
      note: {
        pt: "\xC9 pr\xE9-requisito da ArchPaladin, da Taro\u2019s Prismatic Manslayer e da Classic Hollowborn Paladin Armour.",
        en: "It is a prerequisite for ArchPaladin, Taro\u2019s Prismatic Manslayer and the Classic Hollowborn Paladin Armour."
      },
      ne: "Good reputation"
    },
    {
      n: "Reputa\xE7\xE3o Arcangrove",
      k: "rep",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/reputation/arcangrove-rep",
      sn: "AQWG: Arcangrove",
      j: [
        "arcangrove",
        "collection"
      ],
      req: [
        {
          pt: "Todos: a hist\xF3ria da Ledgermayne (/arcangrove, /cloister, /mudluk, /natatorium, /gilead, /mafic e /elemental).",
          en: "Everyone: Ledgermayne\u2019s storyline (/arcangrove, /cloister, /mudluk, /natatorium, /gilead, /mafic and /elemental)."
        },
        {
          pt: "Member: \u201CFor Science\u201D, do Drakath (Kid), em /terrarium, e Token Cs em /collectorlab (70% de drop). Do rank 1 ao 10 s\xE3o 25 Token As, um Rep Boost e a Cape of Awe ou outro boost de 25%.",
          en: "Member: \u201CFor Science\u201D, from Drakath (Kid), at /terrarium, and Token Cs at /collectorlab (70% drop). Rank 1 to 10 takes 25 Token As, a Rep Boost and the Cape of Awe or another 25% boost."
        },
        {
          pt: "N\xE3o-member: quests do Rayst, Blakk, Moonwrath e Reens, em /arcangrove, vencendo Seed Spitters no fim do mapa (3 numa sala).",
          en: "Non-member: quests from Rayst, Blakk, Moonwrath and Reens, at /arcangrove, defeating Seed Spitters at the bottom of the map (3 in one room)."
        },
        {
          pt: "Di\xE1ria: \u201CExperiment 107\u201D, do Reens, com Gorillaphants.",
          en: "Daily: Reens\u2019 \u201CExperiment 107\u201D, with Gorillaphants."
        }
      ],
      note: {
        pt: "O Arcangrove \xE9 pr\xE9-requisito da Arch DoomKnight (rank 9) e das Elders\u2019 Blood da Void Highlord.",
        en: "Arcangrove is a prerequisite for the Arch DoomKnight (rank 9) and the Void Highlord\u2019s Elders\u2019 Blood."
      },
      ne: "Arcangrove reputation"
    },
    {
      n: "Reputa\xE7\xE3o SpellCrafting",
      k: "rep",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/reputation/spellcrafting-rep",
      sn: "AQWG: SpellCrafting",
      j: [
        "spellcraft"
      ],
      req: [
        {
          pt: "Em /spellcraft, aperte Begin, escolha Entropic Ink e arraste os s\xEDmbolos para os slots. Repita at\xE9 o Rank 10.",
          en: "At /spellcraft, press Begin, choose Entropic Ink and drag the symbols into the slots. Repeat until Rank 10."
        },
        {
          pt: "Caminho com gold: 2 vouchers de 500k e 8 de 100k na loja da Neveya viram 18 Arcane Quills, e 50 Entropic Ink saem da loja de ink por ACs.",
          en: "Gold route: two 500k and eight 100k vouchers at Neveya\u2019s shop become 18 Arcane Quills, and 50 Entropic Ink come from the AC ink shop."
        },
        {
          pt: "Sem gold: Mystic Quills caem do Slugfit em /mobius, mas a p\xE1gina n\xE3o confirma isso para Entropic Ink.",
          en: "Without gold: Mystic Quills drop from Slugfit at /mobius, but the page does not confirm this for Entropic Ink."
        }
      ],
      note: {
        pt: "\xC9 pr\xE9-requisito da ArchPaladin (rank 8) e da Archmage (rank 10).",
        en: "It is a prerequisite for ArchPaladin (rank 8) and Archmage (rank 10)."
      },
      ne: "SpellCrafting reputation"
    },
    {
      n: "Dark Lord",
      k: "season",
      cls: "Dark Lord",
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/classes/dark-lord",
      sn: "AQWG: Dark Lord",
      j: [
        "murdermoon"
      ],
      req: [
        {
          pt: "S\xF3 no evento de 4 de maio (May the 4th). Exige a hist\xF3ria de /murdermoon at\xE9 /zorbaspalace. Merge na loja do Hammer Wateru, em /murdermoon.",
          en: "Only during the May the 4th event. Needs the /murdermoon to /zorbaspalace storyline. Merge at Hammer Wateru\u2019s shop, at /murdermoon."
        },
        {
          pt: "66 Cyber Ring Crystal, da quest \u201CToo Dangerous to be Left Alive!\u201D (Tempest Soldiers).",
          en: "66 Cyber Ring Crystal, from the \u201CToo Dangerous to be Left Alive!\u201D quest (Tempest Soldiers)."
        },
        {
          pt: "15 S Ring e 15 Fifth Lord\u2019s Filtrinator, do Fifth Sepulchure. 1 Dark Helmet e 15 Dotty, do Zorba the Bakk em /zorbaspalace. 4 Gold Voucher de 25k.",
          en: "15 S Ring and 15 Fifth Lord\u2019s Filtrinator, from Fifth Sepulchure. 1 Dark Helmet and 15 Dotty, from Zorba the Bakk at /zorbaspalace. 4 Gold Voucher 25k."
        },
        {
          pt: "Quem tem a classe Rare Darkside pode pegar a Dark Lord de gra\xE7a em /curio.",
          en: "Owners of the Rare Darkside class can get the Dark Lord for free at /curio."
        }
      ],
      note: {
        pt: "O guia a considera boa para farm e razo\xE1vel para solo e apoio.",
        en: "The guide considers it good for farming and OK for solo and support."
      }
    },
    {
      n: "Polly Roger",
      k: "season",
      cls: null,
      e: 3,
      src: "https://sites.google.com/view/aqwg-net/items/other/polly-roger",
      sn: "AQWG: Polly Roger",
      j: [
        "pirates"
      ],
      req: [
        {
          pt: "S\xF3 em setembro. N\xEDvel 80. Quest \u201CSailor of the Celestial Skies\u201D, do Barnaby, em /pirates.",
          en: "September only. Level 80. \u201CSailor of the Celestial Skies\u201D quest, from Barnaby, at /pirates."
        },
        {
          pt: "5 Sapphire Orb (Legion Lich Lord, /frozenlair) e 5 Rumours of the Celestial Commander (Diabolical Warlord, /lostruinswar).",
          en: "5 Sapphire Orb (Legion Lich Lord, /frozenlair) and 5 Rumours of the Celestial Commander (Diabolical Warlord, /lostruinswar)."
        },
        {
          pt: "4 p\xE1ginas de 10 Scraps cada: Animuses of Ice (/iceplane), Ivoliss (/ivoliss), Nightbane (/thevoid) e Ultra SN.O.W. (/extinction).",
          en: "4 pages of 10 Scraps each: Animuses of Ice (/iceplane), Ivoliss (/ivoliss), Nightbane (/thevoid) and Ultra SN.O.W. (/extinction)."
        },
        {
          pt: "Map of the Celestial Seas (Empowered Prime, /starsinc) e Coffer of the Stars (ArchFiend Dragonlord, /underlair).",
          en: "Map of the Celestial Seas (Empowered Prime, /starsinc) and Coffer of the Stars (ArchFiend Dragonlord, /underlair)."
        }
      ],
      note: {
        pt: "D\xE1 30% de dano extra contra inimigos marcados. A p\xE1gina sugere jogar em grupo.",
        en: "Gives 30% extra damage to tagged enemies. The page suggests playing in a group."
      }
    },
    {
      n: "Exalted Apotheosis",
      k: "daily",
      cls: null,
      e: 4,
      src: "https://sites.google.com/view/aqwg-net/items/other/exalted-apotheosis",
      sn: "AQWG: Exalted Apotheosis",
      j: [
        "timeinn"
      ],
      req: [
        {
          pt: "N\xEDvel 95 para equipar. Farm em /timeinn, depois das quests do Sir Cole: 10 Exalted Forgementals (Ezrajal), 10 Exalted Relic Pieces (The Warden), 10 Exalted Artillery Shards (The Engineer) e 300 Exalted Nodes (Elementals).",
          en: "Level 95 to equip. Farm at /timeinn, after Sir Cole\u2019s quests: 10 Exalted Forgementals (Ezrajal), 10 Exalted Relic Pieces (The Warden), 10 Exalted Artillery Shards (The Engineer) and 300 Exalted Nodes (Elementals)."
        },
        {
          pt: "Ins\xEDgnias di\xE1rias, uma de cada por dia: 24 Ezrajal (/ultraezrajal), 24 Warden (/ultrawarden) e 16 Engineer (/ultraengineer). As quests semanais do Drakath e do Drago, que resetam na sexta, tamb\xE9m d\xE3o ins\xEDgnias.",
          en: "Daily insignias, one of each per day: 24 Ezrajal (/ultraezrajal), 24 Warden (/ultrawarden) and 16 Engineer (/ultraengineer). Drakath\u2019s and Drago\u2019s weekly quests, which reset on Friday, also give insignias."
        },
        {
          pt: "Ordem do merge: Apostate Alpha, Omega e Ultima; Thaumaturgus Alpha, Omega e Ultima; depois Exalted Unity, Penultima e Apotheosis.",
          en: "Merge order: Apostate Alpha, Omega and Ultima; Thaumaturgus Alpha, Omega and Ultima; then Exalted Unity, Penultima and Apotheosis."
        },
        {
          pt: "A vers\xE3o dual pede mais 14 ins\xEDgnias de cada ultra boss.",
          en: "The dual version needs 14 more insignias of each ultra boss."
        }
      ],
      note: {
        pt: "Com 24 ins\xEDgnias de Ezrajal e de Warden, uma por dia, o m\xEDnimo \xE9 24 dias, como a lista do AQWG indica.",
        en: "With 24 Ezrajal and Warden insignias, one a day, the minimum is 24 days, as the AQWG list says."
      }
    },
    {
      n: "Mais itens da lista do AQWG",
      k: "gear",
      cls: null,
      e: 0,
      src: "https://sites.google.com/view/aqwg-net/farming-list",
      sn: "AQWG: Farming List",
      j: [],
      req: [
        {
          pt: "Awescended (armadura, capa, capacete e arma): vem da corrente do Awe-scension, acima. A armadura d\xE1 30% de gold e 50% de CP e Rep, a arma 40% de dano em All.",
          en: "Awescended (armor, cape, helm and weapon): it comes from the Awe-scension chain, above. The armor gives 30% gold and 50% CP and Rep, the weapon 40% damage to All."
        },
        {
          pt: "Void Warlock: a p\xE1gina s\xF3 lista as quests \u201CTools For the Job\u201D (100 Tainted Gem, 90 Blood Gem e mais) e \u201CCorrupted Touch\u201D (75 Tainted Gem, 100 Gem of Nulgath, 1.000 Nulgath\u2019s Approval e mais), com a casa Enchanted Nulgath Nation House.",
          en: "Void Warlock: the page only lists the \u201CTools For the Job\u201D (100 Tainted Gem, 90 Blood Gem and more) and \u201CCorrupted Touch\u201D (75 Tainted Gem, 100 Gem of Nulgath, 1,000 Nulgath\u2019s Approval and more) quests, with the Enchanted Nulgath Nation House."
        },
        {
          pt: "Legion Castle (casa): 25.000 Legion Tokens e 15 di\xE1rias da Kunoichi, em /akiba. As armas de dano racial de 75% v\xEAm do guia de iniciantes do AQWG.",
          en: "Legion Castle (house): 25,000 Legion Tokens and 15 dailies from Kunoichi, at /akiba. The 75% racial damage weapons come from AQWG\u2019s new player guide."
        }
      ],
      note: {
        pt: "Aqui s\xF3 entra o que o AQWG lista sem p\xE1gina pr\xF3pria na minha pesquisa. Confira a fonte.",
        en: "Only what the AQWG lists without a page of its own in my research is here. Check the source."
      }
    }
  ];

  // src/data/ultra-schedule.json
  var ultra_schedule_default = {
    "Champion Drakath": "w",
    "Ultra King Drago": "w",
    "Ultra Dage": "w",
    "Ultra Speaker (Malgor)": "w",
    "Ultra Kala": 8,
    "Ultra Iara": 9
  };

  // src/data/news.json
  var news_default = [
    {
      d: "2026-10-26",
      approx: 1,
      ty: "balance",
      cls: [
        "Arcana Invoker"
      ],
      src: "https://www.aq.com/gamedesignnotes/aqw-balance-patchnotes-9515",
      pt: {
        t: "Arcana Invoker ficou mais forte",
        x: "Arcana Invocation passou a causar dano m\xE1gico e The World (Reversed) ganhou o debuff de redu\xE7\xE3o de dano que faltava. A classe causa um pouco mais de dano que antes."
      },
      en: {
        t: "Arcana Invoker got stronger",
        x: "Arcana Invocation now deals magic damage and The World (Reversed) gained its missing damage-reduction debuff. The class deals a bit more damage than before."
      }
    },
    {
      d: "2026-10-17",
      ty: "new",
      cls: [
        "Kathool Adept"
      ],
      src: "https://www.aq.com/gamedesignnotes/aqw-kathoolclasspreview-17oct26-10496",
      pt: {
        t: "Kathool Adept, a classe de 18 anos do AQW",
        x: "Farmer e debuffer que acumula Madness no alvo e invoca um pet tent\xE1culo. No rank 10 estende a defesa aos aliados. Dispon\xEDvel em /callofkathool."
      },
      en: {
        t: "Kathool Adept, AQW's 18th birthday class",
        x: "A farmer and debuffer that stacks Madness on the target and summons a tentacle pet. At rank 10 it extends defense to allies. Available in /callofkathool."
      }
    },
    {
      d: "2026-08-07",
      ty: "rework",
      cls: [
        "PaladinSlayer",
        "CardClasher"
      ],
      src: "https://www.aq.com/gamedesignnotes/aqw-heromartclassupdates-30jul26-10415",
      pt: {
        t: "Reworks do PaladinSlayer e do CardClasher",
        x: "PaladinSlayer ganhou o Detect Living (+500% de crit em 20 stacks). CardClasher agora compra cartas aleat\xF3rias para buffs, debuffs ou dano. Quem tinha o CardClasher antigo ganha o pet Pyramid Box."
      },
      en: {
        t: "PaladinSlayer and CardClasher reworks",
        x: "PaladinSlayer gained Detect Living (+500% crit at 20 stacks). CardClasher now draws random cards for buffs, debuffs or damage. Owners of the old CardClasher get the Pyramid Box pet."
      }
    },
    {
      d: "2026-07-17",
      ty: "skin",
      cls: [
        "Void Highlord"
      ],
      src: "https://www.aq.com/gamedesignnotes/date/2026/07",
      pt: {
        t: "Primeira skin de classe: Darkon's Debris High Lord",
        x: "Donos do Void Highlord (ou da vers\xE3o IoDA) podem comprar a skin, que troca anima\xE7\xF5es, \xEDcones e armadura sem mudar as skills."
      },
      en: {
        t: "First class skin: Darkon's Debris High Lord",
        x: "Void Highlord (or IoDA) owners can buy the skin, which changes animations, icons and armor without touching the skills."
      }
    },
    {
      d: "2025-12-01",
      approx: 1,
      ty: "new",
      cls: [
        "Archivist of Time"
      ],
      src: "https://www.aq.com/gamedesignnotes/aqw-15nov25-2026classpreview-8277",
      pt: {
        t: "Archivist of Time, classe do calend\xE1rio 2026",
        x: "Sem auto-ataque e com 9 combina\xE7\xF5es de Index. Uma variante por AC ou HeroPoints est\xE1 prevista para o fim de 2026."
      },
      en: {
        t: "Archivist of Time, the 2026 calendar class",
        x: "No auto-attack and 9 Index combinations. An AC or HeroPoints variant is planned for late 2026."
      }
    },
    {
      d: "2025-09-01",
      approx: 1,
      ty: "rework",
      cls: [
        "DeathKnight Lord",
        "Naval Commander",
        "Chaos Slayer",
        "Phantom Chronomancer"
      ],
      src: "https://www.aq.com/gamedesignnotes/date/2026/01",
      pt: {
        t: "Pacote de reworks de setembro",
        x: "Alpha Omega, Chaos Slayer, DeathKnight Lord, Dragon Knight, Hollowborn Vindicator, Naval Commander e Phantom Chronomancer foram reworkadas. O DeathKnight Lord deixou de exigir daily."
      },
      en: {
        t: "September rework batch",
        x: "Alpha Omega, Chaos Slayer, DeathKnight Lord, Dragon Knight, Hollowborn Vindicator, Naval Commander and Phantom Chronomancer were reworked. DeathKnight Lord no longer requires a daily."
      }
    },
    {
      d: "2025-08-01",
      approx: 1,
      ty: "new",
      cls: [
        "Lich"
      ],
      src: "https://www.aq.com/gamedesignnotes/date/2026/01",
      pt: {
        t: "Lich chega ao /moreskulls",
        x: "Sazonal na sexta-feira 13 para quem n\xE3o \xE9 member; members acessam sempre."
      },
      en: {
        t: "Lich arrives in /moreskulls",
        x: "Seasonal on Friday the 13th for non-members; members can get it anytime."
      }
    },
    {
      d: "2025-06-01",
      approx: 1,
      ty: "rework",
      cls: [
        "Bard",
        "Necromancer",
        "Thief of Hours"
      ],
      src: "https://www.aq.com/gamedesignnotes/date/2026/01",
      pt: {
        t: "Revis\xE3o de classes antigas",
        x: "Bard, Troll Spellsmith, Horc Evader, Thief of Hours, Ranger, Necromancer e Guardian receberam ajustes."
      },
      en: {
        t: "Older classes refreshed",
        x: "Bard, Troll Spellsmith, Horc Evader, Thief of Hours, Ranger, Necromancer and Guardian were adjusted."
      }
    }
  ];

  // src/data/index.js
  var RAWBY = Object.fromEntries(classes_default.map((r) => [r[0], r]));
  var D = classes_default.map((r) => {
    const t = class_types_default[r[5]];
    let o = r[7] || {};
    if (o.like) {
      const L2 = RAWBY[o.like][7] || {};
      o = Object.assign({}, L2, o, { rot: o.rot || L2.rot, skills: o.skills || L2.skills, src: o.src || L2.src });
    }
    const fam = (calendar_families_default.find((f) => f.includes(r[0])) || []).filter((n) => n !== r[0]);
    const isCal = fam.length > 0 || r[0] in calendar_years_default;
    return {
      name: r[0],
      cat: isCal ? "cal" : r[1],
      store: r[1],
      farm: r[2],
      solo: r[3],
      ultra: r[4],
      type: r[5],
      note: r[6],
      nw: !!r[8],
      b: { farm: o.farm || t.farm, solo: o.solo || t.solo, ultra: o.ultra || t.ultra },
      awe: o.awe || t.awe,
      rot: o.rot || t.rot,
      generic: !o.rot,
      skills: o.skills || null,
      src: o.src ? HUB + o.src : null,
      inherited: o.like && o.rot ? o.like : null,
      ob: obtain_default[r[0]] || null,
      cons: consumables_default[r[0]] || null,
      cal: isCal,
      yr: calendar_years_default[r[0]] || null,
      fam
    };
  });
  var byName = Object.fromEntries(D.map((c, i) => [c.name, i]));

  // src/lib/util.js
  var esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  var wiki = (n) => "https://aqwwiki.wikidot.com/search:site/q/" + encodeURIComponent(n);
  var initials = (n) => n.replace(/'s\b/g, "").split(/\s+/).filter((w) => !/^(of|no|the)$/i.test(w)).map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  function sigil(c, sz) {
    const col = `var(${CATS[c.cat].c})`, ini = initials(c.name);
    return `<svg class="sig ${sz || ""}" viewBox="0 0 48 48" aria-hidden="true">
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="var(--bg2)"/>
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="${col}" opacity=".14"/>
  <path d="${GLYPH[c.type]}" fill="${col}" opacity=".22"/>
  <path d="M24 2 L44 13 L44 35 L24 46 L4 35 L4 13 Z" fill="none" stroke="${col}" stroke-width="2"/>
  <path d="M24 7 L39.5 15.8 L39.5 32.2 L24 41 L8.5 32.2 L8.5 15.8 Z" fill="none" stroke="${col}" stroke-width=".8" opacity=".55"/>
  <text x="24" y="28.6" text-anchor="middle" font-family="Barlow,system-ui,sans-serif" font-weight="700" font-size="${ini.length > 2 ? 11 : 14}" fill="var(--ink)">${ini}</text></svg>`;
  }
  var tColor = (t) => `var(--t${t})`;
  var score = (t) => ({ S: 4, A: 3, B: 2, C: 1 })[t] || 0;
  var total = (c) => score(c.farm) + score(c.solo) + score(c.ultra);
  var idx = (c) => D.indexOf(c);
  var nrm = (x) => x.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // src/state.js
  var ui = { curView: "inicio", feedSeen: null, ALERTS: [], curClass: null, eIdx: null, eCat: "all" };
  var st = { cat: "free", mode: "geral", all: "todas", lang: "pt", nf: "all", bcat: "all", eslot: "all", fk: "all" };
  try {
    Object.assign(st, JSON.parse(localStorage.getItem("aqwTier") || "{}"));
  } catch (e) {
  }
  if (st.lang !== "pt" && st.lang !== "en") st.lang = "pt";
  var save = () => {
    try {
      localStorage.setItem("aqwTier", JSON.stringify(st));
    } catch (e) {
    }
  };
  var L = (k, v) => {
    let s = (ui_default[st.lang] || ui_default.pt)[k] || ui_default.pt[k] || k;
    if (v) for (const x in v) s = s.replace("{" + x + "}", v[x]);
    return s;
  };
  var T = (s) => s == null ? s : st.lang === "en" && en_default[s] !== void 0 ? en_default[s] : s;
  var loc = () => st.lang === "en" ? "en-US" : "pt-BR";

  // src/components/shared.js
  var catName = (k) => T(CATS[k].n);
  var badges = (c) => Object.keys(MODES).map((m) => `<span class="b" style="background:${tColor(c[m])}"><em>${MODES[m]}</em>${c[m]}</span>`).join("");
  var catChip = (c) => `<span class="chip"><span class="dot" style="background:var(${CATS[c.cat].c})"></span>${catName(c.cat)}</span>`;
  var newTag = (c) => c.nw ? `<span class="new">${L("nw")}</span>` : "";
  function seg(id, opts, key, cb) {
    const el = document.getElementById(id);
    el.innerHTML = opts.map(([v, l]) => `<button data-v="${v}" aria-pressed="${st[key] === v}">${l}</button>`).join("");
    el.onclick = (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      st[key] = b.dataset.v;
      save();
      [...el.children].forEach((x) => x.setAttribute("aria-pressed", x === b));
      cb();
    };
  }

  // src/features/news.js
  var NL = (n) => n[st.lang] || n.pt;
  var iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  var parseD = (s) => {
    const [y, m, dd] = s.split("-").map(Number);
    return new Date(y, m - 1, dd);
  };
  function newsSeen() {
    if (!st.newsSeen) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - 21);
      st.newsSeen = iso(d);
      save();
    }
    return st.newsSeen;
  }
  var unreadNews = () => news_default.filter((n) => n.d > newsSeen());
  var fmtD = (n, o) => parseD(n.d).toLocaleDateString(loc(), n.approx ? { month: "short", year: "numeric" } : o || { day: "numeric", month: "short" });
  function renderFeed() {
    const f = st.nf || "all";
    seg("segNews", [["all", L("f_all")], ["new", L("ty_new")], ["rework", L("ty_rework")], ["balance", L("ty_balance")]], "nf", renderFeed);
    const seen = ui.feedSeen || newsSeen();
    document.getElementById("feed").innerHTML = news_default.filter((n) => f === "all" || n.ty === f).map((n) => {
      const u = n.d > seen;
      return `
  <article class="post frame ${u ? "unread" : ""}" id="news-${news_default.indexOf(n)}">
    <div class="when">${n.approx ? `<b>${parseD(n.d).toLocaleDateString(loc(), { month: "short" }).replace(".", "")}</b><span>${n.d.slice(0, 4)}</span>` : `<b>${n.d.slice(8)}</b><span>${parseD(n.d).toLocaleDateString(loc(), { month: "short", year: "numeric" }).replace(".", "")}</span>`}</div>
    <h3><span class="ty ${n.ty}">${L("ty_" + n.ty)}</span>${esc(NL(n).t)}${u ? `<span class="new">${L("nw")}</span>` : ""}</h3>
    <p>${esc(NL(n).x)}</p>
    <div class="cls">${n.cls.filter((c) => c in byName).map((c) => `<button class="open" data-i="${byName[c]}">${esc(c)}</button>`).join("")}</div>
    <div class="src2"><a href="${n.src}" target="_blank" rel="noopener">${L("source")}: Design Notes \u2197</a></div>
  </article>`;
    }).join("");
  }

  // src/views/class-dialog.js
  function keys(seq) {
    return T(seq).split(/\s+/).map((tok) => /^\d+$/.test(tok) ? tok.split("").map((d) => `<span class="k">${d}</span>`).join("") : `<span class="k txt">${esc(tok)}</span>`).join("");
  }
  var dlg = document.getElementById("dlg");
  function openClass(i) {
    const c = D[i];
    ui.curClass = i;
    const rows = Object.keys(MODES).map((m) => {
      const p = c.b[m].split("|");
      return `<tr><td>${MODES[m]} <span class="b" style="background:${tColor(c[m])};margin-left:4px">${c[m]}</span></td>${p.map((x) => `<td>${esc(x)}</td>`).join("")}</tr>`;
    }).join("");
    const inTeams = ultra_teams_default.map((t, ti) => [t, ti]).filter(([t]) => t.team.some(([n]) => n === c.name));
    const SRC = { h: L("src_h"), c: L("src_c"), g: L("src_g") };
    document.getElementById("dBody").innerHTML = `
  <div class="dh">${sigil(c, "xl")}<div class="info"><h3 id="dName">${esc(c.name)}${newTag(c)}</h3><div class="badges">${catChip(c)}<span class="chip">${T(class_types_default[c.type].n)}</span>${badges(c)}</div></div>
    <button class="x" id="dClose" aria-label="${L("close")}">\xD7</button></div>
  <div class="db">
    <p>${esc(T(c.note))}</p>
    <div class="facts">
      <div class="fact"><small>${L("how")}</small>${c.ob ? esc(T(c.ob[0])) : c.yr ? L("calYear", { y: c.yr }) : L("seeWiki")}${c.ob && c.ob[1] ? `<div class="awe" style="margin-top:4px">${esc(T(c.ob[1]))}</div>` : ""}</div>
      ${c.cal ? `<div class="fact"><small>${L("calClass")}${c.yr ? " \xB7 " + c.yr : ""}</small><div style="margin-bottom:4px">${L("via", { x: T(STORE[c.store]) })}</div>${c.fam.length ? `${L("same")} <span class="inteam" style="margin-top:6px">${c.fam.map((n) => `<button class="open" data-i="${byName[n]}">${esc(n)}</button>`).join("")}</span>` : L("noVar")}</div>` : ""}
      <div class="fact"><small>${L("cons")}</small>${c.cons ? esc(T(c.cons)) : L("consDef")}</div>
    </div>
    <div><h5>${L("enhH")}</h5>
      <div class="tbl"><table><thead><tr><th>${L("thMode")}</th><th>${L("thClass")}</th><th>${L("thWeapon")}</th><th>${L("thHelm")}</th><th>${L("thCape")}</th></tr></thead><tbody>${rows}</tbody></table></div>
      <div class="awe"><b>${L("noForge")}</b> ${esc(T(c.awe))}</div></div>
    ${c.skills ? `<div><h5>${L("skills")}</h5><div class="skills">${c.skills.map((s, k) => `<div><b>${k + 1}</b>${esc(T(s))}</div>`).join("")}</div></div>` : ""}
    <div><h5>${L("rotH")}</h5><div class="rot">${c.rot.map((r) => `
      <div class="rr"><div class="hd"><b>${esc(T(r[0]))}</b><span class="src ${r[2]}">${SRC[r[2]]}</span></div>
      <div class="keys">${keys(r[1])}</div><p>${esc(T(r[3]))}</p></div>`).join("")}</div>
      ${c.generic ? `<p class="awe">${L("generic")}</p>` : ""}
      ${c.inherited ? `<p class="awe">${L("inherited", { x: esc(c.inherited) })}</p>` : ""}</div>
    ${inTeams.length ? `<div><h5>${L("inTeams")}</h5><div class="inteam">${inTeams.map(([t, ti]) => `<button data-team="${ti}">${esc(T(t.n))}</button>`).join("")}</div></div>` : ""}
    <div class="links">${(() => {
      const inC = (st.cmp || []).includes(c.name), full = (st.cmp || []).length >= 3;
      return `<button class="addCmp" data-addcmp="${i}" ${inC || full ? "disabled" : ""}>${inC ? L("cmp_in") : full ? L("cmp_full") : L("cmp_add")}</button>`;
    })()}<a href="${wiki(c.name)}" target="_blank" rel="noopener">${L("wikiLink")}</a>${c.src ? `<a href="${c.src}" target="_blank" rel="noopener">${L("hubLink")}</a>` : ""}</div>
  </div>`;
    document.getElementById("dClose").onclick = () => dlg.close();
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
  }

  // src/views/home.js
  function renderHome() {
    const now = /* @__PURE__ */ new Date(), d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = (5 - d.getDay() + 7) % 7, fri = new Date(d);
    fri.setDate(d.getDate() + diff);
    const ds = fri.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long" });
    const month = now.getMonth() + 1;
    let w = `<h3>${L("home_week")}</h3><button class="hrow" data-goview="ultras"><span><b>\u23F3 ${L("home_reset")}</b><small>${ds}</small></span><span class="pill ${diff <= 1 ? "on" : "soon"}">${relDays(diff)}</span></button>`;
    ultra_teams_default.forEach((t, ti) => {
      const sc = ultra_schedule_default[t.n];
      if (typeof sc === "number") {
        const mn = new Date(2026, sc - 1, 1).toLocaleDateString(loc(), { month: "long" });
        w += `<button class="hrow" data-goteam="${ti}"><span><b>${esc(T(t.n))}</b></span>${sc === month ? `<span class="pill on">${L("ag_now")}</span>` : `<span class="pill">${L("ag_back", { m: mn })}</span>`}</button>`;
      }
    });
    w += `<button class="linkBtn" style="align-self:flex-start" data-goview="ultras">${L("home_agenda")} \u2192</button>`;
    document.getElementById("homeWeek").innerHTML = w;
    document.getElementById("homeNews").innerHTML = `<h3>${L("home_news")}</h3>` + news_default.slice(0, 3).map((n) => nItem(n, n.d > newsSeen())).join("") + `<button class="linkBtn" style="align-self:flex-start" data-goview="novidades">${L("home_seeall")} \u2192</button>`;
  }

  // src/views/teams.js
  function renderTeams() {
    document.getElementById("teams").innerHTML = ultra_teams_default.map((t, ti) => `
  <article class="team frame" id="team-${ti}">
    <div class="th"><div><h3>${esc(T(t.n))}</h3><div class="map">${esc(t.map)}</div></div><span class="tag">${esc(T(t.tag))}</span></div>
    <div class="slots">${t.team.map(([n, r]) => {
      const c = D[byName[n]];
      return `<button class="open slotc" data-i="${byName[n]}">${sigil(c)}<div><b>${esc(n)}</b><span>${esc(T(r))}</span></div></button>`;
    }).join("")}</div>
    <ul>${t.tips.map((x) => `<li>${esc(T(x))}</li>`).join("")}</ul>
    <div class="alt"><b>${L("alt")}</b> ${esc(T(t.alt))}</div>
  </article>`).join("");
    document.getElementById("items").innerHTML = ultra_items_default.map(([h, p]) => `<div class="item frame"><b>${esc(T(h))}</b><p>${esc(T(p))}</p></div>`).join("");
  }
  function goTeam(ti) {
    show("ultras");
    const el = document.getElementById("team-" + ti);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("flash");
    setTimeout(() => el.classList.remove("flash"), 1600);
  }

  // src/features/alerts.js
  var DAY = 864e5;
  var relDays = (n) => n === 0 ? L("today") : n === 1 ? L("tomorrow") : L("inDays", { n });
  function computeAlerts(now) {
    now = now || /* @__PURE__ */ new Date();
    const d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const out = [];
    const dd = (5 - d0.getDay() + 7) % 7;
    const fri = new Date(d0.getTime() + dd * DAY);
    if (dd === 0) out.push({ id: "reset-" + iso(fri), ic: "\u23F3", lvl: "now", t: L("al_reset0"), x: L("al_reset0x"), go: { tab: "ultras" } });
    else if (dd === 1) out.push({ id: "reset-" + iso(fri), ic: "\u23F3", lvl: "soon", t: L("al_reset1"), x: L("al_reset1x"), go: { tab: "ultras" } });
    for (let k = 0; k <= 430; k++) {
      const d = new Date(d0.getTime() + k * DAY);
      if (d.getDate() === 13 && d.getDay() === 5) {
        if (k <= 14) {
          const ds = d.toLocaleDateString(loc(), { day: "numeric", month: "long" });
          out.push(k === 0 ? { id: "f13-" + iso(d), ic: "\u2620", lvl: "now", t: L("al_f13now"), x: L("al_f13nowx"), go: { cls: "Lich" } } : { id: "f13-" + iso(d), ic: "\u2620", lvl: "soon", t: L("al_f13", { d: ds }), x: L("al_f13x", { r: relDays(k) }), go: { cls: "Lich" } });
        }
        break;
      }
    }
    [["Ultra Kala", 8], ["Ultra Iara", 9]].forEach(([u, m]) => {
      const ti = ultra_teams_default.findIndex((t) => t.n === u);
      if (d0.getMonth() + 1 === m) out.push({ id: u + "-" + d0.getFullYear(), ic: "\u{1F702}", lvl: "now", t: L("al_seasonNow", { u }), x: L("al_seasonNowx"), go: { team: ti } });
      else {
        let s = new Date(d0.getFullYear(), m - 1, 1);
        if (s < d0) s = new Date(d0.getFullYear() + 1, m - 1, 1);
        const k = Math.round((s - d0) / DAY);
        if (k <= 14) out.push({ id: u + "-" + s.getFullYear(), ic: "\u{1F702}", lvl: "soon", t: L("al_seasonSoon", { u, d: s.toLocaleDateString(loc(), { day: "numeric", month: "long" }) }), x: L("al_seasonSoonx", { r: relDays(k) }), go: { team: ti } });
      }
    });
    return out;
  }
  var dismissed = () => new Set(st.dis || []);
  var liveAlerts = () => {
    const ds = dismissed();
    return ui.ALERTS.filter((a) => !ds.has(a.id));
  };
  function dismissAlert(id) {
    st.dis = [.../* @__PURE__ */ new Set([...st.dis || [], id])].slice(-40);
    save();
    refreshNotif();
  }
  function goAlert(a) {
    if (!a) return;
    if (a.go.cls) openClass(byName[a.go.cls]);
    else if (a.go.team != null) goTeam(a.go.team);
    else if (a.go.tab) show(a.go.tab);
  }
  function markAllRead() {
    st.newsSeen = news_default.reduce((m, n) => n.d > m ? n.d : m, newsSeen());
    ui.ALERTS.forEach((a) => {
      if (!(st.dis || []).includes(a.id)) st.dis = [...st.dis || [], a.id];
    });
    save();
    refreshNotif();
    renderFeed();
  }
  function nItem(n, unread) {
    return `<button class="nItem ${unread ? "unread" : ""}" data-news="${news_default.indexOf(n)}"><span class="ic">${TYIC[n.ty]}</span><span class="tx"><b>${esc(NL(n).t)}</b><span>${L("ty_" + n.ty)} \xB7 ${fmtD(n)}</span></span>${unread ? `<span class="dotU" aria-hidden="true"></span>` : ""}</button>`;
  }
  function aItem(a) {
    return `<button class="nItem unread" data-alert="${esc(a.id)}"><span class="ic">${a.ic}</span><span class="tx"><b>${esc(a.t)}</b><span>${esc(a.x)}</span></span></button>`;
  }
  function refreshNotif() {
    ui.ALERTS = computeAlerts();
    const la = liveAlerts(), un = unreadNews(), count = la.length + un.length;
    const bdg = document.getElementById("bellBadge");
    bdg.hidden = !count;
    bdg.textContent = count > 9 ? "9+" : count;
    document.getElementById("bellLabel").textContent = L("bell", { n: count });
    document.querySelectorAll(".navBdg").forEach((tb) => {
      tb.hidden = !un.length;
      tb.textContent = un.length;
    });
    document.title = (count ? `(${count}) ` : "") + L("title");
    const p = document.getElementById("notifPanel");
    p.innerHTML = `<div class="np-h"><b>${L("n_title")}</b>${count ? `<button class="linkBtn" data-markall="1">${L("n_markall")}</button>` : ""}</div>
    ${la.length ? `<div class="np-sec">${L("n_alerts")}</div>${la.map(aItem).join("")}` : ""}
    <div class="np-sec">${L("n_news")}</div>
    ${news_default.slice(0, 5).map((n) => nItem(n, n.d > newsSeen())).join("") || `<div class="npEmpty">${L("n_empty")}</div>`}
    <button class="linkBtn" data-seeall="1">${L("n_seeall")} \u2192</button>`;
    const top = la.find((a) => a.lvl === "now") || la[0];
    document.getElementById("banner").innerHTML = top ? `<div class="banner"><span class="ic" aria-hidden="true">${top.ic}</span><span class="tx"><b>${esc(top.t)}</b><span>${esc(top.x)}</span></span>
    <span class="acts"><button class="btnG" data-alert="${esc(top.id)}">${L("view")}</button><button class="btnQ" data-dismiss="${esc(top.id)}">${L("dismiss")}</button></span></div>` : "";
    const an = document.getElementById("alertsNow");
    an.innerHTML = la.map(aItem).join("");
    renderHome();
  }

  // src/views/nav.js
  var VIEWS = Object.values(SEC).flat();
  var secOf = (v) => Object.keys(SEC).find((k) => SEC[k].includes(v));
  function renderSub() {
    const list = SUBS[secOf(ui.curView)], sn = document.getElementById("subnav");
    sn.hidden = !list;
    sn.innerHTML = list ? list.map(([k, l]) => `<button data-sub="${k}" aria-selected="${ui.curView === k}">${L(l)}</button>`).join("") : "";
  }
  function renderNav() {
    const h = SECS.map(([k, l]) => `<button class="nv" data-sec="${k}" aria-current="${secOf(ui.curView) === k ? "page" : "false"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${ICO[k]}" fill="currentColor"/></svg><span>${L(l)}</span>${k === "novidades" ? `<span class="navBdg" hidden></span>` : ""}</button>`).join("");
    ["sideNav", "bNav"].forEach((id) => {
      const el = document.getElementById(id);
      el.innerHTML = h;
      el.setAttribute("aria-label", L("nav_main"));
    });
    renderSub();
  }
  function show(v) {
    if (v === "melhores") v = "inicio";
    if (v === "hardfarm") v = "itens";
    if (v === "classes") v = st.sub || "tier";
    if (!VIEWS.includes(v)) v = "inicio";
    const sec = secOf(v), changed = v !== ui.curView;
    ui.curView = v;
    if (sec === "classes") {
      st.sub = v;
      save();
    }
    VIEWS.forEach((x) => document.getElementById("v-" + x).hidden = x !== v);
    document.querySelectorAll("[data-sec]").forEach((b) => b.setAttribute("aria-current", b.dataset.sec === sec ? "page" : "false"));
    renderSub();
    try {
      history.replaceState(null, "", "#" + v);
    } catch (e) {
    }
    if (changed) window.scrollTo(0, 0);
    if (v === "novidades") {
      ui.feedSeen = newsSeen();
      renderFeed();
      st.newsSeen = news_default.reduce((m, n) => n.d > m ? n.d : m, ui.feedSeen);
      save();
      refreshNotif();
    }
  }
  function closePanel() {
    document.getElementById("notifPanel").hidden = true;
    document.getElementById("bell").setAttribute("aria-expanded", "false");
    document.body.classList.remove("np-open");
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !document.getElementById("notifPanel").hidden) closePanel();
  });

  // src/views/static.js
  function renderStatic() {
    document.documentElement.lang = st.lang === "en" ? "en" : "pt-BR";
    document.title = L("title");
    document.querySelectorAll("[data-i18n]").forEach((el) => el.textContent = L(el.dataset.i18n));
    document.querySelectorAll("[data-i18n-html]").forEach((el) => el.innerHTML = L(el.dataset.i18nHtml));
    const q = document.getElementById("q");
    q.placeholder = L("search");
    q.setAttribute("aria-label", L("search"));
    document.getElementById("bq").placeholder = L("bld_search");
    const eqi = document.getElementById("enq");
    eqi.placeholder = L("enh_q");
    eqi.setAttribute("aria-label", L("enh_q"));
    const g = document.getElementById("gq");
    g.placeholder = L("gsearch");
    g.setAttribute("aria-label", L("gsearch"));
    renderNav();
    document.getElementById("stats").innerHTML = `<span><b>${D.length}</b>${L("st_classes")}</span><span><b>${ultra_teams_default.length}</b>${L("st_ultras")}</span><span><b>${enhancements_default.length}</b>${L("st_enh")}</span><span><b>${D.filter((c) => !c.generic).length}</b>${L("st_rot")}</span>`;
  }
  function renderModes() {
    document.getElementById("modes").innerHTML = Object.keys(MODES).map((m) => {
      const top = [...D].sort((a, b) => score(b[m]) - score(a[m]) || total(b) - total(a)).slice(0, 5);
      return `<div class="mode frame"><h3>${MODES[m]}</h3><div class="why">${L("mi_" + m)}</div>` + top.map((c, i) => `
      <button class="open rank" data-i="${idx(c)}"><span class="n">${i + 1}</span>${sigil(c)}<span class="nm"><b>${esc(c.name)}</b><span>${catName(c.cat)} \xB7 ${c.b[m].split("|").join(" \xB7 ")}</span></span><span class="b" style="background:${tColor(c[m])}">${c[m]}</span></button>`).join("") + `<button class="linkBtn" data-gomode="${m}">${L("home_tier", { m: MODES[m] })} \u2192</button></div>`;
    }).join("");
  }

  // src/features/toasts.js
  var toasted = /* @__PURE__ */ new Set();
  function toast(ic, t, x, onGo) {
    const box = document.getElementById("toasts");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="ic" aria-hidden="true">${ic}</span><span class="tx"><b>${esc(t)}</b>${x ? esc(x) : ""}${onGo ? `<div style="margin-top:6px"><button class="btnQ" style="padding:4px 10px">${L("view")}</button></div>` : ""}</span><button class="x2" aria-label="${L("close")}">\xD7</button>`;
    const kill = () => el.remove();
    el.querySelector(".x2").onclick = kill;
    if (onGo) el.querySelector(".btnQ").onclick = () => {
      onGo();
      kill();
    };
    box.appendChild(el);
    while (box.children.length > 3) box.firstChild.remove();
    setTimeout(kill, 9e3);
    const b = document.getElementById("bell");
    b.classList.remove("ring");
    void b.offsetWidth;
    b.classList.add("ring");
  }
  function checkLive(first) {
    refreshNotif();
    if (first) {
      const n = unreadNews().length;
      if (n) toast("\u2726", n === 1 ? L("n_unread1") : L("n_unread", { n }), "", () => show("novidades"));
    }
    liveAlerts().forEach((a) => {
      if (!toasted.has(a.id)) {
        toasted.add(a.id);
        if (!first) toast(a.ic, a.t, a.x, () => goAlert(a));
      }
    });
  }

  // src/views/farms.js
  document.addEventListener("click", (e) => {
    const c = e.target.closest && e.target.closest("code.jn");
    if (!c) return;
    const t = "/join " + c.dataset.j;
    try {
      navigator.clipboard.writeText(t);
    } catch (_) {
    }
    toast("\u2713", t, L("farm_copied"));
  });
  function renderFarms() {
    seg("segFarm", [["all", L("farm_all")], ["class", L("farm_class")], ["gear", L("farm_gear")], ["mat", L("farm_mat")], ["rep", L("farm_rep")], ["daily", L("farm_daily")], ["season", L("farm_season")]], "fk", renderFarms);
    const f = st.fk || "all", lg = st.lang === "en" ? "en" : "pt";
    const jn = (t) => esc(t).replace(/(^|[\s(])\/(?!goto\b|join\b)([a-z0-9]{3,})/g, (a, b, c) => `${b}<code class="jn" data-j="${c}" title="${L("farm_copied")}">/join ${c}</code>`);
    document.getElementById("farms").innerHTML = hardfarm_default.filter((x) => f === "all" || x.k === f).map((x) => {
      const c = x.cls && x.cls in byName ? D[byName[x.cls]] : null;
      return `<article class="fcard frame"><div class="fh">${c ? sigil(c) : ""}<div><h3>${esc(lg === "en" && x.ne ? x.ne : x.n)}</h3>${x.e ? `<span class="eff e${x.e}" title="${L("farm_eff")}"><i aria-hidden="true">${[1, 2, 3, 4, 5].map((i) => `<b class="${i <= x.e ? "on" : ""}"></b>`).join("")}</i><em>${L("eff" + x.e)}</em></span>` : ""}</div></div>
    ${x.j && x.j.length ? `<div class="fjoin">${L("farm_join")}: ${x.j.map((m) => `<code class="jn" data-j="${m}" title="${L("farm_copied")}">/join ${m}</code>`).join(" ")}</div>` : ""}
    <h4>${L("farm_need")}</h4><ul>${x.req.map((r) => `<li>${jn(r[lg])}</li>`).join("")}</ul>
    <div class="fnote">${jn(x.note[lg])}</div>
    ${c ? `<button class="fbtn open" data-i="${idx(c)}">${L("farm_open")}</button>` : ""}
    <div class="fsrc">${L("farm_src")}: <a href="${x.src}" target="_blank" rel="noopener">${esc(x.sn)} \u2197</a></div></article>`;
    }).join("");
  }

  // src/views/builder.js
  var ownSet = () => new Set(st.own || []);
  var roleOf = (r) => {
    const x = r.toLowerCase();
    return /taunt|tank|tanque/.test(x) ? "tank" : /cura|heal/.test(x) ? "heal" : /suporte|support/.test(x) ? "sup" : "dmg";
  };
  var ROLE_T = { dmg: ["phys", "mag", "mana", "dodge", "chrono"], tank: ["phys", "dodge", "sup"], heal: ["sup"], sup: ["sup", "chrono", "mag"] };
  function bestSub(own, role, except) {
    let best = null, bs = -1;
    D.forEach((c) => {
      if (!own.has(c.name) || c.name === except || !ROLE_T[role].includes(c.type)) return;
      const sc = score(c.ultra) * 10 + score(c.solo) + (c.type === "sup" && (role === "heal" || role === "sup") ? 5 : 0);
      if (sc > bs) {
        bs = sc;
        best = c;
      }
    });
    return best;
  }
  var bList = (f) => [...D].sort((a, b) => a.name.localeCompare(b.name)).filter((c) => (st.bcat === "all" || c.cat === st.bcat) && (!f || nrm(c.name).includes(f)));
  function renderBuilder() {
    const own = ownSet(), f = nrm(document.getElementById("bq").value.trim());
    document.getElementById("bCount").textContent = L("bld_n", { n: [...own].filter((n) => n in byName).length });
    document.getElementById("bActs").innerHTML = `<button data-bmark="1">${L("bld_markall")}</button><button data-bclear="1">${L("bld_p_clear")}</button>`;
    document.getElementById("pkGrid").innerHTML = bList(f).map((c) => `<button class="pk" data-own="${esc(c.name)}" aria-pressed="${own.has(c.name)}">${sigil(c)}<span>${esc(c.name)}</span></button>`).join("");
    const none = ![...own].some((n) => n in byName);
    const res = ultra_teams_default.map((t, ti) => {
      const slots = t.team.map(([cn, role]) => {
        const r = roleOf(role);
        if (none) return { cn, role, st: "plain" };
        if (own.has(cn)) return { cn, role, st: "ideal" };
        const sub = bestSub(own, r, cn);
        return sub ? { cn, role, st: "sub", sub } : { cn, role, st: "miss" };
      });
      return { t, ti, slots, n: slots.filter((x) => x.st === "ideal").length, m: slots.filter((x) => x.st !== "miss").length };
    }).sort((a, b) => none ? a.ti - b.ti : b.n - a.n || b.m - a.m || a.ti - b.ti);
    document.getElementById("bres").innerHTML = (none ? `<div class="bhint frame" style="grid-column:1/-1">${L("bld_hint")}</div>` : "") + res.map((r) => `<div class="bcard frame"><h3><button data-goteam="${r.ti}">${esc(T(r.t.n))}</button>${none ? "" : `<span class="pill ${r.n >= 3 ? "on" : r.n >= 1 ? "soon" : ""}">${L("bld_ideal", { n: r.n })}</span>`}</h3>` + r.slots.map((x) => {
      const c = D[byName[x.cn]];
      const stt = x.st === "plain" ? "" : x.st === "ideal" ? `<div class="st ok">\u2714 ${L("bld_have")}</div>` : x.st === "sub" ? `<div class="st sub">\u2248 ${L("bld_use")} <button class="open" data-i="${idx(x.sub)}">${esc(x.sub.name)}</button> (Ultras ${x.sub.ultra})</div>` : `<div class="st miss">\u2716 ${L("bld_miss")}</div>`;
      return `<div class="bslot ${x.st === "ideal" ? "ok" : ""}">${c ? sigil(c) : ""}<div><b>${esc(x.cn)}</b><small>${esc(T(x.role))}</small>${stt}</div></div>`;
    }).join("") + `</div>`).join("") + (none ? "" : `<p class="sub" style="grid-column:1/-1;margin:0">${L("bld_note")}</p>`);
  }

  // src/views/tiers.js
  var overall = (c) => {
    const s = Math.max(score(c.farm), score(c.solo), score(c.ultra)), sum = total(c);
    if (s === 4 && sum >= 10) return "S";
    if (s === 4 || sum >= 9) return "A";
    if (sum >= 6) return "B";
    return "C";
  };
  function renderTiers() {
    const list = D.filter((c) => c.cat === st.cat).sort((a, b) => total(b) - total(a));
    const tierOf = (c) => st.mode === "geral" ? overall(c) : c[st.mode];
    document.getElementById("tiers").innerHTML = TIERS.map((t) => {
      const xs = list.filter((c) => tierOf(c) === t);
      return `<div class="tier"><div class="tl" style="background:${tColor(t)}">${t}</div><div class="tr">${xs.length ? xs.map((c) => `<button class="open tc" data-i="${idx(c)}" title="${esc(T(c.note))}">${sigil(c, "lg")}<span>${esc(c.name)}</span></button>`).join("") : `<span class="empty">${L("empty", { c: catName(st.cat) })}</span>`}</div></div>`;
    }).join("");
  }

  // src/views/agenda.js
  function renderAgenda() {
    const now = /* @__PURE__ */ new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = (5 - d.getDay() + 7) % 7;
    const fri = new Date(d);
    fri.setDate(d.getDate() + diff);
    const rel = diff === 0 ? L("today") : diff === 1 ? L("tomorrow") : L("inDays", { n: diff });
    const ds = fri.toLocaleDateString(loc(), { day: "numeric", month: "short" });
    document.getElementById("agReset").innerHTML = `<span class="resetbar">${L("ag_reset", { d: ds })} <span class="pill ${diff <= 1 ? "on" : "soon"}">${rel}</span></span>`;
    const month = now.getMonth() + 1;
    const row = (t, ti, pill) => `<button class="agrow" data-goteam="${ti}"><b>${esc(T(t.n))}</b>${pill || ""}</button>`;
    const W = [], S = [], O = [];
    ultra_teams_default.forEach((t, ti) => {
      const s = ultra_schedule_default[t.n];
      if (s === "w") W.push(row(t, ti, `<span class="pill soon">${rel}</span>`));
      else if (typeof s === "number") {
        const mn = new Date(2026, s - 1, 1).toLocaleDateString(loc(), { month: "long" });
        S.push(row(t, ti, s === month ? `<span class="pill on">${L("ag_now")}</span>` : `<span class="pill">${L("ag_back", { m: mn })}</span>`));
      } else O.push(row(t, ti, `<span class="pill">${esc(T(t.tag))}</span>`));
    });
    const col = (h, sub, rows) => `<div class="agcol frame"><h3>${h}</h3><div class="why">${sub}</div>${rows.join("")}</div>`;
    document.getElementById("agenda").innerHTML = col(L("ag_weekly"), L("ag_weekly_sub"), W) + col(L("ag_season"), L("ag_season_sub"), S) + col(L("ag_other"), L("ag_other_sub"), O);
  }

  // src/views/compare.js
  function renderCompare() {
    st.cmp = (st.cmp || []).filter((n) => n in byName).slice(0, 3);
    document.getElementById("classList").innerHTML = D.map((c) => `<option value="${esc(c.name)}"></option>`).join("");
    const pick = document.getElementById("cmpPick");
    pick.innerHTML = [0, 1, 2].map((k) => `<div class="cmpSlot"><input type="search" id="cmp${k}" list="classList" placeholder="${esc(L("cmp_ph", { n: k + 1 }))}" aria-label="${esc(L("cmp_ph", { n: k + 1 }))}" value="${esc(st.cmp[k] || "")}"><button data-cmpclear="${k}" aria-label="${esc(L("cmp_clear"))}" title="${esc(L("cmp_clear"))}">\xD7</button></div>`).join("");
    [0, 1, 2].forEach((k) => {
      const inp = document.getElementById("cmp" + k);
      inp.addEventListener("change", () => {
        const v = inp.value.trim();
        const hit = D.find((c) => c.name.toLowerCase() === v.toLowerCase());
        const arr = [st.cmp[0] || "", st.cmp[1] || "", st.cmp[2] || ""];
        arr[k] = hit ? hit.name : "";
        st.cmp = arr.filter(Boolean);
        save();
        renderCompare();
      });
    });
    const cs = st.cmp.map((n) => D[byName[n]]);
    const out = document.getElementById("cmpOut");
    if (!cs.length) {
      out.innerHTML = `<div class="cmpWrap"><div class="cmpEmpty">${L("cmp_empty")}</div></div>`;
      return;
    }
    const best = (m) => Math.max(...cs.map((c) => score(c[m])));
    const row = (h, f) => `<tr><th scope="row">${h}</th>${cs.map((c) => `<td>${f(c)}</td>`).join("")}</tr>`;
    const bl = (s) => `<div class="bl">${s.split("|").map((x) => `<span>${esc(x)}</span>`).join("")}</div>`;
    out.innerHTML = `<div class="cmpWrap"><table class="cmpT"><thead><tr><th scope="row"></th>${cs.map((c) => `<td><button class="open cmpHead" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b>${catChip(c)}</span></button></td>`).join("")}</tr></thead><tbody>
    ${Object.keys(MODES).map((m) => row(MODES[m], (c) => `<span class="b ${score(c[m]) === best(m) && cs.length > 1 ? "best" : ""}" style="background:${tColor(c[m])}">${c[m]}</span>`)).join("")}
    ${row(L("row_type"), (c) => esc(T(class_types_default[c.type].n)))}
    ${row(L("row_note"), (c) => esc(T(c.note)))}
    ${Object.keys(MODES).map((m) => row(L("row_build", { m: MODES[m] }), (c) => bl(c.b[m]))).join("")}
    ${row(L("noForge").replace(":", ""), (c) => esc(T(c.awe)))}
    ${row(L("row_rot"), (c) => `<div style="font-size:12px;color:var(--muted);margin-bottom:4px">${esc(T(c.rot[0][0]))}</div><div class="keys">${keys(c.rot[0][1])}</div>`)}
    ${row(L("row_how"), (c) => c.ob ? esc(T(c.ob[0])) : c.yr ? L("calYear", { y: c.yr }) : L("seeWiki"))}
  </tbody></table></div>`;
  }
  function addCompare(i) {
    const n = D[i].name;
    st.cmp = st.cmp || [];
    if (!st.cmp.includes(n) && st.cmp.length < 3) st.cmp.push(n);
    save();
  }

  // src/views/cards.js
  function renderCards() {
    const q = (document.getElementById("q").value || "").toLowerCase().trim();
    const xs = D.filter((c) => (st.all === "todas" || c.cat === st.all) && c.name.toLowerCase().includes(q)).sort((a, b) => total(b) - total(a) || a.name.localeCompare(b.name));
    document.getElementById("countAll").textContent = L("count", { n: xs.length, t: D.length });
    document.getElementById("cards").innerHTML = xs.length ? xs.map((c) => `
  <button class="open card frame" data-i="${idx(c)}">${sigil(c, "lg")}<span class="info"><h4>${esc(c.name)}${newTag(c)}</h4><span class="badges">${badges(c)}</span><span class="count">${catName(c.cat)} \xB7 ${T(class_types_default[c.type].n)}${c.yr ? " \xB7 " + c.yr : ""}</span></span></button>`).join("") : `<p class="sub">${L("none")}</p>`;
  }

  // src/views/enhancements.js
  var SLOTIDX = { "Classe": 0, "Arma": 1, "Capacete": 2, "Capa": 3 };
  var MLET = { farm: "F", solo: "S", ultra: "U" };
  function usersOf(e) {
    const key = e[0] === "Forge (base)" ? "Forge" : e[0], si = SLOTIDX[e[1]];
    return D.map((c) => {
      const ms = Object.keys(MODES).filter((m) => c.b[m].split("|")[si] === key);
      return ms.length ? { c, ms } : null;
    }).filter(Boolean).sort((a, b) => b.ms.length - a.ms.length || total(b.c) - total(a.c));
  }
  var chipU = (u) => `<button class="open" data-i="${idx(u.c)}">${esc(u.c.name)} <i>${u.ms.map((m) => MLET[m]).join("\xB7")}</i></button>`;
  function renderEnh() {
    const SL = ["Classe", "Arma", "Capacete", "Capa"];
    seg("segSlot", [["all", L("slot_all")], ...SL.map((k) => [k, L("slot_" + k)])], "eslot", renderEnh);
    const eqv = nrm(document.getElementById("enq").value.trim()), hits = eqv ? D.filter((c) => nrm(c.name).includes(eqv)).slice(0, 3) : [], hitK = /* @__PURE__ */ new Set();
    hits.forEach((c) => Object.keys(MODES).forEach((m) => c.b[m].split("|").forEach((v, si) => hitK.add(si + ":" + v))));
    const isHit = (e) => hitK.has(SLOTIDX[e[1]] + ":" + (e[0] === "Forge (base)" ? "Forge" : e[0]));
    const qpanel = !eqv ? "" : hits.length ? hits.map((c) => `<div class="qcard frame"><div class="qh">${sigil(c)}<button class="open" data-i="${idx(c)}">${esc(c.name)}</button>${catChip(c)}</div>
    <div class="tbl"><table><thead><tr><th>${L("thMode")}</th><th>${L("thClass")}</th><th>${L("thWeapon")}</th><th>${L("thHelm")}</th><th>${L("thCape")}</th></tr></thead><tbody>${Object.keys(MODES).map((m) => `<tr><td>${MODES[m]} <span class="b" style="background:${tColor(c[m])};margin-left:4px">${c[m]}</span></td>${c.b[m].split("|").map((x) => `<td>${esc(x)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`).join("") + `<p class="sub" style="margin:0">${L("enh_qhint")}</p>` : `<p class="npEmpty">${L("gnores")}</p>`;
    document.getElementById("enh").innerHTML = qpanel + SL.filter((k) => st.eslot === "all" || st.eslot === k).map((k) => {
      const items = enhancements_default.map((e, ei) => [e, ei]).filter(([e]) => e[1] === k);
      return `<div class="enhGrp"><h3>${L("slot_" + k)}<small>${L("slot_n", { n: items.length })}</small></h3><div class="enh">` + items.map(([e, ei]) => {
        const us = usersOf(e);
        return `<div class="ec frame ${hits.length ? isHit(e) ? "hit" : "dim" : ""}"><div class="top"><span class="slot">${L("slot_" + e[1])}</span><span class="stars" aria-label="${e[2]} ${L("of5")}">${"\u2605".repeat(e[2])}${"\u2606".repeat(5 - e[2])}</span></div>
  <b>${e[0]}</b><p>${esc(T(e[3]))}</p><div class="use"><strong>${L("bestOn")}</strong> ${esc(T(e[4]))}</div>
  ${us.length ? `<div class="ecWrap"><div class="usedList" aria-label="${L("enh_top")}">${us.slice(0, 5).map(chipU).join("")}</div>
  ${us.length > 5 ? `<button class="usedBtn" data-enhall="${ei}">${L("enh_all", { n: us.length })} \u2192</button>` : ""}</div>` : `<p style="font-size:12px">${L("enh_none")}</p>`}</div>`;
      }).join("") + `</div></div>`;
    }).join("");
  }
  var dlgE = document.getElementById("dlgE");
  function openEnh(ei) {
    ui.eIdx = ei;
    ui.eCat = "all";
    const e = enhancements_default[ei];
    document.getElementById("eBody").innerHTML = `<div class="dh"><div class="info"><h3 id="eName">${e[0]}</h3><div class="badges"><span class="chip">${L("slot_" + e[1])}</span><span class="stars">${"\u2605".repeat(e[2])}${"\u2606".repeat(5 - e[2])}</span></div></div><button class="x" id="eClose" aria-label="${L("close")}">\xD7</button></div>
  <div class="db"><p style="margin:0">${esc(T(e[3]))}</p>
  <div class="eCtl"><input type="search" id="eq" placeholder="${L("enh_flt")}" aria-label="${L("enh_flt")}"><div class="seg" id="eCatSeg"></div></div>
  <div class="sub" style="margin:0">${L("enh_modes")}</div><div id="eList" style="display:flex;flex-direction:column;gap:16px"></div></div>`;
    document.getElementById("eClose").onclick = () => dlgE.close();
    document.getElementById("eq").addEventListener("input", updEnh);
    updEnh();
    if (!dlgE.open) dlgE.showModal();
    dlgE.scrollTop = 0;
  }
  function updEnh() {
    const us = usersOf(enhancements_default[ui.eIdx]), q = nrm(document.getElementById("eq").value.trim());
    const cats = Object.keys(CATS).filter((k) => us.some((u) => u.c.cat === k));
    const sg = document.getElementById("eCatSeg");
    sg.innerHTML = [["all", L("all")], ...cats.map((k) => [k, catName(k)])].map(([v, l]) => `<button data-v="${v}" aria-pressed="${ui.eCat === v}">${l}</button>`).join("");
    sg.onclick = (ev) => {
      const b = ev.target.closest("button");
      if (!b) return;
      ui.eCat = b.dataset.v;
      updEnh();
    };
    document.getElementById("eList").innerHTML = cats.filter((k) => ui.eCat === "all" || k === ui.eCat).map((k) => {
      const xs = us.filter((u) => u.c.cat === k && (!q || nrm(u.c.name).includes(q)));
      return xs.length ? `<div class="eGrp"><h4><span class="dot" style="background:var(${CATS[k].c})"></span>${catName(k)} \xB7 ${xs.length}</h4><div class="usedList">${xs.map(chipU).join("")}</div></div>` : "";
    }).join("") || `<p class="npEmpty">${L("gnores")}</p>`;
  }
  dlgE.addEventListener("click", (e) => {
    if (e.target === dlgE) dlgE.close();
  });

  // src/render-all.js
  function renderAll() {
    renderStatic();
    renderModes();
    seg("segCat", Object.keys(CATS).map((k) => [k, catName(k)]), "cat", renderTiers);
    seg("segMode", [["geral", L("overall")], ["farm", "Farm"], ["solo", "Solo"], ["ultra", "Ultras"]], "mode", renderTiers);
    seg("bCat", [["all", L("all")], ...Object.keys(CATS).map((k) => [k, catName(k)])], "bcat", renderBuilder);
    seg("segAll", [["todas", L("all")], ...Object.keys(CATS).map((k) => [k, catName(k)])], "all", renderCards);
    renderTiers();
    renderAgenda();
    renderTeams();
    renderBuilder();
    renderFarms();
    renderCards();
    renderCompare();
    renderEnh();
    renderFeed();
    refreshNotif();
    if (dlg.open && ui.curClass != null) openClass(ui.curClass);
    if (dlgE.open && ui.eIdx != null) openEnh(ui.eIdx);
  }

  // src/events.js
  document.addEventListener("click", (e) => {
    const tb = e.target.closest("[data-team]");
    if (tb) {
      dlg.close();
      goTeam(tb.dataset.team);
      return;
    }
    const gt = e.target.closest("[data-goteam]");
    if (gt) {
      goTeam(gt.dataset.goteam);
      return;
    }
    const ac = e.target.closest("[data-addcmp]");
    if (ac) {
      addCompare(+ac.dataset.addcmp);
      dlg.close();
      renderCompare();
      show("comparar");
      return;
    }
    const cc = e.target.closest("[data-cmpclear]");
    if (cc) {
      st.cmp = (st.cmp || []).filter((_, k) => k !== +cc.dataset.cmpclear);
      save();
      renderCompare();
      return;
    }
    const eb = e.target.closest("[data-enhall]");
    if (eb) {
      openEnh(+eb.dataset.enhall);
      return;
    }
    const ow = e.target.closest("[data-own]");
    if (ow) {
      const n = ow.dataset.own, o = ownSet();
      o.has(n) ? o.delete(n) : o.add(n);
      st.own = [...o];
      save();
      renderBuilder();
      return;
    }
    if (e.target.closest("[data-bmark]")) {
      const o = ownSet();
      bList(nrm(document.getElementById("bq").value.trim())).forEach((c) => o.add(c.name));
      st.own = [...o];
      save();
      renderBuilder();
      return;
    }
    if (e.target.closest("[data-bclear]")) {
      st.own = [];
      save();
      renderBuilder();
      return;
    }
    const sc = e.target.closest("[data-sec]");
    if (sc) {
      closePanel();
      show(sc.dataset.sec);
      return;
    }
    const sb = e.target.closest("[data-sub]");
    if (sb) {
      show(sb.dataset.sub);
      return;
    }
    const gv = e.target.closest("[data-goview]");
    if (gv) {
      closePanel();
      show(gv.dataset.goview);
      return;
    }
    const gm = e.target.closest("[data-gomode]");
    if (gm) {
      st.mode = gm.dataset.gomode;
      save();
      renderAll();
      show("tier");
      return;
    }
    const panel = document.getElementById("notifPanel"), bell = document.getElementById("bell");
    if (e.target.closest("#bell")) {
      const open = panel.hidden;
      panel.hidden = !open;
      bell.setAttribute("aria-expanded", open);
      document.body.classList.toggle("np-open", open);
      return;
    }
    const al = e.target.closest("[data-alert]");
    if (al) {
      closePanel();
      goAlert(ui.ALERTS.find((a) => a.id === al.dataset.alert));
      return;
    }
    const dm = e.target.closest("[data-dismiss]");
    if (dm) {
      dismissAlert(dm.dataset.dismiss);
      return;
    }
    if (e.target.closest("[data-markall]")) {
      markAllRead();
      return;
    }
    if (e.target.closest("[data-seeall]")) {
      closePanel();
      show("novidades");
      return;
    }
    const nw = e.target.closest("[data-news]");
    if (nw) {
      closePanel();
      show("novidades");
      const el = document.getElementById("news-" + nw.dataset.news);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!panel.hidden && !e.target.closest("#notifPanel")) closePanel();
    const b = e.target.closest(".open");
    if (b && b.dataset.i != null) openClass(+b.dataset.i);
  });
  dlg.addEventListener("click", (e) => {
    if (e.target === dlg) dlg.close();
  });

  // src/features/search.js
  var gq = document.getElementById("gq");
  var gres = document.getElementById("gres");
  function runSearch() {
    const q = nrm(gq.value.trim());
    if (!q) {
      gres.hidden = true;
      return;
    }
    const hits = D.filter((c) => nrm(c.name).includes(q)).sort((a, b) => (nrm(a.name).startsWith(q) ? 0 : 1) - (nrm(b.name).startsWith(q) ? 0 : 1) || total(b) - total(a)).slice(0, 8);
    gres.innerHTML = hits.length ? hits.map((c) => `<button class="open gr" data-i="${idx(c)}">${sigil(c)}<span><b>${esc(c.name)}</b><small>${catName(c.cat)} \xB7 Farm ${c.farm} \xB7 Solo ${c.solo} \xB7 Ultra ${c.ultra}</small></span></button>`).join("") : `<div class="npEmpty">${L("gnores")}</div>`;
    gres.hidden = false;
  }
  document.getElementById("bq").addEventListener("input", renderBuilder);
  document.getElementById("enq").addEventListener("input", renderEnh);
  gq.addEventListener("input", runSearch);
  gq.addEventListener("focus", runSearch);
  gq.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const f = gres.querySelector(".gr");
      if (f) {
        openClass(+f.dataset.i);
        gres.hidden = true;
        gq.value = "";
        gq.blur();
      }
    }
    if (e.key === "Escape") {
      gres.hidden = true;
      gq.blur();
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".gsearch")) gres.hidden = true;
    else if (e.target.closest(".gr")) {
      gres.hidden = true;
      gq.value = "";
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !dlg.open) {
      e.preventDefault();
      gq.focus();
    }
  });
  document.getElementById("q").addEventListener("input", renderCards);

  // src/main.js
  seg("segLang", [["pt", "PT"], ["en", "EN"]], "lang", renderAll);
  renderAll();
  show(location.hash.slice(1) || "inicio");
  setTimeout(() => checkLive(true), 600);
  setInterval(() => {
    checkLive(false);
    renderAgenda();
  }, 6e4);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      checkLive(false);
      renderAgenda();
    }
  });
})();
//# sourceMappingURL=app.js.map
