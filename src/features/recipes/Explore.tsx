import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X, Leaf, CakeSlice } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { filterRecipes } from '../../lib/recipe-utils';
import type { Filters } from '../../types';
import RecipeCard from '../../components/RecipeCard';
import { Btn, Chip, Empty } from '../../components/ui';

export default function Explore() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = useState('');
  const [price, setPrice] = useState<Filters['price']>('all');
  const [servings, setServings] = useState<Filters['servings']>('all');
  const [onlyVeg, setOnlyVeg] = useState(false);
  const [onlyDessert, setOnlyDessert] = useState(false);
  const [sort, setSort] = useState<Filters['sort']>('relevance');

  const catParam = sp.get('cat');
  const category: Filters['category'] =
    catParam === 'bebidas' ? 'bebidas'
    : catParam === 'comidas' ? 'comidas'
    : catParam === 'postres' ? 'postres'
    : catParam === 'vegetarianas' ? 'vegetarianas'
    : 'todas';

  const results = useMemo(() => {
    let f: Filters = { q, price, servings, onlyVeg, onlyDessert, category, sort };
    if (sp.get('fast') === '1') return filterRecipes(RECIPES, { ...f, sort: 'time' }).filter((r) => r.timeMin <= 20);
    return filterRecipes(RECIPES, f);
  }, [q, price, servings, onlyVeg, onlyDessert, category, sort, sp]);

  const clear = () => {
    setQ(''); setPrice('all'); setServings('all'); setOnlyVeg(false); setOnlyDessert(false);
    setSp({});
  };

  return (
    <div className="px-4 pt-safe">
      <div className="flex items-center gap-2 pt-4">
        <button aria-label="Atrás" onClick={() => history.back()} className="w-9 h-9 grid place-items-center"><ArrowLeft /></button>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-soft">
          <Search className="w-4 h-4 text-carbon-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar recetas o ingredientes..."
            className="flex-1 bg-transparent outline-none text-sm font-semibold"
          />
          {q && <button aria-label="Limpiar" onClick={() => setQ('')}><X className="w-4 h-4" /></button>}
        </div>
      </div>

      <h2 className="font-display font-extrabold text-lg mt-4">Filtros</h2>
      <div className="mt-2 space-y-3 text-sm font-bold">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-coral">Precio:</span>
          <Chip active={price === 'all'} onClick={() => setPrice('all')}>Todos</Chip>
          <Chip active={price === 'low'} onClick={() => setPrice('low')}>&lt; Q25</Chip>
          <Chip active={price === 'mid'} onClick={() => setPrice('mid')}>Q25 – Q50</Chip>
          <Chip active={price === 'high'} onClick={() => setPrice('high')}>&gt; Q50</Chip>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-coral">Personas:</span>
          <Chip active={servings === '1-2'} onClick={() => setServings(servings === '1-2' ? 'all' : '1-2')}>1–2</Chip>
          <Chip active={servings === '3-4'} onClick={() => setServings(servings === '3-4' ? 'all' : '3-4')}>3–4</Chip>
          <Chip active={servings === '5+'} onClick={() => setServings(servings === '5+' ? 'all' : '5+')}>5+</Chip>
        </div>
        <Toggle icon={<Leaf className="w-4 h-4" />} label="Solo vegetarianas" value={onlyVeg} onChange={setOnlyVeg} />
        <Toggle icon={<CakeSlice className="w-4 h-4" />} label="Solo postres" value={onlyDessert} onChange={setOnlyDessert} />
        <div className="grid grid-cols-2 gap-2">
          <Btn variant="outline" onClick={clear}>Limpiar filtros</Btn>
          <Btn onClick={() => {}}>Aplicar filtros</Btn>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <h3 className="font-extrabold">Resultados ({results.length} recetas)</h3>
        <select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value as Filters['sort'])} className="bg-transparent text-[13px] font-extrabold">
          <option value="relevance">Ordenar por</option>
          <option value="time">Tiempo</option>
          <option value="price">Precio</option>
          <option value="name">Nombre</option>
        </select>
      </div>

      {results.length === 0 ? (
        <Empty title="Sin resultados" hint="Prueba con otra búsqueda o limpia los filtros." />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {results.map((r) => <RecipeCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}

function Toggle({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)} className="w-full flex items-center gap-2 bg-white rounded-2xl px-3 py-3 shadow-soft">
      <span className="w-8 h-8 grid place-items-center rounded-full bg-crema">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
      <span className={`w-11 h-6 rounded-full p-1 transition ${value ? 'bg-coral' : 'bg-black/15'}`}>
        <span className={`block w-4 h-4 bg-white rounded-full transition ${value ? 'ml-auto' : ''}`} />
      </span>
    </button>
  );
}
