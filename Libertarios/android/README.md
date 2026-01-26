# Android App Icons

Los iconos de la aplicación Android han sido generados desde `public/favicon.svg`.

## Estructura de iconos

Los iconos están organizados por densidad de pantalla en `app/src/main/res/`:

- **mipmap-mdpi/**: 48x48 px (densidad media)
- **mipmap-hdpi/**: 72x72 px (densidad alta)
- **mipmap-xhdpi/**: 96x96 px (densidad extra alta)
- **mipmap-xxhdpi/**: 144x144 px (densidad extra extra alta)
- **mipmap-xxxhdpi/**: 192x192 px (densidad extra extra extra alta)

## Archivos generados

Cada carpeta contiene:
- `ic_launcher.png` - Icono estándar de launcher
- `ic_launcher_round.png` - Icono redondo para Android moderno

Adicionalmente:
- `mipmap-xxxhdpi/ic_launcher_play_store.png` - Icono de 512x512 para Google Play Store

## Regenerar iconos

Para regenerar los iconos desde el SVG original:

```bash
node -e "const sharp = require('sharp'); const sizes = { 'mipmap-mdpi': 48, 'mipmap-hdpi': 72, 'mipmap-xhdpi': 96, 'mipmap-xxhdpi': 144, 'mipmap-xxxhdpi': 192 }; Promise.all(Object.entries(sizes).map(([folder, size]) => sharp('public/favicon.svg').resize(size, size).png().toFile(\`android/app/src/main/res/\${folder}/ic_launcher.png\`).then(() => sharp('public/favicon.svg').resize(size, size).png().toFile(\`android/app/src/main/res/\${folder}/ic_launcher_round.png\`)))).then(() => sharp('public/favicon.svg').resize(512, 512).png().toFile('android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_play_store.png')).then(() => console.log('✓ Icons regenerated')).catch(e => console.error('Error:', e.message))"
```
