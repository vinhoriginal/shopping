import React from "react";
import image1 from "../../assets/image1.png";
import group2 from "../../assets/Group2.png";
import { Col, Row } from "antd";
import { useAppSelector } from "../../store/hooks";
import cart from "../../assets/cart.png";
import heart from "../../assets/heart.png";

const FeatureProduct = () => {
  const dataFeatureProduct = useAppSelector(
    (state) => state.homeReducer.dataFeatureProduct
  );
  return (
    <div>
      <div className="featured-title">
        <span>Latest Products</span>
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
                  <img src={image1} alt="image1" />
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

export default FeatureProduct;
