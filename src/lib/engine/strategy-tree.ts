// ═══════════════════════════════════════════════════════════════════════════════
// CHAMPIONS LAB - VGC STRATEGY TREE GENERATOR
// Produces a multi-turn branching decision tree for team vs team matchups
// Analyzes speed tiers, move roles, type matchups, abilities, field states
// ═══════════════════════════════════════════════════════════════════════════════

import type { ChampionsPokemon, CommonSet, PokemonType } from "@/lib/types";
import { getMatchup } from "./type-chart";
import { calculateStats, getEffectiveSpeed } from "./stat-calc";
import { getMove, getMoveRole, isSpreadMove, type EngineMove } from "./move-data";
import { getAbilityEffect } from "./ability-data";
import { identifyRoles, detectArchetypes } from "./synergy";
import { calculateDamage, type DamageResult } from "./damage-calc";
import type { NatureName } from "./natures";
import type { LeadComboResult } from "./battle-sim";

// ── TREE NODE TYPES ─────────────────────────────────────────────────────────

export type StrategyNodeType =
  | "start"           // Root: your lead pair
  | "opponent-lead"   // What opponent likely leads
  | "action"          // Move action for your Pokémon
  | "decision"        // Y/N branch (did something succeed?)
  | "field-state"     // Weather/Terrain/Trick Room state
  | "outcome"         // Result description
  | "switch"          // Switch recommendation
  | "turn-label";     // Turn separator

export interface StrategyNode {
  id: string;
  type: StrategyNodeType;
  label: string;              // Primary text
  detail?: string;            // Secondary text / tooltip
  pokemon?: string[];         // Pokémon names involved
  sprites?: string[];         // Sprite URLs for display
  moveType?: PokemonType;     // For color coding move nodes
  severity?: "good" | "neutral" | "bad";  // Color hint
  fieldState?: {
    weather?: string;
    terrain?: string;
    trickRoom?: boolean;
    tailwind?: boolean;
    turnsLeft?: number;
  };
  children: StrategyNode[];   // Branches from this node
  branchLabel?: string;       // Label on the edge TO this node (e.g. "YES", "NO", "If opponent...")
}

export interface StrategyTree {
  root: StrategyNode;
  archetype: string;
  winCondition: string;
  keyThreats: string[];       // Opponent Pokémon that threaten your lead
  backupPlan: string;         // What to do if the primary plan fails
}

// ── HELPERS ─────────────────────────────────────────────────────────────────

interface AnalyzedMon {
  pokemon: ChampionsPokemon;
  set: CommonSet;
  stats: ReturnType<typeof calculateStats>;
  speed: number;
  roles: ReturnType<typeof identifyRoles>;
  moves: { name: string; data: EngineMove | undefined; role: string }[];
  hasFakeOut: boolean;
  hasProtect: boolean;
  hasTailwind: boolean;
  hasTrickRoom: boolean;
  hasRedirection: boolean;
  hasSetup: boolean;
  hasPriority: boolean;
  hasSpeedControl: boolean;
  weatherOnEntry?: string;
  terrainOnEntry?: string;
  isIntimidateUser: boolean;
}

function analyzeMon(pokemon: ChampionsPokemon, set: CommonSet): AnalyzedMon {
  const stats = calculateStats(pokemon.baseStats, set.sp, set.nature as NatureName);
  const speed = stats.speed;
  const roles = identifyRoles(pokemon);
  const moves = set.moves.map(m => {
    const data = getMove(m);
    return { name: m, data, role: data ? getMoveRole(data) : "utility" };
  });

  const abilityEffect = getAbilityEffect(set.ability);

  return {
    pokemon,
    set,
    stats,
    speed,
    roles,
    moves,
    hasFakeOut: set.moves.includes("Fake Out"),
    hasProtect: moves.some(m => m.role === "protection"),
    hasTailwind: set.moves.includes("Tailwind"),
    hasTrickRoom: set.moves.includes("Trick Room"),
    hasRedirection: moves.some(m => m.role === "redirection"),
    hasSetup: moves.some(m => m.role === "setup"),
    hasPriority: moves.some(m => m.data && m.data.priority > 0 && m.data.category !== "status"),
    hasSpeedControl: set.moves.includes("Tailwind") || set.moves.includes("Trick Room") ||
      set.moves.includes("Icy Wind") || set.moves.includes("Electroweb") || set.moves.includes("Thunder Wave"),
    weatherOnEntry: abilityEffect?.setsWeather ?? undefined,
    terrainOnEntry: abilityEffect?.setsTerrain ?? undefined,
    isIntimidateUser: set.ability === "Intimidate",
  };
}

/** Find the best attacking move from a Pokémon against a target */
function getBestAttack(
  attacker: AnalyzedMon,
  target: AnalyzedMon
): { name: string; data: EngineMove; effectiveness: number; role: string } | null {
  let bestMove: { name: string; data: EngineMove; effectiveness: number; role: string } | null = null;
  let bestScore = -Infinity;

  for (const m of attacker.moves) {
    if (!m.data || m.data.category === "status") continue;
    if (m.role === "protection") continue;

    const eff = getMatchup(m.data.type, target.pokemon.types);
    const stab = attacker.pokemon.types.includes(m.data.type) ? 1.5 : 1;
    const bp = m.data.basePower;
    const score = bp * eff * stab * (isSpreadMove(m.data) ? 0.75 : 1);

    if (score > bestScore) {
      bestScore = score;
      bestMove = { name: m.name, data: m.data, effectiveness: eff, role: m.role };
    }
  }
  return bestMove;
}

/** Compute a threat score for an opponent against our lead */
function threatScore(opp: AnalyzedMon, lead: AnalyzedMon): number {
  let score = 0;
  // Check if any of opponent's attacking moves are super effective
  for (const m of opp.moves) {
    if (!m.data || m.data.category === "status") continue;
    const eff = getMatchup(m.data.type, lead.pokemon.types);
    const stab = opp.pokemon.types.includes(m.data.type) ? 1.5 : 1;
    score += m.data.basePower * eff * stab;
  }
  // Speed advantage is threatening
  if (opp.speed > lead.speed) score *= 1.3;
  return score;
}

/** Identify most likely opponent leads based on their team roles */
function predictOpponentLeads(
  oppTeam: AnalyzedMon[],
  myLead1: AnalyzedMon,
  myLead2: AnalyzedMon,
): [AnalyzedMon, AnalyzedMon][] {
  // Score each opponent Pokémon as a lead candidate
  const leadScores = oppTeam.map((opp, i) => {
    let score = 0;
    // Support mons lead often
    if (opp.hasFakeOut) score += 30;
    if (opp.hasRedirection) score += 25;
    if (opp.hasTailwind || opp.hasTrickRoom) score += 25;
    if (opp.isIntimidateUser) score += 20;
    if (opp.weatherOnEntry || opp.terrainOnEntry) score += 25;
    // High threat vs our leads
    score += threatScore(opp, myLead1) * 0.05;
    score += threatScore(opp, myLead2) * 0.05;
    // Lead role
    if (opp.roles.roles.includes("lead")) score += 15;
    if (opp.roles.roles.includes("support")) score += 10;
    // Fast Pokémon tend to lead
    if (opp.speed >= 100) score += 10;
    return { idx: i, score };
  });

  leadScores.sort((a, b) => b.score - a.score);

  // Generate top 2-3 likely opponent lead pairs
  const pairs: [AnalyzedMon, AnalyzedMon][] = [];
  const topN = Math.min(4, oppTeam.length);
  for (let i = 0; i < topN; i++) {
    for (let j = i + 1; j < topN; j++) {
      pairs.push([oppTeam[leadScores[i].idx], oppTeam[leadScores[j].idx]]);
    }
  }

  // Score each pair
  const pairScores = pairs.map(([a, b]) => {
    const scoreA = leadScores.find(s => s.idx === oppTeam.indexOf(a))!.score;
    const scoreB = leadScores.find(s => s.idx === oppTeam.indexOf(b))!.score;
    // Bonus for complementary roles (support + attacker)
    const oneSupport = (a.hasFakeOut || a.hasRedirection || a.isIntimidateUser) ||
                       (b.hasFakeOut || b.hasRedirection || b.isIntimidateUser);
    const oneAttacker = a.moves.some(m => m.role === "nuke" || m.role === "spread-damage") ||
                        b.moves.some(m => m.role === "nuke" || m.role === "spread-damage");
    return {
      pair: [a, b] as [AnalyzedMon, AnalyzedMon],
      score: scoreA + scoreB + (oneSupport && oneAttacker ? 15 : 0),
    };
  });

  pairScores.sort((a, b) => b.score - a.score);
  return pairScores.slice(0, 3).map(p => p.pair);
}

/** Determine which opponent to target with Fake Out */
function pickFakeOutTarget(
  fakeOutUser: AnalyzedMon,
  partner: AnalyzedMon,
  opp1: AnalyzedMon,
  opp2: AnalyzedMon,
): { target: AnalyzedMon; reason: string } {
  // Prioritize: setup users, speed control, redirectors, then biggest threat
  if (opp1.hasSetup || opp1.hasTailwind || opp1.hasTrickRoom) {
    return { target: opp1, reason: "block setup" };
  }
  if (opp2.hasSetup || opp2.hasTailwind || opp2.hasTrickRoom) {
    return { target: opp2, reason: "block setup" };
  }
  if (opp1.hasRedirection) {
    return { target: opp1, reason: "remove redirection" };
  }
  if (opp2.hasRedirection) {
    return { target: opp2, reason: "remove redirection" };
  }
  // Otherwise flinch the biggest threat to our partner
  const t1 = threatScore(opp1, partner);
  const t2 = threatScore(opp2, partner);
  if (t1 >= t2) {
    return { target: opp1, reason: "biggest threat" };
  }
  return { target: opp2, reason: "biggest threat" };
}

/** Get the speed tier label */
function speedTierLabel(speed: number): string {
  if (speed >= 150) return "blazing";
  if (speed >= 120) return "fast";
  if (speed >= 90) return "moderate";
  if (speed >= 60) return "slow";
  return "very slow";
}

let nodeCounter = 0;
function nextId(): string {
  return `n${++nodeCounter}`;
}

/** Recursively check if any node in a tree contains a string in its label */
function treeContains(nodes: StrategyNode[], text: string): boolean {
  for (const n of nodes) {
    if (n.label.includes(text)) return true;
    if (n.children.length > 0 && treeContains(n.children, text)) return true;
  }
  return false;
}

// ── MAIN GENERATOR ──────────────────────────────────────────────────────────

export function generateStrategyTree(
  team1Pokemon: ChampionsPokemon[],
  team1Sets: CommonSet[],
  team2Pokemon: ChampionsPokemon[],
  team2Sets: CommonSet[],
  bestLead: LeadComboResult | undefined,
  winRate: number,
): StrategyTree | null {
  nodeCounter = 0;

  if (!bestLead || team1Pokemon.length < 2 || team2Pokemon.length < 2) return null;

  // Analyze all Pokémon
  const myTeam = team1Pokemon.map((p, i) => analyzeMon(p, team1Sets[i]));
  const oppTeam = team2Pokemon.map((p, i) => analyzeMon(p, team2Sets[i]));

  // Find our leads
  const lead1 = myTeam.find(m => m.pokemon.name === bestLead.lead1);
  const lead2 = myTeam.find(m => m.pokemon.name === bestLead.lead2);
  if (!lead1 || !lead2) return null;

  // Detect archetypes
  const myArchetypes = detectArchetypes(team1Pokemon);
  const oppArchetypes = detectArchetypes(team2Pokemon);
  const myArchetype = myArchetypes[0]?.archetype ?? "goodstuffs";
  const oppArchetype = oppArchetypes[0]?.archetype ?? "goodstuffs";

  // Determine field state on entry
  const entryWeather = lead1.weatherOnEntry || lead2.weatherOnEntry || null;
  const entryTerrain = lead1.terrainOnEntry || lead2.terrainOnEntry || null;
  const oppEntryWeather = oppTeam.find(o =>
    o.pokemon.name === (predictOpponentLeads(oppTeam, lead1, lead2)[0]?.[0]?.pokemon.name) ||
    o.pokemon.name === (predictOpponentLeads(oppTeam, lead1, lead2)[0]?.[1]?.pokemon.name)
  )?.weatherOnEntry ?? null;

  // Predict opponent leads
  const oppLeadPairs = predictOpponentLeads(oppTeam, lead1, lead2);

  // Identify key threats across opponent team
  const keyThreats = oppTeam
    .map(o => ({
      name: o.pokemon.name,
      threat: threatScore(o, lead1) + threatScore(o, lead2),
    }))
    .sort((a, b) => b.threat - a.threat)
    .slice(0, 3)
    .map(t => t.name);

  // Determine win condition
  const winCondition = determineWinCondition(lead1, lead2, myArchetype, entryWeather, entryTerrain);

  // Build the tree
  const root = buildRootNode(lead1, lead2, bestLead, winRate);

  // Add opponent lead scenarios as branches
  const scenarioBranches: StrategyNode[] = [];
  const processedPairs = new Set<string>();

  for (let s = 0; s < Math.min(3, oppLeadPairs.length); s++) {
    const [opp1, opp2] = oppLeadPairs[s];
    const pairKey = [opp1.pokemon.name, opp2.pokemon.name].sort().join("+");
    if (processedPairs.has(pairKey)) continue;
    processedPairs.add(pairKey);

    const scenarioNode = buildScenarioBranch(
      lead1, lead2, opp1, opp2, s, myArchetype, entryWeather, entryTerrain, myTeam, winRate,
    );
    scenarioBranches.push(scenarioNode);
  }

  root.children = scenarioBranches;

  // Backup plan
  const backupPlan = generateBackupPlan(lead1, lead2, myTeam, oppTeam, winRate);

  return {
    root,
    archetype: myArchetypes[0]?.description ?? `${myArchetype} team`,
    winCondition,
    keyThreats,
    backupPlan,
  };
}

function buildRootNode(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  bestLead: LeadComboResult,
  winRate: number,
): StrategyNode {
  const fieldNotes: string[] = [];
  if (lead1.weatherOnEntry) fieldNotes.push(`Sets ${lead1.weatherOnEntry}`);
  if (lead2.weatherOnEntry) fieldNotes.push(`Sets ${lead2.weatherOnEntry}`);
  if (lead1.terrainOnEntry) fieldNotes.push(`Sets ${lead1.terrainOnEntry} terrain`);
  if (lead2.terrainOnEntry) fieldNotes.push(`Sets ${lead2.terrainOnEntry} terrain`);
  if (lead1.isIntimidateUser || lead2.isIntimidateUser) fieldNotes.push("Intimidate on entry");

  return {
    id: nextId(),
    type: "start",
    label: `Lead: ${lead1.pokemon.name} + ${lead2.pokemon.name}`,
    detail: `${bestLead.winRate}% Win Rate · ${fieldNotes.join(" · ") || "No entry effects"}`,
    pokemon: [lead1.pokemon.name, lead2.pokemon.name],
    sprites: [lead1.pokemon.sprite, lead2.pokemon.sprite],
    severity: winRate >= 55 ? "good" : winRate >= 45 ? "neutral" : "bad",
    children: [],
  };
}

function buildScenarioBranch(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  opp1: AnalyzedMon,
  opp2: AnalyzedMon,
  scenarioIdx: number,
  myArchetype: string,
  myWeather: string | null,
  myTerrain: string | null,
  fullTeam: AnalyzedMon[],
  winRate: number,
): StrategyNode {
  const scenarioNode: StrategyNode = {
    id: nextId(),
    type: "opponent-lead",
    label: `vs ${opp1.pokemon.name} + ${opp2.pokemon.name}`,
    detail: scenarioIdx === 0 ? "Most likely lead" : scenarioIdx === 1 ? "Alternative lead" : "Possible lead",
    pokemon: [opp1.pokemon.name, opp2.pokemon.name],
    sprites: [opp1.pokemon.sprite, opp2.pokemon.sprite],
    branchLabel: scenarioIdx === 0 ? "Scenario 1" : scenarioIdx === 1 ? "Scenario 2" : "Scenario 3",
    severity: "neutral",
    children: [],
  };

  // Determine speed order
  const allLeadSpeeds = [
    { name: lead1.pokemon.name, speed: lead1.speed, mine: true },
    { name: lead2.pokemon.name, speed: lead2.speed, mine: true },
    { name: opp1.pokemon.name, speed: opp1.speed, mine: false },
    { name: opp2.pokemon.name, speed: opp2.speed, mine: false },
  ].sort((a, b) => b.speed - a.speed);

  const weFaster = allLeadSpeeds[0].mine || allLeadSpeeds[1].mine;

  // ── TURN 1 ───────────────────────────────────────────────────────────

  const turn1Label: StrategyNode = {
    id: nextId(),
    type: "turn-label",
    label: "Turn 1",
    detail: `Speed order: ${allLeadSpeeds.map(s => `${s.name} (${s.speed})`).join(" > ")}`,
    severity: "neutral",
    children: [],
  };
  scenarioNode.children.push(turn1Label);

  // Determine field state on entry
  const fieldState: StrategyNode["fieldState"] = {};
  if (myWeather) fieldState.weather = myWeather;
  if (myTerrain) fieldState.terrain = myTerrain;
  const oppWeather = opp1.weatherOnEntry || opp2.weatherOnEntry;
  const oppTerrain = opp1.terrainOnEntry || opp2.terrainOnEntry;

  // Weather war?
  if (myWeather && oppWeather && myWeather !== oppWeather) {
    // Slower ability sets weather last (wins)
    const myWeatherSetter = lead1.weatherOnEntry ? lead1 : lead2;
    const oppWeatherSetter = opp1.weatherOnEntry ? opp1 : opp2;
    const weWinWeather = myWeatherSetter.speed < oppWeatherSetter.speed;

    const weatherNode: StrategyNode = {
      id: nextId(),
      type: "field-state",
      label: weWinWeather
        ? `${myWeather.toUpperCase()} persists (${myWeatherSetter.pokemon.name} slower → sets last)`
        : `${oppWeather.toUpperCase()} overrides (${oppWeatherSetter.pokemon.name} slower)`,
      detail: weWinWeather
        ? `Your ${myWeather} is active  -  5 turns`
        : `Opponent's ${oppWeather} is active. Consider manual weather reset.`,
      severity: weWinWeather ? "good" : "bad",
      fieldState: { weather: weWinWeather ? myWeather : oppWeather },
      children: [],
    };
    turn1Label.children.push(weatherNode);
  } else if (myWeather || oppWeather) {
    const activeWeather = myWeather || oppWeather;
    const weatherSetter = myWeather
      ? (lead1.weatherOnEntry ? lead1.pokemon.name : lead2.pokemon.name)
      : (opp1.weatherOnEntry ? opp1.pokemon.name : opp2.pokemon.name);
    const fieldStateNode: StrategyNode = {
      id: nextId(),
      type: "field-state",
      label: `${activeWeather!.toUpperCase()}: 5 Turns`,
      detail: `Set by ${weatherSetter} on entry`,
      severity: myWeather ? "good" : "neutral",
      fieldState: { weather: activeWeather! },
      children: [],
    };
    turn1Label.children.push(fieldStateNode);
  }

  if (myTerrain || oppTerrain) {
    const activeTerrain = myTerrain || oppTerrain;
    const terrainNode: StrategyNode = {
      id: nextId(),
      type: "field-state",
      label: `${activeTerrain!.toUpperCase()} TERRAIN: 5 Turns`,
      detail: myTerrain ? "Boosts your moves" : "Boosts opponent's moves",
      severity: myTerrain ? "good" : "bad",
      fieldState: { terrain: activeTerrain! },
      children: [],
    };
    turn1Label.children.push(terrainNode);
  }

  // Intimidate on entry
  if (lead1.isIntimidateUser || lead2.isIntimidateUser) {
    const intimidator = lead1.isIntimidateUser ? lead1 : lead2;
    // Check if opponent has Intimidate-immune abilities
    const opp1Immune = isAbilityAntiIntimidate(opp1.set.ability);
    const opp2Immune = isAbilityAntiIntimidate(opp2.set.ability);
    if (opp1Immune || opp2Immune) {
      const immuneMon = opp1Immune ? opp1 : opp2;
      turn1Label.children.push({
        id: nextId(),
        type: "field-state",
        label: `Intimidate partially blocked`,
        detail: `${immuneMon.pokemon.name}'s ${immuneMon.set.ability} blocks Intimidate`,
        severity: "bad",
        children: [],
      });
    }
  }

  if (opp1.isIntimidateUser || opp2.isIntimidateUser) {
    turn1Label.children.push({
      id: nextId(),
      type: "field-state",
      label: `Opponent Intimidate: -1 Atk`,
      detail: `${(opp1.isIntimidateUser ? opp1 : opp2).pokemon.name} lowers your physical damage`,
      severity: "bad",
      children: [],
    });
  }

  // Build Turn 1 actions
  const turn1Actions = buildTurn1Actions(lead1, lead2, opp1, opp2, weFaster, myArchetype);
  turn1Label.children.push(...turn1Actions);

  // ── TURN 2 ───────────────────────────────────────────────────────────

  const turn2Label: StrategyNode = {
    id: nextId(),
    type: "turn-label",
    label: "Turn 2",
    detail: turn1Actions.some(a => a.label.includes("Tailwind"))
      ? "Tailwind active  -  you outspeed"
      : turn1Actions.some(a => a.label.includes("Trick Room"))
      ? "Trick Room active  -  slowest moves first"
      : weFaster ? "Maintain tempo" : "Contest speed advantage",
    severity: "neutral",
    children: [],
  };
  scenarioNode.children.push(turn2Label);

  // Tailwind/TR field state
  if (turn1Actions.some(a => a.label.includes("Tailwind"))) {
    turn2Label.children.push({
      id: nextId(),
      type: "field-state",
      label: "TAILWIND: 3 Turns left",
      detail: "Your side doubles speed for 4 turns total",
      severity: "good",
      fieldState: { tailwind: true, turnsLeft: 3 },
      children: [],
    });
  }
  if (turn1Actions.some(a => a.label.includes("Trick Room"))) {
    turn2Label.children.push({
      id: nextId(),
      type: "field-state",
      label: "TRICK ROOM: 4 Turns left",
      detail: "Slower Pokémon move first",
      severity: "good",
      fieldState: { trickRoom: true, turnsLeft: 4 },
      children: [],
    });
  }

  const turn2Actions = buildTurn2Actions(lead1, lead2, opp1, opp2, turn1Actions, myArchetype, fullTeam);
  turn2Label.children.push(...turn2Actions);

  // ── TURN 3+ / ENDGAME ────────────────────────────────────────────────

  const endgameNode: StrategyNode = {
    id: nextId(),
    type: "turn-label",
    label: "Turn 3+",
    detail: "Close out the game",
    severity: "neutral",
    children: [],
  };
  scenarioNode.children.push(endgameNode);

  const endgameActions = buildEndgameActions(lead1, lead2, opp1, opp2, fullTeam, winRate, myArchetype);
  endgameNode.children.push(...endgameActions);

  return scenarioNode;
}

function buildTurn1Actions(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  opp1: AnalyzedMon,
  opp2: AnalyzedMon,
  weFaster: boolean,
  archetype: string,
): StrategyNode[] {
  const actions: StrategyNode[] = [];

  // Determine who does what based on roles
  const fakeOutUser = lead1.hasFakeOut ? lead1 : lead2.hasFakeOut ? lead2 : null;
  const nonFakeOutLead = fakeOutUser === lead1 ? lead2 : lead1;
  const tailwindUser = lead1.hasTailwind ? lead1 : lead2.hasTailwind ? lead2 : null;
  const trUser = lead1.hasTrickRoom ? lead1 : lead2.hasTrickRoom ? lead2 : null;
  const redirector = lead1.hasRedirection ? lead1 : lead2.hasRedirection ? lead2 : null;
  const setupUser = lead1.hasSetup ? lead1 : lead2.hasSetup ? lead2 : null;

  // Check opponent threats
  const oppHasFakeOut = opp1.hasFakeOut || opp2.hasFakeOut;
  const oppFakeOutUser = opp1.hasFakeOut ? opp1 : opp2.hasFakeOut ? opp2 : null;
  const oppHasTR = opp1.hasTrickRoom || opp2.hasTrickRoom;
  const oppTRUser = opp1.hasTrickRoom ? opp1 : opp2.hasTrickRoom ? opp2 : null;
  const oppHasRedirection = opp1.hasRedirection || opp2.hasRedirection;
  const oppRedirector = opp1.hasRedirection ? opp1 : opp2.hasRedirection ? opp2 : null;

  /** Helper: get partner's ideal Turn 1 action */
  function getPartnerPlay(partner: AnalyzedMon, foeTarget: AnalyzedMon): StrategyNode {
    if (tailwindUser && tailwindUser === partner) {
      return { id: nextId(), type: "action", label: `${partner.pokemon.name}: Tailwind`, detail: "Double your side's speed for 4 turns", pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], moveType: "flying", severity: "good", children: [] };
    }
    if (trUser && trUser === partner) {
      return { id: nextId(), type: "action", label: `${partner.pokemon.name}: Trick Room`, detail: "Reverse speed for 5 turns  -  your slow mons move first", pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], moveType: "psychic", severity: "good", children: [] };
    }
    if (redirector && redirector === partner) {
      const redirectMove = partner.moves.find(m => m.role === "redirection")!;
      return { id: nextId(), type: "action", label: `${partner.pokemon.name}: ${redirectMove.name}`, detail: "Redirect attacks to protect partner", pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], moveType: "normal", severity: "good", children: [] };
    }
    if (setupUser && setupUser === partner) {
      const setupMove = partner.moves.find(m => m.role === "setup")!;
      return { id: nextId(), type: "action", label: `${partner.pokemon.name}: ${setupMove.name}`, detail: "Boost while partner covers", pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], moveType: "normal", severity: "good", children: [] };
    }
    const bestAtk = getBestAttack(partner, foeTarget);
    if (bestAtk) {
      return { id: nextId(), type: "action", label: `${partner.pokemon.name}: ${bestAtk.name} → ${isSpreadMove(bestAtk.data) ? "both foes" : foeTarget.pokemon.name}`, detail: `${bestAtk.effectiveness >= 2 ? "Super effective! " : ""}${bestAtk.data.basePower} BP ${bestAtk.data.type}-type`, pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], moveType: bestAtk.data.type, severity: bestAtk.effectiveness >= 2 ? "good" : "neutral", children: [] };
    }
    return { id: nextId(), type: "action", label: `${partner.pokemon.name}: attacks`, pokemon: [partner.pokemon.name], sprites: [partner.pokemon.sprite], severity: "neutral", children: [] };
  }

  /** Helper: get attack node for a mon */
  function getAttackNode(mon: AnalyzedMon): StrategyNode {
    const target = findBestTarget(mon, opp1, opp2);
    const bestAtk = getBestAttack(mon, target);
    if (bestAtk) {
      const spread = isSpreadMove(bestAtk.data);
      return { id: nextId(), type: "action", label: `${mon.pokemon.name}: ${bestAtk.name} → ${spread ? "both foes" : target.pokemon.name}`, detail: `${bestAtk.effectiveness >= 2 ? "Super effective! " : ""}${bestAtk.data.basePower} BP ${bestAtk.data.type}-type`, pokemon: [mon.pokemon.name], sprites: [mon.pokemon.sprite], moveType: bestAtk.data.type, severity: bestAtk.effectiveness >= 2 ? "good" : "neutral", children: [] };
    }
    return { id: nextId(), type: "action", label: `${mon.pokemon.name}: attacks`, pokemon: [mon.pokemon.name], sprites: [mon.pokemon.sprite], severity: "neutral", children: [] };
  }

  // ── FAKE OUT BRANCH ──
  if (fakeOutUser) {
    const { target, reason } = pickFakeOutTarget(fakeOutUser, nonFakeOutLead, opp1, opp2);
    const nonFlinched = target === opp1 ? opp2 : opp1;
    const partnerIsSetup = tailwindUser === nonFakeOutLead || trUser === nonFakeOutLead ||
      redirector === nonFakeOutLead || setupUser === nonFakeOutLead;

    // Does opponent have Fake Out that threatens our partner's setup?
    if (oppHasFakeOut && oppFakeOutUser && partnerIsSetup) {
      const setupMoveName = tailwindUser === nonFakeOutLead ? "Tailwind"
        : trUser === nonFakeOutLead ? "Trick Room"
        : redirector === nonFakeOutLead ? nonFakeOutLead.moves.find(m => m.role === "redirection")!.name
        : nonFakeOutLead.moves.find(m => m.role === "setup")!.name;

      // Decision gate: opponent can Fake Out our setup mon
      const gateNode: StrategyNode = {
        id: nextId(),
        type: "decision",
        label: `${oppFakeOutUser.pokemon.name} threatens Fake Out → ${nonFakeOutLead.pokemon.name}`,
        detail: `May block your ${setupMoveName}  -  choose your play`,
        severity: "neutral",
        children: [],
      };

      // Branch A: Ideal play → assume opponent doesn't target partner (or we read it)
      const idealBranch: StrategyNode = {
        id: nextId(),
        type: "action",
        label: `${fakeOutUser.pokemon.name}: Fake Out → ${target.pokemon.name}`,
        detail: `Flinch to ${reason}  -  partner sets up freely`,
        pokemon: [fakeOutUser.pokemon.name],
        sprites: [fakeOutUser.pokemon.sprite],
        moveType: "normal",
        severity: "good",
        branchLabel: "Ideal play",
        children: [getPartnerPlay(nonFakeOutLead, nonFlinched)],
      };
      gateNode.children.push(idealBranch);

      // Branch B: Safe play → Protect partner, delay setup
      if (nonFakeOutLead.hasProtect) {
        const safeBranch: StrategyNode = {
          id: nextId(),
          type: "action",
          label: `${fakeOutUser.pokemon.name}: Fake Out → ${target.pokemon.name}`,
          detail: `Partner Protects to block Fake Out  -  ${setupMoveName} delayed to Turn 2`,
          pokemon: [fakeOutUser.pokemon.name],
          sprites: [fakeOutUser.pokemon.sprite],
          moveType: "normal",
          severity: "neutral",
          branchLabel: "Safe play",
          children: [{
            id: nextId(),
            type: "action",
            label: `${nonFakeOutLead.pokemon.name}: Protect`,
            detail: `Block opponent's Fake Out  -  set up ${setupMoveName} next turn`,
            pokemon: [nonFakeOutLead.pokemon.name],
            sprites: [nonFakeOutLead.pokemon.sprite],
            severity: "neutral",
            children: [],
          }],
        };
        gateNode.children.push(safeBranch);
      } else {
        const riskBranch: StrategyNode = {
          id: nextId(),
          type: "action",
          label: `${nonFakeOutLead.pokemon.name} gets flinched`,
          detail: `No Protect  -  ${setupMoveName} delayed to Turn 2. ${fakeOutUser.pokemon.name} still flinches ${target.pokemon.name}.`,
          severity: "bad",
          branchLabel: "If flinched",
          children: [],
        };
        gateNode.children.push(riskBranch);
      }

      actions.push(gateNode);
    } else {
      // No opponent Fake Out threat to partner → single clear plan
      const fakeOutNode: StrategyNode = {
        id: nextId(),
        type: "action",
        label: `${fakeOutUser.pokemon.name}: Fake Out → ${target.pokemon.name}`,
        detail: `Flinch to ${reason} (priority +3, always goes first)`,
        pokemon: [fakeOutUser.pokemon.name],
        sprites: [fakeOutUser.pokemon.sprite],
        moveType: "normal",
        severity: "good",
        children: [],
      };
      actions.push(fakeOutNode);
      actions.push(getPartnerPlay(nonFakeOutLead, nonFlinched));
    }
  }
  // ── NO FAKE OUT: SPEED CONTROL + ATTACK ──
  else if (tailwindUser || trUser) {
    const speedUser = tailwindUser ?? trUser!;
    const attacker = speedUser === lead1 ? lead2 : lead1;
    const speedMoveName = tailwindUser ? "Tailwind" : "Trick Room";
    const moveType: PokemonType = tailwindUser ? "flying" : "psychic";
    const attackNode = getAttackNode(attacker);

    if (oppHasFakeOut && oppFakeOutUser) {
      // Decision gate: opponent Fake Out contests our speed control
      const gateNode: StrategyNode = {
        id: nextId(),
        type: "decision",
        label: `${oppFakeOutUser.pokemon.name} may Fake Out ${speedUser.pokemon.name}`,
        detail: `Threatens to block your ${speedMoveName}`,
        severity: "neutral",
        children: [],
      };

      // Branch A: Speed control goes up (opponent targets attacker or doesn't FO)
      gateNode.children.push({
        id: nextId(),
        type: "action",
        label: `${speedUser.pokemon.name}: ${speedMoveName}`,
        detail: tailwindUser ? "Double speed for 4 turns" : "Reverse speed for 5 turns",
        pokemon: [speedUser.pokemon.name],
        sprites: [speedUser.pokemon.sprite],
        moveType,
        severity: "good",
        branchLabel: `${speedMoveName} goes up`,
        children: [{ ...attackNode, id: nextId() }],
      });

      // Branch B: Protect or get flinched
      if (speedUser.hasProtect) {
        gateNode.children.push({
          id: nextId(),
          type: "action",
          label: `${speedUser.pokemon.name}: Protect`,
          detail: `Block Fake Out  -  set ${speedMoveName} Turn 2`,
          pokemon: [speedUser.pokemon.name],
          sprites: [speedUser.pokemon.sprite],
          severity: "neutral",
          branchLabel: "Protect first",
          children: [{ ...attackNode, id: nextId() }],
        });
      } else {
        gateNode.children.push({
          id: nextId(),
          type: "action",
          label: `${speedUser.pokemon.name} gets flinched`,
          detail: `${speedMoveName} delayed to Turn 2`,
          severity: "bad",
          branchLabel: "If flinched",
          children: [{ ...attackNode, id: nextId() }],
        });
      }

      actions.push(gateNode);
    } else if (tailwindUser && oppHasTR && oppTRUser) {
      // Speed control + opponent counter-TR threat
      actions.push({
        id: nextId(),
        type: "action",
        label: `${speedUser.pokemon.name}: Tailwind`,
        detail: "Double speed for 4 turns",
        pokemon: [speedUser.pokemon.name],
        sprites: [speedUser.pokemon.sprite],
        moveType,
        severity: "good",
        children: [],
      });

      // Attacker action with decision about TR counter
      const gateNode: StrategyNode = {
        id: nextId(),
        type: "decision",
        label: `${oppTRUser.pokemon.name} may set Trick Room`,
        detail: "Counters Tailwind by reversing speed",
        severity: "neutral",
        children: [
          {
            id: nextId(),
            type: "action",
            label: `${attacker.pokemon.name}: Focus ${oppTRUser.pokemon.name}`,
            detail: "KO the TR setter before it moves (-7 priority)",
            severity: "good",
            branchLabel: "Prevent TR",
            children: [],
          },
          {
            ...attackNode,
            id: nextId(),
            branchLabel: "Press damage",
            detail: `Ignore TR threat  -  deal maximum damage. Counter-TR later if needed.`,
          },
        ],
      };
      actions.push(gateNode);
    } else {
      // No threats → single clear plan
      actions.push({
        id: nextId(),
        type: "action",
        label: `${speedUser.pokemon.name}: ${speedMoveName}`,
        detail: tailwindUser ? "Double speed for 4 turns" : "Reverse speed for 5 turns",
        pokemon: [speedUser.pokemon.name],
        sprites: [speedUser.pokemon.sprite],
        moveType,
        severity: "good",
        children: [],
      });
      actions.push(attackNode);
    }
  }
  // ── REDIRECTION + ATTACK ──
  else if (redirector) {
    const attacker = redirector === lead1 ? lead2 : lead1;
    const redirectMove = redirector.moves.find(m => m.role === "redirection")!;

    actions.push({
      id: nextId(),
      type: "action",
      label: `${redirector.pokemon.name}: ${redirectMove.name}`,
      detail: "Draw all single-target attacks  -  protect partner",
      pokemon: [redirector.pokemon.name],
      sprites: [redirector.pokemon.sprite],
      moveType: "normal",
      severity: "good",
      children: [],
    });

    // Partner: setup or attack
    if (setupUser && setupUser === attacker) {
      const setupMove = attacker.moves.find(m => m.role === "setup")!;
      actions.push({
        id: nextId(),
        type: "action",
        label: `${attacker.pokemon.name}: ${setupMove.name}`,
        detail: "Safely boost while partner redirects",
        pokemon: [attacker.pokemon.name],
        sprites: [attacker.pokemon.sprite],
        moveType: "normal",
        severity: "good",
        children: [],
      });
    } else {
      const primaryTarget = threatScore(opp1, attacker) >= threatScore(opp2, attacker) ? opp1 : opp2;
      const bestAtk = getBestAttack(attacker, primaryTarget);
      if (bestAtk) {
        actions.push({
          id: nextId(),
          type: "action",
          label: `${attacker.pokemon.name}: ${bestAtk.name} → ${isSpreadMove(bestAtk.data) ? "both foes" : primaryTarget.pokemon.name}`,
          detail: `${bestAtk.effectiveness >= 2 ? "Super effective! " : ""}Free to attack while partner absorbs hits`,
          pokemon: [attacker.pokemon.name],
          sprites: [attacker.pokemon.sprite],
          moveType: bestAtk.data.type,
          severity: bestAtk.effectiveness >= 2 ? "good" : "neutral",
          children: [],
        });
      }
    }
  }
  // ── BOTH ATTACK (no setup/disruption) ──
  else {
    const target1 = findBestTarget(lead1, opp1, opp2);
    const target2 = findBestTarget(lead2, opp1, opp2);
    const bestAtk1 = getBestAttack(lead1, target1);
    const bestAtk2 = getBestAttack(lead2, target2);
    const shouldFocus = target1 === target2;

    if (bestAtk1) {
      const spread1 = bestAtk1.data && isSpreadMove(bestAtk1.data);
      actions.push({
        id: nextId(),
        type: "action",
        label: `${lead1.pokemon.name}: ${bestAtk1.name} → ${spread1 ? "both foes" : target1.pokemon.name}`,
        detail: `${bestAtk1.effectiveness >= 2 ? "Super effective! " : ""}${shouldFocus && !spread1 ? "Focus fire! " : ""}${bestAtk1.data.basePower} BP`,
        pokemon: [lead1.pokemon.name],
        sprites: [lead1.pokemon.sprite],
        moveType: bestAtk1.data.type,
        severity: bestAtk1.effectiveness >= 2 ? "good" : "neutral",
        children: [],
      });
    }

    if (bestAtk2) {
      const spread2 = bestAtk2.data && isSpreadMove(bestAtk2.data);
      actions.push({
        id: nextId(),
        type: "action",
        label: `${lead2.pokemon.name}: ${bestAtk2.name} → ${spread2 ? "both foes" : target2.pokemon.name}`,
        detail: `${bestAtk2.effectiveness >= 2 ? "Super effective! " : ""}${bestAtk2.data.basePower} BP`,
        pokemon: [lead2.pokemon.name],
        sprites: [lead2.pokemon.sprite],
        moveType: bestAtk2.data.type,
        severity: bestAtk2.effectiveness >= 2 ? "good" : "neutral",
        children: [],
      });
    }

    if (!weFaster) {
      actions.push({
        id: nextId(),
        type: "decision",
        label: "No speed control  -  opponent moves first!",
        detail: "Consider bringing a Tailwind/Trick Room user or Protect to survive turn 1",
        severity: "bad",
        children: [],
      });
    }
  }

  // Handle opponent redirection warning (applies across all branches)
  if (oppHasRedirection && oppRedirector) {
    const redirectedMoves = actions.filter(a =>
      a.type === "action" && a.label.includes("→") && !a.label.includes("both foes")
    );
    if (redirectedMoves.length > 0) {
      actions.push({
        id: nextId(),
        type: "field-state",
        label: `⚠ ${oppRedirector.pokemon.name} redirects single-target attacks`,
        detail: `Use spread moves or KO ${oppRedirector.pokemon.name} first`,
        severity: "bad",
        children: [],
      });
    }
  }

  return actions;
}

function buildTurn2Actions(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  opp1: AnalyzedMon,
  opp2: AnalyzedMon,
  turn1Actions: StrategyNode[],
  archetype: string,
  fullTeam: AnalyzedMon[],
): StrategyNode[] {
  const actions: StrategyNode[] = [];

  const usedFakeOut = treeContains(turn1Actions, "Fake Out");
  const planHasTailwind = treeContains(turn1Actions, "Tailwind");
  const planHasTrickRoom = treeContains(turn1Actions, "Trick Room");
  const setupMaybeDelayed = treeContains(turn1Actions, "Safe play") ||
    treeContains(turn1Actions, "Protect first") ||
    treeContains(turn1Actions, "If flinched");
  const hasSpeedControl = planHasTailwind || planHasTrickRoom;

  // ── POST-FAKE OUT: NOW ATTACK/SETUP ──
  if (usedFakeOut) {
    const fakeOutUser = lead1.hasFakeOut ? lead1 : lead2;
    const partner = fakeOutUser === lead1 ? lead2 : lead1;

    if (setupMaybeDelayed && (partner.hasTailwind || partner.hasTrickRoom)) {
      // Partner may have Protected instead of setting up on Turn 1
      const setupMove = partner.hasTailwind ? "Tailwind" : "Trick Room";
      const sMoveType: PokemonType = partner.hasTailwind ? "flying" : "psychic";

      const foTarget = findBestTarget(fakeOutUser, opp1, opp2);
      const foBestAtk = getBestAttack(fakeOutUser, foTarget);
      const partnerTarget = findBestTarget(partner, opp1, opp2);
      const partnerBestAtk = getBestAttack(partner, partnerTarget);

      const gateNode: StrategyNode = {
        id: nextId(),
        type: "decision",
        label: `Did ${partner.pokemon.name} set ${setupMove} Turn 1?`,
        detail: "Depends on which Turn 1 branch was taken",
        severity: "neutral",
        children: [],
      };

      // Branch: Setup went up → both attack
      gateNode.children.push({
        id: nextId(),
        type: "action",
        label: `Both attack under ${setupMove}`,
        detail: `${fakeOutUser.pokemon.name}: ${foBestAtk?.name ?? "attacks"} + ${partner.pokemon.name}: ${partnerBestAtk?.name ?? "attacks"}`,
        severity: "good",
        branchLabel: "Setup went up",
        children: [],
      });

      // Branch: Setup delayed → partner sets up now, FO user covers
      const coverChildren: StrategyNode[] = [];
      if (foBestAtk) {
        coverChildren.push({
          id: nextId(),
          type: "action",
          label: `${fakeOutUser.pokemon.name}: ${foBestAtk.name} → ${isSpreadMove(foBestAtk.data) ? "both foes" : foTarget.pokemon.name}`,
          detail: "Cover while partner sets up",
          severity: "neutral",
          moveType: foBestAtk.data.type,
          children: [],
        });
      }
      gateNode.children.push({
        id: nextId(),
        type: "action",
        label: `${partner.pokemon.name}: ${setupMove}`,
        detail: `Delayed from Turn 1  -  set up now`,
        severity: "good",
        branchLabel: "Setup delayed",
        moveType: sMoveType,
        children: coverChildren,
      });

      actions.push(gateNode);
    } else {
      // No delayed setup  -  Fake Out user now does their main job
      if (fakeOutUser.hasTailwind && !planHasTailwind) {
        actions.push({
          id: nextId(),
          type: "action",
          label: `${fakeOutUser.pokemon.name}: Tailwind`,
          detail: "Set speed after turn 1 disruption",
          severity: "good",
          moveType: "flying",
          children: [],
        });
      } else if (fakeOutUser.hasTrickRoom && !planHasTrickRoom) {
        actions.push({
          id: nextId(),
          type: "action",
          label: `${fakeOutUser.pokemon.name}: Trick Room`,
          detail: "Set speed after turn 1 disruption",
          severity: "good",
          moveType: "psychic",
          children: [],
        });
      } else {
        const target = findBestTarget(fakeOutUser, opp1, opp2);
        const bestAtk = getBestAttack(fakeOutUser, target);
        if (bestAtk) {
          const spread = isSpreadMove(bestAtk.data);
          actions.push({
            id: nextId(),
            type: "action",
            label: `${fakeOutUser.pokemon.name}: ${bestAtk.name} → ${spread ? "both foes" : target.pokemon.name}`,
            detail: `Fake Out used  -  switch to offense`,
            severity: "neutral",
            moveType: bestAtk.data.type,
            children: [],
          });
        }
      }

      // Partner continues attacking
      const target2 = findBestTarget(partner, opp1, opp2);
      const bestAtk2 = getBestAttack(partner, target2);
      if (bestAtk2) {
        const spread = isSpreadMove(bestAtk2.data);
        actions.push({
          id: nextId(),
          type: "action",
          label: `${partner.pokemon.name}: ${bestAtk2.name} → ${spread ? "both foes" : target2.pokemon.name}`,
          detail: `Continue pressing advantage`,
          severity: "neutral",
          moveType: bestAtk2.data.type,
          children: [],
        });
      }
    }
  }
  // ── POST-SETUP: SWEEP ──
  else if (hasSpeedControl) {
    const speedUser = (lead1.hasTailwind || lead1.hasTrickRoom) ? lead1 : lead2;
    const attacker = speedUser === lead1 ? lead2 : lead1;

    if (setupMaybeDelayed) {
      // Speed control mon may have Protected; handle both cases
      const setupMove = planHasTailwind ? "Tailwind" : "Trick Room";
      const sMoveType: PokemonType = planHasTailwind ? "flying" : "psychic";
      const attackerTarget = findBestTarget(attacker, opp1, opp2);
      const attackerBestAtk = getBestAttack(attacker, attackerTarget);
      const speedTarget = findBestTarget(speedUser, opp1, opp2);
      const speedBestAtk = getBestAttack(speedUser, speedTarget);

      const gateNode: StrategyNode = {
        id: nextId(),
        type: "decision",
        label: `Did ${setupMove} go up Turn 1?`,
        detail: "Depends on whether opponent Faked Out",
        severity: "neutral",
        children: [],
      };

      // Branch: setup went up → full offense
      const offenseDetails: string[] = [];
      if (speedBestAtk) offenseDetails.push(`${speedUser.pokemon.name}: ${speedBestAtk.name}`);
      if (attackerBestAtk) offenseDetails.push(`${attacker.pokemon.name}: ${attackerBestAtk.name}`);
      gateNode.children.push({
        id: nextId(),
        type: "action",
        label: `Both attack  -  you outspeed`,
        detail: offenseDetails.join(" + ") || "Full offense",
        severity: "good",
        branchLabel: "Setup went up",
        children: [],
      });

      // Branch: setup delayed → do it now
      const coverChildren: StrategyNode[] = [];
      if (attackerBestAtk) {
        coverChildren.push({
          id: nextId(),
          type: "action",
          label: `${attacker.pokemon.name}: ${attackerBestAtk.name} → ${isSpreadMove(attackerBestAtk.data) ? "both foes" : attackerTarget.pokemon.name}`,
          detail: "Cover while partner sets up",
          severity: "neutral",
          moveType: attackerBestAtk.data.type,
          children: [],
        });
      }
      gateNode.children.push({
        id: nextId(),
        type: "action",
        label: `${speedUser.pokemon.name}: ${setupMove}`,
        detail: `Delayed from Turn 1  -  set up now`,
        severity: "good",
        branchLabel: "Setup delayed",
        moveType: sMoveType,
        children: coverChildren,
      });

      actions.push(gateNode);
    } else {
      // Both leads now go into full attack mode under speed control
      const target1 = findBestTarget(lead1, opp1, opp2);
      const target2 = findBestTarget(lead2, opp1, opp2);
      const bestAtk1 = getBestAttack(lead1, target1);
      const bestAtk2 = getBestAttack(lead2, target2);

      if (bestAtk1) {
        const spread = isSpreadMove(bestAtk1.data);
        actions.push({
          id: nextId(),
          type: "action",
          label: `${lead1.pokemon.name}: ${bestAtk1.name} → ${spread ? "both foes" : target1.pokemon.name}`,
          detail: `You outspeed  -  full offense`,
          severity: bestAtk1.effectiveness >= 2 ? "good" : "neutral",
          moveType: bestAtk1.data.type,
          children: [],
        });
      }
      if (bestAtk2) {
        const spread = isSpreadMove(bestAtk2.data);
        actions.push({
          id: nextId(),
          type: "action",
          label: `${lead2.pokemon.name}: ${bestAtk2.name} → ${spread ? "both foes" : target2.pokemon.name}`,
          detail: `Press advantage under ${planHasTailwind ? "Tailwind" : "Trick Room"}`,
          severity: bestAtk2.effectiveness >= 2 ? "good" : "neutral",
          moveType: bestAtk2.data.type,
          children: [],
        });
      }
    }
  }
  // ── GENERAL TURN 2 ──
  else {
    // Double-into weakened target or protect + switch
    const canProtect1 = lead1.hasProtect;
    const canProtect2 = lead2.hasProtect;

    // Decision: press or pivot
    const pressNode: StrategyNode = {
      id: nextId(),
      type: "decision",
      label: "Continue offense or pivot?",
      severity: "neutral",
      children: [],
    };

    // Press path
    const target1 = findBestTarget(lead1, opp1, opp2);
    const bestAtk1 = getBestAttack(lead1, target1);
    const target2 = findBestTarget(lead2, opp1, opp2);
    const bestAtk2 = getBestAttack(lead2, target2);

    if (bestAtk1 && bestAtk2) {
      pressNode.children.push({
        id: nextId(),
        type: "action",
        label: `Double into ${target1 === target2 ? target1.pokemon.name : "threats"}`,
        detail: `${lead1.pokemon.name}: ${bestAtk1.name} + ${lead2.pokemon.name}: ${bestAtk2.name}`,
        severity: "good",
        branchLabel: "Offense",
        children: [],
      });
    }

    // Pivot path
    if (canProtect1 || canProtect2) {
      const protector = canProtect1 ? lead1 : lead2;
      const switcher = protector === lead1 ? lead2 : lead1;
      const backMon = fullTeam.find(m =>
        m !== lead1 && m !== lead2 && m.hasPriority
      ) ?? fullTeam.find(m => m !== lead1 && m !== lead2);

      pressNode.children.push({
        id: nextId(),
        type: "action",
        label: `${protector.pokemon.name}: Protect · Switch ${switcher.pokemon.name}${backMon ? ` → ${backMon.pokemon.name}` : ""}`,
        detail: "Stall a turn and bring in a better matchup",
        severity: "neutral",
        branchLabel: "Pivot",
        children: [],
      });
    }

    actions.push(pressNode);
  }

  // If either lead has a setup move they haven't used
  const setupLeads = [lead1, lead2].filter(l =>
    l.hasSetup && !l.moves.some(m => m.role === "setup" && treeContains(turn1Actions, m.name))
  );
  if (setupLeads.length > 0 && hasSpeedControl) {
    const s = setupLeads[0];
    const setupMove = s.moves.find(m => m.role === "setup")!;
    actions.push({
      id: nextId(),
      type: "decision",
      label: `${s.pokemon.name}: ${setupMove.name}?`,
      detail: "Under speed control, consider boosting for a sweep",
      severity: "good",
      branchLabel: "Optional",
      children: [],
    });
  }

  return actions;
}

function buildEndgameActions(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  opp1: AnalyzedMon,
  opp2: AnalyzedMon,
  fullTeam: AnalyzedMon[],
  winRate: number,
  archetype: string,
): StrategyNode[] {
  const actions: StrategyNode[] = [];

  // Back Pokémon to bring in
  const backMons = fullTeam.filter(m => m !== lead1 && m !== lead2);
  if (backMons.length > 0) {
    const bestBack = backMons.sort((a, b) => {
      // Score based on coverage vs opponent team
      const scoreA = threatScore(a, opp1) + threatScore(a, opp2);
      const scoreB = threatScore(b, opp1) + threatScore(b, opp2);
      return scoreB - scoreA;
    });

    const switchNode: StrategyNode = {
      id: nextId(),
      type: "switch",
      label: `Bring: ${bestBack.slice(0, 2).map(b => b.pokemon.name).join(" or ")}`,
      detail: `${bestBack[0].pokemon.name} has best coverage vs opponent's remaining team`,
      pokemon: bestBack.slice(0, 2).map(b => b.pokemon.name),
      sprites: bestBack.slice(0, 2).map(b => b.pokemon.sprite),
      severity: "neutral",
      children: [],
    };
    actions.push(switchNode);
  }

  // Priority moves for closing
  const priorityUsers = [lead1, lead2, ...backMons].filter(m => m.hasPriority);
  if (priorityUsers.length > 0) {
    const pu = priorityUsers[0];
    const priMove = pu.moves.find(m => m.data && m.data.priority > 0 && m.data.category !== "status");
    if (priMove) {
      actions.push({
        id: nextId(),
        type: "action",
        label: `${pu.pokemon.name}: ${priMove.name} to finish`,
        detail: `Priority +${priMove.data!.priority}  -  pick off weakened targets`,
        severity: "good",
        moveType: priMove.data!.type,
        children: [],
      });
    }
  }

  // Outcome
  actions.push({
    id: nextId(),
    type: "outcome",
    label: winRate >= 60
      ? "Favorable  -  maintain board control & trade efficiently"
      : winRate >= 50
      ? "Close matchup  -  avoid misplays, protect key pieces"
      : winRate >= 40
      ? "Uphill battle  -  need early KOs to swing momentum"
      : "Tough matchup  -  consider alternate lead or surprise play",
    severity: winRate >= 55 ? "good" : winRate >= 45 ? "neutral" : "bad",
    children: [],
  });

  return actions;
}

function findBestTarget(attacker: AnalyzedMon, opp1: AnalyzedMon, opp2: AnalyzedMon): AnalyzedMon {
  const bestVs1 = getBestAttack(attacker, opp1);
  const bestVs2 = getBestAttack(attacker, opp2);

  const score1 = bestVs1 ? bestVs1.data.basePower * bestVs1.effectiveness : 0;
  const score2 = bestVs2 ? bestVs2.data.basePower * bestVs2.effectiveness : 0;

  // Prefer super-effective targets; break ties with lower bulk
  if (score1 > score2) return opp1;
  if (score2 > score1) return opp2;
  // Tie-break: target the one with lower HP+Def
  const bulk1 = opp1.stats.hp * opp1.stats.defense;
  const bulk2 = opp2.stats.hp * opp2.stats.defense;
  return bulk1 <= bulk2 ? opp1 : opp2;
}

function isAbilityAntiIntimidate(ability: string): boolean {
  return [
    "Clear Body", "White Smoke", "Full Metal Body", "Hyper Cutter",
    "Inner Focus", "Own Tempo", "Oblivious", "Scrappy",
    "Defiant", "Competitive", "Mirror Armor", "Guard Dog",
  ].includes(ability);
}

function determineWinCondition(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  archetype: string,
  weather: string | null,
  terrain: string | null,
): string {
  if (archetype === "rain") return "Dominate with rain-boosted Water moves + Swift Swim speed";
  if (archetype === "sun") return "Overwhelm with sun-boosted Fire moves + Chlorophyll speed";
  if (archetype === "sand") return "Chip with sandstorm + Sand Rush physical sweeping";
  if (archetype === "trick-room" || archetype === "hard-trick-room") return "Set Trick Room and let slow powerhouses sweep";
  if (archetype === "tailwind") return "Set Tailwind early and outpace with strong attacks";
  if (archetype === "hyper-offense") return "Maximum turn 1 pressure  -  KO before they set up";

  // Generic based on leads
  if (lead1.hasSetup || lead2.hasSetup) return "Set up safely then sweep  -  protect your booster";
  if (lead1.hasFakeOut || lead2.hasFakeOut) return "Disrupt turn 1, establish board control, then overwhelm";
  if (weather) return `Control the game under ${weather}  -  leverage weather-boosted attacks`;
  if (terrain) return `Capitalize on ${terrain} terrain  -  position to maximize its boost`;

  return "Trade favorably and maintain board advantage";
}

function generateBackupPlan(
  lead1: AnalyzedMon,
  lead2: AnalyzedMon,
  fullTeam: AnalyzedMon[],
  oppTeam: AnalyzedMon[],
  winRate: number,
): string {
  const backMons = fullTeam.filter(m => m !== lead1 && m !== lead2);

  // If we have a Trick Room option in the back
  const backTR = backMons.find(m => m.hasTrickRoom);
  if (backTR && !lead1.hasTrickRoom && !lead2.hasTrickRoom) {
    return `If losing speed war, pivot to ${backTR.pokemon.name} for Trick Room mode`;
  }

  // Weather counter
  const backWeather = backMons.find(m => m.weatherOnEntry);
  if (backWeather) {
    return `Switch to ${backWeather.pokemon.name} to reset weather in your favor`;
  }

  // Intimidate cycle
  const backIntimidate = backMons.find(m => m.isIntimidateUser);
  if (backIntimidate) {
    return `Cycle ${backIntimidate.pokemon.name} for repeated Intimidate to weaken physical attackers`;
  }

  if (backMons.length > 0) {
    const bestBack = backMons[0];
    return `Pivot to ${bestBack.pokemon.name}  -  fresh matchup and momentum reset`;
  }

  return "Adjust your game plan based on what the opponent reveals";
}
