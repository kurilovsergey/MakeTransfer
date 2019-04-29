const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SETUSERS = "SETUSERS";

let initialstate = {
  users:   [
  {id: 1, photoUrl: 'https://s5o.ru/storage/simple/ru/edt/54/37/13/54/rue9ab1912e79.jpg', followed: false, profession: "Agent", fullname: "Mendech", status: "find player", location: {city: "Porto", country: 'Portugal'}},
  {id: 2, photoUrl: 'https://s5o.ru/storage/simple/ru/edt/6e/e2/c0/9e/rue620112b2df.png', followed: true, profession: "Player", fullname: "Cristiano Ronaldo", status: "find team", location: {city: "Tourin", country: 'Italy'}},
  {id: 3, photoUrl: 'https://s5o.ru/storage/simple/ru/edt/88/54/61/32/rue331fd6e268.jpg', location: {city: "Manchster", country: 'UK'}}
  ]
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
    case SETUSERS: 
    return {...state, users: [...state.users, ...action.users]};
    
default:
   return state;
 }
};

 export let followAC  = (userID) => ({type: FOLLOW, userID });

 export let unfollowAC  = (userID) => ({type: UNFOLLOW, userID});

 export const setUsersAC = (user) => ({type: SETUSERS });

export default users_reducer;