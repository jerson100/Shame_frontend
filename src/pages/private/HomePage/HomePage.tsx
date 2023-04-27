import Spinner from "../../../components/common/Spinner/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout/PinsLayout";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";

const HomePage = () => {
  const { pins, loading, savePin, deletePin } = useGetPins({
    searchText: "",
    mode: ModeFilterGetPins.ALL,
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />;
};

export default HomePage;
