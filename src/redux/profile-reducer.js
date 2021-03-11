import { ProfileAPI } from '../../src/api/api';
import {UsersAPI} from '../../src/api/api.js'

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

  case UPDATE_NEWPOSTTEXT: {
    return {...state,
     newposttext: action.newtext} 
  }

  case SET_STATUS: {
    return {...state,
    status: action.status}
  }
  
  case SET_USER_PROFILE: {
    return {...state, profile: action.profile}
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

export let updatenewposttext  = (text) => {
  return {
    type: UPDATE_NEWPOSTTEXT,
    newtext: text
  } 
}

export const setStatus  = (status) => {
  return {
   type: SET_STATUS,
   status
 }
}

export let getStatus = (userId) => (dispatch) => {
    ProfileAPI.getStatus(userId).then(response => {
      console.log('data= ',response.data);
      dispatch(setStatus(response.data));
  });
} 


export let updateStatus = (status) => (dispatch) => {
  console.log("status" , status);  
  ProfileAPI.updateStatus(status)
    .then(response => {
     if (response.data.resultCode===0) { 
        dispatch(setStatus(status));
     }
  });

}

export let getUserProfile = (userId) => {
  return (dispatch) => {
    ProfileAPI.getProfile(userId).then(response => {
      dispatch(setuserprofile(response.data));
  });
}
}



  


export default profile_reducer;