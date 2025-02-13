import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // *** SET LOADING ACTION
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // *** REGISTER USER ACTION
    registerUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },

    // *** LOGIN USER ACTION ***
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    // *** VERIFY EMAIL ACTION
    verifyEmail: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },

    // *** LOGOUT USER ACTION
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { loginUser, registerUser, verifyEmail, logoutUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
