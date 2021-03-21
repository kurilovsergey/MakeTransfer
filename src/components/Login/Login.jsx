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

const BasicExample = () => (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ name: 'jared' }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
              
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 1000);
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <input
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && <div id="feedback">{props.errors.name}</div>}
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
    </div>
  );

const Login = (props) => {
    return  <div>
        <Basic/>
        <BasicExample/>
        </div>
    
}

export default Login;