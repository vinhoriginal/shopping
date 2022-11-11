import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormLogin } from "../../model/login.model";

const initState = {
  isLoading: false,
};

export const login = createAsyncThunk(
  "Login/Login",
  async (data: IFormLogin) => {
    return await instance.post("/api/v1/customer", data);
  }
);

export const forgotPassword = createAsyncThunk(
  "login/forgotPassword",
  async (email: string) => {
    const result = await instance.post(
      `/api/v1/customer/send-verify-code?email=`,
      email
    );
    return result;
  }
);

const loginSlice = createSlice({
  name: "Login",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const loginReducer = loginSlice.reducer;
export default loginReducer;
