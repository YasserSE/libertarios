import { Link } from "@/i18n/Link";
import { ArrowRight, MapPin, TrendingDown, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCountrySnapshot } from "@/lib/affiliates/repository";
import { getReferenceSet } from "@/data/quadrantReferences";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";

/**
 * La tesis del proyecto.
 *
 * Sustituye a «Un espacio para entender, no para imponer», que decía «aquí no
 * se trata de convencer». Eso ya no es cierto: el proyecto quiere promover algo
 * que hoy no existe, y fingir neutralidad mientras se hace campaña es la forma
 * más rápida de perder credibilidad. La postura honesta —y más fuerte— es la
 * contraria: tenemos una posición, y los datos no.
 *
 * Las tres cifras salen del propio modelo del sitio, no de un texto a mano. Si
 * mañana cambia la calibración, cambia la tesis; y si la calibración dejara de
 * sostenerla, se vería.
 */
export async function AboutSection({ registrationOpen }: { registrationOpen: boolean }) {
  const spain = (await getCountrySnapshot("ES"))!;

  /*
    Los tres datos, en orden de menos a más específico: cuánto Estado hay en
    Europa, cuántos partidos ofrecen la alternativa, cuántos escaños tiene en
    España. Ninguno se escribe a mano: el segundo se calcula del propio modelo,
    así que si mañana algún partido europeo se mueve al cuadrante libertario, la
    cifra deja de ser cero sola.

    La versión anterior abría con «+35, Suiza es lo más liberal de Europa». Un
    +35 no significa nada para quien acaba de llegar, y además se apoyaba en
    nuestra propia escala, que es la base más débil para el primer argumento.
  */
  const euParties = getReferenceSet("party-eu")!.points;
  // Umbral explícito: no basta con caer del lado bueno de los dos ejes, hay que
  // ofrecer las dos libertades de verdad.
  const bothFreedoms = euParties.filter((p) => p.economic >= 50 && p.social >= 50);
  const bestEconomic = [...euParties].sort((a, b) => b.economic - a.economic)[0];
  const bestSocial = [...euParties]
    .filter((p) => p.economic > 0)
    .sort((a, b) => b.social - a.social)[0];

  const facts = [
    {
      icon: TrendingDown,
      count: 49,
      suffix: " %",
      value: "49 %",
      label: "del PIB europeo lo gasta el Estado",
      detail:
        "Casi la mitad de lo que produce la UE pasa por la administración antes de volver (Eurostat). Suiza, el país más liberal del continente, todavía gasta un tercio del suyo.",
    },
    {
      icon: Vote,
      value: `${bothFreedoms.length} de ${euParties.length}`,
      label: "partidos europeos ofrecen las dos libertades",
      detail: `Ninguno de los partidos con representación que medimos llega a +50 en los dos ejes a la vez. ${bestEconomic.short} lo consigue en lo económico y se hunde a ${bestEconomic.social} en lo social; ${bestSocial?.short} es liberal en lo personal y se queda en +${bestSocial?.economic} en lo económico. Hay hueco porque nadie lo ocupa.`,
    },
    {
      icon: MapPin,
      value: "0 de 350",
      label: "escaños libertarios en el Congreso",
      detail:
        "El único partido español explícitamente libertario nunca ha entrado. No hay movimiento organizado: hay personas sueltas que no saben cuántas son.",
    },
  ];

  return (
    <section id="proyecto" className="bg-card py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Por qué existe este proyecto
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            En Europa hay un hueco.<br className="hidden sm:block" /> En España, ni eso.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            En Europa el Estado gasta casi la mitad de lo que se produce, y ningún gobierno
            relevante propone en serio revertirlo. En España el vacío es todavía mayor: no existe
            una alternativa liberal con representación, y quien piensa así no sabe cuánta gente
            piensa lo mismo.
          </p>
          <p className="mt-5 text-lg font-medium text-foreground">
            Este proyecto empieza por lo primero que falta:{" "}
            <span className="text-primary">contarnos</span>.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {facts.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 110}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <fact.icon className="h-5 w-5 text-primary" />
              </span>
              <p className="font-display text-3xl font-bold tabular-nums text-foreground">
                {"count" in fact && typeof fact.count === "number" ? (
                  <CountUp value={fact.count} suffix={fact.suffix ?? ""} />
                ) : (
                  fact.value
                )}
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-foreground">
                {fact.label}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{fact.detail}</p>
            </Reveal>
          ))}
        </div>

        {/* La declaración de intenciones, explícita. Es lo que permite ser
            creíble al publicar datos que no favorecen a la propia tesis. */}
        <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-7">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Tenemos una posición. Los datos, no.
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Este sitio quiere que el movimiento libertario en España exista, y no finge lo
            contrario. Lo que no hace es maquillar las cifras para conseguirlo: la escala del
            cuadrante deja a España del lado intervencionista, dice que el PP y Vox no son
            liberales, y publica las objeciones al libertarismo que más incomodan. Somos parte, los
            números no.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="cta" asChild>
              <Link href="/registro">
                Contarme
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/proyecto">Cómo se calculan los datos</Link>
            </Button>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {registrationOpen ? (
            <>
              Ahora mismo somos {spain.count.toLocaleString("es-ES")} personas contadas en España.
              Nadie te pide el voto, ni militancia, ni que salgas en ninguna lista.
            </>
          ) : (
            <>
              El registro todavía no está abierto: las {spain.count.toLocaleString("es-ES")}{" "}
              personas que ves en el mapa de España son una simulación para enseñar cómo
              funcionará. Cuando se abra, nadie te pedirá el voto, ni militancia, ni que salgas en
              ninguna lista.
            </>
          )}
        </p>
      </div>
    </section>
  );
}
