import { AUTH_LOGOUT, login_failure, login_loading, login_success, user_success } from "./authType";

const initState = {
  token: "",
  username:"",
  error:"",
  loading:false,
  userInfo:{}
};
export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {

    case login_loading:{
      return {
        ...state,
        loading:true
      }
    }

    case login_success:{
      return {
        ...state,
        token: payload.token,
        username:payload.user,
        
      };
    }

    case login_failure:{
      return {
        ...state,
        error:payload.message
      }
    }

    case user_success:{
      return {
        ...state,
        userInfo:payload.data
      }
    }
    

    case AUTH_LOGOUT: {
      return {
        ...state,
        token: "",
      };
    }

    default:
      return state;
  }
};
