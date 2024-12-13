"use client";

import styles from "./page.module.css";
import { Button, Input, Typography, Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const { Title } = Typography;

export default function Home() {
  const [availableVoices, setAvailableVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  const [text, setText] = useState("");
  const [voice, setVoice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setAvailableVoices(availableVoices);
      if (availableVoices.length > 0) {
        setVoice(0);
      }
    };

    window.speechSynthesis.onvoiceschanged = getVoices;
    getVoices();
  }, []);

  const handleVoice = () => {
    try {
      setIsLoading(true);
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = availableVoices[voice];
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <Title style={{ color: "#fff", fontSize: 200, marginBottom: 32 }}>
          Voice It
        </Title>
        <Input
          style={{ textAlign: "center", marginBottom: 24, fontSize: 32 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div style={{ display: "flex", gap: 16 }}>
          {availableVoices.length > 0 && (
            <Select
              style={{ width: "300px" }}
              size="large"
              value={voice}
              onChange={(e) => {
                setVoice(e);
              }}
            >
              {availableVoices.map((v, i) => (
                <Option key={i} value={i}>
                  {v.name}
                </Option>
              ))}
            </Select>
          )}
          <Button
            loading={isLoading}
            style={{ marginBottom: 64 }}
            size="large"
            onClick={handleVoice}
          >
            Play Voice
          </Button>
        </div>
      </div>
    </main>
  );
}
