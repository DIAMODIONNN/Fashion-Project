import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutUser from "./LayoutUser";
import LayoutAdmin from "./LayoutAdmin";

const App = () => {
  return (
    <div className="text-center  dark:bg-[#424242] ">
      <Routes>
        <Route path="/*" element={<LayoutUser />} />
        <Route path="/admin/*" element={<LayoutAdmin />} />
      </Routes>
    </div>
  );
};

export default App;
