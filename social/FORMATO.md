# Formato «Papeleta»: Reels y carruseles de libertarios.eu

Formato cerrado el 9-10-2026. Sirve para replicar los vídeos de Instagram «Si el 29-N votas a X, ¿qué te cambia?» y su carrusel. Todo sale de los datos del test «¿A quién votar?» (`Libertarios/public/afinidad/datos-*.json`). Este documento explica qué es cada pieza y cómo hacer una nueva.

## 1. Piezas

| Pieza | Tamaño | Composición | Salida |
|---|---|---|---|
| Reel de partido | 1080×1920, 30 fps, ~60–85 s | `reel-<partido>` | `out/final/libertarios-reel-<partido>.mp4` |
| Carrusel de partido | 1080×1350, 7–9 imágenes | `post-<partido>` | `out/final/post-<partido>/NN.png` |
| Reel de presentación | 1080×1920, ~47 s | `reel-intro` | `out/final/libertarios-reel-intro.mp4` |
| Carrusel de presentación | 1080×1350, 6 imágenes | `post-intro` | `out/final/post-intro/NN.png` |

## 2. Estructura del Reel de partido

1. **Gancho.** «Si el 29-N votas…», una fila de papeleta con la casilla marcada (siglas sobre el color del partido, nunca su logo) y «¿QUÉ TE CAMBIA?».
2. **Cuatro capítulos, iguales para todos los partidos** (`src/chapters.ts`). Cada uno está fijado a una pregunta del test:
   - SUELDO → `irpf-inflacion`
   - CASA → `vivienda-tope-alquiler`
   - TRABAJO → `jornada-37-5`
   - PAÍS → `inmigracion-competencias-cataluna`

   Cada capítulo tiene hasta tres beats:
   1. **▸ EN SU PROGRAMA.** La cita literal, con su página. Si el partido no tiene posición, se muestra «Sin posición».
   2. **▸ EN EL CONGRESO.** Qué se votó y cuándo, con un sello «VOTÓ SÍ/NO».
   3. **▸ DIJO / HIZO.** Solo aparece si hay una entrada real de «Dijeron vs. hicieron» del mismo tema. Lleva:
      - la tarjeta «Lo que dijeron»;
      - «↓ N días después»;
      - la tarjeta «Lo que hicieron»;
      - el sello del veredicto;
      - la nota de matiz, si la hay.
3. **Cierre, igual en todos.** «¿Quieres saber más?», una tarjeta de navegador «libertarios.eu → ¿A quién votar?», «↗ LINK EN LA BIO» y «Test neutral · gratis · no pedimos el voto».

El carrusel usa las mismas pantallas, congeladas en su estado final. Lleva:
- una portada;
- por cada capítulo, una imagen con programa y voto, y otra con «Dijo / hizo» si la hay;
- un cierre.

Abajo se ven puntos de página y «DESLIZA →».

## 3. Diseño

- **Fondo:** verde azulado `#119e83` con rayas diagonales suaves.
- **Hoja:** una papeleta crema `#f4f1e8` con borde de tinta `#141a24` de 6 px y sombra dura abajo a la izquierda.
- **Cabecera de la hoja:** «L · PAPELETA · GENERALES», más las siglas del partido a la derecha, sobre una línea discontinua de «papeleta troquelada».
- **Progreso:** una fila de casillas en el borde inferior de la hoja (SUELDO · CASA · TRABAJO · PAÍS · ¿Y TÚ?). La actual va en menta `#c9f2e7` y las hechas, en tinta con ✓.
- **Subtítulos:** una franja negra bajo la hoja, tipo karaoke. Lo ya dicho va en crema, la palabra actual sobre una etiqueta menta y lo que falta, atenuado. La franja deja libre la zona inferior, donde Instagram pone su interfaz.
- **Personaje:** la «L» con ojos se asoma por el borde superior y salta cuando cae un sello. En el cierre aparece de pie, señalando.
- **Tipografías:**
  - Space Grotesk 700 para titulares y texto.
  - JetBrains Mono para etiquetas, fechas y fuentes.
- **Sellos:** borde de tinta, fondo menta, girados entre −10° y +6°. Caen grandes y se asientan con un muelle.

## 4. Voz

- **Voz:** ElevenLabs, «Cristina» (`1CeqBeXMOqCleeQjfYfO`), acento peninsular, modelo `eleven_multilingual_v2`, velocidad 1,15.
- **Tiempos:** se usa el endpoint `/with-timestamps`, que da el tiempo de cada carácter. De ahí salen los subtítulos y los cortes.
- **Duración:** cada beat dura 0,12 s de respiro, más la voz, más 0,3 s. Nunca baja de lo que se tarda en leer lo que hay en pantalla.
- **Pronunciación:** solo en la voz, nunca en los subtítulos. IRPF → «i erre pe efe», PP → «pepé», PSOE → «pesóe», 37,5 → «treinta y siete y media» (en `scripts/tts.ts`).
- **Qué dice la voz:** la gente no lee, así que **la voz cuenta en llano lo que hay en pantalla**. El dato literal se queda en pantalla como respaldo.
  - **Programa** (`src/voice.ts`): resumen de la cita, sin añadir nada que no diga. Ejemplo: «En su programa promete derogar la ley de vivienda».
  - **Voto:** siempre junto a lo que se votaba. Ejemplo: «votó sí a devolver al Gobierno la ley de la jornada…». Un «votó sí» suelto engaña.
  - **Dijo / hizo** (campo `voice` en `src/dvh-map.ts`): quién lo dijo y cuándo, qué pasó después y el veredicto. Sin adjetivos.
  - **Cierre:** invitar al test y decir «Tienes el enlace en la bio».

## 5. Reglas de datos (no negociables)

- **No se inventa nada** (`Libertarios/docs/AFINIDAD-DATOS.md` §0). Si falta un dato, falta en el vídeo («Sin posición», «No tenía escaño»).
- **Citas literales.** Si se recortan, los cortes van con «[…]» y cada trozo tiene que estar tal cual en el original.
- **Veredictos** con las etiquetas de `Libertarios/src/i18n/afinidad/dvh.ts`: Cumple, Contradice, Parcial y No lo hicieron. Nunca «miente».
- **Sin logos ni retratos** (`Libertarios/docs/REFERENCIAS.md`).
- **Neutralidad.** Misma plantilla, mismos capítulos y misma regla para elegir «dijo / hizo» en todos los partidos:
  - solo entradas del mismo tema que el capítulo;
  - si hay una con `questionId` igual a la pregunta del capítulo, va esa;
  - si no hay ninguna, el beat no se rellena con otra cosa.
- **Revisión humana.** Los resúmenes de voz (`voice.ts` y `dvh-map.ts`) son texto editorial: `npm run check` no los puede verificar. Lee siempre el guion (`npm run script -- <partido>`) antes de publicar.
- **Dos voces distintas.** El Reel de presentación habla con la voz de la web (libertaria, sin partido). Los de partido son neutrales y llevan al test neutral.

## 6. Cómo hacer un partido nuevo

```sh
cd social
# 1. Ver sus datos para los cuatro capítulos y sus entradas «dijo / hizo»
#    (las celdas de stances y saidVsDid del JSON de datos)
# 2. Añadir el id a PARTIES en src/Root.tsx
# 3. Escribir los resúmenes de programa en src/voice.ts
# 4. Elegir sus «dijo / hizo» en src/dvh-map.ts (campos said, saidWho, did, didSource, note, voice)
# 5. Si se nombra con artículo («el PP»), añadirlo a WITH_ARTICLE en src/build.ts
npm run check                      # citas, votos, veredictos y BOE contra los datos
npm run script -- <partido>        # leer el guion entero
ELEVENLABS_VOICE_ID=1CeqBeXMOqCleeQjfYfO npm run tts -- <partido>
sh scripts/render-all.sh <partido>     # Reel → out/final/
sh scripts/render-posts.sh <partido>   # carrusel → out/final/post-<partido>/
```

- **Cambiar una sola frase:** se rehace solo ese beat con `ONLY=3 npm run tts -- <partido>`.
- **Clave de ElevenLabs:** va en `~/.config/elevenlabs/key` (o en `ELEVENLABS_API_KEY`). Nunca en el repo.
- **Navegador para renderizar:** el chrome-headless-shell de Playwright (`~/Library/Caches/ms-playwright/`). Los scripts lo buscan solos.
- **Revisar a ojo:** `npm run studio`.

## 7. Ficheros

| Fichero | Qué es |
|---|---|
| `src/data.ts` | Lectura del JSON de datos y etiquetas de veredicto |
| `src/chapters.ts` | Los cuatro capítulos, su pregunta y la descripción llana de cada votación |
| `src/voice.ts` | Resúmenes de voz de las citas de programa |
| `src/dvh-map.ts` | «Dijo / hizo» elegido por partido y capítulo, con su texto de pantalla y de voz |
| `src/build.ts` | Datos → beats + guion. También los tiempos |
| `src/Reel.tsx`, `src/Intro.tsx`, `src/Carousel.tsx` | Composiciones |
| `src/intro-script.ts` | Guion del Reel de presentación |
| `src/components/` | Papeleta, sellos, subtítulos, personaje y pantallas |
| `scripts/tts.ts` | Voz de ElevenLabs y `src/vo-manifest.json` |
| `scripts/check-data.ts` | Comprobación de lo que sale en pantalla contra los datos |
| `scripts/render-all.sh`, `scripts/render-posts.sh` | Renderizado final (audio normalizado a −14 LUFS) |

## 8. Marca

- **Personaje:** la «L» con ojos. En la web es `Libertarios/src/components/Mascot.tsx`, con las poses `peek` y `point`. Está en el hero junto al titular y en el pie.
- **Contraste en la web:** las clases `ink-border`, `hard-shadow` y `hard-shadow-sm`, más los tokens `--ink`, `--paper` y `--mint` en `globals.css`.
- **Foto de perfil de Instagram (@libertarios.eu):** `brand/avatar.html` → `instagram-perfil-teal.png` / `instagram-perfil-paper.png` (1080×1080, a salvo del recorte circular).
- **Cuadrante del Reel de presentación:** es el de la web (`InteractiveQuadrant.tsx`).
  - Ejes: economía en horizontal (intervención → libre mercado) y sociedad en vertical (control → libertad).
  - Esquinas: Liberal social, Libertario, Autoritario de izquierda y Autoritario de derecha.
