import getCurrentUser from "@/actions/get-current-user"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH (req: Request, { params }: { params: { userId: string, postId: string } }) {
  try {
    const { userId, postId } = params

    const user = await getCurrentUser()

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    let likesIds = user.likesId
    const isLiked = likesIds.includes(postId)

    if (isLiked) {
      const index = likesIds.indexOf(postId)
      likesIds.splice(index, 1)
    } else {
      likesIds.push(postId)
    }

    await prismadb.user.update({
      where: {
        id: user.id
      },
      data: {
        likesId: likesIds
      }
    })

    const postLikes = await prismadb.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        likes: true
      }
    })

    if (!postLikes) return new NextResponse('Post not found', { status: 404 })

    const likes = isLiked ? postLikes.likes - 1 : postLikes.likes + 1

    const post = await prismadb.post.update({
      where: {
        id: postId,
      },
      data: {
        likes
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.log(error)
    return new NextResponse('Error [PATCH_LIKE]', { status: 500 })
  }
}