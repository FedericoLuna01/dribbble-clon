'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from 'react-hot-toast'
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea"
import ImageUpload from "./image-upload"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Category } from "@prisma/client"

const formSchema = z.object({
  title: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .max(50),
  description: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .max(200, { message: 'Máximo 350 carácteres' }),
  web: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .url({ message: 'Debe ser una URL válida' }),
  repo: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .url({ message: 'Debe ser una URL válida' }),
  imageUrl: z.string()
    .min(1, { message: 'Se necesita una imagen' }),
  categoryId: z.string()
    .min(1, { message: 'Se necesita una categoría' }),
})

interface UploadFormProps {
  categories: Category[]
}

const UploadForm: React.FC<UploadFormProps> = ({ categories }) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      web: "",
      repo: "",
      categoryId: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = values
    try {
      await axios.post('/api/new/post', data)
        .then(() => {
          toast.success('Post creado con éxito')
          router.push('/')
          router.refresh()
        })
    } catch (error) {
      console.log(error)
      toast.error('Algo salió mal')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Nuevo post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Una pequeña descripción..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoría</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="De que se trata tu proyecto?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    categories.map(category => (
                      <SelectItem
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen de tu proyecto</FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange('')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="web"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sitio web</FormLabel>
              <FormControl>
                <Input placeholder="https://ejemplo.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repositorio</FormLabel>
              <FormControl>
                <Input placeholder="https://github.com/" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">Continuar</Button>
      </form>
    </Form>
  )
}

export default UploadForm