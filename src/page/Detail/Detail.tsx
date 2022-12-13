import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import heart from "../../assets/heart.png";
import nonStar from "../../assets/rate-none.png";
import star from "../../assets/rate.png";
import Footer from "../../component/Footer/Footer";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCard, viewCart } from "../Layout/layout.reducer";
import { TOKEN_KEY, USER_INFO } from "../utils/contants";
import Comment from "./Comment";
import {
  getAllComment,
  getDataRelated,
  getDetailProducts,
  resetIsShowChild
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
          quantity: '1',
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success('Thêm sản phẩm vào giỏ hàng thành công')
          dispatch(viewCart());
        }
      });
    }
  };
  return (
    <div className="detail-page">
      <div className="details">
        <span style={{fontFamily:"Segoe UI"}}>Chi tiết sản phẩm</span>
      </div>
      <div>
        <div className="details-products">
          <div>
            <img
              src={`data:image/jpeg;base64,${
                dataDetail?.images?.length ? dataDetail?.images[0] : ""
              }`}
              alt="img products"
            />
          </div>
          <div>
            <span style={{fontSize:"20px",fontFamily:"Segoe UI", textAlign:"start"}}>{dataDetail?.name}</span>
            <div className="star">
              <div>
                {starImage.map((item, index) => (
                  <img src={item} alt="star" key={index} />
                ))}
              </div>
              <span>(22)</span>
            </div>
            <div className="price">
              <span style={{fontSize:"20px",fontFamily:"Segoe UI"}} >{dataDetail?.price} VND</span>
              <span style={{fontSize:"20px",fontFamily:"Segoe UI",color:"#ff2aaa"}}>{dataDetail?.ourPrice} VND</span>
            </div>
            <span style={{fontSize:"15px",fontFamily:"Segoe UI"}} className="description">{dataDetail?.description}</span>
            <div className="add-to-cart">
            <Button onClick={handleAddToCart} type="primary" style={{backgroundColor:"#19D16F", border:"none", borderRadius:"5px", marginRight:"5px"}}>Thêm vào giỏ hàng</Button>
              <div className="heart">
                <img src={heart} alt="heart" />
              </div>
            </div>
            <span style={{fontSize:"20px",fontFamily:"Segoe UI"}} className="category">
              Category: {dataDetail?.productType?.name}
            </span>
            <span style={{fontSize:"20px",fontFamily:"Segoe UI"}} className="tags">Tags</span>
            <span style={{fontSize:"20px",fontFamily:"Segoe UI"}} className="share">Share</span>
          </div>
        </div>
      </div>
      <div>
        <Comment params={params} />
      </div>
      <div style={{ marginTop: "12px" }}>
        <RelatedProducts />
      </div>
      <Footer/>
    </div>
  );
};

export default Detail;
