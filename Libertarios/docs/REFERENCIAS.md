# Referencias del cuadrante

Los puntos que se dibujan sobre el cuadrante ideológico —países, economistas,
partidos— viven en `src/data/quadrantReferences.ts`. Un solo fichero, sin lógica.

## Cómo está calibrado el eje económico

El eje se ancla en el **tamaño y alcance del Estado**, no en la retórica de cada
actor. Las bandas están escritas en la cabecera del fichero de datos:

| Posición | Equivale a |
|---|---|
| +100 | Sin Estado (anarcocapitalismo) |
| +70 | Estado ~15 % del PIB, regulación mínima |
| +40 | Estado ~25 % |
| +15 | Estado ~35 % |
| **0** | **Estado ~40 %** — el centro no es «neutral»: es un Estado que ya gasta cuatro de cada diez euros |
| −25 | Estado ~48 % |
| −50 | Estado por encima del 55 % |
| −100 | Planificación central |

Consecuencias deliberadas de esta escala:

- **Ningún país llega a +60.** Singapur, el de menor gasto público, se queda ahí.
- **España (−22) y Francia (−48) están del lado intervencionista.** Con el Estado
  en el 47 % y el 57 % del PIB respectivamente, situarlos del lado del libre
  mercado sería falso por mucho que sus libertades civiles sean altas.
- **El extremo superior está reservado a quien lo defiende explícitamente**:
  Rothbard, Huerta de Soto, Mises, el Partido Libertario. No a países ni a
  partidos de gobierno.
- **Los partidos se sitúan por política fiscal ejercida, no declarada.** El PP y
  Vox usan retórica de bajada de impuestos, pero ni han reducido el gasto ni lo
  proponen en serio; van cerca de 0. En España solo el P-LIB y, en su día,
  Ciudadanos se acercan al liberalismo.

Estas bandas son una convención de este proyecto, no un estándar publicado. Su
valor está en ser explícitas: cualquiera puede discutir un punto concreto contra
un criterio escrito en lugar de contra una intuición.

Hay pruebas que fijan la calibración en `src/test/quadrant.test.ts`. Si alguien
vuelve a colocar a España en positivo, fallan.

## Cómo añadir logotipos y retratos

Cada punto acepta un campo `image` con una ruta bajo `public/`. Hoy está vacío en
partidos y pensadores, y en su lugar se pinta un distintivo con el color de marca
y las iniciales. **No es una decisión estética**: los logotipos de partido son
marcas registradas y los retratos tienen autor, así que no se pueden incluir sin
resolver la licencia.

Para añadir uno:

1. Coloca el fichero en `public/referencias/` — SVG para logotipos, WebP o PNG
   cuadrado (mínimo 128 × 128) para retratos e ilustraciones.
2. Rellena `image` en el punto correspondiente:

   ```ts
   { id: "milei", kind: "thinker", initials: "JM",
     image: "/referencias/milei.webp",
     label: "Javier Milei", … }
   ```

3. Ya está. `ReferenceAvatar` prefiere `image` sobre el emoji y sobre las
   iniciales, y aparece en el gráfico, en la lista y en los resultados.

Conserva `initials` y `color` aunque pongas imagen: son el respaldo si el fichero
falta o falla la carga.

### Qué licencias sirven

| Origen | Sirve |
|---|---|
| Ilustración propia o encargada | Sí |
| Wikimedia Commons con licencia CC BY / CC BY-SA | Sí, citando autor y licencia |
| Dominio público | Sí |
| Logotipo oficial descargado de la web del partido | **No** sin permiso escrito |
| Foto de agencia o de prensa | **No** sin licencia |

Para partidos, la alternativa segura es lo que hay ahora: el color de marca no es
apropiable, las iniciales tampoco.

## Cómo añadir un punto nuevo

```ts
{
  id: "identificador-unico",
  kind: "party-es",          // country | thinker | party-es | party-eu
  label: "Nombre completo",
  short: "Nombre corto",     // el que se pinta sobre el gráfico
  economic: -22,             // usa la tabla de arriba, no la intuición
  social: 55,
  note: "Una o dos frases de contexto.",
  initials: "NC",
  color: "#1D84CE",
  contested: true,           // solo si su posición se discute de verdad
}
```

Marca `contested` cuando la posición sea genuinamente debatible: Marx en el eje
social, Milei entre anarcocapitalismo teórico y minarquismo práctico, Argentina
en pleno cambio. La interfaz lo advierte al usuario.
