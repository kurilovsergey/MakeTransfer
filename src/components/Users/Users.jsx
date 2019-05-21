import React from 'react';
import s from './Users.module.css'
import * as axios from 'axios';


let Users = (props) => {
	
	let pageCount = Math.ceil(props.totalUsersCount/props.pageSize);

	let pages = [];

	for (let i=1; i<=pageCount; i++) {
		pages.push(i);
		debugger;
	}

	return <div>
	     <div>
           {pages.map(p => <span className={props.currentPage == p && s.selectPage} 
		                         onClick={(e)=>props.onPageChanged(p)}>{p}</span>)}
		 </div>

       {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                props.follow(u.id)
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