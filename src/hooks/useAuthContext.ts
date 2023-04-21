import { useContext } from "react";
import { UserAuthContext } from "../contexts/authContext";

const useAuthContext = () => {
  const context = useContext(UserAuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};

export default useAuthContext;
