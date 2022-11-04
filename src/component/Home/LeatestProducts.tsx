import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png";
import group2 from "../../assets/Group2.png";
import heart from "../../assets/heart.png";
import { addToCard, viewCart } from "../../page/Layout/layout.reducer";
import { TOKEN_KEY, USER_INFO } from "../../page/utils/contants";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const LeatestProducts = () => {
  const { dataTopProduct } = useAppSelector((state) => state.homeReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleAddToCart = (item: any) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
    } else {
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
      dispatch(
        addToCard({
          productId: item.id,
          customerId: userInfo.id,
          quantity: item.make.id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(viewCart());
        }
      });
    }
  };
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
                      onClick={() => navigate(`/detail/${item.id}`)}
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
