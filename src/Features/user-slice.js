import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDataFromLocal } from "../Hooks/useLocalStorage";

// initial state
const initialStateValue = {
  userStatus: "idle",
  user: [],
  userInfo: getDataFromLocal("user", []),
  bookmark: [],
  userError: null,
};

// User
export const users = createAsyncThunk("api/users", async (thunkAPI) => {
  try {
    const res = await axios.get("/api/users");
    return res.data.users;
  } catch (userError) {
    return thunkAPI.rejectWithValue(userError.response.data.errors[0]);
  }
});

// Get user by id
export const getUserById = createAsyncThunk(
  "api/userId",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/api/users/${id}`);
      console.log("res ", res.data.user);
      return res.data.user;
    } catch (userError) {
      console.error(userError);
      return thunkAPI.rejectWithValue(userError.response.data.errors[0]);
    }
  }
);

//Edit User
export const editUser = createAsyncThunk(
  "editUser",
  async ({ data, token }, thunkAPI) => {
    try {
      const res = await axios.post(
        "/api/users/edit/",
        {
          userData: data,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      return res.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

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
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
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

//follow
export const followUser = createAsyncThunk(
  "followUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/users/follow/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("res ", res.data)
      return res.data;
    } catch (error) {
      console.error(error.response.data.errors[0]);
      return thunkAPI.rejectWithValue(error.response.data.erors[0]);
    }
  }
);
//unfollow
export const unfollowUser = createAsyncThunk(
  "unfollowUser",
  async ({ token, id }, thunkAPI) => {
    try {
      const res = await axios.post(
        `/api/users/unfollow/${id}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("res unfollow", res.data)
      return res.data;
    } catch (error) {
      console.error(error.response.data.errors[0]);
      return thunkAPI.rejectWithValue(error.response.data.erors[0]);
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
      })
      .addCase(getUserById.pending, (state) => {
        state.userStatus = "user loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        console.log("state.userInfo ", state.userInfo);
        state.userStatus = "user succeded";
        state.userError = null;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "user failed";
      })
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
      })
      .addCase(editUser.pending, (state) => {
        state.userStatus = "edit user pending";
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "edit user success";
        state.userError = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "failed";
      })
      .addCase(followUser.pending, (state) => {
        state.userStatus = "user loading";
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.userStatus = "user succeded";
        state.userError = null;
      })
      .addCase(followUser.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "user failed";
      })
      .addCase(unfollowUser.pending, (state) => {
        state.userStatus = "user loading";
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.userInfo = action.payload.user;
        state.userStatus = "user succeded";
        state.userError = null;
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "user failed";
      });      
      ;
  },
});

export const getUser = (state) => state.user;
export default userSlice.reducer;
