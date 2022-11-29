import { CheckboxValueType } from "antd/lib/checkbox/Group";

export interface IFormSearch {
  valueSearch: IFormBodyProducts;
  total: {
    page: number;
    pageSize: number;
  };
}
export interface IFormBodyProducts {
  enums: string;
  name: string;
  brandId: CheckboxValueType[];
  categoryId: CheckboxValueType[];
  star: CheckboxValueType[];
  fromPrice: string;
  toPrice: string;
  page?: number;
  pageSize?: number;
}

export interface IFormDataBrand {
  code: string;
  description: string;
  id: string;
  isDeleted: string;
  name: string;
  status: string;
}

export interface IFormCategory {
  code: string;
  description: string;
  id: string;
  isDeleted: string;
  name: string;
  parentId: string;
  status: string;
}
