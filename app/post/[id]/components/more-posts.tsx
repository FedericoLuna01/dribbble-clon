import { Button } from "@/components/ui/button"
import PostCard from "@/components/ui/post-card"

const MorePosts = () => {
  return (
    <section
      className="mb-10"
    >
      <div
        className="flex flex-row justify-between items-center"
      >
        <h3 className="text-xl font-bold">Ver más de Fede</h3>
        <Button
          variant='link'
        >
          Ver todos →
        </Button>
      </div>
      <div
        className="grid grid-cols-3 gap-4 mt-2"
      >
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
    </section>
  )
}

export default MorePosts