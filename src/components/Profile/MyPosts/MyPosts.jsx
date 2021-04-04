import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {addpostactioncreator, updatenewposttext} from '../../../redux/profile-reducer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {required} from '../../../utils/validators/validators'
import * as Yup from 'yup';

//import { ValidationSchemaExample } from '../../Login/Login';

const MyPosts = (props) => {
  
  let newpostelement = React.createRef();
  
  let addPost = (newPost) => {
    //let text=newpostelement.current.value; 
    props.addPost(newPost);

  }
  


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



  const SignupSchema = Yup.object().shape({
    newPost: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required')
  });

   const AddNewPostForm = (props) => (
    <div>
      <h1>New post</h1>
      <Formik
        initialValues={{
          newPost: ''
        }}
        validationSchema={SignupSchema}
        
        onSubmit={values => {
          // same shape as initial values
          //console.log("errors= ");
          props.addPost(values.newPost);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field className={errors.newPost && touched.newPost ? s.errors : null} name="newPost"  id="newPost"/>
            {errors.newPost && touched.newPost ? (
              <div>{errors.newPost}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );