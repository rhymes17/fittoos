import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { deleteEntry, getEntry, reset } from "../features/entries/entrySlice";
import { Link, useParams } from "react-router-dom";
import high from "../assets/high.svg";
import low from "../assets/low.svg";
import { toast } from "react-toastify";
import Delete from "../components/Delete";

const EntryPage = () => {
  const { entry, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.entry
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEntry(id));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (entry && isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message, entry]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Hero title="Entry Details" />
      <div className="bg-white shadow-md rounded-xl px-2 pb-5 mt-5 ">
        <div className="flex justify-between py-5 md:w-[90%] mx-auto">
          <div className="flex flex-col gap-1">
            <h2 className="text-gray-500">
              Title :{" "}
              <span className="text-[1.1rem] text-black">{entry?.title}</span>
            </h2>
            {entry.description && (
              <h2 className="text-gray-500">
                Description :{" "}
                <span className="text-[1.1rem] text-black">
                  {entry.description}
                </span>
              </h2>
            )}
            <h2 className="text-gray-500">
              Amount :{" "}
              <span className="text-[1.1rem] text-black">
                Rs.{entry.amount}
              </span>
            </h2>
            <h2 className="text-gray-500">
              Category :{" "}
              <span className="text-[1.1rem] text-black">{entry.category}</span>
            </h2>
            <h2 className="text-gray-500">
              Source :{" "}
              <span className="text-[1.1rem] text-black">{entry.source}</span>
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            {entry.entryType ? (
              <img className="h-[20%]" src={high} />
            ) : (
              <img className="h-[20%]" src={low} />
            )}
            <h2 className=" text-[1.1rem] md:text-xl">{entry.date}</h2>
          </div>
        </div>
        <div className="text-center">
          <Delete id={id} />
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
