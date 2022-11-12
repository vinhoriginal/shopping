import { Button, Col, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changePassword, sendOTP } from "./forgot.reducer";
import "./forgot.scss";

const ForgotPass = () => {
  const [form] = Form.useForm();
  const [isNew, setIsNew] = useState(false);
  const [email, setEmail] = useState("");
  const password = Form.useWatch("newPassword", form);
  const confirmPassword = Form.useWatch("confirmPassword", form);
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.forgotReducer);
  const navigate = useNavigate();
  const handeSubmit = (data: any) => {
    if (!isNew) {
      setEmail(data.email);
      dispatch(sendOTP(data.email)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsNew(true);
        }
      });
    } else {
      dispatch(changePassword({ ...data, email })).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          toast.success("Đổi mật khẩu thành công");
          setIsNew(false);
          navigate(path.login);
        }
      });
    }
  };
  const validateConfirmPass = (_: any, value: any) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value !== password) {
      return Promise.reject("Nhập lại mật khẩu không đúng");
    }
    if (value === password) {
      form.setFields([{ name: "newPassword", errors: [] }]);
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  const validatePassword = (_: any, value: any) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value !== confirmPassword && confirmPassword) {
      return Promise.reject("Mật khẩu không trùng khớp");
    }
    if (value === confirmPassword) {
      form.setFields([{ name: "confirmPassword", errors: [] }]);
      return Promise.resolve();
    }
    return Promise.resolve();
  };
  return (
    <div>
      <div className="forgot">
        <Form form={form} onFinish={handeSubmit}>
          <Row>
            {!isNew ? (
              <>
                <Col span={24}>
                  <span>Quên mật khẩu</span>
                  <p>Nhập email để nhận xác thực từ chúng tôi</p>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: " Vui lòng nhập email của bạn",
                      },
                    ]}
                  >
                    <Input placeholder="Email" className="custom-input" />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <>
                <Col span={24} style={{ marginBottom: "12px" }}>
                  <span>Tạo mật khẩu mới</span>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="verifyCode"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã code",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Verify code"
                      className="custom-input"
                      type="number"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="oldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu cũ",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mật khẩu cũ"
                      className="custom-input"
                      type="password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới",
                      },
                      {
                        validator: validatePassword,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Mật khẩu mới"
                      className="custom-input"
                      type="password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu mới",
                      },
                      {
                        validator: validateConfirmPass,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập lại mật khẩu"
                      className="custom-input"
                      type="password"
                    />
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={24}>
              <Form.Item>
                <Button
                  htmlType="submit"
                  color="#FB2E86"
                  block
                  type="link"
                  className="custom-btn"
                  loading={isLoading}
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
