import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, FolderHeart, X } from 'lucide-react';
import { RECIPES } from '../../data/catalog';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import RecipeCard from '../../components/RecipeCard';
import { Btn, Empty } from '../../components/ui';

export default function Saved() {
  const { ids } = useFavorites();
  const { collections, create, rename, remove } = useCollections();
  const [tab, setTab] = useState<'todas' | 'fav' | 'carpetas'>('todas');
  const [newName, setNewName] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const favRecipes = RECIPES.filter((r) => ids.includes(r.id));

  return (
    <div className="px-4 pt-safe">
      <div className="flex items-start justify-between pt-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl flex items-center gap-2"><FolderHeart className="text-coral" /> Mis Recetas</h1>
          <p className="text-[13px] text-carbon-soft font-semibold">Organiza tus recetas favoritas</p>
        </div>
        <Btn onClick={() => setShowNew(true)} className="!py-2 flex items-center gap-1"><Plus className="w-4 h-4" /> Crear carpeta</Btn>
      </div>

      <div className="flex gap-4 mt-3 text-sm font-extrabold border-b border-black/5">
        {([['todas', `Todas (${RECIPES.length})`], ['fav', `Favoritas (${ids.length})`], ['carpetas', `Carpetas (${collections.length})`]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`pb-2 ${tab === k ? 'text-coral border-b-2 border-coral' : 'text-carbon-soft'}`}>{label}</button>
        ))}
      </div>

      {(tab === 'todas' || tab === 'carpetas') && (
        <div className="grid grid-cols-4 gap-2 mt-3">
          {collections.map((c) => (
            <div key={c.id} className="relative rounded-2xl p-2 text-center" style={{ background: c.color }}>
              {editing === c.id ? (
                <input
                  autoFocus
                  defaultValue={c.name}
                  onBlur={(e) => { if (e.target.value.trim()) rename(c.id, e.target.value.trim()); setEditing(null); }}
                  onKeyDown={(e) => { if (e.key === 'Enter') { rename(c.id, (e.target as HTMLInputElement).value); setEditing(null); } }}
                  className="w-full text-[12px] font-bold rounded px-1"
                />
              ) : (
                <>
                  <p className="font-extrabold text-[12px] leading-tight">{c.name}</p>
                  <p className="text-[11px] font-bold opacity-70">{c.id === 'fav' ? ids.length : c.recipeIds.length} recetas</p>
                  {!['fav', 'comidas', 'postres'].includes(c.id) && (
                    <span className="absolute top-1 right-1 flex gap-1">
                      <button aria-label="Renombrar" onClick={() => setEditing(c.id)}><Pencil className="w-3 h-3" /></button>
                      <button aria-label="Eliminar" onClick={() => { if (confirm(`¿Eliminar "${c.name}"?`)) remove(c.id); }}><Trash2 className="w-3 h-3" /></button>
                    </span>
                  )}
                </>
              )}
            </div>
          ))}
          <button onClick={() => setShowNew(true)} className="rounded-2xl border-2 border-dashed border-black/15 grid place-items-center min-h-[64px] text-sm font-bold">
            <span><Plus className="mx-auto" /> Nueva carpeta</span>
          </button>
        </div>
      )}

      {showNew && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-6">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm">
            <div className="flex justify-between items-center"><h3 className="font-display font-extrabold text-lg">Nueva carpeta</h3><button aria-label="Cerrar" onClick={() => setShowNew(false)}><X /></button></div>
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ej. Cumpleaños" className="mt-3 w-full bg-crema rounded-2xl px-4 py-3 font-bold outline-none" />
            <Btn className="w-full mt-3" onClick={() => { if (newName.trim()) { create(newName.trim()); setNewName(''); setShowNew(false); } }}>Crear</Btn>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-5 mb-2">
        <h2 className="font-display font-extrabold">Recetas guardadas</h2>
        <Link to="/explorar" className="text-coral text-[13px] font-extrabold">Ver todas →</Link>
      </div>
      {favRecipes.length === 0 ? (
        <Empty title="Aún no guardas recetas" hint="Toca el corazón en cualquier receta para verla aquí." />
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {favRecipes.map((r) => <RecipeCard key={r.id} r={r} />)}
        </div>
      )}
    </div>
  );
}
