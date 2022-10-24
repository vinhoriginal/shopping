import { TOKEN_KEY } from "../page/utils/contants";

const useAuth = () => {
  const auth = localStorage.getItem(TOKEN_KEY);
  if (!auth) {
    return false;
  }
  return true;
};

export default useAuth;
