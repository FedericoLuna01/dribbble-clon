import PostsGrid from "@/components/posts-grid"
import { Separator } from "@/components/ui/separator"

const FavoritesPage = async () => {
  return (
    <div
      className="mt-20 container"
    >
      <h1 className="text-4xl font-bold">Tus favoritos</h1>
      <p className="text-zinc-600">Aca vas a encontrar tus elementos guardados</p>
      <Separator />
      <PostsGrid />
    </div>
  )
}

export default FavoritesPage