import { createSlice } from "@reduxjs/toolkit";

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
    totalWishlistItems:
      JSON.parse(localStorage.getItem("wishlistSummary"))?.totalWishlistItems ||
      0,
  },
  reducers: {
    addItemToWishlist: (state, action) => {
      console.log("Item added to wishlist");

      // Avoid duplicate items
      if (
        !state.wishlistItems.some(
          (item) => item.product_id === action.payload.product_id
        )
      ) {
        state.wishlistItems = [...state.wishlistItems, action.payload];
        localStorage.setItem(
          "wishlistItems",
          JSON.stringify(state.wishlistItems)
        );
      }

      state.totalWishlistItems = state.wishlistItems.length;
      localStorage.setItem(
        "wishlistSummary",
        JSON.stringify({ totalWishlistItems: state.totalWishlistItems })
      );
    },

    removeItemFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.product_id !== action.payload
      );
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );

      state.totalWishlistItems = state.wishlistItems.length;
      localStorage.setItem(
        "wishlistSummary",
        JSON.stringify({ totalWishlistItems: state.totalWishlistItems })
      );
    },

    clearWishlist: (state) => {
      state.wishlistItems = [];
      state.totalWishlistItems = 0;
      localStorage.removeItem("wishlistItems");
      localStorage.removeItem("wishlistSummary");
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
