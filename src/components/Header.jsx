import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useSmoothDisplayChange from "../utils/useSmoothDisplayChange";

const getMediaMatch = () => {
  const { matches } = matchMedia("(min-width: 576px)");
  return matches;
};

export default function Header() {
  const {
    show: [navRef],
    transition: showNav,
  } = useSmoothDisplayChange({ show: { new: 1 } });
  const {
    show: [menuRef, blurRef],
    hide: [menuButtonRef],
    transition: showMenu,
  } = useSmoothDisplayChange({ show: { new: 2 }, hide: { new: 1 } });
  const { transition: hideMenu } = useSmoothDisplayChange({
    show: { old: [menuButtonRef] },
    hide: { old: [menuRef, blurRef] },
  });
  const [displayMenu, setDisplayMenu] = useState(getMediaMatch());
  const { pathname } = useLocation();

  const A = ({ to, text }) => {
    return (
      <Link
        className="link"
        to={to}
        onClick={() => {
          if (!getMediaMatch()) {
            hideMenu();
          }
        }}
      >
        <span>{text}</span>
      </Link>
    );
  };

  window.onresize = () => {
    if (getMediaMatch()) {
      setDisplayMenu(true);
      blurRef.current.classList.add("display-none");
    } else setDisplayMenu(false);
  };

  return (
    <>
      <header className="header">
        <nav className="navigation navigation_header" ref={navRef}>
          <ul
            className={`navigation__list navigation__list_header ${
              displayMenu ? "" : "display-none"
            }`}
            ref={menuRef}
          >
            {pathname === "/" || (
              <li>
                <A to="/" text="Home" />
              </li>
            )}
            {pathname === "/categories" || (
              <li>
                <A to="/categories" text="Category List" />
              </li>
            )}
            {pathname === "/ingredients" || (
              <li>
                <A to="/ingredients" text="Ingredients List" />
              </li>
            )}
            {pathname === "/areas" || (
              <li>
                <A to="/areas" text="Areas List" />
              </li>
            )}
            {pathname === "/first-letters" || (
              <li>
                <A to="/first-letters" text="Meals By First Letter" />
              </li>
            )}
            <li>
              <A to="/meal" text="Random Meal" />
            </li>
            <li>
              <button
                className={`button button_menu menu-button menu-button_close`}
                onClick={() => {
                  hideMenu();
                }}
              >
                Close Menu
              </button>
            </li>
          </ul>
        </nav>
        <button
          className={`button button_menu menu-button ${
            displayMenu ? "display-none" : ""
          }`}
          onClick={() => {
            showMenu();
          }}
          ref={menuButtonRef}
        >
          Menu
        </button>
      </header>
      <div
        className="blur display-none"
        ref={blurRef}
        onClick={() => {
          hideMenu();
        }}
      ></div>
    </>
  );
}
