import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import high from "../assets/high.svg";
import low from "../assets/low.svg";
import { getEntry, reset, updateEntry } from "../features/entries/entrySlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateTransaction = () => {
  const { entry, isLoading, isUpdated, message, isError } = useSelector(
    (state) => state.entry
  );
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();

  const [entryType, setEntryType] = useState(entry.entryType);

  const [formData, setFormData] = useState({
    category: entry.category,
    source: entry.source,
    description: entry.description,
    amount: entry.amount,
  });

  const { category, source, description, amount } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const entry = {
      category,
      source,
      description,
      amount,
      date: startDate.toLocaleDateString(),
      entryType,
    };

    dispatch(updateEntry(id, entry));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (entry && isUpdated) {
      toast.success("Updated successfully");

      dispatch(reset());
      navigate(`/transaction/${entry._id}`);
    }
  }, [isError, isUpdated, message, message, entry, navigate]);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id));
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Hero title="Update A Transaction" />

      <div className="border flex flex-col bg-white shadow py-5 mt-5">
        <form
          className="w-[90%] mx-auto flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label className="text-lg" htmlFor="category">
              Category
            </label>
            <input
              value={category}
              type="text"
              id="category"
              name="category"
              className="border py-1 px-2 rounded placeholder:text-gray-300"
              onChange={handleChange}
              placeholder="Please enter a category"
              required
            />
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
              required
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
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
