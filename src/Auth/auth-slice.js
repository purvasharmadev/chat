import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDataFromLocal } from "../Hooks/useLocalStorage";


// intial state
const intialStateValue = {
  user: getDataFromLocal("userInfo", null),
  isLoggedIn: getDataFromLocal("isLoggedIn", false),
  status: "idle", // 'idle'| 'loading'|'succeded'|'failed'
  error: null,
};

export const login = createAsyncThunk(
  "api/auth/login",
  async (userDetail, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/login", userDetail);
      localStorage.setItem("token ", res.data.encodedToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

// rejected state not fetching error solve: https://stackoverflow.com/questions/70517819/redux-toolkit-not-checking-the-rejected-case
//  warning: non-serializable value detected in payload : https://stackoverflow.com/questions/66753905/redux-toolkit-non-serializable-value-detected

export const signup = createAsyncThunk(
  "api/auth/signup",
  async (userDetail, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/signup", userDetail);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: intialStateValue,
  reducers: {
    logout: (state, action) => {
      state.isLoggedIn = action.payload;
      state.user = null;
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.status = "succeded";
        state.error=null
        localStorage.setItem("isLoggedIn", state.isLoggedIn);
        localStorage.setItem("userInfo", JSON.stringify(state.user.foundUser));
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "succeded";
        state.error=null
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getAuth = (state) => state.auth;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
