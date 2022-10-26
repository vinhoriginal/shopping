import { useEffect } from "react";
import FeatureProduct from "../../component/Home/FeatureProduct";
import LeatestProducts from "../../component/Home/LeatestProducts";
import { useAppDispatch } from "../../store/hooks";
import { getDataFeatureProduct, getDataTop } from "./home.reducer";
import "./home.scss";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    Promise.any([
      dispatch(getDataTop({ enums: "PRODUCT_TOP" })),
      dispatch(getDataFeatureProduct({ enums: "PRODUCT_LASTEST" })),
    ]);
  }, [dispatch]);
  return (
    <>
      <FeatureProduct />
      <LeatestProducts />
    </>
  );
};

export default Home;
