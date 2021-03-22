import React from 'react';
import { MoreResources, DisplayFormikState } from "../Login/helper";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

 const SignupSchema = Yup.object().shape({
   password: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
 });
 
 export const LoginForm = () => (
   <div>
     <h1>Login</h1>
     <Formik
       initialValues={{
         email: '',
         password: '',
         remember: [],
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
         console.log(values);
        alert(JSON.stringify(values, null, 2));
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
           <label>
              <Field type="checkbox" name="remember" value="true" />
              Remember me
            </label>
            <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
   </div>
 );

const Login = (props) => {
    return  <div>
        <LoginForm/>
        </div>
    
}

export default Login;

