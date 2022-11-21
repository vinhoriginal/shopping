import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";

const initState = {
  dataListLike: [] as any[],
};

export const getDataListLike = createAsyncThunk(
  "listlike/getDataListLike",
  async (data: any) => {
    const result = await instance.get(
      `/api/v2/customer/favorite/list?customerId=${data}`
    );
    console.log("result", result);
    return result;
  }
);

export const cancelLike = createAsyncThunk('listLike/cancelLike',async (data:any) => {
    const result = await instance.post('/api/v2/customer/favorite/delete', data)
    return result
})

const listLikeSlice = createSlice({
  name: "listlike",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getDataListLike.fulfilled, (state,action) => {
        state.dataListLike = action.payload.data.data.productDTOS
    })
  },
});

const listLikeReducer = listLikeSlice.reducer;
export default listLikeReducer;
