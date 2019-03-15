import React from 'react';
import s from './Avatar.module.css';

const Avatar =() => {
return (
        <div className={s.avatar} >
          <img src='https://tmssl.akamaized.net//images/portrait/header/8198-1515761767.jpg?lm=1515761786' />
          <button>Написать игроку</button>
        </div>
      
)
}

export default Avatar;