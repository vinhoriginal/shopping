import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDetailProducts } from "../../model/detail.model";
import {
  IFormCategory,
  IFormDataBrand,
  IFormSearch,
} from "../../model/products.model";

const initState = {
  dataFeatureProduct: [] as IFormDetailProducts[],
  dataTopProduct: [] as IFormDetailProducts[],
  dataSearchProducts: [] as IFormDetailProducts[],
  dataBrand: [] as IFormDataBrand[],
  dataCategory: [] as IFormCategory[],
  total: 0,
  totalFeature: 0,
  totalLatest: 0,
};

interface IFormSearchData {
  value: { enums: string };
  total: { page: number; pageSize: number };
}
export const getDataFeatureProduct = createAsyncThunk(
  "home/getDataFeatureProduct",
  async (data: IFormSearchData) => {
    const result = await instance.post(
      `/api/v1/customer/product?page=${data.total.page}&size=${data.total.pageSize}`,
      data.value
    );
    return result;
  }
);
export const getDataTop = createAsyncThunk(
  "home/getDataTop",
  async (data: IFormSearchData) => {
    const result = await instance.post(
      `/api/v1/customer/product?page=${data.total.page}&size=${data.total.pageSize}`,
      data.value
    );
    return result;
  }
);
export const searchDataProducts = createAsyncThunk(
  "home/searchDataProducts",
  async (data: IFormSearch) => {
    const result = await instance.post(
      `/api/v1/customer/product?page=${data.total.page}&size=${data.total.pageSize}`,
      data.valueSearch
    );
    return result;
  }
);

export const getBrand = createAsyncThunk("home/getBrand", async () => {
  const result = await instance.get("/api/v1/make/get-list");
  return result;
});

export const getCategory = createAsyncThunk("home/getCategory", async () => {
  const result = await instance.get("/api/v1/product-type/get-list");
  return result;
});

const homeSlice = createSlice({
  name: "home",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDataFeatureProduct.fulfilled, (state, action) => {
        state.dataFeatureProduct = action.payload.data.data.content;
        state.totalFeature = action.payload.data.data.totalElements;
      })
      .addCase(getDataTop.fulfilled, (state, action) => {
        state.dataTopProduct = action.payload.data.data.content;
        state.totalLatest = action.payload.data.data.totalElements;
      })
      .addCase(searchDataProducts.fulfilled, (state, action) => {
        state.dataSearchProducts = action.payload.data.data.content;
        state.total = action.payload.data.data.totalElements;
      })
      .addMatcher(isFulfilled(getBrand, getCategory), (state, action) => {
        if (action.type === "home/getBrand/fulfilled") {
          state.dataBrand = action.payload.data.data;
        }
        if (action.type === "home/getCategory/fulfilled") {
          state.dataCategory = action.payload.data.data;
        }
      });
  },
});
const homeReducer = homeSlice.reducer;
export default homeReducer;
