import FilterBar from '@/components/filter-bar'
import PostsGrid from '@/components/posts-grid'

export default function Home() {
  return (
    <main
      className='min-h-screen container'
    >
      <FilterBar />
      <PostsGrid />
    </main>
  )
}
