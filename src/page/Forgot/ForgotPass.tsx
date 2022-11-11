import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import "./forgot.scss";

const ForgotPass = () => {
  const [form] = Form.useForm();
  const handeSubmit = (data: any) => {
    console.log("data", data);
  };
  return (
    <div>
      <div className="forgot">
        <Form form={form} onFinish={handeSubmit}>
          <Row>
            <Col span={24}>
              <span>Quên mật khẩu</span>
              <span>Tạo mật khẩu mới</span>
              <p>Nhập email để nhận xác thực từ chúng tôi</p>
            </Col>
            <Col span={24}>
              <Form.Item name="email">
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="email">
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="email">
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="email">
                <Input placeholder="Email" className="custom-input" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  color="#FB2E86"
                  block
                  type="link"
                  className="custom-btn"
                >
                  Gửi
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPass;
