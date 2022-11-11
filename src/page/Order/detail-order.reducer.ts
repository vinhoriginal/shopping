import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {};

export const getDetailOrder = createAsyncThunk(
  "detailOrder/getDetailOrder",
  async (id: number | string) => {
    const result = await instance.get(`/api/v2/customer/order/detail/${id}`);
    return result;
  }
);

const detailOrderSlice = createSlice({
  name: "detailOrder",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {},
});

const detailOrderReducer = detailOrderSlice.reducer;
export default detailOrderReducer;
