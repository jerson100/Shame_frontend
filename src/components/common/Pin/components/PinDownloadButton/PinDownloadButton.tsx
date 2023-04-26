import { FC, memo } from "react";
import { MdDownloadForOffline } from "react-icons/md";

interface PinDownloadButtonProps {
  urlImage: string;
}

const PinDownloadButton: FC<PinDownloadButtonProps> = ({ urlImage }) => {
  return (
    <a
      href={`${urlImage}?dl`}
      download
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
    >
      <MdDownloadForOffline />
    </a>
  );
};

export default memo(PinDownloadButton);
