'use server'

import dbConnect from '@/lib/dbConnect'
import LinkModel from '@/models'
import { LinkSchema, LinkSchemaType } from '@/schema'
import { $ZodIssue } from 'zod/v4/core'

interface ActionState {
  success: boolean
  message?: string
  shortUrl?: string
}

export async function createLink(prevState: ActionState, formData: FormData): Promise<ActionState> {

  const url = formData.get('url') as string
  const data = {
    url
  }

  // Validar con Zod
  const result = LinkSchema.safeParse(data)

  if (!result.success) {
    return {
      success: false,
      message: 'URL no válida'
    }
  }

  const shortUrl = Math.random().toString(36).substring(2, 8)

  try {
    await dbConnect()
    const link = await LinkModel.create({ shortUrl, url })

    return {
      success: true,
      shortUrl: link.shortUrl,
    }
  } catch (error) {
    console.error('Error al crear link:', error)
    return {
      success: false,
      message: 'Error al guardar el enlace en la base de datos',
    }
  }
}
