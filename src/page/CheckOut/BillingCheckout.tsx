import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../component/Footer/Footer";
import { IFormUserInfo } from "../../model/userInfo.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { viewCart } from "../Layout/layout.reducer";
import {
  COLOR_SPAN,
  FONT_FAMILY,
  FONT_SIZE,
  FORMAT_DATE,
  USER_INFO,
} from "../utils/contants";
import {
  buyItem,
  calculateShip,
  getDataDistrict,
  getDataWard,
  getProvince,
  resetDataCalculate,
  resetDataDistrict,
  resetDataWard,
  shipFee,
  updateUserInfo,
} from "./checkout.reducer";
import "./checkout.scss";

const BillingCheckout = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const districtId = Form.useWatch("district", form);
  const wardId = Form.useWatch("ward", form);
  const shipmentId = Form.useWatch("shipmentId", form);
  const paymentId = Form.useWatch("paymentId", form);
  const navigate = useNavigate();
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const { dataProvince, dataDistrict, dataWard, dataShipFee, dataCalculate } =
    useAppSelector((state) => state.checkoutReducer);
  const { itemProducts } = useAppSelector((state) => state.layoutReducer);
  useEffect(() => {
    dispatch(getProvince());
    return () => {
      dispatch(resetDataCalculate());
    };
  }, []);
  const handleSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("customerId", userInfo.customerId);
    Object.keys(data).forEach((item) => {
      if (data[item] && item !== "birthday" && item !== "service") {
        formData.append(item, data[item]);
      }
      if (item === "birthday") {
        formData.append(item, moment(data[item]).format(FORMAT_DATE.DDMMYYYY));
      }
    });
    dispatch(updateUserInfo(formData));
  };
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
    dispatch(
      shipFee({
        shop_id: 3333362,
        from_district: 1542,
        to_district: value,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        form.setFieldsValue({
          service: (res.payload as any).data.data[0].short_name,
        });
      }
    });
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
  const handleCalculateShip = () => {
    const data = {
      service_id: dataShipFee[0]?.service_id,
      from_district_id: 1542,
      insurance_value: itemProducts?.subTotal,
      to_district_id: districtId,
      to_ward_code: wardId,
      weight: itemProducts?.weightTotal,
      coupon: null,
    };
    dispatch(calculateShip(data));
  };
  console.log('paymentId', paymentId)
  const handleCheckouItem = () => {
    const data = {
      customerId: userInfo.customerId,
      cartId: itemProducts?.id,
      shipmentId: shipmentId,
      paymentId: paymentId,
      total: itemProducts?.subTotal + dataCalculate?.total,
    };
    dispatch(buyItem(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const newPayload: any = res.payload
        if (newPayload.data.data.isPaypal) {
          window.open(newPayload.data.data.paypalUrl, 'blank')
          return
        }
        toast.success("Đặt hàng thành công");
        navigate(path.home);
        dispatch(viewCart());
      }
    });
  };
  return (
    <div>
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
                    // className="custom-inp"
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
                    <Radio value="1">Nam</Radio>
                    <Radio value="0">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", flexDirection: 'column' }}>
              <Row gutter={40}>
                <Col span={24}>
                  <Form.Item
                    name="paymentId"
                    label={
                      <span className="label-title">Phương thức thanh toán</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Phương thức thanh toán không được để trống",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={1} style={{ marginBottom: 20 }}>Thanh toán sau giao hàng</Radio>
                      <Radio value={2}>Thanh toán bằng paypal</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={24}>
                  <Form.Item
                    name="shipmentId"
                    label={
                      <span className="label-title">Phương thức vận chuyển</span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Phương thức vận chuyển không được để trống",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={1} style={{ marginBottom: 20 }}>Giao hàng nhanh</Radio>
                      <Radio value={2}>Vận chuyển miễn phí</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row gutter={40}>
              <Col span={12}>
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
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <Form.Item
                  name="province"
                  label={<span style ={{color:"#000"}}className="label-title">Tỉnh</span>}
                >
                  <Select
                    style ={{color:"#000"}}
                    placeholder="Tỉnh"
                    showArrow={false}
                    bordered={false}
                    // className="custom-inp"
                    options={dataProvince}
                    onChange={handleChangeProvince}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="district"
                  label={<span style ={{color:"#000"}} className="label-title">Quận huyện</span>}
                >
                  <Select
                    style ={{color:"#000"}}
                    placeholder="Quận huyện"
                    showArrow={false}
                    bordered={false}
                    // className="custom-inp"
                    options={dataDistrict}
                    onChange={handleChangeDistrict}
                    allowClear
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="ward"
                  label={<span style ={{color:"#000"}} className="label-title">Xã phường</span>}
                >
                  <Select
                    style ={{color:"#000"}}
                    placeholder="Xã phường"
                    showArrow={false}
                    bordered={false}
                    // className="custom-inp"
                    allowClear
                    options={dataWard}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="address"
                  label={<span style ={{color:"#000"}} className="label-title">Địa chỉ</span>}
                >
                  <Input
                    color="#000"
                    style ={{color:"#000"}}
                    bordered={false}
                    allowClear
                    // className="custom-inp"
                    placeholder="Địa chỉ"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="service"
                  label={<span style ={{color:"#000"}} className="label-title">Dịch vụ khả dụng</span>}
                >
                  <Input className="custom-inp" bordered={false} allowClear />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "end" }}>
                <Form.Item>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Button
                        type="link"
                        className="custom-btn"
                        htmlType="submit"
                      // onClick={handleUpdateAddress}
                      >
                        Cập nhật địa chỉ
                      </Button>
                    </div>
                    <div>
                      <Button
                        disabled={districtId && wardId ? false : true}
                        type="link"
                        className="custom-btn"
                        style={{ marginRight: "20px" }}
                        onClick={handleCalculateShip}
                      >
                        <span>Tính gói cước</span>
                      </Button>
                      <span style ={{color:"#000"}}>Cước: {dataCalculate?.total} VND</span>
                    </div>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div
          style={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: "20%",
          }}
        >
          <div>
            {itemProducts?.cartItemList?.map((item: any) => (
              <div
                key={item?.id}
                style={{
                  display: "flex",
                  marginBottom: "12px",
                  borderBottom: "1px solid #ccc",
                }}
              >
                <div style={{ width: "100px", height: "100px" }}>
                  <img
                    src={`data:image/jpeg;base64,${item?.product?.images[0]}`}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <div className="billing-info">
                  <div>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: FONT_SIZE,
                        lineHeight: "20px",
                      }}
                    >
                      {item?.product?.name}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      Loại sản phẩm: {item?.product?.productType?.name}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      Số lượng: {item?.quantity}
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: FONT_SIZE,
                        lineHeight: "20px",
                        color: COLOR_SPAN,
                      }}
                    >
                      Giá tiền: {item?.product?.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout">
            <div>
              <div className="checkout-price">
                <div className="cart-total">
                  <div>
                    <div className="sub-totals">
                      <span>Đơn hàng:</span>
                      <span>{itemProducts?.subTotal} VND</span>
                    </div>
                    <div className="tax-rate">
                      <span>Phí ship: </span>
                      <span>{dataCalculate?.total} VND</span>
                    </div>
                    <div className="total">
                      <span>Tổng:</span>
                      <span>
                        {itemProducts?.subTotal + dataCalculate?.total
                          ? itemProducts?.subTotal + dataCalculate?.total
                          : ""}{" "}
                        VND
                      </span>
                    </div>
                    <Checkbox className="shipping-checkbox">
                      <span className="shipping">
                        Shipping & taxes calculated at checkout
                      </span>
                    </Checkbox>
                    <div className="custom-btn-checkout">
                      <Button onClick={handleCheckouItem}>
                        <span>Mua hàng</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BillingCheckout;
