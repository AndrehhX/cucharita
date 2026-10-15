import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import BottomNav from '../components/BottomNav';

export default function Shell() {
  const location = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-md md:max-w-3xl lg:max-w-5xl min-h-dvh bg-crema pb-32 px-0 md:px-6">
      <div className="md:bg-white/40 md:rounded-[2rem] md:mt-4 md:shadow-soft md:border md:border-black/5 md:px-6 md:pb-8">
        <motion.div
          key={location.pathname}
          initial={reduce ? {} : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
}
