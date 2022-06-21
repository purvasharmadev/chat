import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth/auth-slice";


const reducer = {
  auth: authReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export  {store};