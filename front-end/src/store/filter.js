import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/config/axios";

export const fetchFilterOptions = createAsyncThunk(
  "filters/fetchFilterOptions",
  async () => {
    const [brandsRes, categoriesRes, genderRes] = await Promise.all([
      api.get("/brands"),
      api.get("/shoes/categories"),
      api.get("/shoes/genders"),
    ]);
    

    return {
      brands: brandsRes.data.result,
      categories: categoriesRes.data.result,
      genders: genderRes.data.result,
    };
  }
);

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    brands: [],
    categories: [],
    genders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilterOptions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFilterOptions.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload.brands;
        state.categories = action.payload.categories;
        state.genders = action.payload.genders;
      })
      .addCase(fetchFilterOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default filterSlice;
