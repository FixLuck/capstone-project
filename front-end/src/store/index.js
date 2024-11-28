import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import authSlice from "./auth";
import cartSlice from "./cart-slice";
import cartTotalSlice from "./cart-total-slice";
import resetPasswordSlice from "./reset-password-slice";


const filterActions = filterSlice.actions;
const authActions = authSlice.actions;
const cartActions = cartSlice.actions
const cartTotalActions = cartTotalSlice.actions
const resetPasswordActions = resetPasswordSlice.actions



const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    cartTotal: cartTotalSlice.reducer,
    resetPassword: resetPasswordSlice.reducer
  },
});

export default store;
export { filterActions, authActions, cartActions, cartTotalActions, resetPasswordActions };

