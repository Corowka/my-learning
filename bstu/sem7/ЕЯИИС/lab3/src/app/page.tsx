"use client";

import styles from "./page.module.css";
import { Button, Input, Typography, Tag } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { useState } from "react";

const { TextArea } = Input;
const { Title } = Typography;

export default function Home() {
  const [text, setText] = useState("");
  const [data, setData] = useState<{
    words: { word: string; pos: string }[];
    translation: string;
  }>({ words: [], translation: "" });
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);
      setData({ words: [], translation: "" });
      const resTranslation = await fetch(
        "http://127.0.0.1:8000/text/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
      const dataTranslation: { translation: string } =
        await resTranslation.json();
      const resPos = await fetch("http://127.0.0.1:8000/text/pos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: dataTranslation.translation }),
      });
      const dataPos: { words: { word: string; pos: string }[] } =
        await resPos.json();
      console.log({
        words: dataPos.words,
        translation: dataTranslation.translation,
      });
      setData({
        words: dataPos.words,
        translation: dataTranslation.translation,
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.wrap}>
          <div className={styles.box}>
            <Title className={styles.title} level={3} color="#221671">
              En
            </Title>
          </div>
          <TextArea
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ padding: 36, fontSize: 20, resize: "none" }}
            className={styles.textarea}
            rows={4}
            placeholder=""
          />
        </div>
        <Button
          loading={loading}
          size="large"
          style={{ margin: "36px 0 -22px" }}
          onClick={handleTranslate}
        >
          <TranslationOutlined />
          Translate
        </Button>
        <div className={styles.wrap}>
          <div className={styles.box}>
            <Title className={styles.title} level={3} color="#221671">
              Ru
            </Title>
          </div>
          <div className={styles.output}>
            {data.words.map((p, i) => (
              <span key={i} className={styles.wordWrap}>
                <span key={i} className={styles.word}>
                  {p.word}
                </span>
                <Tag bordered={false} color="blue">
                  {p.pos}
                </Tag>
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
