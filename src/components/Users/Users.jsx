import React from 'react';
import s from './Users.module.css'
import * as axios from 'axios';


class Users extends React.Component {
	
		componentDidMount() {
			axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=$(this.props.currentPage)&count=$(this.props.pageSize)`)
				.then(response => {
					this.props.setUsers(response.data.items);
					this.props.setTotalUsersCount(response.data.totalCount);
					console.log(response.data.items);
				});
		}

		onPageChanged = (pageNumber) => {
			this.props.setCurrentPage(pageNumber);
			axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
				.then(response => {
					this.props.setUsers(response.data.items);
					console.log(response.data.items);
				});
		}
	
    render() {
	  
		let pageCount = Math.ceil(this.props.totalUsersCount/this.props.pageSize);

		let pages = [];

		for (let i=1; i<=pageCount; i++) {
			pages.push(i);
		}

	return (
	   <div>
	     <div>
           {pages.map(p => <span className={this.props.currentPage == p && s.selectPage} 
		                         onClick={(e)=>this.onPageChanged(p)}>{p}</span>)}
		 </div>

       {
            this.props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollow(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.follow(u.id)
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
		)
}
}

export default Users;