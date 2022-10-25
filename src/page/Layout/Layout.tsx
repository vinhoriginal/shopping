import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Dropdown, Row } from "antd";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cart from "../../assets/Group.png";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { USER_INFO } from "../utils/contants";
import "./layout.scss";
import ShoppingCart from "./ShoppingCart";

const Layout = () => {
  const navigate = useNavigate();
  const [userInfo] = useState<IFormUserInfo>(
    () => JSON.parse(localStorage.getItem(USER_INFO) as string) || []
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate(path.home);
    }
  }, [location, navigate]);
  const handleLogout = () => {
    localStorage.clear();
    navigate(path.login);
  };
  return (
    <div>
      <div>
        <div className="header">
          <Row className="header-contact" gutter={10}>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <MailOutlined />
              <span>{userInfo.email}</span>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PhoneOutlined />
              <span>{userInfo.phone}</span>
            </Col>
            <Col
              span={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Dropdown className="cart" overlay={<ShoppingCart />}>
                <img src={Cart} alt="cart" />
              </Dropdown>
              <div
                style={{ width: "50%", textAlign: "end" }}
                className="logout"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </div>
            </Col>
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
