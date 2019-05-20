import React from 'react';
import Users from './Users';
import {connect} from 'react-redux';
import {followAC, unfollowAC, setUsersAC, setCurrentPageAC, setTotalCountAC} from '../../redux/users-reducer'


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


export default connect(mapStateToProps, mapDispatchToProps)(Users);