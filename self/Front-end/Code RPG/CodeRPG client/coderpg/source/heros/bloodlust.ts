import BloodlustImage from "@/public/cards/Bloodlust.jpg";
import { Hero } from "../hero/hero";

export const Bloodlust = new Hero({
  picture: BloodlustImage,
  name: "Bloodlust",
  race: "human",
  rarity: "common",
  stats: {
    attackSpeed: 378,
    physicalDamage: 354,
    magicDamage: 6,
    armor: 71,
    magicResist: 68,
    health: 114,
    evasion: 10,
  },
  tags: "1girl, armor, bare shoulders, colored skin, glowing, glowing eyes, hair ornament, holding, holding weapon, horns, long hair, looking at viewer, mask, pink eyes, smile, solo, sword, teeth, weapon, white hair",
});
