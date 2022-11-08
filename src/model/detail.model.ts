export interface IFormComment {
  hasChild: boolean;
  status: number;
  totalComment: number;
  commentId: number;
  content: string;
  customerDTO: IFormCustomerDTO;
  isReply?: boolean;
  replyTo?: string;
  lastModifiedBy:string
  lastModifiedDate:number | Date
}
export interface IFormCustomerDTO {
  allowReceiveExcel: string;
  allowReceivePdf: string;
  birthday: string;
  createdBy: string;
  createdDate: string;
  customerId: string;
  deptId: string;
  deptName: string;
  email: string;
  employeeCode: string;
  fullName: string;
  id: string;
  idNumber: string;
  ipAddress: string;
  isViettel: string;
  issueBy: string;
  issueDate: string;
  lastModifiedBy: string;
  lastModifiedDate: string;
  passwordRaw: string;
  phone: string;
  roles: any[];
  status: string;
  username: string;
}
export interface IFormDetailProducts {
  code: string;
  description: string;
  expiredDate: string;
  id: number;
  image: string;
  imageSecond: string;
  images: string[];
  make: {
    code: string;
    id: number;
    name: string;
  };
  name: string;
  packingType: string;
  path: string;
  price: number;
  productAttribute: string;
  productType: {
    id: number;
    name: string;
  };
  star: number;
  status: number;
  stockQty: number;
  weight: number;
  arrStar?: any[];
  oldPrice?: string;
}

export interface IFormDataGetAllChild {
  productId: string | undefined;
  commentId: number | null;
}

export interface IFormDataAddComment {
  customerId: number;
  content: string;
  star: number | null;
  productId: string | undefined;
  replyCommentId?: number;
}

export interface IFormUpdateComment {
  commentId: number | null;
  customerId: number | string;
  productId: string | undefined;
  content: string;
}
