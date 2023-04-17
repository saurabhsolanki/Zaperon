import axios from "axios";
import { AUTH_LOGOUT, login_failure, login_loading, login_success, user_success } from "./authType";

export const LoginApi = (creds,navigate) => async (dispatch) => {
  dispatch({type:login_loading})
  try {
    let res = await axios.post("http://localhost:8080/user/login", creds);
    dispatch({ type: login_success, payload: res.data });
    // localStorage.setItem("token", JSON.stringify(res.data.token))
    navigate('/user')
  } catch (er) {
    dispatch({type:login_failure,payload:er.response.data})
  }
};


export const getUser=(token)=> async(dispatch)=>{
  let obj={
    token
  }
  try {
    let res = await axios.post("http://localhost:8080/user/userData", obj);
    dispatch({type:user_success, payload:res.data})
    console.log(res.data.data,"userData")
    if(res.data.data==="token expired"){
      alert("Please Login Again")
      logout()
    }
  } catch (error) {
    alert(error.response.data.message)
  }
}


export const logout=()=>({type:AUTH_LOGOUT})