import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./filter";

const filterActions = filterSlice.actions;

const store = configureStore({
  reducer: { filter: filterSlice.reducer },
});

export default store;
export { filterActions };
