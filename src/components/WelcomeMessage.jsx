export default function WelcomeMessage() {
  return (
    <>
      <h1>Здравствуйте!</h1>
      <p>
        Это небольшое приложение сделано с помощью библиотеки{" "}
        <strong className="strong">React</strong> на основе API сайта с
        рецептами{" "}
        <a className="link" href="https://www.themealdb.com/" target="_blank">
          MealDB
        </a>
        . Исходный код можно найти{" "}
        <a
          className="link"
          href="https://github.com/yurisdraughts/mealdb-react-app"
          target="_blank"
        >
          по ссылке
        </a>
        .
      </p>
    </>
  );
}
