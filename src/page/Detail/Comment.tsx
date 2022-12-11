import { Avatar, Input, InputRef } from "antd";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { toast } from "react-toastify";
import imageTest from "../../assets/image-test.png";
import { IFormValueMemo } from "../../model/login.model";
import path from "../../router/path";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  COLOR_SPAN,
  FONT_FAMILY,
  MARGIN_BOTTOM,
  MARGIN_LEFT,
  TOKEN_KEY,
  USER_INFO,
  VALUE_INP_COMMENT,
  VALUE_MEMO,
} from "../utils/contants";
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
  const valueMemo: IFormValueMemo = JSON.parse(
    localStorage.getItem(VALUE_MEMO) as string
  );
  const [starArr, setStarArr] = useState(() =>
    Array.from({ length: 5 }, (_, index) => ({
      value: index + 1,
      star: require("../../assets/rate-none.png"),
    }))
  );
  const [valueStar, setValueStar] = useState<number | null>(null);
  const [valueInput, setValueInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [replyCommentIdChild, setReplyCommentIdChild] = useState<number | null>(
    null
  );
  const [commentId, setCommentId] = useState<number | null>(null);
  const [commentParentId, setCommentParentId] = useState<number | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { dataComment, dataChildComment, isShowChild } = useAppSelector(
    (state) => state.detailReducer
  );
  const location = useLocation();
  const refInp = useRef<InputRef>(null);
  useEffect(() => {
    if (localStorage.getItem(VALUE_INP_COMMENT)) {
      setValueInput(localStorage.getItem(VALUE_INP_COMMENT) as string);
      refInp?.current?.focus();
    }
    if (valueMemo && Object.keys(valueMemo).length) {
      setReplyCommentIdChild(valueMemo.replyCommentIdChild);
      setCommentId(valueMemo.commentId);
      setCommentParentId(valueMemo.commentParentId);
    }
    localStorage.removeItem(VALUE_INP_COMMENT);
    localStorage.removeItem(VALUE_MEMO);
  }, [refInp, valueMemo]);
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
    const token = localStorage.getItem(TOKEN_KEY);
    if (e.key === "Enter") {
      if (!token) {
        localStorage.setItem(
          VALUE_MEMO,
          JSON.stringify({
            path: location.pathname,
            replyCommentIdChild,
            commentId,
            commentParentId,
          })
        );
        localStorage.setItem(VALUE_INP_COMMENT, valueInput);
        toast.error("Vui lòng đăng nhập");
        navigate(path.login);
        return;
      }
      if (isUpdate) {
        dispatch(
          updateComment({
            commentId,
            customerId: userInfo?.customerId || userInfo?.userId,
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
            customerId: userInfo?.customerId || userInfo?.userId,
            productId: params.id,
            star: valueStar,
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
            customerId: userInfo?.customerId || userInfo?.userId,
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
  const handleChangeStar = (value: number) => {
    setValueStar(value)
    const newArrStar: {
      value: number;
      star: any;
    }[] = Array.from({ length: value }, (_, index) => ({
      value: index + 1,
      star: require("../../assets/rate.png"),
    }));
    const newArrNonstar: {
      value: number;
      star: any;
    }[] = Array.from({ length: 5 - value }, (_, index) => ({
      value: value + index + 1,
      star: require("../../assets/rate-none.png"),
    }));
    setStarArr(newArrStar.concat(newArrNonstar));
  };

  return (
    <div className="comment">
      <div className="title-comment" style={{marginBlock:MARGIN_BOTTOM}}>
        <span style={{fontFamily:FONT_FAMILY}}>Comment</span>
        <div>
          {starArr.map((item) => (
            <img
              src={item.star}
              key={item.value}
              alt="star"
              style={{ cursor: "pointer", width: "24px", marginRight: "12px" }}
              onClick={() => handleChangeStar(item.value)}
            />
          ))}
        </div>
      </div>
      <div>
        {dataComment?.map((item) => (
          <div key={item.commentId}>
            <div className="comment-info">
              <div>
                <Avatar src={imageTest} size={50} />
              </div>
              <div>
                <span>{item?.customerDTO?.fullName}</span>
                <span>
                  <ReactTimeAgo date={item.lastModifiedDate} />
                </span>
                <span>{item?.content}</span>
                <div className="edit-reply">
                  {(userInfo?.customerId || userInfo?.userId) === (item?.customerDTO?.customerId || item?.customerDTO?.userId) ? (
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
                      <span style={{fontFamily:FONT_FAMILY}}>{item?.customerDTO?.fullName}</span>
                      <span>
                        <ReactTimeAgo date={item.lastModifiedDate} />
                      </span>
                      <span>{item?.content}</span>
                      <div className="edit-reply">
                        {(userInfo?.customerId || userInfo?.userId) === (item?.customerDTO?.customerId || item?.customerDTO?.userId) ? (
                          <span style={{color:COLOR_SPAN}}
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
          </div>
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
