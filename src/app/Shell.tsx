import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Shell() {
  return (
    <div className="mx-auto w-full max-w-md md:max-w-3xl lg:max-w-5xl min-h-dvh bg-crema pb-32 px-0 md:px-6">
      <div className="md:bg-white/40 md:rounded-[2rem] md:mt-4 md:shadow-soft md:border md:border-black/5 md:px-6 md:pb-8">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
