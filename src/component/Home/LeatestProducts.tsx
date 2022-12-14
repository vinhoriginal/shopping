import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cart from "../../assets/cart.png";
import group2 from "../../assets/Group2.png";
import heart from "../../assets/heart.png";
import { IFormUserInfo } from "../../model/userInfo.model";
import { getDataTop } from "../../page/Home/home.reducer";
import {
  addToCard,
  addToLike,
  viewCart,
} from "../../page/Layout/layout.reducer";
import { TOKEN_KEY, USER_INFO } from "../../page/utils/contants";
import PaginationPage from "../../page/utils/Pagination";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const LeatestProducts = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const dispatch = useAppDispatch();
  const { dataTopProduct, totalLatest } = useAppSelector(
    (state) => state.homeReducer
  );
  useEffect(() => {
    dispatch(
      getDataTop({
        value: { enums: "PRODUCT_TOP" },
        total: { page: page - 1, pageSize },
      })
    );
  }, [dispatch, page, pageSize]);
  const navigate = useNavigate();
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
  const handleAddToLike = (id: number) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
    } else {
      const userInfo: IFormUserInfo = JSON.parse(
        localStorage.getItem(USER_INFO) as string
      );
      dispatch(
        addToLike({
          customerId: userInfo?.customerId,
          productId: id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Thêm sản phẩm yêu thích thành công");
        }
      });
    }
  };
  return (
    <div style={{ marginTop: "50px" }}>
      <div className="featured-title">
        <span>SẢN PHẨM BÁN CHẠY</span>
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
              key={item?.id}
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
                    <img
                      src={heart}
                      alt="heart"
                      onClick={() => handleAddToLike(item.id)}
                    />
                  </div>
                </div>
                <div className="img-product">
                  <div>
                    <img
                      src={`data:image/jpeg;base64,${item?.images[0]}`}
                      alt="image1"
                      onClick={() => navigate(`/detail/${item?.id}`)}
                    />
                  </div>
                </div>
                <div className="title">
                  <span>{item?.name}</span>
                  <img src={group2} alt="group2" />
                  <span className="product_item">{item?.code}</span>
                  <div className="price">
                    {" "}
                    <span className="product_price root">
                      {item?.price} VND
                    </span>
                    <span className="product_our_price">
                      {item?.ourPrice} VND
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <PaginationPage
        page={page}
        pageSize={pageSize}
        total={totalLatest}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default LeatestProducts;
