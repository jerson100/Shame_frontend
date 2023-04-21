import { HiMenu } from "react-icons/hi";
import Logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import User from "./components/User";
import { SidebarContentProps } from "../Sidebar/sidebar.types";
import InputSearch from "./components/InputSearch/InputSearch";

const Header = ({ handleShowSidebar }: SidebarContentProps) => {
  return (
    <header className="border-b-2 border-zinc-100 fixed left-0 top-0 w-full z-10 h-[50px] md:h-[80px] flex md:sticky">
      <div className="px-4 flex no-wrap justify-between items-center w-full">
        <HiMenu
          fontSize={32}
          className="cursor-pointer md:hidden"
          onClick={() => handleShowSidebar(true)}
        />
        <Link to="/" className="md:hidden">
          <img src={Logo} alt="logo de la aplicación" className="w-28" />
        </Link>
        <InputSearch />
        <User />
      </div>
    </header>
  );
};

export default Header;
