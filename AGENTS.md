# AGENTS.md — Cucharita (App recetas)

## Stack
- React 19 + TypeScript strict + Vite 8
- Tailwind CSS 3, React Router, Motion, Lucide React
- TanStack Query (remoto), Zustand + persist (favoritos, carpetas, perfil), Zod (pendiente para formularios)
- Supabase (opcional, solo si hay `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`); sin env → modo local
- Vitest + Testing Library para pruebas unitarias
- Capacitor (preparación futura, no generar APK aún)

## Arquitectura
```
src/
  app/ (router, Shell)
  components/ (BottomNav, RecipeCard, ui)
  features/ (recipes, cooking, favorites, collections, profile, search)
  hooks/ (useCountdown con timestamps)
  lib/ (recipe-utils: escalado, filtros, match ingredientes, timers)
  repositories/ (supabase client null-safe + recipes repo con fallback local)
  data/ (catalog.ts: 24 recetas, precios Q estimados)
  types/
supabase/migrations/
tests/ (vitest)
```

## Convenciones
- Conventional Commits en inglés, atómicos: `feat:`, `fix:`, `chore:`, `test:`, `style:`
- Flujo: Implementar → Verificar (`npm run build`, `npm test`) → Commit → Continuar
- Mobile-first, Shell max-w-md móvil → md:max-w-3xl → lg:max-w-5xl; BottomNav centrada con botón central CookingPot → /ingredientes
- Paleta: crema #F9F3E9, coral #EF705D, cielo #7CA9D6, miel #E9B85D, carbón #292B35 (+ variantes soft/mist/dark)
- Tipografías: Baloo 2 (display) + Nunito (sans)
- Sin emojis como iconos (solo Lucide); emojis solo en textos lúdicos mínimos
- Sin ratings/reseñas ficticias: las tarjetas muestran tiempo, porciones y precio; nada de 4.9/5k
- Imágenes: Unsplash `images.unsplash.com` con `?auto=format&fit=crop&w=800&q=80`; `SafeImage` con fallback si falla; cada foto debe corresponder al plato
- Precios en Q siempre marcados como estimaciones
- No afirmar pixel-perfect sin captura comparada
- Accesibilidad: aria-labels en icon-buttons, focus-ring, min touch 44px, respects prefers-reduced-motion (Reveal usa useReducedMotion)
- Animación: Motion (`motion/react`) solo en aparición de tarjetas/secciones y modales; sin excesos

## Reglas Git
- Git init ya hecho. Commits atómicos después de cada unidad verificada
- No incluir `.env`, `node_modules`, `dist`
- Nunca `git push` sin autorización, nunca `--force`, nunca `reset --hard`, no reescribir historial
- Al finalizar cada etapa, informar hash corto

## Comandos
- `npm install` — instalar
- `npm run dev` — desarrollo
- `npm run build` — tsc + vite build (verificación obligatoria)
- `npm test` — vitest run
- Supabase: ver `supabase/migrations/*.sql` y `.env.example`

## Seguridad / Menor
- Sin registro obligatorio; perfil local; sin datos personales; sin funciones sociales; sin perfiles públicos
- No exponer service_role en frontend; solo anon key
