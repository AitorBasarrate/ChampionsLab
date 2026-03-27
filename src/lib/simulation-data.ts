// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from 1,000,000 mega-aware battle simulations
// Date: 2026-03-27T20:08:58.626Z
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

export interface SimMetaSnapshot {
  tier1: string[];
  tier2: string[];
  tier3: string[];
  dominantArchetypes: string[];
  underratedPokemon: string[];
  overratedPokemon: string[];
  bestCores: string[];
}

export interface SimMoveData {
  name: string;
  winRate: number;
  appearances: number;
}

/** Pokemon simulation data keyed by "id" or "id-mega" */
export const SIM_POKEMON: Record<string, SimPokemonData> = {
  "3": {
    "id": 3,
    "name": "Venusaur",
    "isMega": false,
    "elo": 9132,
    "winRate": 50.5,
    "appearances": 103656,
    "wins": 52305,
    "losses": 51351,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Charizard",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Leafeon",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Scovillain",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Mega Charizard X",
        "winRate": 50.8,
        "games": 3353
      }
    ],
    "bestSets": []
  },
  "6": {
    "id": 6,
    "name": "Charizard",
    "isMega": false,
    "elo": 54684,
    "winRate": 52.9,
    "appearances": 113444,
    "wins": 60046,
    "losses": 53398,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Metagross",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Heat Rotom",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Greninja",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Excadrill",
        "winRate": 65.1,
        "games": 5147
      }
    ],
    "bestSets": []
  },
  "9": {
    "id": 9,
    "name": "Blastoise",
    "isMega": false,
    "elo": 2740,
    "winRate": 50.8,
    "appearances": 10211,
    "wins": 5183,
    "losses": 5028,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 51.5,
        "games": 6798
      },
      {
        "name": "Dragapult",
        "winRate": 51.5,
        "games": 6798
      },
      {
        "name": "Incineroar",
        "winRate": 51.5,
        "games": 6798
      },
      {
        "name": "Meowscarada",
        "winRate": 51.5,
        "games": 6798
      },
      {
        "name": "Arcanine",
        "winRate": 51.5,
        "games": 6798
      }
    ],
    "bestSets": []
  },
  "15": {
    "id": 15,
    "name": "Beedrill",
    "isMega": false,
    "elo": -4292,
    "winRate": 43.9,
    "appearances": 5960,
    "wins": 2618,
    "losses": 3342,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 43.9,
        "games": 5960
      },
      {
        "name": "Incineroar",
        "winRate": 43.9,
        "games": 5960
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 43.9,
        "games": 5960
      },
      {
        "name": "Greninja",
        "winRate": 43.9,
        "games": 5960
      },
      {
        "name": "Garchomp",
        "winRate": 43.9,
        "games": 5960
      }
    ],
    "bestSets": []
  },
  "26": {
    "id": 26,
    "name": "Raichu",
    "isMega": false,
    "elo": 2444,
    "winRate": 50.4,
    "appearances": 13434,
    "wins": 6776,
    "losses": 6658,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 50.5,
        "games": 6590
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 6590
      },
      {
        "name": "Tyranitar",
        "winRate": 50.5,
        "games": 6590
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 13434
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 13434
      }
    ],
    "bestSets": []
  },
  "36": {
    "id": 36,
    "name": "Clefable",
    "isMega": false,
    "elo": 10268,
    "winRate": 51.4,
    "appearances": 40344,
    "wins": 20720,
    "losses": 19624,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 60.9,
        "games": 5487
      },
      {
        "name": "Scizor",
        "winRate": 60.9,
        "games": 5487
      },
      {
        "name": "Metagross",
        "winRate": 60.9,
        "games": 5487
      },
      {
        "name": "Kingambit",
        "winRate": 53.2,
        "games": 19397
      },
      {
        "name": "Incineroar",
        "winRate": 52.3,
        "games": 26443
      }
    ],
    "bestSets": []
  },
  "38": {
    "id": 38,
    "name": "Ninetales",
    "isMega": false,
    "elo": 3108,
    "winRate": 51.7,
    "appearances": 5893,
    "wins": 3047,
    "losses": 2846,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Charizard",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Leafeon",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Venusaur",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Scovillain",
        "winRate": 51.7,
        "games": 5893
      }
    ],
    "bestSets": []
  },
  "59": {
    "id": 59,
    "name": "Arcanine",
    "isMega": false,
    "elo": -76972,
    "winRate": 48.6,
    "appearances": 360229,
    "wins": 175210,
    "losses": 185019,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Ampharos",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Azumarill",
        "winRate": 52.1,
        "games": 9962
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 51.6,
        "games": 20354
      },
      {
        "name": "Blastoise",
        "winRate": 51.5,
        "games": 6798
      }
    ],
    "bestSets": []
  },
  "65": {
    "id": 65,
    "name": "Alakazam",
    "isMega": false,
    "elo": 1876,
    "winRate": 50.3,
    "appearances": 6911,
    "wins": 3479,
    "losses": 3432,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 6911
      },
      {
        "name": "Krookodile",
        "winRate": 50.3,
        "games": 6911
      },
      {
        "name": "Azumarill",
        "winRate": 50.3,
        "games": 6911
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.3,
        "games": 6911
      },
      {
        "name": "Crabominable",
        "winRate": 50.3,
        "games": 6911
      }
    ],
    "bestSets": []
  },
  "80": {
    "id": 80,
    "name": "Slowbro",
    "isMega": false,
    "elo": 14324,
    "winRate": 52.8,
    "appearances": 28985,
    "wins": 15294,
    "losses": 13691,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Archaludon",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Mega Gyarados",
        "winRate": 58.1,
        "games": 5779
      },
      {
        "name": "Whimsicott",
        "winRate": 55,
        "games": 12343
      },
      {
        "name": "Garchomp",
        "winRate": 55,
        "games": 12343
      }
    ],
    "bestSets": []
  },
  "94": {
    "id": 94,
    "name": "Gengar",
    "isMega": false,
    "elo": 13300,
    "winRate": 50.3,
    "appearances": 284187,
    "wins": 142831,
    "losses": 141356,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Heat Rotom",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Chesnaught",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Greninja",
        "winRate": 58,
        "games": 26332
      },
      {
        "name": "Charizard",
        "winRate": 54.4,
        "games": 47461
      }
    ],
    "bestSets": []
  },
  "115": {
    "id": 115,
    "name": "Kangaskhan",
    "isMega": false,
    "elo": -964,
    "winRate": 49.1,
    "appearances": 16708,
    "wins": 8200,
    "losses": 8508,
    "bestPartners": [
      {
        "name": "Mega Gardevoir",
        "winRate": 49.9,
        "games": 9939
      },
      {
        "name": "Garchomp",
        "winRate": 49.9,
        "games": 9939
      },
      {
        "name": "Tyranitar",
        "winRate": 49.9,
        "games": 9939
      },
      {
        "name": "Gyarados",
        "winRate": 49.1,
        "games": 16708
      },
      {
        "name": "Incineroar",
        "winRate": 49.1,
        "games": 16708
      }
    ],
    "bestSets": []
  },
  "121": {
    "id": 121,
    "name": "Starmie",
    "isMega": false,
    "elo": 852,
    "winRate": 49.8,
    "appearances": 17075,
    "wins": 8497,
    "losses": 8578,
    "bestPartners": [
      {
        "name": "Emboar",
        "winRate": 50.1,
        "games": 6817
      },
      {
        "name": "Gyarados",
        "winRate": 49.8,
        "games": 17075
      },
      {
        "name": "Whimsicott",
        "winRate": 49.8,
        "games": 17075
      },
      {
        "name": "Greninja",
        "winRate": 49.8,
        "games": 17075
      },
      {
        "name": "Corviknight",
        "winRate": 49.8,
        "games": 17075
      }
    ],
    "bestSets": []
  },
  "127": {
    "id": 127,
    "name": "Pinsir",
    "isMega": false,
    "elo": 9108,
    "winRate": 58.2,
    "appearances": 5825,
    "wins": 3388,
    "losses": 2437,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 58.2,
        "games": 5825
      },
      {
        "name": "Archaludon",
        "winRate": 58.2,
        "games": 5825
      },
      {
        "name": "Kingambit",
        "winRate": 58.2,
        "games": 5825
      },
      {
        "name": "Tyranitar",
        "winRate": 58.2,
        "games": 5825
      },
      {
        "name": "Metagross",
        "winRate": 58.2,
        "games": 5825
      }
    ],
    "bestSets": []
  },
  "130": {
    "id": 130,
    "name": "Gyarados",
    "isMega": false,
    "elo": -56524,
    "winRate": 49.5,
    "appearances": 687015,
    "wins": 339881,
    "losses": 347134,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Drampa",
        "winRate": 53.4,
        "games": 16083
      },
      {
        "name": "Ampharos",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Delphox",
        "winRate": 51.8,
        "games": 6767
      },
      {
        "name": "Azumarill",
        "winRate": 51.7,
        "games": 39943
      }
    ],
    "bestSets": []
  },
  "136": {
    "id": 136,
    "name": "Flareon",
    "isMega": false,
    "elo": -1220,
    "winRate": 44.5,
    "appearances": 3070,
    "wins": 1365,
    "losses": 1705,
    "bestPartners": [
      {
        "name": "Ninetales",
        "winRate": 44.5,
        "games": 3070
      },
      {
        "name": "Charizard",
        "winRate": 44.5,
        "games": 3070
      },
      {
        "name": "Leafeon",
        "winRate": 44.5,
        "games": 3070
      },
      {
        "name": "Venusaur",
        "winRate": 44.5,
        "games": 3070
      },
      {
        "name": "Scovillain",
        "winRate": 44.5,
        "games": 3070
      }
    ],
    "bestSets": []
  },
  "142": {
    "id": 142,
    "name": "Aerodactyl",
    "isMega": false,
    "elo": 18836,
    "winRate": 55.6,
    "appearances": 19311,
    "wins": 10739,
    "losses": 8572,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Tyranitar",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Corviknight",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Kingambit",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Archaludon",
        "winRate": 61.9,
        "games": 13629
      }
    ],
    "bestSets": []
  },
  "143": {
    "id": 143,
    "name": "Snorlax",
    "isMega": false,
    "elo": 2300,
    "winRate": 50.4,
    "appearances": 13572,
    "wins": 6836,
    "losses": 6736,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 50.9,
        "games": 3419
      },
      {
        "name": "Mega Kangaskhan",
        "winRate": 50.7,
        "games": 3429
      },
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 3429
      },
      {
        "name": "Gardevoir",
        "winRate": 50.7,
        "games": 3429
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 3429
      }
    ],
    "bestSets": []
  },
  "149": {
    "id": 149,
    "name": "Dragonite",
    "isMega": false,
    "elo": -32060,
    "winRate": 49.2,
    "appearances": 248659,
    "wins": 122232,
    "losses": 126427,
    "bestPartners": [
      {
        "name": "Milotic",
        "winRate": 52.2,
        "games": 3372
      },
      {
        "name": "Hydreigon",
        "winRate": 52.2,
        "games": 3272
      },
      {
        "name": "Greninja",
        "winRate": 50.9,
        "games": 6697
      },
      {
        "name": "Mega Houndoom",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Drampa",
        "winRate": 50.6,
        "games": 3501
      }
    ],
    "bestSets": []
  },
  "154": {
    "id": 154,
    "name": "Meganium",
    "isMega": false,
    "elo": -13068,
    "winRate": 45.9,
    "appearances": 22091,
    "wins": 10135,
    "losses": 11956,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 6788
      },
      {
        "name": "Heat Rotom",
        "winRate": 49.9,
        "games": 6788
      },
      {
        "name": "Toxapex",
        "winRate": 49.9,
        "games": 6788
      },
      {
        "name": "Wash Rotom",
        "winRate": 49.9,
        "games": 6788
      },
      {
        "name": "Mega Aerodactyl",
        "winRate": 46.2,
        "games": 9621
      }
    ],
    "bestSets": []
  },
  "160": {
    "id": 160,
    "name": "Feraligatr",
    "isMega": false,
    "elo": -1164,
    "winRate": 49.5,
    "appearances": 34557,
    "wins": 17112,
    "losses": 17445,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 49.7,
        "games": 7084
      },
      {
        "name": "Dragapult",
        "winRate": 49.7,
        "games": 7084
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 7084
      },
      {
        "name": "Meowscarada",
        "winRate": 49.7,
        "games": 7084
      },
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 7084
      }
    ],
    "bestSets": []
  },
  "181": {
    "id": 181,
    "name": "Ampharos",
    "isMega": false,
    "elo": 4300,
    "winRate": 52.7,
    "appearances": 6600,
    "wins": 3475,
    "losses": 3125,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Incineroar",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Charizard",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Arcanine",
        "winRate": 52.7,
        "games": 6600
      },
      {
        "name": "Whimsicott",
        "winRate": 52.7,
        "games": 6600
      }
    ],
    "bestSets": []
  },
  "184": {
    "id": 184,
    "name": "Azumarill",
    "isMega": false,
    "elo": 20708,
    "winRate": 51,
    "appearances": 121799,
    "wins": 62100,
    "losses": 59699,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Gliscor",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Hydreigon",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Aegislash",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Mega Delphox",
        "winRate": 54.5,
        "games": 9316
      }
    ],
    "bestSets": []
  },
  "186": {
    "id": 186,
    "name": "Politoed",
    "isMega": false,
    "elo": 308,
    "winRate": 49.9,
    "appearances": 105139,
    "wins": 52495,
    "losses": 52644,
    "bestPartners": [
      {
        "name": "Galarian Slowbro",
        "winRate": 50.7,
        "games": 3414
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 3414
      },
      {
        "name": "Gengar",
        "winRate": 50.3,
        "games": 20342
      },
      {
        "name": "Tyranitar",
        "winRate": 50.3,
        "games": 20342
      },
      {
        "name": "Hatterene",
        "winRate": 50.1,
        "games": 3302
      }
    ],
    "bestSets": []
  },
  "208": {
    "id": 208,
    "name": "Steelix",
    "isMega": false,
    "elo": -10820,
    "winRate": 48.9,
    "appearances": 67380,
    "wins": 32920,
    "losses": 34460,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 6773
      },
      {
        "name": "Excadrill",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Archaludon",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Rhyperior",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Mega Gyarados",
        "winRate": 49.6,
        "games": 10408
      }
    ],
    "bestSets": []
  },
  "212": {
    "id": 212,
    "name": "Scizor",
    "isMega": false,
    "elo": 34372,
    "winRate": 51,
    "appearances": 212643,
    "wins": 108376,
    "losses": 104267,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Archaludon",
        "winRate": 65.1,
        "games": 12726
      },
      {
        "name": "Clefable",
        "winRate": 60.9,
        "games": 5487
      },
      {
        "name": "Kingambit",
        "winRate": 60.1,
        "games": 19315
      },
      {
        "name": "Metagross",
        "winRate": 54.4,
        "games": 43558
      }
    ],
    "bestSets": []
  },
  "214": {
    "id": 214,
    "name": "Heracross",
    "isMega": false,
    "elo": 4468,
    "winRate": 52.9,
    "appearances": 6473,
    "wins": 3422,
    "losses": 3051,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 52.9,
        "games": 6473
      },
      {
        "name": "Metagross",
        "winRate": 52.9,
        "games": 6473
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.9,
        "games": 6473
      },
      {
        "name": "Greninja",
        "winRate": 52.9,
        "games": 6473
      },
      {
        "name": "Kingambit",
        "winRate": 52.9,
        "games": 6473
      }
    ],
    "bestSets": []
  },
  "227": {
    "id": 227,
    "name": "Skarmory",
    "isMega": false,
    "elo": 2204,
    "winRate": 50.2,
    "appearances": 24358,
    "wins": 12223,
    "losses": 12135,
    "bestPartners": [
      {
        "name": "Mega Tatsugiri",
        "winRate": 50.6,
        "games": 10291
      },
      {
        "name": "Scizor",
        "winRate": 50.2,
        "games": 17472
      },
      {
        "name": "Excadrill",
        "winRate": 50.2,
        "games": 17472
      },
      {
        "name": "Corviknight",
        "winRate": 50.2,
        "games": 17472
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 17472
      }
    ],
    "bestSets": []
  },
  "229": {
    "id": 229,
    "name": "Houndoom",
    "isMega": false,
    "elo": 1548,
    "winRate": 50,
    "appearances": 7086,
    "wins": 3546,
    "losses": 3540,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 7086
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 7086
      },
      {
        "name": "Decidueye",
        "winRate": 50,
        "games": 7086
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 7086
      },
      {
        "name": "Dragonite",
        "winRate": 50,
        "games": 7086
      }
    ],
    "bestSets": []
  },
  "248": {
    "id": 248,
    "name": "Tyranitar",
    "isMega": false,
    "elo": 48316,
    "winRate": 50.8,
    "appearances": 383554,
    "wins": 194703,
    "losses": 188851,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Aerodactyl",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Corviknight",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Scovillain",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Archaludon",
        "winRate": 59.2,
        "games": 28687
      }
    ],
    "bestSets": []
  },
  "279": {
    "id": 279,
    "name": "Pelipper",
    "isMega": false,
    "elo": -3084,
    "winRate": 48.6,
    "appearances": 20211,
    "wins": 9819,
    "losses": 10392,
    "bestPartners": [
      {
        "name": "Palafin",
        "winRate": 49.7,
        "games": 3301
      },
      {
        "name": "Dragapult",
        "winRate": 49.7,
        "games": 3301
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 3301
      },
      {
        "name": "Whimsicott",
        "winRate": 49.7,
        "games": 3301
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 3301
      }
    ],
    "bestSets": []
  },
  "282": {
    "id": 282,
    "name": "Gardevoir",
    "isMega": false,
    "elo": -14540,
    "winRate": 49.6,
    "appearances": 253055,
    "wins": 125525,
    "losses": 127530,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 55.7,
        "games": 3087
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Hatterene",
        "winRate": 51.7,
        "games": 9897
      },
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 37582
      },
      {
        "name": "Snorlax",
        "winRate": 50.7,
        "games": 3429
      }
    ],
    "bestSets": []
  },
  "302": {
    "id": 302,
    "name": "Sableye",
    "isMega": false,
    "elo": -39532,
    "winRate": 44.8,
    "appearances": 49275,
    "wins": 22073,
    "losses": 27202,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 52.5,
        "games": 3264
      },
      {
        "name": "Dragapult",
        "winRate": 51.6,
        "games": 6663
      },
      {
        "name": "Archaludon",
        "winRate": 50.9,
        "games": 6798
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 17041
      },
      {
        "name": "Corviknight",
        "winRate": 50.5,
        "games": 3481
      }
    ],
    "bestSets": []
  },
  "306": {
    "id": 306,
    "name": "Aggron",
    "isMega": false,
    "elo": -33868,
    "winRate": 45.9,
    "appearances": 53809,
    "wins": 24694,
    "losses": 29115,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 6969
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 6969
      },
      {
        "name": "Dragapult",
        "winRate": 50,
        "games": 6969
      },
      {
        "name": "Meowscarada",
        "winRate": 50,
        "games": 6969
      },
      {
        "name": "Mega Gallade",
        "winRate": 49.4,
        "games": 10176
      }
    ],
    "bestSets": []
  },
  "324": {
    "id": 324,
    "name": "Torkoal",
    "isMega": false,
    "elo": 14868,
    "winRate": 50.7,
    "appearances": 113705,
    "wins": 57688,
    "losses": 56017,
    "bestPartners": [
      {
        "name": "Leafeon",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Scovillain",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Ninetales",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Charizard",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Slowbro",
        "winRate": 53,
        "games": 6395
      }
    ],
    "bestSets": []
  },
  "334": {
    "id": 334,
    "name": "Altaria",
    "isMega": false,
    "elo": -34764,
    "winRate": 43.8,
    "appearances": 36479,
    "wins": 15973,
    "losses": 20506,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Pelipper",
        "winRate": 48.4,
        "games": 16910
      },
      {
        "name": "Gyarados",
        "winRate": 45.1,
        "games": 31334
      },
      {
        "name": "Dragonite",
        "winRate": 45.1,
        "games": 31334
      },
      {
        "name": "Noivern",
        "winRate": 45.1,
        "games": 31334
      }
    ],
    "bestSets": []
  },
  "350": {
    "id": 350,
    "name": "Milotic",
    "isMega": false,
    "elo": 3236,
    "winRate": 50.3,
    "appearances": 34581,
    "wins": 17399,
    "losses": 17182,
    "bestPartners": [
      {
        "name": "Slowbro",
        "winRate": 54.4,
        "games": 3159
      },
      {
        "name": "Dragonite",
        "winRate": 52.2,
        "games": 3372
      },
      {
        "name": "Kingambit",
        "winRate": 52.1,
        "games": 6763
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 24117
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 17149
      }
    ],
    "bestSets": []
  },
  "359": {
    "id": 359,
    "name": "Absol",
    "isMega": false,
    "elo": 1796,
    "winRate": 50.3,
    "appearances": 6905,
    "wins": 3471,
    "losses": 3434,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 6905
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 6905
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.3,
        "games": 6905
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 6905
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 6905
      }
    ],
    "bestSets": []
  },
  "376": {
    "id": 376,
    "name": "Metagross",
    "isMega": false,
    "elo": 72956,
    "winRate": 52.2,
    "appearances": 201452,
    "wins": 105192,
    "losses": 96260,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Mega Clefable",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Charizard",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Heat Rotom",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Chesnaught",
        "winRate": 61.8,
        "games": 5569
      }
    ],
    "bestSets": []
  },
  "395": {
    "id": 395,
    "name": "Empoleon",
    "isMega": false,
    "elo": 1532,
    "winRate": 50.1,
    "appearances": 3382,
    "wins": 1693,
    "losses": 1689,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 50.1,
        "games": 3382
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.1,
        "games": 3382
      },
      {
        "name": "Whimsicott",
        "winRate": 50.1,
        "games": 3382
      },
      {
        "name": "Slowbro",
        "winRate": 50.1,
        "games": 3382
      },
      {
        "name": "Garchomp",
        "winRate": 50.1,
        "games": 3382
      }
    ],
    "bestSets": []
  },
  "442": {
    "id": 442,
    "name": "Spiritomb",
    "isMega": false,
    "elo": -33644,
    "winRate": 36.2,
    "appearances": 15953,
    "wins": 5780,
    "losses": 10173,
    "bestPartners": [
      {
        "name": "Mega Gengar",
        "winRate": 49.6,
        "games": 3491
      },
      {
        "name": "Azumarill",
        "winRate": 49.6,
        "games": 3491
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 49.6,
        "games": 3491
      },
      {
        "name": "Meowscarada",
        "winRate": 47.6,
        "games": 3312
      },
      {
        "name": "Gyarados",
        "winRate": 47.6,
        "games": 3312
      }
    ],
    "bestSets": []
  },
  "445": {
    "id": 445,
    "name": "Garchomp",
    "isMega": false,
    "elo": 35548,
    "winRate": 50.2,
    "appearances": 1069182,
    "wins": 536719,
    "losses": 532463,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Charizard",
        "winRate": 65.1,
        "games": 5147
      },
      {
        "name": "Archaludon",
        "winRate": 59.2,
        "games": 20134
      },
      {
        "name": "Mega Charizard X",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Slowbro",
        "winRate": 55,
        "games": 12343
      }
    ],
    "bestSets": []
  },
  "448": {
    "id": 448,
    "name": "Lucario",
    "isMega": false,
    "elo": -18916,
    "winRate": 45.3,
    "appearances": 27062,
    "wins": 12255,
    "losses": 14807,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 58.2,
        "games": 2896
      },
      {
        "name": "Aegislash",
        "winRate": 58.2,
        "games": 2896
      },
      {
        "name": "Garchomp",
        "winRate": 53.9,
        "games": 6281
      },
      {
        "name": "Emboar",
        "winRate": 50.3,
        "games": 3385
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.3,
        "games": 3385
      }
    ],
    "bestSets": []
  },
  "450": {
    "id": 450,
    "name": "Hippowdon",
    "isMega": false,
    "elo": 1780,
    "winRate": 50.5,
    "appearances": 3505,
    "wins": 1770,
    "losses": 1735,
    "bestPartners": [
      {
        "name": "Mega Tyranitar",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Excadrill",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Krookodile",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Rhyperior",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 3505
      }
    ],
    "bestSets": []
  },
  "460": {
    "id": 460,
    "name": "Abomasnow",
    "isMega": false,
    "elo": 1924,
    "winRate": 50.4,
    "appearances": 6945,
    "wins": 3499,
    "losses": 3446,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 6945
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 6945
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 6945
      },
      {
        "name": "Aegislash",
        "winRate": 50.4,
        "games": 6945
      },
      {
        "name": "Gengar",
        "winRate": 50.4,
        "games": 6945
      }
    ],
    "bestSets": []
  },
  "464": {
    "id": 464,
    "name": "Rhyperior",
    "isMega": false,
    "elo": 6700,
    "winRate": 50.3,
    "appearances": 107492,
    "wins": 54071,
    "losses": 53421,
    "bestPartners": [
      {
        "name": "Clefable",
        "winRate": 51,
        "games": 3437
      },
      {
        "name": "Slowbro",
        "winRate": 50.9,
        "games": 3419
      },
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 6773
      },
      {
        "name": "Aegislash",
        "winRate": 50.6,
        "games": 6826
      },
      {
        "name": "Garchomp",
        "winRate": 50.6,
        "games": 24515
      }
    ],
    "bestSets": []
  },
  "470": {
    "id": 470,
    "name": "Leafeon",
    "isMega": false,
    "elo": 3108,
    "winRate": 51.7,
    "appearances": 5893,
    "wins": 3047,
    "losses": 2846,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 59.6,
        "games": 2823
      },
      {
        "name": "Ninetales",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Charizard",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Venusaur",
        "winRate": 51.7,
        "games": 5893
      },
      {
        "name": "Scovillain",
        "winRate": 51.7,
        "games": 5893
      }
    ],
    "bestSets": []
  },
  "471": {
    "id": 471,
    "name": "Glaceon",
    "isMega": false,
    "elo": 1844,
    "winRate": 50.3,
    "appearances": 6717,
    "wins": 3380,
    "losses": 3337,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Incineroar",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Froslass",
        "winRate": 50.3,
        "games": 6717
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 6717
      }
    ],
    "bestSets": []
  },
  "472": {
    "id": 472,
    "name": "Gliscor",
    "isMega": false,
    "elo": 5572,
    "winRate": 52.6,
    "appearances": 9641,
    "wins": 5075,
    "losses": 4566,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Azumarill",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Dragapult",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Corviknight",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Mega Gyarados",
        "winRate": 54.3,
        "games": 6171
      }
    ],
    "bestSets": []
  },
  "475": {
    "id": 475,
    "name": "Gallade",
    "isMega": false,
    "elo": -2380,
    "winRate": 46.1,
    "appearances": 6259,
    "wins": 2887,
    "losses": 3372,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 46.1,
        "games": 6259
      },
      {
        "name": "Kingambit",
        "winRate": 46.1,
        "games": 6259
      },
      {
        "name": "Aggron",
        "winRate": 46.1,
        "games": 6259
      },
      {
        "name": "Steelix",
        "winRate": 46.1,
        "games": 6259
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 46.1,
        "games": 6259
      }
    ],
    "bestSets": []
  },
  "478": {
    "id": 478,
    "name": "Froslass",
    "isMega": false,
    "elo": 2004,
    "winRate": 50.2,
    "appearances": 13431,
    "wins": 6747,
    "losses": 6684,
    "bestPartners": [
      {
        "name": "Mega Metagross",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 10077
      },
      {
        "name": "Glaceon",
        "winRate": 50.3,
        "games": 6717
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 6717
      }
    ],
    "bestSets": []
  },
  "479": {
    "id": 479,
    "name": "Rotom",
    "isMega": false,
    "elo": 1564,
    "winRate": 50.1,
    "appearances": 3462,
    "wins": 1735,
    "losses": 1727,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.1,
        "games": 3462
      },
      {
        "name": "Whimsicott",
        "winRate": 50.1,
        "games": 3462
      },
      {
        "name": "Azumarill",
        "winRate": 50.1,
        "games": 3462
      },
      {
        "name": "Garchomp",
        "winRate": 50.1,
        "games": 3462
      },
      {
        "name": "Kingambit",
        "winRate": 50.1,
        "games": 3462
      }
    ],
    "bestSets": []
  },
  "500": {
    "id": 500,
    "name": "Emboar",
    "isMega": false,
    "elo": 2124,
    "winRate": 50.2,
    "appearances": 16960,
    "wins": 8519,
    "losses": 8441,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 3384
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 10143
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 10143
      },
      {
        "name": "Mega Dragonite",
        "winRate": 50.3,
        "games": 10143
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 10143
      }
    ],
    "bestSets": []
  },
  "503": {
    "id": 503,
    "name": "Samurott",
    "isMega": false,
    "elo": 1108,
    "winRate": 49.3,
    "appearances": 3413,
    "wins": 1682,
    "losses": 1731,
    "bestPartners": [
      {
        "name": "Politoed",
        "winRate": 49.3,
        "games": 3413
      },
      {
        "name": "Mega Gyarados",
        "winRate": 49.3,
        "games": 3413
      },
      {
        "name": "Greninja",
        "winRate": 49.3,
        "games": 3413
      },
      {
        "name": "Blastoise",
        "winRate": 49.3,
        "games": 3413
      },
      {
        "name": "Feraligatr",
        "winRate": 49.3,
        "games": 3413
      }
    ],
    "bestSets": []
  },
  "530": {
    "id": 530,
    "name": "Excadrill",
    "isMega": false,
    "elo": -36804,
    "winRate": 49.2,
    "appearances": 309752,
    "wins": 152482,
    "losses": 157270,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 65.1,
        "games": 5147
      },
      {
        "name": "Hydreigon",
        "winRate": 58.9,
        "games": 14473
      },
      {
        "name": "Krookodile",
        "winRate": 57.3,
        "games": 17978
      },
      {
        "name": "Mega Charizard X",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Archaludon",
        "winRate": 54.1,
        "games": 31654
      }
    ],
    "bestSets": []
  },
  "531": {
    "id": 531,
    "name": "Audino",
    "isMega": false,
    "elo": -9420,
    "winRate": 37.3,
    "appearances": 5375,
    "wins": 2005,
    "losses": 3370,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 37.3,
        "games": 5375
      },
      {
        "name": "Hatterene",
        "winRate": 37.3,
        "games": 5375
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 37.3,
        "games": 5375
      },
      {
        "name": "Galarian Slowking",
        "winRate": 37.3,
        "games": 5375
      },
      {
        "name": "Sableye",
        "winRate": 37.3,
        "games": 5375
      }
    ],
    "bestSets": []
  },
  "534": {
    "id": 534,
    "name": "Conkeldurr",
    "isMega": false,
    "elo": 1052,
    "winRate": 49.9,
    "appearances": 34932,
    "wins": 17438,
    "losses": 17494,
    "bestPartners": [
      {
        "name": "Crabominable",
        "winRate": 50.4,
        "games": 17428
      },
      {
        "name": "Mega Alakazam",
        "winRate": 50.4,
        "games": 10517
      },
      {
        "name": "Alakazam",
        "winRate": 50.3,
        "games": 6911
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 34932
      },
      {
        "name": "Krookodile",
        "winRate": 49.9,
        "games": 34932
      }
    ],
    "bestSets": []
  },
  "547": {
    "id": 547,
    "name": "Whimsicott",
    "isMega": false,
    "elo": 11948,
    "winRate": 50.1,
    "appearances": 596978,
    "wins": 299142,
    "losses": 297836,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Lucario",
        "winRate": 58.2,
        "games": 2896
      },
      {
        "name": "Archaludon",
        "winRate": 56.3,
        "games": 9065
      },
      {
        "name": "Slowbro",
        "winRate": 55,
        "games": 12343
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.3,
        "games": 3183
      }
    ],
    "bestSets": []
  },
  "553": {
    "id": 553,
    "name": "Krookodile",
    "isMega": false,
    "elo": -16148,
    "winRate": 49.4,
    "appearances": 182220,
    "wins": 90007,
    "losses": 92213,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 59.4,
        "games": 8551
      },
      {
        "name": "Hydreigon",
        "winRate": 58.9,
        "games": 14473
      },
      {
        "name": "Archaludon",
        "winRate": 57.4,
        "games": 17877
      },
      {
        "name": "Excadrill",
        "winRate": 57.3,
        "games": 17978
      },
      {
        "name": "Mega Charizard X",
        "winRate": 54,
        "games": 12802
      }
    ],
    "bestSets": []
  },
  "635": {
    "id": 635,
    "name": "Hydreigon",
    "isMega": false,
    "elo": 32076,
    "winRate": 53.5,
    "appearances": 54848,
    "wins": 29335,
    "losses": 25513,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 65.1,
        "games": 5147
      },
      {
        "name": "Krookodile",
        "winRate": 58.9,
        "games": 14473
      },
      {
        "name": "Archaludon",
        "winRate": 58.9,
        "games": 14473
      },
      {
        "name": "Excadrill",
        "winRate": 58.9,
        "games": 14473
      },
      {
        "name": "Sylveon",
        "winRate": 58,
        "games": 3000
      }
    ],
    "bestSets": []
  },
  "652": {
    "id": 652,
    "name": "Chesnaught",
    "isMega": false,
    "elo": 11972,
    "winRate": 61.8,
    "appearances": 5569,
    "wins": 3439,
    "losses": 2130,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Metagross",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Heat Rotom",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Greninja",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Gengar",
        "winRate": 61.8,
        "games": 5569
      }
    ],
    "bestSets": []
  },
  "655": {
    "id": 655,
    "name": "Delphox",
    "isMega": false,
    "elo": 3460,
    "winRate": 51.8,
    "appearances": 6767,
    "wins": 3506,
    "losses": 3261,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 51.8,
        "games": 6767
      },
      {
        "name": "Gyarados",
        "winRate": 51.8,
        "games": 6767
      },
      {
        "name": "Azumarill",
        "winRate": 51.8,
        "games": 6767
      },
      {
        "name": "Drampa",
        "winRate": 51.8,
        "games": 6767
      },
      {
        "name": "Greninja",
        "winRate": 51.8,
        "games": 6767
      }
    ],
    "bestSets": []
  },
  "658": {
    "id": 658,
    "name": "Greninja",
    "isMega": false,
    "elo": 28876,
    "winRate": 51,
    "appearances": 177846,
    "wins": 90634,
    "losses": 87212,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Charizard",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Heat Rotom",
        "winRate": 66.5,
        "games": 12621
      },
      {
        "name": "Chesnaught",
        "winRate": 61.8,
        "games": 5569
      },
      {
        "name": "Gengar",
        "winRate": 58,
        "games": 26332
      }
    ],
    "bestSets": []
  },
  "663": {
    "id": 663,
    "name": "Talonflame",
    "isMega": false,
    "elo": 1884,
    "winRate": 50.7,
    "appearances": 3428,
    "wins": 1738,
    "losses": 1690,
    "bestPartners": [
      {
        "name": "Garchomp",
        "winRate": 50.7,
        "games": 3428
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 3428
      },
      {
        "name": "Incineroar",
        "winRate": 50.7,
        "games": 3428
      },
      {
        "name": "Mega Gardevoir",
        "winRate": 50.7,
        "games": 3428
      },
      {
        "name": "Gyarados",
        "winRate": 50.7,
        "games": 3428
      }
    ],
    "bestSets": []
  },
  "678": {
    "id": 678,
    "name": "Meowstic",
    "isMega": false,
    "elo": 1060,
    "winRate": 49.6,
    "appearances": 6889,
    "wins": 3417,
    "losses": 3472,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 6889
      },
      {
        "name": "Kingambit",
        "winRate": 49.6,
        "games": 6889
      },
      {
        "name": "Krookodile",
        "winRate": 49.6,
        "games": 6889
      },
      {
        "name": "Azumarill",
        "winRate": 49.6,
        "games": 6889
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.6,
        "games": 6889
      }
    ],
    "bestSets": []
  },
  "681": {
    "id": 681,
    "name": "Aegislash",
    "isMega": false,
    "elo": -1676,
    "winRate": 49.9,
    "appearances": 270487,
    "wins": 135045,
    "losses": 135442,
    "bestPartners": [
      {
        "name": "Lucario",
        "winRate": 58.2,
        "games": 2896
      },
      {
        "name": "Azumarill",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Mega Scizor",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 53.5,
        "games": 6406
      },
      {
        "name": "Hydreigon",
        "winRate": 52.5,
        "games": 9900
      }
    ],
    "bestSets": []
  },
  "700": {
    "id": 700,
    "name": "Sylveon",
    "isMega": false,
    "elo": 6348,
    "winRate": 51.1,
    "appearances": 27210,
    "wins": 13908,
    "losses": 13302,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 58,
        "games": 3000
      },
      {
        "name": "Dragapult",
        "winRate": 53.4,
        "games": 9742
      },
      {
        "name": "Whimsicott",
        "winRate": 52.6,
        "games": 9928
      },
      {
        "name": "Azumarill",
        "winRate": 52.1,
        "games": 3358
      },
      {
        "name": "Mega Scizor",
        "winRate": 52.1,
        "games": 3358
      }
    ],
    "bestSets": []
  },
  "701": {
    "id": 701,
    "name": "Hawlucha",
    "isMega": false,
    "elo": -6572,
    "winRate": 40.9,
    "appearances": 5545,
    "wins": 2268,
    "losses": 3277,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 40.9,
        "games": 5545
      },
      {
        "name": "Arcanine",
        "winRate": 40.9,
        "games": 5545
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 40.9,
        "games": 5545
      },
      {
        "name": "Metagross",
        "winRate": 40.9,
        "games": 5545
      },
      {
        "name": "Excadrill",
        "winRate": 40.9,
        "games": 5545
      }
    ],
    "bestSets": []
  },
  "715": {
    "id": 715,
    "name": "Noivern",
    "isMega": false,
    "elo": -22932,
    "winRate": 45.1,
    "appearances": 31334,
    "wins": 14140,
    "losses": 17194,
    "bestPartners": [
      {
        "name": "Mega Excadrill",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Pelipper",
        "winRate": 48.4,
        "games": 16910
      },
      {
        "name": "Excadrill",
        "winRate": 47.5,
        "games": 6665
      },
      {
        "name": "Gyarados",
        "winRate": 45.1,
        "games": 31334
      },
      {
        "name": "Dragonite",
        "winRate": 45.1,
        "games": 31334
      }
    ],
    "bestSets": []
  },
  "724": {
    "id": 724,
    "name": "Decidueye",
    "isMega": false,
    "elo": 2444,
    "winRate": 50.3,
    "appearances": 17210,
    "wins": 8664,
    "losses": 8546,
    "bestPartners": [
      {
        "name": "Mega Houndoom",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 17210
      },
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 17210
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 17210
      },
      {
        "name": "Dragonite",
        "winRate": 50.3,
        "games": 17210
      }
    ],
    "bestSets": []
  },
  "727": {
    "id": 727,
    "name": "Incineroar",
    "isMega": false,
    "elo": -37564,
    "winRate": 49.8,
    "appearances": 1272433,
    "wins": 633775,
    "losses": 638658,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Archaludon",
        "winRate": 62.5,
        "games": 15990
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Scizor",
        "winRate": 54.2,
        "games": 47519
      },
      {
        "name": "Alolan Ninetales",
        "winRate": 53.6,
        "games": 3264
      }
    ],
    "bestSets": []
  },
  "740": {
    "id": 740,
    "name": "Crabominable",
    "isMega": false,
    "elo": 3052,
    "winRate": 50.4,
    "appearances": 24540,
    "wins": 12367,
    "losses": 12173,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 24540
      },
      {
        "name": "Krookodile",
        "winRate": 50.4,
        "games": 17428
      },
      {
        "name": "Azumarill",
        "winRate": 50.4,
        "games": 17428
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.4,
        "games": 17428
      },
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 7112
      }
    ],
    "bestSets": []
  },
  "748": {
    "id": 748,
    "name": "Toxapex",
    "isMega": false,
    "elo": -33916,
    "winRate": 45.9,
    "appearances": 53919,
    "wins": 24746,
    "losses": 29173,
    "bestPartners": [
      {
        "name": "Garganacl",
        "winRate": 50.4,
        "games": 3558
      },
      {
        "name": "Corviknight",
        "winRate": 50.4,
        "games": 3558
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 6963
      },
      {
        "name": "Slowbro",
        "winRate": 50.4,
        "games": 3405
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 7064
      }
    ],
    "bestSets": []
  },
  "765": {
    "id": 765,
    "name": "Oranguru",
    "isMega": false,
    "elo": 2636,
    "winRate": 50.4,
    "appearances": 17568,
    "wins": 8855,
    "losses": 8713,
    "bestPartners": [
      {
        "name": "Rhyperior",
        "winRate": 50.5,
        "games": 14126
      },
      {
        "name": "Torkoal",
        "winRate": 50.4,
        "games": 17568
      },
      {
        "name": "Venusaur",
        "winRate": 50.4,
        "games": 17568
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 17568
      },
      {
        "name": "Hatterene",
        "winRate": 50.4,
        "games": 17568
      }
    ],
    "bestSets": []
  },
  "778": {
    "id": 778,
    "name": "Mimikyu",
    "isMega": false,
    "elo": -1188,
    "winRate": 49.5,
    "appearances": 33908,
    "wins": 16786,
    "losses": 17122,
    "bestPartners": [
      {
        "name": "Mega Lopunny",
        "winRate": 50.3,
        "games": 10241
      },
      {
        "name": "Rhyperior",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Ursaluna",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 3287
      }
    ],
    "bestSets": []
  },
  "780": {
    "id": 780,
    "name": "Drampa",
    "isMega": false,
    "elo": -3980,
    "winRate": 49.4,
    "appearances": 57575,
    "wins": 28445,
    "losses": 29130,
    "bestPartners": [
      {
        "name": "Mega Delphox",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Gyarados",
        "winRate": 53.4,
        "games": 16083
      },
      {
        "name": "Greninja",
        "winRate": 53.4,
        "games": 16083
      },
      {
        "name": "Slowbro",
        "winRate": 53,
        "games": 6395
      },
      {
        "name": "Kingambit",
        "winRate": 52.4,
        "games": 32785
      }
    ],
    "bestSets": []
  },
  "784": {
    "id": 784,
    "name": "Kommo-o",
    "isMega": false,
    "elo": 1132,
    "winRate": 49.9,
    "appearances": 24296,
    "wins": 12125,
    "losses": 12171,
    "bestPartners": [
      {
        "name": "Skarmory",
        "winRate": 50.2,
        "games": 6886
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 3377
      },
      {
        "name": "Kingambit",
        "winRate": 50,
        "games": 3377
      },
      {
        "name": "Garchomp",
        "winRate": 49.9,
        "games": 20841
      },
      {
        "name": "Dragapult",
        "winRate": 49.9,
        "games": 20841
      }
    ],
    "bestSets": []
  },
  "823": {
    "id": 823,
    "name": "Corviknight",
    "isMega": false,
    "elo": 37460,
    "winRate": 52.4,
    "appearances": 95255,
    "wins": 49875,
    "losses": 45380,
    "bestPartners": [
      {
        "name": "Mega Scovillain",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Aerodactyl",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Tyranitar",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Scovillain",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Archaludon",
        "winRate": 61.5,
        "games": 16418
      }
    ],
    "bestSets": []
  },
  "858": {
    "id": 858,
    "name": "Hatterene",
    "isMega": false,
    "elo": -9028,
    "winRate": 49.8,
    "appearances": 325236,
    "wins": 161960,
    "losses": 163276,
    "bestPartners": [
      {
        "name": "Mega Scizor",
        "winRate": 55.7,
        "games": 3087
      },
      {
        "name": "Slowbro",
        "winRate": 52.3,
        "games": 9814
      },
      {
        "name": "Azumarill",
        "winRate": 52.3,
        "games": 3355
      },
      {
        "name": "Gardevoir",
        "winRate": 51.7,
        "games": 9897
      },
      {
        "name": "Tyranitar",
        "winRate": 51,
        "games": 23305
      }
    ],
    "bestSets": []
  },
  "867": {
    "id": 867,
    "name": "Runerigus",
    "isMega": false,
    "elo": 2372,
    "winRate": 51.6,
    "appearances": 3419,
    "wins": 1764,
    "losses": 1655,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 51.6,
        "games": 3419
      },
      {
        "name": "Mega Gyarados",
        "winRate": 51.6,
        "games": 3419
      },
      {
        "name": "Whimsicott",
        "winRate": 51.6,
        "games": 3419
      },
      {
        "name": "Garchomp",
        "winRate": 51.6,
        "games": 3419
      },
      {
        "name": "Azumarill",
        "winRate": 51.6,
        "games": 3419
      }
    ],
    "bestSets": []
  },
  "887": {
    "id": 887,
    "name": "Dragapult",
    "isMega": false,
    "elo": 18660,
    "winRate": 50.2,
    "appearances": 568113,
    "wins": 285129,
    "losses": 282984,
    "bestPartners": [
      {
        "name": "Gliscor",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Archaludon",
        "winRate": 55.8,
        "games": 6053
      },
      {
        "name": "Mega Garchomp",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Corviknight",
        "winRate": 54,
        "games": 9568
      },
      {
        "name": "Mega Scizor",
        "winRate": 53.8,
        "games": 6445
      }
    ],
    "bestSets": []
  },
  "901": {
    "id": 901,
    "name": "Ursaluna",
    "isMega": false,
    "elo": 924,
    "winRate": 49.6,
    "appearances": 10234,
    "wins": 5081,
    "losses": 5153,
    "bestPartners": [
      {
        "name": "Mimikyu",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Rhyperior",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 3287
      },
      {
        "name": "Incineroar",
        "winRate": 49.8,
        "games": 6700
      },
      {
        "name": "Kingambit",
        "winRate": 49.8,
        "games": 6700
      }
    ],
    "bestSets": []
  },
  "908": {
    "id": 908,
    "name": "Meowscarada",
    "isMega": false,
    "elo": 2356,
    "winRate": 50.1,
    "appearances": 79451,
    "wins": 39779,
    "losses": 39672,
    "bestPartners": [
      {
        "name": "Blastoise",
        "winRate": 51.5,
        "games": 6798
      },
      {
        "name": "Mega Feraligatr",
        "winRate": 50.7,
        "games": 10581
      },
      {
        "name": "Kingambit",
        "winRate": 50.5,
        "games": 6838
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 6838
      },
      {
        "name": "Gengar",
        "winRate": 50.4,
        "games": 6845
      }
    ],
    "bestSets": []
  },
  "925": {
    "id": 925,
    "name": "Maushold",
    "isMega": false,
    "elo": 1684,
    "winRate": 50.3,
    "appearances": 3455,
    "wins": 1739,
    "losses": 1716,
    "bestPartners": [
      {
        "name": "Whimsicott",
        "winRate": 50.3,
        "games": 3455
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 3455
      },
      {
        "name": "Garchomp",
        "winRate": 50.3,
        "games": 3455
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 3455
      },
      {
        "name": "Kingambit",
        "winRate": 50.3,
        "games": 3455
      }
    ],
    "bestSets": []
  },
  "934": {
    "id": 934,
    "name": "Garganacl",
    "isMega": false,
    "elo": 3868,
    "winRate": 50.7,
    "appearances": 20348,
    "wins": 10322,
    "losses": 10026,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 51.7,
        "games": 6779
      },
      {
        "name": "Dragapult",
        "winRate": 51,
        "games": 16935
      },
      {
        "name": "Azumarill",
        "winRate": 51,
        "games": 6815
      },
      {
        "name": "Incineroar",
        "winRate": 50.9,
        "games": 16888
      },
      {
        "name": "Whimsicott",
        "winRate": 50.8,
        "games": 10022
      }
    ],
    "bestSets": []
  },
  "952": {
    "id": 952,
    "name": "Scovillain",
    "isMega": false,
    "elo": 13412,
    "winRate": 56.6,
    "appearances": 11345,
    "wins": 6417,
    "losses": 4928,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Tyranitar",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Corviknight",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Kingambit",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Archaludon",
        "winRate": 61.8,
        "games": 5452
      }
    ],
    "bestSets": []
  },
  "964": {
    "id": 964,
    "name": "Palafin",
    "isMega": false,
    "elo": -2988,
    "winRate": 49.7,
    "appearances": 102799,
    "wins": 51119,
    "losses": 51680,
    "bestPartners": [
      {
        "name": "Aegislash",
        "winRate": 50.3,
        "games": 7033
      },
      {
        "name": "Hatterene",
        "winRate": 50.1,
        "games": 41190
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 50.1,
        "games": 3519
      },
      {
        "name": "Whimsicott",
        "winRate": 50,
        "games": 58720
      },
      {
        "name": "Politoed",
        "winRate": 50,
        "games": 3479
      }
    ],
    "bestSets": []
  },
  "970": {
    "id": 970,
    "name": "Glimmora",
    "isMega": false,
    "elo": 1220,
    "winRate": 49.7,
    "appearances": 6829,
    "wins": 3397,
    "losses": 3432,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 6829
      },
      {
        "name": "Dragonite",
        "winRate": 49.7,
        "games": 6829
      },
      {
        "name": "Feraligatr",
        "winRate": 49.7,
        "games": 6829
      },
      {
        "name": "Politoed",
        "winRate": 49.7,
        "games": 6829
      },
      {
        "name": "Scizor",
        "winRate": 49.7,
        "games": 6829
      }
    ],
    "bestSets": []
  },
  "977": {
    "id": 977,
    "name": "Dondozo",
    "isMega": false,
    "elo": -476,
    "winRate": 49.6,
    "appearances": 34387,
    "wins": 17070,
    "losses": 17317,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.7,
        "games": 3467
      },
      {
        "name": "Hatterene",
        "winRate": 49.7,
        "games": 30832
      },
      {
        "name": "Excadrill",
        "winRate": 49.7,
        "games": 13545
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 34387
      },
      {
        "name": "Tatsugiri",
        "winRate": 49.6,
        "games": 34387
      }
    ],
    "bestSets": []
  },
  "978": {
    "id": 978,
    "name": "Tatsugiri",
    "isMega": false,
    "elo": -932,
    "winRate": 49.6,
    "appearances": 41568,
    "wins": 20632,
    "losses": 20936,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 10648
      },
      {
        "name": "Hatterene",
        "winRate": 49.7,
        "games": 30832
      },
      {
        "name": "Excadrill",
        "winRate": 49.7,
        "games": 20726
      },
      {
        "name": "Incineroar",
        "winRate": 49.6,
        "games": 34387
      },
      {
        "name": "Dondozo",
        "winRate": 49.6,
        "games": 34387
      }
    ],
    "bestSets": []
  },
  "983": {
    "id": 983,
    "name": "Kingambit",
    "isMega": false,
    "elo": 63756,
    "winRate": 50.8,
    "appearances": 463682,
    "wins": 235732,
    "losses": 227950,
    "bestPartners": [
      {
        "name": "Mega Clefable",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Mega Scovillain",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Aerodactyl",
        "winRate": 61.9,
        "games": 13629
      },
      {
        "name": "Scovillain",
        "winRate": 61.8,
        "games": 5452
      },
      {
        "name": "Archaludon",
        "winRate": 61,
        "games": 41413
      }
    ],
    "bestSets": []
  },
  "1018": {
    "id": 1018,
    "name": "Archaludon",
    "isMega": false,
    "elo": 108644,
    "winRate": 57.6,
    "appearances": 88455,
    "wins": 50924,
    "losses": 37531,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Slowbro",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Mega Clefable",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Scizor",
        "winRate": 65.1,
        "games": 12726
      },
      {
        "name": "Incineroar",
        "winRate": 62.5,
        "games": 15990
      }
    ],
    "bestSets": []
  },
  "5059": {
    "id": 5059,
    "name": "Hisuian Arcanine",
    "isMega": false,
    "elo": -82268,
    "winRate": 47.4,
    "appearances": 204659,
    "wins": 97094,
    "losses": 107565,
    "bestPartners": [
      {
        "name": "Mega Absol",
        "winRate": 50.8,
        "games": 10519
      },
      {
        "name": "Drampa",
        "winRate": 50.7,
        "games": 6808
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.6,
        "games": 17424
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 17424
      },
      {
        "name": "Mega Drampa",
        "winRate": 50.6,
        "games": 10361
      }
    ],
    "bestSets": []
  },
  "6080": {
    "id": 6080,
    "name": "Galarian Slowbro",
    "isMega": false,
    "elo": -27972,
    "winRate": 44.5,
    "appearances": 33728,
    "wins": 15022,
    "losses": 18706,
    "bestPartners": [
      {
        "name": "Politoed",
        "winRate": 50.7,
        "games": 3414
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 3404
      },
      {
        "name": "Archaludon",
        "winRate": 50.6,
        "games": 3404
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 10305
      },
      {
        "name": "Garchomp",
        "winRate": 50.4,
        "games": 10305
      }
    ],
    "bestSets": []
  },
  "6199": {
    "id": 6199,
    "name": "Galarian Slowking",
    "isMega": false,
    "elo": -17324,
    "winRate": 42,
    "appearances": 14635,
    "wins": 6141,
    "losses": 8494,
    "bestPartners": [
      {
        "name": "Mega Audino",
        "winRate": 44.7,
        "games": 9260
      },
      {
        "name": "Gyarados",
        "winRate": 42,
        "games": 14635
      },
      {
        "name": "Hatterene",
        "winRate": 42,
        "games": 14635
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 42,
        "games": 14635
      },
      {
        "name": "Sableye",
        "winRate": 42,
        "games": 14635
      }
    ],
    "bestSets": []
  },
  "6618": {
    "id": 6618,
    "name": "Galarian Stunfisk",
    "isMega": false,
    "elo": -4628,
    "winRate": 49.2,
    "appearances": 50878,
    "wins": 25056,
    "losses": 25822,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.9,
        "games": 6773
      },
      {
        "name": "Excadrill",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Archaludon",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Rhyperior",
        "winRate": 50.1,
        "games": 17181
      },
      {
        "name": "Mega Gyarados",
        "winRate": 49.6,
        "games": 10408
      }
    ],
    "bestSets": []
  },
  "10008": {
    "id": 10008,
    "name": "Heat Rotom",
    "isMega": false,
    "elo": 41748,
    "winRate": 57.8,
    "appearances": 32161,
    "wins": 18596,
    "losses": 13565,
    "bestPartners": [
      {
        "name": "Mega Chesnaught",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Mega Gyarados",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Archaludon",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Whimsicott",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Slowbro",
        "winRate": 69.4,
        "games": 2397
      }
    ],
    "bestSets": []
  },
  "10009": {
    "id": 10009,
    "name": "Wash Rotom",
    "isMega": false,
    "elo": 24876,
    "winRate": 52.8,
    "appearances": 51900,
    "wins": 27411,
    "losses": 24489,
    "bestPartners": [
      {
        "name": "Pinsir",
        "winRate": 58.2,
        "games": 5825
      },
      {
        "name": "Archaludon",
        "winRate": 56.8,
        "games": 15058
      },
      {
        "name": "Mega Pinsir",
        "winRate": 56,
        "games": 9233
      },
      {
        "name": "Tyranitar",
        "winRate": 54.7,
        "games": 31251
      },
      {
        "name": "Metagross",
        "winRate": 54.7,
        "games": 31251
      }
    ],
    "bestSets": []
  },
  "10103": {
    "id": 10103,
    "name": "Alolan Ninetales",
    "isMega": false,
    "elo": 5452,
    "winRate": 50.9,
    "appearances": 27186,
    "wins": 13840,
    "losses": 13346,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 53.6,
        "games": 3264
      },
      {
        "name": "Incineroar",
        "winRate": 53.6,
        "games": 3264
      },
      {
        "name": "Kingambit",
        "winRate": 53.6,
        "games": 3264
      },
      {
        "name": "Garchomp",
        "winRate": 51.1,
        "games": 13538
      },
      {
        "name": "Scizor",
        "winRate": 51.1,
        "games": 23695
      }
    ],
    "bestSets": []
  },
  "10340": {
    "id": 10340,
    "name": "Hisuian Zoroark",
    "isMega": false,
    "elo": 7660,
    "winRate": 51,
    "appearances": 37568,
    "wins": 19169,
    "losses": 18399,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Mega Scizor",
        "winRate": 54.7,
        "games": 6288
      },
      {
        "name": "Aegislash",
        "winRate": 53.5,
        "games": 6406
      },
      {
        "name": "Azumarill",
        "winRate": 52.1,
        "games": 13213
      },
      {
        "name": "Arcanine",
        "winRate": 51.6,
        "games": 20354
      }
    ],
    "bestSets": []
  },
  "652-mega": {
    "id": 652,
    "name": "Mega Chesnaught",
    "isMega": true,
    "elo": 24316,
    "winRate": 70.2,
    "appearances": 7052,
    "wins": 4952,
    "losses": 2100,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Metagross",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Heat Rotom",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Greninja",
        "winRate": 70.2,
        "games": 7052
      },
      {
        "name": "Gengar",
        "winRate": 70.2,
        "games": 7052
      }
    ],
    "bestSets": []
  },
  "36-mega": {
    "id": 36,
    "name": "Mega Clefable",
    "isMega": true,
    "elo": 22628,
    "winRate": 68.2,
    "appearances": 7239,
    "wins": 4940,
    "losses": 2299,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Incineroar",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Kingambit",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Scizor",
        "winRate": 68.2,
        "games": 7239
      },
      {
        "name": "Metagross",
        "winRate": 68.2,
        "games": 7239
      }
    ],
    "bestSets": []
  },
  "952-mega": {
    "id": 952,
    "name": "Mega Scovillain",
    "isMega": true,
    "elo": 17108,
    "winRate": 61.9,
    "appearances": 8177,
    "wins": 5064,
    "losses": 3113,
    "bestPartners": [
      {
        "name": "Aerodactyl",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Tyranitar",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Corviknight",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Kingambit",
        "winRate": 61.9,
        "games": 8177
      },
      {
        "name": "Archaludon",
        "winRate": 61.9,
        "games": 8177
      }
    ],
    "bestSets": []
  },
  "130-mega": {
    "id": 130,
    "name": "Mega Gyarados",
    "isMega": true,
    "elo": 10804,
    "winRate": 50.4,
    "appearances": 144715,
    "wins": 72939,
    "losses": 71776,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 69.4,
        "games": 2397
      },
      {
        "name": "Corviknight",
        "winRate": 59.5,
        "games": 2789
      },
      {
        "name": "Slowbro",
        "winRate": 58.1,
        "games": 5779
      },
      {
        "name": "Gliscor",
        "winRate": 54.3,
        "games": 6171
      },
      {
        "name": "Archaludon",
        "winRate": 53.5,
        "games": 19128
      }
    ],
    "bestSets": []
  },
  "127-mega": {
    "id": 127,
    "name": "Mega Pinsir",
    "isMega": true,
    "elo": 10356,
    "winRate": 56,
    "appearances": 9233,
    "wins": 5170,
    "losses": 4063,
    "bestPartners": [
      {
        "name": "Wash Rotom",
        "winRate": 56,
        "games": 9233
      },
      {
        "name": "Archaludon",
        "winRate": 56,
        "games": 9233
      },
      {
        "name": "Kingambit",
        "winRate": 56,
        "games": 9233
      },
      {
        "name": "Tyranitar",
        "winRate": 56,
        "games": 9233
      },
      {
        "name": "Metagross",
        "winRate": 56,
        "games": 9233
      }
    ],
    "bestSets": []
  },
  "6-mega": {
    "id": 6,
    "name": "Mega Charizard X",
    "isMega": true,
    "elo": 10212,
    "winRate": 53.4,
    "appearances": 16155,
    "wins": 8622,
    "losses": 7533,
    "bestPartners": [
      {
        "name": "Archaludon",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Excadrill",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Hydreigon",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Garchomp",
        "winRate": 55.5,
        "games": 9326
      },
      {
        "name": "Krookodile",
        "winRate": 54,
        "games": 12802
      }
    ],
    "bestSets": []
  },
  "655-mega": {
    "id": 655,
    "name": "Mega Delphox",
    "isMega": true,
    "elo": 8172,
    "winRate": 54.5,
    "appearances": 9316,
    "wins": 5075,
    "losses": 4241,
    "bestPartners": [
      {
        "name": "Kingambit",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Gyarados",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Azumarill",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Drampa",
        "winRate": 54.5,
        "games": 9316
      },
      {
        "name": "Greninja",
        "winRate": 54.5,
        "games": 9316
      }
    ],
    "bestSets": []
  },
  "212-mega": {
    "id": 212,
    "name": "Mega Scizor",
    "isMega": true,
    "elo": 7524,
    "winRate": 51.6,
    "appearances": 23419,
    "wins": 12086,
    "losses": 11333,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Aegislash",
        "winRate": 57.6,
        "games": 2930
      },
      {
        "name": "Gardevoir",
        "winRate": 55.7,
        "games": 3087
      },
      {
        "name": "Hatterene",
        "winRate": 55.7,
        "games": 3087
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 54.7,
        "games": 6288
      }
    ],
    "bestSets": []
  },
  "248-mega": {
    "id": 248,
    "name": "Mega Tyranitar",
    "isMega": true,
    "elo": 7292,
    "winRate": 50.2,
    "appearances": 199386,
    "wins": 100055,
    "losses": 99331,
    "bestPartners": [
      {
        "name": "Sylveon",
        "winRate": 50.7,
        "games": 3384
      },
      {
        "name": "Krookodile",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Rhyperior",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Hippowdon",
        "winRate": 50.5,
        "games": 3505
      },
      {
        "name": "Dragapult",
        "winRate": 50.4,
        "games": 75793
      }
    ],
    "bestSets": []
  },
  "214-mega": {
    "id": 214,
    "name": "Mega Heracross",
    "isMega": true,
    "elo": 5756,
    "winRate": 52.7,
    "appearances": 9720,
    "wins": 5126,
    "losses": 4594,
    "bestPartners": [
      {
        "name": "Tyranitar",
        "winRate": 52.7,
        "games": 9720
      },
      {
        "name": "Metagross",
        "winRate": 52.7,
        "games": 9720
      },
      {
        "name": "Wash Rotom",
        "winRate": 52.7,
        "games": 9720
      },
      {
        "name": "Greninja",
        "winRate": 52.7,
        "games": 9720
      },
      {
        "name": "Kingambit",
        "winRate": 52.7,
        "games": 9720
      }
    ],
    "bestSets": []
  },
  "445-mega": {
    "id": 445,
    "name": "Mega Garchomp",
    "isMega": true,
    "elo": 5372,
    "winRate": 51.8,
    "appearances": 13340,
    "wins": 6912,
    "losses": 6428,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Whimsicott",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Dragapult",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Gardevoir",
        "winRate": 54.3,
        "games": 3183
      },
      {
        "name": "Kingambit",
        "winRate": 54.3,
        "games": 3183
      }
    ],
    "bestSets": []
  },
  "359-mega": {
    "id": 359,
    "name": "Mega Absol",
    "isMega": true,
    "elo": 2916,
    "winRate": 50.8,
    "appearances": 10519,
    "wins": 5348,
    "losses": 5171,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.8,
        "games": 10519
      },
      {
        "name": "Gyarados",
        "winRate": 50.8,
        "games": 10519
      },
      {
        "name": "Hisuian Zoroark",
        "winRate": 50.8,
        "games": 10519
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.8,
        "games": 10519
      },
      {
        "name": "Dragapult",
        "winRate": 50.8,
        "games": 10519
      }
    ],
    "bestSets": []
  },
  "160-mega": {
    "id": 160,
    "name": "Mega Feraligatr",
    "isMega": true,
    "elo": 2916,
    "winRate": 50.6,
    "appearances": 13953,
    "wins": 7065,
    "losses": 6888,
    "bestPartners": [
      {
        "name": "Dragapult",
        "winRate": 50.7,
        "games": 10581
      },
      {
        "name": "Meowscarada",
        "winRate": 50.7,
        "games": 10581
      },
      {
        "name": "Arcanine",
        "winRate": 50.7,
        "games": 10581
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 13953
      },
      {
        "name": "Incineroar",
        "winRate": 50.6,
        "games": 13953
      }
    ],
    "bestSets": []
  },
  "780-mega": {
    "id": 780,
    "name": "Mega Drampa",
    "isMega": true,
    "elo": 2500,
    "winRate": 50.6,
    "appearances": 10361,
    "wins": 5243,
    "losses": 5118,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 10361
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.6,
        "games": 10361
      },
      {
        "name": "Aegislash",
        "winRate": 50.6,
        "games": 10361
      },
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 10361
      },
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 10361
      }
    ],
    "bestSets": []
  },
  "978-mega": {
    "id": 978,
    "name": "Mega Tatsugiri",
    "isMega": true,
    "elo": 2484,
    "winRate": 50.6,
    "appearances": 10291,
    "wins": 5207,
    "losses": 5084,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 50.6,
        "games": 10291
      },
      {
        "name": "Excadrill",
        "winRate": 50.6,
        "games": 10291
      },
      {
        "name": "Corviknight",
        "winRate": 50.6,
        "games": 10291
      },
      {
        "name": "Arcanine",
        "winRate": 50.6,
        "games": 10291
      },
      {
        "name": "Skarmory",
        "winRate": 50.6,
        "games": 10291
      }
    ],
    "bestSets": []
  },
  "229-mega": {
    "id": 229,
    "name": "Mega Houndoom",
    "isMega": true,
    "elo": 2396,
    "winRate": 50.6,
    "appearances": 10124,
    "wins": 5118,
    "losses": 5006,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Whimsicott",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Decidueye",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Dragapult",
        "winRate": 50.6,
        "games": 10124
      },
      {
        "name": "Dragonite",
        "winRate": 50.6,
        "games": 10124
      }
    ],
    "bestSets": []
  },
  "65-mega": {
    "id": 65,
    "name": "Mega Alakazam",
    "isMega": true,
    "elo": 2332,
    "winRate": 50.4,
    "appearances": 13974,
    "wins": 7039,
    "losses": 6935,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 13974
      },
      {
        "name": "Azumarill",
        "winRate": 50.4,
        "games": 13974
      },
      {
        "name": "Krookodile",
        "winRate": 50.4,
        "games": 10517
      },
      {
        "name": "Conkeldurr",
        "winRate": 50.4,
        "games": 10517
      },
      {
        "name": "Crabominable",
        "winRate": 50.4,
        "games": 10517
      }
    ],
    "bestSets": []
  },
  "740-mega": {
    "id": 740,
    "name": "Mega Crabominable",
    "isMega": true,
    "elo": 2196,
    "winRate": 50.4,
    "appearances": 10283,
    "wins": 5185,
    "losses": 5098,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 10283
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 10283
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 10283
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 10283
      },
      {
        "name": "Charizard",
        "winRate": 50.4,
        "games": 10283
      }
    ],
    "bestSets": []
  },
  "26-mega": {
    "id": 26,
    "name": "Mega Raichu X",
    "isMega": true,
    "elo": 2092,
    "winRate": 50.4,
    "appearances": 10234,
    "wins": 5154,
    "losses": 5080,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.4,
        "games": 10234
      },
      {
        "name": "Incineroar",
        "winRate": 50.4,
        "games": 10234
      },
      {
        "name": "Arcanine",
        "winRate": 50.4,
        "games": 10234
      },
      {
        "name": "Corviknight",
        "winRate": 50.4,
        "games": 10234
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.4,
        "games": 10234
      }
    ],
    "bestSets": []
  },
  "428-mega": {
    "id": 428,
    "name": "Mega Lopunny",
    "isMega": true,
    "elo": 2020,
    "winRate": 50.3,
    "appearances": 10241,
    "wins": 5153,
    "losses": 5088,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50.3,
        "games": 10241
      },
      {
        "name": "Incineroar",
        "winRate": 50.3,
        "games": 10241
      },
      {
        "name": "Arcanine",
        "winRate": 50.3,
        "games": 10241
      },
      {
        "name": "Mimikyu",
        "winRate": 50.3,
        "games": 10241
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.3,
        "games": 10241
      }
    ],
    "bestSets": []
  },
  "460-mega": {
    "id": 460,
    "name": "Mega Abomasnow",
    "isMega": true,
    "elo": 1508,
    "winRate": 50,
    "appearances": 10377,
    "wins": 5189,
    "losses": 5188,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 50,
        "games": 10377
      },
      {
        "name": "Arcanine",
        "winRate": 50,
        "games": 10377
      },
      {
        "name": "Charizard",
        "winRate": 50,
        "games": 10377
      },
      {
        "name": "Aegislash",
        "winRate": 50,
        "games": 10377
      },
      {
        "name": "Gengar",
        "winRate": 50,
        "games": 10377
      }
    ],
    "bestSets": []
  },
  "181-mega": {
    "id": 181,
    "name": "Mega Ampharos",
    "isMega": true,
    "elo": 1300,
    "winRate": 49.9,
    "appearances": 10375,
    "wins": 5175,
    "losses": 5200,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.9,
        "games": 10375
      },
      {
        "name": "Incineroar",
        "winRate": 49.9,
        "games": 10375
      },
      {
        "name": "Charizard",
        "winRate": 49.9,
        "games": 10375
      },
      {
        "name": "Arcanine",
        "winRate": 49.9,
        "games": 10375
      },
      {
        "name": "Whimsicott",
        "winRate": 49.9,
        "games": 10375
      }
    ],
    "bestSets": []
  },
  "658-mega": {
    "id": 658,
    "name": "Mega Greninja",
    "isMega": true,
    "elo": 1004,
    "winRate": 49.7,
    "appearances": 10246,
    "wins": 5092,
    "losses": 5154,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 49.7,
        "games": 10246
      },
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 10246
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.7,
        "games": 10246
      },
      {
        "name": "Gengar",
        "winRate": 49.7,
        "games": 10246
      },
      {
        "name": "Aegislash",
        "winRate": 49.7,
        "games": 10246
      }
    ],
    "bestSets": []
  },
  "154-mega": {
    "id": 154,
    "name": "Mega Meganium",
    "isMega": true,
    "elo": 940,
    "winRate": 49.7,
    "appearances": 13844,
    "wins": 6887,
    "losses": 6957,
    "bestPartners": [
      {
        "name": "Heat Rotom",
        "winRate": 49.8,
        "games": 10355
      },
      {
        "name": "Toxapex",
        "winRate": 49.8,
        "games": 10355
      },
      {
        "name": "Wash Rotom",
        "winRate": 49.8,
        "games": 10355
      },
      {
        "name": "Arcanine",
        "winRate": 49.8,
        "games": 10355
      },
      {
        "name": "Gyarados",
        "winRate": 49.7,
        "games": 13844
      }
    ],
    "bestSets": []
  },
  "227-mega": {
    "id": 227,
    "name": "Mega Skarmory",
    "isMega": true,
    "elo": 892,
    "winRate": 49.7,
    "appearances": 13932,
    "wins": 6928,
    "losses": 7004,
    "bestPartners": [
      {
        "name": "Glaceon",
        "winRate": 49.8,
        "games": 3354
      },
      {
        "name": "Metagross",
        "winRate": 49.8,
        "games": 3354
      },
      {
        "name": "Froslass",
        "winRate": 49.8,
        "games": 3354
      },
      {
        "name": "Krookodile",
        "winRate": 49.8,
        "games": 3354
      },
      {
        "name": "Garchomp",
        "winRate": 49.7,
        "games": 13932
      }
    ],
    "bestSets": []
  },
  "500-mega": {
    "id": 500,
    "name": "Mega Emboar",
    "isMega": true,
    "elo": 764,
    "winRate": 49.6,
    "appearances": 10258,
    "wins": 5083,
    "losses": 5175,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.6,
        "games": 10258
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 10258
      },
      {
        "name": "Greninja",
        "winRate": 49.6,
        "games": 10258
      },
      {
        "name": "Starmie",
        "winRate": 49.6,
        "games": 10258
      },
      {
        "name": "Corviknight",
        "winRate": 49.6,
        "games": 10258
      }
    ],
    "bestSets": []
  },
  "80-mega": {
    "id": 80,
    "name": "Mega Slowbro",
    "isMega": true,
    "elo": 620,
    "winRate": 49.5,
    "appearances": 10434,
    "wins": 5162,
    "losses": 5272,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 10434
      },
      {
        "name": "Kingambit",
        "winRate": 49.5,
        "games": 10434
      },
      {
        "name": "Arcanine",
        "winRate": 49.5,
        "games": 10434
      },
      {
        "name": "Steelix",
        "winRate": 49.5,
        "games": 10434
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 49.5,
        "games": 10434
      }
    ],
    "bestSets": []
  },
  "478-mega": {
    "id": 478,
    "name": "Mega Froslass",
    "isMega": true,
    "elo": 572,
    "winRate": 49.4,
    "appearances": 10282,
    "wins": 5083,
    "losses": 5199,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.4,
        "games": 10282
      },
      {
        "name": "Krookodile",
        "winRate": 49.4,
        "games": 10282
      },
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 10282
      },
      {
        "name": "Arcanine",
        "winRate": 49.4,
        "games": 10282
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 10282
      }
    ],
    "bestSets": []
  },
  "970-mega": {
    "id": 970,
    "name": "Mega Glimmora",
    "isMega": true,
    "elo": 548,
    "winRate": 49.4,
    "appearances": 10263,
    "wins": 5072,
    "losses": 5191,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 49.4,
        "games": 10263
      },
      {
        "name": "Dragonite",
        "winRate": 49.4,
        "games": 10263
      },
      {
        "name": "Feraligatr",
        "winRate": 49.4,
        "games": 10263
      },
      {
        "name": "Politoed",
        "winRate": 49.4,
        "games": 10263
      },
      {
        "name": "Scizor",
        "winRate": 49.4,
        "games": 10263
      }
    ],
    "bestSets": []
  },
  "475-mega": {
    "id": 475,
    "name": "Mega Gallade",
    "isMega": true,
    "elo": 460,
    "winRate": 49.4,
    "appearances": 10176,
    "wins": 5023,
    "losses": 5153,
    "bestPartners": [
      {
        "name": "Hisuian Arcanine",
        "winRate": 49.4,
        "games": 10176
      },
      {
        "name": "Kingambit",
        "winRate": 49.4,
        "games": 10176
      },
      {
        "name": "Aggron",
        "winRate": 49.4,
        "games": 10176
      },
      {
        "name": "Steelix",
        "winRate": 49.4,
        "games": 10176
      },
      {
        "name": "Galarian Stunfisk",
        "winRate": 49.4,
        "games": 10176
      }
    ],
    "bestSets": []
  },
  "678-mega": {
    "id": 678,
    "name": "Mega Meowstic",
    "isMega": true,
    "elo": 372,
    "winRate": 49.3,
    "appearances": 10615,
    "wins": 5237,
    "losses": 5378,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 49.3,
        "games": 10615
      },
      {
        "name": "Kingambit",
        "winRate": 49.3,
        "games": 10615
      },
      {
        "name": "Krookodile",
        "winRate": 49.3,
        "games": 10615
      },
      {
        "name": "Azumarill",
        "winRate": 49.3,
        "games": 10615
      },
      {
        "name": "Conkeldurr",
        "winRate": 49.3,
        "games": 10615
      }
    ],
    "bestSets": []
  },
  "9-mega": {
    "id": 9,
    "name": "Mega Blastoise",
    "isMega": true,
    "elo": 172,
    "winRate": 49.7,
    "appearances": 24284,
    "wins": 12059,
    "losses": 12225,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 51.4,
        "games": 3456
      },
      {
        "name": "Politoed",
        "winRate": 49.9,
        "games": 13912
      },
      {
        "name": "Whimsicott",
        "winRate": 49.7,
        "games": 24284
      },
      {
        "name": "Dragapult",
        "winRate": 49.7,
        "games": 24284
      },
      {
        "name": "Incineroar",
        "winRate": 49.7,
        "games": 24284
      }
    ],
    "bestSets": []
  },
  "530-mega": {
    "id": 530,
    "name": "Mega Excadrill",
    "isMega": true,
    "elo": -316,
    "winRate": 48.9,
    "appearances": 10245,
    "wins": 5009,
    "losses": 5236,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Dragonite",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Pelipper",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Altaria",
        "winRate": 48.9,
        "games": 10245
      },
      {
        "name": "Noivern",
        "winRate": 48.9,
        "games": 10245
      }
    ],
    "bestSets": []
  },
  "306-mega": {
    "id": 306,
    "name": "Mega Aggron",
    "isMega": true,
    "elo": -492,
    "winRate": 49.1,
    "appearances": 13605,
    "wins": 6678,
    "losses": 6927,
    "bestPartners": [
      {
        "name": "Dragonite",
        "winRate": 49.6,
        "games": 10293
      },
      {
        "name": "Whimsicott",
        "winRate": 49.6,
        "games": 10293
      },
      {
        "name": "Dragapult",
        "winRate": 49.6,
        "games": 10293
      },
      {
        "name": "Gyarados",
        "winRate": 49.1,
        "games": 13605
      },
      {
        "name": "Meowscarada",
        "winRate": 49.1,
        "games": 13605
      }
    ],
    "bestSets": []
  },
  "376-mega": {
    "id": 376,
    "name": "Mega Metagross",
    "isMega": true,
    "elo": -1828,
    "winRate": 49.9,
    "appearances": 175496,
    "wins": 87540,
    "losses": 87956,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 52,
        "games": 6627
      },
      {
        "name": "Glaceon",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Froslass",
        "winRate": 50.8,
        "games": 3363
      },
      {
        "name": "Kingambit",
        "winRate": 50.7,
        "games": 10345
      },
      {
        "name": "Drampa",
        "winRate": 50.6,
        "games": 3501
      }
    ],
    "bestSets": []
  },
  "115-mega": {
    "id": 115,
    "name": "Mega Kangaskhan",
    "isMega": true,
    "elo": -3700,
    "winRate": 49.7,
    "appearances": 100180,
    "wins": 49765,
    "losses": 50415,
    "bestPartners": [
      {
        "name": "Snorlax",
        "winRate": 50.7,
        "games": 3429
      },
      {
        "name": "Arcanine",
        "winRate": 50.2,
        "games": 10317
      },
      {
        "name": "Mimikyu",
        "winRate": 50.2,
        "games": 10317
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 50.2,
        "games": 10317
      },
      {
        "name": "Scizor",
        "winRate": 50,
        "games": 6864
      }
    ],
    "bestSets": []
  },
  "149-mega": {
    "id": 149,
    "name": "Mega Dragonite",
    "isMega": true,
    "elo": -4060,
    "winRate": 49.4,
    "appearances": 57915,
    "wins": 28610,
    "losses": 29305,
    "bestPartners": [
      {
        "name": "Hydreigon",
        "winRate": 50.4,
        "games": 3384
      },
      {
        "name": "Dragapult",
        "winRate": 50.3,
        "games": 17081
      },
      {
        "name": "Emboar",
        "winRate": 50.3,
        "games": 10143
      },
      {
        "name": "Lucario",
        "winRate": 50.3,
        "games": 3385
      },
      {
        "name": "Clefable",
        "winRate": 50.2,
        "games": 3437
      }
    ],
    "bestSets": []
  },
  "94-mega": {
    "id": 94,
    "name": "Mega Gengar",
    "isMega": true,
    "elo": -4132,
    "winRate": 48.2,
    "appearances": 19882,
    "wins": 9589,
    "losses": 10293,
    "bestPartners": [
      {
        "name": "Corviknight",
        "winRate": 50.5,
        "games": 3481
      },
      {
        "name": "Garchomp",
        "winRate": 50.5,
        "games": 3481
      },
      {
        "name": "Arcanine",
        "winRate": 50.5,
        "games": 3481
      },
      {
        "name": "Greninja",
        "winRate": 50.3,
        "games": 10359
      },
      {
        "name": "Tyranitar",
        "winRate": 50.3,
        "games": 10359
      }
    ],
    "bestSets": []
  },
  "142-mega": {
    "id": 142,
    "name": "Mega Aerodactyl",
    "isMega": true,
    "elo": -4332,
    "winRate": 46.2,
    "appearances": 9621,
    "wins": 4446,
    "losses": 5175,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 46.2,
        "games": 9621
      },
      {
        "name": "Arcanine",
        "winRate": 46.2,
        "games": 9621
      },
      {
        "name": "Lucario",
        "winRate": 46.2,
        "games": 9621
      },
      {
        "name": "Excadrill",
        "winRate": 46.2,
        "games": 9621
      },
      {
        "name": "Meganium",
        "winRate": 46.2,
        "games": 9621
      }
    ],
    "bestSets": []
  },
  "701-mega": {
    "id": 701,
    "name": "Mega Hawlucha",
    "isMega": true,
    "elo": -5532,
    "winRate": 45.4,
    "appearances": 9471,
    "wins": 4296,
    "losses": 5175,
    "bestPartners": [
      {
        "name": "Incineroar",
        "winRate": 45.4,
        "games": 9471
      },
      {
        "name": "Arcanine",
        "winRate": 45.4,
        "games": 9471
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 45.4,
        "games": 9471
      },
      {
        "name": "Metagross",
        "winRate": 45.4,
        "games": 9471
      },
      {
        "name": "Excadrill",
        "winRate": 45.4,
        "games": 9471
      }
    ],
    "bestSets": []
  },
  "531-mega": {
    "id": 531,
    "name": "Mega Audino",
    "isMega": true,
    "elo": -6404,
    "winRate": 44.7,
    "appearances": 9260,
    "wins": 4136,
    "losses": 5124,
    "bestPartners": [
      {
        "name": "Gyarados",
        "winRate": 44.7,
        "games": 9260
      },
      {
        "name": "Hatterene",
        "winRate": 44.7,
        "games": 9260
      },
      {
        "name": "Galarian Slowbro",
        "winRate": 44.7,
        "games": 9260
      },
      {
        "name": "Galarian Slowking",
        "winRate": 44.7,
        "games": 9260
      },
      {
        "name": "Sableye",
        "winRate": 44.7,
        "games": 9260
      }
    ],
    "bestSets": []
  },
  "448-mega": {
    "id": 448,
    "name": "Mega Lucario",
    "isMega": true,
    "elo": -8988,
    "winRate": 45.9,
    "appearances": 15911,
    "wins": 7300,
    "losses": 8611,
    "bestPartners": [
      {
        "name": "Scizor",
        "winRate": 49.7,
        "games": 3441
      },
      {
        "name": "Gengar",
        "winRate": 49.7,
        "games": 3441
      },
      {
        "name": "Azumarill",
        "winRate": 49.7,
        "games": 3441
      },
      {
        "name": "Incineroar",
        "winRate": 49.5,
        "games": 3524
      },
      {
        "name": "Gardevoir",
        "winRate": 49.5,
        "games": 3524
      }
    ],
    "bestSets": []
  },
  "15-mega": {
    "id": 15,
    "name": "Mega Beedrill",
    "isMega": true,
    "elo": -10188,
    "winRate": 41.7,
    "appearances": 8759,
    "wins": 3649,
    "losses": 5110,
    "bestPartners": [
      {
        "name": "Krookodile",
        "winRate": 41.7,
        "games": 8759
      },
      {
        "name": "Incineroar",
        "winRate": 41.7,
        "games": 8759
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 41.7,
        "games": 8759
      },
      {
        "name": "Greninja",
        "winRate": 41.7,
        "games": 8759
      },
      {
        "name": "Garchomp",
        "winRate": 41.7,
        "games": 8759
      }
    ],
    "bestSets": []
  },
  "334-mega": {
    "id": 334,
    "name": "Mega Altaria",
    "isMega": true,
    "elo": -11140,
    "winRate": 40.9,
    "appearances": 8638,
    "wins": 3529,
    "losses": 5109,
    "bestPartners": [
      {
        "name": "Arcanine",
        "winRate": 40.9,
        "games": 8638
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 40.9,
        "games": 8638
      },
      {
        "name": "Excadrill",
        "winRate": 40.9,
        "games": 8638
      },
      {
        "name": "Kingambit",
        "winRate": 40.9,
        "games": 8638
      },
      {
        "name": "Aggron",
        "winRate": 40.9,
        "games": 8638
      }
    ],
    "bestSets": []
  },
  "282-mega": {
    "id": 282,
    "name": "Mega Gardevoir",
    "isMega": true,
    "elo": -14804,
    "winRate": 49.6,
    "appearances": 272176,
    "wins": 135069,
    "losses": 137107,
    "bestPartners": [
      {
        "name": "Torkoal",
        "winRate": 50.7,
        "games": 10560
      },
      {
        "name": "Venusaur",
        "winRate": 50.7,
        "games": 10560
      },
      {
        "name": "Talonflame",
        "winRate": 50.7,
        "games": 3428
      },
      {
        "name": "Mega Gyarados",
        "winRate": 50.5,
        "games": 6907
      },
      {
        "name": "Raichu",
        "winRate": 50.5,
        "games": 6590
      }
    ],
    "bestSets": []
  },
  "302-mega": {
    "id": 302,
    "name": "Mega Sableye",
    "isMega": true,
    "elo": -30892,
    "winRate": 41.3,
    "appearances": 23165,
    "wins": 9558,
    "losses": 13607,
    "bestPartners": [
      {
        "name": "Charizard",
        "winRate": 50.6,
        "games": 3404
      },
      {
        "name": "Archaludon",
        "winRate": 50.6,
        "games": 3404
      },
      {
        "name": "Mimikyu",
        "winRate": 47.4,
        "games": 3294
      },
      {
        "name": "Azumarill",
        "winRate": 47.4,
        "games": 3294
      },
      {
        "name": "Hisuian Arcanine",
        "winRate": 44.7,
        "games": 9385
      }
    ],
    "bestSets": []
  }
};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = [
  {
    "pokemon1": "Charizard",
    "pokemon2": "Mega Chesnaught",
    "winRate": 70.2,
    "games": 7052
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Mega Chesnaught",
    "winRate": 70.2,
    "games": 7052
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Chesnaught",
    "winRate": 70.2,
    "games": 7052
  },
  {
    "pokemon1": "Mega Chesnaught",
    "pokemon2": "Greninja",
    "winRate": 70.2,
    "games": 7052
  },
  {
    "pokemon1": "Mega Chesnaught",
    "pokemon2": "Gengar",
    "winRate": 70.2,
    "games": 7052
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Mega Gyarados",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Archaludon",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Whimsicott",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Slowbro",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Garchomp",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Slowbro",
    "winRate": 69.4,
    "games": 2397
  },
  {
    "pokemon1": "Archaludon",
    "pokemon2": "Mega Clefable",
    "winRate": 68.2,
    "games": 7239
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Incineroar",
    "winRate": 68.2,
    "games": 7239
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Kingambit",
    "winRate": 68.2,
    "games": 7239
  },
  {
    "pokemon1": "Scizor",
    "pokemon2": "Mega Clefable",
    "winRate": 68.2,
    "games": 7239
  },
  {
    "pokemon1": "Mega Clefable",
    "pokemon2": "Metagross",
    "winRate": 68.2,
    "games": 7239
  },
  {
    "pokemon1": "Metagross",
    "pokemon2": "Charizard",
    "winRate": 66.5,
    "games": 12621
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Charizard",
    "winRate": 66.5,
    "games": 12621
  },
  {
    "pokemon1": "Charizard",
    "pokemon2": "Greninja",
    "winRate": 66.5,
    "games": 12621
  },
  {
    "pokemon1": "Heat Rotom",
    "pokemon2": "Metagross",
    "winRate": 66.5,
    "games": 12621
  }
];

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = [
  {
    "name": "Mega Chesnaught",
    "elo": 24316,
    "winRate": 70.2,
    "wins": 4952,
    "losses": 2100
  },
  {
    "name": "Mega Clefable",
    "elo": 22628,
    "winRate": 68.2,
    "wins": 4940,
    "losses": 2299
  },
  {
    "name": "Mega Scovillain",
    "elo": 17108,
    "winRate": 61.9,
    "wins": 5064,
    "losses": 3113
  },
  {
    "name": "Charizard Base",
    "elo": 13956,
    "winRate": 65.1,
    "wins": 3352,
    "losses": 1795
  },
  {
    "name": "Chesnaught Base",
    "elo": 11972,
    "winRate": 61.8,
    "wins": 3439,
    "losses": 2130
  },
  {
    "name": "Scovillain Base",
    "elo": 11804,
    "winRate": 61.8,
    "wins": 3370,
    "losses": 2082
  },
  {
    "name": "Clefable Base",
    "elo": 11108,
    "winRate": 60.9,
    "wins": 3344,
    "losses": 2143
  },
  {
    "name": "Mega Pinsir",
    "elo": 10356,
    "winRate": 56,
    "wins": 5170,
    "losses": 4063
  },
  {
    "name": "Mega Charizard",
    "elo": 9756,
    "winRate": 55.5,
    "wins": 5179,
    "losses": 4147
  },
  {
    "name": "Pinsir Base",
    "elo": 9108,
    "winRate": 58.2,
    "wins": 3388,
    "losses": 2437
  },
  {
    "name": "Mega Delphox",
    "elo": 8172,
    "winRate": 54.5,
    "wins": 5075,
    "losses": 4241
  },
  {
    "name": "Hyper Offense",
    "elo": 6524,
    "winRate": 51,
    "wins": 15369,
    "losses": 14741
  },
  {
    "name": "Sand",
    "elo": 6212,
    "winRate": 50.2,
    "wins": 69041,
    "losses": 68452
  },
  {
    "name": "Sun Hyper Offense",
    "elo": 5828,
    "winRate": 59.6,
    "wins": 1682,
    "losses": 1141
  },
  {
    "name": "Mega Heracross",
    "elo": 5756,
    "winRate": 52.7,
    "wins": 5126,
    "losses": 4594
  },
  {
    "name": "Dragon Spam",
    "elo": 5356,
    "winRate": 58,
    "wins": 1741,
    "losses": 1259
  },
  {
    "name": "Beat Up",
    "elo": 5292,
    "winRate": 58.2,
    "wins": 1685,
    "losses": 1211
  },
  {
    "name": "Sun Trick Room",
    "elo": 4852,
    "winRate": 50.4,
    "wins": 29835,
    "losses": 29416
  },
  {
    "name": "Tailwind",
    "elo": 4692,
    "winRate": 50.2,
    "wins": 46529,
    "losses": 46130
  },
  {
    "name": "Offense",
    "elo": 4548,
    "winRate": 51.9,
    "wins": 5180,
    "losses": 4799
  },
  {
    "name": "Balance",
    "elo": 4524,
    "winRate": 51.4,
    "wins": 6880,
    "losses": 6502
  },
  {
    "name": "Heracross Base",
    "elo": 4468,
    "winRate": 52.9,
    "wins": 3422,
    "losses": 3051
  },
  {
    "name": "Pivot Chain",
    "elo": 4308,
    "winRate": 55.7,
    "wins": 1719,
    "losses": 1368
  },
  {
    "name": "Ampharos Base",
    "elo": 4300,
    "winRate": 52.7,
    "wins": 3475,
    "losses": 3125
  },
  {
    "name": "Hard Trick Room",
    "elo": 4204,
    "winRate": 51.7,
    "wins": 4999,
    "losses": 4661
  },
  {
    "name": "Sun",
    "elo": 3940,
    "winRate": 50.5,
    "wins": 14170,
    "losses": 13865
  },
  {
    "name": "Standard",
    "elo": 3708,
    "winRate": 50.1,
    "wins": 59917,
    "losses": 59641
  },
  {
    "name": "Delphox Base",
    "elo": 3460,
    "winRate": 51.8,
    "wins": 3506,
    "losses": 3261
  },
  {
    "name": "Aurora Veil",
    "elo": 3356,
    "winRate": 53.6,
    "wins": 1748,
    "losses": 1516
  },
  {
    "name": "Mega Garchomp",
    "elo": 3188,
    "winRate": 51,
    "wins": 5184,
    "losses": 4973
  }
];

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = {
  "tier1": [
    "Archaludon",
    "Metagross",
    "Kingambit",
    "Charizard",
    "Tyranitar",
    "Heat Rotom",
    "Corviknight",
    "Garchomp",
    "Scizor",
    "Hydreigon",
    "Greninja",
    "Wash Rotom",
    "Mega Chesnaught",
    "Mega Clefable",
    "Azumarill",
    "Aerodactyl",
    "Dragapult",
    "Mega Scovillain",
    "Torkoal",
    "Slowbro",
    "Scovillain",
    "Gengar",
    "Chesnaught",
    "Whimsicott",
    "Mega Gyarados",
    "Mega Pinsir",
    "Clefable",
    "Mega Charizard X",
    "Venusaur",
    "Pinsir",
    "Mega Delphox",
    "Hisuian Zoroark",
    "Mega Scizor",
    "Mega Tyranitar",
    "Rhyperior",
    "Sylveon",
    "Mega Heracross",
    "Gliscor",
    "Alolan Ninetales",
    "Mega Garchomp",
    "Heracross",
    "Ampharos",
    "Garganacl",
    "Delphox",
    "Milotic",
    "Ninetales",
    "Leafeon",
    "Crabominable",
    "Mega Absol",
    "Mega Feraligatr",
    "Blastoise",
    "Oranguru",
    "Mega Drampa",
    "Mega Tatsugiri",
    "Decidueye",
    "Raichu",
    "Mega Houndoom",
    "Runerigus",
    "Meowscarada",
    "Mega Alakazam",
    "Snorlax",
    "Skarmory",
    "Mega Crabominable",
    "Emboar",
    "Mega Raichu X",
    "Mega Lopunny",
    "Froslass",
    "Abomasnow",
    "Talonflame",
    "Alakazam",
    "Glaceon",
    "Absol",
    "Hippowdon",
    "Maushold",
    "Rotom"
  ],
  "tier2": [
    "Houndoom",
    "Empoleon",
    "Mega Abomasnow"
  ],
  "tier3": [],
  "dominantArchetypes": [
    "Mega Chesnaught",
    "Mega Clefable",
    "Mega Scovillain",
    "Charizard Base",
    "Chesnaught Base"
  ],
  "underratedPokemon": [],
  "overratedPokemon": [
    "Flareon",
    "Beedrill",
    "Mega Audino",
    "Hawlucha",
    "Audino"
  ],
  "bestCores": [
    "Charizard + Mega Chesnaught",
    "Metagross + Mega Chesnaught",
    "Heat Rotom + Mega Chesnaught",
    "Mega Chesnaught + Greninja",
    "Mega Chesnaught + Gengar"
  ]
};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = 1000000;

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = [];

/** Simulation date */
export const SIM_DATE = "2026-03-27T20:08:58.628Z";
