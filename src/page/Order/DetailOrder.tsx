import { Col, Row } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import React from "react";
import "./order.scss";

const DetailOrder = () => {
  const columns: ColumnsType<any> = [
    {
      title: <span className="title-table">Tên sản phẩm</span>,
      dataIndex: "",
    },
    {
      title: <span className="title-table">Danh mục</span>,
      dataIndex: "",
    },
    {
      title: <span className="title-table">Số lượng</span>,
      dataIndex: "",
    },
    {
      title: <span className="title-table">Giá</span>,
      dataIndex: "",
    },
    {
      title: <span className="title-table">Thành tiền</span>,
      dataIndex: "",
    },
  ];
  return (
    <div
      style={{ background: "#F8F8FD", borderRadius: "3px", padding: "30px" }}
    >
      <div>
        <p>Chi tiết đơn hàng</p>
        <div className="payment-method title-order">
          <div>
            <span>Phương thức thanh toán</span>
          </div>
          <div>
            <div>
              <span>OrderId: 1#</span>
              <span>Phương thức thanh toán: Thanh toán khi nhận hàng</span>
            </div>
            <div>
              <span>Ngày đặt hàng: 10/09/2022 10:23:12</span>
              <span>Phương thức giao hàng: Giao hàng nhanh</span>
            </div>
          </div>
        </div>
        <div className="delivery-address title-order">
          <div>
            <span>Địa chỉ giao hàng</span>
          </div>
          <div>
            <p>Tỉnh/Thành phố: Hà Nội</p>
            <p>Quận/Huyện: Thanh Xuân</p>
            <p>Xã phường/Thị trấn: Kim Giang</p>
            <p>Số nhà: số nhà ABC đường CDE</p>
          </div>
        </div>
        <div className="list-order">
          <div>
            <Table columns={columns} dataSource={[]} />
          </div>
          <div>
            <div>
              <span>TỔNG TIỀN</span>
              <span>20000</span>
            </div>
            <div>
              <span>PHÍ SHIP</span>
              <span>20000</span>
            </div>
            <div>
              <span>TỔNG ĐƠN HÀNG</span>
              <span>20000</span>
            </div>
          </div>
        </div>
        <div className="order-history title-order">
          <div>
            <span>Lịch sử đặt hàng</span>
          </div>
          <Row>
            <Col span={12}>
              <span>Ngày đặt hàng: 10/09/2022 10:23:12</span>
            </Col>
            <Col span={12}>
              <span>Trạng thái: Chấp nhận</span>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default DetailOrder;
