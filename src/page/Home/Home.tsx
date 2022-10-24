import { Card } from "antd";
import React from "react";
import FeatureProduct from "../../component/Home/FeatureProduct";
import LeatestProducts from "../../component/Home/LeatestProducts";
import ShopOffer from "../../component/Home/ShopOffer";
import "./home.scss";

const Home = () => {
  return (
    <Card size="default" style={{ padding: "80px" }}>
      <FeatureProduct />
      <LeatestProducts />
      <ShopOffer />
    </Card>
  );
};

export default Home;
