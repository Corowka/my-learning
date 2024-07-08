import { Hero } from "@/types";
import styles from "./card-change-side.module.css";
import { CardRarityColor } from "@/source/heros";
import CardBackSideImage from "@/public/cards-extra/card-backside.jpg"

interface CardChangeSideProps {
  card: Hero;
  isBackSide: boolean;
  setIsBackSide: (isBackSide: boolean) => void;
}

export const CardChangeSide = ({
  card,
  isBackSide,
  setIsBackSide,
}: CardChangeSideProps) => {
  const getCardFrontSideRotation = () => {
    if (isBackSide) {
      return { transform: "rotateY(-180deg)", zIndex: 1 };
    }
    return { transform: "rotateY(0)", zIndex: 2 };
  };

  const getCardBackSideRotation = () => {
    if (isBackSide) {
      return { transform: "rotateY(0deg)", zIndex: 1 };
    }
    return { transform: "rotateY(180deg)", zIndex: -1 };
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <div
          onClick={() => setIsBackSide(!isBackSide)}
          className={styles.cardFront}
          style={{
            backgroundImage: `url(${card.picture.src})`,
            boxShadow: `0 0 5px 1px ${CardRarityColor[card.rarity]}`,
            ...getCardFrontSideRotation(),
          }}
        />
        <div
          onClick={() => setIsBackSide(!isBackSide)}
          className={styles.cardBack}
          style={{
            backgroundImage: `url(${CardBackSideImage.src})`,
            boxShadow: `0 0 5px 1px #000`,
            ...getCardBackSideRotation(),
          }}
        />
      </div>
    </div>
  );
};
