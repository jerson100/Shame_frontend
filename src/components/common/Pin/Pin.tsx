import { useState, memo } from "react";
import { PinProps } from "../../../types";
import { urlFor } from "../../../configs/sanity";
import { motion } from "framer-motion";
import { PinContainerVariants } from "./pin.variants";
import PinContentHover from "./components/PinContentHover";
import PinUserInformation from "./components/PinUserInformation";

const Pin = ({
  _id,
  about,
  category,
  createdAt,
  destination,
  image,
  postedBy,
  savePin,
  save,
  deletePin,
}: PinProps) => {
  const [hover, setHover] = useState("exit");
  return (
    <div className="m-2">
      <motion.div
        className="cursor-zoom-in overflow-hidden relative"
        initial="initial"
        whileHover={hover}
        variants={PinContainerVariants}
        onMouseEnter={() => setHover("hover")}
        onMouseLeave={() => setHover("exit")}
      >
        <img
          className="rounded-lg w-full"
          src={urlFor(image).width(250).url()}
          alt={about}
        />
        <PinContentHover
          deletePin={deletePin}
          postedBy={postedBy}
          urlImage={image?.asset?.url}
          savePin={savePin}
          _id={_id}
          save={save}
          destination={destination}
        />
      </motion.div>
      <PinUserInformation
        image={postedBy.image}
        user={postedBy.user}
        _id={postedBy._id}
      />
    </div>
  );
};

export default memo(Pin);
