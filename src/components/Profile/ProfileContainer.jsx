import React from 'react';
import Profile from './Profile.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {getUserProfile, setuserprofile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';

 
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
      debugger
      return(
          <Profile {...this.props} profile={this.props.profile}/>
      )
  }
}

let mapStateToProps = (state) => ({
profile: state.Wallpage.profile
});

let WithURLdataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {setuserprofile, getUserProfile})(WithURLdataContainerComponent);
