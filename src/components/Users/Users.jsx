import React from 'react';
import s from './Users.module.css'

debugger;
const Users = (props) => {
	return (
	   <div>
          {props.users.map(u => <div key={u.id}>
			 <span>
				<div>
                        <img src={u.photoUrl} className={s.avatar}/>
                    </div>
								{u.followed ? <button onClick={() => {props.unfollow(u.id)}}>unFollow</button>
								            : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
			 </div>)}
	   </div>
		)
}

export default Users;