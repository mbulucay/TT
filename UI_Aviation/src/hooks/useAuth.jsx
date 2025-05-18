import { useSelector } from "react-redux";

const useAuth = () => {
  const { isLoggedIn, access_token } = useSelector((state) => state.auth);

  return isLoggedIn && access_token !== "";
};

export default useAuth;
