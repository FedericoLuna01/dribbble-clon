import getCurrentUser from "@/actions/get-current-user"
import PostCard from "./ui/post-card"
import { PostAndUser } from "@/types/types"

interface PostsGridProps {
  posts: PostAndUser[]
}

const PostsGrid: React.FC<PostsGridProps> = async ({ posts }) => {
  const user = await getCurrentUser()
  return (
    <section
      className="my-10 grid gap-5 gap-y-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      {
        posts?.length !== 0 ? posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={user}
          />
        ))
          :
          <div
            className="min-h-[60vh]"
          >
            <p
              className="text-2xl text-gray-600"
            >
              No se encontraron posts :(
            </p>
          </div>
      }
    </section>
  )
}

export default PostsGrid