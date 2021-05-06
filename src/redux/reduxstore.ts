import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunkMiddleware from 'redux-thunk';
import profile_reducer from './profile-reducer';
import dialog_reducer from './dialogs-reducer';
import users_reducer from './users-reducer';
import Auth_reducer from './Auth-reducer';  
import App_reducer from './app-reducer';


let RootReducers = combineReducers({
    Wallpage: profile_reducer,
    Messagepage: dialog_reducer,
    usersPage: users_reducer,
    Auth: Auth_reducer,
    App: App_reducer,
});

type RootReducerType = typeof RootReducers;

export type AppStateType = ReturnType<RootReducerType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));
  
//let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

