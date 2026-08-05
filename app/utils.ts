import type { CharacterProfile, Signal } from "./data";

const SAVED_STORAGE_KEY = "atlas-gesto-saved";

const stillExtensions: Record<string, string> = {
  "diana-mitford": "webp",
  "duke-shelby": "png",
};

const wikiSlugs: Record<string, string> = {
  "ada-shelby": "Ada_Thorne",
  "chester-campbell": "Inspector_Campbell",
  "grace-burgess": "Grace_Shelby",
  "isaiah-jesus": "Isiah_Jesus",
};

const stillOverrides: Partial<
  Record<string, Partial<Record<Signal["channel"], string>>>
> = {
  "thomas-shelby": {
    Objeto: "./stills/thomas-smoking.jpg",
    Movimiento: "./stills/thomas-walking.jpg",
    Distancia: "./stills/shelby-family.jpg",
  },
  "arthur-shelby": {
    Movimiento: "./stills/shelby-betting-shop.jpg",
    Distancia: "./stills/family-meeting.jpg",
  },
  "john-shelby": {
    Postura: "./stills/shelby-betting-shop.jpg",
    Distancia: "./stills/family-meeting.jpg",
  },
  "polly-gray": { Distancia: "./stills/polly-ada.png" },
  "ada-shelby": { Distancia: "./stills/polly-ada.png" },
  "michael-gray": { Distancia: "./stills/family-meeting.jpg" },
  "finn-shelby": { Distancia: "./stills/family-meeting.jpg" },
  "grace-burgess": { Distancia: "./stills/thomas-grace.png" },
  "lizzie-stark": { Distancia: "./stills/thomas-lizzie.png" },
  "may-carleton": { Distancia: "./stills/thomas-may.jpg" },
};

export function classNames(
  ...values: Array<string | false | null | undefined>
): string {
  return values.filter(Boolean).join(" ");
}

export function orderLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function characterStill(profile: CharacterProfile): string {
  const extension = stillExtensions[profile.id] ?? "jpg";
  return `./stills/${profile.id}.${extension}`;
}

export function stillForSignal(
  profile: CharacterProfile,
  signal: Signal,
): string {
  return stillOverrides[profile.id]?.[signal.channel] ?? characterStill(profile);
}

export function sourceForProfile(profile: CharacterProfile): string {
  const slug = wikiSlugs[profile.id] ?? profile.name.replaceAll(" ", "_");
  return `https://peaky-blinders.fandom.com/wiki/${slug}`;
}

export function readSavedIds(): string[] {
  try {
    const stored = window.localStorage.getItem(SAVED_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as string[]) : [];
  } catch {
    return [];
  }
}

export function writeSavedIds(ids: string[]): void {
  window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(ids));
}

export function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((current) => current !== id) : [...ids, id];
}

export function profileMatchesQuery(
  profile: CharacterProfile,
  normalizedQuery: string,
): boolean {
  if (!normalizedQuery) return true;

  return [
    profile.name,
    profile.role,
    profile.archetype,
    profile.signature,
    profile.evolution,
    ...profile.signals.flatMap((signal) => [
      signal.title,
      signal.observation,
      signal.function,
      signal.context,
    ]),
  ]
    .join(" ")
    .toLocaleLowerCase("es")
    .includes(normalizedQuery);
}
