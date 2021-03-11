import React from 'react';
import Profile from './Profile.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getUserProfile, setuserprofile, updateStatus, getStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {WithAuthRedirect} from '../../components/../hoc/hoc'
import { compose } from 'redux';


 
class ProfileContainer extends React.Component {

    componentDidMount() {
        
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 5;
        }
        console.log(userId);
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
        
    }

  render() {
    
      return(
          <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>
      )
  }
}

let mapStateToProps = (state) => ({
profile: state.Wallpage.profile,
status: state.Wallpage.status
});

export default compose(
    connect(mapStateToProps, {setuserprofile, getUserProfile, updateStatus, getStatus}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)