import React from 'react';
import Users from './Users';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalCountAC} from '../../redux/users-reducer'

class UsersContainer extends React.Component {
	
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=$(this.props.currentPage)&count=$(this.props.pageSize)`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                console.log(response.data.items);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                console.log(response.data.items);
            });
    }

render() {

return (
    <Users onPageChanged={this.onPageChanged}
    totalUsersCount={this.props.totalUsersCount}
    pageSize={this.props.pageSize}
    currentPage={this.props.currentPage}
    users={this.props.users}
    follow={this.props.follow}
    unfollow={this.props.unfollow}/>
       )}
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userID) => {
            dispatch(followAC(userID)); 
        },
        unfollow: (userID) => {
            dispatch(unfollowAC(userID)); 
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (p) => {
            dispatch(setCurrentPageAC(p));
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setTotalCountAC(totalCount));
        }
        }
    }


export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);