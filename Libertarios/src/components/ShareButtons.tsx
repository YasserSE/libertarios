"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Link2, Check } from "lucide-react";
import { toast } from "sonner";

/**
 * Botones de compartir (X, Facebook, WhatsApp, Telegram, copiar y compartir
 * nativo).
 *
 * Extraídos de `QuadrantResults` para que el cuadrante y «¿A quién votar?»
 * compartan una sola implementación: lo que cambia entre los dos es qué enlace
 * y qué texto se comparten, no cómo. Los textos por defecto son exactamente los
 * que tenía el cuadrante, para que extraerlo no cambie nada allí; el módulo de
 * afinidad pasa los suyos traducidos.
 */

export type ShareChannel = "twitter" | "facebook" | "whatsapp" | "telegram" | "copy" | "native";

export interface ShareButtonsLabels {
  copy: string;
  copied: string;
  share: string;
  copiedToast: string;
  copyError: string;
  shareError: string;
}

const DEFAULT_LABELS: ShareButtonsLabels = {
  copy: "Copiar enlace",
  copied: "¡Copiado!",
  share: "Compartir",
  copiedToast: "¡Enlace copiado al portapapeles!",
  copyError: "No se pudo copiar el enlace",
  shareError: "Error al compartir",
};

export interface ShareButtonsProps {
  /** Enlace que se comparte. */
  url: string;
  /** Texto que acompaña al enlace. */
  text: string;
  /** Título para el diálogo nativo de compartir. */
  title: string;
  labels?: Partial<ShareButtonsLabels>;
  /**
   * Se llama al pulsar cada canal. Sirve para la analítica sin cookies del
   * módulo de afinidad (`share_{canal}`) sin que este componente la conozca.
   */
  onShare?: (channel: ShareChannel) => void;
}

export function ShareButtons({ url, text, title, labels, onShare }: ShareButtonsProps) {
  const l = { ...DEFAULT_LABELS, ...labels };
  const [copied, setCopied] = useState(false);
  /*
   * Si el navegador sabe compartir se mira tras montar, no al pintar: en el
   * servidor no hay `navigator`, y decidirlo durante el render daba un HTML
   * distinto al del cliente (error de hidratación en el resultado de
   * «¿A quién votar?», que se pinta en el servidor con la URL ya leída).
   */
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator !== "undefined" && "share" in navigator), []);

  const handleCopyLink = async () => {
    onShare?.("copy");
    try {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      toast.success(l.copiedToast);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error(l.copyError);
    }
  };

  const handleShareTwitter = () => {
    onShare?.("twitter");
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, "_blank", "width=550,height=420");
  };

  const handleShareFacebook = () => {
    onShare?.("facebook");
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, "_blank", "width=550,height=420");
  };

  const handleShareWhatsApp = () => {
    onShare?.("whatsapp");
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareTelegram = () => {
    onShare?.("telegram");
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      onShare?.("native");
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        // Cancelar el diálogo no es un error que haya que enseñar.
        if ((err as Error).name !== "AbortError") {
          toast.error(l.shareError);
        }
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button variant="outline" className="flex items-center gap-2 h-12" onClick={handleShareTwitter}>
          <Twitter className="w-4 h-4" />
          <span className="hidden sm:inline">Twitter</span>
          <span className="sm:hidden">X</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-12" onClick={handleShareFacebook}>
          <Facebook className="w-4 h-4" />
          <span>Facebook</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-12" onClick={handleShareWhatsApp}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp</span>
        </Button>
        <Button variant="outline" className="flex items-center gap-2 h-12" onClick={handleShareTelegram}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
          </svg>
          <span>Telegram</span>
        </Button>
      </div>

      <div className="mt-4 flex gap-3">
        <Button variant="secondary" className="flex-1 h-12" onClick={handleCopyLink}>
          {copied ? <Check className="w-4 h-4 mr-2" /> : <Link2 className="w-4 h-4 mr-2" />}
          {copied ? l.copied : l.copy}
        </Button>
        {canShare && (
          <Button variant="cta" className="flex-1 h-12" onClick={handleNativeShare}>
            <Share2 className="w-4 h-4 mr-2" />
            {l.share}
          </Button>
        )}
      </div>
    </>
  );
}
