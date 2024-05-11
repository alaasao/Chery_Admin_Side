import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toastFNC } from "../../config/toast";
const api = "https://axeiny.tech:4004/"


// login thunk
export const Login = createAsyncThunk("auth/login", async (data) => {
  try {
    const res = await axios.post(api + "auth/login", data);
    return res;
  } catch (err) {
    return err.response;
  }
}); 

// signup thunk
export const Signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await axios.post(api + "auth/signup", data);
    return res;
  } catch (err) {
    return err.response;
  }
});

// get user thunk
export const getUser = createAsyncThunk("auth/getUser", async (data) => {
  try {
    const res = await axios.get(api + "auth/get/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err.response;
  }
});

// initial state
const initialState = {
  authenticated: localStorage.getItem("token") ? true : false,
  user: null,
  loading : false , 
  pendingUser : false , 
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
    builder
      .addCase(Login.pending, (state) => {
        state.pendingAuth = true;
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.pendingAuth = false;
        console.log(action.payload);
        if (action.payload.status === 201) {
          toastFNC('Login Success', 'success');
          state.authenticated = true;
          localStorage.setItem('token', action.payload.data.Token);
        } else if (action.payload.status === 400) {
          toastFNC(action.payload.data.message[0], 'error');
        } else if (action.payload.status === 401) {
          toastFNC(action.payload.data.message, 'error');
        }
      })
      .addCase(Login.rejected, (state) => {
        state.pendingAuth = false;
        toastFNC('Login Failed', 'error');
      })
      .addCase(getUser.pending, (state) => {
        state.pendingUser = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.pendingUser = false;
        console.log(action.payload);
        if (action.payload.status === 200) {
          state.user = action.payload.data;
        } else {
          state.authenticated = false;
          localStorage.removeItem('token');
          toastFNC(action.payload.data.message, 'error');
        }
      })
      ;
  },
});
export default authSlice.reducer;
export const { logout } = authSlice.actions;
