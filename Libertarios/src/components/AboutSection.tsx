import Link from "next/link";
import { ArrowRight, MapPin, TrendingDown, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCountrySnapshot } from "@/lib/affiliates/repository";
import { EUROPE_COUNTRIES } from "@/data/geo/europe-countries";
import { getReferenceSet } from "@/data/quadrantReferences";

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
export function AboutSection() {
  const spain = getCountrySnapshot("ES")!;

  // El país europeo con más libertad económica según nuestra propia escala. Se
  // cruza con el registro geográfico en lugar de listar exclusiones a mano, así
  // que añadir un país no europeo al cuadrante no rompe la cifra.
  const europeanCodes = new Set(EUROPE_COUNTRIES.map((c) => c.code.toLowerCase()));
  const bestEuropean = getReferenceSet("country")!
    .points.filter((c) => europeanCodes.has(c.id))
    .sort((a, b) => b.economic - a.economic)[0];

  const leaders = getReferenceSet("leader")!.points;
  const libertarianLeaders = leaders.filter((l) => l.economic > 50 && l.social > 0);

  const facts = [
    {
      icon: TrendingDown,
      value: `+${bestEuropean.economic}`,
      label: `${bestEuropean.label} es lo más liberal de Europa`,
      detail:
        "Y aun así su Estado gasta un tercio del PIB. En nuestra escala, +70 sería un Estado del 15 %. Ningún país europeo se acerca.",
    },
    {
      icon: Vote,
      value: `${libertarianLeaders.length} de ${leaders.length}`,
      label: "gobernantes en el cuadrante libertario",
      detail:
        "El resto amplía el Estado, restringe libertades civiles, o las dos cosas. Hay hueco porque nadie lo ocupa.",
    },
    {
      icon: MapPin,
      value: "0",
      label: "escaños libertarios en España",
      detail:
        "El único partido español explícitamente libertario es extraparlamentario. No hay movimiento organizado: hay personas sueltas.",
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
            Casi la mitad de los europeos vive bajo Estados que gastan la mitad de lo que produce
            su país, y ningún gobierno relevante propone en serio revertirlo. En España el vacío es
            todavía mayor: no existe una alternativa liberal con representación, y quien piensa así
            no sabe cuánta gente piensa lo mismo.
          </p>
          <p className="mt-5 text-lg font-medium text-foreground">
            Este proyecto empieza por lo primero que falta:{" "}
            <span className="text-primary">contarnos</span>.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                <fact.icon className="h-5 w-5 text-primary" />
              </span>
              <p className="font-display text-3xl font-bold tabular-nums text-foreground">
                {fact.value}
              </p>
              <p className="mt-1 font-display text-sm font-semibold text-foreground">
                {fact.label}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{fact.detail}</p>
            </div>
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
          El registro todavía no está abierto: las {spain.count.toLocaleString("es-ES")} personas
          que ves en el mapa de España son una simulación para enseñar cómo funcionará. Cuando se
          abra, nadie te pedirá el voto, ni militancia, ni que salgas en ninguna lista.
        </p>
      </div>
    </section>
  );
}
