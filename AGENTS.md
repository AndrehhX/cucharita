# AGENTS.md — Cucharita (App recetas)

## Stack
- React 19 + TypeScript strict + Vite 8
- Tailwind CSS 3, React Router, Motion (`motion/react`), Lucide React
- TanStack Query (remoto), Zustand + persist (favoritos, carpetas, perfil), Zod
- Supabase (opcional, solo si hay `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`); sin env → modo local
- Vitest + Testing Library para pruebas unitarias
- Capacitor (preparación futura, no generar APK aún)

## Arquitectura
```
src/
  app/ (router con lazy loading y Suspense, Shell con transiciones fluidas)
  components/ (BottomNav, RecipeCard, SafeImage, Reveal, ui con PageLoader)
  features/ (recipes, cooking, favorites, collections, profile, search)
  hooks/ (useCountdown con timestamps de alta precisión)
  lib/ (recipe-utils: escalado, fracciones, presupuestos GTQ, match ingredientes semántico, timers)
  repositories/ 
    - supabase.ts (cliente null-safe)
    - recipes.ts (repo con fallback local y mapeo snake_case -> camelCase)
    - ratings.ts (calificaciones auténticas 1-5 estrellas locales y remotas autenticadas)
    - sync.ts (migración no destructiva de favoritos y carpetas)
  data/ (catalog.ts: recetas auténticas, gastronomía guatemalteca y latinoamericana, procedencia y licencias)
  types/ (tipos estrictos: Recipe, BudgetBreakdown, RecipeRatingSummary, etc.)
supabase/migrations/
  - 001_init.sql (tablas base)
  - 002_premium_expansion.sql (ingredientes normalizados, valoraciones, pasos, RLS)
  - 003_security_hardening.sql (RLS estricto, bloqueo de escritura anónima remota, permisos de solo lectura)
tests/ (vitest: tests unitarios de utilidades, presupuesto, búsqueda, integridad de catálogo y sincronización)
```

## Convenciones
- Conventional Commits en inglés, atómicos: `feat:`, `fix:`, `chore:`, `test:`, `style:`, `docs:`
- Flujo: Implementar → Verificar (`npm run build`, `npm test`) → Commit → Continuar
- Mobile-first, Shell max-w-md móvil → md:max-w-3xl → lg:max-w-5xl; BottomNav centrada con botón central CookingPot → /ingredientes
- Paleta: crema #F9F3E9, coral #EF705D, cielo #7CA9D6, miel #E9B85D, carbón #292B35 (+ variantes soft/mist/dark)
- Tipografías: Baloo 2 (display) + Nunito (sans)
- Sin emojis como iconos (solo Lucide); emojis solo en textos lúdicos mínimos
- Sin ratings/reseñas ficticias: las calificaciones provienen de usuarios/clientes reales y se promedian honestamente de 1 a 5 estrellas; si no hay, muestra "Sin valoraciones aún"
- Imágenes: Unsplash `images.unsplash.com` con `?auto=format&fit=crop&w=800&q=80`; `SafeImage` con fallback si falla; cada foto debe corresponder rigurosamente al plato
- Precios en Q: calculados por ingrediente distinguiendo coste proporcional de consumo vs compra de presentación completa comercial en GT
- Accesibilidad: aria-labels en icon-buttons, focus-ring, min touch 44px, respects prefers-reduced-motion (Reveal y Cooking usan useReducedMotion)
- Animación: Motion (`motion/react`) sutil y fluida en pasos de cocina, transiciones de ruta, aparición de tarjetas y modales
- Rendimiento: Code-splitting con `React.lazy` para mantener el bundle inicial por debajo de 400 kB

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
- Sin registro obligatorio; modo invitado como experiencia principal
- Espacio seguro para menores: sin datos personales, sin anuncios, sin funciones sociales ni perfiles públicos
- No exponer service_role en frontend; solo anon key
- En base de datos remota: escrituras de calificaciones restringidas a sesiones autenticadas; modo invitado almacena valoraciones exclusivamente en el dispositivo local para evitar suplantación o manipulación de promedios
