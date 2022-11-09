import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { FORMAT_DATE } from "../utils/contants";
import {
  getDataDistrict,
  getDataWard,
  getProvince,
  shipFee,
} from "./checkout.reducer";
import "./checkout.scss";

const BillingCheckout = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const districtId = Form.useWatch("district");
  const wardId = Form.useWatch("ward");
  const { dataProvince, dataDistrict, dataWard } = useAppSelector(
    (state) => state.checkoutReducer
  );
  useEffect(() => {
    dispatch(
      shipFee({
        shop_id: 3333362,
        from_district: 1542,
        to_district: 1448,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        form.setFieldsValue({
          service: (res.payload as any).data.data[0].short_name,
        });
      }
    });
    dispatch(getProvince());
  }, []);
  const handleSubmit = (data: any) => {
    console.log("data", moment(data.birthDay).format(FORMAT_DATE.YYYY_MM_DD));
  };
  const handleChangeProvince = (value: any) => {
    console.log('value', value)
    if (!value) {
      return form.setFieldsValue({ district: undefined, ward: undefined });
    }
    dispatch(getDataDistrict(value));
  };
  const handleChangeDistrict = (value: any) => {
    if (!value) {
      return form.setFieldsValue({ ward: undefined });
    }
    dispatch(getDataWard(value));
  };
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
  return (
    <div style={{ display: "flex" }} className="billing-address">
      <div style={{ width: "50%" }}>
        <Row>
          <Col span={24} style={{ marginBottom: "40px" }}>
            <span className="title">Thông tin cá nhân</span>
          </Col>
        </Row>
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                name="name"
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
          </Row>
          <Row gutter={40}>
            <Col span={12}>
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
          </Row>
          <Row gutter={40}>
            <Col span={12}>
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
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
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
          </Row>
          <Row gutter={40}>
            <Col span={12}>
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
                  <Radio value="Male">Nam</Radio>
                  <Radio value="Female">Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                name="birthDay"
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
                  format={FORMAT_DATE.YYYYMMDD}
                  allowClear
                  bordered={false}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={12}>
              <Form.Item
                name="province"
                label={<span className="label-title">Tỉnh</span>}
                rules={[
                  {
                    required: true,
                    message: "Tỉnh không được để trống",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Quận huyện không được để trống",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Xã phường không được để trống",
                  },
                ]}
              >
                <Select
                  placeholder="Xã phường"
                  showArrow={false}
                  bordered={false}
                  className="custom-inp"
                  allowClear
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                label={<span className="label-title">Địa chỉ</span>}
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống",
                  },
                ]}
              >
                <Input
                  bordered={false}
                  allowClear
                  className="custom-inp"
                  placeholder="Địa chỉ"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="service"
                label={<span className="label-title">Dịch vụ khả dụng</span>}
              >
                <Input className="custom-inp" bordered={false} allowClear />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "end" }}>
              <Form.Item>
                <Button
                  disabled={districtId && wardId ? false : true}
                  htmlType="submit"
                  type="link"
                  className="custom-btn"
                >
                  <span>Tính gói cước</span>
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div style={{ width: "50%" }}>Thông tin hàng</div>
    </div>
  );
};

export default BillingCheckout;
