# Atlas del gesto

Sitio editorial e interactivo sobre el lenguaje corporal de los personajes de
*Peaky Blinders* a lo largo de sus seis temporadas.

## Qué incluye

- 26 perfiles de personajes principales y recurrentes.
- 109 patrones de mirada, rostro, postura, manos, movimiento, voz, distancia y
  uso de objetos.
- Filtros por temporada y canal corporal.
- Búsqueda por personaje, gesto o intención.
- Fichas detalladas con observación, función dramática, contexto y evolución.
- Colección personal guardada localmente en el navegador.
- Método de lectura contextual y fuentes documentales.

El proyecto distingue entre hechos documentados en guiones o entrevistas y
lecturas interpretativas de la puesta en escena. No diagnostica a personas
reales ni trata un gesto aislado como prueba de una emoción.

## Desarrollo

Requiere Node.js 22.13 o posterior.

```bash
npm ci
npm run dev
```

Comprobaciones de producción:

```bash
npm run lint
npm run build
node --test tests/rendered-html.test.mjs
```

## Publicación

Cada actualización de la rama `main` ejecuta el flujo
`.github/workflows/pages.yml`, genera una versión estática en `pages-dist` y la
publica con GitHub Pages.

La aplicación también conserva una compilación compatible con Cloudflare
Workers mediante vinext.

## Investigación

Las fuentes principales están enlazadas dentro del propio sitio e incluyen
guiones de BBC Writersroom, notas de producción, entrevistas con el reparto y
revisiones académicas sobre conducta no verbal, poder y trauma.
