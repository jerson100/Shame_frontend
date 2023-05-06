import { Navigate, Outlet } from "react-router-dom";

import useAuthContext from "../../../hooks/useAuthContext";

const PrivateMainLayout = () => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateMainLayout;
