import { getCategories } from "@/actions/get-categories"
import getCurrentUser from "@/actions/get-current-user"
import EditForm from "@/components/edit-form"
import prismadb from "@/lib/prismadb"
import { redirect } from "next/navigation"

interface EditPageProps {
  params: {
    postId: string
  }
}

const EditPage: React.FC<EditPageProps> = async ({ params }) => {
  const categories = await getCategories()
  const post = await prismadb.post.findUnique({
    where: {
      id: params.postId
    }
  })

  const user = await getCurrentUser()

  if (user?.id !== post?.userId) {
    redirect('/')
  }

  return (
    <main
      className="my-20 container"
    >
      <EditForm
        initialData={post}
        categories={categories}
      />
    </main>
  )
}

export default EditPage