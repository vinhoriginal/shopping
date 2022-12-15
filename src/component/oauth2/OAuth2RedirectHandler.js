import React, { Component, useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../contants/axios.config";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { TOKEN_KEY, USER_INFO } from "../../page/utils/contants";
import path from "../../router/path";
const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.search) {
    //   const newPayload = res.payload;
      const token = location.search.split("=")[1];
      localStorage.setItem(TOKEN_KEY, token);
    //   localStorage.setItem(
    //     USER_INFO,
    //     JSON.stringify(newPayload.data.customerDTO)
    //   );
      navigate(path.home);
    } else {
      navigate(path.login);
    }
  }, [location]);
  return <div></div>;
};
export default OAuth2RedirectHandler;
