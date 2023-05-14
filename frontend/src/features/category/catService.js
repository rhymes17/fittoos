import axios from "axios";

const URL = "/api/category";

const getCategories = async () => {
  const response = await axios.get(`${URL}`);

  return response.data;
};

//create category
const createCategory = async (name) => {
  const response = await axios.post(`${URL}`, { name });
  return response.data;
};

const catService = {
  getCategories,
  createCategory,
};

export default catService;
