'use client'

import Link from "next/link"
import { MoreVertical } from "lucide-react"

import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { PostAndUser } from "@/types/types"
import { Post } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface PostOptionsDropdownProps {
  post: PostAndUser
}

const PostOptionsDropdown: React.FC<PostOptionsDropdownProps> = ({
  post
}) => {
  const router = useRouter()
  const handleClick = async (post: Post) => {
    try {
      await axios.delete(`/api/${post.userId}/post/${post.id}`)
        .then(() => {
          toast.success('Post eliminado')
          router.refresh()
        })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="absolute top-3 right-3 z-30
          duration-200 transition-all"
          size='icon'
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-36"
      >
        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <Link
            href={`/${post.userId}/post/${post.id}/editar`}
          >
            Editar
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
        >
          <span
            className="text-red-600"
            onClick={() => handleClick(post)}
          >
            Eliminar
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PostOptionsDropdown