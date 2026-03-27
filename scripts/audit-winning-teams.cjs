const fs = require('fs');
const wt = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');
const used = new Set([...wt.matchAll(/pokemonId:\s*(\d+)/g)].map(m => Number(m[1])));

const pd = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');

// Extract all entries: "id": N ... "dexNumber": N ... "name": "X" ... optionally "formId": N
const rosterMap = new Map();
// Match each pokemon entry block - look for "id" field
const idMatches = [...pd.matchAll(/"id":\s*(\d+),[\s\S]*?"dexNumber":\s*(\d+),[\s\S]*?"name":\s*"([^"]+)"/g)];
for (const m of idMatches) {
  rosterMap.set(Number(m[1]), m[3]);
}
// Also get formId entries
const formMatches = [...pd.matchAll(/"formId":\s*(\d+),/g)];
for (const m of formMatches) {
  const fid = Number(m[1]);
  if (rosterMap.has(fid)) continue; // already got it from id
}

// Actually the "id" field IS what we use for pokemonId in teams. Let's check what IDs are in roster.
const allIds = new Set(rosterMap.keys());


const missing = [];
for (const id of allIds) {
  if (!used.has(id)) {
    missing.push({ id, name: rosterMap.get(id) || 'Unknown-' + id });
  }
}
missing.sort((a, b) => a.id - b.id);

console.log(`Total roster: ${allIds.size}`);
console.log(`Used in teams: ${used.size}`);
console.log(`Missing from winning teams: ${missing.length}`);
console.log('---');
missing.forEach(m => console.log(`  ${m.id} — ${m.name}`));

// Also show overused
const counts = {};
const matches = [...wt.matchAll(/pokemonId:\s*(\d+)/g)];
for (const m of matches) {
  const id = Number(m[1]);
  counts[id] = (counts[id] || 0) + 1;
}
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log('\nTop 15 most used:');
sorted.slice(0, 15).forEach(([id, count]) => {
  console.log(`  ${id} (${rosterMap.get(Number(id)) || id}): ${count} teams`);
});
