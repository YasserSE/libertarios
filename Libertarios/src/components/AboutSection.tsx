import { Eye, Users, Shield } from "lucide-react";

export function AboutSection() {
  return (
    <section id="proyecto" className="py-24 lg:py-32 bg-card">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Un espacio para entender, no para imponer
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            En el debate público español, muchas ideas se simplifican, se caricaturizan o se confunden.
            Este proyecto nace para ofrecer una alternativa: un espacio donde las personas puedan expresar 
            su afinidad con la libertad individual y donde esos datos se muestren de forma clara, anónima y accesible.
          </p>
          <p className="text-lg text-foreground font-medium mt-6">
            Aquí no se trata de convencer, sino de <span className="text-primary">entender</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: Eye,
              title: "Transparencia total",
              description: "Todos los datos agregados son públicos y accesibles. Metodología abierta y verificable.",
            },
            {
              icon: Users,
              title: "Diversidad real",
              description: "Representamos la pluralidad de opiniones sin reducirlas a etiquetas simplistas.",
            },
            {
              icon: Shield,
              title: "Privacidad primero",
              description: "Datos siempre anónimos y agregados. Cumplimiento total con la normativa RGPD.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group bg-background border border-border rounded-2xl p-8 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
