import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getDataFromLocal } from "../Hooks/useLocalStorage";


// intial state
const intialStateValue = {
  isLoggedIn: getDataFromLocal("isLoggedIn",false),
  status: "idle",
  error: null,
};



export const login = createAsyncThunk(
  "api/auth/login",
  async (userDetail, thunkAPI) => {
    try {
      const res = await axios.post("/api/auth/login", userDetail);
      return   res.data

    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
  }
);

// rejected state not fetching error solve: https://stackoverflow.com/questions/70517819/redux-toolkit-not-checking-the-rejected-case
//  warning: non-serializable value detected in payload : https://stackoverflow.com/questions/66753905/redux-toolkit-non-serializable-value-detected
//  Local storage not working properly: https://stackoverflow.com/questions/68421040/local-storage-using-redux-toolkit
// add function to depedency for useEffect: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

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
    loginState:(state,action)=>{
      state.isLoggedIn=action.payload;
    },
    logout: (state, action) => {
      state.isLoggedIn = action.payload;
      state.status='idle'
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "login succeded";
        state.error=null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state) => {
        state.status = "signup succeded";
        state.error=null
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const getAuth = (state) => state.auth;
export const { logout, loginState } = authSlice.actions;
export default authSlice.reducer;
