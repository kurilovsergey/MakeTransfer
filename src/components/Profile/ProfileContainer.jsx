import React from 'react';
import Profile from './Profile.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getUserProfile, setuserprofile, updateStatus, getStatus, savePhoto} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {WithAuthRedirect} from '../../components/../hoc/hoc'
import { compose } from 'redux';
import {getProfile, getStatusProfile, getAutorizatedUserID, getisAuth} from '../../redux/selectors/user/usersselectors'


 
class ProfileContainer extends React.Component {

   refreshProfile() {
      
            
    let userId = this.props.match.params.userId;
    if (!userId) {
        userId = this.props.autorizatedUserID;
    }
  
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);

   }
     
    componentDidMount() {      
      this.refreshProfile();    
    }

    componentDidUpdate = (prevProps, prevState) => {
      if (this.props.match.params.userId!=prevProps.match.params.userId) {
        this.refreshProfile();
      }
    }



  render() {
    
      return(
          <Profile {...this.props} 
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    isowner={!!this.props.match.params.userId}
                    savePhoto={this.props.savePhoto}
                    />
      )
  }
}


let mapStateToProps = (state) => ({
profile: getProfile(state),
status: getStatusProfile(state),
autorizatedUserID: getAutorizatedUserID(state),
isAuth: getisAuth(state)
});

/*
let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: state.Wallpage.status,
    autorizatedUserID: state.Auth.userID,
    isAuth: state.Auth.isAuth
    });
*/

export default compose(
    connect(mapStateToProps, {setuserprofile, getUserProfile, updateStatus, getStatus, savePhoto}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)