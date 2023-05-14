import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user && isSuccess) {
      toast.success("Registration Completed Successfully");
      navigate("/");
    }
    dispatch(reset());
  }, [isError, isSuccess, message, navigate, user]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-[90%] flex items-center justify-center scrollbar-hide">
      <div className="flex flex-col text-center bg-white py-8 px-6 gap-6 w-[80%] md:w-[60%] xl:w-[40%] h-[60%] md:h-[60%] justify-center rounded-xl shadow-lg">
        <div className="">
          <h1 className=" text-[2rem] md:text-[3rem]">Register</h1>
        </div>

        <div className="">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <input
                type="text"
                required
                name="username"
                value={username}
                placeholder="Enter username"
                className="md:w-[70%] w-[90%] border mx-auto py-1 px-3"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                type="email"
                required
                name="email"
                value={email}
                placeholder="Enter email"
                className="md:w-[70%] w-[90%] border mx-auto py-1 px-3"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <input
                type="password"
                name="password"
                required
                value={password}
                placeholder="Enter password"
                className="md:w-[70%] w-[90%] border mx-auto py-1 px-3"
                onChange={handleChange}
              />
            </div>

            <button className="bg-black md:w-[70%] w-[90%] mx-auto text-white py-2 rounded-md">
              Sign Up
            </button>
            <p className=" text-gray-400">
              Already have an account?{" "}
              <span className="text-blue-400 underline">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
