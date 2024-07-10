import React from "react";
import LayoutInit from "../Component/LayoutInit";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import SearchResults from "./Pages/SearchResults";
import Object from "./Pages/Object";

export default function Baseroute() {
  return (
    <React.Suspense>
      <LayoutInit>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<Detail />} />
          <Route path="/searchimg" element={<Object />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </LayoutInit>
    </React.Suspense>
  );
}
