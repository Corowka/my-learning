"use client";

import { UploadDoc } from "@/conmonents/upload-doc/upload-doc";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { DocView } from "@/conmonents/doc-view/doc-view";
import { DataItem, refereeing } from "@/core/refereeing";

export default function Home() {
  const [doc, setDoc] = useState("");
  const [isAi, setIsAi] = useState(false);
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    (async () => {
      setData([]);
      if (isAi) {
        const res = await fetch("http://127.0.0.1:8000/text/abstract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: doc }),
        });
        const dataAbstract: { abstract: string } = await res.json();
        setData([{ sentence: dataAbstract.abstract }]);
      } else {
        setData(refereeing(doc));
      }
    })();
  }, [doc]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <UploadDoc setIsAi={setIsAi} isAi={isAi} setDoc={setDoc} />
        {doc && (
          <div className={styles.scrollWrap}>
            <DocView data={data} />
          </div>
        )}
      </div>
    </main>
  );
}
