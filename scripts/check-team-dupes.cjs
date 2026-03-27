// scripts/check-team-dupes.cjs
// Checks for duplicate pokemonId within any single team
const fs = require('fs');
const content = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');

// Split into team blocks
const teamBlocks = content.split(/\n  \{[\s]*\n    id:/);
let issues = 0;

for (let i = 1; i < teamBlocks.length; i++) {
  const block = teamBlocks[i];
  const idMatch = block.match(/^\s*"([^"]+)"/);
  const teamId = idMatch ? idMatch[1] : `block-${i}`;
  
  const pokemonIds = [...block.matchAll(/pokemonId:\s*(\d+)/g)].map(m => Number(m[1]));
  const seen = new Set();
  for (const pid of pokemonIds) {
    if (seen.has(pid)) {
      console.log(`DUPLICATE in team ${teamId}: pokemonId ${pid} appears multiple times`);
      issues++;
    }
    seen.add(pid);
  }
  
  if (pokemonIds.length !== 6) {
    console.log(`WRONG SIZE in team ${teamId}: has ${pokemonIds.length} Pokémon (expected 6)`);
    issues++;
  }
}

console.log(`\nChecked ${teamBlocks.length - 1} teams — ${issues} issue(s) found`);
