import { StaticImageData } from "next/image";
import {
  Stats,
  Race,
  Rarity,
  RACE_LIST,
  RARITY_LIST,
  STATS_LIST,
} from "./hero-types";

interface HeroProps {
  picture: StaticImageData;
  name: string;
  race: Race;
  rarity: Rarity;
  stats: Stats;
  tags: string;
}

export class Hero {
  public readonly picture: StaticImageData;
  public readonly name: string;
  public readonly race: string;
  public readonly rarity: string;
  public readonly stats: Stats;
  public readonly tags: string;
  [key: string]: any;

  constructor({ picture, name, race, rarity, stats, tags }: HeroProps) {
    this.picture = picture;
    this.name = name;
    this.race = race;
    this.rarity = rarity;
    this.stats = stats;
    this.tags = tags;
  }

  getOrderedStats() {
    return [
      { value: this.stats.attackSpeed, name: "Attack Speed" },
      { value: this.stats.physicalDamage, name: "Physical Damage" },
      { value: this.stats.magicDamage, name: "Magic Damage" },
      { value: this.stats.health, name: "Health" },
      { value: this.stats.armor, name: "Armor" },
      { value: this.stats.magicResist, name: "Magic Resist" },
      { value: this.stats.evasion, name: "Evasion" },
    ];
  }
}

export const getCardRarityColor = (rarity: string) => {
  const colors: { [key: string]: string } = {
    common: "#66a4ac",
    improved: "#0071ff",
    rare: "#db8a00",
    epic: "#8200c3",
    legendary: "#ffed00",
    wild: "#ff0000",
    mad: "#1cff00",
  };
  return rarity in colors ? colors[rarity] : "";
};

export const getRarityNumber = (rarity: Rarity) => {
  return RARITY_LIST.indexOf(rarity);
};

export const getRarityByNumber = (rarityNumber: number) => {
  return RARITY_LIST[rarityNumber];
};

export const getRaceNumber = (race: Race) => {
  return RACE_LIST.indexOf(race);
};

export const getRaceByNumber = (raceNumber: number) => {
  return RACE_LIST[raceNumber];
};

export const getStatNumber = (stat: string) => {
  return STATS_LIST.indexOf(stat);
};

export const getStatByNumber = (statNumber: number) => {
  return STATS_LIST[statNumber];
};

export const getRaceName = (race: Race) => {
  const raceNames = {
    human: "Human",
    elf: "Elf",
    demon: "Demon",
    titan: "Titan",
    halfBreed: "Half Breed",
    nightElf: "Night Elf",
    bloodElf: "Blood Elf",
    angel: "Angel",
  };
  return raceNames[race];
};
