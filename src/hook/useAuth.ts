const useAuth = () => {
  const auth = localStorage.getItem("token");
  if (!auth) {
    return false;
  }
  return true;
};

export default useAuth;
