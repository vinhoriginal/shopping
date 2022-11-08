import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Checkbox } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { emptyCart, removeCart, viewCart } from "../Layout/layout.reducer";
import { USER_INFO } from "../utils/contants";
import "./checkout.scss";

const CheckOut = () => {
  const [countItem, setCountItem] = useState<any>({});
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
  const [totalPrice, setTotalPrice] = useState<any>({});
  const itemProducts = useAppSelector(
    (state) => state.layoutReducer.itemProducts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (itemProducts?.cartItemList?.length) {
      itemProducts?.cartItemList.forEach((item: any, index: number) => {
        setTotalPrice((totalPrice: any) => ({
          ...totalPrice,
          [index]: item?.product?.price * item?.quantity,
        }));
        setCountItem((oldState: any) => ({
          ...oldState,
          [index]: item?.quantity,
        }));
      });
    }
  }, [itemProducts]);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title">Products</span>,
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
              <span>{record?.product?.name}</span>
              <span>Type: {record.product?.productType?.name}</span>
              <span>Stock: {record.product?.stockQty}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: <span className="cart-title">Price</span>,
      dataIndex: "price",
      render(_, record) {
        return <span>{record?.product?.price}</span>;
      },
    },
    {
      title: <span className="cart-title">Quantity</span>,
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
      title: <span className="cart-title">Total</span>,
      dataIndex: "total",
      render: (_, record, index) => {
        return record?.product?.price * countItem[index] || 0;
      },
    },
    {
      title: <span className="cart-title">Hành động</span>,
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
        customerId: userInfo.id,
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
      dispatch(emptyCart({ customerId: userInfo.id })).then((res) => {
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
    setTotalPrice({
      ...totalPrice,
      [index]: record?.product?.price * countItem[index],
    });
  };
  const handleIncreaseCount = (index: number, record: any) => {
    countItem[index]++;
    setCountItem({ ...countItem, [index]: countItem[index] });
    setTotalPrice({
      ...totalPrice,
      [index]: record?.product?.price * countItem[index],
    });
  };
  const calculatedTotalPrice = () => {
    if (Object.keys(totalPrice).length) {
      console.log("value", Object.values(totalPrice));
      // Object.values(totalPrice).reduce((total: any, currentValue: any) => {
      //   console.log("total", total);
      //   console.log("currentValue", currentValue);
      // });
    }
  };
  calculatedTotalPrice();
  // const memoCalculate = useMemo(() => calculatedTotalPrice(), [countItem]);
  return (
    <div className="checkout">
      <div className="empty-cart">
        <Button danger onClick={handleDeleteAll}>
          Empty Cart
        </Button>
      </div>
      <div>
        <div className="item-checkout">
          <Table columns={columns} dataSource={itemProducts?.cartItemList} />
        </div>
        <div className="checkout-price">
          <div className="cart-total">
            <span className="title">Cart Totals</span>
            <div>
              <div className="sub-totals">
                <span>Subtotals:</span>
                <span>$</span>
              </div>
              <div className="tax-rate">
                <span>Tax Rate (%):</span>
                <span>{itemProducts?.taxRate}%</span>
              </div>
              <div className="total">
                <span>Total:</span>
                <span>$200.00</span>
              </div>
              <Checkbox className="shipping-checkbox">
                <span className="shipping">
                  Shipping & taxes calculated at checkout
                </span>
              </Checkbox>
              <div className="custom-btn-checkout">
                <Button>
                  <span>Proceed To Checkout</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
