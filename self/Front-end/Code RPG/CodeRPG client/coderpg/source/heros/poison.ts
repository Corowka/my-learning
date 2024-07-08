import PoisonImage from "@/public/cards/Poison.jpg";
import { Hero } from "../hero/hero";

export const Poison = new Hero({
  picture: PoisonImage,
  name: "Poison",
  race: "halfBreed",
  rarity: "common",
  stats: {
    attackSpeed: 179,
    physicalDamage: 33,
    magicDamage: 390,
    armor: 15,
    magicResist: 146,
    health: 234,
    evasion: 4,
  },
  tags: "1girl, bare shoulders, belt, blindfold, breasts, colored skin, facing viewer, green skin, horns, long hair, magic, navel, pants, pointy ears, sarashi, solo, tattoo, white hair",
});
