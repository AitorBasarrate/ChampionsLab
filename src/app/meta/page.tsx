"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp, TrendingDown, Award, Shield, Zap, Target, Brain,
  ChevronDown, ChevronUp, X, Swords, Users, Star, Crown, Flame,
  BarChart3, ArrowRight, Sparkles, Timer, Search, Info, Filter, Trophy,
} from "lucide-react";
import { POKEMON_SEED } from "@/lib/pokemon-data";
import { TYPE_COLORS, type PokemonType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";
import { getMegaIdFromArchetype, getMegaSprite, getMegaName } from "@/lib/mega-utils";
import { LastUpdated } from "@/components/last-updated";
import { USAGE_DATA } from "@/lib/usage-data";
import {
  predictMetaTeams,
  TOURNAMENT_TEAMS,
  TOURNAMENT_USAGE,
  CORE_PAIRS,
  ARCHETYPE_MATCHUPS,
  getTopUsagePokemon,
  getMetaTrends,
  getCorePairsForPokemon,
  getTournamentTeamsWithPokemon,
  getArchetypeWinRate,
  getPrebuiltTeamsWithPokemon,
  PREBUILT_TEAMS,
  type TournamentTeam,
  type CorePair,
  type MetaTeamPrediction,
} from "@/lib/engine";
import {
  SIM_POKEMON, SIM_PAIRS, SIM_ARCHETYPES, SIM_META,
  SIM_TOTAL_BATTLES, SIM_MOVES, ANTI_META_RANKINGS, ANTI_META_TEAMS,
  CHAMPIONS_TOURNAMENT_USAGE, CHAMPIONS_TOURNAMENT_TOTAL_TEAMS, CHAMPIONS_TOURNAMENT_COUNT,
  CHAMPIONS_TOURNAMENT_TEAMS,
  type ChampionsTournamentTeam,
} from "@/lib/simulation-data";

// ── ROSTER FILTER: exclude hidden Pokemon from all meta calculations ──────
const _VALID_IDS = new Set(POKEMON_SEED.filter(p => !p.hidden).map(p => p.id));
const _VALID_NAMES = new Set(POKEMON_SEED.filter(p => !p.hidden).map(p => p.name));
// Also include mega form names like "Mega Charizard X"
for (const p of POKEMON_SEED.filter(p => !p.hidden)) {
  if (p.forms) for (const f of p.forms) if (f.isMega) _VALID_NAMES.add(f.name);
}
// Filtered tournament teams: only teams where ALL Pokemon are in the active roster
const _VALID_TOURNAMENT_TEAMS = TOURNAMENT_TEAMS.filter(t => t.pokemonIds.every(id => _VALID_IDS.has(id)));
// Champions tournament teams (from Limitless scrape)
const _VALID_CHAMPIONS_TEAMS = CHAMPIONS_TOURNAMENT_TEAMS.filter(t => t.pokemonIds.every(id => _VALID_IDS.has(id)));
// Filtered core pairs
const _VALID_CORE_PAIRS = CORE_PAIRS.filter(c => _VALID_IDS.has(c.pokemon1) && _VALID_IDS.has(c.pokemon2));
// Filtered tournament usage
const _VALID_TOURNAMENT_USAGE = TOURNAMENT_USAGE.filter(u => _VALID_IDS.has(u.pokemonId));
// Filtered prebuilt teams
const _VALID_PREBUILT_TEAMS = PREBUILT_TEAMS.filter(t => t.pokemonIds.every(id => _VALID_IDS.has(id)));

// ── HYBRID TIER CALCULATION (ML + Tournament Data) ────────────────────────
// Thresholds from ML data only (keeps percentiles stable). Individual Pokemon
// get a composite score blending ML + tournament, which is compared against
// these ML-only cutoffs - so tournament data acts as a pure positive adjustment.
const _tournamentMap = new Map(TOURNAMENT_USAGE.filter(u => _VALID_IDS.has(u.pokemonId)).map(u => [u.pokemonId, u]));
function _getCompositeWR(simEntry: (typeof SIM_POKEMON)[keyof typeof SIM_POKEMON]): number {
  const t = _tournamentMap.get(simEntry.id);
  if (!t) return simEntry.winRate;
  // Blend 60% ML + 40% tournament WR, plus moderate top-cut bonus
  return simEntry.winRate * 0.6 + t.winRate * 0.4 + (t.topCutRate ?? 0) * 0.15;
}

// Percentile thresholds computed from COMPOSITE win-rates to keep distribution stable
const _qualifiedCWRs = Object.values(SIM_POKEMON)
  .filter(p => p.appearances >= 500 && _VALID_IDS.has(p.id))
  .map(p => _getCompositeWR(p))
  .sort((a, b) => b - a);
const _qLen = _qualifiedCWRs.length;
const TIER_S = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.05))] ?? 55;  // Top 5%
const TIER_A = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.25))] ?? 51;  // Top 25%
const TIER_B = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.65))] ?? 46;  // Top 65%
const TIER_C = _qualifiedCWRs[Math.max(0, Math.floor(_qLen * 0.88))] ?? 40;  // Top 88%

const TIER_ORDER = { S: 0, A: 1, B: 2, C: 3, D: 4 } as const;
const TIERS_BY_ORDER = ["S", "A", "B", "C", "D"] as const;

function getMLTier(compositeWR: number, games: number, pokemonId?: number): "S" | "A" | "B" | "C" | "D" {
  let baseTier: "S" | "A" | "B" | "C" | "D" = "D";
  if (games >= 500) {
    if (compositeWR >= TIER_S) baseTier = "S";
    else if (compositeWR >= TIER_A) baseTier = "A";
    else if (compositeWR >= TIER_B) baseTier = "B";
    else if (compositeWR >= TIER_C) baseTier = "C";
  }
  // Tournament performance floor: proven tournament success can lift a tier
  if (pokemonId != null) {
    const t = _tournamentMap.get(pokemonId);
    if (t) {
      let floor: "S" | "A" | "B" | "C" | "D" = "D";
      if (t.winRate >= 54 && t.topCutRate >= 10) floor = "S";
      else if (t.winRate >= 51 && t.topCutRate >= 5) floor = "A";
      else if (t.winRate >= 49 && t.topCutRate >= 2) floor = "B";
      if (TIER_ORDER[floor] < TIER_ORDER[baseTier]) baseTier = floor;
    }
  }
  return baseTier;
}

// ── ML SIMULATION RESULTS - derived from simulation-data.ts + tournament ──
const ML_POKEMON_RANKINGS = Object.values(SIM_POKEMON)
  .filter(p => _VALID_IDS.has(p.id))
  .sort((a, b) => b.elo - a.elo)
  .map(p => {
    const cwr = _getCompositeWR(p);
    return { name: p.name, elo: p.elo, wr: p.winRate, compositeWR: cwr, games: p.appearances, tier: getMLTier(cwr, p.appearances, p.id) };
  });

const ML_BEST_CORES = SIM_PAIRS
  .filter(p => _VALID_NAMES.has(p.pokemon1) && _VALID_NAMES.has(p.pokemon2))
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 20)
  .map(p => ({ pair: `${p.pokemon1} + ${p.pokemon2}`, wr: p.winRate, games: p.games }));

const ML_ARCHETYPES = SIM_ARCHETYPES
  .sort((a, b) => b.elo - a.elo)
  .map(a => ({ name: a.name, elo: a.elo, wr: a.winRate }));

const ML_INSIGHTS: { type: "meta" | "synergy" | "counter" | "pokemon"; text: string; confidence: number }[] = (() => {
  const insights: { type: "meta" | "synergy" | "counter" | "pokemon"; text: string; confidence: number }[] = [];
  if (ML_POKEMON_RANKINGS.length >= 3) {
    insights.push({ type: "meta", text: `Top meta threats: ${ML_POKEMON_RANKINGS.slice(0, 3).map(p => `${p.name} (${p.wr}% WR, ${p.elo.toLocaleString()} ELO)`).join(", ")}`, confidence: 95 });
  }
  if (ML_BEST_CORES.length >= 3) {
    insights.push({ type: "synergy", text: `Strongest cores: ${ML_BEST_CORES.slice(0, 4).map(c => `${c.pair} (${c.wr}%)`).join(", ")}`, confidence: 90 });
  }
  const megaPokemon = ML_POKEMON_RANKINGS.filter(p => p.name.includes("Mega "));
  if (megaPokemon.length > 0) {
    insights.push({ type: "pokemon", text: `Top Mega Pokémon: ${megaPokemon.slice(0, 5).map(p => `${p.name} (${p.wr}% WR)`).join(", ")}`, confidence: 85 });
  }
  const overrated = ML_POKEMON_RANKINGS.filter(p => p.games > 1000 && p.wr < 45).sort((a, b) => a.wr - b.wr).slice(0, 4);
  if (overrated.length > 0) {
    insights.push({ type: "pokemon", text: `Overrated Pokémon (high usage, low WR): ${overrated.map(p => `${p.name} (${p.wr}%)`).join(", ")}`, confidence: 80 });
  }
  if (ML_ARCHETYPES.length >= 3) {
    insights.push({ type: "meta", text: `Best archetypes: ${ML_ARCHETYPES.slice(0, 3).map(a => `${a.name} (${a.wr}% WR)`).join(", ")}`, confidence: 85 });
  }
  return insights;
})();

// Best moves derived from simulation data
const ML_BEST_MOVES = SIM_MOVES
  .sort((a, b) => b.winRate - a.winRate)
  .slice(0, 15)
  .map(m => ({ name: m.name, wr: m.winRate, uses: m.appearances }));

function getPokemonByName(name: string) {
  // Direct match first
  const direct = POKEMON_SEED.find(p => p.name === name);
  if (direct) return direct;
  // Match by showdownName (e.g. "Rotom-Wash" → "Wash Rotom")
  const byShowdown = POKEMON_SEED.find(p => p.showdownName === name);
  if (byShowdown) return byShowdown;
  // Handle mega names: "Mega Greninja" → look up "Greninja"
  if (name.startsWith("Mega ")) {
    const baseName = name.replace(/^Mega /, "").replace(/ [XYZ]$/, "");
    return POKEMON_SEED.find(p => p.name === baseName);
  }
  // Handle gendered forms: "Basculegion" → "Basculegion-M", "Indeedee" → "Indeedee-M", etc.
  const maleForm = POKEMON_SEED.find(p => p.name === `${name}-M`);
  if (maleForm) return maleForm;
  return undefined;
}

/** Get the correct sprite URL for a pokemon, handling mega forms */
function getSpriteForName(name: string): string | null {
  const pokemon = getPokemonByName(name);
  if (!pokemon) return null;
  if (name.startsWith("Mega ")) {
    const megaForms = pokemon.forms?.filter(f => f.isMega && !f.hidden) ?? [];
    // Match specific form variant (X, Y, Z)
    const suffix = name.match(/ ([XYZ])$/)?.[1];
    if (suffix) {
      const form = megaForms.find(f => f.name.endsWith(` ${suffix}`)) ?? megaForms[0];
      return form?.sprite ?? pokemon.sprite;
    }
    // Just "Mega Greninja" → first mega form
    return megaForms[0]?.sprite ?? pokemon.sprite;
  }
  return pokemon.sprite;
}

/** Get the types for a pokemon by name, handling mega forms */
function getTypesForName(name: string): string[] | null {
  const pokemon = getPokemonByName(name);
  if (!pokemon) return null;
  if (name.startsWith("Mega ")) {
    const megaForms = pokemon.forms?.filter(f => f.isMega && !f.hidden) ?? [];
    const suffix = name.match(/ ([XYZ])$/)?.[1];
    if (suffix) {
      const form = megaForms.find(f => f.name.endsWith(` ${suffix}`)) ?? megaForms[0];
      return form?.types ?? pokemon.types;
    }
    return megaForms[0]?.types ?? pokemon.types;
  }
  return pokemon.types;
}

type ActiveTab = "overview" | "pokemon" | "teams" | "cores" | "matchups" | "moves" | "speed";

type ModalType =
  | { kind: "pokemon"; name: string }
  | { kind: "archetype"; name: string }
  | { kind: "move"; name: string }
  | { kind: "core"; pair: string }
  | { kind: "prebuilt"; id: string }
  | { kind: "tournament-team"; id: string }
  | { kind: "anti-meta"; id: string };

export default function MetaPage() {
  const [activeTab, setActiveTabRaw] = useState<ActiveTab>("overview");
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [modal, setModalRaw] = useState<ModalType | null>(null);

  const setActiveTab = (tab: ActiveTab) => { trackEvent("tab_switch", "meta", tab); setActiveTabRaw(tab); };
  const setModal = (m: ModalType | null) => { if (m) trackEvent("open_modal", "meta", m.kind + ("name" in m ? `_${m.name}` : "pair" in m ? `_${m.pair}` : "")); setModalRaw(m); };

  const metaTeams = useMemo(() => predictMetaTeams(), []);
  const topUsage = useMemo(() => getTopUsagePokemon(40), []);
  const trends = useMemo(() => getMetaTrends(), []);

  // ── Official Usage "Show More" state ──────────────────────────
  const [showAllOfficial, setShowAllOfficial] = useState(false);

  // ── Teams tab "Show More" states ───────────────────────────────
  const [showAllTournament, setShowAllTournament] = useState(false);
  const [showAllCurated, setShowAllCurated] = useState(false);

  // ── Speed Tiers state ─────────────────────────────────────────
  const [speedSearch, setSpeedSearch] = useState("");
  const [speedTypeFilter, setSpeedTypeFilter] = useState<PokemonType | "all">("all");
  const [showMegas, setShowMegas] = useState(true);
  const [trickRoomMode, setTrickRoomMode] = useState(false);
  const [speedTailwind, setSpeedTailwind] = useState(false);
  const [speedExpandedId, setSpeedExpandedId] = useState<string | null>(null);

  // ── Speed Tiers computation ───────────────────────────────────
  const speedEntries = useMemo(() => {
    const calcSpd = (base: number, sp: number, natureMod: number) =>
      Math.floor((Math.floor(((2 * base + 31) * 50) / 100) + 5 + sp) * natureMod);
    const tw = (v: number) => Math.floor(v * 2);

    type SpeedEntry = {
      key: string; id: number; name: string; sprite: string;
      types: PokemonType[]; isMega: boolean; baseSpeed: number;
      maxPositive: number; maxNeutral: number; uninvested: number; minNegative: number;
      scarfPositive: number | null; scarfNeutral: number | null;
      tier: "S" | "A" | "B" | "C" | "D" | "-";
    };

    const tierMap = new Map(ML_POKEMON_RANKINGS.map(p => [p.name, p.tier]));
    const entries: SpeedEntry[] = [];

    for (const p of POKEMON_SEED.filter(p => !p.hidden)) {
      const maxPos = calcSpd(p.baseStats.speed, 32, 1.1);
      const maxNeu = calcSpd(p.baseStats.speed, 32, 1.0);
      const unin = calcSpd(p.baseStats.speed, 0, 1.0);
      const minNeg = calcSpd(p.baseStats.speed, 0, 0.9);

      entries.push({
        key: `base-${p.id}`, id: p.id, name: p.name, sprite: p.sprite,
        types: p.types as PokemonType[], isMega: false,
        baseSpeed: p.baseStats.speed,
        maxPositive: maxPos, maxNeutral: maxNeu, uninvested: unin, minNegative: minNeg,
        scarfPositive: Math.floor(maxPos * 1.5), scarfNeutral: Math.floor(maxNeu * 1.5),
        tier: (tierMap.get(p.name) ?? "-"),
      });

      if (p.forms) {
        for (const f of p.forms) {
          if (!f.isMega) continue;
          const mPos = calcSpd(f.baseStats.speed, 32, 1.1);
          const mNeu = calcSpd(f.baseStats.speed, 32, 1.0);
          const mUn = calcSpd(f.baseStats.speed, 0, 1.0);
          const mNeg = calcSpd(f.baseStats.speed, 0, 0.9);
          entries.push({
            key: `mega-${p.id}-${f.name}`, id: p.id, name: f.name, sprite: f.sprite,
            types: f.types as PokemonType[], isMega: true,
            baseSpeed: f.baseStats.speed,
            maxPositive: mPos, maxNeutral: mNeu, uninvested: mUn, minNegative: mNeg,
            scarfPositive: null, scarfNeutral: null,
            tier: (tierMap.get(f.name) ?? tierMap.get(p.name) ?? "-"),
          });
        }
      }
    }

    return entries;
  }, []);

  const filteredSpeedEntries = useMemo(() => {
    let filtered = speedEntries;
    if (!showMegas) filtered = filtered.filter(e => !e.isMega);
    // When showing megas, hide base forms that have a mega (avoid duplication clutter)
    // Actually keep both - competitive players need to see both forms
    if (speedSearch) {
      const q = speedSearch.toLowerCase();
      filtered = filtered.filter(e => e.name.toLowerCase().includes(q));
    }
    if (speedTypeFilter !== "all") {
      filtered = filtered.filter(e => e.types.includes(speedTypeFilter));
    }
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      const diff = b.baseSpeed - a.baseSpeed;
      if (diff !== 0) return diff;
      // Tie-break: megas first within same base speed
      return (b.isMega ? 1 : 0) - (a.isMega ? 1 : 0);
    });
    return trickRoomMode ? sorted.reverse() : sorted;
  }, [speedEntries, speedSearch, speedTypeFilter, showMegas, trickRoomMode]);

  // Pre-compute original rank for each entry (before search/type filtering)
  const speedOriginalRank = useMemo(() => {
    let base = speedEntries;
    if (!showMegas) base = base.filter(e => !e.isMega);
    const sorted = [...base].sort((a, b) => {
      const diff = b.baseSpeed - a.baseSpeed;
      if (diff !== 0) return diff;
      return (b.isMega ? 1 : 0) - (a.isMega ? 1 : 0);
    });
    const ordered = trickRoomMode ? sorted.reverse() : sorted;
    const map = new Map<string, number>();
    ordered.forEach((e, i) => map.set(e.key, i + 1));
    return map;
  }, [speedEntries, showMegas, trickRoomMode]);

  // Speed tier bracket definitions
  const SPEED_BRACKETS = trickRoomMode
    ? [
        { label: "Trick Room Sweepers", range: "< 80 Base", min: 0, max: 79, color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
        { label: "Trick Room Viable", range: "80–109 Base", min: 80, max: 109, color: "from-purple-500 to-fuchsia-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
        { label: "Awkward Speed", range: "110–139 Base", min: 110, max: 139, color: "from-gray-400 to-gray-500", bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-600" },
        { label: "Fast", range: "140–169 Base", min: 140, max: 169, color: "from-cyan-500 to-teal-500", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
        { label: "Very Fast", range: "170–199 Base", min: 170, max: 199, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
        { label: "Blazing", range: "≥ 200 Base", min: 200, max: 999, color: "from-red-500 to-rose-500", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
      ]
    : [
        { label: "Blazing", range: "≥ 200 Base", min: 200, max: 999, color: "from-red-500 to-rose-500", bg: "bg-red-50", border: "border-red-200", text: "text-red-700" },
        { label: "Very Fast", range: "170–199 Base", min: 170, max: 199, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
        { label: "Fast", range: "140–169 Base", min: 140, max: 169, color: "from-cyan-500 to-teal-500", bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
        { label: "Standard", range: "110–139 Base", min: 110, max: 139, color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
        { label: "Slow", range: "80–109 Base", min: 80, max: 109, color: "from-purple-500 to-fuchsia-500", bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
        { label: "Trick Room", range: "< 80 Base", min: 0, max: 79, color: "from-indigo-500 to-purple-500", bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700" },
      ];

  // Max speed value for bar scaling
  const MAX_SPEED_DISPLAY = 222; // Mega Alakazam/Aerodactyl +Nature max

  const tabs: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "teams", label: "Teams", icon: Users },
    { id: "pokemon", label: "Pokémon Rankings", icon: Crown },
    { id: "speed", label: "Speed Tiers", icon: Timer },
    { id: "cores", label: "Core Pairs", icon: Swords },
    { id: "matchups", label: "Archetype Matchups", icon: Target },
    { id: "moves", label: "Move Analysis", icon: Zap },
  ];

  return (
    <>
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Meta Analysis
            </span>
          </h1>
          <LastUpdated page="meta" />
        </div>
        <p className="text-muted-foreground mt-2 text-sm max-w-2xl">
          Usage stats, teams, and core pairs from ranked ladder data and {CHAMPIONS_TOURNAMENT_COUNT} community tournaments ({CHAMPIONS_TOURNAMENT_TOTAL_TEAMS.toLocaleString()} teams).
        </p>
        <div className="flex items-center gap-4 mt-3">
          <a href="/battle-bot" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 hover:border-amber-400 transition-colors">
            <Brain className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-xs font-bold text-amber-700">⚡ 2M+ Battle Engine</span>
          </a>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-700">{_VALID_CHAMPIONS_TEAMS.length} Tournament Results</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-50 border border-cyan-200">
            <Swords className="w-3.5 h-3.5 text-cyan-600" />
            <span className="text-xs font-medium text-cyan-700">{_VALID_CORE_PAIRS.length} Core Pairs</span>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8 overflow-visible scrollbar-hide" style={{ overflowX: "auto", overflowY: "visible" }}>
        <div className="flex gap-1 pb-1 pt-1 w-max">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap shrink-0",
              activeTab === tab.id
                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-sm shadow-emerald-200/50"
                : "glass glass-hover text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
        </div>
      </div>

      {/* ══════════ OVERVIEW TAB ══════════ */}
      {activeTab === "overview" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">

          {/* ═══ 1. REAL USAGE DATA (Hero Section) ═══ */}
          <div className="glass rounded-2xl p-6 border-2 border-amber-300/80 bg-gradient-to-br from-amber-50/60 via-white to-yellow-50/60 shadow-lg shadow-amber-100/50">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <Crown className="w-6 h-6 text-amber-500" /> Pokémon Champions Usage Rankings
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-100 text-amber-700 border border-amber-200">Real Game Data</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Live usage data from Pokémon Champions ranked doubles ladder and community tournaments. These are the Pokémon real players are picking right now.
            </p>
            <div className="space-y-1.5">
              {_VALID_TOURNAMENT_USAGE
                .sort((a, b) => b.usageRate - a.usageRate)
                .slice(0, 20).map((p, i) => {
                const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                const maxUsage = _VALID_TOURNAMENT_USAGE.sort((a, b) => b.usageRate - a.usageRate)[0]?.usageRate || 53;
                return (
                  <div key={p.pokemonId} className="flex items-center gap-2 group cursor-pointer" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                    <span className={cn("text-xs font-bold w-6 text-center rounded py-0.5", i < 3 ? "bg-amber-100 text-amber-700" : i < 10 ? "bg-gray-100 text-gray-700" : "text-muted-foreground")}>{i + 1}</span>
                    {pokemon && <Image src={pokemon.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                    <span className="text-xs font-semibold w-28 truncate">{p.name}</span>
                    {pokemon && <div className="flex gap-0.5">{pokemon.types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t.slice(0, 3)}</span>)}</div>}
                    <div className="flex-1 relative h-5 bg-gray-100 rounded overflow-hidden">
                      <div className={cn("absolute inset-y-0 left-0 rounded opacity-80 group-hover:opacity-100 transition-opacity", i < 3 ? "bg-gradient-to-r from-amber-400 to-orange-400" : i < 10 ? "bg-gradient-to-r from-orange-300 to-red-300" : "bg-gradient-to-r from-gray-300 to-gray-400")} style={{ width: `${(p.usageRate / maxUsage) * 100}%` }} />
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-[10px] font-bold text-white drop-shadow-sm">{p.usageRate}%</span>
                      </div>
                    </div>
                    <span className={cn("text-[10px] font-bold w-12 text-right", p.winRate >= 53 ? "text-green-600" : p.winRate >= 50 ? "text-gray-700" : "text-red-600")}>{p.winRate}% WR</span>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveTab("pokemon")} className="mt-4 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
              View full {_VALID_TOURNAMENT_USAGE.length} Pokémon rankings <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 2. TOURNAMENT TEAMS (Real Results) ═══ */}
          <div className="glass rounded-2xl p-6 border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/30">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" /> Tournament Winning Teams
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-100 text-amber-700 border border-amber-200">{_VALID_CHAMPIONS_TEAMS.length} Real Teams</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Top-placing teams from Pokémon Champions community tournaments. Click any team for full breakdown with sets.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[..._VALID_CHAMPIONS_TEAMS].sort((a, b) => a.placement - b.placement || b.players - a.players).slice(0, 8).map(team => {
                const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
                return (
                  <div key={team.id} className="p-4 rounded-xl border hover:shadow-md transition-all cursor-pointer bg-white/60 border-amber-200/60 hover:border-amber-300" onClick={() => setModal({ kind: "tournament-team", id: team.id })}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", team.placement === 1 ? "bg-amber-100 text-amber-700" : team.placement === 2 ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600")}>
                        {team.placement === 1 ? "🥇" : team.placement === 2 ? "🥈" : `#${team.placement}`}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{team.player}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{team.tournament}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-emerald-600">{team.wins}W-{team.losses}L</span>
                        <p className="text-[9px] text-muted-foreground">{team.players} players</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {teamPokemon.map(p => (
                        <div key={p.id} className="flex flex-col items-center">
                          <Image src={p.sprite} alt={p.name} width={30} height={30} className="rounded" unoptimized />
                          <span className="text-[7px] truncate w-10 text-center text-muted-foreground">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <button onClick={() => setActiveTab("teams")} className="mt-4 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
              View all {_VALID_CHAMPIONS_TEAMS.length} tournament teams <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* ═══ 3. TOURNAMENT CORE PAIRS + TYPE DISTRIBUTION (2-col real data) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tournament Core Pairs */}
            <div className="glass rounded-2xl p-5 border border-amber-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" /> Tournament Core Pairs
              </h3>
              <div className="space-y-2">
                {_VALID_CORE_PAIRS
                  .sort((a, b) => b.winRate - a.winRate).slice(0, 6).map(cp => {
                  const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                  const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                  return (
                    <div key={cp.name} className="p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 cursor-pointer hover:border-amber-300 transition-colors" onClick={() => setModal({ kind: "core", pair: cp.name })}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {p1 && <Image src={p1.sprite} alt={p1.name} width={24} height={24} className="rounded" unoptimized />}
                          <span className="text-[10px] text-muted-foreground">+</span>
                          {p2 && <Image src={p2.sprite} alt={p2.name} width={24} height={24} className="rounded" unoptimized />}
                          <span className="text-xs font-semibold">{cp.name}</span>
                        </div>
                        <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{cp.usage}% usage · {cp.synergy}</p>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setActiveTab("cores")} className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                View all {_VALID_CORE_PAIRS.length} core pairs <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Type Distribution (real data) */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 text-emerald-500" /> Meta Type Distribution
              </h3>
              {(() => {
                const typeCounts: Record<string, { count: number; totalWr: number }> = {};
                topUsage.slice(0, 30).forEach(u => {
                  const pkm = POKEMON_SEED.find(p => p.id === u.pokemonId);
                  if (pkm) pkm.types.forEach(t => {
                    if (!typeCounts[t]) typeCounts[t] = { count: 0, totalWr: 0 };
                    typeCounts[t].count++;
                    typeCounts[t].totalWr += u.winRate;
                  });
                });
                const sorted = Object.entries(typeCounts).sort((a, b) => b[1].count - a[1].count);
                const maxCount = sorted[0]?.[1].count || 1;
                return (
                  <div className="grid grid-cols-3 gap-2">
                    {sorted.slice(0, 12).map(([type, data]) => (
                      <div key={type} className="p-2 rounded-xl border border-gray-200 text-center" style={{ backgroundColor: `${TYPE_COLORS[type as PokemonType]}10` }}>
                        <div className="w-6 h-6 rounded-md mx-auto mb-0.5 flex items-center justify-center text-white text-[8px] font-bold uppercase" style={{ backgroundColor: TYPE_COLORS[type as PokemonType] }}>{type.slice(0, 3)}</div>
                        <p className="text-[10px] font-bold capitalize">{type}</p>
                        <p className="text-sm font-extrabold">{data.count}</p>
                        <p className={cn("text-[9px] font-medium", (data.totalWr / data.count) >= 52 ? "text-green-600" : "text-gray-500")}>
                          {(data.totalWr / data.count).toFixed(1)}% WR
                        </p>
                        <div className="mt-0.5 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${(data.count / maxCount) * 100}%`, backgroundColor: TYPE_COLORS[type as PokemonType] }} />
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* ═══ 3b. ARCHETYPES + CURATED TEAMS (2-col) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Archetype Rankings */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-500" /> Archetype Rankings
              </h3>
              <div className="space-y-2">
                {ML_ARCHETYPES.slice(0, 8).map((a, i) => (
                  <div key={a.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all" onClick={() => setModal({ kind: "archetype", name: a.name })}>
                    <span className={cn("w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center", i < 2 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{i + 1}</span>
                    <span className="text-xs font-semibold flex-1">{a.name}</span>
                    <div className="w-20 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", a.wr >= 60 ? "bg-green-400" : a.wr >= 52 ? "bg-emerald-400" : "bg-gray-400")} style={{ width: `${a.wr}%` }} />
                    </div>
                    <span className={cn("text-xs font-bold w-10 text-right", a.wr >= 60 ? "text-green-600" : a.wr >= 52 ? "text-emerald-600" : "text-gray-700")}>{a.wr}%</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("matchups")} className="mt-3 text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                View matchup details <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Curated Teams */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> Curated Teams
              </h3>
              <div className="space-y-2">
                {_VALID_PREBUILT_TEAMS.slice(0, 5).map(team => (
                  <div key={team.id} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all" onClick={() => setModal({ kind: "prebuilt", id: team.id })}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded uppercase", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}</span>
                      <span className="text-xs font-semibold truncate flex-1">{team.name}</span>
                      <span className="text-[9px] text-muted-foreground capitalize">{team.archetype}</span>
                    </div>
                    <div className="flex gap-1">
                      {team.pokemonIds.map(id => {
                        const p = POKEMON_SEED.find(pk => pk.id === id);
                        return p ? <Image key={id} src={p.sprite} alt={p.name} width={24} height={24} className="rounded" unoptimized /> : null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("teams")} className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                View all teams <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* ═══ 4. COUNTER MATCHUPS + KEY MOVES (2-col) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Counter Matchups */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" /> Key Counter Matchups
              </h3>
              <div className="space-y-2">
                {(() => { const filtered = ARCHETYPE_MATCHUPS.filter(m => Math.abs(m.winRate1 - 50) >= 3).sort((a, b) => Math.abs(b.winRate1 - 50) - Math.abs(a.winRate1 - 50)).slice(0, 6); return filtered.length > 0 ? filtered : ARCHETYPE_MATCHUPS.sort((a, b) => Math.abs(b.winRate1 - 50) - Math.abs(a.winRate1 - 50)).slice(0, 6); })().map((m, i) => {
                  const dominant = m.winRate1 >= 55;
                  const winner = dominant ? m.archetype1 : m.archetype2;
                  const loser = dominant ? m.archetype2 : m.archetype1;
                  const wr = dominant ? m.winRate1 : 100 - m.winRate1;
                  return (
                    <div key={i} className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:shadow-md transition-all" onClick={() => setModal({ kind: "archetype", name: winner })}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-green-600">{winner}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs font-bold text-red-600">{loser}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className={cn("h-full rounded-full", wr >= 65 ? "bg-green-400" : "bg-emerald-400")} style={{ width: `${wr}%` }} />
                        </div>
                        <span className="text-xs font-bold text-green-600">{wr.toFixed(0)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setActiveTab("matchups")} className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View full matchup matrix <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Top Moves */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> Highest Win-Rate Moves
              </h3>
              <div className="space-y-2">
                {ML_BEST_MOVES.slice(0, 8).map((m, i) => (
                  <div key={m.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "move", name: m.name })}>
                    <span className={cn("w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center", i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{i + 1}</span>
                    <span className="text-xs font-semibold flex-1">{m.name}</span>
                    <span className={cn("text-xs font-bold", m.wr >= 65 ? "text-green-600" : m.wr >= 60 ? "text-emerald-600" : "text-gray-700")}>{m.wr}%</span>
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${m.wr}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("moves")} className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1">
                View all move analysis <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* ═══ 5. META TRENDS (2-col) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-5 border border-emerald-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Rising in the Meta
              </h3>
              <div className="space-y-2">
                {trends.risers.map(p => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                  return (
                    <div key={p.pokemonId} className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50/50 border border-emerald-100 cursor-pointer hover:bg-emerald-100/50 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.usageRate}% usage</p>
                      </div>
                      <span className="text-xs font-bold text-emerald-600">{p.winRate}%</span>
                      <TrendingUp className="w-3 h-3 text-emerald-500" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass rounded-2xl p-5 border border-red-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" /> Falling in the Meta
              </h3>
              <div className="space-y-2">
                {trends.fallers.length > 0 ? trends.fallers.map(p => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                  return (
                    <div key={p.pokemonId} className="flex items-center gap-2 p-2 rounded-lg bg-red-50/50 border border-red-100 cursor-pointer hover:bg-red-100/50 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.usageRate}% usage</p>
                      </div>
                      <span className="text-xs font-bold text-red-600">{p.winRate}%</span>
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    </div>
                  );
                }) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-3">
                      <TrendingDown className="w-6 h-6 text-red-300" />
                    </div>
                    <p className="text-sm font-semibold text-muted-foreground">No Pokémon falling</p>
                    <p className="text-[10px] text-muted-foreground mt-1">The meta is stable — all used Pokémon are above 50% win rate</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ═══ 6. ML ENGINE ANALYSIS (2-col: Predictions + Insights) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ML Predicted Meta Teams */}
            <div className="glass rounded-2xl p-5 border border-emerald-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" /> Engine Predicted Meta
                <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-100 text-emerald-700">ML</span>
              </h3>
              <p className="text-[10px] text-muted-foreground mb-3">Teams predicted from 2M simulated battles + tournament data</p>
              <div className="space-y-2">
                {metaTeams.slice(0, 4).map(meta => (
                  <div key={meta.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 cursor-pointer hover:border-emerald-300 hover:shadow-sm transition-all" onClick={() => setExpandedTeam(expandedTeam === meta.id ? null : meta.id)}>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", meta.confidence >= 80 ? "bg-emerald-100 text-emerald-700" : meta.confidence >= 60 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{meta.confidence}%</span>
                        <span className="text-xs font-semibold">{meta.name}</span>
                      </div>
                      <span className="text-[9px] text-muted-foreground">{meta.metaShare}% share</span>
                    </div>
                    <div className="flex gap-1">
                      {meta.pokemonIds.map(id => { const p = POKEMON_SEED.find(pk => pk.id === id); return p ? <Image key={id} src={p.sprite} alt={p.name} width={24} height={24} className="rounded" unoptimized /> : null; })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ML Insights + Engine Stats */}
            <div className="space-y-4">
              <div className="glass rounded-2xl p-5 border border-emerald-200/60">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-emerald-500" /> ML Engine Insights
                  <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-100 text-emerald-700">ML</span>
                </h3>
                <div className="space-y-2">
                  {ML_INSIGHTS.slice(0, 4).map((insight, i) => (
                    <div key={i} className={cn(
                      "p-2.5 rounded-xl border flex items-start gap-2",
                      insight.type === "meta" || insight.type === "synergy" ? "bg-emerald-50/50 border-emerald-100" :
                      insight.type === "counter" ? "bg-amber-50/50 border-amber-100" : "bg-cyan-50/50 border-cyan-100"
                    )}>
                      <span className={cn(
                        "px-1.5 py-0.5 text-[8px] font-bold uppercase rounded flex-shrink-0",
                        insight.type === "meta" || insight.type === "synergy" ? "bg-emerald-100 text-emerald-700" :
                        insight.type === "counter" ? "bg-amber-100 text-amber-700" : "bg-cyan-100 text-cyan-700"
                      )}>{insight.type}</span>
                      <p className="text-[11px] text-foreground flex-1 leading-snug">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engine Quality compact */}
              <div className="glass rounded-2xl p-4 border border-emerald-200/60 bg-gradient-to-r from-emerald-50/30 to-cyan-50/30">
                <h3 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-emerald-500" /> Battle Engine Quality
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-emerald-700">10.7</p>
                    <p className="text-[8px] text-muted-foreground">Turns/Battle</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-cyan-700">23.1%</p>
                    <p className="text-[8px] text-muted-foreground">Protect Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-emerald-700">8.7%</p>
                    <p className="text-[8px] text-muted-foreground">Switch Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-extrabold text-amber-700">98.1%</p>
                    <p className="text-[8px] text-muted-foreground">Move Coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══ 7. ML DEEP DIVE (2-col: Rankings + Cores) ═══ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ML Pokemon Rankings */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-red-500" /> Top ML Threats
                <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-100 text-emerald-700">ML</span>
              </h3>
              <div className="space-y-2">
                {ML_POKEMON_RANKINGS.slice(0, 8).map((p, i) => {
                  const sprite = getSpriteForName(p.name);
                  const usageData = getPokemonByName(p.name) ? _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === getPokemonByName(p.name)!.id) : null;
                  return (
                    <div key={p.name} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                      <span className={cn("w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center", i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{i + 1}</span>
                      {sprite && <Image src={sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{p.name}</p>
                        <p className="text-[9px] text-muted-foreground">{p.elo.toLocaleString()} ELO{usageData ? ` · ${usageData.usageRate}% real usage` : ""}</p>
                      </div>
                      <span className={cn("text-xs font-bold", p.wr >= 55 ? "text-green-600" : p.wr >= 50 ? "text-emerald-600" : "text-amber-600")}>{p.wr}%</span>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setActiveTab("pokemon")} className="mt-3 text-xs text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1">
                View all rankings <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* ML Cores */}
            <div className="glass rounded-2xl p-5 border border-gray-200/60">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Swords className="w-4 h-4 text-cyan-500" /> ML-Discovered Cores
                <span className="px-1.5 py-0.5 text-[8px] font-bold rounded bg-emerald-100 text-emerald-700">ML</span>
              </h3>
              <div className="space-y-2">
                {ML_BEST_CORES.slice(0, 6).map(c => (
                  <div key={c.pair} className="p-2.5 rounded-xl bg-emerald-50/30 border border-emerald-100 cursor-pointer hover:border-emerald-300 transition-colors" onClick={() => setModal({ kind: "core", pair: c.pair })}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {c.pair.split(" + ").map(name => {
                          const sp = getSpriteForName(name);
                          return sp ? <Image key={name} src={sp} alt={name} width={24} height={24} className="rounded" unoptimized /> : <span key={name} className="text-xs">{name}</span>;
                        })}
                        <span className="text-xs font-semibold">{c.pair}</span>
                      </div>
                      <span className="text-xs font-bold text-green-600">{c.wr}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{c.games.toLocaleString()} games</p>
                  </div>
                ))}
              </div>
              <button onClick={() => setActiveTab("cores")} className="mt-3 text-xs text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                View all cores <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>



        </motion.div>
      )}

      {/* ══════════ POKEMON RANKINGS TAB ══════════ */}
      {activeTab === "pokemon" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* ═══ 1. CHAMPIONS OFFICIAL USAGE STATS ═══ */}
          <div className="glass rounded-2xl p-6 border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-yellow-50/40 shadow-lg shadow-amber-100/30">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" /> Pokémon Champions Official Usage Stats
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-100 text-amber-700 border border-amber-200">In-Game Ranked Data</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">
              Real usage data from Nintendo&apos;s Champions Ranked Doubles ladder (April 2026). Rankings reflect actual player pick rates across all skill brackets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {_VALID_TOURNAMENT_USAGE
                .sort((a, b) => b.usageRate - a.usageRate)
                .slice(0, showAllOfficial ? 207 : 15)
                .map((p, i) => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.pokemonId);
                  const maxUsage = _VALID_TOURNAMENT_USAGE[0]?.usageRate ?? 53;
                  return (
                    <div
                      key={p.pokemonId}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                        i < 5 ? "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 hover:border-amber-300" :
                        i < 15 ? "bg-gray-50/80 border border-gray-100 hover:border-gray-200" :
                        "bg-gray-50/50 hover:bg-gray-100/80"
                      )}
                      onClick={() => setModal({ kind: "pokemon", name: p.name })}
                    >
                      <span className={cn(
                        "text-sm font-extrabold w-7 text-center tabular-nums",
                        i < 3 ? "text-amber-600" : i < 10 ? "text-gray-600" : "text-gray-400"
                      )}>{i + 1}</span>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={36} height={36} className="drop-shadow-sm" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">{p.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${Math.min(100, (p.usageRate / maxUsage) * 100)}%` }} />
                          </div>
                          <span className="text-xs font-bold text-amber-700 tabular-nums shrink-0">{p.usageRate}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {!showAllOfficial && (
              <button
                onClick={() => setShowAllOfficial(true)}
                className="mt-4 w-full py-2.5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 text-sm font-bold hover:border-amber-300 hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                Show All {_VALID_TOURNAMENT_USAGE.length} Pokémon <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {showAllOfficial && (
              <button
                onClick={() => setShowAllOfficial(false)}
                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                Show Less <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ═══ 2. CHAMPIONS OFFICIAL & COMMUNITY TOURNAMENT USAGE ═══ */}
          <div className="glass rounded-2xl p-6 border border-indigo-200/60 bg-gradient-to-br from-indigo-50/30 via-white to-violet-50/30">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-indigo-500" /> Champions Official & Community Tournament Usage
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                {CHAMPIONS_TOURNAMENT_TOTAL_TEAMS.toLocaleString()} Teams · {CHAMPIONS_TOURNAMENT_COUNT} Tournaments
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Real team data from {CHAMPIONS_TOURNAMENT_COUNT} official & community Pokémon Champions tournaments on Limitless (April 2026). Shows actual competitive pick rates and top-8 conversion.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {CHAMPIONS_TOURNAMENT_USAGE.slice(0, 30).map((p, i) => {
                const pokemon = getPokemonByName(p.name);
                const sprite = pokemon?.sprite ?? getSpriteForName(p.name);
                const maxUsage = CHAMPIONS_TOURNAMENT_USAGE[0]?.usagePct ?? 53;
                const top8Rate = Math.round((p.top8Count / (CHAMPIONS_TOURNAMENT_COUNT * 8)) * 100);
                return (
                  <div
                    key={p.name}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl transition-colors cursor-pointer",
                      i < 5 ? "bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 hover:border-indigo-300" :
                      i < 15 ? "bg-gray-50/80 border border-gray-100 hover:border-gray-200" :
                      "bg-gray-50/50 hover:bg-gray-100/80"
                    )}
                    onClick={() => setModal({ kind: "pokemon", name: p.name })}
                  >
                    <span className={cn(
                      "text-sm font-extrabold w-7 text-center tabular-nums",
                      i < 3 ? "text-indigo-600" : i < 10 ? "text-gray-600" : "text-gray-400"
                    )}>{p.rank}</span>
                    {sprite && <Image src={sprite} alt={p.name} width={36} height={36} className="drop-shadow-sm" unoptimized />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold truncate">{p.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" style={{ width: `${Math.min(100, (p.usagePct / maxUsage) * 100)}%` }} />
                        </div>
                        <span className="text-xs font-bold text-indigo-700 tabular-nums shrink-0">{p.usagePct}%</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[10px] text-muted-foreground block">{p.count} teams</span>
                      <span className={cn("text-[10px] font-bold", top8Rate >= 50 ? "text-green-600" : top8Rate >= 30 ? "text-amber-600" : "text-gray-500")}>Top 8: {top8Rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ═══ 3. ML RANKING + ANTI-META RANKING (Side by Side) ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* ML Simulation Ranking */}
            <div className="glass rounded-2xl p-5 border border-emerald-200/60">
              <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                <Brain className="w-4 h-4 text-emerald-500" /> ML Simulation Ranking
              </h2>
              <p className="text-xs text-muted-foreground mb-3">
                ELO from {SIM_TOTAL_BATTLES.toLocaleString()} battles. Auto-updated after each engine run.
              </p>
              <div className="space-y-1.5">
                {ML_POKEMON_RANKINGS.slice(0, 15).map((p, i) => {
                  const sprite = getSpriteForName(p.name);
                  return (
                    <div
                      key={p.name}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setModal({ kind: "pokemon", name: p.name })}
                    >
                      <span className={cn("text-xs font-extrabold w-5 text-center tabular-nums", i < 3 ? "text-emerald-600" : "text-gray-400")}>{i + 1}</span>
                      {sprite && <Image src={sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold truncate block">{p.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-gray-600 tabular-nums">{p.elo.toLocaleString()}</span>
                      <span className={cn("text-xs font-bold tabular-nums", p.wr >= 55 ? "text-green-600" : p.wr >= 50 ? "text-gray-700" : "text-red-500")}>{p.wr}%</span>
                      <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded",
                        p.tier === "S" ? "bg-amber-100 text-amber-700" : p.tier === "A" ? "bg-blue-100 text-blue-700" : p.tier === "B" ? "bg-gray-100 text-gray-700" : p.tier === "C" ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-400"
                      )}>{p.tier}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Anti-Meta Ranking */}
            <div className="glass rounded-2xl p-5 border border-purple-200/60">
              <h2 className="text-base font-bold mb-1 flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" /> Anti-Meta Pokémon Ranking
              </h2>
              <p className="text-xs text-muted-foreground mb-3">
                Pokémon that counter the current meta. Scored by win rate vs top 15 threats. Auto-updated after engine runs.
              </p>
              <div className="space-y-1.5">
                {ANTI_META_RANKINGS.slice(0, 15).map((p, i) => {
                  const pokemon = POKEMON_SEED.find(pk => pk.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setModal({ kind: "pokemon", name: p.name })}
                    >
                      <span className={cn("text-xs font-extrabold w-5 text-center tabular-nums", i < 3 ? "text-purple-600" : "text-gray-400")}>{i + 1}</span>
                      {pokemon && <Image src={pokemon.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold truncate block">{p.name}</span>
                        <span className="text-[10px] text-muted-foreground">Beats: {p.bestInto.slice(0, 3).join(", ")}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={cn("text-xs font-bold tabular-nums", p.winVsMeta >= 55 ? "text-green-600" : p.winVsMeta >= 52 ? "text-emerald-600" : "text-gray-700")}>{p.winVsMeta}%</span>
                        <div className="flex items-center gap-0.5 mt-0.5">
                          <div className="w-10 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-purple-400 to-fuchsia-400" style={{ width: `${p.score}%` }} />
                          </div>
                          <span className="text-[9px] text-purple-600 font-bold">{p.score}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ TOURNAMENT TEAMS TAB ══════════ */}
      {activeTab === "teams" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* ═══ 1. CHAMPIONS TOURNAMENT TEAMS ═══ */}
          <div className="glass rounded-2xl p-6 border border-amber-200/60 bg-gradient-to-br from-amber-50/30 via-white to-yellow-50/30">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> Tournament Teams
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-amber-100 text-amber-700 border border-amber-200">
                {_VALID_CHAMPIONS_TEAMS.length} Teams
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Top teams from {CHAMPIONS_TOURNAMENT_COUNT}+ official and community Pokémon Champions tournaments. Click any team for full breakdown.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {([..._VALID_CHAMPIONS_TEAMS]
                .sort((a, b) => a.placement === b.placement ? b.players - a.players : a.placement - b.placement)
                .slice(0, showAllTournament ? undefined : 12)
              ).map(team => {
                const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                return (
                  <div
                    key={team.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-amber-100 bg-white/60 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setModal({ kind: "tournament-team", id: team.id })}
                  >
                    <div className="flex -space-x-1 shrink-0">
                      {teamPokemon.slice(0, 6).map((p, pi) => p && (
                        <Image key={pi} src={p.sprite} alt={p.name} width={28} height={28} className="drop-shadow-sm" unoptimized />
                      ))}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={cn("px-1.5 py-0.5 text-[9px] font-bold uppercase rounded", team.placement <= 1 ? "bg-amber-100 text-amber-700" : team.placement <= 2 ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-500")}>
                          {team.placement === 1 ? "🥇" : team.placement === 2 ? "🥈" : `Top ${team.placement}`}
                        </span>
                        <span className="text-xs font-semibold truncate">{team.tournament}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.5 text-[8px] rounded bg-emerald-50 text-emerald-600 font-medium">{team.wins}W-{team.losses}L</span>
                        <span className="text-[9px] text-muted-foreground">{team.player} · {team.players} players</span>
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                  </div>
                );
              })}
            </div>
            {!showAllTournament && _VALID_CHAMPIONS_TEAMS.length > 12 && (
              <button
                onClick={() => setShowAllTournament(true)}
                className="mt-4 w-full py-2.5 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 text-sm font-bold hover:border-amber-300 hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                Show All {_VALID_CHAMPIONS_TEAMS.length} Teams <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {showAllTournament && (
              <button
                onClick={() => setShowAllTournament(false)}
                className="mt-4 w-full py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
              >
                Show Less <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* ═══ 2. CURATED + ANTI-META TEAMS (Side by Side) ═══ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Left: Curated Teams */}
            <div className="glass rounded-2xl p-5 border border-emerald-200/60 bg-gradient-to-br from-emerald-50/30 via-white to-cyan-50/30">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Curated Teams
                </h2>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                  {_VALID_PREBUILT_TEAMS.length} Teams
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Hand-built competitive teams with full sets, items, and SP spreads. Ready to load into the Team Builder.
              </p>
              <div className="space-y-2">
                {_VALID_PREBUILT_TEAMS
                  .sort((a, b) => { const o = { S: 0, A: 1, B: 2 }; return (o[a.tier] ?? 3) - (o[b.tier] ?? 3); })
                  .slice(0, showAllCurated ? undefined : 10)
                  .map(team => {
                    const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                    return (
                      <div
                        key={team.id}
                        className="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-white/60 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setModal({ kind: "prebuilt", id: team.id })}
                      >
                        <div className="flex -space-x-1.5 shrink-0">
                          {teamPokemon.slice(0, 6).map((p, pi) => p && (
                            <Image key={pi} src={p.sprite} alt={p.name} width={26} height={26} className="rounded border border-white shadow-sm" unoptimized />
                          ))}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}</span>
                            <span className="text-xs font-semibold truncate">{team.name}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground truncate block">{team.archetype}</span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                      </div>
                    );
                  })}
              </div>
              {!showAllCurated && _VALID_PREBUILT_TEAMS.length > 8 && (
                <button
                  onClick={() => setShowAllCurated(true)}
                  className="mt-3 w-full py-2 rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-cyan-50 text-emerald-700 text-xs font-bold hover:border-emerald-300 hover:shadow-md transition-all flex items-center justify-center gap-2"
                >
                  Show All {_VALID_PREBUILT_TEAMS.length} Teams <ChevronDown className="w-3.5 h-3.5" />
                </button>
              )}
              {showAllCurated && (
                <button
                  onClick={() => setShowAllCurated(false)}
                  className="mt-3 w-full py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 text-xs font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                >
                  Show Less <ChevronUp className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Right: Anti-Meta Teams */}
            <div className="glass rounded-2xl p-5 border border-purple-200/60 bg-gradient-to-br from-purple-50/30 via-white to-fuchsia-50/30">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" /> Anti-Meta Teams
                </h2>
                <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                  {ANTI_META_TEAMS.length} Teams
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Counter-teams designed to beat the most common tournament strategies. Built around top anti-meta cores.
              </p>
              <div className="space-y-2">
                {ANTI_META_TEAMS.map(team => {
                  const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                  const corePokemon = team.coreIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                  return (
                    <div
                      key={team.id}
                      className="p-3 rounded-xl border border-purple-100 bg-white/60 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setModal({ kind: "anti-meta", id: team.id })}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", team.winVsMeta >= 55 ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700")}>{team.winVsMeta}% WR</span>
                        <span className="text-xs font-semibold truncate">{team.name}</span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {teamPokemon.slice(0, 6).map((p, pi) => {
                          const isCore = corePokemon.some(c => c?.id === p?.id);
                          return p && (
                            <div key={pi} className="relative">
                              <Image src={p.sprite} alt={p.name} width={26} height={26} className={cn("rounded", isCore && "ring-1 ring-purple-400")} unoptimized />
                              {isCore && <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-500 border border-white" />}
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-muted-foreground line-clamp-2">{team.strategy}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {team.counters.map(c => <span key={c} className="px-1.5 py-0.5 text-[8px] font-medium rounded bg-green-50 text-green-600">✓ {c}</span>)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </motion.div>
      )}

      {/* ══════════ CORE PAIRS TAB ══════════ */}
      {activeTab === "cores" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1">Core Pair Analysis</h2>
            <p className="text-sm text-muted-foreground mb-4">
              The strongest 2-Pokémon cores in competitive play. Each core pair is rated by tournament win rate, usage, and how well they complement each other.
              ML simulation cores are shown separately below.
            </p>

            {/* Tournament Core Pairs (card grid) */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" /> Tournament Core Pairs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {_VALID_CORE_PAIRS
                .sort((a, b) => b.winRate - a.winRate).map((cp, idx) => {
                const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                const tier = cp.usage >= 20 ? "S" : cp.usage >= 12 ? "A" : cp.usage >= 6 ? "B" : "C";
                return (
                  <div key={`${cp.name}-${idx}`} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{tier}</span>
                        <span className="text-sm font-bold">{cp.name}</span>
                      </div>
                      <span className={cn("text-sm font-bold", cp.winRate >= 55 ? "text-green-600" : "text-emerald-600")}>{cp.winRate}% WR</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {p1 && <Image src={p1.sprite} alt={p1.name} width={36} height={36} className="rounded" unoptimized />}
                      {p2 && <Image src={p2.sprite} alt={p2.name} width={36} height={36} className="rounded" unoptimized />}
                      <div className="flex-1" />
                      <span className="text-xs text-muted-foreground">{cp.usage}% usage · {cp.synergy}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ML-Discovered Cores (table) */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" /> ML-Discovered Cores <span className="text-xs font-normal text-muted-foreground">(from 2M battles)</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">#</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Core</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium">Pokémon</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Games</th>
                  </tr>
                </thead>
                <tbody>
                  {ML_BEST_CORES.map((c, i) => (
                    <tr key={c.pair} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", i < 3 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span></td>
                      <td className="py-2 px-3 font-semibold text-sm">{c.pair}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center justify-center gap-1">
                          {c.pair.split(" + ").map(name => {
                            const sp = getSpriteForName(name);
                            return sp ? <Image key={name} src={sp} alt={name} width={24} height={24} className="rounded" unoptimized /> : <span key={name} className="text-xs">{name}</span>;
                          })}
                        </div>
                      </td>
                      <td className={cn("py-2 px-3 text-right font-bold", c.wr >= 75 ? "text-green-600" : "text-emerald-600")}>{c.wr}%</td>
                      <td className="py-2 px-3 text-right text-muted-foreground">{c.games.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ ARCHETYPE MATCHUPS TAB ══════════ */}
      {activeTab === "matchups" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1">Archetype Matchup Matrix</h2>
            <p className="text-sm text-muted-foreground mb-4">
              How each archetype performs against the others. Win rates above 55% are highlighted green, below 45% red.
              This data combines tournament results with ML simulation insights.
            </p>

            {/* Tournament Matchup Data (card grid) */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Swords className="w-4 h-4 text-cyan-500" /> Tournament Matchup Data
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {ARCHETYPE_MATCHUPS.sort((a, b) => Math.abs(b.winRate1 - 50) - Math.abs(a.winRate1 - 50)).map((m, i) => {
                const dominant = m.winRate1 >= 50;
                const winner = dominant ? m.archetype1 : m.archetype2;
                const loser = dominant ? m.archetype2 : m.archetype1;
                const wr = dominant ? m.winRate1 : 100 - m.winRate1;
                return (
                  <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-green-600 truncate">{winner}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                      <span className="text-xs font-bold text-red-600 truncate">{loser}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden"><div className={cn("h-full rounded-full", wr >= 55 ? "bg-green-400" : "bg-emerald-400")} style={{ width: `${wr}%` }} /></div>
                      <span className={cn("text-sm font-bold", wr >= 55 ? "text-green-600" : "text-gray-700")}>{wr.toFixed(1)}%</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{m.sampleSize} games · {wr >= 55 ? `${winner} favored` : "Even"}</p>
                  </div>
                );
              })}
            </div>

            {/* ML Archetype Rankings (table) */}
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-emerald-500" /> ML Archetype Rankings
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">#</th>
                    <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Archetype</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate</th>
                    <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">ELO</th>
                    <th className="text-center py-2 px-3 text-xs text-muted-foreground font-medium">Win Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {ML_ARCHETYPES.map((a, i) => (
                    <tr key={a.name} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-2 px-3"><span className={cn("px-2 py-0.5 text-[10px] font-bold rounded", i < 2 ? "bg-amber-100 text-amber-700" : i < 5 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span></td>
                      <td className="py-2 px-3 font-semibold text-sm">{a.name}</td>
                      <td className={cn("py-2 px-3 text-right font-bold", a.wr >= 60 ? "text-green-600" : "text-gray-700")}>{a.wr}%</td>
                      <td className="py-2 px-3 text-right text-muted-foreground">{a.elo.toLocaleString()}</td>
                      <td className="py-2 px-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${a.wr}%` }} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ MOVE ANALYSIS TAB ══════════ */}
      {activeTab === "moves" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Move Win Rate Analysis
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Move win rates from 2,000,000 ML simulated battles. Higher win rate means teams using this move won more often. Usage count shows total appearances across all battles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ML_BEST_MOVES.map((m, i) => (
                <div key={m.name} className="p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold", i < 3 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>#{i + 1}</span>
                      <span className="text-sm font-bold">{m.name}</span>
                    </div>
                    <span className={cn("text-lg font-bold", m.wr >= 65 ? "text-green-600" : m.wr >= 60 ? "text-emerald-600" : "text-gray-700")}>{m.wr}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400" style={{ width: `${m.wr}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{m.uses.toLocaleString()} uses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ══════════ SPEED TIERS TAB ══════════ */}
      {activeTab === "speed" && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* ── Hero Header ── */}
          <div className="glass rounded-2xl p-6 border-2 border-cyan-300/60 bg-gradient-to-br from-cyan-50/60 via-white to-indigo-50/60 shadow-lg shadow-cyan-100/30">
            <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
              <h2 className="text-xl font-extrabold flex items-center gap-2">
                <Timer className="w-6 h-6 text-cyan-500" /> Speed Tiers
              </h2>
              <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-cyan-100 text-cyan-700 border border-cyan-200">Level 50 · 31 IVs</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Complete speed tier chart for all {filteredSpeedEntries.length} Pokémon. Calculated at Level 50 with max IVs (31) and max SP investment (32) where applicable.
              Mega Evolutions cannot hold items  -  Choice Scarf columns show N/A.
            </p>

            {/* ── Quick Stats ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {(() => {
                const fastest = speedEntries.filter(e => e.isMega).sort((a, b) => b.baseSpeed - a.baseSpeed)[0];
                const fastestNonMega = speedEntries.filter(e => !e.isMega).sort((a, b) => b.baseSpeed - a.baseSpeed)[0];
                const slowest = speedEntries.filter(e => !e.isMega).sort((a, b) => a.baseSpeed - b.baseSpeed)[0];
                const avgSpeed = Math.round(speedEntries.filter(e => !e.isMega).reduce((s, e) => s + e.baseSpeed, 0) / speedEntries.filter(e => !e.isMega).length);
                return [
                  { label: "Fastest Mega", value: fastest?.name ?? "-", stat: fastest?.baseSpeed ?? 0, color: "text-red-600" },
                  { label: "Fastest Non-Mega", value: fastestNonMega?.name ?? "-", stat: fastestNonMega?.baseSpeed ?? 0, color: "text-amber-600" },
                  { label: "Average Speed", value: `${avgSpeed} Base`, stat: avgSpeed, color: "text-blue-600" },
                  { label: "Slowest", value: slowest?.name ?? "-", stat: slowest?.baseSpeed ?? 0, color: "text-indigo-600" },
                ];
              })().map(s => (
                <div key={s.label} className="p-3 rounded-xl bg-white/80 border border-gray-200/60 text-center">
                  <p className="text-[10px] font-semibold uppercase text-muted-foreground">{s.label}</p>
                  <p className={cn("text-lg font-extrabold", s.color)}>{s.stat}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{s.value}</p>
                </div>
              ))}
            </div>

            {/* ── Controls ── */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[180px] max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={speedSearch}
                  onChange={e => setSpeedSearch(e.target.value)}
                  placeholder="Search Pokémon..."
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent"
                />
              </div>

              {/* Type Filter */}
              <select
                value={speedTypeFilter}
                onChange={e => setSpeedTypeFilter(e.target.value as PokemonType | "all")}
                className="px-3 py-2 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <option value="all">All Types</option>
                {(["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"] as PokemonType[]).map(t => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>

              {/* Toggles */}
              <button
                onClick={() => setShowMegas(!showMegas)}
                className={cn("px-3 py-2 text-xs font-bold rounded-xl border transition-all", showMegas ? "bg-gradient-to-r from-amber-100 to-orange-100 border-amber-300 text-amber-700" : "bg-white border-gray-200 text-muted-foreground")}
              >
                {showMegas ? "✦ Megas On" : "Megas Off"}
              </button>
              <button
                onClick={() => setTrickRoomMode(!trickRoomMode)}
                className={cn("px-3 py-2 text-xs font-bold rounded-xl border transition-all", trickRoomMode ? "bg-gradient-to-r from-indigo-100 to-purple-100 border-indigo-300 text-indigo-700" : "bg-white border-gray-200 text-muted-foreground")}
              >
                {trickRoomMode ? "🔮 Trick Room" : "Normal Order"}
              </button>
              <button
                onClick={() => setSpeedTailwind(!speedTailwind)}
                className={cn("px-3 py-2 text-xs font-bold rounded-xl border transition-all", speedTailwind ? "bg-gradient-to-r from-sky-100 to-blue-100 border-sky-300 text-sky-700" : "bg-white border-gray-200 text-muted-foreground")}
              >
                {speedTailwind ? "💨 Tailwind" : "No Tailwind"}
              </button>
            </div>
          </div>

          {/* ── Speed Tiers Table ── */}
          {SPEED_BRACKETS.map(bracket => {
            const bracketEntries = filteredSpeedEntries.filter(e => e.baseSpeed >= bracket.min && e.baseSpeed <= bracket.max);
            if (bracketEntries.length === 0) return null;

            return (
              <div key={bracket.label} className="space-y-0">
                {/* Bracket Header */}
                <div className={cn("rounded-t-2xl px-5 py-3 border-x border-t flex items-center justify-between", bracket.bg, bracket.border)}>
                  <div className="flex items-center gap-3">
                    <div className={cn("w-1.5 h-8 rounded-full bg-gradient-to-b", bracket.color)} />
                    <div>
                      <h3 className={cn("text-sm font-extrabold", bracket.text)}>{bracket.label}</h3>
                      <p className="text-[10px] text-muted-foreground">{bracket.range} · {bracketEntries.length} Pokémon</p>
                    </div>
                  </div>
                </div>

                {/* Table */}
                <div className="border border-gray-200 rounded-b-2xl overflow-hidden">
                  {/* Table Header */}
                  <div className="hidden lg:grid grid-cols-[3rem_3rem_minmax(140px,1fr)_5rem_4.5rem_5.5rem_5.5rem_5rem_5rem_5.5rem_5.5rem] gap-0 px-4 py-2 bg-gray-50/80 border-b border-gray-200 text-[10px] font-bold uppercase text-muted-foreground">
                    <span className="text-center">#</span>
                    <span></span>
                    <span>Pokémon</span>
                    <span className="text-center">Tier</span>
                    <span className="text-center">Base</span>
                    <span className="text-center text-green-600">+Nat</span>
                    <span className="text-center">Neutral</span>
                    <span className="text-center text-gray-400">Uninv.</span>
                    <span className="text-center text-gray-400">−Nat</span>
                    <span className="text-center text-amber-600">Scarf+</span>
                    <span className="text-center text-amber-500">Scarf</span>
                  </div>

                  {/* Table Rows */}
                  {bracketEntries.map((entry, i) => {
                    const globalRank = speedOriginalRank.get(entry.key) ?? (filteredSpeedEntries.indexOf(entry) + 1);
                    const tw = speedTailwind ? 2 : 1;
                    const displayMaxPos = entry.maxPositive * tw;
                    const displayMaxNeu = entry.maxNeutral * tw;
                    const displayUninv = entry.uninvested * tw;
                    const displayMinNeg = entry.minNegative * tw;
                    const displayScarfPos = entry.scarfPositive != null ? Math.floor(entry.scarfPositive * tw) : null;
                    const displayScarfNeu = entry.scarfNeutral != null ? Math.floor(entry.scarfNeutral * tw) : null;
                    const maxBarRef = MAX_SPEED_DISPLAY * tw;
                    const isExpanded = speedExpandedId === entry.key;

                    return (
                      <div key={entry.key}>
                        {/* Desktop Row */}
                        <div
                          className={cn(
                            "hidden lg:grid grid-cols-[3rem_3rem_minmax(140px,1fr)_5rem_4.5rem_5.5rem_5.5rem_5rem_5rem_5.5rem_5.5rem] gap-0 px-4 py-2 items-center border-b border-gray-100 hover:bg-gray-50/80 transition-colors cursor-pointer group",
                            entry.isMega && "bg-amber-50/30",
                          )}
                          onClick={() => setModal({ kind: "pokemon", name: entry.name })}
                        >
                          {/* Rank */}
                          <span className={cn(
                            "text-center text-xs font-bold",
                            globalRank <= 3 ? "text-amber-600" : globalRank <= 10 ? "text-gray-600" : "text-gray-400"
                          )}>{globalRank}</span>

                          {/* Sprite */}
                          <div className="flex justify-center">
                            <Image src={entry.sprite} alt={entry.name} width={32} height={32} className="drop-shadow-sm" unoptimized />
                          </div>

                          {/* Name + Types */}
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className={cn("text-sm font-bold truncate group-hover:text-cyan-600 transition-colors", entry.isMega && "text-amber-700")}>
                                  {entry.name}
                                </span>
                                {entry.isMega && <span className="shrink-0 px-1.5 py-0.5 text-[8px] font-bold rounded bg-gradient-to-r from-amber-200 to-orange-200 text-amber-800">MEGA</span>}
                              </div>
                              <div className="flex gap-1 mt-0.5">
                                {entry.types.map(t => (
                                  <span key={t} className="px-1.5 py-0 text-[8px] font-bold uppercase rounded text-white leading-4" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* ML Tier */}
                          <div className="flex justify-center">
                            {entry.tier !== "-" ? (
                              <span className={cn("px-2 py-0.5 text-[10px] font-bold rounded-lg",
                                entry.tier === "S" ? "bg-amber-100 text-amber-700" :
                                entry.tier === "A" ? "bg-blue-100 text-blue-700" :
                                entry.tier === "B" ? "bg-gray-100 text-gray-700" :
                                entry.tier === "C" ? "bg-gray-50 text-gray-500" :
                                "bg-red-50 text-red-400"
                              )}>{entry.tier}</span>
                            ) : <span className="text-[10px] text-gray-300"> - </span>}
                          </div>

                          {/* Base Speed */}
                          <div className="text-center">
                            <span className={cn("text-sm font-extrabold tabular-nums",
                              entry.baseSpeed >= 150 ? "text-red-600" :
                              entry.baseSpeed >= 120 ? "text-amber-600" :
                              entry.baseSpeed >= 90 ? "text-cyan-600" :
                              entry.baseSpeed >= 60 ? "text-blue-600" :
                              "text-indigo-600"
                            )}>{entry.baseSpeed}</span>
                          </div>

                          {/* +Nature Max SP */}
                          <div className="relative">
                            <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                              <div className="h-full rounded-md bg-gradient-to-r from-green-400 to-emerald-400 opacity-70" style={{ width: `${Math.min(100, (displayMaxPos / maxBarRef) * 100)}%` }} />
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-green-800 tabular-nums">{displayMaxPos}</span>
                          </div>

                          {/* Neutral Max SP */}
                          <div className="relative">
                            <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                              <div className="h-full rounded-md bg-gradient-to-r from-cyan-400 to-teal-400 opacity-60" style={{ width: `${Math.min(100, (displayMaxNeu / maxBarRef) * 100)}%` }} />
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-cyan-800 tabular-nums">{displayMaxNeu}</span>
                          </div>

                          {/* Uninvested */}
                          <div className="relative">
                            <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                              <div className="h-full rounded-md bg-gray-300 opacity-50" style={{ width: `${Math.min(100, (displayUninv / maxBarRef) * 100)}%` }} />
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-600 tabular-nums">{displayUninv}</span>
                          </div>

                          {/* -Nature */}
                          <div className="relative">
                            <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                              <div className="h-full rounded-md bg-gray-200 opacity-50" style={{ width: `${Math.min(100, (displayMinNeg / maxBarRef) * 100)}%` }} />
                            </div>
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-gray-500 tabular-nums">{displayMinNeg}</span>
                          </div>

                          {/* Scarf +Nature */}
                          <div className="relative">
                            {displayScarfPos != null ? (
                              <>
                                <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                                  <div className="h-full rounded-md bg-gradient-to-r from-amber-400 to-orange-400 opacity-60" style={{ width: `${Math.min(100, (displayScarfPos / (maxBarRef * 1.5)) * 100)}%` }} />
                                </div>
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-800 tabular-nums">{displayScarfPos}</span>
                              </>
                            ) : (
                              <div className="h-5 flex items-center justify-center text-[10px] font-bold text-gray-300">N/A</div>
                            )}
                          </div>

                          {/* Scarf Neutral */}
                          <div className="relative">
                            {displayScarfNeu != null ? (
                              <>
                                <div className="h-5 bg-gray-100 rounded-md overflow-hidden">
                                  <div className="h-full rounded-md bg-gradient-to-r from-amber-300 to-yellow-400 opacity-50" style={{ width: `${Math.min(100, (displayScarfNeu / (maxBarRef * 1.5)) * 100)}%` }} />
                                </div>
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-amber-700 tabular-nums">{displayScarfNeu}</span>
                              </>
                            ) : (
                              <div className="h-5 flex items-center justify-center text-[10px] font-bold text-gray-300">N/A</div>
                            )}
                          </div>
                        </div>

                        {/* Mobile Card */}
                        <div
                          className={cn(
                            "lg:hidden px-4 py-3 border-b border-gray-100 cursor-pointer",
                            entry.isMega && "bg-amber-50/30",
                          )}
                          onClick={() => setSpeedExpandedId(isExpanded ? null : entry.key)}
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn("text-xs font-bold w-6 text-center shrink-0",
                              globalRank <= 3 ? "text-amber-600" : "text-gray-400"
                            )}>{globalRank}</span>
                            <Image src={entry.sprite} alt={entry.name} width={36} height={36} className="drop-shadow-sm shrink-0" unoptimized />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className={cn("text-sm font-bold truncate", entry.isMega && "text-amber-700")}>{entry.name}</span>
                                {entry.isMega && <span className="shrink-0 px-1 py-0 text-[7px] font-bold rounded bg-amber-200 text-amber-800">M</span>}
                                {entry.tier !== "-" && <span className={cn("shrink-0 px-1.5 py-0 text-[9px] font-bold rounded",
                                  entry.tier === "S" ? "bg-amber-100 text-amber-700" :
                                  entry.tier === "A" ? "bg-blue-100 text-blue-700" :
                                  "bg-gray-100 text-gray-600"
                                )}>{entry.tier}</span>}
                              </div>
                              <div className="flex gap-1 mt-0.5">
                                {entry.types.map(t => (
                                  <span key={t} className="px-1 py-0 text-[7px] font-bold uppercase rounded text-white leading-3" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className={cn("text-lg font-extrabold tabular-nums",
                                entry.baseSpeed >= 150 ? "text-red-600" :
                                entry.baseSpeed >= 120 ? "text-amber-600" :
                                entry.baseSpeed >= 90 ? "text-cyan-600" :
                                "text-blue-600"
                              )}>{entry.baseSpeed}</p>
                              <p className="text-[9px] text-muted-foreground">Base</p>
                            </div>
                            <ChevronDown className={cn("w-4 h-4 text-gray-400 shrink-0 transition-transform", isExpanded && "rotate-180")} />
                          </div>

                          {/* Expanded mobile details */}
                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
                              {[
                                { label: "+Nature (32 SP)", value: displayMaxPos, color: "from-green-400 to-emerald-400", textColor: "text-green-700" },
                                { label: "Neutral (32 SP)", value: displayMaxNeu, color: "from-cyan-400 to-teal-400", textColor: "text-cyan-700" },
                                { label: "Uninvested (0 SP)", value: displayUninv, color: "from-gray-300 to-gray-400", textColor: "text-gray-600" },
                                { label: "−Nature (0 SP)", value: displayMinNeg, color: "from-gray-200 to-gray-300", textColor: "text-gray-500" },
                                ...(displayScarfPos != null ? [
                                  { label: "Scarf +Nature", value: displayScarfPos, color: "from-amber-400 to-orange-400", textColor: "text-amber-700" },
                                  { label: "Scarf Neutral", value: displayScarfNeu!, color: "from-amber-300 to-yellow-400", textColor: "text-amber-600" },
                                ] : []),
                              ].map(row => (
                                <div key={row.label} className="flex items-center gap-2">
                                  <span className="text-[10px] text-muted-foreground w-24 shrink-0">{row.label}</span>
                                  <div className="flex-1 relative h-5">
                                    <div className="absolute inset-0 bg-gray-100 rounded-md overflow-hidden">
                                      <div className={cn("h-full rounded-md bg-gradient-to-r opacity-60", row.color)} style={{ width: `${Math.min(100, (row.value / maxBarRef) * 100)}%` }} />
                                    </div>
                                    <span className={cn("absolute inset-0 flex items-center justify-center text-[10px] font-bold tabular-nums", row.textColor)}>{row.value}</span>
                                  </div>
                                </div>
                              ))}
                              <button
                                onClick={(e) => { e.stopPropagation(); setModal({ kind: "pokemon", name: entry.name }); }}
                                className="w-full mt-2 py-1.5 text-[10px] font-bold text-cyan-600 bg-cyan-50 rounded-lg border border-cyan-200 hover:bg-cyan-100 transition-colors"
                              >
                                View Full Details →
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* ── Speed Mechanics Guide ── */}
          <div className="glass rounded-2xl p-6 border border-gray-200/60">
            <div className="flex items-center gap-2 mb-4">
              <Info className="w-5 h-5 text-cyan-500" />
              <h3 className="text-lg font-bold">Speed Mechanics Guide</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Speed-Boosting Natures",
                  desc: "Timid (−Atk), Hasty (−Def), Jolly (−SpA), Naive (−SpD) all grant +10% Speed. Pick based on which attacking stat your Pokémon doesn't use.",
                  icon: "⚡", color: "from-green-100 to-emerald-100", border: "border-green-200",
                },
                {
                  title: "Choice Scarf",
                  desc: "Multiplies Speed by 1.5× but locks the holder into one move. Mega Evolutions cannot hold items, so they can never use Scarf.",
                  icon: "🧣", color: "from-amber-100 to-orange-100", border: "border-amber-200",
                },
                {
                  title: "Tailwind",
                  desc: "Doubles the Speed of your entire side for 4 turns. Stacks with natures and items. Toggle it on above to see Tailwind-boosted values.",
                  icon: "💨", color: "from-sky-100 to-blue-100", border: "border-sky-200",
                },
                {
                  title: "Trick Room",
                  desc: "Reverses turn order for 5 turns  -  slower Pokémon move first. Use Trick Room mode above to sort by who benefits most.",
                  icon: "🔮", color: "from-indigo-100 to-purple-100", border: "border-indigo-200",
                },
                {
                  title: "Weather Abilities",
                  desc: "Swift Swim (Rain), Chlorophyll (Sun), Sand Rush (Sand), and Slush Rush (Hail) double Speed in their respective weather.",
                  icon: "🌤", color: "from-teal-100 to-cyan-100", border: "border-teal-200",
                },
                {
                  title: "Speed Ties",
                  desc: "If two Pokémon have identical Speed, the outcome is a random coin flip. Running a +Speed nature proactively avoids ties in key matchups.",
                  icon: "🎲", color: "from-rose-100 to-pink-100", border: "border-rose-200",
                },
              ].map(guide => (
                <div key={guide.title} className={cn("p-4 rounded-xl bg-gradient-to-br border", guide.color, guide.border)}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{guide.icon}</span>
                    <h4 className="text-sm font-bold">{guide.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{guide.desc}</p>
                </div>
              ))}
            </div>

            {/* Column Legend */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Column Reference</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-500" /><span><strong>Base</strong>  -  Raw base stat</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-green-400 to-emerald-400" /><span><strong>+Nat</strong>  -  +Nature, 32 SP</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-400 to-teal-400" /><span><strong>Neutral</strong>  -  Neutral, 32 SP</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gray-300" /><span><strong>Uninv.</strong>  -  Neutral, 0 SP</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-amber-400 to-orange-400" /><span><strong>Scarf+</strong>  -  Scarf + Nature</span></div>
                <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-gradient-to-r from-amber-300 to-yellow-400" /><span><strong>Scarf</strong>  -  Scarf, Neutral</span></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>

    {/* ══════════ DETAIL MODAL OVERLAY ══════════ */}
    <AnimatePresence>
      {modal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center pt-[max(5vh,5rem)] px-4 pb-8" onClick={() => setModal(null)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.97 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"><X className="w-5 h-5" /></button>

            {/* ── POKEMON MODAL ── */}
            {modal.kind === "pokemon" && (() => {
              const pokemon = getPokemonByName(modal.name);
              if (!pokemon) return <div className="p-8 text-center text-muted-foreground">Pokémon not found</div>;
              const isMega = modal.name.startsWith("Mega ");
              const megaSprite = getSpriteForName(modal.name);
              const megaTypes = getTypesForName(modal.name);
              const displayName = modal.name;
              const mlData = ML_POKEMON_RANKINGS.find(p => p.name === modal.name);
              const usageData = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === pokemon.id);
              const corePairs = getCorePairsForPokemon(pokemon.id);
              const teamAppearances = getTournamentTeamsWithPokemon(pokemon.id);
              const prebuiltTeams = getPrebuiltTeamsWithPokemon(pokemon.id);
              const tier = mlData ? mlData.tier : usageData ? (usageData.usageRate >= 30 ? "S" : usageData.usageRate >= 15 ? "A" : "B") : "-";
              // For mega forms, try to get mega stats from the form data
              // Match the exact form name suffix (X/Y) so Mega Charizard Y doesn't show X's stats
              const megaForms = pokemon.forms?.filter(f => f.isMega && !f.hidden) ?? [];
              const megaForm = isMega
                ? megaForms.find(f => f.name === modal.name) ?? megaForms[0] ?? null
                : null;
              const displayStats = megaForm?.baseStats ?? pokemon.baseStats;
              return (
                <div className="p-6 space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-5">
                    <Image src={megaSprite ?? pokemon.officialArt} alt={displayName} width={120} height={120} className="drop-shadow-xl" unoptimized />
                    <div>
                      <h2 className="text-2xl font-extrabold">{displayName}</h2>
                      <div className="flex gap-1.5 mt-1">{(megaTypes ?? pokemon.types).map(t => <span key={t} className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg text-white" style={{ backgroundColor: TYPE_COLORS[t as PokemonType] }}>{t}</span>)}</div>
                      <div className="flex items-center gap-3 mt-2">
                        {tier !== "-" && <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", tier === "S" ? "bg-amber-100 text-amber-700" : tier === "A" ? "bg-blue-100 text-blue-700" : tier === "B" ? "bg-gray-100 text-gray-700" : tier === "C" ? "bg-gray-50 text-gray-500" : "bg-red-50 text-red-400")}>{tier}-Tier</span>}
                        {mlData && <span className="text-sm text-muted-foreground">ML #{ML_POKEMON_RANKINGS.indexOf(mlData) + 1} · ELO {mlData.elo.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Stats bars */}
                  <div className="grid grid-cols-6 gap-4">
                    {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => {
                      const v = displayStats[stat];
                      const label = { hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat];
                      return (
                        <div key={stat} className="text-center">
                          <p className="text-xs text-muted-foreground">{label}</p>
                          <p className={cn("text-xl font-extrabold", v >= 120 ? "text-green-600" : v >= 90 ? "text-emerald-600" : v >= 60 ? "text-gray-700" : "text-red-500")}>{v}</p>
                          <div className="h-2 bg-gray-100 rounded-full mt-1 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" style={{ width: `${Math.min(100, (v / 180) * 100)}%` }} /></div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* ML + Tournament stats */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Performance</h4>
                      {mlData && <>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">ML Win Rate</span><span className={cn("text-sm font-bold", mlData.wr >= 55 ? "text-green-600" : "text-foreground")}>{mlData.wr}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">ML Games</span><span className="text-sm font-bold">{mlData.games.toLocaleString()}</span></div>
                      </>}
                      {usageData && <>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Tournament Usage</span><span className="text-sm font-bold">{usageData.usageRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Tournament WR</span><span className="text-sm font-bold">{usageData.winRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Top Cut</span><span className="text-sm font-bold">{usageData.topCutRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Lead Rate</span><span className="text-sm font-bold">{usageData.leadRate}%</span></div>
                        <div className="flex justify-between p-2.5 bg-gray-50 rounded-xl"><span className="text-xs text-muted-foreground">Bring Rate</span><span className="text-sm font-bold">{usageData.bringRate}%</span></div>
                      </>}
                      {!mlData && !usageData && <p className="text-xs text-muted-foreground">No competitive data available</p>}
                    </div>

                    {/* Core partners */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Best Partners ({corePairs.length})</h4>
                      {corePairs.sort((a, b) => b.winRate - a.winRate).slice(0, 6).map(cp => {
                        const partnerId = cp.pokemon1 === pokemon.id ? cp.pokemon2 : cp.pokemon1;
                        const partner = POKEMON_SEED.find(p => p.id === partnerId);
                        return (
                          <div key={cp.name} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "core", pair: cp.name })}>
                            {partner && <Image src={partner.sprite} alt={partner.name} width={28} height={28} className="rounded" unoptimized />}
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{cp.name}</p>
                              <p className="text-[10px] text-muted-foreground">{cp.synergy}</p>
                            </div>
                            <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Abilities + key moves */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase text-muted-foreground">Abilities</h4>
                      {pokemon.abilities.map(a => (
                        <div key={a.name} className="p-2.5 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-2"><span className="text-xs font-bold">{a.name}</span>{a.isHidden && <span className="text-[9px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded font-medium">Hidden</span>}{(a as any).isChampions && <span className="text-[9px] px-1.5 py-0.5 bg-violet-100 text-violet-700 rounded font-medium" title="New ability introduced in Pokémon Champions">Champions</span>}</div>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{a.description}</p>
                        </div>
                      ))}
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mt-4">Top Moves</h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {pokemon.moves.filter(m => m.category !== "status").sort((a, b) => (b.power || 0) - (a.power || 0)).slice(0, 8).map(m => (
                          <div key={m.name} className="p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "move", name: m.name })}>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[m.type as PokemonType] }} />
                              <span className="text-[10px] font-semibold truncate">{m.name}</span>
                            </div>
                            <p className="text-[9px] text-muted-foreground">{m.power || "-"} BP · {m.category}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Tournament appearances */}
                  {/* ═══ RECOMMENDED COMPETITIVE SETS ═══ */}
                  {(() => {
                    const setsForPokemon = USAGE_DATA[pokemon.id];
                    const simData = SIM_POKEMON[String(pokemon.id)];
                    if (!setsForPokemon && !simData?.bestSets?.length) return null;
                    return (
                      <div>
                        <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Recommended Competitive Sets
                        </h4>
                        {setsForPokemon && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            {setsForPokemon.map((set, idx) => (
                              <div key={idx} className="p-3.5 bg-gradient-to-br from-amber-50/60 to-yellow-50/30 rounded-xl border border-amber-200">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-amber-100 text-amber-700">SET {idx + 1}</span>
                                  <span className="text-xs font-bold">{set.name}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-y-1 text-xs mb-2">
                                  <div className="flex justify-between pr-2"><span className="text-muted-foreground">Nature</span><span className="font-semibold">{set.nature}</span></div>
                                  <div className="flex justify-between"><span className="text-muted-foreground">Ability</span><span className="font-semibold text-right truncate ml-1">{set.ability}</span></div>
                                  <div className="flex justify-between pr-2"><span className="text-muted-foreground">Item</span><span className="font-semibold">{set.item}</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-1 mb-2">
                                  {set.moves.map(mv => {
                                    const moveInfo = pokemon.moves.find(m => m.name === mv);
                                    return (
                                      <div key={mv} className="flex items-center gap-1 p-1 bg-white/70 rounded text-[10px] font-medium cursor-pointer hover:bg-white transition-colors" onClick={(e) => { e.stopPropagation(); setModal({ kind: "move", name: mv }); }}>
                                        {moveInfo && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[moveInfo.type as PokemonType] }} />}
                                        <span className="truncate">{mv}</span>
                                      </div>
                                    );
                                  })}
                                </div>
                                <div className="grid grid-cols-6 gap-0.5">
                                  {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                    <div key={stat} className="text-center">
                                      <p className="text-[7px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                      <p className={cn("text-[10px] font-bold", set.sp[stat] >= 20 ? "text-emerald-600" : set.sp[stat] > 0 ? "text-gray-700" : "text-gray-300")}>{set.sp[stat]}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        {simData?.bestSets && simData.bestSets.length > 0 && (
                          <div className="space-y-1.5">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">ML Best Performing Sets (from {simData.appearances.toLocaleString()} battles)</p>
                            {simData.bestSets.slice(0, 3).map((s, i) => (
                              <div key={i} className="flex items-center gap-3 p-2.5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                                <span className="text-[9px] font-bold text-emerald-600 w-5">#{i + 1}</span>
                                <span className="text-xs font-semibold flex-1">{s.set}</span>
                                <span className={cn("text-xs font-bold", s.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{s.winRate}%</span>
                                <span className="text-[10px] text-muted-foreground">{s.games.toLocaleString()} games</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Tournament appearances */}
                  {teamAppearances.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Tournament Appearances ({teamAppearances.length} teams)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {teamAppearances.sort((a, b) => b.year - a.year).slice(0, 6).map(t => (
                          <div key={t.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl">
                            <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement <= 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{t.tournament}</p>
                              <p className="text-[10px] text-muted-foreground">{t.year} · {t.region}</p>
                            </div>
                            <span className="text-[9px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded capitalize">{t.archetype}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prebuilt teams featuring this Pokémon */}
                  {prebuiltTeams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Featured in Curated Teams</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {prebuiltTeams.map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "prebuilt", id: t.id })}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.tier === "S" ? "bg-amber-100 text-amber-700" : t.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{t.tier}</span>
                              <span className="text-xs font-bold">{t.name}</span>
                            </div>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── ARCHETYPE MODAL ── */}
            {modal.kind === "archetype" && (() => {
              const arch = modal.name;
              const mlArch = ML_ARCHETYPES.find(a => a.name === arch);
              const archTeams = _VALID_TOURNAMENT_TEAMS.filter(t => t.archetype.toLowerCase().includes(arch.toLowerCase()) || arch.toLowerCase().includes(t.archetype.toLowerCase()));
              const prebuiltArch = _VALID_PREBUILT_TEAMS.filter(t => t.archetype.toLowerCase() === arch.toLowerCase() || t.name.toLowerCase().includes(arch.toLowerCase()));
              const matchups = ARCHETYPE_MATCHUPS.filter(m => m.archetype1.toLowerCase().includes(arch.toLowerCase()) || m.archetype2.toLowerCase().includes(arch.toLowerCase()));
              const metaPredictions = metaTeams.filter(m => m.archetype.toLowerCase().includes(arch.toLowerCase()) || arch.toLowerCase().includes(m.archetype.toLowerCase()));
              const archPokemon = archTeams.flatMap(t => t.pokemonIds);
              const pokemonFreq: Record<number, number> = {};
              archPokemon.forEach(id => { pokemonFreq[id] = (pokemonFreq[id] || 0) + 1; });
              const topPokemon = Object.entries(pokemonFreq).sort((a, b) => b[1] - a[1]).slice(0, 12);
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-extrabold">{arch}</h2>
                      {mlArch && <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", mlArch.wr >= 60 ? "bg-green-100 text-green-700" : mlArch.wr >= 52 ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600")}>{mlArch.wr}% Win Rate</span>}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {archTeams.length} tournament teams · {matchups.length} tracked matchups{mlArch ? ` · ELO ${mlArch.elo.toLocaleString()}` : ""}
                    </p>
                  </div>

                  {/* Performance graph-style bars */}
                  {mlArch && (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <p className="text-3xl font-extrabold text-emerald-700">{mlArch.wr}%</p>
                        <p className="text-xs text-muted-foreground">ML Win Rate</p>
                        <div className="h-2.5 bg-emerald-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${mlArch.wr}%` }} /></div>
                      </div>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                        <p className="text-3xl font-extrabold text-emerald-700">{mlArch.elo.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">ML ELO Rating</p>
                        <div className="h-2.5 bg-emerald-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${Math.min(100, (mlArch.elo / 30000) * 100)}%` }} /></div>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                        <p className="text-3xl font-extrabold text-amber-700">{archTeams.length}</p>
                        <p className="text-xs text-muted-foreground">Tournament Teams</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{archTeams.filter(t => t.placement === 1).length} champions</p>
                      </div>
                    </div>
                  )}

                  {/* Key Pokémon for this archetype */}
                  {topPokemon.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Key Pokémon</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {topPokemon.map(([idStr, count]) => {
                          const pkm = POKEMON_SEED.find(p => p.id === Number(idStr));
                          if (!pkm) return null;
                          return (
                            <div key={idStr} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                              <Image src={pkm.sprite} alt={pkm.name} width={32} height={32} className="rounded" unoptimized />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold truncate">{pkm.name}</p>
                                <p className="text-[10px] text-muted-foreground">In {count}/{archTeams.length} teams</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Matchups */}
                  {matchups.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Matchup Chart</h4>
                      <div className="space-y-2">
                        {matchups.sort((a, b) => {
                          const aWr = a.archetype1.toLowerCase().includes(arch.toLowerCase()) ? a.winRate1 : 100 - a.winRate1;
                          const bWr = b.archetype1.toLowerCase().includes(arch.toLowerCase()) ? b.winRate1 : 100 - b.winRate1;
                          return bWr - aWr;
                        }).map((m, i) => {
                          const isArch1 = m.archetype1.toLowerCase().includes(arch.toLowerCase());
                          const wr = isArch1 ? m.winRate1 : 100 - m.winRate1;
                          const opponent = isArch1 ? m.archetype2 : m.archetype1;
                          return (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                              <span className="text-xs font-medium w-36 truncate">vs {opponent}</span>
                              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden relative">
                                <div className={cn("h-full rounded-full", wr >= 55 ? "bg-green-400" : wr >= 50 ? "bg-gray-400" : "bg-red-400")} style={{ width: `${wr}%` }} />
                              </div>
                              <span className={cn("text-sm font-bold w-14 text-right", wr >= 55 ? "text-green-600" : wr >= 50 ? "text-gray-700" : "text-red-600")}>{wr.toFixed(1)}%</span>
                              <span className="text-[10px] text-muted-foreground w-16 text-right">{m.sampleSize} games</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Example tournament teams */}
                  {archTeams.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Example Tournament Teams ({archTeams.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {archTeams.sort((a, b) => a.placement - b.placement || b.year - a.year).slice(0, 6).map(t => {
                          const tPkm = t.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean);
                          return (
                            <div key={t.id} className="p-3 bg-gray-50 rounded-xl">
                              <div className="flex items-center gap-2 mb-1.5">
                                <span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement === 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span>
                                <span className="text-xs font-bold">{t.tournament}</span>
                                <span className="text-[10px] text-muted-foreground">{t.year} · {t.region}</span>
                              </div>
                              <div className="flex gap-1">{tPkm.map(p => p && <Image key={p.id} src={p.sprite} alt={p.name} width={26} height={26} className="rounded" unoptimized />)}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Curated teams for this archetype */}
                  {prebuiltArch.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Curated Teams</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {prebuiltArch.map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "prebuilt", id: t.id })}>
                            <div className="flex items-center gap-2 mb-1"><span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.tier === "S" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700")}>{t.tier}</span><span className="text-xs font-bold">{t.name}</span></div>
                            <p className="text-[10px] text-muted-foreground mb-1">{t.description}</p>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ML Predicted teams for this archetype */}
                  {metaPredictions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">ML Predictions for this Archetype</h4>
                      {metaPredictions.map(m => (
                        <div key={m.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-2">
                          <div className="flex items-center gap-2 mb-2"><span className="text-xs font-bold">{m.name}</span><span className="text-[10px] text-emerald-600">{m.confidence}% confidence · {m.metaShare}% meta share</span></div>
                          <div className="flex gap-1.5 mb-2">{m.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={28} height={28} className="rounded" unoptimized /> : null; })}</div>
                          <div className="space-y-1">{m.reasoning.map((r, ri) => <p key={ri} className="text-[10px] text-foreground"><span className="text-emerald-500">•</span> {r}</p>)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── MOVE MODAL ── */}
            {modal.kind === "move" && (() => {
              const moveName = modal.name;
              const mlMove = ML_BEST_MOVES.find(m => m.name === moveName);
              const pokemonWithMove = POKEMON_SEED.filter(p => p.moves.some(m => m.name === moveName));
              const moveData = pokemonWithMove.length > 0 ? pokemonWithMove[0].moves.find(m => m.name === moveName) : null;
              return (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-4">
                    {moveData && <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-lg font-bold" style={{ backgroundColor: TYPE_COLORS[moveData.type as PokemonType] }}><Zap className="w-7 h-7" /></div>}
                    <div>
                      <h2 className="text-2xl font-extrabold">{moveName}</h2>
                      {moveData && <div className="flex items-center gap-3 mt-1">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg text-white" style={{ backgroundColor: TYPE_COLORS[moveData.type as PokemonType] }}>{moveData.type}</span>
                        <span className="text-xs text-muted-foreground capitalize">{moveData.category}</span>
                        {moveData.power && <span className="text-xs text-muted-foreground">{moveData.power} BP</span>}
                        {moveData.accuracy && <span className="text-xs text-muted-foreground">{moveData.accuracy}% Acc</span>}
                        <span className="text-xs text-muted-foreground">{moveData.pp} PP</span>
                      </div>}
                    </div>
                  </div>

                  {moveData?.description && <p className="text-sm text-foreground bg-gray-50 p-4 rounded-xl">{moveData.description}</p>}

                  {/* ML performance */}
                  {mlMove && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 text-center">
                        <p className="text-4xl font-extrabold text-amber-700">{mlMove.wr}%</p>
                        <p className="text-xs text-muted-foreground mt-1">Win Rate (2M Battles)</p>
                        <div className="h-3 bg-amber-200 rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full bg-amber-500" style={{ width: `${mlMove.wr}%` }} /></div>
                      </div>
                      <div className="p-5 rounded-xl bg-cyan-50 border border-cyan-200 text-center">
                        <p className="text-4xl font-extrabold text-cyan-700">{mlMove.uses.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mt-1">Total Uses in Simulation</p>
                      </div>
                    </div>
                  )}

                  {/* Pokémon that learn this move */}
                  <div>
                    <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Pokémon with this Move ({pokemonWithMove.length})</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {pokemonWithMove.sort((a, b) => {
                        const aUsage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === a.id);
                        const bUsage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === b.id);
                        return (bUsage?.usageRate || 0) - (aUsage?.usageRate || 0);
                      }).slice(0, 12).map(pkm => {
                        const usage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === pkm.id);
                        const mlRank = ML_POKEMON_RANKINGS.findIndex(r => r.name === pkm.name);
                        return (
                          <div key={pkm.id} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                            <Image src={pkm.sprite} alt={pkm.name} width={32} height={32} className="rounded" unoptimized />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold truncate">{pkm.name}</p>
                              <div className="flex gap-0.5">{pkm.types.map(t => <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}</div>
                            </div>
                            <div className="text-right">
                              {usage && <p className="text-[10px] text-muted-foreground">{usage.usageRate}%</p>}
                              {mlRank >= 0 && <p className="text-[9px] text-emerald-600 font-medium">ML #{mlRank + 1}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── CORE PAIR MODAL ── */}
            {modal.kind === "core" && (() => {
              const pairName = modal.pair;
              const corePair = _VALID_CORE_PAIRS.find(cp => cp.name === pairName);
              const mlCore = ML_BEST_CORES.find(c => c.pair === pairName);
              const names = pairName.split(" + ");
              const pokemon1 = POKEMON_SEED.find(p => p.name === names[0]);
              const pokemon2 = POKEMON_SEED.find(p => p.name === names[1]);
              const teamsWithBoth = (pokemon1 && pokemon2) ? _VALID_CHAMPIONS_TEAMS.filter(t => t.pokemonIds.includes(pokemon1.id) && t.pokemonIds.includes(pokemon2.id)) : [];
              return (
                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      {pokemon1 && <Image src={pokemon1.officialArt} alt={pokemon1.name} width={80} height={80} className="drop-shadow-lg" unoptimized />}
                      <Swords className="w-6 h-6 text-emerald-400" />
                      {pokemon2 && <Image src={pokemon2.officialArt} alt={pokemon2.name} width={80} height={80} className="drop-shadow-lg" unoptimized />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold">{pairName}</h2>
                      {corePair && <p className="text-sm text-muted-foreground mt-1">{corePair.synergy}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {corePair && <>
                      <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center"><p className="text-3xl font-extrabold text-green-700">{corePair.winRate}%</p><p className="text-xs text-muted-foreground">Tournament WR</p></div>
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center"><p className="text-3xl font-extrabold text-blue-700">{corePair.usage}%</p><p className="text-xs text-muted-foreground">Usage Rate</p></div>
                    </>}
                    {mlCore && <>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center"><p className="text-3xl font-extrabold text-emerald-700">{mlCore.wr}%</p><p className="text-xs text-muted-foreground">ML Win Rate</p></div>
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center"><p className="text-3xl font-extrabold text-emerald-700">{mlCore.games.toLocaleString()}</p><p className="text-xs text-muted-foreground">ML Games</p></div>
                    </>}
                  </div>

                  {/* Individual Pokémon comparison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[pokemon1, pokemon2].map(pkm => {
                      if (!pkm) return null;
                      const usage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === pkm.id);
                      return (
                        <div key={pkm.id} className="p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                          <div className="flex items-center gap-3 mb-3">
                            <Image src={pkm.sprite} alt={pkm.name} width={48} height={48} className="rounded-lg" unoptimized />
                            <div>
                              <p className="text-sm font-bold">{pkm.name}</p>
                              <div className="flex gap-1">{pkm.types.map(t => <span key={t} className="px-1.5 py-0.5 text-[8px] font-bold uppercase rounded text-white" style={{ backgroundColor: TYPE_COLORS[t] }}>{t}</span>)}</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-6 gap-1">
                            {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                              <div key={stat} className="text-center">
                                <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                <p className="text-xs font-bold">{pkm.baseStats[stat]}</p>
                              </div>
                            ))}
                          </div>
                          {usage && <p className="text-[10px] text-muted-foreground mt-2">{usage.usageRate}% usage · {usage.winRate}% WR · {usage.topCutRate}% top cut</p>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Teams using this core */}
                  {teamsWithBoth.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold uppercase text-muted-foreground mb-3">Tournament Teams with this Core ({teamsWithBoth.length})</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {teamsWithBoth.sort((a, b) => a.placement - b.placement || b.players - a.players).slice(0, 6).map(t => (
                          <div key={t.id} className="p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-1"><span className={cn("px-1.5 py-0.5 text-[9px] font-bold rounded", t.placement === 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600")}>{t.placement === 1 ? "🥇" : `#${t.placement}`}</span><span className="text-xs font-bold">{t.tournament}</span><span className="text-[10px] text-muted-foreground">{t.player}</span></div>
                            <div className="flex gap-1">{t.pokemonIds.map(id => { const pm = POKEMON_SEED.find(pk => pk.id === id); return pm ? <Image key={id} src={pm.sprite} alt={pm.name} width={24} height={24} className="rounded" unoptimized /> : null; })}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* ── PREBUILT TEAM MODAL ── */}
            {modal.kind === "prebuilt" && (() => {
              const team = _VALID_PREBUILT_TEAMS.find(t => t.id === modal.id);
              if (!team) return <div className="p-8 text-center text-muted-foreground">Team not found</div>;
              const teamPokemon = team.pokemonIds.map((id, idx) => ({ pkm: POKEMON_SEED.find(p => p.id === id), set: team.sets[idx] }));
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-extrabold">{team.name}</h2>
                      <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", team.tier === "S" ? "bg-amber-100 text-amber-700" : team.tier === "A" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{team.tier}-Tier</span>
                      <span className="px-2 py-1 text-[10px] rounded-lg bg-emerald-50 text-emerald-600 font-medium capitalize">{team.archetype}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">{team.tags.map(tag => <span key={tag} className="px-2 py-0.5 text-[10px] rounded-lg bg-gray-100 text-gray-600 font-medium">{tag}</span>)}</div>
                  </div>

                  {/* Team sprite row */}
                  <div className="flex justify-center gap-4 py-2">
                    {teamPokemon.map(({ pkm }, i) => pkm && (
                      <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                        <Image src={pkm.officialArt} alt={pkm.name} width={72} height={72} className="drop-shadow-lg hover:scale-110 transition-transform" unoptimized />
                        <span className="text-[10px] font-semibold mt-1">{pkm.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Full sets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamPokemon.map(({ pkm, set }, i) => {
                      if (!pkm || !set) return null;
                      return (
                        <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Image src={pkm.sprite} alt={pkm.name} width={36} height={36} className="rounded" unoptimized />
                            <div>
                              <p className="text-sm font-bold">{pkm.name}</p>
                              <p className="text-[10px] text-muted-foreground">{set.name}</p>
                            </div>
                          </div>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between"><span className="text-muted-foreground">Ability</span><span className="font-semibold">{set.ability}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Item</span><span className="font-semibold">{set.item}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Nature</span><span className="font-semibold">{set.nature}</span></div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">Moves</p>
                              <div className="grid grid-cols-2 gap-1">
                                {set.moves.map(mv => {
                                  const moveDataFound = pkm.moves.find(m => m.name === mv);
                                  return (
                                    <div key={mv} className="flex items-center gap-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-100" onClick={() => setModal({ kind: "move", name: mv })}>
                                      {moveDataFound && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[moveDataFound.type as PokemonType] }} />}
                                      <span className="text-[10px] font-medium truncate">{mv}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">SP Distribution</p>
                              <div className="grid grid-cols-6 gap-1">
                                {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                  <div key={stat} className="text-center">
                                    <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                    <p className={cn("text-[10px] font-bold", set.sp[stat] >= 20 ? "text-emerald-600" : set.sp[stat] > 0 ? "text-gray-700" : "text-gray-400")}>{set.sp[stat]}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <Link href="/team-builder" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm">
                    <Sparkles className="w-4 h-4" /> Load in Team Builder <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })()}

            {modal.kind === "anti-meta" && (() => {
              const team = ANTI_META_TEAMS.find(t => t.id === modal.id);
              if (!team) return <div className="p-8 text-center text-muted-foreground">Team not found</div>;
              const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
              const corePokemon = team.coreIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
              const builderSlots = team.pokemonIds.map(id => {
                const sets = USAGE_DATA[id];
                const set = sets?.[0];
                return {
                  p: id,
                  a: set?.ability || undefined,
                  t: set?.nature || undefined,
                  m: set?.moves || [],
                  sp: set ? [set.sp.hp, set.sp.attack, set.sp.defense, set.sp.spAtk, set.sp.spDef, set.sp.speed] : [0,0,0,0,0,0],
                  i: set?.item || undefined,
                };
              });
              const builderJson = JSON.stringify({ n: team.name, s: builderSlots });
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="text-2xl font-extrabold">{team.name}</h2>
                      <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", team.winVsMeta >= 55 ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700")}>{team.winVsMeta}% WR vs Meta</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.strategy}</p>
                  </div>

                  {/* Team sprite row */}
                  <div className="flex justify-center gap-4 py-2">
                    {teamPokemon.map((pkm, i) => {
                      const isCore = corePokemon.some(c => c.id === pkm.id);
                      return (
                        <div key={i} className="flex flex-col items-center cursor-pointer relative" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                          <Image src={pkm.officialArt} alt={pkm.name} width={72} height={72} className={cn("drop-shadow-lg hover:scale-110 transition-transform", isCore && "ring-2 ring-purple-400 rounded-full")} unoptimized />
                          <span className="text-[10px] font-semibold mt-1">{pkm.name}</span>
                          {isCore && <span className="absolute -top-1 -right-1 px-1 py-0.5 text-[7px] font-bold bg-purple-500 text-white rounded">CORE</span>}
                        </div>
                      );
                    })}
                  </div>

                  {/* Details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Counters */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Beats These Archetypes</h5>
                      <div className="flex flex-wrap gap-1">
                        {team.counters.map(c => <span key={c} className="px-2 py-1 text-xs font-medium rounded-lg bg-green-50 text-green-600 border border-green-200">✓ {c}</span>)}
                      </div>
                    </div>
                    {/* Weaknesses */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Weak To</h5>
                      <div className="flex flex-wrap gap-1">
                        {team.weakTo.map(w => <span key={w} className="px-2 py-1 text-xs font-medium rounded-lg bg-red-50 text-red-600 border border-red-200">✗ {w}</span>)}
                      </div>
                    </div>
                  </div>

                  {/* Member sets from USAGE_DATA */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {teamPokemon.map((pkm) => {
                      const set = USAGE_DATA[pkm.id]?.[0];
                      if (!set) return (
                        <div key={pkm.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Image src={pkm.sprite} alt={pkm.name} width={36} height={36} className="rounded" unoptimized />
                            <p className="text-sm font-bold">{pkm.name}</p>
                          </div>
                          <p className="text-[10px] text-muted-foreground">No usage data available</p>
                        </div>
                      );
                      return (
                        <div key={pkm.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                          <div className="flex items-center gap-2 mb-3">
                            <Image src={pkm.sprite} alt={pkm.name} width={36} height={36} className="rounded" unoptimized />
                            <div>
                              <p className="text-sm font-bold">{pkm.name}</p>
                              {set.name && <p className="text-[10px] text-muted-foreground">{set.name}</p>}
                            </div>
                          </div>
                          <div className="space-y-1.5 text-xs">
                            <div className="flex justify-between"><span className="text-muted-foreground">Ability</span><span className="font-semibold">{set.ability}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Item</span><span className="font-semibold">{set.item}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Nature</span><span className="font-semibold">{set.nature}</span></div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">Moves</p>
                              <div className="grid grid-cols-2 gap-1">
                                {set.moves.map(mv => {
                                  const moveDataFound = pkm.moves.find(m => m.name === mv);
                                  return (
                                    <div key={mv} className="flex items-center gap-1 p-1 bg-white rounded cursor-pointer hover:bg-gray-100" onClick={() => setModal({ kind: "move", name: mv })}>
                                      {moveDataFound && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: TYPE_COLORS[moveDataFound.type as PokemonType] }} />}
                                      <span className="text-[10px] font-medium truncate">{mv}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div className="border-t border-gray-200 pt-1.5 mt-1.5">
                              <p className="text-[10px] text-muted-foreground uppercase mb-1">SP Distribution</p>
                              <div className="grid grid-cols-6 gap-1">
                                {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                  <div key={stat} className="text-center">
                                    <p className="text-[8px] text-muted-foreground">{{ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" }[stat]}</p>
                                    <p className={cn("text-[10px] font-bold", set.sp[stat] >= 20 ? "text-emerald-600" : set.sp[stat] > 0 ? "text-gray-700" : "text-gray-400")}>{set.sp[stat]}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button onClick={() => window.open("/team-builder?team=" + btoa(builderJson), "_blank")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm">
                    <Sparkles className="w-4 h-4" /> Open in Team Builder <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })()}

            {modal.kind === "tournament-team" && (() => {
              const team = _VALID_CHAMPIONS_TEAMS.find(t => t.id === modal.id);
              if (!team) return <div className="p-8 text-center text-muted-foreground">Team not found</div>;
              const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
              const allTypes = [...new Set(teamPokemon.flatMap(p => p.types))];
              const corePairs = _VALID_CORE_PAIRS.filter(cp => team.pokemonIds.includes(cp.pokemon1) && team.pokemonIds.includes(cp.pokemon2));
              // Build team builder URL - auto-fill first usage set per Pokemon
              const builderSlots = team.pokemonIds.map((id, idx) => {
                const sets = USAGE_DATA[id];
                const isMega = team.pokemonNames[idx]?.startsWith("Mega ");
                const set = isMega
                  ? sets?.find(s => s.name?.toLowerCase().includes("mega") || s.item?.endsWith("ite") || s.item?.endsWith("ite X") || s.item?.endsWith("ite Y")) || sets?.[0]
                  : sets?.[0];
                return {
                  p: id,
                  a: set?.ability || undefined,
                  t: set?.nature || undefined,
                  m: set?.moves || [],
                  sp: set ? [set.sp.hp, set.sp.attack, set.sp.defense, set.sp.spAtk, set.sp.spDef, set.sp.speed] : [0,0,0,0,0,0],
                  i: set?.item || undefined,
                  mg: isMega || undefined,
                };
              });
              const builderJson = JSON.stringify({ n: team.player + " - " + team.tournament, s: builderSlots });
              return (
                <div className="p-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h2 className="text-2xl font-extrabold">{team.tournament}</h2>
                      <span className={cn("px-2.5 py-1 text-xs font-bold rounded-lg", team.placement <= 1 ? "bg-amber-100 text-amber-700" : team.placement <= 2 ? "bg-gray-200 text-gray-700" : "bg-gray-100 text-gray-600")}>
                        {team.placement === 1 ? "🥇 1st Place" : team.placement === 2 ? "🥈 2nd Place" : `Top ${team.placement}`}
                      </span>
                      <span className="px-2 py-1 text-[10px] rounded-lg bg-emerald-50 text-emerald-600 font-medium">{team.wins}W-{team.losses}L</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.player} · {team.players} players</p>
                  </div>

                  {/* Team sprite row */}
                  <div className="flex justify-center gap-4 py-2">
                    {teamPokemon.map((pkm, i) => (
                      <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setModal({ kind: "pokemon", name: pkm.name })}>
                        <Image src={pkm.officialArt} alt={pkm.name} width={72} height={72} className="drop-shadow-lg hover:scale-110 transition-transform" unoptimized />
                        <span className="text-[10px] font-semibold mt-1">{pkm.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Team details grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Members + Stats */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Members</h5>
                      <div className="space-y-2">
                        {teamPokemon.map(p => {
                          const usage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === p.id);
                          return (
                            <div key={p.id} className="p-2 rounded-lg border cursor-pointer hover:bg-gray-50 transition-colors bg-white/50 border-gray-100" onClick={() => setModal({ kind: "pokemon", name: p.name })}>
                              <div className="flex items-center gap-2">
                                <Image src={p.sprite} alt={p.name} width={28} height={28} className="rounded" unoptimized />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold">{p.name}</p>
                                  <div className="flex gap-0.5">{p.types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t.slice(0, 3)}</span>)}</div>
                                </div>
                                {usage && <span className="text-[10px] text-muted-foreground">{usage.usageRate}% use</span>}
                              </div>
                              <div className="mt-1 grid grid-cols-6 gap-1">
                                {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                                  <div key={stat} className="text-center">
                                    <p className="text-[8px] text-muted-foreground">{({ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" } as Record<string, string>)[stat]}</p>
                                    <p className="text-[9px] font-bold">{p.baseStats[stat]}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Analysis */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Analysis</h5>
                      <div className="space-y-2">
                        <div className="p-2 bg-white/50 rounded-lg"><p className="text-[10px] text-muted-foreground uppercase">Player</p><p className="text-xs font-semibold">{team.player}</p></div>
                        <div className="p-2 bg-white/50 rounded-lg"><p className="text-[10px] text-muted-foreground uppercase">Tournament</p><p className="text-xs font-semibold">{team.tournament}</p></div>
                        <div className="p-2 bg-white/50 rounded-lg"><p className="text-[10px] text-muted-foreground uppercase">Placement</p><p className="text-xs font-semibold">{team.placement === 1 ? "1st Place (Champion)" : team.placement === 2 ? "2nd Place (Finalist)" : `Top ${team.placement}`}</p></div>
                        <div className="p-2 bg-white/50 rounded-lg"><p className="text-[10px] text-muted-foreground uppercase">Record</p><p className="text-xs font-semibold">{team.wins}W - {team.losses}L ({((team.wins / (team.wins + team.losses)) * 100).toFixed(0)}% WR)</p></div>
                        <div className="p-2 bg-white/50 rounded-lg"><p className="text-[10px] text-muted-foreground uppercase">Tournament Size</p><p className="text-xs font-semibold">{team.players} players</p></div>
                        <div className="p-2 bg-white/50 rounded-lg">
                          <p className="text-[10px] text-muted-foreground uppercase">Type Coverage</p>
                          <div className="flex flex-wrap gap-0.5 mt-0.5">{allTypes.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t}</span>)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Cores + Speed */}
                    <div>
                      <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Core Pairs in Team</h5>
                      {corePairs.length > 0 ? (
                        <div className="space-y-2">
                          {corePairs.sort((a, b) => b.winRate - a.winRate).map(cp => {
                            const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                            const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                            return (
                              <div key={cp.name} className="p-2 rounded-lg bg-white/50 border border-gray-100 cursor-pointer hover:bg-gray-50" onClick={() => setModal({ kind: "core", pair: cp.name })}>
                                <div className="flex items-center gap-2">
                                  {p1 && <Image src={p1.sprite} alt={p1.name} width={20} height={20} className="rounded" unoptimized />}
                                  <span className="text-[10px] text-muted-foreground">+</span>
                                  {p2 && <Image src={p2.sprite} alt={p2.name} width={20} height={20} className="rounded" unoptimized />}
                                  <span className="text-xs font-semibold flex-1">{cp.name}</span>
                                  <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground mt-0.5">{cp.usage}% usage · {cp.synergy}</p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No tracked core pairs in this team</p>
                      )}

                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Speed Tiers</h5>
                        <div className="space-y-1">
                          {[...teamPokemon].sort((a, b) => b.baseStats.speed - a.baseStats.speed).map(p => (
                            <div key={p.id} className="flex items-center gap-2">
                              <span className="text-[10px] font-mono font-bold w-6 text-right">{p.baseStats.speed}</span>
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, (p.baseStats.speed / 150) * 100)}%` }} />
                              </div>
                              <span className="text-[10px] text-muted-foreground w-16 truncate">{p.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => window.open("/team-builder?team=" + btoa(builderJson), "_blank")} className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm">
                    <Sparkles className="w-4 h-4" /> Open in Team Builder <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENT: Meta Team Card (clickable with expanded details)
// ══════════════════════════════════════════════════════════════════════════
function MetaTeamCard({ meta, expanded, onToggle }: { meta: MetaTeamPrediction; expanded: boolean; onToggle: () => void }) {
  return (
    <motion.div layout className={cn("rounded-xl border transition-all overflow-hidden", expanded ? "bg-emerald-50/30 border-emerald-300 col-span-full" : "glass border-gray-200/60 hover:border-emerald-300")}>
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded", meta.confidence >= 80 ? "bg-emerald-100 text-emerald-700" : meta.confidence >= 60 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600")}>{meta.confidence}%</span>
            <h4 className="text-sm font-bold">{meta.name}</h4>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn("text-xs font-medium", meta.recentTrend === "rising" ? "text-emerald-600" : meta.recentTrend === "falling" ? "text-red-500" : "text-gray-500")}>{meta.recentTrend === "rising" ? "↑ Rising" : meta.recentTrend === "falling" ? "↓ Falling" : "→ Stable"}</span>
            <span className="text-xs text-muted-foreground">{meta.metaShare}% share</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
        <div className="flex gap-2 mb-2">
          {meta.pokemonIds.map(id => {
            const p = POKEMON_SEED.find(pk => pk.id === id);
            return p ? (
              <div key={id} className="flex flex-col items-center">
                <Image src={p.sprite} alt={p.name} width={36} height={36} className="rounded" unoptimized />
                <span className="text-[8px] text-muted-foreground mt-0.5 truncate w-10 text-center">{p.name}</span>
              </div>
            ) : null;
          })}
        </div>
        {meta.corePairs.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {meta.corePairs.map(cp => <span key={cp} className="px-1.5 py-0.5 text-[9px] rounded bg-emerald-50 text-emerald-600 font-medium">{cp}</span>)}
          </div>
        )}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-emerald-200 pt-3" />

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Prediction Reasoning</h5>
                  <div className="space-y-1.5">
                    {meta.reasoning.map((r, i) => (
                      <p key={i} className="text-xs text-foreground flex items-start gap-1.5"><span className="text-emerald-500 mt-px flex-shrink-0">•</span>{r}</p>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Composition</h5>
                  <div className="space-y-1.5">
                    {meta.pokemonIds.map(id => {
                      const p = POKEMON_SEED.find(pk => pk.id === id);
                      if (!p) return null;
                      const usage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === id);
                      return (
                        <div key={id} className="flex items-center gap-2 p-1.5 rounded-lg bg-white/50">
                          <Image src={p.sprite} alt={p.name} width={24} height={24} className="rounded" unoptimized />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{p.name}</p>
                            <div className="flex gap-0.5">{p.types.map(t => <span key={t} className="w-2 h-2 rounded-full" style={{ backgroundColor: TYPE_COLORS[t] }} />)}</div>
                          </div>
                          <div className="text-right">
                            {usage && <p className="text-[10px] text-muted-foreground">{usage.usageRate}% use · {usage.winRate}% WR</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Meta Position</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Confidence</span><span className="text-xs font-bold">{meta.confidence}%</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Meta Share</span><span className="text-xs font-bold">{meta.metaShare}%</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Historical Wins</span><span className="text-xs font-bold">{meta.historicalWins}</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Archetype</span><span className="text-xs font-bold capitalize">{meta.archetype}</span></div>
                    <div className="flex justify-between p-2 bg-white/50 rounded-lg"><span className="text-xs text-muted-foreground">Trend</span><span className={cn("text-xs font-bold", meta.recentTrend === "rising" ? "text-emerald-600" : meta.recentTrend === "falling" ? "text-red-600" : "text-gray-600")}>{meta.recentTrend === "rising" ? "↑ Rising" : meta.recentTrend === "falling" ? "↓ Falling" : "→ Stable"}</span></div>
                  </div>
                  <Link href="/team-builder" className="mt-3 flex items-center gap-1.5 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                    <Sparkles className="w-3 h-3" /> Load in Team Builder <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════
// COMPONENT: Tournament Team Card (clickable with advanced details)
// ══════════════════════════════════════════════════════════════════════════
function TournamentTeamCard({ team, expanded, onToggle }: { team: TournamentTeam; expanded: boolean; onToggle: () => void }) {
  const megaId = getMegaIdFromArchetype(team.archetype);
  const teamPokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p);
  const allTypes = [...new Set(teamPokemon.flatMap(p => p.types))];
  const corePairs = _VALID_CORE_PAIRS.filter(cp => team.pokemonIds.includes(cp.pokemon1) && team.pokemonIds.includes(cp.pokemon2));

  return (
    <motion.div layout className={cn("rounded-xl border transition-all overflow-hidden", expanded ? "bg-emerald-50/30 border-emerald-300" : "glass border-gray-200/60 hover:border-emerald-300")}>
      <button onClick={onToggle} className="w-full text-left p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("px-2 py-0.5 text-[10px] font-bold uppercase rounded", team.placement <= 1 ? "bg-amber-100 text-amber-700" : team.placement <= 2 ? "bg-gray-200 text-gray-700" : team.placement <= 4 ? "bg-orange-50 text-orange-700" : "bg-gray-100 text-gray-500")}>
              {team.placement === 1 ? "🥇 1st" : team.placement === 2 ? "🥈 2nd" : `Top ${team.placement}`}
            </span>
            <h4 className="text-sm font-bold">{team.tournament}</h4>
            <span className="text-xs text-muted-foreground">{team.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 text-[9px] rounded bg-emerald-50 text-emerald-600 font-medium capitalize">{team.archetype}</span>
            {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
          </div>
        </div>
        <div className="flex gap-1.5">
          {teamPokemon.map(p => {
            const isMega = megaId === p.id;
            return (
              <div key={p.id} className="flex flex-col items-center">
                <div className="relative">
                  <Image src={isMega ? getMegaSprite(p) : p.sprite} alt={isMega ? getMegaName(p) : p.name} width={32} height={32} className="rounded" unoptimized />
                  {isMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded shadow-sm">M</span>}
                </div>
                <span className={cn("text-[7px] mt-0.5 truncate w-10 text-center", isMega ? "text-amber-600 font-bold" : "text-muted-foreground")}>{isMega ? getMegaName(p) : p.name}</span>
              </div>
            );
          })}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-4 pb-4 space-y-4">
              <div className="border-t border-emerald-200 pt-3" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Team Members Detail */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Members ({teamPokemon.length})</h5>
                  <div className="space-y-2">
                    {teamPokemon.map(p => {
                      const usage = _VALID_TOURNAMENT_USAGE.find(u => u.pokemonId === p.id);
                      const mlRank = ML_POKEMON_RANKINGS.findIndex(r => r.name === p.name);
                      const pIsMega = megaId === p.id;
                      return (
                        <div key={p.id} className={cn("p-2 rounded-lg border", pIsMega ? "bg-amber-50/50 border-amber-200" : "bg-white/50 border-gray-100")}>
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <Image src={pIsMega ? getMegaSprite(p) : p.sprite} alt={pIsMega ? getMegaName(p) : p.name} width={28} height={28} className="rounded" unoptimized />
                              {pIsMega && <span className="absolute -top-1 -right-1 px-0.5 text-[6px] font-bold bg-amber-500 text-white rounded shadow-sm">M</span>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold">{pIsMega ? getMegaName(p) : p.name}{pIsMega && <span className="ml-1 text-[8px] text-amber-600 font-bold">MEGA</span>}</p>
                              <div className="flex gap-0.5">{p.types.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t.slice(0, 3)}</span>)}</div>
                            </div>
                            <div className="text-right text-[10px]">
                              {usage && <p className="text-muted-foreground">{usage.usageRate}% use</p>}
                              {mlRank >= 0 && <p className="text-emerald-600 font-medium">ML #{mlRank + 1}</p>}
                            </div>
                          </div>
                          <div className="mt-1 grid grid-cols-6 gap-1">
                            {(["hp", "attack", "defense", "spAtk", "spDef", "speed"] as const).map(stat => (
                              <div key={stat} className="text-center">
                                <p className="text-[8px] text-muted-foreground">{({ hp: "HP", attack: "Atk", defense: "Def", spAtk: "SpA", spDef: "SpD", speed: "Spe" } as any)[stat]}</p>
                                <p className="text-[9px] font-bold">{p.baseStats[stat]}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Team Analysis */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Team Analysis</h5>
                  <div className="space-y-2">
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Archetype</p>
                      <p className="text-xs font-semibold capitalize">{team.archetype}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Event</p>
                      <p className="text-xs font-semibold">{team.tournament} ({team.year})</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Placement</p>
                      <p className="text-xs font-semibold">{team.placement === 1 ? "1st Place (Champion)" : team.placement === 2 ? "2nd Place (Finalist)" : `Top ${team.placement}`}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Region</p>
                      <p className="text-xs font-semibold">{team.region}</p>
                    </div>
                    <div className="p-2 bg-white/50 rounded-lg">
                      <p className="text-[10px] text-muted-foreground uppercase">Type Coverage</p>
                      <div className="flex flex-wrap gap-0.5 mt-0.5">
                        {allTypes.map(t => <span key={t} className="px-1 py-0.5 text-[7px] font-bold uppercase rounded text-white/90" style={{ backgroundColor: `${TYPE_COLORS[t]}AA` }}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cores & Synergies */}
                <div>
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Core Pairs in Team</h5>
                  {corePairs.length > 0 ? (
                    <div className="space-y-2">
                      {corePairs.sort((a, b) => b.winRate - a.winRate).map(cp => {
                        const p1 = POKEMON_SEED.find(p => p.id === cp.pokemon1);
                        const p2 = POKEMON_SEED.find(p => p.id === cp.pokemon2);
                        const cpTier = cp.usage >= 20 ? "S" : cp.usage >= 12 ? "A" : cp.usage >= 6 ? "B" : "C";
                        return (
                          <div key={cp.name} className="p-2 rounded-lg bg-white/50 border border-gray-100">
                            <div className="flex items-center gap-2">
                              {p1 && <Image src={p1.sprite} alt={p1.name} width={20} height={20} className="rounded" unoptimized />}
                              <span className="text-[10px] text-muted-foreground">+</span>
                              {p2 && <Image src={p2.sprite} alt={p2.name} width={20} height={20} className="rounded" unoptimized />}
                              <span className="text-xs font-semibold flex-1">{cp.name}</span>
                              <span className={cn("text-xs font-bold", cp.winRate >= 55 ? "text-green-600" : "text-gray-700")}>{cp.winRate}%</span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Tier {cpTier} · {cp.usage}% usage · {cp.synergy}</p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No tracked core pairs in this team</p>
                  )}

                  {/* Speed Tiers */}
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <h5 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Speed Tiers</h5>
                    <div className="space-y-1">
                      {teamPokemon.sort((a, b) => b.baseStats.speed - a.baseStats.speed).map(p => (
                        <div key={p.id} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold w-6 text-right">{p.baseStats.speed}</span>
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" style={{ width: `${Math.min(100, (p.baseStats.speed / 150) * 100)}%` }} />
                          </div>
                          <span className="text-[10px] text-muted-foreground w-16 truncate">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
