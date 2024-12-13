"use client";

import { DataItem } from "@/core/refereeing";
import styles from "./doc-view.module.css";
import { Tag } from "antd";

interface DocViewProps {
  data: DataItem[];
}

export const DocView = ({ data }: DocViewProps) => {
  return (
    <div className={styles.container}>
      {data.map((d, i) => (
        <span key={i}>
          <span className={styles.sentence}>{d.sentence}</span>
          {d.score && (
            <Tag className={styles.tag} color="gold">
              {Math.round(d.score * 100) / 100}
            </Tag>
          )}
          {d.posd && <Tag color="blue">{Math.round(d.posd * 100) / 100}</Tag>}
        </span>
      ))}
    </div>
  );
};
