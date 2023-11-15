import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import PersonalPostsGrid from "../components/personal-posts-grid"

const ProfilePage = () => {
  return (
    <section
      className="container mt-20"
    >
      <div
        className="flex flex-row justify-between items-center"
      >
        <div
          className="space-y-4"
        >
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold">Federico Luna</h1>
            <p className="text-xl max-w-[400px]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt, itaque!</p>
          </div>
          <Button>
            Contacto
          </Button>
        </div>
        <div>
          <Image
            src='/demo.png'
            width={600}
            height={300}
            alt='demo'
            className="aspect-[16/11] object-cover rounded-xl shadow-sm"
          />
        </div>
      </div>
      <div
        className="mt-10"
      >
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Mas gustados</SelectItem>
            <SelectItem value="mas">Menos gustados</SelectItem>
            <SelectItem value="dark">Mas recientes</SelectItem>
            <SelectItem value="system">Mas antiguos</SelectItem>
          </SelectContent>
        </Select>
        <Separator className="my-2" />
        <PersonalPostsGrid />
      </div>
    </section>
  )
}

export default ProfilePage