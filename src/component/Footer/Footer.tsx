import { CarOutlined, ReloadOutlined, SafetyOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import './footer.scss'
import payment from "../../assets/payment.png";
import logo_atm from "../../assets/logo-atm.png";
import logo_jcb from "../../assets/logo-jcb.png";
import logo_master from "../../assets/logo-master.png";
import logog_samsungpay from "../../assets/logo-samsungpay.png";
import logo_visa from "../../assets/logo-visa.png";
import logo_vnpay from "../../assets/logo-vnpay.png";
import nhattin from "../../assets/nhattin.jpg";
import vnpost from "../../assets/vnpost.jpg";
const Footer = () => {
  return (
    <footer id="footer" className="dark ">
      <div className="row-top first">
        <Row>
          <Col md={6} sm={24} xs={24} className="column">
            <div className="icon-service">
              <CarOutlined className="icon"/>
              <div className="text">
                <h3>Free shipping</h3>
                <p className="no-margin">On all orders over $99.00</p>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="column">
            <div className="icon-service">
              <ReloadOutlined className="icon" />
              <div className="text">
                <h3>30 days return</h3>
                <p className="no-margin">You have 30 days to return</p>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="column">
            <div className="icon-service">
              <SafetyOutlined className="icon" />
              <div className="text">
                <h3>Safe Shopping</h3>
                <p className="no-margin">Payment 100% secure</p>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24} className="column">
            <div className="icon-service">
              <UsergroupAddOutlined className="icon" />
              <div className="text">
                <h3>Online support</h3>
                <p className="no-margin">Contact us 24 hours a day</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="footer-wrap container">
        <Row>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center first">
              <h2>Thông tin liên hệ</h2>
              <div>
                <a target="_blank " href="http://ant.design">
                  Bán hàng online
                </a>
              </div>
              <div>
                <a target="_blank " href="https://pro.ant.design/">
                  Chăm sóc khách hàng
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Hỗ trợ kỹ thuật</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Hỗ trợ bảo hành & sửa chữa</a>
                <span> - </span>
                {/* <FormattedMessage id="app.footer.motion" /> */}
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Liên hệ khối văn phòng</a>
                <span> - </span>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Hỗ trợ - dịch vụ</h2>
              <div>
                <a target="_blank " href="http://ant.design">
                  Mua hàng trả góp
                </a>
              </div>
              <div>
                <a target="_blank " href="https://pro.ant.design/">
                  Hướng dẫn đặt hàng và thanh toán
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Tra cứu đơn hàng</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Chính sách bảo hành</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="http://kitchen.alipay.com">Chính sách bảo mật</a>
              </div>
              <div>
                <a href="http://scaffold.ant.design">Điều khoản mua bản</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://library.ant.design/">Chính sách giải quyết khiếu nại</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://ux.ant.design">Câu hỏi thường gặp</a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Thanh toán miễn phí</h2>
              <div style={{display:"flex", marginBottom:"10px"}}>
                <div style={{marginRight:"10px"}}><img className="image-logo" src={logo_atm} alt="logo-atm" /></div>

                <div>
                  <img className="image-logo" src={logo_jcb} alt="logo-jcb" />
                </div>
              </div>
              <div style={{display:"flex", marginBottom:"10px"}}>
              <div>
                <img className="image-logo" style={{marginRight:"10px"}} src={logo_master} alt="logo-master" />
              </div>
              <div>
                <img className="image-logo" src={logog_samsungpay} alt="logo-samsungpay" />
              </div>
              </div>
              <div style={{display:"flex", marginBottom:"10px"}}>
              <div>
                <img className="image-logo" style={{marginRight:"10px"}} src={logo_visa} alt="logo-visa" />
              </div>
              <div>
                <img className="image-logo" src={logo_vnpay} alt="logo-vnpay" />
              </div>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>
                <img
                  className="title-icon"
                  src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
                  alt="AFX Cloud"
                />
                {/* <FormattedMessage id="app.footer.more-product" /> */}
                Hình thức vận chuyển
              </h2>
              <div style={{display:"flex", marginBottom:"10px"}}>
              <div>
                <img style={{marginRight:"10px"}} src={nhattin} alt="nhattin" />
              </div>
              <div>
                <img src={vnpost} alt="vnpost" />
              </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div style ={{display:"flex", justifyContent:"space-between"}} className="bottom-bar first">
        <div>
        Công ty cổ phần công nghệ TechFormal
        {' '}
        <span className="heart">❤</span>
        {' '}
        by
        {' '}
        <a target="_blank" rel="noopener noreferrer" href="https://yuque.com/afx/blog">
          vinhtq.b18cn693@stu.ptit.edu.vn
        </a>
        </div>
        <img className="end" src={payment} alt="payment" />
      </div>
    </footer>
  );
}
export default Footer;