import { useParams } from "react-router-dom";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";
import Masonry from "../../../components/common/Masonry";
import Spinner from "../../../components/common/Spinner";

const CategoryPage = () => {
  const { category } = useParams();
  const { pins, loading, savePin, deletePin } = useGetPins({
    searchText: category || "",
    mode: ModeFilterGetPins.CATEGORY,
  });
  if (loading) return <Spinner message="Cargando imágenes" />;
  return (
    <>
      {pins.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-gray-500">No hay pines</h1>
        </div>
      ) : (
        <Masonry pins={pins} savePin={savePin} deletePin={deletePin} />
      )}
    </>
  );
};

export default CategoryPage;
