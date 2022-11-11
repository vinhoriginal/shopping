import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {
  dataHistoryOrder: [],
};
export const getListHistoryOrder = createAsyncThunk(
  "history/getListHistoryOrder",
  async (id: string) => {
    const result = await instance.get(
      `/api/v2/customer/order?customerId=${id}`
    );
    console.log("result", result);
    return result;
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getListHistoryOrder.fulfilled, (state, action) => {
      state.dataHistoryOrder = action.payload.data.data;
    });
  },
});

const historyReducer = historySlice.reducer;
export default historyReducer;
