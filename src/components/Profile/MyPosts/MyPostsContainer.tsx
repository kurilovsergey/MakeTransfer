import React from 'react';
import s from './MyPosts.module.css';
import {addpostactioncreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxstore';
import {MapPropType, DispatchPropsType} from './MyPosts'

const mapStateToProps = (state: AppStateType) => {
	return {
    postData: state.Wallpage.postData,
   
 }
}
/*
const mapDispatchTooProps = (dispatch) => {
	return {
		addPost: (text) => {let action = addpostactioncreator(text);
                        dispatch(action);}
}
}
*/
const MyPostsContainer  = connect<MapPropType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost: addpostactioncreator})(MyPosts);

export default MyPostsContainer;