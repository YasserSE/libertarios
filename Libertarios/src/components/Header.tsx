"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Navigation grouped into four slots.
 *
 * The flat list of eight links wrapped onto two rows at every viewport below
 * ~1500px, so the related pages now sit behind two menus. `children` marks a
 * group; a bare `href` is a direct link.
 */
type NavEntry =
  | { label: string; href: string }
  | { label: string; children: { label: string; href: string; description: string }[] };

const NAV: NavEntry[] = [
  {
    label: "Mapas",
    children: [
      { label: "Europa", href: "/", description: "Simpatizantes país a país" },
      { label: "España", href: "/spain", description: "Detalle por provincia" },
      { label: "Datos y gráficos", href: "/datos", description: "Demografía y cuadrante" },
    ],
  },
  { label: "Test ideológico", href: "/cuadrante" },
  {
    label: "Aprende",
    children: [
      {
        label: "¿Qué es ser libertario?",
        href: "/libertario",
        description: "Ideas base, sin etiquetas",
      },
      { label: "Comparativas", href: "/comparativas", description: "Frente a otras corrientes" },
      { label: "Recursos", href: "/noticias", description: "Dónde leer sobre esto" },
    ],
  },
  { label: "El proyecto", href: "/proyecto" },
];

/** Flat list of every destination, for the mobile drawer. */
const MOBILE_GROUPS: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: "Mapas",
    items: [
      { label: "Europa", href: "/" },
      { label: "España", href: "/spain" },
      { label: "Datos y gráficos", href: "/datos" },
    ],
  },
  {
    title: "Aprende",
    items: [
      { label: "¿Qué es ser libertario?", href: "/libertario" },
      { label: "Comparativas", href: "/comparativas" },
      { label: "Recursos", href: "/noticias" },
    ],
  },
  {
    title: "Más",
    items: [
      { label: "Test ideológico", href: "/cuadrante" },
      { label: "El proyecto", href: "/proyecto" },
    ],
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // The hero is a map that runs under the header; keeping the bar transparent
  // until the page scrolls lets it read as part of the map rather than a lid.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setIsMenuOpen(false), [pathname]);

  // A drawer that scrolls the page behind it is a classic mobile annoyance.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const groupActive = (entry: NavEntry) =>
    "children" in entry ? entry.children.some((c) => isActive(c.href)) : isActive(entry.href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-lg"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Libertarios.eu — inicio"
          >
            <span className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <span className="font-display text-sm font-bold text-primary-foreground">L</span>
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Libertarios
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-0.5 lg:flex">
            {NAV.map((entry) =>
              "children" in entry ? (
                <DropdownMenu key={entry.label}>
                  <DropdownMenuTrigger
                    className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[state=open]:bg-accent ${
                      groupActive(entry) ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {entry.label}
                    <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 [[data-state=open]>&]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-1.5">
                    {entry.children.map((child) => (
                      <DropdownMenuItem key={child.href} asChild className="cursor-pointer p-0">
                        {/*
                          `asChild` concatenates the Item's classes onto the Link
                          without running them through tailwind-merge, so an
                          `items-start` here would race the Item's own
                          `items-center`. Wrapping the text in one full-width
                          block sidesteps the conflict entirely: the Link stays a
                          row, and alignment stops depending on CSS source order.
                        */}
                        <Link href={child.href} className="w-full rounded-md px-3 py-2.5">
                          <span className="block w-full">
                            <span
                              className={`block text-sm font-medium ${
                                isActive(child.href) ? "text-primary" : "text-foreground"
                              }`}
                            >
                              {child.label}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              {child.description}
                            </span>
                          </span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={entry.href}
                  href={entry.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive(entry.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button variant="outline" size="sm" asChild>
              <Link href="/cuadrante">
                <Play className="h-3.5 w-3.5" />
                Hacer el test
              </Link>
            </Button>
            <Button variant="cta" size="sm" asChild>
              <Link href="/registro">Registrarme</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
        >
          <nav aria-label="Principal (móvil)" className="container space-y-6 py-6">
            {MOBILE_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.title}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium transition-colors hover:bg-accent ${
                      isActive(item.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}

            <div className="space-y-2 border-t border-border pt-5">
              <Button variant="outline" size="lg" className="w-full" asChild>
                <Link href="/cuadrante">
                  <Play className="h-4 w-4" />
                  Hacer el test
                </Link>
              </Button>
              <Button variant="cta" size="lg" className="w-full" asChild>
                <Link href="/registro">Registrarme</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
