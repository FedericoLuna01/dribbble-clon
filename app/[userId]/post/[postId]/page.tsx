import Image from 'next/image'
import { Bookmark, Heart } from 'lucide-react'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import PostDescription from './components/post-description'
import { Separator } from '@/components/ui/separator'
import MorePosts from './components/more-posts'
import prismadb from '@/lib/prismadb'

const PostPage = async ({ params }: { params: { postId: string }}) => {
  const isLiked = false
  const post = await prismadb.post.findUnique({
    where: {
      id: params.postId
    },
    include: {
      user: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })

  return (
    <section
      className='min-h-screen container mt-20'
    >
      {
        post ?
          <>
            <article
              className='max-w-5xl mx-auto'
            >
              <div
                className='flex align-center justify-center'
              >
                <Image
                  src={post.image}
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
                    <AvatarImage src={post.user.image} />
                  </Avatar>
                  <h2
                    className='font-semibold text-lg'
                  >
                    {post.user.name}
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
              <PostDescription
                post={post}
              />
            </article>
            <Separator className='my-12' />
            <MorePosts
              user={{
                id: post.userId,
                name: post.user.name
              }}
            />
          </>
          :
          <h2
            className='flex items-center justify-center'
          >
            Post not found
          </h2>
      }
    </section>
  )
}

export default PostPage