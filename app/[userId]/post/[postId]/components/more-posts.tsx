import { Button } from "@/components/ui/button"
import PostCard from "@/components/ui/post-card"
import prismadb from "@/lib/prismadb"

interface MorePostsProps {
  user: {
    id: string
    name: string | null
  }
}

const MorePosts: React.FC<MorePostsProps> = async ({ user }) => {

  const posts = await prismadb.post.findMany({
    where: {
      userId: user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      }
    },
    take: 3,
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <section
      className="mb-10"
    >
      <div
        className="flex flex-row justify-between items-center"
      >
        <h3 className="text-xl font-bold">Ver más de {user.name}</h3>
        <Button
          variant='link'
        >
          Ver todos →
        </Button>
      </div>
      <div
        className="grid grid-cols-3 gap-4 mt-2"
      >
        {
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))
        }
      </div>
    </section>
  )
}

export default MorePosts