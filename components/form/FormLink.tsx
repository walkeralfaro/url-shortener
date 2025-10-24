'use client'

import { createLink } from "@/actions/create-link"
import { LinkSchema, LinkSchemaType } from "@/schema"
import { useActionState, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const initialState = {
  success: false,
  message: '',
  shortUrl: '',
}

export default function FormLink() {
  
  const [state, formAction] = useActionState(createLink, initialState)
  const [isPending, startTransition] = useTransition()

  const form = useForm<LinkSchemaType>({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      url: ''
    }
  })

  const onSubmit = (data: LinkSchemaType) => {

    const formData = new FormData()
    formData.append('url', data.url)

    console.log(formData)

    startTransition(() => {
      formAction(formData)
    })

  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Acortador de URLs</h1>

      <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-end gap-4">

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (

              <FormItem className="relative">
                <FormLabel>URL:</FormLabel>
                <FormControl>
                  <Input className="w-[420px]" placeholder="https://ejemplo.com" {...field} />
                </FormControl>
                <FormMessage className="absolute text-sm text-red-500 top-full left-0 mt-1" />
              </FormItem>
            )}

          />

          <Button
            type="submit"
            disabled={isPending}
            className="cursor-pointer"
          >
            {isPending ? 'Creando...' : 'Crear'}
          </Button>
        </form>

      </Form>

      {/* Resultado */}
      {state.success && state.shortUrl && (
        <p className="mt-4 text-green-600">
          URL corta creada:{' '}
          <a
            href={`/${state.shortUrl}`}
            target="_blank"
            className="underline font-semibold"
          >
            {typeof window !== 'undefined' &&
              `${window.location.origin}/${state.shortUrl}`}
          </a>
        </p>
      )}

      {!state.success && state.message && (
        <p className="mt-4 text-red-600">{state.message}</p>
      )}

    </main>
  )
}
