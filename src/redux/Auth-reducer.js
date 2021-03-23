import {authAPI} from "../../src/api/api" 
const SET_RESPONSE_LOGIN_ERROR="SET_RESPONSE_LOGIN_ERROR"
const SET_USER_DATA="SET_USER_DATA";



let initialstate = {
  userID: null,
  login: null,
  email: null,
  isAuth: false,
  messages: ""
};

const Auth_reducer = (state = initialstate, action) => {
  switch(action.type) {
  case SET_USER_DATA: 
      return {
    ...state,
    ...action.payload
  }
  case SET_RESPONSE_LOGIN_ERROR: {
    return {
      ...state, 
      messages : action.messages
    }
  }
  default:
    return state; 
}

};

export default Auth_reducer;

  export const setAuthUserData = ( userID, login, email, isAuth) => ({type:SET_USER_DATA, payload:{ userID, login, email, isAuth}});
  
  export const setResponseLoginErrorMessage = (messages) => ({type: SET_RESPONSE_LOGIN_ERROR, messages})

  export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(response => {
      let {id,email,login}=response.data.data
      if (response.data.resultCode==0) {dispatch(setAuthUserData(id, login, email, true))}
      
  });
  }
  

  export const login = (email,password, rememberme) => (dispatch) => {
    authAPI.login(email,password,rememberme).then(response => {
      console.log("mess ",response.data.messages[0]);
      if (response.data.resultCode==0) {dispatch(getAuthUserData())}
      else dispatch(setResponseLoginErrorMessage(response.data.messages[0]));
  });
  } 

  export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 
  });
  } 
  

