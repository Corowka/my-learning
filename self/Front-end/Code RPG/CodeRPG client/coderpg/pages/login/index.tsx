import Head from "next/head";
import styles from "./login.module.css"
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { doSignInWithEmailAndPassword, doSignUpWithEmailAndPassword } from "@/utils/auth-handlers";
import { useRouter } from "next/router";
import { Input } from "@/components/UI/input/input";
import { Button } from "@/components/UI/button/button";

export default function Login() {
  const { setCurrentUser, setUserLoggedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState({ message: "", isValid: false });
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState({ message: "", isValid: false });
  const [validated, setValidated] = useState([false, false]);
  const [isSingUp, setIsSingUp] = useState(true);

  useEffect(() => {
    if (!email.length) {
      setIsEmailValid({ message: "Required", isValid: false });
      return;
    }
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid({ message: "Invalid: email is incorrect", isValid: false })
      return;
    }
    setIsEmailValid({ message: "Good", isValid: true });
  }, [email]);

  useEffect(() => {
    if (!password.length) {
      setIsPasswordValid({ message: "Required", isValid: false });
      return;
    }
    if (password.length < 8 || password.length > 12) {
      setIsPasswordValid({ message: "Invalid: password length must be 8-12 symbols", isValid: false });
      return;
    }
    setIsPasswordValid({ message: "Good", isValid: true })
  }, [password]);

  const signHandler = async (operation: string) => {
    const user = operation === "registration"
      ? doSignUpWithEmailAndPassword({ email, password })
      : await doSignInWithEmailAndPassword({ email, password });
    if (user) {
      setCurrentUser(user);
      setUserLoggedIn(true);
      router.push("/dashboard");
    }
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>CodeRPG login</title>
        <meta name="description" content="login your account or create new one" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.form}>
        <Input
          value={email}
          setValue={setEmail}
          placeholder="Enter your email"
          isValid={isEmailValid.isValid}
          helpMessage={isEmailValid.message}
        />
        <Input
          value={password}
          setValue={setPassword}
          placeholder="Enter your password"
          isValid={isPasswordValid.isValid}
          helpMessage={isPasswordValid.message}
        />
        <div className={styles.buttonWrap}>
          <Button
            title={"Register"}
            onClick={() => signHandler("registration")}
            disabled={!(isEmailValid.isValid && isPasswordValid.isValid)}
          />
          <Button
            title={"Login"}
            onClick={() => signHandler("login")}
            disabled={!(isEmailValid.isValid && isPasswordValid.isValid)}
          />
        </div>
      </div>
    </div >
  );
}
