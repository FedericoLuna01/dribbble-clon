import PostCard from "@/components/ui/post-card"

const PersonalPostsGrid = () => {
  return (
    <section
      className="gap-4 grid grid-cols-[repeat(auto-fit,minmax(430px,1fr))] mb-10"
    >
      <PostCard withAuthor={false}/>
      <PostCard withAuthor={false}/>
      <PostCard withAuthor={false}/>
      <PostCard withAuthor={false}/>
      <PostCard withAuthor={false}/>
      <PostCard withAuthor={false}/>
    </section>
  )
}

export default PersonalPostsGrid