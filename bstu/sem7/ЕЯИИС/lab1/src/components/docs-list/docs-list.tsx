"use client";

import { base } from "@/core/docs/base";
import styles from "./docs-list.module.css";
import { DocsItem } from "../docs-item/docs-item";
import { DataItem } from "@/app/page";

interface DocsListProps {
  data: DataItem[];
}

export const DocsList = ({ data }: DocsListProps) => {
  return (
    <div className={styles.container}>
      {data
        .slice(0, 8)
        .map((ch, i) => (
          <DocsItem
            key={i}
            chunk={base.chunks[data[i].index]}
            score={data[i].score || 0}
            words={data[i].words || []}
          />
        ))}
    </div>
  );
};
