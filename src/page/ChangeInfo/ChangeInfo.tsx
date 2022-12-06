import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getDataDistrict,
  getDataWard,
  getProvince,
  resetDataCalculate,
  resetDataDistrict,
  resetDataWard,
} from "../CheckOut/checkout.reducer";
import { FORMAT_DATE, USER_INFO } from "../utils/contants";
import "../CheckOut/checkout.scss";
import { updatePassword, updateUser } from "../Home/home.reducer";
import UploadAvatar from "./UploadAvatar";
import { RcFile } from "antd/lib/upload";
import moment from "moment";

const ChangeInfo = () => {
  const [isChangePassword, setIsChangePassword] = useState(false)
  const [file, setFile] = useState<any>(null);
  const [urlFile, setUrlFile] = useState("");
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const newPassword = Form.useWatch('newPassword', form)
  const { dataProvince, dataDistrict, dataWard } =
    useAppSelector((state) => state.checkoutReducer);
  useEffect(() => {
    dispatch(getProvince());
    return () => {
      dispatch(resetDataCalculate());
    };
  }, []);
  const validateDate = (_: any, value: any) => {
    const currentTime = new Date(value).getTime();
    const nowDate = new Date().getTime();
    if (!value) {
      return Promise.resolve();
    }
    if (nowDate <= currentTime) {
      return Promise.reject("Ngày sinh nhật không thế lớn hơn ngày hiện tại");
    }
    return Promise.resolve();
  };
  const validateConfirmPassword = (_: any, value: any) => {
    if (!value) return Promise.resolve()
    if (value === newPassword) return Promise.resolve()
    if (value !== newPassword) {
      return Promise.reject('Nhập lại mật khẩu không đúng')
    }
    return Promise.resolve()
  }
  const handleChangeProvince = (value: any) => {
    if (!value) {
      form.setFieldsValue({
        district: undefined,
        ward: undefined,
        service: undefined,
      });
      dispatch(resetDataDistrict());
      dispatch(resetDataWard());
      return;
    }
    dispatch(getDataDistrict(value));
  };
  const handleChangeDistrict = (value: any) => {
    if (!value) {
      dispatch(resetDataWard());
      return form.setFieldsValue({ ward: undefined, service: undefined });
    }
    dispatch(getDataWard(value));
  };
  const handleSubmit = (data: any) => {
    const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
    if (isChangePassword) {
      dispatch(updatePassword({ ...data, customerId: userInfo?.customerId })).then(res => {
        if (res.meta.requestStatus === 'fulfilled') {
          form.resetFields()
          setIsChangePassword(false)
        }
      })
      return
    }
    const formData = new FormData();
    if (data && Object.keys(data).length) {
      Object.keys(data).forEach((item) => {
        if (item === "birthday") {
          formData.append(
            item,
            data[item] ? moment(data[item]).format("YYYY-MM-DD") : ''
          );
        } else formData.append(item, data[item]);
      });
    }
    formData.append("customerId", userInfo?.customerId);
    formData.append("avatar", file);
    dispatch(updateUser(formData));
  };
  console.log('hello')
  return (
    <div className="billing-address change-info">
      <Form
        layout="vertical"
        style={{ width: "50%" }}
        requiredMark={false}
        onFinish={handleSubmit}
        form={form}
      >
        {!isChangePassword ? <Row gutter={12}>
          <Col span={24}>
            <Form.Item
              name="fullName"
              label={<span className="label-title">Họ tên</span>}
              rules={[
                {
                  required: true,
                  message: "Họ tên không được để trống",
                },
              ]}
            >
              <Input bordered={false} allowClear className="custom-inp" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="username"
              label={<span className="label-title">Tên đăng nhập</span>}
              rules={[
                {
                  required: true,
                  message: "Tên đăng nhập không được để trống",
                },
              ]}
            >
              <Input bordered={false} allowClear className="custom-inp" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label={<span className="label-title">Mật khẩu</span>}
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input
                type="password"
                bordered={false}
                allowClear
                className="custom-inp"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="email"
              label={<span className="label-title">Email</span>}
              rules={[
                {
                  required: true,
                  message: "Email không được để trống",
                },
              ]}
            >
              <Input bordered={false} allowClear className="custom-inp" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="phone"
              label={<span className="label-title">Số điện thoại</span>}
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống",
                },
              ]}
            >
              <Input
                bordered={false}
                allowClear
                className="custom-inp"
                type="number"
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="gender"
              rules={[
                {
                  required: true,
                  message: "Giới tính không được để trống",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="1">Nam</Radio>
                <Radio value="0">Nữ</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="birthday"
              label={<span className="label-title">Ngày sinh</span>}
              rules={[
                {
                  required: true,
                  message: "Sinh nhật không được để trống",
                },
                {
                  validator: validateDate,
                },
              ]}
              className="custom-style"
            >
              <DatePicker
                style={{ width: "100%" }}
                format={FORMAT_DATE.DDMMYYYY}
                allowClear
                bordered={false}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="province"
              label={<span className="label-title">Tỉnh</span>}
            >
              <Select
                placeholder="Tỉnh"
                showArrow={false}
                bordered={false}
                className="custom-inp"
                options={dataProvince}
                onChange={handleChangeProvince}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="district"
              label={<span className="label-title">Quận huyện</span>}
            >
              <Select
                placeholder="Quận huyện"
                showArrow={false}
                bordered={false}
                className="custom-inp"
                options={dataDistrict}
                onChange={handleChangeDistrict}
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="ward"
              label={<span className="label-title">Xã phường</span>}
            >
              <Select
                placeholder="Xã phường"
                showArrow={false}
                bordered={false}
                className="custom-inp"
                allowClear
                options={dataWard}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label={<span className="label-title">Địa chỉ</span>}
            >
              <Input
                bordered={false}
                allowClear
                className="custom-inp"
                placeholder="Địa chỉ"
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button type="link" className="custom-btn" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row> : <>
          <Row>
            <Col span={24}>
              <Form.Item
                name="oldPassword"
                label={<span className="label-title">Mật khẩu cũ</span>}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu cũ không được để trống",
                  },
                ]}
              >
                <Input type='password' bordered={false} allowClear className="custom-inp" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="newPassword"
                label={<span className="label-title">Mật khẩu mới</span>}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu mới không được để trống",
                  },
                ]}
              >
                <Input type='password' bordered={false} allowClear className="custom-inp" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="confirmPassword"
                label={<span className="label-title">Xác nhận mật khẩu mới</span>}
                rules={[
                  {
                    required: true,
                    message: "Xác nhận mật khẩu mới không được để trống",
                  },
                  {
                    validator: validateConfirmPassword
                  }
                ]}
              >
                <Input type='password' bordered={false} allowClear className="custom-inp" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="link" className="custom-btn" htmlType="submit">
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </>}
      </Form>
      <div style={{ width: "50%" }}>
        <UploadAvatar
          setFile={setFile}
          urlFile={urlFile}
          setUrlFile={setUrlFile}
          setIsChangePassword={setIsChangePassword}
          isChangePassword={isChangePassword}
        />
      </div>
    </div>
  );
};

export default ChangeInfo;
