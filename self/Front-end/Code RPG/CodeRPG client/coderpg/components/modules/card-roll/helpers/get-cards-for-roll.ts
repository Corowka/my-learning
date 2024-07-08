import { Hero } from "@/source/hero/hero";
import { RARITY_LIST } from "@/source/hero/hero-types";
import { CARDS, CARDS_BY_RARITY_INDEXES } from "@/source/heros";
import { RARITY_IN_ROLL } from "@/source/roll";
import { getRandInt } from "@/utils/math/randint";

export const getCardsForRoll = (): number[] => {
  const rollCardList: number[] = [];
  for (let i = 0; i < RARITY_IN_ROLL.length; i++) {
    const amount = RARITY_IN_ROLL[i];
    const rarity = RARITY_LIST[i];
    for (let j = 0; j < amount; j++) {
      const random = getRandInt(0, CARDS_BY_RARITY_INDEXES[rarity].length - 1);
      const cardIndex = CARDS_BY_RARITY_INDEXES[rarity][random];
      rollCardList.push(cardIndex);
    }
  }

  return rollCardList.sort((a, b) => Math.random() - 0.5);
};
