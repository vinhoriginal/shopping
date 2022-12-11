import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tag, Tooltip } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { IFormUserInfo } from "../../model/userInfo.model";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CANCEL_ORDER, CANCEL_ORDER_CONFIRM, TOKEN_KEY, USER_INFO } from "../utils/contants";
import { getListHistoryOrder } from "./history.reducer";
import ReasonModal from "./ReasonModal";
import "./history.scss";
import { useNavigate } from "react-router-dom";
import path from "../../router/path";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const navigate = useNavigate();
  const { dataHistoryOrder } = useAppSelector((state) => state.historyReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      navigate(path.login);
      return;
    }
    dispatch(getListHistoryOrder(userInfo?.customerId));
  }, [userInfo?.customerId, dispatch, navigate]);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title">STT</span>,
      dataIndex: "stt",
      align: "center",
      render(value, record, index) {
        return (
          <span className="cart-title2" >
            {index + 1}
          </span>
        );
      },
    },
    {
      title: <span className="cart-title">Phương thức thanh toán</span>,
      dataIndex: "payment",
      align: "center",
      render: (value) => (
        <span className="cart-title2" >
          {value?.paymentMethod}
        </span>
      ),
    },
    {
      title: <span className="cart-title">Phương thức vận chuyển</span>,
      dataIndex: "shipment",
      align: "center",
      render: (value) => (
        <span className="cart-title2" >
          {value?.shippingMethod}
        </span>
      ),
    },
    {
      title: <span className="cart-title">Trạng thái</span>,
      dataIndex: "status",
      align: "center",
      render: (value) => {
        if (value === 0) {
          return (
            <Button
              type="primary"
              style={{color:"#fff", borderRadius:"5px"}}
              danger
            >
              Đợi duyệt
            </Button>
          );
        }
        if (value === 1) {
          return (
            <Button
            type="primary"
              style={{color:"#fff", borderRadius:"5px"}}

            >
              Chấp nhận
            </Button>
          );
        }
        if (value === 2) {
          return (
            <Tag
              color="red"
              className="cart-title2"
            >
              Đã hủy
            </Tag>
          );
        }
      },
    },
    {
      title: <span className="cart-title">Ngày đặt hàng</span>,
      dataIndex: "orderDate",
      align: "center",
      render: (value) =>
        value && (
          <span className="cart-title2">
            {moment(value).format("YYYY-MM-DD")}
          </span>
        ),
    },
    {
      title: <span className="cart-title">Tổng tiền</span>,
      dataIndex: "",
      align: "center",
      render(_, record) {
        return (
          <span className="cart-title" style={{ fontSize: "16px" }}>
            {record?.grandTotal + record?.shippingTotal}
          </span>
        );
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
            <Tooltip
              title={
                <span className="cart-title3">{CANCEL_ORDER}</span>
              }
            >
              <Popconfirm
                title={
                  <span className="cart-title2">
                    {CANCEL_ORDER_CONFIRM}
                  </span>
                }
                onConfirm={() => {
                  setOrderId(record?.orderId);
                  setIsOpen(true);
                }}
                okText={<span className="cart-title3">Đồng ý</span>}
                cancelText={<span className="cart-title3">Hủy</span>}
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
      <Table
        columns={columns}
        dataSource={dataHistoryOrder}
        pagination={false}
      />
      <ReasonModal isOpen={isOpen} setIsOpen={setIsOpen} orderId={orderId} />
    </div>
  );
};

export default History;
