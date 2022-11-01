import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import imageTest from "../../assets/image-test.png";

const RelatedProducts = () => {
  const [arrStar, setArrStar] = useState<any[]>([]);
  useEffect(() => {
    const newArr = Array.from({ length: 4 }, () =>
      require("../../assets/rate.png")
    );
    const arrRateNone = Array.from({ length: 1 }, () =>
      require("../../assets/rate-none.png")
    );
    setArrStar(newArr.concat(arrRateNone));
  }, []);
  return (
    <div className="related-products">
      <div className="details">
        <span>Related Products</span>
      </div>
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <div className="image-related">
              <img src={imageTest} alt="related" />
            </div>
            <div className="title">
              <div>
                <span>Mens Fashion Wear</span>
                <div>
                  {arrStar.map((item) => (
                    <img src={item} alt="star" />
                  ))}
                </div>
              </div>
              <span>$43.00</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RelatedProducts;
