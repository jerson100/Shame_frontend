import Masonry from "../../../components/common/Masonry";
import Spinner from "../../../components/common/Spinner/Spinner";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";

const HomePage = () => {
  const { pins, loading, savePin, deletePin } = useGetPins({
    searchText: "",
    mode: ModeFilterGetPins.ALL,
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <div>
      {pins.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl text-gray-500">No hay pines</h1>
        </div>
      ) : (
        <Masonry pins={pins} savePin={savePin} deletePin={deletePin} />
      )}
    </div>
  );
};

export default HomePage;
