import axios from "axios";
import store from "../store/index";
import { useDispatch } from "react-redux";
import { authActions} from "../store/index"


const baseUrl = "http://localhost:8080/api/v1/";

const api = axios.create({ baseURL: baseUrl });
api.defaults.baseURL = baseUrl;

// api.interceptors.request.use((config) => {
//     const token = store.getState().auth.token;
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// })


// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             const dispatch = useDispatch();
//             dispatch(authActions.logout());
//         }
//         return Promise.reject(error);
//     }
// )

// Trong file api/axios.js
api.interceptors.response.use(
    response => response,
    error => {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      return Promise.reject(error);
    }
  );

export default api;
