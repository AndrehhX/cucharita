import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Heart, Share2, Clock, Minus, Plus, Play,
  Volume2, Check, Timer, Leaf, Gauge,
} from 'lucide-react';
import { getRecipe } from '../../data/catalog';
import { estimatePrice, formatQty, scaleQuantity } from '../../lib/recipe-utils';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import { Btn, Empty } from '../../components/ui';
import SafeImage from '../../components/SafeImage';
import { Reveal } from '../../components/Reveal';
import { speak, supportsSpeech } from '../../lib/speech';
import { useProfile } from '../profile/store';

export default function Detail() {
  const { id = '' } = useParams();
  const r = getRecipe(id);
  const nav = useNavigate();
  const { isFav, toggle } = useFavorites();
  const { collections, toggleRecipe } = useCollections();
  const { audioEnabled } = useProfile();
  const [servings, setServings] = useState(r?.baseServings ?? 4);
  const [checked, setChecked] = useState<number[]>([]);
  const [showCols, setShowCols] = useState(false);

  const price = useMemo(() => (r ? estimatePrice(r, servings) : 0), [r, servings]);
  if (!r) return <div className="p-6"><Empty title="Receta no encontrada" /></div>;
  const fav = isFav(r.id);

  const toggleIng = (i: number) =>
    setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));

  return (
    <div className="pb-4 md:px-2">
      {/* Hero */}
      <div className="relative md:rounded-[2rem] md:overflow-hidden md:mt-4">
        <SafeImage src={r.image} alt={r.name} eager className="w-full aspect-[16/10] md:aspect-[21/9] object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between pt-safe md:pt-0">
          <button aria-label="Atrás" onClick={() => history.back()} className="w-10 h-10 grid place-items-center bg-white/95 rounded-full shadow-soft active:scale-95 transition">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            <button
              aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
              aria-pressed={fav}
              onClick={() => toggle(r.id)}
              className={`w-10 h-10 grid place-items-center rounded-full shadow-soft active:scale-90 transition ${fav ? 'bg-coral text-white' : 'bg-white/95'}`}
            >
              <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
            </button>
            <button
              aria-label="Compartir"
              onClick={() => navigator.share?.({ title: r.name, text: r.description, url: location.href }).catch(() => {})}
              className="w-10 h-10 grid place-items-center bg-white/95 rounded-full shadow-soft active:scale-95 transition"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <div className="px-4 md:px-0 -mt-7 relative">
        <Reveal className="bg-white rounded-t-[2rem] rounded-b-[2rem] shadow-card border border-black/[0.04] p-5 md:p-8">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-display font-extrabold text-[26px] md:text-4xl leading-[1.05] tracking-tight">{r.name}</h1>
            <span className="shrink-0 bg-coral-soft text-coral-deep text-[12px] font-extrabold px-3 py-1.5 rounded-full">
              Q{price} • {servings} pers.
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2.5 flex-wrap text-[13px] font-extrabold">
            <span className="inline-flex items-center gap-1.5 bg-crema px-3 py-1.5 rounded-full"><Clock className="w-4 h-4 text-coral" />{r.timeMin} min</span>
            <span className="inline-flex items-center gap-1.5 bg-crema px-3 py-1.5 rounded-full"><Gauge className="w-4 h-4 text-cielo-dark" />{r.difficulty}</span>
            {r.vegetarian && <span className="inline-flex items-center gap-1.5 bg-[#E4F0E1] text-[#2F7A3D] px-3 py-1.5 rounded-full"><Leaf className="w-4 h-4" />Vegetariana</span>}
          </div>

          <p className="text-[15px] mt-3 text-carbon-soft font-semibold leading-relaxed">{r.description}</p>

          {/* Porciones */}
          <div className="mt-4 flex items-center justify-between bg-crema rounded-2xl px-4 py-3 border border-black/[0.04]">
            <div>
              <p className="font-extrabold text-sm">Porciones: {servings}</p>
              <p className="text-[11px] font-bold text-carbon-muted">Las cantidades y el precio se ajustan</p>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Menos porciones" onClick={() => setServings((s) => Math.max(1, s - 1))} className="w-9 h-9 grid place-items-center bg-white rounded-full shadow-soft active:scale-90 transition"><Minus className="w-4 h-4" /></button>
              <button aria-label="Más porciones" onClick={() => setServings((s) => Math.min(12, s + 1))} className="w-9 h-9 grid place-items-center bg-coral text-white rounded-full shadow-pop active:scale-90 transition"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Ingredientes */}
          <div className="mt-5 flex items-center justify-between">
            <h2 className="font-display font-extrabold text-lg">Ingredientes</h2>
            <button className="text-coral-deep text-[13px] font-extrabold hover:underline">Comprar todo</button>
          </div>
          <ul className="mt-1 divide-y divide-black/5">
            {r.ingredients.map((ing, i) => {
              const done = checked.includes(i);
              const qty = ing.scalable === false || ing.quantity === 0 ? ing.unit : `${formatQty(scaleQuantity(ing.quantity, r.baseServings, servings))} ${ing.unit}`.trim();
              return (
                <li key={i}>
                  <button onClick={() => toggleIng(i)} aria-pressed={done} className="w-full flex items-center gap-3 py-2.5 text-left min-h-[48px]">
                    <span className={`w-6 h-6 grid place-items-center rounded-lg border-2 transition shrink-0 ${done ? 'bg-cielo border-cielo text-white' : 'border-black/20 bg-white'}`}>
                      {done && <Check className="w-4 h-4" />}
                    </span>
                    <span className={`flex-1 text-sm font-bold ${done ? 'line-through text-carbon-muted' : ''}`}>{ing.name}</span>
                    <span className="text-[13px] font-extrabold text-carbon-soft whitespace-nowrap">{qty}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-carbon-muted mt-1.5 font-semibold">* Precios en quetzales son estimaciones y pueden variar.</p>

          {/* Pasos */}
          <h2 className="font-display font-extrabold text-lg mt-6">Pasos de preparación</h2>
          <ol className="mt-2.5 space-y-3">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-8 h-8 grid place-items-center rounded-full bg-coral text-white font-display font-extrabold"> {i + 1}</span>
                <div className="flex-1 bg-crema rounded-2xl p-3 flex gap-3 border border-black/[0.03]">
                  {s.image && <SafeImage src={s.image} alt={`Paso ${i + 1}`} className="w-20 h-20 md:w-28 md:h-24 object-cover rounded-xl shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold leading-relaxed">{s.instruction}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      {s.minutes ? (
                        <span className="inline-flex items-center gap-1 text-[12px] font-extrabold text-coral-deep bg-white px-2.5 py-1 rounded-full shadow-soft">
                          <Timer className="w-3.5 h-3.5" /> {s.minutes}:00
                        </span>
                      ) : null}
                      {audioEnabled && supportsSpeech() && (
                        <button aria-label={`Escuchar paso ${i + 1}`} onClick={() => speak(s.instruction)} className="w-8 h-8 grid place-items-center bg-white rounded-full shadow-soft active:scale-90 transition">
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 grid gap-2">
            <Btn onClick={() => nav(`/cocinar/${r.id}?porciones=${servings}`)} className="w-full text-base py-4">
              <Timer className="w-5 h-5" /> Cocinar ahora
            </Btn>
            <div className="grid grid-cols-2 gap-2">
              <Btn variant="outline" onClick={() => setShowCols((v) => !v)}>+ Carpeta</Btn>
              <Btn variant="soft" onClick={() => audioEnabled && speak(`${r.name}. ${r.steps.map((s) => s.instruction).join(' ')}`)} className="flex items-center justify-center gap-1.5">
                <Volume2 className="w-4 h-4" /> Escuchar
              </Btn>
            </div>
            {showCols && (
              <div className="bg-crema rounded-2xl p-3 space-y-1.5 border border-black/5">
                {collections.map((c) => (
                  <label key={c.id} className="flex items-center gap-2.5 text-sm font-bold bg-white rounded-xl px-3 py-2.5 cursor-pointer">
                    <input type="checkbox" checked={c.recipeIds.includes(r.id)} onChange={() => toggleRecipe(c.id, r.id)} className="w-4 h-4 accent-[#EF705D]" />
                    {c.name}
                  </label>
                ))}
              </div>
            )}
            <Link to="/ingredientes" className="text-center text-[13px] font-extrabold text-cielo-dark hover:underline py-1">
              ¿Tienes pocos ingredientes? Busca por lo que hay en casa →
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
