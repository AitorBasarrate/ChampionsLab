// scripts/diversify-round2.cjs
// Second round — further reduce Incineroar (727) dominance from 92 to ~60
const fs = require('fs');

let content = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');

// More swaps — target e-series teams that still have 727
const SWAPS = [
  ["e2", 727, 730, "Primarina"],
  ["e3", 727, 142, "Aerodactyl"],
  ["e4", 727, 389, "Torterra"],
  ["e6", 727, 937, "Ceruledge"],
  ["e7", 727, 914, "Quaquaval"],
  ["e9", 727, 877, "Morpeko"],
  ["e10", 727, 866, "Mr. Rime"],
  ["e12", 727, 534, "Conkeldurr"],
  ["e13", 727, 707, "Klefki"],
  ["e15", 727, 569, "Garbodor"],
  ["e16", 727, 199, "Slowking"],
  ["e18", 727, 392, "Infernape"],
  ["e19", 727, 855, "Polteageist"],
  ["e21", 727, 968, "Orthworm"],
  ["e22", 727, 637, "Volcarona"],
  ["e24", 727, 752, "Araquanid"],
  ["e25", 727, 5157, "Typhlosion-Hisui"],
  ["e27", 727, 142, "Aerodactyl"],
  ["e28", 727, 6080, "Slowbro-Galar"],
  ["e30", 727, 6199, "Slowking-Galar"],
  ["e31", 727, 844, "Sandaconda"],
  ["e33", 727, 157, "Typhlosion"],
  ["e34", 727, 5059, "Arcanine-Hisui"],
  ["e36", 727, 869, "Alcremie"],
  ["e37", 727, 6618, "Stunfisk-Galar"],
  ["e39", 727, 697, "Tyrantrum"],
  ["e42", 727, 699, "Aurorus"],
  ["e43", 727, 618, "Stunfisk"],
  ["e45", 727, 389, "Torterra"],
  ["e46", 727, 534, "Conkeldurr"],
  ["e48", 727, 877, "Morpeko"],
  
  // Also reduce Garchomp (445) from 78
  ["e51", 445, 697, "Tyrantrum"],
  ["e52", 445, 142, "Aerodactyl"],
  ["e54", 445, 914, "Quaquaval"],
  ["e55", 445, 534, "Conkeldurr"],
  ["e57", 445, 937, "Ceruledge"],
  ["e58", 445, 866, "Mr. Rime"],
  ["e60", 445, 877, "Morpeko"],
  ["e61", 445, 699, "Aurorus"],
  ["e63", 445, 637, "Volcarona"],
  ["e64", 445, 844, "Sandaconda"],
  ["e66", 445, 569, "Garbodor"],
  ["e67", 445, 752, "Araquanid"],
  ["e69", 445, 968, "Orthworm"],
  ["e70", 445, 392, "Infernape"],
  
  // Reduce Kingambit (983) from 70
  ["e37", 983, 730, "Primarina"],
  ["e40", 983, 697, "Tyrantrum"],
  ["e43", 983, 914, "Quaquaval"],
  ["e46", 983, 157, "Typhlosion"],
  ["e49", 983, 5059, "Arcanine-Hisui"],
  ["e52", 983, 869, "Alcremie"],
  ["e55", 983, 877, "Morpeko"],
  ["e58", 983, 707, "Klefki"],
  ["e61", 983, 855, "Polteageist"],
  ["e64", 983, 6618, "Stunfisk-Galar"],
  
  // Reduce Sylveon (700) from 59
  ["e49", 700, 666, "Vivillon"],
  ["e52", 700, 869, "Alcremie"],
  ["e55", 700, 730, "Primarina"],
  ["e58", 700, 866, "Mr. Rime"],
  ["e61", 700, 142, "Aerodactyl"],
  ["e64", 700, 937, "Ceruledge"],
];

let swapped = 0;
for (const [teamId, oldId, newId, newName] of SWAPS) {
  const teamRegex = new RegExp(
    `(id:\\s*"${teamId}"[\\s\\S]*?)\\{ pokemonId: ${oldId}, name: "[^"]+" \\}`
  );
  const match = content.match(teamRegex);
  if (match) {
    content = content.replace(
      match[0],
      `${match[1]}{ pokemonId: ${newId}, name: "${newName}" }`
    );
    swapped++;
  }
}

fs.writeFileSync('src/lib/winning-teams.ts', content);

// Count
const counts = {};
const matches = [...content.matchAll(/pokemonId:\s*(\d+)/g)];
for (const m of matches) {
  const id = Number(m[1]);
  counts[id] = (counts[id] || 0) + 1;
}
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`Swapped: ${swapped}`);
console.log('\nTop 20 most used:');
sorted.slice(0, 20).forEach(([id, count]) => {
  console.log(`  ID ${id}: ${count} teams`);
});

// Verify no missing
const pd = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');
const rosterIds = new Set([...pd.matchAll(/"id":\s*(\d+)/g)].map(m => Number(m[1])));
const usedIds = new Set(Object.keys(counts).map(Number));
const missing = [...rosterIds].filter(id => !usedIds.has(id));
console.log(`\nMissing from teams: ${missing.length}`);
