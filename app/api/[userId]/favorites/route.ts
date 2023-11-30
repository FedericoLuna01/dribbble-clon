import getCurrentUser from "@/actions/get-current-user"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH (req: Request, { params }: { params:{ userId: string }}) {
  const body = await req.json()
  const { userId } = params
  const { postId } = body

  const user = await getCurrentUser()

  if (!user) {
    return new Response("Unauthorized", { status: 401 })
  }

  let favoritesId = user.favoritesId

  if (favoritesId.includes(postId)) {
    const index = favoritesId.indexOf(postId)
    favoritesId.splice(index, 1)
  } else {
    favoritesId.push(postId)
  }

  try {
    const favorites = await prismadb.user.update({
      where: {
        id: userId
      },
      data: {
        favoritesId
      }
    })

    return NextResponse.json(favorites, { status: 200 })

  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }

}