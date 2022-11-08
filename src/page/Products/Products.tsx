import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png";
import heart from "../../assets/heart.png";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getBrand,
  getCategory,
  searchDataProducts,
} from "../Home/home.reducer";
import { addToCard, viewCart } from "../Layout/layout.reducer";
import {
  CATAGORIES,
  DISCOUNT_OFFER,
  PRICE_FILTER,
  PRODUCT_BRAND,
  RATING_ITEM,
  TOKEN_KEY,
  USER_INFO,
} from "../utils/contants";
import "./products.scss";
const Products = () => {
  const [dataSearchProducts, setDataSearchProducts] = useState({
    brandId: [],
    categoryId: [],
    star: [],
    fromPrice: "",
    toPrice: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchProducts = useAppSelector(
    (state) => state.homeReducer.dataSearchProducts
  );
  const handleChangeProductBrand = (checkedValues: CheckboxValueType[]) => {
    console.log("checkedValues", checkedValues);
  };
  const handleAddToCart = (item: any) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
    } else {
      const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
      dispatch(
        addToCard({
          productId: item?.id,
          customerId: userInfo.customerId,
          quantity: item?.make?.id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(viewCart());
        }
      });
    }
  };
  useEffect(() => {
    Promise.all([
      dispatch(
        searchDataProducts({
          enums: "PRODUCT_MULTI_SEARCH",
          name: "",
          brandId: [],
          categoryId: [],
          star: [],
          fromPrice: "",
          toPrice: "",
        })
      ),
      dispatch(getBrand()),
      dispatch(getCategory()),
    ]);
  }, [dispatch]);
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
          {searchProducts.map((item) => (
            <div key={item.id}>
              <div>
                <img
                  src={`data:image/jpeg;base64,${item?.images[0]}`}
                  alt="item"
                  onClick={() => navigate(`/detail/${item.id}`)}
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
