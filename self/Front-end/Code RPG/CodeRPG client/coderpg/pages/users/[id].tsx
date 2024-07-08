import styles from "./profile.module.css";
import { useRouter } from "next/router";

interface UserProfileProps {}

export default function UserProfile({}: UserProfileProps) {
  const router = useRouter();
  const { id } = router.query;

  return <h1>User {id}</h1>;
}
