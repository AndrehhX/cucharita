import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Search, Bookmark, User, Plus } from 'lucide-react';

export default function BottomNav() {
  const nav = useNavigate();
  const item = 'flex flex-col items-center gap-0.5 text-[11px] font-bold w-14';
  const icon = 'w-6 h-6';
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe">
      <div className="mx-auto max-w-md bg-white/95 backdrop-blur border-t border-black/5 px-4 pt-2 pb-3 flex items-end justify-between rounded-t-3xl shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)]">
        <NavLink to="/" className={({ isActive }) => `${item} ${isActive ? 'text-coral' : 'text-carbon-soft'}`}>
          <Home className={icon} /><span>Inicio</span>
        </NavLink>
        <NavLink to="/explorar" className={({ isActive }) => `${item} ${isActive ? 'text-coral' : 'text-carbon-soft'}`}>
          <Search className={icon} /><span>Explorar</span>
        </NavLink>
        <button
          onClick={() => nav('/ingredientes')}
          aria-label="Buscar por ingredientes"
          className="w-14 h-14 -mt-8 rounded-full bg-coral text-white grid place-items-center shadow-pop border-4 border-crema active:scale-95 transition"
        >
          <Plus className="w-7 h-7" />
        </button>
        <NavLink to="/guardados" className={({ isActive }) => `${item} ${isActive ? 'text-coral' : 'text-carbon-soft'}`}>
          <Bookmark className={icon} /><span>Guardados</span>
        </NavLink>
        <NavLink to="/perfil" className={({ isActive }) => `${item} ${isActive ? 'text-coral' : 'text-carbon-soft'}`}>
          <User className={icon} /><span>Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
}
