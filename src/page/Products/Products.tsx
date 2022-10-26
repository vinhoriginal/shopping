import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React from "react";
import image1 from "../../assets/item.png";
import cart from "../../assets/cart.png";
import heart from "../../assets/heart.png";
import {
  CATAGORIES,
  DISCOUNT_OFFER,
  PRICE_FILTER,
  PRODUCT_BRAND,
  RATING_ITEM,
} from "../utils/contants";
import "./products.scss";
const Products = () => {
  const handleChangeProductBrand = (checkedValues: CheckboxValueType[]) => {
    console.log("checkedValues", checkedValues);
  };
  return (
    <div>
      <div className="products-title">
        <span>Products</span>
      </div>
      <div className="container-products">
        <div>
          <div className="product-brand title">
            <span>Products Brand</span>
            <div className="item-filter">
              <Checkbox.Group onChange={handleChangeProductBrand}>
                {PRODUCT_BRAND.map((item) => (
                  <div key={item.value}>
                    <Checkbox value={item.value} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="discount-offer title">
            <span>Discount Offer</span>
            <Checkbox.Group>
              {DISCOUNT_OFFER.map((item) => (
                <div key={item.value}>
                  <Checkbox value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="rating-item title">
            <span>Rating Item</span>
            <Checkbox.Group>
              {RATING_ITEM.map((item) => (
                <div key={item.total}>
                  <Checkbox value={item.total} />
                  {item.image.map((img,index) => (
                    <img src={img} alt="star" key={index} />
                  ))}
                  <span>{`(${item.total})`}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="catagories title">
            <span>Categories</span>
            <Checkbox.Group>
              {CATAGORIES.map((item) => (
                <div key={item.value}>
                  <Checkbox value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="price-filter title">
            <span>Price Filter</span>
            <Checkbox.Group>
              {PRICE_FILTER.map((item) => (
                <div key={item.value}>
                  <Checkbox value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
        </div>
        <div className="item-info">
          <div>
            <div>
              <img src={image1} alt="item" />
            </div>
            <div className="info">
              <span>Dictum morbi</span>
              <div className="price">
                <span>$26.00</span>
                <span>$26.00</span>
              </div>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing in phasellus non in justo.
              </span>
              <div className="image-products">
                <div>
                  <img src={cart} alt="cart" />
                </div>
                <div>
                  <img src={heart} alt="heart" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
