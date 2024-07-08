import { Button } from "@/components/UI/button/button";
import styles from "./level-widget.module.css";

interface LevelWidgetProps {
  level: number;
  experienceNow: number;
  experienceForNextLevel: number;
  style?: object;
}

export const LevelWidget = ({
  level,
  experienceNow,
  experienceForNextLevel,
  style = {},
}: LevelWidgetProps) => {
  experienceNow = Math.min(experienceForNextLevel, experienceNow);
  const pixels = (experienceNow / experienceForNextLevel) * 722;

  return (
    <>
      <div className={styles.content} style={style}>
        <div className={styles.light}>
          <span className={styles.levelText}>{level}</span>
          <span className={styles.expText}>
            {experienceNow + " / " + experienceForNextLevel}
          </span>
          <svg width="300" height="300" viewBox="-31.25 -31.25 312.5 312.5">
            <circle
              r="115"
              cx="125"
              cy="125"
              fill="transparent"
              stroke="#323232"
              stroke-width="20"
              stroke-dasharray="722.2px"
              stroke-dashoffset="0"
            ></circle>
            <circle
              r="115"
              cx="125"
              cy="125"
              stroke="#fafafa"
              stroke-width="18"
              stroke-dashoffset={pixels + "px"}
              fill="transparent"
              stroke-dasharray="722.2px"
              style={{ transform: "rotate(-90deg) translate(-250.6px, 0px)" }}
            ></circle>
          </svg>
        </div>
      </div>

      <div className={styles.rewardBtnWrap}>
        <Button
          title="Получить награду"
          onClick={() => {}}
          style={{ width: "100%" }}
        />
      </div>
    </>
  );
};
