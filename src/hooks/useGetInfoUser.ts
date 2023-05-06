import { useCallback, useEffect, useRef, useState } from "react";
import { User } from "../types";
import UserService from "../services/user";

export default function useGetInfoUser(idUser?: string) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(false);
  const abortController = useRef<AbortController | null>(null);
  useEffect(() => {
    if (idUser) {
      abortController.current = new AbortController();
      setLoading(true);
      setError(false);
      const getUs = async () => {
        try {
          const us = await UserService.findUser(
            idUser,
            abortController.current?.signal
          );
          setUser(us);
          setLoading(false);
        } catch (e) {
          setLoading(false);
          setError(true);
        }
      };
      getUs();
    } else {
      setLoading(false);
    }
    return () => {
      abortController.current?.abort();
    };
  }, [idUser]);

  const cancelGetInfoUser = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
  }, []);
  return {
    cancelGetInfoUser,
    loading,
    user,
    error,
  };
}
