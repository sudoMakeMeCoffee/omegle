import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
