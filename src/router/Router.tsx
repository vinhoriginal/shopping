import { Navigate, useLocation, useRoutes } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Blog from "../page/Blog/Blog";
import Contact from "../page/Contact/Contact";
import Home from "../page/Home/Home";
import Layout from "../page/Layout/Layout";
import Login from "../page/Login/Login";
import Pages from "../page/Pages/Pages";
import Products from "../page/Products/Products";
import Register from "../page/Register/Register";
import Shop from "../page/Shop/Shop";
import path from "./path";

const Router = () => {
  const location = useLocation();
  const auth = useAuth();
  return useRoutes([
    {
      path: "/",
      element: auth ? (
        <Layout />
      ) : (
        <Navigate to={path.login} state={{ from: location }} />
      ),
      children: [
        {
          index: true,
          path: path.home,
          element: <Home />,
        },
        {
          path: path.products,
          element: <Products />,
        },
        {
          path: path.blog,
          element: <Blog />,
        },
        {
          path: path.contact,
          element: <Contact />,
        },
        {
          path: path.pages,
          element: <Pages />,
        },
        {
          path: path.shop,
          element: <Shop />,
        },
      ],
    },
    {
      path: path.login,
      element: auth ? (
        <Navigate to={path.home} state={{ from: location }} />
      ) : (
        <Login />
      ),
    },
    {
      path: path.register,
      element: auth ? (
        <Navigate to={path.home} state={{ from: location }} />
      ) : (
        <Register />
      ),
    },
  ]);
};

export default Router;
