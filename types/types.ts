import { Post, User } from "@prisma/client"

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string
  updatedAt: string
  emailVerified: string | null
}

export type PostAndUser = Post & {
  user: {
    image: string
    name: string
  }
}