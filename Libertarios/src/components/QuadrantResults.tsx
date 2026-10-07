"use client";

import { useMemo, useState, useRef } from "react";
import { Link, useLocale } from "@/i18n/Link";
import { Button } from "@/components/ui/button";
import { InteractiveQuadrant } from "./InteractiveQuadrant";
import { REFERENCE_SETS, nearestReferences } from "@/data/quadrantReferences";
import { ReferenceAvatar } from "./maps/ReferenceAvatar";
import { ShareButtons } from "./ShareButtons";
import { getDictionary } from "@/i18n/getDictionary";
import { afinidadHref } from "@/i18n/config";
import {
  RotateCcw,
  Share2,
  ArrowRight,
  UserPlus,
  Link2,
  Check,
  Bookmark,
  Compass,
  CheckCircle2,
  Vote,
} from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface QuadrantResultsProps {
  economic: number;
  social: number;
  onReset: () => void;
  /**
   * Token personal de recuperación, si el registro lo devolvió. Con él se
   * ofrece el enlace privado para volver a ver el resultado desde otro
   * dispositivo; sin él, esa tarjeta simplemente no aparece.
   */
  recoveryToken?: string | null;
}

export function QuadrantResults({
  economic,
  social,
  onReset,
  recoveryToken,
}: QuadrantResultsProps) {
  const [recoveryCopied, setRecoveryCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  /*
   * Solo el cuadrante y su descripción. Aquí había además un «percentil» y una
   * «cercanía a la media del grupo» calculados sobre `mockUsers`: quinientas
   * personas generadas con un PRNG, todas dentro de los subcuadrantes
   * libertarios. Quien acababa de dar su correo para «formar parte del mapa»
   * leía a continuación que estaba «cerca de la media» de un grupo que no
   * existe. Los datos individuales reales no están disponibles —la base solo
   * publica agregados con k-anonimato—, así que no hay con qué sustituirlo, y
   * lo honesto es no enseñar nada antes que enseñar algo inventado.
   *
   * Tampoco hay ya un emoji distinto por cuadrante. Poner la Estatua de la
   * Libertad al libertario y un círculo rojo o azul a los demás era juzgar el
   * resultado en un sitio que dice que los datos no tienen posición.
   */
  const analysis = useMemo(() => {
    if (economic >= 0 && social >= 0) {
      return {
        quadrant: "Libertario",
        description:
          "Apoyas tanto la libertad económica como la libertad social. Crees en la autonomía individual, la responsabilidad personal y la mínima intervención del Estado en todos los aspectos de la vida.",
      };
    }
    if (economic < 0 && social >= 0) {
      return {
        quadrant: "Liberal social",
        description:
          "Apoyas la libertad social pero prefieres cierta intervención económica del Estado. Valoras los derechos individuales en lo personal mientras favoreces políticas redistributivas.",
      };
    }
    if (economic < 0 && social < 0) {
      return {
        quadrant: "Autoritario de izquierda",
        description:
          "Favoreces tanto la intervención económica como el control social por parte del Estado. Priorizas la igualdad colectiva sobre las libertades individuales.",
      };
    }
    return {
      quadrant: "Autoritario de derecha",
      description:
        "Apoyas el libre mercado pero con controles sociales más estrictos. Combinas libertad económica con valores tradicionales y orden social.",
    };
  }, [economic, social]);

  /*
   * Las etiquetas de cada eje usan las mismas palabras que los rótulos del
   * cuadrante («libre mercado / intervención», «libertad social / control
   * social»). La versión anterior decía «conservador» en el eje social, que no
   * es lo que el eje mide y confundía a quien comparaba con el gráfico.
   */
  const economicLabel =
    economic >= 50
      ? "Libre mercado, con claridad"
      : economic >= 0
        ? "Libre mercado, con matices"
        : economic >= -50
          ? "Intervención, con matices"
          : "Intervención, con claridad";
  const socialLabel =
    social >= 50
      ? "Libertad social, con claridad"
      : social >= 0
        ? "Libertad social, con matices"
        : social >= -50
          ? "Control social, con matices"
          : "Control social, con claridad";

  const shareText = `🧭 Mi resultado en el test ideológico: ${analysis.quadrant}\n\n📊 Libertad económica: ${economic > 0 ? '+' : ''}${economic}\n📊 Libertad social: ${social > 0 ? '+' : ''}${social}\n\n¿Dónde te sitúas tú? Haz el test:`;
  
  /*
   * El enlace que se comparte lleva la posición y el idioma.
   *
   * Antes apuntaba a `/cuadrante` a secas: sin idioma —así que el visitante se
   * comía una redirección— y sobre todo sin el resultado, de modo que «mira
   * dónde he caído» llevaba a un test en blanco. Con `?e` y `?s` el enlace abre
   * el cuadrante con esa posición ya pintada, que es lo que se prometía al
   * pulsar «compartir».
   */
  const locale = useLocale();
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/cuadrante?e=${economic}&s=${social}`
      : "";

  /*
   * El enlace privado. Distinto del de compartir en lo que importa: aquel lleva
   * la posición en la URL para que la vea cualquiera, y este lleva un token que
   * solo debería tener su dueño. De ahí que se pidan cosas opuestas —uno se
   * publica, el otro se guarda— y que no se puedan mezclar en un único botón.
   */
  const recoveryUrl =
    recoveryToken && typeof window !== "undefined"
      ? `${window.location.origin}/${locale}/mi-resultado?t=${recoveryToken}`
      : "";

  const handleCopyRecovery = async () => {
    try {
      await navigator.clipboard.writeText(recoveryUrl);
      setRecoveryCopied(true);
      toast.success("Enlace privado copiado. Guárdalo donde no lo pierdas.");
      setTimeout(() => setRecoveryCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  return (
    <div className="space-y-8" ref={resultsRef}>
      {/* Results header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-primary text-primary-foreground font-display font-semibold mb-4">
          <Compass className="h-5 w-5" aria-hidden />
          {analysis.quadrant}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Tus resultados
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {analysis.description}
        </p>
      </div>
      
      {/* Las dos cifras, en el mismo color sea cual sea el signo. Pintar el
          positivo en el color de marca y el negativo en gris era decir con el
          color que un lado del eje es el bueno. */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-sm text-muted-foreground mb-1">Eje económico</div>
          <div className="font-display text-3xl font-bold tabular-nums text-foreground">
            {economic > 0 ? '+' : ''}{economic}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{economicLabel}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-sm text-muted-foreground mb-1">Eje social</div>
          <div className="font-display text-3xl font-bold tabular-nums text-foreground">
            {social > 0 ? '+' : ''}{social}
          </div>
          <div className="text-xs text-muted-foreground mt-1">{socialLabel}</div>
        </div>
      </div>
      
      {/* Quadrant visualization */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <InteractiveQuadrant userPosition={{ economic, social }} defaultLayers={["country"]} />
      </div>

      {/* Reference points nearest to the result. A coordinate means little on
          its own; "cerca de Suiza, lejos de Cuba" is what makes it legible. */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <h3 className="font-display font-semibold text-foreground">
          Qué hay cerca de tu posición
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Referencias más próximas en el cuadrante. Sirven para dar escala, no para etiquetarte.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {REFERENCE_SETS.map((set) => {
            const nearest = nearestReferences(
              { economic, social },
              { kinds: [set.kind], limit: 3 },
            );
            return (
              <div key={set.kind}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {set.label}
                </p>
                <ul className="space-y-1.5">
                  {nearest.map((point) => (
                    <li
                      key={point.id}
                      className="flex items-center justify-between gap-3 rounded-lg bg-background px-3 py-2"
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        <ReferenceAvatar point={point} size={24} />
                        <span className="min-w-0 truncate text-sm font-medium text-foreground">
                          {point.label}
                        </span>
                      </span>
                      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                        {point.economic > 0 ? "+" : ""}
                        {point.economic} / {point.social > 0 ? "+" : ""}
                        {point.social}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-5 text-[11px] italic leading-snug text-muted-foreground">
          Estar cerca de un punto no implica coincidir con él: dos posiciones idénticas en dos ejes
          pueden nacer de razones muy distintas.
        </p>
      </div>
      
      {/* Share card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Comparte tus resultados
          </h3>
        </div>
        
        {/* Preview card */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/30 border border-primary/20 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <Compass className="h-7 w-7 text-primary-foreground" aria-hidden />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground mb-1">
                Mi resultado: {analysis.quadrant}
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>
                  Económico:{" "}
                  <span className="font-medium tabular-nums text-foreground">
                    {economic > 0 ? "+" : ""}
                    {economic}
                  </span>
                </span>
                <span>
                  Social:{" "}
                  <span className="font-medium tabular-nums text-foreground">
                    {social > 0 ? "+" : ""}
                    {social}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Botones de compartir: extraídos a `ShareButtons` para reutilizarlos
            en «¿A quién votar?»; aquí se comportan exactamente igual. */}
        <ShareButtons
          url={shareUrl}
          text={shareText}
          title={`Mi resultado: ${analysis.quadrant}`}
        />
      </div>

      {/* Enlace privado de recuperación. El de compartir está hecho para
          publicarse; este es lo contrario, y el texto tiene que dejarlo claro. */}
      {recoveryUrl && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <div className="mb-4 flex items-center gap-3">
            <Bookmark className="h-5 w-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Vuelve a ver este resultado cuando quieras
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Este navegador ya lo recuerda: si vuelves, te lo enseñamos sin repetir el test. Y con
            este enlace privado puedes abrirlo también desde el móvil o desde otro ordenador.
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              readOnly
              value={recoveryUrl}
              onFocus={(e) => e.currentTarget.select()}
              aria-label="Tu enlace privado"
              className="h-12 flex-1 rounded-md border border-input bg-background px-3 font-mono text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <Button variant="secondary" className="h-12 sm:w-44" onClick={handleCopyRecovery}>
              {recoveryCopied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Link2 className="mr-2 h-4 w-4" />
              )}
              {recoveryCopied ? "¡Copiado!" : "Copiar enlace"}
            </Button>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            No lo publiques: quien lo tenga verá tu posición política. No lleva tu correo ni tu
            nombre, y puedes pedirnos que lo anulemos cuando quieras.
          </p>
        </div>
      )}

      {/*
        Quien tiene token de recuperación acaba de pasar por el muro o ha abierto
        su enlace privado: ya está registrado. Pedirle otra vez que «se registre
        como simpatizante» era la primera tarjeta que veía después de dar su
        correo y su consentimiento, y se leía como que algo había fallado. A esa
        persona se le confirma que ya cuenta y se le ofrece, sin insistir, el
        formulario largo para quien quiera añadir edad y género. La llamada a
        registrarse queda para quien llega por un enlace compartido (`?e&s`) o
        sin haber pasado el muro.
      */}
      {recoveryToken ? (
        <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center sm:p-8">
          <CheckCircle2 className="mx-auto mb-3 h-9 w-9 text-primary" aria-hidden />
          <h3 className="font-display text-xl font-semibold text-foreground">Ya estás contado</h3>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Tu posición se suma, agregada y anónima, al mapa. Si quieres, puedes añadir edad y
            género: ayuda a que la demografía se pueda publicar cuando haya suficientes registros.
          </p>
          <Button variant="outline" className="mt-5" asChild>
            <Link href="/registro">Completar mi ficha</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
          <UserPlus className="w-10 h-10 text-primary mx-auto mb-4" />
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            ¿Quieres formar parte de los datos?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Regístrate como simpatizante y tu posición se sumará de forma anónima al mapa de libertarios en España.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link href="/registro">
              Registrarme como simpatizante
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      )}
      
      {/*
        Invitación a «¿A quién votar? Objetivamente». El cuadrante dice dónde
        estás en dos ejes; el otro test, a qué partido te pareces medida a
        medida, con lo que prometen y lo que votan. Va al final y en tono de
        tarjeta secundaria (borde, sin degradado) para no competir con el
        registro, que es la llamada propia de esta página.
      */}
      <AfinidadInvite locale={locale} />

      {/* Actions */}
      <div className="flex items-center justify-center">
        <Button variant="outline" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Repetir test
        </Button>
      </div>
    </div>
  );
}

function AfinidadInvite({ locale }: { locale: ReturnType<typeof useLocale> }) {
  const t = getDictionary(locale).afinidad;
  return (
    <div
      data-testid="afinidad-invite"
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <Vote className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
        <div>
          <h3 className="font-display font-semibold text-foreground">{t.quadrantTitle}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.quadrantBody}</p>
        </div>
      </div>
      <Button variant="outline" className="shrink-0" asChild>
        <Link href={afinidadHref(locale)}>
          {t.quadrantCta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
