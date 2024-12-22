import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import generator from "generate-password"

import { Button } from "@/UI/button/button"
import { ImageInput } from "@/UI/image-input/image-input"
import { Input } from "@/UI/input/input"
import { Modal } from "@/UI/modal/modal"
import { Text } from "@/UI/text/text"
import { Title } from "@/UI/title/title"
import { zodResolver } from "@hookform/resolvers/zod"

import styles from "./create-chat-modal.module.css"
import { encode } from "@/lib/images/steganography/encode"

interface Inputs {
  type: string
  name: string
  users: string[]
}

const schema = z.object({
  type: z.string().nonempty("Type is required"),
  name: z
    .string()
    .max(30, { message: "Name is too long" })
    .nonempty({ message: "Name is required" }),
  users: z.array(z.string()).nonempty({ message: "New user is required" }),
})

interface CreateChatModalProps {
  isOpen: boolean
  setClose: () => void
}

const TypeOptions = [
  { name: "Local", value: "local" },
  { name: "Public", value: "public" },
]

export const CreateChatModal = ({ isOpen, setClose }: CreateChatModalProps) => {
  const [users, setUsers] = useState([])
  const [type, setType] = useState("local")
  const [name, setName] = useState("")

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onCreateChat: SubmitHandler<Inputs> = async (data) => {}

  return (
    <Modal
      isOpen={isOpen}
      setClose={setClose}
    >
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onCreateChat)}>
          <div className={styles.header}>
            <Title
              type="h1"
              text="Create new Chat"
              style={{ fontSize: 22 }}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.inputGroup}>
              <div>
                <Title
                  type="h1"
                  text="Name"
                  margin="0 0 12px 8px"
                  style={{ width: "fit-content" }}
                />
                <Controller
                  name="name"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter Chat Name"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <Text
                    margin="8px 0 0 8px"
                    type="error"
                    text={errors.name.message!}
                  />
                )}
              </div>
              <div>
                <Title
                  type="h1"
                  text="Image to create Key"
                  margin="0 0 12px 8px"
                  style={{ width: "fit-content" }}
                />
                <Controller
                  name="type"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <ImageInput
                      width={"100%"}
                      {...field}
                      onChange={(value) => {
                        setImage(value)
                        field.onChange(value)
                      }}
                    />
                  )}
                />
                {errors.image && (
                  <Text
                    margin="8px 0 0 8px"
                    type="error"
                    text={errors.image.message!}
                  />
                )}
              </div>
            </div>
            <Title
              type="h1"
              text="Name"
              margin="16px 0 12px 8px"
              style={{ width: "fit-content" }}
            />
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <Input
                  width={"344px"}
                  placeholder="Enter new Chat Name"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <Text
                margin="8px 0 0 8px"
                type="error"
                text={errors.name.message!}
              />
            )}
          </div>
          <div className={styles.footer}>
            <Button
              width="100%"
              type="white"
              onClick={setClose}
              text="Cancel"
            />
            <Button
              width="100%"
              type="green"
              btnType="submit"
              text="Create"
            />
          </div>
        </form>
      </div>
    </Modal>
  )
}
