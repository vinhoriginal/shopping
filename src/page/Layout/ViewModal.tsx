import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { IFormPropsModal } from "../utils/utils";

const ViewModal = ({isOpen,setIsOpen}:IFormPropsModal)=> {
  return (
    <Modal
        width={400}
        className="notification"
        title="Thông báo"
        style={{ right: 200 }}
        open={isOpen}
        footer={null}
        closeIcon={<CloseCircleOutlined className="close-button"/>}
        onCancel={() => setIsOpen(false)}
      >
        {/* <Button onClick={handleNotification} type="primary" shape="circle" className="cancel" icon={<CloseCircleOutlined />}/> */}
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
  );
};

export default ViewModal;
