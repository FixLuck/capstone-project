import axios from "axios";
import store from "../store/index";
import { useDispatch } from "react-redux";
import { authActions } from "../store/index";

// const baseUrl = "http://localhost:8080/api/v1/";

// const api = axios.create({ baseURL: baseUrl });

// api.defaults.baseURL = baseUrl;

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  const publicPaths = [
    "/users/register",
    "/auth/token",
    "/auth/introspect",
    "/auth/logout",
    "/brands",
    "/shoes",
    "/orders/apply-discount",
  ];

  const isPublicPath = publicPaths.some(path => 
    config.url.startsWith(path) || 
    config.url.includes(`${path}`)
  );


  if (!isPublicPath && token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // For public paths, ensure we don't send the Authorization header
    delete config.headers.Authorization;
  }

  return config

});

export default api;
