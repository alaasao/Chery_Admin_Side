import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./utils/SideBar.tsx";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import NavBar from "./utils/NavBar.tsx";
import { ChakraProvider } from '@chakra-ui/react'
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    
    <BrowserRouter>
      <ChakraProvider>
      <div className={"grid lg:grid-cols-[320px_1fr] font-poppins"}>
        <SideBar />
        <div className="flex flex-col">
          <NavBar/>
          <App />
        </div>
      </div></ChakraProvider>
    </BrowserRouter>
  </Provider>,
);
