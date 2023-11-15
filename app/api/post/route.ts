import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, web, repo } = body

  const session = 

  try {
    const post = await prismadb.post.create({
      data: {
        title,
        description,
        web,
        repo
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('error', { status: 500 })
  }
}

// export async function GET(req: Request) {
//   try {
//     const posts = await prismadb.post.findMany()
//     return NextResponse.json(posts)
//   } catch (error) {
//     console.log(error)
//     return new NextResponse('error', { status: 500 })
//   }
// }