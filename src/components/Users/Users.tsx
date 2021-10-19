import React, { useImperativeHandle, useState, useEffect } from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'
import { UsersAPI } from '../../api/api';
import { FilterType, follow, unfollow, getUsers } from '../../redux/users-reducer';
import {ProfileType, UserType} from '../../types/types'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { isPropertySignature } from 'typescript';
import { string } from 'yup/lib/locale';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getTotalUsersCount, getCurrentPage, getPageSize, getFilter, getUsersSelector, getFollowinginProgress } from '../../redux/selectors/user/usersselectors';


type PropsType = {
    //onPageChanged: (pageNumber: number) => void 
    //onFilerChanged: (filter: FilterType) => void
    //users: Array<UserType>
    //pageSize: number
    //totalUsersCount: number
    //currentPage: number
    isFetching?: boolean
    //followinginProgress: Array<number>
    //follow: (userID: number) => void
    //unfollow: (userID: number) => void
}


export const Users: React.FC<PropsType> = (props) => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  
  const currentPage = useSelector(getCurrentPage)

  const pageSize = useSelector(getPageSize)

  const filter = useSelector(getFilter)
 
  const users = useSelector(getUsersSelector)

  const followinginProgress = useSelector(getFollowinginProgress)

  let dispatch = useDispatch()

  useEffect(()=>{
    const {search} = history.location
    const queryString = require('query-string');
    const parsed = queryString.parse(search);

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = Number(parsed.page)
    
    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term}

    switch(parsed.friend) {
    case "null":
      actualFilter = {...actualFilter, friend: null}
      break
    case "true":
      actualFilter = {...actualFilter, friend: true}
      break
    case "false":
      actualFilter = {...actualFilter, friend: false}
      break
    }


    console.log(parsed)
    dispatch(getUsers(actualPage, pageSize, actualFilter));    
  },[])

  useEffect(()=>{
    history.push({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
     
  },[filter, currentPage])

  const history = useHistory();

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter));  
  }

  const onFilerChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter)); 
}

const _follow = (userID: number) => {
  dispatch(follow(userID))
}

const _unfollow = (userID: number) => {
  dispatch(unfollow(userID))
}
  
	let pagesCount = Math.ceil(totalUsersCount/pageSize);

	let pages: Array<number> = [];

  

	for (let i=1; i<=pagesCount; i++) {
		pages.push(i);
		
	}
    let portionSize = 10;

    let portionCounter = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
 
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;

    let rightPortionPageNumber = portionNumber * portionSize;

	return <div>
        <UserSearch onFilerChanged={onFilerChanged}/>
         <div>
        {portionNumber>1 &&
         <button onClick={()=> setPortionNumber(portionNumber-1)}>{"<<"}</button>}
           {pages.filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber).map(p =>
         //   <span className={props.currentPage == p && s.selectPage} 
         <span className={  currentPage == p ? s.selectPage : s.regularPage} 
		                         onClick={(e)=>onPageChanged(p)}>{" "+p}</span>)}
		{portionNumber<portionCounter &&
        <button onClick={()=> setPortionNumber(portionNumber+1)}>{">>"}</button>}
         </div>
         
       {  //временное решение поставить any 
            users.map((u: any) => <div key={u.id}> 
                <span>
                    <div>
                      <NavLink to={'/profile/' + u.id}>
                      <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             className={s.userPhoto}/>
                       </NavLink>
                       
                        {u.followed
                            ? <button disabled={followinginProgress.some((id: any) => id === u.id)} onClick={() => {
                              _unfollow(u.id);    
                            }}>
                                Unfollow</button>
                            : <button disabled={followinginProgress.some((id:any) => id === u.id)} onClick={() => {
                                _follow(u.id) }}>
                                    Follow</button>}

                    </div>
                </span>
                
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                </span>
                
            </div>)
        }
        
	   </div>

}

export default Users;

type UserSearchFormValidate = {
    term: string
}

const userSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
  }

  type FormType = {
      term: string,
      friend: "true" | "false" | "null"
  }
  
  type UserSearchType = {
    onFilerChanged: (filter: FilterType) => void
  }

const UserSearch: React.FC<UserSearchType> = (props) => {

  const filter = useSelector(getFilter)
    
    const submit = (values: FormType, { setSubmitting }: {setSubmitting: (isSubmiting: boolean) => void}) => {
        const Filter: FilterType = {
            term: values.term,
            friend: values.friend==='false' ? false : values.friend==='true' ? true : null

        }
        
        props.onFilerChanged(Filter)
        
          setSubmitting(false);
       
      }

    return <div>
      <h1>Any place in your app!</h1>
      <Formik
        enableReinitialize
        initialValues={{term: filter.term, friend: filter.friend }}
        validate={userSearchFormValidate}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
           {// <ErrorMessage name="email" component="div" />
           }
            
            <Field name="friend" as="select">
            <option value="null">all</option>
            <option value="true">only followed</option>
            <option value="false">only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Filter
            </button>
          </Form>
        )}
      </Formik>
    </div>
};