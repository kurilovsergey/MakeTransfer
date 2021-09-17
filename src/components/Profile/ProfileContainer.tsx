import React from 'react';
import Profile from './Profile'
import * as axios from 'axios';
import {connect, MapDispatchToProps, MapStateToProps} from 'react-redux';
import {getUserProfile, setuserprofile, updateStatus, getStatus, savePhoto, saveProfile, resetMessageError} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import {WithAuthRedirect} from '../../hoc/hoc'
import { compose } from 'redux';
import {getProfile, getStatusProfile, getAutorizatedUserID, getisAuth, getMessageError} from '../../redux/selectors/user/usersselectors'
import Preloader from '../common/Preloader/Preloader.jsx';
import { string } from 'yup';
import { RouteComponentProps } from 'react-router-dom';
import * as H from "history";
import { AppStateType } from '../../redux/reduxstore';
import { ProfileType } from '../../types/types';

type ValueType = {
  fullname?: string,
  aboutMe?: string,
  lookingForAJob?: boolean,
  lookingForAJobDescription?: string
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (values: ValueType, userId: number) => void,
    resetMessageError: () => void
}

type PathParamsType = {
    userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }

    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    componentWillUnmount(): void {
    }

    render() {
        return (
            <Profile 
                     isowner={!!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     messageError={this.props.messageError}
                     updateStatus={this.props.updateStatus}
                     resetMessageError={this.props.resetMessageError}
                     saveProfile={this.props.saveProfile}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        profile: state.Wallpage.profile,
        status: state.Wallpage.status,
        authorizedUserId: state.Auth.userID,
        isAuth: state.Auth.isAuth,
        messageError: state.Wallpage.messageError
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
      {getUserProfile, resetMessageError, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);
