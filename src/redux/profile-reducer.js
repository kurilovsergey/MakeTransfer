import {UsersAPI} from '../../src/api/api'

const ADD_POST = "ADD_POST";
const UPDATE_NEWPOSTTEXT = "UPDATE_NEW_POST_TEXT";
const SET_USER_PROFILE = "SETUSERPROFILE"


let initialstate = {
  postData:   [
  {id: 1, message: "What is your club?", likes: 12},
  {id: 2, message: "I see your vidio!", likes: 13} 
  ],
  newposttext: 'type text',
  profile: null
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

export let getUserProfile = (userId) => {
  return (dispatch) => {
    UsersAPI.getProfile(userId).then(response => {
      dispatch(setuserprofile(response.data));
  });
}

  }


export default profile_reducer;