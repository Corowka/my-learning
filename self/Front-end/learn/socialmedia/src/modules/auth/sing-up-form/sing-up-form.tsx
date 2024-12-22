"use client"

import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import * as z from "zod"

import { showErrorNotification } from "@/lib/notifications/show-error-notification"
import { showSuccessNotification } from "@/lib/notifications/show-success-notification"
import { AuthService } from "@/lib/services/auth-service"
import { setAuthState } from "@/store/reducers/auth-reducer"
import { setIsLoading } from "@/store/reducers/loading-reducer"
import { RootState } from "@/store/store"
import { Button } from "@/UI/button/button"
import { Content } from "@/UI/content/content"
import { Input } from "@/UI/input/input"
import { Text } from "@/UI/text/text"
import { Title } from "@/UI/title/title"
import { zodResolver } from "@hookform/resolvers/zod"

import styles from "./sing-up-form.module.css"
import { useRouter } from "next/navigation"

interface Inputs {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const schema = z
  .object({
    username: z.string().nonempty({ message: "Username is required" }),
    email: z
      .string()
      .email({ message: "Email is not valid" })
      .nonempty({ message: "Email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(12, { message: "Password must be less than 12 characters" })
      .nonempty({ message: "Password is required" }),
    repeatPassword: z.string().nonempty({ message: "Repeat Password is required" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  })

export const SingUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const dispatch = useDispatch()
  const router = useRouter()

  const onSingUp: SubmitHandler<Inputs> = async (data) => {
    dispatch(setIsLoading(true))
    const res = await AuthService.registerUser(data.username, data.email, data.password)
    if (res.data) {
      dispatch(setAuthState(res.data))
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken))
      router.push("/home")
      showSuccessNotification(`Welcome, ${res.data.user.username}!`)
    } else {
      showErrorNotification(res.message)
    }
    dispatch(setIsLoading(false))
  }

  return (
    <Content
      padding="32px 24px"
      maxWidth="320px"
      width="100%"
    >
      <form
        className={styles.container}
        onSubmit={handleSubmit(onSingUp)}
      >
        <Title
          type="h1"
          textAlign="center"
          margin="16px 0 20px"
          text="Sign Up"
        />
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Enter your Username"
              {...field}
            />
          )}
        />
        {errors.username && (
          <Text
            type="error"
            text={errors.username.message!}
          />
        )}
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Enter your Email"
              {...field}
            />
          )}
        />
        {errors.email && (
          <Text
            type="error"
            text={errors.email.message!}
          />
        )}
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Enter your Password"
              {...field}
            />
          )}
        />
        {errors.password && (
          <Text
            type="error"
            text={errors.password.message!}
          />
        )}
        <Controller
          name="repeatPassword"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Repeat your Password"
              {...field}
            />
          )}
        />
        {errors.repeatPassword && (
          <Text
            type="error"
            text={errors.repeatPassword.message!}
          />
        )}
        <Button
          type="white"
          btnType="submit"
          text="Sing Up"
          width="100%"
        />
      </form>
    </Content>
  )
}
