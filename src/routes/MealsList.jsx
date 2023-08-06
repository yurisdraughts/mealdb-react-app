import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useSmoothDisplayChange from "../utils/useSmoothDisplayChange";
import customFetch from "../utils/customFetch";
import fallbackImage from "../assets/images/meal-icon.png";
import FetchCacheContext from "../utils/FetchCacheContext";

export default function MealsList() {
  const {
    show: [pageRef],
    transition: showPage,
  } = useSmoothDisplayChange({ show: { new: 1 } });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  if (error !== null) throw error;

  const { type, subtype } = useParams();
  let url;

  if (type === "first-letters") {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${subtype}`;
  } else if (type === "categories") {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${subtype}`;
  } else if (type === "areas") {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${subtype}`;
  } else if (type === "ingredients") {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${subtype}`;
  }

  const cache = useContext(FetchCacheContext);
  useEffect(() => {
    customFetch({
      setLoading,
      setData,
      setError,
      url,
      cache,
      dataExtractor: (data) => data.meals,
    });

    return () => {
      showPage();
    };
  }, [type, subtype]);

  return (
    <div className="page display-none" ref={pageRef}>
      {!loading && data && (
        <nav className="navigation">
          <ul className="navigation__list navigation__list_meals">
            {data &&
              data.map((meal, id) => (
                <li key={id}>
                  <Link
                    className="button page__button"
                    to={"/meal/" + meal.idMeal}
                  >
                    <img
                      className="navigation__image"
                      src={meal.strMealThumb + "/preview"}
                      alt={meal.strMeal}
                      height={45}
                      width={45}
                      onError={(event) => {
                        event.preventDefault();
                        event.target.src = fallbackImage;
                      }}
                    ></img>
                    <span>{meal.strMeal}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
