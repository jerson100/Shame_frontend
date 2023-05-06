import { useCallback, useEffect, useState, useRef } from "react";
import { Pin, Save } from "../types";
import PinService from "../services/pin";

interface useGetPinsQueryProps {
  searchText?: string;
  category?: string;
  idUser?: string;
  saved?: boolean;
}

const useGetPins = (query: useGetPinsQueryProps) => {
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
        const pines = await PinService.findALL(
          query,
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
  }, [query.category, query.searchText, query.idUser, query.saved]);

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
