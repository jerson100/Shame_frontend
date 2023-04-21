export enum TOKEN_CONFIG {
  AUTH_TOKEN = "AUTH_TOKEN",
}

export const removeTokenLocalStorage = () => {
  localStorage.removeItem(TOKEN_CONFIG.AUTH_TOKEN);
};

export const addTokenLocalStorage = (token: string) => {
  localStorage.setItem(TOKEN_CONFIG.AUTH_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_CONFIG.AUTH_TOKEN);
};
