# «¿A quién votar? Objetivamente»: estado a 2026-10-07

Foto tras la integración final y la QA. El plan está en `AFINIDAD-PLAN.md`; las reglas de codificación, en `AFINIDAD-DATOS.md`; el registro público, en `AFINIDAD-CAMBIOS.md`; la revisión ciega, en `AFINIDAD-REVISION.md`; la seguridad, en `AFINIDAD-SEGURIDAD.md`, y la comprobación de fuentes, en `AFINIDAD-VERIFICACION.md`.

## Qué está hecho

- **Motor** (`src/lib/afinidad/score.ts`):
  - Programa y Votos se puntúan como dos lentes separadas.
  - El acuerdo es direccional (desde 2026.10.2): `(1 − |u − p| / 4) × lado`, con lado 1 mismo signo, ½ partido en 0 y 0 signo contrario. +1 frente a +2 = 0,75; partido en 0 = 0,375 frente a ±1 y 0,25 frente a ±2.
  - «Esto me importa» pesa ×2. Hacen falta al menos 8 respuestas para dar resultado.
  - **Desde el 2026-10-07, una lente enseña cifra cuando el partido tiene dato en al menos `MIN_LENS_ITEMS` = 5 de las preguntas respondidas.** Sustituye al umbral del 70 %. Cada barra (programa y votos) dice «basado en X de Y respuestas». Por debajo de 5 dice «datos insuficientes», nunca 0.
  - **La cifra se encoge hacia el neutro**: `(Σ peso × acuerdo + K × 0,5) / (Σ peso + K)` con `SHRINK_K` = 3. 5 de 5 coincidencias dan un 81 %; 15 de 15, un 92 %. Se enseña la cifra corregida, y la metodología lo explica con un ejemplo que importa las constantes.
- **Datos**: 15 preguntas con votación ancla comprobada y 32 partidos.
  - Todos los ficheros de datos están registrados; un test falla si alguno no lo está.
  - El dataset tiene 480 celdas, 127 citas de hemeroteca y 62 entradas de «Dijeron vs. hicieron».
  - El JSON abierto es `public/afinidad/datos-2026.10.0.json`, además de `/api/afinidad/datos.json`.
- **Páginas**: intro, test, resultado (con imagen OG), metodología, datos abiertos, fichas de partido, «Dijeron vs. hicieron» y el panel de administración (`/admin/afinidad`). Todas en es/ca/gl/eu; la prosa de la metodología solo en castellano, a propósito.
- **«Dijeron vs. hicieron»**:
  - **Regla**: lo «dicho» tiene que ser un compromiso real. Nunca una intervención en el mismo debate de la votación con la que se compara, y sin plazo mínimo en días.
  - **Datos**: vuelve `pp-irpf-2011`.
  - **Presentación**:
    - El recuento de cada partido va junto a su contexto de gobierno: «Gobernó en el Estado: …» o «No ha gobernado en el Estado».
    - Una línea visible dice que los recuentos no son comparables entre partidos.
    - Cada partido tiene su «Qué buscamos y por qué no entró», sacado de `dichos-hechos/busqueda.ts`.
    - Un recuadro de huecos conocidos lista los compromisos de gobiernos autonómicos, aún sin investigar.
  - **Nuevo tipo de prueba `dato-oficial`**: estadística oficial, solo en `DidEvidence`. Nunca puntúa.
- **Consistencia de codificación** (`AFINIDAD-DATOS.md` §2), con las reglas de grandes fortunas e IRPF fijadas:
  - impuesto-grandes-fortunas: ERC, EH Bildu, BNG, Adelante Andalucía y Sumar (y Compromís, que hereda la celda de Sumar) pasan de +2 a +1; Foro y SALF, de −1 a −2.
  - irpf-inflacion: Aliança Catalana pasa de +2 a +1.
- **Comprobaciones** (`checks.ts`):
  - Los umbrales de equidad son constantes exportadas y la metodología las importa.
  - La dominancia y el votante perfecto solo juzgan a partidos **comparables**: los que tienen al menos 5 celdas en alguna lente, la misma regla que usa el motor.
  - Un test comprueba que las URL de votación de «Dijeron vs. hicieron» coinciden con sus campos.

## Cobertura de datos por partido

Celdas que puntúan, sobre 15. «Dijeron vs. hicieron»: total (cumple / contradice / parcial / no lo hicieron).

| Partido | Programa | Hechos | Hemeroteca | Dijeron vs. hicieron |
|---|---|---|---|---|
| PSOE | 9 | 15 | 14 | 7 (3/2/1/1) |
| PP | 9 | 15 | 12 | 7 (2/2/3/0) |
| Vox | 8 | 15 | 11 | 5 (5/0/0/0) |
| Sumar | 8 | 15 | 11 | 8 (3/0/4/1) |
| Podemos | 9 | 15 | 9 | 7 (4/0/2/1) |
| ERC | 8 | 15 | 11 | 4 (3/0/1/0) |
| Junts | 6 | 15 | 10 | 5 (4/0/1/0) |
| EH Bildu | 4 | 15 | 10 | 3 (2/0/1/0) |
| PNV | 1 | 15 | 13 | 4 (4/0/0/0) |
| BNG | 6 | 15 | 8 | 5 (3/0/2/0) |
| CC | 1 | 13 | 5 | 2 (2/0/0/0) |
| UPN | 4 | 13 | 6 | 1 (1/0/0/0) |
| Compromís | 8 | 15 | 7 | 4 (3/0/1/0) |
| Frente Amplio | 0 | 15 | 0 | 0 |
| SALF | 5 | 0 | 0 | 0 |
| Adelante Andalucía | 9 | 0 | 0 | 0 |
| CHA | 7 | 0 | 0 | 0 |
| Més per Mallorca | 7 | 0 | 0 | 0 |
| Aliança Catalana | 8 | 0 | 0 | 0 |
| Més per Menorca | 5 | 0 | 0 | 0 |
| NC-BC | 4 | 0 | 0 | 0 |
| PRC | 3 | 0 | 0 | 0 |
| Teruel Existe, Foro, CUP, Geroa Bai | 2 cada uno | 0 | 0 | 0 |
| UPL, Soria ¡Ya! | 1 cada uno | 0 | 0 | 0 |
| ASG, AHI, Por Ávila, Democracia Ourensana | 0 | 0 | 0 | 0 |

Las celdas de `iva-primera-vivienda` (programa y hemeroteca) se estaban escribiendo en paralelo. La tabla recoge lo registrado en el momento de esta foto.

## Comprobaciones de equidad (`STRICT=1`): estado actual

- **Dominancia por comunidad** (lo que enseña la UI: estatales más los de la comunidad declarada; sin comunidad y las 19 comunidades, 4 000 usuarios por perfil): **pasa en todas.** Muestra con 10 000 usuarios:
  - Sin comunidad: PSOE 15,5–15,9 %, PP 8,2–9,2 %, Vox 9,6–12,2 %, Sumar 9,7–10 %, Podemos 16,1–19,4 %, Frente Amplio 9,2–12,6 %, SALF 25,7–26,7 %.
  - Andalucía (01): Adelante Andalucía 15,2–18,2 %, SALF 24,3–25,3 %; el resto entre el 6 % y el 13 %.
  - Baleares (04): Més per Menorca 17,7–20,4 %, Més per Mallorca 13–14,7 %, SALF 22,4–23 %.
  - Cataluña (09): ERC 6,3–6,7 %, Junts 10–10,4 %, Aliança Catalana 10,2–12,3 %, SALF 17,9–18,9 %.
  - Euskadi (16) y Canarias (05): todos entre el 6 % y el 25 %.
- **Dominancia con los 32 partidos juntos** (vista que no existe en la UI): **falla solo por abajo.**
  - Compromís gana al 0–0,1 %, ERC al 1,4–1,5 %, PP al 1,8 % (uniforme) y Sumar al 2 %.
  - El máximo baja de 17,9 % (sin encoger) a 14,7 %: SALF 13,2–13,7 % y Més per Menorca 12,2–14,7 %.
  - Con K = 2, 4 y 5 el resultado es el mismo en lo esencial: Compromís (programa copiado de Sumar y votos iguales a los de ERC) y ERC siguen por debajo del 2 % con cualquier K. Nunca coinciden en la misma comunidad.
- **Votante perfecto**: con K de 2 a 5, cada partido comparable sale 1.º y por encima del 75 %. Pares indistinguibles que quedan:
  - Programa: sumar~compromis (estructural).
  - Votos: sumar~frente-amplio (estructural) y compromis~erc.
  - Desaparecen pp~alianca-catalana, bng~cha y vox~upn, porque ya no empatan con distinto número de respuestas.
- **Equilibrio por ítem (programa)**: 9 preguntas no llegan a 2 partidos a cada lado. Por ejemplo: jornada, 11 a favor y 0 en contra; impuesto-banca y lobbies, 9 y 0; amnistía, 2 y 0.
- **Todo del mismo signo (programa)**: EH Bildu, Aragón Existe, PRC, CUP y Geroa Bai.
- **Cobertura por bloque**: «otro» tiene un 0–6 % frente a una media del 29–43 %, e «izquierda» en votos, un 83 % frente al 43 %. Los extraparlamentarios no tienen historial de votaciones.
- **Comprobación de fuentes** (`afinidad:verify`): 6 celdas bloqueadas, todas de Junts. El servidor de su programa, `janhihaprou.cat`, no responde. La copia de Wayback que ya está en `archiveUrl` funciona (200). Hay 13 avisos y 0 errores de esquema.

## Decisiones abiertas para el dueño

1. ~~**Encogimiento (`SHRINK_K` = 3)**~~ **Decidido (2026-10-07):** los partidos sin historial en el Congreso siguen en el mismo ranking, con el aviso «sin historial en el Congreso / solo programa» en su barra. SALF (18–27 % de victorias simuladas, bajo el límite del 35 %) se acepta así.
2. **Sumar y la regla de grandes fortunas**: se mantiene el +1 por la regla (decisión del dueño, 2026-10-07). Los dos codificadores ciegos le habían dado +2.
3. **Adelante Andalucía** tiene programa propio de las generales de 2023 (`adelanteandalucia.org/wp-content/uploads/2023/07/programa-23J-3ed-comprimido.pdf`, 85 páginas). Por §2, el fichero debe recodificarse con él. Está señalado en su cabecera.
4. **Podemos** usa el programa de las europeas de 2024, por la excepción de §2. Confirmar.
5. **Periodos de gobierno** (`Party.inGovernment`): solo cubren desde 2011. La UI lo dice, pero añadir PSOE 1982–1996 y 2004–2011 y PP 1996–2004 (con fuente del BOE) sería más completo.
6. **Equilibrio de «Dijeron vs. hicieron»**: Vox, PNV, CC y UPN solo tienen entradas «cumple», y varios partidos no tienen ningún «contradice». El registro de búsqueda publica qué se buscó y por qué quedó fuera cada cosa. Los compromisos de gobiernos autonómicos aún no se han investigado (Generalitat, Gobierno Vasco, Canarias, Navarra…).
7. **Junts**: cambiar la URL del programa a la copia de Wayback mientras `janhihaprou.cat` siga caído.

## Lista de lanzamiento

- [x] (2026-10-08) Aplicar en Supabase las migraciones `0008_afinidad.sql`, `0009_afinidad_events.sql` y `0010_afinidad_events_dvh.sql`, en ese orden.
- [ ] Crear el token de administración con `afinidad_admin_issue_token` (solo con el rol de servicio). Guardarlo fuera del repo y comprobar el acceso a `/admin/afinidad`.
- [ ] Revisión por una persona nativa de las traducciones ca/gl/eu: enunciados, diccionarios `afinidad`, `transparency.ts`, `dvh.ts` y `result.ts`, incluida la nueva cadena «basado en X de Y respuestas». Que firme la tabla de `AFINIDAD-CAMBIOS.md`.
- [ ] **26-oct** (cierre de listas): descargar los programas de 2026, recodificar por diferencias con los de 2023, repetir la revisión ciega y quitar la etiqueta «programa 2023» donde ya no aplique.
- [ ] **16-oct**: comprobar el registro de Frente Amplio ante la Junta Electoral. Después, `status: "confirmada"` o retirarlo.
- [x] ~~Elegir el proveedor de correo de «Avísame»~~ → sustituido por el boletín «Novedades de Libertarios.eu» con Brevo (`0011`, `docs/DATABASE.md` §10).
- **Boletín (Brevo)** — en este orden:
  - [ ] Crear la cuenta de Brevo (plan gratuito: 300 correos/día) y una lista «Novedades de Libertarios.eu»; anotar su id (`BREVO_LIST_ID`).
  - [ ] Dominio remitente: añadir el dominio en Brevo y publicar en el DNS los registros que da Brevo — SPF (`include:spf.brevo.com` en el TXT de SPF existente, sin duplicar el registro), DKIM (los dos CNAME/TXT `brevo1._domainkey`/`brevo2._domainkey` o el que indique), el TXT `brevo-code` de verificación y DMARC (`_dmarc` TXT, al menos `v=DMARC1; p=none; rua=mailto:…` para empezar). Comprobar en Brevo que el dominio sale «autenticado».
  - [ ] En Brevo, desactivar el seguimiento de aperturas y clics de los correos transaccionales.
  - [ ] Aplicar `supabase/migrations/0011_newsletter.sql` (después de `0008`–`0010`).
  - [ ] Emitir la clave de servidor con el rol de servicio: `select public.newsletter_issue_server_key();` (se ve una sola vez).
  - [ ] Variables en Vercel (Production y Preview, **no** `NEXT_PUBLIC_*`): `NEWSLETTER_SERVER_KEY`, `BREVO_API_KEY`, `BREVO_SENDER_EMAIL` (p. ej. `novedades@libertarios.eu`, del dominio autenticado), `BREVO_SENDER_NAME` (`Libertarios.eu`), `BREVO_LIST_ID`. Comprobar que `NEXT_PUBLIC_SITE_URL` apunta al dominio público (los enlaces del correo salen de ahí).
  - [ ] Prueba de punta a punta con un buzón propio: apuntarse desde el pie, recibir el correo, confirmar, ver el contacto en la lista de Brevo, darse de baja desde la página y desde el botón «Cancelar suscripción» de Gmail.
  - [ ] Importación de simpatizantes, primero en prueba: `SUPABASE_SERVICE_ROLE_KEY=… npm run newsletter:import-affiliates` (solo recuentos). Revisar las cifras; luego `-- --import`, y solo entonces `-- --send` por tandas (300 por ejecución por defecto; el plan gratuito de Brevo limita a 300/día).
  - [ ] Revisión por una persona nativa de `src/i18n/newsletter.ts` (ca, gl, eu), incluido el correo.
- [ ] Revisar la analítica: proveedor (Plausible o Umami), los eventos de `events.ts` y que ninguno lleve datos personales.
- [ ] Repetir `npm run afinidad:verify` (con Junts arreglado), `STRICT=1 npx vitest run src/test/afinidad-dataset.test.ts` y `npm run afinidad:json`, y después `npx next build`.
- [ ] Migrar `middleware.ts` a `proxy` (aviso de obsolescencia de Next 16). No bloquea el lanzamiento.
