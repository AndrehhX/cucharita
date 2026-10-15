# Cucharita — Cocina, descubre y disfruta

App web de recetas (regalo para una niña de 12 años): catálogo local, búsqueda, filtros, detalle con porciones, modo cocina con temporizadores y audio, guardados con carpetas, búsqueda por ingredientes y perfil local. Lista para Capacitor (APK futura).

## Tecnologías
React 19, TypeScript strict, Vite, Tailwind 3, React Router, Motion, Lucide, TanStack Query, Zustand (persist), Supabase opcional, Vitest.

## Requisitos
Node 20+, npm 10+.

## Instalación
```bash
npm install
npm run dev
```

## Variables de entorno
Copiar `.env.example` a `.env`. Sin `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` la app usa modo local.

## Supabase (opcional)
- SQL en `supabase/migrations/001_init.sql`
- RLS activado en favoritos/colecciones por usuario
- Sin env → fallback a `src/data/catalog.ts` (24 recetas, precios Q estimados)

## Pruebas y build
```bash
npm test
npm run build
```

## Android (futuro)
```bash
npm run build
npx cap init Cucharita com.cucharita.app --web-dir=dist
npx cap add android
npx cap sync
```
No generar APK en esta fase.

## Limitaciones conocidas
- Imágenes remotas (Unsplash) requieren internet; hay fondo crema como fallback
- Audio usa Web Speech API si el dispositivo la soporta; si no, solo texto
- Ratings mostrados son placeholders locales, no reseñas reales
- Precios en Q son estimaciones
