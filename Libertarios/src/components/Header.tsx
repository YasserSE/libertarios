"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Play } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "El proyecto", href: "/proyecto" },
  { label: "Test ideológico", href: "/cuadrante", highlight: true },
  { label: "Datos y mapas", href: "/datos" },
  { label: "Noticias", href: "/noticias" },
  { label: "¿Qué es ser libertario?", href: "/libertario" },
  { label: "Comparativas", href: "/comparativas" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-sm">L</span>
            </div>
            <span className="font-display font-semibold text-lg text-foreground">
              Libertarios
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.href.startsWith("/#") ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-accent ${
                    isActive(item.href) ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/cuadrante">
                <Play className="mr-1.5 h-3.5 w-3.5" />
                Test ideológico
              </Link>
            </Button>
            <Button variant="cta" size="default" asChild>
              <Link href="/registro">Registrarse</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-accent rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 px-4 space-y-2">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/cuadrante">
                  <Play className="mr-2 h-4 w-4" />
                  Test ideológico
                </Link>
              </Button>
              <Button variant="cta" size="lg" className="w-full" asChild>
                <Link href="/registro">Registrarse</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
