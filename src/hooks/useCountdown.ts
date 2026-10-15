import { useEffect, useRef, useState } from 'react';
import { timerRemaining } from '../lib/recipe-utils';

// Timestamp-based countdown: precise across tab switches.
export function useCountdown(initialSeconds: number) {
  const [total] = useState(initialSeconds);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!running || deadline == null) return;
    const tick = () => {
      const r = timerRemaining(deadline) / 1000;
      setLeft(r);
      if (r <= 0) {
        setRunning(false);
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    const iv = setInterval(() => setLeft(timerRemaining(deadline) / 1000), 500);
    return () => {
      cancelAnimationFrame(raf.current);
      clearInterval(iv);
    };
  }, [running, deadline]);

  const start = (secs?: number) => {
    const s = secs ?? left;
    setDeadline(Date.now() + s * 1000);
    setLeft(s);
    setRunning(true);
  };
  const pause = () => {
    if (deadline != null) setLeft(timerRemaining(deadline) / 1000);
    setRunning(false);
  };
  const reset = () => {
    setRunning(false);
    setDeadline(null);
    setLeft(total);
  };
  return { left, running, start, pause, reset, total };
}
