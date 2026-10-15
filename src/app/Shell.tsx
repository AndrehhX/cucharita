import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import BottomNav from '../components/BottomNav';
import SplashScreen from '../components/SplashScreen';
import UpdateModal from '../components/UpdateModal';
import { useAppUpdate } from '../hooks/useAppUpdate';

export default function Shell() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const [showSplash, setShowSplash] = useState(() => {
    return typeof window !== 'undefined' && sessionStorage.getItem('cucharita:splashed') !== '1';
  });
  const { updateInfo, dismiss } = useAppUpdate();

  const handleSplashFinish = () => {
    setShowSplash(false);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('cucharita:splashed', '1');
    }
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <UpdateModal updateInfo={updateInfo} onDismiss={dismiss} />

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
    </>
  );
}
