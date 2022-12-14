import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import heart from "../../assets/heart.png";
import nonStar from "../../assets/rate-none.png";
import star from "../../assets/rate.png";
import Footer from "../../component/Footer/Footer";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCard, addToLike, viewCart } from "../Layout/layout.reducer";
import { FONT_SIZE, TOKEN_KEY, USER_INFO } from "../utils/contants";
import Comment from "./Comment";
import {
  getAllComment,
  getDataRelated,
  getDetailProducts,
  resetIsShowChild,
} from "./details.reducer";
import "./details.scss";
import RelatedProducts from "./RelatedProducts";

const Detail = () => {
  const [starImage, setStarImage] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();
  const { dataDetail } = useAppSelector((state) => state.detailReducer);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    Promise.all([
      dispatch(getDetailProducts(params.id)),
      dispatch(getAllComment(params.id)),
      dispatch(getDataRelated({ enums: "PRODUCT_BY_TYPE" })),
    ]);
    return () => {
      dispatch(resetIsShowChild());
    };
  }, [params, dispatch]);
  useEffect(() => {
    if (dataDetail && dataDetail.star) {
      const arrStar = Array.from({ length: dataDetail.star }, () => star);
      const arrNonstar = Array.from(
        { length: 5 - dataDetail.star },
        () => nonStar
      );
      setStarImage(arrStar.concat(arrNonstar));
    }
  }, [dataDetail]);
  const handleAddToCart = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
    } else {
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
      dispatch(
        addToCard({
          productId: dataDetail?.id,
          customerId: userInfo.customerId,
          quantity: "1",
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Th??m s???n ph???m v??o gi??? h??ng th??nh c??ng");
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
          toast.success("Th??m s???n ph???m y??u th??ch th??nh c??ng");
        }
      });
    }
  };
  return (
    <div className="detail-page">
      <div className="details">
        <span style={{ fontFamily: "Segoe UI" }}>Chi ti???t s???n ph???m</span>
      </div>
      <div>
        <div className="details-products">
          <div>
            <img
              src={dataDetail?.path?.length ? dataDetail?.path[0] : ""}
              alt="img products"
            />
          </div>
          <div>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                textAlign: "start",
              }}
            >
              {dataDetail?.name}
            </span>
            <div className="star">
              <div>
                {starImage.map((item, index) => (
                  <img src={item} alt="star" key={index} />
                ))}
              </div>
              <span>(22)</span>
            </div>
            <div className="price">
              <span style={{ fontSize: "20px", fontFamily: "Segoe UI", textDecoration:"line-through" }}>
                {dataDetail?.price} VND
              </span>
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "Segoe UI",
                  color: "#ff2aaa",
                }}
              >
                {dataDetail?.ourPrice} VND
              </span>
            </div>
            <span
              style={{ fontSize: "15px", fontFamily: "Segoe UI" }}
              className="description"
            >
              M?? t???: {dataDetail?.description}
            </span>
            <label
              style={{ fontSize: "15px", fontFamily: "Segoe UI" }}
              className="discount"
            >
              Khuy???n m??i:{dataDetail?.discount}
            </label>
            <span
              style={{ fontSize: FONT_SIZE, fontFamily: "Segoe UI", marginTop:"10px" }}
              className="voucher"
            >
              Danh s??ch khuy???n m??i: {dataDetail?.description}
            </span>
            {dataDetail?.voucherList?.map((item, index) => (
              <span className="voucherList">
                <div><span className="voucherLabel">KM {index + 1}</span></div>
                <label key={item.id} className="voucherDescription" 
                style={{fontSize: "15px", fontFamily: "Segoe UI", color: "#333"}}
                >{item.description}</label>
              </span>
            ))}
            <div className="add-to-cart">
              <Button
                onClick={handleAddToCart}
                type="primary"
                style={{
                  backgroundColor: "#19D16F",
                  border: "none",
                  borderRadius: "5px",
                  marginTop: "10px",
                  marginRight: "5px",
                }}
              >
                Th??m v??o gi??? h??ng
              </Button>
              <div className="heart" style={{marginTop: "10px",}}>
                <img src={heart} alt="heart" onClick={() => handleAddToLike(dataDetail?.id)}/>
              </div>
            </div>
            <span
              style={{ fontSize: "20px", fontFamily: "Segoe UI" }}
              className="category"
            >
              Category: {dataDetail?.productType?.name}
            </span>
            <span
              style={{ fontSize: "20px", fontFamily: "Segoe UI" }}
              className="tags"
            >
              Tags
            </span>
            <span
              style={{ fontSize: "20px", fontFamily: "Segoe UI" }}
              className="share"
            >
              Share
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                fontWeight: "bold",
              }}
              className="share"
            >
              Th??ng s??? k??? thu???t
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              CPU:{" "}
              <span style={{ fontWeight: "200" }}>{dataDetail?.hardDisk}</span>
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              Card ????? h???a:{" "}
              <span style={{ fontWeight: "200" }}>{dataDetail?.card}</span>{" "}
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              ??? c???ng:{" "}
              <span style={{ fontWeight: "200" }}>{dataDetail?.hardDisk}</span>
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              Pin: <span style={{ fontWeight: "200" }}>{dataDetail?.pin}</span>
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              Ram: <span style={{ fontWeight: "200" }}>{dataDetail?.ram}</span>
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              M??n h??nh:{" "}
              <span style={{ fontWeight: "200" }}>{dataDetail?.screenHd}</span>
            </span>
            <span
              style={{
                fontSize: "20px",
                fontFamily: "Segoe UI",
                color: "#000",
                fontWeight: "400",
              }}
              className="share"
            >
              K??ch th?????c m??n h??nh:{" "}
              <span style={{ fontWeight: "200" }}>
                {dataDetail?.screenSize}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <Comment params={params} />
      </div>
      <div style={{ marginTop: "12px" }}>
        <RelatedProducts />
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
