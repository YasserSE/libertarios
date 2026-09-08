import { ImageResponse } from "next/og";

/**
 * La imagen que aparece al compartir un enlace del sitio.
 *
 * Se dibuja aquí en vez de servir un PNG estático porque así no hay un archivo
 * binario que mantener sincronizado con la marca, y porque el cuadrante es
 * exactamente lo que el proyecto quiere que se vea en la vista previa: dos ejes
 * y un hueco arriba a la derecha, que es la tesis entera en un vistazo.
 */
export const alt =
  "Libertarios.eu — el cuadrante de dos ejes, con el cuadrante libertario destacado";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f7f9f8",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#2f7d63",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              L
            </div>
            <div style={{ fontSize: 28, color: "#3d4a45", fontWeight: 600 }}>Libertarios.eu</div>
          </div>

          <div style={{ fontSize: 62, fontWeight: 800, color: "#101a16", lineHeight: 1.05 }}>
            Somos más
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, color: "#2f7d63", lineHeight: 1.05 }}>
            de los que parecemos.
          </div>
          <div style={{ fontSize: 27, color: "#54635c", marginTop: 26, maxWidth: 520, lineHeight: 1.35 }}>
            El mapa que cuenta a quienes creen que debería existir una alternativa liberal en
            España.
          </div>
        </div>

        {/* El cuadrante, con el vértice libertario marcado. El rótulo va dentro
            de su celda y no colocado a mano: posicionado en absoluto quedaba a
            caballo entre dos cuadrantes. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 420,
              height: 420,
              display: "flex",
              flexWrap: "wrap",
              borderRadius: 24,
              overflow: "hidden",
              border: "2px solid #dfe6e2",
            }}
          >
            <div style={{ width: "50%", height: "50%", background: "#eaf1fb", display: "flex" }} />
            <div
              style={{
                width: "50%",
                height: "50%",
                background: "#2f7d63",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Libertario
            </div>
            <div style={{ width: "50%", height: "50%", background: "#fbeceb", display: "flex" }} />
            <div style={{ width: "50%", height: "50%", background: "#eef0ef", display: "flex" }} />
          </div>
        </div>
      </div>
    ),
    size,
  );
}
