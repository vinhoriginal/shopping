import { Button, Checkbox, Input } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../assets/cart.png";
import heart from "../../assets/heart.png";
import { IFormBodyProducts } from "../../model/products.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getBrand,
  getCategory,
  searchDataProducts,
} from "../Home/home.reducer";
import { addToCard, viewCart } from "../Layout/layout.reducer";
import {
  DISCOUNT_OFFER,
  PRICE_FILTER,
  PRODUCTS,
  PRODUCT_BRANDS,
  PRODUCT_CATEGORY,
  PRODUCT_DISCOUNT,
  PRODUCT_PRICE_FILTER,
  PRODUCT_STAR,
  RATING_ITEM,
  TOKEN_KEY,
  USER_INFO,
} from "../utils/contants";
import PaginationPage from "../utils/Pagination";
import "./products.scss";
const Products = () => {
  const [valueSearch, setValueSearch] = useState<IFormBodyProducts>({
    enums: "PRODUCT_MULTI_SEARCH",
    name: "",
    brandId: [],
    categoryId: [],
    star: [],
    fromPrice: "",
    toPrice: "",
  });
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataBrand, dataCategory, dataSearchProducts, total } = useAppSelector(
    (state) => state.homeReducer
  );
  const handleChangeProductBrand = (checkedValues: CheckboxValueType[]) => {
    setValueSearch((oldState) => ({ ...oldState, brandId: checkedValues }));
    setPage(1);
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
    Promise.all([dispatch(getBrand()), dispatch(getCategory())]);
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      searchDataProducts({ valueSearch, total: { page: page - 1, pageSize } })
    );
  }, [valueSearch, page, pageSize, dispatch]);
  const handleChangeRating = (checkedValues: CheckboxValueType[]) => {
    setValueSearch((oldState) => ({ ...oldState, star: checkedValues }));
    setPage(1);
  };
  const handleChangeCategory = (checkedValues: CheckboxValueType[]) => {
    setValueSearch((oldState) => ({ ...oldState, categoryId: checkedValues }));
    setPage(1);
  };
  const handleChangePrice = (checkedValues: CheckboxValueType[]) => {
    console.log("checkedValues", checkedValues);
  };
  return (
    <div>
      <div className="products-title">
        <span style={{ color: "#151875", fontFamily: "Segoe UI" }}>
          {PRODUCTS}
        </span>
      </div>
      <div className="container-products">
        <div>
          <div className="product-brand title">
            <span>{PRODUCT_BRANDS}</span>
            <div className="item-filter">
              <Checkbox.Group onChange={handleChangeProductBrand}>
                {dataBrand.map((item) => (
                  <div key={item.id}>
                    <Checkbox value={item.id} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="discount-offer title">
            <span>{PRODUCT_DISCOUNT}</span>
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
            <span>{PRODUCT_STAR}</span>
            <Checkbox.Group onChange={handleChangeRating}>
              {RATING_ITEM.map((item) => (
                <div key={item.total}>
                  <Checkbox value={item.rate} />
                  {item.image.map((img, index) => (
                    <img src={img} alt="star" key={index} />
                  ))}
                  <span style={{fontSize:"18px"}}>{`(${item.total})`}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="catagories title">
            <span>{PRODUCT_CATEGORY}</span>
            <Checkbox.Group onChange={handleChangeCategory}>
              {dataCategory.map((item) => (
                <div key={item.id}>
                  <Checkbox value={item.id} />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div className="price-filter title">
            <span>{PRODUCT_PRICE_FILTER}</span>
            <Checkbox.Group onChange={handleChangePrice}>
              {PRICE_FILTER.map((item) => (
                <div key={item.value}>
                  <Checkbox value={`${item.from} - ${item.to}`} name="price" />
                  <span>{item.name}</span>
                </div>
              ))}
            </Checkbox.Group>
          </div>
          <div>
            <Input
              placeholder="Tên sản phẩm"
              value={valueSearch.name}
              onChange={(e) =>
                setValueSearch({ ...valueSearch, name: e.target.value })
              }
            />
          </div>
        </div>
        <div className="item-info">
          {dataSearchProducts.map((item) => (
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
                  {item?.ourPrice ? <span>${item?.ourPrice}</span> : null}
                </div>
                <span>{item?.description}</span>
                <div className="image-products">
                  <div className="item_hover">
                    <img
                      src={cart}
                      alt="cart"
                      onClick={() => handleAddToCart(item)}
                    />
                  </div>
                  <div className="item_hover">
                    <img src={heart} alt="heart" />
                  </div>
                  <Button className="item_hover" onClick={() => navigate(`/detail/${item.id}`)} type="primary" style={{backgroundColor:"#19D16F", border:"none", borderRadius:"5px"}}>Xem chi tiết</Button>
                </div>
              </div>
            </div>
          ))}
          <PaginationPage
            page={page}
            pageSize={pageSize}
            total={total}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
