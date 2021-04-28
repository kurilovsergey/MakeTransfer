import {authAPI, securityAPI} from "../../src/api/api" 
const SET_RESPONSE_LOGIN_ERROR="SET_RESPONSE_LOGIN_ERROR"
const SET_USER_DATA="SET_USER_DATA";
const GET_CAPTCHAURL_SUCCES="GET_CAPTCHAURL_SUCCES"


let initialstate = {
  userID: null,
  login: null,
  email: null,
  isAuth: false,
  messages: "",
  captchaUrl: null
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
  case GET_CAPTCHAURL_SUCCES: {
    return {
      ...state, 
      captchaUrl : action.captchaUrl
    }
  }
  default:
    return state; 
}

};

export default Auth_reducer;

  export const setAuthUserData = ( userID, login, email, isAuth) => ({type:SET_USER_DATA, payload:{ userID, login, email, isAuth}});
  
  export const setResponseLoginErrorMessage = (messages) => ({type: SET_RESPONSE_LOGIN_ERROR, messages})
  
  export const getCaptchaUrlSucces = (captchaUrl) => ({
    type: GET_CAPTCHAURL_SUCCES,
    captchaUrl
  })

  export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
      let {id,email,login}=response.data.data
      if (response.data.resultCode==0) {dispatch(setAuthUserData(id, login, email, true))}
  };
  
  export const login = (email,password, rememberme, captcha) => async (dispatch) => {
    
    let response = await authAPI.login(email,password,rememberme, captcha)
    console.log('login RESP ',email,password, rememberme, captcha);
    if (response.data.resultCode==0) {dispatch(getAuthUserData())}
      else {
        console.log(response.data.resultCode)
        if (response.data.resultCode==10) {
          console.log("login response ",response);
          dispatch(getCaptchaUrl())
        }
         dispatch(setResponseLoginErrorMessage(response.data.messages[0]));
      }
  }; 

  export const logout = () => (dispatch) => {
    authAPI.logout().then(response => {
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 
  });
  } 
  
 export const getCaptchaUrl = () => async (dispatch) => {
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  console.log("capthca= ",captchaUrl)
  dispatch(getCaptchaUrlSucces(captchaUrl));
 }
