export interface IFormLogin {
  username: string;
  password: string;
}

export interface IFormValueMemo {
  path: string;
  replyCommentIdChild: number | null;
  commentId: number | null;
  commentParentId: number | null;
}
