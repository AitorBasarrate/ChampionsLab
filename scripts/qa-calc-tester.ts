// ═══════════════════════════════════════════════════════════════════════
// QA Script for Damage Calculator & Team Tester
// Run: npx tsx scripts/qa-calc-tester.ts
// ═══════════════════════════════════════════════════════════════════════

import { POKEMON_SEED } from "../src/lib/pokemon-data";
import { USAGE_DATA } from "../src/lib/usage-data";
import {
  calculateDamage,
  calculateStats,
  formatDamageResult,
  getBestMove,
  type DamageCalcPokemon,
  type DamageCalcTarget,
  type DamageCalcOptions,
  type DamageResult,
  type NatureName,
  NATURES,
  getNatureModifier,
  getMove,
  runSimulation,
  PREBUILT_TEAMS,
} from "../src/lib/engine";
import {
  simulateBattleWithLog,
  simulateBattle,
} from "../src/lib/engine/battle-sim";
import type { ChampionsPokemon, CommonSet } from "../src/lib/types";

let passed = 0;
let failed = 0;

function assert(condition: boolean, label: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✅ ${label}`);
  } else {
    failed++;
    console.error(`  ❌ ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function getPokemon(name: string): ChampionsPokemon {
  const p = POKEMON_SEED.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!p) throw new Error(`Pokemon not found: ${name}`);
  return p;
}

function getSet(p: ChampionsPokemon): CommonSet {
  const usage = USAGE_DATA[p.id];
  if (usage && usage.length > 0) return usage[0];
  return {
    name: p.name,
    nature: "Adamant",
    ability: p.abilities[0]?.name ?? "",
    item: "Life Orb",
    moves: p.moves.filter(m => m.category !== "status").slice(0, 4).map(m => m.name),
    sp: { hp: 2, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 },
  };
}

// ── TEST 1: Stat Calculation ──────────────────────────────────────────

console.log("\n🔬 TEST 1: Stat Calculation (SP System)");
{
  // Garchomp base: HP 108, Atk 130, Def 95, SpA 80, SpD 85, Spe 102
  const garchomp = getPokemon("Garchomp");
  const stats = calculateStats(garchomp.baseStats, { hp: 0, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 32 }, "Jolly");
  
  // HP = floor((2*108+31)*50/100) + 60 + 0 = floor(123.5) + 60 = 123+60 = 183
  // Atk = floor(((2*130+31)*50/100+5)*1.0) + 32 = floor(150.5+5) + 32 = 155+32 = 187 (no nature boost on Atk for Jolly)
  // Spe = floor(((2*102+31)*50/100+5)*1.1) + 32 = floor((117.5+5)*1.1) + 32 = floor(134.75) + 32 = 134+32 = 166
  
  assert(stats.hp === 183, `Garchomp HP = ${stats.hp} (expected 183)`);
  assert(stats.speed === 166, `Garchomp Spe (Jolly, 32SP) = ${stats.speed} (expected 166)`);
  
  // Test Adamant nature boost on Attack
  const atkStats = calculateStats(garchomp.baseStats, { hp: 0, attack: 32, defense: 0, spAtk: 0, spDef: 0, speed: 0 }, "Adamant");
  // Atk = floor(((2*130+31)*50/100+5)*1.1) + 32 = floor((145.5+5)*1.1) + 32 = floor(165.55) + 32 = 165+32 = 197
  assert(atkStats.attack === 197, `Garchomp Atk (Adamant, 32SP) = ${atkStats.attack} (expected 197)`);
}

// ── TEST 2: Basic Damage Calculation ──────────────────────────────────

console.log("\n🔬 TEST 2: Basic Damage Calculation");
{
  const incin = getPokemon("Incineroar");
  const rillaboom = getPokemon("Venusaur");
  const incinSet = getSet(incin);
  const rillaSet = getSet(rillaboom);
  
  const atkData: DamageCalcPokemon = {
    baseStats: incin.baseStats,
    sp: incinSet.sp,
    nature: incinSet.nature as NatureName,
    types: incin.types,
    ability: incinSet.ability,
    item: incinSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: rillaboom.baseStats,
    sp: rillaSet.sp,
    nature: rillaSet.nature as NatureName,
    types: rillaboom.types,
    ability: rillaSet.ability,
    item: rillaSet.item,
  };
  
  // Check that Flare Blitz (fire vs grass) is super effective
  const flareBlitz = incin.moves.find(m => m.name === "Flare Blitz");
  if (flareBlitz) {
    const result = calculateDamage(atkData, defData, "Flare Blitz", { isDoubles: true });
    assert(result.effectiveness === 2, `Flare Blitz SE on Venusaur: ×${result.effectiveness}`);
    assert(result.damage[0] > 0, `Flare Blitz does damage: ${result.damage[0]}-${result.damage[1]}`);
    assert(result.percentHP[0] > 0, `Flare Blitz % HP: ${result.percentHP[0].toFixed(1)}-${result.percentHP[1].toFixed(1)}%`);
    console.log(`    → Flare Blitz: ${result.percentHP[0].toFixed(1)}-${result.percentHP[1].toFixed(1)}% (${getKOText(result)})`);
  } else {
    assert(false, "Incineroar should have Flare Blitz");
  }
}

function getKOText(r: DamageResult): string {
  if (r.isOHKO) return "OHKO";
  if (r.is2HKO) return "2HKO";
  return `${Math.ceil(100 / ((r.percentHP[0] + r.percentHP[1]) / 2))}HKO`;
}

// ── TEST 3: Weather Effects ────────────────────────────────────────────

console.log("\n🔬 TEST 3: Weather Effects on Damage");
{
  const torkoal = getPokemon("Torkoal");
  const porygon2 = getPokemon("Snorlax");
  const torkoalSet = getSet(torkoal);
  const porygonSet = getSet(porygon2);
  
  const atkData: DamageCalcPokemon = {
    baseStats: torkoal.baseStats,
    sp: torkoalSet.sp,
    nature: torkoalSet.nature as NatureName,
    types: torkoal.types,
    ability: torkoalSet.ability,
    item: torkoalSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: porygon2.baseStats,
    sp: porygonSet.sp,
    nature: porygonSet.nature as NatureName,
    types: porygon2.types,
    ability: porygonSet.ability,
    item: porygonSet.item,
  };
  
  // Find a fire move on Torkoal
  const fireMove = torkoal.moves.find(m => m.type === "fire" && m.category !== "status");
  if (fireMove) {
    const noWeather = calculateDamage(atkData, defData, fireMove.name, { weather: "none", isDoubles: true });
    const sun = calculateDamage(atkData, defData, fireMove.name, { weather: "sun", isDoubles: true });
    const rain = calculateDamage(atkData, defData, fireMove.name, { weather: "rain", isDoubles: true });
    
    assert(sun.damage[1] > noWeather.damage[1], `Sun boosts Fire (${sun.damage[1]} > ${noWeather.damage[1]})`);
    assert(rain.damage[1] < noWeather.damage[1], `Rain weakens Fire (${rain.damage[1]} < ${noWeather.damage[1]})`);
    console.log(`    → ${fireMove.name}: No weather ${noWeather.percentHP[0].toFixed(1)}-${noWeather.percentHP[1].toFixed(1)}%, Sun ${sun.percentHP[0].toFixed(1)}-${sun.percentHP[1].toFixed(1)}%, Rain ${rain.percentHP[0].toFixed(1)}-${rain.percentHP[1].toFixed(1)}%`);
  }
}

// ── TEST 4: Screens Effect ─────────────────────────────────────────────

console.log("\n🔬 TEST 4: Screens Reduce Damage");
{
  // Use Venusaur (special attacker) and Garchomp (physical attacker) with known engine moves
  const venusaur = getPokemon("Venusaur");
  const garchomp = getPokemon("Garchomp");
  const incineroar = getPokemon("Incineroar");
  const venSet = getSet(venusaur);
  const garchSet = getSet(garchomp);
  const incinSet = getSet(incineroar);
  
  // Special: Venusaur's Leaf Storm vs Incineroar
  const spAtkData: DamageCalcPokemon = {
    baseStats: venusaur.baseStats,
    sp: venSet.sp,
    nature: venSet.nature as NatureName,
    types: venusaur.types,
    ability: venSet.ability,
    item: venSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: incineroar.baseStats,
    sp: incinSet.sp,
    nature: incinSet.nature as NatureName,
    types: incineroar.types,
    ability: incinSet.ability,
    item: incinSet.item,
  };
  
  const noScreen = calculateDamage(spAtkData, defData, "Leaf Storm", { isDoubles: true });
  const withScreen = calculateDamage(spAtkData, defData, "Leaf Storm", { isDoubles: true, lightScreen: true });
  assert(withScreen.damage[1] < noScreen.damage[1], `Light Screen reduces special damage (${withScreen.damage[1]} < ${noScreen.damage[1]})`);
  
  // Physical: Garchomp's Earthquake vs Incineroar
  const physAtkData: DamageCalcPokemon = {
    baseStats: garchomp.baseStats,
    sp: garchSet.sp,
    nature: garchSet.nature as NatureName,
    types: garchomp.types,
    ability: garchSet.ability,
    item: garchSet.item,
  };
  
  const noReflect = calculateDamage(physAtkData, defData, "Earthquake", { isDoubles: true });
  const withReflect = calculateDamage(physAtkData, defData, "Earthquake", { isDoubles: true, reflect: true });
  assert(withReflect.damage[1] < noReflect.damage[1], `Reflect reduces physical damage (${withReflect.damage[1]} < ${noReflect.damage[1]})`);
}

// ── TEST 5: Helping Hand ────────────────────────────────────────────────

console.log("\n🔬 TEST 5: Helping Hand Boost");
{
  const garchomp = getPokemon("Garchomp");
  const rillaboom = getPokemon("Venusaur");
  const garchompSet = getSet(garchomp);
  const rillaSet = getSet(rillaboom);
  
  const atkData: DamageCalcPokemon = {
    baseStats: garchomp.baseStats,
    sp: garchompSet.sp,
    nature: garchompSet.nature as NatureName,
    types: garchomp.types,
    ability: garchompSet.ability,
    item: garchompSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: rillaboom.baseStats,
    sp: rillaSet.sp,
    nature: rillaSet.nature as NatureName,
    types: rillaboom.types,
    ability: rillaSet.ability,
    item: rillaSet.item,
  };
  
  // Use Earthquake (known engine move)
  const noHH = calculateDamage(atkData, defData, "Earthquake", { isDoubles: true });
  const withHH = calculateDamage(atkData, defData, "Earthquake", { isDoubles: true, helpingHand: true });
  assert(withHH.damage[1] > noHH.damage[1], `Helping Hand boosts damage (${withHH.damage[1]} > ${noHH.damage[1]})`);
}

// ── TEST 6: Critical Hit ────────────────────────────────────────────────

console.log("\n🔬 TEST 6: Critical Hit Damage");
{
  const garchomp = getPokemon("Garchomp");
  const porygon2 = getPokemon("Snorlax");
  const garchompSet = getSet(garchomp);
  const porygonSet = getSet(porygon2);
  
  const atkData: DamageCalcPokemon = {
    baseStats: garchomp.baseStats,
    sp: garchompSet.sp,
    nature: garchompSet.nature as NatureName,
    types: garchomp.types,
    ability: garchompSet.ability,
    item: garchompSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: porygon2.baseStats,
    sp: porygonSet.sp,
    nature: porygonSet.nature as NatureName,
    types: porygon2.types,
    ability: porygonSet.ability,
    item: porygonSet.item,
  };
  
  // Use Dragon Claw (known engine move, neutral on Snorlax)
  const noCrit = calculateDamage(atkData, defData, "Dragon Claw", { isDoubles: true });
  const withCrit = calculateDamage(atkData, defData, "Dragon Claw", { isDoubles: true, isCrit: true });
  assert(withCrit.damage[1] > noCrit.damage[1], `Crit does more damage (${withCrit.damage[1]} > ${noCrit.damage[1]})`);
}

// ── TEST 7: Immunity ─────────────────────────────────────────────────────

console.log("\n🔬 TEST 7: Type Immunity");
{
  const gengar = getPokemon("Gengar");
  const incineroar = getPokemon("Incineroar");
  const gengarSet = getSet(gengar);
  const incinSet = getSet(incineroar);
  
  const atkData: DamageCalcPokemon = {
    baseStats: incineroar.baseStats,
    sp: incinSet.sp,
    nature: incinSet.nature as NatureName,
    types: incineroar.types,
    ability: incinSet.ability,
    item: incinSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: gengar.baseStats,
    sp: gengarSet.sp,
    nature: gengarSet.nature as NatureName,
    types: gengar.types,
    ability: gengarSet.ability,
    item: gengarSet.item,
  };
  
  // Fake Out (Normal-type) on Gengar (Ghost) should be immune
  const result = calculateDamage(atkData, defData, "Fake Out", { isDoubles: true });
  assert(result.effectiveness === 0, `Normal vs Ghost immune: ×${result.effectiveness}`);
  assert(result.damage[0] === 0 && result.damage[1] === 0, `Zero damage on immune (${result.damage[0]}-${result.damage[1]})`);
}

// ── TEST 8: Burn Halves Physical ─────────────────────────────────────────

console.log("\n🔬 TEST 8: Burn Effect on Physical Damage");
{
  const garchomp = getPokemon("Garchomp");
  const porygon2 = getPokemon("Snorlax");
  const garchompSet = getSet(garchomp);
  const porygonSet = getSet(porygon2);
  
  const baseAtk: DamageCalcPokemon = {
    baseStats: garchomp.baseStats,
    sp: garchompSet.sp,
    nature: garchompSet.nature as NatureName,
    types: garchomp.types,
    ability: garchompSet.ability,
    item: garchompSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: porygon2.baseStats,
    sp: porygonSet.sp,
    nature: porygonSet.nature as NatureName,
    types: porygon2.types,
    ability: porygonSet.ability,
    item: porygonSet.item,
  };
  
  // Use Earthquake (known engine move)
  const normal = calculateDamage(baseAtk, defData, "Earthquake", { isDoubles: true });
  const burned = calculateDamage({ ...baseAtk, isBurned: true }, defData, "Earthquake", { isDoubles: true });
  assert(burned.damage[1] < normal.damage[1], `Burn reduces physical (${burned.damage[1]} < ${normal.damage[1]})`);
  // Burn should roughly halve physical damage
  const ratio = burned.damage[1] / normal.damage[1];
  assert(ratio < 0.6, `Burn roughly halves (ratio ${ratio.toFixed(2)} < 0.6)`);
}

// ── TEST 9: formatDamageResult ─────────────────────────────────────────

console.log("\n🔬 TEST 9: formatDamageResult");
{
  const incin = getPokemon("Incineroar");
  const rillaboom = getPokemon("Venusaur");
  const incinSet = getSet(incin);
  const rillaSet = getSet(rillaboom);
  
  const atkData: DamageCalcPokemon = {
    baseStats: incin.baseStats,
    sp: incinSet.sp,
    nature: incinSet.nature as NatureName,
    types: incin.types,
    ability: incinSet.ability,
    item: incinSet.item,
  };
  const defData: DamageCalcTarget = {
    baseStats: rillaboom.baseStats,
    sp: rillaSet.sp,
    nature: rillaSet.nature as NatureName,
    types: rillaboom.types,
    ability: rillaSet.ability,
    item: rillaSet.item,
  };
  
  // Use Flare Blitz (known engine move)
  const result = calculateDamage(atkData, defData, "Flare Blitz", { isDoubles: true });
  const formatted = formatDamageResult(result);
  assert(typeof formatted === "string" && formatted.length > 0, `formatDamageResult produces output: "${formatted.slice(0, 60)}..."`);
}

// ── TEST 10: Team Tester - runSimulation ──────────────────────────────

console.log("\n🔬 TEST 10: Team Tester — 1v1 Simulation");
{
  const team1Names = ["Incineroar", "Garchomp", "Dragonite", "Gengar"];
  const team2Names = ["Torkoal", "Venusaur", "Snorlax", "Gyarados"];
  
  const team1 = team1Names.map(n => getPokemon(n));
  const team2 = team2Names.map(n => getPokemon(n));
  const sets1 = team1.map(p => getSet(p));
  const sets2 = team2.map(p => getSet(p));
  
  const result = runSimulation(team1, sets1, team2, sets2, 50);
  
  assert(result.wins + result.losses === 50, `Total games = 50 (${result.wins}W + ${result.losses}L = ${result.wins + result.losses})`);
  assert(result.winRate >= 0 && result.winRate <= 100, `Win rate valid: ${result.winRate}%`);
  assert(result.avgTurns > 0, `Average turns > 0: ${result.avgTurns}`);
  console.log(`    → Result: ${result.winRate}% WR (${result.wins}W/${result.losses}L), avg ${result.avgTurns} turns`);
}

// ── TEST 11: Team Tester — Sample Battle Log ─────────────────────────

console.log("\n🔬 TEST 11: Team Tester — Sample Battle with Log");
{
  const team1 = ["Incineroar", "Garchomp", "Dragonite", "Gengar"].map(n => getPokemon(n));
  const team2 = ["Torkoal", "Venusaur", "Snorlax", "Gyarados"].map(n => getPokemon(n));
  const sets1 = team1.map(p => getSet(p));
  const sets2 = team2.map(p => getSet(p));
  
  const detail = simulateBattleWithLog(team1, sets1, team2, sets2);
  
  assert(detail.winner === 1 || detail.winner === 2, `Winner is 1 or 2: ${detail.winner}`);
  assert(detail.turnsPlayed > 0, `Turns played > 0: ${detail.turnsPlayed}`);
  assert(detail.log.length > 0, `Log has entries: ${detail.log.length}`);
  assert(detail.team1Names.length > 0, `Team 1 names populated: ${detail.team1Names.join(", ")}`);
  assert(detail.team2Names.length > 0, `Team 2 names populated: ${detail.team2Names.join(", ")}`);
  
  // Check log structure
  const lastLog = detail.log[detail.log.length - 1];
  assert(lastLog.events.length > 0, `Last turn has events`);
  assert(lastLog.team1HP.length > 0, `HP tracking present`);
  
  console.log(`    → Winner: Team ${detail.winner} in ${detail.turnsPlayed} turns (${detail.log.length} log entries)`);
}

// ── TEST 12: Multiple Simulations Consistency ─────────────────────────

console.log("\n🔬 TEST 12: Simulation Consistency (multiple runs)");
{
  const team1 = ["Incineroar", "Garchomp", "Dragonite", "Gengar"].map(n => getPokemon(n));
  const team2 = ["Torkoal", "Venusaur", "Snorlax", "Gyarados"].map(n => getPokemon(n));
  const sets1 = team1.map(p => getSet(p));
  const sets2 = team2.map(p => getSet(p));
  
  const results = [];
  for (let i = 0; i < 5; i++) {
    results.push(runSimulation(team1, sets1, team2, sets2, 100));
  }
  
  // Win rates should be in a reasonable range of each other
  const winRates = results.map(r => r.winRate);
  const avg = winRates.reduce((a, b) => a + b, 0) / winRates.length;
  const maxDev = Math.max(...winRates.map(r => Math.abs(r - avg)));
  
  assert(maxDev < 25, `Win rates consistent across runs (max deviation: ${maxDev.toFixed(1)}%)`);
  console.log(`    → Win rates: ${winRates.join("%, ")}%  (avg: ${avg.toFixed(1)}%, max deviation: ${maxDev.toFixed(1)}%)`);
}

// ── TEST 13: Prebuilt Teams can be used ──────────────────────────────

console.log("\n🔬 TEST 13: Prebuilt Teams Load Correctly");
{
  assert(PREBUILT_TEAMS.length > 0, `Prebuilt teams exist: ${PREBUILT_TEAMS.length}`);
  
  const team = PREBUILT_TEAMS[0];
  const pokemon = team.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean) as ChampionsPokemon[];
  
  assert(pokemon.length >= 4, `First prebuilt team has 4+ pokemon: ${pokemon.length}`);
  assert(team.sets.length > 0, `First prebuilt team has sets: ${team.sets.length}`);
  assert(team.name.length > 0, `Team has a name: ${team.name}`);
  assert(team.archetype.length > 0, `Team has archetype: ${team.archetype}`);
  
  // Simulate with a prebuilt team
  const team2 = PREBUILT_TEAMS[1];
  const poke2 = team2.pokemonIds.map(id => POKEMON_SEED.find(p => p.id === id)).filter(Boolean) as ChampionsPokemon[];
  
  if (pokemon.length >= 4 && poke2.length >= 4) {
    const result = runSimulation(pokemon, team.sets, poke2, team2.sets, 20);
    assert(result.wins + result.losses === 20, `Prebuilt vs prebuilt simulation works (${result.wins}W/${result.losses}L)`);
    console.log(`    → ${team.name} vs ${team2.name}: ${result.winRate}% WR`);
  }
}

// ── TEST 14: All USAGE_DATA sets work in damage calc ─────────────────

console.log("\n🔬 TEST 14: USAGE_DATA Sets in Damage Calculator");
{
  const usageEntries = Object.entries(USAGE_DATA);
  assert(usageEntries.length > 0, `USAGE_DATA has entries: ${usageEntries.length}`);
  
  let calcErrors = 0;
  let calcTotal = 0;
  const defender = getPokemon("Incineroar");
  const defSet = getSet(defender);
  const defData: DamageCalcTarget = {
    baseStats: defender.baseStats,
    sp: defSet.sp,
    nature: defSet.nature as NatureName,
    types: defender.types,
    ability: defSet.ability,
    item: defSet.item,
  };
  
  for (const [idStr, sets] of usageEntries) {
    const id = Number(idStr);
    const pokemon = POKEMON_SEED.find(p => p.id === id);
    if (!pokemon || !sets || sets.length === 0) continue;
    
    const set = sets[0];
    const atkData: DamageCalcPokemon = {
      baseStats: pokemon.baseStats,
      sp: set.sp,
      nature: set.nature as NatureName,
      types: pokemon.types,
      ability: set.ability,
      item: set.item,
    };
    
    for (const moveName of set.moves) {
      try {
        calcTotal++;
        const result = calculateDamage(atkData, defData, moveName, { isDoubles: true });
        if (result.damage[0] < 0) calcErrors++;
      } catch (e) {
        calcErrors++;
      }
    }
  }
  
  assert(calcErrors === 0, `All usage moves calc without errors (${calcTotal} calcs, ${calcErrors} errors)`);
  console.log(`    → Tested ${calcTotal} damage calcs across all usage data`);
}

// ── RESULTS ───────────────────────────────────────────────────────────

console.log("\n" + "═".repeat(60));
console.log(`RESULTS: ${passed} passed, ${failed} failed out of ${passed + failed} tests`);
if (failed > 0) {
  console.error("⚠️  SOME TESTS FAILED — review above");
  process.exit(1);
} else {
  console.log("✅ ALL TESTS PASSED!");
}
