import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// initial state
const initialStateValue = {
  userStatus: "idle",
  user:[],
  userError: null,
};



export const users = createAsyncThunk(
  "api/users",
  async (thunkAPI) => {
    try {
      const res = await axios.get("/api/users");
      return res.data

    } catch (userError) {
      return thunkAPI.rejectWithValue(userError.response.data.errors[0]);
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
        state.userError=null;
      })
      .addCase(users.rejected, (state, action) => {
        state.userError = action.payload;
        state.userStatus = "user failed";
      })},
});

export const getUser = (state) => state.user;
export default userSlice.reducer;
