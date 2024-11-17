import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";
import authSlice from "./auth";
import cartSlice from "./cart-slice";
import cartTotalSlice from "./cart-total-slice";


const filterActions = filterSlice.actions;
const authActions = authSlice.actions;
const cartActions = cartSlice.actions
const cartTotalActions = cartTotalSlice.actions



const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    cartTotal: cartTotalSlice.reducer
  },
});

export default store;
export { filterActions, authActions, cartActions, cartTotalActions };

