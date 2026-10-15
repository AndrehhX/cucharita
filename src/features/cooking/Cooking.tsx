import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Play, Pause, RotateCcw, Volume2, Square, CheckCircle2, Timer } from 'lucide-react';
import { getRecipe } from '../../data/catalog';
import { formatClock } from '../../lib/recipe-utils';
import { useCountdown } from '../../hooks/useCountdown';
import { speak, stopSpeak, supportsSpeech } from '../../lib/speech';
import { Btn, Empty } from '../../components/ui';
import SafeImage from '../../components/SafeImage';
import { useProfile } from '../profile/store';

function Ring({ ratio, size = 148 }: { ratio: number; size?: number }) {
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(1, Math.max(0, ratio)));
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Progreso del temporizador">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#F1E3CF" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r} stroke="#EF705D" strokeWidth={stroke} fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset .4s linear' }}
      />
    </svg>
  );
}

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
        <p className="font-bold text-carbon-soft mt-1">Terminaste {r.name}</p>
        <div className="mt-6 grid gap-2 max-w-sm mx-auto">
          <Btn onClick={() => nav(`/receta/${r.id}`)}>Ver receta</Btn>
          <Btn variant="outline" onClick={() => nav('/')}>Volver al inicio</Btn>
        </div>
      </div>
    );
  }

  const progress = ((idx + 1) / r.steps.length) * 100;
  const ratio = timer.total > 0 ? timer.left / timer.total : 0;

  return (
    <div className="px-4 md:px-2 pt-safe min-h-dvh flex flex-col">
      <div className="flex items-center gap-3 pt-4">
        <button aria-label="Salir del modo cocina" onClick={() => nav(`/receta/${r.id}`)} className="w-10 h-10 grid place-items-center bg-white rounded-full shadow-soft border border-black/5 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-[12px] font-extrabold text-carbon-soft">Paso {idx + 1} de {r.steps.length} • {r.name}</p>
          <div className="h-2.5 bg-white rounded-full overflow-hidden shadow-inner mt-1">
            <div className="h-full bg-gradient-to-r from-miel via-coral to-coral-dark transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <span className="text-[11px] font-extrabold bg-white px-2.5 py-1.5 rounded-full shadow-soft">{Math.round(progress)}%</span>
      </div>

      <div className="mt-4 bg-white rounded-[1.8rem] shadow-card border border-black/[0.04] p-5 md:p-8 md:grid md:grid-cols-2 md:gap-6">
        <div>
          <span className="inline-grid place-items-center w-11 h-11 rounded-2xl bg-coral text-white font-display font-extrabold text-xl shadow-pop">{idx + 1}</span>
          <p className="text-[19px] md:text-2xl font-bold mt-3 leading-relaxed">{step.instruction}</p>
          {step.image && <SafeImage src={step.image} alt={`Paso ${idx + 1}`} className="mt-4 rounded-2xl w-full aspect-video object-cover" />}
          {supportsSpeech() && audioEnabled && (
            <div className="mt-3 flex gap-2">
              <button onClick={() => speak(step.instruction)} className="flex items-center gap-1.5 text-sm font-extrabold bg-cielo-soft text-cielo-dark px-4 py-2.5 rounded-full min-h-[44px]">
                <Volume2 className="w-4 h-4" /> Escuchar paso
              </button>
              <button onClick={stopSpeak} className="flex items-center gap-1.5 text-sm font-extrabold bg-black/5 px-4 py-2.5 rounded-full min-h-[44px]">
                <Square className="w-4 h-4" /> Detener
              </button>
            </div>
          )}
        </div>

        <div className="mt-5 md:mt-0 bg-crema rounded-[1.6rem] p-5 text-center border border-black/[0.04] flex flex-col items-center justify-center">
          {initialSecs > 0 ? (
            <>
              <p className="font-extrabold text-sm flex items-center gap-1.5 text-coral-deep"><Timer className="w-4 h-4" /> Cronómetro del paso</p>
              <div className="relative mt-2">
                <Ring ratio={ratio} />
                <div className="absolute inset-0 grid place-items-center">
                  <p className="font-display font-extrabold text-[34px] tabular-nums leading-none">{formatClock(timer.left)}</p>
                </div>
              </div>
              <div className="mt-3 flex justify-center gap-2">
                {!timer.running ? (
                  <button onClick={() => timer.start()} className="flex items-center gap-1.5 bg-coral text-white font-extrabold px-6 py-3 rounded-full shadow-pop min-h-[48px] active:scale-95 transition">
                    <Play className="w-4 h-4" /> {timer.left < timer.total ? 'Continuar' : 'Iniciar'}
                  </button>
                ) : (
                  <button onClick={timer.pause} className="flex items-center gap-1.5 bg-carbon text-white font-extrabold px-6 py-3 rounded-full min-h-[48px] active:scale-95 transition">
                    <Pause className="w-4 h-4" /> Pausar
                  </button>
                )}
                <button aria-label="Reiniciar temporizador" onClick={timer.reset} className="w-12 h-12 grid place-items-center bg-white rounded-full shadow-soft active:scale-90 transition">
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] font-bold text-carbon-muted mt-2">Preciso aunque cambies de app o bloquees la pantalla.</p>
            </>
          ) : (
            <>
              <Timer className="w-10 h-10 text-carbon-muted mx-auto" />
              <p className="font-extrabold mt-2">Este paso no necesita temporizador</p>
              <p className="text-sm font-semibold text-carbon-soft">Sigue tu ritmo y pasa al siguiente cuando esté listo.</p>
            </>
          )}
          <p className="mt-3 text-[12px] font-bold text-carbon-soft">Porciones: {sp.get('porciones') ?? r.baseServings}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 pb-4 max-w-2xl mx-auto w-full">
        <Btn variant="outline" onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} className="py-4">
          <ArrowLeft className="w-4 h-4" /> Anterior
        </Btn>
        {idx < r.steps.length - 1 ? (
          <Btn onClick={() => setIdx((i) => i + 1)} className="py-4">Siguiente <ArrowRight className="w-4 h-4" /></Btn>
        ) : (
          <Btn onClick={finish} className="py-4">Terminar</Btn>
        )}
      </div>
    </div>
  );
}
