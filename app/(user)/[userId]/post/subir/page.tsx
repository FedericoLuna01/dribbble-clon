import { getCategories } from "@/actions/get-categories"
import getCurrentUser from "@/actions/get-current-user"
import UploadForm from "@/components/upload-form"
import { redirect } from "next/navigation"

const UploadPage = async () => {
  const user = await getCurrentUser()

  if (!user) { redirect('/ingreso') }

  const categories = await getCategories()

  return (
    <main
      className="min-h-[80vh] mt-20 container"
    >
      <UploadForm
        categories={categories}
      />
    </main>
  )
}

export default UploadPage