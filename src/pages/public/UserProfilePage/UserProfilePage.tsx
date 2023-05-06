import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerProfile from "./components/BannerProfile/BannerProfile";
import Masonry from "../../../components/common/Masonry/Masonry";
import useGetPins from "../../../hooks/useGetPins";
import Spinner from "../../../components/common/Spinner/Spinner";
import useGetInfoUser from "../../../hooks/useGetInfoUser";
import { Helmet } from "react-helmet";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfilePage = () => {
  const { idUser } = useParams();
  const [activeBtn, setActiveBtn] = React.useState("created");
  const [loadingPage, setLoadingPage] = React.useState(true); //loading page
  const [text, setText] = React.useState("Created");
  const {
    user,
    loading: loadingGetInfoUser,
    cancelGetInfoUser,
    error: errorGetInfoUser,
  } = useGetInfoUser(idUser);
  const {
    pins,
    deletePin,
    savePin,
    loading: loadingGetPins,
    cancel: cancelGetPins,
    error: errorGetPins,
  } = useGetPins({
    idUser: idUser,
    saved: text === "Saved",
  });

  useEffect(() => {
    if (!loadingGetInfoUser && errorGetInfoUser) {
      cancelGetPins();
      setLoadingPage(false);
    } else if (!loadingGetPins && errorGetPins) {
      cancelGetInfoUser();
      setLoadingPage(false);
    } else if (!loadingGetInfoUser && !loadingGetPins) {
      setLoadingPage(false);
    }
  }, [loadingGetInfoUser, loadingGetPins, errorGetInfoUser, errorGetPins]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const textButton = (e.target as HTMLButtonElement).textContent as string;
    setText(textButton);
    setActiveBtn(textButton.toLowerCase());
  };

  if (loadingPage) {
    return (
      <div className="items-center justify-center flex flex-grow">
        <Spinner message="Loading profile" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="items-center justify-center flex flex-grow">
        <p className="text-lg font-bold">El perfil del usuario no existe</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-grow gap-7">
      <Helmet>
        <title>{user.user} | Shame</title>
        <meta name="description" content={`Perfil de ${user.user} en Shame`} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jerson Omar Ramírez Ortiz" />
        <meta
          name="keywords"
          content={`${user.user}, Shame, pins, pinterest, react`}
        />
        <meta name="og:title" content={`${user.user} | Shame`} />
        <meta
          name="og:description"
          content={`Perfil de ${user.user} en Shame`}
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://shame.com" />
        <meta name="og:site_name" content="Shame" />
        <meta name="og:image" content={user.image} />
        <meta name="og:locale" content="es_ES" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@jerson100" />
        <meta name="twitter:creator" content="@jerson100" />
        <meta name="twitter:title" content={`${user.user} | Shame`} />
        <meta
          name="twitter:description"
          content={`Perfil de ${user.user} en Shame`}
        />
        <meta name="twitter:image" content={user.image} />
      </Helmet>
      <BannerProfile _id={user._id} user={user.user} image={user.image} />
      <div className="text-center">
        <button
          type="button"
          onClick={handleClick}
          className={`${
            activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
          }`}
        >
          Created
        </button>
        <button
          type="button"
          onClick={handleClick}
          className={`${
            activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
          }`}
        >
          Saved
        </button>
      </div>
      <div className="flex-grow flex flex-col">
        {loadingGetPins ? (
          <Spinner message="Loading pins" />
        ) : (
          <Masonry pins={pins} deletePin={deletePin} savePin={savePin} />
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
