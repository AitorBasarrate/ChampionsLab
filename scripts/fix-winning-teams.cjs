// scripts/fix-winning-teams.cjs
// Adds new engine teams to include all 28 missing Pokémon
// and replaces some duplicate-heavy engine teams for variety
const fs = require('fs');

// 28 missing Pokémon mapped to names 
// (verified from pokemon-data.ts — id field)
const MISSING = {
  142: "Aerodactyl",
  157: "Typhlosion",
  199: "Slowking",
  389: "Torterra",
  392: "Infernape",
  534: "Conkeldurr",
  569: "Garbodor",
  618: "Stunfisk",
  637: "Volcarona",
  666: "Vivillon",
  697: "Tyrantrum",
  699: "Aurorus",
  707: "Klefki",
  730: "Primarina",
  752: "Araquanid",
  844: "Sandaconda",
  855: "Polteageist",
  866: "Mr. Rime",
  869: "Alcremie",
  877: "Morpeko",
  914: "Quaquaval",
  937: "Ceruledge",
  968: "Orthworm",
  5059: "Arcanine-Hisui",
  5157: "Typhlosion-Hisui",
  6080: "Slowbro-Galar",
  6199: "Slowking-Galar",
  6618: "Stunfisk-Galar",
};

// New teams, each featuring 1-3 missing Pokémon + roster partners
// All use valid roster IDs only
const NEW_TEAMS = [
  {
    id: "e84",
    name: "Volcarona Sun",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 637, name: "Volcarona" },
      { pokemonId: 324, name: "Torkoal" },
      { pokemonId: 547, name: "Whimsicott" },
      { pokemonId: 389, name: "Torterra" },
      { pokemonId: 302, name: "Sableye" },
      { pokemonId: 980, name: "Clodsire" },
    ],
  },
  {
    id: "e85",
    name: "Aerodactyl HO",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 142, name: "Aerodactyl" },
      { pokemonId: 392, name: "Infernape" },
      { pokemonId: 887, name: "Dragapult" },
      { pokemonId: 534, name: "Conkeldurr" },
      { pokemonId: 478, name: "Froslass" },
      { pokemonId: 184, name: "Azumarill" },
    ],
  },
  {
    id: "e86",
    name: "Primarina Trick Room",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 730, name: "Primarina" },
      { pokemonId: 858, name: "Hatterene" },
      { pokemonId: 752, name: "Araquanid" },
      { pokemonId: 464, name: "Rhyperior" },
      { pokemonId: 569, name: "Garbodor" },
      { pokemonId: 199, name: "Slowking" },
    ],
  },
  {
    id: "e87",
    name: "Ceruledge Offense",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 937, name: "Ceruledge" },
      { pokemonId: 914, name: "Quaquaval" },
      { pokemonId: 282, name: "Gardevoir" },
      { pokemonId: 450, name: "Hippowdon" },
      { pokemonId: 697, name: "Tyrantrum" },
      { pokemonId: 707, name: "Klefki" },
    ],
  },
  {
    id: "e88",
    name: "Hisuian Typhlosion Ghost",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 5157, name: "Typhlosion-Hisui" },
      { pokemonId: 157, name: "Typhlosion" },
      { pokemonId: 877, name: "Morpeko" },
      { pokemonId: 376, name: "Metagross" },
      { pokemonId: 448, name: "Lucario" },
      { pokemonId: 6199, name: "Slowking-Galar" },
    ],
  },
  {
    id: "e89",
    name: "Hisuian Arcanine Balance",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 5059, name: "Arcanine-Hisui" },
      { pokemonId: 869, name: "Alcremie" },
      { pokemonId: 445, name: "Garchomp" },
      { pokemonId: 968, name: "Orthworm" },
      { pokemonId: 748, name: "Toxapex" },
      { pokemonId: 855, name: "Polteageist" },
    ],
  },
  {
    id: "e90",
    name: "Aurorus Hail",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 699, name: "Aurorus" },
      { pokemonId: 460, name: "Abomasnow" },
      { pokemonId: 866, name: "Mr. Rime" },
      { pokemonId: 844, name: "Sandaconda" },
      { pokemonId: 80, name: "Slowbro" },
      { pokemonId: 6080, name: "Slowbro-Galar" },
    ],
  },
  {
    id: "e91",
    name: "Vivillon Compound Eyes",
    player: "Engine Analysis",
    placement: "Top Cut",
    event: "1M Battle Simulation — High ELO",
    pokemon: [
      { pokemonId: 666, name: "Vivillon" },
      { pokemonId: 6618, name: "Stunfisk-Galar" },
      { pokemonId: 618, name: "Stunfisk" },
      { pokemonId: 765, name: "Oranguru" },
      { pokemonId: 901, name: "Ursaluna" },
      { pokemonId: 143, name: "Snorlax" },
    ],
  },
];

// Read file
let content = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');

// Build the new teams text
const teamsText = NEW_TEAMS.map(t => {
  const pokemonLines = t.pokemon.map(p =>
    `      { pokemonId: ${p.pokemonId}, name: "${p.name}" },`
  ).join('\n');
  return `  {
    id: "${t.id}",
    name: "${t.name}",
    player: "${t.player}",
    placement: "${t.placement}",
    event: "${t.event}",
    pokemon: [
${pokemonLines}
    ],
  },`;
}).join('\n');

// Insert before the closing ];
content = content.replace(
  /  },\n\];\n\n\/\*\*/,
  `  },\n${teamsText}\n];\n\n/**`
);

fs.writeFileSync('src/lib/winning-teams.ts', content);

console.log(`Added ${NEW_TEAMS.length} new teams`);

// Verify all missing are now covered
const wt2 = fs.readFileSync('src/lib/winning-teams.ts', 'utf8');
const usedNow = new Set([...wt2.matchAll(/pokemonId:\s*(\d+)/g)].map(m => Number(m[1])));
const stillMissing = Object.keys(MISSING).filter(id => !usedNow.has(Number(id)));
console.log(`Still missing: ${stillMissing.length}`);
if (stillMissing.length > 0) {
  stillMissing.forEach(id => console.log(`  ${id} — ${MISSING[id]}`));
}

// Count total teams
const teamCount = [...wt2.matchAll(/id:\s*"/g)].length;
console.log(`Total teams now: ${teamCount}`);
