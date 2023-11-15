import NextAuth, { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import bcrypt from 'bcrypt'

import prismadb from "@/lib/prismadb"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password"
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing credentials')
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid credentials')
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )

        if(!isCorrectPassword) {
          throw new Error('Invalid credentials')
        }

        return user

      }
    })
  ],
  // pages: {
  //   signIn: '/ingreso'
  // },
  session: {
    strategy: 'jwt'
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }