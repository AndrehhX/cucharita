import { useMemo, useState } from 'react';
import { Search, X, Timer, Volume2, CookingPot } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { matchByIngredients } from '../../lib/recipe-utils';
import SafeImage from '../../components/SafeImage';
import { Btn, Empty } from '../../components/ui';
import { Reveal } from '../../components/Reveal';
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
    <div className="px-4 md:px-2 pt-safe">
      <Reveal>
        <h1 className="font-display font-extrabold text-[26px] md:text-4xl leading-[1.05] tracking-tight pt-4">
          Busca recetas con lo que tienes en casa
        </h1>
        <p className="text-sm text-carbon-soft font-bold mt-1">Ingresa tus ingredientes y descubre qué puedes preparar.</p>
      </Reveal>

      <div className="mt-4 flex items-center gap-2 bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-soft border border-black/5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') add(input); }}
          placeholder="Ej: huevos, tomate, queso..."
          aria-label="Agregar ingrediente disponible"
          className="flex-1 bg-transparent outline-none text-sm font-bold min-w-0 placeholder:text-carbon-muted"
        />
        <button aria-label="Agregar ingrediente" onClick={() => add(input)} className="w-10 h-10 grid place-items-center bg-coral text-white rounded-full shadow-pop shrink-0 active:scale-95 transition">
          <Search className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3" aria-label="Ingredientes sugeridos">
        {SUGGESTED.map((s) => (
          <button
            key={s}
            aria-pressed={have.includes(s)}
            onClick={() => (have.includes(s) ? setHave(have.filter((x) => x !== s)) : setHave([...have, s]))}
            className={`px-3.5 py-2 rounded-full text-[13px] font-extrabold transition min-h-[36px] ${have.includes(s) ? 'bg-carbon text-white shadow-soft' : 'bg-white shadow-soft border border-black/5 hover:bg-crema'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {have.length > 0 && (
        <div className="mt-3 bg-white rounded-[1.4rem] p-4 shadow-soft border border-black/[0.04]">
          <p className="text-[13px] font-extrabold">Tienes ({have.length})</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {have.map((h) => (
              <span key={h} className="inline-flex items-center gap-1.5 bg-crema pl-3 pr-1.5 py-1.5 rounded-full text-[13px] font-extrabold">
                {h}
                <button aria-label={`Quitar ${h}`} onClick={() => setHave(have.filter((x) => x !== h))} className="w-6 h-6 grid place-items-center bg-white rounded-full shadow-soft">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <input
            placeholder="Excluir ingrediente (ej. nuez) + Enter"
            aria-label="Excluir ingrediente"
            className="mt-2.5 w-full bg-crema rounded-full px-4 py-2.5 text-[13px] font-bold outline-none focus:ring-2 focus:ring-miel"
            onKeyDown={(e) => { if (e.key === 'Enter') { const v = (e.target as HTMLInputElement).value.trim().toLowerCase(); if (v && !excluded.includes(v)) setExcluded([...excluded, v]); (e.target as HTMLInputElement).value = ''; } }}
          />
          {excluded.length > 0 && <p className="text-[12px] mt-1.5 font-bold text-miel-dark">Excluidos: {excluded.join(', ')} <button onClick={() => setExcluded([])} className="underline ml-1">limpiar</button></p>}
        </div>
      )}

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {results.slice(0, 8).map(({ recipe, have: h, missingList, score }) => {
          const pct = Math.round(score * 100);
          return (
            <div key={recipe.id} className="bg-white rounded-[1.4rem] p-3 shadow-soft border border-black/[0.04]">
              <div className="flex gap-3">
                <SafeImage src={recipe.image} alt={recipe.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-extrabold leading-tight">{recipe.name}</p>
                  <div className="mt-1.5 h-1.5 bg-crema rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-miel to-coral rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[12px] font-extrabold text-carbon-soft mt-1">{pct}% coincide • tienes {h}, faltan {missingList.length}</p>
                  {missingList.length > 0 && <p className="text-[12px] text-coral-deep font-bold truncate">Falta: {missingList.slice(0, 3).join(', ')}</p>}
                  <div className="mt-1.5 flex gap-1.5">
                    <Btn className="!py-1.5 !px-3.5 !text-[12px] !min-h-0" onClick={() => nav(`/receta/${recipe.id}`)}>Ver</Btn>
                    <Btn variant="soft" className="!py-1.5 !px-3.5 !text-[12px] !min-h-0" onClick={() => nav(`/cocinar/${recipe.id}`)}>Cocinar</Btn>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {have.length === 0 && <div className="mt-3"><Empty title="Agrega ingredientes" hint="Selecciona de la lista o escribe los que tengas." /></div>}

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Feature icon={<Timer className="w-8 h-8 text-coral" />} title="Cronómetro integrado" desc="Controla cada paso a la perfección." label="¡Comenzar!" onClick={() => nav('/explorar?fast=1')} />
        <Feature icon={<Volume2 className="w-8 h-8 text-cielo-dark" />} title="Audio de recetas" desc="Escucha mientras cocinas." label="Escuchar" onClick={() => nav('/explorar')} />
        <Feature icon={<CookingPot className="w-8 h-8 text-miel-dark" />} title="Cocina con lo que hay" desc="Aprovecha tu refri sin ir al súper." label="Probar" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      </div>
    </div>
  );
}

function Feature({ icon, title, desc, label, onClick }: { icon: React.ReactNode; title: string; desc: string; label: string; onClick: () => void }) {
  return (
    <div className="bg-gradient-to-br from-[#FFE9D2] to-white rounded-[1.6rem] p-4 flex gap-3 items-center shadow-soft border border-white/60">
      <span className="shrink-0 w-14 h-14 grid place-items-center bg-white rounded-2xl shadow-soft">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-extrabold leading-tight">{title}</p>
        <p className="text-[13px] font-semibold text-carbon-soft">{desc}</p>
        <button onClick={onClick} className="mt-1.5 bg-coral text-white text-[13px] font-extrabold px-4 py-1.5 rounded-full shadow-pop active:scale-95 transition">{label}</button>
      </div>
    </div>
  );
}
