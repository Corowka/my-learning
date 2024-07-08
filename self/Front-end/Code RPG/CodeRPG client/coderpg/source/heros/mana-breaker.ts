import ManaBreakerImage from "@/public/cards/ManaBreaker.jpg";
import { Hero } from "../hero/hero";

export const ManaBreaker = new Hero({
  picture: ManaBreakerImage,
  name: "Mana Breaker",
  race: "human",
  rarity: "legendary",
  stats: {
    attackSpeed: 328,
    physicalDamage: 139,
    magicDamage: 0,
    armor: 161,
    magicResist: 513,
    health: 434,
    evasion: 99,
  },
  tags: "",
});
