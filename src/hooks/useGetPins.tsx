import { useCallback, useEffect, useState, useRef } from "react";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<boolean>(false);
  const abortController = useRef<AbortController | null>(null);
  useEffect(() => {
    abortController.current = new AbortController();
    const getApi = async () => {
      try {
        setLoading(true);
        setError(false);
        setPins([]);
        const pines =
          mode === ModeFilterGetPins.ALL
            ? await PinService.findALL(abortController.current?.signal)
            : mode === ModeFilterGetPins.SEARCH
            ? await PinService.search(
                searchText,
                abortController.current?.signal
              )
            : await PinService.findALLByCategory(
                searchText,
                abortController.current?.signal
              );
        setPins(pines);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getApi();
    return () => {
      abortController.current?.abort();
    };
  }, [searchText, mode]);

  const cancel = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);

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

  return { pins, setPins, loading, error, savePin, deletePin, cancel };
};

export default useGetPins;
