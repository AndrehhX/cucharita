import { useState } from 'react';
import { Settings, Folder, HelpCircle, ChevronRight, Volume2, Trash2, Cloud, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useProfile } from './store';
import { useFavorites } from '../favorites/store';
import { useCollections } from '../collections/store';
import { Reveal } from '../../components/Reveal';
import { isSupabaseConfigured } from '../../repositories/supabase';
import { syncLocalDataToRemote, type SyncReport } from '../../repositories/sync';
import { Btn } from '../../components/ui';

export default function Profile() {
  const { name, tagline, cookedCount, audioEnabled, setName, setAudio, resetLocal } = useProfile();
  const { ids } = useFavorites();
  const { collections } = useCollections();

  const [syncing, setSyncing] = useState(false);
  const [syncReport, setSyncReport] = useState<SyncReport | null>(null);

  const handleSync = async () => {
    setSyncing(true);
    setSyncReport(null);
    try {
      // Intentamos sincronizar si hubiera una sesión
      const report = await syncLocalDataToRemote('guest-sync-profile');
      setSyncReport(report);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="px-4 md:px-2 pt-safe pb-8">
      {/* Profile Card */}
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

      {/* Sincronización y Estado de la Cuenta */}
      <div className="mt-3 bg-white rounded-[1.6rem] shadow-soft border border-black/[0.04] p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-8 h-8 rounded-xl bg-cielo-soft text-cielo-dark grid place-items-center">
            <Cloud className="w-4 h-4" />
          </span>
          <div>
            <p className="text-sm font-extrabold">
              {isSupabaseConfigured() ? 'Sincronización en la nube disponible' : 'Modo local activo (Invitado)'}
            </p>
            <p className="text-[11px] font-bold text-carbon-muted">
              {isSupabaseConfigured()
                ? 'Tus datos locales pueden sincronizarse de forma segura y sin duplicados.'
                : 'Tus recetas guardadas y calificaciones se almacenan en este dispositivo sin requerir registro.'}
            </p>
          </div>
        </div>

        {isSupabaseConfigured() && (
          <div className="mt-3">
            <Btn variant="outline" className="w-full !py-2.5 text-sm" onClick={handleSync} disabled={syncing}>
              {syncing ? 'Sincronizando sin pérdidas...' : 'Sincronizar favoritos y carpetas'}
            </Btn>
            {syncReport && (
              <div className="mt-2 p-3 bg-crema rounded-xl text-[12px] font-bold text-carbon-soft flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                <span>
                  Sincronización completada: {syncReport.migratedFavoritesCount} favoritos y {syncReport.migratedCollectionsCount} carpetas.
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Privacidad infantil y seguridad */}
      <div className="mt-3 bg-[#F0F7EE] rounded-[1.6rem] p-4 border border-[#D5ECD0] flex items-start gap-3">
        <span className="w-8 h-8 rounded-xl bg-[#D5ECD0] text-[#2F7A3D] grid place-items-center shrink-0 mt-0.5">
          <ShieldCheck className="w-5 h-5" />
        </span>
        <div className="text-[12px]">
          <p className="font-extrabold text-[#245D30]">Espacio seguro y privado</p>
          <p className="text-[#3A7548] font-bold mt-0.5">
            Cucharita no recopila datos personales, no incluye anuncios ni funciones sociales públicas. Diseñada especialmente para disfrutar la cocina en familia con total tranquilidad.
          </p>
        </div>
      </div>

      {/* Menú de opciones */}
      <div className="mt-3 bg-white rounded-[1.6rem] shadow-soft border border-black/[0.04] divide-y divide-black/5 overflow-hidden">
        <Row icon={<Folder className="text-coral" />} label="Mis carpetas" hint={`${collections.length}`} />
        <Row icon={<Settings className="text-coral" />} label="Configuración de recetas" />
        <Row icon={<HelpCircle className="text-coral" />} label="Ayuda y sugerencias" />
        <button
          onClick={() => {
            if (confirm('¿Deseas reiniciar tus datos locales (favoritos y carpetas creadas)?')) {
              resetLocal();
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-4 font-bold text-left min-h-[56px] hover:bg-crema transition text-carbon"
        >
          <span className="w-9 h-9 grid place-items-center bg-crema rounded-xl"><Trash2 className="w-5 h-5 text-coral" /></span>
          Reiniciar datos locales <ChevronRight className="ml-auto w-4 h-4 text-carbon-muted" />
        </button>
      </div>

      {/* Audio */}
      <div className="mt-3 bg-white rounded-[1.6rem] shadow-soft border border-black/[0.04] p-5">
        <p className="font-extrabold flex items-center gap-2"><Volume2 className="w-4 h-4 text-cielo-dark" /> Asistente de voz en cocina</p>
        <label className="mt-2.5 flex items-center justify-between text-sm font-extrabold cursor-pointer">
          <span>{audioEnabled ? 'Activado (dictado por voz)' : 'Desactivado (solo lectura)'}</span>
          <button role="switch" aria-checked={audioEnabled} aria-label="Activar audio" onClick={() => setAudio(!audioEnabled)} className={`w-[52px] h-7 rounded-full p-1 transition ${audioEnabled ? 'bg-coral' : 'bg-black/15'}`}>
            <span className={`block w-5 h-5 bg-white rounded-full shadow transition-all ${audioEnabled ? 'ml-auto' : ''}`} />
          </button>
        </label>
        <p className="text-[12px] text-carbon-soft mt-2.5 font-semibold">Usamos la síntesis nativa del dispositivo (Web Speech API). Sin conexión o sin soporte, las instrucciones se muestran siempre en texto.</p>
        <p className="text-[11px] text-carbon-muted mt-2 font-bold">Cucharita v0.3 • Precios en Quetzales son estimaciones referenciales.</p>
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
