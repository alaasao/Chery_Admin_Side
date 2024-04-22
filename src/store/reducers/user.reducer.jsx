import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toastFNC } from "../../config/toast";
const api = ""
const InitialState = {
  user: null,
  pendingUser: false,
};

export const getUser = createAsyncThunk("user/getUser", async (data) => {
  try {
    const res = await axios.get(api + "user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res;
  } catch (err) {
    return err.response;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});
