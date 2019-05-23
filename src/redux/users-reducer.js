const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialstate = {
  users:   [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false
};

const users_reducer = (state = initialstate, action) => {

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
        return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_COUNT: {
        return {...state, totalUsersCount: action.count}
    }
    case TOGGLE_IS_FETCHING: {
        return {...state, isFetching: action.isFetching}
    }
default:
   return state;
 }
};

 export let follow  = (userID) => ({type: FOLLOW, userID });

 export let unfollow  = (userID) => ({type: UNFOLLOW, userID});

 export let setUsers = (users) => ({type: SETUSERS, users});

 export let setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

 export let setTotalUsersCount = (totalCount) => ({type: SET_TOTAL_COUNT, count: totalCount });

 export let toggleisFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching })

export default users_reducer;