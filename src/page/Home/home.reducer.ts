import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDataFeatureProduct } from "../../model/feature-product.model";

const initState = {
  dataFeatureProduct: [] as IFormDataFeatureProduct[],
  dataTopProduct: [] as IFormDataFeatureProduct[],
};
export const getDataFeatureProduct = createAsyncThunk(
  "home/getDataFeatureProduct",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    const newArr = result.data.data.map((item: any) => {
      return {
        name: item.name,
        price: item.price,
        path: item.path[0],
        id: Date.now(),
      };
    });
    return newArr;
  }
);
export const getDataTop = createAsyncThunk(
  "home/getDataTop",
  async (data: { enums: string }) => {
    const result = await instance.post("/api/v1/customer/product", data);
    const newArr = result.data.data.map((item: any) => {
      return {
        name: item.name,
        price: item.price,
        path: item.path[0],
        id: Date.now(),
      };
    });
    return newArr;
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
