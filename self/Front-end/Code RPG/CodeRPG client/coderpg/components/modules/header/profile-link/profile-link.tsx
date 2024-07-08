import { useAuth } from "@/contexts/auth-context";
import styles from "./profile-link.module.css";
import { Link } from "@/components/UI/link/Link";
import { User } from "@/types";

interface ProfileLink {}

export const ProfileLink = ({}: ProfileLink) => {
  const { currentUser } = useAuth();
  const { uid } = currentUser as User;

  return (
    <Link href={"/users/" + uid}>
      <div className={styles.name}>profile</div>
    </Link>
  );
};
