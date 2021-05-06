import { bool } from 'yup';
import { boolean } from 'yup/lib/locale';
import {UsersAPI} from '../api/api'
import {PhotosType, UserType} from '../types/types'

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";



let initialstate = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followinginProgress: [1] as Array<number>, //array of users id
  textErrorsUpdateProfile: ""
};


type InitialstateType = typeof initialstate;

const users_reducer = (state = initialstate, action: any): InitialstateType => {
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

 type FollowSuccessType  = ({type: typeof FOLLOW, userID: number});

 export let followSuccess  = (userID: number): FollowSuccessType => ({type: FOLLOW, userID });

 type UnfollowSuccessType  = ({type: typeof UNFOLLOW, userID: number});

 export let unfollowSuccess  = (userID: number): UnfollowSuccessType => ({type: UNFOLLOW, userID});

 type SetUsersType =  ({type: typeof SETUSERS, users: Array<UserType>});

 export let setUsers = (users: Array<UserType>):SetUsersType => ({type: SETUSERS, users});

 type SetCurrentPageType = ({type: typeof SET_CURRENT_PAGE, Page: number})
 
 export let setCurrentPage = (Page: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, Page});

 type SetTotalUsersCountType = ({type: typeof SET_TOTAL_COUNT, count: number})

 export let setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_COUNT, count: totalCount });

 type ToggleisFetchingType = ({type: typeof TOGGLE_IS_FETCHING, isFetching: boolean})

 export let toggleisFetching = (isFetching: boolean): ToggleisFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching })

 type ToggleisFollowinginProgressType = ({type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userID: number })
 
 export let toggleisFollowinginProgress = (isFetching: boolean, userID: number): ToggleisFollowinginProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID })

 export const getUsers = (Page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleisFetching(true));
    dispatch(setCurrentPage(Page));
    let data = await UsersAPI.getUsers(Page, pageSize)
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(toggleisFetching(false));

  
 };

 export const follow = (userID: number) => {
    return async (dispatch: any) => {
        dispatch(toggleisFollowinginProgress(true, userID));
        let response = await UsersAPI.follow(userID)
            if (response.data.resultCode==0) {dispatch(followSuccess(userID))}
            dispatch(toggleisFollowinginProgress(false, userID));
    }
};

export const unfollow = (userID: number) => {
    return async (dispatch: any) => {
        dispatch(toggleisFollowinginProgress(true, userID));
        let response = await UsersAPI.unfollow(userID)
            if (response.data.resultCode==0) {{dispatch(unfollowSuccess(userID))}
            dispatch(toggleisFollowinginProgress(false, userID));
    } 
}

};

 

export default users_reducer;