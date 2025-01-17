import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    userCartSummary: {
      totalCartItems:
        JSON.parse(localStorage.getItem("cartSummary")) === null
          ? 0
          : JSON.parse(localStorage.getItem("cartSummary")).totalCartQty,
      totalAmount:
        JSON.parse(localStorage.getItem("cartSummary")) === null
          ? 0
          : JSON.parse(localStorage.getItem("cartSummary")).totalCartAmount,
    },
  },
  reducers: {
    addItemToCart: (state, action) => {
      console.log("items added to cart");
      state.cartItems = [action.payload, ...state.cartItems];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      // let totalCartQty = 0;
      // let totalCartAmount = 0;

      // state.cartItems.forEach((item) => {
      //   totalCartQty = item.product_quantity;
      //   totalCartAmount += item.product_quantity * item.product_price;
      // });

      const { totalCartAmount, totalCartQty } = calculateCartSummary(
        state.cartItems
      );

      state.userCartSummary = {
        totalAmount: totalCartAmount,
        totalCartItems: totalCartQty,
      };
    },

    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product_id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      const { totalCartAmount, totalCartQty } = calculateCartSummary(
        state.cartItems
      );

      state.userCartSummary = {
        totalAmount: totalCartAmount,
        totalCartItems: totalCartQty,
      };
    },

    increaseCartItemQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === action.payload) {
          item.product_quantity += 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      const { totalCartAmount, totalCartQty } = calculateCartSummary(
        state.cartItems
      );

      state.userCartSummary = {
        totalAmount: totalCartAmount,
        totalCartItems: totalCartQty,
      };
    },

    decreaseCartItemQty: (state, action) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.product_id === action.payload && item.product_quantity > 1) {
          item.product_quantity -= 1;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

      const { totalCartAmount, totalCartQty } = calculateCartSummary(
        state.cartItems
      );

      state.userCartSummary = {
        totalAmount: totalCartAmount,
        totalCartItems: totalCartQty,
      };
    },

    clearUserCartItems: (state, action) => {
      state.cartItems = [];
      state.userCartSummary = {
        totalAmount: 0,
        totalCartItems: 0
      }
    }
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  increaseCartItemQty,
  decreaseCartItemQty,
  clearUserCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

// calculate cart summary
function calculateCartSummary(cart) {
  let totalCartQty = 0;
  let totalCartAmount = 0;

  cart.forEach((item) => {
    totalCartQty += item.product_quantity;
    totalCartAmount += item.product_quantity * item.product_price;
  });

  localStorage.setItem('cartSummary', JSON.stringify({ totalCartAmount, totalCartQty}))

  return {
    totalCartAmount,
    totalCartQty,
  };
}
