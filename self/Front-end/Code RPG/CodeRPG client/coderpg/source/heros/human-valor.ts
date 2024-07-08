import HumanValorImage from "@/public/cards/HumanValor.jpg";
import { Hero } from "../hero/hero";

export const HumanValor = new Hero({
  picture: HumanValorImage,
  name: "Human Valor",
  race: "human",
  rarity: "improved",
  stats: {
    attackSpeed: 65,
    physicalDamage: 303,
    magicDamage: 0,
    armor: 404,
    magicResist: 2,
    health: 488,
    evasion: 4
  },
  tags: "",
});
