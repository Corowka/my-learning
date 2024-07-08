import StarFighterImage from "@/public/cards/StarFighter.jpg";
import { Hero } from "../hero/hero";

export const StarFighter = new Hero({
  picture: StarFighterImage,
  name: "Star Fighter",
  race: "titan",
  rarity: "mad",
  stats: {
    attackSpeed: 35,
    physicalDamage: 317,
    magicDamage: 184,
    armor: 259,
    magicResist: 317,
    health: 782,
    evasion: 87
  },
  tags: "",
});
