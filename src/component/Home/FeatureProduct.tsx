import React from "react";
import image1 from "../../assets/image1.png";
import group2 from "../../assets/Group2.png";
import { Col, Row } from "antd";

const FeatureProduct = () => {
  return (
    <div>
      <div className="featured-title">
        <span>Featured Products</span>
      </div>
      <div className="featured-products">
        <Row gutter={20}>
          <Col span={6} style={{ display: "flex", justifyContent: "center" }}>
            <div className="product-detail">
              <div className="img-product">
                <img src={image1} alt="image1" />
              </div>
              <div className="title">
                <span>Cantilever chair</span>
                <img src={group2} alt="group2" />
                <span>Code - Y523201</span>
                <span>$42.00</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FeatureProduct;
