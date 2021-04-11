import React from 'react';
import { object } from 'yup/lib/locale';
import s from './Statistic.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

const ProfileDataForm =(props) => {
  console.log('profile form ',props)
return (
  <div className={s.statistic}>
   <div className={s.statinseason}>
       <div className={s.label}>Матчи</div><div>1</div>
       <div className={s.label}>Голы</div><div>1</div>
       <div className={s.label}>Голевые передачи</div><div>1</div>
   </div>
   <div className={s.headinfo}>
   <Formik
        initialValues={{
          fullName: props.profile.fullName,
          aboutMe: props.profile.aboutMe,
          lookingForAJobDescription: props.profile.lookingForAJobDescription,
          lookingForAJob: props.profile.lookingForAJob
        }}
        //validationSchema={SignupSchema}xwz
        
        onSubmit={values => {
          //alert(JSON.stringify(values, null, 2));
          console.log(values);
          props.saveProfile(values, props.profile.userId)
          props.setEditMode(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div>
            <div>Полное имя</div>
            <Field  name="fullName" placeholder="Full name" id="fullName"/>
            </div>
            <label>
             <Field type="checkbox" id="lookingForAJob" name="lookingForAJob"  value="false"/>
             Ищу клуб
           </label>
           <div>
            <div>Обо мне</div>
            <Field component="textarea" name="aboutMe"  placeholder="About me"  id="aboutMe"/>
            </div>
            <div>
            <div>Мои проф скилы</div>
            <Field component="textarea" name="lookingForAJobDescription"  placeholder="My prof skills"  id="lookingForAJobDescription"/>
            </div>
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
   </div>
  </div>   
  
)
}

export default ProfileDataForm;

const Contact = ({contactTitle, contaceValue}) => {
  console.log(contactTitle, contaceValue)
  return (
  <div>
    <b>{contactTitle}</b>{contaceValue || " Нет"}
 </div>
  )
};