import Masonry from "../../../components/common/Masonry";
import Spinner from "../../../components/common/Spinner/Spinner";
import useGetPins, { ModeFilterGetPins } from "../../../hooks/useGetPins";

const HomePage = () => {
  const { pins, loading } = useGetPins({
    searchText: "",
    mode: ModeFilterGetPins.ALL,
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <div>
      <Masonry pins={pins} />
    </div>
  );
};

export default HomePage;
