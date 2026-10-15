import type { ReactNode } from 'react';

export function Btn({
  children, onClick, variant = 'primary', className = '', type = 'button', disabled,
}: {
  children: ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'soft' | 'dark';
  className?: string; type?: 'button' | 'submit'; disabled?: boolean;
}) {
  const base =
    'focus-ring inline-flex items-center justify-center gap-2 font-extrabold rounded-full px-5 py-3 text-sm transition active:scale-[0.98] disabled:opacity-50 min-h-[44px]';
  const v =
    variant === 'primary'
      ? 'bg-coral text-white shadow-pop hover:bg-coral-dark'
      : variant === 'outline'
        ? 'border-2 border-coral/70 text-coral-dark bg-white hover:bg-coral-mist'
        : variant === 'dark'
          ? 'bg-carbon text-white hover:bg-black'
          : 'bg-coral-soft text-coral-deep hover:bg-coral-mist';
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${v} ${className}`}>
      {children}
    </button>
  );
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-extrabold transition min-h-[36px] ${
        active ? 'bg-coral text-white shadow-pop' : 'bg-white text-carbon-soft shadow-soft hover:bg-crema'
      }`}
    >
      {children}
    </button>
  );
}

export function SectionTitle({ title, link, onLink }: { title: string; link?: string; onLink?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-2.5">
      <h2 className="font-display font-extrabold text-[19px] tracking-tight">{title}</h2>
      {link && (
        <button onClick={onLink} className="text-coral-deep text-[13px] font-extrabold hover:underline">
          {link} →
        </button>
      )}
    </div>
  );
}

export function PricePill({ price, servings }: { price: number; servings: number }) {
  return (
    <span className="whitespace-nowrap bg-white/95 backdrop-blur text-[11px] font-extrabold px-2.5 py-1.5 rounded-full shadow-soft text-carbon">
      Q{price} • {servings} pers.
    </span>
  );
}

export function VegBadge() {
  return (
    <span className="inline-flex items-center gap-1 bg-[#E4F0E1] text-[#2F7A3D] text-[11px] font-extrabold px-2 py-1 rounded-full">
      Vegetariana
    </span>
  );
}

export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center shadow-soft border border-black/5">
      <div className="w-14 h-14 mx-auto grid place-items-center rounded-2xl bg-crema text-2xl">🍳</div>
      <p className="font-display font-bold text-lg mt-2">{title}</p>
      {hint && <p className="text-sm text-carbon-soft mt-1 font-semibold">{hint}</p>}
    </div>
  );
}

export function SkeletonCard() {
  return <div className="skeleton rounded-3xl aspect-[4/5]" />;
}

export function PageLoader() {
  return (
    <div className="p-8 text-center flex flex-col items-center justify-center min-h-[40vh] space-y-3" role="status" aria-label="Cargando contenido">
      <div className="w-10 h-10 rounded-full border-4 border-coral/20 border-t-coral animate-spin" />
      <p className="font-display font-extrabold text-sm text-carbon-soft">Preparando ingredientes...</p>
    </div>
  );
}

