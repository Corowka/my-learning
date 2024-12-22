import { Chat } from "@/lib/services/chats-service"
import styles from "./chats-list.module.css"

interface ChatsListProps {
  chats: Chat[]
}

export const ChatsList = ({ chats }: ChatsListProps) => {
  return <div className={styles.container}></div>
}
