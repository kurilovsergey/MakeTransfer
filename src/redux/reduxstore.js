import {createStore, combineReducers, applyMiddleware} from "redux";
import profile_reducer from './profile-reducer';
import dialog_reducer from './dialogs-reducer';
import users_reducer from './users-reducer';
import Auth_reducer from './Auth-reducer';
import thunkMiddleware from "redux-thunk"



let reducers = combineReducers({
    Wallpage: profile_reducer,
    Messagepage: dialog_reducer,
    usersPage: users_reducer,
    Auth: Auth_reducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

