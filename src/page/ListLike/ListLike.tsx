import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Key, TableRowSelection } from "antd/lib/table/interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../component/Footer/Footer";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { USER_INFO } from "../utils/contants";
import { cancelLike, getDataListLike } from "./listlike.reducer";

const ListLike = () => {
  const [rowKeySelected, setRowKeySelected] = useState<Key[]>([]);
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const dispatch = useAppDispatch();
  const { dataListLike } = useAppSelector((state) => state.listLikeReducer);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.customerId) {
      navigate(path.login);
      return;
    }
    dispatch(getDataListLike(userInfo?.customerId));
  }, [dispatch, userInfo?.customerId]);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title">Sản phẩm</span>,
      dataIndex: "",
      render: (_, record) => (
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: "80px",
              height: "auto",
              marginRight: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "4px",
            }}
          >
            <img
              src={`data:image/jpeg;base64,${record?.images[0]}`}
              style={{ width: "100%", height: "100%" }}
              alt="asd"
            />
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", width: "50%" }}
          >
            <span className="cart-title">
              {record?.name}
            </span>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "8px 0",
              }}
            >
              <span className="cart-title">
                {record?.productType?.name}
              </span>
              <span className="cart-title">
                {record?.price}
              </span>
            </div>
            <span className="cart-title">
              {record?.stockQty}
            </span>
          </div>
        </div>
      ),
    },
    {
      title: <span className="cart-title">Giá sản phẩm</span>,
      dataIndex: "price",
      render: (value) => (
        <span className="cart-title">
          {value}
        </span>
      ),
    },
    {
      title: <span className="cart-title">Chất lượng</span>,
      dataIndex: "star",
      render: (value) => {
        const arrStar = Array.from({ length: value }, () =>
          require("../../assets/rate.png")
        );
        const arrNonStar = Array.from({ length: 5 - value }, () =>
          require("../../assets/rate-none.png")
        );
        return (
          <div>
            {arrStar.concat(arrNonStar).map((item, index) => (
              <img
                key={index}
                src={item}
                alt="star"
                style={{ marginRight: "4px" }}
              />
            ))}
          </div>
        );
      },
    },
  ];
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys: rowKeySelected,
    onChange(selectedRowKeys) {
      setRowKeySelected(selectedRowKeys);
    },
  };
  const handleCancelLike = () => {
    dispatch(
      cancelLike({
        customerId: userInfo.customerId,
        productIds: rowKeySelected,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Xóa sản phẩm yêu thích thành công");
        dispatch(getDataListLike(userInfo.customerId));
      }
    });
  };
  return (
    <div>
      <div style={{ textAlign: "end" }}>
        <Button
          style={{ width: "100px", background: "#fb2e86", color: "white" ,borderRadius:"5px"}}
          type="link"
          onClick={handleCancelLike}
        >
          Hủy
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataListLike}
        rowSelection={rowSelection}
        rowKey="id"
        pagination={false}
      />
      <Footer/>
    </div>
  );
};

export default ListLike;
