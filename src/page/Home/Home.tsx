import { Card } from "antd";
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
    <Card size="default" style={{ padding: "80px" }}>
      <FeatureProduct />
      <LeatestProducts />
    </Card>
  );
};

export default Home;
