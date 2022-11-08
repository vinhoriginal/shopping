import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDetailProducts } from "../../model/detail.model";
import { IFormBodyProducts } from "../../model/products.model";

const initState = {
  dataFeatureProduct: [] as IFormDetailProducts[],
  dataTopProduct: [] as IFormDetailProducts[],
  dataSearchProducts: [] as IFormDetailProducts[],
};
export const getDataFeatureProduct = createAsyncThunk(
  "home/getDataFeatureProduct",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    return result;
  }
);
export const getDataTop = createAsyncThunk(
  "home/getDataTop",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    return result;
  }
);
export const searchDataProducts = createAsyncThunk(
  "home/searchDataProducts",
  async (data: IFormBodyProducts) => {
    const result = await instance.post("/api/v1/customer/product", data);
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
      })
      .addCase(getDataTop.fulfilled, (state, action) => {
        state.dataTopProduct = action.payload.data.data.content;
      })
      .addCase(searchDataProducts.fulfilled, (state, action) => {
        state.dataSearchProducts = action.payload.data.data.content;
      });
  },
});
const homeReducer = homeSlice.reducer;
export default homeReducer;
