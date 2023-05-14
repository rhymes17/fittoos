import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import catService from "./catService";

const initialState = {
  categories: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  isCategory: false,
  isCategoryErr: false,
  message: "",
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      return await catService.getCategories();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create category
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (name, thunkAPI) => {
    try {
      return catService.createCategory(name);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

const catSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isCategory = false;
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isCategoryErr = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCategory = true;
        state.categories.push(action.payload);
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isCategoryErr = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = catSlice.actions;

export default catSlice.reducer;
