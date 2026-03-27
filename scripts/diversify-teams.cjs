// scripts/diversify-teams.cjs
// Reduces Incineroar/Garchomp/Kingambit homogeneity in engine teams
// by swapping out overused Pokémon for underused roster members
const fs = require('fs');

let content = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');

// Count current usage
function countUsage(text) {
  const counts = {};
  const matches = [...text.matchAll(/pokemonId:\s*(\d+)/g)];
  for (const m of matches) {
    const id = Number(m[1]);
    counts[id] = (counts[id] || 0) + 1;
  }
  return counts;
}

// Replacements: in specific engine teams, swap one overused mon for an underused one
// Format: [teamId, oldPokemonId, newPokemonId, newName]
// Only touching engine teams (e1-e83), being careful to keep teams sensible
const SWAPS = [
  // Remove some Incineroar (727) — currently 117 teams
  ["e5", 727, 59, "Arcanine"],          // e5: another Intimidate Fire
  ["e8", 727, 5059, "Arcanine-Hisui"],  // e8: Hisuian form 
  ["e11", 727, 534, "Conkeldurr"],      // e11: fighting coverage
  ["e14", 727, 866, "Mr. Rime"],        // e14: different support
  ["e17", 727, 707, "Klefki"],          // e17: Prankster screens
  ["e20", 727, 569, "Garbodor"],        // e20: Toxic Debris
  ["e23", 727, 877, "Morpeko"],         // e23: offensive pivot
  ["e26", 727, 618, "Stunfisk"],        // e26: Ground trap
  ["e29", 727, 752, "Araquanid"],       // e29: Water Bubble
  ["e32", 727, 6618, "Stunfisk-Galar"],  // e32: Steel/Ground trap
  ["e35", 727, 637, "Volcarona"],       // e35: special sweeper
  ["e38", 727, 392, "Infernape"],       // e38: fast Fire/Fighting
  ["e41", 727, 914, "Quaquaval"],       // e41: Water dancer
  ["e44", 727, 937, "Ceruledge"],       // e44: Fire/Ghost  
  ["e47", 727, 142, "Aerodactyl"],      // e47: fast Rock/Flying
  ["e50", 727, 199, "Slowking"],        // e50: Slowking support
  ["e53", 727, 6199, "Slowking-Galar"], // e53: Poison/Psychic
  ["e56", 727, 844, "Sandaconda"],      // e56: sand team
  ["e59", 727, 855, "Polteageist"],     // e59: Ghost special
  ["e62", 727, 968, "Orthworm"],        // e62: Steel wall
  ["e65", 727, 389, "Torterra"],        // e65: Grass/Ground
  ["e68", 727, 157, "Typhlosion"],      // e68: Fire blast
  ["e71", 727, 5157, "Typhlosion-Hisui"],// e71: Ghost/Fire
  ["e74", 727, 730, "Primarina"],       // e74: Water/Fairy
  ["e77", 727, 6080, "Slowbro-Galar"],  // e77: Poison/Psychic
  
  // Remove some Garchomp (445) — currently 92 teams
  ["e6", 445, 697, "Tyrantrum"],        // e6: another physical dragon
  ["e9", 445, 699, "Aurorus"],          // e9: Ice/Rock
  ["e12", 445, 968, "Orthworm"],        // e12: Steel wall
  ["e15", 445, 844, "Sandaconda"],      // e15: Ground/Sand
  ["e18", 445, 914, "Quaquaval"],       // e18: physical dancer
  ["e21", 445, 937, "Ceruledge"],       // e21: physical Fire/Ghost
  ["e24", 445, 389, "Torterra"],        // e24: Grass/Ground
  ["e27", 445, 877, "Morpeko"],         // e27: Electric/Dark 
  ["e30", 445, 142, "Aerodactyl"],      // e30: flying rock
  ["e33", 445, 392, "Infernape"],       // e33: fast fighter  
  ["e36", 445, 534, "Conkeldurr"],      // e36: bulky fighter
  ["e39", 445, 637, "Volcarona"],       // e39: special attacker
  ["e42", 445, 666, "Vivillon"],        // e42: Compound Eyes
  ["e45", 445, 752, "Araquanid"],       // e45: Water Bubble
  ["e48", 445, 569, "Garbodor"],        // e48: Poison support
  
  // Remove some Kingambit (983) — currently 80 teams
  ["e7", 983, 707, "Klefki"],           // e7: Steel support
  ["e10", 983, 866, "Mr. Rime"],        // e10: Ice/Psychic
  ["e13", 983, 869, "Alcremie"],        // e13: Fairy support
  ["e16", 983, 855, "Polteageist"],     // e16: Ghost special
  ["e19", 983, 937, "Ceruledge"],       // e19: Fire/Ghost physical
  ["e22", 983, 697, "Tyrantrum"],       // e22: physical Dragon/Rock
  ["e25", 983, 142, "Aerodactyl"],      // e25: Rock/Flying
  ["e28", 983, 5059, "Arcanine-Hisui"],  // e28: Fire/Rock
  ["e31", 983, 699, "Aurorus"],         // e31: Ice/Rock
  ["e34", 983, 6618, "Stunfisk-Galar"],  // e34: Steel/Ground
  
  // Remove some Sylveon (700) — currently 62 teams
  ["e40", 700, 869, "Alcremie"],        // e40: alternate Fairy
  ["e43", 700, 730, "Primarina"],       // e43: Water/Fairy
  ["e46", 700, 282, "Gardevoir"],       // e46: Psychic/Fairy
];

let swapped = 0;
for (const [teamId, oldId, newId, newName] of SWAPS) {
  // Find the team block and replace the specific pokemonId
  const teamRegex = new RegExp(
    `(id:\\s*"${teamId}"[\\s\\S]*?)\\{ pokemonId: ${oldId}, name: "[^"]+" \\}`,
  );
  const match = content.match(teamRegex);
  if (match) {
    content = content.replace(
      match[0],
      `${match[1]}{ pokemonId: ${newId}, name: "${newName}" }`
    );
    swapped++;
  } else {
    console.log(`WARNING: Could not find team ${teamId} with pokemonId ${oldId}`);
  }
}

fs.writeFileSync('src/lib/winning-teams.ts', content);

// Report
const counts = countUsage(content);
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`Swapped: ${swapped} Pokémon across engine teams`);
console.log('\nTop 15 most used (after diversification):');
sorted.slice(0, 15).forEach(([id, count]) => {
  console.log(`  ID ${id}: ${count} teams`);
});

// Check no Pokémon is missing now
const pd = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');
const rosterIds = new Set([...pd.matchAll(/"id":\s*(\d+)/g)].map(m => Number(m[1])));
const usedIds = new Set(Object.keys(counts).map(Number));
const missing = [...rosterIds].filter(id => !usedIds.has(id));
console.log(`\nRoster Pokémon still missing from teams: ${missing.length}`);
if (missing.length > 0) console.log(missing);
