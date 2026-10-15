import { Link } from 'react-router-dom';
import { Clock, Heart, Star } from 'lucide-react';
import type { Recipe } from '../types';
import { useFavorites } from '../features/favorites/store';

export default function RecipeCard({ r, compact = false }: { r: Recipe; compact?: boolean }) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(r.id);
  return (
    <div className={`card-press relative bg-white rounded-3xl overflow-hidden shadow-card ${compact ? '' : ''}`}>
      <Link to={`/receta/${r.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-cremaDark">
          <img src={r.image} alt={r.name} loading="lazy" className="w-full h-full object-cover" />
          <span className="absolute bottom-2 right-2 bg-white/95 text-[11px] font-extrabold px-2 py-1 rounded-full shadow-soft">
            Q{r.basePriceQ} • {r.baseServings} pers.
          </span>
        </div>
        <div className="p-3">
          <h3 className="font-display font-bold leading-tight line-clamp-2 min-h-[2.4em]">{r.name}</h3>
          <div className="mt-1 flex items-center gap-2 text-[12px] font-bold text-carbon-soft">
            <span className="flex items-center gap-1 text-[#E9A100]"><Star className="w-3.5 h-3.5 fill-current" />4.8</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.timeMin} min</span>
          </div>
        </div>
      </Link>
      <button
        aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        onClick={() => toggle(r.id)}
        className={`absolute top-2 right-2 w-8 h-8 grid place-items-center rounded-full shadow-soft ${fav ? 'bg-coral text-white' : 'bg-white/95 text-carbon'}`}
      >
        <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
