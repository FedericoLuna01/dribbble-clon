import getCurrentUser from "@/actions/get-current-user"
import { Button } from "@/components/ui/button"
import PostCard from "@/components/ui/post-card"
import prismadb from "@/lib/prismadb"
import Link from "next/link"

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

  const currentUser = await getCurrentUser()

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
          asChild
        >
          <Link
            href={`/${user.id}`}
          >
            Ver todos →
          </Link>
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
              currentUser={currentUser}
            />
          ))
        }
      </div>
    </section>
  )
}

export default MorePosts