import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialStateValue = {
  postStatus: "idle",
  post: [],
  singlePost:[],
  postError: null,
};
//get post
export const posts = createAsyncThunk("getPosts", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/posts");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

//get post by id
export const postsById = createAsyncThunk(
  "getPostsById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

//add post
export const addPosts = createAsyncThunk(
  "addPost",
  async ({ item, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        "/api/posts",
        {
          postData: {
            comments: [],
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

//like post
export const likePost = createAsyncThunk(
  "likePost",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/posts/like/${id}`,
        {},
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

//dislike post
export const dislikePost = createAsyncThunk(
  "dislikePost",
  async ({ id, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/posts/dislike/${id}`,
        {},
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

export const postSlice = createSlice({
  name: "post",
  initialState: initialStateValue,
  reducers: {
    allPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      //get post
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
      //get post by id
      .addCase(postsById.pending, (state) => {
        state.postStatus = "single post loading";
      })
      .addCase(postsById.fulfilled, (state, action) => {
        state.singlePost = action.payload;
        state.postStatus = "single post succeded";
        state.postError = null;
      })
      .addCase(postsById.rejected, (state, action) => {
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
      })
      //like post
      .addCase(likePost.pending, (state) => {
        state.postStatus = "liking post";
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post liked";
      })
      .addCase(likePost.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      })
      //dislike post
      .addCase(dislikePost.pending, (state) => {
        state.postStatus = "liking post";
      })
      .addCase(dislikePost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.postStatus = "post liked";
      })
      .addCase(dislikePost.rejected, (state, action) => {
        state.postError = action.payload;
        state.postStatus = "failed";
      });
  },
});

export const getPost = (state) => state.post;
export const { allPost } = postSlice.actions;

export default postSlice.reducer;
