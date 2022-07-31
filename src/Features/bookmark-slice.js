import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"

//initial state
const initialStateValue = {
    bookmarkStatus:'idle',
    bookmark:[],
    bookmarkError:null
};


export  const getBookmarkedPostList = createAsyncThunk(
    "getBookmark",
    async(token,thunkAPI)=>{
        try{
            const res = await axios.get("/api/users/bookmark/",{
                headers:{
                    authorization:token
                }
            });
            console.log("res ", res.data)
            return res.data.bookmarks
        }catch(error){
            console.error("Err ", error)
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const bookmarkSlice = createSlice({
    name:"bookmark",
    initialState:initialStateValue,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(getBookmarkedPostList.pending,(state)=>{
            state.bookmarkStatus="loading bookmarks"
        })
        .addCase(getBookmarkedPostList.fulfilled,(state,action)=>{
            state.bookmark = action.payload;
            state.bookmarkStatus="bookmarks success";
            state.bookmarkError=null;
        })
        .addCase(getBookmarkedPostList.rejected,(state,action)=>{
            state.bookmarkError = action.payload;
            state.bookmarkStatus = "failed"
        })
    }
})

export const getBookmark = (state) => state.bookmark
export default bookmarkSlice.reducer;