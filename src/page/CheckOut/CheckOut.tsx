import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Avatar, Button } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { emptyCart, removeCart, viewCart } from "../Layout/layout.reducer";
import { USER_INFO } from "../utils/contants";
import "./checkout.scss";

const CheckOut = () => {
  const [countItem, setCountItem] = useState<any>({});
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
  const itemProducts = useAppSelector(
    (state) => state.layoutReducer.itemProducts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (itemProducts?.cartItemList?.length) {
      itemProducts?.cartItemList.forEach((item: any, index: number) => {
        setCountItem((oldState: any) => ({ ...oldState, [index]: 0 }));
      });
    }
  }, [itemProducts]);
  const columns: ColumnsType<any> = [
    {
      title: "Products",
      dataIndex: "products",
      render(_, record) {
        return (
          <div className="products-item">
            <div>
              <Avatar
                shape="square"
                src={`data:image/jpeg;base64,${record.image}`}
                size={70}
              />
            </div>
            <div>
              <span>{record.product.name}</span>
              <span>Type: {record.product?.productType.name}</span>
              <span>Stock: {record.product?.stockQty}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      render(_, record) {
        return <span>{record.product.price}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (value, record, index) => {
        return (
          <div className="count-item">
            <div>
              <MinusCircleOutlined onClick={() => handleDecreaseCount(index)} />
            </div>
            <div>{countItem[index]}</div>
            <div>
              <PlusCircleOutlined onClick={() => handleIncreaseCount(index)} />
            </div>
          </div>
        );
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      render: (_, record, index) => record.product.price * countItem[index],
    },
    {
      title: "Hành động",
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
      dispatch(emptyCart({ customerId: userInfo.id }));
    }
  };
  const handleDecreaseCount = (index: number) => {
    if (countItem[index] === 0) {
      return;
    }
    countItem[index]--;
    setCountItem({ ...countItem, [index]: countItem[index] });
  };
  const handleIncreaseCount = (index: number) => {
    countItem[index]++;
    setCountItem({ ...countItem, [index]: countItem[index] });
  };
  return (
    <div className="checkout">
      <div>
        <div className="empty-cart">
          <Button danger onClick={handleDeleteAll}>
            Empty Cart
          </Button>
        </div>
        <div className="item-checkout">
          <Table columns={columns} dataSource={itemProducts?.cartItemList} />
        </div>
        <div className="checkout-price"></div>
      </div>
    </div>
  );
};

export default CheckOut;
