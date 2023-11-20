import getCurrentUser from "@/actions/get-current-user"
import PostCard from "./ui/post-card"
import prismadb from "@/lib/prismadb"

const PostsGrid = async () => {
  const posts = await prismadb.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        }
      }
    }
  })
  const user = await getCurrentUser()
  return (
    <section
      className="my-10 grid gap-5 gap-y-12 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]"
    >
      {
        posts ? posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={user}
          />
        ))
          :
          <div
            className="flex justify-center items-center mt-32 text-black"
          >
            <p
              className="text-2xl font-semibold"
            >
            No posts found
            </p>
          </div>
      }
    </section>
  )
}

export default PostsGrid