import {createStore, combineReducers} from "redux";
import profile_reducer from './profile-reducer';
import dialog_reducer from './dialogs-reducer';

let reducers = combineReducers({
    Wallpage: profile_reducer,
    Messagepage: dialog_reducer
});

let store = createStore(reducers);

export default store;

