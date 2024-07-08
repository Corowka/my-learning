import Image, { StaticImageData } from "next/image";
import styles from "./collapse.module.css";
import { useState } from "react";

interface CollapseProps {
  header: React.ReactNode;
  content: React.ReactNode;
  buttonIcon: StaticImageData;
}

export const Collapse = ({ header, content, buttonIcon }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.collapse}>
      <div className={styles.header}>
        {header}
        <button>
          <Image src={buttonIcon} width={30} height={30} alt="open/close" />
        </button>
      </div>
      <div className={styles.content}>{isOpen && content}</div>
    </div>
  );
};
