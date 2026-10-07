/**
 * Interruptor del boletín en la interfaz.
 *
 * Mientras no haya cuenta de Brevo ni migración 0011 aplicada, el formulario
 * diría «te hemos enviado un correo» sin enviar nada. Por eso solo se muestra
 * cuando se activa a propósito con `NEXT_PUBLIC_NEWSLETTER_ENABLED=1` en el
 * despliegue, después de configurar Brevo (ver AFINIDAD-ESTADO.md).
 */
export function isNewsletterEnabled(): boolean {
  return process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === "1";
}
