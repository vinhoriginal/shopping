import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../page/Login/login.reducer";
import registerReducer from "../page/Register/register.reducer";
import homeReducer from "../page/Home/home.reducer";
import layoutReducer from "../page/Layout/layout.reducer";
import detailReducer from "../page/Detail/details.reducer";
import checkoutReducer from "../page/CheckOut/checkout.reducer";
import historyReducer from "../page/History/history.reducer";
import detailOrderReducer from "../page/Order/detail-order.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  homeReducer,
  layoutReducer,
  detailReducer,
  checkoutReducer,
  historyReducer,
  detailOrderReducer,
});
export default rootReducer;
