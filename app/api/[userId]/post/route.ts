import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, web, repo, imageUrl } = body

  const user = await getCurrentUser()

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const post = await prismadb.post.create({
      data: {
        title,
        description,
        image: imageUrl,
        web,
        repo,
        userId: user.id
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('error', { status: 500 })
  }
}
