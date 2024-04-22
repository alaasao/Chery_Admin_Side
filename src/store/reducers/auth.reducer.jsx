import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastFNC } from "../../config/toast";
const api = ""
export const Login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axios.post(api + "auth/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
});
export const Signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await axios.post(api + "auth/signup", data);
    return res;
  } catch (err) {
    return err.response;
  }
});
export const getUser = createAsyncThunk("auth/getUser", async (data) => {
  try {
    const res = await axios.get(api + "auth/user", {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    return res;
  } catch (err) {
    return err.response;
  }
});
const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  user: null,
  pendingAuth: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.authenticated = false;
      state.user = null;
      localStorage.removeItem("token");
      toastFNC("logged out", "success");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.pending, (state) => {
      state.pendingAuth = true;
    });
  },
});
export default authSlice.reducer;
export const { logout } = authSlice.actions;
