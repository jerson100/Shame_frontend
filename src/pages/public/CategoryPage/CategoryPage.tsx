import { useParams } from "react-router-dom";
import useGetPins from "../../../hooks/useGetPins";
import Spinner from "../../../components/common/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout";

const CategoryPage = () => {
  const { category } = useParams();
  const { pins, loading, savePin, deletePin } = useGetPins({
    category: category || "",
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />;
};

export default CategoryPage;
