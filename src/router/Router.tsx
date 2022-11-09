import { useRoutes } from "react-router-dom";
import Blog from "../page/Blog/Blog";
import BillingCheckout from "../page/CheckOut/BillingCheckout";
import CheckOut from "../page/CheckOut/CheckOut";
import Contact from "../page/Contact/Contact";
import Detail from "../page/Detail/Detail";
import Home from "../page/Home/Home";
import Layout from "../page/Layout/Layout";
import Login from "../page/Login/Login";
import Pages from "../page/Pages/Pages";
import Products from "../page/Products/Products";
import Register from "../page/Register/Register";
import Shop from "../page/Shop/Shop";
import path from "./path";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
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
        {
          path: path.checkout,
          element: <CheckOut />,
        },
        {
          path: path.detail,
          element: <Detail />,
        },
        {
          path: path.login,
          element: <Login />,
        },
        {
          path: path.register,
          element: <Register />,
        },
        {
          path: path.billingAddress,
          element: <BillingCheckout />,
        },
      ],
    },
  ]);
};

export default Router;
