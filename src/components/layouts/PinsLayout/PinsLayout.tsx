import { FC } from "react";
import { Pin as PinModel, PinProps } from "../../../types";
import Masonry from "../../common/Masonry";

interface PinsLayoutProps extends Pick<PinProps, "savePin" | "deletePin"> {
  pins: PinModel[];
}

const PinsLayout: FC<PinsLayoutProps> = ({ pins, savePin, deletePin }) => {
  return (
    <>
      {pins.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <h1 className="text-2xl text-gray-500">No hay pines</h1>
        </div>
      ) : (
        <Masonry pins={pins} savePin={savePin} deletePin={deletePin} />
      )}
    </>
  );
};

export default PinsLayout;
