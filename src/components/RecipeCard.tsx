import { Link } from 'react-router-dom';
import { Clock, Heart, Users } from 'lucide-react';
import type { Recipe } from '../types';
import { useFavorites } from '../features/favorites/store';
import SafeImage from './SafeImage';
import { PricePill, VegBadge } from './ui';
import { Reveal } from './Reveal';

export default function RecipeCard({ r, delay = 0 }: { r: Recipe; delay?: number }) {
  const { isFav, toggle } = useFavorites();
  const fav = isFav(r.id);
  return (
    <Reveal delay={delay} className="h-full">
      <article className="card-press group relative bg-white rounded-[1.4rem] overflow-hidden shadow-card border border-black/[0.04] h-full flex flex-col">
        <Link to={`/receta/${r.id}`} className="block flex-1" aria-label={`Ver ${r.name}`}>
          <div className="relative aspect-[4/3] overflow-hidden bg-cremaDark">
            <SafeImage
              src={r.image}
              alt={r.name}
              className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent" />
            <span className="absolute bottom-2 right-2">
              <PricePill price={r.basePriceQ} servings={r.baseServings} />
            </span>
            {r.vegetarian && (
              <span className="absolute top-2 left-2"><VegBadge /></span>
            )}
          </div>
          <div className="p-3">
            <h3 className="font-display font-bold leading-[1.15] line-clamp-2 min-h-[2.5em] text-[15px]">{r.name}</h3>
            <div className="mt-1.5 flex items-center gap-2.5 text-[12px] font-extrabold text-carbon-soft">
              <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{r.timeMin} min</span>
              <span className="inline-flex items-center gap-1"><Users className="w-3.5 h-3.5" />{r.baseServings}</span>
              <span className="ml-auto hidden sm:inline text-coral-deep">{r.difficulty}</span>
            </div>
          </div>
        </Link>
        <button
          aria-label={fav ? `Quitar ${r.name} de favoritos` : `Guardar ${r.name} en favoritos`}
          aria-pressed={fav}
          onClick={() => toggle(r.id)}
          className={`absolute top-2 right-2 w-9 h-9 grid place-items-center rounded-full shadow-soft transition active:scale-90 ${
            fav ? 'bg-coral text-white animate-pop' : 'bg-white/95 text-carbon hover:text-coral'
          }`}
        >
          <Heart className={`w-4 h-4 ${fav ? 'fill-current' : ''}`} />
        </button>
      </article>
    </Reveal>
  );
}
