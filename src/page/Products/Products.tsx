import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png";
import heart from "../../assets/heart.png";
import { useAppDispatch } from "../../store/hooks";
import { searchDataProducts } from "../Home/home.reducer";
import {
  CATAGORIES,
  DISCOUNT_OFFER,
  FAKE_PRODUCTS_ITEM,
  PRICE_FILTER,
  PRODUCT_BRAND,
  RATING_ITEM,
} from "../utils/contants";
import "./products.scss";
const Products = () => {
  const [dataSearchProducts] = useState({
    brandId: [],
    categoryId: [],
    star: [],
    fromPrice: "",
    toPrice: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChangeProductBrand = (checkedValues: CheckboxValueType[]) => {
    console.log("checkedValues", checkedValues);
  };
  const handleAddToCart = (item: any) => {};
  useEffect(() => {
    dispatch(
      searchDataProducts({
        ...dataSearchProducts,
        enums: "PRODUCT_MULTI_SEARCH",
        name: "",
      })
    );
  }, []);
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
                  {item.image.map((img, index) => (
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
          {FAKE_PRODUCTS_ITEM.map((item) => (
            <div key={item.id}>
              <div>
                <img
                  src={item?.image}
                  alt="item"
                  onClick={() => navigate(`/detail/3`)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="info">
                <span>{item?.name}</span>
                <div className="price">
                  <span>${item.price}</span>
                  {item?.oldPrice ? <span>${item?.oldPrice}</span> : null}
                </div>
                <span>{item?.description}</span>
                <div className="image-products">
                  <div>
                    <img
                      src={cart}
                      alt="cart"
                      onClick={() => handleAddToCart(item)}
                    />
                  </div>
                  <div>
                    <img src={heart} alt="heart" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
