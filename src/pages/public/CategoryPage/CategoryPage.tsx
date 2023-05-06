import { useParams } from "react-router-dom";
import useGetPins from "../../../hooks/useGetPins";
import Spinner from "../../../components/common/Spinner";
import PinsLayout from "../../../components/layouts/PinsLayout";
import { Helmet } from "react-helmet";

const CategoryPage = () => {
  const { category } = useParams();
  const { pins, loading, savePin, deletePin } = useGetPins({
    category: category || "",
  });
  if (loading) return <Spinner message="Cargando pines..." />;
  return (
    <>
      <Helmet>
        <title>Category | Shame</title>
        <meta name="description" content={`Buscar imágenes por categoria`} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jerson Omar Ramírez Ortiz" />
        <meta
          name="keywords"
          content={`Search, Shame, pins, pinterest, react`}
        />
        <meta name="og:title" content={`Category | Shame`} />
        <meta name="og:description" content={`Buscar imágenes por categoria`} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://shame.com" />
        <meta name="og:site_name" content="Shame" />
        <meta name="og:image" content="favicon.png" />
        <meta name="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jerson100" />
        <meta name="twitter:creator" content="@jerson100" />
        <meta name="twitter:title" content="Category | Shame" />
        <meta
          name="twitter:description"
          content={`Buscar imágenes por categoria`}
        />
        <meta name="twitter:image" content="favicon.png" />
      </Helmet>
      <PinsLayout pins={pins} savePin={savePin} deletePin={deletePin} />
    </>
  );
};

export default CategoryPage;
