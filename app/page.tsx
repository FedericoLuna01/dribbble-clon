import FilterBar from '@/components/filter-bar'
import PostsGrid from '@/components/posts-grid'
import prismadb from '@/lib/prismadb'

interface HomeProps {
  searchParams: {
    categoria: string
  }
}

export default async function Home({ searchParams }: HomeProps) {
  console.log(searchParams)
  const posts = await prismadb.post.findMany({
    where: {
      category: {
        name: searchParams.categoria
      }
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        }
      }
    }
  })

  const categories = await prismadb.category.findMany()

  return (
    <main
      className='container min-h-[70vh]'
    >
      <FilterBar
        categories={categories}
      />
      <PostsGrid
        posts={posts}
      />
    </main>
  )
}
