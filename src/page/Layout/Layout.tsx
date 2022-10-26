import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Card, Col, Dropdown, Row } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cart from "../../assets/Group.png";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { TAB_MENU, USER_INFO } from "../utils/contants";
import "./layout.scss";
import ShoppingCart from "./ShoppingCart";

const Layout = () => {
  const [keyActive, setKeyActive] = useState("/home");
  const navigate = useNavigate();
  const [userInfo] = useState<IFormUserInfo>(
    () => JSON.parse(localStorage.getItem(USER_INFO) as string) || []
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate(path.home);
    }
    setKeyActive(location.pathname)
  }, [location, navigate]);
  const handleLogout = () => {
    localStorage.clear();
    navigate(path.login);
  };
  const handleChangeTab = (item: {
    name: string;
    key: string;
    path: string;
  }) => {
    setKeyActive(item.path);
    navigate(item.path)
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
                justifyContent: "flex-start",
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
          <div className="header-menu">
            <div>
              {TAB_MENU.map((item) => (
                <span
                  onClick={() => handleChangeTab(item)}
                  key={item.key}
                  style={{ color: keyActive === item.path ? "#FB2E86" : "" }}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Card size="default" style={{ padding: "80px 300px" }} bordered={false}>
          <Outlet />
        </Card>
      </div>
    </div>
  );
};

export default Layout;
