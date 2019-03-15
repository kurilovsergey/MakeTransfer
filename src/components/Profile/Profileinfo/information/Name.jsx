import React from 'react';
import s from './Name.module.css';

const Name =() => {
return (
  <div className={s.headinfo}>
     <div className={s.name}>Cristiano Ronaldo</div>
     <div className={s.position}>Forvard</div>
  </div>   
)
}

export default Name;