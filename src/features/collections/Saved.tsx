import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, FolderHeart, X, Heart, UtensilsCrossed, CakeSlice, Folder } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import RecipeCard from '../../components/RecipeCard';
import { Btn, Empty } from '../../components/ui';
import { Reveal } from '../../components/Reveal';

function FolderIcon({ icon }: { icon: string }) {
  if (icon === 'heart') return <Heart className="w-6 h-6 text-coral-deep" />;
  if (icon === 'bowl') return <UtensilsCrossed className="w-6 h-6 text-cielo-dark" />;
  if (icon === 'cup') return <CakeSlice className="w-6 h-6 text-miel-dark" />;
  return <Folder className="w-6 h-6 text-carbon-soft" />;
}

export default function Saved() {
  const { ids } = useFavorites();
  const { collections, create, rename, remove } = useCollections();
  const [tab, setTab] = useState<'todas' | 'fav' | 'carpetas'>('todas');
  const [newName, setNewName] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const favRecipes = RECIPES.filter((r) => ids.includes(r.id));

  return (
    <div className="px-4 md:px-2 pt-safe">
      <div className="flex items-start justify-between gap-3 pt-4">
        <div>
          <h1 className="font-display font-extrabold text-[26px] leading-tight flex items-center gap-2">
            <FolderHeart className="text-coral w-7 h-7" /> Mis Recetas
          </h1>
          <p className="text-[13px] text-carbon-soft font-bold">Organiza tus recetas favoritas</p>
        </div>
        <Btn onClick={() => setShowNew(true)} className="!py-2.5 shrink-0"><Plus className="w-4 h-4" /> Crear carpeta</Btn>
      </div>

      <div className="flex gap-5 mt-4 text-sm font-extrabold border-b border-black/[0.07]" role="tablist">
        {([['todas', `Todas (${RECIPES.length})`], ['fav', `Favoritas (${ids.length})`], ['carpetas', `Carpetas (${collections.length})`]] as const).map(([k, label]) => (
          <button
            key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}
            className={`pb-2.5 -mb-px transition ${tab === k ? 'text-coral-deep border-b-[3px] border-coral' : 'text-carbon-soft hover:text-carbon'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {(tab === 'todas' || tab === 'carpetas') && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 mt-4">
          {collections.map((c) => (
            <div key={c.id} className="relative rounded-[1.3rem] p-3.5 min-h-[104px] shadow-soft border border-white/60" style={{ background: c.color }}>
              {editing === c.id ? (
                <input
                  autoFocus
                  defaultValue={c.name}
                  aria-label="Nombre de carpeta"
                  onBlur={(e) => { if (e.target.value.trim()) rename(c.id, e.target.value.trim()); setEditing(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { rename(c.id, (e.target as HTMLInputElement).value); setEditing(null); } }}
                  className="w-full text-sm font-bold rounded-lg px-2 py-1.5 outline-none"
                />
              ) : (
                <>
                  <FolderIcon icon={c.icon} />
                  <p className="font-display font-extrabold text-[15px] leading-tight mt-1.5">{c.name}</p>
                  <p className="text-[11px] font-extrabold opacity-60">{c.id === 'fav' ? ids.length : c.recipeIds.length} recetas</p>
                  {!['fav', 'comidas', 'postres'].includes(c.id) && (
                    <span className="absolute top-2 right-2 flex gap-1">
                      <button aria-label={`Renombrar ${c.name}`} onClick={() => setEditing(c.id)} className="w-7 h-7 grid place-items-center bg-white/80 rounded-full"><Pencil className="w-3.5 h-3.5" /></button>
                      <button aria-label={`Eliminar ${c.name}`} onClick={() => { if (confirm(`¿Eliminar "${c.name}"?`)) remove(c.id); }} className="w-7 h-7 grid place-items-center bg-white/80 rounded-full"><Trash2 className="w-3.5 h-3.5" /></button>
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
          <button onClick={() => setShowNew(true)} className="rounded-[1.3rem] border-2 border-dashed border-black/15 grid place-items-center min-h-[104px] text-sm font-extrabold text-carbon-soft hover:border-coral hover:text-coral-deep transition">
            <span><Plus className="mx-auto w-6 h-6" /> Nueva carpeta</span>
          </button>
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 backdrop-blur-sm p-6" onClick={() => setShowNew(false)}>
          <Reveal className="bg-white rounded-[1.8rem] p-6 w-full max-w-sm shadow-card" >
            <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
              <h3 className="font-display font-extrabold text-xl">Nueva carpeta</h3>
              <button aria-label="Cerrar" onClick={() => setShowNew(false)} className="w-9 h-9 grid place-items-center bg-crema rounded-full"><X className="w-4 h-4" /></button>
            </div>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && newName.trim()) { create(newName.trim()); setNewName(''); setShowNew(false); } }}
              placeholder="Ej. Cumpleaños"
              aria-label="Nombre de la carpeta"
              className="mt-4 w-full bg-crema rounded-2xl px-4 py-3.5 font-bold outline-none focus:ring-2 focus:ring-cielo"
              onClick={(e) => e.stopPropagation()}
            />
            <Btn className="w-full mt-3" onClick={() => { if (newName.trim()) { create(newName.trim()); setNewName(''); setShowNew(false); } }}>Crear carpeta</Btn>
          </Reveal>
        </div>
      )}

      <div className="flex items-center justify-between mt-6 mb-2.5">
        <h2 className="font-display font-extrabold text-[18px]">Recetas guardadas</h2>
        <Link to="/explorar" className="text-coral-deep text-[13px] font-extrabold hover:underline">Ver todas →</Link>
      </div>
      {favRecipes.length === 0 ? (
        <Empty title="Aún no guardas recetas" hint="Toca el corazón en cualquier receta para verla aquí." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {favRecipes.map((r, i) => <RecipeCard key={r.id} r={r} delay={Math.min(i, 5) * 0.04} />)}
        </div>
      )}
    </div>
  );
}
