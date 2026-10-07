import type { Metadata } from "next";
import { Suspense } from "react";
import { ResultFromUrl } from "@/components/afinidad/ResultView";
import { fmt, getResultStrings } from "@/i18n/afinidad/result";
import { getSeoStrings } from "@/i18n/afinidad/seo";
import { dataset } from "@/data/afinidad";
import { resultLeader } from "@/lib/afinidad/leader";
import { afinidadMetadata, clip, ogImageUrl, questionCount } from "@/lib/afinidad/meta";
import { PARAM_ANSWERS, PARAM_REGION, PARAM_USUAL_VOTE, PARAM_VERSION } from "@/lib/afinidad/encode";

type SearchParams = Record<string, string | string[] | undefined>;
type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<SearchParams>;
};

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

/**
 * Metadatos del resultado.
 *
 * `noindex` (en la etiqueta, no en robots.txt: los rastreadores de vistas
 * previas tienen que poder leer la página): cada combinación de respuestas es
 * una URL distinta; indexarlas llenaría el buscador de miles de páginas casi
 * iguales con el voto de personas concretas. Se siguen los enlaces.
 *
 * La imagen OG lleva los mismos parámetros que la página más el idioma, para
 * que al pegar el enlace en WhatsApp se vean los tres primeros partidos. La
 * imagen valida y recalcula por su cuenta: aquí solo se reenvían.
 *
 * El título de la vista previa es «Mi resultado: <primer partido>», con el
 * mismo cálculo que la página. Con `anon=1`, o si el enlace no se puede leer,
 * título e imagen genéricos: nada en la vista previa dice a quién se parece
 * quien comparte.
 */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const t = getResultStrings(locale);
  const seo = getSeoStrings(locale);

  const og = new URLSearchParams();
  for (const key of [PARAM_ANSWERS, PARAM_VERSION, PARAM_REGION, PARAM_USUAL_VOTE]) {
    const v = first(sp[key]);
    if (v) og.set(key, v.slice(0, 128));
  }
  const anon = first(sp.anon) === "1";
  const leader = anon ? null : resultLeader(og, dataset);
  const ogTitle = leader ? fmt(seo.resultTitle, { party: leader.name }) : seo.resultTitleGeneric;
  const description = fmt(seo.resultDescription, { n: questionCount() });
  const image = anon
    ? { url: ogImageUrl(locale, { anon: "1" }), alt: seo.ogAlt }
    : { url: ogImageUrl(locale, og), alt: leader ? seo.ogResultAlt : seo.ogAlt };

  return afinidadMetadata({
    locale,
    sub: "/resultado",
    title: `${t.pageTitle} · ${t.ogTitle}`,
    description,
    ogTitle: clip(ogTitle, 70),
    siteName: t.ogTitle,
    image,
    noindex: true,
  });
}

/**
 * El resultado se calcula en el cliente a partir de `?r=&v=&ca=&vh=`.
 *
 * Mismo patrón que `/cuadrante`: el título queda fuera del límite de Suspense
 * para que quien abre un enlace compartido vea enseguida en qué página está,
 * y solo el contenido que depende de la URL espera a hidratar.
 */
export default async function ResultadoPage({ params }: Props) {
  const { locale } = await params;
  const t = getResultStrings(locale);
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">{t.pageTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.election}</p>
      </header>
      <Suspense
        fallback={
          <p className="py-16 text-center text-sm text-muted-foreground" role="status">
            {t.loading}
          </p>
        }
      >
        <ResultFromUrl lang={locale} />
      </Suspense>
    </div>
  );
}
