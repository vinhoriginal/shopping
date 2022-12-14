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
              <h2>Th??ng tin li??n h???</h2>
              <div>
                <a target="_blank " href="http://ant.design">
                  B??n h??ng online
                </a>
              </div>
              <div>
                <a target="_blank " href="https://pro.ant.design/">
                  Ch??m s??c kh??ch h??ng
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">H??? tr??? k??? thu???t</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">H??? tr??? b???o h??nh & s???a ch???a</a>
                <span> - </span>
                {/* <FormattedMessage id="app.footer.motion" /> */}
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Li??n h??? kh???i v??n ph??ng</a>
                <span> - </span>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>H??? tr??? - d???ch v???</h2>
              <div>
                <a target="_blank " href="http://ant.design">
                  Mua h??ng tr??? g??p
                </a>
              </div>
              <div>
                <a target="_blank " href="https://pro.ant.design/">
                  H?????ng d???n ?????t h??ng v?? thanh to??n
                </a>
              </div>
              <div>
                <a href="http://mobile.ant.design">Tra c???u ????n h??ng</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://motion.ant.design">Ch??nh s??ch b???o h??nh</a>
              </div>
              <div>
                <a target="_blank" rel="noopener noreferrer" href="http://kitchen.alipay.com">Ch??nh s??ch b???o m???t</a>
              </div>
              <div>
                <a href="http://scaffold.ant.design">??i???u kho???n mua b???n</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://library.ant.design/">Ch??nh s??ch gi???i quy???t khi???u n???i</a>
              </div>
              <div>
                <a target="_blank" rel="noopener" href="http://ux.ant.design">C??u h???i th?????ng g???p</a>
              </div>
            </div>
          </Col>
          <Col md={6} sm={24} xs={24}>
            <div className="footer-center">
              <h2>Thanh to??n mi???n ph??</h2>
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
                H??nh th???c v???n chuy???n
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
        C??ng ty c??? ph???n c??ng ngh??? TechFormal
        {' '}
        <span className="heart">???</span>
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