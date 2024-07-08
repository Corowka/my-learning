import styles from "./card-preview.module.css";
import { Hero, getCardRarityColor } from "@/source/hero/hero";

interface CardPreviewProps {
  card: Hero;
  onClick: () => void;
}

export const CardPreview = ({ card, onClick }: CardPreviewProps) => {
  return (
    <div className={styles.wrap}>
      <div
        onClick={onClick}
        className={styles.card}
        style={{
          backgroundImage: `url(${card.picture.src})`,
          boxShadow: `0 0 10x 10px ${getCardRarityColor(card.rarity)}`,
          border: `2px solid ${getCardRarityColor(card.rarity)}`,
        }}
      >
        <div
          className={styles.cardLight}
        />
      </div>
    </div>
  );
};
