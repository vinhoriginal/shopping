import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN_KEY } from "../page/utils/contants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8082",
});
instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const configAxios = config;
  if (configAxios && configAxios.headers && token) {
    configAxios.headers.Authorization = `Bearer ${token}`;
  }
  return configAxios;
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.status || (error.response ? error.response.status : 0);
    if (status === 401) {
      toast.error("Hết phiên đăng nhập", { toastId: 401 });
      localStorage.clear();
      redirect("/login");
    }
    if (status === 400) {
      const errMessage: any = error.response?.data;
      toast.error(errMessage.messages[0], { toastId: 400 });
    }
    return Promise.reject(error);
  }
);

export default instance;

export const API_BASE_URL = 'http://localhost:8082';
export const OAUTH2_REDIRECT_URI = 'http://localhost:3000/oauth2/redirect'
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;