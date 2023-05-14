import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getEntries, reset } from "../features/entries/entrySlice";
import EntryItem from "../components/EntryItem";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import high from "../assets/high.svg";
import low from "../assets/low.svg";

const Home = () => {
  const [range, setRange] = useState("year");

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const { entries, isLoading, isSuccess, hasFetched, isError, message } =
    useSelector((state) => state.entry);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await dispatch(getEntries());
    };
    load();
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (entries && isSuccess) {
      callIncome();
      callExpense();

      dispatch(reset());
    }
  }, [isError, isSuccess]);

  const callIncome = () => {
    entries.map((entry) => {
      if (entry.entryType) {
        setIncome((prevState) => (prevState += parseInt(entry.amount, 10)));
      }
    });
  };
  const callExpense = () => {
    entries.map((entry) => {
      if (!entry.entryType) {
        setExpense((prevState) => (prevState += parseInt(entry.amount, 10)));
      }
    });
  };

  if (isLoading) return <h1>Loading</h1>;

  return (
    <div className="flex flex-col pt-5 pb-12">
      <div className="">
        <p className="text-gray-400 text-sm">Greetings!</p>
        <span className="text-lg">{user.username}</span>
      </div>

      <div className="my-5 bg-white flex flex-col py-5 px-4 rounded-lg shadow">
        <div className="flex justify-between">
          <h1 className="text-xl px-1 pb-4">Dashboard</h1>
          <p className="text-gray-600">{new Date().toDateString()}</p>
        </div>

        {/* <div className="border border-black md:w-[70%] w-[90%] mx-auto mb-4  py-1 rounded-full bg-white">
          <div className="w-[80%] mx-auto">
            <ul className="flex justify-between">
              <li
                className={`px-2 py-1 border border-transparent rounded-xl text-sm cursor-pointer ${
                  range === "daily" ? "bg-[#292D32] text-white" : "bg-white"
                }`}
                onClick={() => setRange("daily")}
              >
                Daily
              </li>
              <li
                className={`px-2 py-1 border border-transparent rounded-xl text-sm cursor-pointer ${
                  range === "month" ? "bg-[#292D32] text-white" : "bg-white"
                }`}
                onClick={() => setRange("month")}
              >
                Monthly
              </li>
              <li
                className={`px-2 py-1 border border-transparent rounded-xl text-sm cursor-pointer ${
                  range === "year" ? "bg-[#292D32] text-white" : "bg-white"
                }`}
                onClick={() => setRange("year")}
              >
                Yearly
              </li>
            </ul>
          </div>
        </div> */}

        <div className="border border-gray-300  py-5 rounded-lg w-[100%] md:w-[70%] mx-auto">
          <div className=" border text-center mx-auto  w-[60%] py-3 bg-gray-100 rounded ">
            <div className="flex justify-center items-center flex-wrap">
              {income - expense >= 0 ? <img src={high} /> : <img src={low} />}
              <h1 className="text-md px-2">Balance</h1>
            </div>
            <p>Rs. {income - expense}</p>
          </div>
          <div className="flex justify-between w-[90%] mx-auto my-5 gap-2">
            <div className=" border w-[50%] text-center py-2 bg-gray-100  rounded-lg px-2 ">
              <div className="flex justify-center items-center flex-wrap">
                <img src={high} />
                <h1 className="text-md px-2 text-[#33cc33]">Income</h1>
              </div>
              <p className="font">Rs. {income}</p>
            </div>
            <div className="border w-[50%] text-center py-2 rounded-lg bg-gray-100  px-2 ">
              <div className="flex justify-center items-center flex-wrap">
                <img src={low} />
                <h1 className="text-md px-2 text-[#ff3300]">Expense</h1>
              </div>
              <p className="font">Rs. {expense}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trasactions */}
      <div className="">
        <h1 className="text-3xl">Transactions</h1>

        <div className="flex flex-col gap-3 my-5 h-[20%] max-h-screen overflow-y-auto flex-grow">
          {entries.map((entry) => (
            <Link key={entry._id} to={`/transaction/${entry._id}`}>
              <EntryItem entry={entry} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
