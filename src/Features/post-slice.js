import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// initial state
const initialStateValue = {
  postStatus: "idle",
  post:[],
  postError: null,
};



export const posts = createAsyncThunk(
  "api/posts",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/api/posts");
      return res.data

    } catch (postError) {
      return thunkAPI.rejectWithValue(postError.response.data.postErrors[0]);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialStateValue,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(posts.pending, (state) => {
        state.postStatus = "post loading";
      })
      .addCase(posts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post succeded";
        state.postError=null;
      })
      .addCase(posts.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "post failed";
      })},
});

export const getPost = (state) => state.post;
export default postSlice.reducer;
