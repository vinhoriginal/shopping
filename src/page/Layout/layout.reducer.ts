import { createSlice } from "@reduxjs/toolkit";
import { PRODUCTS_ITEM } from "../utils/contants";

const initState = {
  itemProducts: JSON.parse(localStorage.getItem(PRODUCTS_ITEM) as string) || [],
};
const layoutSlice = createSlice({
  name: "layout",
  initialState: initState,
  reducers: {
    setItemProducts: (state, action) => {
      state.itemProducts = state.itemProducts.concat(action.payload);
    },
  },
});

const layoutReducer = layoutSlice.reducer;
export const { setItemProducts } = layoutSlice.actions;
export default layoutReducer;
