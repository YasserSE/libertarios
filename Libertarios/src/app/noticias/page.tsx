"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Play, FileText, Users, Building2, TrendingUp, BookOpen, Video, Newspaper, 
  Search, Filter, Clock, Eye, ArrowRight, Calendar, Tag, ExternalLink
} from "lucide-react";

// Extended content data
const educationContent = [
  {
    id: 1,
    type: "video",
    title: "¿Qué es el liberalismo clásico?",
    description: "Una introducción objetiva a los principios fundamentales del liberalismo clásico y su evolución histórica desde John Locke hasta la actualidad.",
    duration: "12:34",
    category: "Fundamentos",
    views: 15420,
    date: "15 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    type: "video",
    title: "Historia del pensamiento libertario",
    description: "Desde John Locke hasta Murray Rothbard: un recorrido por las figuras clave del movimiento libertario a lo largo de la historia.",
    duration: "18:45",
    category: "Historia",
    views: 12350,
    date: "12 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    type: "article",
    title: "Economía austriaca explicada",
    description: "Los conceptos básicos de la escuela austriaca de economía de forma accesible y neutral. Mises, Hayek y la crítica al intervencionismo.",
    readTime: "8 min",
    category: "Economía",
    views: 8920,
    date: "10 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    type: "video",
    title: "El papel del Estado: diferentes perspectivas",
    description: "Comparativa objetiva entre minarquismo, anarcocapitalismo y otras corrientes de pensamiento sobre el rol del Estado.",
    duration: "15:20",
    category: "Filosofía política",
    views: 10230,
    date: "8 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=225&fit=crop",
  },
  {
    id: 5,
    type: "article",
    title: "La propiedad privada como derecho fundamental",
    description: "Análisis filosófico y económico de la propiedad privada como base de la libertad individual y el progreso social.",
    readTime: "12 min",
    category: "Filosofía",
    views: 7650,
    date: "5 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=225&fit=crop",
  },
  {
    id: 6,
    type: "video",
    title: "Crítica al intervencionismo económico",
    description: "¿Por qué las políticas intervencionistas suelen tener efectos no deseados? Análisis con ejemplos históricos.",
    duration: "22:10",
    category: "Economía",
    views: 9840,
    date: "3 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
  },
  {
    id: 7,
    type: "article",
    title: "Bastiat y la falacia de la ventana rota",
    description: "Explicación del famoso concepto económico de Frédéric Bastiat y su relevancia para entender las políticas públicas.",
    readTime: "6 min",
    category: "Economía",
    views: 6780,
    date: "1 Ene 2026",
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=225&fit=crop",
  },
  {
    id: 8,
    type: "video",
    title: "Libertad de expresión: límites y debates",
    description: "¿Dónde terminan los límites de la libertad de expresión? Perspectivas desde el liberalismo clásico.",
    duration: "14:55",
    category: "Derechos",
    views: 11200,
    date: "28 Dic 2025",
    thumbnail: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400&h=225&fit=crop",
  },
];

const newsAnalysis = [
  {
    id: 1,
    title: "Análisis: Nueva reforma fiscal en España",
    description: "Desglose objetivo de la propuesta de reforma tributaria y sus implicaciones económicas según diferentes escuelas de pensamiento.",
    date: "22 Ene 2026",
    category: "Economía",
    impact: "alto",
    views: 18500,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "Regulación de criptomonedas en la UE",
    description: "Análisis de la nueva normativa MiCA y cómo afecta a la libertad financiera de los ciudadanos europeos.",
    date: "20 Ene 2026",
    category: "Regulación",
    impact: "medio",
    views: 14200,
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "Debate sobre vivienda: análisis de propuestas",
    description: "Comparativa de las diferentes soluciones propuestas para la crisis de vivienda desde múltiples perspectivas ideológicas.",
    date: "18 Ene 2026",
    category: "Vivienda",
    impact: "alto",
    views: 21300,
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    title: "Ley de control de precios: consecuencias históricas",
    description: "Análisis de casos históricos de control de precios y sus efectos en la economía real.",
    date: "15 Ene 2026",
    category: "Economía",
    impact: "alto",
    views: 16700,
    thumbnail: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=225&fit=crop",
  },
  {
    id: 5,
    title: "Nueva ley de libertad de prensa en Europa",
    description: "¿Protege realmente la libertad de expresión? Análisis objetivo del nuevo marco regulatorio europeo.",
    date: "12 Ene 2026",
    category: "Libertades",
    impact: "medio",
    views: 9800,
    thumbnail: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=225&fit=crop",
  },
  {
    id: 6,
    title: "Inflación en Argentina: lecciones para España",
    description: "Análisis comparativo de las políticas monetarias y sus efectos en ambos países.",
    date: "10 Ene 2026",
    category: "Economía",
    impact: "medio",
    views: 12400,
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=225&fit=crop",
  },
];

const politicalAnalysis = [
  {
    id: 1,
    type: "politician",
    name: "Javier Milei",
    role: "Presidente de Argentina",
    country: "Argentina",
    description: "Análisis de su programa económico, medidas implementadas y resultados objetivos hasta la fecha. La 'motosierra' al gasto público.",
    ideology: "Liberal-libertario",
    views: 45600,
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    type: "party",
    name: "Partido Libertario (España)",
    role: "Partido político",
    country: "España",
    description: "Historia, programa electoral y posicionamiento en el espectro político español. Propuestas y evolución.",
    ideology: "Libertario",
    views: 18900,
    thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    type: "politician",
    name: "Ron Paul",
    role: "Ex-congresista de EE.UU.",
    country: "Estados Unidos",
    description: "Trayectoria política, propuestas económicas y legado en el movimiento libertario estadounidense.",
    ideology: "Paleolibertario",
    views: 32100,
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    type: "party",
    name: "Ciudadanos (España)",
    role: "Partido político",
    country: "España",
    description: "Análisis de su evolución ideológica y posiciones en materia económica y social a lo largo de los años.",
    ideology: "Liberal",
    views: 14500,
    thumbnail: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=400&h=225&fit=crop",
  },
  {
    id: 5,
    type: "politician",
    name: "Margaret Thatcher",
    role: "Ex-Primera Ministra de UK",
    country: "Reino Unido",
    description: "El thatcherismo: reformas económicas, privatizaciones y su impacto en la economía británica.",
    ideology: "Liberal conservador",
    views: 28700,
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=225&fit=crop",
  },
  {
    id: 6,
    type: "party",
    name: "Libertarian Party (USA)",
    role: "Partido político",
    country: "Estados Unidos",
    description: "Historia del tercer partido más grande de EE.UU., sus candidatos y evolución programática.",
    ideology: "Libertario",
    views: 21300,
    thumbnail: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=225&fit=crop",
  },
];

const impactColors = {
  alto: "bg-destructive/10 text-destructive border-destructive/20",
  medio: "bg-primary/10 text-primary border-primary/20",
  bajo: "bg-muted text-muted-foreground border-border",
};

const categories = {
  educacion: ["Todos", "Fundamentos", "Historia", "Economía", "Filosofía", "Derechos"],
  noticias: ["Todos", "Economía", "Regulación", "Vivienda", "Libertades"],
  politico: ["Todos", "Político", "Partido"],
};

export default function NoticiasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [activeTab, setActiveTab] = useState("educacion");

  const filterContent = <T extends { title?: string; name?: string; category?: string; type?: string }>(
    items: T[],
    searchField: keyof T
  ): T[] => {
    return items.filter((item) => {
      const matchesSearch = searchQuery === "" || 
        String(item[searchField]).toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "Todos" || 
        item.category === activeCategory ||
        (item.type && item.type.toLowerCase() === activeCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setActiveCategory("Todos");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                <Newspaper className="w-3 h-3 mr-1" />
                Recursos y Análisis
              </Badge>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Noticias y Recursos
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Contenido educativo, análisis de actualidad y estudios políticos desde una perspectiva
                <span className="text-foreground font-medium"> objetiva, explicativa y neutral</span>.
              </p>
              
              {/* Search bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar contenido..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 text-lg rounded-xl bg-card border-border"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 h-14">
                <TabsTrigger value="educacion" className="flex items-center gap-2 h-full text-base">
                  <BookOpen className="w-5 h-5" />
                  <span>Educación</span>
                </TabsTrigger>
                <TabsTrigger value="noticias" className="flex items-center gap-2 h-full text-base">
                  <TrendingUp className="w-5 h-5" />
                  <span>Noticias</span>
                </TabsTrigger>
                <TabsTrigger value="politico" className="flex items-center gap-2 h-full text-base">
                  <Users className="w-5 h-5" />
                  <span>Político</span>
                </TabsTrigger>
              </TabsList>

              {/* Category filters */}
              <div className="flex items-center gap-2 flex-wrap justify-center mb-8">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {categories[activeTab as keyof typeof categories].map((cat) => (
                  <Button
                    key={cat}
                    variant={activeCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(cat)}
                    className="rounded-full"
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {/* Education Tab */}
              <TabsContent value="educacion" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterContent(educationContent, "title").map((item) => (
                    <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            {item.type === "video" ? (
                              <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                            ) : (
                              <FileText className="w-6 h-6 text-primary-foreground" />
                            )}
                          </div>
                        </div>
                        <Badge className="absolute top-2 left-2 bg-background/90 text-foreground text-xs">
                          {item.category}
                        </Badge>
                        {item.type === "video" && item.duration && (
                          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                            {item.duration}
                          </span>
                        )}
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <div className="flex items-center gap-2">
                            {item.type === "video" ? (
                              <Video className="w-3 h-3" />
                            ) : (
                              <FileText className="w-3 h-3" />
                            )}
                            <span>{item.type === "video" ? "Video" : `${item.readTime} lectura`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </div>
                        </div>
                        <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 text-sm mb-3">
                          {item.description}
                        </CardDescription>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filterContent(educationContent, "title").length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No se encontraron resultados para tu búsqueda.</p>
                  </div>
                )}
              </TabsContent>

              {/* News Analysis Tab */}
              <TabsContent value="noticias" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterContent(newsAnalysis, "title").map((item) => (
                    <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex gap-2">
                          <Badge className="bg-background/90 text-foreground text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {item.category}
                          </Badge>
                          <Badge className={`text-xs border ${impactColors[item.impact as keyof typeof impactColors]}`}>
                            Impacto {item.impact}
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {item.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-3 mb-4">
                          {item.description}
                        </CardDescription>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary">
                          Leer análisis completo
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filterContent(newsAnalysis, "title").length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No se encontraron resultados para tu búsqueda.</p>
                  </div>
                )}
              </TabsContent>

              {/* Political Analysis Tab */}
              <TabsContent value="politico" className="mt-0">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterContent(politicalAnalysis, "name").map((item) => (
                    <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                      <div className="relative aspect-video overflow-hidden bg-muted">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-2 left-2 bg-background/90 text-foreground text-xs">
                          {item.type === "politician" ? (
                            <><Users className="w-3 h-3 mr-1" /> Político</>
                          ) : (
                            <><Building2 className="w-3 h-3 mr-1" /> Partido</>
                          )}
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-background/90 text-foreground text-xs">
                          {item.country}
                        </Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {item.name}
                          </CardTitle>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Eye className="w-3 h-3" />
                            {item.views.toLocaleString()}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.role}</p>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <CardDescription className="line-clamp-2">
                          {item.description}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {item.ideology}
                          </Badge>
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:text-primary">
                            Ver perfil
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {filterContent(politicalAnalysis, "name").length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No se encontraron resultados para tu búsqueda.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            {/* Load more */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Cargar más contenido
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-card border-t border-border">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Mantente informado
              </h2>
              <p className="text-muted-foreground mb-6">
                Recibe análisis y recursos educativos directamente en tu correo. Sin spam, solo contenido de valor.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  className="h-12"
                />
                <Button variant="cta" size="lg" className="h-12">
                  Suscribirse
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
