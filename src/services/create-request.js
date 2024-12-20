import axios from "axios";

import { localStorageKeys } from "src/constants/local-storage";
import { getLocalStorage } from "src/utils/local-storage";
import store from "../store";

const apiBase = import.meta.env.VITE_API_URL;

export const createRequest = (method, endpoint, data) => {
  const token =
    store.getState().user?.token ||
    getLocalStorage(localStorageKeys.AUTH_TOKEN) ||
    false;

  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  switch (method) {
    case "GET": {
      return axios.get(`${apiBase}/${endpoint}`, {
        headers: defaultHeaders,
        withCredentials: true,
      });
    }
    case "POST": {
      return axios.post(`${apiBase}/${endpoint}`, data, {
        headers: defaultHeaders,
        withCredentials: true,
      });
    }
    case "PUT": {
      return axios.put(`${apiBase}/${endpoint}`, data, {
        headers: defaultHeaders,
        withCredentials: true,
      });
    }
    case "DELETE": {
      return axios.delete(`${apiBase}/${endpoint}/${data}`, {
        headers: defaultHeaders,
        withCredentials: true,
      });
    }
  }
};
