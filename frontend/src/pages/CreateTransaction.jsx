import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import high from "../assets/high.svg";
import low from "../assets/low.svg";
import { useDispatch, useSelector } from "react-redux";
import { createEntry, reset } from "../features/entries/entrySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createCategory, getCategories } from "../features/category/catSLice";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Modal from "react-modal";

const CreateTransaction = () => {
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();

  const [entryType, setEntryType] = useState(true);
  const [category, setCategory] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newCat, setCat] = useState("");

  const { categories, isLoading } = useSelector((state) => state.category);

  const [formData, setFormData] = useState({
    source: "",
    description: "",
    amount: "",
    title: "",
  });

  const { source, description, amount, title } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { entry, isSuccess, isError, message, isCategory, isCategoryErr } =
    useSelector((state) => state.entry);

  //Styles for Modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "70%",
    },
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      category,
      source,
      description,
      amount,
      entryType,
      title,
      date: startDate.toLocaleDateString(),
    };

    dispatch(createEntry(entry));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (entry && isSuccess) {
      toast.success("Successfully created a new Transaction");
      dispatch(reset());

      navigate(`/transaction/${entry._id}`);
    }
  }, [isError, entry, isSuccess, message, dispatch, navigate]);

  useEffect(() => {
    if (isCategoryErr) {
      toast.error(message);
    }

    if (isCategory) {
      toast.success("Successfully add a new Category");
      dispatch(reset());
    }
  }, [isCategoryErr, isCategory, message, dispatch, navigate]);

  const onOptionChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  Modal.setAppElement("body");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNewCat = () => {
    dispatch(createCategory(newCat));
    closeModal();
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <Hero title="Create New Transaction" />

      <div className="border flex flex-col bg-white shadow py-5 mt-5">
        <form
          className="w-[90%] mx-auto flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="category">
              Title
            </label>
            <input
              value={title}
              type="text"
              id="title"
              name="title"
              className="border py-1 px-2 rounded placeholder:text-gray-300"
              onChange={handleChange}
              placeholder="Please enter a Title"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="category">
              Category
            </label>
            <div className="w-[100%] flex justify-between gap-2">
              <select
                className="flex-1 border py-1 px-2 rounded placeholder:text-gray-300"
                onChange={onOptionChangeHandler}
                required
              >
                <option></option>
                {categories.map((option, index) => {
                  return <option key={index}>{option.name}</option>;
                })}
              </select>
              <div
                className="px-3 border py-1 rounded cursor-pointer hover:bg-black hover:text-white ani flex items-center"
                onClick={openModal}
              >
                <FaPlus />
              </div>
              {/* Modal */}

              <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
              >
                <div
                  className="flex justify-center text-center border border-gray-400 w-[5%] rounded cursor-pointer hover:bg-black hover:text-white ani"
                  onClick={closeModal}
                >
                  <h1 className="font-bold">X</h1>
                </div>
                <h2 className="text-2xl text-center">Add Category</h2>
                <div className="my-3 flex flex-col">
                  <label className="text-xl pb-3" htmlFor="newCat">
                    Name
                  </label>

                  <input
                    value={newCat}
                    type="text"
                    id="newCat"
                    name="newCat"
                    className="border border-black py-1 px-2 rounded placeholder:text-gray-300"
                    onChange={(e) => setCat(e.target.value)}
                    placeholder="Please enter Category name"
                    required
                  />
                </div>
                <div className="w-[100%] flex justify-center ">
                  <div
                    className=" border-2 border-black px-3 py-2 rounded bg-black text-white hover:bg-white hover:text-black ani"
                    onClick={handleNewCat}
                  >
                    Create Category
                  </div>
                </div>
              </Modal>
            </div>
            {/* <input
              value={category}
              type="text"
              id="category"
              name="category"
              className="border py-1 px-2 rounded placeholder:text-gray-300"
              onChange={handleChange}
              placeholder="Please enter a category"
              required
            /> */}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="source">
              Source
            </label>
            <input
              value={source}
              type="text"
              id="source"
              name="source"
              className="border py-1 px-2 rounded placeholder:text-gray-300"
              onChange={handleChange}
              placeholder="Please enter a source"
            />
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <label className="text-lg" htmlFor="date">
              Date :<span className="text-sm text-gray-400"> MM/DD/YYYY</span>
            </label>
            <DatePicker
              className="border  px-2 py-1"
              dateFormat="MM/dd/yyyy"
              selected={startDate}
              onChange={(d) => setStartDate(d)}
              minDate={today}
              todayButton={"Today"}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="entryType">
              Transaction Type
            </label>
            <div
              id="entryType"
              className="flex gap-2 w-[85%] md:w-[55%] "
              name="entryType"
            >
              <div
                className={`px-2 py-2 border flex gap-2 cursor-pointer rounded ani ${
                  entryType
                    ? "bg-black -md text-white"
                    : "bg-white text-black hover:border-black"
                }`}
                onClick={() => setEntryType(true)}
              >
                Income
                <img src={high} />
              </div>
              <div
                className={`px-2 py-2 border rounded flex cursor-pointer gap-2 ani  ${
                  entryType
                    ? "bg-white text-black hover:border-black"
                    : "bg-black text-white hover:border-white"
                }`}
                onClick={() => setEntryType(false)}
              >
                Expense
                <img src={low} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="description">
              Description
            </label>
            <textarea
              value={description}
              type="text"
              id="description"
              name="description"
              onChange={handleChange}
              className="border rounded px-2 placeholder:text-gray-300"
              placeholder="Please enter a description"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="amount">
              Amount
            </label>
            <div className="flex gap-2 items-center">
              <p className="text-gray-800">Rs.</p>
              <input
                required
                value={amount}
                type="number"
                min="0"
                max="1000000"
                id="number"
                name="amount"
                className="border py-1 px-2 rounded w-[40%] md:w-[20%] placeholder:text-gray-300"
                onChange={handleChange}
                placeholder="0"
              />
            </div>
          </div>
          <div className="flex w-full mx-auto justify-center">
            <button className="border-2 border-black px-3 py-2 rounded bg-black text-white hover:bg-white hover:text-black ani">
              Submit
            </button>
          </div>
          {/* end */}
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
