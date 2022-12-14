import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { BackTop, Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Cart from "../../assets/Group.png";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TAB_MENU, TOKEN_KEY, USER_INFO } from "../utils/contants";
import { viewCart } from "./layout.reducer";
import "./layout.scss";

const Layout = () => {
  const [keyActive, setKeyActive] = useState("/home");
  const [token, setToken] = useState(
    () => localStorage.getItem(TOKEN_KEY) || ""
  );
  const itemProducts = useAppSelector(
    (state) => state.layoutReducer.itemProducts
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userInfo] = useState<IFormUserInfo>(
    () => JSON.parse(localStorage.getItem(USER_INFO) as string) || []
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate(path.home);
    }
    setKeyActive(location.pathname);
    setToken(localStorage.getItem(TOKEN_KEY) as string);
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
    navigate(item.path);
  };
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      dispatch(viewCart());
    }
  }, [dispatch]);
  const handleToCart = () => {
    if (location.pathname !== "/checkout") {
      navigate(path.checkout);
    }
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
                fontSize:"20px"
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
                fontSize: "20px"
              }}
            >
              <PhoneOutlined />
              <span>{userInfo.phone}</span>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                fontSize:"20px"
              }}
            >
              <span
                onClick={() => navigate(path.info)}
                style={{ cursor: "pointer", fontSize: "20px" }}
              >
                Th??ng tin t??i kho???n
              </span>
            </Col>
            <Col
              span={6}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                fontSize: "20px"
              }}
            >
              <div className="header-cart" onClick={handleToCart}>
                <img src={Cart} alt="cart" />
                <div>
                  <span>{itemProducts?.cartItemList?.length || 0}</span>
                </div>
              </div>
              <div
                style={{ width: "50%", textAlign: "end" }}
                className="logout"
              >
                {token ? (
                  <span onClick={handleLogout}>Logout</span>
                ) : (
                  <span onClick={() => navigate(path.login)}>Login</span>
                )}
              </div>
            </Col>
          </Row>
          <div className="header-menu">
            <div>
              {TAB_MENU.map((item) => (
                <span
                  onClick={() => handleChangeTab(item)}
                  key={item.key}
                  style={{ color: keyActive === item.path ? "#FB2E86" : "", fontSize:20, fontFamily:"Segoe UI" }}
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
      <div>
    <BackTop>
      <div className="ant-back-top-inner">UP</div>
    </BackTop>
    Scroll down to see the bottom-right
    <strong style={{ color: '#1088e9' }}> blue </strong>
    button.
  </div>,
    </div>
  );
};

export default Layout;
