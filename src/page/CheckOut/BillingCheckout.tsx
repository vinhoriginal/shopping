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
    const userInfo = JSON.parse(localStorage.getItem("account") as string);
    form.setFieldsValue({ ...userInfo });
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
      return Promise.reject("Ng??y sinh nh???t kh??ng th??? l???n h??n ng??y hi???n t???i");
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
  console.log("paymentId", paymentId);
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
        const newPayload: any = res.payload;
        if (newPayload.data.data.isPaypal) {
          window.open(newPayload.data.data.paypalUrl, "blank");
          return;
        }
        toast.success("?????t h??ng th??nh c??ng");
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
              <span className="title">Th??ng tin c?? nh??n</span>
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
                  label={<span className="label-title">H??? t??n</span>}
                  rules={[
                    {
                      required: true,
                      message: "H??? t??n kh??ng ???????c ????? tr???ng",
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
                  label={<span className="label-title">T??n ????ng nh???p</span>}
                  rules={[
                    {
                      required: true,
                      message: "T??n ????ng nh???p kh??ng ???????c ????? tr???ng",
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
                      message: "Email kh??ng ???????c ????? tr???ng",
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
                  label={<span className="label-title">S??? ??i???n tho???i</span>}
                  rules={[
                    {
                      required: true,
                      message: "S??? ??i???n tho???i kh??ng ???????c ????? tr???ng",
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
                      message: "Gi???i t??nh kh??ng ???????c ????? tr???ng",
                    },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="1">Nam</Radio>
                    <Radio value="0">N???</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Row gutter={40}>
                <Col span={24}>
                  <Form.Item
                    name="paymentId"
                    label={
                      <span className="label-title">
                        Ph????ng th???c thanh to??n
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Ph????ng th???c thanh to??n kh??ng ???????c ????? tr???ng",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={1} style={{ marginBottom: 20 }}>
                        Thanh to??n sau giao h??ng
                      </Radio>
                      <Radio value={2}>Thanh to??n b???ng paypal</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={24}>
                  <Form.Item
                    name="shipmentId"
                    label={
                      <span className="label-title">
                        Ph????ng th???c v???n chuy???n
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Ph????ng th???c v???n chuy???n kh??ng ???????c ????? tr???ng",
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={1} style={{ marginBottom: 20 }}>
                        Giao h??ng nhanh
                      </Radio>
                      <Radio value={2}>V???n chuy???n mi???n ph??</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <Row gutter={40}>
              <Col span={12}>
                <Form.Item
                  name="birthday"
                  label={<span className="label-title">Ng??y sinh</span>}
                  rules={[
                    {
                      required: true,
                      message: "Sinh nh???t kh??ng ???????c ????? tr???ng",
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
                  label={
                    <span style={{ color: "#000" }} className="label-title">
                      T???nh
                    </span>
                  }
                >
                  <Select
                    style={{ color: "#000" }}
                    placeholder="T???nh"
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
                  label={
                    <span style={{ color: "#000" }} className="label-title">
                      Qu???n huy???n
                    </span>
                  }
                >
                  <Select
                    style={{ color: "#000" }}
                    placeholder="Qu???n huy???n"
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
                  label={
                    <span style={{ color: "#000" }} className="label-title">
                      X?? ph?????ng
                    </span>
                  }
                >
                  <Select
                    style={{ color: "#000" }}
                    placeholder="X?? ph?????ng"
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
                  label={
                    <span style={{ color: "#000" }} className="label-title">
                      ?????a ch???
                    </span>
                  }
                >
                  <Input
                    color="#000"
                    style={{ color: "#000" }}
                    bordered={false}
                    allowClear
                    // className="custom-inp"
                    placeholder="?????a ch???"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="service"
                  label={
                    <span style={{ color: "#000" }} className="label-title">
                      D???ch v??? kh??? d???ng
                    </span>
                  }
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
                        C???p nh???t ?????a ch???
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
                        <span>T??nh g??i c?????c</span>
                      </Button>
                      <span style={{ color: "#000" }}>
                        C?????c: {dataCalculate?.total} VND
                      </span>
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
                    src={item?.path[0]}
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
                      Lo???i s???n ph???m: {item?.product?.productType?.name}
                    </span>
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: "14px",
                        lineHeight: "20px",
                      }}
                    >
                      S??? l?????ng: {item?.quantity}
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
                      Gi?? ti???n: {item?.product?.price}
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
                      <span>????n h??ng:</span>
                      <span>{itemProducts?.subTotal} VND</span>
                    </div>
                    <div className="tax-rate">
                      <span>Ph?? ship: </span>
                      <span>{dataCalculate?.total} VND</span>
                    </div>
                    <div className="total">
                      <span>T???ng:</span>
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
                        <span>Mua h??ng</span>
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
