import { useRoutes } from "react-router-dom";
import Blog from "../page/Blog/Blog";
import ChangeInfo from "../page/ChangeInfo/ChangeInfo";
import BillingCheckout from "../page/CheckOut/BillingCheckout";
import CheckOut from "../page/CheckOut/CheckOut";
import Contact from "../page/Contact/Contact";
import Detail from "../page/Detail/Detail";
import ForgotPass from "../page/Forgot/ForgotPass";
import History from "../page/History/History";
import Home from "../page/Home/Home";
import Layout from "../page/Layout/Layout";
import ListLike from "../page/ListLike/ListLike";
import Login from "../page/Login/Login";
import DetailOrder from "../page/Order/DetailOrder";
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
        {
          path: path.history,
          element: <History />,
        },
        {
          path: path.listLike,
          element: <ListLike />,
        },
        {
          path: path.detailOrder,
          element: <DetailOrder />,
        },
        {
          path: path.forgot,
          element: <ForgotPass />,
        },
        {
          path: path.info,
          element: <ChangeInfo />,
        },
      ],
    },
  ]);
};

export default Router;
