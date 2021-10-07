import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { bool } from 'yup';
import { boolean } from 'yup/lib/locale';
import {UsersAPI} from '../api/api'
import {PhotosType, UserType} from '../types/types'
import { AppStateType, InferActionsType, BaseThunkType } from './reduxstore';


let initialstate = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followinginProgress: [1] as Array<number>, //array of users id
  textErrorsUpdateProfile: ""
};

//type ActionsType = FollowSuccessType | UnfollowSuccessType | SetUsersType | SetCurrentPageType | SetTotalUsersCountType | ToggleisFetchingType | ToggleisFollowinginProgressType;


type InitialstateType = typeof initialstate;

const users_reducer = (state = initialstate, action: ActionsType): InitialstateType => {
console.log('user reduce ', action);
switch(action.type) {
    case 'FOLLOW':
    return {
        ...state,
         users: state.users.map(i => {
             if (i.id === action.userID) {
             return {...i, followed: true}
         }
         return i;
        })
    }
    case 'UNFOLLOW':
    return {
        ...state,
         users: state.users.map(i => {
             if (i.id === action.userID) {
             return {...i, followed: false}
         }
         return i;
        })
    }
    case 'SETUSERS': {
        return { ...state, users: action.users }
    }
    case 'SET_CURRENT_PAGE': {
        return {...state, currentPage: action.Page}
    }
    case 'SET_TOTAL_COUNT': {
        return {...state, totalUsersCount: action.count}
    }
    case 'TOGGLE_IS_FETCHING': {
        return {...state, isFetching: action.isFetching}
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

export let actions = {

   followSuccess: (userID: number) => ({type: 'FOLLOW', userID } as const),

   unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),

   setUsers: (users: Array<UserType>)  => ({type: 'SETUSERS', users} as const),
 
   setCurrentPage: (Page: number) => ({type: 'SET_CURRENT_PAGE', Page} as const),

   setTotalUsersCount: (totalCount: number) => ({type: 'SET_TOTAL_COUNT', count: totalCount } as const),

   toggleisFetching: (isFetching: boolean)  => ({type: 'TOGGLE_IS_FETCHING', isFetching } as const),

   toggleisFollowinginProgress: (isFetching: boolean, userID: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userID } as const)

}

// PropertyType<T> = T extends {[key: string]: infer U } ? U : never

//type InferActionsType<T extends {[key: string]: (...args: any[])=> any}> = ReturnType<PropertyType<T>> 

type ActionsType = InferActionsType<typeof actions>

type DispatchType = Dispatch<ActionsType>


export type ThunkType = BaseThunkType<ActionsType>

//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

 export const getUsers = (Page: number, pageSize: number): ThunkType  => async (dispatch: DispatchType) => {
    dispatch(actions.toggleisFetching(true));
    dispatch(actions.setCurrentPage(Page));
    let data = await UsersAPI.getUsers(Page, pageSize)
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        dispatch(actions.toggleisFetching(false));

  
 };

 export const follow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.toggleisFollowinginProgress(true, userID));
        let response = await UsersAPI.follow(userID)
            if (response.data.resultCode==0) {dispatch(actions.followSuccess(userID))}
            dispatch(actions.toggleisFollowinginProgress(false, userID));
    }
};

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch: DispatchType) => {
        dispatch(actions.toggleisFollowinginProgress(true, userID));
        let response = await UsersAPI.unfollow(userID)
            if (response.data.resultCode==0) {{dispatch(actions.unfollowSuccess(userID))}
            dispatch(actions.toggleisFollowinginProgress(false, userID));
    } 
}

};

 

export default users_reducer;