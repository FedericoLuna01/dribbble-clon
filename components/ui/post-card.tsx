'use client'

import { Bookmark, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Button } from "./button"
import { PostAndUser, SafeUser } from "@/types/types"
import { useState } from "react"
import PostOptionsDropdown from "../post-options-dropdown"
import axios from "axios"
import { useRouter } from "next/navigation"

interface PostCardProps {
  withAuthor?: boolean
  post: PostAndUser
  currentUser: SafeUser | null
}

const PostCard: React.FC<PostCardProps> = ({
  withAuthor = true,
  post,
  currentUser
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const isOwn = currentUser?.id === post.userId
  const isSaved = currentUser?.favoritesId.includes(post.id)
  const isLiked = currentUser?.likesId.includes(post.id)

  const handleSave = async () => {
    if(!currentUser) return router.push('/ingreso')

    setIsLoading(true)
    const data = {
      postId: post.id
    }
    const res = await axios.patch(`/api/${currentUser?.id}/favorites`, data)
    if (res.status === 200) {
      router.refresh()
    }

    setIsLoading(false)
  }

  const handleLike = async () => {
    if(!currentUser) return router.push('/ingreso')

    setIsLoading(true)

    const res = await axios.patch(`/api/${currentUser?.id}/post/${post.id}/like`)
    if (res.status === 200) {
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <article
      className="relative max-w-md"
    >
      <div
        className="group relative"
      >
        {
          isOwn ? (
            <PostOptionsDropdown
              post={post}
            />
          )
            : (
              <Button
                className={`absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100
              duration-200 transition-all
              ${isSaved ? 'opacity-100' : 'opacity-0'}
              `}
                size='sm'
                onClick={handleSave}
                disabled={isLoading}
              >
                {isSaved ? 'Guardado' : 'Guardar'}
                <Bookmark
                  className='w-5 h-5 ml-2'
                  color={isSaved ? '#2cff95' : '#FFFFFF'}
                  fill={isSaved ? "#2cff95" : "#FFFFFF"}
                />
              </Button>
            )
        }
        <Link
          href={`/${post.userId}/post/${post.id}`}
        >
          <div
            className="overflow-hidden rounded-2xl shadow-sm hover:shadow-slate-300 hover:shadow-xl "
          >
            <Image
              src={post.image}
              alt='demo'
              className="aspect-[16/11] object-cover duration-500 transition-all cursor-pointer z-10"
              width={500}
              height={300}
            />
          </div>
        </Link>
      </div>
      {
        withAuthor && post.user !== null ?
          <div
            className="flex flex-row justify-between items-center mt-2"
          >
            <Link
              href={`/${post.userId}`}
            >
              <div
                className="flex flex-row text-sm font-semibold items-center"
              >
                <Avatar
                  className="w-6 h-6 mr-2"
                >
                  <AvatarImage src={post.user.image}/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h2>
                  {post.user.name}
                </h2>
              </div>
            </Link>
            <div
              className="flex flex-row items-center text-sm font-semibold"
            >
              <Heart
                className="w-4 h-4 mr-1 cursor-pointer"
                color={isLiked ? '#F00' : '#D1D1CD'}
                fill={isLiked ? "#F00" : "#D1D1CD"}
                onClick={handleLike}
              />
              {post.likes}
            </div>
          </div>
          : null
      }
    </article>
  )
}

export default PostCard