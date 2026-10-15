import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Clock, Star, Minus, Plus, Play, Volume2, Check } from 'lucide-react';
import { getRecipe } from '../../data/catalog';
import { estimatePrice, formatQty, scaleQuantity } from '../../lib/recipe-utils';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import { Btn, Empty } from '../../components/ui';
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
    <div className="pb-4">
      <div className="relative">
        <img src={r.image} alt={r.name} className="w-full aspect-[16/10] object-cover" />
        <div className="absolute top-4 left-4 right-4 flex justify-between pt-safe">
          <button aria-label="Atrás" onClick={() => history.back()} className="w-10 h-10 grid place-items-center bg-white/90 rounded-full shadow-soft"><ArrowLeft /></button>
          <div className="flex gap-2">
            <button aria-label="Guardar" onClick={() => toggle(r.id)} className={`w-10 h-10 grid place-items-center rounded-full shadow-soft ${fav ? 'bg-coral text-white' : 'bg-white/90'}`}>
              <Heart className={`w-5 h-5 ${fav ? 'fill-current' : ''}`} />
            </button>
            <button aria-label="Compartir" onClick={() => navigator.share?.({ title: r.name, text: r.description, url: location.href }).catch(() => {})} className="w-10 h-10 grid place-items-center bg-white/90 rounded-full shadow-soft"><Share2 className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 relative">
        <div className="bg-white rounded-[1.8rem] shadow-card p-5">
          <div className="flex items-start justify-between gap-2">
            <h1 className="font-display font-extrabold text-2xl leading-tight">{r.name}</h1>
            <span className="whitespace-nowrap bg-coral-soft text-coral-dark text-[12px] font-extrabold px-3 py-1.5 rounded-full">Q{price} – {servings} pers.</span>
          </div>
          <div className="flex items-center gap-3 mt-1 text-[13px] font-bold text-carbon-soft">
            <span className="flex items-center gap-1 text-[#E9A100]"><Star className="w-4 h-4 fill-current" />4.9 (5k reseñas)</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{r.timeMin} min</span>
            <span className="bg-miel-soft px-2 py-0.5 rounded-full">{r.difficulty}</span>
          </div>
          <p className="text-sm mt-2 text-carbon-soft font-medium">{r.description}</p>

          {/* Porciones */}
          <div className="mt-3 flex items-center justify-between bg-crema rounded-2xl px-4 py-3">
            <span className="font-extrabold text-sm">Porciones: {servings}</span>
            <div className="flex items-center gap-2">
              <button aria-label="Menos porciones" onClick={() => setServings((s) => Math.max(1, s - 1))} className="w-8 h-8 grid place-items-center bg-white rounded-full shadow-soft"><Minus className="w-4 h-4" /></button>
              <button aria-label="Más porciones" onClick={() => setServings((s) => Math.min(12, s + 1))} className="w-8 h-8 grid place-items-center bg-coral text-white rounded-full"><Plus className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Ingredientes */}
          <div className="mt-4 flex items-center justify-between">
            <h2 className="font-display font-extrabold flex items-center gap-2">🧂 Ingredientes</h2>
            <button className="text-coral text-[13px] font-extrabold">Comprar todo</button>
          </div>
          <ul className="mt-2 divide-y divide-black/5">
            {r.ingredients.map((ing, i) => {
              const done = checked.includes(i);
              const qty = ing.scalable === false || ing.quantity === 0 ? ing.unit : `${formatQty(scaleQuantity(ing.quantity, r.baseServings, servings))} ${ing.unit}`.trim();
              return (
                <li key={i}>
                  <button onClick={() => toggleIng(i)} className="w-full flex items-center gap-3 py-2.5 text-left">
                    <span className={`w-5 h-5 grid place-items-center rounded-md border-2 ${done ? 'bg-cielo border-cielo text-white' : 'border-black/20'}`}>
                      {done && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <span className={`flex-1 text-sm font-semibold ${done ? 'line-through text-carbon-muted' : ''}`}>{ing.name}</span>
                    <span className="text-[13px] font-bold text-carbon-soft">{qty}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="text-[11px] text-carbon-muted mt-1">* Precios en quetzales son estimaciones y pueden variar.</p>

          {/* Pasos */}
          <h2 className="font-display font-extrabold mt-5">Pasos de preparación</h2>
          <ol className="mt-2 space-y-3">
            {r.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 grid place-items-center rounded-full bg-coral text-white font-extrabold text-sm">{i + 1}</span>
                <div className="flex-1 bg-crema rounded-2xl p-3 flex gap-3">
                  {s.image && <img src={s.image} alt="" className="w-20 h-20 object-cover rounded-xl" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{s.instruction}</p>
                    {s.minutes && <span className="inline-flex items-center gap-1 mt-1 text-[12px] font-extrabold text-coral-dark bg-white px-2 py-1 rounded-full">⏱ {s.minutes}:00</span>}
                  </div>
                  {audioEnabled && supportsSpeech() && (
                    <button aria-label={`Escuchar paso ${i + 1}`} onClick={() => speak(s.instruction)} className="self-center w-8 h-8 grid place-items-center bg-white rounded-full shadow-soft"><Play className="w-4 h-4" /></button>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4 grid gap-2">
            <Btn onClick={() => nav(`/cocinar/${r.id}?porciones=${servings}`)} className="w-full flex items-center justify-center gap-2">
              ⏱ Iniciar modo cocina
            </Btn>
            <div className="grid grid-cols-2 gap-2">
              <Btn variant="outline" onClick={() => setShowCols((v) => !v)}>+ Carpeta</Btn>
              <Btn variant="soft" onClick={() => audioEnabled && speak(`${r.name}. ${r.steps.map((s) => s.instruction).join(' ')}`)} className="flex items-center justify-center gap-1">
                <Volume2 className="w-4 h-4" /> Escuchar
              </Btn>
            </div>
            {showCols && (
              <div className="bg-crema rounded-2xl p-3 space-y-1">
                {collections.map((c) => (
                  <label key={c.id} className="flex items-center gap-2 text-sm font-bold bg-white rounded-xl px-3 py-2">
                    <input
                      type="checkbox"
                      checked={c.recipeIds.includes(r.id)}
                      onChange={() => toggleRecipe(c.id, r.id)}
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            )}
            <Link to="/ingredientes" className="text-center text-[13px] font-bold text-cielo-dark">¿Tienes pocos ingredientes? Busca por lo que hay en casa →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
