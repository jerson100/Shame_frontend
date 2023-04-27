import { motion, AnimatePresence } from "framer-motion";
import useMediaQuery from "../../../hooks/useMediaQuery";
import { SidebarVariants, bgVariants } from "./sidebar.variants";
import SidebarContent from "./components/SidebarContent";
import { useEffect } from "react";
import { SidebarProps } from "./sidebar.types";

const Sidebar = ({ handleShowSidebar, showSidebar }: SidebarProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  useEffect(() => {
    if (isDesktop) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    } else {
      document.documentElement.style.overflow = showSidebar ? "hidden" : "";
      document.body.style.overflow = showSidebar ? "hidden" : "";
    }
  }, [isDesktop, showSidebar]);
  return (
    <AnimatePresence>
      {(showSidebar || isDesktop) && (
        <>
          <motion.div
            className={`fixed w-48 lg:w-60 h-screen border-r border-zinc-100 md:relative z-30 bg-white`}
            variants={SidebarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SidebarContent handleShowSidebar={handleShowSidebar} />
          </motion.div>
          {!isDesktop && (
            <motion.div
              variants={bgVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed md:hidden bg-black bg-opacity-50 left-0 right-0 top-0 bottom-0 z-20"
              onClick={() => handleShowSidebar(false)}
            ></motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
