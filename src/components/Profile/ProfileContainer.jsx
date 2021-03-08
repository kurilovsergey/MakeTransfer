import React from 'react';
import Profile from './Profile.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getUserProfile, setuserprofile} from '../../redux/profile-reducer';
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
    }

  render() {
    
      return(
          <Profile {...this.props} profile={this.props.profile}/>
      )
  }
}

let mapStateToProps = (state) => ({
profile: state.Wallpage.profile
});

export default compose(
    connect(mapStateToProps, {setuserprofile, getUserProfile}),
    withRouter,
    WithAuthRedirect
)(ProfileContainer)