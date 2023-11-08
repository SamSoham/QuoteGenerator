import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  error: "",
  isLoading: false,
};

export const fetchPosts = createAsyncThunk("fetchPosts", async (tag, { rejectWithValue }) => {
  let URL;
  if (tag) {
    URL = `https://api.quotable.io/random?tags=${tag}`;
  } else {
    URL = "https://api.quotable.io/random";
  }
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (err) {
    return  rejectWithValue("Quote for this Tag is not availabel")
  }
});

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error=false
        state.posts.push(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error= action.payload
        state.isLoading = false;
      });
  },
});

//get all post in state
export const selectAllpost = (state) => state.posts.posts;
export const selectPostLoading = (state) => state.posts.isLoading;
export const getPostError = (state) => state.posts.error;

export default postSlice.reducer;
