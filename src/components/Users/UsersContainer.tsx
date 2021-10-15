import React from 'react';
import Users from './Users';
import * as axios from 'axios';
import {connect} from 'react-redux';
import {follow, unfollow, getUsers} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {UsersAPI} from '../../api/api.js'
import { compose } from 'redux';
import {withAuthRedirect} from '../../hoc/hoc'
import { login } from '../../redux/Auth-reducer';
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/reduxstore'

type OwnPropsType = {
 own: number
}

type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    currentPage: number
    isFetching: boolean
    totalUsersCount: number
    followinginProgress: Array<number>
    isAuth: boolean
}

type MapDispatchToPropsType = {
    //onPageChanged: (pageNumber: number) => void 
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

type PropType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class UsersContainer extends React.Component<PropType> {
    
	
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);         
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);  
    }
  
render() {
return (
<>
{console.log(this.props)}
    {this.props.isFetching ? <Preloader/> : null}
    <Users 
    onPageChanged={this.onPageChanged}
    totalUsersCount={this.props.totalUsersCount}
    pageSize={this.props.pageSize}
    currentPage={this.props.currentPage}
    users={this.props.users}
    follow={this.props.follow}
    unfollow={this.props.unfollow}
    followinginProgress={this.props.followinginProgress}/>
</>
         )
       }
}


let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: state.usersPage.users, 
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followinginProgress: state.usersPage.followinginProgress,
        isAuth: state.Auth.isAuth
    }
}

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TOwnProps = DefaultState>
export default compose<React.ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
    mapStateToProps, {follow, unfollow, getUsers}),
    withAuthRedirect)(UsersContainer)
  
//connect(mapStateToProps,  
  //          {follow, unfollow, setCurrentPage, setCurrentPage, toggleisFollowinginProgress, getUsers})(UsersContainer);