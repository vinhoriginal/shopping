import { Form, Row, Col, Input, Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import path from "../../router/path";
import { useAppDispatch } from "../../store/hooks";
import { REGEX_PASSWORD } from "../utils/contants";
import { login } from "./login.reducer";
import "./login.scss";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (data: any) => {
    dispatch(login(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const newPayload: any = res.payload;
        console.log("newPayload", newPayload.data.token);
        localStorage.setItem("token", newPayload.data.token);
        navigate(path.home);
      }
    });
  };
  return (
    <div className="form-login">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        size="large"
        onFinish={handleLogin}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
              ]}
            >
              <Input placeholder="Nhập username của bạn" allowClear />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Password không được để trống",
                },
                {
                  pattern: new RegExp(REGEX_PASSWORD),
                  message:
                    "Mật khẩu chứa ít nhất 1 ký tự in hoa, ký tự đặc biệt",
                },
              ]}
            >
              <Input placeholder="Nhập password của bạn" type="password" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                style={{ background: "#FB2E86", borderColor: "#FB2E86" }}
              >
                Login
              </Button>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "end", color: "blue" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(path.register)}
            >
              Bạn chưa có tài khoản? Bấm vào đây để đăng ký
            </span>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
