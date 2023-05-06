import { useLocation } from "react-router-dom";
import useGetPins from "../../../hooks/useGetPins";
import Spinner from "../../../components/common/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout";

const SearchPage = () => {
  const {
    state: { searchTerm },
  } = useLocation();
  const { pins, loading, deletePin, savePin } = useGetPins({
    searchText: searchTerm || "",
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />;
};

export default SearchPage;
