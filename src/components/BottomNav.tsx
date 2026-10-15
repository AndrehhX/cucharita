import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Bookmark, User, CookingPot } from 'lucide-react';

export default function BottomNav() {
  const nav = useNavigate();
  const base = 'flex flex-col items-center gap-1 text-[11px] font-extrabold w-16 py-1 rounded-2xl transition min-h-[52px] justify-center';
  const cls = ({ isActive }: { isActive: boolean }) =>
    `${base} ${isActive ? 'text-coral-deep' : 'text-carbon-soft hover:text-carbon'}`;
  const dot = (active: boolean) =>
    `w-1 h-1 rounded-full mt-0.5 ${active ? 'bg-coral' : 'bg-transparent'}`;

  return (
    <nav aria-label="Navegación principal" className="fixed bottom-0 inset-x-0 z-40 pb-safe">
      <div className="mx-auto max-w-md md:max-w-2xl px-3">
        <div className="bg-white/95 backdrop-blur border border-black/5 px-2 pt-2 pb-3 flex items-end justify-between rounded-t-[1.8rem] shadow-[0_-12px_30px_-14px_rgba(41,43,53,0.35)]">
          <NavLink to="/" className={({ isActive }) => cls({ isActive })}>
            {({ isActive }) => (<><Home className="w-6 h-6" /><span>Inicio</span><span className={dot(isActive)} /></>)}
          </NavLink>
          <NavLink to="/explorar" className={({ isActive }) => cls({ isActive })}>
            {({ isActive }) => (<><Search className="w-6 h-6" /><span>Explorar</span><span className={dot(isActive)} /></>)}
          </NavLink>
          <button
            onClick={() => nav('/ingredientes')}
            aria-label="Buscar por ingredientes"
            title="¿Qué hay en tu refri?"
            className="w-14 h-14 -mt-9 rounded-full bg-coral text-white grid place-items-center shadow-pop border-4 border-crema active:scale-95 transition hover:bg-coral-dark"
          >
            <CookingPot className="w-6 h-6" />
          </button>
          <NavLink to="/guardados" className={({ isActive }) => cls({ isActive })}>
            {({ isActive }) => (<><Bookmark className="w-6 h-6" /><span>Guardados</span><span className={dot(isActive)} /></>)}
          </NavLink>
          <NavLink to="/perfil" className={({ isActive }) => cls({ isActive })}>
            {({ isActive }) => (<><User className="w-6 h-6" /><span>Perfil</span><span className={dot(isActive)} /></>)}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
