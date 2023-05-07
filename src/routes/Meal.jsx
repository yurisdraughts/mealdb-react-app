import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Youtube from "../components/Youtube";
import useSmoothDisplayChange from '../utils/useSmoothDisplayChange';
import TitleContext from "../utils/TitleContext";
import fallbackImage from '../assets/images/meal-icon.png';

export default function Meal() {
    const { pathname } = useLocation();

    const { show: [pageRef], transition: showPage }
        = useSmoothDisplayChange({ show: { new: 1 } });

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [redirected, setRedirected] = useState(false);
    const [videoSrc, setVideoSrc] = useState(null);

    const { setTitleSuffix } = useContext(TitleContext);

    const navigate = useNavigate();
    const { id } = useParams();
    let url;

    if (id) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    } else {
        url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    }

    useEffect(() => {
        (async () => {
            if (pathname === '/meal') {
                try {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                    const data = await response.json();

                    setData(data.meals[0]);
                    setError(null);

                    navigate(`/meal/${data.meals[0].idMeal}`, { replace: true });
                } catch (error) {
                    console.error(error);

                    setData(null);
                    setError(error.message);
                } finally {
                    setRedirected(true);
                }
            } else {
                if (redirected) {
                    setRedirected(false);
                } else {
                    try {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error(
                            `This is an HTTP error: The status is ${response.status}`
                        );
                        const data = await response.json();

                        setData(data.meals[0]);
                        setError(null);
                    } catch (error) {
                        console.error(error);

                        setData(null);
                        setError(error.message);
                    } finally {
                        showPage();
                    }
                }

            }
        })();
    }, [pathname]);

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
                newIngredients.push([data[`strIngredient${i}`], data[`strMeasure${i}`]]);
            }
            setIngredients(newIngredients);
        }
    }, [data]);

    return (
        <>
            <div
                className='page display-none'
                ref={pageRef}
            >
                {
                    error &&
                    <p>
                        {`An error occurred: ${error}`}
                    </p>
                }
                {
                    data &&
                    <>
                        <h1>{data.strMeal}</h1>
                        <img
                            className="meal__image"
                            src={data.strMealThumb + '/preview'}
                            alt={data.strMeal}
                            onError={event => {
                                event.preventDefault();
                                event.target.src = fallbackImage;
                            }}
                        ></img>
                        <table className="meal__ingredients-list">
                            <tbody>
                                {
                                    ingredients.map((ingredient, id) => (
                                        <tr key={id}>
                                            <td>
                                                <Link
                                                    className="link"
                                                    to={`/ingredients/${encodeURI(ingredient[0])}`}
                                                >
                                                    {ingredient[0]}
                                                </Link>

                                            </td>
                                            <td>
                                                {ingredient[1]}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        {
                            data.strInstructions.split('. ').map((sentence, id, { length }) => (
                                <p key={id}>
                                    {sentence}{id === length - 1 ? '' : '.'}
                                </p>
                            ))
                        }
                        <footer className="meal__footer">
                            <span className="strong">Category:</span>
                            <p>
                                <Link className='button' to={`/categories/${data.strCategory}`}>
                                    {data.strCategory}
                                </Link>
                            </p>
                            <span className="strong">Area:</span>
                            <p>
                                <Link className='button' to={`/areas/${data.strArea}`}>
                                    {data.strArea}
                                </Link>
                            </p>
                            {
                                videoSrc &&
                                <Youtube src={videoSrc} />
                            }
                        </footer>
                    </>
                }
            </div>
        </>
    );
}