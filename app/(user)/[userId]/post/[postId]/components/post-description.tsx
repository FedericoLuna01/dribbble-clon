import { Button } from "@/components/ui/button"
import { PostAndUser } from "@/types/types"
import { Github, Globe } from "lucide-react"
import Link from "next/link"

interface PostDescriptionProps {
  post: PostAndUser
}

const PostDescription: React.FC<PostDescriptionProps> = ({
  post
}) => {
  return (
    <section
      className="mt-8"
    >
      <h1 className="text-5xl font-bold">
        {post.title}
      </h1>
      <p
        className="max-w-[800px] mt-2"
      >
        {post.description}
      </p>
      <div
        className="space-x-4 mt-4"
      >
        <Button
          asChild
        >
          <Link
            href={post.repo}
            target="_blank"
          >
            <Github className="mr-2 w-6 h-6" /> Repositorio
          </Link>
        </Button>
        <Button
          asChild
        >
          <Link
            href={post.web}
            target="_blank"
          >
            <Globe className="mr-2 w-6 h-6" /> Web
          </Link>
        </Button>
      </div>
    </section>
  )
}

export default PostDescription