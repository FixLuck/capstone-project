import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "@/config/axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.token = action.payload;
      state.user = jwtDecode(action.payload);
      state.error = null;
      localStorage.setItem("token", action.payload);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
      state.token = null;
    },
    logout: (state) => {
      api.post("/auth/logout", {
        token: localStorage.getItem("token"),
      });
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});



export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectError = (state) => state.auth.error;

export default authSlice
