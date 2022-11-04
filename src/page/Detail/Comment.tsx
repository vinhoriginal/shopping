import { Avatar, Input, InputRef } from "antd";
import { useRef, useState } from "react";
import imageTest from "../../assets/image-test.png";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { USER_INFO } from "../utils/contants";
import {
  addComment,
  getAllChildComment,
  getAllComment,
  setIsShowChild,
  updateComment,
} from "./details.reducer";

const Comment = ({
  params,
}: {
  params: Readonly<
    Partial<{
      id: string;
    }>
  >;
}) => {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO) as string);
  const [valueInput, setValueInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [replyCommentIdChild, setReplyCommentIdChild] = useState<number | null>(
    null
  );
  const [commentId, setCommentId] = useState<number | null>(null);
  const [commentParentId, setCommentParentId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const { dataComment, dataChildComment, isShowChild } = useAppSelector(
    (state) => state.detailReducer
  );
  const refInp = useRef<InputRef>(null);
  const handleReplyParent = (name: string, id: number) => {
    refInp?.current?.focus();
    setValueInput(`@${name} `);
    setCommentParentId(id);
    setReplyCommentIdChild(id);
  };
  const handleReplyChild = (name: string, id: number) => {
    refInp?.current?.focus();
    setValueInput(`@${name} `);
    setReplyCommentIdChild(id);
  };
  const handleComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isUpdate) {
        dispatch(
          updateComment({
            commentId,
            customerId: userInfo.customerId,
            content: valueInput,
            productId: params.id,
          })
        ).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setValueInput("");
            setIsUpdate(false);
            dispatch(getAllComment(params.id));
            if (commentParentId) {
              dispatch(
                getAllChildComment({
                  commentId: commentParentId,
                  productId: params.id,
                })
              );
            }
          }
        });
        return;
      }
      if (replyCommentIdChild) {
        dispatch(
          addComment({
            content: valueInput,
            customerId: userInfo.customerId,
            productId: params.id,
            star: 4,
            replyCommentId: replyCommentIdChild,
          })
        ).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setReplyCommentIdChild(null);
            setValueInput("");
            dispatch(getAllComment(params.id));
            dispatch(
              getAllChildComment({
                commentId: commentParentId,
                productId: params.id,
              })
            );
          }
        });
      } else {
        dispatch(
          addComment({
            content: valueInput,
            customerId: userInfo.customerId,
            productId: params.id,
            star: 4,
          })
        ).then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setValueInput("");
            dispatch(getAllComment(params.id));
          }
        });
      }
    }
  };
  const handleShowChildComment = (commentId: number) => {
    dispatch(setIsShowChild(commentId));
    setCommentParentId(commentId);
    dispatch(
      getAllChildComment({
        commentId,
        productId: params.id,
      })
    );
  };
  const handleEditComment = (commentId: number, content: string) => {
    setCommentId(commentId);
    refInp?.current?.focus();
    setValueInput(`${content} `);
    setIsUpdate(true);
  };

  return (
    <div className="comment">
      <div>
        <span>Comment</span>
      </div>
      <div>
        {dataComment?.map((item) => (
          <>
            <div className="comment-info">
              <div>
                <Avatar src={imageTest} size={50} />
              </div>
              <div>
                <span>{item?.customerDTO?.fullName}</span>
                <span>3h ago</span>
                <span>{item?.content}</span>
                <div className="edit-reply">
                  {userInfo.customerId === item.customerDTO.customerId ? (
                    <span
                      onClick={() =>
                        handleEditComment(item.commentId, item.content)
                      }
                    >
                      Edit
                    </span>
                  ) : (
                    ""
                  )}
                  <span
                    onClick={() =>
                      handleReplyParent(
                        item.customerDTO.fullName,
                        item.commentId
                      )
                    }
                  >
                    Reply
                  </span>
                </div>
                {!isShowChild[item.commentId] && item?.totalComment > 0 ? (
                  <div
                    className="show-comment-child"
                    onClick={() => handleShowChildComment(item?.commentId)}
                  >
                    <span>{item?.totalComment} đã trả lời</span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {isShowChild[item.commentId] ? (
              <>
                {dataChildComment?.map((item) => (
                  <div className="comment-info comment-child">
                    <div>
                      <Avatar src={imageTest} size={50} />
                    </div>
                    <div>
                      <span>{item?.customerDTO?.fullName}</span>
                      <span>3h ago</span>
                      <span>{item?.content}</span>
                      <div className="edit-reply">
                        {userInfo.customerId === item.customerDTO.customerId ? (
                          <span
                            onClick={() =>
                              handleEditComment(item.commentId, item.content)
                            }
                          >
                            Edit
                          </span>
                        ) : (
                          ""
                        )}
                        <span
                          onClick={() =>
                            handleReplyChild(
                              item.customerDTO.fullName,
                              item.commentId
                            )
                          }
                        >
                          Reply
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              ""
            )}
          </>
        ))}
      </div>
      <div className="inp-comment">
        <Input
          placeholder="Write comment ..."
          ref={refInp}
          value={valueInput}
          onChange={(e) => setValueInput(e.target.value)}
          onKeyDown={handleComment}
        />
      </div>
    </div>
  );
};

export default Comment;
