import { useState } from 'react';
import { ChefHat } from 'lucide-react';

export default function SafeImage({
  src, alt, className = '', eager = false,
}: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`grid place-items-center bg-gradient-to-br from-miel-soft via-coral-soft to-cielo-soft ${className}`} role="img" aria-label={alt}>
        <ChefHat className="w-10 h-10 text-coral" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      onError={() => setErr(true)}
      className={className}
    />
  );
}
