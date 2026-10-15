import { useMemo, useState } from 'react';
import { Search, X, Timer, Volume2, CookingPot } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { matchByIngredients } from '../../lib/recipe-utils';
import RecipeCard from '../../components/RecipeCard';
import { Btn, Empty } from '../../components/ui';
import { useNavigate } from 'react-router-dom';

const SUGGESTED = ['huevo', 'tomate', 'queso', 'pollo', 'arroz', 'leche', 'banano', 'tortilla', 'fresa', 'papa', 'cebolla', 'harina'];

export default function IngredientSearch() {
  const nav = useNavigate();
  const [input, setInput] = useState('');
  const [have, setHave] = useState<string[]>(['huevo', 'tomate', 'queso']);
  const [excluded, setExcluded] = useState<string[]>([]);

  const add = (v: string) => {
    const t = v.trim().toLowerCase();
    if (t && !have.includes(t)) setHave([...have, t]);
    setInput('');
  };

  const results = useMemo(() => matchByIngredients(RECIPES, have, excluded), [have, excluded]);

  return (
    <div className="px-4 pt-safe">
      <h1 className="font-display font-extrabold text-2xl pt-4">Busca recetas con lo que tienes en casa</h1>
      <p className="text-sm text-carbon-soft font-semibold">Ingresa tus ingredientes y descubre qué puedes preparar.</p>

      <div className="mt-3 flex items-center gap-2 bg-white rounded-full px-4 py-3 shadow-soft">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') add(input); }}
          placeholder="Ej: huevos, tomate, queso..."
          className="flex-1 bg-transparent outline-none text-sm font-semibold"
        />
        <button aria-label="Buscar" onClick={() => add(input)} className="w-9 h-9 grid place-items-center bg-coral text-white rounded-full"><Search className="w-4 h-4" /></button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {SUGGESTED.map((s) => (
          <button key={s} onClick={() => (have.includes(s) ? setHave(have.filter((x) => x !== s)) : setHave([...have, s]))} className={`px-3 py-1.5 rounded-full text-[13px] font-extrabold ${have.includes(s) ? 'bg-carbon text-white' : 'bg-white shadow-soft'}`}>{s}</button>
        ))}
      </div>

      {have.length > 0 && (
        <div className="mt-3 bg-white rounded-2xl p-3 shadow-soft">
          <p className="text-[13px] font-extrabold">Tienes ({have.length}):</p>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {have.map((h) => (
              <span key={h} className="flex items-center gap-1 bg-crema px-2 py-1 rounded-full text-[13px] font-bold">{h}
                <button aria-label={`Quitar ${h}`} onClick={() => setHave(have.filter((x) => x !== h))}><X className="w-3 h-3" /></button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input placeholder="Excluir (ej. nuez)" className="flex-1 bg-crema rounded-full px-3 py-2 text-[13px] font-bold outline-none"
              onKeyDown={(e) => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value.trim().toLowerCase(); if (v) setExcluded([...excluded, v]); (e.target as HTMLInputElement).value = ''; } }} />
          </div>
          {excluded.length > 0 && <p className="text-[12px] mt-1">Excluidos: {excluded.join(', ')} <button onClick={() => setExcluded([])} className="underline">limpiar</button></p>}
        </div>
      )}

      <div className="mt-4 space-y-3">
        {results.slice(0, 8).map(({ recipe, have: h, missingList, score }) => (
          <div key={recipe.id} className="bg-white rounded-3xl p-3 shadow-soft">
            <div className="flex gap-3">
              <img src={recipe.image} alt={recipe.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <p className="font-extrabold leading-tight">{recipe.name}</p>
                <p className="text-[12px] font-bold text-carbon-soft">{Math.round(score * 100)}% coincide • tienes {h}, te faltan {missingList.length}</p>
                {missingList.length > 0 && <p className="text-[12px] text-coral-dark font-bold">Falta: {missingList.slice(0, 3).join(', ')}</p>}
                <div className="mt-1 flex gap-1">
                  <Btn className="!py-1.5 !px-3 !text-[12px]" onClick={() => nav(`/receta/${recipe.id}`)}>Ver</Btn>
                  <Btn variant="soft" className="!py-1.5 !px-3 !text-[12px]" onClick={() => nav(`/cocinar/${recipe.id}`)}>Cocinar</Btn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {have.length === 0 && <div className="mt-3"><Empty title="Agrega ingredientes" hint="Selecciona de la lista o escribe los que tengas." /></div>}

      <div className="mt-5 grid gap-3">
        <Feature icon={<Timer className="w-8 h-8 text-coral" />} title="Cronómetro integrado" desc="Controla el tiempo de cada paso para cocinar a la perfección." label="¡Comenzar!" onClick={() => nav('/explorar?fast=1')} />
        <Feature icon={<Volume2 className="w-8 h-8 text-cielo-dark" />} title="Audio de recetas" desc="Escucha las instrucciones mientras cocinas." label="Escuchar" onClick={() => nav('/explorar')} />
        <Feature icon={<CookingPot className="w-8 h-8 text-miel-dark" />} title="Cocina con lo que hay" desc="Aprovecha tu refri sin ir al súper." label="Probar" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>

      <div className="hidden"><RecipeCard r={RECIPES[0]} /></div>
    </div>
  );
}

function Feature({ icon, title, desc, label, onClick }: { icon: React.ReactNode; title: string; desc: string; label: string; onClick: () => void }) {
  return (
    <div className="bg-[#FFE9D6] rounded-3xl p-4 flex gap-3 items-center shadow-soft">
      <span className="shrink-0 w-14 h-14 grid place-items-center bg-white rounded-2xl">{icon}</span>
      <div className="flex-1">
        <p className="font-display font-extrabold">{title}</p>
        <p className="text-[13px] font-semibold text-carbon-soft">{desc}</p>
        <button onClick={onClick} className="mt-1 bg-coral text-white text-[13px] font-extrabold px-4 py-1.5 rounded-full">{label}</button>
      </div>
    </div>
  );
}
