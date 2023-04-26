import { FC, memo } from "react";
import { PinProps } from "../../../../../types";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

interface PinDestinationButtonProps extends Pick<PinProps, "destination"> {}
const PinDestinationButton: FC<PinDestinationButtonProps> = ({
  destination,
}) => {
  return (
    <>
      {destination?.slice(8).length > 0 ? (
        <a
          href={destination}
          target="_blank"
          className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
          rel="noreferrer"
        >
          {" "}
          <BsFillArrowUpRightCircleFill />
          {destination?.slice(8, 17)}...
        </a>
      ) : undefined}
    </>
  );
};

export default memo(PinDestinationButton);
