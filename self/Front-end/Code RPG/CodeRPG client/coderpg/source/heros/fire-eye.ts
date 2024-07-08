import FireEyeImage from "@/public/cards/FireEye.jpg";
import { Hero } from "../hero/hero";

export const FireEye = new Hero({
  picture: FireEyeImage,
  name: "Fire Eye",
  race: "human",
  rarity: "rare",
  stats: {
    attackSpeed: 16,
    physicalDamage: 179,
    magicDamage: 790,
    armor: 0,
    magicResist: 303,
    health: 88,
    evasion: 115
  },
  tags: "1boy, beard, closed mouth, facial hair, fire, glowing, glowing eyes, hood, hood up, looking at viewer, male focus, old, old man, solo, upper body, white hair, yellow eyes",
});
