import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialStateValue = {
  postStatus: "idle",
  post: [],
  postError: null,
};
//get post
export const posts = createAsyncThunk("getPosts", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/posts");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0])
  }
});
//add post
export const addPosts = createAsyncThunk(
  "addPost",
  async ({ item, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        "/api/posts",
        {
          postData: {
            content: item,
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (postError) {
      return thunkAPI.rejectWithValue(postError.response.data.errors[0]);
    }
  }
);

// edit post
export const editPosts = createAsyncThunk(
  "editPost",
  async ({ item, id, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/posts/edit/${id}`,
        {
          postData: {
            content: item,
          },
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (postError) {
      return thunkAPI.rejectWithValue(postError.response.data.errors[0]);
    }
  }
);

//delete post
export const deletePost = createAsyncThunk(
  "deletePost",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/posts/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } catch (postError) {
      return thunkAPI.rejectWithValue(postError.response.data.errors[0]);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState: initialStateValue,
  reducers: {},
  extraReducers(builder) {
    builder
      //post
      .addCase(posts.pending, (state) => {
        state.postStatus = "post loading";
      })
      .addCase(posts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post succeded";
        state.postError = null;
      })
      .addCase(posts.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      })
      //add post
      .addCase(addPosts.pending, (state) => {
        state.postStatus = "adding post";
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post added";
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      })
      //edit post
      .addCase(editPosts.pending, (state) => {
        state.postStatus = "editing post";
      })
      .addCase(editPosts.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post edited";
      })
      .addCase(editPosts.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      })
      //delete post
      .addCase(deletePost.pending, (state) => {
        state.postStatus = "deleting post";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post deleted";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      });
  },
});

export const getPost = (state) => state.post;
export default postSlice.reducer;
