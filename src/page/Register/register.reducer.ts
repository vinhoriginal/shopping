import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormRegister } from "../../model/register.model";

const initState = {
  isLoading: false,
};
export const register = createAsyncThunk(
  "register/register",
  async (data: IFormRegister) => {
    return await instance.post("/api/v1/customer/register", data);
  }
);
const registerSlice = createSlice({
  name: "register",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
const registerReducer = registerSlice.reducer;
export default registerReducer;
