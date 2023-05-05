import { useCallback, useState } from "react";
import { CreateCommentProps, Pin, User } from "../types";
import PinService from "../services/pin";

const usePin = (pinId: string) => {
  const [pin, setPin] = useState<Pin | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const get = useCallback(async () => {
    try {
      setLoading(true);
      const response = await PinService.findMoreInfo(pinId);
      setPin(response);
      setLoading(false);
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  }, [pinId]);

  const addComment = useCallback(
    async ({ user, pinId, comment }: CreateCommentProps) => {
      if (pin) {
        const response = await PinService.createComment({
          pinId,
          comment,
          user,
        });
        if (response) {
          setPin((prevP) => {
            return (
              prevP && {
                ...prevP,
                comments: [...(prevP.comments || []), response],
              }
            );
          });
        }
      }
    },
    [pin]
  );

  return {
    get,
    pin,
    loading,
    error,
    addComment,
  };
};

export default usePin;
