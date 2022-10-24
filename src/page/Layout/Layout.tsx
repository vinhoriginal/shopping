import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

const Layout = () => {
  return (
    <div>
      <div>
        <div className="header">
          <Row className="header-contact" gutter={10}>
            <Col span={10}>
              <Row gutter={10}>
                <Col span={12}>
                  <MailOutlined />
                  <span>Mail</span>
                </Col>
                <Col span={12}>
                  <PhoneOutlined />
                  <span>Phone</span>
                </Col>
              </Row>
            </Col>
            <Col span={14}></Col>
          </Row>
          <div className="header-menu"></div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
