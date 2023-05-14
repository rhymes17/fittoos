import React, { useEffect, useState } from "react";
import { FaHome, FaPlus } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="fixed bottom-4 w-full flex justify-center">
      <div className="flex gap-5 items-center border border-gray-300 rounded-xl py-3 px-6 z-index-2 bg-black text-white">
        <Link to="/">
          <FaHome
            id="home"
            className={`text-4xl border border-transparent py-1 px-1 rounded ${
              pathMatchRoute("/")
                ? "bg-white text-black"
                : "text-white bg-black"
            }`}
          />
        </Link>
        <Link to="/create">
          <FaPlus
            id="create"
            className={`text-4xl border border-transparent py-1 px-1 rounded ${
              pathMatchRoute("/create")
                ? "bg-white text-black"
                : "text-white bg-black"
            }`}
          />
        </Link>
        {/* <Link to="/fitus">
          <BiMoney
            id="fitus"
            className={`text-4xl border border-transparent py-1 px-1 rounded ${
              pathMatchRoute("/fitus")
                ? "bg-white text-black"
                : "text-white bg-black"
            }`}
          />
        </Link> */}
      </div>
    </div>
  );
};

export default Footer;
