import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {
  isLoading: false,
};

export const sendOTP = createAsyncThunk("forgot/sendOPT", async (data: any) => {
  const result = await instance.get(
    `/api/v1/customer/send-verify-code?email=${data}`
  );
  return result;
});

export const changePassword = createAsyncThunk(
  "forgot/changePassword",
  async (data: any) => {
    const result = await instance.post(
      "/api/v1/customer/forgot-password",
      data
    );
    return result;
  }
);

const forgotSlice = createSlice({
  name: "forgot",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendOTP.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(sendOTP.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const forgotReducer = forgotSlice.reducer;
export default forgotReducer;
