"use client";

import { useMemo, useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InteractiveQuadrant } from "./InteractiveQuadrant";
import { mockUsers } from "@/data/mockRegisteredUsers";
import { RotateCcw, Share2, Users, ArrowRight, UserPlus, Twitter, Facebook, Link2, Check, Download } from "lucide-react";
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
}

export function QuadrantResults({ economic, social, onReset }: QuadrantResultsProps) {
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  const analysis = useMemo(() => {
    // Determine quadrant
    let quadrant = "";
    let description = "";
    let emoji = "";
    
    if (economic >= 0 && social >= 0) {
      quadrant = "Libertario";
      emoji = "🗽";
      description = "Apoyas tanto la libertad económica como la libertad social. Crees en la autonomía individual, la responsabilidad personal y la mínima intervención del Estado en todos los aspectos de la vida.";
    } else if (economic < 0 && social >= 0) {
      quadrant = "Liberal social";
      emoji = "🌈";
      description = "Apoyas la libertad social pero prefieres cierta intervención económica del Estado. Valoras los derechos individuales en lo personal mientras favoreces políticas redistributivas.";
    } else if (economic < 0 && social < 0) {
      quadrant = "Autoritario de izquierda";
      emoji = "🔴";
      description = "Favoreces tanto la intervención económica como el control social por parte del Estado. Priorizas la igualdad colectiva sobre las libertades individuales.";
    } else {
      quadrant = "Autoritario de derecha";
      emoji = "🔵";
      description = "Apoyas el libre mercado pero con controles sociales más estrictos. Combinas libertad económica con valores tradicionales y orden social.";
    }
    
    // Calculate percentile
    const similarUsers = mockUsers.filter(u => {
      const dist = Math.sqrt(Math.pow(u.economic - economic, 2) + Math.pow(u.social - social, 2));
      return dist < 30;
    });
    const percentile = Math.round((similarUsers.length / mockUsers.length) * 100);
    
    // Calculate average distance from user
    const avgDistance = mockUsers.reduce((sum, u) => {
      return sum + Math.sqrt(Math.pow(u.economic - economic, 2) + Math.pow(u.social - social, 2));
    }, 0) / mockUsers.length;
    
    const closeness = avgDistance < 40 ? "cercana" : avgDistance < 60 ? "moderada" : "diferente";
    
    return { quadrant, description, percentile, similarUsers: similarUsers.length, closeness, emoji };
  }, [economic, social]);

  const shareText = `${analysis.emoji} Mi resultado en el test ideológico: ${analysis.quadrant}\n\n📊 Libertad económica: ${economic > 0 ? '+' : ''}${economic}\n🗽 Libertad social: ${social > 0 ? '+' : ''}${social}\n\n¿Dónde te sitúas tú? Haz el test:`;
  
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/cuadrante` : '';

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
          <span className="text-xl">{analysis.emoji}</span>
          {analysis.quadrant}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
          Tus resultados
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {analysis.description}
        </p>
      </div>
      
      {/* Score cards */}
      <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-sm text-muted-foreground mb-1">Libertad económica</div>
          <div className={`font-display text-3xl font-bold ${economic >= 0 ? 'text-primary' : 'text-muted-foreground'}`}>
            {economic > 0 ? '+' : ''}{economic}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {economic >= 50 ? 'Muy libre' : economic >= 0 ? 'Moderadamente libre' : economic >= -50 ? 'Moderadamente intervencionista' : 'Muy intervencionista'}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="text-sm text-muted-foreground mb-1">Libertad social</div>
          <div className={`font-display text-3xl font-bold ${social >= 0 ? 'text-primary' : 'text-muted-foreground'}`}>
            {social > 0 ? '+' : ''}{social}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {social >= 50 ? 'Muy liberal' : social >= 0 ? 'Moderadamente liberal' : social >= -50 ? 'Moderadamente conservador' : 'Muy conservador'}
          </div>
        </div>
      </div>
      
      {/* Quadrant visualization */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
        <InteractiveQuadrant 
          userPosition={{ economic, social }}
          showAllUsers={true}
        />
      </div>
      
      {/* Comparison stats */}
      <div className="bg-accent/50 border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">
            Comparación con otros simpatizantes
          </h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-display text-2xl font-bold text-primary">{analysis.similarUsers}</div>
            <div className="text-sm text-muted-foreground">personas con posición similar</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-foreground">{analysis.percentile}%</div>
            <div className="text-sm text-muted-foreground">de coincidencia cercana</div>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-foreground capitalize">{analysis.closeness}</div>
            <div className="text-sm text-muted-foreground">a la media del grupo</div>
          </div>
        </div>
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
            <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center text-2xl flex-shrink-0">
              {analysis.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-foreground mb-1">
                Mi resultado: {analysis.quadrant}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="text-muted-foreground">
                  💰 Económica: <span className={economic >= 0 ? 'text-primary font-medium' : 'text-muted-foreground'}>{economic > 0 ? '+' : ''}{economic}</span>
                </span>
                <span className="text-muted-foreground">
                  🗽 Social: <span className={social >= 0 ? 'text-primary font-medium' : 'text-muted-foreground'}>{social > 0 ? '+' : ''}{social}</span>
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

      {/* Registration CTA */}
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
