import { useEffect, useState, useRef } from "react"
import styles from "./file-loader.module.css"
import { Plan } from "@/utils/types"
import { Alert } from "../UI/alert/alert"
import { preparePlanFile } from "@/utils/preparePlanFile"

interface FileLoaderProps {
  setFile: (file: Plan | null) => void
}

export const FileLoader = ({ setFile }: FileLoaderProps) => {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateFileAndRead = (files: File[]) => {
    try {
      if (files.length > 1) {
        throw new Error("Загружен не один файл. Пожалуйста, выберите единственный файл");
      }
      if (!files[0]?.name) {
        throw new Error("Загруженный объект не является файлом. Пожалуйста, выберите файл");
      }
      const filenameSplit = files[0].name.split('.');
      const fileExt = filenameSplit[filenameSplit.length - 1];
      if (fileExt !== "plan") {
        throw new Error("Загруженный файл имеет расширение отличное от .plan");
      }
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        const plan: Plan | null = preparePlanFile(fileContent);
        if (!plan) {
          throw new Error("Ошибка при загрузке файла");
        }
        setFile(plan);
        sessionStorage.setItem("ddcompanyplan", JSON.stringify(plan));
      };
      reader.readAsText(files[0])
    } catch (err: any) {
      setError(err.message);
      setDrag(false);
      console.error(err.message);
      return;
    }
  }

  const selectFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: File[] = Array.from(e.target.files || []);
    validateFileAndRead(files);
  }

  useEffect(() => {
    const plan: string | null = sessionStorage.getItem("ddcompanyplan");
    if (plan) {
      setFile(JSON.parse(plan));
    }
  }, [])

  const dragStart = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(true);
  }

  const dragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
  }

  const dragDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = [...e.dataTransfer.files];
    validateFileAndRead(files);
  }

  return (
    <>
      {error && <Alert variant="danger" setError={setError} error={error} />}
      <div className={styles.fileSection}>
        <div className={styles.dragArea}
          onDragStart={e => dragStart(e)}
          onDragLeave={e => dragLeave(e)}
          onDragOver={e => dragStart(e)}
          onDrop={e => dragDrop(e)}
        >{!drag
          ? <div className={styles.dragContent}>
            <h1>ПЕРЕТАЩИТЕ СЮДА</h1>
            <p>или</p>
            <button className={styles.fileInputBtn} onClick={() => inputRef.current && inputRef.current.click()}>Загрузить файл</button>
            <input ref={inputRef} className={styles.fileInput} type="file" onChange={e => selectFileHandler(e)} />
          </div>
          : <div>
            <h1>ОТПУСТИТЕ ФАЙЛ</h1>
          </div>
          }</div>
      </div >
    </>
  )
} 