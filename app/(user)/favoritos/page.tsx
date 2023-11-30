import { getFavorites } from "@/actions/get-favorites"
import PostsGrid from "@/components/posts-grid"
import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Appload | Favoritos',
  description: 'Aca vas a encontrar tus elementos guardados.',
}

const FavoritesPage = async () => {
  const favorites = await getFavorites()
  return (
    <div
      className="mt-20 container"
    >
      <h1 className="text-4xl font-bold">Tus favoritos</h1>
      <p className="text-zinc-600">Aca vas a encontrar tus elementos guardados</p>
      <Separator />
      <PostsGrid
        posts={favorites}
      />
    </div>
  )
}

export default FavoritesPage