import { FacebookOutlined, GithubOutlined, GooglePlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { IFormValueMemo } from "../../model/login.model";
import path from "../../router/path";
import { useAppDispatch } from "../../store/hooks";
import google_logo from "../../assets/google-logo.png";
import facebook_logo from "../../assets/fb-logo.png";
import github_logo from "../../assets/github-logo.png";
import {
  REGEX_PASSWORD,
  TOKEN_KEY,
  USER_INFO,
  VALUE_MEMO,
} from "../utils/contants";
import { login } from "./login.reducer";
import "./login.scss";
import { FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "../../contants/axios.config";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogin = (data: any) => {
    dispatch(login(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const newPayload: any = res.payload;
        console.log('res', newPayload)
        localStorage.setItem(TOKEN_KEY, newPayload.data.token);
        localStorage.setItem(
          USER_INFO,
          JSON.stringify(newPayload.data.customerDTO)
        );
        const valueMemo: IFormValueMemo = JSON.parse(
          localStorage.getItem(VALUE_MEMO) as string
        );
        if (valueMemo && Object.keys(valueMemo).length) {
          navigate(valueMemo.path);
        } else {
          navigate(path.home);
        }
      }
    });
  };
  const loginGoogle=() => {
    console.log("login with google");
  }
  const loginFaceBook=() => {
    console.log("login with facebook");
  }
  const loginGithub=() =>{
    console.log("login with github");
  }

  return (
    <div className="form-login">
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        size="large"
        onFinish={handleLogin}
      >
        <Row style={{display:"flex", justifyContent:"center"}}>
        <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
        <img src={google_logo} onClick={loginGoogle} style={{color:"#EA4335", marginRight:"10px",height: "32px"}}/> </a>
        <a className="btn btn-block social-btn google" href={FACEBOOK_AUTH_URL}>
        <img src={facebook_logo} onClick={loginFaceBook} style={{color:"#1B74E4", marginRight:"10px", height: "32px"}} /></a>
        <a className="btn btn-block social-btn google" href={GITHUB_AUTH_URL}>
        <img src={github_logo} onClick={loginGithub} style={{color:"#000", height: "32px"}}/></a>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="username"
              label="T??n ????ng nh???p"
              rules={[
                {
                  required: true,
                  message: "Email kh??ng ???????c ????? tr???ng",
                },
              ]}
            >
              <Input placeholder="Nh???p username c???a b???n" allowClear />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="password"
              label="M???t kh???u"
              rules={[
                {
                  required: true,
                  message: "Password kh??ng ???????c ????? tr???ng",
                },
                {
                  pattern: new RegExp(REGEX_PASSWORD),
                  message:
                    "M???t kh???u ch???a ??t nh???t 1 k?? t??? in hoa, k?? t??? ?????c bi???t",
                },
              ]}
            >
              <Input placeholder="Nh???p password c???a b???n" type="password" />
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
                ????ng nh???p
              </Button>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "end", color: "blue" }}>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate(path.register)}
            >
              B???n ch??a c?? t??i kho???n? B???m v??o ????y ????? ????ng k??
            </span>
            <p
              style={{ cursor: "pointer", marginTop: "12px" }}
              onClick={() => navigate(path.forgot)}
            >
              Qu??n m???t kh???u
            </p>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
