import React from 'react';
import Users from './Users';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleisFetching} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
 
class UsersContainer extends React.Component {
	
    componentDidMount() {
        this.props.toggleisFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=$(this.props.currentPage)&count=$(this.props.pageSize)`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                this.props.toggleisFetching(false);
                console.log(response.data.items);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleisFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.toggleisFetching(false);
                console.log(response.data.items);
            });
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
    unfollow={this.props.unfollow}/>
       </>
       }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
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

export default connect(mapStateToProps,  
            {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleisFetching})(UsersContainer);