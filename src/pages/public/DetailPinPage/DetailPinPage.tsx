import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePin from "../../../hooks/usePin";
import { MdDownloadForOffline } from "react-icons/md";
import Spinner from "../../../components/common/Spinner/Spinner";
import { urlFor } from "../../../configs/sanity";
import DetailComment from "./components/DetailComment";
import { Helmet } from "react-helmet";

const DetailPinPage = () => {
  const { idPin } = useParams();
  const [loading, setLoading] = React.useState(false);
  const {
    pin,
    loading: loadingGetPin,
    get,
    error,
    addComment,
  } = usePin(idPin || "");
  useEffect(() => {
    setLoading(true);
    get()
      .then()
      .catch(() => {
        setLoading(false);
      });
  }, [idPin]);
  useEffect(() => {
    if (pin) {
    }
  }, [pin]);
  return (
    <>
      {loadingGetPin ? (
        <div className="flex-grow flex items-center justify-center">
          <Spinner message="Cargando Pin..." />
        </div>
      ) : !pin ? (
        <div className="flex-grow flex items-center justify-center">
          <p>El pin no existe</p>
        </div>
      ) : (
        <article className="bg-white max-w-[1200px] mx-auto rounded-[32px] flex flex-col xl:flex-row w-full">
          <Helmet>
            <title>{pin.title} | Shame</title>
            <meta name="description" content={pin.about} />
            <meta name="robots" content="index, follow" />
            <meta name="author" content="Jerson Omar Ramírez Ortiz" />
            <meta name="keywords" content={pin.category} />
            <meta name="og:title" content={`${pin.title} | Shame`} />
            <meta name="og:description" content={pin.about} />
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
            <meta name="twitter:title" content={`${pin.title} | Shame`} />
            <meta name="twitter:description" content={pin.about} />
            <meta
              name="twitter:image"
              content="https://shame-sh.netlify.app/favicon.png"
            />
          </Helmet>
          <div className="flex justify-center items-center md:items-start flex-initial flex-grow">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={pin?.image && urlFor(pin?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full pt-5 pb-5 md:pl-5 md:pr-5 flex-1 xl:min-w-620">
            <div className="flex justify-between">
              <a
                href={`${pin.image.asset.url}?dl=`}
                download
                className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
              >
                <MdDownloadForOffline />
              </a>
              <a href={pin.destination} target="_blank" rel="noreferrer">
                {pin.destination?.slice(8)}
              </a>
            </div>
            <div className="mb-5">
              <h1 className="text-3xl md:text-4xl font-bold break-words mt-3">
                {pin.title}
              </h1>
              <p className="mt-3">{pin.about}</p>
            </div>
            <Link
              to={`/profile/${pin?.postedBy._id}`}
              className="flex gap-2 mb-5 items-center bg-white rounded-lg"
            >
              <img
                src={pin?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pin?.postedBy.user}</p>
            </Link>
            <DetailComment
              comments={pin.comments}
              addComment={addComment}
              pinId={pin._id}
            />
          </div>
        </article>
      )}
    </>
  );
};

export default DetailPinPage;
