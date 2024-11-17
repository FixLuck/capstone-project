import { createSlice } from "@reduxjs/toolkit";


const cartTotalSlice = createSlice({
  name: "cartTotal",
  initialState: {
    originalPrice: 0,
    discountAmount: 0,
    storePickup: 0,
    tax: 0,
    total: 0,
    discountId: null,
    appliedCoupon: null,
    discountType: null,
    minimumOrderAmount: 0,
  },
  reducers: {
    setCartTotal: (state, action) => {
        return {
            ...state,
            ...action.payload
        }
    }
  }
});




export default cartTotalSlice;
