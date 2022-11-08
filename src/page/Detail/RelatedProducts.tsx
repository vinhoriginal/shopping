import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormDetailProducts } from "../../model/detail.model";
import { useAppSelector } from "../../store/hooks";

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
        <span>Related Products</span>
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
                    <span>{item?.name}</span>
                    <div>
                      {item?.arrStar?.map((item, index) => (
                        <img src={item} alt="star" key={index} />
                      ))}
                    </div>
                  </div>
                  <span>${item?.price}</span>
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
