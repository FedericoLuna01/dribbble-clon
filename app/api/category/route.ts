import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST (req: Request, res: Response) {
  const body = await req.json()
  const { name } = body

  try {
    const category = await prismadb.category.create({
      data: {
        name,
      }
    })

    return NextResponse.json(category)

  } catch (error) {
    console.log(error)
    return new NextResponse('Algo salio mal', { status: 500 })
  }
}