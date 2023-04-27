import { useCallback, useState } from "react";
import { Pin } from "../types";
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
  return {
    get,
    pin,
    loading,
    error,
  };
};

export default usePin;
