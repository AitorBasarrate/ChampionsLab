import { runMLSimulation, formatReport } from "../src/lib/engine/ml-runner";

async function main() {
  console.log("Testing mega-aware simulation with 100 battles...\n");
  
  const report = await runMLSimulation({
    durationMs: 300000,
    maxBattles: 100,
    batchSize: 10,
    iterationsPerBattle: 3,
    onProgress: (p) => {
      if (p.battlesCompleted % 50 === 0) {
        console.log(`  ${p.battlesCompleted} battles done, ${p.battlesPerSecond.toFixed(1)}/s`);
      }
    },
  });

  console.log(`\nTotal battles: ${report.totalBattles}`);
  console.log(`Teams in pool: ${report.teamRankings.length}`);
  console.log(`Pokemon tracked: ${report.pokemonRankings.length}`);
  
  // Check mega entries
  const megaEntries = report.pokemonRankings.filter(p => p.name.includes("Mega "));
  const baseEntries = report.pokemonRankings.filter(p => !p.name.includes("Mega "));
  console.log(`Mega forms tracked: ${megaEntries.length}`);
  console.log(`Base forms tracked: ${baseEntries.length}`);
  
  if (megaEntries.length > 0) {
    console.log(`\nTop 10 mega forms:`);
    for (const m of megaEntries.sort((a, b) => b.appearances - a.appearances).slice(0, 10)) {
      console.log(`  ${m.name} — ELO: ${m.elo} | WR: ${m.winRate}% | ${m.appearances} games`);
    }
  } else {
    console.log("\n⚠️  No mega forms tracked — check mega detection logic");
  }

  // Check for pairs
  console.log(`\nBest pairs: ${report.bestPairs.length}`);
  for (const p of report.bestPairs.slice(0, 5)) {
    console.log(`  ${p.pokemon1} + ${p.pokemon2} — WR: ${p.winRate}%`);
  }
  
  // Check archetypes
  const megaArchetypes = report.archetypeRankings.filter(a => a.name.includes("Mega "));
  console.log(`\nMega archetypes: ${megaArchetypes.length}`);
  for (const a of megaArchetypes.slice(0, 5)) {
    console.log(`  ${a.name} — ELO: ${a.elo} | WR: ${a.winRate}%`);
  }
}

main().catch(console.error);
