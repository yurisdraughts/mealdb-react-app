import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import useSmoothDisplayChange from "../utils/useSmoothDisplayChange";
import { initialLoadingMsg, getLoadingMsgEffect } from "../utils/loadingMsg";
import customFetch from "../utils/customFetch";
import FetchCacheContext from "../utils/FetchCacheContext";

export default function TypesList() {
  const {
    show: [pageRef],
    transition: showPage,
  } = useSmoothDisplayChange({ show: { new: 1 } });

  const { type } = useParams();
  let url;

  if (type === "categories") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
  } else if (type === "ingredients") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
  } else if (type === "areas") {
    url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
  }

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  if (error !== null) throw error;

  const [apiProperty, setApiProperty] = useState();
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

  const [loadingMsg, setLoadingMsg] = useState(initialLoadingMsg);
  useEffect(getLoadingMsgEffect(loading, setLoadingMsg), [loading]);

  return (
    <div className="display-none" ref={pageRef}>
      {loading && (
        <div className="blur blur_loading">
          <h1>{loadingMsg.join("")}</h1>
        </div>
      )}
      {!loading && data && (
        <div className="page">
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
        </div>
      )}
    </div>
  );
}
