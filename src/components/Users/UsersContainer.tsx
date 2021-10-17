import React from 'react';
import Users from './Users';
import * as axios from 'axios';
import {connect, useSelector} from 'react-redux';
import {follow, unfollow, getUsers} from '../../redux/users-reducer'
import Preloader from '../common/Preloader/Preloader'
import {UsersAPI} from '../../api/api.js'
import { compose } from 'redux';
import {withAuthRedirect} from '../../hoc/hoc'
import { login } from '../../redux/Auth-reducer';
import {UserType} from '../../types/types'
import {AppStateType} from '../../redux/reduxstore'
import {FilterType} from '../../redux/users-reducer'
import { getCurrentPage, getIsFetching, getPageSize, getTotalUsersCount } from '../../redux/selectors/user/usersselectors';

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
    isAuth: boolean,
    filter: FilterType
    
}

type MapDispatchToPropsType = {
    //onPageChanged: (pageNumber: number) => void 
    follow: (userID: number) => void
    unfollow: (userID: number) => void
    getUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
    
}

type PropType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

type UsersPageType = {
    
}

export const UsersPage: React.FC<UsersPageType> = (props) => {
    const isFetching = useSelector(getIsFetching)
  return <>
      {isFetching ? <Preloader/> : null}
      <Users 
      //onPageChanged={onPageChanged}
      //onFilerChanged={onFilerChanged}
      //totalUsersCount={this.props.totalUsersCount}
      //pageSize={this.props.pageSize}
      //currentPage={this.props.currentPage}
      //users={props.users}
      //follow={props.follow}
      //unfollow={props.unfollow}
      //followinginProgress={props.followinginProgress}
      />
  </>
}

// class UsersContainer extends React.Component<PropType> {
    
	
//     componentDidMount() {
//         this.props.getUsers(this.props.currentPage, this.props.pageSize, this.props.filter);         
//     }

//     onPageChanged = (pageNumber: number) => {
//         getUsers(pageNumber, this.props.pageSize, this.props.filter);  
//     }

//     onFilerChanged = (filter: FilterType) => {
//         this.props.getUsers(1, this.props.pageSize, filter); 
//     }
  
// render() {
// return (
// <>
// {console.log(this.props)}
//     {this.props.isFetching ? <Preloader/> : null}
//     <Users 
//     //onPageChanged={this.onPageChanged}
//     //onFilerChanged={this.onFilerChanged}
//     //totalUsersCount={this.props.totalUsersCount}
//     //pageSize={this.props.pageSize}
//     //currentPage={this.props.currentPage}
//     //users={this.props.users}
//     //follow={this.props.follow}
//     //unfollow={this.props.unfollow}
//     //followinginProgress={this.props.followinginProgress}
//     />
// </>
//          )
//        }
// }


// let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         users: state.usersPage.users, 
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: state.usersPage.isFetching,
//         followinginProgress: state.usersPage.followinginProgress,
//         isAuth: state.Auth.isAuth,
//         filter: state.usersPage.filter
//     }
// }

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TOwnProps = DefaultState>

// export default compose<React.ComponentType>(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(
//     mapStateToProps, {follow, unfollow, getUsers}),
//     withAuthRedirect)(UsersContainer)
  
//connect(mapStateToProps,  
  //          {follow, unfollow, setCurrentPage, setCurrentPage, toggleisFollowinginProgress, getUsers})(UsersContainer);