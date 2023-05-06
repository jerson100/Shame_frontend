import { useEffect, useState } from "react";
import Spinner from "../../../components/common/Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { SanityImageAssetDocument } from "@sanity/client";
import PinService from "../../../services/pin";
import { CategoryType, CreatePinProps, EImageType } from "../../../types.d";
import { categories } from "../../../configs/categories";
import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CreatePinPage = () => {
  const [errors, setErrors] = useState("");
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  );
  const navigate = useNavigate();
  const [dataPin, setDataPin] = useState({
    title: "",
    about: "",
    category: "",
    link: "",
  });
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      const { type, size, name } = selectedFile;
      setErrors("");
      if (
        type === EImageType.JPG ||
        type === EImageType.PNG ||
        type === EImageType.JPEG ||
        type === EImageType.GIF ||
        type === EImageType.WEBP ||
        type === EImageType.SVG ||
        type === EImageType.TIFF
      ) {
        try {
          setLoading(true);
          setImageAsset(null);
          const document = await PinService.uploadImage(
            selectedFile,
            type,
            name
          );
          setLoading(false);
          setImageAsset(document);
        } catch (error: any) {
          setErrors(`Upload failed: ${error.message}`);
          setLoading(false);
        }
      } else {
        setErrors("Invalid file type: " + type);
      }
    }
  };

  useEffect(() => {
    let idTimeOut: number = -1;
    if (errors.length > 0) {
      idTimeOut = setTimeout(() => {
        setErrors("");
      }, 2000);
    }
    return () => {
      idTimeOut !== -1 && clearTimeout(idTimeOut);
    };
  }, [errors]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      imageAsset &&
      user &&
      dataPin.about &&
      dataPin.title &&
      dataPin.link &&
      dataPin.category
    ) {
      try {
        setLoadingSubmit(true);
        const document: CreatePinProps = {
          _type: "pin",
          title: dataPin.title,
          about: dataPin.about,
          destination: dataPin.link,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset?._id,
            },
          },
          userId: user._id,
          postedBy: {
            _type: "postedBy",
            _ref: user._id,
          },
          category: dataPin.category as CategoryType,
        };
        await PinService.createPin(document);
        setLoadingSubmit(false);
        navigate("/");
      } catch (error: any) {
        setErrors(`Upload failed: ${error.message}`);
        setLoadingSubmit(false);
      }
    } else {
      setErrors("Todos los campos son necesarios");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setDataPin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center">
        {errors.length > 0 && (
          <p className="text-red-500 text-xl transition-all duration-150 ease-in mb-5">
            {errors}
          </p>
        )}
        <div className="bg-white p-3 lg:p-5 w-full lg:w-4/5">
          <div className="bg-secondaryColor p-3 mb-4">
            <div className="flex justify-center items-center border-2 border-dotted border-gray-300 h-420">
              {loading ? (
                <Spinner message="" />
              ) : !imageAsset ? (
                <label className="h-full w-full flex items-center justify-center flex-col">
                  <p className="font-bold text-2xl">
                    <AiOutlineCloudUpload />
                  </p>
                  <p className="text-lg">Click to upload</p>
                  <p className="mt-32 text-gray-400 text-center">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
                    TIFF less than 20MB
                  </p>
                  <input
                    type="file"
                    className="w-0 h-0"
                    name="upload-image"
                    multiple={false}
                    onChange={handleChangeFile}
                    onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                      (e.target as HTMLInputElement).value = "";
                    }}
                  />
                </label>
              ) : (
                <div className="h-full w-full bg-orange-200 flex justify-center items-center relative">
                  <img
                    src={imageAsset.url}
                    alt={imageAsset.originalFilename}
                    className="max-w-[80%] max-h-[80%] object-cover"
                  />
                  <button
                    type="button"
                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm">
            <input
              type="text"
              className="border-none"
              placeholder="Agrega tu título aquí"
              onChange={handleChange}
              name="title"
            />
            <input
              type="text"
              className="border-none"
              placeholder="De que trata su pin?"
              onChange={handleChange}
              name="about"
            />
            <input
              type="text"
              className="border-none"
              onChange={handleChange}
              placeholder="Agrega un link de destino"
              name="link"
            />
            <label className="font-bold text-lg">Seleccione la categoría</label>
            <select name="category" onChange={handleChange}>
              {categories.map((category) => (
                <option
                  key={category.name}
                  value={category.name}
                  className="capitalize text-base"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end items-end mt-5">
            <button
              type="submit"
              className={`bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none ${
                loadingSubmit ? "pointer-events-none opacity-80" : ""
              }`}
            >
              {loadingSubmit ? "Creating Pin" : "Create Pin"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreatePinPage;
