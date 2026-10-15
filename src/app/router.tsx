import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Shell from './Shell';
import Home from '../features/recipes/Home';
import { PageLoader } from '../components/ui';

// Code-splitting de rutas secundarias para optimizar carga inicial y bundle size
const Explore = lazy(() => import('../features/recipes/Explore'));
const Detail = lazy(() => import('../features/recipes/Detail'));
const Cooking = lazy(() => import('../features/cooking/Cooking'));
const Saved = lazy(() => import('../features/collections/Saved'));
const IngredientSearch = lazy(() => import('../features/search/IngredientSearch'));
const Profile = lazy(() => import('../features/profile/Profile'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'explorar',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Explore />
          </Suspense>
        ),
      },
      {
        path: 'receta/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Detail />
          </Suspense>
        ),
      },
      {
        path: 'cocinar/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Cooking />
          </Suspense>
        ),
      },
      {
        path: 'guardados',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Saved />
          </Suspense>
        ),
      },
      {
        path: 'ingredientes',
        element: (
          <Suspense fallback={<PageLoader />}>
            <IngredientSearch />
          </Suspense>
        ),
      },
      {
        path: 'perfil',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
]);
