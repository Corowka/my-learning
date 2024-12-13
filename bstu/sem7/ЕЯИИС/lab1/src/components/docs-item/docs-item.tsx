"use client";

import { Tag } from "antd";
import styles from "./docs-item.module.css";

interface DocsItemProps {
  chunk: string;
  score: number;
  words: string[];
}

export const DocsItem = ({ chunk, score, words }: DocsItemProps) => {
  return (
    <div className={styles.container}>
      {chunk}
      {score > 1 && (
        <div className={styles.tagWrap}>
          <Tag color="gold">{Math.round(score * 1000) / 1000}</Tag>
          {words.slice(0, 8).map((w) => (
            <Tag color="blue">{w}</Tag>
          ))}
          {words.length > 8 && (
            <Tag color="magenta">{`и ещё ${words.length - 8}`}</Tag>
          )}
        </div>
      )}
    </div>
  );
};
