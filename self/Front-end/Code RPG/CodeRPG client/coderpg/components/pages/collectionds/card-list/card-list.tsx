import styles from "./card-list.module.css";
import { CardPreview } from "@/components/modules/card-preview/card-preview";
import { Hero } from "@/source/hero/hero";
import { useState } from "react";
import { Search } from "./search/search";

interface CardListProps {
  cards: Hero[];
  setCardOverviewShowItem: (cardOverviewShowItem: Hero | null) => void;
}

export const CardList = ({ cards, setCardOverviewShowItem }: CardListProps) => {
  const [cardsList, setCardsList] = useState(cards);

  return (
    <>
      <Search cards={cardsList} setCards={setCardsList} />
      <div className={styles.list}>
        <div className={styles.content}>
          {cardsList.map((card) => (
            <div className={styles.cardWrap} key={card.name}>
              <CardPreview
                card={card}
                onClick={() => setCardOverviewShowItem(card)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
