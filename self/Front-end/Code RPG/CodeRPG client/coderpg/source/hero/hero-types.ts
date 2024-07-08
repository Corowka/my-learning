export type Race =
  | "human"
  | "elf"
  | "demon"
  | "titan"
  | "halfBreed"
  | "nightElf"
  | "bloodElf"
  | "angel";

export const RACE_LIST: readonly Race[] = [
  "human",
  "elf",
  "demon",
  "titan",
  "halfBreed",
  "nightElf",
  "bloodElf",
  "angel",
];

export type Rarity =
  | "common"
  | "improved"
  | "rare"
  | "epic"
  | "legendary"
  | "wild"
  | "mad";

export const RARITY_LIST: readonly Rarity[] = [
  "common",
  "improved",
  "rare",
  "epic",
  "legendary",
  "wild",
  "mad",
];

export type Stats = {
  attackSpeed: number;
  physicalDamage: number;
  magicDamage: number;
  armor: number;
  magicResist: number;
  health: number;
  evasion: number;
  [key: string]: any;
};

export const STATS_LIST: readonly string[] = [
  "attackSpeed",
  "physicalDamage",
  "magicDamage",
  "magicResist",
  "armor",
  "health",
  "evasion",
];
