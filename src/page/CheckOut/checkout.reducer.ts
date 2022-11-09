import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../contants/axios.config";

const initState = {
  dataProvince: [],
  dataDistrict: [],
  dataWard: [],
};
export const getProvince = createAsyncThunk(
  "checkout/getProvince",
  async () => {
    const result = await instance.get("api/v1/web-service/province/list");
    return result;
  }
);

export const getDataDistrict = createAsyncThunk(
  "checkout/getDataDistrict",
  async (id: number) => {
    const result = await instance.get(
      `/api/v1/web-service/district/list?provinceId=${id}`
    );
    return result;
  }
);

export const getDataWard = createAsyncThunk(
  "checkout/getDataWard",
  async (id: number) => {
    const result = await instance.get(
      `/api/v1/web-service/district/list?provinceId=${id}`
    );
    return result;
  }
);

export const shipFee = createAsyncThunk(
  "checkout/shipFee",
  async (data: any) => {
    const result = await axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
      data,
      {
        headers: {
          token: "716d97f1-47f3-11ed-ad26-3a4226f77ff0",
        },
      }
    );
    return result;
  }
);

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProvince.fulfilled, (state, action) => {
        state.dataProvince = action.payload.data;
      })
      .addCase(getDataDistrict.fulfilled, (state, action) => {
        state.dataDistrict = action.payload.data;
      })
      .addCase(getDataWard.fulfilled, (state, action) => {
        state.dataWard = action.payload.data;
      });
  },
});

const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
