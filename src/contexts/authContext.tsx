import { createContext, useState, useEffect, useCallback } from "react";
import { AuthContext, User } from "../types";
import { sanityClient } from "../configs/sanity";
import jwt_decode from "jwt-decode";
import UserService from "../services/user";
import {
  addTokenLocalStorage,
  getToken,
  removeTokenLocalStorage,
} from "../configs/token";

const UserAuthContext = createContext<AuthContext | null>(null);

interface UserContextProviderProps {
  children: React.ReactNode | React.ReactNode[];
}

const UserAuthContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loadingPrev, setLoadingprev] = useState<boolean>(true);

  useEffect(() => {
    const getApi = async () => {
      setLoadingprev(true);
      try {
        const token = getToken();
        if (token) {
          const data = jwt_decode(token) as {
            sub: string;
            name: string;
            email: string;
            picture: string;
          };
          if (data) {
            const us = await UserService.findUser(data.sub);
            if (us) {
              setUser(us);
              setToken(token);
              setIsLogged(true);
            }
          }
        } else {
          removeTokenLocalStorage();
        }
      } catch (e) {
        console.log("Error al obtener el usuario");
        removeTokenLocalStorage();
      } finally {
        setLoadingprev(false);
      }
    };
    getApi();
  }, []);

  const login = useCallback(
    async (user: User, token: string): Promise<boolean> => {
      try {
        await sanityClient.createIfNotExists({
          ...user,
          _type: "user",
        });
        setUser(user);
        setIsLogged(true);
        setToken(token);
        addTokenLocalStorage(token);
        return true;
      } catch (e) {
        return false;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    setIsLogged(false);
    setToken(null);
    removeTokenLocalStorage();
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLogged,
        loadingPrev,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export { UserAuthContext, UserAuthContextProvider };
