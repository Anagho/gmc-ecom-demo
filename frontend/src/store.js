import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer
  },
});
