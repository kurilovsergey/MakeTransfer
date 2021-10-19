import { boolean } from "yup/lib/locale";
import {authAPI, ResultCode, securityAPI} from "../api/api" 
import { Dispatch } from 'react';
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AppStateType, InferActionsType, BaseThunkType } from "./reduxstore";
import { Action } from "redux";

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



//type ActionsType = setAuthUserDataType | getCaptchaUrlSuccesType | setResponseLoginErrorMessageType;

type DispatchType = Dispatch<ActionsType>

type ActionsType = InferActionsType<typeof actions>

export type ThunkType = BaseThunkType<ActionsType>


export default Auth_reducer;

const actions = {
  setAuthUserData: ( userID: number | null, login: string | null, email: string | null, isAuth: boolean) =>
    ({type:SET_USER_DATA,
    payload:{ userID, login, email, isAuth}} as const),

  getCaptchaUrlSucces: (captchaUrl: string) => ({
    type: GET_CAPTCHAURL_SUCCES,
    captchaUrl
  } as const),

  setResponseLoginErrorMessage: (messages: string) => ({type: SET_RESPONSE_LOGIN_ERROR, messages})
}




export const getAuthUserData = (): ThunkType => async (dispatch: DispatchType) => {
  let MeData = await authAPI.me()
  
    let {id, email, login}=MeData.data
    if (MeData.resultCode == ResultCode.Success) {dispatch(actions.setAuthUserData(id, login, email, true))}
};


  
export const login = (email: string ,password: string, rememberme: boolean, captcha: string):
ThunkAction<Promise<void>, AppStateType, unknown, ActionsType> => async (dispatch) => {
    let LoginData = await authAPI.login(email,password,rememberme, captcha)
    if (LoginData.resultCode==ResultCode.Success) {dispatch(getAuthUserData())}
      else {
        console.log(LoginData.resultCode)
        if (LoginData.resultCode==ResultCode.CaptchaIsRequired) {
          dispatch(getCaptchaUrl())
        }
         dispatch(actions.setResponseLoginErrorMessage(LoginData.messages[0]));
      }
  }; 

  /* 
    export const logout = () => (dispatch: any) => {
    authAPI.logout().then(response => {
      if (response.data.resultCode==0) {dispatch(setAuthUserData(null, null, null, false))} 
  });
  } 
  */

  export const logout = (): ThunkType => async (dispatch: DispatchType) => {
    let response = await authAPI.logout();
    //@ts-ignore
      if (response.data.resultCode==0) {dispatch(actions.setAuthUserData(null, null, null, false))} 

  } 
  
 export const getCaptchaUrl = (): ThunkType => async (dispatch : DispatchType) => {
  let response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(actions.getCaptchaUrlSucces(captchaUrl));
 }
