'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface AvatarDropdownProps {
  user: {
    email: string
    image: string | null
    name: string
  } | null
}

const AvatarDropdown= ({
  user
}: AvatarDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className='cursor-pointer'
        >
          <AvatarImage src={`${user.image ? user.image : "/default-avatar.png"}`} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36"
      >
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link href='/favoritos'>Favoritos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <span>Mi cuenta</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <span onClick={() => signOut()} className="text-red-600">Cerrar sesion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AvatarDropdown