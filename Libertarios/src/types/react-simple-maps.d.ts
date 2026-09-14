/**
 * react-simple-maps@3 ships no type declarations and there is no maintained
 * @types package for v3. This covers the surface the app actually uses.
 */
declare module "react-simple-maps" {
  import type { CSSProperties, ComponentType, ReactNode, SVGProps } from "react";

  export interface GeographyFeature {
    rsmKey: string;
    id?: string | number;
    properties?: Record<string, unknown>;
    geometry?: unknown;
    type?: string;
  }

  type GeographyStyle = SVGProps<SVGPathElement>["style"];

  export const ComposableMap: ComponentType<{
    projection?: string;
    projectionConfig?: {
      center?: [number, number];
      rotate?: [number, number, number];
      parallels?: [number, number];
      scale?: number;
    };
    width?: number;
    height?: number;
    className?: string;
    /** El resto de props se pasan al `<svg>`; `style` es el que usamos. */
    style?: CSSProperties;
    children?: ReactNode;
  }>;

  export const ZoomableGroup: ComponentType<{
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    /**
     * Decide qué eventos inician un gesto de zoom o arrastre. Recibe el evento
     * nativo de d3-zoom (rueda, ratón o táctil); si no se pasa, cualquier
     * gesto vale, incluida la rueda sin modificador.
     */
    filterZoomEvent?: (event: WheelEvent | MouseEvent | TouchEvent) => boolean;
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
  }>;

  export const Geographies: ComponentType<{
    geography: string | object;
    children: (args: { geographies: GeographyFeature[] }) => ReactNode;
  }>;

  export const Geography: ComponentType<
    Omit<SVGProps<SVGPathElement>, "style"> & {
      geography: GeographyFeature;
      style?: {
        default?: GeographyStyle;
        hover?: GeographyStyle;
        pressed?: GeographyStyle;
      };
    }
  >;

  export const Marker: ComponentType<{
    coordinates: [number, number];
    children?: ReactNode;
  }>;
}
