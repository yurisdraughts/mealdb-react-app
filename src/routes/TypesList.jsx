import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useSmoothDisplayChange from "../utils/useSmoothDisplayChange";
import customFetch from "../utils/customFetch";
import FetchCacheContext from "../utils/FetchCacheContext";

export default function TypesList() {
  const {
    show: [pageRef],
    transition: showPage,
  } = useSmoothDisplayChange({ show: { new: 1 } });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  if (error !== null) throw error;

  const { type } = useParams();
  let url;
  const [apiProperty, setApiProperty] = useState();

  if (type === "categories") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  } else if (type === "ingredients") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  } else if (type === "areas") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
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

    if (type === "categories") {
      setApiProperty("strCategory");
    } else if (type === "ingredients") {
      setApiProperty("strIngredient");
    } else if (type === "areas") {
      setApiProperty("strArea");
    }

    return () => {
      showPage();
    };
  }, [type]);

  return (
    <div className="page display-none" ref={pageRef}>
      {!loading && data && (
        <nav className="navigation">
          <ul className="navigation__list navigation__list_categories">
            {data.map((category, id) => (
              <li key={id}>
                <Link
                  className="button page__button"
                  to={encodeURI(category[apiProperty])}
                >
                  {category[apiProperty]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
