import { Button } from "@/components/ui/button"
import Link from "next/link"

const SideBar = () => {
  return (
    <aside
      className="border-r border-gray-200 pr-2 flex flex-col"
    >
      <Button
        asChild
        variant='ghost'
      >
        <Link
          href='/admin/usuarios'
        >
          Usuarios
        </Link>
      </Button>
      <Button
        asChild
        variant='ghost'
      >
        <Link
          href='/admin/usuarios'
        >
              Posteos
        </Link>
      </Button>
      <Button
        asChild
        variant='ghost'
      >
        <Link
          href='/admin/usuarios'
        >
              Categorías
        </Link>
      </Button>
    </aside>
  )
}

export default SideBar