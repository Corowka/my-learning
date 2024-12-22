import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface Inputs {
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
  language: string;
}

const schema = z
  .object({
    username: z.string().nonempty({ message: "Username is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .nonempty({ message: "Password is required" }),
    repeatPassword: z
      .string()
      .nonempty({ message: "Repeat Password is required" }),
    email: z
      .string()
      .email({ message: "Email is not valid" })
      .nonempty({ message: "Email is required" }),
    language: z.string().nonempty(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export default function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Box>
        <FormControl as="fieldset" isRequired>
          <FormLabel>Username</FormLabel>
          <Controller
            name="username"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input type="text" placeholder="Enter Username" {...field} />
            )}
          />
          {errors.username && (
            <FormHelperText color="red">
              {errors.username.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel>Password</FormLabel>
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input type="password" placeholder="Enter Password" {...field} />
            )}
          />
          {errors.password && (
            <FormHelperText color="red">
              {errors.password.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel>Repeat Password</FormLabel>
          <Controller
            name="repeatPassword"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Enter Password again"
                {...field}
              />
            )}
          />
          {errors.repeatPassword && (
            <FormHelperText color="red">
              {errors.repeatPassword.message}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel>Email</FormLabel>
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <Input type="email" placeholder="Enter Email" {...field} />
            )}
          />
          {errors.email && (
            <FormHelperText color="red">{errors.email.message}</FormHelperText>
          )}
        </FormControl>
        <FormControl as="fieldset" isRequired>
          <FormLabel as="legend">Your Language</FormLabel>
          <Controller
            name="language"
            defaultValue="js"
            control={control}
            render={({ field }) => (
              <RadioGroup defaultValue={"js"} {...field}>
                <VStack alignItems="left">
                  <Radio value="js">JavaScript</Radio>
                  <Radio value="java">Java</Radio>
                  <Radio value="python">Python</Radio>
                </VStack>
              </RadioGroup>
            )}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}
