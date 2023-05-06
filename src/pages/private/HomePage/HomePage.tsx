import Spinner from "../../../components/common/Spinner/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout/PinsLayout";
import useGetPins from "../../../hooks/useGetPins";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const { pins, loading, savePin, deletePin } = useGetPins({});
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <>
      <Helmet>
        <title>Shame - Página Principal</title>
        <meta
          name="description"
          content="Comparte, busca, comenta y guarda imágenes de todo tipo"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jerson Omar Ramírez Ortiz" />
        <meta name="keywords" content="Shame, pins, pinterest, react" />
        <meta name="og:title" content="Página principal" />
        <meta
          name="og:description"
          content="Comparte, busca, comenta, guarda imágenes de todo tipo"
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://shame.com" />
        <meta name="og:site_name" content="Shame" />
        <meta name="og:image" content="https://shame.com/image.png" />
        <meta name="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jerson100" />
        <meta name="twitter:creator" content="@jerson100" />
        <meta name="twitter:title" content="Página principal" />
        <meta
          name="twitter:description"
          content="Comparte, busca, comenta y guarda imágenes de todo tipo"
        />
        <meta name="twitter:image" content="favicon.png" />
      </Helmet>
      <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />
    </>
  );
};

export default HomePage;
