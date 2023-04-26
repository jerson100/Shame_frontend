import { FC } from "react";
import { Pin as PinModel, PinProps } from "../../../types";
import MasonryLayout from "react-masonry-css";
import Pin from "../Pin";

interface MasonryProps extends Pick<PinProps, "savePin" | "deletePin"> {
  pins: PinModel[];
}

const breakPoints = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const Masonry: FC<MasonryProps> = ({ pins, savePin, deletePin }) => {
  return (
    <MasonryLayout
      className="flex animate-slide-fwd"
      breakpointCols={breakPoints}
    >
      {pins.map((pin) => (
        <Pin key={pin._id} {...pin} savePin={savePin} deletePin={deletePin} />
      ))}
    </MasonryLayout>
  );
};

export default Masonry;
