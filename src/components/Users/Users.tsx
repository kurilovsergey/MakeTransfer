import React, { useImperativeHandle, useState, useEffect } from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'
import { UsersAPI } from '../../api/api';
import { follow } from '../../redux/users-reducer';
import {UserType} from '../../types/types'

type PropsType = {
    onPageChanged: (pageNumber: number) => void 
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching?: boolean
    followinginProgress: Array<number>
    follow: (userID: number) => void
    unfollow: (userID: number) => void
}


let Users: React.FC<PropsType> = (props) => {

	let pagesCount = Math.ceil(props.totalUsersCount/props.pageSize);

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
         <div>
        {portionNumber>1 &&
         <button onClick={()=> setPortionNumber(portionNumber-1)}>{"<<"}</button>}
           {pages.filter(p=> p>=leftPortionPageNumber && p<=rightPortionPageNumber).map(p =>
         //   <span className={props.currentPage == p && s.selectPage} 
         <span className={  props.currentPage == p ? s.selectPage : s.regularPage} 
		                         onClick={(e)=>props.onPageChanged(p)}>{" "+p}</span>)}
		{portionNumber<portionCounter &&
        <button onClick={()=> setPortionNumber(portionNumber+1)}>{">>"}</button>}
         </div>
         
       {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                      <NavLink to={'/profile/' + u.id}>
                      <img src={u.photos.small != null ? u.photos.small : userPhoto}
                             className={s.userPhoto}/>
                       </NavLink>
                       
                        {u.followed
                            ? <button disabled={props.followinginProgress.some( id => id === u.id)} onClick={() => {
                              props.unfollow(u.id);    
                            }}>
                                Unfollow</button>
                            : <button disabled={props.followinginProgress.some(id => id === u.id)} onClick={() => {
                                props.follow(u.id) }}>
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