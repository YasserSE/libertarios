import { redirect } from "next/navigation";

/**
 * `/spain` era la portada prefiltrada a España; ahora España es la portada.
 *
 * La ruta se conserva como redirección permanente en vez de borrarla: estuvo
 * publicada, y romper una URL que alguien pudo compartir o enlazar no cuesta
 * nada evitarlo.
 */
export default async function SpainPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}
