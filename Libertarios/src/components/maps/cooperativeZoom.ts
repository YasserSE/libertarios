/**
 * Qué gestos mueven el mapa, y cuáles se quedan para la página.
 *
 * Con el filtro por defecto de d3-zoom, la rueda del ratón sobre el mapa hacía
 * zoom en vez de bajar la página, y en el móvil un dedo que bajaba por la
 * portada se quedaba atrapado arrastrando la península: el hero era una trampa
 * de scroll de 22 rem. La convención de los mapas embebidos es la contraria y
 * es la que se aplica aquí: rueda con Ctrl/⌘ (que es también lo que envía el
 * pellizco del trackpad), dos dedos en táctil, y el arrastre con el botón
 * principal del ratón, que no compite con nada.
 */
export function cooperativeZoom(event: WheelEvent | MouseEvent | TouchEvent): boolean {
  if (!event) return false;
  if (event.type === "wheel") return event.ctrlKey || event.metaKey;
  if (event.type.startsWith("touch")) return (event as TouchEvent).touches.length >= 2;
  return !event.ctrlKey && !("button" in event && event.button);
}
