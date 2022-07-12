import { setDataToLocal } from "../Hooks/useLocalStorage";
export const authMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const authState = store.getState().auth;
    if ( action.type?.match('auth/loginState') ) {
      setDataToLocal('isLoggedIn',authState.isLoggedIn,false)
      setDataToLocal('user',authState.user.foundUser,null)
      setDataToLocal('token',authState.user.encodedToken,null)
    }else{
        localStorage.clear()
    }
    return result;
  };
