import styles from "./search-input.module.css";
import SearchSVG from "@/public/search.svg";

interface SearchInputProps {
  value: string;
  setValue: (value: string) => void;
  style?: {};
}

export const SearchInput = ({ value, setValue, style }: SearchInputProps) => {
  return (
    <div className={styles.inputWrap} style={style}>
      <label className={styles.label}>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
        <img src={SearchSVG.src} alt="search" className={styles.icon} />
      </label>
    </div>
  );
};
