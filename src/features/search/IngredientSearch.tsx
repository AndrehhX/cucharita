import { useMemo, useState } from 'react';
import { X, Timer, Volume2, CookingPot, Plus, Ban, Check } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { matchByIngredients } from '../../lib/recipe-utils';
import SafeImage from '../../components/SafeImage';
import { Btn, Empty } from '../../components/ui';
import { Reveal } from '../../components/Reveal';
import { useNavigate } from 'react-router-dom';

const SUGGESTED = [
  'huevo', 'tomate', 'queso', 'pollo', 'arroz', 'leche',
  'banano', 'tortilla', 'fresa', 'papa', 'cebolla', 'harina',
  'aguacate', 'frijol', 'platano',
];

const COMMON_EXCLUSIONS = ['cebolla', 'chile', 'lacteos', 'carne'];

export default function IngredientSearch() {
  const nav = useNavigate();
  const [input, setInput] = useState('');
  const [have, setHave] = useState<string[]>(['huevo', 'tomate', 'queso']);
  const [excluded, setExcluded] = useState<string[]>([]);

  const add = (v: string) => {
    const t = v.trim().toLowerCase();
    if (t && !have.includes(t)) {
      setHave([...have, t]);
      // Si estaba excluido, removerlo de excluidos
      if (excluded.includes(t)) setExcluded(excluded.filter((x) => x !== t));
    }
    setInput('');
  };

  const toggleExclude = (v: string) => {
    const t = v.trim().toLowerCase();
    if (!t) return;
    if (excluded.includes(t)) {
      setExcluded(excluded.filter((x) => x !== t));
    } else {
      setExcluded([...excluded, t]);
      if (have.includes(t)) setHave(have.filter((x) => x !== t));
    }
  };

  const results = useMemo(() => matchByIngredients(RECIPES, have, excluded), [have, excluded]);

  return (
    <div className="px-4 md:px-2 pt-safe pb-8">
      <Reveal>
        <h1 className="font-display font-extrabold text-[26px] md:text-4xl leading-[1.05] tracking-tight pt-4">
          Busca recetas con lo que tienes en casa
        </h1>
        <p className="text-sm text-carbon-soft font-bold mt-1">Ingresa tus ingredientes y descubre qué puedes preparar ahora mismo.</p>
      </Reveal>

      {/* Input */}
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
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Sugerencias de ingredientes */}
      <div className="flex flex-wrap gap-2 mt-3" aria-label="Ingredientes sugeridos">
        {SUGGESTED.map((s) => {
          const selected = have.includes(s);
          return (
            <button
              key={s}
              aria-pressed={selected}
              onClick={() => (selected ? setHave(have.filter((x) => x !== s)) : add(s))}
              className={`px-3.5 py-2 rounded-full text-[13px] font-extrabold transition min-h-[36px] flex items-center gap-1.5 ${
                selected ? 'bg-carbon text-white shadow-soft scale-105' : 'bg-white shadow-soft border border-black/5 hover:bg-crema active:scale-95'
              }`}
            >
              {selected && <Check className="w-3.5 h-3.5 text-miel" />}
              {s}
            </button>
          );
        })}
      </div>

      {/* Panel de Tienes & Excluidos */}
      <div className="mt-3 bg-white rounded-[1.4rem] p-4 shadow-soft border border-black/[0.04] space-y-3">
        {have.length > 0 ? (
          <div>
            <p className="text-[13px] font-extrabold flex items-center justify-between">
              <span>Tienes en casa ({have.length})</span>
              <button onClick={() => setHave([])} className="text-[11px] text-coral-deep font-bold hover:underline">Limpiar todo</button>
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {have.map((h) => (
                <span key={h} className="inline-flex items-center gap-1.5 bg-crema pl-3 pr-1.5 py-1.5 rounded-full text-[13px] font-extrabold">
                  {h}
                  <button aria-label={`Quitar ${h}`} onClick={() => setHave(have.filter((x) => x !== h))} className="w-6 h-6 grid place-items-center bg-white rounded-full shadow-soft hover:bg-red-50">
                    <X className="w-3 h-3 text-carbon-soft" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-[13px] font-bold text-carbon-muted">Selecciona ingredientes arriba para buscar coincidencias.</p>
        )}

        {/* Excluir ingredientes */}
        <div className="pt-2 border-t border-black/5">
          <p className="text-[12px] font-extrabold text-carbon-soft flex items-center gap-1 mb-1.5">
            <Ban className="w-3.5 h-3.5 text-coral" /> Excluir ingredientes (alergias o preferencias)
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {COMMON_EXCLUSIONS.map((ex) => {
              const isEx = excluded.includes(ex);
              return (
                <button
                  key={ex}
                  onClick={() => toggleExclude(ex)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition ${
                    isEx ? 'bg-red-100 border-red-300 text-red-700' : 'bg-crema border-black/5 text-carbon-soft hover:bg-white'
                  }`}
                >
                  {isEx ? `✓ Sin ${ex}` : `+ Sin ${ex}`}
                </button>
              );
            })}
          </div>
          <input
            placeholder="Otro ingrediente a excluir (ej. nuez, mariscos) + Enter"
            aria-label="Excluir ingrediente"
            className="w-full bg-crema rounded-full px-4 py-2.5 text-[13px] font-bold outline-none focus:ring-2 focus:ring-miel"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const v = (e.target as HTMLInputElement).value;
                if (v.trim()) toggleExclude(v);
                (e.target as HTMLInputElement).value = '';
              }
            }}
          />
          {excluded.length > 0 && (
            <p className="text-[12px] mt-1.5 font-bold text-coral-deep">
              Recetas sin: {excluded.join(', ')}{' '}
              <button onClick={() => setExcluded([])} className="underline ml-1">limpiar filtros de exclusión</button>
            </p>
          )}
        </div>
      </div>

      {/* Resultados ordenados */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-extrabold text-lg">
            Recetas que puedes preparar ({results.length})
          </h2>
          <span className="text-[12px] font-extrabold text-carbon-muted">Ordenadas por coincidencia</span>
        </div>

        {results.length === 0 ? (
          <Empty title="No hay recetas con estos criterios" hint="Intenta quitar algún ingrediente excluido o agregar más ingredientes disponibles." />
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {results.slice(0, 10).map(({ recipe, have: h, missingList, score }) => {
              const pct = Math.round(score * 100);
              return (
                <Reveal key={recipe.id} className="h-full">
                  <div className="bg-white rounded-[1.4rem] p-3 shadow-soft border border-black/[0.04] h-full flex flex-col justify-between">
                    <div className="flex gap-3">
                      <SafeImage src={recipe.image} alt={recipe.name} className="w-20 h-20 rounded-2xl object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className="font-display font-extrabold leading-tight text-[15px]">{recipe.name}</p>
                          <span className="shrink-0 text-[11px] font-extrabold text-coral-deep bg-coral-soft px-2 py-0.5 rounded-full">
                            Q{recipe.basePriceQ}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 bg-crema rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-miel to-coral rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-[12px] font-extrabold text-carbon-soft mt-1">
                          {pct}% coincide • tienes {h} de {recipe.ingredients.length}
                        </p>
                        {missingList.length > 0 ? (
                          <p className="text-[11px] text-coral-deep font-bold truncate mt-0.5">
                            Falta: {missingList.slice(0, 3).join(', ')}
                          </p>
                        ) : (
                          <p className="text-[11px] text-[#2F7A3D] font-extrabold mt-0.5">
                            ✓ ¡Tienes todos los ingredientes!
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2 pt-2 border-t border-black/5">
                      <Btn className="flex-1 !py-2 !text-[13px] !min-h-0" onClick={() => nav(`/receta/${recipe.id}`)}>
                        Ver receta
                      </Btn>
                      <Btn variant="soft" className="flex-1 !py-2 !text-[13px] !min-h-0" onClick={() => nav(`/cocinar/${recipe.id}`)}>
                        Cocinar
                      </Btn>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-3">
        <Feature icon={<Timer className="w-8 h-8 text-coral" />} title="Cronómetro paso a paso" desc="Tiempos controlados sin quemar nada." label="Recetas rápidas" onClick={() => nav('/explorar?fast=1')} />
        <Feature icon={<Volume2 className="w-8 h-8 text-cielo-dark" />} title="Voz en la cocina" desc="Escucha instrucciones con manos libres." label="Explorar catálogo" onClick={() => nav('/explorar')} />
        <Feature icon={<CookingPot className="w-8 h-8 text-miel-dark" />} title="Presupuestos en Quetzales" desc="Calculado por ingrediente y porción." label="Volver arriba" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
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
