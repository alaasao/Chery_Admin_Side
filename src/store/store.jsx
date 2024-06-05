import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth.reducer";
import deleteReducer from "./reducers/delete.reducer";
export const store = configureStore({
  reducer: {
    Auth: authReducer,
    delete:deleteReducer
  },
});
