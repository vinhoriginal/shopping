import { Col, Row } from "antd";
import group2 from "../../assets/Group2.png";
import image1 from "../../assets/image1.png";
import { useAppSelector } from "../../store/hooks";

const LeatestProducts = () => {
  const dataTopProduct = useAppSelector(
    (state) => state.homeReducer.dataTopProduct
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
          {dataTopProduct.map((item) => (
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

export default LeatestProducts;
