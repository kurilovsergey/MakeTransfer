import { ProfileAPI } from '../../src/api/api';
import {UsersAPI} from '../../src/api/api.js'

const SAVE_PHOTO_SUCCES = "SAVE_PHOTO_SUCCES"
const ADD_POST = "ADD_POST";
const UPDATE_NEWPOSTTEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SETUSERPROFILE";
const SET_STATUS = "SET_STATUS";


let initialstate = {
  postData:   [
  {id: 1, message: "What is your club?", likes: 12},
  {id: 2, message: "I see your vidio!", likes: 13} 
  ],
  newposttext: 'type text',
  profile: null,
  status: ""
};

const profile_reducer = (state = initialstate, action) => {
  
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
    return {...state, profile: {...state.profile, photos: action.photos}}
  }

  default:
   return state; 
}
}
 

 export let addpostactioncreator  = (text) => {
  return {
   type: ADD_POST,
   textpost: text
 }
}

export let setuserprofile  = (profile) => {
  return {
   type: SET_USER_PROFILE,
   profile
 }
}



export const setStatus  = (status) => {
  return {
   type: SET_STATUS,
   status
 }
}

export const savePhotoSucces  = (photos) => {
  debugger
  return {
   type: SAVE_PHOTO_SUCCES,
   photos
 }
}

export let getStatus = (userId) => async (dispatch) => {
    let response = await ProfileAPI.getStatus(userId)
      dispatch(setStatus(response.data));
}; 


export let updateStatus = (status) => async (dispatch) => {
  let response = await ProfileAPI.updateStatus(status)
     if (response.data.resultCode===0) { 
        dispatch(setStatus(status));
     }
    };

export let getUserProfile = (userId) => async (dispatch) => {
  console.log("tut")
    let response = await ProfileAPI.getProfile(userId)
    console.log("запрос профиля ",response)
      dispatch(setuserprofile(response.data));
  };

export let savePhoto = (file) => async (dispatch) => {
    let response = await ProfileAPI.savePhoto(file)
    console.log("file ",file);
    if (response.data.resultCode===0) { 
      dispatch(savePhotoSucces(response.data.data.photos));
   }
  };

  
  export let saveProfile = (profile, userId) => async (dispatch) => {
    let response = await ProfileAPI.saveProfile(profile)
    console.log("userid ",userId)
    response = await ProfileAPI.getProfile(userId)
    console.log("запрос профиля ",response)
      dispatch(setuserprofile(response.data));
  };


export default profile_reducer;