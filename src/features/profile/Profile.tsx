import { Settings, Folder, HelpCircle, LogOut, ChevronRight, Volume2, Trash2 } from 'lucide-react';
import { useProfile } from './store';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';

export default function Profile() {
  const { name, tagline, cookedCount, audioEnabled, setName, setAudio, resetLocal } = useProfile();
  const { ids } = useFavorites();
  const { collections } = useCollections();

  return (
    <div className="px-4 pt-safe">
      <div className="relative mt-4 overflow-hidden rounded-[2rem] bg-white shadow-soft p-6 text-center">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-miel-soft via-coral-soft to-cielo-soft" />
        <button aria-label="Ajustes" className="absolute top-3 right-3 w-9 h-9 grid place-items-center bg-white rounded-full shadow-soft"><Settings className="w-5 h-5" /></button>
        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-card bg-miel grid place-items-center font-display font-extrabold text-3xl">
          {name.slice(0, 1)}
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Nombre de perfil"
          className="relative mt-2 text-center font-display font-extrabold text-2xl bg-transparent outline-none w-full"
        />
        <p className="text-[13px] font-bold text-carbon-soft">{tagline} ♡</p>
        <div className="grid grid-cols-3 gap-2 mt-4 bg-crema rounded-2xl p-3">
          <div><p className="font-display font-extrabold text-xl">{ids.length}</p><p className="text-[11px] font-bold text-carbon-soft">Recetas guardadas</p></div>
          <div><p className="font-display font-extrabold text-xl">{collections.length}</p><p className="text-[11px] font-bold text-carbon-soft">Carpetas creadas</p></div>
          <div><p className="font-display font-extrabold text-xl">{cookedCount}</p><p className="text-[11px] font-bold text-carbon-soft">Recetas cocinadas</p></div>
        </div>
      </div>

      <div className="mt-3 bg-white rounded-3xl shadow-soft divide-y divide-black/5">
        <Row icon={<Folder className="text-coral" />} label="Mis carpetas" hint={`${collections.length}`} />
        <Row icon={<Settings className="text-coral" />} label="Configuración" />
        <Row icon={<HelpCircle className="text-coral" />} label="Ayuda y soporte" />
        <button onClick={() => { if (confirm('¿Borrar datos locales (favoritos y carpetas)?')) resetLocal(); }} className="w-full flex items-center gap-3 px-4 py-3.5 font-bold text-left">
          <Trash2 className="w-5 h-5 text-coral" /> Borrar datos locales <ChevronRight className="ml-auto w-4 h-4 text-carbon-muted" />
        </button>
        <Row icon={<LogOut className="text-coral" />} label="Cerrar sesión" />
      </div>

      <div className="mt-3 bg-white rounded-3xl shadow-soft p-4">
        <p className="font-extrabold flex items-center gap-2"><Volume2 className="w-4 h-4" /> Audio de instrucciones</p>
        <label className="mt-2 flex items-center justify-between text-sm font-bold">
          <span>{audioEnabled ? 'Activado' : 'Desactivado'}</span>
          <button role="switch" aria-checked={audioEnabled} onClick={() => setAudio(!audioEnabled)} className={`w-12 h-7 rounded-full p-1 ${audioEnabled ? 'bg-coral' : 'bg-black/15'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full ${audioEnabled ? 'ml-auto' : ''}`} />
          </button>
        </label>
        <p className="text-[12px] text-carbon-soft mt-2">Usamos la voz del dispositivo (Web Speech API). Sin internet o sin soporte, las instrucciones se muestran en texto.</p>
        <p className="text-[12px] text-carbon-muted mt-2">Cucharita v0.1 • Modo local sin cuenta. Tus datos se quedan en este dispositivo. Precios en Q son estimaciones.</p>
      </div>
    </div>
  );
}

function Row({ icon, label, hint }: { icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 font-bold text-left">
      <span className="w-8 h-8 grid place-items-center bg-crema rounded-xl">{icon}</span>
      {label}
      <span className="ml-auto flex items-center gap-1 text-carbon-muted text-sm">{hint}<ChevronRight className="w-4 h-4" /></span>
    </button>
  );
}
