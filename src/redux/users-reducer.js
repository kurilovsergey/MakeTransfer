import {UsersAPI} from '../../src/api/api'

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";



let initialstate = {
  users:   [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followinginProgress: [1]
};

const users_reducer = (state = initialstate, action) => {
console.log('user reduce ', action);
switch(action.type) {
    case FOLLOW:
    return {
        ...state,
         users: state.users.map(i => {
             if (i.id === action.userID) {
             return {...i, followed: true}
         }
         return i;
        })
    }
    case UNFOLLOW:
    return {
        ...state,
         users: state.users.map(i => {
             if (i.id === action.userID) {
             return {...i, followed: false}
         }
         return i;
        })
    }
    case SETUSERS: {
        return { ...state, users: action.users }
    }
    case SET_CURRENT_PAGE: {
        return {...state, currentPage: action.Page}
    }
    case SET_TOTAL_COUNT: {
        return {...state, totalUsersCount: action.count}
    }
    case TOGGLE_IS_FETCHING: {
        return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
        return {...state,
         followinginProgress: action.isFetching 
         ? [...state.followinginProgress, action.userID]
         : state.followinginProgress.filter(id => id!=action.userID)
        }
    }
default:
   return state;
 }
};

 export let followSuccess  = (userID) => ({type: FOLLOW, userID });

 export let unfollowSuccess  = (userID) => ({type: UNFOLLOW, userID});

 export let setUsers = (users) => ({type: SETUSERS, users});

 export let setCurrentPage = (Page) => ({type: SET_CURRENT_PAGE, Page});

 export let setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_COUNT, count: totalCount });

 export let toggleisFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

 export let toggleisFollowinginProgress = (isFetching, userID) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })

 export const getUsers = (Page, pageSize) => {
      return (dispatch) => {
    dispatch(toggleisFetching(true));
    dispatch(setCurrentPage(Page));
    UsersAPI.getUsers(Page, pageSize).then(data => {
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleisFetching(false));
    });
  }
 };

 export const follow = (userID) => {
    return (dispatch) => {
        dispatch(toggleisFollowinginProgress(true, userID));
        UsersAPI.follow(userID).then(response => {
            if (response.data.resultCode==0) {dispatch(followSuccess(userID))}
            dispatch(toggleisFollowinginProgress(false, userID));
  });
}
};

export const unfollow = (userID) => {
    return (dispatch) => {
        dispatch(toggleisFollowinginProgress(true, userID));
        UsersAPI.unfollow(userID).then(response => {
            if (response.data.resultCode==0) {dispatch(unfollowSuccess(userID))}
            dispatch(toggleisFollowinginProgress(false, userID));
  });
}
};

 

export default users_reducer;