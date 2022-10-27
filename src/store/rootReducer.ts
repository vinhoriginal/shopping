import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../page/Login/login.reducer";
import registerReducer from "../page/Register/register.reducer";
import homeReducer from "../page/Home/home.reducer";
import layoutReducer from "../page/Layout/layout.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  homeReducer,
  layoutReducer
});
export default rootReducer;
