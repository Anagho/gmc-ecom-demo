import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    // *** Action to load products
    setProducts: (state, action) => {
      state.products = action.payload; // load all products
    },

    // *** Action to add a new product
    addProduct: (state, action) => {
      state.products.push(action.payload); // append a product to the array of products
    },

    // *** Action to delete a product
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.product_id !== action.payload
      );
    },

    // *** Action to edit & update products
    editProduct: (state, action) => {
      const updatedProducts = state.products.map((item) => {
        if (item.product_id === action.payload.product_id) {
          return { ...item, ...action.payload };
        }
        return item;
      });
      state.products = updatedProducts;
    },
  },
});

export const { setProducts, addProduct, editProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
