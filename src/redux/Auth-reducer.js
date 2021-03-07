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
    ...action.data,
    isAuth: true
  }
  default:
    return state; 
}
};

  export const setAuthUserData = ( userID, login, email) => ({type:SET_USER_DATA, data:{ userID, login, email}});
  
  export const getAuthUserData = () => (dispatch) => {
    authAPI.me().then(response => {
      let {id,email,login}=response.data.data
      if (response.data.resultCode==0) {dispatch(setAuthUserData(id,login,email))}
      
  });
  } 

    export default Auth_reducer;