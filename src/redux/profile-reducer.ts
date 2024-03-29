import { ValidationError } from 'yup';
import { ProfileAPI } from '../api/api';
import { Dispatch } from 'react';
import {UsersAPI} from '../api/api.js'
import {PostType, ProfileType, PhotosType} from '../types/types'
import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './reduxstore';

const SAVE_PHOTO_SUCCES = "SAVE_PHOTO_SUCCES"
const ADD_POST = "ADD_POST";
const UPDATE_NEWPOSTTEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SETUSERPROFILE";
const SET_STATUS = "SET_STATUS";
const SET_RESPONSE_UPDATEPROFILE_ERROR = "SET_RESPONSE_UPDATEPROFILE_ERROR"



let initialstate = {
  postData:   [
  {id: 1, message: "What is your club?", likes: 12},
  {id: 2, message: "I see your vidio!", likes: 13} 
  ] as Array<PostType>,
  newposttext: 'type text',
  profile: null as ProfileType | null,
  status: "",
  messageError: ""
};

export type InitialstateType = typeof initialstate;



const profile_reducer = (state = initialstate, action: ActionsType): InitialstateType => {
  
  switch(action.type) {
  case ADD_POST: {
    let newpost = {
      id: 5,
      message: action.textpost,
      likes: 3
    };
 
    return {...state, postData: [...state.postData, newpost], newposttext: ""};
  } 
 
  case SET_STATUS: {
    return {...state,
    status: action.status}
  }
  
  case SET_USER_PROFILE: {
    return {...state, profile: action.profile}
  }

  case SAVE_PHOTO_SUCCES: {
    return {...state, profile: {...state.profile, photos: action.photos} as ProfileType} 
  }

  case SET_RESPONSE_UPDATEPROFILE_ERROR: {
    return {
      ...state, 
      messageError : action.messages
    }
  }

  default:
   return state; 
}
}

type ActionsType = AddpostactioncreatorType | SetuserprofileType | SetStatusType | SavePhotoSuccesType| setResponseUpdateProfileErrorMessageType ;

type DispatchType = Dispatch<ActionsType>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
 
type AddpostactioncreatorType = {
  type: typeof ADD_POST,
  textpost: string
}

 export let addpostactioncreator  = (text: string): AddpostactioncreatorType => {
  return {
   type: ADD_POST,
   textpost: text
 }
}

type SetuserprofileType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}

export let setuserprofile  = (profile: ProfileType): SetuserprofileType => {
  return {
   type: SET_USER_PROFILE,
   profile
 }
}

type SetStatusType = {
  type: typeof SET_STATUS,
  status: string
}


export const setStatus  = (status: string): SetStatusType  => {
  return {
   type: SET_STATUS,
   status
 }
}

type SavePhotoSuccesType = {
  type: typeof SAVE_PHOTO_SUCCES,
  photos: PhotosType
}

export const savePhotoSucces  = (photos: PhotosType): SavePhotoSuccesType => {
  return {
   type: SAVE_PHOTO_SUCCES,
   photos
 }
}

type setResponseUpdateProfileErrorMessageType = {
  type: typeof SET_RESPONSE_UPDATEPROFILE_ERROR,
  messages: string
}

export const setResponseUpdateProfileErrorMessage = (messages: string): setResponseUpdateProfileErrorMessageType => (
  { type: SET_RESPONSE_UPDATEPROFILE_ERROR,
    messages}
    )

export let getStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
    let response = await ProfileAPI.getStatus(userId)
      dispatch(setStatus(response.data)); //response.data
}; 


export let updateStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
  let response = await ProfileAPI.updateStatus(status)
     if (response.data.resultCode===0) { 
        dispatch(setStatus(status));
     }
    };

export let getUserProfile = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  console.log("tut")
    let response = await ProfileAPI.getProfile(userId)
    console.log("запрос профиля ",response)
      dispatch(setuserprofile(response.data));
  };

export let savePhoto = (file: File): ThunkType => async (dispatch: DispatchType) => {
    let response = await ProfileAPI.savePhoto(file)
    console.log("file ",file);
    if (response.data.resultCode===0) { 
      dispatch(savePhotoSucces(response.data.data.photos));
   }
  };

  
  export let saveProfile = (profile: ProfileType, userId: number): ThunkType => async (dispatch: DispatchType, getState) => {
    let response = await ProfileAPI.saveProfile(profile)
    
    if (response.data.resultCode===0) {
    let response = await ProfileAPI.getProfile(userId)
    console.log('profleAPI', response);
      dispatch(setuserprofile(response.data));
      dispatch(setResponseUpdateProfileErrorMessage(response.data.messages))
  } else {
    dispatch(setResponseUpdateProfileErrorMessage(response.data.messages[0]))
  }
}

export let resetMessageError = (): ThunkType => async (dispatch: DispatchType) => {
  dispatch(setResponseUpdateProfileErrorMessage(""));
}


export default profile_reducer;