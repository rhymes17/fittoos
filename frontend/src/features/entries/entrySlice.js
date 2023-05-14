import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import entryService from "./entryService";

const initialState = {
  entries: [],
  entry: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: false,
  isUpdated: false,
};

export const getEntries = createAsyncThunk(
  "entry/getEntries",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await entryService.getEntries(token);
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

export const getEntry = createAsyncThunk(
  "entry/getEntry",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await entryService.getEntry(id, token);
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

//Create entry
export const createEntry = createAsyncThunk(
  "entry/createEntry",
  async (entry, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await entryService.createEntry(entry, token);
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

//Update the entry
export const updateEntry = createAsyncThunk(
  "entry/updateEntry",
  async ({ id, entry }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await entryService.updateEntry(id, entry, token);
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

export const deleteEntry = createAsyncThunk(
  "'entry/deleteEntry",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await entryService.deleteEntry(id, token);
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

const entrySlice = createSlice({
  name: "entry",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entries = action.payload;
      })
      .addCase(getEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.entries = [];
      })
      .addCase(getEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entry = action.payload;
      })
      .addCase(getEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.entry = {};
      })
      .addCase(createEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.entry = action.payload;
      })
      .addCase(createEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.entry = {};
      })
      .addCase(deleteEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.entry = action.payload;
      })
      .addCase(deleteEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.entry = {};
        state.isUpdated = false;
      })
      .addCase(updateEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdated = true;
        state.entry = action.payload;
      })
      .addCase(updateEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.entry = {};
        state.isUpdated = false;
      });
  },
});

export const { reset } = entrySlice.actions;

export default entrySlice.reducer;
