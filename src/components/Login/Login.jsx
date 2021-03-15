import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const LoginForm = (props) => {
    return (
    <form>
        <div>
         "dsds"
         </div>
        
        </form>
    )
}


const Basic = () => (

  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        checked: false
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
     
      <Form>
        <label htmlFor="firstName">First Name</label>
        <Field id="firstName" name="firstName" placeholder="Jane" />
    
    
        <label htmlFor="lastName">Last Name</label>
        <Field id="lastName" name="lastName" placeholder="Doe" />
    
        <label>
              <Field type="checkbox" name="checked" />
              Remember Me
        </label>
        
        <button type="submit">Login</button>
      </Form>
    </Formik>
  </div>
);



const Login = (props) => {
    return  <div>
        <Basic/>
        </div>
    
}

export default Login;