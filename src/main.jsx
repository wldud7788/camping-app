import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer
      position="bottom-center"
      limit={1}
      closeButton={false}
      autoClose={2000}
      hideProgressBar
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);
