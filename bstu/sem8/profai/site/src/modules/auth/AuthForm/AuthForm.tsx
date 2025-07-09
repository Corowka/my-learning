"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Logo } from "@/modules/common/Logo/Logo"
import { zodResolver } from "@hookform/resolvers/zod"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { Button, Checkbox, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"

import styles from "./AuthForm.module.css"

type FormData = {
  email: string
  password: string
}

const schema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать не менее 6 символов"),
})

export const AuthForm = () => {
  const [role, setRole] = useState("student")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onPasswordVisibleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVisible(event.target.checked)
  }

  const onChange = (event: React.MouseEvent<HTMLElement>, role: string) => {
    setRole(role)
  }

  const onSubmit = async (data: FormData) => {
    const result = await signIn("credentials", {
      redirect: true,
      email: data.email,
      password: data.password,
      role,
    })
    if (!result?.error) {
    } else {
      console.error(result.error)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Logo size={4} style={{ margin: "0 auto 8px" }} />
        {process.env.NEXT_PUBLIC_USE_ROLE_SELECT === "true" && (
          <ToggleButtonGroup color='standard' value={role} exclusive onChange={onChange} fullWidth>
            <ToggleButton value='student'>Учащийся</ToggleButton>
            <ToggleButton value='university'>Учебное заведение</ToggleButton>
          </ToggleButtonGroup>
        )}
        <TextField label='Электронная почта' variant='standard' {...register("email")} />
        {errors.email && (
          <Typography color='error' variant='subtitle2'>
            {errors.email.message}
          </Typography>
        )}
        <div className={styles.row}>
          <TextField label='Пароль' variant='standard' type={isPasswordVisible ? "text" : "password"} {...register("password")} fullWidth />
          <Checkbox
            icon={<VisibilityIcon />}
            checkedIcon={<VisibilityOffIcon />}
            onChange={onPasswordVisibleChange}
            inputProps={{ "aria-label": "password visibility" }}
          />
        </div>
        {errors.password && (
          <Typography color='error' variant='subtitle2'>
            {errors.password.message}
          </Typography>
        )}
        <Button sx={{ marginTop: "40px" }} size='large' type='submit' variant='contained'>
          Войти
        </Button>
      </form>
    </div>
  )
}
