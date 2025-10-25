import dbConnect from "@/lib/dbConnect";
import LinkModel from "@/models";
import { LinkSchema } from "@/schema";
import { NextResponse } from "next/server";

// 1️⃣ Manejamos el preflight (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // permite desde cualquier dominio
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, RSC",
    },
  });
}

// 2️⃣ Manejamos el GET
export async function GET(
  request: Request,
  context: { params: Promise<{ shortUrl: string }> }
) {
  try {
    await dbConnect();
    const { shortUrl } = await context.params;

    const record = await LinkModel.findOne({ shortUrl });

    if (!record) {
      const res = NextResponse.redirect(new URL("/not-found", request.url));
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    const parsed = LinkSchema.safeParse({ url: record.url });

    if (!parsed.success) {
      console.error("URL inválida en BD");
      const res = NextResponse.redirect(new URL("/not-found", request.url));
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    const targetUrl = parsed.data.url;

    // ⚠️ Si es una solicitud prefetch o RSC (como las que hace Next internamente),
    // no redirigimos directamente — devolvemos JSON
    if (request.headers.get("RSC")) {
      const res = NextResponse.json({ url: targetUrl });
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    // Redirige normalmente (navegador)
    const res = NextResponse.redirect(targetUrl);
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error) {
    console.error("Error al redirigir:", error);
    const res = NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}
