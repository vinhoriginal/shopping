import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Tag, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IFormUserInfo } from "../../model/userInfo.model";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { USER_INFO } from "../utils/contants";
import { getListHistoryOrder } from "./history.reducer";
import ReasonModal from "./ReasonModal";
import './history.scss'

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const { dataHistoryOrder } = useAppSelector((state) => state.historyReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getListHistoryOrder(userInfo?.customerId));
  }, [userInfo?.customerId, dispatch]);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title">STT</span>,
      dataIndex: "stt",
      align: "center",
      render(value, record, index) {
        return <span className="cart-title" style={{fontSize: '16px'}}>{index + 1}</span>
      },
    },
    {
      title: <span className="cart-title">Phương thức thanh toán</span>,
      dataIndex: "payment",
      align: "center",
      render: (value) => <span className="cart-title" style={{fontSize: '16px'}}>{value?.paymentMethod}</span>,
    },
    {
      title: <span className="cart-title">Phương thức vận chuyển</span>,
      dataIndex: "shipment",
      align: "center",
      render: (value) => <span className="cart-title" style={{fontSize: '16px'}}>{value?.shippingMethod}</span>,
    },
    {
      title: <span className="cart-title">Trạng thái</span>,
      dataIndex: "status",
      align: "center",
      render: (value) => {
        if (value === 0) {
          return <Tag color="orange" className="cart-title2" style={{fontSize: '12px'}}>Đợi duyệt</Tag>;
        }
        if (value === 1) {
          return <Tag color="green" className="cart-title2" style={{fontSize: '12px'}}>Chấp nhận</Tag>;
        }
        if (value === 2) {
          return <Tag color="red" className="cart-title2" style={{fontSize: '12px'}}>Đã hủy</Tag>;
        }
      },
    },
    {
      title: <span className="cart-title">Ngày đặt hàng</span>,
      dataIndex: "orderDate",
      align: "center",
      render: (value) => value && <span className="cart-title" style={{fontSize: '16px'}}>{moment(value).format("YYYY-MM-DD")}</span>,
    },
    {
      title: <span className="cart-title">Tổng tiền</span>,
      dataIndex: "",
      align: "center",
      render(_, record) {
        return <span className="cart-title" style={{fontSize: '16px'}}>{record?.grandTotal + record?.shippingTotal}</span>;
      },
    },
    {
      title: <span className="cart-title">Hành động</span>,
      dataIndex: "",
      align: "center",
      render: (_, record) => {
        return (
          <div>
            <EyeOutlined
              style={{
                cursor: "pointer",
                marginRight: "12px",
                color: "#2db7f5",
              }}
            />
            <Tooltip title={<span className="cart-title2">Xóa sản phẩm yêu thích</span>}>
              <Popconfirm
                title={<span className="cart-title2">Bạn có chắc muốn hủy đơn hàng?</span>}
                onConfirm={() => {
                  setOrderId(record?.orderId);
                  setIsOpen(true);
                }}
                okText={<span className="cart-title2">Đồng ý</span>}
                cancelText={<span className="cart-title2">Hủy</span>}
              >
                <DeleteOutlined style={{ cursor: "pointer", color: "#f50" }} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={dataHistoryOrder} pagination={false} />
      <ReasonModal isOpen={isOpen} setIsOpen={setIsOpen} orderId={orderId} />
    </div>
  );
};

export default History;
