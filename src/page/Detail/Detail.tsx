import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import heart from "../../assets/heart.png";
import nonStar from "../../assets/rate-none.png";
import star from "../../assets/rate.png";
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
  const handleAddToCart = (item: any) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
    } else {
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
      dispatch(
        addToCard({
          productId: dataDetail?.id,
          customerId: userInfo.customerId,
          quantity: dataDetail?.make?.id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(viewCart());
        }
      });
    }
  };
  return (
    <div>
      <div className="details">
        <span>Products Details</span>
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
            <span>{dataDetail?.name}</span>
            <div className="star">
              <div>
                {starImage.map((item, index) => (
                  <img src={item} alt="star" key={index} />
                ))}
              </div>
              <span>(22)</span>
            </div>
            <div className="price">
              <span>${dataDetail?.price}</span>
              <span></span>
            </div>
            <span className="description">{dataDetail?.description}</span>
            <div className="add-to-cart">
              <span onClick={handleAddToCart}>Add To Cart</span>
              <div className="heart">
                <img src={heart} alt="heart" />
              </div>
            </div>
            <span className="category">
              Category: {dataDetail?.productType?.name}
            </span>
            <span className="tags">Tags</span>
            <span className="share">Share</span>
          </div>
        </div>
      </div>
      <div>
        <Comment params={params} />
      </div>
      <div style={{ marginTop: "12px" }}>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default Detail;
