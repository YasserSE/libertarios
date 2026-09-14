"use client";

import { useEffect, useState } from "react";

export type GeoStatus = "loading" | "ready" | "error";

/*
 * Una sola descarga por fichero, compartida entre todos los mapas montados.
 *
 * El mapa de España dibuja la península y el recuadro de Canarias con dos
 * `ComposableMap` distintos que leen el mismo TopoJSON; sin caché eran dos
 * peticiones y dos parseos del mismo medio megabyte.
 */
const CACHE = new Map<string, Promise<object>>();

function load(url: string): Promise<object> {
  let pending = CACHE.get(url);
  if (!pending) {
    pending = fetch(url).then((response) => {
      if (!response.ok) throw new Error(`${url}: ${response.status}`);
      return response.json() as Promise<object>;
    });
    // Un fallo no se queda cacheado: la siguiente vez que alguien monte el mapa
    // se vuelve a intentar, que es lo que hace falta tras un corte de red.
    pending.catch(() => CACHE.delete(url));
    CACHE.set(url, pending);
  }
  return pending;
}

/**
 * El TopoJSON de un mapa, con su estado de carga a la vista.
 *
 * `Geographies` de react-simple-maps acepta una URL y la descarga por su cuenta,
 * pero mientras tanto no pinta nada y, si la descarga falla, lo escribe en la
 * consola y deja el marco vacío para siempre —así es como el mapa de España
 * estuvo un tiempo en blanco sin que nadie lo notara—. Descargándolo aquí, el
 * componente sabe si está cargando o si ha fallado y puede decirlo.
 */
export function useGeoJson(url: string): { data: object | null; status: GeoStatus } {
  const [state, setState] = useState<{ data: object | null; status: GeoStatus }>({
    data: null,
    status: "loading",
  });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, status: "loading" });
    load(url).then(
      (data) => !cancelled && setState({ data, status: "ready" }),
      () => !cancelled && setState({ data: null, status: "error" }),
    );
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
