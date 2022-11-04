import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import {
  IFormComment,
  IFormDataAddComment,
  IFormDataGetAllChild,
  IFormDetailProducts,
  IFormUpdateComment,
} from "../../model/detail.model";

const initState = {
  dataComment: [] as IFormComment[],
  dataDetail: {} as IFormDetailProducts,
  dataChildComment: [] as IFormComment[],
  isShowChild: {} as any,
  dataRelated: [] as IFormDetailProducts[],
};

export const getAllComment = createAsyncThunk(
  "detail/getAllComment",
  async (productId: string | undefined) => {
    const result = await instance.get(
      `/api/v2/customer/comment/get-all?productId=${productId}`
    );
    return result;
  }
);

export const getDetailProducts = createAsyncThunk(
  "detail/getDetailProducts",
  async (id: string | undefined) => {
    const result = await instance.get(`/api/v1/customer/product/detail/${id}`);
    return result;
  }
);

export const addComment = createAsyncThunk(
  "detail/addComment",
  async (data: IFormDataAddComment) => {
    const result = await instance.post(
      "/api/v2/customer/comment/add-comment",
      data
    );
    return result;
  }
);

export const getAllChildComment = createAsyncThunk(
  "detail/getAllChildComment",
  async (data: IFormDataGetAllChild) => {
    const result = await instance.get(
      `/api/v2/customer/comment/get-all-child?productId=${data.productId}&commentId=${data.commentId}`
    );
    return result;
  }
);

export const updateComment = createAsyncThunk(
  "detal/updateComment",
  async (data: IFormUpdateComment) => {
    const result = await instance.post("/api/v2/customer/comment/update", data);
    return result;
  }
);

export const getDataRelated = createAsyncThunk(
  "detail/getDataRelated",
  async (data: { enums: string }) => {
    const result = await instance.post("api/v1/customer/product", data);
    return result;
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: initState,
  reducers: {
    setIsShowChild: (state, action) => {
      state.isShowChild[action.payload] = !state.isShowChild[action.payload];
    },
    resetIsShowChild: (state) => {
      state.isShowChild = {}
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllComment.fulfilled, (state, action) => {
        state.dataComment = action.payload.data.data;
      })
      .addCase(getDetailProducts.fulfilled, (state, action) => {
        state.dataDetail = action.payload.data.data;
      })
      .addCase(getAllChildComment.fulfilled, (state, action) => {
        state.dataChildComment = action.payload.data.data;
      })
      .addCase(getDataRelated.fulfilled, (state, action) => {
        state.dataRelated = action.payload.data.data.content;
      });
  },
});

const detailReducer = detailSlice.reducer;
export const { setIsShowChild, resetIsShowChild } = detailSlice.actions;
export default detailReducer;
