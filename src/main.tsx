import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./utils/SideBar.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import NavBar from "./utils/NavBar.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import AuthWrapper from "./config/auth/wrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ChakraProvider>
        <AuthWrapper>
          <div className={"grid lg:grid-cols-[320px_1fr] font-poppins"}>
            <SideBar />
            <div className="flex flex-col ">
              <NavBar />
              <App />
            </div>
          </div>
        </AuthWrapper>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
);
