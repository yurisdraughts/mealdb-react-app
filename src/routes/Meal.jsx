import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Youtube from "../components/Youtube";
import useSmoothDisplayChange from "../utils/useSmoothDisplayChange";
import customFetch from "../utils/customFetch";
import TitleContext from "../utils/TitleContext";
import FetchCacheContext from "../utils/FetchCacheContext";
import fallbackImage from "../assets/images/meal-icon.png";

export default function Meal() {
  const {
    show: [pageRef],
    transition: showPage,
  } = useSmoothDisplayChange({ show: { new: 1 } });

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  if (error !== null) throw error;

  const [ingredients, setIngredients] = useState([]);
  const [videoSrc, setVideoSrc] = useState(null);

  const { setTitleSuffix } = useContext(TitleContext);

  const { id } = useParams();
  let url;

    url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  const cache = useContext(FetchCacheContext);
  useEffect(() => {
      customFetch({
        setLoading,
        setData,
        setError,
        url,
        cache,
        dataExtractor: (data) => data.meals[0],
      });

    return () => {
      showPage();
    };
  }, [id]);

  useEffect(() => {
    if (data) {
      setTitleSuffix(data.strMeal);
      if (data.strYoutube) {
        setVideoSrc(data.strYoutube);
      } else {
        setVideoSrc(null);
      }

      const newIngredients = [];
      for (let i = 1; i <= 20; i++) {
        if (!data[`strIngredient${i}`]) {
          break;
        }
        newIngredients.push([
          data[`strIngredient${i}`],
          data[`strMeasure${i}`],
        ]);
      }
      setIngredients(newIngredients);
    }
  }, [data]);

  return (
    <div className="page display-none" ref={pageRef}>
      {!loading && data && (
        <>
          <h1>{data.strMeal}</h1>
          <img
            className="meal__image"
            src={data.strMealThumb + "/preview"}
            alt={data.strMeal}
            width={150}
            height={150}
            onError={(event) => {
              event.preventDefault();
              event.target.src = fallbackImage;
            }}
          ></img>
          <table className="meal__ingredients-list">
            <tbody>
              {ingredients.map((ingredient, id) => (
                <tr key={id}>
                  <td>
                    <Link
                      className="link"
                      to={`/ingredients/${encodeURI(ingredient[0])}`}
                    >
                      {ingredient[0]}
                    </Link>
                  </td>
                  <td>{ingredient[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.strInstructions.split(". ").map((sentence, id, { length }) => (
            <p key={id}>
              {sentence}
              {id === length - 1 ? "" : "."}
            </p>
          ))}
          <footer className="meal__footer">
            <span className="strong">Category:</span>
            <p>
              <Link className="button" to={`/categories/${data.strCategory}`}>
                {data.strCategory}
              </Link>
            </p>
            <span className="strong">Area:</span>
            <p>
              <Link className="button" to={`/areas/${data.strArea}`}>
                {data.strArea}
              </Link>
            </p>
            {videoSrc && <Youtube src={videoSrc} />}
          </footer>
        </>
      )}
    </div>
  );
}
