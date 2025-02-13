import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/user/userSlice";
import productReducer from "./features/product/productSlice"
import authReducer from "./features/auth/authSlice"

export default configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    products: productReducer,
    auth: authReducer,
  },
});
