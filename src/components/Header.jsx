import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useSmoothDisplayChange from '../utils/useSmoothDisplayChange';

const getMediaMatch = () => {
    const { matches } = matchMedia("(min-width: 576px)");
    return matches;
};

export default function Header() {
    const { show: [navRef], transition: showNav }
        = useSmoothDisplayChange({ show: { new: 1 } });
    const { show: [menuRef, blurRef], hide: [menuButtonRef], transition: showMenu }
        = useSmoothDisplayChange({ show: { new: 2 }, hide: { new: 1 } });
    const { transition: hideMenu }
        = useSmoothDisplayChange({ show: { old: [menuButtonRef] }, hide: { old: [menuRef, blurRef] } });
    const [displayMenu, setDisplayMenu] = useState(getMediaMatch());
    const { pathname } = useLocation();

    window.onresize = () => {
        if (getMediaMatch()) {
            setDisplayMenu(true);
            blurRef.current.classList.add('display-none');
        }
        else setDisplayMenu(false);
    };

    useEffect(() => {
        if (getMediaMatch()) showNav();
    }, [pathname]);

    return (
        <>
            <header
                className='header'
            >
                <nav
                    className='navigation navigation_header'
                    ref={navRef}
                >
                    <ul
                        className={`navigation__list navigation__list_header ${displayMenu ? '' : 'display-none'}`}
                        ref={menuRef}
                    >
                        {
                            (pathname === '/') ||
                            <li>
                                <Link
                                    className='link'
                                    to='/'
                                >
                                    <span>Home</span>
                                </Link>
                            </li>
                        }
                        {
                            (pathname === '/categories') ||
                            <li>
                                <Link
                                    className='link'
                                    to='/categories'
                                >
                                    <span>Category List</span>
                                </Link>
                            </li>
                        }
                        {
                            (pathname === '/ingredients') ||
                            <li>
                                <Link
                                    className='link'
                                    to='/ingredients'
                                >
                                    <span>Ingredients List</span>
                                </Link>
                            </li>
                        }
                        {
                            (pathname === '/areas') ||
                            <li>
                                <Link
                                    className='link'
                                    to='/areas'
                                >
                                    <span>Areas List</span>
                                </Link>
                            </li>
                        }
                        {
                            (pathname === '/first-letters') ||
                            <li>
                                <Link
                                    className='link'
                                    to='/first-letters'
                                >
                                    <span>Meals By First Letter</span>
                                </Link>
                            </li>
                        }
                        <li>
                            <Link
                                className='link'
                                to='/meal'
                            >
                                <span>Random Meal</span>
                            </Link>
                        </li>
                        <li>
                            <button
                                className={`button button_menu menu-button menu-button_close`}
                                onClick={() => { hideMenu(); }}
                            >
                                Close Menu
                            </button>
                        </li>
                    </ul>
                </nav>
                <button
                    className={`button button_menu menu-button ${displayMenu ? 'display-none' : ''}`}
                    onClick={() => { showMenu(); }}
                    ref={menuButtonRef}
                >
                    Menu
                </button>
            </header>
            <div
                className='blur display-none'
                ref={blurRef}
                onClick={() => { hideMenu(); }}
            ></div>
        </>
    );
}
