import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  searchBy: "name",
  products: [],
  currentPage: 1,
  limit: 9,
  total: 0,
  totalPage: 0,
  newestProducts: [],
  filter: {}
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    productFilter: (state, action) => {
      state.filter = action.payload;
    },
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
    updateSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    updateTotalProducts: (state, action) => {
      state.total = action.payload;
    },
    updateTotalPage: (state, action) => {
      state.totalPage = action.payload;
    },
    updateNewestProducts: (state, action) => {
      state.newestProducts = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchProduct, productFilter, updateSearchBy } = ProductSlice.actions;

export default ProductSlice.reducer;
