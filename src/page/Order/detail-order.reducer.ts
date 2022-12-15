import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormDetailOrder } from "../../model/order.model";

const initState = {
  dataDetailOrder: {} as IFormDetailOrder,
};

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
  extraReducers(builder) {
    builder.addCase(getDetailOrder.fulfilled, (state, action) => {
      state.dataDetailOrder = action.payload.data.data;
    });
  },
});

const detailOrderReducer = detailOrderSlice.reducer;
export default detailOrderReducer;
