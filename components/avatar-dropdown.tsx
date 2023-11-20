'use client'

import Link from "next/link"
import { signOut } from "next-auth/react"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { SafeUser } from "@/types/types"

interface AvatarDropdownProps {
  user: SafeUser
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
          <AvatarImage src={`${user.image}`} />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36"
      >
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link href='/favoritos'>Favoritos</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link
            href={`/${user.id}`}
          >
            Mi cuenta
          </Link>
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