import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart
      ? JSON.parse(savedCart)
      : {
          items: [],
          totalQuantity: 0,
          changed: false,
        };
  } catch (error) {
    return {
      items: [],
      totalQuantity: 0,
      changed: false,
    };
  }
};

const initialCartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.variantId === newItem.variantId
      );
      state.totalQuantity++;
      state.changed = true;

      if (!existingItem) {
        state.items.push({
          productId: newItem.productId,
          price: newItem.price,
          imageUrl: newItem.imageUrl,
          quantity: 1,
          totalPrice: newItem.price,
          variantId: newItem.variantId,
          size: newItem.size,
          name: newItem.name,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.variantId === id);

      if (existingItem) {
        state.totalQuantity--;
        state.changed = true;

        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.variantId !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - existingItem.price;
        }

        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeEntireItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.variantId === id);

      if (existingItem) {
        // Reduce total quantity by the quantity of the item being removed
        state.totalQuantity -= existingItem.quantity;
        state.changed = true;

        // Remove the item from the cart
        state.items = state.items.filter((item) => item.variantId !== id);

        // If the cart is now empty, reset total quantity to 0
        if (state.items.length === 0) {
          state.totalQuantity = 0;
        }

        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.changed = true;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const selectItems = (state) => state.cart.items;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectChanged = (state) => state.cart.changed;

export default cartSlice;
