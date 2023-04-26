import { Outlet } from "react-router-dom";
import Header from "../../common/Header/Header";
import useAuthContext from "../../../hooks/useAuthContext";
import Loading from "../../common/Loading/Loading";
import Sidebar from "../../common/Sidebar/Sidebar";
import { useCallback, useState } from "react";

const PrivateMainLayout = () => {
  const { loadingPrev } = useAuthContext();
  const [showSidebar, setShowSidebar] = useState(false);
  const handleShowSidebar = useCallback((state: boolean) => {
    setShowSidebar(state);
  }, []);
  if (loadingPrev) return <Loading />;
  return (
    <div className="flex bg-zinc-50">
      <Sidebar
        handleShowSidebar={handleShowSidebar}
        showSidebar={showSidebar}
      />
      <div className="flex-grow">
        <Header handleShowSidebar={handleShowSidebar} />
        <main className="mt-[50px] min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-80px)] md:mt-0 overflow-auto p-4 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PrivateMainLayout;
