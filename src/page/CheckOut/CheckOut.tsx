import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import { Avatar, Button, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { emptyCart, removeCart, viewCart } from "../Layout/layout.reducer";
import { FONT_FAMILY, FONT_SIZE, PRODUCT_BRAND, PRODUCT_BRANDS, PRODUCT_CATEGORY, USER_INFO } from "../utils/contants";
import { updateCart } from "./checkout.reducer";
import "./checkout.scss";

const CheckOut = () => {
  const [countItem, setCountItem] = useState<any>({});
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const [isChecked, setIsChecked] = useState(false);
  const itemProducts = useAppSelector(
    (state) => state.layoutReducer.itemProducts
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (itemProducts?.cartItemList?.length) {
      itemProducts?.cartItemList.forEach((item: any, index: number) => {
        setCountItem((oldState: any) => ({
          ...oldState,
          [index]: item?.quantity,
        }));
      });
    }
  }, [itemProducts]);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title" style={{
        color: "#1d3178", fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "22px"
      }}>Sản phẩm</span>,
      dataIndex: "products",
      render(_, record) {
        return (
          <div className="products-item">
            <div>
              <Avatar
                shape="square"
                src={`data:image/jpeg;base64,${record?.product?.images[0]}`}
                size={70}
              />
            </div>
            <div>
              <span style={{ fontFamily: FONT_FAMILY, fontSize: FONT_SIZE, lineHeight: "20px" }} >{record?.product?.name}</span>
              <span>{PRODUCT_CATEGORY}: {record.product?.productType?.name}</span>
              <span >Số lượng: {record.product?.stockQty}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: <span className="cart-title" style={{
        color: "#1d3178", fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "22px"
      }}>Giá tiền</span>,
      dataIndex: "price",
      render(_, record) {
        return <span>{record?.product?.price}</span>;
      },
    },
    {
      title: <span className="cart-title" style={{
        color: "#1d3178", fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "22px"
      }}>Số lượng</span>,
      dataIndex: "quantity",
      render: (value, record, index) => {
        return (
          <div className="count-item">
            <div>
              <MinusCircleOutlined
                onClick={() => handleDecreaseCount(index, record)}
              />
            </div>
            <div>{countItem[index]}</div>
            <div>
              <PlusCircleOutlined
                onClick={() => handleIncreaseCount(index, record)}
              />
            </div>
          </div>
        );
      },
    },
    {
      title: <span className="cart-title" style={{
        color: "#1d3178", fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "22px"
      }}>Tổng tiền</span>,
      dataIndex: "total",
      render: (_, record, index) => {
        return record?.product?.price * countItem[index] || 0;
      },
    },
    {
      title: <span className="cart-title" style={{
        color: "#1d3178", fontFamily: "Lato",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "18px",
        lineHeight: "22px"
      }}>Hành động</span>,
      dataIndex: "action",
      render: (_, record) => (
        <div>
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => handleDeleteItem(record)}
          />
        </div>
      ),
    },
  ];
  const handleDeleteItem = (record: any) => {
    dispatch(
      removeCart({
        productId: record.product.id,
        customerId: userInfo.customerId,
        quantity: record.product.make.id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Xóa sản phẩm thành công");
        dispatch(viewCart());
      }
    });
  };
  const handleDeleteAll = () => {
    if (itemProducts?.cartItemList?.length) {
      dispatch(emptyCart({ customerId: userInfo?.customerId })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(viewCart());
        }
      });
    }
  };
  const handleDecreaseCount = (index: number, record: any) => {
    if (countItem[index] === 0) {
      return;
    }
    countItem[index]--;
    setCountItem({ ...countItem, [index]: countItem[index] });
    dispatch(
      updateCart({
        productId: record?.product?.id,
        quantity: countItem[index],
        customerId: userInfo.customerId,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(viewCart());
      }
    });
  };
  const handleIncreaseCount = (index: number, record: any) => {
    countItem[index]++;
    setCountItem({ ...countItem, [index]: countItem[index] });
    dispatch(
      updateCart({
        productId: record?.product?.id,
        quantity: countItem[index],
        customerId: userInfo.customerId,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(viewCart());
      }
    });
  };
  const handleChangeCheckbox = (e: CheckboxChangeEvent) => {
    setIsChecked(e.target.checked);
  };
  return (
    <>
      <div>
      <div className="checkout">
        <div className="empty-cart">
          <Button type="primary" danger onClick={handleDeleteAll}>
            Xóa giỏ hàng
          </Button>
        </div>
        <div>
          <div className="item-checkout">
            <Table
              columns={columns}
              dataSource={itemProducts?.cartItemList}
              pagination={false}
            />
          </div>
          <div className="checkout-price">
            <div className="cart-total">
              <span className="title" style={{
                color: "#1d3178", fontFamily: "Lato",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "18px",
                lineHeight: "22px"
              }}>Giá trị đơn hàng</span>
              <div>
                <div className="sub-totals">
                  <span>Giá trị chưa thuế:</span>
                  <span>{itemProducts?.subTotal} VND</span>
                </div>
                <div className="tax-rate">
                  <span>Thuế gia tăng (%):</span>
                  <span>{itemProducts?.taxRate}%</span>
                </div>
                <div className="total">
                  <span>Tổng tiền:</span>
                  <span>{itemProducts?.grandTotal} VND</span>
                </div>
                <Checkbox
                  className="shipping-checkbox"
                  onChange={handleChangeCheckbox}
                  checked={isChecked}
                >
                  <span className="shipping">
                    Shipping & taxes calculated at checkout
                  </span>
                </Checkbox>
                <div className="custom-btn-checkout">
                  <Button onClick={() => navigate(path.billingAddress)} disabled={!itemProducts?.cartItemList?.length}>
                    <span>Đặt hàng</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="empty-cart">

          <Button type="primary" style={{ backgroundColor: "#FB2E86", borderRadius:"5px", border:"none" }} onClick={handleDeleteAll}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
