import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, Users, Building2, TrendingUp, BookOpen, Video, Newspaper } from "lucide-react";

const educationContent = [
  {
    id: 1,
    type: "video",
    title: "¿Qué es el liberalismo clásico?",
    description: "Una introducción objetiva a los principios fundamentales del liberalismo clásico y su evolución histórica.",
    duration: "12:34",
    category: "Fundamentos",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    type: "video",
    title: "Historia del pensamiento libertario",
    description: "Desde John Locke hasta Murray Rothbard: un recorrido por las figuras clave del movimiento.",
    duration: "18:45",
    category: "Historia",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    type: "article",
    title: "Economía austriaca explicada",
    description: "Los conceptos básicos de la escuela austriaca de economía de forma accesible y neutral.",
    readTime: "8 min",
    category: "Economía",
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    type: "video",
    title: "El papel del Estado: diferentes perspectivas",
    description: "Comparativa objetiva entre minarquismo, anarcocapitalismo y otras corrientes.",
    duration: "15:20",
    category: "Filosofía política",
    thumbnail: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=225&fit=crop",
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
    thumbnail: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    title: "Regulación de criptomonedas en la UE",
    description: "Análisis de la nueva normativa MiCA y cómo afecta a la libertad financiera de los ciudadanos europeos.",
    date: "20 Ene 2026",
    category: "Regulación",
    impact: "medio",
    thumbnail: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    title: "Debate sobre vivienda: análisis de propuestas",
    description: "Comparativa de las diferentes soluciones propuestas para la crisis de vivienda desde múltiples perspectivas ideológicas.",
    date: "18 Ene 2026",
    category: "Vivienda",
    impact: "alto",
    thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=225&fit=crop",
  },
];

const politicalAnalysis = [
  {
    id: 1,
    type: "politician",
    name: "Javier Milei",
    role: "Presidente de Argentina",
    description: "Análisis de su programa económico, medidas implementadas y resultados objetivos hasta la fecha.",
    ideology: "Liberal-libertario",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop",
  },
  {
    id: 2,
    type: "party",
    name: "Partido Libertario (España)",
    role: "Partido político",
    description: "Historia, programa electoral y posicionamiento en el espectro político español.",
    ideology: "Libertario",
    thumbnail: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=225&fit=crop",
  },
  {
    id: 3,
    type: "politician",
    name: "Ron Paul",
    role: "Ex-congresista de EE.UU.",
    description: "Trayectoria política, propuestas económicas y legado en el movimiento libertario estadounidense.",
    ideology: "Paleolibertario",
    thumbnail: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=225&fit=crop",
  },
  {
    id: 4,
    type: "party",
    name: "Ciudadanos (España)",
    role: "Partido político",
    description: "Análisis de su evolución ideológica y posiciones en materia económica y social.",
    ideology: "Liberal",
    thumbnail: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=400&h=225&fit=crop",
  },
];

const impactColors = {
  alto: "bg-destructive/10 text-destructive border-destructive/20",
  medio: "bg-primary/10 text-primary border-primary/20",
  bajo: "bg-muted text-muted-foreground border-border",
};

export function NewsResourcesSection() {
  return (
    <section id="recursos" className="py-24 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Newspaper className="w-3 h-3 mr-1" />
            Recursos y Análisis
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Noticias y Recursos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Contenido educativo, análisis de actualidad y estudios políticos desde una perspectiva
            <span className="text-foreground font-medium"> objetiva y explicativa</span>.
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="educacion" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="educacion" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Educación</span>
            </TabsTrigger>
            <TabsTrigger value="noticias" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Análisis Noticias</span>
            </TabsTrigger>
            <TabsTrigger value="politico" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Análisis Político</span>
            </TabsTrigger>
          </TabsList>

          {/* Education Tab */}
          <TabsContent value="educacion" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {educationContent.map((item) => (
                <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.type === "video" ? (
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    <Badge className="absolute top-2 left-2 bg-background/90 text-foreground text-xs">
                      {item.category}
                    </Badge>
                    {item.type === "video" && (
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                        {item.duration}
                      </span>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      {item.type === "video" ? (
                        <Video className="w-4 h-4 text-primary" />
                      ) : (
                        <FileText className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {item.type === "video" ? "Video" : `Lectura ${item.readTime}`}
                      </span>
                    </div>
                    <CardTitle className="text-base line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 text-sm">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News Analysis Tab */}
          <TabsContent value="noticias" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsAnalysis.map((item) => (
                <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge className="bg-background/90 text-foreground text-xs">
                        {item.category}
                      </Badge>
                      <Badge className={`text-xs border ${impactColors[item.impact as keyof typeof impactColors]}`}>
                        Impacto {item.impact}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                      <Newspaper className="w-3 h-3" />
                      {item.date}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Political Analysis Tab */}
          <TabsContent value="politico" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {politicalAnalysis.map((item) => (
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
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base group-hover:text-primary transition-colors">
                        {item.name}
                      </CardTitle>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardDescription className="line-clamp-2 text-sm">
                      {item.description}
                    </CardDescription>
                    <Badge variant="outline" className="text-xs">
                      {item.ideology}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
