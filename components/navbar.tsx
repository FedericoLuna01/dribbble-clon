'use client'

import MainNav from "./main-nav"
import AvatarDropdown from "./avatar-dropdown"
import UploadModal from "./modals/upload-modal"
import Link from "next/link"
import { Button } from "./ui/button"
import { useSession } from "next-auth/react"

const Navbar = () => {
  const { data } = useSession()
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
            data ? (
              <>
                <AvatarDropdown
                  user={data.user}
                />
                <UploadModal />
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