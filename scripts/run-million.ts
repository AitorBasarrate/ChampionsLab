// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — 1 MILLION BATTLE SIMULATION
// Full-scale ML training with all tournament teams, generated teams, and prebuilts
// ═══════════════════════════════════════════════════════════════════════════════

import { runMLSimulation, formatReport, type FinalReport } from "../src/lib/engine/ml-runner";
import fs from "fs";
import path from "path";

const TARGET_BATTLES = 2_000_000;

async function main() {
  console.log("═══════════════════════════════════════════════════════════");
  console.log("  CHAMPIONS LAB — 2,000,000 BATTLE ML SIMULATION");
  console.log("  250 Tournament Teams (2005–2025) + 200 Generated + 15 Prebuilt");
  console.log("  137 Pokémon | All Archetypes | Full ELO + Meta Analysis");
  console.log("═══════════════════════════════════════════════════════════\n");

  const startTime = Date.now();
  let lastProgressBattles = 0;

  const report = await runMLSimulation({
    durationMs: 86400000,          // 24h ceiling (battle count will stop us first)
    maxBattles: TARGET_BATTLES,
    batchSize: 100,                // Large batches for throughput
    iterationsPerBattle: 7,        // 7 MC samples per matchup (balanced accuracy + speed)
    onProgress: (progress) => {
      // Print every 10,000 battles
      if (progress.battlesCompleted - lastProgressBattles >= 10000) {
        lastProgressBattles = progress.battlesCompleted;
        const elapsed = Math.round((Date.now() - startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const pct = Math.round((progress.battlesCompleted / TARGET_BATTLES) * 100);
        const eta = progress.battlesPerSecond > 0
          ? Math.round((TARGET_BATTLES - progress.battlesCompleted) / progress.battlesPerSecond)
          : 0;
        const etaMins = Math.floor(eta / 60);
        const etaSecs = eta % 60;

        process.stdout.write(
          `\r  [${mins}:${secs.toString().padStart(2, "0")}] ` +
          `${progress.battlesCompleted.toLocaleString()}/${TARGET_BATTLES.toLocaleString()} battles (${pct}%) | ` +
          `${progress.battlesPerSecond.toFixed(1)}/s | ` +
          `ETA ${etaMins}:${etaSecs.toString().padStart(2, "0")} | ` +
          `Insights: ${progress.recentInsights.length}   `
        );
      }
    },
    onInsight: (insight) => {
      if (insight) {
        console.log(`\n  ⚡ [INSIGHT] ${insight.description}`);
      }
    },
  });

  console.log("\n");
  console.log(formatReport(report));

  // ── EXPORT SIMULATION DATA ──────────────────────────────────────────────
  const simData = buildSimulationData(report);
  const antiMeta = buildAntiMetaRankings(report);
  const antiMetaTeams = buildAntiMetaTeams(report, antiMeta);
  const outDir = path.dirname(new URL(import.meta.url).pathname);
  const outPath = path.join(outDir, "..", "src", "lib", "simulation-data.ts");

  const tsContent = `// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB — AUTO-GENERATED SIMULATION DATA
// Generated from ${report.totalBattles.toLocaleString()} mega-aware battle simulations
// Date: ${new Date().toISOString()}
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
export const SIM_POKEMON: Record<string, SimPokemonData> = ${JSON.stringify(simData.pokemon, null, 2)};

/** Best core pairs from simulation */
export const SIM_PAIRS: SimPairData[] = ${JSON.stringify(simData.pairs, null, 2)};

/** Archetype rankings from simulation */
export const SIM_ARCHETYPES: SimArchetypeData[] = ${JSON.stringify(simData.archetypes, null, 2)};

/** Top moves by win rate from simulation */
export const SIM_MOVES: SimMoveData[] = ${JSON.stringify(simData.moves, null, 2)};

/** Meta tier snapshot from simulation */
export const SIM_META: SimMetaSnapshot = ${JSON.stringify(simData.meta, null, 2)};

/** Total battles simulated */
export const SIM_TOTAL_BATTLES = ${report.totalBattles};

/** Simulation date */
export const SIM_DATE = "${new Date().toISOString()}";

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

export const ANTI_META_TEAMS: AntiMetaTeam[] = ${JSON.stringify(antiMetaTeams, null, 2)};

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

export const ANTI_META_RANKINGS: AntiMetaEntry[] = ${JSON.stringify(antiMeta, null, 2)};
`;

  // ── PRESERVE REAL TOURNAMENT DATA FROM EXISTING FILE ─────────────────────
  const existingContent = fs.existsSync(outPath) ? fs.readFileSync(outPath, "utf-8") : "";
  const tournamentMatch = existingContent.match(
    /(\/\/ ═{10,}\n\/\/ CHAMPIONS TOURNAMENT USAGE[\s\S]*$)/
  );
  const tournamentSection = tournamentMatch ? "\n" + tournamentMatch[1] : "";

  const fullContent = tsContent + tournamentSection;

  fs.writeFileSync(outPath, fullContent, "utf-8");
  console.log(`\n  ✅ Simulation data exported to: ${outPath}`);

  const totalTime = Math.round((Date.now() - startTime) / 1000);
  const totalMins = Math.floor(totalTime / 60);
  const totalSecs = totalTime % 60;

  console.log(`\n════════════════════════════════════════════════════`);
  console.log(`  COMPLETED: ${report.totalBattles.toLocaleString()} battles in ${totalMins}m ${totalSecs}s`);
  console.log(`  Teams in pool: ${report.teamRankings.length}`);
  console.log(`  Pokémon tracked: ${report.pokemonRankings.length}`);
  console.log(`  Moves analyzed: ${report.moveRankings.length}`);
  console.log(`  Archetypes ranked: ${report.archetypeRankings.length}`);
  console.log(`════════════════════════════════════════════════════\n`);
}

main().catch(console.error);

function buildSimulationData(report: FinalReport) {
  const pokemon: Record<string, SimPokemonData> = {};

  for (const p of report.pokemonRankings) {
    const isMega = p.name.includes("Mega ");
    let key: string;
    if (!isMega) {
      key = `${p.id}`;
    } else {
      const suffix = p.name.match(/ ([XYZ])$/)?.[1];
      key = suffix ? `${p.id}-mega-${suffix.toLowerCase()}` : `${p.id}-mega`;
    }
    pokemon[key] = {
      id: p.id,
      name: p.name,
      isMega,
      elo: p.elo,
      winRate: p.winRate,
      appearances: p.appearances,
      wins: p.wins,
      losses: p.losses,
      bestPartners: p.bestPartners.slice(0, 5).map(bp => ({
        name: bp.name, winRate: bp.winRate, games: bp.games,
      })),
      bestSets: p.bestSets.slice(0, 3).map(bs => ({
        set: bs.set, winRate: bs.winRate, games: bs.games,
      })),
    };
  }

  const pairs = report.bestPairs.slice(0, 50).map(p => ({
    pokemon1: p.pokemon1,
    pokemon2: p.pokemon2,
    winRate: p.winRate,
    games: p.games,
  }));

  const archetypes = report.archetypeRankings.slice(0, 50).map(a => ({
    name: a.name,
    elo: a.elo,
    winRate: a.winRate,
    wins: a.wins,
    losses: a.losses,
  }));

  const moves = report.moveRankings.slice(0, 50).map(m => ({
    name: m.name,
    winRate: m.winRate,
    appearances: m.appearances,
  }));

  return { pokemon, pairs, archetypes, meta: report.metaSnapshot, moves };
}

interface SimPokemonData {
  id: number; name: string; isMega: boolean;
  elo: number; winRate: number; appearances: number;
  wins: number; losses: number;
  bestPartners: { name: string; winRate: number; games: number }[];
  bestSets: { set: string; winRate: number; games: number }[];
}

function buildAntiMetaRankings(report: FinalReport) {
  const MIN_GAMES = 50;
  const META_SIZE = 15;
  const qualified = report.pokemonRankings.filter(p => p.appearances >= MIN_GAMES);
  const metaThreats = qualified.slice(0, META_SIZE);
  const metaNames = new Set(metaThreats.map(p => p.name));
  const candidates = qualified.filter(p => !metaNames.has(p.name));
  const underrated = new Set(report.metaSnapshot.underratedPokemon ?? []);

  const scored = candidates.map(p => {
    const wrScore = Math.max(0, (p.winRate - 45) * 2);
    const eloScore = Math.max(0, (p.elo - 1400) / 20);
    const underratedBonus = underrated.has(p.name) ? 5 : 0;
    const gamesConfidence = Math.min(1, p.appearances / 200);
    const rawScore = (wrScore * 0.5 + eloScore * 0.4 + underratedBonus) * gamesConfidence;
    const score = Math.round(Math.min(100, Math.max(0, rawScore)));
    const winVsMeta = p.winRate;
    const bestInto = metaThreats.filter((_, i) => i >= META_SIZE / 3).slice(0, 3).map(m => m.name);
    const weakTo = metaThreats.slice(0, 3).map(m => m.name);

    return {
      id: p.id,
      name: p.name,
      score,
      winVsMeta: Math.round(winVsMeta * 10) / 10,
      counterCount: bestInto.length,
      bestInto,
      weakTo,
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 15);
}

function buildAntiMetaTeams(
  report: FinalReport,
  antiMetaRankings: { id: number; name: string; score: number; winVsMeta: number; counterCount: number; bestInto: string[]; weakTo: string[] }[]
) {
  const TEAM_SIZE = 6;
  const NUM_TEAMS = 6;
  const pokemonById = new Map(report.pokemonRankings.map(p => [p.id, p]));
  const pokemonByName = new Map(report.pokemonRankings.map(p => [p.name, p]));

  // Archetype names for strategy generation
  const topArchetypes = report.archetypeRankings.slice(0, 10).map(a => a.name);
  const metaNames = new Set(report.metaSnapshot.tier1.concat(report.metaSnapshot.tier2 ?? []));

  const usedCores = new Set<string>();
  const teams: {
    id: string; name: string; strategy: string;
    pokemonIds: number[]; coreIds: number[];
    winVsMeta: number; counters: string[]; weakTo: string[];
  }[] = [];

  // For each top anti-meta mon, build a team around it + its best partners
  for (let i = 0; i < Math.min(NUM_TEAMS, antiMetaRankings.length); i++) {
    const anchor = antiMetaRankings[i];
    const anchorPoke = pokemonById.get(anchor.id);
    if (!anchorPoke) continue;

    // Find unique core from best partners
    const teamIds = new Set<number>([anchor.id]);
    const coreIds: number[] = [anchor.id];

    // Add best partners that aren't already used as cores
    for (const partner of anchorPoke.bestPartners) {
      if (teamIds.size >= 3) break; // core = 2-3 mons
      const partnerPoke = pokemonByName.get(partner.name);
      if (!partnerPoke) continue;
      const coreKey = [anchor.id, partnerPoke.id].sort().join("-");
      if (usedCores.has(coreKey)) continue;
      teamIds.add(partnerPoke.id);
      coreIds.push(partnerPoke.id);
      usedCores.add(coreKey);
    }

    // Fill remaining slots from best pairs and high-WR mons not in team
    const pairPartners = report.bestPairs
      .filter(p => {
        const n1 = pokemonByName.get(p.pokemon1);
        const n2 = pokemonByName.get(p.pokemon2);
        return (n1 && teamIds.has(n1.id)) || (n2 && teamIds.has(n2.id));
      })
      .flatMap(p => [p.pokemon1, p.pokemon2])
      .map(n => pokemonByName.get(n))
      .filter((p): p is NonNullable<typeof p> => !!p && !teamIds.has(p.id));

    for (const p of pairPartners) {
      if (teamIds.size >= TEAM_SIZE) break;
      teamIds.add(p.id);
    }

    // If still not full, fill from high-WR mons
    for (const p of report.pokemonRankings) {
      if (teamIds.size >= TEAM_SIZE) break;
      if (!teamIds.has(p.id)) teamIds.add(p.id);
    }

    const avgWinRate = [...teamIds].reduce((sum, id) => {
      const p = pokemonById.get(id);
      return sum + (p?.winRate ?? 50);
    }, 0) / teamIds.size;

    // Generate name from anchor + archetype hints
    const nameOptions = [
      `${anchorPoke.name} Core`,
      `${anchorPoke.name} + ${anchorPoke.bestPartners[0]?.name ?? "Partners"}`,
    ];

    teams.push({
      id: `am-${i + 1}`,
      name: nameOptions[0],
      strategy: `Built around ${anchorPoke.name} (${anchor.score} anti-meta score). Counters ${anchor.bestInto.slice(0, 2).join(" and ")}.`,
      pokemonIds: [...teamIds].slice(0, TEAM_SIZE),
      coreIds,
      winVsMeta: Math.round(avgWinRate * 10) / 10,
      counters: anchor.bestInto.slice(0, 3),
      weakTo: anchor.weakTo.slice(0, 2),
    });
  }

  return teams;
}
