import { FC, MouseEvent, useState } from "react";
import { PinProps } from "../../../../../types";
import useAuthContext from "../../../../../hooks/useAuthContext";

interface PinSaveButtonProps extends Pick<PinProps, "_id" | "savePin"> {
  numberSaves: number;
}

const PinSaveButton: FC<PinSaveButtonProps> = ({
  _id,
  savePin,
  numberSaves,
}) => {
  const [saving, setSaving] = useState(false);
  const { user } = useAuthContext();
  const handleSave = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (user) {
      setSaving(true);
      const saveP = await savePin(_id, user._id);
      console.log(saveP);
      setSaving(false);
    }
  };
  return (
    <button
      onClick={handleSave}
      type="button"
      className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
    >
      {numberSaves} {saving ? "Saving" : "Save"}
    </button>
  );
};

export default PinSaveButton;
