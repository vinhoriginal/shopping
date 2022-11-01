import React from "react";
import "./details.scss";
import imageTest from "../../assets/image-test.png";
import star from "../../assets/rate.png";
import heart from "../../assets/heart.png";
import Comment from "./Comment";
import RelatedProducts from "./RelatedProducts";

const Detail = () => {
  return (
    <div>
      <div className="details">
        <span>Products Details</span>
      </div>
      <div>
        <div className="details-products">
          <div>
            <img src={imageTest} alt="img products" />
          </div>
          <div>
            <span>Playwood arm chair</span>
            <div className="star">
              <div>
                <img src={star} alt="star" />
                <img src={star} alt="star" />
                <img src={star} alt="star" />
                <img src={star} alt="star" />
                <img src={star} alt="star" />
              </div>
              <span>(22)</span>
            </div>
            <div className="price">
              <span>$ 32.00</span>
              <span>$ 40.00</span>
            </div>
            <span className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              tellus porttitor purus, et volutpat sit.
            </span>
            <div className="add-to-cart">
              <span>Add To Cart</span>
              <div className="heart">
                <img src={heart} alt="heart" />
              </div>
            </div>
            <span className="category">Category</span>
            <span className="tags">Tags</span>
            <span className="share">Share</span>
          </div>
        </div>
      </div>
      <div>
        <Comment />
      </div>
      <div style={{ marginTop: "12px" }}>
        <RelatedProducts />
      </div>
    </div>
  );
};

export default Detail;
