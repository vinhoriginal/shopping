import Footer from "../../component/Footer/Footer";
import FeatureProduct from "../../component/Home/FeatureProduct";
import LeatestProducts from "../../component/Home/LeatestProducts";
import "./home.scss";

const Home = () => {
  return (
    <>
      <FeatureProduct />
      <LeatestProducts />
      <Footer/>
    </>
  );
};

export default Home;
