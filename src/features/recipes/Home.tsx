import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, ChefHat, CupSoda, CakeSlice, Leaf, UtensilsCrossed, LayoutGrid, ArrowRight } from 'lucide-react';
import { RECIPES, POPULAR_IDS, QUICK_IDS, DRINK_IDS } from '../../data/catalog';
import RecipeCard from '../../components/RecipeCard';
import { useProfile } from '../profile/store';

const CATS = [
  { id: 'comidas', label: 'Comidas', icon: UtensilsCrossed, bg: 'bg-coral' },
  { id: 'bebidas', label: 'Bebidas', icon: CupSoda, bg: 'bg-cielo' },
  { id: 'postres', label: 'Postres', icon: CakeSlice, bg: 'bg-miel' },
  { id: 'vegetarianas', label: 'Vegetarianas', icon: Leaf, bg: 'bg-carbon' },
  { id: 'mas', label: 'Más', icon: LayoutGrid, bg: 'bg-white' },
];

export default function Home() {
  const nav = useNavigate();
  const { name } = useProfile();
  const popular = POPULAR_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);
  const quick = QUICK_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);
  const drinks = DRINK_IDS.map((id) => RECIPES.find((r) => r.id === id)!).filter(Boolean);

  return (
    <div className="px-4 pt-safe">
      {/* Header */}
      <header className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 grid place-items-center rounded-2xl bg-coral text-white shadow-pop"><ChefHat /></span>
          <div>
            <p className="font-display font-extrabold text-xl leading-none">Cucharita</p>
            <p className="text-[11px] text-carbon-soft font-semibold">Cocina, descubre y disfruta ♡</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button aria-label="Notificaciones" className="w-9 h-9 grid place-items-center bg-white rounded-full shadow-soft"><Bell className="w-5 h-5" /></button>
          <Link to="/perfil" className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-soft bg-miel-soft grid place-items-center font-extrabold">
            {name.slice(0, 1)}
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mt-3 relative overflow-hidden rounded-[2rem] bg-[#FFE9D6] p-5 shadow-soft">
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/40 rounded-full" />
        <img
          src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=600&q=80"
          alt="Pasta"
          className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-44 h-44 object-cover rounded-full border-8 border-white/70 shadow-card"
        />
        <h1 className="font-display text-4xl leading-none font-extrabold">¡Hola!</h1>
        <p className="font-bold text-[15px] mt-1 max-w-[150px]">¿Qué receta quieres preparar hoy?</p>
        <button onClick={() => nav('/explorar')} className="mt-4 w-full max-w-[260px] flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-soft text-sm text-carbon-soft font-semibold">
          <Search className="w-4 h-4" /> Buscar recetas, ingredientes...
          <span className="ml-auto w-7 h-7 grid place-items-center rounded-full bg-white shadow-soft"><Search className="w-4 h-4 text-carbon" /></span>
        </button>
      </section>

      {/* Categories */}
      <section className="mt-4 flex justify-between">
        {CATS.map((c) => (
          <button key={c.id} onClick={() => nav(`/explorar?cat=${c.id}`)} className="flex flex-col items-center gap-1.5 w-14">
            <span className={`w-12 h-12 grid place-items-center rounded-full text-white shadow-soft ${c.bg} ${c.id === 'mas' ? '!text-carbon border' : ''}`}>
              <c.icon className="w-5 h-5" />
            </span>
            <span className="text-[11px] font-bold">{c.label}</span>
          </button>
        ))}
      </section>

      {/* Recomendadas */}
      <section className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-extrabold text-lg">Recetas recomendadas</h2>
          <Link to="/explorar" className="text-coral text-[13px] font-extrabold flex items-center gap-1">Ver todas <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {popular.slice(0, 2).map((r) => <RecipeCard key={r.id} r={r} />)}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-extrabold text-lg">Recetas rápidas</h2>
          <Link to="/explorar?fast=1" className="text-coral text-[13px] font-extrabold">Ver todas →</Link>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-1">
          {quick.map((r) => (
            <div key={r.id} className="min-w-[160px]"><RecipeCard r={r} /></div>
          ))}
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display font-extrabold text-lg">Smoothies y bebidas</h2>
          <Link to="/explorar?cat=bebidas" className="text-coral text-[13px] font-extrabold">Ver todas →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {drinks.slice(0, 2).map((r) => <RecipeCard key={r.id} r={r} />)}
        </div>
      </section>
    </div>
  );
}
