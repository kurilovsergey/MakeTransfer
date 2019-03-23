import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post.jsx';
import {addpostactioncreator, updatenewposttext} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts.jsx';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
    postData: state.Wallpage.postData,
    newposttext: state.Wallpage.newposttext }
}

const mapDispatchTooProps = (dispatch) => {
	return {
		addPost: (text) => {let action = addpostactioncreator(text);
                        dispatch(action);},
    updateNewPost: (text) => {let action = updatenewposttext(text);
                              dispatch(action);  }
}
}

const MyPostsContainer  = connect(mapStateToProps, mapDispatchTooProps)(MyPosts);

export default MyPostsContainer;