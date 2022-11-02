import { Avatar, Input, InputRef } from "antd";
import { useRef, useState } from "react";
import imageTest from "../../assets/image-test.png";

const Comment = () => {
  const [valueInput, setValueInput] = useState("");
  const refInp = useRef<InputRef>(null);
  const handleReply = () => {
    refInp?.current?.focus();
  };
  return (
    <div className="comment">
      <div>
        <span>Comment</span>
      </div>
      <div className="comment-info">
        <div>
          <Avatar src={imageTest} size={50} />
        </div>
        <div>
          <span>Tony Phạm</span>
          <span>3h ago</span>
          <span>very good product</span>
          <div className="edit-reply">
            <span>Edit</span>
            <span onClick={handleReply}>Reply</span>
          </div>
        </div>
      </div>
      <div className="comment-info comment-child">
        <div>
          <Avatar src={imageTest} size={50} />
        </div>
        <div>
          <span>Tony Phạm</span>
          <span>3h ago</span>
          <span>very good product</span>
          <div className="edit-reply">
            <span>Edit</span>
            <span onClick={handleReply}>Reply</span>
          </div>
        </div>
      </div>
      <div className="inp-comment">
        <Input
          placeholder="Write comment ..."
          ref={refInp}
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Comment;
