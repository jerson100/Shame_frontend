import { useCallback, useEffect, useState } from "react";
import { Pin } from "../types";
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

  const savePing = useCallback(
    async (pinId: string, userId: string): Promise<boolean> => {
      return PinService.save(pinId, userId);
    },
    []
  );

  const deletePing = useCallback(async (pinId: string): Promise<boolean> => {
    return PinService.remove(pinId);
  }, []);

  return { pins, setPins, loading, error, savePing, deletePing };
};

export default useGetPins;
