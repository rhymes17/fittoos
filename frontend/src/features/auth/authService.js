import axios from "axios";

const API_URI = "/api/users";

//Register user
const registerUser = async (user) => {
  const response = await axios.post(`${API_URI}/register`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Login User
const loginUser = async (user) => {
  const response = await axios.post(`${API_URI}/login`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//Logout a user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
