import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useSmoothDisplayChange from '../utils/useSmoothDisplayChange';
import fallbackImage from '../assets/images/meal-icon.png';

export default function MealsList() {
    const { show: [pageRef], transition: showPage }
        = useSmoothDisplayChange({ show: { new: 1 } });
        
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    const { type, subtype } = useParams();
    let url;

    if (type === 'first-letters') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${subtype}`;
    } else if (type === 'categories') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${subtype}`;
    } else if (type === 'areas') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${subtype}`;
    } else if (type === 'ingredients') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${subtype}`;
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                );
                const data = await response.json();

                setData(data.meals);
                setError(null);
            } catch (error) {
                console.error(error);

                setData(null);
                setError(error.message);
            } finally {
                showPage();
            }
        })();
    }, []);

    return (
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
                <nav className="navigation">
                    <ul
                        className='navigation__list navigation__list_meals'
                    >
                        {
                            data && data.map((meal, id) => (
                                <li key={id}>
                                    <Link
                                        className='button page__button'
                                        to={'/meal/' + meal.idMeal}
                                    >
                                        <img
                                            className='navigation__image'
                                            src={meal.strMealThumb + '/preview'}
                                            alt={meal.strMeal}
                                            onError={event => {
                                                event.preventDefault();
                                                event.target.src = fallbackImage;
                                            }}
                                        ></img>
                                        <span>
                                            {meal.strMeal}
                                        </span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            }
        </div >
    );
}