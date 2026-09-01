import { Link } from "@/i18n/Link";

const footerLinks = {
  proyecto: [
    { label: "Sobre el proyecto", href: "/proyecto" },
    { label: "Metodología de datos", href: "/proyecto" },
    { label: "Equipo", href: "/proyecto" },
  ],
  legal: [
    { label: "Privacidad y protección de datos", href: "/proyecto" },
    { label: "Aviso legal", href: "/proyecto" },
    { label: "Cookies", href: "/proyecto" },
  ],
  recursos: [
    { label: "¿Qué es ser libertario?", href: "/libertario" },
    { label: "Comparativas", href: "/comparativas" },
    { label: "Glosario", href: "/libertario" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-sm">L</span>
              </div>
              <span className="font-display font-semibold text-lg">
                Libertarios
              </span>
            </div>
            <p className="text-background/60 text-sm leading-relaxed mb-4">
              Contamos a quienes creen que en España falta una alternativa liberal.
              Queremos que exista, y lo decimos. Los datos que publicamos no están para
              convencerte: están para que compruebes si es verdad.
            </p>
            <a
              href="mailto:contacto@libertarios.es"
              className="text-sm text-primary hover:underline"
            >
              contacto@libertarios.es
            </a>
          </div>

          {/* Links columns */}
          <div>
            <h4 className="font-display font-semibold mb-4">Proyecto</h4>
            <ul className="space-y-3">
              {footerLinks.proyecto.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Recursos</h4>
            <ul className="space-y-3">
              {footerLinks.recursos.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Libertarios. Todos los derechos reservados.
          </p>
          <p className="text-sm text-background/40">
            Este proyecto no pertenece a ningún partido político.
          </p>
        </div>
      </div>
    </footer>
  );
}
