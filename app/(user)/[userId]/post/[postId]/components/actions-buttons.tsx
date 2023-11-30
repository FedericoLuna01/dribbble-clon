'use client'

import { useState } from 'react'
import axios from 'axios'

import { Button } from "@/components/ui/button"
import { Bookmark, Heart } from "lucide-react"
import { useRouter } from 'next/navigation'
import { SafeUser } from '@/types/types'
import { Post } from '@prisma/client'

interface ActionsButtonsProps {
  post: Post
  currentUser: SafeUser | null
}

const ActionsButtons: React.FC<ActionsButtonsProps> = ({ post, currentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const isLiked = currentUser?.likesId.includes(post.id)
  const isSaved = currentUser?.favoritesId.includes(post.id)

  const handleSave = async () => {
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
    setIsLoading(true)

    const res = await axios.patch(`/api/${currentUser?.id}/post/${post.id}/like`)
    if (res.status === 200) {
      router.refresh()
    }

    setIsLoading(false)
  }
  return (
    <div
      className='space-x-4'
    >
      <Button
        variant='secondary'
        onClick={handleSave}
        disabled={isLoading}
      >
        <Bookmark
          className='mr-2 w-4 h-4'
          fill={isSaved ? '#2dac5c' : 'transparent'}
          stroke={isSaved ? '#2dac5c' : '#000'}
        />
        {isSaved ? 'Guardado' : 'Guardar'}
      </Button>
      <Button
        onClick={handleLike}
        disabled={isLoading}
      >
        <Heart
          className='mr-2 w-4 h-4'
          fill={isLiked ? '#F00' : 'transparent'}
          stroke={isLiked ? '#F00' : '#FFF'}
        />
        {post.likes}
      </Button>
    </div>
  )
}

export default ActionsButtons