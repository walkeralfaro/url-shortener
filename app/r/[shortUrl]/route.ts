import dbConnect from "@/lib/dbConnect"
import LinkModel from "@/models"
import { LinkSchema } from "@/schema"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { shortUrl: string } }
) {
  try {
    await dbConnect()
    const { shortUrl } = await params

    // Buscar el documento en MongoDB
    const record = await LinkModel.findOne({ shortUrl })

    // no existe shortUrl en la base de datos
    if (!record) {
      return NextResponse.redirect(new URL('/not-found', request.url))
    }

    // valida la url de la base de datos
    const parsed = LinkSchema.safeParse({ url: record.url })

    // la url de la base de datos no es válida
    if (!parsed.success) {
      console.error("URL inválida en BD")
      return NextResponse.redirect(new URL("/not-found", request.url))
    }

    // Redirige al destino real
    return NextResponse.redirect(parsed.data.url)

  } catch (error) {
    console.error("Error al redirigir:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
