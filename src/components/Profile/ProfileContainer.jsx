import React from 'react';
import Profile from './Profile.jsx'
import * as axios from 'axios';
import {connect} from 'react-redux';
import {setuserprofile} from '../../redux/profile-reducer'
 
class ProfileContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setuserprofile(response.data);
            });
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

  export default connect(mapStateToProps, {setuserprofile})(ProfileContainer);
