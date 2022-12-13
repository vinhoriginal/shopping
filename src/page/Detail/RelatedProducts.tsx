import { Col, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormDetailProducts } from "../../model/detail.model";
import { useAppSelector } from "../../store/hooks";
import { COLOR_SPAN, COLOR_TITLE, FONT_FAMILY, FONT_SIZE_DES, FONT_SIZE_NAME, FONT_SIZE_TITLE } from "../utils/contants";

const RelatedProducts = () => {
  const [relateData, setRelateData] = useState<IFormDetailProducts[]>([]);
  const { dataRelated } = useAppSelector((state) => state.detailReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (dataRelated?.length) {
      const newArr = dataRelated.map((item: any) => {
        const newArrStar = Array.from({ length: item.star }, () =>
          require("../../assets/rate.png")
        );
        const arrRateNone = Array.from({ length: 5 - item.star }, () =>
          require("../../assets/rate-none.png")
        );
        return { ...item, arrStar: newArrStar.concat(arrRateNone) };
      });
      setRelateData(newArr);
    }
  }, [dataRelated]);
  return (
    <div className="related-products">
      <div className="details">
        <span style={{fontSize:FONT_SIZE_TITLE, fontFamily:FONT_FAMILY,color:COLOR_TITLE}}>Sản phẩm liên quan</span>
      </div>
      <div>
        <Row
        gutter={20}
          style={{ justifyContent: "flex-start", alignItems: "center" }}
        >
          {relateData?.map((item) => (
            <Col span={6} key={item.id}>
              <div  className="item-related">
                <div
                  className="image-related"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/detail/${item.id}`)}
                >
                  <img
                    src={`data:image/jpeg;base64,${item?.images[0]}`}
                    alt="related"
                  />
                </div>
                <div className="title">
                  <div>
                    <span style={{lineHeight:"20px", fontSize:FONT_SIZE_DES, color:COLOR_SPAN, fontFamily:FONT_FAMILY}}>{item?.name}</span>
                    <div>
                      {item?.arrStar?.map((item, index) => (
                        <img src={item} alt="star" key={index} />
                      ))}
                    </div>
                  </div>
                  <span style={{lineHeight:"20px", color:COLOR_SPAN, fontSize:FONT_SIZE_DES, fontFamily:FONT_FAMILY}}>{item?.price} VND</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default RelatedProducts;
