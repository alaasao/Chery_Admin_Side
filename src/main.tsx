import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./SideBar.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <div className={"grid lg:grid-cols-[320px_1fr] font-poppins"}>
        <SideBar />
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
);
