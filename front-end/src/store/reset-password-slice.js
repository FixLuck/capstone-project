import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    otp: null,
    isLoading: false,
    error: null,
}

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState: initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        
        // Set OTP when sent by backend
        setOtp: (state, action) => {
            state.otp = action.payload;
        },
        resetPasswordStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        resetPasswordSuccess: (state, action) => {
            state.isLoading = false;
            state.email = null;
            state.otp = null;
            state.error = null;
        },
        resetPasswordFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const selectEmail = (state) => state.resetPassword.email;
export const selectOtp = (state) => state.resetPassword.otp;
export const selectIsLoading = (state) => state.resetPassword.isLoading;
export const selectError = (state) => state.resetPassword.error;

export default resetPasswordSlice;

