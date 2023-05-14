import axios from "axios";

const URL = "/api/transaction";

const getEntries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${URL}`, config);

  return response.data;
};

//Get a single entry
const getEntry = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${URL}/${id}`, config);

  return response.data;
};

//Get a single entry
const deleteEntry = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${URL}/${id}`, config);

  return response.data;
};

//Create an entry
const createEntry = async (entry, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${URL}/createTransaction`, entry, config);

  return response.data;
};

//Update an entry
const updateEntry = async (id, entry, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${URL}/updateTransaction/${id}`,
    entry,
    config
  );
  console.log(response.data);
  return response.data;
};

const entryService = {
  getEntries,
  getEntry,
  createEntry,
  updateEntry,
  deleteEntry,
};

export default entryService;
