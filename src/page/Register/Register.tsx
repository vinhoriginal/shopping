import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import path from "../../router/path";
import { useAppDispatch } from "../../store/hooks";
import { REGEX_PASSWORD } from "../utils/contants";
import { register } from "./register.reducer";
import "./register.scss";

const Register = () => {
  const validateMessages = {
    // eslint-disable-next-line
    required: "${label} không được để trống",
  };
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleRegister = (data: any) => {
    dispatch(register(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Đăng ký thành công");
        navigate(path.login);
      }
    });
  };
  return (
    <div className="form-register">
      <Form
        form={form}
        layout="vertical"
        size="large"
        validateMessages={validateMessages}
        requiredMark={false}
        onFinish={handleRegister}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Số điện thoại" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                },
                {
                  pattern: new RegExp(REGEX_PASSWORD),
                  message:
                    "Mật khẩu chứa ít nhất 1 ký tự in hoa, ký tự đặc biệt",
                },
              ]}
            >
              <Input placeholder="Password" type="password" />
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
                Đăng Ký
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Register;
