import { boolean } from "yup/lib/locale";
import {authAPI, securityAPI} from "../api/api" 
const SET_RESPONSE_LOGIN_ERROR="SET_RESPONSE_LOGIN_ERROR"
const SET_USER_DATA="SET_USER_DATA";
const GET_CAPTCHAURL_SUCCES="GET_CAPTCHAURL_SUCCES"

type InitialstateType= {
  userID: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,
  messages: string | null,
  captchaUrl: string | null,
};

let initialstate: InitialstateType = {
  userID: null,
  login: null,
  email: null,
  isAuth: false,
  messages: "",
  captchaUrl: null
};

const Auth_reducer = (state = initialstate, action: any): InitialstateType => {
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

type setAuthUserDataActionPaylaodType = {
  userID: number | null,
  login: string | null,
  email: string | null,
  isAuth: boolean,

}

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataActionPaylaodType
}

export default Auth_reducer;

export const setAuthUserData = ( userID: number | null, login: string | null, email: string | null, isAuth: boolean): setAuthUserDataActionType => ({type:SET_USER_DATA, payload:{ userID, login, email, isAuth}});

type getCaptchaUrlSucces = {
  type: typeof GET_CAPTCHAURL_SUCCES,
  captchaUrl: string
}

export const getCaptchaUrlSucces = (captchaUrl: string): getCaptchaUrlSucces => ({
  type: GET_CAPTCHAURL_SUCCES,
  captchaUrl
})

export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me()
    let {id,email,login}=response.data.data
    if (response.data.resultCode==0) {dispatch(setAuthUserData(id, login, email, true))}
};

export const setResponseLoginErrorMessage = (messages: string) => ({type: SET_RESPONSE_LOGIN_ERROR, messages})
  
export const login = (email: string ,password: string, rememberme: boolean, captcha: string) => async (dispatch: any) => {
    let response = await authAPI.login(email,password,rememberme, captcha)
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

  /* 
    export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 
  });
  } 
  */

  export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout();
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 

  } 
  
 export const getCaptchaUrl = () => async (dispatch : any) => {
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  console.log("capthca= ",captchaUrl)
  dispatch(getCaptchaUrlSucces(captchaUrl));
 }
