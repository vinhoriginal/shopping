import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {
  dataComment: [] as any[],
};

export const getAllComment = createAsyncThunk(
  "detail/getAllComment",
  async (productId: number) => {
    const result = await instance.get(
      `/api/v2/customer/comment/get-all?productId=${productId}`
    );
    return result
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getAllComment.fulfilled, (state,action) => {
      state.dataComment = action.payload.data
    })
  },
});

const detailReducer = detailSlice.reducer;
export default detailReducer;
