import { useRef, useState } from "react";
import { Button, Switch, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

import styles from "./upload-doc.module.css";

interface UploadDocProps {
  setDoc: (doc: string) => void;
  setIsAi: (isAi: boolean) => void;
  isAi: boolean;
}

export const UploadDoc = ({ setDoc, setIsAi, isAi }: UploadDocProps) => {
  const [file, setFile] = useState<File | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      const selectedFile = fileList[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setDoc(e.target.result as string);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className={styles.container}>
      <input
        max={1}
        ref={ref}
        type="file"
        accept=".txt"
        className={styles.input}
        onChange={handleUpload}
      />
      <Text style={{ fontSize: 18 }}>{file?.name || "Файл не выбран"}</Text>
      <div className={styles.box}>
        <Text>Use AI</Text>
        <Switch
          style={{ marginRight: 32 }}
          value={isAi}
          onChange={(checked) => setIsAi(checked)}
        />
        <Button onClick={() => ref.current && ref.current.click()}>
          <UploadOutlined />
          Загрузите .txt для реферирования
        </Button>
      </div>
    </div>
  );
};
