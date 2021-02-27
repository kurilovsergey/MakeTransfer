import React from 'react';
import s from './Users.module.css';
import * as axios from 'axios';
import {NavLink} from "react-router-dom";
import userPhoto from '../../assets/images/userPhoto.png'


let Users = (props) => {
	
	let pageCount = Math.ceil(props.totalUsersCount/props.pageSize);

	let pages = [];

	for (let i=1; i<=pageCount; i++) {
		pages.push(i);
		
	}

 

	return <div>
	     <div>
           {pages.map(p => <span className={props.currentPage == p && s.selectPage} 
		                         onClick={(e)=>props.onPageChanged(p)}>{" "+p}</span>)}
		
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
                            ? <button onClick={() => {

                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                {withCredentials:true,
                                headers: {
                                    "API-KEY": "2522ab72-2cb9-46ff-a415-53a5c1188e2f"}
                                })
                                .then(response => {
                                    console.log('repsunfollow '+response);
                                    if (response.data.resultCode==0) {props.unfollow(u.id)}
                                    
                                    debugger
                                });


                                
                            }}>Unfollow</button>
                            : <button onClick={() => {

                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},
                                 {withCredentials: true,
                                headers: {
                                    "API-KEY": "2522ab72-2cb9-46ff-a415-53a5c1188e2f"}
                                })
                                .then(response => {
                                    console.log('reponse follow '+response);
                                    if (response.data.resultCode==0) {props.follow(u.id)}
                                    debugger
                                });

                                
                            }}>Follow</button>}

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