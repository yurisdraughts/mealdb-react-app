import { useState } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './routes/ErrorBoundary';
import Home from './routes/Home';
import Meal from './routes/Meal';
import MealsList from './routes/MealsList';
import FirstLettersList from './routes/FirstLettersList';
import TypesList from './routes/TypesList';
import TitleContext from './utils/TitleContext';
import './assets/styles/App.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path=":type/:subtype" element={<MealsList />} />
      <Route path="first-letters" element={<FirstLettersList />} />
      <Route path=":type" element={<TypesList />} />
      <Route path="meal/:id?" element={<Meal />} />
    </Route>
  )
);

function App() {
  const defaultTitleSuffix = '??';
  const [titleSuffix, setTitleSuffix] = useState(defaultTitleSuffix);

  return (
    <div className="App">
      <TitleContext.Provider value={{ titleSuffix, setTitleSuffix, defaultTitleSuffix }}>
        <RouterProvider router={router} />
      </TitleContext.Provider>
    </div>
  );
}

export default App
