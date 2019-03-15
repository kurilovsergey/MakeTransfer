import React from 'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Profile from './components/Profile/Profile.jsx';
import Dialogs from './components/Dialogs/Dialogs.jsx';
import {BrowserRouter, Route} from "react-router-dom"

const App = (props) => {

  return (
  	<BrowserRouter>
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path="/dialogs" render= {()=><Dialogs store={props.store}/>} />
        <Route path="/profile" render= {()=><Profile 
           state={props.state.Wallpage}
           dispatch={props.dispatch}
           />} />
      </div>
      </div>
      </BrowserRouter>
      )
}

export default App;