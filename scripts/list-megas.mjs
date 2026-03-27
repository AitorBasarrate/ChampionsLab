import fs from 'fs';
const data = fs.readFileSync('src/lib/pokemon-data.ts', 'utf8');
const lines = data.split('\n');

const megas = [];
let currentId = null;
let currentName = null;

for (const line of lines) {
  const idMatch = line.match(/"id":\s*(\d+)/);
  if (idMatch) currentId = parseInt(idMatch[1]);
  
  const nameMatch = line.match(/"name":\s*"([^"]+)"/);
  if (nameMatch) currentName = nameMatch[1];
  
  if (line.includes('"hasMega": true') && currentId && currentName) {
    megas.push({ id: currentId, name: currentName });
  }
}

console.log('Mega-capable Pokemon:');
for (const m of megas) {
  console.log(`  ${m.id} - ${m.name}`);
}
console.log(`Total: ${megas.length}`);

// Also check which megas have sets in USAGE_DATA
const usageData = fs.readFileSync('src/lib/usage-data.ts', 'utf8');
console.log('\nMega sets found in USAGE_DATA:');
for (const m of megas) {
  const regex = new RegExp(`^\\s*${m.id}:\\s*\\[`, 'm');
  if (regex.test(usageData)) {
    // Find mega stone sets for this pokemon
    const blockMatch = usageData.match(new RegExp(`${m.id}:\\s*\\[([\\s\\S]*?)\\],\\s*\\/\\/`, 'm'));
    if (blockMatch) {
      const megaSets = blockMatch[1].match(/name:\s*"([^"]*[Mm]ega[^"]*)"/g);
      const stoneItems = blockMatch[1].match(/item:\s*"([^"]*ite[^"]*)"/g);
      if (megaSets || stoneItems) {
        console.log(`  ${m.id} ${m.name}: mega sets=${megaSets?.length || 0}, stone items=${stoneItems?.length || 0}`);
      }
    }
  }
}
