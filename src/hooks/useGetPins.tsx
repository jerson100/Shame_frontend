import { useCallback, useEffect, useState } from "react";
import { Pin, Save } from "../types";
import PinService from "../services/pin";

export enum ModeFilterGetPins {
  ALL = "ALL",
  CATEGORY = "CATEGORY",
  SEARCH = "SEARCH",
}

interface UseGetPinsProps {
  searchText: string;
  mode?: ModeFilterGetPins;
}

const useGetPins = ({
  searchText,
  mode = ModeFilterGetPins.ALL,
}: UseGetPinsProps) => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const abortC = new AbortController();
    const getApi = async () => {
      try {
        setLoading(true);
        setError(null);
        setPins([]);
        const pines =
          mode === ModeFilterGetPins.ALL
            ? await PinService.findALL(abortC.signal)
            : mode === ModeFilterGetPins.SEARCH
            ? await PinService.search(searchText, abortC.signal)
            : await PinService.findALLByCategory(searchText, abortC.signal);
        setPins(pines);
      } catch (e) {
        console.log(e);
        setError("Ocurrió un error al obtener los pines");
      } finally {
        setLoading(false);
      }
    };
    getApi();
    return () => {
      abortC.abort();
    };
  }, [searchText, mode]);

  const savePin = useCallback(
    async (pinId: string, userId: string): Promise<Save | null> => {
      const saved = await PinService.save(pinId, userId);
      if (saved) {
        setPins((prevPins) => {
          return prevPins.map((pin) => {
            if (pin._id === pinId) {
              console.log(pin.save, saved);
              return {
                ...pin,
                save: pin.save ? [...pin.save, saved] : [saved],
              };
            }
            return pin;
          });
        });
      }
      return saved;
    },
    []
  );

  const deletePin = useCallback(async (pinId: string): Promise<boolean> => {
    const deletedPin = await PinService.remove(pinId);
    if (deletedPin) {
      setPins((prevPins) => {
        return prevPins.filter((pin) => pin._id !== pinId);
      });
    }
    return deletedPin;
  }, []);

  return { pins, setPins, loading, error, savePin, deletePin };
};

export default useGetPins;
