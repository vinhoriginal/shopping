import { Navigate, useLocation, useRoutes } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Home from "../page/Home/Home";
import Layout from "../page/Layout/Layout";
import Login from "../page/Login/Login";
import Register from "../page/Register/Register";
import path from "./path";

const Router = () => {
  const location = useLocation();
  const auth = useAuth();
  return useRoutes([
    {
      path: path.home,
      element: auth ? (
        <Layout />
      ) : (
        <Navigate to={path.login} state={{ from: location }} />
      ),
      children: [
        {
          index: true,
          element: <Home />,
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
