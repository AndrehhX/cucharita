import { Outlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function Shell() {
  return (
    <div className="mx-auto max-w-md min-h-dvh bg-crema pb-28">
      <Outlet />
      <BottomNav />
    </div>
  );
}
