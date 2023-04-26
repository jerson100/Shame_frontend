import { motion } from "framer-motion";

import { PinHoverContainerVariants } from "../../pin.variants";
import PinDownloadButton from "../PinDownloadButton";
import PinSaveButton from "../PinSaveButton";
import { PinProps } from "../../../../../types";
import useAuthContext from "../../../../../hooks/useAuthContext";
import PinDestinationButton from "../PinDestinationButton/PinDestinationButton";
import DeletePinButton from "../DeletePinButton/DeletePinButton";

interface PinContentHoverProps
  extends Pick<
    PinProps,
    "savePin" | "_id" | "save" | "destination" | "postedBy" | "deletePin"
  > {
  urlImage: string;
}

const PinContentHover = ({
  urlImage,
  savePin,
  _id,
  save,
  destination,
  postedBy,
  deletePin,
}: PinContentHoverProps) => {
  const { user } = useAuthContext();
  return (
    <motion.div
      variants={PinHoverContainerVariants}
      className="absolute left-0 top-0 w-full h-full flex flex-col justify-between bg-zinc-950 bg-opacity-40 p-2"
    >
      <div className="flex justify-between">
        <PinDownloadButton urlImage={urlImage} />
        {save?.some((s) => s.postedBy._id === user?._id) ? (
          <button
            type="button"
            className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
          >
            {save.length} Saved
          </button>
        ) : (
          <PinSaveButton
            numberSaves={save?.length || 0}
            savePin={savePin}
            _id={_id}
          />
        )}
      </div>
      <div className="flex justify-between items-center gap-2 w-full">
        <PinDestinationButton destination={destination} />
        <DeletePinButton
          deletePin={deletePin}
          _id={_id}
          postedBy={postedBy}
          user={user}
        />
      </div>
    </motion.div>
  );
};

export default PinContentHover;
