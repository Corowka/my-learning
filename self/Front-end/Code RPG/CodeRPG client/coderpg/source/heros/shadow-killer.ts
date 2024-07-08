import ShadowKillerImage from "@/public/cards/ShadowKiller.jpg";
import { Hero } from "../hero/hero";

export const ShadowKiller = new Hero({
  picture: ShadowKillerImage,
  name: "Shadow Killer",
  race: "human",
  rarity: "rare",
  stats: {
    attackSpeed: 181,
    physicalDamage: 407,
    magicDamage: 0,
    armor: 369,
    magicResist: 8,
    health: 369,
    evasion: 156
  },
  tags: "",
});
