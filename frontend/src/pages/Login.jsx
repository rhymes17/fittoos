import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (user && isSuccess) {
      toast.success(`${user.username} logged in successfully`);

      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, user, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="h-[90%] flex items-center justify-center">
      <div className="flex flex-col text-center bg-white py-8 px-6 gap-6 w-[80%] xl:w-[40%] md:w-[60%] h-[60%] md:h-[60%] justify-center rounded-xl shadow-lg">
        <div className="">
          <h1 className=" text-[2rem] md:text-[3rem]">Login</h1>
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
              Log In
            </button>
            <p className=" text-gray-400">
              Does not have an account?{" "}
              <span className="text-blue-400 underline">
                <Link to="/register">Sign Up</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
