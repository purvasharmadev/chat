import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialStateValue = {
  commentStatus: "idle",
  comment: [],
  commentsError: null,
};
//get comments
export const comments = createAsyncThunk("getComment", async (id, thunkAPI) => {
  try {
    const res = await axios.get(`/api/comments/${id}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.errors[0]);
  }
});

//add Comments
export const addComments = createAsyncThunk(
  "addComments",
  async ({ id, text, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/comments/add/${id}`,
        {
          commentData: text,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (CommentsError) {
      return thunkAPI.rejectWithValue(CommentsError.response.data.errors[0]);
    }
  }
);

//edit a comment
export const editComments = createAsyncThunk(
  "editComments",
  async ({ commentId, postId, text, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/comments/edit/${postId}/${commentId}`,
        {
          commentData: text,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (CommentsError) {
      return thunkAPI.rejectWithValue(CommentsError.response.data.errors[0]);
    }
  }
);

//delete a comment
export const deleteComments = createAsyncThunk(
  "deleteComments",
  async ({ commentId, postId, token }, thunkAPI) => {
    try {
      const res = await axios.delete(
        `/api/comments/delete/${postId}/${commentId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (CommentsError) {
      return thunkAPI.rejectWithValue(CommentsError.response.data.errors[0]);
    }
  }
);

//Upvote a comment
export const upvoteComments = createAsyncThunk(
  "upvoteComments",
  async ({ commentId, postId, token }, thunkAPI) => {

    try {
      const res = await axios.post(
        `/api/comments/upvote/${postId}/${commentId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (CommentsError) {
      return thunkAPI.rejectWithValue(CommentsError.response.data.errors[0]);
    }
  }
);

//downvote a comment
export const downvoteComments = createAsyncThunk(
  "downvoteComments",
  async ({ commentId, postId, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/comments/downvote/${postId}/${commentId}`,{},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data;
    } catch (CommentsError) {
      return thunkAPI.rejectWithValue(CommentsError.response.data.errors[0]);
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState: initialStateValue,
  reducers: {},
  extraReducers(builder) {
    builder
      //getcomments
      .addCase(comments.pending, (state) => {
        state.commentStatus = "comments loading";
      })
      .addCase(comments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "comments succeded";
        state.commentsError = null;
      })
      .addCase(comments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      })
      //addComments
      .addCase(addComments.pending, (state) => {
        state.commentStatus = "add comments loading";
      })
      .addCase(addComments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "add comments succeded";
        state.commentsError = null;
      })
      .addCase(addComments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      })
      //editComments
      .addCase(editComments.pending, (state) => {
        state.commentStatus = "edit comments loading";
      })
      .addCase(editComments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "edit comments succeded";
        state.commentsError = null;
      })
      .addCase(editComments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      })
      //deleteComments
      .addCase(deleteComments.pending, (state) => {
        state.commentStatus = "delete comments loading";
      })
      .addCase(deleteComments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "delete comments succeded";
        state.commentsError = null;
      })
      .addCase(deleteComments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      })
      //upvoteComments
      .addCase(upvoteComments.pending, (state) => {
        state.commentStatus = "delete comments loading";
      })
      .addCase(upvoteComments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "delete comments succeded";
        state.commentsError = null;
      })
      .addCase(upvoteComments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      })
      //downvoteComments
      .addCase(downvoteComments.pending, (state) => {
        state.commentStatus = "delete comments loading";
      })
      .addCase(downvoteComments.fulfilled, (state, action) => {
        state.comment = action.payload;
        state.commentStatus = "delete comments succeded";
        state.commentsError = null;
      })
      .addCase(downvoteComments.rejected, (state, action) => {
        state.commentsError = action.payload;
        state.commentStatus = "failed";
      });
  }
});

export const getComments = (state) => state.comment;

export default commentSlice.reducer;
