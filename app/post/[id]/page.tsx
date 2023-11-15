import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Bookmark, Heart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import PostDescription from './components/post-description'
import { Separator } from '@/components/ui/separator'
import MorePosts from './components/more-posts'

const PostPage = () => {
  const isLiked = false
  return (
    <section
      className='min-h-screen container mt-20'
    >
      <article
        className='max-w-5xl mx-auto'
      >
        <div
          className='flex align-center justify-center'
        >
          <Image
            src='/allnighter-1.png'
            width={1200}
            height={506}
            alt='All Nighter'
            className='rounded-xl shadow-sm object-cover aspect-[16/9]'
          />
        </div>
        <div
          className='mt-4 flex flex-row items-center justify-between'
        >
          <div
            className="flex flex-row items-center"
          >
            <Avatar
              className="mr-2"
            >
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2
              className='font-semibold text-lg'
            >
              Federico Luna
            </h2>
          </div>
          <div
            className='space-x-4'
          >
            <Button
              variant='secondary'
            >
              <Bookmark className='mr-2 w-4 h-4' />
              Guardar
            </Button>
            <Button>
              <Heart className='mr-2 w-4 h-4' fill={isLiked ? '#f00' : 'transparent'} />
              3453
            </Button>
          </div>
        </div>
        <PostDescription />
      </article>
      <Separator className='my-12' />
      <MorePosts />
    </section>
  )
}

export default PostPage