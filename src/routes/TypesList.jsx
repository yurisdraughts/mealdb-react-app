import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useSmoothDisplayChange from '../utils/useSmoothDisplayChange';

export default function TypesList() {
    const { show: [pageRef], transition: showPage }
        = useSmoothDisplayChange({ show: { new: 1 } });

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    
    const { type } = useParams();
    let url, apiProperty;

    if (type === 'categories') {
        url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
        apiProperty = 'strCategory';
    } else if (type === 'ingredients') {
        url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        apiProperty = 'strIngredient';
    } else if (type === 'areas') {
        url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
        apiProperty = 'strArea';
    }

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

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
                setLoading(false);
            }
        })();

        return showPage();
    }, [type]);

    return (
        <div
            className='display-none'
            ref={pageRef}
        >
            {
                !loading &&
                <div
                    className='page'
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
                                className='navigation__list navigation__list_categories'
                            >
                                {
                                    data.map((category, id) => (
                                        <li key={id}>
                                            <Link
                                                className='button page__button'
                                                to={encodeURI(category[apiProperty])}
                                            >
                                                {category[apiProperty]}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    }
                </div>
            }
        </div>
    );
}
