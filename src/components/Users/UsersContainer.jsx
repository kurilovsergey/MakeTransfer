import React from 'react';
import Users from './Users';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleisFetching, toggleisFollowinginProgress, getUsers} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {UsersAPI} from '../../api/api.js'
import { compose } from 'redux';
import {WithAuthRedirect} from '../../components/../hoc/hoc'
import { login } from '../../redux/Auth-reducer';
 
class UsersContainer extends React.Component {
	
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
            
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        
    }
  
render() {

return <>
    {this.props.isFetching ? <Preloader/> : null}
    <Users onPageChanged={this.onPageChanged}
    totalUsersCount={this.props.totalUsersCount}
    pageSize={this.props.pageSize}
    currentPage={this.props.currentPage}
    users={this.props.users}
    follow={this.props.follow}
    unfollow={this.props.unfollow}
    followinginProgress={this.props.followinginProgress}
    />
       </>
       }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followinginProgress: state.usersPage.followinginProgress
    }
}

/*отравил object mapstatetiprops в connect
let mapDispatchToProps = (dispatch) => {
    return {
      follow: followAC,
      unfollow: unfollowAC,
      setUsers: setUsersAC,
      setCurrentPage: setCurrentPageAC,
      setTotalUsersCount: setTotalCountAC,
      toggleisFetching: toggleisFetchingAC
       }
    }
*/



export default compose(connect(mapStateToProps,  
    {follow, unfollow, setCurrentPage, setCurrentPage, toggleisFollowinginProgress, getUsers}),
    WithAuthRedirect)(UsersContainer)
//connect(mapStateToProps,  
  //          {follow, unfollow, setCurrentPage, setCurrentPage, toggleisFollowinginProgress, getUsers})(UsersContainer);