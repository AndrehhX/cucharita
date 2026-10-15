import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X, Leaf, CakeSlice, SlidersHorizontal } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { filterRecipes } from '../../lib/recipe-utils';
import { listRecipesWithStatus } from '../../repositories/recipes';
import type { Filters, Recipe } from '../../types';
import RecipeCard from '../../components/RecipeCard';
import SafeImage from '../../components/SafeImage';
import { Btn, Chip, Empty } from '../../components/ui';

export default function Explore() {
  const [sp, setSp] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);
  const [dataSource, setDataSource] = useState<'local' | 'remote'>('local');
  const [q, setQ] = useState('');
  const [price, setPrice] = useState<Filters['price']>('all');
  const [servings, setServings] = useState<Filters['servings']>('all');
  const [ingredientCount, setIngredientCount] = useState<Filters['ingredientCount']>('all');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlyDessert, setOnlyDessert] = useState(false);
  const [sort, setSort] = useState<Filters['sort']>('relevance');

  useEffect(() => {
    let active = true;
    listRecipesWithStatus().then((res) => {
      if (active && res.source === 'remote') {
        setRecipes(res.recipes);
        setDataSource('remote');
      }
    });
    return () => { active = false; };
  }, []);

  const catParam = sp.get('cat');
  const category: Filters['category'] =
    catParam === 'bebidas' ? 'bebidas'
    : catParam === 'comidas' ? 'comidas'
    : catParam === 'postres' ? 'postres'
    : catParam === 'vegetarianas' ? 'vegetarianas'
    : 'todas';

  const results = useMemo(() => {
    const f: Filters = { q, price, servings, ingredientCount, onlyVeg, onlyDessert, category, sort };
    if (sp.get('fast') === '1') return filterRecipes(recipes, { ...f, sort: 'time' }).filter((r) => r.timeMin <= 20);
    return filterRecipes(recipes, f);
  }, [q, price, servings, ingredientCount, onlyVeg, onlyDessert, category, sort, sp, recipes]);

  const clear = () => {
    setQ(''); setPrice('all'); setServings('all'); setIngredientCount('all'); setOnlyVeg(false); setOnlyDessert(false);
    setSp({});
  };

  return (
    <div className="px-4 md:px-2 pt-safe">
      {/* Search */}
      <div className="flex items-center gap-2 pt-4">
        <button aria-label="Atrás" onClick={() => history.back()} className="w-10 h-10 grid place-items-center bg-white rounded-full shadow-soft border border-black/5 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-soft border border-black/5">
          <Search className="w-4 h-4 text-carbon-muted shrink-0" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar recetas o ingredientes..."
            aria-label="Buscar recetas o ingredientes"
            className="flex-1 bg-transparent outline-none text-sm font-bold placeholder:text-carbon-muted min-w-0"
          />
          {q ? (
            <button aria-label="Limpiar búsqueda" onClick={() => setQ('')} className="w-8 h-8 grid place-items-center rounded-full bg-crema">
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="w-9 h-9 grid place-items-center rounded-full bg-coral text-white shrink-0"><Search className="w-4 h-4" /></span>
          )}
        </div>
      </div>

      {/* Filters card */}
      <section aria-label="Filtros" className="mt-4 bg-white rounded-[1.8rem] shadow-card border border-black/[0.04] p-5">
        <h2 className="font-display font-extrabold text-lg flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-coral" /> Filtros
        </h2>

        <div className="mt-3">
          <p className="text-[13px] font-extrabold text-coral-deep mb-1.5">Precio estimado</p>
          <div className="flex gap-2 flex-wrap">
            <Chip active={price === 'all'} onClick={() => setPrice('all')}>Todos</Chip>
            <Chip active={price === 'low'} onClick={() => setPrice('low')}>&lt; Q25</Chip>
            <Chip active={price === 'mid'} onClick={() => setPrice('mid')}>Q25 – Q50</Chip>
            <Chip active={price === 'high'} onClick={() => setPrice('high')}>&gt; Q50</Chip>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[13px] font-extrabold text-coral-deep mb-1.5">Personas</p>
          <div className="flex gap-2">
            <Chip active={servings === '1-2'} onClick={() => setServings(servings === '1-2' ? 'all' : '1-2')}>1–2</Chip>
            <Chip active={servings === '3-4'} onClick={() => setServings(servings === '3-4' ? 'all' : '3-4')}>3–4</Chip>
            <Chip active={servings === '5+'} onClick={() => setServings(servings === '5+' ? 'all' : '5+')}>5+</Chip>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[13px] font-extrabold text-coral-deep mb-1.5">Cantidad de ingredientes</p>
          <div className="flex gap-2 flex-wrap">
            <Chip active={ingredientCount === 'all'} onClick={() => setIngredientCount('all')}>Todos</Chip>
            <Chip active={ingredientCount === 'few'} onClick={() => setIngredientCount('few')}>Pocos (≤ 5 ing.)</Chip>
            <Chip active={ingredientCount === 'many'} onClick={() => setIngredientCount('many')}>Muchos (&gt; 5 ing.)</Chip>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          <Toggle icon={<Leaf className="w-4 h-4 text-[#2F7A3D]" />} label="Solo vegetarianas" value={onlyVeg} onChange={setOnlyVeg} />
          <Toggle icon={<CakeSlice className="w-4 h-4 text-miel-dark" />} label="Solo postres" value={onlyDessert} onChange={setOnlyDessert} />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Btn variant="outline" onClick={clear}>Limpiar filtros</Btn>
          <Btn onClick={() => document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' })}>Aplicar filtros</Btn>
        </div>
      </section>

      {/* Results */}
      <div id="resultados" className="flex items-center justify-between mt-5 mb-2.5 scroll-mt-4">
        <div className="flex items-center gap-2">
          <h3 className="font-display font-extrabold text-[17px]">Resultados ({results.length})</h3>
          {dataSource === 'remote' && (
            <span className="text-[10px] font-extrabold bg-[#E4F0E1] text-[#2F7A3D] px-2 py-0.5 rounded-full">
              En la nube
            </span>
          )}
        </div>
        <label className="flex items-center gap-1.5 text-[13px] font-extrabold bg-white px-3 py-2 rounded-full shadow-soft border border-black/5">
          Ordenar
          <select aria-label="Ordenar resultados" value={sort} onChange={(e) => setSort(e.target.value as Filters['sort'])} className="bg-transparent outline-none font-extrabold text-coral-deep">
            <option value="relevance">Relevancia</option>
            <option value="time">Tiempo</option>
            <option value="price">Precio</option>
            <option value="name">Nombre</option>
          </select>
        </label>
      </div>

      {results.length === 0 ? (
        <Empty title="Sin resultados" hint="Prueba con otra búsqueda o limpia los filtros." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {results.map((r, i) => <RecipeCard key={r.id} r={r} delay={Math.min(i, 6) * 0.04} />)}
        </div>
      )}
      <div className="hidden"><SafeImage src={RECIPES[0].image} alt="" /></div>
    </div>
  );
}

function Toggle({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className="w-full flex items-center gap-2.5 bg-crema rounded-2xl px-3 py-2.5 min-h-[52px] text-left"
    >
      <span className="w-9 h-9 grid place-items-center rounded-full bg-white shadow-soft shrink-0">{icon}</span>
      <span className="flex-1 text-sm font-extrabold">{label}</span>
      <span className={`w-12 h-7 rounded-full p-1 transition shrink-0 ${value ? 'bg-coral' : 'bg-black/15'}`}>
        <span className={`block w-5 h-5 bg-white rounded-full shadow transition ${value ? 'ml-auto' : ''}`} />
      </span>
    </button>
  );
}
