import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import high from "../assets/high.svg";
import low from "../assets/low.svg";

const EntryItem = ({ entry }) => {
  return (
    <div className="border shadow-sm rounded-xl bg-white cursor-pointer py-3">
      <div className="flex items-center">
        <div className="flex gap-4 items-center">
          <div className={` text-white py-7 px-6 rounded-l-xl `}>
            {entry.entryType ? <img src={high} /> : <img src={low} />}
          </div>
        </div>

        <div className="flex  justify-between items-center w-[85%] mx-auto px-3 ">
          <div className="flex flex-col gap-1">
            <h1 className=" text-[1.18rem] font-[500] md:text-xl">
              {entry?.title}
            </h1>
            <h6 className="text-sm text-gray-500">{entry.date}</h6>
          </div>

          <div className="px-5">
            <h2 className="font-[600]">Rs.{entry.amount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryItem;
