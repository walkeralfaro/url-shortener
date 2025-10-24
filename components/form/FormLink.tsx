'use client'

import { createLink } from "@/actions/create-link"
import { LinkSchema, LinkSchemaType } from "@/schema"
import { useActionState, useEffect, useState, useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const initialState = {
  success: false,
  message: '',
  shortUrl: '',
}

interface StoredLink {
  url: string
  shortUrl: string
}

export default function FormLink() {

  const [state, formAction] = useActionState(createLink, initialState)
  const [isPending, startTransition] = useTransition()
  const [storedLinks, setStoredLinks] = useState<StoredLink[]>([])

  const form = useForm<LinkSchemaType>({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      url: ''
    }
  })

  // Leer del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem('shortenedLinks')
    if (saved) {
      setStoredLinks(JSON.parse(saved))
    }
  }, [])

  // Guardar nuevo link cuando el estado cambia a éxito
  useEffect(() => {
    if (state.success && state.shortUrl && form.getValues('url')) {
      const newLink = {
        url: form.getValues('url'),
        shortUrl: state.shortUrl,
      }

      // actualizar lista local
      const updatedLinks = [newLink, ...storedLinks]
      setStoredLinks(updatedLinks)
      localStorage.setItem('shortenedLinks', JSON.stringify(updatedLinks))

      // limpiar campo de entrada
      form.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const onSubmit = (data: LinkSchemaType) => {
    const formData = new FormData()
    formData.append('url', data.url)

    startTransition(() => {
      formAction(formData)
    })
  }

  return (
    <main className="container mx-auto max-w-6xl p-4 mt-16 ">

      <div className="md:relative bg-[url(/bg-shorten-mobile.svg)] md:bg-[url(/bg-shorten-desktop.svg)] bg-purple-950 bg-size-[180] md:bg-cover bg-no-repeat bg-top-right p-4 md:p-12 rounded-lg">
       
          <Form {...form}>

            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between gap-4 md:flex-row">

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (

                  <FormItem className="flex-1 md:relative">
                    <FormControl>
                      <Input className="bg-white rounded-sm" placeholder="Shorten a link here..." {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400 md:absolute md:top-full md:left-0 md:mt-1" />
                  </FormItem>
                )}

              />

              <Button
                type="submit"
                variant="blue400"
                disabled={isPending}
                className="cursor-pointer rounded-sm"
              >
                {isPending ? 'Creating...' : 'Shorten It'}
              </Button>
            </form>

          </Form>
      </div>

      {/* Mensajes */}
      {state.message && !state.success && (
        <p className="mt-4 text-red-600">{state.message}</p>
      )}

      {/* Lista de enlaces guardados */}
      {storedLinks.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold">Enlaces creados:</h3>
          {storedLinks.map((link, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row md:items-center justify-between bg-white p-3 rounded-md shadow-sm"
            >
              <p className="break-all text-gray-700">{link.url}</p>
              <a
                href={`/${link.shortUrl}`}
                target="_blank"
                className="text-blue-600 font-semibold hover:underline"
              >
                {typeof window !== 'undefined' &&
                  `${window.location.origin}/${link.shortUrl}`}
              </a>
            </div>
          ))}
        </div>
      )}


    </main>
  )
}
