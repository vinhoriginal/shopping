import { Avatar, Input } from "antd";
import React from "react";
import imageTest from "../../assets/image-test.png";

const Comment = () => {
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
            <span>Reply</span>
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
            <span>Reply</span>
          </div>
        </div>
      </div>
      <div className="inp-comment">
        <Input placeholder="Write comment ..." />
      </div>
    </div>
  );
};

export default Comment;
