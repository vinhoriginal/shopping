import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { IFormUserInfo } from "../../model/userInfo.model";
import { useAppDispatch } from "../../store/hooks";
import { USER_INFO } from "../utils/contants";
import { getListHistoryOrder, reasonCancel } from "./history.reducer";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  orderId: string;
}
const ReasonModal = ({ isOpen, setIsOpen, orderId }: Props) => {
  const [reason, setReason] = useState("");
  const userInfo: IFormUserInfo = JSON.parse(
    localStorage.getItem(USER_INFO) as string
  );
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (!reason) {
      toast.error("Vui lòng nhập lí do");
      return;
    }
    dispatch(
      reasonCancel({
        orderId,
        reason,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setIsOpen(false);
        dispatch(getListHistoryOrder(userInfo?.customerId));
      }
    });
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setReason("");
        }}
        okText={
          <span
            className="cart-title"
            style={{ fontSize: "14px", color: "white" }}
          >
            Đồng ý
          </span>
        }
        cancelText={
          <span className="cart-title" style={{ fontSize: "14px" }}>
            Hủy
          </span>
        }
        onOk={handleSubmit}
        closable={false}
      >
        <div>
          <span className="cart-title">Vui lòng nhập lý do hủy đơn hàng</span>
          <div style={{ marginTop: "12px" }}>
            <TextArea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="cart-title"
              style={{ fontSize: "16px" }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReasonModal;
