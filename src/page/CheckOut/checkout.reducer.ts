import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../contants/axios.config";

const initState = {
  dataProvince: [],
  dataDistrict: [],
  dataWard: [],
  dataShipFee: [] as any[],
  dataCalculate: null as any,
};
export const getProvince = createAsyncThunk(
  "checkout/getProvince",
  async () => {
    const result = await instance.get("api/v1/web-service/province/list");
    const newArr = result.data.data.map((item: any) => {
      return {
        value: item.provinceID,
        label: item.provinceName,
      };
    });
    return newArr;
  }
);

export const getDataDistrict = createAsyncThunk(
  "checkout/getDataDistrict",
  async (id: number) => {
    const result = await instance.get(
      `/api/v1/web-service/district/list?provinceId=${id}`
    );
    const newArr = result.data.data.map((item: any) => {
      return {
        value: item.districtID,
        label: item.districtName,
      };
    });
    return newArr;
  }
);

export const getDataWard = createAsyncThunk(
  "checkout/getDataWard",
  async (id: number) => {
    const result = await instance.get(
      `/api/v1/web-service/ward/list?districtId=${id}`
    );
    const newArr = result.data.data.map((item: any) => {
      return {
        value: item.wardCode,
        label: item.wardName,
      };
    });
    return newArr;
  }
);

export const updateUserInfo = createAsyncThunk(
  "checkout/updateUserInfo",
  async (data: FormData) => {
    const result = await instance.post("/api/v1/customer/update", data);
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

export const calculateShip = createAsyncThunk(
  "checkout/ calculateShip",
  async (data: any) => {
    const result = axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      data,
      {
        headers: {
          token: "716d97f1-47f3-11ed-ad26-3a4226f77ff0",
        },
      }
    );
    console.log("result", result);
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
        state.dataProvince = action.payload;
      })
      .addCase(getDataDistrict.fulfilled, (state, action) => {
        state.dataDistrict = action.payload;
      })
      .addCase(getDataWard.fulfilled, (state, action) => {
        state.dataWard = action.payload;
      })
      .addCase(shipFee.fulfilled, (state, action) => {
        state.dataShipFee = action.payload.data.data;
      })
      .addCase(calculateShip.fulfilled, (state, action) => {
        state.dataCalculate = action.payload.data.data;
      });
  },
});

const checkoutReducer = checkoutSlice.reducer;
export default checkoutReducer;
