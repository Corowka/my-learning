import { Chat } from "@/lib/services/chats-service"
import { IconButton } from "@/UI/icon-button/icon-button"
import { PlusOutlined, SearchOutlined } from "@ant-design/icons"

import styles from "./chats-toolbar.module.css"
import { useState } from "react"
import { CreateChatModal } from "./create-chat-modal/create-chat-modal"

interface ChatsToolbarProps {
  setChats: (chats: Chat[]) => void
}

export const ChatsToolbar = ({ setChats }: ChatsToolbarProps) => {
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false)

  return (
    <div className={styles.container}>
      <IconButton
        size="medium"
        icon={SearchOutlined}
        onClick={() => {}}
      />
      <IconButton
        size="medium"
        icon={PlusOutlined}
        onClick={() => setIsCreateChatModalOpen(true)}
      />
      {isCreateChatModalOpen && (
        <CreateChatModal
          isOpen={isCreateChatModalOpen}
          setClose={() => setIsCreateChatModalOpen(false)}
        />
      )}
    </div>
  )
}
