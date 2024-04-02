import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import SideBar from "./SideBar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <div className={"grid lg:grid-cols-[320px_1fr] poppins"}>
      <SideBar />
      <App />
    </div>
  </BrowserRouter>
);
