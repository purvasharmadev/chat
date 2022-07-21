import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// initial state
const initialStateValue = {
  userStatus: "idle",
  user: [],
  bookmark: [],
  userError: null,
};

export const users = createAsyncThunk("api/users", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/users");
    return res.data.users;
  } catch (userError) {
    return thunkAPI.rejectWithValue(userError.response.data.errors[0]);
  }
});

// Bookmark
export const getBookmarkedPostList = createAsyncThunk(
  "getBookmark",
  async (token, thunkAPI) => {
    try {
      const res = await axios.get("/api/users/bookmark/", {
        headers: {
          authorization: token,
        },
      });
      return res.data.bookmarks;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const saveToBookmark = createAsyncThunk(
  "saveToBookmark",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/users/bookmark/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data.bookmarks;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response.data.erorrs[0]);
    }
  }
);

export const removeFromBookmark = createAsyncThunk(
  "removeFromBookmark",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/users/remove-bookmark/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data.bookmarks;
    } catch (error) {
      console.error(error.response.data.errors[0]);
      return thunkAPI.rejectWithValue(error.response.data.erorrs[0]);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: initialStateValue,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(users.pending, (state) => {
        state.userStatus = "user loading";
      })
      .addCase(users.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userStatus = "user succeded";
        state.userError = null;
      })
      .addCase(users.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "user failed";
      });
    builder
      .addCase(getBookmarkedPostList.pending, (state) => {
        state.userStatus = "loading bookmarks list";
      })
      .addCase(getBookmarkedPostList.fulfilled, (state, action) => {
        state.bookmark = action.payload;
        state.userStatus = "get bookmarks success";
        state.userError = null;
      })
      .addCase(getBookmarkedPostList.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "failed";
      })
      .addCase(saveToBookmark.pending, (state) => {
        state.userStatus = "posting bookmarks";
      })
      .addCase(saveToBookmark.fulfilled, (state, action) => {
        state.bookmark = action.payload;
        state.userStatus = "post bookmarks success";
        state.userError = null;
      })
      .addCase(saveToBookmark.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "failed";
      })
      .addCase(removeFromBookmark.pending, (state) => {
        state.userStatus = "posting bookmarks";
      })
      .addCase(removeFromBookmark.fulfilled, (state, action) => {
        state.bookmark = action.payload;
        state.userStatus = "post bookmarks success";
        state.userError = null;
      })
      .addCase(removeFromBookmark.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "failed";
      });      
      ;
  },
});

export const getUser = (state) => state.user;
export default userSlice.reducer;
