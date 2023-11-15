import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

import prismadb from "@/lib/prismadb"

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json()
    const { password, name, email } = body

    const exist = await prismadb.user.findUnique({
      where: {
        email
      }
    })

    if (exist) {
      return new NextResponse('User already exists', { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    console.log(error)
    return new NextResponse('Server error', { status: 500 })
  }
}

