import { createBrowserRouter } from 'react-router-dom';
import Shell from './Shell';
import Home from '../features/recipes/Home';
import Explore from '../features/recipes/Explore';
import Detail from '../features/recipes/Detail';
import Cooking from '../features/cooking/Cooking';
import Saved from '../features/collections/Saved';
import IngredientSearch from '../features/search/IngredientSearch';
import Profile from '../features/profile/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explorar', element: <Explore /> },
      { path: 'receta/:id', element: <Detail /> },
      { path: 'cocinar/:id', element: <Cooking /> },
      { path: 'guardados', element: <Saved /> },
      { path: 'ingredientes', element: <IngredientSearch /> },
      { path: 'perfil', element: <Profile /> },
    ],
  },
]);
