import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "./index.module.css"
import { useEffect, useState } from "react";
import { FileLoader } from "@/components/file-loader/file-loader";
import { Plan } from "@/utils/types";
import { Canvas } from "@/components/canvas/canvas";
import { ManualModal } from "@/components/manual-modal/manual-modal";
import { Header } from "../components/header/header"
import { isMobile } from "@/utils/is-mobile";

const inter = Inter({ subsets: ["latin"] });

const Content = () => {
  const [selectedFile, setSelectedFile] = useState<Plan | null>(null);
  const [stage, setStage] = useState(0);
  const [isManualModalShow, setIsManualModalShow] = useState(true);

  useEffect(() => {
    if (selectedFile) {
      setStage(1);
      setIsManualModalShow(true);
    }
  }, [selectedFile])

  const cameBackToFileLoader = () => {
    setStage(0);
    setSelectedFile(null);
    sessionStorage.removeItem("ddcompanyplan");
  }

  return (
    <>
      <Head>
        <title>Pipes</title>
        <meta name="description" content="Pipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Header file={selectedFile} isShow={isManualModalShow} setIsShow={setIsManualModalShow} />
      <div className={styles.content}>
        {isMobile()
          ? <div className={styles.mobileError}>Сайт недоступен для мобильных устройств</div>
          : selectedFile
            ? <div className={styles.planContainer}>
              <Canvas file={selectedFile} setFile={setSelectedFile} comebackHandler={cameBackToFileLoader} />
            </div>
            : <FileLoader setFile={setSelectedFile} />}
      </div >
      {isManualModalShow && <ManualModal setShow={setIsManualModalShow} stage={stage} />
      }
    </>
  );
}

export default Content;
