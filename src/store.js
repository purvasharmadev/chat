import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth/auth-slice";
import postReducer from "./Features/post-slice"
import userReducer from "./Features/user-slice"
import { authMiddleware } from './Auth/auth-middleware';

const reducer = {
  auth: authReducer,
  post:postReducer,
  user:userReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(authMiddleware),
},


)
export  {store};