import type { ReactNode } from 'react';

export function Btn({
  children, onClick, variant = 'primary', className = '', type = 'button',
}: { children: ReactNode; onClick?: () => void; variant?: 'primary' | 'outline' | 'soft'; className?: string; type?: 'button' | 'submit' }) {
  const base = 'focus-ring font-extrabold rounded-full px-5 py-3 text-sm transition active:scale-[0.98] disabled:opacity-50';
  const v =
    variant === 'primary'
      ? 'bg-coral text-white shadow-pop hover:bg-coral-dark'
      : variant === 'outline'
        ? 'border-2 border-coral text-coral bg-white'
        : 'bg-coral-soft text-coral-dark';
  return <button type={type} onClick={onClick} className={`${base} ${v} ${className}`}>{children}</button>;
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`focus-ring whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-extrabold transition ${
        active ? 'bg-coral text-white shadow-pop' : 'bg-white text-carbon-soft shadow-soft'
      }`}
    >
      {children}
    </button>
  );
}

export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 text-center shadow-soft">
      <div className="text-4xl mb-2">🍳</div>
      <p className="font-display font-bold text-lg">{title}</p>
      {hint && <p className="text-sm text-carbon-soft mt-1">{hint}</p>}
    </div>
  );
}

export function SkeletonCard() {
  return <div className="skeleton rounded-3xl aspect-[4/5]" />;
}
