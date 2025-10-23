import { z } from 'zod'

export const LinkSchema = z.object({
  url: z.string()
        .trim()
        .refine((value) => !/\s/.test(value), {message: "La URL no debe contener espacios ni saltos de línea"})
        .refine((value) => {
          try {
            new URL(value)
            return true
          } catch (error) {
            return false
          }
        }, {message: "La URL debe ser válida"})
})

export type LinkSchemaType = z.infer<typeof LinkSchema>