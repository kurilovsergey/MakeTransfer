import React from 'react';
import { object } from 'yup/lib/locale';
import s from './Statistic.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ProfileType, ContactsType } from '../../../../types/types';



const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});

type ValueType = {
  fullname?: string,
  aboutMe?: string,
  lookingForAJob?: boolean,
  lookingForAJobDescription?: string
}

type PropsType = {
  messageError: string,
  profile: ProfileType | null,
  gotoEditMode: () => void
  saveProfile: (values: ValueType, userId: number) => void,
  resetMessageError: () => void
}

const ProfileDataForm: React.FC<PropsType> = (props) => {
  
  if (typeof props.messageError === 'undefined') {
    console.log('tut');
    props.resetMessageError();
    props.gotoEditMode();    
  }
  


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
          fullName: props.profile!.fullName,
          aboutMe: props.profile!.aboutMe,
          lookingForAJobDescription: props.profile!.lookingForAJobDescription,
          lookingForAJob: props.profile!.lookingForAJob
        }}
        //validationSchema={SignupSchema}xwz
        
        onSubmit={values => {
          alert(JSON.stringify(values, null, 2));
          props.saveProfile(values, props.profile!.userId)
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
            <div><b>Контакты:</b> {Object.keys(props.profile!.contacts).map(key=> {
     return <Contact contactTitle={key} 
             contactValue={props.profile?.contacts[key as keyof ContactsType]} key={key}/>}
   )}</div>
            <button type="submit">Save</button>
            {props.messageError ? (
            <div>{props.messageError}</div>
          ) : null}
            
          </Form>
        )}
      </Formik>
   </div>
  </div>   
  
)
}

export default ProfileDataForm;
//: React.FC<PropsType> = (props) =>

type PropsTypeContact = {
  contactTitle: string,
  contactValue: string | undefined
}

const Contact: React.FC<PropsTypeContact> = ({contactTitle, contactValue}) => {
  
  return (
  <div>
    <Field name={"contacts."+ contactTitle}  placeholder={contactTitle}  id={contactTitle}/>
 </div>
  )
};