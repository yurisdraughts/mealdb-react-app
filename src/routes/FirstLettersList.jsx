import { Link } from "react-router-dom";

export default function FirstLettersList() {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="page">
      <nav className="navigation">
        <ul className="navigation__list navigation__list_first-letters">
          {letters.map((letter, key) => (
            <li key={key}>
              <Link className="button" to={letter}>
                {letter.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
