import {authAPI} from "../../src/api/api" 

const SET_USER_DATA="SET_USER_DATA";



let initialstate = {
  userID: null,
  login: null,
  email: null,
  isAuth: false
};

const Auth_reducer = (state = initialstate, action) => {
  switch(action.type) {
  case SET_USER_DATA: 
      return {
    ...state,
    ...action.payload
  }
  default:
    return state; 
}
};

export default Auth_reducer;

  export const setAuthUserData = ( userID, login, email, isAuth) => ({type:SET_USER_DATA, payload:{ userID, login, email, isAuth}});
  
  export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(response => {
      let {id,email,login}=response.data.data
      if (response.data.resultCode==0) {dispatch(setAuthUserData(id, login, email, true))}
      
  });
  } 

  export const login = (email,password, rememberme) => (dispatch) => {
    authAPI.login(email,password,rememberme).then(response => {
      if (response.data.resultCode==0) {dispatch(getAuthUserData())}
  });
  } 

  export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 
  });
  } 
  

