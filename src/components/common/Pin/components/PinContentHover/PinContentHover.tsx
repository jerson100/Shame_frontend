import React from "react";
import { motion } from "framer-motion";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { PinHoverContainerVariants } from "../../pin.variants";

const PinContentHover = ({ urlImage }: { urlImage: string }) => {
  return (
    <motion.div
      variants={PinHoverContainerVariants}
      className="absolute left-0 top-0 w-full h-full flex flex-col justify-between bg-zinc-950 bg-opacity-40 p-2"
    >
      <div className="flex justify-between">
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
      </div>
    </motion.div>
  );
};

export default PinContentHover;
