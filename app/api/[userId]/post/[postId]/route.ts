import getCurrentUser from "@/actions/get-current-user"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(req: Request,
  { params }: { params: { id: string }}
) {
  try {
    const post = await prismadb.post.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('[POST_ID] error', { status: 500 })
  }
}

export async function PATCH(req: Request,
  { params }: { params: { userId: string, postId: string }}
) {
  const body = await req.json()
  const { title, description, web, repo, imageUrl, categoryId } = body

  const user = await getCurrentUser()

  if (!user) {
    return new NextResponse('No autenticado', { status: 401 })
  }

  if (user.id !== params.userId) {
    return new NextResponse('No autorizado', { status: 401 })
  }

  try {
    const post = await prismadb.post.update({
      where: {
        id: params.postId
      },
      data: {
        title,
        description,
        image: imageUrl,
        web,
        repo,
        categoryId
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('[POST_ID_PATCH] error', { status: 500 })
  }
}

export async function DELETE(req: Request,
  { params }:
  { params: { userId: string, postId: string }}) {
  try {
    const post = await prismadb.post.delete({
      where: {
        id: params.postId,
        userId: params.userId
      }
    })
    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('[POST_ID_DELETE] error', { status: 500 })
  }
}