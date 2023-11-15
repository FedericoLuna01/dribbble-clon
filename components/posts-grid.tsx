import PostCard from "./ui/post-card"

const PostsGrid = () => {
  return (
    <section
      className="my-10 grid gap-5 gap-y-12 grid-cols-[repeat(auto-fit,minmax(430px,1fr))] min-h-screen"
    >
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </section>
  )
}

export default PostsGrid