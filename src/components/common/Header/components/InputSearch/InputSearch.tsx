import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  return (
    <div className="md:flex justify-start items-center w-full pr-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm hidden">
      <IoMdSearch fontSize={21} />
      <input
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
        value={searchTerm}
        onFocus={() =>
          navigate("/search", {
            state: { searchTerm },
          })
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate("/search", {
              state: { searchTerm },
            });
          }
        }}
        className="p-2 w-full bg-white outline-none"
      />
    </div>
  );
};

export default InputSearch;
