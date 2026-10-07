# «¿A quién votar?» — revisión de acceso y seguridad

Fecha: 2026-10-06. Alcance: migraciones `0008_afinidad.sql` y
`0009_afinidad_events.sql`, y el código que las usa (server actions, ruta de
eventos, panel `/admin/afinidad`, `track()`).

Cómo se verificó:

- Las nueve migraciones (`0001`…`0009`) se aplicaron en orden sobre una base
  desechable (PGlite: Postgres 17 en WASM; Docker no estaba disponible) con
  los roles de Supabase simulados (`anon`, `authenticated`, `service_role`) y
  **con los privilegios por defecto de Supabase** (que conceden todo a `anon`
  en cada tabla, secuencia y función nueva del esquema `public`). Sobre esa
  base, 66 comprobaciones como `anon` y como dueño: 66 superadas. Ninguna
  conexión al proyecto remoto.
- `vitest` (incluye `src/test/afinidad-events.test.ts` y
  `src/test/afinidad-admin.test.tsx`), `tsc`, `eslint` y `next build`.
- Tras el build, ninguna cadena de administración (`afinidad_admin*`,
  `__Host-afinidad_admin`, `SUPABASE_ANON_KEY`) aparece en `.next/static`.

## 1. Inventario de acceso

Todas las tablas: RLS activo **sin políticas** y `revoke all` a `public`,
`anon` y `authenticated` (también sus secuencias). La app nunca usa la clave
de servicio: habla con la base por `fetch` a `/rest/v1/rpc/*` con la clave
anónima, siempre desde el servidor (`src/lib/afinidad/rpc.ts`). La clave
anónima no es `NEXT_PUBLIC_*`, así que no llega al navegador, pero se trata como
pública (así la considera Supabase).

### Tablas

| Tabla | Contenido | `anon` | Qué filtra si se rompiera el aislamiento |
|---|---|---|---|
| `afinidad_responses` (0008) | respuestas por posición, importancia, comunidad, voto habitual, día | nada | opinión política (art. 9), sin identificadores |
| `afinidad_notify` (0008) | correo, consentimiento, idioma, versión, token de baja, `confirmed_at` | nada | correos: dato personal. **Congelada desde 0011** |
| `newsletter_subscribers` (0011) | correo, consentimiento y versión del texto, origen, idioma, confirmación, baja, hash del token de confirmación | nada | correos: dato personal (sin nada del test) |
| `newsletter_config` (0011) | SHA-256 de la clave de servidor | nada | un hash de un secreto de 256 bits: inútil sin la clave |
| `afinidad_rate_buckets` (0008) | (ámbito, minuto, contador) | nada | volumen por minuto, nada personal |
| `afinidad_events` (0009) | evento, 0–1 propiedad de interfaz, idioma, versión, hora en punto | nada | uso agregado, nada personal |
| `afinidad_admin_tokens` (0009) | etiqueta, SHA-256 del token, fechas | nada | hashes de secretos de 244 bits: inútiles sin el token |
| `afinidad_admin_sessions` (0009) | SHA-256 de la sesión, token dueño, caducidad | nada | ídem |

### Funciones

| Función | SECURITY DEFINER | Concedida a | Devuelve | Notas |
|---|---|---|---|---|
| `record_afinidad_response` (0008) | sí | `anon`, `authenticated` | `void` | valida todo; techo 600/min |
| `subscribe_afinidad` (0008) | sí | **nadie** desde 0011 (antes `anon`) | `void` | retirada: la lista de avisos ya no se escribe |
| `subscribe_newsletter` (0011) | sí | `anon`, `authenticated` **+ clave de servidor** | tokens de confirmación y baja, o nada | ver §5 |
| `confirm_newsletter`, `unsubscribe_newsletter` (0011) | sí | `anon`, `authenticated` **+ clave de servidor** | correo (e idioma) o nada | ver §5 |
| `newsletter_export`, `newsletter_legacy_counts`, `newsletter_import_legacy_affiliates`, `newsletter_issue_legacy_tokens`, `newsletter_release_legacy_token`, `newsletter_purge`, `newsletter_issue_server_key` (0011) | sí | **solo servicio** | | |
| `newsletter_key_ok`, `newsletter_new_confirm_token` (0011) | según caso | **nadie** (internas) | | |
| `afinidad_aggregates` (0008) | sí | **solo servicio** | recuentos k ≥ 20 | análisis interno |
| `afinidad_rate_take` (0008) | sí | **nadie** (interna) | bool | |
| `record_afinidad_event` (0009) | sí | `anon`, `authenticated` | bool | lista blanca de evento, propiedad, tipo y valor; techo 3000/min |
| `record_afinidad_events` (0009) | sí | `anon`, `authenticated` | nº guardados | lote ≤ 20, ≤ 4 KB, todo o nada |
| `afinidad_admin_login` (0009) | sí | `anon`, `authenticated` | sesión o `NULL` | cuenta fallos; bloqueo |
| `afinidad_admin_stats` (0009) | sí | `anon`, `authenticated` | JSON o `NULL` | exige sesión válida; k ≥ 20 en voto/comunidad |
| `afinidad_admin_logout` (0009) | sí | `anon`, `authenticated` | `void` | |
| `afinidad_admin_issue_token` (0009) | sí | **solo servicio** | token en claro, una vez | |
| `afinidad_admin_revoke_token` (0009) | sí | **solo servicio** | nº revocados | borra sus sesiones |
| `afinidad_admin_locked`, `_check_session`, `_hash`, `_new_secret` (0009) | según caso | **nadie** (internas) | | |
| `afinidad_purge` (0009) | sí | **solo servicio** / pg_cron | recuentos | |

Comprobado en la base de prueba: `anon` recibe `permission denied` al leer o
borrar cada tabla, al pedir `nextval` de cada secuencia y al ejecutar cada
función interna o de servicio, **pese a** los privilegios por defecto de
Supabase.

### Puertas HTTP de la app

| Ruta | Quién | Controles |
|---|---|---|
| server action `recordAfinidadResponse` | cualquiera | zod/`toResponseRow`, 10/min por IP (memoria), techo global en la base |
| ~~server action `subscribeAfinidad`~~ | retirada en 0011 | |
| server action `subscribeNewsletter` | cualquiera | zod (solo correo, casilla, origen, idioma), 5/min por IP, clave de servidor, freno por dirección, techo global; nunca devuelve tokens |
| server actions `confirmNewsletter` / `unsubscribeNewsletter` | quien tenga el token | formato estricto antes de llamar a la base, 20/min por IP, redirige sin el token en la URL |
| `POST /api/newsletter/unsubscribe?t=` | cliente de correo (RFC 8058) | formato UUID, 20/min por IP; `GET` solo redirige a la página con botón |
| `POST /api/afinidad/event` | cualquiera (mismo origen) | `Origin`/`Sec-Fetch-Site`, 30 envíos/min por IP, ≤ 4 KB, zod, limpieza de propiedades |
| `/admin/afinidad` (página) | cualquiera la ve; solo con sesión ve datos | sin cookie válida no llama a la base; `noindex`, `no-store`, `no-referrer`, `X-Frame-Options: DENY` |
| server action `loginAction` | cualquiera | 5/min por IP, Origin=Host (Next), formato estricto, bloqueo en la base |
| server action `logoutAction` | quien tenga la cookie | Origin=Host, SameSite=Strict |

## 2. Modelo de amenazas

### 2.1 Inserciones basura (spam)

*Riesgo.* Las funciones de escritura están concedidas a `anon`; quien tenga la
clave anónima (o llame a las server actions o a la ruta) puede insertar en
bucle y falsear agregados o hinchar la base.

*Medidas.* (a) Límite por IP en memoria en la ruta y en las server actions.
(b) Validación estricta en la base (forma, escala, listas blancas). (c) Techo
global por minuto y ámbito (`afinidad_rate_take`): acota el crecimiento a
~860 000 respuestas o ~4,3 M eventos al día en el peor caso, con filas de
~100 bytes. (d) `rate_peaks` en el panel muestra los picos.

*Por qué no por IP en la base.* Por PostgREST Postgres ve la IP de Vercel, y
`x-forwarded-for` lo puede inventar cualquiera que llame a la API
directamente. El límite por IP solo tiene sentido en el borde (Vercel fija
esa cabecera) y es por instancia: un freno, no una garantía.

*Riesgo residual.* Un atacante que alcance el techo global hace que se
descarten también los datos legítimos de ese minuto (se prefiere perder
analítica a llenar la base). Los agregados no se presentan como muestra
representativa; antes de publicar titulares, revisar `rate_peaks`.

### 2.2 Fuerza bruta del token de administrador

*Medidas.* Tokens de 244 bits (`gen_random_uuid()` ×2, generador criptográfico
de Postgres): ~10⁷³ intentos de media. Formato estricto antes de tocar la
base. Más de 20 fallos en 15 min bloquean el acceso entero. 5 intentos/min por
IP en el formulario.

*Comparación en tiempo constante.* Se busca por `sha256(token)` en un índice
único; el tiempo depende del hash, que quien ataca no controla, así que no hay
oráculo de prefijos. Por eso SHA-256 y no bcrypt: con un secreto aleatorio de
244 bits un hash lento no añade nada y obligaría a recorrer la tabla.

*Riesgo residual (aceptado).* El bloqueo es global: alguien con la clave
anónima puede mantener al dueño fuera haciendo fallar intentos sin parar.
Remedio: `delete from afinidad_rate_buckets where scope = 'admin_fail'` desde
el editor SQL, y rotar la clave anónima si el abuso persiste.

### 2.3 Fuga del token

*Medidas.* El token largo viaja una vez (cuerpo POST del formulario →
server action → base) y no se guarda en la app ni en el navegador; la cookie
lleva una **sesión** de 30 min, no el token. Base: solo hashes. Caducidad
obligatoria (≤ 366 días), `last_used_at` para detectar uso raro, revocación
por etiqueta que corta las sesiones al momento. Prefijo `afa_` para que los
escáneres de secretos lo reconozcan. Los logs de error de `callRpc` no
incluyen los parámetros.

*Si se filtra:* `select public.afinidad_admin_revoke_token('<etiqueta>');` y
emitir otro. Lo máximo que ve quien lo use es lo que ve el panel: agregados
con k ≥ 20 en todo lo que toca opinión, nunca filas.

### 2.4 Robo de la sesión / cookie

Cookie `__Host-afinidad_admin`: `HttpOnly` (no la lee JavaScript, ni un XSS),
`Secure`, `SameSite=Strict`, `Path=/`, sin `Domain` (el prefijo `__Host-` lo
impone el navegador: ningún subdominio puede plantarla ni pisarla), 30 min.
El panel no tiene componentes cliente y nunca pinta la sesión (hay un test).
`Cache-Control: private, no-store` en `/admin`.

### 2.5 CSRF en las acciones de administración

Next compara `Origin` con `Host` en toda server action y solo acepta POST; la
cookie es `SameSite=Strict`. Un «login CSRF» (meter a la víctima en la sesión
del atacante) exigiría un token válido del atacante y no da nada. La ruta de
eventos rechaza `Origin` ajeno y `Sec-Fetch-Site` distinto de `same-origin`.

### 2.6 XSS

El panel es un Server Component sin `dangerouslySetInnerHTML`; React escapa
todo. Lo que pinta viene de la base y está acotado por CHECK y por el esquema
zod de `parseAdminStats` (cadenas ≤ 64, fechas con patrón); los nombres de
partido y comunidad se buscan en el dataset y el diccionario. `?dias=` solo
admite 7/30/90/180. `X-Frame-Options: DENY` evita clickjacking.

### 2.7 Enumeración de celdas con k < 20

*Medidas.* `afinidad_admin_stats` solo devuelve voto habitual, comunidad y su
cruce con `having count(*) >= 20`, **siempre sobre todo el histórico** (no
sobre el rango pedido: si dependiera del rango, la diferencia entre dos
consultas de días consecutivos aislaría a una persona). Los «no declara» no
salen como celda, para que `total − visibles` no despeje la suma de las celdas
pequeñas. No hay recuentos por pregunta en el panel; `afinidad_aggregates`
(k ≥ 20 por celda) sigue siendo solo de servicio.

*Riesgo residual.* Restar el panel de hoy y el de mañana dice cuántas
personas nuevas declararon cada voto ese día (si la celda ya pasaba de 20).
No dice quién. Si se quisiera cerrar, redondear esas cifras a múltiplos de 5.

### 2.8 Reidentificación por marcas de tiempo

*Medidas.* Eventos con la hora en punto (CHECK en la tabla); respuestas con el
día. Eventos y respuestas no comparten ningún identificador ni hora fina, así
que no se pueden casar entre sí ni con logs de Vercel o Supabase. Sin id de
sesión: los eventos de una visita no se pueden encadenar. Ninguna propiedad
de evento revela opinión (`step` dice que se declaró algo, no qué; `anon` dice
si el enlace compartido llevaba voto, no cuál). Las peticiones a Supabase
salen del servidor: Supabase nunca ve la IP de la persona.

*Riesgo residual.* En horas de muy poco tráfico, la secuencia de eventos de esa
hora corresponde a pocas personas; no contiene opinión.

### 2.9 Otros

- **Funciones SECURITY DEFINER y `search_path`.** Todas fijan
  `search_path = public, pg_temp` (o `pg_catalog, pg_temp`) y califican las
  tablas con `public.`, así que un objeto temporal no puede suplantarlas.
- **Privilegios por defecto de Supabase.** Cada tabla, secuencia y función
  nueva nace concedida a `anon`; cada una lleva su `revoke`. Verificado.
- **Suscripción de correos ajenos.** `subscribe_afinidad` es pública: hay que
  confirmar por correo antes de enviar avisos (`confirmed_at`). Cualquiera
  puede además refrescar `consent_at` de una dirección existente; la prueba de
  consentimiento válida será la confirmación, no `consent_at`.
- **Desarrollo contra producción.** `.env.local` apunta al proyecto real; la
  ruta de eventos no escribe fuera de producción salvo
  `AFINIDAD_EVENTS_DEV=1`. Las respuestas y suscripciones en desarrollo sí
  escriben (comportamiento previo).

## 3. Arreglos aplicados

En `0008` (no aplicada en ningún remoto, editada en el sitio):

1. Techo global por minuto en `record_afinidad_response` (600) y
   `subscribe_afinidad` (60), con `afinidad_rate_buckets` y
   `afinidad_rate_take` (internos, revocados).
2. `revoke all` en las secuencias `afinidad_responses_id_seq` y
   `afinidad_notify_id_seq` (los privilegios por defecto de Supabase daban
   `usage`/`update` a `anon`).
3. `search_path` de las funciones SECURITY DEFINER: `'public'` →
   `'public', 'pg_temp'`.
4. `afinidad_notify.confirmed_at` (doble opt-in). Re-suscribir una dirección
   dada de baja anula `confirmed_at`: antes, cualquiera podía reactivar a
   quien se había dado de baja.

En la app:

5. Límite por IP en memoria en `recordAfinidadResponse` (10/min) y
   `subscribeAfinidad` (5/min): eran endpoints POST públicos sin freno.
6. Panel y ruta nuevos con los controles de §1.

En `0009`: todo lo descrito, con retención (`afinidad_purge`, cron nocturno).

## 4. Pendiente

- Confirmar el plazo de retención de `afinidad_responses` (propuesto: 730
  días).
- ~~Correo de confirmación y página de baja~~: hecho con el boletín (§5).
- Aplicar `0011`, emitir la clave de servidor y repetir en Supabase las
  comprobaciones de §5 con la clave anónima.
- Aplicar `0008` y `0009` en Supabase y repetir allí las comprobaciones de §1
  con la clave anónima (`curl` a `/rest/v1/<tabla>` → 401/42501; a
  `/rest/v1/rpc/afinidad_admin_issue_token` → 42501).
- Valorar redondear a múltiplos de 5 las cifras de voto/comunidad del panel
  (§2.7).

## 5. Boletín «Novedades de Libertarios.eu» (0011)

Fecha: 2026-10-07. Alcance: `0011_newsletter.sql`, `src/lib/newsletter/*`,
`src/app/[locale]/novedades/*`, `src/app/api/newsletter/unsubscribe`,
`NewsletterForm`, la casilla del registro y
`scripts/newsletter-import-affiliates.ts`.

Verificado en PGlite con las migraciones `0001`…`0011` en orden y los
privilegios por defecto de Supabase: 61 comprobaciones, 61 superadas (`anon` y
`authenticated` reciben `permission denied` en las dos tablas, la secuencia y
cada función interna o de servicio; alta, confirmación, baja, caducidad,
reimportación, purga y `search_path` fijado en todas las funciones nuevas).

### 5.1 Confirmar una dirección ajena

`subscribe_newsletter` tiene que devolver el token de confirmación al servidor
para que lo meta en el correo. La clave anónima se trata como pública, así que
si la función solo pidiera esa clave, cualquiera podría llamarla con una
dirección ajena, recibir el token y confirmarla él mismo: el doble opt-in no
probaría nada. Solución: las tres funciones públicas exigen
`p_server_key` (`nlk_` + 64 hex, 256 bits), que solo tiene el servidor
(`NEWSLETTER_SERVER_KEY`, no `NEXT_PUBLIC_*`) y de la que la base guarda el
SHA-256. Sin ella: `No autorizado`. Los tokens nunca salen de la server action
hacia el navegador (probado en `src/test/newsletter.test.tsx`).

### 5.2 Escáneres de enlaces

Los antivirus de correo (Outlook Safe Links, etc.) abren los enlaces solos. Las
páginas `/novedades/confirmar` y `/novedades/baja` no cambian nada al abrirse:
enseñan un botón que hace POST (server action). La baja de un clic del cliente
de correo va por `POST /api/newsletter/unsubscribe` (RFC 8058), que los
escáneres no hacen; `GET` en esa ruta solo redirige a la página.

### 5.3 Spam y bombardeo de buzones

Freno por IP (5/min) en la app, un correo de confirmación cada 10 minutos como
mucho por dirección en la base, y techo global de 60 altas/min. La respuesta a
la persona es la misma en todos los casos (nueva, ya suscrita, frenada), así
que no sirve para averiguar quién está suscrito.

### 5.4 Alterar la suscripción de otra persona

Una fila confirmada no cambia con un alta nueva (ni idioma, ni origen, ni fecha
de consentimiento). En una dada de baja, un alta nueva no la reactiva: solo
emite un token y sigue de baja hasta que el dueño del buzón confirme. Los
tokens de confirmación son de un solo uso, caducan (7 días; 30 para
importados) y en la base solo está su hash.

### 5.5 Separación de datos del test

La tabla no tiene ninguna columna ni clave ajena hacia `affiliates*` ni
`afinidad_*`. `parseNewsletterForm` lee solo `email`, `consent`, `source` y
`locale`; el formulario construye su `FormData` con esos cuatro campos; la RPC
recibe solo eso más la versión del texto (probado). El registro y el boletín
son dos peticiones y dos tablas sin enlace. La exportación devuelve correo,
idioma, origen y fecha de confirmación: no hay posición que exportar.

### 5.6 Brevo

La clave de Brevo solo se lee en `brevo.ts` (`server-only`) y en el script. No
se registra ni la clave ni la dirección en los logs (solo el código HTTP). Sin
configuración, no lanza: avisa y deja la fila sin confirmar. A Brevo solo llega
el correo (ningún atributo).

### 5.7 Pendiente

- Desactivar en Brevo el seguimiento de aperturas y clics de los correos
  transaccionales (no hace falta para nada y añade un píxel).
- `afinidad_notify` sigue en la base (vacía si `0008` no se aplicó antes de
  `0011`). Si algún día tiene filas, solo pueden recibir el aviso único de los
  programas de 2026, y solo las confirmadas.

