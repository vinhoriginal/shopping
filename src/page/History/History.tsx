import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";

const History = () => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const columns: ColumnsType<any> = [
    {
      title: <span className="cart-title">STT</span>,
      dataIndex: "stt",
      align: "center",
      render(value, record, index) {
        return (page - 1) * size + index + 1;
      },
    },
    {
      title: <span className="cart-title">Phương thức thanh toán</span>,
      dataIndex: "",
      align: "center",
    },
    {
      title: <span className="cart-title">Phương thức vận chuyển</span>,
      dataIndex: "",
      align: "center",
    },
    {
      title: <span className="cart-title">Trạng thái</span>,
      dataIndex: "",
      align: "center",
    },
    {
      title: <span className="cart-title">Ngày đặt hàng</span>,
      dataIndex: "",
      align: "center",
    },
    {
      title: <span className="cart-title">Tổng tiền</span>,
      dataIndex: "",
      align: "center",
    },
    {
      title: <span className="cart-title">Hành động</span>,
      dataIndex: "",
      align: "center",
      render: () => {
        return (
          <div>
            <EyeOutlined />
            <DeleteOutlined />
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={[]} />
    </div>
  );
};

export default History;
