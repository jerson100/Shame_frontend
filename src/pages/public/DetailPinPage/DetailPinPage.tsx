import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import usePin from "../../../hooks/usePin";
import { MdDownloadForOffline } from "react-icons/md";
import Spinner from "../../../components/common/Spinner/Spinner";
import { urlFor } from "../../../configs/sanity";
import { CommentForm, CommentList } from "../../../components/common/Comment";

const DetailPinPage = () => {
  const { idPin } = useParams();
  const [loading, setLoading] = React.useState(false);
  const { pin, loading: loadingGetPin, get, error } = usePin(idPin || "");
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
        <article className="bg-white max-w-[1200px] mx-auto rounded-[32px] flex flex-col xl:flex-row">
          <div className="flex justify-center items-center md:items-start flex-initial">
            <img
              className="rounded-t-3xl rounded-b-lg"
              src={pin?.image && urlFor(pin?.image).url()}
              alt="user-post"
            />
          </div>
          <div className="w-full p-5 flex-1 xl:min-w-620">
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
              <h1 className="text-4xl font-bold break-words mt-3">
                {pin.title}
              </h1>
              <p className="mt-3">{pin.about}</p>
            </div>
            <Link
              to={`/user-profile/${pin?.postedBy._id}`}
              className="flex gap-2 mb-5 items-center bg-white rounded-lg "
            >
              <img
                src={pin?.postedBy.image}
                className="w-10 h-10 rounded-full"
                alt="user-profile"
              />
              <p className="font-bold">{pin?.postedBy.user}</p>
            </Link>
            <div className="mb-5">
              <CommentList
                comments={[
                  {
                    comment: "Hola",
                    postedBy: {
                      _type: "user",
                      _id: "1",
                      user: "Jorge",
                      image:
                        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                    },
                  },
                  {
                    comment: "test",
                    postedBy: {
                      _type: "user",
                      _id: "1",
                      user: "Jorge",
                      image:
                        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
                    },
                  },
                ]}
              />
            </div>
            <CommentForm />
          </div>
        </article>
      )}
    </>
  );
};

export default DetailPinPage;