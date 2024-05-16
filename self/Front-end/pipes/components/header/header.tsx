import React, { ReactNode, useState } from 'react';
import styles from "./header.module.css"
import Image from 'next/image';
import { Plan } from "@/utils/types";

interface LayoutProps {
  file: null | Plan
  isShow: boolean
  setIsShow: (isShow: boolean) => void
}

export const Header = ({ isShow, setIsShow, file }: LayoutProps) => {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <a draggable={false} target="_blank" href="https://ddcompany.by/" style={{ textDecoration: "none" }}>
            <Image draggable={false} src={require("../../public/logo-white.png")} width={178} height={46} alt="ddcompany" />
          </a>
        </div>
        <div style={!file ? { marginLeft: 260 } : {}} className={styles.manualButton}>
          <button onClick={() => setIsShow(!isShow)} className={styles.questionButton}>
            <Image width={40} height={40} src={"/question.svg"} alt="question" />
          </button>
        </div>
      </header>
    </div>
  );
};
