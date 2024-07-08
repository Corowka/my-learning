import { Hero, getCardRarityColor } from "@/source/hero/hero";
import styles from "./card-overview.module.css";
import Image from "next/image";
import useWindowDimensions from "@/hooks/useWindowSize";
import useMousePos from "@/hooks/useMousePos";
import { useEffect, useMemo, useState } from "react";
import { getRaceName } from "@/source/hero/hero";
import { Race } from "@/source/hero/hero-types";

interface CardOverviewProps {
  card: Hero;
  isShow: boolean;
  setClose: () => void;
}

interface Rotation {
  angleX: number;
  angleY: number;
  lightPosX: number;
  lightPosY: number;
  bgLightPosX: number;
  bgLightPosY: number;
}

export const CardOverview = ({ card, isShow, setClose }: CardOverviewProps) => {
  const color = useMemo(() => getCardRarityColor(card.rarity), []);
  const { width, height } = useWindowDimensions();
  const { x, y } = useMousePos();
  const a = Math.random();

  const [rotation, setRotation] = useState<Rotation>({
    angleX: 0,
    angleY: 0,
    lightPosX: 0,
    lightPosY: 0,
    bgLightPosX: 0,
    bgLightPosY: 0,
  });

  useEffect(() => {
    setRotation({
      angleX: -(-15 + Math.round((y / height) * 30)),
      angleY: Math.round(
        (-15 + Math.round((x / width) * 30)) * (width / height)
      ),
      lightPosX: Math.round((x / width) * 100),
      lightPosY: Math.round((y / height) * 100),
      bgLightPosX: 100 - Math.round((x / width) * 100),
      bgLightPosY: 100 - Math.round((y / height) * 100),
    });
  }, [x, y, width, height]);

  return (
    <div className={styles.background} onClick={setClose}>
      <button className={styles.close} onClick={setClose}>
        <Image src="./close-light.svg" width={40} height={40} alt="close" />
      </button>
      <div className={styles.leftWrap}>
        <div
          className={styles.name}
          style={{
            borderBottom: `3px solid ${color}`,
            boxShadow: `0 0 100px 20px ${color + "66"}`,
          }}
        >
          {card.name}
        </div>
        {/* <div
          className={styles.race}
          style={{
            borderBottom: `3px solid ${color}`,
            boxShadow: `0 0 20px 20px ${color + "66"}`,
          }}
        >
          {getRaceName(card.race as Race)}
        </div> */}
      </div>
      <div
        className={styles.backgroundLight}
        style={{
          background: `linear-gradient(90deg, 
            ${color + "00"}, 
            ${color + "aa"},
            ${color + "00"}`,
        }}
      />
      <div
        className={styles.cardWrap}
        style={{
          transform: `rotateX(${rotation.angleX}deg) rotateY(${rotation.angleY}deg) translateZ(-3px)`,
          background: `radial-gradient(
            ${color + "22"}, 
            ${color})`,
          backgroundSize: "200% 200%",
          backgroundPosition: `${rotation.bgLightPosX}% 
            ${rotation.bgLightPosY}%`,
        }}
      />
      <div
        className={styles.card}
        style={{
          backgroundImage: `url(${card.picture.src})`,
          transform: `rotateX(${rotation.angleX}deg) rotateY(${rotation.angleY}deg)`,
        }}
      >
        <div
          className={styles.light}
          style={{
            backgroundPosition: `${rotation.lightPosX}% ${rotation.lightPosY}%`,
          }}
        >
          {card.getOrderedStats().map((item) => (
            <div key={item.name} className={styles.statItem}>
              {item.name + ": " + item.value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
