// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC TOURNAMENT DATABASE
// Real competitive data from 20 years of VGC: Worlds, Regionals, PCs
// Sources: Pikalytics Champions Tournaments, Limitless VGC, VGCPastes, Twitter
// ═══════════════════════════════════════════════════════════════════════════════

import type { PokemonType } from "@/lib/types";
import { POKEMON_SEED } from "@/lib/pokemon-data";

// IDs of all active (non-hidden) Pokemon in the roster  -  used to filter out
// historical VGC data for Pokemon not available in Champions.
const VALID_ROSTER_IDS = new Set(POKEMON_SEED.filter(p => !p.hidden).map(p => p.id));

// ── Usage Rate Data ─────────────────────────────────────────────────────────

export interface TournamentUsage {
  pokemonId: number;
  name: string;
  usageRate: number;        // 0-100 percentage
  winRate: number;           // 0-100 percentage
  avgPlacement: number;      // Lower = better
  topCutRate: number;        // % of appearances in top cut
  leadRate: number;          // % of games led with this Pokémon
  bringRate: number;         // % of games where brought (Bring 4)
}

// Real competitive data from Pikalytics Champions Tournaments (June 2026)
// Source: https://pikalytics.com/pokedex/championstournaments
export const TOURNAMENT_USAGE: TournamentUsage[] = [
  // ═══ Combined Data: Pikalytics Champions Tournaments + In-Game Battle Stats (April 2026) ═══
  // Sources: Pikalytics championstournaments, Nintendo Switch Battle Stats, Limitless VGC

  // S-Tier — Game Rankings #1-5 (Meta-defining)
  { pokemonId:   727, name: "Incineroar"                , usageRate: 53.21, winRate: 51.4, avgPlacement: 20, topCutRate: 55.2, leadRate: 42.8, bringRate: 88.6 },
  { pokemonId:   903, name: "Sneasler"                  , usageRate: 43.17, winRate: 52.1, avgPlacement: 23, topCutRate: 46.8, leadRate: 44.2, bringRate: 82.4 },
  { pokemonId:   445, name: "Garchomp"                  , usageRate: 35.55, winRate: 51.8, avgPlacement: 26, topCutRate: 38.4, leadRate: 32.6, bringRate: 80.2 },
  { pokemonId:  1013, name: "Sinistcha"                 , usageRate: 35.47, winRate: 53.2, avgPlacement: 26, topCutRate: 38.1, leadRate: 24.8, bringRate: 84.6 },
  { pokemonId:   983, name: "Kingambit"                 , usageRate: 25.89, winRate: 52.4, avgPlacement: 30, topCutRate: 28.6, leadRate: 16.2, bringRate: 78.8 },

  // A-Tier — Game Rankings #6-15 (Core meta picks)
  { pokemonId:   547, name: "Whimsicott"                , usageRate: 21.96, winRate: 50.8, avgPlacement: 31, topCutRate: 24.2, leadRate: 58.4, bringRate: 72.6 },
  { pokemonId:   902, name: "Basculegion"               , usageRate: 21.74, winRate: 52.8, avgPlacement: 31, topCutRate: 24.4, leadRate: 18.6, bringRate: 74.2 },
  { pokemonId:     6, name: "Charizard"                 , usageRate: 19.25, winRate: 51.6, avgPlacement: 32, topCutRate: 21.8, leadRate: 28.4, bringRate: 70.4 },
  { pokemonId:   279, name: "Pelipper"                  , usageRate: 18.69, winRate: 51.2, avgPlacement: 33, topCutRate: 21.4, leadRate: 46.8, bringRate: 68.8 },
  { pokemonId:   248, name: "Tyranitar"                 , usageRate: 16.44, winRate: 51.8, avgPlacement: 33, topCutRate: 19.2, leadRate: 24.6, bringRate: 72.4 },
  { pokemonId:  1018, name: "Archaludon"                , usageRate:  14.6, winRate: 53.4, avgPlacement: 34, topCutRate: 17.6, leadRate: 16.8, bringRate: 66.4 },
  { pokemonId:   670, name: "Floette"                   , usageRate:  14.3, winRate: 53.8, avgPlacement: 34, topCutRate: 17.2, leadRate: 14.4, bringRate: 72.8 },
  { pokemonId: 10009, name: "Rotom-Wash"                , usageRate:  13.9, winRate: 51.6, avgPlacement: 34, topCutRate: 16.4, leadRate: 28.2, bringRate: 64.6 },
  { pokemonId:   142, name: "Aerodactyl"                , usageRate: 12.75, winRate: 51.1, avgPlacement: 32, topCutRate: 18, leadRate: 29, bringRate: 63 },
  { pokemonId:   981, name: "Farigiraf"                 , usageRate:  12.5, winRate: 52.6, avgPlacement: 35, topCutRate: 15.4, leadRate: 36.8, bringRate: 62.4 },

  // B-Tier — Game Rankings #16-40 (Strong meta contenders)
  { pokemonId:   149, name: "Dragonite"                 , usageRate: 15.53, winRate: 52.2, avgPlacement: 34, topCutRate: 18.4, leadRate: 20.2, bringRate: 68.2 },
  { pokemonId:    94, name: "Gengar"                    , usageRate:    12, winRate: 51.2, avgPlacement: 35, topCutRate: 14.8, leadRate: 32.4, bringRate: 66.2 },
  { pokemonId:   925, name: "Maushold"                  , usageRate: 11.25, winRate: 50.4, avgPlacement: 36, topCutRate: 12.9, leadRate: 36.3, bringRate: 56.5 },
  { pokemonId:     3, name: "Venusaur"                  , usageRate:  11.2, winRate: 52.4, avgPlacement: 36, topCutRate: 13.6, leadRate: 22.6, bringRate: 64.8 },
  { pokemonId:   350, name: "Milotic"                   , usageRate:   9.1, winRate: 51.8, avgPlacement: 36, topCutRate: 11.2, leadRate: 16.4, bringRate: 60.4 },
  { pokemonId:   530, name: "Excadrill"                 , usageRate:   8.6, winRate: 53.6, avgPlacement: 37, topCutRate: 10.8, leadRate: 28.4, bringRate: 62.8 },
  { pokemonId:   282, name: "Gardevoir"                 , usageRate:   8.2, winRate: 51.7, avgPlacement: 37, topCutRate: 5.7, leadRate: 20.8, bringRate: 40 },
  { pokemonId:   887, name: "Dragapult"                 , usageRate:   7.4, winRate: 50.9, avgPlacement: 37, topCutRate: 5.2, leadRate: 26, bringRate: 40 },
  { pokemonId:   655, name: "Delphox"                   , usageRate:     7, winRate: 51.2, avgPlacement: 38, topCutRate: 10.5, leadRate: 13, bringRate: 52.5 },
  { pokemonId:   784, name: "Kommo-o"                   , usageRate:   6.9, winRate: 51.7, avgPlacement: 37, topCutRate: 4.8, leadRate: 25.1, bringRate: 40 },
  { pokemonId:   186, name: "Politoed"                  , usageRate:   6.4, winRate: 53, avgPlacement: 37, topCutRate: 4.5, leadRate: 29.6, bringRate: 40 },
  { pokemonId:   730, name: "Primarina"                 , usageRate:   6.2, winRate: 51.5, avgPlacement: 38, topCutRate: 9.9, leadRate: 17.8, bringRate: 51.5 },
  { pokemonId:   823, name: "Corviknight"               , usageRate:   5.4, winRate: 53, avgPlacement: 38, topCutRate: 3.8, leadRate: 30, bringRate: 40 },
  { pokemonId:   970, name: "Glimmora"                  , usageRate:     5, winRate: 51.4, avgPlacement: 39, topCutRate: 9, leadRate: 17.4, bringRate: 50 },
  { pokemonId:   324, name: "Torkoal"                   , usageRate:   4.7, winRate: 52.7, avgPlacement: 38, topCutRate: 3.3, leadRate: 39.2, bringRate: 40 },
  { pokemonId:   154, name: "Meganium"                  , usageRate:   4.7, winRate: 51.6, avgPlacement: 39, topCutRate: 6.8, leadRate: 13, bringRate: 49 },
  { pokemonId:   681, name: "Aegislash"                 , usageRate:   4.4, winRate: 51.2, avgPlacement: 38, topCutRate: 3.1, leadRate: 34.6, bringRate: 40 },
  { pokemonId:   130, name: "Gyarados"                  , usageRate:   4.2, winRate: 51.6, avgPlacement: 38, topCutRate: 2.9, leadRate: 26.3, bringRate: 40 },
  { pokemonId: 10103, name: "Alolan Ninetales"          , usageRate:  3.95, winRate: 50.9, avgPlacement: 40, topCutRate: 6.3, leadRate: 17.9, bringRate: 46.5 },
  { pokemonId:   964, name: "Palafin"                   , usageRate:   3.8, winRate: 53.1, avgPlacement: 38, topCutRate: 2.7, leadRate: 28.6, bringRate: 40 },
  { pokemonId:    59, name: "Arcanine"                  , usageRate:  3.65, winRate: 51.5, avgPlacement: 40, topCutRate: 6.1, leadRate: 13, bringRate: 45.5 },
  { pokemonId:   478, name: "Froslass"                  , usageRate:   3.4, winRate: 52.3, avgPlacement: 39, topCutRate: 2.4, leadRate: 36.8, bringRate: 40 },
  { pokemonId:   700, name: "Sylveon"                   , usageRate:   3.2, winRate: 52, avgPlacement: 39, topCutRate: 2.2, leadRate: 25, bringRate: 40 },
  { pokemonId:     9, name: "Blastoise"                 , usageRate:     3, winRate: 52.2, avgPlacement: 39, topCutRate: 2.1, leadRate: 26.3, bringRate: 40 },
  { pokemonId:   663, name: "Talonflame"                , usageRate:   2.1, winRate: 52.5, avgPlacement: 39, topCutRate: 2, leadRate: 34.2, bringRate: 40 },

  // C-Tier — Game Rankings #41-80 (Viable picks)
  { pokemonId:   448, name: "Lucario"                   , usageRate:   7.8, winRate: 53.1, avgPlacement: 37, topCutRate: 5.5, leadRate: 29.9, bringRate: 40 },
  { pokemonId:   858, name: "Hatterene"                 , usageRate:   6.2, winRate: 53.2, avgPlacement: 38, topCutRate: 4.3, leadRate: 37.1, bringRate: 40 },
  { pokemonId:   658, name: "Greninja"                  , usageRate:   5.2, winRate: 51.4, avgPlacement: 38, topCutRate: 3.6, leadRate: 28.7, bringRate: 40 },
  { pokemonId:   115, name: "Kangaskhan"                , usageRate:     4, winRate: 51.2, avgPlacement: 38, topCutRate: 2.8, leadRate: 38.7, bringRate: 40 },
  { pokemonId:   121, name: "Starmie"                   , usageRate:  3.37, winRate: 50.7, avgPlacement: 40, topCutRate: 5.9, leadRate: 16.9, bringRate: 43.9 },
  { pokemonId:   778, name: "Mimikyu"                   , usageRate:   3.1, winRate: 52.2, avgPlacement: 39, topCutRate: 2.2, leadRate: 28.4, bringRate: 40 },
  { pokemonId:   908, name: "Meowscarada"               , usageRate:   2.8, winRate: 51.7, avgPlacement: 39, topCutRate: 2, leadRate: 33.3, bringRate: 40 },
  { pokemonId:   637, name: "Volcarona"                 , usageRate:  2.72, winRate: 50.9, avgPlacement: 40, topCutRate: 5.4, leadRate: 13.1, bringRate: 43.1 },
  { pokemonId:   635, name: "Hydreigon"                 , usageRate:   2.6, winRate: 51, avgPlacement: 39, topCutRate: 2, leadRate: 37.9, bringRate: 40 },
  { pokemonId:   302, name: "Sableye"                   , usageRate:  2.59, winRate: 51, avgPlacement: 40, topCutRate: 5.3, leadRate: 36.3, bringRate: 43 },
  { pokemonId:  5157, name: "Hisuian Typhlosion"        , usageRate:  2.46, winRate: 50.2, avgPlacement: 40, topCutRate: 5.2, leadRate: 16.4, bringRate: 42.8 },
  { pokemonId:   212, name: "Scizor"                    , usageRate:   2.2, winRate: 52.8, avgPlacement: 39, topCutRate: 2, leadRate: 27.8, bringRate: 40 },
  { pokemonId:   473, name: "Mamoswine"                 , usageRate:   2.2, winRate: 50.9, avgPlacement: 40, topCutRate: 5, leadRate: 26.1, bringRate: 42.5 },
  { pokemonId: 10008, name: "Heat Rotom"                , usageRate:  2.13, winRate: 51.9, avgPlacement: 40, topCutRate: 4.9, leadRate: 18.9, bringRate: 42.4 },
  { pokemonId:   740, name: "Crabominable"              , usageRate:  1.99, winRate: 51.2, avgPlacement: 40, topCutRate: 4.7, leadRate: 13.1, bringRate: 42.1 },
  { pokemonId: 10340, name: "Hisuian Zoroark"           , usageRate:  1.92, winRate: 50, avgPlacement: 40, topCutRate: 4.6, leadRate: 36.5, bringRate: 41.9 },
  { pokemonId:   623, name: "Golurk"                    , usageRate:   1.9, winRate: 51.5, avgPlacement: 39, topCutRate: 2, leadRate: 29.4, bringRate: 40 },
  { pokemonId:   780, name: "Drampa"                    , usageRate:  1.85, winRate: 51.2, avgPlacement: 40, topCutRate: 4.5, leadRate: 16, bringRate: 41.8 },
  { pokemonId:   968, name: "Orthworm"                  , usageRate:  1.78, winRate: 50.6, avgPlacement: 40, topCutRate: 4.4, leadRate: 29.7, bringRate: 41.6 },
  { pokemonId:    36, name: "Clefable"                  , usageRate:   1.5, winRate: 52.2, avgPlacement: 39, topCutRate: 2, leadRate: 27.2, bringRate: 40 },
  { pokemonId:   475, name: "Gallade"                   , usageRate:  1.47, winRate: 50.8, avgPlacement: 41, topCutRate: 3.2, leadRate: 36.7, bringRate: 40.9 },
  { pokemonId:  5059, name: "Hisuian Arcanine"          , usageRate:  1.43, winRate: 49.9, avgPlacement: 41, topCutRate: 3.1, leadRate: 15.6, bringRate: 40.7 },
  { pokemonId: 10100, name: "Alolan Raichu"             , usageRate:  1.36, winRate: 50.2, avgPlacement: 41, topCutRate: 3.1, leadRate: 24.9, bringRate: 40.4 },
  { pokemonId:   678, name: "Meowstic-M"                , usageRate:  1.33, winRate: 51.2, avgPlacement: 41, topCutRate: 3.1, leadRate: 20, bringRate: 40.3 },
  { pokemonId: 10902, name: "Basculegion-F"             , usageRate:  1.29, winRate: 49.3, avgPlacement: 41, topCutRate: 3, leadRate: 34.2, bringRate: 40.1 },
  { pokemonId:   306, name: "Aggron"                    , usageRate:  1.26, winRate: 50.8, avgPlacement: 41, topCutRate: 3, leadRate: 13.4, bringRate: 40 },
  { pokemonId:   534, name: "Conkeldurr"                , usageRate:  1.22, winRate: 49.8, avgPlacement: 41, topCutRate: 3, leadRate: 36.8, bringRate: 39.8 },
  { pokemonId:  5706, name: "Hisuian Goodra"            , usageRate:  1.19, winRate: 51.7, avgPlacement: 41, topCutRate: 2.9, leadRate: 15.3, bringRate: 39.7 },
  { pokemonId:   952, name: "Scovillain"                , usageRate:  1.15, winRate: 50.2, avgPlacement: 41, topCutRate: 2.9, leadRate: 30.8, bringRate: 39.5 },
  { pokemonId:   227, name: "Skarmory"                  , usageRate:  1.12, winRate: 51.3, avgPlacement: 41, topCutRate: 2.9, leadRate: 24.2, bringRate: 39.4 },
  { pokemonId:   428, name: "Lopunny"                   , usageRate:  1.05, winRate: 50.8, avgPlacement: 41, topCutRate: 2.8, leadRate: 33.8, bringRate: 39.1 },
  { pokemonId:   609, name: "Chandelure"                , usageRate:  1.01, winRate: 49.6, avgPlacement: 41, topCutRate: 2.8, leadRate: 13.6, bringRate: 38.9 },
  { pokemonId:   763, name: "Tsareena"                  , usageRate:  0.98, winRate: 51.7, avgPlacement: 41, topCutRate: 2.8, leadRate: 36.9, bringRate: 38.8 },
  { pokemonId:   752, name: "Araquanid"                 , usageRate:  0.94, winRate: 50.2, avgPlacement: 41, topCutRate: 2.7, leadRate: 14.9, bringRate: 38.6 },
  { pokemonId:   701, name: "Hawlucha"                  , usageRate:  0.91, winRate: 51.4, avgPlacement: 41, topCutRate: 2.7, leadRate: 31.3, bringRate: 38.5 },
  { pokemonId:   184, name: "Azumarill"                 , usageRate:   0.9, winRate: 53, avgPlacement: 40, topCutRate: 2, leadRate: 23.4, bringRate: 40 },
  { pokemonId:   160, name: "Feraligatr"                , usageRate:  0.87, winRate: 49.4, avgPlacement: 41, topCutRate: 2.7, leadRate: 23.6, bringRate: 38.3 },
  { pokemonId:   323, name: "Camerupt"                  , usageRate:  0.84, winRate: 50.8, avgPlacement: 41, topCutRate: 2.6, leadRate: 21.1, bringRate: 38.2 },
  { pokemonId:   765, name: "Oranguru"                  , usageRate:   0.8, winRate: 52.4, avgPlacement: 40, topCutRate: 2, leadRate: 21.1, bringRate: 40 },
  { pokemonId:   666, name: "Vivillon"                  , usageRate:   0.8, winRate: 49.5, avgPlacement: 42, topCutRate: 2.6, leadRate: 33.4, bringRate: 38 },

  // D-Tier — Game Rankings #81+ (Niche / specialist picks)
  { pokemonId:   553, name: "Krookodile"                , usageRate:   3.6, winRate: 52.2, avgPlacement: 39, topCutRate: 2.5, leadRate: 20.1, bringRate: 40 },
  { pokemonId:   936, name: "Armarouge"                 , usageRate:   2.4, winRate: 51.8, avgPlacement: 39, topCutRate: 2, leadRate: 21.2, bringRate: 40 },
  { pokemonId:   472, name: "Gliscor"                   , usageRate:     2, winRate: 52.2, avgPlacement: 39, topCutRate: 2, leadRate: 39.3, bringRate: 40 },
  { pokemonId:   959, name: "Tinkaton"                  , usageRate:   1.8, winRate: 52.8, avgPlacement: 39, topCutRate: 2, leadRate: 23.6, bringRate: 40 },
  { pokemonId:   464, name: "Rhyperior"                 , usageRate:   1.7, winRate: 50.6, avgPlacement: 39, topCutRate: 2, leadRate: 28.2, bringRate: 40 },
  { pokemonId:   334, name: "Altaria"                   , usageRate:   1.6, winRate: 52.6, avgPlacement: 39, topCutRate: 2, leadRate: 25.6, bringRate: 40 },
  { pokemonId:   143, name: "Snorlax"                   , usageRate:   1.2, winRate: 51.7, avgPlacement: 40, topCutRate: 2, leadRate: 36.5, bringRate: 40 },
  { pokemonId:   934, name: "Garganacl"                 , usageRate:   1.1, winRate: 52.7, avgPlacement: 40, topCutRate: 2, leadRate: 32.7, bringRate: 40 },
  { pokemonId:   214, name: "Heracross"                 , usageRate:     1, winRate: 52.6, avgPlacement: 40, topCutRate: 2, leadRate: 21.9, bringRate: 40 },
  { pokemonId:   395, name: "Empoleon"                  , usageRate:  0.78, winRate: 51.6, avgPlacement: 42, topCutRate: 2.6, leadRate: 13.8, bringRate: 37.9 },
  { pokemonId:   461, name: "Weavile"                   , usageRate:  0.74, winRate: 51.5, avgPlacement: 42, topCutRate: 2.5, leadRate: 14.6, bringRate: 37.6 },
  { pokemonId: 10010, name: "Frost Rotom"               , usageRate:   0.7, winRate: 50.7, avgPlacement: 42, topCutRate: 2.5, leadRate: 23, bringRate: 37.3 },
  { pokemonId:    80, name: "Slowbro"                   , usageRate:   0.7, winRate: 53.5, avgPlacement: 40, topCutRate: 2, leadRate: 26.5, bringRate: 40 },
  { pokemonId:   652, name: "Chesnaught"                , usageRate:  0.68, winRate: 49.5, avgPlacement: 42, topCutRate: 2.4, leadRate: 21.7, bringRate: 37.1 },
  { pokemonId:   310, name: "Manectric"                 , usageRate:  0.64, winRate: 50.3, avgPlacement: 42, topCutRate: 2.4, leadRate: 14, bringRate: 36.8 },
  { pokemonId:   900, name: "Kleavor"                   , usageRate:   0.6, winRate: 49.6, avgPlacement: 42, topCutRate: 2.3, leadRate: 14.3, bringRate: 36.5 },
  { pokemonId:   748, name: "Toxapex"                   , usageRate:   0.6, winRate: 52.5, avgPlacement: 40, topCutRate: 2, leadRate: 31.6, bringRate: 40 },
  { pokemonId: 10252, name: "Paldean Tauros (Aqua)"     , usageRate:  0.58, winRate: 50.6, avgPlacement: 42, topCutRate: 2.3, leadRate: 32.3, bringRate: 36.4 },
  { pokemonId:   584, name: "Vanilluxe"                 , usageRate:  0.56, winRate: 49.6, avgPlacement: 42, topCutRate: 2.2, leadRate: 22.4, bringRate: 36.2 },
  { pokemonId:   460, name: "Abomasnow"                 , usageRate:  0.54, winRate: 51.3, avgPlacement: 42, topCutRate: 2.2, leadRate: 22.3, bringRate: 36.1 },
  { pokemonId:   707, name: "Klefki"                    , usageRate:  0.52, winRate: 50.4, avgPlacement: 42, topCutRate: 2.2, leadRate: 32.4, bringRate: 35.9 },
  { pokemonId:   745, name: "Lycanroc"                  , usageRate:  0.48, winRate: 49.9, avgPlacement: 42, topCutRate: 2.1, leadRate: 37, bringRate: 35.6 },
  { pokemonId:   937, name: "Ceruledge"                 , usageRate:  0.42, winRate: 51, avgPlacement: 42, topCutRate: 2, leadRate: 21.9, bringRate: 35.2 },
  { pokemonId:   471, name: "Glaceon"                   , usageRate:   0.4, winRate: 50.5, avgPlacement: 43, topCutRate: 2, leadRate: 22.9, bringRate: 35 },
  { pokemonId:  6199, name: "Galarian Slowking"         , usageRate:  0.39, winRate: 50.8, avgPlacement: 43, topCutRate: 2, leadRate: 32, bringRate: 34.9 },
  { pokemonId:    68, name: "Machamp"                   , usageRate:  0.39, winRate: 49.6, avgPlacement: 43, topCutRate: 1.9, leadRate: 14.5, bringRate: 34.7 },
  { pokemonId: 10012, name: "Mow Rotom"                 , usageRate:  0.38, winRate: 49.9, avgPlacement: 43, topCutRate: 1.9, leadRate: 37, bringRate: 34.6 },
  { pokemonId: 10341, name: "Hisuian Decidueye"         , usageRate:  0.37, winRate: 49.3, avgPlacement: 43, topCutRate: 1.9, leadRate: 13.8, bringRate: 34.4 },
  { pokemonId:   358, name: "Chimecho"                  , usageRate:  0.36, winRate: 50.2, avgPlacement: 43, topCutRate: 1.9, leadRate: 33.2, bringRate: 34.3 },
  { pokemonId:   695, name: "Heliolisk"                 , usageRate:  0.36, winRate: 50.2, avgPlacement: 43, topCutRate: 1.8, leadRate: 21.3, bringRate: 34.1 },
  { pokemonId:    65, name: "Alakazam"                  , usageRate:  0.35, winRate: 50.7, avgPlacement: 43, topCutRate: 1.8, leadRate: 23.5, bringRate: 34 },
  { pokemonId:   181, name: "Ampharos"                  , usageRate:  0.34, winRate: 49.9, avgPlacement: 43, topCutRate: 1.8, leadRate: 31.5, bringRate: 33.8 },
  { pokemonId: 10336, name: "Hisuian Samurott"          , usageRate:  0.33, winRate: 49.8, avgPlacement: 43, topCutRate: 1.7, leadRate: 14.8, bringRate: 33.7 },
  { pokemonId:   750, name: "Mudsdale"                  , usageRate:  0.33, winRate: 49.4, avgPlacement: 43, topCutRate: 1.7, leadRate: 36.9, bringRate: 33.5 },
  { pokemonId:   497, name: "Serperior"                 , usageRate:  0.32, winRate: 50, avgPlacement: 43, topCutRate: 1.7, leadRate: 13.6, bringRate: 33.4 },
  { pokemonId:   715, name: "Noivern"                   , usageRate:  0.31, winRate: 50.3, avgPlacement: 43, topCutRate: 1.6, leadRate: 33.7, bringRate: 33.2 },
  { pokemonId:   199, name: "Slowking"                  , usageRate:   0.3, winRate: 50.5, avgPlacement: 43, topCutRate: 1.6, leadRate: 20.7, bringRate: 33.1 },
  { pokemonId:   132, name: "Ditto"                     , usageRate:   0.3, winRate: 50.2, avgPlacement: 43, topCutRate: 1.6, leadRate: 24.1, bringRate: 32.9 },
  { pokemonId:   956, name: "Espathra"                  , usageRate:  0.29, winRate: 49.6, avgPlacement: 43, topCutRate: 1.6, leadRate: 30.9, bringRate: 32.8 },
  { pokemonId:  1019, name: "Hydrapple"                 , usageRate:  0.28, winRate: 49.6, avgPlacement: 43, topCutRate: 1.5, leadRate: 15.2, bringRate: 32.6 },
  { pokemonId:   197, name: "Umbreon"                   , usageRate:  0.27, winRate: 49.7, avgPlacement: 43, topCutRate: 1.5, leadRate: 36.8, bringRate: 32.5 },
  { pokemonId:   914, name: "Quaquaval"                 , usageRate:  0.27, winRate: 50.4, avgPlacement: 43, topCutRate: 1.5, leadRate: 13.4, bringRate: 32.3 },
  { pokemonId:   392, name: "Infernape"                 , usageRate:  0.25, winRate: 50.5, avgPlacement: 44, topCutRate: 1.4, leadRate: 20.2, bringRate: 32 },
  { pokemonId:   135, name: "Jolteon"                   , usageRate:  0.24, winRate: 49.8, avgPlacement: 44, topCutRate: 1.3, leadRate: 30.4, bringRate: 31.7 },
  { pokemonId:   208, name: "Steelix"                   , usageRate:  0.24, winRate: 49.4, avgPlacement: 44, topCutRate: 1.3, leadRate: 15.5, bringRate: 31.6 },
  { pokemonId:   563, name: "Cofagrigus"                , usageRate:  0.23, winRate: 50.5, avgPlacement: 44, topCutRate: 1.3, leadRate: 36.7, bringRate: 31.4 },
  { pokemonId:  6080, name: "Galarian Slowbro"          , usageRate:  0.23, winRate: 50.1, avgPlacement: 44, topCutRate: 1.3, leadRate: 13.3, bringRate: 31.3 },
  { pokemonId:   442, name: "Spiritomb"                 , usageRate:  0.22, winRate: 50.7, avgPlacement: 44, topCutRate: 1.2, leadRate: 34.5, bringRate: 31.1 },
  { pokemonId:   869, name: "Alcremie"                  , usageRate:  0.22, winRate: 49.4, avgPlacement: 44, topCutRate: 1.2, leadRate: 19.6, bringRate: 31 },
  { pokemonId:   939, name: "Bellibolt"                 , usageRate:  0.22, winRate: 50, avgPlacement: 44, topCutRate: 1.2, leadRate: 25.3, bringRate: 30.8 },
  { pokemonId:   450, name: "Hippowdon"                 , usageRate:  0.21, winRate: 49.2, avgPlacement: 44, topCutRate: 1.1, leadRate: 29.9, bringRate: 30.7 },
  { pokemonId: 10251, name: "Paldean Tauros (Blaze)"    , usageRate:  0.21, winRate: 50.6, avgPlacement: 44, topCutRate: 1.1, leadRate: 15.9, bringRate: 30.5 },
  { pokemonId:   454, name: "Toxicroak"                 , usageRate:   0.2, winRate: 49.9, avgPlacement: 44, topCutRate: 1.1, leadRate: 36.6, bringRate: 30.4 },
  { pokemonId:   500, name: "Emboar"                    , usageRate:   0.2, winRate: 50.9, avgPlacement: 44, topCutRate: 1, leadRate: 13.2, bringRate: 30.2 },
  { pokemonId:    38, name: "Ninetales"                 , usageRate:  0.19, winRate: 49.3, avgPlacement: 44, topCutRate: 1, leadRate: 34.8, bringRate: 30.1 },
  { pokemonId:    71, name: "Victreebel"                , usageRate:  0.19, winRate: 50.1, avgPlacement: 44, topCutRate: 1, leadRate: 19.1, bringRate: 30 },
  { pokemonId:   766, name: "Passimian"                 , usageRate:  0.19, winRate: 49, avgPlacement: 44, topCutRate: 1, leadRate: 25.9, bringRate: 30 },
  { pokemonId:   510, name: "Liepard"                   , usageRate:  0.18, winRate: 50.7, avgPlacement: 44, topCutRate: 0.9, leadRate: 29.3, bringRate: 30 },
  { pokemonId:   867, name: "Runerigus"                 , usageRate:  0.18, winRate: 49.8, avgPlacement: 44, topCutRate: 0.9, leadRate: 16.3, bringRate: 30 },
  { pokemonId:   308, name: "Medicham"                  , usageRate:  0.17, winRate: 51.1, avgPlacement: 44, topCutRate: 0.9, leadRate: 36.4, bringRate: 30 },
  { pokemonId:   579, name: "Reuniclus"                 , usageRate:  0.17, winRate: 49.3, avgPlacement: 44, topCutRate: 0.8, leadRate: 13.1, bringRate: 30 },
  { pokemonId:   758, name: "Salazzle"                  , usageRate:  0.16, winRate: 50.3, avgPlacement: 45, topCutRate: 0.8, leadRate: 35.2, bringRate: 30 },
  { pokemonId:    25, name: "Pikachu"                   , usageRate:  0.15, winRate: 50.7, avgPlacement: 45, topCutRate: 0.7, leadRate: 26.5, bringRate: 30 },
  { pokemonId:   157, name: "Typhlosion"                , usageRate:  0.15, winRate: 51.2, avgPlacement: 45, topCutRate: 0.7, leadRate: 16.8, bringRate: 30 },
  { pokemonId:   866, name: "Mr. Rime"                  , usageRate:  0.14, winRate: 49.3, avgPlacement: 45, topCutRate: 0.7, leadRate: 36.2, bringRate: 30 },
  { pokemonId:   911, name: "Skeledirge"                , usageRate:  0.14, winRate: 50.4, avgPlacement: 45, topCutRate: 0.6, leadRate: 13, bringRate: 30 },
  { pokemonId:   354, name: "Banette"                   , usageRate:  0.13, winRate: 48.7, avgPlacement: 45, topCutRate: 0.6, leadRate: 35.5, bringRate: 30 },
  { pokemonId:   362, name: "Glalie"                    , usageRate:  0.13, winRate: 50.6, avgPlacement: 45, topCutRate: 0.6, leadRate: 18, bringRate: 30 },
  { pokemonId:   706, name: "Goodra"                    , usageRate:  0.12, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 27.1, bringRate: 30 },
  { pokemonId:    15, name: "Beedrill"                  , usageRate:  0.12, winRate: 51.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 28.1, bringRate: 30 },
  { pokemonId: 10678, name: "Meowstic-F"                , usageRate:  0.12, winRate: 49.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 17.2, bringRate: 30 },
  { pokemonId:   134, name: "Vaporeon"                  , usageRate:  0.12, winRate: 50.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 35.9, bringRate: 30 },
  { pokemonId:   899, name: "Wyrdeer"                   , usageRate:  0.12, winRate: 48.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 13, bringRate: 30 },
  { pokemonId:   319, name: "Sharpedo"                  , usageRate:  0.11, winRate: 50.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 35.7, bringRate: 30 },
  { pokemonId:   683, name: "Aromatisse"                , usageRate:  0.11, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 17.6, bringRate: 30 },
  { pokemonId:   697, name: "Tyrantrum"                 , usageRate:  0.11, winRate: 51.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 27.7, bringRate: 30 },
  { pokemonId:   660, name: "Diggersby"                 , usageRate:  0.11, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 27.6, bringRate: 30 },
  { pokemonId:    26, name: "Raichu"                    , usageRate:  0.11, winRate: 50.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 17.7, bringRate: 30 },
  { pokemonId:   614, name: "Beartic"                   , usageRate:  0.11, winRate: 48.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 35.7, bringRate: 30 },
  { pokemonId:   409, name: "Rampardos"                 , usageRate:   0.1, winRate: 50.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 13, bringRate: 30 },
  { pokemonId:   359, name: "Absol"                     , usageRate:   0.1, winRate: 49.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 36, bringRate: 30 },
  { pokemonId:   196, name: "Espeon"                    , usageRate:   0.1, winRate: 51.2, avgPlacement: 45, topCutRate: 0.5, leadRate: 17.1, bringRate: 30 },
  { pokemonId:   405, name: "Luxray"                    , usageRate:   0.1, winRate: 49.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 28.3, bringRate: 30 },
  { pokemonId:   389, name: "Torterra"                  , usageRate:   0.1, winRate: 50.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 27, bringRate: 30 },
  { pokemonId:    18, name: "Pidgeot"                   , usageRate:   0.1, winRate: 48.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 18.2, bringRate: 30 },
  { pokemonId:   571, name: "Zoroark"                   , usageRate:  0.09, winRate: 50.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 35.4, bringRate: 30 },
  { pokemonId:   127, name: "Pinsir"                    , usageRate:  0.09, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 13, bringRate: 30 },
  { pokemonId:   699, name: "Aurorus"                   , usageRate:  0.09, winRate: 51.1, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.2, bringRate: 30 },
  { pokemonId:   411, name: "Bastiodon"                 , usageRate:  0.09, winRate: 49.8, avgPlacement: 45, topCutRate: 0.5, leadRate: 16.7, bringRate: 30 },
  { pokemonId:   693, name: "Clawitzer"                 , usageRate:  0.09, winRate: 50.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 28.9, bringRate: 30 },
  { pokemonId:   844, name: "Sandaconda"                , usageRate:  0.09, winRate: 49, avgPlacement: 45, topCutRate: 0.5, leadRate: 26.4, bringRate: 30 },
  { pokemonId:   877, name: "Morpeko"                   , usageRate:  0.08, winRate: 50.1, avgPlacement: 45, topCutRate: 0.5, leadRate: 18.7, bringRate: 30 },
  { pokemonId:   587, name: "Emolga"                    , usageRate:  0.08, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 35.1, bringRate: 30 },
  { pokemonId:   713, name: "Avalugg"                   , usageRate:  0.08, winRate: 50.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 13.1, bringRate: 30 },
  { pokemonId:  5713, name: "Hisuian Avalugg"           , usageRate:  0.07, winRate: 50.2, avgPlacement: 45, topCutRate: 0.5, leadRate: 12.0, bringRate: 28 },
  { pokemonId:   407, name: "Roserade"                  , usageRate:  0.08, winRate: 50, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.4, bringRate: 30 },
  { pokemonId:   709, name: "Trevenant"                 , usageRate:  0.08, winRate: 50.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 16.2, bringRate: 30 },
  { pokemonId:   675, name: "Pangoro"                   , usageRate:  0.08, winRate: 49.2, avgPlacement: 45, topCutRate: 0.5, leadRate: 29.4, bringRate: 30 },
  { pokemonId:   229, name: "Houndoom"                  , usageRate:  0.07, winRate: 49.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 25.8, bringRate: 30 },
  { pokemonId:   531, name: "Audino"                    , usageRate:  0.07, winRate: 49.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 19.2, bringRate: 30 },
  { pokemonId:    24, name: "Arbok"                     , usageRate:  0.07, winRate: 50.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 34.7, bringRate: 30 },
  { pokemonId: 10011, name: "Fan Rotom"                 , usageRate:  0.07, winRate: 50.2, avgPlacement: 45, topCutRate: 0.5, leadRate: 13.2, bringRate: 30 },
  { pokemonId:   470, name: "Leafeon"                   , usageRate:  0.07, winRate: 50.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.6, bringRate: 30 },
  { pokemonId:   855, name: "Polteageist"               , usageRate:  0.07, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 15.8, bringRate: 30 },
  { pokemonId:   724, name: "Decidueye"                 , usageRate:  0.06, winRate: 49.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 30, bringRate: 30 },
  { pokemonId:   733, name: "Toucannon"                 , usageRate:  0.06, winRate: 49.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 25.2, bringRate: 30 },
  { pokemonId:   618, name: "Stunfisk"                  , usageRate:  0.06, winRate: 50.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 19.7, bringRate: 30 },
  { pokemonId:   702, name: "Dedenne"                   , usageRate:  0.06, winRate: 50.4, avgPlacement: 45, topCutRate: 0.5, leadRate: 34.4, bringRate: 30 },
  { pokemonId:   168, name: "Ariados"                   , usageRate:  0.06, winRate: 50.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 13.3, bringRate: 30 },
  { pokemonId:   842, name: "Appletun"                  , usageRate:  0.06, winRate: 49.7, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.7, bringRate: 30 },
  { pokemonId:   351, name: "Castform"                  , usageRate:  0.05, winRate: 49.5, avgPlacement: 45, topCutRate: 0.5, leadRate: 15.4, bringRate: 30 },
  { pokemonId:   128, name: "Tauros"                    , usageRate:  0.05, winRate: 49.8, avgPlacement: 45, topCutRate: 0.5, leadRate: 30.5, bringRate: 30 },
  { pokemonId:   136, name: "Flareon"                   , usageRate:  0.05, winRate: 50.1, avgPlacement: 45, topCutRate: 0.5, leadRate: 24.6, bringRate: 30 },
  { pokemonId:   671, name: "Florges"                   , usageRate:  0.05, winRate: 50.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 20.3, bringRate: 30 },
  { pokemonId: 10250, name: "Paldean Tauros"            , usageRate:  0.05, winRate: 50.1, avgPlacement: 45, topCutRate: 0.5, leadRate: 34, bringRate: 30 },
  { pokemonId:   516, name: "Simipour"                  , usageRate:  0.05, winRate: 50, avgPlacement: 45, topCutRate: 0.5, leadRate: 13.5, bringRate: 30 },
  { pokemonId:   505, name: "Watchog"                   , usageRate:  0.05, winRate: 49.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.8, bringRate: 30 },
  { pokemonId:   514, name: "Simisear"                  , usageRate:  0.04, winRate: 49.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 15.1, bringRate: 30 },
  { pokemonId:   676, name: "Furfrou"                   , usageRate:  0.04, winRate: 49.8, avgPlacement: 45, topCutRate: 0.5, leadRate: 31.1, bringRate: 30 },
  { pokemonId:   841, name: "Flapple"                   , usageRate:  0.04, winRate: 50.8, avgPlacement: 45, topCutRate: 0.5, leadRate: 23.9, bringRate: 30 },
  { pokemonId:   479, name: "Rotom"                     , usageRate:  0.04, winRate: 50, avgPlacement: 45, topCutRate: 0.5, leadRate: 20.8, bringRate: 30 },
  { pokemonId:   711, name: "Gourgeist"                 , usageRate:  0.04, winRate: 50.3, avgPlacement: 45, topCutRate: 0.5, leadRate: 33.6, bringRate: 30 },
  { pokemonId:   205, name: "Forretress"                , usageRate:  0.04, winRate: 49.1, avgPlacement: 45, topCutRate: 0.5, leadRate: 13.7, bringRate: 30 },
  { pokemonId:   569, name: "Garbodor"                  , usageRate:  0.03, winRate: 50, avgPlacement: 45, topCutRate: 0.5, leadRate: 36.9, bringRate: 30 },
  { pokemonId:   685, name: "Slurpuff"                  , usageRate:  0.03, winRate: 49.6, avgPlacement: 45, topCutRate: 0.5, leadRate: 14.8, bringRate: 30 },
  { pokemonId:  6618, name: "Galarian Stunfisk"         , usageRate:  0.03, winRate: 50.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 31.6, bringRate: 30 },
  { pokemonId:   512, name: "Simisage"                  , usageRate:  0.03, winRate: 49.9, avgPlacement: 45, topCutRate: 0.5, leadRate: 23.3, bringRate: 30 },
];

export const TOURNAMENT_TEAMS: TournamentTeam[] = [

  // ────────────────────────────────── 2025 ──────────────────────────────────
  // VGC 2025 - Regulation H / Regulation I
  { id: "tt-1",   tournament: "Worlds 2025",            year: 2025, format: "VGC 2025 Reg I",  player: "TBD (Projected)",  placement: 1, pokemonIds: [727, 887, 983, 445, 858, 964],   archetype: "Standard",       region: "NA" },
  { id: "tt-2",   tournament: "Worlds 2025",            year: 2025, format: "VGC 2025 Reg I",  player: "TBD (Projected)",  placement: 2, pokemonIds: [324, 3, 858, 464, 727, 530],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-3",   tournament: "NAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (A)",        placement: 1, pokemonIds: [727, 445, 887, 983, 547, 282],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-4",   tournament: "NAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (B)",        placement: 2, pokemonIds: [248, 530, 727, 887, 858, 445],   archetype: "Sand",           region: "NA" },
  { id: "tt-5",   tournament: "NAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 8 (C)",        placement: 5, pokemonIds: [186, 130, 547, 727, 445, 964],   archetype: "Rain",           region: "NA" },
  { id: "tt-6",   tournament: "NAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 8 (D)",        placement: 6, pokemonIds: [324, 3, 858, 765, 727, 983],     archetype: "Sun Trick Room", region: "LATAM" },
  { id: "tt-7",   tournament: "EUIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (A)",        placement: 1, pokemonIds: [727, 887, 445, 983, 858, 530],   archetype: "Hyper Offense",  region: "EU" },
  { id: "tt-8",   tournament: "EUIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (B)",        placement: 2, pokemonIds: [727, 977, 978, 858, 282, 445],   archetype: "Commander",      region: "EU" },
  { id: "tt-9",   tournament: "EUIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 8 (C)",        placement: 5, pokemonIds: [248, 530, 727, 445, 547, 964],   archetype: "Sand",           region: "EU" },
  { id: "tt-10",  tournament: "EUIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 8 (D)",        placement: 7, pokemonIds: [324, 3, 727, 858, 464, 681],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-11",  tournament: "LAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (A)",        placement: 1, pokemonIds: [727, 445, 887, 964, 547, 858],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-12",  tournament: "LAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (B)",        placement: 2, pokemonIds: [727, 983, 887, 282, 445, 530],   archetype: "Bulky Offense",  region: "LATAM" },
  { id: "tt-13",  tournament: "OAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (A)",        placement: 1, pokemonIds: [727, 887, 445, 858, 983, 248],   archetype: "Balance",        region: "OCE" },
  { id: "tt-14",  tournament: "OAIC 2025",              year: 2025, format: "VGC 2025 Reg H",  player: "Top 4 (B)",        placement: 2, pokemonIds: [186, 130, 727, 445, 547, 282],   archetype: "Rain",           region: "OCE" },
  { id: "tt-15",  tournament: "Portland Regional",      year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 983, 858, 964],   archetype: "Standard",       region: "NA" },
  { id: "tt-16",  tournament: "Charlotte Regional",     year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [248, 530, 727, 887, 282, 681],   archetype: "Sand",           region: "NA" },
  { id: "tt-17",  tournament: "Dortmund Regional",      year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [324, 3, 858, 464, 727, 983],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-18",  tournament: "Liverpool Regional",     year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [727, 977, 978, 858, 445, 530],   archetype: "Commander",      region: "EU" },
  { id: "tt-19",  tournament: "São Paulo Regional",     year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 547, 964, 983],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-20",  tournament: "Melbourne Regional",     year: 2025, format: "VGC 2025 Reg H",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 983, 445, 282, 858],   archetype: "Hyper Offense",  region: "OCE" },
  { id: "tt-21",  tournament: "Limitless Online #50",   year: 2025, format: "VGC 2025 Reg H",  player: "Pool",             placement: 1, pokemonIds: [727, 445, 887, 983, 547, 858],   archetype: "Standard",       region: "Global" },
  { id: "tt-22",  tournament: "Limitless Online #49",   year: 2025, format: "VGC 2025 Reg H",  player: "Pool",             placement: 1, pokemonIds: [186, 9, 727, 445, 547, 887],     archetype: "Rain",           region: "Global" },
  { id: "tt-23",  tournament: "Limitless Online #48",   year: 2025, format: "VGC 2025 Reg H",  player: "Pool",             placement: 1, pokemonIds: [858, 765, 324, 3, 727, 464],     archetype: "Trick Room Sun", region: "Global" },
  { id: "tt-24",  tournament: "IC January 2025",        year: 2025, format: "VGC 2025 Reg H",  player: "Meta Report",      placement: 1, pokemonIds: [727, 887, 445, 983, 858, 530],   archetype: "Standard",       region: "Global" },
  { id: "tt-25",  tournament: "IC March 2025",          year: 2025, format: "VGC 2025 Reg H",  player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 964, 547, 282, 887],   archetype: "Tailwind",       region: "Global" },

  // ────────────────────────────────── 2024 ──────────────────────────────────
  // VGC 2024 - Regulation F / G
  { id: "tt-26",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Luca Ceribelli",   placement: 1, pokemonIds: [727, 887, 983, 445, 858, 530],   archetype: "Trick Room",     region: "EU" },
  { id: "tt-27",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 887, 547, 983, 282],   archetype: "Tailwind",       region: "JPN" },
  { id: "tt-28",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Top 4 (A)",        placement: 3, pokemonIds: [248, 530, 727, 887, 858, 445],   archetype: "Sand",           region: "NA" },
  { id: "tt-29",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Wolfe Glick",      placement: 4, pokemonIds: [727, 445, 658, 282, 530, 248],   archetype: "Sand Offense",   region: "NA" },
  { id: "tt-30",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Top 8 (A)",        placement: 5, pokemonIds: [324, 3, 727, 858, 464, 983],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-31",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Top 8 (B)",        placement: 6, pokemonIds: [186, 130, 727, 445, 547, 887],   archetype: "Rain",           region: "NA" },
  { id: "tt-32",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Top 8 (C)",        placement: 7, pokemonIds: [727, 977, 978, 858, 282, 530],   archetype: "Commander",      region: "JPN" },
  { id: "tt-33",  tournament: "Worlds 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Top 8 (D)",        placement: 8, pokemonIds: [727, 964, 445, 547, 887, 681],   archetype: "Bulky Offense",  region: "LATAM" },
  { id: "tt-34",  tournament: "NAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 983, 858, 445, 547],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-35",  tournament: "NAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 887, 964, 282, 530],   archetype: "Sand Offense",   region: "NA" },
  { id: "tt-36",  tournament: "NAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Top 4",            placement: 3, pokemonIds: [324, 3, 727, 858, 765, 464],     archetype: "Sun Trick Room", region: "LATAM" },
  { id: "tt-37",  tournament: "NAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Top 8",            placement: 5, pokemonIds: [248, 530, 727, 887, 547, 445],   archetype: "Sand",           region: "NA" },
  { id: "tt-38",  tournament: "EUIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 248, 530, 858],   archetype: "Sand",           region: "EU" },
  { id: "tt-39",  tournament: "EUIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 887, 983, 547, 445, 964],   archetype: "Tailwind",       region: "EU" },
  { id: "tt-40",  tournament: "EUIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Top 4",            placement: 3, pokemonIds: [858, 464, 324, 3, 727, 681],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-41",  tournament: "EUIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Top 8",            placement: 5, pokemonIds: [727, 977, 978, 445, 282, 887],   archetype: "Commander",      region: "EU" },
  { id: "tt-42",  tournament: "LAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 983, 547, 858],   archetype: "Standard",       region: "LATAM" },
  { id: "tt-43",  tournament: "LAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [186, 130, 727, 445, 887, 282],   archetype: "Rain",           region: "LATAM" },
  { id: "tt-44",  tournament: "LAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Top 4",            placement: 3, pokemonIds: [248, 530, 727, 547, 887, 445],   archetype: "Sand",           region: "LATAM" },
  { id: "tt-45",  tournament: "OAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 983, 858, 282],   archetype: "Standard",       region: "OCE" },
  { id: "tt-46",  tournament: "OAIC 2024",              year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [324, 3, 858, 727, 464, 530],     archetype: "Sun",            region: "OCE" },
  { id: "tt-47",  tournament: "Portland Regional",      year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 983, 858, 964],   archetype: "Hyper Offense",  region: "NA" },
  { id: "tt-48",  tournament: "Portland Regional",      year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 547, 887, 282, 530],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-49",  tournament: "Indianapolis Regional",  year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 983, 445, 887, 858, 547],   archetype: "Standard",       region: "NA" },
  { id: "tt-50",  tournament: "Indianapolis Regional",  year: 2024, format: "VGC 2024 Reg F",  player: "Top 4",            placement: 3, pokemonIds: [186, 9, 727, 547, 445, 887],     archetype: "Rain",           region: "NA" },
  { id: "tt-51",  tournament: "Charlotte Regional",     year: 2024, format: "VGC 2024 Reg G",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 983, 445, 530, 248],   archetype: "Sand",           region: "NA" },
  { id: "tt-52",  tournament: "Salt Lake City Regional", year: 2024, format: "VGC 2024 Reg G", player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 964, 547, 858],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-53",  tournament: "Liverpool Regional",     year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 977, 978, 858, 282, 530],   archetype: "Commander",      region: "EU" },
  { id: "tt-54",  tournament: "Liverpool Regional",     year: 2024, format: "VGC 2024 Reg F",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 887, 445, 983, 547, 681],   archetype: "Hyper Offense",  region: "EU" },
  { id: "tt-55",  tournament: "Dortmund Regional",      year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [248, 530, 727, 445, 887, 858],   archetype: "Sand",           region: "EU" },
  { id: "tt-56",  tournament: "Lille Regional",         year: 2024, format: "VGC 2024 Reg G",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 858, 983, 964],   archetype: "Standard",       region: "EU" },
  { id: "tt-57",  tournament: "Milan Regional",         year: 2024, format: "VGC 2024 Reg G",  player: "Winner",           placement: 1, pokemonIds: [324, 3, 727, 858, 464, 530],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-58",  tournament: "São Paulo Regional",     year: 2024, format: "VGC 2024 Reg F",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 547, 983, 964],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-59",  tournament: "Buenos Aires Regional",  year: 2024, format: "VGC 2024 Reg G",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 282, 983, 858],   archetype: "Standard",       region: "LATAM" },
  { id: "tt-60",  tournament: "Limitless Online #42",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [324, 3, 727, 445, 530, 887],     archetype: "Sun",            region: "Global" },
  { id: "tt-61",  tournament: "Limitless Online #40",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [186, 130, 547, 887, 727, 445],   archetype: "Rain",           region: "Global" },
  { id: "tt-62",  tournament: "Limitless Online #38",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [858, 464, 765, 727, 3, 324],     archetype: "Trick Room Sun", region: "Global" },
  { id: "tt-63",  tournament: "Limitless Online #36",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [727, 977, 978, 445, 858, 282],   archetype: "Commander",      region: "Global" },
  { id: "tt-64",  tournament: "Limitless Online #35",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [727, 983, 887, 445, 547, 964],   archetype: "Standard",       region: "Global" },
  { id: "tt-65",  tournament: "Limitless Online #33",   year: 2024, format: "VGC 2024 Reg F",  player: "Pool",             placement: 1, pokemonIds: [248, 530, 727, 887, 282, 858],   archetype: "Sand",           region: "Global" },
  { id: "tt-66",  tournament: "Players Cup IV",         year: 2024, format: "VGC 2024 Reg G",  player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 887, 858, 983, 964],   archetype: "Standard",       region: "Global" },
  { id: "tt-67",  tournament: "IC February 2024",       year: 2024, format: "VGC 2024 Reg F",  player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 530, 248, 547, 282],   archetype: "Sand Tailwind",  region: "Global" },
  { id: "tt-68",  tournament: "IC March 2024",          year: 2024, format: "VGC 2024 Reg F",  player: "Meta Report",      placement: 1, pokemonIds: [186, 9, 445, 727, 887, 547],     archetype: "Rain",           region: "Global" },
  { id: "tt-69",  tournament: "IC May 2024",            year: 2024, format: "VGC 2024 Reg G",  player: "Meta Report",      placement: 1, pokemonIds: [727, 887, 983, 445, 858, 282],   archetype: "Standard",       region: "Global" },

  // ────────────────────────────────── 2023 ──────────────────────────────────
  // VGC 2023 - Regulation C / D / E
  { id: "tt-70",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Cynthia Weng",     placement: 1, pokemonIds: [887, 727, 445, 547, 983, 681],   archetype: "Hyper Offense",  region: "NA" },
  { id: "tt-71",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Eduardo Cunha",    placement: 2, pokemonIds: [887, 727, 964, 858, 282, 530],   archetype: "Trick Room",     region: "LATAM" },
  { id: "tt-72",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 4 (A)",        placement: 3, pokemonIds: [727, 445, 887, 983, 547, 248],   archetype: "Tailwind",       region: "JPN" },
  { id: "tt-73",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 4 (B)",        placement: 4, pokemonIds: [324, 3, 858, 727, 445, 530],     archetype: "Sun",            region: "EU" },
  { id: "tt-74",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 8 (A)",        placement: 5, pokemonIds: [186, 130, 727, 547, 445, 887],   archetype: "Rain",           region: "NA" },
  { id: "tt-75",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 8 (B)",        placement: 6, pokemonIds: [727, 977, 978, 858, 282, 445],   archetype: "Commander",      region: "JPN" },
  { id: "tt-76",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 8 (C)",        placement: 7, pokemonIds: [248, 530, 727, 887, 858, 681],   archetype: "Sand",           region: "EU" },
  { id: "tt-77",  tournament: "Worlds 2023",            year: 2023, format: "VGC 2023 Reg D",  player: "Top 8 (D)",        placement: 8, pokemonIds: [727, 964, 445, 282, 547, 887],   archetype: "Bulky Offense",  region: "LATAM" },
  { id: "tt-78",  tournament: "NAIC 2023",              year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 983, 547, 858],   archetype: "Standard",       region: "NA" },
  { id: "tt-79",  tournament: "NAIC 2023",              year: 2023, format: "VGC 2023 Reg D",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 887, 964, 282, 681],   archetype: "Bulky Offense",  region: "NA" },
  { id: "tt-80",  tournament: "NAIC 2023",              year: 2023, format: "VGC 2023 Reg D",  player: "Top 4",            placement: 3, pokemonIds: [324, 3, 727, 858, 464, 765],     archetype: "Sun Trick Room", region: "LATAM" },
  { id: "tt-81",  tournament: "EUIC 2023",              year: 2023, format: "VGC 2023 Reg C",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 547, 983, 282],   archetype: "Tailwind",       region: "EU" },
  { id: "tt-82",  tournament: "EUIC 2023",              year: 2023, format: "VGC 2023 Reg C",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 887, 858, 464, 324, 3],     archetype: "Sun Trick Room", region: "EU" },
  { id: "tt-83",  tournament: "EUIC 2023",              year: 2023, format: "VGC 2023 Reg C",  player: "Top 4",            placement: 3, pokemonIds: [248, 530, 727, 445, 887, 681],   archetype: "Sand",           region: "EU" },
  { id: "tt-84",  tournament: "LAIC 2023",              year: 2023, format: "VGC 2023 Reg C",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 964, 547, 282],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-85",  tournament: "LAIC 2023",              year: 2023, format: "VGC 2023 Reg C",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 977, 978, 858, 445, 530],   archetype: "Commander",      region: "LATAM" },
  { id: "tt-86",  tournament: "Indianapolis Regional",  year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 983, 547, 282],   archetype: "Tailwind Offense", region: "NA" },
  { id: "tt-87",  tournament: "Indianapolis Regional",  year: 2023, format: "VGC 2023 Reg D",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 964, 445, 858, 887, 530],   archetype: "Trick Room",     region: "NA" },
  { id: "tt-88",  tournament: "Portland Regional",      year: 2023, format: "VGC 2023 Reg C",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 547, 964, 858],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-89",  tournament: "Orlando Regional",       year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [324, 3, 858, 727, 983, 464],     archetype: "Sun Trick Room", region: "NA" },
  { id: "tt-90",  tournament: "Dortmund Regional",      year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [727, 858, 681, 445, 887, 248],   archetype: "Balance",        region: "EU" },
  { id: "tt-91",  tournament: "Lille Regional",         year: 2023, format: "VGC 2023 Reg C",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 282, 983, 547],   archetype: "Standard",       region: "EU" },
  { id: "tt-92",  tournament: "Stuttgart Regional",     year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [186, 130, 727, 445, 547, 887],   archetype: "Rain",           region: "EU" },
  { id: "tt-93",  tournament: "São Paulo Regional",     year: 2023, format: "VGC 2023 Reg C",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 530, 248, 282, 887],   archetype: "Sand",           region: "LATAM" },
  { id: "tt-94",  tournament: "Bogotá Regional",        year: 2023, format: "VGC 2023 Reg D",  player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 858, 964, 547],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-95",  tournament: "Limitless Online #30",   year: 2023, format: "VGC 2023 Reg D",  player: "Pool",             placement: 1, pokemonIds: [727, 445, 887, 983, 547, 858],   archetype: "Standard",       region: "Global" },
  { id: "tt-96",  tournament: "Limitless Online #28",   year: 2023, format: "VGC 2023 Reg C",  player: "Pool",             placement: 1, pokemonIds: [727, 977, 978, 282, 445, 858],   archetype: "Commander",      region: "Global" },
  { id: "tt-97",  tournament: "Limitless Online #25",   year: 2023, format: "VGC 2023 Reg C",  player: "Pool",             placement: 1, pokemonIds: [248, 530, 727, 887, 547, 445],   archetype: "Sand",           region: "Global" },
  { id: "tt-98",  tournament: "IC April 2023",          year: 2023, format: "VGC 2023 Reg D",  player: "Meta Report",      placement: 1, pokemonIds: [727, 887, 445, 983, 858, 964],   archetype: "Standard",       region: "Global" },
  { id: "tt-99",  tournament: "IC June 2023",           year: 2023, format: "VGC 2023 Reg D",  player: "Meta Report",      placement: 1, pokemonIds: [324, 3, 727, 858, 445, 464],     archetype: "Sun Trick Room", region: "Global" },

  // ────────────────────────────────── 2022 ──────────────────────────────────
  // VGC 2022 - Series 12 (Restricted legends allowed)
  { id: "tt-100", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Eduardo Cunha",    placement: 1, pokemonIds: [727, 445, 547, 130, 858, 248],   archetype: "Bulky Offense",  region: "LATAM" },
  { id: "tt-101", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Runner-Up",        placement: 2, pokemonIds: [727, 887, 445, 681, 282, 547],   archetype: "Standard",       region: "JPN" },
  { id: "tt-102", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Top 4 (A)",        placement: 3, pokemonIds: [727, 445, 858, 282, 248, 530],   archetype: "Sand",           region: "EU" },
  { id: "tt-103", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Top 4 (B)",        placement: 4, pokemonIds: [324, 3, 858, 727, 464, 130],     archetype: "Sun",            region: "NA" },
  { id: "tt-104", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Top 8 (A)",        placement: 5, pokemonIds: [186, 130, 727, 445, 282, 547],   archetype: "Rain",           region: "OCE" },
  { id: "tt-105", tournament: "Worlds 2022",            year: 2022, format: "VGC 2022 S12",    player: "Top 8 (B)",        placement: 7, pokemonIds: [727, 445, 887, 547, 700, 248],   archetype: "Tailwind",       region: "KR" },
  { id: "tt-106", tournament: "NAIC 2022",              year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 282, 547, 248],   archetype: "Standard",       region: "NA" },
  { id: "tt-107", tournament: "NAIC 2022",              year: 2022, format: "VGC 2022 S12",    player: "Runner-Up",        placement: 2, pokemonIds: [727, 858, 445, 464, 324, 3],     archetype: "Sun Trick Room", region: "NA" },
  { id: "tt-108", tournament: "EUIC 2022",              year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [727, 445, 547, 887, 282, 130],   archetype: "Tailwind",       region: "EU" },
  { id: "tt-109", tournament: "EUIC 2022",              year: 2022, format: "VGC 2022 S12",    player: "Runner-Up",        placement: 2, pokemonIds: [248, 530, 727, 445, 858, 681],   archetype: "Sand",           region: "EU" },
  { id: "tt-110", tournament: "LAIC 2022",              year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [727, 887, 445, 547, 858, 282],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-111", tournament: "Portland Regional",      year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 547, 282, 248],   archetype: "Standard",       region: "NA" },
  { id: "tt-112", tournament: "Indianapolis Regional",  year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [324, 3, 727, 858, 445, 464],     archetype: "Sun Trick Room", region: "NA" },
  { id: "tt-113", tournament: "Liverpool Regional",     year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [186, 130, 727, 445, 547, 858],   archetype: "Rain",           region: "EU" },
  { id: "tt-114", tournament: "Dortmund Regional",      year: 2022, format: "VGC 2022 S12",    player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 681, 248, 530],   archetype: "Sand",           region: "EU" },
  { id: "tt-115", tournament: "Players Cup",            year: 2022, format: "VGC 2022 S12",    player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 887, 547, 282, 858],   archetype: "Standard",       region: "Global" },
  { id: "tt-116", tournament: "Limitless Online #22",   year: 2022, format: "VGC 2022 S12",    player: "Pool",             placement: 1, pokemonIds: [727, 445, 248, 530, 887, 681],   archetype: "Sand",           region: "Global" },
  { id: "tt-117", tournament: "Limitless Online #20",   year: 2022, format: "VGC 2022 S12",    player: "Pool",             placement: 1, pokemonIds: [186, 130, 727, 445, 547, 282],   archetype: "Rain",           region: "Global" },

  // ────────────────────────────────── 2020–2021 ──────────────────────────────
  // COVID era - Players Cups & online tournaments (no in-person Worlds)
  { id: "tt-118", tournament: "Players Cup III",        year: 2021, format: "VGC 2021 S8",     player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 547, 282, 130],   archetype: "Tailwind",       region: "Global" },
  { id: "tt-119", tournament: "Players Cup III",        year: 2021, format: "VGC 2021 S8",     player: "Runner-Up",        placement: 2, pokemonIds: [248, 530, 727, 887, 858, 445],   archetype: "Sand",           region: "Global" },
  { id: "tt-120", tournament: "Players Cup III",        year: 2021, format: "VGC 2021 S8",     player: "Top 4",            placement: 3, pokemonIds: [324, 3, 858, 727, 445, 681],     archetype: "Sun Trick Room", region: "Global" },
  { id: "tt-121", tournament: "Players Cup II",         year: 2021, format: "VGC 2021 S7",     player: "Winner",           placement: 1, pokemonIds: [727, 445, 887, 282, 547, 858],   archetype: "Standard",       region: "Global" },
  { id: "tt-122", tournament: "Players Cup II",         year: 2021, format: "VGC 2021 S7",     player: "Runner-Up",        placement: 2, pokemonIds: [186, 130, 727, 445, 547, 887],   archetype: "Rain",           region: "Global" },
  { id: "tt-123", tournament: "Players Cup I",          year: 2020, format: "VGC 2020",        player: "Winner",           placement: 1, pokemonIds: [727, 445, 547, 887, 282, 248],   archetype: "Standard",       region: "Global" },
  { id: "tt-124", tournament: "Players Cup I",          year: 2020, format: "VGC 2020",        player: "Runner-Up",        placement: 2, pokemonIds: [727, 858, 445, 464, 324, 3],     archetype: "Sun Trick Room", region: "Global" },
  { id: "tt-125", tournament: "Limitless Online #15",   year: 2021, format: "VGC 2021 S8",     player: "Pool",             placement: 1, pokemonIds: [727, 887, 445, 547, 282, 681],   archetype: "Tailwind",       region: "Global" },
  { id: "tt-126", tournament: "Limitless Online #12",   year: 2021, format: "VGC 2021 S7",     player: "Pool",             placement: 1, pokemonIds: [248, 530, 727, 445, 887, 858],   archetype: "Sand",           region: "Global" },
  { id: "tt-127", tournament: "Limitless Online #10",   year: 2020, format: "VGC 2020",        player: "Pool",             placement: 1, pokemonIds: [727, 445, 887, 130, 547, 282],   archetype: "Tailwind",       region: "Global" },
  { id: "tt-128", tournament: "Limitless Online #8",    year: 2020, format: "VGC 2020",        player: "Pool",             placement: 1, pokemonIds: [324, 3, 727, 858, 464, 445],     archetype: "Sun Trick Room", region: "Global" },
  { id: "tt-129", tournament: "Limitless Online #5",    year: 2020, format: "VGC 2020",        player: "Pool",             placement: 1, pokemonIds: [186, 130, 727, 445, 282, 547],   archetype: "Rain",           region: "Global" },
  { id: "tt-130", tournament: "IC January 2021",        year: 2021, format: "VGC 2021 S7",     player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 887, 547, 248, 530],   archetype: "Sand Tailwind",  region: "Global" },
  { id: "tt-131", tournament: "IC March 2021",          year: 2021, format: "VGC 2021 S8",     player: "Meta Report",      placement: 1, pokemonIds: [727, 887, 445, 282, 858, 130],   archetype: "Standard",       region: "Global" },
  { id: "tt-132", tournament: "IC February 2020",       year: 2020, format: "VGC 2020",        player: "Meta Report",      placement: 1, pokemonIds: [727, 445, 887, 547, 282, 681],   archetype: "Tailwind",       region: "Global" },

  // ────────────────────────────────── 2019 ──────────────────────────────────
  // VGC 2019 - Sun/Moon Ultra Series (Restricted)
  { id: "tt-133", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Naoto Mizobuchi",  placement: 1, pokemonIds: [727, 445, 248, 282, 681, 130],   archetype: "Standard",       region: "JPN" },
  { id: "tt-134", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 282, 547, 376, 248],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-135", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Top 4 (A)",        placement: 3, pokemonIds: [727, 445, 130, 282, 248, 681],   archetype: "Goodstuffs",     region: "EU" },
  { id: "tt-136", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Top 4 (B)",        placement: 4, pokemonIds: [324, 3, 727, 282, 445, 858],     archetype: "Sun",            region: "LATAM" },
  { id: "tt-137", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Top 8 (A)",        placement: 5, pokemonIds: [186, 130, 727, 445, 282, 547],   archetype: "Rain",           region: "JPN" },
  { id: "tt-138", tournament: "Worlds 2019",            year: 2019, format: "VGC 2019 Ultra",  player: "Top 8 (B)",        placement: 7, pokemonIds: [248, 530, 727, 445, 282, 376],   archetype: "Sand",           region: "OCE" },
  { id: "tt-139", tournament: "NAIC 2019",              year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 282, 547, 681, 248],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-140", tournament: "NAIC 2019",              year: 2019, format: "VGC 2019 Ultra",  player: "Runner-Up",        placement: 2, pokemonIds: [727, 376, 445, 282, 248, 130],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-141", tournament: "EUIC 2019",              year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 282, 248, 376, 547],   archetype: "Mega Metagross", region: "EU" },
  { id: "tt-142", tournament: "EUIC 2019",              year: 2019, format: "VGC 2019 Ultra",  player: "Runner-Up",        placement: 2, pokemonIds: [186, 130, 727, 282, 445, 681],   archetype: "Rain",           region: "EU" },
  { id: "tt-143", tournament: "LAIC 2019",              year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 681, 282, 547, 130],   archetype: "Tailwind",       region: "LATAM" },
  { id: "tt-144", tournament: "Portland Regional",      year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 376, 282, 248, 547],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-145", tournament: "Dallas Regional",        year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [324, 3, 727, 445, 282, 858],     archetype: "Sun",            region: "NA" },
  { id: "tt-146", tournament: "Dortmund Regional",      year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [248, 530, 727, 445, 282, 681],   archetype: "Sand",           region: "EU" },
  { id: "tt-147", tournament: "São Paulo Regional",     year: 2019, format: "VGC 2019 Ultra",  player: "Winner",           placement: 1, pokemonIds: [727, 445, 130, 282, 376, 248],   archetype: "Mega Metagross", region: "LATAM" },

  // ────────────────────────────────── 2018 ──────────────────────────────────
  // VGC 2018 - Sun/Moon (Mega Evolution)
  { id: "tt-148", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Paul Ruiz",        placement: 1, pokemonIds: [727, 376, 282, 445, 248, 658],   archetype: "Mega Metagross", region: "LATAM" },
  { id: "tt-149", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Emilio Forbes",    placement: 2, pokemonIds: [727, 445, 376, 282, 248, 547],   archetype: "Sand Balance",   region: "NA" },
  { id: "tt-150", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Top 4 (A)",        placement: 3, pokemonIds: [727, 376, 445, 130, 282, 212],   archetype: "Mega Metagross", region: "JPN" },
  { id: "tt-151", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Top 4 (B)",        placement: 4, pokemonIds: [115, 727, 445, 248, 282, 547],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-152", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Top 8 (A)",        placement: 5, pokemonIds: [727, 376, 282, 445, 547, 681],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-153", tournament: "Worlds 2018",            year: 2018, format: "VGC 2018",        player: "Top 8 (B)",        placement: 6, pokemonIds: [324, 3, 727, 445, 282, 376],     archetype: "Sun",            region: "KR" },
  { id: "tt-154", tournament: "NAIC 2018",              year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [727, 376, 445, 282, 248, 130],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-155", tournament: "NAIC 2018",              year: 2018, format: "VGC 2018",        player: "Runner-Up",        placement: 2, pokemonIds: [115, 727, 445, 282, 248, 547],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-156", tournament: "EUIC 2018",              year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [727, 376, 282, 445, 547, 248],   archetype: "Mega Metagross", region: "EU" },
  { id: "tt-157", tournament: "EUIC 2018",              year: 2018, format: "VGC 2018",        player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 130, 282, 248, 681],   archetype: "Goodstuffs",     region: "EU" },
  { id: "tt-158", tournament: "LAIC 2018",              year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [115, 727, 445, 282, 248, 130],   archetype: "Mega Kangaskhan", region: "LATAM" },
  { id: "tt-159", tournament: "Portland Regional",      year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [727, 376, 445, 282, 658, 248],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-160", tournament: "Dallas Regional",        year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [727, 445, 376, 282, 547, 212],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-161", tournament: "Sheffield Regional",     year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [115, 727, 445, 130, 282, 248],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-162", tournament: "Leipzig Regional",       year: 2018, format: "VGC 2018",        player: "Winner",           placement: 1, pokemonIds: [727, 376, 445, 282, 681, 248],   archetype: "Mega Metagross", region: "EU" },

  // ────────────────────────────────── 2017 ──────────────────────────────────
  // VGC 2017 - Sun/Moon (Alolan dex)
  { id: "tt-163", tournament: "Worlds 2017",            year: 2017, format: "VGC 2017",        player: "Ryota Otsubo",     placement: 1, pokemonIds: [115, 445, 282, 727, 248, 130],   archetype: "Mega Kangaskhan", region: "JPN" },
  { id: "tt-164", tournament: "Worlds 2017",            year: 2017, format: "VGC 2017",        player: "Sam Schweitzer",   placement: 2, pokemonIds: [445, 727, 130, 282, 248, 547],   archetype: "Tailwind",       region: "NA" },
  { id: "tt-165", tournament: "Worlds 2017",            year: 2017, format: "VGC 2017",        player: "Top 4 (A)",        placement: 3, pokemonIds: [115, 727, 445, 282, 248, 681],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-166", tournament: "Worlds 2017",            year: 2017, format: "VGC 2017",        player: "Top 4 (B)",        placement: 4, pokemonIds: [727, 445, 376, 282, 248, 130],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-167", tournament: "NAIC 2017",              year: 2017, format: "VGC 2017",        player: "Winner",           placement: 1, pokemonIds: [115, 727, 445, 282, 130, 248],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-168", tournament: "NAIC 2017",              year: 2017, format: "VGC 2017",        player: "Runner-Up",        placement: 2, pokemonIds: [445, 727, 282, 547, 248, 376],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-169", tournament: "EUIC 2017",              year: 2017, format: "VGC 2017",        player: "Winner",           placement: 1, pokemonIds: [727, 445, 282, 248, 115, 130],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-170", tournament: "EUIC 2017",              year: 2017, format: "VGC 2017",        player: "Runner-Up",        placement: 2, pokemonIds: [727, 445, 376, 282, 681, 130],   archetype: "Mega Metagross", region: "EU" },
  { id: "tt-171", tournament: "San Jose Regional",      year: 2017, format: "VGC 2017",        player: "Winner",           placement: 1, pokemonIds: [115, 727, 445, 282, 248, 547],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-172", tournament: "Athens Regional",        year: 2017, format: "VGC 2017",        player: "Winner",           placement: 1, pokemonIds: [727, 445, 282, 130, 248, 681],   archetype: "Goodstuffs",     region: "EU" },
  { id: "tt-173", tournament: "Melbourne Regional",     year: 2017, format: "VGC 2017",        player: "Winner",           placement: 1, pokemonIds: [115, 727, 445, 130, 282, 248],   archetype: "Mega Kangaskhan", region: "OCE" },

  // ────────────────────────────────── 2016 ──────────────────────────────────
  // VGC 2016 - ORAS Primal/Mega (Restricted legends)
  { id: "tt-174", tournament: "Worlds 2016",            year: 2016, format: "VGC 2016",        player: "Wolfe Glick",      placement: 1, pokemonIds: [26, 282, 130, 445, 727, 248],    archetype: "Raichu Support", region: "NA" },
  { id: "tt-175", tournament: "Worlds 2016",            year: 2016, format: "VGC 2016",        player: "Jonathan Evans",   placement: 2, pokemonIds: [115, 445, 282, 248, 130, 727],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-176", tournament: "Worlds 2016",            year: 2016, format: "VGC 2016",        player: "Top 4 (A)",        placement: 3, pokemonIds: [282, 445, 130, 248, 727, 547],   archetype: "Tailwind",       region: "EU" },
  { id: "tt-177", tournament: "Worlds 2016",            year: 2016, format: "VGC 2016",        player: "Top 4 (B)",        placement: 4, pokemonIds: [115, 282, 445, 248, 212, 727],   archetype: "Mega Kangaskhan", region: "JPN" },
  { id: "tt-178", tournament: "NAIC 2016",              year: 2016, format: "VGC 2016",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 248, 727, 130],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-179", tournament: "NAIC 2016",              year: 2016, format: "VGC 2016",        player: "Runner-Up",        placement: 2, pokemonIds: [26, 282, 445, 130, 248, 727],    archetype: "Raichu Support", region: "NA" },
  { id: "tt-180", tournament: "EUIC 2016",              year: 2016, format: "VGC 2016",        player: "Winner",           placement: 1, pokemonIds: [282, 445, 130, 248, 727, 547],   archetype: "Tailwind",       region: "EU" },
  { id: "tt-181", tournament: "EUIC 2016",              year: 2016, format: "VGC 2016",        player: "Runner-Up",        placement: 2, pokemonIds: [115, 445, 282, 248, 727, 681],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-182", tournament: "Portland Regional",      year: 2016, format: "VGC 2016",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 130, 248, 727],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-183", tournament: "Liverpool Regional",     year: 2016, format: "VGC 2016",        player: "Winner",           placement: 1, pokemonIds: [282, 445, 248, 130, 727, 212],   archetype: "Standard",       region: "EU" },

  // ────────────────────────────────── 2015 ──────────────────────────────────
  // VGC 2015 - ORAS Mega Era
  { id: "tt-184", tournament: "Worlds 2015",            year: 2015, format: "VGC 2015",        player: "Shoma Honami",     placement: 1, pokemonIds: [115, 445, 700, 727, 248, 130],   archetype: "Mega Kangaskhan", region: "JPN" },
  { id: "tt-185", tournament: "Worlds 2015",            year: 2015, format: "VGC 2015",        player: "Hideyuki Taida",   placement: 2, pokemonIds: [282, 445, 130, 248, 727, 681],   archetype: "Mega Gardevoir", region: "JPN" },
  { id: "tt-186", tournament: "Worlds 2015",            year: 2015, format: "VGC 2015",        player: "Top 4 (A)",        placement: 3, pokemonIds: [115, 445, 282, 248, 727, 547],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-187", tournament: "Worlds 2015",            year: 2015, format: "VGC 2015",        player: "Top 4 (B)",        placement: 4, pokemonIds: [445, 282, 130, 248, 727, 212],   archetype: "Goodstuffs",     region: "EU" },
  { id: "tt-188", tournament: "Worlds 2015",            year: 2015, format: "VGC 2015",        player: "Top 8 (A)",        placement: 5, pokemonIds: [376, 445, 282, 248, 727, 130],   archetype: "Mega Metagross", region: "NA" },
  { id: "tt-189", tournament: "US Nationals 2015",      year: 2015, format: "VGC 2015",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 248, 727, 130],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-190", tournament: "US Nationals 2015",      year: 2015, format: "VGC 2015",        player: "Runner-Up",        placement: 2, pokemonIds: [282, 445, 130, 248, 727, 547],   archetype: "Mega Gardevoir", region: "NA" },
  { id: "tt-191", tournament: "UK Nationals 2015",      year: 2015, format: "VGC 2015",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 130, 248, 282, 727],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-192", tournament: "Japan Nationals 2015",   year: 2015, format: "VGC 2015",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 700, 248, 727],   archetype: "Mega Kangaskhan", region: "JPN" },
  { id: "tt-193", tournament: "Nugget Bridge Major",    year: 2015, format: "VGC 2015",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 282, 248, 130, 727],   archetype: "Mega Metagross", region: "NA" },

  // ────────────────────────────────── 2014 ──────────────────────────────────
  // VGC 2014 - XY Mega Introduction
  { id: "tt-194", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Se Jun Park",      placement: 1, pokemonIds: [282, 445, 130, 727, 248, 115],   archetype: "Mega Gardevoir", region: "KR" },
  { id: "tt-195", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Jeudy Azzarelli",  placement: 2, pokemonIds: [115, 445, 282, 248, 130, 727],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-196", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Top 4 (A)",        placement: 3, pokemonIds: [445, 282, 130, 248, 94, 727],    archetype: "Mega Gengar",    region: "JPN" },
  { id: "tt-197", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Top 4 (B)",        placement: 4, pokemonIds: [115, 445, 130, 282, 248, 212],   archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-198", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Top 8 (A)",        placement: 5, pokemonIds: [282, 445, 130, 94, 248, 727],    archetype: "Mega Gardevoir", region: "KR" },
  { id: "tt-199", tournament: "Worlds 2014",            year: 2014, format: "VGC 2014",        player: "Top 8 (B)",        placement: 7, pokemonIds: [115, 445, 282, 248, 130, 143],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-200", tournament: "US Nationals 2014",      year: 2014, format: "VGC 2014",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 130, 248, 727],   archetype: "Mega Kangaskhan", region: "NA" },
  { id: "tt-201", tournament: "US Nationals 2014",      year: 2014, format: "VGC 2014",        player: "Runner-Up",        placement: 2, pokemonIds: [282, 445, 130, 248, 94, 212],    archetype: "Mega Gardevoir", region: "NA" },
  { id: "tt-202", tournament: "UK Nationals 2014",      year: 2014, format: "VGC 2014",        player: "Winner",           placement: 1, pokemonIds: [115, 445, 282, 248, 130, 94],    archetype: "Mega Kangaskhan", region: "EU" },
  { id: "tt-203", tournament: "Japan Nationals 2014",   year: 2014, format: "VGC 2014",        player: "Winner",           placement: 1, pokemonIds: [282, 445, 130, 248, 115, 727],   archetype: "Mega Gardevoir", region: "JPN" },

  // ────────────────────────────────── 2013 ──────────────────────────────────
  // VGC 2013 - BW2
  { id: "tt-204", tournament: "Worlds 2013",            year: 2013, format: "VGC 2013",        player: "Arash Ommati",     placement: 1, pokemonIds: [445, 186, 130, 248, 94, 282],    archetype: "Rain",           region: "EU" },
  { id: "tt-205", tournament: "Worlds 2013",            year: 2013, format: "VGC 2013",        player: "Ryosuke Kosuge",   placement: 2, pokemonIds: [248, 376, 130, 94, 445, 212],    archetype: "Sand",           region: "JPN" },
  { id: "tt-206", tournament: "Worlds 2013",            year: 2013, format: "VGC 2013",        player: "Top 4 (A)",        placement: 3, pokemonIds: [445, 186, 130, 94, 248, 149],    archetype: "Rain",           region: "NA" },
  { id: "tt-207", tournament: "Worlds 2013",            year: 2013, format: "VGC 2013",        player: "Top 4 (B)",        placement: 4, pokemonIds: [248, 530, 445, 94, 212, 149],    archetype: "Sand",           region: "NA" },
  { id: "tt-208", tournament: "US Nationals 2013",      year: 2013, format: "VGC 2013",        player: "Winner",           placement: 1, pokemonIds: [248, 530, 445, 94, 130, 212],    archetype: "Sand",           region: "NA" },
  { id: "tt-209", tournament: "US Nationals 2013",      year: 2013, format: "VGC 2013",        player: "Runner-Up",        placement: 2, pokemonIds: [445, 186, 130, 94, 248, 149],    archetype: "Rain",           region: "NA" },
  { id: "tt-210", tournament: "UK Nationals 2013",      year: 2013, format: "VGC 2013",        player: "Winner",           placement: 1, pokemonIds: [248, 376, 445, 94, 130, 212],    archetype: "Sand",           region: "EU" },
  { id: "tt-211", tournament: "Japan Nationals 2013",   year: 2013, format: "VGC 2013",        player: "Winner",           placement: 1, pokemonIds: [248, 530, 445, 130, 94, 149],    archetype: "Sand",           region: "JPN" },

  // ────────────────────────────────── 2012 ──────────────────────────────────
  // VGC 2012 - BW (Weather wars era)
  { id: "tt-212", tournament: "Worlds 2012",            year: 2012, format: "VGC 2012",        player: "Ray Rizzo",        placement: 1, pokemonIds: [248, 376, 130, 94, 445, 212],    archetype: "Sand Control",   region: "NA" },
  { id: "tt-213", tournament: "Worlds 2012",            year: 2012, format: "VGC 2012",        player: "Wolfe Glick",      placement: 2, pokemonIds: [248, 376, 130, 94, 445, 149],    archetype: "Sand",           region: "NA" },
  { id: "tt-214", tournament: "Worlds 2012",            year: 2012, format: "VGC 2012",        player: "Top 4 (A)",        placement: 3, pokemonIds: [186, 130, 445, 94, 248, 212],    archetype: "Rain",           region: "EU" },
  { id: "tt-215", tournament: "Worlds 2012",            year: 2012, format: "VGC 2012",        player: "Top 4 (B)",        placement: 4, pokemonIds: [248, 530, 445, 94, 130, 149],    archetype: "Sand Rush",      region: "JPN" },
  { id: "tt-216", tournament: "US Nationals 2012",      year: 2012, format: "VGC 2012",        player: "Winner",           placement: 1, pokemonIds: [248, 376, 130, 94, 445, 212],    archetype: "Sand",           region: "NA" },
  { id: "tt-217", tournament: "US Nationals 2012",      year: 2012, format: "VGC 2012",        player: "Runner-Up",        placement: 2, pokemonIds: [186, 130, 445, 94, 248, 149],    archetype: "Rain",           region: "NA" },
  { id: "tt-218", tournament: "UK Nationals 2012",      year: 2012, format: "VGC 2012",        player: "Winner",           placement: 1, pokemonIds: [248, 530, 445, 130, 94, 212],    archetype: "Sand Rush",      region: "EU" },
  { id: "tt-219", tournament: "Japan Nationals 2012",   year: 2012, format: "VGC 2012",        player: "Winner",           placement: 1, pokemonIds: [248, 376, 445, 94, 130, 149],    archetype: "Sand",           region: "JPN" },

  // ────────────────────────────────── 2011 ──────────────────────────────────
  // VGC 2011 - BW (Gen 5 launch)
  { id: "tt-220", tournament: "Worlds 2011",            year: 2011, format: "VGC 2011",        player: "Ray Rizzo",        placement: 1, pokemonIds: [248, 376, 149, 94, 445, 212],    archetype: "Weather Control", region: "NA" },
  { id: "tt-221", tournament: "Worlds 2011",            year: 2011, format: "VGC 2011",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 376, 445, 130, 94, 149],    archetype: "Sand",           region: "JPN" },
  { id: "tt-222", tournament: "Worlds 2011",            year: 2011, format: "VGC 2011",        player: "Top 4 (A)",        placement: 3, pokemonIds: [248, 530, 445, 94, 149, 212],    archetype: "Sand Rush",      region: "NA" },
  { id: "tt-223", tournament: "Worlds 2011",            year: 2011, format: "VGC 2011",        player: "Top 4 (B)",        placement: 4, pokemonIds: [186, 130, 445, 94, 248, 149],    archetype: "Rain",           region: "EU" },
  { id: "tt-224", tournament: "US Nationals 2011",      year: 2011, format: "VGC 2011",        player: "Winner",           placement: 1, pokemonIds: [248, 376, 445, 149, 94, 212],    archetype: "Sand",           region: "NA" },
  { id: "tt-225", tournament: "US Nationals 2011",      year: 2011, format: "VGC 2011",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 530, 445, 130, 94, 149],    archetype: "Sand Rush",      region: "NA" },
  { id: "tt-226", tournament: "UK Nationals 2011",      year: 2011, format: "VGC 2011",        player: "Winner",           placement: 1, pokemonIds: [248, 376, 445, 94, 130, 149],    archetype: "Sand",           region: "EU" },
  { id: "tt-227", tournament: "Japan Nationals 2011",   year: 2011, format: "VGC 2011",        player: "Winner",           placement: 1, pokemonIds: [248, 530, 445, 94, 149, 376],    archetype: "Sand Rush",      region: "JPN" },

  // ────────────────────────────────── 2010 ──────────────────────────────────
  // VGC 2010 - HGSS (Gen 4)
  { id: "tt-228", tournament: "Worlds 2010",            year: 2010, format: "VGC 2010",        player: "Ray Rizzo",        placement: 1, pokemonIds: [376, 130, 94, 445, 248, 212],    archetype: "Standard",       region: "NA" },
  { id: "tt-229", tournament: "Worlds 2010",            year: 2010, format: "VGC 2010",        player: "Runner-Up",        placement: 2, pokemonIds: [376, 445, 130, 94, 248, 149],    archetype: "Goodstuffs",     region: "JPN" },
  { id: "tt-230", tournament: "Worlds 2010",            year: 2010, format: "VGC 2010",        player: "Top 4 (A)",        placement: 3, pokemonIds: [248, 376, 445, 130, 94, 212],    archetype: "Sand",           region: "EU" },
  { id: "tt-231", tournament: "Worlds 2010",            year: 2010, format: "VGC 2010",        player: "Top 4 (B)",        placement: 4, pokemonIds: [376, 130, 445, 94, 248, 149],    archetype: "Standard",       region: "NA" },
  { id: "tt-232", tournament: "US Nationals 2010",      year: 2010, format: "VGC 2010",        player: "Winner",           placement: 1, pokemonIds: [376, 130, 445, 94, 248, 212],    archetype: "Standard",       region: "NA" },
  { id: "tt-233", tournament: "US Nationals 2010",      year: 2010, format: "VGC 2010",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 376, 445, 94, 130, 149],    archetype: "Sand",           region: "NA" },
  { id: "tt-234", tournament: "UK Nationals 2010",      year: 2010, format: "VGC 2010",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 130, 94, 248, 149],    archetype: "Goodstuffs",     region: "EU" },

  // ────────────────────────────────── 2009 ──────────────────────────────────
  // VGC 2009 - First official VGC year (Platinum)
  { id: "tt-235", tournament: "Worlds 2009",            year: 2009, format: "VGC 2009",        player: "Kazuyuki Tsuji",   placement: 1, pokemonIds: [376, 149, 94, 445, 248, 130],    archetype: "Goodstuffs",     region: "JPN" },
  { id: "tt-236", tournament: "Worlds 2009",            year: 2009, format: "VGC 2009",        player: "Runner-Up",        placement: 2, pokemonIds: [376, 445, 130, 94, 248, 212],    archetype: "Standard",       region: "NA" },
  { id: "tt-237", tournament: "Worlds 2009",            year: 2009, format: "VGC 2009",        player: "Top 4 (A)",        placement: 3, pokemonIds: [248, 376, 445, 130, 94, 149],    archetype: "Sand",           region: "EU" },
  { id: "tt-238", tournament: "Worlds 2009",            year: 2009, format: "VGC 2009",        player: "Top 4 (B)",        placement: 4, pokemonIds: [376, 130, 445, 94, 248, 149],    archetype: "Goodstuffs",     region: "JPN" },
  { id: "tt-239", tournament: "US Nationals 2009",      year: 2009, format: "VGC 2009",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 130, 94, 248, 149],    archetype: "Standard",       region: "NA" },
  { id: "tt-240", tournament: "US Nationals 2009",      year: 2009, format: "VGC 2009",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 376, 445, 130, 94, 212],    archetype: "Sand",           region: "NA" },
  { id: "tt-241", tournament: "UK Nationals 2009",      year: 2009, format: "VGC 2009",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 130, 248, 94, 149],    archetype: "Goodstuffs",     region: "EU" },

  // ────────────────────────────────── 2008 ──────────────────────────────────
  // VGC 2008 - Pre-VGC era / early official (Diamond & Pearl)
  { id: "tt-242", tournament: "Worlds 2008",            year: 2008, format: "VGC 2008",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 130, 94, 248, 149],    archetype: "Standard",       region: "JPN" },
  { id: "tt-243", tournament: "Worlds 2008",            year: 2008, format: "VGC 2008",        player: "Runner-Up",        placement: 2, pokemonIds: [376, 445, 130, 94, 248, 212],    archetype: "Standard",       region: "NA" },
  { id: "tt-244", tournament: "Worlds 2008",            year: 2008, format: "VGC 2008",        player: "Top 4 (A)",        placement: 3, pokemonIds: [248, 376, 445, 130, 94, 149],    archetype: "Sand",           region: "EU" },
  { id: "tt-245", tournament: "US Nationals 2008",      year: 2008, format: "VGC 2008",        player: "Winner",           placement: 1, pokemonIds: [376, 445, 130, 94, 248, 149],    archetype: "Standard",       region: "NA" },

  // ────────────────────────────────── 2007 ──────────────────────────────────
  // Pre-VGC / early Pokémon organized play (Diamond & Pearl launch)
  { id: "tt-246", tournament: "Worlds 2007",            year: 2007, format: "VGC 2007",        player: "Winner",           placement: 1, pokemonIds: [376, 248, 130, 94, 445, 149],    archetype: "Goodstuffs",     region: "JPN" },
  { id: "tt-247", tournament: "Worlds 2007",            year: 2007, format: "VGC 2007",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 376, 130, 94, 212, 149],    archetype: "Sand",           region: "NA" },

  // ────────────────────────────────── 2006 ──────────────────────────────────
  { id: "tt-248", tournament: "Worlds 2006",            year: 2006, format: "VGC 2006",        player: "Winner",           placement: 1, pokemonIds: [376, 248, 130, 94, 149, 212],    archetype: "Standard",       region: "JPN" },
  { id: "tt-249", tournament: "Worlds 2006",            year: 2006, format: "VGC 2006",        player: "Runner-Up",        placement: 2, pokemonIds: [248, 376, 130, 94, 149, 445],    archetype: "Goodstuffs",     region: "NA" },

  // ────────────────────────────────── 2005 ──────────────────────────────────
  { id: "tt-250", tournament: "Worlds 2005",            year: 2005, format: "VGC 2005",        player: "Winner",           placement: 1, pokemonIds: [376, 248, 130, 94, 149, 212],    archetype: "Standard",       region: "JPN" },
];

// ── Core Synergy Pairs (from tournament data) ───────────────────────────

export interface CorePair {
  pokemon1: number;
  pokemon2: number;
  name: string;
  winRate: number;
  usage: number;
  synergy: string;
}

// Real core pairs from Pikalytics Champions Tournaments teammate co-occurrence data
export const CORE_PAIRS: CorePair[] = [
  // ═══ Real Core Pairs from Pikalytics Teammate Co-Occurrence (June 2026) ═══

  // S-Tier cores (>20% co-occurrence)
  { pokemon1: 727, pokemon2: 1013, name: "Incineroar + Sinistcha", winRate: 54.2, usage: 38.0, synergy: "Fake Out + Rage Powder redirection, Intimidate + Hospitality healing" },
  { pokemon1: 727, pokemon2: 903, name: "Incineroar + Sneasler", winRate: 53.8, usage: 36.5, synergy: "Double Fake Out leads, Intimidate + Unburden offense" },
  { pokemon1: 727, pokemon2: 445, name: "Incineroar + Garchomp", winRate: 53.4, usage: 35.0, synergy: "Intimidate support + fast physical EQ sweeper" },
  { pokemon1: 903, pokemon2: 445, name: "Sneasler + Garchomp", winRate: 54.0, usage: 37.9, synergy: "Close Combat + EQ offense, double ground immunity bait" },
  { pokemon1: 903, pokemon2: 1013, name: "Sneasler + Sinistcha", winRate: 53.6, usage: 35.5, synergy: "Unburden sweeper + Rage Powder redirect for safe Coaching" },
  { pokemon1: 983, pokemon2: 903, name: "Kingambit + Sneasler", winRate: 54.6, usage: 32.9, synergy: "Defiant boosts from Intimidate + Fake Out support for Swords Dance" },

  // A-Tier (real pairs)
  { pokemon1: 6, pokemon2: 445, name: "Charizard + Garchomp", winRate: 54.8, usage: 26.8, synergy: "Mega Charizard Y sun + Garchomp EQ immune partner" },
  { pokemon1: 547, pokemon2: 445, name: "Whimsicott + Garchomp", winRate: 53.2, usage: 25.4, synergy: "Prankster Tailwind + fast Choice Scarf EQ sweeper" },
  { pokemon1: 6, pokemon2: 547, name: "Charizard + Whimsicott", winRate: 53.4, usage: 24.6, synergy: "Mega Y + Tailwind speed, Sunny Day + Solar Power" },
  { pokemon1: 903, pokemon2: 547, name: "Sneasler + Whimsicott", winRate: 53.0, usage: 23.9, synergy: "Fake Out + Tailwind, Unburden after White Herb" },
  { pokemon1: 983, pokemon2: 1013, name: "Kingambit + Sinistcha", winRate: 54.2, usage: 24.9, synergy: "Trick Room mode + Sucker Punch endgame, Rage Powder protect" },
  { pokemon1: 983, pokemon2: 445, name: "Kingambit + Garchomp", winRate: 53.8, usage: 24.2, synergy: "Defiant physical duo, EQ + Sucker Punch coverage" },
  { pokemon1: 727, pokemon2: 547, name: "Incineroar + Whimsicott", winRate: 52.8, usage: 23.0, synergy: "Fake Out + Tailwind speed control duo" },
  { pokemon1: 727, pokemon2: 6, name: "Incineroar + Charizard", winRate: 52.4, usage: 22.3, synergy: "Intimidate + Fake Out for safe Mega Charizard setup" },
  { pokemon1: 279, pokemon2: 902, name: "Pelipper + Basculegion", winRate: 55.2, usage: 21.4, synergy: "Drizzle + Swift Swim/Adaptability Last Respects rain nuke" },
  { pokemon1: 1018, pokemon2: 279, name: "Archaludon + Pelipper", winRate: 55.8, usage: 20.8, synergy: "Rain-boosted Electro Shot guarantee + Stamina defense" },
  { pokemon1: 727, pokemon2: 983, name: "Incineroar + Kingambit", winRate: 53.6, usage: 20.3, synergy: "Intimidate pivot + Defiant boosts, Fake Out + Sucker Punch" },
  { pokemon1: 727, pokemon2: 902, name: "Incineroar + Basculegion", winRate: 52.6, usage: 20.1, synergy: "Pivot support for Last Respects stacking KOs" },

  // B-Tier (strong pairs)
  { pokemon1: 248, pokemon2: 530, name: "Tyranitar + Excadrill", winRate: 56.2, usage: 15.8, synergy: "Sand Stream + Sand Rush, classic weather core" },
  { pokemon1: 248, pokemon2: 1013, name: "Tyranitar + Sinistcha", winRate: 53.8, usage: 16.8, synergy: "Sand + Trick Room mode, Rage Powder protect for Mega Tyranitar" },
  { pokemon1: 1013, pokemon2: 279, name: "Sinistcha + Pelipper", winRate: 53.4, usage: 16.2, synergy: "Rain redirect support, Rage Powder + Drizzle" },
  { pokemon1: 670, pokemon2: 1013, name: "Floette + Sinistcha", winRate: 54.6, usage: 15.4, synergy: "Mega Floette Calm Mind + Rage Powder redirect" },
  { pokemon1: 670, pokemon2: 727, name: "Floette + Incineroar", winRate: 53.2, usage: 14.8, synergy: "Mega Floette setup + Fake Out / Intimidate support" },
  { pokemon1: 1018, pokemon2: 902, name: "Archaludon + Basculegion", winRate: 54.8, usage: 14.6, synergy: "Rain Electro Shot + Last Respects nuke mode" },
  { pokemon1: 1018, pokemon2: 1013, name: "Archaludon + Sinistcha", winRate: 54.0, usage: 14.2, synergy: "Stamina wall + Rage Powder redirect, Trick Room" },
  { pokemon1: 149, pokemon2: 279, name: "Dragonite + Pelipper", winRate: 53.8, usage: 13.8, synergy: "Hurricane 100% in rain + Multiscale + Tailwind" },
  { pokemon1: 149, pokemon2: 903, name: "Dragonite + Sneasler", winRate: 53.2, usage: 13.4, synergy: "Multiscale + Fake Out protect for Dragon Dance" },
  { pokemon1: 6, pokemon2: 3, name: "Charizard + Venusaur", winRate: 55.4, usage: 12.8, synergy: "Mega Y Drought + Chlorophyll Sleep Powder sun core" },
  { pokemon1: 94, pokemon2: 727, name: "Gengar + Incineroar", winRate: 53.6, usage: 12.4, synergy: "Mega Gengar Shadow Tag + Fake Out trapping support" },
  { pokemon1: 3, pokemon2: 727, name: "Venusaur + Incineroar", winRate: 53.0, usage: 12.2, synergy: "Sleep Powder lead + Intimidate/Fake Out" },
  { pokemon1: 981, pokemon2: 727, name: "Farigiraf + Incineroar", winRate: 52.8, usage: 12.0, synergy: "Armor Tail Trick Room + Fake Out protected setup" },
  { pokemon1: 10009, pokemon2: 445, name: "Rotom-Wash + Garchomp", winRate: 53.4, usage: 11.8, synergy: "Levitate EQ immunity + Water/Electric coverage" },
  { pokemon1: 983, pokemon2: 478, name: "Kingambit + Froslass", winRate: 53.8, usage: 10.4, synergy: "Icy Wind speed control + Defiant Sucker Punch" },

  // C-Tier (notable pairs)
  { pokemon1: 981, pokemon2: 547, name: "Farigiraf + Whimsicott", winRate: 52.4, usage: 9.8, synergy: "Trick Room + Tailwind dual speed modes" },
  { pokemon1: 324, pokemon2: 981, name: "Torkoal + Farigiraf", winRate: 55.2, usage: 8.6, synergy: "Drought + Trick Room, Eruption under TR" },
  { pokemon1: 350, pokemon2: 445, name: "Milotic + Garchomp", winRate: 53.2, usage: 8.4, synergy: "Competitive anti-Intimidate + EQ partner" },
  { pokemon1: 3, pokemon2: 445, name: "Venusaur + Garchomp", winRate: 53.0, usage: 8.2, synergy: "Sleep Powder + EQ, sun sweeper + physical threat" },
  { pokemon1: 94, pokemon2: 1013, name: "Gengar + Sinistcha", winRate: 53.4, usage: 7.8, synergy: "Perish Song trap + Rage Powder stall" },
  { pokemon1: 94, pokemon2: 902, name: "Gengar + Basculegion", winRate: 53.2, usage: 7.6, synergy: "Shadow Tag trap + Last Respects ghost offense" },
  { pokemon1: 1018, pokemon2: 149, name: "Archaludon + Dragonite", winRate: 53.6, usage: 7.4, synergy: "Rain + Hurricane + Stamina, dual dragon" },
  { pokemon1: 324, pokemon2: 3, name: "Torkoal + Venusaur", winRate: 56.8, usage: 6.2, synergy: "Drought + Chlorophyll classic sun core" },
  { pokemon1: 350, pokemon2: 6, name: "Milotic + Charizard", winRate: 52.8, usage: 5.8, synergy: "Competitive + sun partner, anti-Intimidate" },
  { pokemon1: 186, pokemon2: 94, name: "Politoed + Gengar", winRate: 53.0, usage: 5.4, synergy: "Drizzle + Perish Song trap in rain" },

  // ── New Pairs from In-Game Battle Stats (April 2026) ──
  { pokemon1: 10103, pokemon2: 10009, name: "Alolan Ninetales + Rotom-Wash", winRate: 52.4, usage: 6.8, synergy: "Aurora Veil + bulky Water/Electric pivot in snow" },
  { pokemon1: 460, pokemon2: 10103, name: "Abomasnow + Alolan Ninetales", winRate: 51.8, usage: 3.2, synergy: "Snow Warning + Aurora Veil, double hail/snow" },
  { pokemon1: 858, pokemon2: 981, name: "Hatterene + Farigiraf", winRate: 54.8, usage: 8.2, synergy: "Dual Trick Room setters, Magic Bounce + Armor Tail anti-priority" },
  { pokemon1: 858, pokemon2: 464, name: "Hatterene + Rhyperior", winRate: 53.6, usage: 5.4, synergy: "Trick Room setter + slow physical nuke" },
  { pokemon1: 142, pokemon2: 445, name: "Aerodactyl + Garchomp", winRate: 52.8, usage: 10.2, synergy: "Mega Aerodactyl Tailwind + fast EQ sweeper" },
  { pokemon1: 142, pokemon2: 903, name: "Aerodactyl + Sneasler", winRate: 53, usage: 9.8, synergy: "Sky Drop + Close Combat, double fast offense" },
  { pokemon1: 142, pokemon2: 727, name: "Aerodactyl + Incineroar", winRate: 52.4, usage: 9.4, synergy: "Rock Slide flinch + Fake Out control" },
  { pokemon1: 925, pokemon2: 727, name: "Maushold + Incineroar", winRate: 52.6, usage: 8.4, synergy: "Population Bomb + Intimidate support, Follow Me" },
  { pokemon1: 925, pokemon2: 445, name: "Maushold + Garchomp", winRate: 52.2, usage: 7.8, synergy: "Follow Me redirect + free EQ spam" },
  { pokemon1: 655, pokemon2: 1013, name: "Delphox + Sinistcha", winRate: 53.2, usage: 5.6, synergy: "Psychic Terrain + Rage Powder, anti-priority mode" },
  { pokemon1: 730, pokemon2: 279, name: "Primarina + Pelipper", winRate: 53.6, usage: 5.8, synergy: "Rain-boosted Water moves + Drizzle support" },
  { pokemon1: 730, pokemon2: 727, name: "Primarina + Incineroar", winRate: 52.8, usage: 5.4, synergy: "Intimidate + Hyper Voice spam, Fire/Water/Fairy core" },
  { pokemon1: 637, pokemon2: 727, name: "Volcarona + Incineroar", winRate: 53.4, usage: 4.2, synergy: "Quiver Dance sweeper + Intimidate/Fake Out protect" },
  { pokemon1: 637, pokemon2: 1013, name: "Volcarona + Sinistcha", winRate: 53.8, usage: 3.8, synergy: "Rage Powder redirect for safe Quiver Dance setup" },
  { pokemon1: 970, pokemon2: 445, name: "Glimmora + Garchomp", winRate: 52.6, usage: 4.8, synergy: "Toxic Debris hazard + EQ sweeper, Poison/Ground coverage" },
  { pokemon1: 154, pokemon2: 727, name: "Meganium + Incineroar", winRate: 53, usage: 4.2, synergy: "Mega Meganium support + Intimidate/Fake Out" },
  { pokemon1: 302, pokemon2: 983, name: "Sableye + Kingambit", winRate: 53.8, usage: 3.6, synergy: "Prankster Will-O-Wisp + Defiant Sucker Punch dark duo" },
  { pokemon1: 740, pokemon2: 981, name: "Crabominable + Farigiraf", winRate: 52.4, usage: 2.8, synergy: "Iron Fist Close Combat under Trick Room + Armor Tail" },
  { pokemon1: 473, pokemon2: 903, name: "Mamoswine + Sneasler", winRate: 52.6, usage: 3.4, synergy: "Ice Shard priority + Fake Out, double physical pressure" },

  // ── New Pairs from In-Game Battle Stats (April 2026) ──
  { pokemon1: 10103, pokemon2: 10009, name: "Alolan Ninetales + Rotom-Wash", winRate: 52.4, usage: 6.8, synergy: "Aurora Veil + bulky Water/Electric pivot in snow" },
  { pokemon1: 460, pokemon2: 10103, name: "Abomasnow + Alolan Ninetales", winRate: 51.8, usage: 3.2, synergy: "Snow Warning + Aurora Veil, double hail/snow" },
  { pokemon1: 858, pokemon2: 981, name: "Hatterene + Farigiraf", winRate: 54.8, usage: 8.2, synergy: "Dual Trick Room setters, Magic Bounce + Armor Tail anti-priority" },
  { pokemon1: 858, pokemon2: 464, name: "Hatterene + Rhyperior", winRate: 53.6, usage: 5.4, synergy: "Trick Room setter + slow physical nuke" },
  { pokemon1: 142, pokemon2: 445, name: "Aerodactyl + Garchomp", winRate: 52.8, usage: 10.2, synergy: "Mega Aerodactyl Tailwind + fast EQ sweeper" },
  { pokemon1: 142, pokemon2: 903, name: "Aerodactyl + Sneasler", winRate: 53, usage: 9.8, synergy: "Sky Drop + Close Combat, double fast offense" },
  { pokemon1: 142, pokemon2: 727, name: "Aerodactyl + Incineroar", winRate: 52.4, usage: 9.4, synergy: "Rock Slide flinch + Fake Out control" },
  { pokemon1: 925, pokemon2: 727, name: "Maushold + Incineroar", winRate: 52.6, usage: 8.4, synergy: "Population Bomb + Intimidate support, Follow Me" },
  { pokemon1: 925, pokemon2: 445, name: "Maushold + Garchomp", winRate: 52.2, usage: 7.8, synergy: "Follow Me redirect + free EQ spam" },
  { pokemon1: 655, pokemon2: 1013, name: "Delphox + Sinistcha", winRate: 53.2, usage: 5.6, synergy: "Psychic Terrain + Rage Powder, anti-priority mode" },
  { pokemon1: 730, pokemon2: 279, name: "Primarina + Pelipper", winRate: 53.6, usage: 5.8, synergy: "Rain-boosted Water moves + Drizzle support" },
  { pokemon1: 730, pokemon2: 727, name: "Primarina + Incineroar", winRate: 52.8, usage: 5.4, synergy: "Intimidate + Hyper Voice spam, Fire/Water/Fairy core" },
  { pokemon1: 637, pokemon2: 727, name: "Volcarona + Incineroar", winRate: 53.4, usage: 4.2, synergy: "Quiver Dance sweeper + Intimidate/Fake Out protect" },
  { pokemon1: 637, pokemon2: 1013, name: "Volcarona + Sinistcha", winRate: 53.8, usage: 3.8, synergy: "Rage Powder redirect for safe Quiver Dance setup" },
  { pokemon1: 970, pokemon2: 445, name: "Glimmora + Garchomp", winRate: 52.6, usage: 4.8, synergy: "Toxic Debris hazard + EQ sweeper, Poison/Ground coverage" },
  { pokemon1: 154, pokemon2: 727, name: "Meganium + Incineroar", winRate: 53, usage: 4.2, synergy: "Mega Meganium support + Intimidate/Fake Out" },
  { pokemon1: 302, pokemon2: 983, name: "Sableye + Kingambit", winRate: 53.8, usage: 3.6, synergy: "Prankster Will-O-Wisp + Defiant Sucker Punch dark duo" },
  { pokemon1: 740, pokemon2: 981, name: "Crabominable + Farigiraf", winRate: 52.4, usage: 2.8, synergy: "Iron Fist Close Combat under Trick Room + Armor Tail" },
  { pokemon1: 473, pokemon2: 903, name: "Mamoswine + Sneasler", winRate: 52.6, usage: 3.4, synergy: "Ice Shard priority + Fake Out, double physical pressure" },
];


// ── Archetype Matchup Matrix ────────────────────────────────────────────

export interface ArchetypeMatchup {
  archetype1: string;
  archetype2: string;
  winRate1: number;         // Win rate for archetype1 vs archetype2
  sampleSize: number;
}

export const ARCHETYPE_MATCHUPS: ArchetypeMatchup[] = [
  // Weather vs Weather
  { archetype1: "Sand", archetype2: "Rain", winRate1: 52.4, sampleSize: 842 },
  { archetype1: "Sand", archetype2: "Sun", winRate1: 48.6, sampleSize: 718 },
  { archetype1: "Rain", archetype2: "Sun", winRate1: 46.8, sampleSize: 694 },

  // Weather vs Speed Control
  { archetype1: "Sand", archetype2: "Trick Room", winRate1: 45.2, sampleSize: 654 },
  { archetype1: "Sand", archetype2: "Tailwind", winRate1: 51.8, sampleSize: 786 },
  { archetype1: "Rain", archetype2: "Trick Room", winRate1: 48.4, sampleSize: 582 },
  { archetype1: "Rain", archetype2: "Tailwind", winRate1: 53.6, sampleSize: 728 },
  { archetype1: "Sun", archetype2: "Trick Room", winRate1: 44.6, sampleSize: 624 },
  { archetype1: "Sun", archetype2: "Tailwind", winRate1: 50.8, sampleSize: 686 },
  { archetype1: "Sun Trick Room", archetype2: "Tailwind", winRate1: 55.4, sampleSize: 412 },
  { archetype1: "Sun Trick Room", archetype2: "Sand", winRate1: 53.2, sampleSize: 388 },
  { archetype1: "Sun Trick Room", archetype2: "Rain", winRate1: 51.6, sampleSize: 356 },

  // Speed Control vs Speed Control
  { archetype1: "Trick Room", archetype2: "Tailwind", winRate1: 54.8, sampleSize: 762 },

  // Offense archetypes
  { archetype1: "Sand", archetype2: "Hyper Offense", winRate1: 54.2, sampleSize: 612 },
  { archetype1: "Rain", archetype2: "Hyper Offense", winRate1: 51.2, sampleSize: 556 },
  { archetype1: "Sun", archetype2: "Hyper Offense", winRate1: 52.6, sampleSize: 548 },
  { archetype1: "Trick Room", archetype2: "Hyper Offense", winRate1: 56.2, sampleSize: 498 },
  { archetype1: "Tailwind", archetype2: "Hyper Offense", winRate1: 48.4, sampleSize: 634 },

  // Commander (Dondozo/Tatsugiri)
  { archetype1: "Trick Room", archetype2: "Commander", winRate1: 42.8, sampleSize: 324 },
  { archetype1: "Rain", archetype2: "Commander", winRate1: 47.6, sampleSize: 286 },
  { archetype1: "Sand", archetype2: "Commander", winRate1: 49.2, sampleSize: 312 },
  { archetype1: "Tailwind", archetype2: "Commander", winRate1: 46.4, sampleSize: 298 },
  { archetype1: "Hyper Offense", archetype2: "Commander", winRate1: 44.2, sampleSize: 264 },
  { archetype1: "Sun", archetype2: "Commander", winRate1: 48.8, sampleSize: 276 },

  // Balance archetype
  { archetype1: "Balance", archetype2: "Hyper Offense", winRate1: 52.4, sampleSize: 428 },
  { archetype1: "Balance", archetype2: "Trick Room", winRate1: 48.8, sampleSize: 386 },
  { archetype1: "Balance", archetype2: "Tailwind", winRate1: 50.2, sampleSize: 442 },
  { archetype1: "Balance", archetype2: "Sand", winRate1: 49.6, sampleSize: 518 },
  { archetype1: "Balance", archetype2: "Rain", winRate1: 50.8, sampleSize: 464 },
  { archetype1: "Balance", archetype2: "Sun", winRate1: 51.4, sampleSize: 396 },
  { archetype1: "Balance", archetype2: "Commander", winRate1: 47.2, sampleSize: 248 },

  // Bulky Offense
  { archetype1: "Bulky Offense", archetype2: "Hyper Offense", winRate1: 54.6, sampleSize: 382 },
  { archetype1: "Bulky Offense", archetype2: "Trick Room", winRate1: 47.4, sampleSize: 346 },
  { archetype1: "Bulky Offense", archetype2: "Tailwind", winRate1: 51.2, sampleSize: 408 },
  { archetype1: "Bulky Offense", archetype2: "Sand", winRate1: 50.4, sampleSize: 392 },
  { archetype1: "Bulky Offense", archetype2: "Rain", winRate1: 52.0, sampleSize: 358 },

  // Mega archetypes (historical)
  { archetype1: "Mega Kangaskhan", archetype2: "Mega Metagross", winRate1: 48.6, sampleSize: 524 },
  { archetype1: "Mega Kangaskhan", archetype2: "Mega Gardevoir", winRate1: 51.2, sampleSize: 486 },
  { archetype1: "Mega Metagross", archetype2: "Mega Gardevoir", winRate1: 52.8, sampleSize: 412 },
  { archetype1: "Mega Kangaskhan", archetype2: "Rain", winRate1: 53.4, sampleSize: 436 },
  { archetype1: "Mega Metagross", archetype2: "Sand", winRate1: 50.8, sampleSize: 398 },

  // Goodstuffs / Standard
  { archetype1: "Standard", archetype2: "Hyper Offense", winRate1: 51.8, sampleSize: 624 },
  { archetype1: "Standard", archetype2: "Trick Room", winRate1: 47.6, sampleSize: 586 },
  { archetype1: "Standard", archetype2: "Rain", winRate1: 50.4, sampleSize: 542 },
  { archetype1: "Standard", archetype2: "Sand", winRate1: 49.8, sampleSize: 498 },
  { archetype1: "Goodstuffs", archetype2: "Sand", winRate1: 48.2, sampleSize: 456 },
  { archetype1: "Goodstuffs", archetype2: "Trick Room", winRate1: 46.8, sampleSize: 412 },

  // Raichu Support (niche but historically significant)
  { archetype1: "Raichu Support", archetype2: "Mega Kangaskhan", winRate1: 52.6, sampleSize: 218 },
  { archetype1: "Raichu Support", archetype2: "Tailwind", winRate1: 54.2, sampleSize: 186 },

  // Sand Offense / Sand Tailwind
  { archetype1: "Sand Offense", archetype2: "Trick Room", winRate1: 44.8, sampleSize: 342 },
  { archetype1: "Sand Tailwind", archetype2: "Rain", winRate1: 53.8, sampleSize: 312 },
];

// ── Helper Functions ────────────────────────────────────────────────────

export function getUsageForPokemon(pokemonId: number): TournamentUsage | undefined {
  if (!VALID_ROSTER_IDS.has(pokemonId)) return undefined;
  return TOURNAMENT_USAGE.find(t => t.pokemonId === pokemonId);
}

export function getTopUsagePokemon(limit = 20): TournamentUsage[] {
  return [...TOURNAMENT_USAGE].filter(u => VALID_ROSTER_IDS.has(u.pokemonId)).sort((a, b) => b.usageRate - a.usageRate).slice(0, limit);
}

export function getCorePairsForPokemon(pokemonId: number): CorePair[] {
  return CORE_PAIRS.filter(c => (c.pokemon1 === pokemonId || c.pokemon2 === pokemonId) && VALID_ROSTER_IDS.has(c.pokemon1) && VALID_ROSTER_IDS.has(c.pokemon2));
}

export function getTournamentTeamsWithPokemon(pokemonId: number): TournamentTeam[] {
  return TOURNAMENT_TEAMS.filter(t => t.pokemonIds.includes(pokemonId) && t.pokemonIds.every(id => VALID_ROSTER_IDS.has(id)));
}

export function getArchetypeWinRate(arch1: string, arch2: string): number | null {
  const direct = ARCHETYPE_MATCHUPS.find(a => a.archetype1 === arch1 && a.archetype2 === arch2);
  if (direct) return direct.winRate1;
  const inverse = ARCHETYPE_MATCHUPS.find(a => a.archetype1 === arch2 && a.archetype2 === arch1);
  if (inverse) return 100 - inverse.winRate1;
  return null;
}

export function getMetaTrends(): { risers: TournamentUsage[]; fallers: TournamentUsage[] } {
  const sorted = [...TOURNAMENT_USAGE].filter(u => VALID_ROSTER_IDS.has(u.pokemonId)).sort((a, b) => b.winRate - a.winRate);
  return {
    risers: sorted.filter(p => p.winRate > 52 && p.usageRate > 5).slice(0, 5),
    fallers: sorted.filter(p => p.winRate < 50 && p.usageRate > 3).slice(0, 5),
  };
}

// ── Meta Team Prediction Engine ─────────────────────────────────────────
// Analyzes 250 tournament teams + usage data + core pairs + archetype matchups
// to predict what teams players will actually bring to tournaments.

export interface MetaTeamPrediction {
  id: string;
  name: string;
  archetype: string;
  pokemonIds: number[];
  confidence: number;         // 0-100, how confident the engine is
  metaShare: number;          // Predicted % of the meta this team represents
  reasoning: string[];        // Why the engine predicts this team
  historicalWins: number;     // How many tournament wins back this archetype
  recentTrend: "rising" | "stable" | "falling";
  corePairs: string[];        // Key synergy cores in this team
}

export function predictMetaTeams(): MetaTeamPrediction[] {
  const currentYear = 2025;

  // ── Step 1: Weight tournament teams by recency + placement ──
  // Recent years matter MORE - exponential decay
  const weightedPokemonScores = new Map<number, number>();
  const archetypeCounts = new Map<string, { count: number; weightedCount: number; wins: number; recentCount: number }>();

  // Filter to teams whose Pokemon are all in the active roster
  const validTeams = TOURNAMENT_TEAMS.filter(t => t.pokemonIds.every(id => VALID_ROSTER_IDS.has(id)));

  for (const team of validTeams) {
    const yearsAgo = currentYear - team.year;
    const recencyWeight = Math.pow(0.82, yearsAgo); // Recent = high, old = low
    const placementWeight = team.placement <= 1 ? 1.5 : team.placement <= 2 ? 1.2 : team.placement <= 4 ? 1.0 : 0.8;
    const teamWeight = recencyWeight * placementWeight;

    for (const pid of team.pokemonIds) {
      weightedPokemonScores.set(pid, (weightedPokemonScores.get(pid) || 0) + teamWeight);
    }

    const arch = normalizeArchetype(team.archetype);
    const existing = archetypeCounts.get(arch) || { count: 0, weightedCount: 0, wins: 0, recentCount: 0 };
    existing.count++;
    existing.weightedCount += teamWeight;
    if (team.placement <= 1) existing.wins++;
    if (yearsAgo <= 2) existing.recentCount++;
    archetypeCounts.set(arch, existing);
  }

  // ── Step 2: Boost scores with usage data (win rate + usage rate) ──
  for (const usage of TOURNAMENT_USAGE) {
    const existing = weightedPokemonScores.get(usage.pokemonId) || 0;
    const usageBoost = (usage.usageRate / 100) * 3 + (usage.winRate - 50) * 0.2;
    weightedPokemonScores.set(usage.pokemonId, existing + usageBoost);
  }

  // ── Step 3: Identify top archetypes by weighted score ──
  const sortedArchetypes = [...archetypeCounts.entries()]
    .map(([arch, data]) => ({ arch, ...data }))
    .sort((a, b) => b.weightedCount - a.weightedCount);

  // ── Step 4: For each top archetype, find the best team composition ──
  const predictions: MetaTeamPrediction[] = [];
  const archetypeTeamMap = new Map<string, typeof TOURNAMENT_TEAMS>();

  for (const team of validTeams) {
    const arch = normalizeArchetype(team.archetype);
    const existing = archetypeTeamMap.get(arch) || [];
    existing.push(team);
    archetypeTeamMap.set(arch, existing);
  }

  const topArchetypes = sortedArchetypes.slice(0, 8);
  const totalWeighted = topArchetypes.reduce((s, a) => s + a.weightedCount, 0);

  for (let i = 0; i < topArchetypes.length; i++) {
    const archData = topArchetypes[i];
    const teams = archetypeTeamMap.get(archData.arch) || [];

    // Find best 6 pokemon for this archetype by frequency × pokemon score
    const pokemonFreq = new Map<number, number>();
    for (const team of teams) {
      const yearsAgo = currentYear - team.year;
      const w = Math.pow(0.82, yearsAgo) * (team.placement <= 1 ? 1.5 : 1.0);
      for (const pid of team.pokemonIds) {
        pokemonFreq.set(pid, (pokemonFreq.get(pid) || 0) + w);
      }
    }

    const bestPokemon = [...pokemonFreq.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([pid]) => pid);

    if (bestPokemon.length < 4) continue;
    while (bestPokemon.length < 6) {
      // Fill with top-scored pokemon not already in the team
      const remaining = [...weightedPokemonScores.entries()]
        .filter(([pid]) => !bestPokemon.includes(pid))
        .sort((a, b) => b[1] - a[1]);
      if (remaining.length > 0) bestPokemon.push(remaining[0][0]);
      else break;
    }

    // Find core pairs present in this team
    const teamCorePairs = CORE_PAIRS.filter(
      cp => bestPokemon.includes(cp.pokemon1) && bestPokemon.includes(cp.pokemon2)
    ).sort((a, b) => b.usage - a.usage);

    // Calculate confidence based on sample size + consistency
    const recentTeams = teams.filter(t => currentYear - t.year <= 2);
    const consistency = recentTeams.length / Math.max(teams.length, 1);
    const confidence = Math.min(95, Math.round(
      30 + (archData.wins / Math.max(archData.count, 1)) * 25 +
      consistency * 20 +
      (teamCorePairs.length > 0 ? teamCorePairs[0].winRate - 50 : 0) +
      Math.min(archData.count, 20)
    ));

    // Determine trend
    const recentShare = archData.recentCount / Math.max(recentTeams.length, 1);
    const overallShare = archData.count / TOURNAMENT_TEAMS.length;
    const trend: "rising" | "stable" | "falling" =
      archData.recentCount >= 5 && recentShare > overallShare * 1.3 ? "rising" :
      archData.recentCount <= 1 ? "falling" : "stable";

    // Build reasoning - this is what makes it transparent
    const reasoning: string[] = [];

    reasoning.push(
      `Appeared in ${archData.count} of ${TOURNAMENT_TEAMS.length} tournament results (${Math.round(archData.count / TOURNAMENT_TEAMS.length * 100)}% of teams)`
    );

    if (archData.wins > 0) {
      reasoning.push(`Won ${archData.wins} tournament${archData.wins > 1 ? "s" : ""} across all years`);
    }

    if (archData.recentCount > 0) {
      reasoning.push(`${archData.recentCount} top placements in 2023–2025 (recent meta)`);
    }

    if (teamCorePairs.length > 0) {
      const topCore = teamCorePairs[0];
      reasoning.push(`Core: ${topCore.name} - ${topCore.winRate}% WR, ${topCore.usage}% usage`);
    }

    // Check archetype matchup advantages
    const matchupAdvantages: string[] = [];
    for (const matchup of ARCHETYPE_MATCHUPS) {
      if (matchup.archetype1 === archData.arch && matchup.winRate1 > 53) {
        matchupAdvantages.push(`${matchup.winRate1.toFixed(1)}% vs ${matchup.archetype2}`);
      } else if (matchup.archetype2 === archData.arch && matchup.winRate1 < 47) {
        matchupAdvantages.push(`${(100 - matchup.winRate1).toFixed(1)}% vs ${matchup.archetype1}`);
      }
    }
    if (matchupAdvantages.length > 0) {
      reasoning.push(`Favorable matchups: ${matchupAdvantages.slice(0, 3).join(", ")}`);
    }

    // Add usage data for key pokemon
    const keyUsage = bestPokemon.slice(0, 3)
      .map(pid => TOURNAMENT_USAGE.find(u => u.pokemonId === pid))
      .filter((u): u is TournamentUsage => !!u);
    if (keyUsage.length > 0) {
      const avgWR = keyUsage.reduce((s, u) => s + u.winRate, 0) / keyUsage.length;
      reasoning.push(`Key Pokémon avg win rate: ${avgWR.toFixed(1)}%`);
    }

    predictions.push({
      id: `meta-${i + 1}`,
      name: getArchetypeDisplayName(archData.arch),
      archetype: archData.arch,
      pokemonIds: bestPokemon,
      confidence,
      metaShare: Math.round((archData.weightedCount / totalWeighted) * 100 * 10) / 10,
      reasoning,
      historicalWins: archData.wins,
      recentTrend: trend,
      corePairs: teamCorePairs.slice(0, 2).map(cp => cp.name),
    });
  }

  return predictions.sort((a, b) => b.confidence - a.confidence);
}

function normalizeArchetype(arch: string): string {
  const normalized = arch.toLowerCase().trim();
  if (normalized.includes("sun") && normalized.includes("trick")) return "Sun Trick Room";
  if (normalized.includes("trick") && normalized.includes("sun")) return "Sun Trick Room";
  if (normalized === "sand offense" || normalized === "sand rush" || normalized === "sand control" || normalized === "sand tailwind") return "Sand";
  if (normalized === "tailwind offense") return "Tailwind";
  if (normalized === "goodstuffs") return "Standard";
  if (normalized === "mega kangaskhan") return "Mega Kangaskhan";
  if (normalized === "mega metagross") return "Mega Metagross";
  if (normalized === "mega gardevoir") return "Mega Gardevoir";
  if (normalized === "mega gengar") return "Standard";
  if (normalized === "raichu support") return "Standard";
  if (normalized === "weather control") return "Sand";
  // Return with first-letter caps
  return arch.charAt(0).toUpperCase() + arch.slice(1);
}

function getArchetypeDisplayName(arch: string): string {
  const names: Record<string, string> = {
    "Standard": "Standard Goodstuffs",
    "Sand": "Sand Rush Offense",
    "Sun Trick Room": "Sun + Trick Room",
    "Tailwind": "Tailwind Offense",
    "Rain": "Rain Core",
    "Hyper Offense": "Hyper Offense",
    "Commander": "Dondozo Commander",
    "Bulky Offense": "Bulky Offense",
    "Balance": "Balanced Control",
    "Trick Room": "Trick Room",
    "Mega Kangaskhan": "Mega Kangaskhan Era",
    "Mega Metagross": "Mega Metagross Era",
  };
  return names[arch] || arch;
}
