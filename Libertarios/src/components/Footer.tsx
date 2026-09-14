import { Link } from "@/i18n/Link";

/*
 * Cada enlace del pie tiene que llevar a algo que exista.
 *
 * Había seis apuntando a `/proyecto` sin ancla —«Metodología», «Equipo»,
 * «Privacidad», «Aviso legal», «Cookies», «Glosario»— y la página no tenía ni
 * un `id`, así que los seis dejaban al visitante en la misma cabecera. En un
 * sitio que recoge correos con consentimiento del art. 9 del RGPD, un enlace de
 * privacidad que no lleva a ninguna parte no es un despiste de maquetación.
 *
 * Los que ahora tienen destino van con ancla; los que no tenían contenido
 * detrás («Aviso legal», «Equipo», «Glosario») salen del pie hasta que exista.
 */
const footerLinks = {
  proyecto: [
    { label: "Sobre el proyecto", href: "/proyecto" },
    { label: "Metodología de datos", href: "/proyecto#metodologia" },
  ],
  legal: [
    { label: "Privacidad y protección de datos", href: "/proyecto#privacidad" },
    { label: "Cookies", href: "/proyecto#privacidad" },
  ],
  recursos: [
    { label: "¿Qué es ser libertario?", href: "/libertario" },
    { label: "Comparativas", href: "/comparativas" },
    // Quien ya hizo el test necesita una puerta de vuelta desde cualquier
    // página; sin esto solo se llegaba con el enlace personal a mano.
    { label: "Ver mi resultado", href: "/mi-resultado" },
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
