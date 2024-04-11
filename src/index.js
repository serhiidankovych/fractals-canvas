import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContainer from "./components/containers/ThemeContainer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ThemeContainer dashboard={<App />} />);
