import { UploadOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { RcFile, UploadChangeParam, UploadFile } from "antd/lib/upload";
import Upload, { UploadProps } from "antd/lib/upload/Upload";
import { toast } from "react-toastify";

interface PropsUploadAvatar {
  setFile: React.Dispatch<React.SetStateAction<RcFile | undefined>>;
  urlFile: string;
  setUrlFile: React.Dispatch<React.SetStateAction<string>>;
}
const UploadAvatar = ({ setFile, urlFile, setUrlFile }: PropsUploadAvatar) => {
  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      toast.error("Vui lòng tải lên ảnh");
      return false;
    }
    return isJpgOrPng;
  };
  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setUrlFile(url);
      setFile(info?.file?.originFileObj);
    });
  };
  return (
    <div className="upload-avatar">
      <div style={{ marginBottom: "12px" }}>
        <Upload
          beforeUpload={beforeUpload}
          showUploadList={false}
          onChange={handleChange}
        >
          <Avatar src={urlFile} size={300} style={{ cursor: "pointer" }} />
        </Upload>
      </div>
      <div className="title-avatar">
        <span>Ảnh đại diện</span>
      </div>
    </div>
  );
};

export default UploadAvatar;
