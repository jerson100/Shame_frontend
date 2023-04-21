import { memo } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../../../assets/logo.png";
import { RiHomeFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { categories } from "../../../../../configs/categories";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { SidebarContentProps } from "../../sidebar.types";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize";

const SidebarContent = ({ handleShowSidebar }: SidebarContentProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-[50px] px-5 flex items-center shrink-0 md:h-[80px]">
        <Link to="/">
          <img
            src={Logo}
            alt="logo de la aplicación"
            className="w-28 md:w-36"
          />
        </Link>
      </div>
      <div className="flex-grow gap-4 flex flex-col overflow-hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? isActiveStyle : isNotActiveStyle
          }
        >
          <RiHomeFill />
          <span>Home</span>
        </NavLink>
        <div className="flex flex-col overflow-y-auto flex-grow gap-4">
          <p className="md:mt-2 px-5 text-base 2xl:text-xl bg-white">
            Discover categories
          </p>
          <div className="flex flex-col overflow-y-auto gap-4">
            {categories.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.name}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={() => handleShowSidebar(false)}
                key={category.name}
              >
                <img
                  src={category.image}
                  className="w-8 h-8 rounded-full shadow-sm"
                />
                {category.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <UserProfile handleShowSidebar={handleShowSidebar} />
    </div>
  );
};

const UserProfile = memo(({ handleShowSidebar }: SidebarContentProps) => {
  const { user } = useAuthContext();
  return (
    <>
      {user && (
        <Link
          to={`profile/${user._id}`}
          className="flex my-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={() => handleShowSidebar(false)}
        >
          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
            alt="user-profile"
          />
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {user.user}
          </p>
          <IoIosArrowForward />
        </Link>
      )}
    </>
  );
});

export default SidebarContent;
