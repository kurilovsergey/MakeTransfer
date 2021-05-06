import React, { Component, Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
//import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import {BrowserRouter, HashRouter, Route, Switch, withRouter} from 'react-router-dom'
//import DialogsContainer from './components/Dialogs/DialogsContainer';
import Login from '././components/Login/Login'
import {connect} from 'react-redux';
import {initializeApp} from '../src/redux/app-reducer';
import { compose } from 'redux';
import Preloader from './components/common/Preloader/Preloader'
import {Provider} from "react-redux";
import store from './redux/reduxstore';
import {WithSuspence} from '../src/hoc/withSuspense'

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {

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
        <Route path='/dialogs' render= {WithSuspence(DialogsContainer)}/>
        <Route path='/profile/:userId?' render= {WithSuspence(ProfileContainer)} />
        <Route path='/users' render= {()=><UsersContainer />} />
        <Route path='/login' render= {()=><Login/>} />
        <Route path='*' render= {()=><>404 not found</>} />
        </Switch>
      </div>
      </div>
      </BrowserRouter>
      )
}
}

const mapStateToProps = (state) =>({
  initialized: state.App.initialized
});

let AppContainer =  connect(mapStateToProps,{initializeApp})(App);

let MainApp = (props) => {
  return (
  
   <Provider store={store}>
   <AppContainer/>
       </Provider>
       
  )
}

export default MainApp  