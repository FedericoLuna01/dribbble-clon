import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import prismadb from "@/lib/prismadb"
import PersonalPostsGrid from "./components/personal-posts-grid"

const ProfilePage = async ({ params }: { params: { userId: string } }) => {
  const account = await prismadb.user.findUnique({
    where: {
      id: params.userId
    },
    include: {
      posts: true
    }
  })

  if(!account) return null

  return (
    <section
      className="container mt-24"
    >
      {
        account ? (
          <>
            <div
              className="flex flex-row justify-between items-center"
            >
              <div
                className="space-y-4"
              >
                <Avatar className="w-44 h-44">
                  <AvatarImage src={account.image} />
                </Avatar>
                <div>
                  <h1 className="text-4xl font-bold">{account.name}</h1>
                  <p className="text-xl max-w-[400px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, itaque!</p>
                </div>
                <Button>
                  Contacto
                </Button>
              </div>
            </div>
            <div
              className="mt-10"
            >
              {/* <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Mas gustados</SelectItem>
                  <SelectItem value="mas">Menos gustados</SelectItem>
                  <SelectItem value="dark">Mas recientes</SelectItem>
                  <SelectItem value="system">Mas antiguos</SelectItem>
                </SelectContent>
              </Select> */}
              <Separator className="my-2" />
              <PersonalPostsGrid
                posts={account.posts}
              />
            </div>
          </>
        ) : (
          <div>Usuario no encontrado</div>
        )
      }
    </section>
  )
}

export default ProfilePage