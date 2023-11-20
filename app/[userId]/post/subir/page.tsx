import getCurrentUser from "@/actions/get-current-user"
import UploadForm from "@/components/upload-form"
import { redirect } from "next/navigation"

const UploadPage = async () => {
  const user = await getCurrentUser()

  if (!user) { redirect('/ingreso') }

  return (
    <main
      className="min-h-[80vh] mt-20 container"
    >
      <UploadForm />
    </main>
  )
}

export default UploadPage