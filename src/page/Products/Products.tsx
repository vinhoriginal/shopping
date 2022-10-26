import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import React, { useState } from "react";
import {
  CATAGORIES,
  DISCOUNT_OFFER,
  PRICE_FILTER,
  PRODUCT_BRAND,
  RATING_ITEM,
} from "../utils/contants";
import "./products.scss";
const Products = () => {
  const [productBrand, setProductBrand] = useState(PRODUCT_BRAND);
  const handleChangeProductBrand = (checkedValues: CheckboxValueType[]) => {
    console.log("checkedValues", checkedValues);
  };
  return (
    <div>
      <div>
        <span>Products</span>
      </div>
      <div className="container-products">
        <div>
          <div className="product-brand title">
            <span>Products Brand</span>
            <div className="item-filter">
              <Checkbox.Group onChange={handleChangeProductBrand}>
                {productBrand.map((item) => (
                  <div>
                    <Checkbox key={item.value} value={item.value} />
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
                <div>
                  <Checkbox key={item.value} value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="rating-item title">
            <span>Rating Item</span>
            <Checkbox.Group>
              {RATING_ITEM.map((item) => (
                <div>
                  <Checkbox key={item.total} value={item.total} />
                  {item.image.map((img) => (
                    <img src={img} />
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
                <div>
                  <Checkbox key={item.value} value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="price-filter title">
            <span>Price Filter</span>
            <Checkbox.Group>
              {PRICE_FILTER.map((item) => (
                <div>
                  <Checkbox key={item.value} value={item.value} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
