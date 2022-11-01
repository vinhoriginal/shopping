import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../contants/axios.config";
import { IFormBodyAddToCard } from "../../model/layout.model";

const initState = {
  itemProducts: null as any,
};

export const addToCard = createAsyncThunk(
  "layout/addToCard",
  async (data: IFormBodyAddToCard) => {
    const result = await instance.post(
      "/api/v2/customer/cart/add-to-cart",
      data
    );
    return result;
  }
);

export const viewCart = createAsyncThunk("layout/viewCart", async () => {
  const result = await instance.get("/api/v2/customer/cart/view-cart");
  return result.data.data;
});

export const removeCart = createAsyncThunk(
  "layout/removeCart",
  async (data: IFormBodyAddToCard) => {
    const result = await instance.post(
      "/api/v2/customer/cart/remove-cart",
      data
    );
    return result;
  }
);

export const emptyCart = createAsyncThunk(
  "layout/emptyCart",
  async (data: any) => {
    const result = await instance.post(
      "/api/v2/customer/cart/empty-cart",
      data
    );
    return result;
  }
);

const layoutSlice = createSlice({
  name: "layout",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(viewCart.fulfilled, (state, action) => {
      state.itemProducts = action.payload;
    });
  },
});

const layoutReducer = layoutSlice.reducer;
export default layoutReducer;
