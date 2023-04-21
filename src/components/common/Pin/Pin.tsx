import { useState, memo } from "react";
import { Pin as PinModel } from "../../../types";
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
}: Omit<PinModel, "_type" | "comments" | "save">) => {
  const [hover, setHover] = useState("exit");
  return (
    <div className="mb-2">
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
        <PinContentHover urlImage={image?.asset?.url} />
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
