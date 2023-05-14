import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteEntry, reset } from "../features/entries/entrySlice";
import { useNavigate } from "react-router-dom";

const Delete = ({ id }) => {
  const { entry, isLoading, isError, isUpdated, isSuccess, message } =
    useSelector((state) => state.entry);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (entry && isUpdated) {
      toast.success("Entry deleted successfully");
      dispatch(reset());
      navigate("/");
    }
  }, [isError, isSuccess, message, entry]);

  const handleDelete = () => {
    dispatch(deleteEntry(id));
  };
  return (
    <button
      className="border-2 py-2 px-3 bg-black text-white shadow rounded-xl hover:bg-white hover:border-black hover:text-black ani"
      onClick={handleDelete}
    >
      Delete Entry
    </button>
  );
};

export default Delete;
