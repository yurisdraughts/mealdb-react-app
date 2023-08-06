import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="page">
      <div>
        <h1>Ошибка!</h1>
        <p>{error.statusText || error.message}</p>
      </div>
    </div>
  );
}
