import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Sparkles, Utensils } from 'lucide-react';

export default function SplashScreen({ onFinish }: { onFinish?: () => void }) {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onFinish?.();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onClick={() => {
            setVisible(false);
            onFinish?.();
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-crema cursor-pointer select-none px-6"
          role="dialog"
          aria-label="Cucharita - Pantalla de inicio"
        >
          {/* Decorative background blobs */}
          <span className="blob w-72 h-72 bg-miel-soft -top-16 -left-16 rotate-12" />
          <span className="blob w-72 h-72 bg-cielo-soft -bottom-16 -right-16 -rotate-12" />
          <span className="blob w-56 h-56 bg-coral-soft/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

          {/* Logo container */}
          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={reduce ? { scale: 1 } : { scale: 0, rotate: -25 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 12, stiffness: 180, duration: 0.6 }}
              className="relative w-28 h-28 rounded-[2.2rem] bg-gradient-to-tr from-coral to-miel p-1 shadow-pop flex items-center justify-center text-white"
            >
              <motion.div
                animate={reduce ? {} : { rotate: [0, -10, 10, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 0.5 }}
              >
                <Utensils className="w-14 h-14 drop-shadow-md" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="absolute -top-2 -right-2 bg-white text-coral rounded-full p-1.5 shadow-soft"
              >
                <Sparkles className="w-5 h-5 fill-miel text-miel" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mt-5"
            >
              <h1 className="font-display font-extrabold text-4xl tracking-tight text-carbon">
                Cucharita
              </h1>
              <p className="font-bold text-sm text-carbon-soft mt-1">
                Recetas fáciles y ricas ♡
              </p>
            </motion.div>

            {/* Subtle animated loading dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex gap-2 items-center"
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={reduce ? {} : { y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-coral/70"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
