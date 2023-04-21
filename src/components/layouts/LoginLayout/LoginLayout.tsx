import { Navigate } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import { FunctionComponent, PropsWithChildren } from "react";
import Loading from "../../common/Loading/Loading";

const LoginLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { loadingPrev, isLogged } = useAuthContext();
  if (loadingPrev) {
    return <Loading />;
  }
  if (isLogged) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default LoginLayout;
