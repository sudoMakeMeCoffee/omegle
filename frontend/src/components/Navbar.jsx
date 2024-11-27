import React from "react";
import logo from "../assets/logofull.png";
const Navbar = () => {
  return (
    <div className="w-full h-[70px] flex items-center shadow-md">
      <a href="/" className="w-[150px]">
        <img src={logo} alt="Logo" className="object-fill" />
      </a>
    </div>
  );
};

export default Navbar;
