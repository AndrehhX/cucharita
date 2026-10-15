import { Settings, Folder, HelpCircle, LogOut, ChevronRight, Volume2, Trash2 } from 'lucide-react';
import { useProfile } from './store';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import { Reveal } from '../../components/Reveal';

export default function Profile() {
  const { name, tagline, cookedCount, audioEnabled, setName, setAudio, resetLocal } = useProfile();
  const { ids } = useFavorites();
  const { collections } = useCollections();

  return (
    <div className="px-4 md:px-2 pt-safe">
      <Reveal className="relative mt-4 overflow-hidden rounded-[2rem] bg-white shadow-card border border-black/[0.04] p-6 text-center">
        <span className="blob w-56 h-32 bg-miel-soft -left-10 -top-10 rotate-[-14deg]" />
        <span className="blob w-56 h-32 bg-cielo-soft -right-10 -top-8 rotate-[14deg]" />
        <span className="blob w-40 h-40 bg-coral-soft/60 left-1/2 -translate-x-1/2 -bottom-20" />
        <button aria-label="Ajustes" className="absolute top-3 right-3 w-10 h-10 grid place-items-center bg-white rounded-full shadow-soft border border-black/5">
          <Settings className="w-5 h-5" />
        </button>
        <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-card bg-gradient-to-br from-miel to-coral grid place-items-center font-display font-extrabold text-3xl text-white">
          {name.slice(0, 1).toUpperCase()}
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Nombre de perfil"
          className="relative mt-2.5 text-center font-display font-extrabold text-[26px] bg-transparent outline-none w-full focus:bg-crema rounded-xl"
        />
        <p className="text-[13px] font-bold text-carbon-soft">{tagline} ♡</p>
        <div className="relative grid grid-cols-3 gap-2 mt-4 bg-crema rounded-2xl p-3 border border-black/[0.04]">
          <div><p className="font-display font-extrabold text-[22px]">{ids.length}</p><p className="text-[11px] font-extrabold text-carbon-soft">Guardadas</p></div>
          <div className="border-x border-black/10"><p className="font-display font-extrabold text-[22px]">{collections.length}</p><p className="text-[11px] font-extrabold text-carbon-soft">Carpetas</p></div>
          <div><p className="font-display font-extrabold text-[22px]">{cookedCount}</p><p className="text-[11px] font-extrabold text-carbon-soft">Cocinadas</p></div>
        </div>
      </Reveal>

      <div className="mt-3 bg-white rounded-[1.6rem] shadow-soft border border-black/[0.04] divide-y divide-black/5 overflow-hidden">
        <Row icon={<Folder className="text-coral" />} label="Mis carpetas" hint={`${collections.length}`} />
        <Row icon={<Settings className="text-coral" />} label="Configuración" />
        <Row icon={<HelpCircle className="text-coral" />} label="Ayuda y soporte" />
        <button onClick={() => { if (confirm('¿Borrar datos locales (favoritos y carpetas)?')) resetLocal(); }} className="w-full flex items-center gap-3 px-4 py-4 font-bold text-left min-h-[56px] hover:bg-crema transition">
          <span className="w-9 h-9 grid place-items-center bg-crema rounded-xl"><Trash2 className="w-5 h-5 text-coral" /></span>
          Borrar datos locales <ChevronRight className="ml-auto w-4 h-4 text-carbon-muted" />
        </button>
        <Row icon={<LogOut className="text-coral" />} label="Cerrar sesión" />
      </div>

      <div className="mt-3 bg-white rounded-[1.6rem] shadow-soft border border-black/[0.04] p-5">
        <p className="font-extrabold flex items-center gap-2"><Volume2 className="w-4 h-4 text-cielo-dark" /> Audio de instrucciones</p>
        <label className="mt-2.5 flex items-center justify-between text-sm font-extrabold">
          <span>{audioEnabled ? 'Activado' : 'Desactivado'}</span>
          <button role="switch" aria-checked={audioEnabled} aria-label="Activar audio" onClick={() => setAudio(!audioEnabled)} className={`w-13 h-7 w-[52px] rounded-full p-1 transition ${audioEnabled ? 'bg-coral' : 'bg-black/15'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition ${audioEnabled ? 'ml-auto' : ''}`} />
          </button>
        </label>
        <p className="text-[12px] text-carbon-soft mt-2.5 font-semibold">Usamos la voz del dispositivo (Web Speech API). Sin soporte, las instrucciones se muestran en texto.</p>
        <p className="text-[11px] text-carbon-muted mt-2 font-bold">Cucharita v0.1 • Modo local. Tus datos se quedan en este dispositivo. Precios en Q son estimaciones.</p>
      </div>
    </div>
  );
}

function Row({ icon, label, hint }: { icon: React.ReactNode; label: string; hint?: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 font-bold text-left min-h-[56px] hover:bg-crema transition">
      <span className="w-9 h-9 grid place-items-center bg-crema rounded-xl shrink-0">{icon}</span>
      {label}
      <span className="ml-auto flex items-center gap-1 text-carbon-muted text-sm font-extrabold">{hint}<ChevronRight className="w-4 h-4" /></span>
    </button>
  );
}
