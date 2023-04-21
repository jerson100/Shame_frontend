import { FC } from "react";
import { Pin as PinModel } from "../../../types";
import MasonryLayout from "react-masonry-css";
import Pin from "../Pin";

interface MasonryProps {
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

const Masonry: FC<MasonryProps> = ({ pins }) => {
  return (
    <MasonryLayout
      className="flex animate-slide-fwd"
      breakpointCols={breakPoints}
    >
      {pins.map((pin) => (
        <Pin key={pin._id} {...pin} />
      ))}
    </MasonryLayout>
  );
};

export default Masonry;
