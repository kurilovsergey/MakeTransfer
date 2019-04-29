import {createStore, combineReducers} from "redux";
import profile_reducer from './profile-reducer';
import dialog_reducer from './dialogs-reducer';
import users_reducer from './users-reducer';

let reducers = combineReducers({
    Wallpage: profile_reducer,
    Messagepage: dialog_reducer,
    usersPage: users_reducer
});

let store = createStore(reducers);

export default store;

