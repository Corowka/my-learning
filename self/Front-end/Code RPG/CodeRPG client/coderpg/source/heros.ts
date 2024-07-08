import { Hero } from "./hero/hero";

import { Light } from "@/source/heros/light";
import { ManaBreaker } from "@/source/heros/mana-breaker";
import { DoomQueen } from "@/source/heros/doom-queen";
import { ShadowKiller } from "@/source/heros/shadow-killer";
import { StarFighter } from "@/source/heros/star-fighter";
import { Wizard } from "@/source/heros/wizard";
import { HumanValor } from "@/source/heros/human-valor";
import { Snowstorm } from "@/source/heros/snowstorm";
import { Darkness } from "@/source/heros/darkness";
import { Bloodshed } from "@/source/heros/bloodshed";
import { FireEye } from "@/source/heros/fire-eye";
import { Bless } from "./heros/bless";
import { RoyalTwilight } from "./heros/royal-twilight";
import { InspirationSource } from "./heros/inspiration-source";
import { DemonHeart } from "./heros/demon-heart";
import { HalfBreedCommander } from "./heros/half-breed-commander";
import { BruteForce } from "./heros/brute-force";
import { DuskWood } from "./heros/dusk-wood";
import { Enlightened } from "./heros/enlightened";
import { ScorchedPaths } from "./heros/scorched-paths";
import { MidnightStalker } from "./heros/midnight-stalker";
import { Rarity } from "./hero/hero-types";
import { Sanctity } from "./heros/sanctity";
import { NatureLove } from "./heros/nature-love";
import { WindBow } from "./heros/wind-bow";
import { Bloodlust } from "./heros/bloodlust";
import { PurpleScull } from "./heros/purple-skull";
import { Poison } from "./heros/poison";
import { TwilightAssassin } from "./heros/twilight-assassin";
import { EmeraldEvil } from "./heros/emerald-evil";

export const CARDS: Hero[] = [
  Light,
  ManaBreaker,
  DoomQueen,
  ShadowKiller,
  StarFighter,
  Wizard,
  HumanValor,
  Snowstorm,
  Darkness,
  Bloodshed,
  FireEye,
  Bless,
  RoyalTwilight,
  InspirationSource,
  DemonHeart,
  HalfBreedCommander,
  BruteForce,
  DuskWood,
  Enlightened,
  ScorchedPaths,
  MidnightStalker,
  Sanctity,
  NatureLove,
  WindBow,
  Bloodlust,
  PurpleScull,
  Poison,
  TwilightAssassin,
  EmeraldEvil,
];

export const CARDS_BY_RARITY_INDEXES = CARDS.reduce(
  (cardList, card, index) => {
    cardList[card.rarity as Rarity].push(index);
    return cardList;
  },
  {
    common: [] as number[],
    improved: [] as number[],
    rare: [] as number[],
    epic: [] as number[],
    legendary: [] as number[],
    wild: [] as number[],
    mad: [] as number[],
  }
);
