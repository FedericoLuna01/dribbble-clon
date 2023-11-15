'use client'

import { Bookmark, Heart } from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { useState } from "react"

interface PostCardProps {
  withAuthor?: boolean
}

const PostCard: React.FC<PostCardProps> = ({ withAuthor = true }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  return (
    <article
      className="relative"
    >
      <div
        className="overflow-hidden rounded-2xl shadow-sm hover:shadow-slate-300 hover:shadow-xl group"
      >
        <Bookmark
          className={`
            w-7 h-7 absolute top-3 right-3 cursor-pointer z-20
            group-hover:opacity-100
            duration-200 transition-all
            ${isSaved ? 'opacity-100 scale-100' : 'opacity-0'}
          `}
          color={isSaved ? '#22c55e' : '#D1D1CD'}
          fill={isSaved ? "#22c55e" : "#D1D1CD"}
          onClick={() => setIsSaved(!isSaved)}
        />
        <Image
          src='/allnighter-1.png'
          alt='demo'
          className="aspect-[16/11] object-cover duration-500 transition-all cursor-pointer z-10"
          width={500}
          height={300}
        />
      </div>
      {
        withAuthor ?
          <div
            className="flex flex-row justify-between items-center mt-2"
          >
            <div
              className="flex flex-row text-sm font-semibold items-center"
            >
              <Avatar
                className="w-6 h-6 mr-2"
              >
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h2>
              Federico Luna
              </h2>
            </div>
            <div
              className="flex flex-row items-center text-sm font-semibold"
            >
              <Heart
                className="w-4 h-4 mr-1 cursor-pointer"
                color={isLiked ? '#F00' : '#D1D1CD'}
                fill={isLiked ? "#F00" : "#D1D1CD"}
                onClick={() => setIsLiked(!isLiked)}
              /> 456
            </div>
          </div>
          : null
      }
    </article>
  )
}

export default PostCard