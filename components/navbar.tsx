import { Upload } from "lucide-react"
import Link from "next/link"

import AvatarDropdown from "./avatar-dropdown"
import MainNav from "./main-nav"
import { Button } from "./ui/button"
import getCurrentUser from "@/actions/get-current-user"

const Navbar = async () => {
  const user = await getCurrentUser()
  return (
    <header
      className="fixed top-0 w-full h-16 border-b-2 border-gray-100 bg-white flex items-center z-50"
    >
      <div
        className="container flex justify-between items-center flex-row"
      >
        <div
          className="flex flex-row items-center space-x-8"
        >
          <Link
            className="text-4xl font-bold text-gray-800"
            href='/'
          >
            Dribble
          </Link>
          <MainNav />
        </div>
        <div
          className="flex flex-row space-x-4"
        >
          {
            user ? (
              <>
                <AvatarDropdown
                  user={user}
                />
                <Button
                  asChild
                >
                  <Link
                    href={`/${user.id}/post/subir`}
                  >
                    <Upload className="mr-2 h-4 w-4" />Subir
                  </Link>
                </Button>
              </>
            ) :
              (
                <>
                  <Button
                    asChild
                  >
                    <Link
                      href='/ingreso'
                    >
                    Ingresar
                    </Link>
                  </Button>
                </>
              )
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar