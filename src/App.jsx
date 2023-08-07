import { useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  redirect,
} from "react-router-dom";

import Layout from "./components/Layout";
import ErrorBoundary from "./routes/ErrorBoundary";
import Home from "./routes/Home";
import Meal from "./routes/Meal";
import MealsList from "./routes/MealsList";
import FirstLettersList from "./routes/FirstLettersList";
import TypesList from "./routes/TypesList";

import TitleContext from "./utils/TitleContext";
import FetchCacheContext from "./utils/FetchCacheContext";
import { fetchData } from "./utils/customFetch";
import "./assets/styles/App.scss";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} />
        <Route path=":type/:subtype" element={<MealsList />} />
        <Route path="first-letters" element={<FirstLettersList />} />
        <Route path=":type" element={<TypesList />} />
        <Route
          path="meal/:id?"
          element={<Meal />}
          loader={async ({ params: { id } }) => {
            if (!id) {
              const path = await fetchData({
                url: "https://www.themealdb.com/api/json/v1/1/random.php",
                dataExtractor: (data) => data.meals[0].idMeal,
              });
              return redirect(`${path}`);
            }
            return null;
          }}
        />
      </Route>
    </Route>
  )
);

function App() {
  const defaultTitleSuffix = "??";
  const [titleSuffix, setTitleSuffix] = useState(defaultTitleSuffix);

  return (
    <div className="App">
      <TitleContext.Provider
        value={{ titleSuffix, setTitleSuffix, defaultTitleSuffix }}
      >
        <FetchCacheContext.Provider value={new Map()}>
          <RouterProvider router={router} />
        </FetchCacheContext.Provider>
      </TitleContext.Provider>
    </div>
  );
}

export default App;
