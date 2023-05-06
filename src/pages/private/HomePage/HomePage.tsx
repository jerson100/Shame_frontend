import Spinner from "../../../components/common/Spinner/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout/PinsLayout";
import useGetPins from "../../../hooks/useGetPins";

const HomePage = () => {
  const { pins, loading, savePin, deletePin } = useGetPins({});
  if (loading) return <Spinner message="Cargando pines..." />;
  return <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />;
};

export default HomePage;
