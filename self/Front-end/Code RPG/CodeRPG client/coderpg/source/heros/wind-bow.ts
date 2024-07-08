import WindBowImage from "@/public/cards/WindBow.jpg";
import { Hero } from "../hero/hero";

export const WindBow = new Hero({
  picture: WindBowImage,
  name: "Wind Bow",
  race: "elf",
  rarity: "epic",
  stats: {
    attackSpeed: 542,
    physicalDamage: 74,
    magicDamage: 107,
    armor: 19,
    magicResist: 1,
    health: 503,
    evasion: 428,
  },
  tags: "1girl, armor, arrow (projectile), blonde hair, blue eyes, boots, bow (weapon), breasts, cleavage, elf, leaf, long hair, medium breasts, nature, pointy ears, solo, tree, weapon, sexy, belly",
});
