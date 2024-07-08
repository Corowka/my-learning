import DoomQueenImage from "@/public/cards/DoomQueen.jpg";
import { Hero } from "../hero/hero";

export const DoomQueen = new Hero({
  picture: DoomQueenImage,
  name: "Doom Queen",
  race: "demon",
  rarity: "epic",
  stats: {
    attackSpeed: 90,
    physicalDamage: 86,
    magicDamage: 320,
    armor: 203,
    magicResist: 160,
    health: 200,
    evasion: 50,
  },
  tags: "",
});
