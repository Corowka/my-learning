import styles from "./header.module.css";
import { ProfileLink } from "./profile-link/profile-link";

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
  return (
    <header className={styles.content}>
      <div className={styles.side} />
      <div className={styles.side}>Coderpg</div>
      <div className={styles.side}>
        <ProfileLink />
      </div>
    </header>
  );
};
