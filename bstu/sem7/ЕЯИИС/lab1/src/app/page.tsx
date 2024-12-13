"use client";
import { useLayoutEffect, useState } from "react";
import { Search } from "@/components/search/search";
import styles from "./page.module.css";
import { base } from "@/core/docs/base";
import { DocsList } from "@/components/docs-list/docs-list";

export type DataItem = { score?: number; index: number; words?: string[] };

export default function Home() {
  const [data, setData] = useState<DataItem[]>(() =>
    Array.from({ length: Math.trunc(base.chunkAmount) }, (_, i) => ({
      index: i,
    }))
  );

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.scrollWrap}>
          <DocsList data={data} />
        </div>
        <Search setData={setData} />
      </div>
    </main>
  );
}
