"use client";

import { useMemo, useState, useRef } from "react";
import { Link, useLocale } from "@/i18n/Link";
import { Button } from "@/components/ui/button";
import { InteractiveQuadrant } from "./InteractiveQuadrant";
import { REFERENCE_SETS, nearestReferences } from "@/data/quadrantReferences";
import { ReferenceAvatar } from "./maps/ReferenceAvatar";
import {
  RotateCcw,
  Share2,
  ArrowRight,
  UserPlus,
  Twitter,
  Facebook,
  Link2,
  Check,
  Bookmark,
  Compass,
  CheckCircle2,
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
  const [copied, setCopied] = useState(false);
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      toast.success("¡Enlace copiado al portapapeles!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar el enlace");
    }
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const handleShareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mi resultado: ${analysis.quadrant}`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
        if ((err as Error).name !== 'AbortError') {
          toast.error("Error al compartir");
        }
      }
    } else {
      handleCopyLink();
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
        
        {/* Share buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleShareTwitter}
          >
            <Twitter className="w-4 h-4" />
            <span className="hidden sm:inline">Twitter</span>
            <span className="sm:hidden">X</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleShareFacebook}
          >
            <Facebook className="w-4 h-4" />
            <span>Facebook</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleShareWhatsApp}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 h-12"
            onClick={handleShareTelegram}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
            <span>Telegram</span>
          </Button>
        </div>
        
        {/* Copy link button */}
        <div className="mt-4 flex gap-3">
          <Button 
            variant="secondary" 
            className="flex-1 h-12"
            onClick={handleCopyLink}
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Link2 className="w-4 h-4 mr-2" />}
            {copied ? '¡Copiado!' : 'Copiar enlace'}
          </Button>
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button 
              variant="cta" 
              className="flex-1 h-12"
              onClick={handleNativeShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          )}
        </div>
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
