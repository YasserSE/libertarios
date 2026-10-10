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

## 9. Vídeos explicativos (vivienda, ¿derecha?, impuestos, vivienda por partidos)

Usan el mismo diseño «papeleta» con otro esquema: un **gancho**, varias escenas con datos y un **cierre** que invita a aprender más («más vídeos en el perfil» y el test de la bio).

- **Un fichero por vídeo:** `src/explainers/<id>.ts`, con `header`, `rail` y escenas `{ rail, script, min, scene }`. La escena dice qué enseña (`questions`, `vs`, `stats`, `stamps`, `donut`, `case`, `provinces`, `headline`, `axes`, `partyMap`, `receipt`, `partyGrid`, `dvhList`, `who`, `ending`). Cada elemento lleva su `cue`, la palabra del guion con la que aparece.
- **Pantallas:** `src/components/scenes.tsx`. **Composición:** `src/Explainer.tsx` (`reel-<id>`). **Carrusel:** `post-<id>`.
- **Voz continua:** `npm run tts -- <id>` pide **una sola toma** con el guion entero y la corta por escenas con los tiempos por carácter. Así la voz suena fluida, sin pausas bruscas entre escenas. Ajustes: velocidad 1,2 (el máximo de ElevenLabs), estabilidad 0,38 y estilo 0,3.
- **Duración de cada escena:** 0,05 s + la voz + 0,1 s; el cierre se alarga 1,2 s.
- **Fuentes:** cada cifra de pantalla lleva su fuente. La tabla completa está en `captions/fuentes-explicativos.md`.
- **Comprobación:** `npm run check` compara la voz del vídeo de vivienda por partidos con los datos del test, y comprueba el «0 de 22» y que no haya ningún partido libertario con escaño.
- **Dos voces:** vivienda, ¿derecha? e impuestos hablan con la voz de la web (libertaria, con contrapunto). Vivienda por partidos es neutral, como los Reels de partidos.

## 10. Criterios de guion y QA (para planificar y revisar cada vídeo nuevo)

Salen de la revisión de 2026-10-10 contra Reels virales de divulgación: Kurzgesagt, Johnny Harris, Vox, VisualPolitik, Rallo y Maldita. También se apoyan en lo que publican Instagram y TikTok y en un estudio sobre los TikTok de Maldita y Newtral (EPI, «Viralizar la verdad»).

**Qué mide Instagram:** tiempo de visionado, likes por alcance y **envíos por DM** por alcance. Para llegar a gente que no nos sigue, lo que más pesa son los envíos. El objetivo del vídeo es un «no lo sabía» que alguien quiera mandar.

### Escribir para el oído, no para leer
- **El número va delante del sustantivo,** como se habla: «solo se terminaron 92.000 casas», no «casas terminadas: 92.000».
- **Nada de etiquetas de tabla** («Las empresas, un 8 %»). Frases completas con conectores: «Por eso…», «Entonces…», «Ahora…».
- **Los ejemplos suenan a ejemplos:** «Ya se ha probado: en San Francisco…, en Estocolmo…».
- **Español correcto:** «tampoco», no «también no». «En libertarios.eu no somos…», no «Libertarios punto eu no es…» (la pronunciación la pone `sayAs`).

### Estructura del efecto «no lo sabía»
1. **Lo que la gente cree,** luego **el giro** y luego **una comparación que se sienta:** por mes, «uno de cada diez», «de enero a finales de mayo». Una cifra suelta no sorprende; la distancia con lo que esperabas, sí.
2. **La sorpresa más fuerte va justo después del gancho,** no en el medio.

### Un mensaje central («el punch»), dicho con todas las letras
- **Antes de escribir el guion,** apunta en una frase lo que la gente se tiene que llevar. Por ejemplo, impuestos: «no te dan ticket; siempre te dicen pensiones, sanidad, educación y seguridad, pero eso es el 57 %; si el resto fuera la mitad, cobrarías un 14 % más».
- **Cada escena empuja hacia esa frase.** Lo que no empuja se quita, aunque sea un buen dato.
- **El gancho dice de qué va el vídeo** («Hablemos de vivienda: …»), y el cierre repite el punch en una frase («No es el casero: es que no se construye»).
- **Si el punch es un supuesto** («si se redujera a la mitad»), el supuesto se dice en pantalla y se calcula en código.

### Checklist (puntuar 0/1/2 antes de grabar y después de renderizar)

| # | Criterio |
|---|---|
| 1 | **Promesa o tensión en los primeros 3 s,** en voz y en pantalla. Nada de intro de canal. |
| 2 | **Pregunta abierta antes de los 6 s.** La respuesta se guarda (bucle abierto). |
| 3 | **Primer dato que responde antes de los 15–20 s,** y el giro final se reserva. |
| 4 | **Un dato «para mandar por DM»:** una sola cifra que alguien enviaría. |
| 5 | **Formato de comprobación o veredicto** («¿votan lo que prometen? Lo comprobamos») mejor que «así funciona X». En los TikTok de Maldita y Newtral, los verificados tenían 2,4× más probabilidad de superar la media de likes. |
| 6 | **Menos de 60 s,** salvo que los datos de retención justifiquen más. |
| 7 | **Una idea por pantalla.** Se entiende sin sonido y la tira de subtítulos no tapa el dato. |
| 8 | **Cada cifra con su fuente en pantalla** y en `captions/fuentes-explicativos.md`. |
| 9 | **La respuesta llega antes del CTA,** y el CTA dura unos 3 s (`min: 3.5` en el cierre). |
| 10 | **El cierre vuelve al principio:** la última frase responde a la primera, en bucle. |
| 11 | **El cierre invita a mandarlo** a alguien a quien le sirva, concreto para el tema, y a ver más en el perfil. Ejemplos: «¿Conoces a algún pensionista? Mándaselo. Y más comparaciones, en el perfil.», «¿Conoces a alguien buscando piso?». Pantalla de cierre con `shareTo` (tarjeta «Enviar a…» + «↗ MÁS EN EL PERFIL»). El comentario se pide en el texto del post, no en la voz. |
| 12 | **Voz femenina** (Cristina). En el mismo estudio, presentadora mujer = el doble de probabilidad de compartidos por encima de la media. |
| 13 | **Neutralidad en los vídeos de partidos:** si el gancho señala a alguien, que salga de los datos y nombre a los dos grandes cuando los datos lo permitan. |
| 14 | **Probar el gancho con Trial Reels** de Instagram: dos aperturas, enseñadas solo a gente que no nos sigue. Se queda la que retiene. |

**Folclore sin fuente primaria (no usar como regla):** «el 50 % se va en 3 s», «21–34 s es lo ideal», «cambiar la imagen cada 2–4 s».

## 11. Vídeos por temas: «lo que prometen y lo que votan»

Mismo formato que vivienda por partidos:
- **Gancho** «Hablemos de X: qué prometen… y qué votan».
- **Tres votaciones** con programa y voto de PP, PSOE, Vox, Sumar y Podemos.
- **«Cuando gobiernan»**, solo si hay entradas de PP o PSOE en «dijo / hizo».
- **Cierre** «¿Te ha sorprendido? Comenta» + test.

**Dónde está cada pieza:**
- **Código:** `src/explainers/party-video.ts` (filas comunes) y `topic-partidos.ts` / `impuestos-partidos.ts` (guiones).
- **Si el tema está en el test:** se usa `fromDataset`.
- **Si no está:** se buscan votaciones y promesas y van a `src/explainers/extra-votes.ts`.
  - **Voto:** URL del JSON de datos abiertos del Congreso.
  - **Promesa:** cita literal con página del PDF. Sin cita clara → `sin`.
  - **Recuento:** se guarda la salida de `npm run afinidad:vote -- <url> --json` (en `Libertarios/`) resumida en `data/votes/<id>.json`. `npm run check` falla si el vídeo no coincide.
  - **Rate limit:** congreso.es corta si se piden muchas votaciones seguidas. Hay que espaciarlas unos 45 s.

**Neutralidad:**
- Una toma en consideración se dice «tramitar», no «aprobar».
- Los decretos ómnibus se dicen «junto a otras medidas».
- No se atribuyen motivos a un voto si no están verificados.

**Equilibrio (owner, 2026-10-10).** Los programas de izquierda prometen mucho y, si solo se eligen votaciones sobre propuestas suyas, salen «coherentes» y el vídeo tiene un ganador claro. Para evitarlo:
- Cada vídeo por partidos enseña al menos **una contradicción del Gobierno (PSOE, Sumar; Podemos cuando gobernó)** y **una de la oposición (PP, Vox)**, todas verificadas.
- **«Cuando gobiernan» incluye siempre a quien gobierna ahora,** porque es quien tiene más hechos que contrastar.
- Si los datos no lo permiten, se avisa al dueño antes de publicar.
- **Lenguaje neutro:** se enseñan votos y hechos, sin calificativos. Lo que no se puede verificar («no dijeron nada») no se dice.
