import React, { Component, Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar.jsx';
//import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import {BrowserRouter, HashRouter, Route, Switch, withRouter} from 'react-router-dom'
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from './components/Login/Login'
import {connect} from 'react-redux';
import {initializeApp} from './redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader'
import {Provider} from "react-redux";
import store, { AppStateType } from './redux/reduxstore';
import {WithSuspense} from './hoc/withSuspense'

//var UsersContainer = require("UsersContainer")

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
//const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

const SuspendedDialog = WithSuspense(DialogsContainer)
const SuspendedProfile = WithSuspense(ProfileContainer)

type PropsType = {
  initialized: boolean,
  initializeApp: () => void
}

class App extends React.Component<PropsType> {

  componentDidMount() {
    this.props.initializeApp();
}

render() {
  if (!this.props.initialized) {
    return <Preloader/>
  }

  return (
  	<BrowserRouter>
    <div className='app-wrapper'>
      <HeaderContainer />
      <Navbar />
      <div className='app-wrapper-content'>
        <Switch>
        <Route path='/dialogs' render= {()=><SuspendedDialog/>}/>
        <Route path='/profile/:userId?' render= {()=><SuspendedProfile/>} />
        <Route path='/users' render= {()=><UsersContainer/>} />
        <Route path='/login' render= {()=><Login/>} />
        <Route path='*' render= {()=><>404 not found</>} />
        </Switch>
      </div>
      </div>
    </BrowserRouter>
      )
}
}

const mapStateToProps = (state: AppStateType) =>({
  initialized: state.App.initialized
});

let AppContainer =  connect(mapStateToProps,{initializeApp})(App);

let MainApp: React.FC = () => {
  return (
  
   <Provider store={store}>
   <AppContainer/>
       </Provider>
       
  )
}

export default MainApp  