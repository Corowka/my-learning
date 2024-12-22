"use client"

import { Content } from "@/UI/content/content"
import styles from "./chats.module.css"
import { ChatsToolbar } from "./chats-toolbar/chats-toolbar"
import { Chat } from "@/lib/services/chats-service"
import { useState } from "react"
import { ChatsList } from "./chats-list/chats-list"

export const Chats = () => {
  const [chats, setChats] = useState<Chat[] | []>([])

  return (
    <Content className={styles.container}>
      <ChatsToolbar setChats={setChats} />
      <ChatsList chats={chats} />
    </Content>
  )
}
