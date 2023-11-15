'use client'

import { Github } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { toast } from 'react-hot-toast'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { signIn } from "next-auth/react"

const formSchema = z.object({
  email: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .max(50)
    .email({ message: 'Email inválido' }),
  password: z.string()
    .min(5, { message: 'Al menos 5 carácteres' })
    .max(50),
})

const LoginForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    signIn('credentials', {
      ...values,
      redirect: false
    }).then((callback) => {
      if (callback?.ok) {
        router.push('/')
        router.refresh()
        toast.success('Sesión iniciada correctamente')
      }

      if (callback?.error) {
        toast.error('Error al iniciar sesión')
      }
    })
  }

  return (
    <div
      className="border border-zinc-300 p-10 rounded-xl shadow-sm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div
            className="space-y-2"
          >
            <h1 className="font-bold text-5xl">Iniciar sesión</h1>
            <p className="text-zinc-600 text-lg">Inicia sesion para subir tus aplicaciones</p>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">Iniciar sesión</Button>
        </form>
      </Form>
      <Separator className="my-2" />
      <Button
        variant='outline'
        className="w-full"
        onClick={() => signIn('github')}
      >
        <Github className="w-5 h-5 mr-2" /> Continuar con Github
      </Button>
      <div
        className="flex justify-center items-center mt-2"
      >
        <p>No tenés una cuenta?</p>
        <Button
          variant='link'
          className="py-0"
          asChild
        >
          <Link
            href='/registro'
          >
            Registrate
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginForm