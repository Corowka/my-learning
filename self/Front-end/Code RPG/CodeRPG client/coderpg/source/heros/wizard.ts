import WizardImage from "@/public/cards/Wizard.jpg";
import { Hero } from "../hero/hero";

export const Wizard = new Hero({
  picture: WizardImage,
  name: "Wizard",
  race: "elf",
  rarity: "improved",
  stats: {
    attackSpeed: 0,
    physicalDamage: 2,
    magicDamage: 568,
    armor: 8,
    magicResist: 442,
    health: 196,
    evasion: 49
  },
  tags: "",
});
