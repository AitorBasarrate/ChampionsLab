import type { VGCEvent, EventTier, EventRegion } from './vgc-events';

// ── CrafterCMS API at championships.pokemon.com ───────────────────────────────

const CMS_BASE =
  'https://championships.pokemon.com/api/1/site/content_store/children.json';

const CATEGORIES = ['regionals', 'internationals', 'worlds'] as const;

// ── Mapping tables ────────────────────────────────────────────────────────────

const REGION_MAP: Record<string, EventRegion> = {
  northamerica: 'NA',
  europe: 'EU',
  latinamerica: 'LA',
  oceania: 'OC',
  middleeast: 'EU', // Cape Town etc.  -  maps to EU like official docs
  virtual: 'ONLINE',
};

const BASE_TIER_MAP: Record<string, EventTier> = {
  regional: 'regional',
  international: 'international',
  world: 'worlds',
};

const CP_BY_TIER: Record<EventTier, number> = {
  regional: 500,
  international: 1000,
  worlds: 3000,
  special: 250,
  national: 500,
  online: 100,
  community: 0,
};

const US_STATES = new Set([
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  // Common abbreviations the CMS might use
  'DC', 'D.C.',
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
  'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
  'WI', 'WY',
]);

const COUNTRY_ALIASES: Record<string, string> = {
  'United Kingdom': 'UK',
  'United States': 'USA',
  'United States of America': 'USA',
};

// ── CMS types ─────────────────────────────────────────────────────────────────

interface CMSComponent {
  'internal-name': string;
  eventName_s: string;
  eventLocation_s: string;
  startDateTime_dt: string;
  endDateTime_dt: string;
  type_s: string;
  region_s: string;
  uRL_s: string;
  year_s: string;
  displayDateRange_s?: string;
}

interface CMSItem {
  name: string;
  descriptorDom: {
    component: CMSComponent;
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseLocation(location: string): { city: string; country: string } {
  if (!location || location === 'Online') {
    return { city: 'Online', country: '' };
  }

  const parts = location.split(',').map((s) => s.trim());
  if (parts.length < 2) return { city: location, country: '' };

  const city = parts[0];
  const rest = parts.slice(1).join(', ').trim();

  // Check if "rest" is a US state
  if (US_STATES.has(rest)) return { city, country: 'USA' };

  // Normalize common country names
  return { city, country: COUNTRY_ALIASES[rest] ?? rest };
}

/** Extract YYYY-MM-DD from an ISO 8601 datetime string. */
function extractDate(iso: string): string {
  return iso.slice(0, 10);
}

function determineTier(c: CMSComponent): EventTier {
  const base = BASE_TIER_MAP[c.type_s] ?? 'regional';
  // Events with "Special" in name have type_s "regional" but are actually specials
  if (base === 'regional' && /special/i.test(c.eventName_s)) return 'special';
  return base;
}

function makeId(c: CMSComponent, tier: EventTier): string {
  const slug = c['internal-name'];
  const date = extractDate(c.startDateTime_dt);
  const [year, monthNum] = date.split('-');
  const months = [
    '', 'jan', 'feb', 'mar', 'apr', 'may', 'jun',
    'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];
  const suffix = months[parseInt(monthNum, 10)] + year.slice(2);
  const prefix =
    tier === 'special' ? 'sc' :
    tier === 'international' ? 'ic' :
    tier === 'worlds' ? 'worlds' :
    'reg';
  return `${prefix}-${slug}-${suffix}`;
}

function cleanName(raw: string): string {
  return raw
    .replace(/^\d{4}\s+/, '')     // leading year: "2026 Toronto ..."
    .replace(/\s+\d{4}$/, '')     // trailing year: "... Championships 2026"
    .replace(/Pokémon\s+/gi, ''); // "Pokémon" anywhere in name
}

function transformCMSEvent(item: CMSItem): VGCEvent {
  const c = item.descriptorDom.component;
  const tier = determineTier(c);
  const region = REGION_MAP[c.region_s] ?? 'NA';
  const { city, country } = parseLocation(c.eventLocation_s);

  return {
    id: makeId(c, tier),
    name: cleanName(c.eventName_s),
    city,
    country,
    startDate: extractDate(c.startDateTime_dt),
    endDate: extractDate(c.endDateTime_dt),
    tier,
    format: 'VGC 2026',
    region,
    registrationUrl: c.uRL_s.startsWith('http')
      ? c.uRL_s
      : `https://championships.pokemon.com${c.uRL_s}`,
    cpPoints: CP_BY_TIER[tier],
  };
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Fetch the VGC Championship Series events from the official Pokémon
 * CrafterCMS API (regionals, internationals, worlds).
 *
 * Returns events sorted by start date.
 */
export async function fetchCMSEvents(
  seasonYear = '2026',
): Promise<VGCEvent[]> {
  const batches = await Promise.all(
    CATEGORIES.map(async (cat) => {
      const url = `${CMS_BASE}?url=/site/components/events/en-us/${cat}/${seasonYear}/`;
      try {
        const res = await fetch(url, { next: { revalidate: 86400 } });
        if (!res.ok) return [];
        const items: CMSItem[] = await res.json();
        return items
          .filter((item) => item.descriptorDom?.component?.eventName_s)
          .map(transformCMSEvent);
      } catch {
        return [];
      }
    }),
  );

  return batches.flat().sort((a, b) => a.startDate.localeCompare(b.startDate));
}

// ── Limitless community tournaments ───────────────────────────────────────────

export interface LimitlessTournament {
  id: string;
  name: string;
  date: string;
  players: number;
}

/**
 * Fetch the biggest upcoming community VGC tournaments from Limitless.
 * Parses the public upcoming-tournaments page and returns the top `count`
 * tournaments sorted by registration count.
 */
export async function fetchLimitlessTournaments(
  count = 5,
): Promise<LimitlessTournament[]> {
  try {
    const res = await fetch(
      'https://play.limitlesstcg.com/tournaments/upcoming?game=VGC',
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];
    const html = await res.text();

    const tournaments: LimitlessTournament[] = [];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/g;
    let match: RegExpExecArray | null;

    while ((match = rowRe.exec(html)) !== null) {
      const row = match[1];
      const idM = row.match(/tournament\/([a-f0-9]+)\/details/);
      const nameM = row.match(/<a[^>]*details"[^>]*>([^<]+)<\/a>/);
      const timeM = row.match(/data-time="(\d+)"/);
      const playersM = row.match(/\/registrations">(\d+)/);
      if (!idM || !nameM) continue;

      tournaments.push({
        id: idM[1],
        name: nameM[1].trim(),
        date: timeM
          ? new Date(Number(timeM[1])).toISOString()
          : '',
        players: playersM ? Number(playersM[1]) : 0,
      });
    }

    return tournaments
      .filter((t) => t.players >= 16)
      .sort((a, b) => b.players - a.players)
      .slice(0, count);
  } catch {
    return [];
  }
}
