import PostCard from "@/components/ui/post-card"
import { Post } from "@prisma/client"

interface PersonalPostsGridProps {
  posts: Post[]
}

const PersonalPostsGrid: React.FC<PersonalPostsGridProps> = ({
  posts
}) => {
  console.log(posts)
  return (
    <section
      className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(310px,430px))] mb-10"
    >
      {
        posts ? posts.map((post) => (
          <PostCard
            key={post.id}
            withAuthor={false}
            post={post}
          />
        ))
          : (
            <p className="text-center text-2xl">
            No hay publicaciones
            </p>
          )
      }
    </section>
  )
}

export default PersonalPostsGrid