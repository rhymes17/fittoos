import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  // if (isLoading) return <h1>Loading...</h1>;

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="border w-full bg-white shadow-sm">
      <div className="flex justify-between py-4 px-3 w-[90%] mx-auto items-center">
        <div className="text-[1.6rem]">
          <Link to="/">
            <h1>Fittoos</h1>
          </Link>
        </div>

        {user ? (
          <button
            className="border-2 border-black py-1.5 px-2 rounded-md bg-white text-black hover:bg-black hover:text-white ani  hover:border-2"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link to="/register">
              <button className="border-2 border-black py-1.5 px-2 rounded-md bg-white text-black hover:bg-black hover:text-white ani  hover:border-2">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="border-2 py-1.5 px-2 rounded-md bg-black text-white  ani hover:bg-white hover:text-black hover:border-black">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
