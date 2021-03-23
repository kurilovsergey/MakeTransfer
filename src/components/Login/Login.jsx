import React from 'react';
import { connect } from 'react-redux';
import { MoreResources, DisplayFormikState } from "../Login/helper";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, setResponseLoginErrorMessage } from '../../redux/Auth-reducer';
import { compose } from 'redux';
import { Redirect } from "react-router"


const Login = (props) => {
  if (props.isAuth) {
    return <Redirect to={"/profile"}/>
  }
    return   <div>
        <LoginForm login={props.login} messages={props.messages}/>
      </div>
    
}

let mapStateToProps = (state) => ({
  isAuth: state.Auth.isAuth,
  messages: state.Auth.messages
  });

export default connect(mapStateToProps, {login})(Login);


const SignupSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export const LoginForm = (props) => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        email: '',
        password: '',
        rememberme: [],
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
       //alert(JSON.stringify(values, null, 2));
       props.login(values.email,values.password,true);
       if (props.messages) {actions.setErrors({ error: 'Unable to login with the provided credentials.'})};
      }}
    >
      {({ errors, touched }) => (
        <Form>
         <Field name="email" type="email" placeholder="email"/>
          {errors.email && touched.email ? <div>{errors.email}</div> : null}

          <Field name="password" placeholder="password"/>
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}

          {props.messages ? (
            <div>{props.messages}</div>
          ) : null}

          <label>
             <Field type="checkbox" name="rememberme" value="true" />
             Remember me
           </label>

           <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

