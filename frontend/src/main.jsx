import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AdhkarAlsabah from "./AdhkarAlsabah";
import AdhkarAlsalah from "./AdhkarAlsalah";
import Quran from "./Quran";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/adhkar-alsabah" element={<AdhkarAlsabah />} />
        <Route path="/adhkar-alsalah" element={<AdhkarAlsalah />} />
        <Route path="/quran" element={<Quran />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
