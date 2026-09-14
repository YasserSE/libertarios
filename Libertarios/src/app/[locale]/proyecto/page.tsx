import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/Link";
import { 
  ArrowRight, Target, Eye, Shield, Database, 
  Lock, BarChart3, Users, Heart, Mail
} from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Transparencia",
    description: "Todos los datos son públicos y accesibles. No hay agendas ocultas ni intereses partidistas.",
  },
  {
    icon: Shield,
    title: "Posición declarada",
    description: "Queremos que exista una alternativa liberal en España y lo decimos. No apoyamos a ningún partido ni candidato concreto.",
  },
  {
    icon: Lock,
    title: "Privacidad",
    description: "Los datos individuales nunca se publican. Solo mostramos estadísticas agregadas; tu correo se guarda para poder escribirte y no sale de ahí.",
  },
  {
    icon: Database,
    title: "Rigor",
    description: "Metodología clara y documentada. Los datos se presentan sin manipulación ni sesgo.",
  },
];

const methodology = [
  {
    step: 1,
    title: "Registro voluntario",
    description: "Los simpatizantes se registran voluntariamente proporcionando datos demográficos básicos y su posición en el cuadrante ideológico.",
  },
  {
    step: 2,
    title: "Anonimización",
    description: "Los datos personales se procesan de forma que nunca es posible identificar a un individuo concreto.",
  },
  {
    step: 3,
    title: "Agregación",
    description: "La información se agrupa por categorías (provincia, edad, género) para generar estadísticas significativas.",
  },
  {
    step: 4,
    title: "Visualización",
    description: "Los datos agregados se presentan mediante gráficos, mapas y tablas interactivas de fácil comprensión.",
  },
];

const faqs = [
  {
    question: "¿Este proyecto pertenece a algún partido político?",
    answer: "No. Este proyecto es completamente independiente y no tiene ninguna vinculación con partidos políticos, candidatos ni organizaciones electorales.",
  },
  {
    question: "¿Mis datos personales son públicos?",
    answer: "No. Todo lo que se publica son recuentos agregados, con un mínimo de cinco registros por territorio para que nadie sea identificable en un municipio pequeño. Guardamos tu correo, solo para escribirte: no se publica, no se cede y puedes pedir que lo borremos cuando quieras.",
  },
  {
    question: "¿Registrarme implica algún compromiso?",
    answer: "No. El registro es voluntario y no implica afiliación, militancia ni ningún compromiso. Lo único que pedimos es un correo, para no contarte dos veces y para poder escribirte.",
  },
  {
    question: "¿Cómo se financia este proyecto?",
    answer: "Este proyecto es una iniciativa sin ánimo de lucro mantenida por voluntarios interesados en la divulgación de ideas y datos.",
  },
  {
    question: "¿Puedo eliminar mis datos?",
    answer: "Sí. Puedes solicitar la eliminación de tus datos en cualquier momento contactando con nosotros.",
  },
];

export default function ProyectoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Sobre el proyecto
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Contamos a quienes creen que en España falta una alternativa liberal, y publicamos
                cómo lo medimos para que cualquiera pueda discutirlo.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Nuestra misión
                </h2>
              </div>
              
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  En el debate público español, muchas ideas se simplifican, se caricaturizan o se confunden.
                  El libertarismo, en particular, suele ser malinterpretado o reducido a estereotipos.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  En España no hay un movimiento libertario organizado: hay personas sueltas que no
                  saben cuántas son. Este proyecto empieza por lo primero que falta —contarlas— y
                  enseña el resultado de forma clara, anónima y verificable.
                </p>
                <p className="text-foreground font-medium">
                  Tenemos una posición. Los datos, no: la escala deja a España del lado
                  intervencionista y publicamos las objeciones que más incomodan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Nuestros valores
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {values.map((value, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-card transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section id="metodologia" className="scroll-mt-24 py-16 lg:py-24 bg-card border-y border-border">
          <div className="container">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Metodología de datos
              </h2>
            </div>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Cómo recopilamos, procesamos y presentamos la información
            </p>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {methodology.map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                        {step.step}
                      </div>
                      {i < methodology.length - 1 && (
                        <div className="w-0.5 h-12 bg-border mx-auto mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/*
          Qué se guarda y por qué.
          
          El pie enlazaba aquí tres veces —«Privacidad», «Aviso legal»,
          «Cookies»— y aquí no había nada: la página no tenía ni un solo `id`,
          así que los tres clics caían en la cabecera. Con correos recogidos y
          consentimiento del art. 9 de por medio, esa información no es un
          extra: el consentimiento informado exige que exista y se pueda
          encontrar. Lo que sigue describe lo que el código hace de verdad; si
          cambia el código, cambia este texto.
        */}
        <section id="privacidad" className="scroll-mt-24 py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                  <Lock className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  Qué hacemos con tus datos
                </h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-display font-semibold text-foreground">Qué se guarda</h3>
                  <p className="mt-2 leading-relaxed">
                    Tu correo, tu posición en los dos ejes, el país y —si lo dices— la provincia. La
                    edad por tramos y el género son opcionales y solo se piden en el formulario
                    largo. No se guarda tu nombre, ni tu IP junto al perfil, ni la orientación
                    sexual que el formulario llegó a preguntar en una versión anterior.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">Para qué</h3>
                  <p className="mt-2 leading-relaxed">
                    Para publicar recuentos agregados —nunca tu ficha—, para no contarte dos veces y
                    para poder escribirte. Guardamos el correo precisamente para eso: escribimos
                    poco, solo sobre el proyecto, y te das de baja cuando quieras.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    Por qué tu posición no aparece nunca sola
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    Lo que se publica son medias por territorio, y solo a partir de cinco registros.
                    Por debajo de ese mínimo el territorio no se publica: con dos o tres personas en
                    una provincia pequeña, una media es casi una ficha personal. Por eso verás
                    «menos de 5» en vez de una cifra en muchos sitios del mapa.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    Tu posición política es un dato especial
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    La opinión política es categoría especial del artículo 9 del RGPD, así que la
                    base legal es tu consentimiento explícito: la casilla que marcas antes de
                    registrarte. Puedes retirarlo cuando quieras y podemos demostrar cuándo se dio.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    El enlace para volver a ver tu resultado
                  </h3>
                  <p className="mt-2 leading-relaxed">
                    Al registrarte te damos un enlace privado con un identificador aleatorio. No
                    lleva tu correo ni tu nombre, y quien lo abre ve una posición y nada más. No lo
                    publiques, y si lo pierdes o crees que se ha filtrado, escríbenos y lo anulamos.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">Tus derechos</h3>
                  <p className="mt-2 leading-relaxed">
                    Puedes pedir acceso a lo tuyo, su corrección o su borrado escribiendo a{" "}
                    <a
                      href="mailto:contacto@libertarios.es"
                      className="underline underline-offset-4 hover:text-foreground"
                    >
                      contacto@libertarios.es
                    </a>
                    . El borrado se aplica también a los agregados en el siguiente recálculo. Si
                    crees que no lo hemos hecho bien, puedes reclamar ante la Agencia Española de
                    Protección de Datos.
                  </p>
                </div>

                <div>
                  <h3 className="font-display font-semibold text-foreground">Cookies</h3>
                  <p className="mt-2 leading-relaxed">
                    No usamos cookies de seguimiento ni analítica de terceros. El sitio recuerda dos
                    cosas en tu propio navegador —el idioma que elegiste y tu último resultado, para
                    no volver a pedirte el correo— y ninguna de las dos sale de tu dispositivo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 lg:py-24">
          <div className="container">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Preguntas frecuentes
            </h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
              <Mail className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                ¿Tienes preguntas?
              </h3>
              <p className="text-muted-foreground mb-6">
                Si tienes dudas sobre el proyecto, los datos o quieres colaborar, no dudes en contactarnos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="cta">
                  <Mail className="mr-2 h-4 w-4" />
                  contacto@libertarios.es
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/registro">
                    Participar en el proyecto
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
