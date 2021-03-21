import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addpostactioncreator, updatenewposttext} from '../../../redux/profile-reducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const MyPosts = (props) => {
  
  let newpostelement = React.createRef();
  
  let addPost = (newPost) => {
    //let text=newpostelement.current.value; 
    props.addPost(newPost);

  }
  debugger
  

  let postElemements=props.postData.map(post=><Post message={post.message} />);
 
  
  return (
    <div className={s.mypost}>
      My posts

      <div className={s.posts}>
      {postElemements}
      </div>
      <AddNewPostForm addPost={addPost}/>
    </div>
  )

}

export default MyPosts;

const AddNewPostForm = (props) => (

	<div>
	  <Formik
		initialValues={{
		  newPost: ''
		}}
		onSubmit={async (values) => {
		  await new Promise((r) => setTimeout(r, 500));
		  //alert(JSON.stringify(values, null, 2))
      props.addPost(values.newPost);
		}}
	  >
	   
		<Form>
		  <Field id="newPost" name="newPost" placeholder="your text" />

		  <button type="submit">Send</button>
		</Form>
	  </Formik>
	</div>
  );