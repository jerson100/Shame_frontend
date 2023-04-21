import { useParams } from "react-router-dom";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";
import Masonry from "../../../components/common/Masonry";
import Spinner from "../../../components/common/Spinner";

const CategoryPage = () => {
  const { category } = useParams();
  const { pins, loading } = useGetPins({
    searchText: category || "",
    mode: ModeFilterGetPins.CATEGORY,
  });
  if (loading) return <Spinner message="Cargando imágenes" />;
  return (
    <div>
      <Masonry pins={pins} />
    </div>
  );
};

export default CategoryPage;
