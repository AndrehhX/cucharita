import { Link, useNavigate } from 'react-router-dom';
import {
  Bell, Search, ChefHat, CupSoda, CakeSlice, Leaf,
  UtensilsCrossed, LayoutGrid, CookingPot, Heart, ArrowRight,
  Sparkles,
} from 'lucide-react';
import { RECIPES, POPULAR_IDS, QUICK_IDS, DRINK_IDS, GUATEMALAN_IDS } from '../../data/catalog';
import RecipeCard from '../../components/RecipeCard';
import SafeImage from '../../components/SafeImage';
import { SectionTitle } from '../../components/ui';
import { Reveal } from '../../components/Reveal';
import { useProfile } from '../profile/store';

const CATS = [
  { id: 'comidas', label: 'Comidas', icon: UtensilsCrossed, circle: 'bg-[#FFE0D6] text-coral-deep' },
  { id: 'bebidas', label: 'Bebidas', icon: CupSoda, circle: 'bg-cielo-soft text-cielo-dark' },
  { id: 'postres', label: 'Postres', icon: CakeSlice, circle: 'bg-miel-soft text-miel-dark' },
  { id: 'vegetarianas', label: 'Veggie', icon: Leaf, circle: 'bg-[#DFF0DF] text-[#2F7A3D]' },
  { id: 'todas', label: 'Más', icon: LayoutGrid, circle: 'bg-white text-carbon border border-black/5' },
];

export default function Home() {
  const nav = useNavigate();
  const { name } = useProfile();

  const popular = POPULAR_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);
  const guate = GUATEMALAN_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);
  const quick = QUICK_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);
  const drinks = DRINK_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);

  // Receta destacada en el hero: Pepián tradicional guatemalteco o Pasta Alfredo
  const featured = RECIPES.find((r) => r.id === 'pepian-pollo') ?? RECIPES[0];

  return (
    <div className="px-4 md:px-2 pt-safe pb-8">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2.5">
          <span className="w-11 h-11 grid place-items-center rounded-2xl bg-coral text-white shadow-pop">
            <ChefHat className="w-6 h-6" />
          </span>
          <div>
            <p className="font-display font-extrabold text-[22px] leading-none tracking-tight">Cucharita</p>
            <p className="text-[11px] text-carbon-soft font-bold">Cocina, descubre y disfruta ♡</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notificaciones" className="relative w-10 h-10 grid place-items-center bg-white rounded-full shadow-soft border border-black/5">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-coral rounded-full" />
          </button>
          <Link
            to="/perfil"
            aria-label="Ir al perfil"
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-soft bg-gradient-to-br from-miel to-coral grid place-items-center font-display font-extrabold text-white transition active:scale-95"
          >
            {name.slice(0, 1).toUpperCase()}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <Reveal>
        <section className="mt-4 relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#FFE7D2] via-[#FFF3E4] to-white p-5 md:p-8 shadow-hero border border-white/60">
          <span className="blob w-40 h-40 bg-white/50 -left-12 -bottom-16" />
          <span className="blob w-24 h-24 bg-coral/10 right-24 top-2" />
          <Heart className="absolute left-24 top-4 w-6 h-6 text-coral/60 rotate-[-12deg]" />

          <div className="relative flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 bg-coral/10 text-coral-deep text-[11px] font-extrabold px-2.5 py-0.5 rounded-full mb-1.5">
                <Sparkles className="w-3 h-3" /> Destacado del día
              </span>
              <h1 className="font-display font-extrabold text-[36px] md:text-5xl leading-[0.95] tracking-tight">
                ¡Hola {name.split(' ')[0]}!
              </h1>
              <p className="font-extrabold text-[14px] md:text-lg mt-1.5 max-w-[200px] md:max-w-xs leading-snug text-carbon-soft">
                ¿Qué receta auténtica te gustaría preparar hoy?
              </p>
            </div>
            <Link to={`/receta/${featured.id}`} className="relative shrink-0 group block" aria-label={`Ver receta destacada ${featured.name}`}>
              <SafeImage
                src={featured.image}
                alt={featured.name}
                eager
                className="w-36 h-36 md:w-52 md:h-52 object-cover rounded-full border-[6px] border-white shadow-card animate-float group-hover:scale-105 transition"
              />
              <span className="absolute -bottom-1 -left-2 bg-white rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-soft text-carbon flex items-center gap-1">
                Q{featured.basePriceQ} • {featured.baseServings} pers.
              </span>
            </Link>
          </div>

          <button
            onClick={() => nav('/explorar')}
            className="relative mt-4 w-full flex items-center gap-2 bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-soft border border-black/5 text-left active:scale-[0.99] transition"
          >
            <Search className="w-4 h-4 text-carbon-muted shrink-0" />
            <span className="flex-1 text-sm text-carbon-muted font-semibold truncate">Buscar recetas, ingredientes, categorías...</span>
            <span className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-soft border border-black/5">
              <Search className="w-4 h-4 text-carbon" />
            </span>
          </button>
        </section>
      </Reveal>

      {/* Categories */}
      <section className="mt-5" aria-label="Categorías principales">
        <div className="flex justify-between md:justify-start md:gap-6">
          {CATS.map((c) => (
            <button
              key={c.id}
              onClick={() => nav(c.id === 'todas' ? '/explorar' : `/explorar?cat=${c.id}`)}
              className="group flex flex-col items-center gap-1.5 w-16 md:w-20"
            >
              <span className={`w-[52px] h-[52px] md:w-14 md:h-14 grid place-items-center rounded-full shadow-soft transition group-active:scale-90 group-hover:scale-105 ${c.circle}`}>
                <c.icon className="w-5 h-5" />
              </span>
              <span className="text-[11px] md:text-xs font-extrabold">{c.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Sabores de Guatemala (Patrimonio Cultural y recetas auténticas) */}
      <section className="mt-6">
        <SectionTitle
          title="Sabores de Guatemala"
          link="Ver todas"
          onLink={() => nav('/explorar')}
        />
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-row -mx-4 px-4 pb-1 md:mx-0 md:px-0 md:grid md:grid-cols-4 md:overflow-visible">
          {guate.slice(0, 4).map((r, i) => (
            <div key={r.id} className="min-w-[170px] md:min-w-0">
              <RecipeCard r={r} delay={i * 0.05} />
            </div>
          ))}
        </div>
      </section>

      {/* Recomendadas */}
      <section className="mt-6">
        <SectionTitle title="Recetas recomendadas" link="Ver todas" onLink={() => nav('/explorar')} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popular.slice(0, 4).map((r, i) => <RecipeCard key={r.id} r={r} delay={i * 0.05} />)}
        </div>
      </section>

      {/* Rápidas */}
      <section className="mt-6">
        <SectionTitle title="Listas en 20 minutos" link="Ver todas" onLink={() => nav('/explorar?fast=1')} />
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-row -mx-4 px-4 pb-1 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {quick.slice(0, 3).map((r, i) => (
            <div key={r.id} className="min-w-[170px] md:min-w-0"><RecipeCard r={r} delay={i * 0.05} /></div>
          ))}
        </div>
      </section>

      {/* Refri CTA */}
      <Reveal className="mt-6">
        <section className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-coral via-coral-dark to-[#B84330] text-white p-5 md:p-7 shadow-pop">
          <CookingPot className="absolute -right-4 -bottom-4 w-32 h-32 opacity-15" />
          <p className="font-display font-extrabold text-xl md:text-2xl leading-tight max-w-[240px]">
            ¿Tienes ingredientes en tu refri?
          </p>
          <p className="text-[13px] font-semibold opacity-90 mt-1 max-w-sm">
            Ingresa lo que tienes a mano y nuestro algoritmo te muestra qué cocinar paso a paso.
          </p>
          <button
            onClick={() => nav('/ingredientes')}
            className="mt-3 inline-flex items-center gap-2 bg-white text-coral-deep font-extrabold text-sm px-5 py-2.5 rounded-full shadow-soft active:scale-95 transition"
          >
            Probar buscador de ingredientes <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </Reveal>

      {/* Bebidas y Smoothies */}
      <section className="mt-6">
        <SectionTitle title="Smoothies y bebidas" link="Ver todas" onLink={() => nav('/explorar?cat=bebidas')} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {drinks.slice(0, 4).map((r, i) => <RecipeCard key={r.id} r={r} delay={i * 0.05} />)}
        </div>
      </section>

      <p className="mt-6 text-center text-[11px] font-bold text-carbon-muted">
        Precios en quetzales son estimaciones referenciales de mercado • <Link to="/ingredientes" className="underline">¿Qué hay en tu refri?</Link>
      </p>
    </div>
  );
}
