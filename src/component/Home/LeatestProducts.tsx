import { Col, Row } from "antd";
import cart from "../../assets/cart.png";
import group2 from "../../assets/Group2.png";
import heart from "../../assets/heart.png";
import { useAppSelector } from "../../store/hooks";

const LeatestProducts = () => {
  const {dataFeatureProduct, dataTopProduct} = useAppSelector(
    (state) => state.homeReducer
  );
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="featured-title">
        <span>TOP Products</span>
      </div>
      <div className="featured-products">
        <Row
          gutter={20}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          {dataFeatureProduct.map((item) => (
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
              key={item.id}
            >
              <div className="product-detail">
              <div className="product-menu">
                  <div className="cart">
                    <img src={cart} alt="cart" />
                  </div>
                  <div className="heart">
                    <img src={heart} alt="heart" />
                  </div>
                </div>
                <div className="img-product">
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt="image1"
                    />
                  </div>
                </div>
                <div className="title">
                  <span>{item.name}</span>
                  <img src={group2} alt="group2" />
                  <span>Code - Y523201</span>
                  <span>${item.price}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default LeatestProducts;
