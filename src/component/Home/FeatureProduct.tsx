import { Col, Row } from "antd";
import cart from "../../assets/cart.png";
import group2 from "../../assets/Group2.png";
import heart from "../../assets/heart.png";
import { setItemProducts } from "../../page/Layout/layout.reducer";
import { PRODUCTS_ITEM } from "../../page/utils/contants";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const FeatureProduct = () => {
  const dispatch = useAppDispatch();
  const dataFeatureProduct = useAppSelector(
    (state) => state.homeReducer.dataFeatureProduct
  );
  const handleAddToCart = (item: any) => {
    const productItem =
      JSON.parse(localStorage.getItem(PRODUCTS_ITEM) as string) || [];
    localStorage.setItem(PRODUCTS_ITEM, JSON.stringify([...productItem, item]));
    dispatch(setItemProducts(item));
  };
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
                    <img
                      src={cart}
                      alt="cart"
                      onClick={() => handleAddToCart(item)}
                    />
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
                    {/* <Button>View Detail</Button> */}
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

export default FeatureProduct;
