import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../page/Login/login.reducer";
import registerReducer from "../page/Register/register.reducer";

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
});
export default rootReducer;
