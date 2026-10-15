import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Volume2, Square, CheckCircle2 } from 'lucide-react';
import { getRecipe } from '../../data/catalog';
import { formatClock } from '../../lib/recipe-utils';
import { useCountdown } from '../../hooks/useCountdown';
import { speak, stopSpeak, supportsSpeech } from '../../lib/speech';
import { Btn, Empty } from '../../components/ui';
import { useProfile } from '../profile/store';

export default function Cooking() {
  const { id = '' } = useParams();
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const r = getRecipe(id);
  const { incCooked, audioEnabled } = useProfile();
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  const step = r?.steps[idx];
  const initialSecs = useMemo(() => (step?.minutes ? step.minutes * 60 : 0), [step]);
  const timer = useCountdown(initialSecs);

  useEffect(() => {
    timer.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, initialSecs]);

  useEffect(() => () => stopSpeak(), []);

  if (!r || !step) return <div className="p-6"><Empty title="Receta no encontrada" /></div>;

  const finish = () => {
    incCooked();
    setDone(true);
  };

  if (done) {
    return (
      <div className="px-6 pt-16 text-center">
        <CheckCircle2 className="w-20 h-20 mx-auto text-green-500" />
        <h1 className="font-display font-extrabold text-3xl mt-4">¡Felicidades!</h1>
        <p className="font-bold text-carbon-soft mt-1">Terminaste {r.name} 🎉</p>
        <div className="mt-6 grid gap-2">
          <Btn onClick={() => nav(`/receta/${r.id}`)}>Ver receta</Btn>
          <Btn variant="outline" onClick={() => nav('/')}>Volver al inicio</Btn>
        </div>
      </div>
    );
  }

  const progress = ((idx + 1) / r.steps.length) * 100;

  return (
    <div className="px-4 pt-safe min-h-dvh flex flex-col">
      <div className="flex items-center gap-2 pt-4">
        <button aria-label="Salir" onClick={() => nav(`/receta/${r.id}`)} className="w-9 h-9 grid place-items-center bg-white rounded-full shadow-soft"><ArrowLeft /></button>
        <div className="flex-1">
          <p className="text-[12px] font-bold text-carbon-soft">Modo cocina • Paso {idx + 1}/{r.steps.length}</p>
          <div className="h-2 bg-white rounded-full overflow-hidden"><div className="h-full bg-coral transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
      </div>

      <h1 className="font-display font-extrabold text-2xl mt-4">{r.name}</h1>
      <p className="text-sm text-carbon-soft font-semibold">Porciones: {sp.get('porciones') ?? r.baseServings}</p>

      <div className="mt-4 bg-white rounded-[1.8rem] shadow-card p-6 flex-1">
        <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-coral text-white font-extrabold">{idx + 1}</span>
        <p className="text-lg font-bold mt-3 leading-relaxed">{step.instruction}</p>
        {step.image && <img src={step.image} alt="" className="mt-3 rounded-2xl w-full aspect-video object-cover" />}

        {initialSecs > 0 && (
          <div className="mt-4 bg-crema rounded-2xl p-4 text-center">
            <p className="font-display font-extrabold text-4xl tabular-nums">{formatClock(timer.left)}</p>
            <div className="mt-2 flex justify-center gap-2">
              {!timer.running ? (
                <button onClick={() => timer.start()} className="flex items-center gap-1 bg-coral text-white font-extrabold px-4 py-2 rounded-full"><Play className="w-4 h-4" /> Iniciar</button>
              ) : (
                <button onClick={timer.pause} className="flex items-center gap-1 bg-carbon text-white font-extrabold px-4 py-2 rounded-full"><Pause className="w-4 h-4" /> Pausar</button>
              )}
              <button aria-label="Reiniciar temporizador" onClick={timer.reset} className="w-10 h-10 grid place-items-center bg-white rounded-full shadow-soft"><RotateCcw className="w-4 h-4" /></button>
            </div>
          </div>
        )}

        {supportsSpeech() && audioEnabled && (
          <div className="mt-3 flex justify-center gap-2">
            <button onClick={() => speak(step.instruction)} className="flex items-center gap-1 text-sm font-extrabold bg-cielo-soft text-cielo-dark px-4 py-2 rounded-full"><Volume2 className="w-4 h-4" /> Escuchar</button>
            <button onClick={stopSpeak} className="flex items-center gap-1 text-sm font-extrabold bg-black/5 px-4 py-2 rounded-full"><Square className="w-4 h-4" /> Detener</button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pb-4">
        <Btn variant="outline" onClick={() => setIdx((i) => Math.max(0, i - 1))} className="flex items-center justify-center gap-1"><ArrowLeft className="w-4 h-4" /> Anterior</Btn>
        {idx < r.steps.length - 1 ? (
          <Btn onClick={() => setIdx((i) => i + 1)} className="flex items-center justify-center gap-1">Siguiente <ArrowRight className="w-4 h-4" /></Btn>
        ) : (
          <Btn onClick={finish}>Terminar 🎉</Btn>
        )}
      </div>
    </div>
  );
}
