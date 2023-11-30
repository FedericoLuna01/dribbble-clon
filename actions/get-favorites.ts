import prismadb from "@/lib/prismadb"
import getCurrentUser from "./get-current-user"

export const getFavorites = async () => {
  const user = await getCurrentUser()
  const favorites = await prismadb.post.findMany({
    where: {
      id: {
        in: user?.favoritesId
      },
    },
    include: {
      user: true,
    }
  })

  return favorites
}