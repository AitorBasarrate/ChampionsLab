// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 2,000,000 mega-aware battle simulations
// Date: 2026-04-13T15:35:08.489Z
// ═══════════════════════════════════════════════════════════════════════════════

export interface SimPokemonData {
  id: number;
  name: string;
  isMega: boolean;
  elo: number;
  winRate: number;
  appearances: number;
  wins: number;
  losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

export interface SimPairData {
  pokemon1: string;
  pokemon2: string;
  winRate: number;
  games: number;
}

export interface SimArchetypeData {
  name: string;
  elo: number;
  winRate: number;
  wins: number;
  losses: number;
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = {
  "3": {
    "id": 3,
    "name": "Venusaur",
    "isMega": false,
    "elo": 7969,
    "winRate": 50,
    "appearances": 202829,
    "wins": 101374,
    "losses": 101455,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Sneasler",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Arbok",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 54.9,
        "games": 14373
      },
      {
        "name": "Aegislash",
        "winRate": 52.5,
        "games": 24494
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 8002,
    "winRate": 49.7,
    "appearances": 160339,
    "wins": 79694,
    "losses": 80645,
    "bestPartners": [
      {
        "name": "Vanilluxe",
        "winRate": 55,
        "games": 4790
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.9,
        "games": 4868
      },
      {
        "name": "Sneasler",
        "winRate": 51.6,
        "games": 40754
      },
      {
        "name": "Pelipper",
        "winRate": 51.6,
        "games": 10153
      },
      {
        "name": "Tyranitar",
        "winRate": 51.5,
        "games": 10386
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 7979,
    "winRate": 50,
    "appearances": 10427,
    "wins": 5216,
    "losses": 5211,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 10427
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 10427
      },
      {
        "name": "Mow Rotom",
        "winRate": 50,
        "games": 10427
      },
      {
        "name": "Archaludon",
        "winRate": 50,
        "games": 10427
      },
      {
        "name": "Luxray",
        "winRate": 50,
        "games": 10427
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": 7912,
    "winRate": 47,
    "appearances": 9941,
    "wins": 4672,
    "losses": 5269,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 47,
        "games": 9941
      },
      {
        "name": "Incineroar",
        "winRate": 47,
        "games": 9941
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 47,
        "games": 9941
      },
      {
        "name": "Garchomp",
        "winRate": 47,
        "games": 9941
      },
      {
        "name": "Greninja",
        "winRate": 47,
        "games": 9941
      }
    ],
    "bestSets": []
  },
  "18": {
    "id": 18,
    "name": "Pidgeot",
    "isMega": false,
    "elo": 8006,
    "winRate": 49.8,
    "appearances": 21059,
    "wins": 10488,
    "losses": 10571,
    "bestPartners": [
      {
        "name": "Mega Ampharos",
        "winRate": 50.3,
        "games": 5031
      },
      {
        "name": "Arbok",
        "winRate": 50.3,
        "games": 5031
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 5031
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 15664
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 10426
      }
    ],
    "bestSets": []
  },
  "24": {
    "id": 24,
    "name": "Arbok",
    "isMega": false,
    "elo": 8011,
    "winRate": 49.5,
    "appearances": 252406,
    "wins": 124945,
    "losses": 127461,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Venusaur",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Primarina",
        "winRate": 60,
        "games": 4314
      },
      {
        "name": "Garchomp",
        "winRate": 60,
        "games": 4314
      },
      {
        "name": "Mega Greninja",
        "winRate": 53.7,
        "games": 14572
      }
    ],
    "bestSets": []
  },
  "25": {
    "id": 25,
    "name": "Pikachu",
    "isMega": false,
    "elo": 7963,
    "winRate": 51,
    "appearances": 16026,
    "wins": 8166,
    "losses": 7860,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 5167
      },
      {
        "name": "Incineroar",
        "winRate": 51,
        "games": 10581
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 10581
      },
      {
        "name": "Skarmory",
        "winRate": 51,
        "games": 5167
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51,
        "games": 5414
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 7928,
    "winRate": 49.7,
    "appearances": 16103,
    "wins": 8004,
    "losses": 8099,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5376
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.7,
        "games": 5376
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50.7,
        "games": 5376
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.7,
        "games": 5376
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 16103
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 7896,
    "winRate": 50.6,
    "appearances": 52360,
    "wins": 26485,
    "losses": 25875,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 52.7,
        "games": 5077
      },
      {
        "name": "Archaludon",
        "winRate": 51.9,
        "games": 10276
      },
      {
        "name": "Tauros",
        "winRate": 51.9,
        "games": 10276
      },
      {
        "name": "Wyrdeer",
        "winRate": 51.9,
        "games": 10276
      },
      {
        "name": "Dragapult",
        "winRate": 51.2,
        "games": 5221
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 7950,
    "winRate": 49.1,
    "appearances": 20749,
    "wins": 10196,
    "losses": 10553,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51.1,
        "games": 5172
      },
      {
        "name": "Whimsicott",
        "winRate": 51.1,
        "games": 5172
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51.1,
        "games": 5172
      },
      {
        "name": "Dragonite",
        "winRate": 51.1,
        "games": 5172
      },
      {
        "name": "Torkoal",
        "winRate": 50.2,
        "games": 5418
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": 7983,
    "winRate": 49.3,
    "appearances": 364554,
    "wins": 179869,
    "losses": 184685,
    "bestPartners": [
      {
        "name": "Mega Altaria",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Scizor",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Vanilluxe",
        "winRate": 55,
        "games": 4790
      },
      {
        "name": "Milotic",
        "winRate": 52.8,
        "games": 9970
      },
      {
        "name": "Azumarill",
        "winRate": 52.2,
        "games": 15047
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 7950,
    "winRate": 49.5,
    "appearances": 10504,
    "wins": 5199,
    "losses": 5305,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 10504
      },
      {
        "name": "Krookodile",
        "winRate": 49.5,
        "games": 10504
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.5,
        "games": 10504
      },
      {
        "name": "Crabominable",
        "winRate": 49.5,
        "games": 10504
      },
      {
        "name": "Aromatisse",
        "winRate": 49.5,
        "games": 10504
      }
    ],
    "bestSets": []
  },
  "68": {
    "id": 68,
    "name": "Machamp",
    "isMega": false,
    "elo": 7947,
    "winRate": 47.7,
    "appearances": 14976,
    "wins": 7144,
    "losses": 7832,
    "bestPartners": [
      {
        "name": "Mega Alakazam",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Azumarill",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Liepard",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Aromatisse",
        "winRate": 49.8,
        "games": 10412
      }
    ],
    "bestSets": []
  },
  "71": {
    "id": 71,
    "name": "Victreebel",
    "isMega": false,
    "elo": 8013,
    "winRate": 50.7,
    "appearances": 21283,
    "wins": 10780,
    "losses": 10503,
    "bestPartners": [
      {
        "name": "Simipour",
        "winRate": 50.7,
        "games": 10702
      },
      {
        "name": "Salazzle",
        "winRate": 50.7,
        "games": 10702
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.7,
        "games": 10702
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.7,
        "games": 10702
      },
      {
        "name": "Slowbro",
        "winRate": 50.7,
        "games": 10702
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 7990,
    "winRate": 51.7,
    "appearances": 125775,
    "wins": 65041,
    "losses": 60734,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 65,
        "games": 11744
      },
      {
        "name": "Hatterene",
        "winRate": 63.8,
        "games": 8100
      },
      {
        "name": "Torkoal",
        "winRate": 61.5,
        "games": 16635
      },
      {
        "name": "Drampa",
        "winRate": 59.7,
        "games": 17060
      },
      {
        "name": "Rhyperior",
        "winRate": 55.9,
        "games": 13776
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 7825,
    "winRate": 37.2,
    "appearances": 8258,
    "wins": 3070,
    "losses": 5188,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 37.2,
        "games": 8258
      },
      {
        "name": "Krookodile",
        "winRate": 37.2,
        "games": 8258
      },
      {
        "name": "Incineroar",
        "winRate": 37.2,
        "games": 8258
      },
      {
        "name": "Liepard",
        "winRate": 37.2,
        "games": 8258
      },
      {
        "name": "Umbreon",
        "winRate": 37.2,
        "games": 8258
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": 7975,
    "winRate": 49.4,
    "appearances": 10688,
    "wins": 5283,
    "losses": 5405,
    "bestPartners": [
      {
        "name": "Arbok",
        "winRate": 49.4,
        "games": 10688
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 10688
      },
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 10688
      },
      {
        "name": "Luxray",
        "winRate": 49.4,
        "games": 10688
      },
      {
        "name": "Wyrdeer",
        "winRate": 49.4,
        "games": 10688
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 7955,
    "winRate": 49,
    "appearances": 72129,
    "wins": 35364,
    "losses": 36765,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 51,
        "games": 15359
      },
      {
        "name": "Mega Emboar",
        "winRate": 51,
        "games": 5039
      },
      {
        "name": "Emboar",
        "winRate": 50.9,
        "games": 10320
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 20622
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 20622
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 8047,
    "winRate": 60.3,
    "appearances": 12685,
    "wins": 7644,
    "losses": 5041,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Archaludon",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Kingambit",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Tyranitar",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Luxray",
        "winRate": 60.3,
        "games": 12685
      }
    ],
    "bestSets": []
  },
  "128": {
    "id": 128,
    "name": "Tauros",
    "isMega": false,
    "elo": 8009,
    "winRate": 49.6,
    "appearances": 383872,
    "wins": 190326,
    "losses": 193546,
    "bestPartners": [
      {
        "name": "Mega Meowstic",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Drampa",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Mega Clefable",
        "winRate": 60.1,
        "games": 8790
      },
      {
        "name": "Basculegion-M",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Mega Froslass",
        "winRate": 59.1,
        "games": 4370
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": 7989,
    "winRate": 50.4,
    "appearances": 758514,
    "wins": 382426,
    "losses": 376088,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 63.6,
        "games": 3962
      },
      {
        "name": "Slurpuff",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Corviknight",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Archaludon",
        "winRate": 54.7,
        "games": 18723
      },
      {
        "name": "Mega Delphox",
        "winRate": 54.4,
        "games": 9849
      }
    ],
    "bestSets": []
  },
  "132": {
    "id": 132,
    "name": "Ditto",
    "isMega": false,
    "elo": 7984,
    "winRate": 49.8,
    "appearances": 15590,
    "wins": 7760,
    "losses": 7830,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 5333
      },
      {
        "name": "Meowstic-F",
        "winRate": 50.8,
        "games": 5333
      },
      {
        "name": "Froslass",
        "winRate": 50.8,
        "games": 5333
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.8,
        "games": 5333
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.5,
        "games": 10374
      }
    ],
    "bestSets": []
  },
  "134": {
    "id": 134,
    "name": "Vaporeon",
    "isMega": false,
    "elo": 7986,
    "winRate": 52.5,
    "appearances": 40138,
    "wins": 21058,
    "losses": 19080,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Aggron",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Wash Rotom",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Feraligatr",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Incineroar",
        "winRate": 69,
        "games": 3680
      }
    ],
    "bestSets": []
  },
  "135": {
    "id": 135,
    "name": "Jolteon",
    "isMega": false,
    "elo": 7941,
    "winRate": 49.8,
    "appearances": 15809,
    "wins": 7872,
    "losses": 7937,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.6,
        "games": 5343
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.6,
        "games": 5343
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10619
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.8,
        "games": 10533
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10533
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": 8010,
    "winRate": 50.4,
    "appearances": 15625,
    "wins": 7869,
    "losses": 7756,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5125
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5125
      },
      {
        "name": "Noivern",
        "winRate": 50.7,
        "games": 5125
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.7,
        "games": 5125
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.7,
        "games": 5125
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 8038,
    "winRate": 50.1,
    "appearances": 117531,
    "wins": 58834,
    "losses": 58697,
    "bestPartners": [
      {
        "name": "Stunfisk",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Mega Scovillain",
        "winRate": 53.3,
        "games": 9806
      },
      {
        "name": "Luxray",
        "winRate": 52.4,
        "games": 14941
      },
      {
        "name": "Empoleon",
        "winRate": 51.5,
        "games": 20123
      },
      {
        "name": "Mega Ampharos",
        "winRate": 51.2,
        "games": 5311
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 7954,
    "winRate": 54.4,
    "appearances": 36077,
    "wins": 19612,
    "losses": 16465,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 65,
        "games": 11744
      },
      {
        "name": "Slowbro",
        "winRate": 65,
        "games": 11744
      },
      {
        "name": "Drampa",
        "winRate": 64.8,
        "games": 11661
      },
      {
        "name": "Kingambit",
        "winRate": 62.2,
        "games": 16477
      },
      {
        "name": "Hatterene",
        "winRate": 60.6,
        "games": 12833
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": 7979,
    "winRate": 50.2,
    "appearances": 149711,
    "wins": 75181,
    "losses": 74530,
    "bestPartners": [
      {
        "name": "Mega Steelix",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Feraligatr",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Fan Rotom",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Quaquaval",
        "winRate": 53,
        "games": 4945
      },
      {
        "name": "Azumarill",
        "winRate": 52.2,
        "games": 15116
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": 7892,
    "winRate": 48,
    "appearances": 24676,
    "wins": 11837,
    "losses": 12839,
    "bestPartners": [
      {
        "name": "Clawitzer",
        "winRate": 50.5,
        "games": 5067
      },
      {
        "name": "Tsareena",
        "winRate": 50.5,
        "games": 5067
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5067
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.5,
        "games": 5067
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10051
      }
    ],
    "bestSets": []
  },
  "157": {
    "id": 157,
    "name": "Typhlosion",
    "isMega": false,
    "elo": 8001,
    "winRate": 47.9,
    "appearances": 15156,
    "wins": 7264,
    "losses": 7892,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5180
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5180
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.7,
        "games": 5180
      },
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 5180
      },
      {
        "name": "Pelipper",
        "winRate": 50.7,
        "games": 5180
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": 7987,
    "winRate": 53.6,
    "appearances": 29477,
    "wins": 15791,
    "losses": 13686,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Vaporeon",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Mega Venusaur",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Aggron",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Incineroar",
        "winRate": 53.9,
        "games": 19380
      }
    ],
    "bestSets": []
  },
  "168": {
    "id": 168,
    "name": "Ariados",
    "isMega": false,
    "elo": 7884,
    "winRate": 44.4,
    "appearances": 13983,
    "wins": 6207,
    "losses": 7776,
    "bestPartners": [
      {
        "name": "Mega Slowbro",
        "winRate": 51,
        "games": 5301
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 51,
        "games": 5301
      },
      {
        "name": "Crabominable",
        "winRate": 51,
        "games": 5301
      },
      {
        "name": "Arbok",
        "winRate": 51,
        "games": 5301
      },
      {
        "name": "Whimsicott",
        "winRate": 51,
        "games": 5301
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 7993,
    "winRate": 49.9,
    "appearances": 9844,
    "wins": 4913,
    "losses": 4931,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 9844
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.9,
        "games": 9844
      },
      {
        "name": "Paldean Tauros",
        "winRate": 49.9,
        "games": 9844
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.9,
        "games": 9844
      },
      {
        "name": "Tauros",
        "winRate": 49.9,
        "games": 9844
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 7979,
    "winRate": 52.7,
    "appearances": 159191,
    "wins": 83912,
    "losses": 75279,
    "bestPartners": [
      {
        "name": "Mega Meowstic",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Paldean Tauros",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Cofagrigus",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Sneasler",
        "winRate": 56.8,
        "games": 8953
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 8006,
    "winRate": 50.6,
    "appearances": 153275,
    "wins": 77628,
    "losses": 75647,
    "bestPartners": [
      {
        "name": "Mega Venusaur",
        "winRate": 52.5,
        "games": 5093
      },
      {
        "name": "Tyranitar",
        "winRate": 52.5,
        "games": 5093
      },
      {
        "name": "Feraligatr",
        "winRate": 52.5,
        "games": 5093
      },
      {
        "name": "Aggron",
        "winRate": 52.5,
        "games": 5093
      },
      {
        "name": "Mega Steelix",
        "winRate": 51.2,
        "games": 5235
      }
    ],
    "bestSets": []
  },
  "196": {
    "id": 196,
    "name": "Espeon",
    "isMega": false,
    "elo": 8004,
    "winRate": 45.1,
    "appearances": 23129,
    "wins": 10434,
    "losses": 12695,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.4,
        "games": 4892
      },
      {
        "name": "Ditto",
        "winRate": 50.3,
        "games": 5041
      },
      {
        "name": "Tauros",
        "winRate": 50.3,
        "games": 5041
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5041
      },
      {
        "name": "Luxray",
        "winRate": 50.3,
        "games": 5041
      }
    ],
    "bestSets": []
  },
  "197": {
    "id": 197,
    "name": "Umbreon",
    "isMega": false,
    "elo": 7952,
    "winRate": 46.7,
    "appearances": 47897,
    "wins": 22376,
    "losses": 25521,
    "bestPartners": [
      {
        "name": "Mega Chandelure",
        "winRate": 54,
        "games": 9712
      },
      {
        "name": "Azumarill",
        "winRate": 54,
        "games": 4899
      },
      {
        "name": "Abomasnow",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Primarina",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Hydreigon",
        "winRate": 52.5,
        "games": 10308
      }
    ],
    "bestSets": []
  },
  "199": {
    "id": 199,
    "name": "Slowking",
    "isMega": false,
    "elo": 8051,
    "winRate": 50.7,
    "appearances": 20852,
    "wins": 10568,
    "losses": 10284,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Froslass",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Mega Steelix",
        "winRate": 51.2,
        "games": 5235
      },
      {
        "name": "Milotic",
        "winRate": 51.2,
        "games": 5235
      },
      {
        "name": "Politoed",
        "winRate": 51.2,
        "games": 5235
      }
    ],
    "bestSets": []
  },
  "205": {
    "id": 205,
    "name": "Forretress",
    "isMega": false,
    "elo": 7888,
    "winRate": 47.1,
    "appearances": 193243,
    "wins": 90965,
    "losses": 102278,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 55.6,
        "games": 14046
      },
      {
        "name": "Archaludon",
        "winRate": 52.8,
        "games": 23807
      },
      {
        "name": "Primarina",
        "winRate": 52.2,
        "games": 5245
      },
      {
        "name": "Tsareena",
        "winRate": 52.2,
        "games": 5245
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 52.2,
        "games": 5245
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": 8019,
    "winRate": 48.7,
    "appearances": 75024,
    "wins": 36534,
    "losses": 38490,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 51.1,
        "games": 5067
      },
      {
        "name": "Krookodile",
        "winRate": 51.1,
        "games": 5067
      },
      {
        "name": "Simipour",
        "winRate": 50.8,
        "games": 10524
      },
      {
        "name": "Slowbro",
        "winRate": 50.8,
        "games": 10524
      },
      {
        "name": "Vaporeon",
        "winRate": 50.8,
        "games": 10524
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 7967,
    "winRate": 50.1,
    "appearances": 87300,
    "wins": 43762,
    "losses": 43538,
    "bestPartners": [
      {
        "name": "Mudsdale",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Whimsicott",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Milotic",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Arcanine",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Azumarill",
        "winRate": 54.9,
        "games": 9572
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 8053,
    "winRate": 60.2,
    "appearances": 8540,
    "wins": 5143,
    "losses": 3397,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 60.2,
        "games": 8540
      },
      {
        "name": "Wash Rotom",
        "winRate": 60.2,
        "games": 8540
      },
      {
        "name": "Kingambit",
        "winRate": 60.2,
        "games": 8540
      },
      {
        "name": "Archaludon",
        "winRate": 60.2,
        "games": 8540
      },
      {
        "name": "Wyrdeer",
        "winRate": 60.2,
        "games": 8540
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 7929,
    "winRate": 47.8,
    "appearances": 54949,
    "wins": 26239,
    "losses": 28710,
    "bestPartners": [
      {
        "name": "Pikachu",
        "winRate": 51,
        "games": 5167
      },
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 5167
      },
      {
        "name": "Araquanid",
        "winRate": 51,
        "games": 5167
      },
      {
        "name": "Mega Garchomp",
        "winRate": 50.7,
        "games": 5542
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 10135
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 7984,
    "winRate": 50.7,
    "appearances": 15601,
    "wins": 7916,
    "losses": 7685,
    "bestPartners": [
      {
        "name": "Basculegion-F",
        "winRate": 50.9,
        "games": 5146
      },
      {
        "name": "Tauros",
        "winRate": 50.9,
        "games": 5146
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.9,
        "games": 5146
      },
      {
        "name": "Dedenne",
        "winRate": 50.9,
        "games": 5146
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.9,
        "games": 5146
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 7996,
    "winRate": 53.6,
    "appearances": 136119,
    "wins": 72984,
    "losses": 63135,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Luxray",
        "winRate": 66.6,
        "games": 11640
      },
      {
        "name": "Mega Pinsir",
        "winRate": 66.1,
        "games": 3887
      },
      {
        "name": "Heracross",
        "winRate": 60.2,
        "games": 8540
      },
      {
        "name": "Archaludon",
        "winRate": 58.1,
        "games": 40104
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": 7978,
    "winRate": 51,
    "appearances": 237981,
    "wins": 121480,
    "losses": 116501,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Mega Floette",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 56.4,
        "games": 9354
      },
      {
        "name": "Krookodile",
        "winRate": 54.1,
        "games": 14586
      },
      {
        "name": "Mega Glalie",
        "winRate": 52.9,
        "games": 4868
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": 7905,
    "winRate": 49.2,
    "appearances": 45769,
    "wins": 22497,
    "losses": 23272,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 51.6,
        "games": 5073
      },
      {
        "name": "Kingambit",
        "winRate": 50.4,
        "games": 20726
      },
      {
        "name": "Ursaluna",
        "winRate": 50.3,
        "games": 5297
      },
      {
        "name": "Garganacl",
        "winRate": 50.3,
        "games": 5297
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 20477
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": 7968,
    "winRate": 47.6,
    "appearances": 18826,
    "wins": 8958,
    "losses": 9868,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.3,
        "games": 4702
      },
      {
        "name": "Whimsicott",
        "winRate": 55.3,
        "games": 4702
      },
      {
        "name": "Garchomp",
        "winRate": 52.5,
        "games": 9831
      },
      {
        "name": "Dragapult",
        "winRate": 52.5,
        "games": 9831
      },
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 5129
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": 7988,
    "winRate": 49.4,
    "appearances": 119524,
    "wins": 59053,
    "losses": 60471,
    "bestPartners": [
      {
        "name": "Vaporeon",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Mega Venusaur",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Feraligatr",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Wash Rotom",
        "winRate": 55.5,
        "games": 13787
      },
      {
        "name": "Incineroar",
        "winRate": 52.5,
        "games": 29385
      }
    ],
    "bestSets": []
  },
  "308": {
    "id": 308,
    "name": "Medicham",
    "isMega": false,
    "elo": 7874,
    "winRate": 44.4,
    "appearances": 9530,
    "wins": 4229,
    "losses": 5301,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 44.4,
        "games": 9530
      },
      {
        "name": "Aggron",
        "winRate": 44.4,
        "games": 9530
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 44.4,
        "games": 9530
      },
      {
        "name": "Tauros",
        "winRate": 44.4,
        "games": 9530
      },
      {
        "name": "Heliolisk",
        "winRate": 44.4,
        "games": 9530
      }
    ],
    "bestSets": []
  },
  "310": {
    "id": 310,
    "name": "Manectric",
    "isMega": false,
    "elo": 7924,
    "winRate": 50.8,
    "appearances": 10557,
    "wins": 5364,
    "losses": 5193,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10557
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 10557
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 10557
      },
      {
        "name": "Luxray",
        "winRate": 50.8,
        "games": 10557
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 10557
      }
    ],
    "bestSets": []
  },
  "319": {
    "id": 319,
    "name": "Sharpedo",
    "isMega": false,
    "elo": 7962,
    "winRate": 49.6,
    "appearances": 41200,
    "wins": 20435,
    "losses": 20765,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 52.1,
        "games": 5019
      },
      {
        "name": "Archaludon",
        "winRate": 52.1,
        "games": 5019
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 52.1,
        "games": 5019
      },
      {
        "name": "Krookodile",
        "winRate": 52.1,
        "games": 5019
      },
      {
        "name": "Hydreigon",
        "winRate": 52.1,
        "games": 5019
      }
    ],
    "bestSets": []
  },
  "323": {
    "id": 323,
    "name": "Camerupt",
    "isMega": false,
    "elo": 8012,
    "winRate": 49.1,
    "appearances": 30966,
    "wins": 15208,
    "losses": 15758,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 10534
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 10534
      },
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 10534
      },
      {
        "name": "Noivern",
        "winRate": 50.9,
        "games": 10534
      },
      {
        "name": "Abomasnow",
        "winRate": 50.9,
        "games": 10534
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 7964,
    "winRate": 50.9,
    "appearances": 184286,
    "wins": 93860,
    "losses": 90426,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 65,
        "games": 11744
      },
      {
        "name": "Drampa",
        "winRate": 63.8,
        "games": 11819
      },
      {
        "name": "Slowbro",
        "winRate": 61.5,
        "games": 16635
      },
      {
        "name": "Kingambit",
        "winRate": 54.5,
        "games": 37663
      },
      {
        "name": "Stunfisk",
        "winRate": 54.4,
        "games": 4848
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": 7976,
    "winRate": 49.9,
    "appearances": 62178,
    "wins": 31004,
    "losses": 31174,
    "bestPartners": [
      {
        "name": "Mega Steelix",
        "winRate": 51.2,
        "games": 5235
      },
      {
        "name": "Milotic",
        "winRate": 51.2,
        "games": 5235
      },
      {
        "name": "Politoed",
        "winRate": 51.2,
        "games": 5235
      },
      {
        "name": "Slowking",
        "winRate": 50.9,
        "games": 10458
      },
      {
        "name": "Lucario",
        "winRate": 50.9,
        "games": 10412
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 8052,
    "winRate": 50.6,
    "appearances": 77828,
    "wins": 39417,
    "losses": 38411,
    "bestPartners": [
      {
        "name": "Mudsdale",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Scizor",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Azumarill",
        "winRate": 55,
        "games": 9619
      },
      {
        "name": "Fan Rotom",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Arcanine",
        "winRate": 52.8,
        "games": 9970
      }
    ],
    "bestSets": []
  },
  "351": {
    "id": 351,
    "name": "Castform",
    "isMega": false,
    "elo": 7881,
    "winRate": 36.4,
    "appearances": 12343,
    "wins": 4493,
    "losses": 7850,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 44.9,
        "games": 4787
      },
      {
        "name": "Incineroar",
        "winRate": 44.9,
        "games": 4787
      },
      {
        "name": "Luxray",
        "winRate": 42.4,
        "games": 9116
      },
      {
        "name": "Gyarados",
        "winRate": 42.4,
        "games": 9116
      },
      {
        "name": "Alolan Raichu",
        "winRate": 39.6,
        "games": 4329
      }
    ],
    "bestSets": []
  },
  "354": {
    "id": 354,
    "name": "Banette",
    "isMega": false,
    "elo": 7940,
    "winRate": 42.7,
    "appearances": 32545,
    "wins": 13904,
    "losses": 18641,
    "bestPartners": [
      {
        "name": "Delphox",
        "winRate": 49.9,
        "games": 5427
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.9,
        "games": 5427
      },
      {
        "name": "Mega Lopunny",
        "winRate": 49.7,
        "games": 5151
      },
      {
        "name": "Cofagrigus",
        "winRate": 49.7,
        "games": 5151
      },
      {
        "name": "Luxray",
        "winRate": 49.7,
        "games": 5151
      }
    ],
    "bestSets": []
  },
  "358": {
    "id": 358,
    "name": "Chimecho",
    "isMega": false,
    "elo": 7921,
    "winRate": 49.8,
    "appearances": 10319,
    "wins": 5139,
    "losses": 5180,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 49.8,
        "games": 10319
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 49.8,
        "games": 10319
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10319
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49.8,
        "games": 10319
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 10319
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 8000,
    "winRate": 50.4,
    "appearances": 15598,
    "wins": 7862,
    "losses": 7736,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 10588
      },
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 10588
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 10588
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 10588
      },
      {
        "name": "Sneasler",
        "winRate": 50.6,
        "games": 10588
      }
    ],
    "bestSets": []
  },
  "362": {
    "id": 362,
    "name": "Glalie",
    "isMega": false,
    "elo": 7964,
    "winRate": 50.8,
    "appearances": 10855,
    "wins": 5516,
    "losses": 5339,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10855
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.8,
        "games": 10855
      },
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 10855
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.8,
        "games": 10855
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 10855
      }
    ],
    "bestSets": []
  },
  "389": {
    "id": 389,
    "name": "Torterra",
    "isMega": false,
    "elo": 7916,
    "winRate": 50.1,
    "appearances": 15482,
    "wins": 7761,
    "losses": 7721,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 51.1,
        "games": 5067
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.5,
        "games": 10078
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 50.5,
        "games": 10078
      },
      {
        "name": "Steelix",
        "winRate": 50.5,
        "games": 10078
      },
      {
        "name": "Garchomp",
        "winRate": 50.2,
        "games": 10471
      }
    ],
    "bestSets": []
  },
  "392": {
    "id": 392,
    "name": "Infernape",
    "isMega": false,
    "elo": 7907,
    "winRate": 48.5,
    "appearances": 15180,
    "wins": 7357,
    "losses": 7823,
    "bestPartners": [
      {
        "name": "Basculegion-F",
        "winRate": 50.6,
        "games": 5409
      },
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5409
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5409
      },
      {
        "name": "Zoroark",
        "winRate": 50.6,
        "games": 5409
      },
      {
        "name": "Tauros",
        "winRate": 50.6,
        "games": 5409
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 8024,
    "winRate": 50.8,
    "appearances": 148327,
    "wins": 75355,
    "losses": 72972,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Primarina",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 54.3,
        "games": 4830
      },
      {
        "name": "Stunfisk",
        "winRate": 54,
        "games": 14349
      },
      {
        "name": "Gourgeist",
        "winRate": 54,
        "games": 4967
      }
    ],
    "bestSets": []
  },
  "405": {
    "id": 405,
    "name": "Luxray",
    "isMega": false,
    "elo": 8020,
    "winRate": 49.5,
    "appearances": 341390,
    "wins": 169140,
    "losses": 172250,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 73,
        "games": 3557
      },
      {
        "name": "Tyranitar",
        "winRate": 66.6,
        "games": 11640
      },
      {
        "name": "Pinsir",
        "winRate": 60.3,
        "games": 12685
      },
      {
        "name": "Mega Clefable",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Basculegion-M",
        "winRate": 60,
        "games": 4430
      }
    ],
    "bestSets": []
  },
  "407": {
    "id": 407,
    "name": "Roserade",
    "isMega": false,
    "elo": 7975,
    "winRate": 50.8,
    "appearances": 15486,
    "wins": 7873,
    "losses": 7613,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Tsareena",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Serperior",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Arcanine",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Meowscarada",
        "winRate": 51.1,
        "games": 5229
      }
    ],
    "bestSets": []
  },
  "409": {
    "id": 409,
    "name": "Rampardos",
    "isMega": false,
    "elo": 7883,
    "winRate": 46.2,
    "appearances": 14556,
    "wins": 6728,
    "losses": 7828,
    "bestPartners": [
      {
        "name": "Fan Rotom",
        "winRate": 50.6,
        "games": 5048
      },
      {
        "name": "Mow Rotom",
        "winRate": 50.6,
        "games": 5048
      },
      {
        "name": "Decidueye",
        "winRate": 50.6,
        "games": 5048
      },
      {
        "name": "Whimsicott",
        "winRate": 48.9,
        "games": 10208
      },
      {
        "name": "Toxicroak",
        "winRate": 47.2,
        "games": 5160
      }
    ],
    "bestSets": []
  },
  "411": {
    "id": 411,
    "name": "Bastiodon",
    "isMega": false,
    "elo": 7947,
    "winRate": 49.1,
    "appearances": 60338,
    "wins": 29614,
    "losses": 30724,
    "bestPartners": [
      {
        "name": "Mega Altaria",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.7,
        "games": 35262
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 35279
      },
      {
        "name": "Dragonite",
        "winRate": 50.1,
        "games": 10238
      },
      {
        "name": "Fan Rotom",
        "winRate": 49.8,
        "games": 5199
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": 7977,
    "winRate": 47.9,
    "appearances": 15035,
    "wins": 7197,
    "losses": 7838,
    "bestPartners": [
      {
        "name": "Garbodor",
        "winRate": 49.9,
        "games": 5126
      },
      {
        "name": "Greninja",
        "winRate": 49.9,
        "games": 5126
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 49.9,
        "games": 5126
      },
      {
        "name": "Umbreon",
        "winRate": 49.9,
        "games": 5126
      },
      {
        "name": "Mega Audino",
        "winRate": 49.7,
        "games": 5328
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 7983,
    "winRate": 50,
    "appearances": 1627282,
    "wins": 814431,
    "losses": 812851,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Simipour",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Tsareena",
        "winRate": 60.8,
        "games": 8438
      },
      {
        "name": "Primarina",
        "winRate": 60,
        "games": 4314
      },
      {
        "name": "Arbok",
        "winRate": 60,
        "games": 4314
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": 7969,
    "winRate": 49.5,
    "appearances": 25429,
    "wins": 12592,
    "losses": 12837,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 10412
      },
      {
        "name": "Dragonite",
        "winRate": 50.9,
        "games": 10412
      },
      {
        "name": "Altaria",
        "winRate": 50.9,
        "games": 10412
      },
      {
        "name": "Noivern",
        "winRate": 50.9,
        "games": 10412
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 15606
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 7976,
    "winRate": 50.4,
    "appearances": 15723,
    "wins": 7920,
    "losses": 7803,
    "bestPartners": [
      {
        "name": "Simipour",
        "winRate": 51.1,
        "games": 5298
      },
      {
        "name": "Gyarados",
        "winRate": 51.1,
        "games": 5298
      },
      {
        "name": "Volcarona",
        "winRate": 51.1,
        "games": 5298
      },
      {
        "name": "Palafin",
        "winRate": 50.9,
        "games": 10397
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 10397
      }
    ],
    "bestSets": []
  },
  "454": {
    "id": 454,
    "name": "Toxicroak",
    "isMega": false,
    "elo": 7885,
    "winRate": 44.5,
    "appearances": 19166,
    "wins": 8525,
    "losses": 10641,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.2,
        "games": 5120
      },
      {
        "name": "Kingambit",
        "winRate": 50.2,
        "games": 5120
      },
      {
        "name": "Archaludon",
        "winRate": 50.2,
        "games": 5120
      },
      {
        "name": "Wyrdeer",
        "winRate": 48.8,
        "games": 10240
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 48.8,
        "games": 10240
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 8005,
    "winRate": 51,
    "appearances": 56105,
    "wins": 28592,
    "losses": 27513,
    "bestPartners": [
      {
        "name": "Mega Chandelure",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Krookodile",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Umbreon",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Primarina",
        "winRate": 54,
        "games": 4813
      },
      {
        "name": "Scizor",
        "winRate": 53.8,
        "games": 4945
      }
    ],
    "bestSets": []
  },
  "461": {
    "id": 461,
    "name": "Weavile",
    "isMega": false,
    "elo": 7982,
    "winRate": 50.3,
    "appearances": 26507,
    "wins": 13321,
    "losses": 13186,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Liepard",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.9,
        "games": 10597
      },
      {
        "name": "Arbok",
        "winRate": 50.5,
        "games": 5223
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5223
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 7936,
    "winRate": 50.5,
    "appearances": 180067,
    "wins": 90871,
    "losses": 89196,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 60.6,
        "games": 8377
      },
      {
        "name": "Slowbro",
        "winRate": 55.9,
        "games": 13776
      },
      {
        "name": "Tauros",
        "winRate": 54.3,
        "games": 4830
      },
      {
        "name": "Stunfisk",
        "winRate": 54.3,
        "games": 4830
      },
      {
        "name": "Drampa",
        "winRate": 54.1,
        "games": 28669
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 7961,
    "winRate": 50,
    "appearances": 15979,
    "wins": 7996,
    "losses": 7983,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 50.2,
        "games": 5418
      },
      {
        "name": "Ninetales",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Scovillain",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Venusaur",
        "winRate": 50.1,
        "games": 10785
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 7916,
    "winRate": 50.3,
    "appearances": 15698,
    "wins": 7891,
    "losses": 7807,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 5419
      },
      {
        "name": "Arcanine",
        "winRate": 51,
        "games": 5419
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 10492
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.4,
        "games": 10625
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 50.4,
        "games": 10625
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 7987,
    "winRate": 48.1,
    "appearances": 14357,
    "wins": 6904,
    "losses": 7453,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Incineroar",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Wash Rotom",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Azumarill",
        "winRate": 54.9,
        "games": 4868
      },
      {
        "name": "Primarina",
        "winRate": 54.9,
        "games": 4868
      }
    ],
    "bestSets": []
  },
  "473": {
    "id": 473,
    "name": "Mamoswine",
    "isMega": false,
    "elo": 7935,
    "winRate": 50.3,
    "appearances": 21071,
    "wins": 10589,
    "losses": 10482,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 10273
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Goodra",
        "winRate": 50.5,
        "games": 15689
      },
      {
        "name": "Skeledirge",
        "winRate": 50.5,
        "games": 10564
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": 7919,
    "winRate": 44.3,
    "appearances": 9487,
    "wins": 4201,
    "losses": 5286,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 44.3,
        "games": 9487
      },
      {
        "name": "Kingambit",
        "winRate": 44.3,
        "games": 9487
      },
      {
        "name": "Bastiodon",
        "winRate": 44.3,
        "games": 9487
      },
      {
        "name": "Aggron",
        "winRate": 44.3,
        "games": 9487
      },
      {
        "name": "Steelix",
        "winRate": 44.3,
        "games": 9487
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 7993,
    "winRate": 50.2,
    "appearances": 47400,
    "wins": 23814,
    "losses": 23586,
    "bestPartners": [
      {
        "name": "Diggersby",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Samurott",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Wash Rotom",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Slowking",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Flapple",
        "winRate": 51.4,
        "games": 5253
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 7926,
    "winRate": 48,
    "appearances": 24383,
    "wins": 11711,
    "losses": 12672,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 51.2,
        "games": 5116
      },
      {
        "name": "Forretress",
        "winRate": 51.2,
        "games": 5116
      },
      {
        "name": "Tauros",
        "winRate": 51.2,
        "games": 5116
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.6,
        "games": 10159
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 15197
      }
    ],
    "bestSets": []
  },
  "497": {
    "id": 497,
    "name": "Serperior",
    "isMega": false,
    "elo": 7949,
    "winRate": 49.6,
    "appearances": 56958,
    "wins": 28249,
    "losses": 28709,
    "bestPartners": [
      {
        "name": "Mega Aerodactyl",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Luxray",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Wash Rotom",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Tsareena",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Roserade",
        "winRate": 51.1,
        "games": 5229
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 7905,
    "winRate": 50.6,
    "appearances": 15428,
    "wins": 7810,
    "losses": 7618,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 10320
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 10320
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.9,
        "games": 10320
      },
      {
        "name": "Starmie",
        "winRate": 50.9,
        "games": 10320
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.9,
        "games": 10320
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 8018,
    "winRate": 51.1,
    "appearances": 36352,
    "wins": 18558,
    "losses": 17794,
    "bestPartners": [
      {
        "name": "Gourgeist",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Simipour",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Empoleon",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.7,
        "games": 15079
      }
    ],
    "bestSets": []
  },
  "505": {
    "id": 505,
    "name": "Watchog",
    "isMega": false,
    "elo": 7878,
    "winRate": 35.8,
    "appearances": 12429,
    "wins": 4452,
    "losses": 7977,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 44.8,
        "games": 4868
      },
      {
        "name": "Wyrdeer",
        "winRate": 44.8,
        "games": 4868
      },
      {
        "name": "Incineroar",
        "winRate": 42.5,
        "games": 9280
      },
      {
        "name": "Gyarados",
        "winRate": 42.5,
        "games": 9280
      },
      {
        "name": "Tauros",
        "winRate": 42.5,
        "games": 9280
      }
    ],
    "bestSets": []
  },
  "510": {
    "id": 510,
    "name": "Liepard",
    "isMega": false,
    "elo": 7899,
    "winRate": 43.6,
    "appearances": 87296,
    "wins": 38050,
    "losses": 49246,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Weavile",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Garbodor",
        "winRate": 50.9,
        "games": 5273
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 5273
      }
    ],
    "bestSets": []
  },
  "512": {
    "id": 512,
    "name": "Simisage",
    "isMega": false,
    "elo": 8025,
    "winRate": 50,
    "appearances": 73022,
    "wins": 36518,
    "losses": 36504,
    "bestPartners": [
      {
        "name": "Mega Aerodactyl",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Mow Rotom",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Wash Rotom",
        "winRate": 51.2,
        "games": 5122
      },
      {
        "name": "Clawitzer",
        "winRate": 51.1,
        "games": 5363
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 51.1,
        "games": 5175
      }
    ],
    "bestSets": []
  },
  "514": {
    "id": 514,
    "name": "Simisear",
    "isMega": false,
    "elo": 7998,
    "winRate": 48.3,
    "appearances": 15263,
    "wins": 7379,
    "losses": 7884,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 10630
      },
      {
        "name": "Whimsicott",
        "winRate": 51,
        "games": 5277
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51,
        "games": 5277
      },
      {
        "name": "Dragonite",
        "winRate": 51,
        "games": 5277
      },
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 5277
      }
    ],
    "bestSets": []
  },
  "516": {
    "id": 516,
    "name": "Simipour",
    "isMega": false,
    "elo": 7926,
    "winRate": 47.3,
    "appearances": 110256,
    "wins": 52149,
    "losses": 58107,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Mega Gyarados",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Archaludon",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Garchomp",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Mega Floette",
        "winRate": 63.2,
        "games": 4040
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": 7928,
    "winRate": 50,
    "appearances": 334393,
    "wins": 167091,
    "losses": 167302,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 52.7,
        "games": 20086
      },
      {
        "name": "Mega Gengar",
        "winRate": 51.3,
        "games": 40969
      },
      {
        "name": "Mega Dragonite",
        "winRate": 51,
        "games": 36167
      },
      {
        "name": "Pelipper",
        "winRate": 50.7,
        "games": 10314
      },
      {
        "name": "Dragonite",
        "winRate": 50.7,
        "games": 10314
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": 7960,
    "winRate": 49.7,
    "appearances": 25589,
    "wins": 12720,
    "losses": 12869,
    "bestPartners": [
      {
        "name": "Cofagrigus",
        "winRate": 50.8,
        "games": 10346
      },
      {
        "name": "Arbok",
        "winRate": 50.8,
        "games": 10346
      },
      {
        "name": "Reuniclus",
        "winRate": 50.8,
        "games": 10346
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.8,
        "games": 10346
      },
      {
        "name": "Luxray",
        "winRate": 50.8,
        "games": 5306
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 7956,
    "winRate": 47.7,
    "appearances": 34561,
    "wins": 16479,
    "losses": 18082,
    "bestPartners": [
      {
        "name": "Mr. Rime",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Stunfisk",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Torkoal",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Garchomp",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.8,
        "games": 10003
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 8001,
    "winRate": 50.2,
    "appearances": 1025871,
    "wins": 515424,
    "losses": 510447,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Luxray",
        "winRate": 55.9,
        "games": 13984
      },
      {
        "name": "Sableye",
        "winRate": 55.3,
        "games": 4702
      },
      {
        "name": "Armarouge",
        "winRate": 55.1,
        "games": 4800
      },
      {
        "name": "Mudsdale",
        "winRate": 54.3,
        "games": 9752
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": 7963,
    "winRate": 49,
    "appearances": 372391,
    "wins": 182295,
    "losses": 190096,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 56.2,
        "games": 9125
      },
      {
        "name": "Sneasler",
        "winRate": 55.8,
        "games": 14017
      },
      {
        "name": "Dragapult",
        "winRate": 55.5,
        "games": 14333
      },
      {
        "name": "Primarina",
        "winRate": 55.1,
        "games": 14372
      }
    ],
    "bestSets": []
  },
  "563": {
    "id": 563,
    "name": "Cofagrigus",
    "isMega": false,
    "elo": 7965,
    "winRate": 51.7,
    "appearances": 40137,
    "wins": 20749,
    "losses": 19388,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Wyrdeer",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Azumarill",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Kingambit",
        "winRate": 56.3,
        "games": 9079
      },
      {
        "name": "Aromatisse",
        "winRate": 56.3,
        "games": 9079
      }
    ],
    "bestSets": []
  },
  "569": {
    "id": 569,
    "name": "Garbodor",
    "isMega": false,
    "elo": 7952,
    "winRate": 50.4,
    "appearances": 15558,
    "wins": 7844,
    "losses": 7714,
    "bestPartners": [
      {
        "name": "Liepard",
        "winRate": 50.9,
        "games": 5273
      },
      {
        "name": "Tauros",
        "winRate": 50.9,
        "games": 5273
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 5273
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.7,
        "games": 10432
      },
      {
        "name": "Greninja",
        "winRate": 50.4,
        "games": 15558
      }
    ],
    "bestSets": []
  },
  "571": {
    "id": 571,
    "name": "Zoroark",
    "isMega": false,
    "elo": 7960,
    "winRate": 50,
    "appearances": 25644,
    "wins": 12821,
    "losses": 12823,
    "bestPartners": [
      {
        "name": "Pangoro",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Farigiraf",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Mega Gengar",
        "winRate": 52.4,
        "games": 10045
      }
    ],
    "bestSets": []
  },
  "579": {
    "id": 579,
    "name": "Reuniclus",
    "isMega": false,
    "elo": 7939,
    "winRate": 50.9,
    "appearances": 15412,
    "wins": 7840,
    "losses": 7572,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 51,
        "games": 5066
      },
      {
        "name": "Cofagrigus",
        "winRate": 50.9,
        "games": 15412
      },
      {
        "name": "Arbok",
        "winRate": 50.9,
        "games": 15412
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 15412
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.9,
        "games": 15412
      }
    ],
    "bestSets": []
  },
  "584": {
    "id": 584,
    "name": "Vanilluxe",
    "isMega": false,
    "elo": 7950,
    "winRate": 50.4,
    "appearances": 14920,
    "wins": 7516,
    "losses": 7404,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 55,
        "games": 4790
      },
      {
        "name": "Garchomp",
        "winRate": 55,
        "games": 4790
      },
      {
        "name": "Charizard",
        "winRate": 55,
        "games": 4790
      },
      {
        "name": "Gyarados",
        "winRate": 53,
        "games": 10128
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 51.1,
        "games": 5338
      }
    ],
    "bestSets": []
  },
  "587": {
    "id": 587,
    "name": "Emolga",
    "isMega": false,
    "elo": 7988,
    "winRate": 48.1,
    "appearances": 70230,
    "wins": 33766,
    "losses": 36464,
    "bestPartners": [
      {
        "name": "Orthworm",
        "winRate": 50.8,
        "games": 5191
      },
      {
        "name": "Mega Aggron",
        "winRate": 50.8,
        "games": 5249
      },
      {
        "name": "Mega Emboar",
        "winRate": 50.7,
        "games": 5319
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.7,
        "games": 5319
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 5319
      }
    ],
    "bestSets": []
  },
  "609": {
    "id": 609,
    "name": "Chandelure",
    "isMega": false,
    "elo": 7950,
    "winRate": 50.6,
    "appearances": 10044,
    "wins": 5085,
    "losses": 4959,
    "bestPartners": [
      {
        "name": "Liepard",
        "winRate": 50.6,
        "games": 10044
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.6,
        "games": 10044
      },
      {
        "name": "Tauros",
        "winRate": 50.6,
        "games": 10044
      },
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 10044
      },
      {
        "name": "Azumarill",
        "winRate": 50.6,
        "games": 10044
      }
    ],
    "bestSets": []
  },
  "614": {
    "id": 614,
    "name": "Beartic",
    "isMega": false,
    "elo": 7995,
    "winRate": 49.8,
    "appearances": 15448,
    "wins": 7693,
    "losses": 7755,
    "bestPartners": [
      {
        "name": "Simisear",
        "winRate": 50.9,
        "games": 5353
      },
      {
        "name": "Sneasler",
        "winRate": 50.9,
        "games": 10522
      },
      {
        "name": "Arcanine",
        "winRate": 50.9,
        "games": 5169
      },
      {
        "name": "Garchomp",
        "winRate": 50.9,
        "games": 5169
      },
      {
        "name": "Charizard",
        "winRate": 50.9,
        "games": 5169
      }
    ],
    "bestSets": []
  },
  "618": {
    "id": 618,
    "name": "Stunfisk",
    "isMega": false,
    "elo": 8016,
    "winRate": 52.6,
    "appearances": 39273,
    "wins": 20660,
    "losses": 18613,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Aerodactyl",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Archaludon",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Mr. Rime",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Torkoal",
        "winRate": 54.4,
        "games": 4848
      }
    ],
    "bestSets": []
  },
  "623": {
    "id": 623,
    "name": "Golurk",
    "isMega": false,
    "elo": 7895,
    "winRate": 41.1,
    "appearances": 17763,
    "wins": 7307,
    "losses": 10456,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 48.7,
        "games": 5239
      },
      {
        "name": "Heat Rotom",
        "winRate": 48.7,
        "games": 5239
      },
      {
        "name": "Arcanine",
        "winRate": 48.7,
        "games": 5239
      },
      {
        "name": "Mega Pidgeot",
        "winRate": 47.2,
        "games": 10030
      },
      {
        "name": "Tinkaton",
        "winRate": 47.2,
        "games": 10030
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 7998,
    "winRate": 51.9,
    "appearances": 65702,
    "wins": 34074,
    "losses": 31628,
    "bestPartners": [
      {
        "name": "Mega Lucario",
        "winRate": 55.8,
        "games": 4652
      },
      {
        "name": "Mega Skarmory",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Sneasler",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Drampa",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Tyranitar",
        "winRate": 54.7,
        "games": 4810
      }
    ],
    "bestSets": []
  },
  "637": {
    "id": 637,
    "name": "Volcarona",
    "isMega": false,
    "elo": 7942,
    "winRate": 50.6,
    "appearances": 20955,
    "wins": 10597,
    "losses": 10358,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 51.7,
        "games": 5021
      },
      {
        "name": "Empoleon",
        "winRate": 51.7,
        "games": 5021
      },
      {
        "name": "Rhyperior",
        "winRate": 51.7,
        "games": 5021
      },
      {
        "name": "Luxray",
        "winRate": 51.7,
        "games": 5021
      },
      {
        "name": "Hippowdon",
        "winRate": 51.1,
        "games": 5298
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 7961,
    "winRate": 49.7,
    "appearances": 16115,
    "wins": 8014,
    "losses": 8101,
    "bestPartners": [
      {
        "name": "Volcarona",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Kommo-o",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.4,
        "games": 5350
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 7996,
    "winRate": 47.6,
    "appearances": 29165,
    "wins": 13882,
    "losses": 15283,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 53.1,
        "games": 9903
      },
      {
        "name": "Drampa",
        "winRate": 53.1,
        "games": 9903
      },
      {
        "name": "Azumarill",
        "winRate": 53.1,
        "games": 9903
      },
      {
        "name": "Whimsicott",
        "winRate": 53.1,
        "games": 9903
      },
      {
        "name": "Gyarados",
        "winRate": 51.9,
        "games": 15330
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 8003,
    "winRate": 50.2,
    "appearances": 212105,
    "wins": 106530,
    "losses": 105575,
    "bestPartners": [
      {
        "name": "Mega Froslass",
        "winRate": 59.1,
        "games": 4370
      },
      {
        "name": "Mega Lucario",
        "winRate": 54.9,
        "games": 9523
      },
      {
        "name": "Tauros",
        "winRate": 52.6,
        "games": 25402
      },
      {
        "name": "Mudsdale",
        "winRate": 52.2,
        "games": 5137
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.2,
        "games": 5137
      }
    ],
    "bestSets": []
  },
  "660": {
    "id": 660,
    "name": "Diggersby",
    "isMega": false,
    "elo": 8022,
    "winRate": 50.9,
    "appearances": 15535,
    "wins": 7914,
    "losses": 7621,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Froslass",
        "winRate": 51.4,
        "games": 5131
      },
      {
        "name": "Slowking",
        "winRate": 51,
        "games": 10354
      },
      {
        "name": "Samurott",
        "winRate": 51,
        "games": 10354
      },
      {
        "name": "Pelipper",
        "winRate": 51,
        "games": 10354
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 7879,
    "winRate": 47.7,
    "appearances": 24788,
    "wins": 11830,
    "losses": 12958,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 5064
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 5064
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 5064
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 50.3,
        "games": 5064
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5064
      }
    ],
    "bestSets": []
  },
  "666": {
    "id": 666,
    "name": "Vivillon",
    "isMega": false,
    "elo": 7950,
    "winRate": 47.6,
    "appearances": 14851,
    "wins": 7063,
    "losses": 7788,
    "bestPartners": [
      {
        "name": "Lycanroc",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Basculegion-M",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Fan Rotom",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Decidueye",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Pelipper",
        "winRate": 50.7,
        "games": 5177
      }
    ],
    "bestSets": []
  },
  "670": {
    "id": 670,
    "name": "Floette",
    "isMega": false,
    "elo": 7949,
    "winRate": 49.8,
    "appearances": 5266,
    "wins": 2622,
    "losses": 2644,
    "bestPartners": [
      {
        "name": "Espeon",
        "winRate": 49.8,
        "games": 5266
      },
      {
        "name": "Aromatisse",
        "winRate": 49.8,
        "games": 5266
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 5266
      },
      {
        "name": "Machamp",
        "winRate": 49.8,
        "games": 5266
      },
      {
        "name": "Pangoro",
        "winRate": 49.8,
        "games": 5266
      }
    ],
    "bestSets": []
  },
  "671": {
    "id": 671,
    "name": "Florges",
    "isMega": false,
    "elo": 7907,
    "winRate": 50.6,
    "appearances": 15079,
    "wins": 7629,
    "losses": 7450,
    "bestPartners": [
      {
        "name": "Basculegion-F",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Corviknight",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Kingambit",
        "winRate": 50.9,
        "games": 10036
      },
      {
        "name": "Stunfisk",
        "winRate": 50.8,
        "games": 10176
      }
    ],
    "bestSets": []
  },
  "675": {
    "id": 675,
    "name": "Pangoro",
    "isMega": false,
    "elo": 7994,
    "winRate": 51.5,
    "appearances": 15313,
    "wins": 7893,
    "losses": 7420,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Zoroark",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Farigiraf",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Tyranitar",
        "winRate": 52.5,
        "games": 10047
      }
    ],
    "bestSets": []
  },
  "676": {
    "id": 676,
    "name": "Furfrou",
    "isMega": false,
    "elo": 7968,
    "winRate": 50.4,
    "appearances": 16051,
    "wins": 8083,
    "losses": 7968,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 51.2,
        "games": 5292
      },
      {
        "name": "Tauros",
        "winRate": 51.2,
        "games": 5292
      },
      {
        "name": "Arcanine",
        "winRate": 51.2,
        "games": 5292
      },
      {
        "name": "Krookodile",
        "winRate": 50.8,
        "games": 10740
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 16051
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic-M",
    "isMega": false,
    "elo": 7951,
    "winRate": 39.4,
    "appearances": 20773,
    "wins": 8193,
    "losses": 12580,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 53,
        "games": 10068
      },
      {
        "name": "Paldean Tauros",
        "winRate": 53,
        "games": 10068
      },
      {
        "name": "Kingambit",
        "winRate": 53,
        "games": 10068
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 53,
        "games": 10068
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 53,
        "games": 10068
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": 7975,
    "winRate": 50.2,
    "appearances": 274567,
    "wins": 137890,
    "losses": 136677,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Arbok",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Sneasler",
        "winRate": 65.3,
        "games": 7813
      },
      {
        "name": "Pelipper",
        "winRate": 63.8,
        "games": 4021
      }
    ],
    "bestSets": []
  },
  "683": {
    "id": 683,
    "name": "Aromatisse",
    "isMega": false,
    "elo": 7975,
    "winRate": 49.2,
    "appearances": 44418,
    "wins": 21869,
    "losses": 22549,
    "bestPartners": [
      {
        "name": "Wyrdeer",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Azumarill",
        "winRate": 56.5,
        "games": 9057
      },
      {
        "name": "Kingambit",
        "winRate": 56.3,
        "games": 9079
      },
      {
        "name": "Cofagrigus",
        "winRate": 56.3,
        "games": 9079
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.9,
        "games": 5146
      }
    ],
    "bestSets": []
  },
  "685": {
    "id": 685,
    "name": "Slurpuff",
    "isMega": false,
    "elo": 7997,
    "winRate": 52.4,
    "appearances": 14963,
    "wins": 7844,
    "losses": 7119,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Salazzle",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Corviknight",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Archaludon",
        "winRate": 53.5,
        "games": 9599
      },
      {
        "name": "Kingambit",
        "winRate": 53.5,
        "games": 9599
      }
    ],
    "bestSets": []
  },
  "693": {
    "id": 693,
    "name": "Clawitzer",
    "isMega": false,
    "elo": 7973,
    "winRate": 50.7,
    "appearances": 25935,
    "wins": 13162,
    "losses": 12773,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 51.1,
        "games": 5363
      },
      {
        "name": "Simisage",
        "winRate": 51.1,
        "games": 5363
      },
      {
        "name": "Whimsicott",
        "winRate": 50.9,
        "games": 10462
      },
      {
        "name": "Gourgeist",
        "winRate": 50.8,
        "games": 5150
      },
      {
        "name": "Luxray",
        "winRate": 50.8,
        "games": 5150
      }
    ],
    "bestSets": []
  },
  "695": {
    "id": 695,
    "name": "Heliolisk",
    "isMega": false,
    "elo": 7927,
    "winRate": 47,
    "appearances": 29437,
    "wins": 13850,
    "losses": 15587,
    "bestPartners": [
      {
        "name": "Basculegion-F",
        "winRate": 50.4,
        "games": 10402
      },
      {
        "name": "Slurpuff",
        "winRate": 50.4,
        "games": 5364
      },
      {
        "name": "Toxapex",
        "winRate": 50.4,
        "games": 5364
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.4,
        "games": 5364
      },
      {
        "name": "Scizor",
        "winRate": 50.4,
        "games": 5364
      }
    ],
    "bestSets": []
  },
  "697": {
    "id": 697,
    "name": "Tyrantrum",
    "isMega": false,
    "elo": 7901,
    "winRate": 46.6,
    "appearances": 14358,
    "wins": 6698,
    "losses": 7660,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Vaporeon",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Palafin",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Pelipper",
        "winRate": 52,
        "games": 10461
      },
      {
        "name": "Alolan Raichu",
        "winRate": 51.3,
        "games": 5381
      }
    ],
    "bestSets": []
  },
  "699": {
    "id": 699,
    "name": "Aurorus",
    "isMega": false,
    "elo": 7865,
    "winRate": 46.4,
    "appearances": 14856,
    "wins": 6886,
    "losses": 7970,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5298
      },
      {
        "name": "Sneasler",
        "winRate": 50.3,
        "games": 5298
      },
      {
        "name": "Emolga",
        "winRate": 47.8,
        "games": 10075
      },
      {
        "name": "Simisage",
        "winRate": 46.9,
        "games": 10079
      },
      {
        "name": "Whimsicott",
        "winRate": 46.4,
        "games": 14856
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 7994,
    "winRate": 49.5,
    "appearances": 26378,
    "wins": 13069,
    "losses": 13309,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 49.8,
        "games": 10524
      },
      {
        "name": "Kingambit",
        "winRate": 49.7,
        "games": 5192
      },
      {
        "name": "Hydreigon",
        "winRate": 49.6,
        "games": 5183
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 15649
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 49.5,
        "games": 10729
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": 7909,
    "winRate": 47.4,
    "appearances": 24946,
    "wins": 11818,
    "losses": 13128,
    "bestPartners": [
      {
        "name": "Mega Manectric",
        "winRate": 49.9,
        "games": 5105
      },
      {
        "name": "Tauros",
        "winRate": 49.9,
        "games": 5105
      },
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 5105
      },
      {
        "name": "Tsareena",
        "winRate": 49.9,
        "games": 5105
      },
      {
        "name": "Krookodile",
        "winRate": 49.9,
        "games": 5105
      }
    ],
    "bestSets": []
  },
  "702": {
    "id": 702,
    "name": "Dedenne",
    "isMega": false,
    "elo": 7819,
    "winRate": 39.1,
    "appearances": 46853,
    "wins": 18328,
    "losses": 28525,
    "bestPartners": [
      {
        "name": "Alolan Raichu",
        "winRate": 51.3,
        "games": 5381
      },
      {
        "name": "Pelipper",
        "winRate": 51.3,
        "games": 5381
      },
      {
        "name": "Tinkaton",
        "winRate": 51.3,
        "games": 5381
      },
      {
        "name": "Scizor",
        "winRate": 51.3,
        "games": 5381
      },
      {
        "name": "Basculegion-F",
        "winRate": 50.9,
        "games": 5146
      }
    ],
    "bestSets": []
  },
  "706": {
    "id": 706,
    "name": "Goodra",
    "isMega": false,
    "elo": 7927,
    "winRate": 50.5,
    "appearances": 15689,
    "wins": 7928,
    "losses": 7761,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 10273
      },
      {
        "name": "Trevenant",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Appletun",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5125
      }
    ],
    "bestSets": []
  },
  "707": {
    "id": 707,
    "name": "Klefki",
    "isMega": false,
    "elo": 7901,
    "winRate": 47.6,
    "appearances": 25421,
    "wins": 12093,
    "losses": 13328,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 50.7,
        "games": 5542
      },
      {
        "name": "Forretress",
        "winRate": 49.6,
        "games": 16128
      },
      {
        "name": "Scizor",
        "winRate": 49.6,
        "games": 16128
      },
      {
        "name": "Garchomp",
        "winRate": 49,
        "games": 10586
      },
      {
        "name": "Skarmory",
        "winRate": 48.1,
        "games": 20692
      }
    ],
    "bestSets": []
  },
  "709": {
    "id": 709,
    "name": "Trevenant",
    "isMega": false,
    "elo": 7842,
    "winRate": 43.7,
    "appearances": 13978,
    "wins": 6107,
    "losses": 7871,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Appletun",
        "winRate": 50,
        "games": 10507
      },
      {
        "name": "Mamoswine",
        "winRate": 50,
        "games": 10507
      }
    ],
    "bestSets": []
  },
  "711": {
    "id": 711,
    "name": "Gourgeist",
    "isMega": false,
    "elo": 7963,
    "winRate": 50.1,
    "appearances": 14935,
    "wins": 7479,
    "losses": 7456,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Samurott",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Empoleon",
        "winRate": 54,
        "games": 4967
      },
      {
        "name": "Clawitzer",
        "winRate": 50.8,
        "games": 5150
      }
    ],
    "bestSets": []
  },
  "713": {
    "id": 713,
    "name": "Avalugg",
    "isMega": false,
    "elo": 8027,
    "winRate": 47.8,
    "appearances": 15164,
    "wins": 7251,
    "losses": 7913,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5188
      },
      {
        "name": "Sneasler",
        "winRate": 50.4,
        "games": 5188
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 10531
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 10531
      },
      {
        "name": "Palafin",
        "winRate": 50.1,
        "games": 5343
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": 7953,
    "winRate": 50.6,
    "appearances": 72980,
    "wins": 36953,
    "losses": 36027,
    "bestPartners": [
      {
        "name": "Camerupt",
        "winRate": 50.9,
        "games": 10534
      },
      {
        "name": "Lucario",
        "winRate": 50.9,
        "games": 10412
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.9,
        "games": 5616
      },
      {
        "name": "Araquanid",
        "winRate": 50.9,
        "games": 5616
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 25949
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 8012,
    "winRate": 48.8,
    "appearances": 47978,
    "wins": 23407,
    "losses": 24571,
    "bestPartners": [
      {
        "name": "Mega Blastoise",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Wyrdeer",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Drampa",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Tauros",
        "winRate": 56.2,
        "games": 9064
      },
      {
        "name": "Mow Rotom",
        "winRate": 56.2,
        "games": 9064
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": 8007,
    "winRate": 49.7,
    "appearances": 2065156,
    "wins": 1026943,
    "losses": 1038213,
    "bestPartners": [
      {
        "name": "Vaporeon",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Mega Clefable",
        "winRate": 60.2,
        "games": 4360
      },
      {
        "name": "Mega Venusaur",
        "winRate": 57.9,
        "games": 8702
      },
      {
        "name": "Primarina",
        "winRate": 57.3,
        "games": 9182
      },
      {
        "name": "Gliscor",
        "winRate": 54.9,
        "games": 4868
      }
    ],
    "bestSets": []
  },
  "730": {
    "id": 730,
    "name": "Primarina",
    "isMega": false,
    "elo": 8000,
    "winRate": 54.2,
    "appearances": 24339,
    "wins": 13188,
    "losses": 11151,
    "bestPartners": [
      {
        "name": "Arbok",
        "winRate": 60,
        "games": 4314
      },
      {
        "name": "Garchomp",
        "winRate": 60,
        "games": 4314
      },
      {
        "name": "Incineroar",
        "winRate": 57.3,
        "games": 9182
      },
      {
        "name": "Dragapult",
        "winRate": 55.7,
        "games": 9559
      },
      {
        "name": "Krookodile",
        "winRate": 55.1,
        "games": 14372
      }
    ],
    "bestSets": []
  },
  "733": {
    "id": 733,
    "name": "Toucannon",
    "isMega": false,
    "elo": 7976,
    "winRate": 49,
    "appearances": 16012,
    "wins": 7840,
    "losses": 8172,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5453
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 5453
      },
      {
        "name": "Runerigus",
        "winRate": 49.6,
        "games": 5472
      },
      {
        "name": "Empoleon",
        "winRate": 49.6,
        "games": 5472
      },
      {
        "name": "Weavile",
        "winRate": 49.6,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 7962,
    "winRate": 49.4,
    "appearances": 83238,
    "wins": 41128,
    "losses": 42110,
    "bestPartners": [
      {
        "name": "Espathra",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Tauros",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Azumarill",
        "winRate": 52.4,
        "games": 10043
      },
      {
        "name": "Kingambit",
        "winRate": 51.9,
        "games": 10362
      },
      {
        "name": "Mega Slowbro",
        "winRate": 51,
        "games": 5301
      }
    ],
    "bestSets": []
  },
  "745": {
    "id": 745,
    "name": "Lycanroc",
    "isMega": false,
    "elo": 7953,
    "winRate": 45.7,
    "appearances": 14081,
    "wins": 6439,
    "losses": 7642,
    "bestPartners": [
      {
        "name": "Basculegion-M",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Fan Rotom",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Vivillon",
        "winRate": 50.7,
        "games": 5177
      },
      {
        "name": "Decidueye",
        "winRate": 50.6,
        "games": 10360
      },
      {
        "name": "Pelipper",
        "winRate": 50.6,
        "games": 10360
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": 7948,
    "winRate": 48.4,
    "appearances": 50498,
    "wins": 24453,
    "losses": 26045,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 51.1,
        "games": 5100
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 10483
      },
      {
        "name": "Slurpuff",
        "winRate": 50.4,
        "games": 5364
      },
      {
        "name": "Heliolisk",
        "winRate": 50.4,
        "games": 5364
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.4,
        "games": 5364
      }
    ],
    "bestSets": []
  },
  "750": {
    "id": 750,
    "name": "Mudsdale",
    "isMega": false,
    "elo": 7988,
    "winRate": 49.7,
    "appearances": 14076,
    "wins": 6998,
    "losses": 7078,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Scizor",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Azumarill",
        "winRate": 56.7,
        "games": 4615
      },
      {
        "name": "Whimsicott",
        "winRate": 54.3,
        "games": 9752
      },
      {
        "name": "Greninja",
        "winRate": 52.2,
        "games": 5137
      }
    ],
    "bestSets": []
  },
  "752": {
    "id": 752,
    "name": "Araquanid",
    "isMega": false,
    "elo": 7904,
    "winRate": 49.4,
    "appearances": 51903,
    "wins": 25641,
    "losses": 26262,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 53,
        "games": 4945
      },
      {
        "name": "Dragonite",
        "winRate": 51.9,
        "games": 10561
      },
      {
        "name": "Quaquaval",
        "winRate": 51.6,
        "games": 10232
      },
      {
        "name": "Pelipper",
        "winRate": 51.3,
        "games": 20911
      },
      {
        "name": "Incineroar",
        "winRate": 51,
        "games": 5167
      }
    ],
    "bestSets": []
  },
  "758": {
    "id": 758,
    "name": "Salazzle",
    "isMega": false,
    "elo": 8026,
    "winRate": 46.2,
    "appearances": 139720,
    "wins": 64494,
    "losses": 75226,
    "bestPartners": [
      {
        "name": "Slurpuff",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Kingambit",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Corviknight",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Archaludon",
        "winRate": 53.3,
        "games": 9772
      },
      {
        "name": "Vaporeon",
        "winRate": 52.7,
        "games": 5080
      }
    ],
    "bestSets": []
  },
  "763": {
    "id": 763,
    "name": "Tsareena",
    "isMega": false,
    "elo": 7956,
    "winRate": 51.8,
    "appearances": 59904,
    "wins": 31040,
    "losses": 28864,
    "bestPartners": [
      {
        "name": "Mega Gyarados",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Mega Floette",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Simipour",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Archaludon",
        "winRate": 60.8,
        "games": 8438
      },
      {
        "name": "Garchomp",
        "winRate": 60.8,
        "games": 8438
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 7954,
    "winRate": 49.5,
    "appearances": 26469,
    "wins": 13107,
    "losses": 13362,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 49.6,
        "games": 5165
      },
      {
        "name": "Hatterene",
        "winRate": 49.5,
        "games": 26469
      },
      {
        "name": "Torkoal",
        "winRate": 49.5,
        "games": 26469
      },
      {
        "name": "Venusaur",
        "winRate": 49.5,
        "games": 26469
      },
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 26469
      }
    ],
    "bestSets": []
  },
  "766": {
    "id": 766,
    "name": "Passimian",
    "isMega": false,
    "elo": 7974,
    "winRate": 48.3,
    "appearances": 14853,
    "wins": 7169,
    "losses": 7684,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 50.7,
        "games": 10297
      },
      {
        "name": "Morpeko",
        "winRate": 50.7,
        "games": 5117
      },
      {
        "name": "Empoleon",
        "winRate": 50.7,
        "games": 5117
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 5117
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.6,
        "games": 5180
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": 7914,
    "winRate": 47.6,
    "appearances": 15089,
    "wins": 7183,
    "losses": 7906,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 49.5,
        "games": 5357
      },
      {
        "name": "Ursaluna",
        "winRate": 49.5,
        "games": 5357
      },
      {
        "name": "Kingambit",
        "winRate": 49.5,
        "games": 5357
      },
      {
        "name": "Garchomp",
        "winRate": 49.5,
        "games": 5357
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 47.8,
        "games": 5078
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": 7961,
    "winRate": 53.5,
    "appearances": 101225,
    "wins": 54148,
    "losses": 47077,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 64.8,
        "games": 11661
      },
      {
        "name": "Torkoal",
        "winRate": 63.8,
        "games": 11819
      },
      {
        "name": "Mega Blastoise",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Decidueye",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Wyrdeer",
        "winRate": 63.4,
        "games": 4016
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 7978,
    "winRate": 49.9,
    "appearances": 37055,
    "wins": 18500,
    "losses": 18555,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 5222
      },
      {
        "name": "Rhyperior",
        "winRate": 50.4,
        "games": 5222
      },
      {
        "name": "Sneasler",
        "winRate": 50.4,
        "games": 5222
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 50.4,
        "games": 5350
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5350
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 7972,
    "winRate": 50.4,
    "appearances": 61852,
    "wins": 31157,
    "losses": 30695,
    "bestPartners": [
      {
        "name": "Slurpuff",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Gyarados",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Salazzle",
        "winRate": 57.5,
        "games": 4595
      },
      {
        "name": "Archaludon",
        "winRate": 53.9,
        "games": 9577
      },
      {
        "name": "Kingambit",
        "winRate": 52.9,
        "games": 14978
      }
    ],
    "bestSets": []
  },
  "841": {
    "id": 841,
    "name": "Flapple",
    "isMega": false,
    "elo": 7938,
    "winRate": 43.1,
    "appearances": 13741,
    "wins": 5929,
    "losses": 7812,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 51.4,
        "games": 5253
      },
      {
        "name": "Froslass",
        "winRate": 51.4,
        "games": 5253
      },
      {
        "name": "Azumarill",
        "winRate": 51.4,
        "games": 5253
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.1,
        "games": 10484
      },
      {
        "name": "Tauros",
        "winRate": 48.7,
        "games": 5231
      }
    ],
    "bestSets": []
  },
  "842": {
    "id": 842,
    "name": "Appletun",
    "isMega": false,
    "elo": 7962,
    "winRate": 48.9,
    "appearances": 20801,
    "wins": 10173,
    "losses": 10628,
    "bestPartners": [
      {
        "name": "Goodra",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 5125
      },
      {
        "name": "Trevenant",
        "winRate": 50,
        "games": 10507
      },
      {
        "name": "Mamoswine",
        "winRate": 50,
        "games": 10507
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 10420
      }
    ],
    "bestSets": []
  },
  "844": {
    "id": 844,
    "name": "Sandaconda",
    "isMega": false,
    "elo": 7921,
    "winRate": 46.1,
    "appearances": 14782,
    "wins": 6815,
    "losses": 7967,
    "bestPartners": [
      {
        "name": "Vaporeon",
        "winRate": 49.6,
        "games": 10637
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 5282
      },
      {
        "name": "Samurott",
        "winRate": 49.6,
        "games": 10637
      },
      {
        "name": "Azumarill",
        "winRate": 49.6,
        "games": 5282
      },
      {
        "name": "Politoed",
        "winRate": 49.5,
        "games": 5355
      }
    ],
    "bestSets": []
  },
  "855": {
    "id": 855,
    "name": "Polteageist",
    "isMega": false,
    "elo": 7975,
    "winRate": 50.4,
    "appearances": 20280,
    "wins": 10221,
    "losses": 10059,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 54.7,
        "games": 4810
      },
      {
        "name": "Tyranitar",
        "winRate": 54.7,
        "games": 4810
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54.7,
        "games": 4810
      },
      {
        "name": "Azumarill",
        "winRate": 54.7,
        "games": 4810
      },
      {
        "name": "Hydreigon",
        "winRate": 52.8,
        "games": 10186
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": 7979,
    "winRate": 50.2,
    "appearances": 471266,
    "wins": 236617,
    "losses": 234649,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 63.8,
        "games": 8100
      },
      {
        "name": "Snorlax",
        "winRate": 60.6,
        "games": 12833
      },
      {
        "name": "Drampa",
        "winRate": 59.3,
        "games": 13094
      },
      {
        "name": "Tyranitar",
        "winRate": 55.4,
        "games": 9549
      },
      {
        "name": "Azumarill",
        "winRate": 51.5,
        "games": 5244
      }
    ],
    "bestSets": []
  },
  "861": {
    "id": 861,
    "name": "Grimmsnarl",
    "isMega": false,
    "elo": 7947,
    "winRate": 50.1,
    "appearances": 21250,
    "wins": 10646,
    "losses": 10604,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Goodra",
        "winRate": 50.5,
        "games": 10564
      },
      {
        "name": "Mega Abomasnow",
        "winRate": 50.3,
        "games": 5416
      },
      {
        "name": "Froslass",
        "winRate": 50.3,
        "games": 5416
      }
    ],
    "bestSets": []
  },
  "866": {
    "id": 866,
    "name": "Mr. Rime",
    "isMega": false,
    "elo": 8076,
    "winRate": 51.1,
    "appearances": 15269,
    "wins": 7807,
    "losses": 7462,
    "bestPartners": [
      {
        "name": "Stunfisk",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Conkeldurr",
        "winRate": 54.4,
        "games": 4848
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.9,
        "games": 9943
      },
      {
        "name": "Torkoal",
        "winRate": 51.9,
        "games": 10174
      },
      {
        "name": "Garchomp",
        "winRate": 51.9,
        "games": 10174
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 7909,
    "winRate": 43.4,
    "appearances": 14095,
    "wins": 6124,
    "losses": 7971,
    "bestPartners": [
      {
        "name": "Hisuian Samurott",
        "winRate": 51,
        "games": 5421
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 5421
      },
      {
        "name": "Incineroar",
        "winRate": 51,
        "games": 5421
      },
      {
        "name": "Tauros",
        "winRate": 50.3,
        "games": 10893
      },
      {
        "name": "Empoleon",
        "winRate": 49.6,
        "games": 5472
      }
    ],
    "bestSets": []
  },
  "869": {
    "id": 869,
    "name": "Alcremie",
    "isMega": false,
    "elo": 7962,
    "winRate": 49.9,
    "appearances": 15197,
    "wins": 7586,
    "losses": 7611,
    "bestPartners": [
      {
        "name": "Heliolisk",
        "winRate": 50.3,
        "games": 5038
      },
      {
        "name": "Basculegion-F",
        "winRate": 50.3,
        "games": 5038
      },
      {
        "name": "Rotom",
        "winRate": 50.3,
        "games": 5038
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 5038
      },
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 4982
      }
    ],
    "bestSets": []
  },
  "877": {
    "id": 877,
    "name": "Morpeko",
    "isMega": false,
    "elo": 7996,
    "winRate": 50.1,
    "appearances": 36475,
    "wins": 18264,
    "losses": 18211,
    "bestPartners": [
      {
        "name": "Hisuian Typhlosion",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Umbreon",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Pelipper",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Hydreigon",
        "winRate": 51.1,
        "games": 10785
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 8014,
    "winRate": 50.1,
    "appearances": 765806,
    "wins": 383980,
    "losses": 381826,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.7,
        "games": 18686
      },
      {
        "name": "Primarina",
        "winRate": 55.7,
        "games": 9559
      },
      {
        "name": "Krookodile",
        "winRate": 55.5,
        "games": 14333
      },
      {
        "name": "Drampa",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Mow Rotom",
        "winRate": 54.4,
        "games": 19051
      }
    ],
    "bestSets": []
  },
  "899": {
    "id": 899,
    "name": "Wyrdeer",
    "isMega": false,
    "elo": 7995,
    "winRate": 49.7,
    "appearances": 333062,
    "wins": 165547,
    "losses": 167515,
    "bestPartners": [
      {
        "name": "Sneasler",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Cofagrigus",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Aromatisse",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Mega Blastoise",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Decidueye",
        "winRate": 63.4,
        "games": 4016
      }
    ],
    "bestSets": []
  },
  "900": {
    "id": 900,
    "name": "Kleavor",
    "isMega": false,
    "elo": 8068,
    "winRate": 61.1,
    "appearances": 12521,
    "wins": 7646,
    "losses": 4875,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Mow Rotom",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Kingambit",
        "winRate": 66.6,
        "games": 7540
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 63.6,
        "games": 3962
      },
      {
        "name": "Gyarados",
        "winRate": 63.6,
        "games": 3962
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 8000,
    "winRate": 49.9,
    "appearances": 10654,
    "wins": 5319,
    "losses": 5335,
    "bestPartners": [
      {
        "name": "Hatterene",
        "winRate": 50.3,
        "games": 5297
      },
      {
        "name": "Garganacl",
        "winRate": 50.3,
        "games": 5297
      },
      {
        "name": "Gardevoir",
        "winRate": 50.3,
        "games": 5297
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 10654
      },
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 10654
      }
    ],
    "bestSets": []
  },
  "902": {
    "id": 902,
    "name": "Basculegion-M",
    "isMega": false,
    "elo": 8039,
    "winRate": 50.7,
    "appearances": 81572,
    "wins": 41358,
    "losses": 40214,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Luxray",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Tauros",
        "winRate": 60,
        "games": 4430
      },
      {
        "name": "Archaludon",
        "winRate": 60,
        "games": 4430
      }
    ],
    "bestSets": []
  },
  "903": {
    "id": 903,
    "name": "Sneasler",
    "isMega": false,
    "elo": 7968,
    "winRate": 51.1,
    "appearances": 137873,
    "wins": 70519,
    "losses": 67354,
    "bestPartners": [
      {
        "name": "Mega Greninja",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Venusaur",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Aegislash",
        "winRate": 65.3,
        "games": 7813
      },
      {
        "name": "Wyrdeer",
        "winRate": 65.3,
        "games": 3911
      },
      {
        "name": "Kingambit",
        "winRate": 65.3,
        "games": 3911
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 7986,
    "winRate": 50.4,
    "appearances": 26089,
    "wins": 13143,
    "losses": 12946,
    "bestPartners": [
      {
        "name": "Mega Feraligatr",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Tsareena",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Serperior",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Roserade",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Arcanine",
        "winRate": 51.1,
        "games": 5229
      }
    ],
    "bestSets": []
  },
  "911": {
    "id": 911,
    "name": "Skeledirge",
    "isMega": false,
    "elo": 7937,
    "winRate": 50.3,
    "appearances": 15868,
    "wins": 7985,
    "losses": 7883,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5148
      },
      {
        "name": "Mamoswine",
        "winRate": 50.5,
        "games": 10564
      },
      {
        "name": "Goodra",
        "winRate": 50.5,
        "games": 10564
      },
      {
        "name": "Mega Abomasnow",
        "winRate": 50.3,
        "games": 5416
      }
    ],
    "bestSets": []
  },
  "914": {
    "id": 914,
    "name": "Quaquaval",
    "isMega": false,
    "elo": 7904,
    "winRate": 50.9,
    "appearances": 15618,
    "wins": 7955,
    "losses": 7663,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 53,
        "games": 4945
      },
      {
        "name": "Araquanid",
        "winRate": 51.6,
        "games": 10232
      },
      {
        "name": "Azumarill",
        "winRate": 51.6,
        "games": 10232
      },
      {
        "name": "Mega Excadrill",
        "winRate": 51.2,
        "games": 10331
      },
      {
        "name": "Pelipper",
        "winRate": 51.2,
        "games": 10331
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 7937,
    "winRate": 50,
    "appearances": 15885,
    "wins": 7942,
    "losses": 7943,
    "bestPartners": [
      {
        "name": "Basculegion-M",
        "winRate": 50.7,
        "games": 5365
      },
      {
        "name": "Krookodile",
        "winRate": 50.7,
        "games": 5365
      },
      {
        "name": "Polteageist",
        "winRate": 50.7,
        "games": 5365
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.7,
        "games": 5365
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10634
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 7989,
    "winRate": 50.3,
    "appearances": 26472,
    "wins": 13319,
    "losses": 13153,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 51.5,
        "games": 5244
      },
      {
        "name": "Hatterene",
        "winRate": 50.9,
        "games": 10541
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 15925
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 26472
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 21175
      }
    ],
    "bestSets": []
  },
  "936": {
    "id": 936,
    "name": "Armarouge",
    "isMega": false,
    "elo": 7958,
    "winRate": 51.3,
    "appearances": 20662,
    "wins": 10602,
    "losses": 10060,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 55.1,
        "games": 4800
      },
      {
        "name": "Whimsicott",
        "winRate": 55.1,
        "games": 4800
      },
      {
        "name": "Azumarill",
        "winRate": 52.6,
        "games": 10087
      },
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 10195
      },
      {
        "name": "Gyarados",
        "winRate": 52.1,
        "games": 10195
      }
    ],
    "bestSets": []
  },
  "937": {
    "id": 937,
    "name": "Ceruledge",
    "isMega": false,
    "elo": 7997,
    "winRate": 49.9,
    "appearances": 15632,
    "wins": 7795,
    "losses": 7837,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 50,
        "games": 5010
      },
      {
        "name": "Absol",
        "winRate": 50,
        "games": 5010
      },
      {
        "name": "Archaludon",
        "winRate": 50,
        "games": 5010
      },
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 15632
      },
      {
        "name": "Greninja",
        "winRate": 49.9,
        "games": 10298
      }
    ],
    "bestSets": []
  },
  "939": {
    "id": 939,
    "name": "Bellibolt",
    "isMega": false,
    "elo": 7910,
    "winRate": 50.3,
    "appearances": 15932,
    "wins": 8017,
    "losses": 7915,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 51.1,
        "games": 5289
      },
      {
        "name": "Simipour",
        "winRate": 51.1,
        "games": 5289
      },
      {
        "name": "Krookodile",
        "winRate": 51.1,
        "games": 5289
      },
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 5349
      },
      {
        "name": "Tauros",
        "winRate": 51,
        "games": 5349
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 8000,
    "winRate": 50,
    "appearances": 21102,
    "wins": 10547,
    "losses": 10555,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 50.2,
        "games": 5418
      },
      {
        "name": "Ninetales",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Leafeon",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 10785
      },
      {
        "name": "Venusaur",
        "winRate": 50.1,
        "games": 10785
      }
    ],
    "bestSets": []
  },
  "956": {
    "id": 956,
    "name": "Espathra",
    "isMega": false,
    "elo": 7978,
    "winRate": 50.7,
    "appearances": 15195,
    "wins": 7709,
    "losses": 7486,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Crabominable",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Azumarill",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Tauros",
        "winRate": 54.7,
        "games": 4939
      },
      {
        "name": "Mega Crabominable",
        "winRate": 50.9,
        "games": 5212
      }
    ],
    "bestSets": []
  },
  "959": {
    "id": 959,
    "name": "Tinkaton",
    "isMega": false,
    "elo": 7999,
    "winRate": 48.8,
    "appearances": 55770,
    "wins": 27222,
    "losses": 28548,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 53.3,
        "games": 4957
      },
      {
        "name": "Scizor",
        "winRate": 52.2,
        "games": 10338
      },
      {
        "name": "Mega Garchomp",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Tyrantrum",
        "winRate": 51.3,
        "games": 5381
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": 8024,
    "winRate": 50.3,
    "appearances": 162677,
    "wins": 81809,
    "losses": 80868,
    "bestPartners": [
      {
        "name": "Tyrantrum",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Azumarill",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Vaporeon",
        "winRate": 52.7,
        "games": 5080
      },
      {
        "name": "Pelipper",
        "winRate": 52,
        "games": 10280
      },
      {
        "name": "Salazzle",
        "winRate": 51.2,
        "games": 15522
      }
    ],
    "bestSets": []
  },
  "968": {
    "id": 968,
    "name": "Orthworm",
    "isMega": false,
    "elo": 8050,
    "winRate": 49.8,
    "appearances": 15532,
    "wins": 7736,
    "losses": 7796,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 5191
      },
      {
        "name": "Noivern",
        "winRate": 50.8,
        "games": 5191
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 5191
      },
      {
        "name": "Aerodactyl",
        "winRate": 50.8,
        "games": 5191
      },
      {
        "name": "Emolga",
        "winRate": 50.8,
        "games": 5191
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 7994,
    "winRate": 50.8,
    "appearances": 10564,
    "wins": 5369,
    "losses": 5195,
    "bestPartners": [
      {
        "name": "Forretress",
        "winRate": 50.8,
        "games": 10564
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 10564
      },
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10564
      },
      {
        "name": "Scizor",
        "winRate": 50.8,
        "games": 10564
      },
      {
        "name": "Pelipper",
        "winRate": 50.8,
        "games": 10564
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": 7896,
    "winRate": 49.6,
    "appearances": 5256,
    "wins": 2607,
    "losses": 2649,
    "bestPartners": [
      {
        "name": "Tatsugiri",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Hatterene",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Garchomp",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Scizor",
        "winRate": 49.6,
        "games": 5256
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": 7896,
    "winRate": 49.6,
    "appearances": 5256,
    "wins": 2607,
    "losses": 2649,
    "bestPartners": [
      {
        "name": "Dondozo",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Hatterene",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Garchomp",
        "winRate": 49.6,
        "games": 5256
      },
      {
        "name": "Scizor",
        "winRate": 49.6,
        "games": 5256
      }
    ],
    "bestSets": []
  },
  "981": {
    "id": 981,
    "name": "Farigiraf",
    "isMega": false,
    "elo": 7941,
    "winRate": 50.9,
    "appearances": 15124,
    "wins": 7693,
    "losses": 7431,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Pangoro",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Zoroark",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54,
        "games": 4801
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 8039,
    "winRate": 51.4,
    "appearances": 804654,
    "wins": 413677,
    "losses": 390977,
    "bestPartners": [
      {
        "name": "Mow Rotom",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Mega Floette",
        "winRate": 67,
        "games": 3877
      },
      {
        "name": "Pinsir",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Kleavor",
        "winRate": 66.6,
        "games": 7540
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 66.6,
        "games": 7540
      }
    ],
    "bestSets": []
  },
  "1013": {
    "id": 1013,
    "name": "Sinistcha",
    "isMega": false,
    "elo": 8007,
    "winRate": 50.4,
    "appearances": 20952,
    "wins": 10552,
    "losses": 10400,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Archaludon",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Mega Gyarados",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Sneasler",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Mega Camerupt",
        "winRate": 54.7,
        "games": 4788
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 8060,
    "winRate": 53.4,
    "appearances": 234569,
    "wins": 125356,
    "losses": 109213,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Mega Pinsir",
        "winRate": 66.1,
        "games": 3887
      },
      {
        "name": "Kleavor",
        "winRate": 63.6,
        "games": 3962
      },
      {
        "name": "Simipour",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Wash Rotom",
        "winRate": 62.6,
        "games": 28941
      }
    ],
    "bestSets": []
  },
  "1019": {
    "id": 1019,
    "name": "Hydrapple",
    "isMega": false,
    "elo": 7878,
    "winRate": 40.1,
    "appearances": 12955,
    "wins": 5198,
    "losses": 7757,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 50.2,
        "games": 5152
      },
      {
        "name": "Rotom",
        "winRate": 43.9,
        "games": 9186
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 42,
        "games": 8921
      },
      {
        "name": "Luxray",
        "winRate": 40.1,
        "games": 12955
      },
      {
        "name": "Dedenne",
        "winRate": 40.1,
        "games": 12955
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": 7966,
    "winRate": 48.2,
    "appearances": 318428,
    "wins": 153452,
    "losses": 164976,
    "bestPartners": [
      {
        "name": "Mega Altaria",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Espathra",
        "winRate": 50.9,
        "games": 5212
      },
      {
        "name": "Clawitzer",
        "winRate": 50.8,
        "games": 5150
      },
      {
        "name": "Vaporeon",
        "winRate": 50.8,
        "games": 5049
      },
      {
        "name": "Slowbro",
        "winRate": 50.7,
        "games": 21175
      }
    ],
    "bestSets": []
  },
  "5157": {
    "id": 5157,
    "name": "Hisuian Typhlosion",
    "isMega": false,
    "elo": 7989,
    "winRate": 49.8,
    "appearances": 15814,
    "wins": 7880,
    "losses": 7934,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Hisuian Decidueye",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Umbreon",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Morpeko",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Pelipper",
        "winRate": 51.2,
        "games": 5409
      }
    ],
    "bestSets": []
  },
  "5706": {
    "id": 5706,
    "name": "Hisuian Goodra",
    "isMega": false,
    "elo": 8019,
    "winRate": 53.4,
    "appearances": 42827,
    "wins": 22867,
    "losses": 19960,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Mow Rotom",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Kingambit",
        "winRate": 66.6,
        "games": 7540
      },
      {
        "name": "Kleavor",
        "winRate": 61.1,
        "games": 12521
      },
      {
        "name": "Wash Rotom",
        "winRate": 59.9,
        "games": 8559
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": 7952,
    "winRate": 50.7,
    "appearances": 20579,
    "wins": 10429,
    "losses": 10150,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 15412
      },
      {
        "name": "Reuniclus",
        "winRate": 50.9,
        "games": 15412
      },
      {
        "name": "Audino",
        "winRate": 50.8,
        "games": 10346
      },
      {
        "name": "Cofagrigus",
        "winRate": 50.7,
        "games": 20579
      },
      {
        "name": "Arbok",
        "winRate": 50.7,
        "games": 20579
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": 7967,
    "winRate": 49.6,
    "appearances": 15799,
    "wins": 7844,
    "losses": 7955,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 51.2,
        "games": 5374
      },
      {
        "name": "Weavile",
        "winRate": 50.4,
        "games": 10653
      },
      {
        "name": "Liepard",
        "winRate": 49.7,
        "games": 10520
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 15799
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": 7989,
    "winRate": 49,
    "appearances": 75231,
    "wins": 36844,
    "losses": 38387,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 55.4,
        "games": 4855
      },
      {
        "name": "Drampa",
        "winRate": 55.4,
        "games": 4855
      },
      {
        "name": "Mega Slowbro",
        "winRate": 53.1,
        "games": 10156
      },
      {
        "name": "Crabominable",
        "winRate": 51,
        "games": 5301
      },
      {
        "name": "Ariados",
        "winRate": 51,
        "games": 5301
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 8011,
    "winRate": 49.9,
    "appearances": 46440,
    "wins": 23188,
    "losses": 23252,
    "bestPartners": [
      {
        "name": "Froslass",
        "winRate": 51.4,
        "games": 5253
      },
      {
        "name": "Azumarill",
        "winRate": 51.4,
        "games": 5253
      },
      {
        "name": "Empoleon",
        "winRate": 51.1,
        "games": 10559
      },
      {
        "name": "Mega Medicham",
        "winRate": 50.8,
        "games": 5306
      },
      {
        "name": "Audino",
        "winRate": 50.8,
        "games": 5306
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 8072,
    "winRate": 54.3,
    "appearances": 157392,
    "wins": 85428,
    "losses": 71964,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Feraligatr",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Vaporeon",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Pinsir",
        "winRate": 66.8,
        "games": 7753
      },
      {
        "name": "Kingambit",
        "winRate": 64.2,
        "games": 28121
      }
    ],
    "bestSets": []
  },
  "10010": {
    "id": 10010,
    "name": "Frost Rotom",
    "isMega": false,
    "elo": 7924,
    "winRate": 46.1,
    "appearances": 14862,
    "wins": 6858,
    "losses": 8004,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5285
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.4,
        "games": 5285
      },
      {
        "name": "Pelipper",
        "winRate": 50.4,
        "games": 5285
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 5285
      },
      {
        "name": "Garchomp",
        "winRate": 49.9,
        "games": 10689
      }
    ],
    "bestSets": []
  },
  "10011": {
    "id": 10011,
    "name": "Fan Rotom",
    "isMega": false,
    "elo": 8006,
    "winRate": 50.9,
    "appearances": 25549,
    "wins": 12994,
    "losses": 12555,
    "bestPartners": [
      {
        "name": "Mega Steelix",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Feraligatr",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Milotic",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Dragonite",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Azumarill",
        "winRate": 53.4,
        "games": 5004
      }
    ],
    "bestSets": []
  },
  "10012": {
    "id": 10012,
    "name": "Mow Rotom",
    "isMega": false,
    "elo": 7959,
    "winRate": 52.6,
    "appearances": 61231,
    "wins": 32209,
    "losses": 29022,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Kingambit",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Mega Blastoise",
        "winRate": 67.9,
        "games": 7573
      },
      {
        "name": "Wyrdeer",
        "winRate": 63.4,
        "games": 4016
      }
    ],
    "bestSets": []
  },
  "10100": {
    "id": 10100,
    "name": "Alolan Raichu",
    "isMega": false,
    "elo": 7992,
    "winRate": 47.7,
    "appearances": 73964,
    "wins": 35269,
    "losses": 38695,
    "bestPartners": [
      {
        "name": "Mega Heracross",
        "winRate": 54.8,
        "games": 4798
      },
      {
        "name": "Incineroar",
        "winRate": 52.5,
        "games": 9876
      },
      {
        "name": "Tyranitar",
        "winRate": 52.3,
        "games": 9962
      },
      {
        "name": "Wash Rotom",
        "winRate": 51.6,
        "games": 15040
      },
      {
        "name": "Tyrantrum",
        "winRate": 51.3,
        "games": 5381
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 7897,
    "winRate": 43.9,
    "appearances": 36806,
    "wins": 16167,
    "losses": 20639,
    "bestPartners": [
      {
        "name": "Mega Garchomp",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Tinkaton",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Azumarill",
        "winRate": 51.7,
        "games": 10109
      },
      {
        "name": "Kingambit",
        "winRate": 51.4,
        "games": 10179
      },
      {
        "name": "Scizor",
        "winRate": 51.4,
        "games": 10179
      }
    ],
    "bestSets": []
  },
  "10250": {
    "id": 10250,
    "name": "Paldean Tauros",
    "isMega": false,
    "elo": 8010,
    "winRate": 50.4,
    "appearances": 210529,
    "wins": 106080,
    "losses": 104449,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Mega Meowstic",
        "winRate": 56.9,
        "games": 4654
      },
      {
        "name": "Mega Meowstic",
        "winRate": 56.3,
        "games": 13421
      },
      {
        "name": "Drampa",
        "winRate": 55.4,
        "games": 4855
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 55.4,
        "games": 4855
      }
    ],
    "bestSets": []
  },
  "10251": {
    "id": 10251,
    "name": "Paldean Tauros (Blaze)",
    "isMega": false,
    "elo": 7972,
    "winRate": 50.7,
    "appearances": 366085,
    "wins": 185658,
    "losses": 180427,
    "bestPartners": [
      {
        "name": "Kleavor",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Wash Rotom",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Hisuian Goodra",
        "winRate": 70,
        "games": 3578
      },
      {
        "name": "Aegislash",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Mega Clefable",
        "winRate": 60,
        "games": 4430
      }
    ],
    "bestSets": []
  },
  "10252": {
    "id": 10252,
    "name": "Paldean Tauros (Aqua)",
    "isMega": false,
    "elo": 8004,
    "winRate": 50.7,
    "appearances": 392698,
    "wins": 198905,
    "losses": 193793,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Kleavor",
        "winRate": 63.6,
        "games": 3962
      },
      {
        "name": "Mega Meowstic",
        "winRate": 61.4,
        "games": 8371
      },
      {
        "name": "Mega Altaria",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Mega Meowstic",
        "winRate": 56.9,
        "games": 4654
      }
    ],
    "bestSets": []
  },
  "10336": {
    "id": 10336,
    "name": "Hisuian Samurott",
    "isMega": false,
    "elo": 7996,
    "winRate": 51.4,
    "appearances": 60930,
    "wins": 31341,
    "losses": 29589,
    "bestPartners": [
      {
        "name": "Polteageist",
        "winRate": 54.7,
        "games": 4810
      },
      {
        "name": "Hydreigon",
        "winRate": 54.4,
        "games": 9709
      },
      {
        "name": "Mega Gengar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Pangoro",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Zoroark",
        "winRate": 54,
        "games": 4801
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 8015,
    "winRate": 50,
    "appearances": 54820,
    "wins": 27436,
    "losses": 27384,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Mega Floette",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Pelipper",
        "winRate": 56.4,
        "games": 9354
      },
      {
        "name": "Krookodile",
        "winRate": 56.2,
        "games": 9125
      },
      {
        "name": "Sneasler",
        "winRate": 53.2,
        "games": 19957
      }
    ],
    "bestSets": []
  },
  "10341": {
    "id": 10341,
    "name": "Hisuian Decidueye",
    "isMega": false,
    "elo": 7994,
    "winRate": 48.9,
    "appearances": 55290,
    "wins": 27028,
    "losses": 28262,
    "bestPartners": [
      {
        "name": "Mega Charizard Y",
        "winRate": 52.1,
        "games": 4871
      },
      {
        "name": "Stunfisk",
        "winRate": 52.1,
        "games": 4871
      },
      {
        "name": "Tauros",
        "winRate": 52.1,
        "games": 4871
      },
      {
        "name": "Hisuian Typhlosion",
        "winRate": 51.2,
        "games": 5409
      },
      {
        "name": "Hydreigon",
        "winRate": 51.2,
        "games": 5409
      }
    ],
    "bestSets": []
  },
  "10678": {
    "id": 10678,
    "name": "Meowstic-F",
    "isMega": false,
    "elo": 7957,
    "winRate": 48,
    "appearances": 23297,
    "wins": 11185,
    "losses": 12112,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 54.8,
        "games": 9578
      },
      {
        "name": "Paldean Tauros",
        "winRate": 54.8,
        "games": 9578
      },
      {
        "name": "Kingambit",
        "winRate": 54.8,
        "games": 9578
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 54.8,
        "games": 9578
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 54.8,
        "games": 9578
      }
    ],
    "bestSets": []
  },
  "10902": {
    "id": 10902,
    "name": "Basculegion-F",
    "isMega": false,
    "elo": 7940,
    "winRate": 50.7,
    "appearances": 31515,
    "wins": 15993,
    "losses": 15522,
    "bestPartners": [
      {
        "name": "Florges",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Kingambit",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Corviknight",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Stunfisk",
        "winRate": 51.7,
        "games": 5133
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51,
        "games": 10171
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 8051,
    "winRate": 53.7,
    "appearances": 14572,
    "wins": 7832,
    "losses": 6740,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Sneasler",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Venusaur",
        "winRate": 66.8,
        "games": 3792
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 56.9,
        "games": 9207
      },
      {
        "name": "Arbok",
        "winRate": 53.7,
        "games": 14572
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 8034,
    "winRate": 50.4,
    "appearances": 15206,
    "wins": 7658,
    "losses": 7548,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 51.2,
        "games": 5311
      },
      {
        "name": "Pelipper",
        "winRate": 51.2,
        "games": 5311
      },
      {
        "name": "Incineroar",
        "winRate": 51.2,
        "games": 5311
      },
      {
        "name": "Arbok",
        "winRate": 50.7,
        "games": 10342
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 10342
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 8033,
    "winRate": 50.4,
    "appearances": 15682,
    "wins": 7909,
    "losses": 7773,
    "bestPartners": [
      {
        "name": "Basculegion-M",
        "winRate": 50.9,
        "games": 10419
      },
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 5103
      },
      {
        "name": "Dragonite",
        "winRate": 50.9,
        "games": 5316
      },
      {
        "name": "Gliscor",
        "winRate": 50.9,
        "games": 5316
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 15682
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 8032,
    "winRate": 55,
    "appearances": 13873,
    "wins": 7634,
    "losses": 6239,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 66.1,
        "games": 3887
      },
      {
        "name": "Tyranitar",
        "winRate": 66.1,
        "games": 3887
      },
      {
        "name": "Wash Rotom",
        "winRate": 57.5,
        "games": 8916
      },
      {
        "name": "Luxray",
        "winRate": 57.5,
        "games": 8916
      },
      {
        "name": "Kingambit",
        "winRate": 57.4,
        "games": 8844
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": 8030,
    "winRate": 52.6,
    "appearances": 14670,
    "wins": 7710,
    "losses": 6960,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Arcanine",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Bastiodon",
        "winRate": 60.3,
        "games": 4329
      },
      {
        "name": "Kingambit",
        "winRate": 54.7,
        "games": 9482
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 8028,
    "winRate": 53.4,
    "appearances": 14613,
    "wins": 7809,
    "losses": 6804,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 59.1,
        "games": 4370
      },
      {
        "name": "Tauros",
        "winRate": 59.1,
        "games": 4370
      },
      {
        "name": "Greninja",
        "winRate": 59.1,
        "games": 4370
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 53.4,
        "games": 14613
      },
      {
        "name": "Krookodile",
        "winRate": 53.4,
        "games": 14613
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 8026,
    "winRate": 53.6,
    "appearances": 14062,
    "wins": 7537,
    "losses": 6525,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 4363
      },
      {
        "name": "Wash Rotom",
        "winRate": 57.7,
        "games": 9161
      },
      {
        "name": "Tyranitar",
        "winRate": 57.7,
        "games": 9161
      },
      {
        "name": "Wyrdeer",
        "winRate": 57.7,
        "games": 9161
      },
      {
        "name": "Alolan Raichu",
        "winRate": 54.8,
        "games": 4798
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 8022,
    "winRate": 50,
    "appearances": 21181,
    "wins": 10583,
    "losses": 10598,
    "bestPartners": [
      {
        "name": "Mamoswine",
        "winRate": 50.3,
        "games": 5416
      },
      {
        "name": "Froslass",
        "winRate": 50.3,
        "games": 5416
      },
      {
        "name": "Goodra",
        "winRate": 50.3,
        "games": 5416
      },
      {
        "name": "Grimmsnarl",
        "winRate": 50.3,
        "games": 5416
      },
      {
        "name": "Skeledirge",
        "winRate": 50.3,
        "games": 5416
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": 8019,
    "winRate": 49.9,
    "appearances": 15267,
    "wins": 7622,
    "losses": 7645,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 5078
      },
      {
        "name": "Alolan Raichu",
        "winRate": 50.1,
        "games": 10242
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.1,
        "games": 10242
      },
      {
        "name": "Tyranitar",
        "winRate": 49.9,
        "games": 5164
      },
      {
        "name": "Heat Rotom",
        "winRate": 49.9,
        "games": 5164
      }
    ],
    "bestSets": []
  },
  "6-mega-x": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 8014,
    "winRate": 49.5,
    "appearances": 15374,
    "wins": 7604,
    "losses": 7770,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 50.6,
        "games": 5245
      },
      {
        "name": "Hydreigon",
        "winRate": 50.6,
        "games": 5245
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 10328
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.3,
        "games": 10328
      },
      {
        "name": "Mow Rotom",
        "winRate": 50,
        "games": 5083
      }
    ],
    "bestSets": []
  },
  "208-mega": {
    "id": 208,
    "name": "Mega Steelix",
    "isMega": true,
    "elo": 8014,
    "winRate": 52,
    "appearances": 15407,
    "wins": 8009,
    "losses": 7398,
    "bestPartners": [
      {
        "name": "Feraligatr",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Dragonite",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Azumarill",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Fan Rotom",
        "winRate": 53.4,
        "games": 5004
      },
      {
        "name": "Milotic",
        "winRate": 52.3,
        "games": 10239
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": 8013,
    "winRate": 49.8,
    "appearances": 755186,
    "wins": 376125,
    "losses": 379061,
    "bestPartners": [
      {
        "name": "Clefable",
        "winRate": 50.8,
        "games": 5260
      },
      {
        "name": "Politoed",
        "winRate": 50.7,
        "games": 42439
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 83071
      },
      {
        "name": "Talonflame",
        "winRate": 50.3,
        "games": 5064
      },
      {
        "name": "Dragapult",
        "winRate": 50.2,
        "games": 242938
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": 8013,
    "winRate": 49.1,
    "appearances": 15369,
    "wins": 7540,
    "losses": 7829,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 5249
      },
      {
        "name": "Emolga",
        "winRate": 50.8,
        "games": 5249
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 10370
      },
      {
        "name": "Simisage",
        "winRate": 50.3,
        "games": 10370
      },
      {
        "name": "Dragapult",
        "winRate": 49.9,
        "games": 5121
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 8011,
    "winRate": 53.4,
    "appearances": 14948,
    "wins": 7979,
    "losses": 6969,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 55.4,
        "games": 4855
      },
      {
        "name": "Paldean Tauros",
        "winRate": 54.7,
        "games": 9647
      },
      {
        "name": "Kingambit",
        "winRate": 54.7,
        "games": 9647
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 53.9,
        "games": 4792
      },
      {
        "name": "Incineroar",
        "winRate": 53.9,
        "games": 4792
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 8010,
    "winRate": 50.1,
    "appearances": 609528,
    "wins": 305649,
    "losses": 303879,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Simipour",
        "winRate": 63.2,
        "games": 4040
      },
      {
        "name": "Mega Floette",
        "winRate": 58.6,
        "games": 8828
      },
      {
        "name": "Sinistcha",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Archaludon",
        "winRate": 53.7,
        "games": 23914
      }
    ],
    "bestSets": []
  },
  "323-mega": {
    "id": 323,
    "name": "Mega Camerupt",
    "isMega": true,
    "elo": 8005,
    "winRate": 51.5,
    "appearances": 30710,
    "wins": 15817,
    "losses": 14893,
    "bestPartners": [
      {
        "name": "Mega Floette",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Sinistcha",
        "winRate": 54.7,
        "games": 4788
      },
      {
        "name": "Archaludon",
        "winRate": 53.6,
        "games": 9927
      },
      {
        "name": "Sneasler",
        "winRate": 53.6,
        "games": 9927
      },
      {
        "name": "Mega Gyarados",
        "winRate": 52.3,
        "games": 14950
      }
    ],
    "bestSets": []
  },
  "358-mega": {
    "id": 358,
    "name": "Mega Chimecho",
    "isMega": true,
    "elo": 8000,
    "winRate": 49,
    "appearances": 15296,
    "wins": 7494,
    "losses": 7802,
    "bestPartners": [
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.2,
        "games": 5104
      },
      {
        "name": "Azumarill",
        "winRate": 50.2,
        "games": 5104
      },
      {
        "name": "Krookodile",
        "winRate": 50.2,
        "games": 5104
      },
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 10307
      },
      {
        "name": "Kingambit",
        "winRate": 49.9,
        "games": 5203
      }
    ],
    "bestSets": []
  },
  "670-mega": {
    "id": 670,
    "name": "Mega Floette",
    "isMega": true,
    "elo": 7998,
    "winRate": 56.7,
    "appearances": 32043,
    "wins": 18158,
    "losses": 13885,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 67,
        "games": 3877
      },
      {
        "name": "Pelipper",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Krookodile",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Aegislash",
        "winRate": 63.8,
        "games": 4021
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 63.8,
        "games": 4021
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 7998,
    "winRate": 50.6,
    "appearances": 15609,
    "wins": 7893,
    "losses": 7716,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51,
        "games": 5039
      },
      {
        "name": "Starmie",
        "winRate": 51,
        "games": 5039
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.9,
        "games": 10358
      },
      {
        "name": "Emolga",
        "winRate": 50.7,
        "games": 5319
      },
      {
        "name": "Corviknight",
        "winRate": 50.7,
        "games": 5319
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 7993,
    "winRate": 54,
    "appearances": 39658,
    "wins": 21406,
    "losses": 18252,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 73,
        "games": 3557
      },
      {
        "name": "Mow Rotom",
        "winRate": 67.9,
        "games": 7573
      },
      {
        "name": "Decidueye",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Wyrdeer",
        "winRate": 63.4,
        "games": 4016
      },
      {
        "name": "Drampa",
        "winRate": 63.4,
        "games": 4016
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 7993,
    "winRate": 56.3,
    "appearances": 13421,
    "wins": 7558,
    "losses": 5863,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Tauros",
        "winRate": 67.9,
        "games": 3797
      },
      {
        "name": "Kingambit",
        "winRate": 61.4,
        "games": 8371
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 61.4,
        "games": 8371
      },
      {
        "name": "Paldean Tauros",
        "winRate": 56.3,
        "games": 13421
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 7990,
    "winRate": 56.6,
    "appearances": 13916,
    "wins": 7875,
    "losses": 6041,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 60.2,
        "games": 4360
      },
      {
        "name": "Kingambit",
        "winRate": 60.2,
        "games": 4360
      },
      {
        "name": "Wyrdeer",
        "winRate": 60.2,
        "games": 4360
      },
      {
        "name": "Archaludon",
        "winRate": 60.1,
        "games": 8790
      },
      {
        "name": "Tauros",
        "winRate": 60.1,
        "games": 8790
      }
    ],
    "bestSets": []
  },
  "6-mega-y": {
    "id": 6,
    "name": "Mega Charizard Y",
    "isMega": true,
    "elo": 7988,
    "winRate": 51.6,
    "appearances": 25052,
    "wins": 12924,
    "losses": 12128,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 53.2,
        "games": 9701
      },
      {
        "name": "Stunfisk",
        "winRate": 53.2,
        "games": 9701
      },
      {
        "name": "Empoleon",
        "winRate": 52.5,
        "games": 9946
      },
      {
        "name": "Rhyperior",
        "winRate": 52.5,
        "games": 9946
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 52.2,
        "games": 14808
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 7987,
    "winRate": 52.7,
    "appearances": 15137,
    "wins": 7977,
    "losses": 7160,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 54.4,
        "games": 9849
      },
      {
        "name": "Drampa",
        "winRate": 54.4,
        "games": 9849
      },
      {
        "name": "Azumarill",
        "winRate": 54.4,
        "games": 9849
      },
      {
        "name": "Kingambit",
        "winRate": 52.7,
        "games": 15137
      },
      {
        "name": "Whimsicott",
        "winRate": 52.7,
        "games": 15137
      }
    ],
    "bestSets": []
  },
  "310-mega": {
    "id": 310,
    "name": "Mega Manectric",
    "isMega": true,
    "elo": 7987,
    "winRate": 50.2,
    "appearances": 15082,
    "wins": 7569,
    "losses": 7513,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 5045
      },
      {
        "name": "Pelipper",
        "winRate": 50.7,
        "games": 5045
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.7,
        "games": 5045
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10150
      },
      {
        "name": "Luxray",
        "winRate": 50.3,
        "games": 9977
      }
    ],
    "bestSets": []
  },
  "308-mega": {
    "id": 308,
    "name": "Mega Medicham",
    "isMega": true,
    "elo": 7984,
    "winRate": 50.4,
    "appearances": 15686,
    "wins": 7903,
    "losses": 7783,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 50.8,
        "games": 5306
      },
      {
        "name": "Heat Rotom",
        "winRate": 50.8,
        "games": 5306
      },
      {
        "name": "Wyrdeer",
        "winRate": 50.8,
        "games": 5306
      },
      {
        "name": "Empoleon",
        "winRate": 50.7,
        "games": 10589
      },
      {
        "name": "Audino",
        "winRate": 50.7,
        "games": 10589
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": 7984,
    "winRate": 50.3,
    "appearances": 15561,
    "wins": 7821,
    "losses": 7740,
    "bestPartners": [
      {
        "name": "Reuniclus",
        "winRate": 51,
        "games": 5066
      },
      {
        "name": "Arbok",
        "winRate": 50.6,
        "games": 10233
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.6,
        "games": 10233
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10394
      },
      {
        "name": "Cofagrigus",
        "winRate": 50.3,
        "games": 15561
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 7981,
    "winRate": 51.5,
    "appearances": 15406,
    "wins": 7939,
    "losses": 7467,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 53.8,
        "games": 4945
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 53.8,
        "games": 4945
      },
      {
        "name": "Wyrdeer",
        "winRate": 52.5,
        "games": 10196
      },
      {
        "name": "Scizor",
        "winRate": 52.5,
        "games": 10196
      },
      {
        "name": "Abomasnow",
        "winRate": 51.7,
        "games": 10155
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": 7980,
    "winRate": 47.2,
    "appearances": 29858,
    "wins": 14092,
    "losses": 15766,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 5448
      },
      {
        "name": "Furfrou",
        "winRate": 50.4,
        "games": 5448
      },
      {
        "name": "Luxray",
        "winRate": 50.4,
        "games": 5448
      },
      {
        "name": "Charizard",
        "winRate": 50.1,
        "games": 5041
      },
      {
        "name": "Archaludon",
        "winRate": 50.1,
        "games": 5041
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": 7976,
    "winRate": 48.9,
    "appearances": 15240,
    "wins": 7450,
    "losses": 7790,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 51,
        "games": 5246
      },
      {
        "name": "Empoleon",
        "winRate": 51,
        "games": 5246
      },
      {
        "name": "Tyranitar",
        "winRate": 51,
        "games": 5246
      },
      {
        "name": "Pangoro",
        "winRate": 51,
        "games": 5246
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 50.3,
        "games": 5082
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 7975,
    "winRate": 48.2,
    "appearances": 15298,
    "wins": 7368,
    "losses": 7930,
    "bestPartners": [
      {
        "name": "Espathra",
        "winRate": 50.9,
        "games": 5212
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.9,
        "games": 5212
      },
      {
        "name": "Charizard",
        "winRate": 50.9,
        "games": 5212
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 10659
      },
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 5447
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 7973,
    "winRate": 52.4,
    "appearances": 14788,
    "wins": 7742,
    "losses": 7046,
    "bestPartners": [
      {
        "name": "Stunfisk",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Luxray",
        "winRate": 57.6,
        "games": 4562
      },
      {
        "name": "Aerodactyl",
        "winRate": 53.3,
        "games": 9806
      },
      {
        "name": "Archaludon",
        "winRate": 52.4,
        "games": 14788
      },
      {
        "name": "Empoleon",
        "winRate": 52.4,
        "games": 14788
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 7971,
    "winRate": 49.8,
    "appearances": 16099,
    "wins": 8017,
    "losses": 8082,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 5348
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.3,
        "games": 5348
      },
      {
        "name": "Gyarados",
        "winRate": 50.1,
        "games": 10775
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.1,
        "games": 10775
      },
      {
        "name": "Delphox",
        "winRate": 49.9,
        "games": 5427
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": 7970,
    "winRate": 50,
    "appearances": 25261,
    "wins": 12619,
    "losses": 12642,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50,
        "games": 25261
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 25261
      },
      {
        "name": "Dragonite",
        "winRate": 50,
        "games": 15106
      },
      {
        "name": "Milotic",
        "winRate": 50,
        "games": 5145
      },
      {
        "name": "Aegislash",
        "winRate": 50,
        "games": 10133
      }
    ],
    "bestSets": []
  },
  "121-mega": {
    "id": 121,
    "name": "Mega Starmie",
    "isMega": true,
    "elo": 7967,
    "winRate": 49.7,
    "appearances": 16022,
    "wins": 7958,
    "losses": 8064,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 50.3,
        "games": 5308
      },
      {
        "name": "Forretress",
        "winRate": 50.3,
        "games": 5308
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 10727
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 10603
      },
      {
        "name": "Crabominable",
        "winRate": 49.7,
        "games": 16022
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": 7965,
    "winRate": 52.1,
    "appearances": 19908,
    "wins": 10377,
    "losses": 9531,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 58.5,
        "games": 4398
      },
      {
        "name": "Garchomp",
        "winRate": 58.5,
        "games": 4398
      },
      {
        "name": "Luxray",
        "winRate": 52.9,
        "games": 14714
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.9,
        "games": 14714
      },
      {
        "name": "Tsareena",
        "winRate": 52.4,
        "games": 14786
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 7965,
    "winRate": 50.5,
    "appearances": 21160,
    "wins": 10684,
    "losses": 10476,
    "bestPartners": [
      {
        "name": "Tsareena",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Roserade",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Arcanine",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Meowscarada",
        "winRate": 51.1,
        "games": 5229
      },
      {
        "name": "Serperior",
        "winRate": 50.7,
        "games": 15747
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 7964,
    "winRate": 50.4,
    "appearances": 15638,
    "wins": 7888,
    "losses": 7750,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10487
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 10487
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 50.8,
        "games": 5325
      },
      {
        "name": "Paldean Tauros",
        "winRate": 50.8,
        "games": 5325
      },
      {
        "name": "Arbok",
        "winRate": 50.8,
        "games": 5162
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": 7960,
    "winRate": 50.5,
    "appearances": 250554,
    "wins": 126505,
    "losses": 124049,
    "bestPartners": [
      {
        "name": "Mega Lucario",
        "winRate": 54.9,
        "games": 9523
      },
      {
        "name": "Hydreigon",
        "winRate": 52.7,
        "games": 9760
      },
      {
        "name": "Greninja",
        "winRate": 51.9,
        "games": 25499
      },
      {
        "name": "Dragapult",
        "winRate": 51.5,
        "games": 30413
      },
      {
        "name": "Mega Scizor",
        "winRate": 51.4,
        "games": 35564
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 7959,
    "winRate": 49.8,
    "appearances": 762311,
    "wins": 379434,
    "losses": 382877,
    "bestPartners": [
      {
        "name": "Simisage",
        "winRate": 51.1,
        "games": 5175
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 10353
      },
      {
        "name": "Sneasler",
        "winRate": 50.7,
        "games": 10353
      },
      {
        "name": "Mega Scizor",
        "winRate": 50.5,
        "games": 127385
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.5,
        "games": 173334
      }
    ],
    "bestSets": []
  },
  "609-mega": {
    "id": 609,
    "name": "Mega Chandelure",
    "isMega": true,
    "elo": 7959,
    "winRate": 51.5,
    "appearances": 25497,
    "wins": 13126,
    "losses": 12371,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 54,
        "games": 4899
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54,
        "games": 4899
      },
      {
        "name": "Krookodile",
        "winRate": 54,
        "games": 9712
      },
      {
        "name": "Umbreon",
        "winRate": 54,
        "games": 9712
      },
      {
        "name": "Abomasnow",
        "winRate": 54,
        "games": 4813
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 7953,
    "winRate": 48.7,
    "appearances": 14797,
    "wins": 7210,
    "losses": 7587,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 5077
      },
      {
        "name": "Wash Rotom",
        "winRate": 50.8,
        "games": 5077
      },
      {
        "name": "Basculegion-M",
        "winRate": 50.8,
        "games": 5077
      },
      {
        "name": "Aggron",
        "winRate": 49.8,
        "games": 4991
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 4991
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": 7952,
    "winRate": 50.1,
    "appearances": 278203,
    "wins": 139301,
    "losses": 138902,
    "bestPartners": [
      {
        "name": "Pangoro",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Tyranitar",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Hisuian Samurott",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Farigiraf",
        "winRate": 54,
        "games": 4801
      },
      {
        "name": "Zoroark",
        "winRate": 52.4,
        "games": 10045
      }
    ],
    "bestSets": []
  },
  "362-mega": {
    "id": 362,
    "name": "Mega Glalie",
    "isMega": true,
    "elo": 7952,
    "winRate": 50.9,
    "appearances": 15349,
    "wins": 7817,
    "losses": 7532,
    "bestPartners": [
      {
        "name": "Pelipper",
        "winRate": 52.9,
        "games": 4868
      },
      {
        "name": "Sneasler",
        "winRate": 52.9,
        "games": 4868
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.9,
        "games": 4868
      },
      {
        "name": "Gyarados",
        "winRate": 51.4,
        "games": 10165
      },
      {
        "name": "Charizard",
        "winRate": 51.4,
        "games": 10052
      }
    ],
    "bestSets": []
  },
  "3-mega": {
    "id": 3,
    "name": "Mega Venusaur",
    "isMega": true,
    "elo": 7952,
    "winRate": 55.9,
    "appearances": 13795,
    "wins": 7711,
    "losses": 6084,
    "bestPartners": [
      {
        "name": "Vaporeon",
        "winRate": 69,
        "games": 3680
      },
      {
        "name": "Aggron",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Feraligatr",
        "winRate": 59.4,
        "games": 8773
      },
      {
        "name": "Wash Rotom",
        "winRate": 57.9,
        "games": 8702
      },
      {
        "name": "Incineroar",
        "winRate": 57.9,
        "games": 8702
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 7949,
    "winRate": 51.5,
    "appearances": 20893,
    "wins": 10758,
    "losses": 10135,
    "bestPartners": [
      {
        "name": "Azumarill",
        "winRate": 53.3,
        "games": 4957
      },
      {
        "name": "Kingambit",
        "winRate": 52.4,
        "games": 10030
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Tinkaton",
        "winRate": 51.9,
        "games": 10278
      },
      {
        "name": "Scizor",
        "winRate": 51.9,
        "games": 10499
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": 7946,
    "winRate": 49.5,
    "appearances": 163810,
    "wins": 81098,
    "losses": 82712,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 50.6,
        "games": 5179
      },
      {
        "name": "Arbok",
        "winRate": 50.2,
        "games": 5182
      },
      {
        "name": "Snorlax",
        "winRate": 50.1,
        "games": 4934
      },
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 15409
      },
      {
        "name": "Gardevoir",
        "winRate": 50,
        "games": 5236
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 7946,
    "winRate": 51.3,
    "appearances": 20591,
    "wins": 10554,
    "losses": 10037,
    "bestPartners": [
      {
        "name": "Drampa",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Hydreigon",
        "winRate": 55.1,
        "games": 4774
      },
      {
        "name": "Sneasler",
        "winRate": 52.7,
        "games": 9996
      },
      {
        "name": "Dragapult",
        "winRate": 52.4,
        "games": 10163
      },
      {
        "name": "Krookodile",
        "winRate": 51.7,
        "games": 15202
      }
    ],
    "bestSets": []
  },
  "10678-mega": {
    "id": 10678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 7945,
    "winRate": 52,
    "appearances": 15119,
    "wins": 7858,
    "losses": 7261,
    "bestPartners": [
      {
        "name": "Paldean Tauros",
        "winRate": 56.9,
        "games": 4654
      },
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 56.9,
        "games": 4654
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 53.4,
        "games": 9696
      },
      {
        "name": "Incineroar",
        "winRate": 52.9,
        "games": 10077
      },
      {
        "name": "Kingambit",
        "winRate": 52.9,
        "games": 10077
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 7944,
    "winRate": 50.1,
    "appearances": 16184,
    "wins": 8114,
    "losses": 8070,
    "bestPartners": [
      {
        "name": "Basculegion-M",
        "winRate": 50.7,
        "games": 5421
      },
      {
        "name": "Whimsicott",
        "winRate": 50.7,
        "games": 5421
      },
      {
        "name": "Forretress",
        "winRate": 50.7,
        "games": 5421
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 10834
      },
      {
        "name": "Charizard",
        "winRate": 50.3,
        "games": 10834
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 7942,
    "winRate": 49.8,
    "appearances": 15390,
    "wins": 7658,
    "losses": 7732,
    "bestPartners": [
      {
        "name": "Empoleon",
        "winRate": 50.1,
        "games": 5147
      },
      {
        "name": "Tinkaton",
        "winRate": 50,
        "games": 10150
      },
      {
        "name": "Heat Rotom",
        "winRate": 49.9,
        "games": 5003
      },
      {
        "name": "Basculegion-M",
        "winRate": 49.9,
        "games": 5003
      },
      {
        "name": "Wash Rotom",
        "winRate": 49.9,
        "games": 5003
      }
    ],
    "bestSets": []
  },
  "18-mega": {
    "id": 18,
    "name": "Mega Pidgeot",
    "isMega": true,
    "elo": 7940,
    "winRate": 48.5,
    "appearances": 15453,
    "wins": 7500,
    "losses": 7953,
    "bestPartners": [
      {
        "name": "Luxray",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Garchomp",
        "winRate": 51,
        "games": 5423
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 10662
      },
      {
        "name": "Wyrdeer",
        "winRate": 48.7,
        "games": 5239
      },
      {
        "name": "Heat Rotom",
        "winRate": 48.7,
        "games": 5239
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": 7939,
    "winRate": 51.8,
    "appearances": 29950,
    "wins": 15526,
    "losses": 14424,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 55.8,
        "games": 4652
      },
      {
        "name": "Kingambit",
        "winRate": 54.9,
        "games": 9523
      },
      {
        "name": "Mega Dragonite",
        "winRate": 54.9,
        "games": 9523
      },
      {
        "name": "Greninja",
        "winRate": 54.9,
        "games": 9523
      },
      {
        "name": "Garchomp",
        "winRate": 54,
        "games": 4871
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 7934,
    "winRate": 50.4,
    "appearances": 158634,
    "wins": 79884,
    "losses": 78750,
    "bestPartners": [
      {
        "name": "Excadrill",
        "winRate": 52.7,
        "games": 20086
      },
      {
        "name": "Mega Dragonite",
        "winRate": 51.4,
        "games": 35564
      },
      {
        "name": "Mega Gengar",
        "winRate": 50.7,
        "games": 106503
      },
      {
        "name": "Mega Tyranitar",
        "winRate": 50.5,
        "games": 127385
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 133125
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 7930,
    "winRate": 46,
    "appearances": 14602,
    "wins": 6724,
    "losses": 7878,
    "bestPartners": [
      {
        "name": "Ditto",
        "winRate": 48.3,
        "games": 5216
      },
      {
        "name": "Arcanine",
        "winRate": 48.3,
        "games": 5216
      },
      {
        "name": "Incineroar",
        "winRate": 48.3,
        "games": 5216
      },
      {
        "name": "Bastiodon",
        "winRate": 47.9,
        "games": 10194
      },
      {
        "name": "Kingambit",
        "winRate": 47.5,
        "games": 4978
      }
    ],
    "bestSets": []
  },
  "354-mega": {
    "id": 354,
    "name": "Mega Banette",
    "isMega": true,
    "elo": 7928,
    "winRate": 46.1,
    "appearances": 14716,
    "wins": 6780,
    "losses": 7936,
    "bestPartners": [
      {
        "name": "Paldean Tauros (Aqua)",
        "winRate": 49,
        "games": 5126
      },
      {
        "name": "Greninja",
        "winRate": 49,
        "games": 5126
      },
      {
        "name": "Wyrdeer",
        "winRate": 48.4,
        "games": 10327
      },
      {
        "name": "Paldean Tauros (Blaze)",
        "winRate": 48.4,
        "games": 10327
      },
      {
        "name": "Zoroark",
        "winRate": 47.8,
        "games": 5201
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": 7925,
    "winRate": 50.9,
    "appearances": 15416,
    "wins": 7848,
    "losses": 7568,
    "bestPartners": [
      {
        "name": "Araquanid",
        "winRate": 53,
        "games": 4945
      },
      {
        "name": "Azumarill",
        "winRate": 53,
        "games": 4945
      },
      {
        "name": "Dragonite",
        "winRate": 51.6,
        "games": 10030
      },
      {
        "name": "Quaquaval",
        "winRate": 51.2,
        "games": 10331
      },
      {
        "name": "Pelipper",
        "winRate": 50.9,
        "games": 15416
      }
    ],
    "bestSets": []
  },
  "71-mega": {
    "id": 71,
    "name": "Mega Victreebel",
    "isMega": true,
    "elo": 7915,
    "winRate": 50.1,
    "appearances": 15898,
    "wins": 7971,
    "losses": 7927,
    "bestPartners": [
      {
        "name": "Tauros",
        "winRate": 50.8,
        "games": 5065
      },
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 5065
      },
      {
        "name": "Simipour",
        "winRate": 50.7,
        "games": 10489
      },
      {
        "name": "Slowbro",
        "winRate": 50.7,
        "games": 10489
      },
      {
        "name": "Salazzle",
        "winRate": 50.6,
        "games": 5424
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 7915,
    "winRate": 44.2,
    "appearances": 14150,
    "wins": 6248,
    "losses": 7902,
    "bestPartners": [
      {
        "name": "Machamp",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Azumarill",
        "winRate": 49.9,
        "games": 5146
      },
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 5238
      },
      {
        "name": "Krookodile",
        "winRate": 49.4,
        "games": 5238
      }
    ],
    "bestSets": []
  },
  "319-mega": {
    "id": 319,
    "name": "Mega Sharpedo",
    "isMega": true,
    "elo": 7883,
    "winRate": 40.4,
    "appearances": 13156,
    "wins": 5313,
    "losses": 7843,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Gyarados",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Venusaur",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Charizard",
        "winRate": 50.5,
        "games": 5423
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 42.7,
        "games": 9170
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Luxray",
    "pokemon2": "Mega Blastoise",
    "winRate": 73,
    "games": 3557
  },
  {
    "pokemon1": "Paldean Tauros (Blaze)",
    "pokemon2": "Kleavor",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Kleavor",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Paldean Tauros (Blaze)",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Paldean Tauros (Blaze)",
    "pokemon2": "Hisuian Goodra",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Hisuian Goodra",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Kingambit",
    "winRate": 70,
    "games": 3578
  },
  {
    "pokemon1": "Vaporeon",
    "pokemon2": "Mega Venusaur",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Vaporeon",
    "pokemon2": "Aggron",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Feraligatr",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Vaporeon",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Vaporeon",
    "pokemon2": "Feraligatr",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Vaporeon",
    "pokemon2": "Incineroar",
    "winRate": 69,
    "games": 3680
  },
  {
    "pokemon1": "Mow Rotom",
    "pokemon2": "Mega Blastoise",
    "winRate": 67.9,
    "games": 7573
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Mega Meowstic",
    "winRate": 67.9,
    "games": 3797
  },
  {
    "pokemon1": "Tauros",
    "pokemon2": "Mega Meowstic",
    "winRate": 67.9,
    "games": 3797
  },
  {
    "pokemon1": "Paldean Tauros",
    "pokemon2": "Azumarill",
    "winRate": 67.9,
    "games": 3797
  },
  {
    "pokemon1": "Paldean Tauros (Aqua)",
    "pokemon2": "Azumarill",
    "winRate": 67.9,
    "games": 3797
  },
  {
    "pokemon1": "Mega Floette",
    "pokemon2": "Kingambit",
    "winRate": 67,
    "games": 3877
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Pinsir",
    "winRate": 66.8,
    "games": 7753
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Pinsir",
    "winRate": 66.8,
    "games": 7753
  },
  {
    "pokemon1": "Pinsir",
    "pokemon2": "Kingambit",
    "winRate": 66.8,
    "games": 7753
  },
  {
    "pokemon1": "Pinsir",
    "pokemon2": "Tyranitar",
    "winRate": 66.8,
    "games": 7753
  },
  {
    "pokemon1": "Mega Greninja",
    "pokemon2": "Aegislash",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Mega Greninja",
    "pokemon2": "Sneasler",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Mega Greninja",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Arbok",
    "pokemon2": "Aegislash",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Paldean Tauros (Blaze)",
    "pokemon2": "Aegislash",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Venusaur",
    "pokemon2": "Sneasler",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Arbok",
    "pokemon2": "Venusaur",
    "winRate": 66.8,
    "games": 3792
  },
  {
    "pokemon1": "Tyranitar",
    "pokemon2": "Luxray",
    "winRate": 66.6,
    "games": 11640
  },
  {
    "pokemon1": "Kleavor",
    "pokemon2": "Kingambit",
    "winRate": 66.6,
    "games": 7540
  },
  {
    "pokemon1": "Hisuian Goodra",
    "pokemon2": "Kingambit",
    "winRate": 66.6,
    "games": 7540
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Pinsir",
    "winRate": 66.1,
    "games": 3887
  },
  {
    "pokemon1": "Mega Pinsir",
    "pokemon2": "Tyranitar",
    "winRate": 66.1,
    "games": 3887
  },
  {
    "pokemon1": "Aegislash",
    "pokemon2": "Sneasler",
    "winRate": 65.3,
    "games": 7813
  },
  {
    "pokemon1": "Wyrdeer",
    "pokemon2": "Sneasler",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Sneasler",
    "pokemon2": "Kingambit",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Cofagrigus",
    "pokemon2": "Sneasler",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Cofagrigus",
    "pokemon2": "Wyrdeer",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Aromatisse",
    "pokemon2": "Wyrdeer",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Azumarill",
    "pokemon2": "Cofagrigus",
    "winRate": 65.3,
    "games": 3911
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Torkoal",
    "winRate": 65,
    "games": 11744
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Slowbro",
    "winRate": 65,
    "games": 11744
  },
  {
    "pokemon1": "Snorlax",
    "pokemon2": "Drampa",
    "winRate": 64.8,
    "games": 11661
  },
  {
    "pokemon1": "Wash Rotom",
    "pokemon2": "Kingambit",
    "winRate": 64.2,
    "games": 28121
  },
  {
    "pokemon1": "Slowbro",
    "pokemon2": "Hatterene",
    "winRate": 63.8,
    "games": 8100
  },
  {
    "pokemon1": "Torkoal",
    "pokemon2": "Drampa",
    "winRate": 63.8,
    "games": 11819
  },
  {
    "pokemon1": "Pelipper",
    "pokemon2": "Aegislash",
    "winRate": 63.8,
    "games": 4021
  },
  {
    "pokemon1": "Pelipper",
    "pokemon2": "Mega Floette",
    "winRate": 63.8,
    "games": 4021
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "custom",
    "elo": 30100,
    "winRate": 52.5,
    "wins": 37574,
    "losses": 33999
  },
  {
    "name": "Kleavor Build",
    "elo": 23668,
    "winRate": 61.1,
    "wins": 7646,
    "losses": 4875
  },
  {
    "name": "Hard Trick Room",
    "elo": 23236,
    "winRate": 60.6,
    "wins": 7775,
    "losses": 5058
  },
  {
    "name": "Mega Blastoise",
    "elo": 23172,
    "winRate": 60.7,
    "wins": 7705,
    "losses": 4996
  },
  {
    "name": "Pinsir Base",
    "elo": 22372,
    "winRate": 66.8,
    "wins": 5181,
    "losses": 2572
  },
  {
    "name": "Mega Clefable",
    "elo": 16172,
    "winRate": 56.6,
    "wins": 7875,
    "losses": 6041
  },
  {
    "name": "Rain",
    "elo": 15628,
    "winRate": 50.7,
    "wins": 64268,
    "losses": 62502
  },
  {
    "name": "Heracross Base",
    "elo": 15468,
    "winRate": 60.2,
    "wins": 5143,
    "losses": 3397
  },
  {
    "name": "Mega Meowstic-M",
    "elo": 15060,
    "winRate": 56.3,
    "wins": 7558,
    "losses": 5863
  },
  {
    "name": "Mega Venusaur",
    "elo": 14516,
    "winRate": 55.9,
    "wins": 7711,
    "losses": 6084
  },
  {
    "name": "Slowbro Trick Room",
    "elo": 14460,
    "winRate": 55.9,
    "wins": 7698,
    "losses": 6078
  },
  {
    "name": "Mega Floette",
    "elo": 14028,
    "winRate": 55.6,
    "wins": 7806,
    "losses": 6240
  },
  {
    "name": "Mega Pinsir",
    "elo": 12660,
    "winRate": 55,
    "wins": 7634,
    "losses": 6239
  },
  {
    "name": "Primarina Build",
    "elo": 10276,
    "winRate": 55.7,
    "wins": 5328,
    "losses": 4231
  },
  {
    "name": "Mega Greninja",
    "elo": 10236,
    "winRate": 53.7,
    "wins": 7832,
    "losses": 6740
  },
  {
    "name": "Hyper Offense",
    "elo": 9604,
    "winRate": 51,
    "wins": 26018,
    "losses": 25005
  },
  {
    "name": "Mega Heracross",
    "elo": 9596,
    "winRate": 53.6,
    "wins": 7537,
    "losses": 6525
  },
  {
    "name": "Mega Slowbro",
    "elo": 9580,
    "winRate": 53.4,
    "wins": 7979,
    "losses": 6969
  },
  {
    "name": "Mega Froslass",
    "elo": 9540,
    "winRate": 53.4,
    "wins": 7809,
    "losses": 6804
  },
  {
    "name": "Meowstic-F Base",
    "elo": 8828,
    "winRate": 54.8,
    "wins": 5247,
    "losses": 4331
  },
  {
    "name": "Mega Chandelure",
    "elo": 8068,
    "winRate": 52.8,
    "wins": 7816,
    "losses": 6995
  },
  {
    "name": "Mega Delphox",
    "elo": 8036,
    "winRate": 52.7,
    "wins": 7977,
    "losses": 7160
  },
  {
    "name": "Mega Altaria",
    "elo": 7500,
    "winRate": 52.6,
    "wins": 7710,
    "losses": 6960
  },
  {
    "name": "Slurpuff Build",
    "elo": 7300,
    "winRate": 52.4,
    "wins": 7844,
    "losses": 7119
  },
  {
    "name": "Mega Scovillain",
    "elo": 7068,
    "winRate": 52.4,
    "wins": 7742,
    "losses": 7046
  },
  {
    "name": "Mega Steelix",
    "elo": 6388,
    "winRate": 52,
    "wins": 8009,
    "losses": 7398
  },
  {
    "name": "Meowstic-M Base",
    "elo": 6380,
    "winRate": 53,
    "wins": 5339,
    "losses": 4729
  },
  {
    "name": "Delphox Base",
    "elo": 6356,
    "winRate": 53.1,
    "wins": 5255,
    "losses": 4648
  },
  {
    "name": "Mega Meowstic-F",
    "elo": 6276,
    "winRate": 52,
    "wins": 7858,
    "losses": 7261
  },
  {
    "name": "Mega Charizard",
    "elo": 5828,
    "winRate": 50.9,
    "wins": 15366,
    "losses": 14825
  },
  {
    "name": "Standard",
    "elo": 5780,
    "winRate": 50.1,
    "wins": 91534,
    "losses": 90999
  },
  {
    "name": "Mega Skarmory",
    "elo": 5780,
    "winRate": 51.7,
    "wins": 7960,
    "losses": 7425
  },
  {
    "name": "Body Press",
    "elo": 5484,
    "winRate": 55.3,
    "wins": 2600,
    "losses": 2102
  },
  {
    "name": "Sand Rush",
    "elo": 5452,
    "winRate": 50.8,
    "wins": 15710,
    "losses": 15216
  },
  {
    "name": "Armarouge Build",
    "elo": 5340,
    "winRate": 51.6,
    "wins": 7981,
    "losses": 7501
  },
  {
    "name": "Gliscor Build",
    "elo": 5324,
    "winRate": 54.9,
    "wins": 2673,
    "losses": 2195
  },
  {
    "name": "Mega Glimmora",
    "elo": 5276,
    "winRate": 51.5,
    "wins": 7939,
    "losses": 7467
  },
  {
    "name": "Mega Garchomp",
    "elo": 5180,
    "winRate": 51.5,
    "wins": 8140,
    "losses": 7680
  },
  {
    "name": "Clefable Base",
    "elo": 4604,
    "winRate": 51.9,
    "wins": 5332,
    "losses": 4944
  },
  {
    "name": "Mr. Rime Build",
    "elo": 4260,
    "winRate": 51.1,
    "wins": 7807,
    "losses": 7462
  },
  {
    "name": "Tyranitar Base",
    "elo": 3980,
    "winRate": 51.5,
    "wins": 5348,
    "losses": 5038
  },
  {
    "name": "Bulky Offense",
    "elo": 3972,
    "winRate": 50.6,
    "wins": 13207,
    "losses": 12898
  },
  {
    "name": "Pikachu Build",
    "elo": 3948,
    "winRate": 51,
    "wins": 8166,
    "losses": 7860
  },
  {
    "name": "Diggersby Build",
    "elo": 3844,
    "winRate": 50.9,
    "wins": 7914,
    "losses": 7621
  },
  {
    "name": "Mega Glalie",
    "elo": 3780,
    "winRate": 50.9,
    "wins": 7817,
    "losses": 7532
  },
  {
    "name": "Mega Excadrill",
    "elo": 3740,
    "winRate": 50.9,
    "wins": 7848,
    "losses": 7568
  },
  {
    "name": "Mega Camerupt",
    "elo": 3388,
    "winRate": 50.7,
    "wins": 7998,
    "losses": 7762
  },
  {
    "name": "Clawitzer Build",
    "elo": 3292,
    "winRate": 50.7,
    "wins": 7955,
    "losses": 7731
  },
  {
    "name": "Basculegion-F Build",
    "elo": 3276,
    "winRate": 50.7,
    "wins": 8101,
    "losses": 7879
  },
  {
    "name": "Mega Feraligatr",
    "elo": 3252,
    "winRate": 50.7,
    "wins": 7983,
    "losses": 7764
  }
];

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [
  {
    "name": "Stone Axe",
    "winRate": 61.1,
    "appearances": 12521
  },
  {
    "name": "Megahorn",
    "winRate": 60.2,
    "appearances": 8540
  },
  {
    "name": "X-Scissor",
    "winRate": 54.9,
    "appearances": 51343
  },
  {
    "name": "Strength Sap",
    "winRate": 54.7,
    "appearances": 4788
  },
  {
    "name": "Curse",
    "winRate": 54.4,
    "appearances": 36077
  },
  {
    "name": "Calm Mind",
    "winRate": 54,
    "appearances": 52521
  },
  {
    "name": "Low Kick",
    "winRate": 53.8,
    "appearances": 111180
  },
  {
    "name": "Pin Missile",
    "winRate": 53.6,
    "appearances": 14062
  },
  {
    "name": "Electro Shot",
    "winRate": 53.4,
    "appearances": 234569
  },
  {
    "name": "Fire Blast",
    "winRate": 53,
    "appearances": 14505
  },
  {
    "name": "Belly Drum",
    "winRate": 52.7,
    "appearances": 159191
  },
  {
    "name": "Discharge",
    "winRate": 52.6,
    "appearances": 39273
  },
  {
    "name": "Water Pulse",
    "winRate": 52.4,
    "appearances": 76218
  },
  {
    "name": "Draco Meteor",
    "winRate": 52.2,
    "appearances": 625850
  },
  {
    "name": "Aura Sphere",
    "winRate": 52,
    "appearances": 105913
  },
  {
    "name": "Aqua Jet",
    "winRate": 52,
    "appearances": 246071
  },
  {
    "name": "Quick Attack",
    "winRate": 51.8,
    "appearances": 45012
  },
  {
    "name": "Muddy Water",
    "winRate": 51.7,
    "appearances": 60461
  },
  {
    "name": "Flash Cannon",
    "winRate": 51.6,
    "appearances": 825989
  },
  {
    "name": "Facade",
    "winRate": 51.6,
    "appearances": 25367
  },
  {
    "name": "Hydro Pump",
    "winRate": 51.5,
    "appearances": 488348
  },
  {
    "name": "Scald",
    "winRate": 51.5,
    "appearances": 295350
  },
  {
    "name": "Energy Ball",
    "winRate": 51.4,
    "appearances": 151811
  },
  {
    "name": "Kowtow Cleave",
    "winRate": 51.4,
    "appearances": 804654
  },
  {
    "name": "Volt Switch",
    "winRate": 51.4,
    "appearances": 437602
  },
  {
    "name": "Power Whip",
    "winRate": 51.4,
    "appearances": 85663
  },
  {
    "name": "Ceaseless Edge",
    "winRate": 51.4,
    "appearances": 60930
  },
  {
    "name": "Razor Shell",
    "winRate": 51.4,
    "appearances": 60930
  },
  {
    "name": "Explosion",
    "winRate": 51.4,
    "appearances": 10165
  },
  {
    "name": "Play Rough",
    "winRate": 51.3,
    "appearances": 276270
  },
  {
    "name": "Sacred Sword",
    "winRate": 51.3,
    "appearances": 97282
  },
  {
    "name": "Armor Cannon",
    "winRate": 51.3,
    "appearances": 20662
  },
  {
    "name": "Sludge Wave",
    "winRate": 51.2,
    "appearances": 25970
  },
  {
    "name": "Draining Kiss",
    "winRate": 51.2,
    "appearances": 5116
  },
  {
    "name": "Amnesia",
    "winRate": 51.2,
    "appearances": 5253
  },
  {
    "name": "Dire Claw",
    "winRate": 51.1,
    "appearances": 137873
  },
  {
    "name": "Dual Wingbeat",
    "winRate": 51.1,
    "appearances": 35559
  },
  {
    "name": "Vacuum Wave",
    "winRate": 51.1,
    "appearances": 29734
  },
  {
    "name": "Yawn",
    "winRate": 51.1,
    "appearances": 41222
  },
  {
    "name": "Power Gem",
    "winRate": 51.1,
    "appearances": 31001
  },
  {
    "name": "Rock Blast",
    "winRate": 51.1,
    "appearances": 30074
  },
  {
    "name": "Follow Me",
    "winRate": 51,
    "appearances": 123845
  },
  {
    "name": "Water Shuriken",
    "winRate": 51,
    "appearances": 5270
  },
  {
    "name": "Ice Punch",
    "winRate": 50.9,
    "appearances": 690366
  },
  {
    "name": "Liquidation",
    "winRate": 50.9,
    "appearances": 138892
  },
  {
    "name": "Aqua Step",
    "winRate": 50.9,
    "appearances": 15618
  },
  {
    "name": "Feint",
    "winRate": 50.9,
    "appearances": 5029
  },
  {
    "name": "Iron Tail",
    "winRate": 50.9,
    "appearances": 5237
  },
  {
    "name": "Swords Dance",
    "winRate": 50.8,
    "appearances": 1115025
  },
  {
    "name": "Trick",
    "winRate": 50.8,
    "appearances": 10149
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Mr. Rime",
    "Wash Rotom",
    "Kleavor",
    "Archaludon",
    "Heracross",
    "Milotic",
    "Slowking",
    "Mega Greninja",
    "Orthworm",
    "Pinsir",
    "Kingambit",
    "Basculegion-M",
    "Aerodactyl",
    "Mega Ampharos",
    "Mega Houndoom",
    "Mega Pinsir",
    "Mega Altaria",
    "Mega Froslass",
    "Avalugg",
    "Salazzle",
    "Mega Heracross",
    "Simisage"
  ],
  "tier2": [
    "Empoleon",
    "Palafin",
    "Mega Abomasnow",
    "Diggersby",
    "Luxray",
    "Steelix",
    "Hisuian Goodra",
    "Mega Hawlucha",
    "Samurott",
    "Stunfisk",
    "Hisuian Zoroark",
    "Dragapult",
    "Mega Charizard X",
    "Mega Steelix",
    "Mega Gardevoir",
    "Victreebel",
    "Mega Aggron",
    "Decidueye",
    "Camerupt",
    "Arbok",
    "Heat Rotom",
    "Mega Slowbro",
    "Paldean Tauros",
    "Mega Gyarados",
    "Flareon",
    "Tauros",
    "Incineroar",
    "Sinistcha",
    "Politoed",
    "Fan Rotom",
    "Pidgeot",
    "Abomasnow",
    "Mega Camerupt",
    "Espeon",
    "Paldean Tauros (Aqua)",
    "Greninja",
    "Charizard",
    "Whimsicott",
    "Typhlosion",
    "Absol",
    "Mega Chimecho",
    "Scovillain",
    "Primarina",
    "Ursaluna",
    "Tinkaton",
    "Hydreigon"
  ],
  "tier3": [
    "Mega Floette",
    "Simisear",
    "Mega Emboar",
    "Ceruledge",
    "Slurpuff",
    "Tyranitar",
    "Morpeko",
    "Hisuian Samurott",
    "Delphox",
    "Wyrdeer",
    "Beartic",
    "Sylveon",
    "Hisuian Decidueye",
    "Glimmora",
    "Pangoro",
    "Mega Blastoise",
    "Froslass",
    "Mega Meowstic",
    "Ampharos",
    "Alolan Raichu",
    "Mega Clefable",
    "Slowbro",
    "Gyarados",
    "Galarian Stunfisk",
    "Garganacl",
    "Hisuian Typhlosion",
    "Mega Charizard Y",
    "Aggron",
    "Emolga",
    "Mudsdale",
    "Mega Delphox",
    "Mega Manectric",
    "Feraligatr",
    "Gliscor",
    "Vaporeon",
    "Meowscarada",
    "Mega Medicham",
    "Houndoom",
    "Ditto",
    "Mega Audino",
    "Garchomp",
    "Arcanine",
    "Weavile",
    "Mega Glimmora",
    "Mega Sableye",
    "Azumarill",
    "Hatterene",
    "Dragonite",
    "Blastoise",
    "Pelipper",
    "Kommo-o",
    "Espathra",
    "Spiritomb",
    "Altaria",
    "Mega Beedrill",
    "Toucannon",
    "Hippowdon",
    "Aegislash",
    "Aromatisse",
    "Mega Crabominable",
    "Polteageist",
    "Kangaskhan",
    "Roserade",
    "Passimian",
    "Clawitzer",
    "Mega Scovillain",
    "Paldean Tauros (Blaze)",
    "Corviknight",
    "Mega Absol",
    "Mega Metagross",
    "Venusaur",
    "Lucario",
    "Sneasler",
    "Sableye",
    "Furfrou",
    "Galarian Slowking",
    "Mega Starmie",
    "Scizor",
    "Hisuian Arcanine",
    "Cofagrigus",
    "Mega Aerodactyl"
  ],
  "dominantArchetypes": [
    "custom",
    "Kleavor Build",
    "Hard Trick Room",
    "Mega Blastoise",
    "Pinsir Base"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Meowstic-M",
    "Banette",
    "Flapple",
    "Gallade",
    "Mega Alakazam"
  ],
  "bestCores": [
    "Luxray + Mega Blastoise",
    "Paldean Tauros (Blaze) + Kleavor",
    "Mow Rotom + Kleavor",
    "Wash Rotom + Paldean Tauros (Blaze)",
    "Paldean Tauros (Blaze) + Hisuian Goodra"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 2000000;

/** Simulation date */
export const SIM_DATE = "2026-04-13T15:35:08.494Z";

// ═══════════════════════════════════════════════════════════════════════════════
// ANTI-META TEAMS — Engine-generated counter teams built around anti-meta cores
// Auto-updated by run-million.ts after each simulation run
// ═══════════════════════════════════════════════════════════════════════════════
export interface AntiMetaTeam {
  id: string;
  name: string;
  strategy: string;
  pokemonIds: number[];
  coreIds: number[];
  winVsMeta: number;
  counters: string[];
  weakTo: string[];
}

export const ANTI_META_TEAMS: AntiMetaTeam[] = [
  {
    "id": "am-1",
    "name": "Mega Pinsir Core",
    "strategy": "Built around Mega Pinsir (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      127,
      1018,
      248,
      10009,
      983,
      405
    ],
    "coreIds": [
      127,
      1018,
      248
    ],
    "winVsMeta": 52.2,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  },
  {
    "id": "am-2",
    "name": "Altaria Core",
    "strategy": "Built around Altaria (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      334,
      208,
      350,
      866,
      10009,
      900
    ],
    "coreIds": [
      334,
      208,
      350
    ],
    "winVsMeta": 53.2,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  },
  {
    "id": "am-3",
    "name": "Froslass Core",
    "strategy": "Built around Froslass (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      478,
      660,
      503,
      866,
      10009,
      900
    ],
    "coreIds": [
      478,
      660,
      503
    ],
    "winVsMeta": 53.1,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  },
  {
    "id": "am-4",
    "name": "Avalugg Core",
    "strategy": "Built around Avalugg (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      713,
      130,
      903,
      658,
      3,
      681
    ],
    "coreIds": [
      713,
      130,
      903
    ],
    "winVsMeta": 50.9,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  },
  {
    "id": "am-5",
    "name": "Salazzle Core",
    "strategy": "Built around Salazzle (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      758,
      685,
      983,
      10012,
      670,
      127
    ],
    "coreIds": [
      758,
      685,
      983
    ],
    "winVsMeta": 51.2,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  },
  {
    "id": "am-6",
    "name": "Mega Heracross Core",
    "strategy": "Built around Mega Heracross (100 anti-meta score). Counters Milotic and Slowking.",
    "pokemonIds": [
      214,
      1018,
      10009,
      10251,
      160,
      134
    ],
    "coreIds": [
      214,
      1018,
      10009
    ],
    "winVsMeta": 52.5,
    "counters": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom"
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// ANTI-META RANKINGS — Pokemon that perform best against the current meta
// Auto-updated by run-million.ts after each simulation run
// ═══════════════════════════════════════════════════════════════════════════════
export interface AntiMetaEntry {
  id: number;
  name: string;
  score: number;
  winVsMeta: number;
  counterCount: number;
  bestInto: string[];
  weakTo: string[];
}

export const ANTI_META_RANKINGS: AntiMetaEntry[] = [
  {
    "id": 127,
    "name": "Mega Pinsir",
    "score": 100,
    "winVsMeta": 55,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 334,
    "name": "Mega Altaria",
    "score": 100,
    "winVsMeta": 52.6,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 478,
    "name": "Mega Froslass",
    "score": 100,
    "winVsMeta": 53.4,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 713,
    "name": "Avalugg",
    "score": 100,
    "winVsMeta": 47.8,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 758,
    "name": "Salazzle",
    "score": 100,
    "winVsMeta": 46.2,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 214,
    "name": "Mega Heracross",
    "score": 100,
    "winVsMeta": 53.6,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 512,
    "name": "Simisage",
    "score": 100,
    "winVsMeta": 50,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 395,
    "name": "Empoleon",
    "score": 100,
    "winVsMeta": 50.8,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 964,
    "name": "Palafin",
    "score": 100,
    "winVsMeta": 50.3,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 460,
    "name": "Mega Abomasnow",
    "score": 100,
    "winVsMeta": 50,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 660,
    "name": "Diggersby",
    "score": 100,
    "winVsMeta": 50.9,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 405,
    "name": "Luxray",
    "score": 100,
    "winVsMeta": 49.5,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 208,
    "name": "Steelix",
    "score": 100,
    "winVsMeta": 48.7,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 5706,
    "name": "Hisuian Goodra",
    "score": 100,
    "winVsMeta": 53.4,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  },
  {
    "id": 701,
    "name": "Mega Hawlucha",
    "score": 100,
    "winVsMeta": 49.9,
    "counterCount": 3,
    "bestInto": [
      "Milotic",
      "Slowking",
      "Mega Greninja"
    ],
    "weakTo": [
      "Mr. Rime",
      "Wash Rotom",
      "Kleavor"
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS TOURNAMENT USAGE — Real data scraped from Limitless
// 1,410 teams across 14 Pokémon Champions community tournaments (Apr 2026)
// Source: play.limitlesstcg.com API
// ═══════════════════════════════════════════════════════════════════════════════
export interface ChampionsTournamentUsage {
  rank: number;
  name: string;
  count: number;       // Number of teams using this Pokémon
  usagePct: number;    // Usage percentage across all 1,410 teams
  top8Count: number;   // How many top-8 finishes included this Pokémon
}

export const CHAMPIONS_TOURNAMENT_TOTAL_TEAMS = 1410;
export const CHAMPIONS_TOURNAMENT_COUNT = 14;
export const CHAMPIONS_TOURNAMENT_DATE = "2026-04-12";

export const CHAMPIONS_TOURNAMENT_USAGE: ChampionsTournamentUsage[] = [
  { rank: 1, name: "Incineroar", count: 749, usagePct: 53.1, top8Count: 57 },
  { rank: 2, name: "Sneasler", count: 609, usagePct: 43.2, top8Count: 59 },
  { rank: 3, name: "Sinistcha", count: 507, usagePct: 36.0, top8Count: 40 },
  { rank: 4, name: "Garchomp", count: 497, usagePct: 35.2, top8Count: 44 },
  { rank: 5, name: "Kingambit", count: 361, usagePct: 25.6, top8Count: 40 },
  { rank: 6, name: "Basculegion", count: 308, usagePct: 21.8, top8Count: 26 },
  { rank: 7, name: "Whimsicott", count: 307, usagePct: 21.8, top8Count: 26 },
  { rank: 8, name: "Pelipper", count: 268, usagePct: 19.0, top8Count: 10 },
  { rank: 9, name: "Charizard", count: 212, usagePct: 15.0, top8Count: 15 },
  { rank: 10, name: "Archaludon", count: 211, usagePct: 15.0, top8Count: 6 },
  { rank: 11, name: "Tyranitar", count: 207, usagePct: 14.7, top8Count: 19 },
  { rank: 12, name: "Dragonite", count: 203, usagePct: 14.4, top8Count: 17 },
  { rank: 13, name: "Wash Rotom", count: 194, usagePct: 13.8, top8Count: 23 },
  { rank: 14, name: "Farigiraf", count: 177, usagePct: 12.6, top8Count: 14 },
  { rank: 15, name: "Venusaur", count: 146, usagePct: 10.4, top8Count: 9 },
  { rank: 16, name: "Maushold", count: 136, usagePct: 9.6, top8Count: 11 },
  { rank: 17, name: "Gengar", count: 131, usagePct: 9.3, top8Count: 6 },
  { rank: 18, name: "Milotic", count: 131, usagePct: 9.3, top8Count: 9 },
  { rank: 19, name: "Excadrill", count: 122, usagePct: 8.7, top8Count: 10 },
  { rank: 20, name: "Floette", count: 110, usagePct: 7.8, top8Count: 10 },
  { rank: 21, name: "Corviknight", count: 104, usagePct: 7.4, top8Count: 8 },
  { rank: 22, name: "Gardevoir", count: 101, usagePct: 7.2, top8Count: 8 },
  { rank: 23, name: "Talonflame", count: 100, usagePct: 7.1, top8Count: 8 },
  { rank: 24, name: "Primarina", count: 97, usagePct: 6.9, top8Count: 9 },
  { rank: 25, name: "Mega Floette", count: 94, usagePct: 6.7, top8Count: 13 },
  { rank: 26, name: "Froslass", count: 90, usagePct: 6.4, top8Count: 3 },
  { rank: 27, name: "Palafin", count: 85, usagePct: 6.0, top8Count: 5 },
  { rank: 28, name: "Kommo-o", count: 79, usagePct: 5.6, top8Count: 10 },
  { rank: 29, name: "Gyarados", count: 76, usagePct: 5.4, top8Count: 5 },
  { rank: 30, name: "Aerodactyl", count: 72, usagePct: 5.1, top8Count: 12 },
  { rank: 31, name: "Hisuian Arcanine", count: 69, usagePct: 4.9, top8Count: 10 },
  { rank: 32, name: "Torkoal", count: 66, usagePct: 4.7, top8Count: 6 },
  { rank: 33, name: "Politoed", count: 65, usagePct: 4.6, top8Count: 3 },
  { rank: 34, name: "Sylveon", count: 62, usagePct: 4.4, top8Count: 3 },
  { rank: 35, name: "Clefable", count: 60, usagePct: 4.3, top8Count: 4 },
  { rank: 36, name: "Dragapult", count: 54, usagePct: 3.8, top8Count: 2 },
  { rank: 37, name: "Alolan Ninetales", count: 52, usagePct: 3.7, top8Count: 1 },
  { rank: 38, name: "Mega Charizard Y", count: 51, usagePct: 3.6, top8Count: 5 },
  { rank: 39, name: "Mega Froslass", count: 48, usagePct: 3.4, top8Count: 5 },
  { rank: 40, name: "Hydreigon", count: 41, usagePct: 2.9, top8Count: 2 },
  { rank: 41, name: "Glimmora", count: 40, usagePct: 2.8, top8Count: 6 },
  { rank: 42, name: "Delphox", count: 39, usagePct: 2.8, top8Count: 7 },
  { rank: 43, name: "Mega Gengar", count: 39, usagePct: 2.8, top8Count: 3 },
  { rank: 44, name: "Aegislash", count: 39, usagePct: 2.8, top8Count: 2 },
  { rank: 45, name: "Kangaskhan", count: 38, usagePct: 2.7, top8Count: 3 },
  { rank: 46, name: "Hisuian Typhlosion", count: 36, usagePct: 2.6, top8Count: 1 },
  { rank: 47, name: "Meganium", count: 36, usagePct: 2.6, top8Count: 6 },
  { rank: 48, name: "Volcarona", count: 33, usagePct: 2.3, top8Count: 2 },
  { rank: 49, name: "Mega Dragonite", count: 32, usagePct: 2.3, top8Count: 0 },
  { rank: 50, name: "Heat Rotom", count: 31, usagePct: 2.2, top8Count: 1 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS TOURNAMENT TEAMS — Top-8 team compositions from Limitless
// 122 unique teams from 18 Pokémon Champions community tournaments
// Source: play.limitlesstcg.com API
// ═══════════════════════════════════════════════════════════════════════════════
export interface ChampionsTournamentTeam {
  id: string;
  tournament: string;
  players: number;       // Tournament size (total entrants)
  placement: number;
  player: string;
  wins: number;
  losses: number;
  pokemonIds: number[];
  pokemonNames: string[];
}

export const CHAMPIONS_TOURNAMENT_TEAMS: ChampionsTournamentTeam[] = [
  { id: "ct-1", tournament: "Pokemon Champions First Tour $500 Prize Pool", players: 532, placement: 2, player: "BIlllmads", wins: 12, losses: 3, pokemonIds: [6, 547, 981, 903, 445, 983], pokemonNames: ["Charizard", "Whimsicott", "Farigiraf", "Sneasler", "Garchomp", "Kingambit"] },
  { id: "ct-2", tournament: "Pokemon Champions First Tour $500 Prize Pool", players: 532, placement: 3, player: "sempra", wins: 11, losses: 3, pokemonIds: [6, 547, 902, 981, 115, 903], pokemonNames: ["Charizard", "Whimsicott", "Basculegion", "Farigiraf", "Kangaskhan", "Sneasler"] },
  { id: "ct-3", tournament: "Pokemon Champions First Tour $500 Prize Pool", players: 532, placement: 6, player: "nckster", wins: 11, losses: 2, pokemonIds: [6, 3, 547, 727, 983, 445], pokemonNames: ["Charizard", "Venusaur", "Whimsicott", "Incineroar", "Kingambit", "Garchomp"] },
  { id: "ct-4", tournament: "Pokemon Champions First Tour $500 Prize Pool", players: 532, placement: 8, player: "Kotori", wins: 10, losses: 3, pokemonIds: [186, 94, 727, 964, 547, 784], pokemonNames: ["Politoed", "Gengar", "Incineroar", "Palafin", "Whimsicott", "Kommo-o"] },
  { id: "ct-5", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 1, player: "Striider", wins: 11, losses: 2, pokemonIds: [727, 94, 670, 186, 547, 784], pokemonNames: ["Incineroar", "Gengar", "Floette", "Politoed", "Whimsicott", "Kommo-o"] },
  { id: "ct-6", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 2, player: "masterriolu", wins: 12, losses: 1, pokemonIds: [248, 10009, 445, 142, 1013, 903], pokemonNames: ["Tyranitar", "Wash Rotom", "Garchomp", "Aerodactyl", "Sinistcha", "Sneasler"] },
  { id: "ct-7", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 3, player: "Z2R caiovibora", wins: 10, losses: 2, pokemonIds: [983, 903, 663, 445, 478, 350], pokemonNames: ["Kingambit", "Sneasler", "Talonflame", "Garchomp", "Mega Froslass", "Milotic"] },
  { id: "ct-8", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 4, player: "Werick", wins: 9, losses: 3, pokemonIds: [94, 248, 10009, 445, 700, 530], pokemonNames: ["Gengar", "Tyranitar", "Wash Rotom", "Garchomp", "Sylveon", "Excadrill"] },
  { id: "ct-9", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 5, player: "Sirox", wins: 9, losses: 2, pokemonIds: [478, 547, 5059, 983, 784, 10009], pokemonNames: ["Mega Froslass", "Whimsicott", "Hisuian Arcanine", "Kingambit", "Kommo-o", "Wash Rotom"] },
  { id: "ct-10", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 6, player: "Davidshu48", wins: 8, losses: 3, pokemonIds: [154, 26, 663, 350, 981, 635], pokemonNames: ["Meganium", "Raichu", "Talonflame", "Milotic", "Farigiraf", "Hydreigon"] },
  { id: "ct-11", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 7, player: "winton", wins: 8, losses: 3, pokemonIds: [778, 858, 324, 623, 780, 981], pokemonNames: ["Mimikyu", "Hatterene", "Torkoal", "Golurk", "Drampa", "Farigiraf"] },
  { id: "ct-12", tournament: "Pokemon Champions Challenge #1", players: 203, placement: 8, player: "volcaronavgc", wins: 8, losses: 3, pokemonIds: [10009, 445, 6, 903, 547, 983], pokemonNames: ["Wash Rotom", "Garchomp", "Mega Charizard Y", "Sneasler", "Whimsicott", "Kingambit"] },
  { id: "ct-13", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 1, player: "pokefey", wins: 10, losses: 1, pokemonIds: [727, 981, 623, 903, 324, 3], pokemonNames: ["Incineroar", "Farigiraf", "Mega Golurk", "Sneasler", "Torkoal", "Venusaur"] },
  { id: "ct-14", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 2, player: "Guixx", wins: 9, losses: 2, pokemonIds: [6, 925, 903, 887, 983, 445], pokemonNames: ["Charizard", "Maushold", "Sneasler", "Dragapult", "Kingambit", "Garchomp"] },
  { id: "ct-15", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 3, player: "413X", wins: 9, losses: 1, pokemonIds: [727, 1013, 670, 903, 445, 1018], pokemonNames: ["Incineroar", "Sinistcha", "Mega Floette", "Sneasler", "Garchomp", "Archaludon"] },
  { id: "ct-16", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 4, player: "David Y", wins: 8, losses: 2, pokemonIds: [670, 445, 663, 681, 925, 10009], pokemonNames: ["Floette", "Garchomp", "Talonflame", "Aegislash", "Maushold", "Wash Rotom"] },
  { id: "ct-17", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 5, player: "Shishio_Ax", wins: 8, losses: 1, pokemonIds: [6, 547, 445, 903, 681, 727], pokemonNames: ["Charizard", "Whimsicott", "Garchomp", "Sneasler", "Aegislash", "Incineroar"] },
  { id: "ct-18", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 6, player: "LenVGC", wins: 7, losses: 2, pokemonIds: [59, 10009, 445, 282, 1013, 248], pokemonNames: ["Arcanine", "Wash Rotom", "Garchomp", "Mega Gardevoir", "Sinistcha", "Tyranitar"] },
  { id: "ct-19", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 7, player: "Arnau", wins: 7, losses: 2, pokemonIds: [6, 925, 445, 983, 903, 94], pokemonNames: ["Mega Charizard Y", "Maushold", "Garchomp", "Kingambit", "Sneasler", "Mega Gengar"] },
  { id: "ct-20", tournament: "TORNEO SALIDA POKMON CHAMPIONS", players: 173, placement: 8, player: "SrRedox", wins: 6, losses: 3, pokemonIds: [154, 279, 1013, 902, 983, 1018], pokemonNames: ["Meganium", "Pelipper", "Sinistcha", "Basculegion", "Kingambit", "Archaludon"] },
  { id: "ct-21", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 1, player: "Magnetman", wins: 11, losses: 1, pokemonIds: [530, 248, 1013, 10009, 727, 670], pokemonNames: ["Excadrill", "Tyranitar", "Sinistcha", "Wash Rotom", "Incineroar", "Floette"] },
  { id: "ct-22", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 2, player: "MammothVGC", wins: 9, losses: 3, pokemonIds: [730, 1013, 727, 983, 903, 149], pokemonNames: ["Primarina", "Sinistcha", "Incineroar", "Kingambit", "Sneasler", "Dragonite"] },
  { id: "ct-23", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 4, player: "Mareeoh8", wins: 8, losses: 3, pokemonIds: [727, 350, 784, 227, 970, 473], pokemonNames: ["Incineroar", "Milotic", "Kommo-o", "Skarmory", "Glimmora", "Mamoswine"] },
  { id: "ct-24", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 5, player: "Jorge_prods", wins: 8, losses: 2, pokemonIds: [983, 149, 903, 3, 727, 902], pokemonNames: ["Kingambit", "Dragonite", "Sneasler", "Venusaur", "Incineroar", "Basculegion"] },
  { id: "ct-25", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 6, player: "Alyse J", wins: 8, losses: 2, pokemonIds: [186, 970, 547, 637, 130, 10009], pokemonNames: ["Politoed", "Glimmora", "Whimsicott", "Volcarona", "Gyarados", "Wash Rotom"] },
  { id: "ct-26", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 7, player: "jimmysley28", wins: 8, losses: 2, pokemonIds: [530, 248, 10009, 130, 701, 1013], pokemonNames: ["Excadrill", "Tyranitar", "Wash Rotom", "Gyarados", "Hawlucha", "Sinistcha"] },
  { id: "ct-27", tournament: "Talon's FIGHT CLUB #79 POKEMON CHAMPIONS", players: 122, placement: 8, player: "HyogaVGC", wins: 7, losses: 3, pokemonIds: [282, 547, 727, 903, 983, 10009], pokemonNames: ["Gardevoir", "Whimsicott", "Incineroar", "Sneasler", "Kingambit", "Wash Rotom"] },
  { id: "ct-28", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 1, player: "PollitoA7", wins: 10, losses: 1, pokemonIds: [670, 655, 727, 142, 925, 445], pokemonNames: ["Mega Floette", "Delphox", "Incineroar", "Aerodactyl", "Maushold", "Garchomp"] },
  { id: "ct-29", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 2, player: "Snorlaxpikachu1", wins: 8, losses: 3, pokemonIds: [445, 248, 142, 10009, 968, 903], pokemonNames: ["Garchomp", "Mega Tyranitar", "Aerodactyl", "Wash Rotom", "Orthworm", "Sneasler"] },
  { id: "ct-30", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 3, player: "Nicolò B", wins: 7, losses: 3, pokemonIds: [983, 887, 903, 902, 36, 115], pokemonNames: ["Kingambit", "Dragapult", "Sneasler", "Basculegion", "Clefable", "Kangaskhan"] },
  { id: "ct-31", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 4, player: "Asteriio", wins: 7, losses: 3, pokemonIds: [478, 964, 983, 5059, 1013, 903], pokemonNames: ["Mega Froslass", "Palafin", "Kingambit", "Hisuian Arcanine", "Sinistcha", "Sneasler"] },
  { id: "ct-32", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 5, player: "Frey", wins: 7, losses: 2, pokemonIds: [952, 784, 903, 248, 823, 473], pokemonNames: ["Mega Scovillain", "Kommo-o", "Sneasler", "Tyranitar", "Corviknight", "Mamoswine"] },
  { id: "ct-33", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 7, player: "Katiclus", wins: 7, losses: 2, pokemonIds: [478, 730, 1013, 983, 903, 5059], pokemonNames: ["Froslass", "Primarina", "Sinistcha", "Kingambit", "Sneasler", "Hisuian Arcanine"] },
  { id: "ct-34", tournament: "Unova Champions League / POKMON CHAMPIONS / 30", players: 100, placement: 8, player: "KST VGC ", wins: 6, losses: 3, pokemonIds: [925, 903, 670, 983, 902, 149], pokemonNames: ["Maushold", "Sneasler", "Mega Floette", "Kingambit", "Basculegion", "Dragonite"] },
  { id: "ct-35", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 1, player: "ShadowJeff", wins: 8, losses: 2, pokemonIds: [121, 903, 1013, 983, 149, 279], pokemonNames: ["Starmie", "Sneasler", "Sinistcha", "Kingambit", "Dragonite", "Pelipper"] },
  { id: "ct-36", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 3, player: "Trafalgar_VGC", wins: 8, losses: 1, pokemonIds: [1018, 1013, 670, 279, 902, 727], pokemonNames: ["Archaludon", "Sinistcha", "Floette", "Pelipper", "Basculegion", "Incineroar"] },
  { id: "ct-37", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 4, player: "JayEmar", wins: 7, losses: 2, pokemonIds: [784, 1013, 727, 983, 94, 900], pokemonNames: ["Kommo-o", "Sinistcha", "Incineroar", "Kingambit", "Gengar", "Kleavor"] },
  { id: "ct-38", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 8, player: "Fernando Gabriel T", wins: 5, losses: 3, pokemonIds: [970, 908, 445, 663, 282, 902], pokemonNames: ["Glimmora", "Meowscarada", "Garchomp", "Talonflame", "Gardevoir", "Basculegion"] },
  { id: "ct-39", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 13, player: "marcosmartinbode", wins: 4, losses: 3, pokemonIds: [6, 197, 981, 10009, 903, 887], pokemonNames: ["Mega Charizard Y", "Umbreon", "Farigiraf", "Wash Rotom", "Sneasler", "Dragapult"] },
  { id: "ct-40", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 17, player: "Voltzy_54", wins: 4, losses: 2, pokemonIds: [6, 547, 903, 3, 887, 727], pokemonNames: ["Charizard", "Whimsicott", "Sneasler", "Venusaur", "Dragapult", "Incineroar"] },
  { id: "ct-41", tournament: "CHAMPIONS$50 USD | Guti x Trainers TCG", players: 72, placement: 19, player: "Dadus7279", wins: 4, losses: 2, pokemonIds: [823, 445, 248, 727, 1013, 350], pokemonNames: ["Corviknight", "Garchomp", "Tyranitar", "Incineroar", "Sinistcha", "Milotic"] },
  { id: "ct-42", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 1, player: "OkayTokay369", wins: 8, losses: 2, pokemonIds: [71, 5059, 6, 823, 350, 903], pokemonNames: ["Victreebel", "Hisuian Arcanine", "Charizard", "Corviknight", "Milotic", "Sneasler"] },
  { id: "ct-43", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 2, player: "3thanol", wins: 7, losses: 3, pokemonIds: [282, 663, 902, 727, 903, 925], pokemonNames: ["Gardevoir", "Talonflame", "Basculegion", "Incineroar", "Sneasler", "Maushold"] },
  { id: "ct-44", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 3, player: "realbmorebrass", wins: 7, losses: 2, pokemonIds: [3, 324, 5157, 981, 670, 784], pokemonNames: ["Venusaur", "Torkoal", "Hisuian Typhlosion", "Farigiraf", "Floette", "Kommo-o"] },
  { id: "ct-45", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 4, player: "kerni361", wins: 6, losses: 3, pokemonIds: [727, 903, 1013, 142, 670, 983], pokemonNames: ["Incineroar", "Sneasler", "Sinistcha", "Aerodactyl", "Mega Floette", "Kingambit"] },
  { id: "ct-46", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 5, player: "Krugzzz", wins: 6, losses: 2, pokemonIds: [547, 445, 248, 655, 10009, 823], pokemonNames: ["Whimsicott", "Garchomp", "Tyranitar", "Delphox", "Wash Rotom", "Corviknight"] },
  { id: "ct-47", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 6, player: "Lillyrosethedemon", wins: 6, losses: 2, pokemonIds: [478, 5059, 823, 700, 350, 445], pokemonNames: ["Mega Froslass", "Hisuian Arcanine", "Corviknight", "Sylveon", "Milotic", "Garchomp"] },
  { id: "ct-48", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 7, player: "mikew", wins: 6, losses: 2, pokemonIds: [637, 727, 473, 1013, 903, 248], pokemonNames: ["Volcarona", "Incineroar", "Mamoswine", "Sinistcha", "Sneasler", "Tyranitar"] },
  { id: "ct-49", tournament: "Wolfey Patreon Tournament - Pokmon Champions #1", players: 56, placement: 8, player: "ScythHD", wins: 5, losses: 3, pokemonIds: [670, 547, 5059, 983, 248, 530], pokemonNames: ["Floette", "Whimsicott", "Hisuian Arcanine", "Kingambit", "Tyranitar", "Excadrill"] },
  { id: "ct-50", tournament: "VGCA Champions Prerelease (CUSTOM FORMAT)", players: 46, placement: 1, player: "katabo", wins: 10, losses: 0, pokemonIds: [376, 903, 727, 149, 350], pokemonNames: ["Mega Metagross", "Sneasler", "Incineroar", "Dragonite", "Amoonguss", "Milotic"] },
  { id: "ct-51", tournament: "VGCA Champions Prerelease (CUSTOM FORMAT)", players: 46, placement: 2, player: "orionVGC_08", wins: 8, losses: 2, pokemonIds: [727, 981, 6, 475], pokemonNames: ["Incineroar", "Bloodmoon Ursaluna", "Farigiraf", "Charizard", "Salamence", "Gallade"] },
  { id: "ct-52", tournament: "VGCA Champions Prerelease (CUSTOM FORMAT)", players: 46, placement: 3, player: "Euph", wins: 7, losses: 2, pokemonIds: [6, 727, 3, 981, 901], pokemonNames: ["Mega Charizard Y", "Incineroar", "Mega Venusaur", "Kilowattrel", "Farigiraf", "Ursaluna"] },
  { id: "ct-53", tournament: "VGCA Champions Prerelease (CUSTOM FORMAT)", players: 46, placement: 4, player: "jonen", wins: 6, losses: 3, pokemonIds: [94, 186, 727, 1018], pokemonNames: ["Gengar", "Amoonguss", "Gothitelle", "Politoed", "Incineroar", "Archaludon"] },
  { id: "ct-54", tournament: "VGCA Champions Prerelease (CUSTOM FORMAT)", players: 46, placement: 7, player: "LelloCartello", wins: 5, losses: 3, pokemonIds: [977, 978, 6, 547, 3, 887], pokemonNames: ["Dondozo", "Tatsugiri", "Mega Charizard Y", "Whimsicott", "Venusaur", "Dragapult"] },
  { id: "ct-55", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 1, player: "LiebesleidVGC", wins: 9, losses: 1, pokemonIds: [903, 983, 902, 36, 655, 445], pokemonNames: ["Sneasler", "Kingambit", "Basculegion", "Clefable", "Delphox", "Garchomp"] },
  { id: "ct-56", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 2, player: "Maximiliano Yacante", wins: 7, losses: 3, pokemonIds: [149, 94, 186, 903, 727, 902], pokemonNames: ["Dragonite", "Gengar", "Politoed", "Sneasler", "Incineroar", "Basculegion"] },
  { id: "ct-57", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 3, player: "Botty", wins: 7, losses: 2, pokemonIds: [478, 10009, 903, 727, 823, 445], pokemonNames: ["Mega Froslass", "Wash Rotom", "Sneasler", "Incineroar", "Corviknight", "Garchomp"] },
  { id: "ct-58", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 5, player: "giac28", wins: 6, losses: 2, pokemonIds: [903, 983, 655, 149, 902, 823], pokemonNames: ["Sneasler", "Kingambit", "Delphox", "Dragonite", "Basculegion", "Corviknight"] },
  { id: "ct-59", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 6, player: "XoariGaming", wins: 5, losses: 3, pokemonIds: [983, 6, 350, 1013, 670, 903], pokemonNames: ["Kingambit", "Charizard", "Milotic", "Sinistcha", "Floette", "Sneasler"] },
  { id: "ct-60", tournament: "POKEMON CHAMPAGNE- LO CAMBIA TODO N1", players: 40, placement: 8, player: "rwz21", wins: 5, losses: 3, pokemonIds: [115, 730, 983, 903, 727, 1013], pokemonNames: ["Kangaskhan", "Primarina", "Kingambit", "Sneasler", "Incineroar", "Sinistcha"] },
  { id: "ct-61", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 1, player: "CptAuroOG", wins: 7, losses: 2, pokemonIds: [445, 248, 903, 130, 10008, 1013], pokemonNames: ["Garchomp", "Mega Tyranitar", "Sneasler", "Gyarados", "Heat Rotom", "Sinistcha"] },
  { id: "ct-62", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 2, player: "bnanbread", wins: 6, losses: 3, pokemonIds: [227, 970, 727, 1013, 983, 903], pokemonNames: ["Skarmory", "Glimmora", "Incineroar", "Sinistcha", "Kingambit", "Sneasler"] },
  { id: "ct-63", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 3, player: "Yoshi1267", wins: 6, losses: 2, pokemonIds: [6, 547, 903, 10009, 445, 727], pokemonNames: ["Mega Charizard Y", "Whimsicott", "Sneasler", "Wash Rotom", "Garchomp", "Incineroar"] },
  { id: "ct-64", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 4, player: "Jeremiah Colustrio", wins: 5, losses: 3, pokemonIds: [670, 130, 1013, 903, 727, 983], pokemonNames: ["Floette", "Gyarados", "Sinistcha", "Sneasler", "Incineroar", "Kingambit"] },
  { id: "ct-65", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 5, player: "elad", wins: 6, losses: 1, pokemonIds: [142, 670, 727, 1013, 903, 350], pokemonNames: ["Aerodactyl", "Mega Floette", "Incineroar", "Sinistcha", "Sneasler", "Milotic"] },
  { id: "ct-66", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 6, player: "champninjastar", wins: 5, losses: 2, pokemonIds: [115, 10009, 1013, 727, 445, 903], pokemonNames: ["Kangaskhan", "Wash Rotom", "Sinistcha", "Incineroar", "Garchomp", "Sneasler"] },
  { id: "ct-67", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 7, player: "Qabou", wins: 4, losses: 3, pokemonIds: [670, 445, 142, 1013, 350, 903], pokemonNames: ["Floette", "Garchomp", "Aerodactyl", "Sinistcha", "Milotic", "Sneasler"] },
  { id: "ct-68", tournament: "VGCA Battle Hall #24 (CHAMPIONS)", players: 36, placement: 8, player: "TimidTailwind", wins: 4, losses: 3, pokemonIds: [227, 445, 248, 10009, 727, 903], pokemonNames: ["Skarmory", "Garchomp", "Tyranitar", "Wash Rotom", "Incineroar", "Sneasler"] },
  { id: "ct-69", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 1, player: "illll", wins: 7, losses: 1, pokemonIds: [903, 727, 6, 445, 547, 981], pokemonNames: ["Sneasler", "Incineroar", "Charizard", "Garchomp", "Whimsicott", "Farigiraf"] },
  { id: "ct-70", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 2, player: "Style_VGC", wins: 6, losses: 2, pokemonIds: [6, 3, 445, 282, 350, 727], pokemonNames: ["Charizard", "Venusaur", "Garchomp", "Gardevoir", "Milotic", "Incineroar"] },
  { id: "ct-71", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 3, player: "gackajink", wins: 5, losses: 2, pokemonIds: [65, 678, 903, 547, 655, 983], pokemonNames: ["Alakazam", "Meowstic", "Sneasler", "Whimsicott", "Delphox", "Kingambit"] },
  { id: "ct-72", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 4, player: "JuanPabla", wins: 4, losses: 3, pokemonIds: [10009, 823, 727, 248, 903, 530], pokemonNames: ["Wash Rotom", "Corviknight", "Incineroar", "Tyranitar", "Sneasler", "Excadrill"] },
  { id: "ct-73", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 5, player: "TheGlitchyOnion", wins: 5, losses: 1, pokemonIds: [149, 707, 1018, 902, 1013, 142], pokemonNames: ["Dragonite", "Klefki", "Archaludon", "Basculegion", "Sinistcha", "Aerodactyl"] },
  { id: "ct-74", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 7, player: "ZUKY187", wins: 4, losses: 2, pokemonIds: [6, 3, 902, 445, 727, 903], pokemonNames: ["Mega Charizard Y", "Venusaur", "Basculegion", "Garchomp", "Incineroar", "Sneasler"] },
  { id: "ct-75", tournament: "Pokmon Champions Reg M-A | CGCL Weekly #1", players: 34, placement: 8, player: "SalvyPara", wins: 3, losses: 3, pokemonIds: [94, 727, 784, 925, 666, 10009], pokemonNames: ["Gengar", "Incineroar", "Kommo-o", "Maushold", "Vivillon", "Wash Rotom"] },
  { id: "ct-76", tournament: "Ratorneo #1 Apertura Champions 2026 | Reg MA | BO3", players: 32, placement: 1, player: "Mayoh", wins: 7, losses: 1, pokemonIds: [902, 903, 154, 279, 983, 149], pokemonNames: ["Basculegion", "Sneasler", "Meganium", "Pelipper", "Kingambit", "Dragonite"] },
  { id: "ct-77", tournament: "Ratorneo #1 Apertura Champions 2026 | Reg MA | BO3", players: 32, placement: 3, player: "Ponje", wins: 5, losses: 2, pokemonIds: [970, 547, 902, 10103, 445, 655], pokemonNames: ["Glimmora", "Whimsicott", "Basculegion", "Alolan Ninetales", "Garchomp", "Delphox"] },
  { id: "ct-78", tournament: "Ratorneo #1 Apertura Champions 2026 | Reg MA | BO3", players: 32, placement: 4, player: "frankina", wins: 5, losses: 2, pokemonIds: [94, 727, 1013, 983, 248, 784], pokemonNames: ["Mega Gengar", "Incineroar", "Sinistcha", "Kingambit", "Tyranitar", "Kommo-o"] },
  { id: "ct-79", tournament: "Ratorneo #1 Apertura Champions 2026 | Reg MA | BO3", players: 32, placement: 5, player: "Stallcelth", wins: 5, losses: 1, pokemonIds: [1013, 727, 902, 823, 903, 670], pokemonNames: ["Sinistcha", "Incineroar", "Basculegion", "Corviknight", "Sneasler", "Mega Floette"] },
  { id: "ct-80", tournament: "Ratorneo #1 Apertura Champions 2026 | Reg MA | BO3", players: 32, placement: 6, player: "Marcos Sena", wins: 4, losses: 2, pokemonIds: [670, 445, 10009, 1013, 727, 983], pokemonNames: ["Floette", "Garchomp", "Wash Rotom", "Sinistcha", "Incineroar", "Kingambit"] },
  { id: "ct-81", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 1, player: "DaniVGC03", wins: 8, losses: 0, pokemonIds: [902, 279, 149, 1013, 727, 670], pokemonNames: ["Basculegion", "Pelipper", "Dragonite", "Sinistcha", "Incineroar", "Floette"] },
  { id: "ct-82", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 2, player: "Diegostar", wins: 5, losses: 3, pokemonIds: [279, 902, 1013, 445, 727, 670], pokemonNames: ["Pelipper", "Basculegion", "Sinistcha", "Garchomp", "Incineroar", "Mega Floette"] },
  { id: "ct-83", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 3, player: "Morfhious", wins: 5, losses: 2, pokemonIds: [6, 727, 547, 445, 983, 212], pokemonNames: ["Charizard", "Incineroar", "Whimsicott", "Garchomp", "Kingambit", "Scizor"] },
  { id: "ct-84", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 5, player: "Force_India", wins: 4, losses: 2, pokemonIds: [670, 142, 445, 903, 10009, 727], pokemonNames: ["Mega Floette", "Aerodactyl", "Garchomp", "Sneasler", "Wash Rotom", "Incineroar"] },
  { id: "ct-85", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 6, player: "daaroN", wins: 4, losses: 2, pokemonIds: [1013, 279, 149, 902, 903, 142], pokemonNames: ["Sinistcha", "Pelipper", "Dragonite", "Basculegion", "Sneasler", "Aerodactyl"] },
  { id: "ct-86", tournament: "Pregio Champions Tournament Weekly #20", players: 29, placement: 8, player: "tpgamer007", wins: 3, losses: 3, pokemonIds: [5059, 478, 10009, 903, 208, 10340], pokemonNames: ["Hisuian Arcanine", "Froslass", "Wash Rotom", "Sneasler", "Steelix", "Hisuian Zoroark"] },
  { id: "ct-87", tournament: "Pre-Champions (read description)", players: 26, placement: 1, player: "Gotou", wins: 7, losses: 2, pokemonIds: [547, 6, 1013, 248, 1018, 901], pokemonNames: ["Whimsicott", "Mega Charizard Y", "Sinistcha", "Tyranitar", "Archaludon", "Ursaluna"] },
  { id: "ct-88", tournament: "Pre-Champions (read description)", players: 26, placement: 2, player: "BoltBeamStudios", wins: 7, losses: 2, pokemonIds: [306, 248, 977, 727, 1013], pokemonNames: ["Mega Aggron", "Tyranitar", "Dondozo", "Incineroar", "Sinistcha", "Mega Salamence"] },
  { id: "ct-89", tournament: "Pre-Champions (read description)", players: 26, placement: 3, player: "Matthewg21", wins: 6, losses: 2, pokemonIds: [478, 445, 903, 981, 983, 727], pokemonNames: ["Froslass", "Garchomp", "Sneasler", "Farigiraf", "Kingambit", "Incineroar"] },
  { id: "ct-90", tournament: "Pre-Champions (read description)", players: 26, placement: 4, player: "Bdogplatinum", wins: 5, losses: 3, pokemonIds: [983, 1013, 663, 730, 445, 448], pokemonNames: ["Kingambit", "Sinistcha", "Talonflame", "Primarina", "Garchomp", "Lucario"] },
  { id: "ct-91", tournament: "Pre-Champions (read description)", players: 26, placement: 5, player: "monkeychese", wins: 5, losses: 2, pokemonIds: [663, 445, 448, 730, 970, 908], pokemonNames: ["Talonflame", "Garchomp", "Lucario", "Primarina", "Glimmora", "Meowscarada"] },
  { id: "ct-92", tournament: "Pre-Champions (read description)", players: 26, placement: 6, player: "Foghorn", wins: 5, losses: 2, pokemonIds: [445, 968, 154, 663, 350, 903], pokemonNames: ["Garchomp", "Orthworm", "Meganium", "Talonflame", "Milotic", "Sneasler"] },
  { id: "ct-93", tournament: "Pre-Champions (read description)", players: 26, placement: 7, player: "Kotori", wins: 5, losses: 2, pokemonIds: [94, 186, 727, 902, 981, 1018], pokemonNames: ["Gengar", "Politoed", "Incineroar", "Basculegion", "Farigiraf", "Archaludon"] },
  { id: "ct-94", tournament: "Pre-Champions (read description)", players: 26, placement: 8, player: "TacCat", wins: 4, losses: 3, pokemonIds: [478, 784, 964, 983, 5059, 36], pokemonNames: ["Mega Froslass", "Kommo-o", "Palafin", "Kingambit", "Hisuian Arcanine", "Clefable"] },
  { id: "ct-95", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 1, player: "nanmig9", wins: 7, losses: 1, pokemonIds: [149, 154, 727, 279, 902, 1018], pokemonNames: ["Dragonite", "Meganium", "Incineroar", "Pelipper", "Basculegion", "Archaludon"] },
  { id: "ct-96", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 1, player: "QueerCrocodile", wins: 8, losses: 0, pokemonIds: [282, 730, 547, 903, 5059, 983], pokemonNames: ["Gardevoir", "Primarina", "Whimsicott", "Sneasler", "Hisuian Arcanine", "Kingambit"] },
  { id: "ct-97", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 2, player: "SoulVGC", wins: 4, losses: 4, pokemonIds: [248, 530, 1013, 903, 547, 730], pokemonNames: ["Tyranitar", "Excadrill", "Sinistcha", "Sneasler", "Whimsicott", "Primarina"] },
  { id: "ct-98", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 3, player: "Rosha", wins: 6, losses: 1, pokemonIds: [981, 727, 10341, 730, 623, 823], pokemonNames: ["Farigiraf", "Incineroar", "Hisuian Decidueye", "Primarina", "Golurk", "Corviknight"] },
  { id: "ct-99", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 3, player: "Sekun", wins: 4, losses: 3, pokemonIds: [1018, 902, 279, 1013, 448, 445], pokemonNames: ["Archaludon", "Basculegion", "Pelipper", "Sinistcha", "Mega Lucario", "Garchomp"] },
  { id: "ct-100", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 4, player: "tiagorsda", wins: 4, losses: 3, pokemonIds: [6, 903, 902, 445, 3, 324], pokemonNames: ["Charizard", "Sneasler", "Basculegion", "Garchomp", "Venusaur", "Torkoal"] },
  { id: "ct-101", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 4, player: "433", wins: 4, losses: 3, pokemonIds: [324, 475, 858, 925, 6080, 903], pokemonNames: ["Torkoal", "Gallade", "Hatterene", "Maushold", "Galarian Slowbro", "Sneasler"] },
  { id: "ct-102", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 5, player: "Bloku", wins: 4, losses: 2, pokemonIds: [727, 282, 1013, 983, 142, 149], pokemonNames: ["Incineroar", "Gardevoir", "Sinistcha", "Kingambit", "Aerodactyl", "Dragonite"] },
  { id: "ct-103", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 5, player: "aitor645302", wins: 4, losses: 2, pokemonIds: [981, 727, 623, 324, 1013, 983], pokemonNames: ["Farigiraf", "Incineroar", "Golurk", "Torkoal", "Sinistcha", "Kingambit"] },
  { id: "ct-104", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 6, player: "Erika Coelho", wins: 3, losses: 3, pokemonIds: [970, 727, 130, 1013, 445, 663], pokemonNames: ["Glimmora", "Incineroar", "Gyarados", "Sinistcha", "Garchomp", "Talonflame"] },
  { id: "ct-105", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 6, player: "Sydaster", wins: 4, losses: 2, pokemonIds: [823, 445, 903, 282, 149, 1013], pokemonNames: ["Corviknight", "Garchomp", "Sneasler", "Mega Gardevoir", "Dragonite", "Sinistcha"] },
  { id: "ct-106", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 7, player: "Chikoratos", wins: 3, losses: 3, pokemonIds: [154, 727, 902, 925, 475, 142], pokemonNames: ["Meganium", "Incineroar", "Basculegion", "Maushold", "Gallade", "Aerodactyl"] },
  { id: "ct-107", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 7, player: "BreezyVGC", wins: 3, losses: 3, pokemonIds: [727, 981, 964, 1013, 903, 623], pokemonNames: ["Incineroar", "Farigiraf", "Palafin", "Sinistcha", "Sneasler", "Golurk"] },
  { id: "ct-108", tournament: "Friendly #1 - Game Corner - Champions", players: 23, placement: 8, player: "tpgamer007", wins: 3, losses: 3, pokemonIds: [478, 903, 902, 983, 10340, 5059], pokemonNames: ["Froslass", "Sneasler", "Basculegion", "Kingambit", "Hisuian Zoroark", "Hisuian Arcanine"] },
  { id: "ct-109", tournament: "Friday Fight Night #50 First Champions Tournament!", players: 23, placement: 8, player: "xBlankFate", wins: 2, losses: 3, pokemonIds: [282, 547, 727, 903, 445, 983], pokemonNames: ["Gardevoir", "Whimsicott", "Incineroar", "Sneasler", "Garchomp", "Kingambit"] },
  { id: "ct-110", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 1, player: "Nehzzy", wins: 5, losses: 1, pokemonIds: [149, 903, 983, 902, 655, 36], pokemonNames: ["Dragonite", "Sneasler", "Kingambit", "Basculegion", "Delphox", "Clefable"] },
  { id: "ct-111", tournament: "Cel's Super Slam #15 Reg M-A DAY ONE EU TOUR", players: 21, placement: 1, player: "Lycopoky", wins: 7, losses: 1, pokemonIds: [530, 248, 1013, 149, 670, 350], pokemonNames: ["Mega Excadrill", "Tyranitar", "Sinistcha", "Dragonite", "Mega Floette", "Milotic"] },
  { id: "ct-112", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 2, player: "BrunoWillians", wins: 4, losses: 2, pokemonIds: [154, 6, 727, 903, 149, 730], pokemonNames: ["Meganium", "Charizard", "Incineroar", "Sneasler", "Dragonite", "Primarina"] },
  { id: "ct-113", tournament: "Cel's Super Slam #15 Reg M-A DAY ONE EU TOUR", players: 21, placement: 2, player: "Divanosauro", wins: 6, losses: 2, pokemonIds: [149, 279, 730, 983, 1013, 903], pokemonNames: ["Dragonite", "Pelipper", "Primarina", "Kingambit", "Sinistcha", "Sneasler"] },
  { id: "ct-114", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 3, player: "MemesNDreams", wins: 4, losses: 1, pokemonIds: [448, 142, 445, 727, 10009, 248], pokemonNames: ["Mega Lucario", "Aerodactyl", "Garchomp", "Incineroar", "Wash Rotom", "Tyranitar"] },
  { id: "ct-115", tournament: "Cel's Super Slam #15 Reg M-A DAY ONE EU TOUR", players: 21, placement: 3, player: "Gottkomplexe", wins: 5, losses: 2, pokemonIds: [94, 727, 983, 903, 547, 730], pokemonNames: ["Mega Gengar", "Incineroar", "Kingambit", "Sneasler", "Whimsicott", "Primarina"] },
  { id: "ct-116", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 4, player: "Shinyz672", wins: 3, losses: 2, pokemonIds: [670, 663, 727, 730, 925, 445], pokemonNames: ["Mega Floette", "Talonflame", "Incineroar", "Primarina", "Maushold", "Garchomp"] },
  { id: "ct-117", tournament: "Cel's Super Slam #15 Reg M-A DAY ONE EU TOUR", players: 21, placement: 4, player: "DietDrBobb", wins: 4, losses: 3, pokemonIds: [970, 902, 547, 727, 983, 903], pokemonNames: ["Mega Glimmora", "Basculegion", "Whimsicott", "Incineroar", "Kingambit", "Sneasler"] },
  { id: "ct-118", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 5, player: "jamchi", wins: 3, losses: 1, pokemonIds: [547, 908, 903, 6, 445, 727], pokemonNames: ["Whimsicott", "Meowscarada", "Sneasler", "Charizard", "Garchomp", "Incineroar"] },
  { id: "ct-119", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 6, player: "2edilso", wins: 3, losses: 1, pokemonIds: [214, 248, 530, 547, 981, 727], pokemonNames: ["Heracross", "Tyranitar", "Excadrill", "Whimsicott", "Farigiraf", "Incineroar"] },
  { id: "ct-120", tournament: "Cel's Super Slam #15 Reg M-A DAY ONE EU TOUR", players: 21, placement: 6, player: "Flygonkingvgc", wins: 3, losses: 3, pokemonIds: [324, 981, 5059, 700, 229, 497], pokemonNames: ["Torkoal", "Farigiraf", "Hisuian Arcanine", "Sylveon", "Houndoom", "Serperior"] },
  { id: "ct-121", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 7, player: "Goofball25", wins: 2, losses: 2, pokemonIds: [964, 94, 727, 700, 635, 547], pokemonNames: ["Palafin", "Gengar", "Incineroar", "Sylveon", "Hydreigon", "Whimsicott"] },
  { id: "ct-122", tournament: "The Drywall Series - CHAMPIONS", players: 21, placement: 8, player: "gamesettex", wins: 2, losses: 2, pokemonIds: [727, 1013, 248, 530, 730, 149], pokemonNames: ["Incineroar", "Sinistcha", "Tyranitar", "Excadrill", "Primarina", "Dragonite"] },
];
