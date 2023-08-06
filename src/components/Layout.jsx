import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import TitleContext from "../utils/TitleContext";

export default function Layout() {
  const { pathname } = useLocation();

  const prefix = "MealBD React App";
  const separator = " :: ";
  const { titleSuffix, defaultTitleSuffix } = useContext(TitleContext);

  useEffect(() => {
    if (pathname === "/") {
      document.title = prefix;
    }

    // Areas:
    else if (pathname === "/areas") {
      document.title = prefix + separator + "Areas";
    } else if (pathname.startsWith("/areas/")) {
      document.title =
        prefix + separator + decodeURI(pathname.substring("/areas/".length));
    }

    // First Letters:
    else if (pathname === "/first-letters") {
      document.title = prefix + separator + "First Letters";
    } else if (pathname.startsWith("/first-letters/")) {
      document.title =
        prefix +
        separator +
        pathname.substring("/first-letters/".length).toUpperCase();
    }

    // Ingredients:
    else if (pathname === "/ingredients") {
      document.title = prefix + separator + "Ingredients";
    } else if (pathname.startsWith("/ingredients/")) {
      document.title =
        prefix +
        separator +
        decodeURI(pathname.substring("/ingredients/".length));
    }

    // Categories:
    else if (pathname === "/categories") {
      document.title = prefix + separator + "Categories";
    } else if (pathname.startsWith("/categories/")) {
      document.title =
        prefix +
        separator +
        decodeURI(pathname.substring("/categories/".length));
    }

    // Meal:
    else if (pathname.startsWith("/meal")) {
      document.title = prefix + separator + titleSuffix;
    }

    // Else:
    else {
      document.title = prefix + separator + defaultTitleSuffix;
    }
  }, [pathname, titleSuffix]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
