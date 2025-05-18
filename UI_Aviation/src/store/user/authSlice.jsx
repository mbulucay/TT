import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  access_token: localStorage.getItem("access_token") || "",
  refresh_token: localStorage.getItem("refresh_token") || "",
  email: "",
  role: localStorage.getItem("role"),
  firstname: localStorage.getItem("firstname"),
  lastname: localStorage.getItem("lastname"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("role");
      localStorage.removeItem("firstname");
      localStorage.removeItem("lastname");
    },
    setToken(state, payload) {
      return {
        ...state,
        access_token: payload.action.access_token,
      };
    },
    setAuth(state, action) {
      const { payload } = action;
      return {
        ...state,
        access_token: payload.access_token,
        refresh_token: payload.refresh_token,
        email: payload.email,
        role: payload.role,
        firstname: payload.firstname,
        lastname: payload.lastname,
      };
    },
    authDataAssign: (state, action) => {
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("refresh_token", action.payload.refresh_token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("firstname", action.payload.firstname);
      localStorage.setItem("lastname", action.payload.lastname);
      Object.assign(state, action.payload);
    },
  },
});

export const { login, logout, setToken, setAuth, authDataAssign } =
  authSlice.actions;
export default authSlice.reducer;
