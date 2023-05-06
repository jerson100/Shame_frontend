import { useLocation } from "react-router-dom";
import useGetPins from "../../../hooks/useGetPins";
import Spinner from "../../../components/common/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout";
import { Helmet } from "react-helmet";

const SearchPage = () => {
  const {
    state: { searchTerm },
  } = useLocation();
  const { pins, loading, deletePin, savePin } = useGetPins({
    searchText: searchTerm || "",
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <>
      <Helmet>
        <title>Search | Shame</title>
        <meta
          name="description"
          content={`Buscar imágenes por categoria, descripción, título`}
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jerson Omar Ramírez Ortiz" />
        <meta
          name="keywords"
          content={`Search, Shame, pins, pinterest, react`}
        />
        <meta name="og:title" content={`Search | Shame`} />
        <meta
          name="og:description"
          content={`Buscar imágenes por categoria, descripción, título`}
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://shame-sh.netlify.app" />
        <meta name="og:site_name" content="Shame" />
        <meta
          name="og:image"
          content="https://shame-sh.netlify.app/favicon.png"
        />
        <meta name="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jerson100" />
        <meta name="twitter:creator" content="@jerson100" />
        <meta name="twitter:title" content={`Search | Shame`} />
        <meta
          name="twitter:description"
          content={`Buscar imágenes por categoria, descripción, título`}
        />
        <meta
          name="twitter:image"
          content="https://shame-sh.netlify.app/favicon.png"
        />
      </Helmet>
      <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />
    </>
  );
};

export default SearchPage;
