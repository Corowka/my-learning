"use client";

import { base, Base, keys } from "@/core/docs/base";
import { Button, Input, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./search.module.css";
import { useState } from "react";
import { calcVector } from "@/core/search/calc-vertor";
import { DataItem } from "@/app/page";

interface SearchProps {
  setData: (data: DataItem[]) => void;
}

export const Search = ({ setData }: SearchProps) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const indexes = Array.from(
      { length: Math.trunc(base.chunkAmount) },
      (_, i) => i
    );

    const vector = calcVector(base.dictionary, base.totalDictionary, search);
    let arr: DataItem[] = [];
    for (let i = 0; i < base.chunkAmount; i++) {
      const words = [];
      for (let j = 0; j < keys.length; j++) {
        if (vector[j] && base.vectors[i][j]) {
          words.push(keys[j]);
        }
      }
      const score = Math.sqrt(
        vector
          .map((v, j) => Math.pow(v + base.vectors[i][j], 2))
          .reduce((s, n) => s + n, 0)
      );
      arr.push({ score, words, index: indexes[i] });
    }
    arr = arr.sort((a, b) => b!.score! - a!.score!);

    setData(arr);
  };

  return (
    <div className={styles.container}>
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Tooltip title="search">
        <Button
          shape="circle"
          icon={<SearchOutlined />}
          onClick={handleSearch}
        />
      </Tooltip>
    </div>
  );
};
