import Pagination, { PaginationConfig } from "antd/lib/pagination";
import React from "react";

interface IFormProps {
  page: number;
  pageSize: number;
  total: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}
const PaginationPage = ({
  page,
  pageSize,
  setPage,
  total,
  setPageSize,
}: IFormProps) => {
  const options: PaginationConfig = {
    total,
    showTotal: (total, range) =>
      `Hiển thị ${range[0]} - ${range[1]} của ${total} bản ghi`,
    onChange: (page) => {
      console.log("page", page);
      setPage(page);
    },
    onShowSizeChange: (_, pageSize) => setPageSize(pageSize),
    pageSize,
    current: page,
  };
  return (
    <div className="custom-pagination">
      <Pagination {...options} />
    </div>
  );
};

export default PaginationPage;
