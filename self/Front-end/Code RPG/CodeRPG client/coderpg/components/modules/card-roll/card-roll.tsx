import styles from "./card-roll.module.css";
import Image from "next/image";
import { CARDS } from "@/source/heros";
import { useEffect, useRef, useState } from "react";
import { Hero, getCardRarityColor } from "@/source/hero/hero";
import useWindowDimensions from "@/hooks/useWindowSize";
import { getCardsForRoll } from "./helpers/get-cards-for-roll";

interface CardRollProps {
  setClose: () => void;
}

export const CardRoll = ({ setClose }: CardRollProps) => {
  const { width, height } = useWindowDimensions();
  const [cardIndexList, setCardIndexList] = useState<number[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rollStyle, setRollStyle] = useState({
    marginLeft: 0,
    transition: "all 0ms cubic-bezier(0.450, 1.170, 0.505, 0.940)",
  });

  useEffect(() => {
    const cardIndexes = getCardsForRoll();
    setCardIndexList(cardIndexes);
  }, []);

  const handleStart = () => {
    setIsSpinning(true);
    const n = (0.25 + Math.random() / 2) * cardIndexList.length;
    const index = cardIndexList[Math.floor(n)];
    console.log(CARDS[index].name);
    const move = (-height / 100) * (28 + 3) * n + width / 2 - height / 100;
    setRollStyle({
      marginLeft: move,
      transition: "all 5000ms cubic-bezier(0.450, 1.170, 0.505, 0.940)",
    });
    setTimeout(() => {
      setIsSpinning(false);
      setRollStyle({
        marginLeft: 0,
        transition: "all 0ms cubic-bezier(0.450, 1.170, 0.505, 0.940)",
      });
      const newCardIndexList = getCardsForRoll();
      setCardIndexList(newCardIndexList);
    }, 6000);
  };

  return (
    <div className={styles.background}>
      <button className={styles.close} onClick={setClose}>
        <Image src="./close-light.svg" width={40} height={40} alt="close" />
      </button>

      <div className={styles.pointer} />
      <div className={styles.rollWrap}>
        <div className={styles.line} style={rollStyle}>
          {cardIndexList.map((cardIndex, index) => (
            <div className={styles.item} key={index}>
              <div
                className={styles.card}
                style={{
                  backgroundImage: `url(${CARDS[cardIndex].picture.src})`,
                  boxShadow: `0 0 100vh 0.1vh ${getCardRarityColor(
                    CARDS[cardIndex].rarity
                  )}`,
                }}
              >
                {cardIndex}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isSpinning && (
        <button className={styles.button} onClick={handleStart}>
          Start
        </button>
      )}
    </div>
  );
};
