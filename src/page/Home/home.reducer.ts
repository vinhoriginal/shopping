import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDataFeatureProduct } from "../../model/feature-product.model";
import { IFormBodyProducts } from "../../model/products.model";

const initState = {
  dataFeatureProduct: [] as IFormDataFeatureProduct[],
  dataTopProduct: [] as IFormDataFeatureProduct[],
};
export const getDataFeatureProduct = createAsyncThunk(
  "home/getDataFeatureProduct",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    const newArr: any[] = [];
    result.data.data.forEach((item: any, index: number) => {
      if (item.images && item?.images.length > 0) {
        newArr.push({
          name: item?.name,
          price: item?.price,
          image: item.images[0],
          id: index,
        });
      }
    });
    return newArr;
  }
);
export const getDataTop = createAsyncThunk(
  "home/getDataTop",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    const newArr: any[] = [];
    result.data.data.forEach((item: any, index: number) => {
      if (item.images && item?.images.length > 0) {
        newArr.push({
          name: item?.name,
          price: item?.price,
          image: item.images[0],
          id: index,
        });
      }
    });
    return newArr;
  }
);
export const searchDataProducts = createAsyncThunk(
  "home/searchDataProducts",
  async (data: IFormBodyProducts) => {
    const result = await instance.post("/api/v1/customer/product", data);
    console.log("result", result);
  }
);
const homeSlice = createSlice({
  name: "home",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getDataFeatureProduct.fulfilled, (state, action) => {
        state.dataFeatureProduct = action.payload;
      })
      .addCase(getDataTop.fulfilled, (state, action) => {
        state.dataTopProduct = action.payload;
      });
  },
});
const homeReducer = homeSlice.reducer;
export default homeReducer;
