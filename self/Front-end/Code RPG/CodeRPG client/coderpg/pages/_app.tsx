import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider, useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/router";

import { Layout } from "@/components/layout";
import { useEffect } from "react";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const { userLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>
      </Head>
      <AuthProvider>
        <Layout>
          < Component {...pageProps} />
        </Layout >
      </AuthProvider>
    </>
  )
}
