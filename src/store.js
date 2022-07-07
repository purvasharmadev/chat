import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./Auth/auth-slice";
import { authMiddleware } from './Auth/auth-middleware';

const reducer = {
  auth: authReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(authMiddleware),
},


)
export  {store};