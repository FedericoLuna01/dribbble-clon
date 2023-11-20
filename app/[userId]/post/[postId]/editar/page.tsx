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
      className="mt-20 container"
    >
      <EditForm
        initialData={post}
      />
    </main>
  )
}

export default EditPage