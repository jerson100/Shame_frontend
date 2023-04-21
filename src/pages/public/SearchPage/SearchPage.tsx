import { useLocation } from "react-router-dom";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";
import Masonry from "../../../components/common/Masonry/Masonry";
import Spinner from "../../../components/common/Spinner";

const SearchPage = () => {
  const {
    state: { searchTerm },
  } = useLocation();
  const { pins, loading } = useGetPins({
    searchText: searchTerm || "",
    mode: ModeFilterGetPins.SEARCH,
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <div>
      <Masonry pins={pins} />
    </div>
  );
};

export default SearchPage;
