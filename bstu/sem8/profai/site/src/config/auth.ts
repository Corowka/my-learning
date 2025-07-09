import bcrypt from "bcryptjs"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

import { UserService } from "@/services/UserService"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { prisma } from "./prisma"

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  // @ts-expect-error The expected type comes from property 'adapter' which is declared here on type 'AuthOptions'
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password || !credentials.role) {
          throw new Error("email, password and role are required")
        }
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user) {
          const newUser = await UserService.createUser({
            email: credentials.email,
            password: credentials.password,
            role: req.body?.role,
          })
          if (!newUser) throw new Error("while creating account")
          return {
            id: newUser.data.id,
            email: newUser.data.email,
            name: newUser.data.name,
            role: req?.body?.role || "student",
          }
        }
        const isPasswordValid = user?.password && (await bcrypt.compare(credentials.password, user.password))
        if (!isPasswordValid) throw new Error("invalid password")
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
      }
      return session
    },
    async redirect({ baseUrl, url }) {
      try {
        const callbackUrl = url && new URL(url).searchParams.get("callbackUrl")
        return callbackUrl ? callbackUrl : baseUrl
      } catch {
        return baseUrl
      }
    },
  },
}

export default NextAuth(authOptions)
